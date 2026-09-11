// SaveManager — auto-save + botão salvar
// Abordagem: input/change listeners para dirty, debounce para auto-save.
// Sem MutationObserver (causa loops com as próprias mudanças).

let _dirty = false;
let _timer: ReturnType<typeof setTimeout> | null = null;
let _btnSave: HTMLButtonElement | null = null;
let _ignorar = false; // guard contra re-entrada durante save
const DEBOUNCE_MS = 2000;

function marcarSujo() {
  if (_ignorar || _dirty) return;
  _dirty = true;
  atualizarBotao('sujo');
  agendarAutoSave();
}

function marcarLimpo() {
  _ignorar = true; // ignorar mutações do save
  _dirty = false;
  if (_timer) { clearTimeout(_timer); _timer = null; }
  atualizarBotao('salvo');
  setTimeout(() => { _ignorar = false; }, 100);
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

function salvarAgora() {
  if (_ignorar) return;
  atualizarBotao('salvando');
  _ignorar = true;
  try {
    if (typeof configStore === 'function') {
      try { configStore().salvar(); } catch (_) { /* ok */ }
    }
    if (typeof dataStore !== 'undefined' && dataStore && dataStore.salvar) {
      dataStore.salvar();
    }
    marcarLimpo();
    mostrarToast('Dados salvos com sucesso', 'sucesso');
    if (typeof activityLogger !== 'undefined') {
      activityLogger.registrar('atualizacao', 'Auto-save', 'Salvamento automático', 'atualizacao');
    }
  } catch (e) {
    console.error('Auto-save error:', e);
    _ignorar = false;
    atualizarBotao('sujo');
    mostrarToast('Erro ao salvar dados', 'erro');
  }
}

function isEmUI(el: HTMLElement | null): boolean {
  if (!el || !el.closest) return true;
  return !!el.closest('.toast, .modal-overlay, .notif-panel, .skeleton-layout, .fab-speedial, .fab-container, header, .sidebar');
}

function iniciarAutoSave() {
  _btnSave = document.getElementById('btnSave') as HTMLButtonElement;
  if (_btnSave) {
    _btnSave.addEventListener('click', () => { salvarAgora(); });
  }

  document.addEventListener('input', (e) => {
    if (_ignorar) return;
    const alvo = e.target as HTMLElement;
    if (isEmUI(alvo)) return;
    marcarSujo();
  }, { passive: true });

  document.addEventListener('change', (e) => {
    if (_ignorar) return;
    const alvo = e.target as HTMLElement;
    if (isEmUI(alvo)) return;
    marcarSujo();
  }, { passive: true });

  window.addEventListener('beforeunload', (e) => {
    if (_dirty) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  atualizarBotao('salvo');
}

function pararAutoSave() {
  if (_timer) { clearTimeout(_timer); _timer = null; }
  _dirty = false;
  _ignorar = false;
}

if (typeof window !== 'undefined') {
  (window as any).saveManager = { iniciarAutoSave, pararAutoSave, salvarAgora, marcarSujo, marcarLimpo };
}
