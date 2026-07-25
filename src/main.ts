// Bootstrap e inicialização
import { StoreBridge } from './store-bridge'

// Renderiza o Dashboard
export function renderizarDashboard(dataStore) {
  const obras = dataStore.listar('obras');
  const vendas = dataStore.listar('vendas');
  const clientes = dataStore.listar('clientes');
  const vendidas = obras.filter(o => o.status === 'vendida');
  const emEstoque = obras.filter(o => o.status !== 'vendida');
  const valorAcervo = emEstoque.reduce((soma, o) => soma + (Number(o.preco) || 0), 0);
  const valorVendido = vendas.reduce((soma, v) => soma + (Number(v.valor) || 0), 0);
  const dadosMeses = calcularObrasPorMes(obras);
  const graficoSvg = gerarGraficoSVG(dadosMeses);
  const tecnicaMaisComum = calcularTecnicaMaisComum(obras);
  const ticketMedio = vendas.length > 0 ? valorVendido / vendas.length : 0;
  const crescimentoMensal = calcularCrescimentoMensal(obras);
  const obrasFavoritas = obras.filter(o => o.favorita).length;
  const recentes = [...obras].sort((a, b) => new Date(b.dataCadastro || b.criadoEm) - new Date(a.dataCadastro || a.criadoEm)).slice(0, 5);
  const listaRecentesHtml = recentes.length ? recentes.map(o => `
    <li class="item-obra-recente">
      <div class="thumb-obra">${o.imagem ? `<img src="${o.imagem}" alt="${o.titulo}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">` : (o.emoji || '🖼️')}</div>
      <div class="info-obra-recente">
        <div class="nome">${o.titulo}</div>
        <div class="meta">${o.tecnica || ''} · ${formatarData(o.dataCadastro || o.criadoEm)}</div>
      </div>
      <span class="tag-status ${classeStatus(o.status)}">${rotuloStatus(o.status)}</span>
    </li>
  `).join('') : `<div class="estado-vazio"><div class="icone-vazio">🖼️</div><p>Nenhuma obra cadastrada ainda. Clique em "Nova Obra" para começar.</p></div>`;
  return `
    <div class="view-cabecalho">
      <div>
        <h2>Dashboard</h2>
        <p class="subtitulo">Visão geral do seu ateliê · ${new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <div class="dashboard-acoes">
        <button class="btn-secundario" id="btnAtualizarDashboard" title="Atualizar dados">🔄</button>
      </div>
    </div>
    <div class="grid-cards stagger-in">
      <div class="card card-destaque"><div class="rotulo-card">Total de Obras</div><div class="valor-card">${obras.length}</div><div class="card-tendencia ${crescimentoMensal >= 0 ? 'positiva' : 'negativa'}">${crescimentoMensal >= 0 ? '↑' : '↓'} ${Math.abs(crescimentoMensal).toFixed(1)}% este mês</div></div>
      <div class="card"><div class="rotulo-card">Obras Vendidas</div><div class="valor-card">${vendidas.length}</div><div class="card-sub">${obras.length > 0 ? ((vendidas.length / obras.length) * 100).toFixed(1) : 0}% do total</div></div>
      <div class="card"><div class="rotulo-card">Em Estoque</div><div class="valor-card">${emEstoque.length}</div><div class="card-sub">${obras.length > 0 ? ((emEstoque.length / obras.length) * 100).toFixed(1) : 0}% disponível</div></div>
      <div class="card card-valor"><div class="rotulo-card">Valor do Acervo</div><div class="valor-card">${formatarMoeda(valorAcervo)}</div><div class="card-sub">Ticket médio: ${formatarMoeda(ticketMedio)}</div></div>
      <div class="card"><div class="rotulo-card">Total Vendido</div><div class="valor-card">${formatarMoeda(valorVendido)}</div><div class="card-sub">${vendas.length} venda${vendas.length === 1 ? '' : 's'}</div></div>
      <div class="card"><div class="rotulo-card">Favoritas</div><div class="valor-card">${obrasFavoritas}</div><div class="card-sub">⭐ Obras marcadas</div></div>
    </div>
    <div class="grid-painel">
      <div class="painel"><h3>📊 Produtividade Mensal</h3><div class="grafico-container">${graficoSvg}</div><div class="grafico-legenda"><span class="leg-item">📊 Obras criadas por mês</span></div></div>
      <div class="painel"><h3>🎨 Técnicas Mais Usadas</h3><div class="tecnicas-container">${tecnicaMaisComum.length > 0 ? tecnicaMaisComum.map((t, i) => `<div class="barra-tecnica"><div class="tecnica-nome">${capitalizarTexto(t.tecnica)}</div><div class="tecnica-barra-wrapper"><div class="tecnica-barra" style="width: ${t.porcentagem}%"></div></div><div class="tecnica-valor">${t.quantidade} (${t.porcentagem.toFixed(0)}%)</div></div>`).join('') : '<div class="estado-vazio"><p>Sem dados suficientes</p></div>'}</div></div>
    </div>
    <div class="grid-painel">
      <div class="painel"><h3>🕐 Obras mais recentes</h3><ul class="lista-obras-recentes stagger-in">${listaRecentesHtml}</ul></div>
      <div class="painel"><h3>📋 Atividades Recentes</h3><div class="activity-feed">${activityLogger.obterRecentes(5).length > 0 ? activityLogger.obterRecentes(5).map(a => `<div class="activity-item"><div class="activity-icone">${activityLogger.obterIcone(a.tipo)}</div><div class="activity-detalhes"><div class="activity-titulo">${a.titulo} <span class="activity-badge ${a.badge}">${a.badge}</span></div><div class="activity-tempo">${activityLogger.formatarTempo(new Date(a.timestamp))}</div></div></div>`).join('') : '<div class="estado-vazio"><p>Nenhuma atividade registrada ainda.</p></div>'}</div></div>
    </div>
    <div class="painel"><h3>⚡ Atalhos rápidos</h3><div class="atalhos-rapidos"><button class="btn-primario" id="btnAtalhoNovaObra">✚ Nova Obra</button><button class="btn-secundario" id="btnAtalhoVenda">✚ Nova Venda</button><button class="btn-secundario" id="btnAtalhoRecibo">🧾 Gerar Recibo</button><button class="btn-secundario" id="btnAtalhoClientes">👤 Gerenciar Clientes</button></div></div>
  `;
}

