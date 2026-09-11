// SaveManager — auto-save + botão salvar
// Detecta mudanças no DOM, salva automaticamente com debounce, e gerencia estado do botão.

let _dirty = false;
let _timer: ReturnType<typeof setTimeout> | null = null;
let _btnSave: HTMLButtonElement | null = null;
let _observer: MutationObserver | null = null;
const DEBOUNCE_MS = 2000;

function marcarSujo() {
  if (_dirty) return;
  _dirty = true;
  atualizarBotao('sujo');
  agendarAutoSave();
}

function marcarLimpo() {
  _dirty = false;
  if (_timer) { clearTimeout(_timer); _timer = null; }
  atualizarBotao('salvo');
}

function agendarAutoSave() {
  if (_timer) clearTimeout(_timer);
  _timer = setTimeout(() => { salvarAgora(); }, DEBOUNCE_MS);
}

function atualizarBotao(estado: 'salvo' | 'sujo' | 'salvando') {
  if (!_btnSave) return;
  const icone = _btnSave.querySelector('[data-lucide]');
  const texto = _btnSave.querySelector('.save-text');
  _btnSave.classList.remove('save-sujo', 'save-salvando');
  if (estado === 'sujo') {
    _btnSave.classList.add('save-sujo');
    if (icone) icone.setAttribute('data-lucide', 'circle');
    if (texto) texto.textContent = 'Alterações';
    _btnSave.title = 'Existem alterações não salvas';
  } else if (estado === 'salvando') {
    _btnSave.classList.add('save-salvando');
    if (icone) icone.setAttribute('data-lucide', 'loader-2');
    if (texto) texto.textContent = 'Salvando...';
    _btnSave.title = 'Salvando...';
  } else {
    if (icone) icone.setAttribute('data-lucide', 'check-circle');
    if (texto) texto.textContent = 'Salvo';
    _btnSave.title = 'Todos os dados estão salvos';
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function obterEstadosSujeira(): string[] {
  const estados: string[] = [];
  // inputs e textareas com valor diferente do default
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea, select').forEach(el => {
    const val = el.value;
    const def = el.getAttribute('data-default');
    if (def !== null && val !== def) estados.push(el.name || el.id || 'input');
  });
  // contenteditable
  document.querySelectorAll('[contenteditable="true"]').forEach(el => {
    const txt = el.textContent || '';
    const def = el.getAttribute('data-default');
    if (def !== null && txt !== def) estados.push(el.id || 'editable');
  });
  return estados;
}

function temMudancasPendentes(): boolean {
  return obterEstadosSujeira().length > 0;
}

function salvarAgora() {
  if (!_dirty && !temMudancasPendentes()) return;
  atualizarBotao('salvando');

  // Salvar formulários pendentes — delega para stores existentes
  try {
    // Sync configs se estiver na view de configurações
    const configForm = document.querySelector('.config-form') || document.querySelector('[data-view="configuracoes"]');
    if (configForm) {
      try { configStore().salvar(); } catch (_) { /* ok se não existir */ }
    }
    // Salvar dataStore completo
    if (typeof dataStore !== 'undefined' && dataStore && dataStore.salvar) {
      dataStore.salvar();
    }
    // Salvar defaults no DOM
    document.querySelectorAll('input, textarea, select').forEach(el => {
      el.setAttribute('data-default', el.value);
    });
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
      el.setAttribute('data-default', el.textContent || '');
    });

    marcarLimpo();
    mostrarToast('Dados salvos automaticamente', 'sucesso');
    if (typeof activityLogger !== 'undefined') {
      activityLogger.registrar('atualizacao', 'Auto-save', 'Salvamento automático de alterações', 'atualizacao');
    }
  } catch (e) {
    console.error('Auto-save error:', e);
    atualizarBotao('sujo');
    mostrarToast('Erro ao salvar dados', 'erro');
  }
}

function observarMudancas() {
  const alvo = document.getElementById('viewPrincipal');
  if (!alvo) return;
  _observer = new MutationObserver((mutacoes) => {
    // Ignorar mudanças automáticas (render de views, toasts, etc.)
    const relevante = mutacoes.some(m => {
      const alvo = m.target as HTMLElement;
      if (!alvo || !alvo.closest) return false;
      // Ignorar mudanças em elementos de UI (toast, modal-overlay, notif-panel, skeleton)
      if (alvo.closest('.toast, .modal-overlay, .notif-panel, .skeleton-layout, .fab-speedial')) return false;
      // Ignorar mudanças de attributes de ícones Lucide
      if (m.type === 'attributes' && (m.attributeName === 'data-lucide' || m.attributeName === 'class')) return false;
      // Ignorar mudanças em view-cabecalho (títulos são estáticos)
      if (alvo.closest('.view-cabecalho')) return false;
      return true;
    });
    if (relevante) marcarSujo();
  });
  _observer.observe(alvo, { childList: true, subtree: true, characterData: true, attributes: false });
}

function iniciarAutoSave() {
  _btnSave = document.getElementById('btnSave') as HTMLButtonElement;
  if (_btnSave) {
    _btnSave.addEventListener('click', () => { salvarAgora(); });
  }

  // Listener em inputs para detectar digitação
  document.addEventListener('input', (e) => {
    const alvo = e.target as HTMLElement;
    if (!alvo || !alvo.closest) return;
    if (alvo.closest('.toast, .modal-overlay, .notif-panel, .fab-speedial')) return;
    if (alvo.closest('input, textarea, select, [contenteditable]')) {
      marcarSujo();
    }
  }, { passive: true });

  // Capturar mudanças em selects
  document.addEventListener('change', (e) => {
    const alvo = e.target as HTMLElement;
    if (!alvo || !alvo.closest) return;
    if (alvo.closest('.toast, .modal-overlay, .notif-panel, .fab-speedial')) return;
    if (alvo.closest('select')) {
      marcarSujo();
    }
  }, { passive: true });

  // Observar mutações DOM
  observarMudancas();

  // Aviso antes de sair com mudanças pendentes
  window.addEventListener('beforeunload', (e) => {
    if (_dirty || temMudancasPendentes()) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  // Estado inicial
  atualizarBotao('salvo');
}

function pararAutoSave() {
  if (_observer) { _observer.disconnect(); _observer = null; }
  if (_timer) { clearTimeout(_timer); _timer = null; }
  _dirty = false;
}

// Expor globalmente
if (typeof window !== 'undefined') {
  (window as any).saveManager = { iniciarAutoSave, pararAutoSave, salvarAgora, marcarSujo, marcarLimpo };
}
