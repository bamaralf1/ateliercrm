// Shortcuts — Atalhos de teclado

const ATALHOS_PADRAO = {
  'ctrl+k': { desc: 'Busca global (spotlight)', acao: () => abrirSpotlight() },
  'ctrl+n': { desc: 'Nova obra', acao: () => { router?.navegar('catalogo'); setTimeout(() => eventBus.emitir('abrir-nova-obra'), 200); } },
  'ctrl+v': { desc: 'Nova venda', acao: () => { router?.navegar('vendas'); setTimeout(() => eventBus.emitir('abrir-nova-venda'), 200); } },
  'ctrl+c': { desc: 'Novo cliente', acao: () => { router?.navegar('clientes'); setTimeout(() => eventBus.emitir('abrir-novo-cliente'), 200); } },
  'ctrl+d': { desc: 'Dashboard', acao: () => router?.navegar('dashboard') },
  'ctrl+g': { desc: 'Galeria Virtual', acao: () => router?.navegar('galeriaVirtual') },
  'ctrl+p': { desc: 'Precificador', acao: () => router?.navegar('precificador') },
  'ctrl+a': { desc: 'Atelier/Estoque', acao: () => router?.navegar('atelier') },
  'ctrl+f': { desc: 'Financeiro', acao: () => router?.navegar('financeiro') },
  'ctrl+r': { desc: 'Rede Profissional', acao: () => router?.navegar('rede') },
  'ctrl+j': { desc: 'Diário Criativo', acao: () => router?.navegar('diario') },
  'ctrl+b': { desc: 'Backup rápido', acao: () => { dataStore?.exportarBackup(); mostrarToast('Backup exportado!', 'sucesso'); activityLogger.registrar('export', 'Backup exportado', 'Backup completo do sistema', 'export'); } },
  'ctrl+s': { desc: 'Salvar dados', acao: () => { dataStore?.salvar(); mostrarToast('Dados salvos!', 'sucesso'); activityLogger.registrar('atualizacao', 'Dados salvos', 'Salvamento manual', 'atualizacao'); } },
  'Escape': { desc: 'Fechar modal', acao: () => fecharModal() },
  '/': { desc: 'Mostrar todos os atalhos', acao: () => mostrarAtalhos() },
  '?': { desc: 'Mostrar ajuda', acao: () => mostrarAtalhos() },
};

function carregarAtalhos() {
  let personalizados = {};
  try { personalizados = JSON.parse(localStorage.getItem('atelier_atalhos') || '{}'); } catch (e) { console.warn(e); }
  const atalhos = [];
  for (const [chave, cfg] of Object.entries(ATALHOS_PADRAO)) {
    const personalizado = personalizados[chave];
    const tecla = personalizado || chave;
    const ctrl = tecla.startsWith('ctrl+');
    const key = ctrl ? tecla.slice(5) : tecla;
    atalhos.push({ key, ctrl, desc: cfg.desc, acao: cfg.acao, chave });
  }
  return atalhos;
}

export let atalhos = carregarAtalhos();

export function recarregarAtalhos() {
  atalhos = carregarAtalhos();
}

export function registrarAtalhosTeclado() {
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) && e.key !== 'Escape') return;
    const ctrl = e.ctrlKey || e.metaKey;
    for (const a of atalhos) {
      if (a.key === e.key && (a.ctrl ? ctrl : true)) { e.preventDefault(); a.acao(); return; }
    }
    if (e.key === 'Escape') {
      if (document.querySelector('.spotlight-overlay')) document.querySelector('.spotlight-overlay').remove();
      fecharModal();
    }
  });
}