// Sanitização
export function sanitizarHTML(str) {
  if (!str) return '';
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

export function sanitizarURL(str) {
  if (!str) return '';
  const s = String(str).trim();
  try {
    const u = new URL(s, window.location.origin);
    return ['http:', 'https:', 'data:', 'mailto:'].includes(u.protocol) ? s : '';
  } catch { return ''; }
}

export function sanitizarRich(str) {
  if (!str) return '';
  const allowedTag = /<\/?(p|br|strong|em|b|i|u|ul|ol|li|span|div)(\s[^>]*)?>/gi;
  const escMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
  const safeAttr = /\s+(style|class|id)\s*=\s*("[^"]*"|'[^']*')/gi;
  let lastIdx = 0, partes = [];
  for (let match; (match = allowedTag.exec(str)) !== null; ) {
    const texto = str.slice(lastIdx, match.index);
    if (texto) partes.push(texto.replace(/[&<>"']/g, (m) => escMap[m]));
    const tag = match[0], tagName = match[1], attrs = match[2];
    if (tag[1] === '/' || !attrs || !attrs.trim()) { partes.push(tag); }
    else {
      const safe = []; safeAttr.lastIndex = 0;
      for (let a; (a = safeAttr.exec(attrs)) !== null; ) safe.push(a[0]);
      partes.push(`<${tagName}${safe.join('')}>`);
    }
    lastIdx = allowedTag.lastIndex;
  }
  const resto = str.slice(lastIdx);
  if (resto) partes.push(resto.replace(/[&<>"']/g, (m) => escMap[m]));
  return partes.join('');
}

export function comprimirImagem(file, maxW = 1200, quality = 0.8) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width, h = img.height;
        if (w > maxW) { h = h * maxW / w; w = maxW; }
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');
        ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export function observarImagens() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('carregado');
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  document.querySelectorAll('.lazy-img:not(.carregado)').forEach(img => obs.observe(img));
}

const transicaoHistorico = [];
export function aplicarTransicaoView(container, chave) {
  const prev = transicaoHistorico.length > 1 ? transicaoHistorico[transicaoHistorico.length - 2] : null;
  const isVolta = prev && transicaoHistorico.indexOf(chave) < transicaoHistorico.indexOf(prev);

  container.classList.remove('view-enter-forward', 'view-enter-back', 'view-enter-fade', 'view-transition');
  void container.offsetWidth;

  let animClass = 'view-enter-fade';
  if (transicaoHistorico.length > 1) {
    const indices = transicaoHistorico.map((r, i) => r === chave ? i : -1).filter(i => i >= 0);
    const idxAtual = transicaoHistorico.length - 1;
    const idxAnterior = transicaoHistorico.length - 2;
    if (indices.length > 0 && indices[indices.length - 1] < idxAnterior) {
      animClass = 'view-enter-back';
    } else if (indices.length > 0) {
      animClass = 'view-enter-forward';
    }
  }
  container.classList.add(animClass, 'view-transition');

  if (!transicaoHistorico.includes(chave)) transicaoHistorico.push(chave);
  else {
    const idx = transicaoHistorico.indexOf(chave);
    transicaoHistorico.splice(idx, 1);
    transicaoHistorico.push(chave);
  }
  if (transicaoHistorico.length > 20) transicaoHistorico.shift();

  // Stagger child animation
  requestAnimationFrame(() => {
    const filhos = container.querySelectorAll('.stagger-in > *');
    filhos.forEach((el, i) => {
      el.style.animationDelay = `${i * 30}ms`;
      el.style.animationDuration = '0.4s';
    });
  });
}

export function debounce(fn, ms = 200) {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

const atalhos = [
  { key: 'k', ctrl: true, desc: 'Busca global (spotlight)', acao: () => abrirSpotlight() },
  { key: 'n', ctrl: true, desc: 'Nova obra', acao: () => { router?.navegar('catalogo'); setTimeout(() => eventBus.emitir('abrir-nova-obra'), 200); } },
  { key: 'v', ctrl: true, desc: 'Nova venda', acao: () => { router?.navegar('vendas'); setTimeout(() => eventBus.emitir('abrir-nova-venda'), 200); } },
  { key: 'c', ctrl: true, desc: 'Novo cliente', acao: () => { router?.navegar('clientes'); setTimeout(() => eventBus.emitir('abrir-novo-cliente'), 200); } },
  { key: 'd', ctrl: true, desc: 'Dashboard', acao: () => router?.navegar('dashboard') },
  { key: 'g', ctrl: true, desc: 'Galeria Virtual', acao: () => router?.navegar('galeriaVirtual') },
  { key: 'p', ctrl: true, desc: 'Precificador', acao: () => router?.navegar('precificador') },
  { key: 'a', ctrl: true, desc: 'Atelier/Estoque', acao: () => router?.navegar('atelier') },
  { key: 'f', ctrl: true, desc: 'Financeiro', acao: () => router?.navegar('financeiro') },
  { key: 'r', ctrl: true, desc: 'Rede Profissional', acao: () => router?.navegar('rede') },
  { key: 'j', ctrl: true, desc: 'Diário Criativo', acao: () => router?.navegar('diario') },
  { key: 'b', ctrl: true, desc: 'Backup rápido', acao: () => { dataStore?.exportarBackup(); mostrarToast('Backup exportado!'); activityLogger.registrar('export', 'Backup exportado', 'Backup completo do sistema', 'export'); } },
  { key: 's', ctrl: true, desc: 'Salvar dados', acao: () => { dataStore?.salvar(); mostrarToast('Dados salvos!'); activityLogger.registrar('atualizacao', 'Dados salvos', 'Salvamento manual', 'atualizacao'); } },
  { key: 'Escape', desc: 'Fechar modal', acao: () => fecharModal() },
  { key: '/', desc: 'Mostrar todos os atalhos', acao: () => mostrarAtalhos() },
  { key: '?', desc: 'Mostrar ajuda', acao: () => mostrarAtalhos() }
];

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

export function abrirSpotlight() {
  const overlay = document.createElement('div');
  overlay.className = 'spotlight-overlay';
  overlay.innerHTML = `<div class="spotlight-box"><input class="spotlight-input" placeholder="Buscar obras, clientes, vendas..." autofocus><div class="spotlight-results"></div><div class="spotlight-footer"><span>⬆⬇ Navegar</span><span>⏎ Abrir</span><span>ESC Fechar</span></div></div>`;
  document.body.appendChild(overlay);
  const input = overlay.querySelector('.spotlight-input');
  const results = overlay.querySelector('.spotlight-results');
  let destaqueIdx = -1;

  function salvarHistorico(termo) {
    if (!termo) return;
    try {
      let hist = JSON.parse(localStorage.getItem('atelier_spotlight_hist') || '[]');
      hist = [termo, ...hist.filter(h => h !== termo)].slice(0, 5);
      localStorage.setItem('atelier_spotlight_hist', JSON.stringify(hist));
    } catch (e) {}
  }

  function atualizarDestaque() {
    results.querySelectorAll('.spotlight-item').forEach((el, i) => {
      el.classList.toggle('destaque', i === destaqueIdx);
      if (i === destaqueIdx) el.scrollIntoView({ block: 'nearest' });
    });
  }

  function navegarParaItem(el) {
    if (!el) return;
    const rota = el.dataset.rota;
    const payload = el.dataset.payload;
    overlay.remove();
    if (rota === 'catalogo' && payload) {
      salvarHistorico(input.value);
      router?.navegar('catalogo');
    } else if (rota) {
      salvarHistorico(input.value);
      router?.navegar(rota);
    }
  }

  function secao(titulo, icone) {
    return `<div class="sp-secao"><span>${icone}</span> ${titulo}</div>`;
  }

  const buscar = debounce((termo) => {
    destaqueIdx = -1;
    if (!termo) {
      try {
        const hist = JSON.parse(localStorage.getItem('atelier_spotlight_hist') || '[]');
        if (hist.length > 0) {
          results.innerHTML = secao('Recentes', '🕐') + hist.map(h => `<div class="spotlight-item sp-historico" data-termo="${h}"><span class="si-icone">🕐</span><span>${h}</span><span class="si-info">busca recente</span></div>`).join('');
          results.querySelectorAll('.sp-historico').forEach(el => el.addEventListener('click', () => { input.value = el.dataset.termo; buscar(el.dataset.termo); }));
          return;
        }
      } catch (e) {}
      results.innerHTML = '<div class="spotlight-item" style="color:var(--text-muted);justify-content:center;">Digite para buscar em todo o sistema...</div>';
      return;
    }
    const t = termo.toLowerCase();
    const obras = (dataStore?.listar('obras') || []).filter(o => (o.titulo || '').toLowerCase().includes(t) || (o.descricao || '').toLowerCase().includes(t) || (o.tecnica || '').toLowerCase().includes(t) || (o.serie || '').toLowerCase().includes(t)).slice(0, 5);
    const clientes = (dataStore?.listar('clientes') || []).filter(c => (c.nome || '').toLowerCase().includes(t) || (c.email || '').toLowerCase().includes(t)).slice(0, 5);
    const vendas = (dataStore?.listar('vendas') || []).filter(v => (v.numeroRecibo || '').toLowerCase().includes(t) || (v.clienteNome || '').toLowerCase().includes(t)).slice(0, 5);
    const contatos = (dataStore?.listar('contatosProfissionais') || []).filter(c => (c.nome || '').toLowerCase().includes(t) || (c.instituicao || '').toLowerCase().includes(t)).slice(0, 5);
    const encomendas = (dataStore?.listar('encomendas') || []).filter(e => (e.cliente || '').toLowerCase().includes(t) || (e.descricao || '').toLowerCase().includes(t)).slice(0, 5);
    const eventos = (dataStore?.listar('eventos') || []).filter(e => (e.nome || '').toLowerCase().includes(t)).slice(0, 5);

    let html = '';
    if (obras.length) { html += secao('Obras', '🖼️') + obras.map(o => `<div class="spotlight-item" data-rota="catalogo" data-payload="${o.id}"><span class="si-icone" style="background-image:url('${o.imagem || ''}');background-size:cover;width:28px;height:28px;border-radius:4px;"></span><span>${o.titulo}</span><span class="si-info">${o.tecnica || ''} · ${formatarMoeda(o.preco)}</span></div>`).join(''); }
    if (clientes.length) { html += secao('Clientes', '👤') + clientes.map(c => `<div class="spotlight-item" data-rota="clientes"><span class="si-icone">👤</span><span>${c.nome}</span><span class="si-info">${c.email || ''}</span></div>`).join(''); }
    if (vendas.length) { html += secao('Vendas', '💰') + vendas.map(v => `<div class="spotlight-item" data-rota="vendas"><span class="si-icone">💰</span><span>Recibo ${v.numeroRecibo || ''}</span><span class="si-info">${formatarMoeda(v.valorTotal || v.valor)}</span></div>`).join(''); }
    if (contatos.length) { html += secao('Contatos', '🤝') + contatos.map(c => `<div class="spotlight-item" data-rota="rede"><span class="si-icone">🤝</span><span>${c.nome}</span><span class="si-info">${c.instituicao || ''}</span></div>`).join(''); }
    if (encomendas.length) { html += secao('Encomendas', '📦') + encomendas.map(e => `<div class="spotlight-item" data-rota="encomendas"><span class="si-icone">📦</span><span>${e.cliente}</span><span class="si-info">${e.descricao ? e.descricao.slice(0, 40) : ''}</span></div>`).join(''); }
    if (eventos.length) { html += secao('Eventos', '🎪') + eventos.map(e => `<div class="spotlight-item" data-rota="exposicoes"><span class="si-icone">🎪</span><span>${e.nome}</span><span class="si-info">${e.tipo || ''}</span></div>`).join(''); }
    results.innerHTML = html || '<div class="spotlight-item" style="color:var(--text-muted);justify-content:center;">Nenhum resultado encontrado.</div>';
    results.querySelectorAll('.spotlight-item').forEach(el => { el.addEventListener('click', () => navegarParaItem(el)); });
  }, 150);

  input.addEventListener('input', () => buscar(input.value));
  input.addEventListener('keydown', (e) => {
    const itens = results.querySelectorAll('.spotlight-item:not(.sp-secao)');
    if (e.key === 'ArrowDown') { e.preventDefault(); destaqueIdx = Math.min(itens.length - 1, destaqueIdx + 1); atualizarDestaque(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); destaqueIdx = Math.max(-1, destaqueIdx - 1); atualizarDestaque(); }
    else if (e.key === 'Enter' && destaqueIdx >= 0 && itens[destaqueIdx]) { navegarParaItem(itens[destaqueIdx]); }
    else if (e.key === 'Enter' && itens.length === 1) { navegarParaItem(itens[0]); }
  });

  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  setTimeout(() => input.focus(), 50);
}

export function iniciarFab() {
  const fabMain = document.getElementById('fabMain');
  const fabSpeedial = document.getElementById('fabSpeedial');
  const fabBackdrop = document.getElementById('fabBackdrop');
  if (!fabMain) return;

  function fecharFab() {
    fabMain.classList.remove('ativo');
    fabSpeedial.classList.remove('visivel');
    fabBackdrop.classList.remove('visivel');
  }

  function toggleFab() {
    const aberto = fabMain.classList.toggle('ativo');
    fabSpeedial.classList.toggle('visivel', aberto);
    fabBackdrop.classList.toggle('visivel', aberto);
  }

  fabMain.addEventListener('click', toggleFab);
  fabBackdrop.addEventListener('click', fecharFab);

  const acoes = {
    obra: () => { router?.navegar('catalogo'); setTimeout(() => eventBus.emitir('abrir-nova-obra'), 200); },
    venda: () => { router?.navegar('vendas'); setTimeout(() => eventBus.emitir('abrir-nova-venda'), 200); },
    cliente: () => { router?.navegar('clientes'); setTimeout(() => eventBus.emitir('abrir-novo-cliente'), 200); },
    encomenda: () => { router?.navegar('encomendas'); },
    contato: () => { router?.navegar('rede'); },
    evento: () => { router?.navegar('exposicoes'); }
  };

  document.querySelectorAll('[data-fab]').forEach(btn => {
    btn.addEventListener('click', () => {
      fecharFab();
      const acao = btn.dataset.fab;
      if (acoes[acao]) acoes[acao]();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fabSpeedial?.classList.contains('visivel')) fecharFab();
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
  abrirModal(`<h3>⌨️ Atalhos de Teclado</h3><p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px;">Use estes atalhos para navegar rapidamente pelo sistema.</p>${itensPorCategoria}<div class="modal-acoes" style="margin-top:16px;"><button class="btn-secundario" id="btnCancelarModal">Fechar</button></div>`);
  document.getElementById('btnCancelarModal')?.addEventListener('click', fecharModal);
}

// Segurança
let _inatividadeTimer = null;
let _telaBloqueada = false;

export function iniciarMonitorInatividade() {
  if (!dataStore?.dados?.config?.autoLock || !dataStore?.dados?.config?.pin) return;
  const resetTimer = () => {
    if (_telaBloqueada) return;
    clearTimeout(_inatividadeTimer);
    _inatividadeTimer = setTimeout(() => bloquearTela(), 10 * 60 * 1000);
  };
  ['click', 'keydown', 'mousemove', 'touchstart'].forEach(ev => document.addEventListener(ev, resetTimer));
  resetTimer();
}

export function bloquearTela() {
  if (_telaBloqueada) return;
  _telaBloqueada = true;
  const pin = dataStore.dados.config.pin;
  if (!pin) return;
  let tentativas = 0;
  function mostrarPinModal() {
    let entrada = '';
    const render = () => {
      abrirModal(`<h3>🔒 Tela Bloqueada</h3><p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px;">Digite seu PIN de 4 dígitos para continuar</p><div class="pin-display">${'•'.repeat(entrada.length).padEnd(4, '_')}</div>${tentativas > 0 ? '<p style="color:#ef4444;font-size:0.8rem;">PIN incorreto. Tente novamente.</p>' : ''}<div class="pin-pad">${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(v => v === '' ? '<button disabled></button>' : `<button data-val="${v}">${v}</button>`).join('')}</div><div class="modal-acoes"><button class="btn-secundario" id="btnSairPin">Sair</button></div>`);
      document.querySelectorAll('.pin-pad button[data-val]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (btn.dataset.val === '⌫') { entrada = entrada.slice(0, -1); render(); return; }
          if (entrada.length >= 4) return;
          entrada += btn.dataset.val;
          if (entrada.length === 4) {
            if (entrada === pin) { _telaBloqueada = false; fecharModal(); mostrarToast('Bem-vindo de volta!'); iniciarMonitorInatividade(); }
            else { tentativas++; entrada = ''; render(); }
          } else { render(); }
        });
      });
      document.getElementById('btnSairPin')?.addEventListener('click', () => { fecharModal(); });
      document.getElementById('btnCancelarModal')?.addEventListener('click', fecharModal);
    };
    render();
  }
  mostrarPinModal();
}

// Confetti
export function dispararConfetti() {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const particles = Array.from({ length: 80 }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 200,
    y: canvas.height / 2,
    vx: (Math.random() - 0.5) * 8,
    vy: -Math.random() * 10 - 4,
    size: Math.random() * 6 + 3,
    color: ['#ff0','#f0f','#0ff','#f00','#0f0','#00f','#ffa500','#ff69b4'][Math.floor(Math.random() * 8)],
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 10,
    gravity: 0.2 + Math.random() * 0.1
  }));
  let frame = 0;
  const anim = () => {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.rotation += p.rotSpeed;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });
    if (frame < 90) requestAnimationFrame(anim);
    else canvas.remove();
  };
  anim();
}

// Observer para confetti em vendas
const _vendaObserver = new MutationObserver(() => {
  if (document.querySelector('.toast')?.textContent?.includes('Venda registrada')) {
    dispararConfetti();
  }
});
_vendaObserver.observe(document.getElementById('toast'), { childList: true, subtree: true, characterData: true });

// Dicas do dia
const dicasDiarias = [
  'Reserve 15 minutos ao final do dia para registrar seu progresso no Diário Criativo.',
  'Uma obra bem documentada valoriza 30% mais no mercado secundário.',
  'Clientes que recebem atualizações do processo criativo têm 2x mais chances de recomprar.',
  'Experimente a técnica dos 3 valores: luz, meia-tinta e sombra para dar volume.',
  'Mantenha seu catálogo sempre atualizado — você nunca sabe quando um comprador aparece.',
  'Use o Precificador para calcular o valor justo da sua hora de trabalho artístico.',
  'Tire fotos das suas obras com luz natural difusa para melhores resultados.',
  'O descanso é parte do processo criativo. Respeite seus limites.',
  'Analise suas estatísticas criativas todo mês para identificar padrões de produtividade.',
  'Uma boa relação com galeristas começa com um portfólio digital organizado.',
  'Documente cada etapa do processo — o "making of" é tão valioso quanto a obra final.',
  'Estabeleça metas realistas. 3 horas de pintura por dia é mais sustentável que 8.',
  'Participe de pelo menos 2 editais ou exposições por ano.',
  'Materiais de qualidade fazem diferença. Invista nos melhores pincéis que puder.',
  'Faça pausas a cada 50 minutos para evitar fadiga visual e manter a criatividade.',
  'Seu diário criativo é seu melhor instrumento de autoconhecimento artístico.',
  'Compartilhe seu processo nas redes — o público ama ver o "antes e depois".',
  'Uma paleta limitada (3-5 cores) força soluções criativas e harmoniosas.',
  'Artistas que diversificam técnicas tendem a ter carreiras mais longas.',
  'O networking não é sobre quantidade, mas qualidade das conexões.',
  'Recibos e certificados bem feitos transmitem profissionalismo e segurança.',
  'Revisite obras antigas periodicamente — sua evolução técnica vai te surpreender.',
  'Crie uma série temática anual. Colecionadores valorizam coesão de portfólio.',
  'Use o calendário do Diário para planejar seus ciclos criativos com antecedência.',
  'A luz do seu ateliê muda com as estações. Aproveite cada qualidade de luz.',
  'Faça um backup dos dados toda semana — seu registro criativo é precioso.',
  'O mercado de arte valoriza histórias. Cada obra tem uma — conte-a bem.',
  'Estude um mestre por mês. Incorpore uma técnica nova ao seu repertório.',
  'Clientes satisfeitos indicam. Invista no pós-venda e no relacionamento.',
  'A arte é um músculo: quanto mais você pratica, mais forte sua voz criativa fica.'
];

export function obterDicaDoDia() {
  const diaDoAno = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return dicasDiarias[diaDoAno % dicasDiarias.length];
}

// Tour
const tourPassos = [
  { alvo: '.sidebar', titulo: '🎨 Bem-vindo ao Atelier CRM!', desc: 'Este é seu hub criativo. Navegue entre os módulos pelo menu lateral.', pos: 'right' },
  { alvo: '#seletorTema', titulo: '🎭 Escolha seu Tema', desc: 'Personalize o visual com 5 temas.', pos: 'bottom' },
  { alvo: '#btnBackup', titulo: '💾 Backup Seguro', desc: 'Exporte seus dados periodicamente.', pos: 'bottom' },
  { alvo: '[data-rota="catalogo"]', titulo: '🖼️ Catálogo de Obras', desc: 'Cadastre, edite e gerencie seu portfólio.', pos: 'right' },
  { alvo: '[data-rota="vendas"]', titulo: '💰 Vendas e Recibos', desc: 'Registre vendas e gere recibos em PDF.', pos: 'right' },
  { alvo: '[data-rota="diario"]', titulo: '📖 Diário Criativo', desc: 'Registre seu processo diário.', pos: 'right' },
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
    tooltip.innerHTML = `<div class="tt-titulo">${passo.titulo}</div><div class="tt-desc">${passo.desc}</div><div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:8px;">${passoAtual + 1} de ${tourPassos.length}</div><div class="tt-acoes"><button class="tt-btn-skip" id="tourSkip">Pular</button>${passoAtual > 0 ? '<button class="tt-btn-prev" id="tourPrev">← Anterior</button>' : ''}<button class="tt-btn-next" id="tourNext">${isUltimo ? '✅ Finalizar' : 'Próximo →'}</button></div>`;
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

// Instâncias globais
const _dataStore = new DataStore();
const dataStore = new StoreBridge(_dataStore);
(window as any).dataStore = dataStore;
const themeEngine = new ThemeEngine(dataStore);
const router = new Router(dataStore);
const eventBus = new EventBus();
const activityLogger = new ActivityLogger();
const dashboardView = new DashboardView(dataStore, router);
const catalogoView = new CatalogoView(dataStore, router);
const pdfGenerator = new PDFGenerator(dataStore);
const clientesView = new ClientesView(dataStore, router);
const vendasView = new VendasView(dataStore, router, pdfGenerator);
const certificadosView = new CertificadosView(dataStore, router);
const referenciasView = new ReferenciasView(dataStore, router);
const galeriaVirtualView = new GaleriaVirtualView(dataStore, router);
const precificadorView = new PrecificadorView(dataStore, router);
const atelierView = new AtelierView(dataStore, router);
const diarioView = new DiarioView(dataStore, router);
const redeView = new RedeView(dataStore, router);
const portalView = new PortalView(dataStore, router);
const cloudSync = new CloudSync(dataStore);
const encomendasView = new EncomendasView(dataStore, router);
const exposicoesView = new ExposicoesView(dataStore, router);
const financeiroView = new FinanceiroView(dataStore, router);
const configuracoesView = new ConfiguracoesView(dataStore, router);
const exportImportView = new ExportImportView(dataStore, router);

// Event listeners
document.getElementById('viewPrincipal').addEventListener('click', (e) => {
  const botaoModal = e.target.closest('[data-abrir-modal]');
  if (botaoModal) { abrirModalNovoItem(botaoModal.dataset.abrirModal, dataStore, router); return; }
  if (e.target.id === 'btnAtalhoNovaObra') { eventBus.emitir('abrir-nova-obra'); return; }
  if (e.target.getAttribute('data-acao') === 'irCatalogo') { router.navegar('catalogo'); return; }
  if (e.target.id === 'btnAtalhoVenda') { eventBus.emitir('abrir-nova-venda'); return; }
  if (e.target.id === 'btnAtalhoRecibo') { eventBus.emitir('abrir-recibo-rapido'); return; }
});

document.getElementById('btnColapsar').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('colapsada');
});

document.getElementById('btnBackup').addEventListener('click', () => {
  dataStore.exportarBackup();
  mostrarToast('Backup exportado com sucesso!');
});

document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') fecharModal();
});

