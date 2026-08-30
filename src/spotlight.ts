// Spotlight — Busca global (Ctrl+K)

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
    } catch (e) { console.warn(e) }
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
      } catch (e) { console.warn(e) }
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
    if (obras.length) { html += secao('Obras', '<i class="fas fa-images"></i>') + obras.map(o => `<div class="spotlight-item" data-rota="catalogo" data-payload="${sanitizarHTML(o.id)}"><span class="si-icone" style="background-image:url('${sanitizarURL(o.imagem || '')}');background-size:cover;width:28px;height:28px;border-radius:4px;"></span><span>${sanitizarHTML(o.titulo)}</span><span class="si-info">${sanitizarHTML(o.tecnica || '')} · ${formatarMoeda(o.preco)}</span></div>`).join(''); }
    if (clientes.length) { html += secao('Clientes', '<i class="fas fa-user"></i>') + clientes.map(c => `<div class="spotlight-item" data-rota="clientes"><span class="si-icone"><i class="fas fa-user"></i></span><span>${sanitizarHTML(c.nome)}</span><span class="si-info">${sanitizarHTML(c.email || '')}</span></div>`).join(''); }
    if (vendas.length) { html += secao('Vendas', '<i class="fas fa-dollar-sign"></i>') + vendas.map(v => `<div class="spotlight-item" data-rota="vendas"><span class="si-icone"><i class="fas fa-dollar-sign"></i></span><span>Recibo ${sanitizarHTML(v.numeroRecibo || '')}</span><span class="si-info">${formatarMoeda(v.valorTotal || v.valor)}</span></div>`).join(''); }
    if (contatos.length) { html += secao('Contatos', '🤝') + contatos.map(c => `<div class="spotlight-item" data-rota="rede"><span class="si-icone">🤝</span><span>${sanitizarHTML(c.nome)}</span><span class="si-info">${sanitizarHTML(c.instituicao || '')}</span></div>`).join(''); }
    if (encomendas.length) { html += secao('Encomendas', '<i class="fas fa-box"></i>') + encomendas.map(e => `<div class="spotlight-item" data-rota="encomendas"><span class="si-icone"><i class="fas fa-box"></i></span><span>${sanitizarHTML(e.cliente || e.clienteNome || '')}</span><span class="si-info">${sanitizarHTML(e.descricao ? e.descricao.slice(0, 40) : '')}</span></div>`).join(''); }
    if (eventos.length) { html += secao('Eventos', '🎪') + eventos.map(e => `<div class="spotlight-item" data-rota="exposicoes"><span class="si-icone">🎪</span><span>${sanitizarHTML(e.nome)}</span><span class="si-info">${sanitizarHTML(e.tipo || '')}</span></div>`).join(''); }
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