export function mostrarAtalhos() {
  const categorias = {
    'Navegação': ['d', 'g', 'p', 'a', 'f', 'r', 'j'],
    'Criação': ['n', 'v', 'c'],
    'Dados': ['b', 's'],
    'Ajuda': ['/', '?', 'k', 'Escape']
  };
  const itensPorCategoria = Object.entries(categorias).map(([cat, keys]) => {
    const itens = atalhos.filter(a => keys.includes(a.key)).map(a => {
      const keyHtml = a.ctrl ? `<span class="sc-key">${navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}</span><span class="sc-key">${a.key.toUpperCase()}</span>` : `<span class="sc-key">${a.key}</span>`;
      return `<div class="sc-item"><span>${a.desc}</span><span>${keyHtml}</span></div>`;
    }).join('');
    return `<div class="sc-categoria"><h4>${cat}</h4><div class="shortcuts-grid">${itens}</div></div>`;
  }).join('');
  abrirModal(`<h3>⌨️ Atalhos de Teclado</h3><p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px;">Use estes atalhos para navegar rapidamente pelo sistema.</p>${itensPorCategoria}<div class="modal-acoes" style="margin-top:16px;"><button class="btn-secundario" id="btnPersonalizarAtalhos"><i class="fas fa-pen"></i> Personalizar</button><button class="btn-secundario" id="btnCancelarModal">Fechar</button></div>`);
  document.getElementById('btnCancelarModal')?.addEventListener('click', fecharModal);
  document.getElementById('btnPersonalizarAtalhos')?.addEventListener('click', () => { fecharModal(); setTimeout(editarAtalhos, 300); });
}

export function editarAtalhos() {
  const items = atalhos.filter(a => a.chave).map(a => {
    const teclaAtual = (a.ctrl ? 'Ctrl+' : '') + a.key;
    return `<div class="sc-edit-item"><span class="sc-edit-desc">${a.desc}</span><input class="sc-edit-input" data-chave="${a.chave}" value="${teclaAtual}" readonly><button class="btn-pequeno sc-edit-btn" data-chave="${a.chave}"><i class="fas fa-sync"></i></button></div>`;
  }).join('');
  abrirModal(`<h3>⌨️ Personalizar Atalhos</h3><p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Clique no botão ao lado do atalho e pressione a nova combinação de teclas. Ctrl+Letra ou apenas uma tecla.</p><div class="sc-edit-lista">${items}</div><div class="modal-acoes" style="margin-top:16px;"><button class="btn-secundario" id="btnResetarAtalhos"><i class="fas fa-undo"></i> Restaurar Padrões</button><button class="btn-primario" id="btnSalvarAtalhos"><i class="fas fa-save"></i> Salvar</button></div>`);

  let capturando = null;
  document.querySelectorAll('.sc-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const chave = btn.dataset.chave;
      if (capturando === chave) { capturando = null; btn.innerHTML = '<i class="fas fa-sync"></i>'; return; }
      capturando = chave;
      btn.innerHTML = '...';
      const input = document.querySelector(`.sc-edit-input[data-chave="${chave}"]`);
      if (input) { input.value = 'Pressione uma tecla...'; input.focus(); }
    });
  });

  document.addEventListener('keydown', function capturar(e) {
    if (!capturando) return;
    e.preventDefault();
    const input = document.querySelector(`.sc-edit-input[data-chave="${capturando}"]`);
    const btn = document.querySelector(`.sc-edit-btn[data-chave="${capturando}"]`);
    if (input) {
      const ctrl = e.ctrlKey || e.metaKey;
      input.value = ctrl ? 'Ctrl+' + e.key.toLowerCase() : e.key;
      input.dataset.novo = input.value;
    }
    if (btn) btn.innerHTML = '<i class="fas fa-check" style="color:#22c55e"></i>';
    capturando = null;
  });

  document.getElementById('btnResetarAtalhos')?.addEventListener('click', () => {
    localStorage.removeItem('atelier_atalhos');
    recarregarAtalhos();
    mostrarToast('Atalhos restaurados!', 'sucesso');
    fecharModal();
  });
  document.getElementById('btnSalvarAtalhos')?.addEventListener('click', () => {
    const personalizados = {};
    document.querySelectorAll('.sc-edit-input').forEach(inp => {
      const novo = inp.dataset.novo;
      if (novo && novo !== inp.value && inp.dataset.chave) {
        personalizados[inp.dataset.chave] = novo;
      }
    });
    localStorage.setItem('atelier_atalhos', JSON.stringify(personalizados));
    recarregarAtalhos();
    mostrarToast('Atalhos personalizados salvos!', 'sucesso');
    fecharModal();
  });
}