if (window.innerWidth <= 860) { document.getElementById('sidebar').classList.add('colapsada'); }

// Override mostrarToast com suporte a tipos
const _mostrarToastOriginal = window.mostrarToast;
window.mostrarToast = function(mensagem, tipo = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return _mostrarToastOriginal?.(mensagem);
  toast.textContent = mensagem;
  toast.className = 'toast ' + tipo;
  toast.classList.add('mostrar');
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => { toast.classList.remove('mostrar'); toast.className = 'toast'; }, 2800);
};

// Override Router.navegar para view transitions
const _navegarOriginal = Router.prototype.navegar;
Router.prototype.navegar = function(chave) {
  _navegarOriginal.call(this, chave);
  aplicarTransicaoView(this.container, chave);
};

// Service Worker
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js').catch(() => {}); }

// Init
themeEngine.inicializar();
router.inicializar();
setTimeout(() => iniciarMonitorInatividade(), 500);
setTimeout(() => cloudSync.iniciarAutoBackup(), 2000);
iniciarFab();
if (dataStore && !dataStore.dados.config.tourCompleted) { setTimeout(() => iniciarTour(), 1000); }

// Notification Center
(function() {
  const btnNotif = document.getElementById('btnNotificacoes');
  const panel = document.getElementById('notifPanel');
  const lista = document.getElementById('notifLista');
  const badge = document.getElementById('notifBadge');
  if (!btnNotif || !panel) return;

  function lerLidas() {
    try { return JSON.parse(localStorage.getItem('atelier-notif-lidas') || '[]'); } catch { return []; }
  }
  function salvarLidas(ids) { localStorage.setItem('atelier-notif-lidas', JSON.stringify(ids)); }
  function atualizarBadge() {
    const lidas = lerLidas();
    const atividades = activityLogger.obterRecentes(20);
    const naoLidas = atividades.filter(a => !lidas.includes(a.id)).length;
    if (naoLidas > 0) { badge.textContent = naoLidas > 99 ? '99+' : String(naoLidas); badge.style.display = 'flex'; }
    else { badge.style.display = 'none'; }
  }

  function renderizarNotif() {
    const lidas = lerLidas();
    const atividades = activityLogger.obterRecentes(20);
    if (atividades.length === 0) {
      lista.innerHTML = '<div class="notif-vazio">🔔 Nenhuma notificação ainda.</div>';
      return;
    }
    lista.innerHTML = atividades.map(a => `
      <div class="notif-item ${lidas.includes(a.id) ? '' : 'ni-nao-lida'}" data-id="${a.id}">
        <span class="ni-icone">${activityLogger.obterIcone(a.tipo)}</span>
        <div class="ni-conteudo">
          <div class="ni-titulo">${sanitizarHTML(a.titulo)}</div>
          <div class="ni-detalhes">${sanitizarHTML(a.detalhes || '')}</div>
          <div class="ni-tempo">${activityLogger.formatarTempo(new Date(a.timestamp))}</div>
        </div>
        <button class="ni-marcar" data-id="${a.id}" title="Marcar como lida">✓</button>
      </div>
    `).join('');
    lista.querySelectorAll('.ni-marcar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const lidas2 = lerLidas();
        if (!lidas2.includes(id)) { lidas2.push(id); salvarLidas(lidas2); }
        renderizarNotif();
        atualizarBadge();
      });
    });
  }

  btnNotif.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('visivel');
    if (panel.classList.contains('visivel')) renderizarNotif();
  });
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== btnNotif && !btnNotif.contains(e.target)) panel.classList.remove('visivel');
  });

  document.getElementById('notifMarcarLidas')?.addEventListener('click', () => {
    const atividades = activityLogger.obterRecentes(20);
    const todosIds = atividades.map(a => a.id);
    salvarLidas(todosIds);
    renderizarNotif();
    atualizarBadge();
  });
  document.getElementById('notifLimpar')?.addEventListener('click', () => {
    activityLogger.limpar();
    salvarLidas([]);
    renderizarNotif();
    atualizarBadge();
  });

  eventBus?.on('nova-atividade', () => { atualizarBadge(); });
  atualizarBadge();
})();

