// Tour — Tour guiado para novos usuários

const tourPassos = [
  { alvo: '.sidebar', titulo: '<i class="fas fa-palette"></i> Bem-vindo ao Atelier CRM!', desc: 'Este é seu hub criativo. Navegue entre os módulos pelo menu lateral.', pos: 'right' },
  { alvo: '#seletorTema', titulo: '🎭 Escolha seu Tema', desc: 'Personalize o visual com 8 temas.', pos: 'bottom' },
  { alvo: '#btnBackup', titulo: '<i class="fas fa-save"></i> Backup Seguro', desc: 'Exporte seus dados periodicamente.', pos: 'bottom' },
  { alvo: '[data-rota="catalogo"]', titulo: '<i class="fas fa-images"></i> Catálogo de Obras', desc: 'Cadastre, edite e gerencie seu portfólio.', pos: 'right' },
  { alvo: '[data-rota="vendas"]', titulo: '<i class="fas fa-dollar-sign"></i> Vendas e Recibos', desc: 'Registre vendas e gere recibos em PDF.', pos: 'right' },
  { alvo: '[data-rota="diario"]', titulo: '<i class="fas fa-book-open"></i> Diário Criativo', desc: 'Registre seu processo diário.', pos: 'right' },
  { alvo: '[data-rota="configuracoes"]', titulo: '⚙️ Configurações', desc: 'Configure idioma, segurança e dados do artista.', pos: 'right' }
];

export function iniciarTour() {
  if (dataStore?.dados?.config?.tourCompleted) return;
  let passoAtual = 0;
  function mostrarPasso() {
    const passo = tourPassos[passoAtual];
    const alvo = document.querySelector(passo.alvo);
    if (!alvo) { passoAtual++; if (passoAtual < tourPassos.length) mostrarPasso(); else finalizarTour(); return; }
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    document.querySelectorAll('.tour-tooltip').forEach(el => el.remove());
    alvo.classList.add('tour-highlight');
    const rect = alvo.getBoundingClientRect();
    const tooltip = document.createElement('div');
    tooltip.className = 'tour-tooltip';
    let top, left;
    if (passo.pos === 'right') { left = rect.right + 12; top = rect.top; }
    else if (passo.pos === 'bottom') { left = rect.left; top = rect.bottom + 12; }
    else { left = rect.left; top = rect.bottom + 12; }
    if (left + 320 > window.innerWidth) left = window.innerWidth - 340;
    if (top < 10) top = 10;
    tooltip.style.left = left + 'px'; tooltip.style.top = top + 'px';
    const isUltimo = passoAtual === tourPassos.length - 1;
    tooltip.innerHTML = `<div class="tt-titulo">${passo.titulo}</div><div class="tt-desc">${passo.desc}</div><div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:8px;">${passoAtual + 1} de ${tourPassos.length}</div><div class="tt-acoes"><button class="tt-btn-skip" id="tourSkip">Pular</button>${passoAtual > 0 ? '<button class="tt-btn-prev" id="tourPrev">← Anterior</button>' : ''}<button class="tt-btn-next" id="tourNext">${isUltimo ? '<i class="fas fa-check"></i> Finalizar' : 'Próximo →'}</button></div>`;
    document.body.appendChild(tooltip);
    document.getElementById('tourNext')?.addEventListener('click', () => { if (isUltimo) finalizarTour(); else { passoAtual++; mostrarPasso(); } });
    document.getElementById('tourPrev')?.addEventListener('click', () => { passoAtual--; mostrarPasso(); });
    document.getElementById('tourSkip')?.addEventListener('click', finalizarTour);
  }
  function finalizarTour() {
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    document.querySelectorAll('.tour-tooltip').forEach(el => el.remove());
    if (dataStore) { dataStore.dados.config.tourCompleted = true; dataStore.salvar(); }
  }
  setTimeout(mostrarPasso, 600);
}