// Global drag-and-drop overlay
(function() {
  let overlay = document.getElementById('globalDropOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'globalDropOverlay';
    overlay.className = 'global-drop-overlay';
    overlay.innerHTML = '<div class="gdo-content"><div class="gdo-icon">📸</div><div class="gdo-text">Solte para adicionar imagens</div><div class="gdo-hint">JPG · PNG — Múltiplos arquivos</div></div>';
    document.body.appendChild(overlay);
  }
  let dropTimer = 0;
  document.addEventListener('dragenter', (e) => {
    if (!e.dataTransfer.types?.includes('Files')) return;
    clearTimeout(dropTimer);
    overlay.classList.add('gdo-visivel');
  });
  document.addEventListener('dragover', (e) => { if (e.dataTransfer.types?.includes('Files')) e.preventDefault(); });
  document.addEventListener('dragleave', (e) => {
    if (e.relatedTarget && overlay.contains(e.relatedTarget)) return;
    clearTimeout(dropTimer);
    dropTimer = setTimeout(() => overlay.classList.remove('gdo-visivel'), 100);
  });
  document.addEventListener('drop', (e) => {
    e.preventDefault();
    overlay.classList.remove('gdo-visivel');
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    const imagens = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (imagens.length === 0) { mostrarToast('⚠️ Apenas imagens (JPG/PNG) são suportadas.', 'erro'); return; }
    if (imagens.length === 1) {
      router?.navegar('catalogo');
      setTimeout(() => eventBus.emitir('abrir-nova-obra'), 300);
    } else {
      router?.navegar('catalogo');
      setTimeout(() => {
        if (catalogoView && typeof catalogoView.abrirImportacaoLote === 'function') {
          catalogoView.abrirImportacaoLote();
        }
      }, 400);
    }
  });
})();

const _observerOrig = MutationObserver;
const _mutationObs = new _observerOrig(() => { observarImagens(); });
_mutationObs.observe(document.getElementById('viewPrincipal'), { childList: true, subtree: true });

// Hash listener for portal / galeria virtual
(function() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#portal')) {
    setTimeout(() => router.navegar('portal'), 200);
  } else if (hash && hash.includes('galeria=virtual')) {
    setTimeout(() => {
      router.navegar('galeriaVirtual');
      if (hash.includes('tour=obras-disponiveis') && galeriaVirtualView) { setTimeout(() => galeriaVirtualView.iniciarTour(), 800); }
    }, 300);
  }
})();

// Exports for Jest tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DataStore,
    StoreBridge,
    pinia,
    obraStore,
    useObraStore,
    clienteStore,
    useClienteStore,
    vendaStore,
    useVendaStore,
    configStore,
    useConfigStore,
    EventBus,
    ThemeEngine,
    Router,
    DashboardView,
    CatalogoView,
    ClientesView,
    VendasView,
    CertificadosView,
    ReferenciasView,
    GaleriaVirtualView,
    PrecificadorView,
    AtelierView,
    RedeView,
    DiarioView,
    PortalView,
    CloudSync,
    EncomendasView,
    ExposicoesView,
    FinanceiroView,
    ConfiguracoesView,
    ExportImportView,
    ImageLightbox,
    abrirLightbox,
    imageLightbox,
    formatarMoeda,
    formatarData,
    classeStatus,
    rotuloStatus,
    classeStatusVenda,
    rotuloStatusVenda,
    sanitizarHTML,
    sanitizarURL,
    sanitizarRich,
    debounce,
    gerarImagemPlaceholder,
    calcularObrasPorMes,
    gerarGraficoSVG,
    capitalizarTexto,
    abrirModal,
    fecharModal,
    mostrarToast,
    renderizarDashboard,
    renderizarViewPlaceholder,
    PDFGenerator,
    gerarQRCodeDataUrl,
    observarImagens,
    aplicarTransicaoView,
    iniciarMonitorInatividade,
    bloquearTela,
    dispararConfetti,
    obterDicaDoDia,
    iniciarTour
  };
}
