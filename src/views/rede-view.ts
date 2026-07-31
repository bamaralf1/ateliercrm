export class RedeView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.tabAtiva = 'contatos';
    this.filtroCategoria = ''; this.filtroEstagio = '';
    this.catLabels = { galerista: 'Galerista', curador: 'Curador', critico: 'Critico', artista: 'Artista', colecionador: 'Colecionador', fornecedor: 'Fornecedor' };
    this.catIcones = { galerista: '🏛️', curador: '📓', critico: '✍️', artista: '🎨', colecionador: '👤', fornecedor: '🏪' };
    this.estagios = { novo_contato: '🆕 Novo Contato', primeira_aproximacao: '🤝 Primeira Aproximacao', em_conversa: '💬 Em Conversa', parceria_ativa: '🤲 Parceria Ativa', colaboracao_consolidada: '🌟 Colaboracao Consolidada' };
    this.estagiosOrdem = Object.keys(this.estagios);
    this.tiposInteracao = { email: '📧 E-mail', ligacao: '📞 Ligacao', reuniao: '🤝 Reuniao', visita: '🏠 Visita', evento: '🎪 Evento' };
    this._d3Initiated = false;
  }
  get contatos() { return this.dataStore.listar('contatosProfissionais') || []; }
  get interacoes() { return this.dataStore.listar('interacoes') || []; }
  get eventos() { return this.dataStore.listar('eventos') || []; }
  get clientes() { return clienteStore().items; }

  render() {
    const tabs = ['contatos', 'pipeline', 'interacoes', 'eventos', 'mapa'];
    const tabLabels = { contatos: '📋 Contatos', pipeline: '🔞 Pipeline', interacoes: '📹 Interacoes', eventos: '🎪 Eventos', mapa: '🔺️ Mapa de Influencia' };
    const content = { contatos: () => this.renderContatos(), pipeline: () => this.renderPipeline(), interacoes: () => this.renderInteracoes(), eventos: () => this.renderEventos(), mapa: () => this.renderMapa() };
    return `<div><div class="rede-tabs">${tabs.map(t => `<button class="tab-btn ${t === this.tabAtiva ? 'ativo' : ''}" data-tab="${t}">${tabLabels[t]}</button>`).join('')}</div><div id="redeContent">${content[this.tabAtiva]()}</div></div>`;
  }

  // --- CONTATOS ---
  renderContatos() {
    const cats = Object.keys(this.catLabels);
    let filtrados = this.contatos;
    if (this.filtroCategoria) filtrados = filtrados.filter(c => c.categoria === this.filtroCategoria);
    if (this.filtroEstagio) filtrados = filtrados.filter(c => c.estagio === this.filtroEstagio);

    const hoje = new Date();
    return `
      <div class="rede-filtros">
        <select id="filtroCatRede"><option value="">📊 Todos os contatos</option>${cats.map(c => `<option value="${c}" ${this.filtroCategoria === c ? 'selected' : ''}>${this.catIcones[c]} ${this.catLabels[c]}</option>`).join('')}</select>
        <select id="filtroEstagioRede"><option value="">🔞 Todos os estagios</option>${this.estagiosOrdem.map(e => `<option value="${e}" ${this.filtroEstagio === e ? 'selected' : ''}>${this.estagios[e]}</option>`).join('')}</select>
        <button class="btn-primario" id="btnNovoContato" style="font-size:0.8rem;padding:6px 14px;">✨ Novo Contato</button>
        <span style="font-size:0.8rem;color:var(--text-muted);margin-left:auto;">${filtrados.length} contato(s)</span>
      </div>
      <div class="cont-grid">${filtrados.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum contato encontrado.</p>' : ''}${filtrados.map(c => this.renderCardContato(c, hoje)).join('')}</div>`;
  }

  renderCardContato(c, hoje) {
    const cat = c.categoria || 'outros';
    const dias = c.ultimoContato ? Math.floor((hoje - new Date(c.ultimoContato)) / 86400000) : null;
    const alerta = dias !== null && dias > 30 ? (dias > 90 ? 'urgente' : 'follow-up') : null;
    const alertaMsg = dias !== null && dias > 30 ? `⚠️ ${dias} dias sem contato` : '';
    return `
      <div class="cont-card" style="border-left-color:var(--accent)">
        ${c.vip ? '<span class="cont-vip">👑 VIP</span>' : ''}
        <div class="cont-nome">${this.catIcones[cat] || '📋'} ${c.nome || ''}</div>
        <span class="cont-cat-tag ${cat}">${this.catLabels[cat] || cat}</span>
        ${c.nivelRelacionamento ? `<span class="cont-estrelas" style="margin-left:6px;">${'★'.repeat(Math.min(5,Number(c.nivelRelacionamento))) }${'☆'.repeat(Math.max(0,5-Number(c.nivelRelacionamento)))}</span>` : ''}
        <div class="cont-inst">${c.instituicao || ''}${c.cargo ? ' · '+c.cargo : ''}</div>
        <div class="cont-contato">${c.contato || ''}${c.email ? ' · '+c.email : ''}${c.redes ? '<br>🖐 '+c.redes : ''}</div>
        ${c.comoConheceu ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">🤝 ${c.comoConheceu}</div>` : ''}
        ${c.notas ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📝 ${c.notas}</div>` : ''}
        ${c.estagio ? `<div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">${this.estagios[c.estagio] || c.estagio}</div>` : ''}
        ${alerta ? `<div class="cont-alerta ${alerta}">${alertaMsg}</div>` : ''}
        ${c.proximoPasso ? `<div class="cont-passos">🎯 ${c.proximoPasso}</div>` : ''}
        <div class="cont-acoes"><button data-acao="editarContato" data-id="${c.id}">✏️ Editar</button><button data-acao="interagirContato" data-id="${c.id}">💬 Interagir</button><button data-acao="excluirContato" data-id="${c.id}" style="color:#dc2626;" aria-label="Excluir contato">🗑️</button></div>
      </div>`;
  }

  // --- PIPELINE ---
  renderPipeline() {
    const contatos = this.contatos;
    const hoje = new Date();
    const contPorEstagio = {};
    this.estagiosOrdem.forEach(e => { contPorEstagio[e] = contatos.filter(c => c.estagio === e); });

    return `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span style="font-size:0.9rem;color:var(--text-muted);">Arraste os cards entre os estagios (use os botoes ◀ ▶)</span><span style="font-size:0.8rem;color:var(--text-muted);">${contatos.length} contato(s)</span></div>
      <div class="pipeline">${this.estagiosOrdem.map(e => `
        <div class="coluna-pipe" data-estagio="${e}">
          <div class="pipe-titulo"><span>${this.estagios[e]}</span><span>${contPorEstagio[e]?.length || 0}</span></div>
          ${(contPorEstagio[e] || []).map(c => {
            const dias = c.ultimoContato ? Math.floor((hoje - new Date(c.ultimoContato)) / 86400000) : null;
            return `<div class="pipe-card" data-id="${c.id}">
              <div class="pipe-nome">${this.catIcones[c.categoria] || '📋'} ${c.nome}</div>
              <div class="pipe-cat">${this.catLabels[c.categoria] || c.categoria}</div>
              ${dias !== null ? `<div class="pipe-dias">${dias > 30 ? '⚠️ '+dias+' dias' : '✅ '+dias+' dias'}</div>` : ''}
              <div style="display:flex;gap:4px;margin-top:6px;">
                <button data-acao="pipeMovEsq" data-id="${c.id}" style="font-size:0.7rem;padding:2px 6px;border:1px solid var(--border);background:var(--bg);cursor:pointer;" aria-label="Mover para esquerda">◀</button>
                <button data-acao="pipeMovDir" data-id="${c.id}" style="font-size:0.7rem;padding:2px 6px;border:1px solid var(--border);background:var(--bg);cursor:pointer;" aria-label="Mover para direita">▶</button>
              </div>
            </div>`;
          }).join('')}
        </div>`).join('')}</div>`;
  }

  moverPipeline(id, direcao) {
    const c = this.dataStore.buscarPorId('contatosProfissionais', id);
    if (!c) return;
    const idx = this.estagiosOrdem.indexOf(c.estagio || 'novo_contato');
    const novoIdx = Math.max(0, Math.min(this.estagiosOrdem.length - 1, idx + direcao));
    if (novoIdx !== idx) {
      this.dataStore.atualizar('contatosProfissionais', id, { estagio: this.estagiosOrdem[novoIdx] });
      this.rerenderizar();
    }
  }

  // --- INTERACOES ---
  renderInteracoes() {
    const contatos = this.contatos;
    const interacoes = this.interacoes;
    const selValue = this._selContatoInteracao || '';

    return `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <select class="sel-interacao-contato" id="selInteracaoContato">
          <option value="">— Todos os contatos —</option>
          ${contatos.map(c => `<option value="${c.id}" ${selValue === c.id ? 'selected' : ''}>${this.catIcones[c.categoria] || '📋'} ${c.nome}</option>`).join('')}
        </select>
        <button class="btn-primario" id="btnNovaInteracao" style="font-size:0.8rem;padding:6px 14px;">✨ Nova Interacao</button>
      </div>
      ${selValue ? this.renderTimelineContato(selValue) : '<p style="color:var(--text-muted);font-size:0.85rem;">Selecione um contato para ver o historico de interacoes.</p>'}`;
  }

  renderTimelineContato(contatoId) {
    const c = this.dataStore.buscarPorId('contatosProfissionais', contatoId);
    const inter = this.interacoes.filter(i => i.contatoId === contatoId).sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0));
    if (!c) return '<p style="color:var(--text-muted);">Contato nao encontrado.</p>';
    return `
      <div style="margin-bottom:12px;font-size:0.9rem;font-weight:600;color:var(--text);">${this.catIcones[c.categoria] || '📋'} ${c.nome} — ${inter.length} interacao(oes)</div>
      ${inter.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem;">Nenhuma interacao registrada.</p>' : `
      <div class="timeline">${inter.map(i => `
        <div class="tl-item">
          <div class="tl-tipo">${this.tiposInteracao[i.tipo] || i.tipo} · ${i.data || ''}</div>
          <div class="tl-resumo">${i.resumo || ''}</div>
          ${i.sentimento ? `<span class="tl-sentimento ${i.sentimento}">${i.sentimento === 'positivo' ? '😊' : (i.sentimento === 'neutro' ? '😐' : '😟')} ${i.sentimento}</span>` : ''}
          ${i.followUp ? `<span style="font-size:0.7rem;color:#92400e;margin-left:6px;">🔝 Follow-up: ${i.followUpNotas || 'pendente'}</span>` : ''}
          <div class="tl-data">${i.anexos && i.anexos.length > 0 ? '📎 '+i.anexos.length+' anexo(s)' : ''}</div>
        </div>`).join('')}</div>`}`;
  }

  // --- EVENTOS ---
  renderEventos() {
    const eventos = this.eventos;
    const eventosStatus = { pesquisando: '🔍 Pesquisando', inscrito: '📝 Inscrito', selecionado: '✅ Selecionado', participando: '🎯 Participando', finalizado: '🏁 Finalizado' };
    const tiposEvento = { bienal: 'Bienal', feira: 'Feira', mostra: 'Mostra', edital: 'Edital', premio: 'Premio' };

    return `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <button class="btn-primario" id="btnNovoEvento" style="font-size:0.8rem;padding:6px 14px;">✨ Novo Evento</button>
        <span style="font-size:0.8rem;color:var(--text-muted);">${eventos.length} evento(s)</span>
      </div>
      <div class="evt-grid">${eventos.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum evento cadastrado.</p>' : ''}${eventos.map(e => {
        const obras = (e.obrasEnviadas || []).map(oId => { const o = obraStore().items.find(o => o.id === oId); return o ? o.titulo : null; }).filter(Boolean);
        return `<div class="evt-card">
          <span class="evt-tipo-tag ${e.tipo || 'mostra'}">${tiposEvento[e.tipo] || e.tipo}</span>
          <div class="evt-nome" style="margin-top:4px;">${e.nome}</div>
          <div class="evt-status ${e.status || 'pesquisando'}">${eventosStatus[e.status] || e.status}</div>
          <div class="evt-info">${e.dataEvento ? '📅 '+e.dataEvento : ''}${e.dataInscricao ? ' · Inscricao: '+e.dataInscricao : ''}${e.investimento ? '<br>💰 R$ '+Number(e.investimento).toFixed(2) : ''}${e.retorno && Number(e.retorno) > 0 ? ' · Retorno: R$ '+Number(e.retorno).toFixed(2) : ''}</div>
          ${e.notas ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📝 ${e.notas}</div>` : ''}
          ${obras.length > 0 ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">🖼️ Obras: ${obras.join(', ')}</div>` : ''}
          ${e.documentacao && e.documentacao.length > 0 ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📞 Docs: ${e.documentacao.join(', ')}</div>` : ''}
          ${e.resultado ? `<div style="font-size:0.8rem;color:var(--text);margin-top:6px;">🏆 ${e.resultado}</div>` : ''}
          <div class="evt-acoes"><button data-acao="editarEvento" data-id="${e.id}">✏️ Editar</button><button data-acao="excluirEvento" data-id="${e.id}" style="color:#dc2626;" aria-label="Excluir evento">🗑️</button></div>
        </div>`;
      }).join('')}</div>`;
  }

  // --- MAPA DE INFLUENCIA (D3.js) ---
  renderMapa() {
    const contatos = this.contatos;
    if (contatos.length === 0) return '<p style="color:var(--text-muted);font-size:0.85rem;">Adicione contatos para ver o mapa.</p>';

    return `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-size:0.85rem;color:var(--text-muted);">Tamanho = nivel de relacionamento · Cores por categoria · Arraste nos</span>
        <button class="btn-primario" id="btnExportarRedePDF" style="font-size:0.8rem;padding:6px 14px;">📞 Exportar Relatorio PDF</button>
      </div>
      <div class="mapa-container" id="d3MapaContainer">
        <svg id="d3MapaSVG"></svg>
      </div>
      <div id="d3MapaHubs" style="margin-top:12px;font-size:0.85rem;color:var(--text-muted);"></div>`;
  }

  // --- EVENT BINDING ---
  aposRenderizar() {
    this.removerListeners();

    document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
      const h = () => { this.tabAtiva = btn.dataset.tab; this.rerenderizar(); };
      btn.addEventListener('click', h); this._bindCache['tab_'+btn.dataset.tab] = { el: btn, handler: h, type: 'click' };
    });

    const filtroCat = document.getElementById('filtroCatRede');
    if (filtroCat) { const h = () => { this.filtroCategoria = filtroCat.value; this.rerenderizar(); }; filtroCat.addEventListener('change', h); this._bindCache['filtroCatRede'] = { el: filtroCat, handler: h, type: 'change' }; }

    const filtroEst = document.getElementById('filtroEstagioRede');
    if (filtroEst) { const h = () => { this.filtroEstagio = filtroEst.value; this.rerenderizar(); }; filtroEst.addEventListener('change', h); this._bindCache['filtroEstagioRede'] = { el: filtroEst, handler: h, type: 'change' }; }

    document.getElementById('btnNovoContato')?.addEventListener('click', () => this.abrirFormContato());
    document.getElementById('btnNovaInteracao')?.addEventListener('click', () => this.abrirFormInteracao());
    document.getElementById('btnNovoEvento')?.addEventListener('click', () => this.abrirFormEvento());

    const selInt = document.getElementById('selInteracaoContato');
    if (selInt) { const h = () => { this._selContatoInteracao = selInt.value; this.rerenderizar(); }; selInt.addEventListener('change', h); this._bindCache['selInteracaoContato'] = { el: selInt, handler: h, type: 'change' }; }

    document.getElementById('btnExportarRedePDF')?.addEventListener('click', () => this.exportarRelatorioPDF());

    const container = document.getElementById('redeContent') || document.getElementById('viewPrincipal');
    if (container) {
      const h = (e) => {
        const btn = e.target.closest('[data-acao]'); if (!btn) return;
        const acao = btn.dataset.acao, id = btn.dataset.id;
        if (acao === 'editarContato') this.abrirFormContato(id);
        else if (acao === 'excluirContato') this.excluirContato(id);
        else if (acao === 'interagirContato') { this._selContatoInteracao = id; this.tabAtiva = 'interacoes'; this.rerenderizar(); setTimeout(() => this.abrirFormInteracao(id), 100); }
        else if (acao === 'pipeMovEsq') this.moverPipeline(id, -1);
        else if (acao === 'pipeMovDir') this.moverPipeline(id, 1);
        else if (acao === 'editarEvento') this.abrirFormEvento(id);
        else if (acao === 'excluirEvento') this.excluirEvento(id);
      };
      container.addEventListener('click', h); this._bindCache['delegatedRede'] = { el: container, handler: h, type: 'click' };
    }

    // Iniciar D3 map if tab is mapa
    if (this.tabAtiva === 'mapa' && this.contatos.length > 0) {
      const mapaContainer = document.getElementById('d3MapaContainer');
      if (typeof d3 === 'undefined') {
        if (mapaContainer) mapaContainer.innerHTML = '<div class="skeleton skeleton-quadro" style="height:400px"></div>';
        carregarD3().then(() => { if (mapaContainer) mapaContainer.innerHTML = '<svg id="d3MapaSVG"></svg>'; this.iniciarMapaD3(); }).catch(() => {});
      } else {
        setTimeout(() => this.iniciarMapaD3(), 50);
      }
    }

    this.verificarLembretes();
  }

  // --- D3.js Mapa ---
  iniciarMapaD3() {
    if (typeof d3 === 'undefined') return;

    const container = document.getElementById('d3MapaContainer');
    const svg = document.getElementById('d3MapaSVG');
    const hubsDiv = document.getElementById('d3MapaHubs');
    if (!container || !svg) return;

    const contatos = this.contatos;
    const cores = { galerista: '#3b82f6', curador: '#10b981', critico: '#f59e0b', artista: '#6366f1', colecionador: '#ec4899', fornecedor: '#0ea5e9' };
    const raioMin = 10, raioMax = 35;

    // Build nodes and edges
    const nodes = contatos.map(c => ({
      ...c,
      r: raioMin + ((c.nivelRelacionamento || 1) / 5) * (raioMax - raioMin)
    }));

    const links = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        if (a.instituicao && b.instituicao && a.instituicao === b.instituicao) {
          links.push({ source: i, target: j, strength: 0.3 });
        } else if (a.comoConheceu && b.comoConheceu && (
          a.comoConheceu.toLowerCase().includes((b.nome || '').toLowerCase().slice(0, 5)) ||
          b.comoConheceu.toLowerCase().includes((a.nome || '').toLowerCase().slice(0, 5))
        )) {
          links.push({ source: i, target: j, strength: 0.2 });
        }
      }
    }

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 400;

    const d3svg = d3.select(svg)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('width', '100%')
      .style('height', '100%');

    d3svg.selectAll('*').remove();

    // Zoom behavior
    const g = d3svg.append('g');
    const zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    d3svg.call(zoom);

    // Force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d, i) => i).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(d => d.r + 10));

    // Links (edges)
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', 'var(--border)')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4,4');

    // Nodes (circles + labels)
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    node.append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => cores[d.categoria] || '#6b7280')
      .attr('opacity', 0.8)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    node.append('text')
      .text(d => (d.nome || '?').slice(0, 2))
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#fff')
      .attr('font-size', d => d.r > 20 ? 9 : 6)
      .attr('font-weight', '600')
      .style('pointer-events', 'none');

    node.append('text')
      .text(d => (d.nome || '').length > 18 ? (d.nome || '').slice(0, 16) + '...' : (d.nome || ''))
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.r + 14)
      .attr('fill', 'var(--text-muted)')
      .attr('font-size', 9)
      .style('pointer-events', 'none');

    // Click to show interaction timeline
    node.on('click', (event, d) => {
      if (d.id) {
        this._selContatoInteracao = d.id;
        this.tabAtiva = 'interacoes';
        this.rerenderizar();
      }
    });

    // Tooltip on hover
    node.append('title')
      .text(d => `${d.nome || 'Sem nome'}\n${this.catLabels[d.categoria] || d.categoria || ''}${d.instituicao ? '\n' + d.instituicao : ''}${d.nivelRelacionamento ? '\nRelacionamento: ' + '★'.repeat(d.nivelRelacionamento) : ''}`);

    // Simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Hubs calculation after simulation settles
    setTimeout(() => {
      const hubCounts = {};
      links.forEach(l => {
        const srcId = typeof l.source === 'object' ? l.source.id || l.source.nome : null;
        const tgtId = typeof l.target === 'object' ? l.target.id || l.target.nome : null;
        if (srcId) hubCounts[srcId] = (hubCounts[srcId] || 0) + 1;
        if (tgtId) hubCounts[tgtId] = (hubCounts[tgtId] || 0) + 1;
      });
      const hubs = nodes
        .filter(n => hubCounts[n.id || n.nome] > 0)
        .sort((a, b) => (hubCounts[b.id || b.nome] || 0) - (hubCounts[a.id || a.nome] || 0))
        .slice(0, 3)
        .map(n => `<strong>${n.nome}</strong>`)
        .join(', ');
      if (hubsDiv) hubsDiv.innerHTML = hubs ? `💡 Contatos que mais conectam (hubs): ${hubs}` : '💡 Nenhum hub identificado.';
    }, 2000);
  }

  // --- CRUD Contato ---
  abrirFormContato(id = null) {
    const c = id ? this.dataStore.buscarPorId('contatosProfissionais', id) : null;
    const cats = Object.keys(this.catLabels);
    const catOpts = cats.map(cat => `<option value="${cat}" ${c && c.categoria === cat ? 'selected' : ''}>${this.catIcones[cat]} ${this.catLabels[cat]}</option>`).join('');
    const estOpts = this.estagiosOrdem.map(e => `<option value="${e}" ${c && c.estagio === e ? 'selected' : ''}>${this.estagios[e]}</option>`).join('');

    abrirModal(`<h3>${c ? '✏️ Editar' : '✨ Novo'} Contato Profissional</h3>
      <form id="formModal" style="display:grid;gap:10px;"><div class="modal-form-grid">
        <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Nome *</label><input type="text" id="fContNome" value="${c ? c.nome||'' : ''}" required aria-label="Nome" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Categoria</label><select id="fContCat" aria-label="Categoria" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;">${catOpts}</select></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Estagio</label><select id="fContEstagio" aria-label="Estágio" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;">${estOpts}</select></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Instituicao</label><input type="text" id="fContInst" value="${c ? c.instituicao||'' : ''}" aria-label="Instituição" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Cargo</label><input type="text" id="fContCargo" value="${c ? c.cargo||'' : ''}" aria-label="Cargo" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Contato</label><input type="text" id="fContTel" value="${c ? c.contato||'' : ''}" aria-label="Contato" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">E-mail</label><input type="email" id="fContEmail" value="${c ? c.email||'' : ''}" aria-label="E-mail" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Redes sociais</label><input type="text" id="fContRedes" value="${c ? c.redes||'' : ''}" aria-label="Redes sociais" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Relacionamento (1-5)</label><input type="number" id="fContNivel" value="${c ? c.nivelRelacionamento||0 : 0}" min="1" max="5" aria-label="Relacionamento" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Como conheceu</label><input type="text" id="fContConheceu" value="${c ? c.comoConheceu||'' : ''}" aria-label="Como conheceu" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Ultimo contato</label><input type="date" id="fContUltimo" value="${c ? c.ultimoContato||'' : ''}" aria-label="Último contato" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Proximo passo</label><input type="text" id="fContPasso" value="${c ? c.proximoPasso||'' : ''}" aria-label="Próximo passo" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div class="campo-full"><label><input type="checkbox" id="fContVip" ${c && c.vip ? 'checked' : ''} aria-label="Contato VIP"> 👑 Contato VIP (colecionador)</label></div>
        <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Notas</label><textarea id="fContNotas" aria-label="Notas" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;min-height:50px;">${c ? c.notas||'' : ''}</textarea></div>
      </div><div class="modal-acoes"><button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button><button type="submit" class="btn-primario">Salvar</button></div></form>`);

    document.getElementById('btnCancelarModal').addEventListener('click', fecharModal);
    document.getElementById('formModal').addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('fContNome').value.trim(); if (!nome) { mostrarToast('Nome obrigatorio.', 'aviso'); return; }
      const dados = { nome, categoria: document.getElementById('fContCat').value, estagio: document.getElementById('fContEstagio').value, instituicao: document.getElementById('fContInst').value.trim(), cargo: document.getElementById('fContCargo').value.trim(), contato: document.getElementById('fContTel').value.trim(), email: document.getElementById('fContEmail').value.trim(), redes: document.getElementById('fContRedes').value.trim(), nivelRelacionamento: Number(document.getElementById('fContNivel').value) || 0, comoConheceu: document.getElementById('fContConheceu').value.trim(), ultimoContato: document.getElementById('fContUltimo').value, proximoPasso: document.getElementById('fContPasso').value.trim(), vip: document.getElementById('fContVip').checked, notas: document.getElementById('fContNotas').value.trim() };
      if (c) { this.dataStore.atualizar('contatosProfissionais', id, dados); mostrarToast('Contato atualizado!', 'sucesso'); }
      else { this.dataStore.adicionar('contatosProfissionais', dados); mostrarToast('Contato adicionado!', 'sucesso'); }
      fecharModal(); this.rerenderizar();
    });
  }

  async excluirContato(id) { if (!await confirmarAcao('Excluir este contato?')) return; const item = this.dataStore.buscarPorId('contatosProfissionais', id); this.dataStore.remover('contatosProfissionais', id); const ds = this.dataStore; mostrarToastComDesfazer('Contato excluido.', () => { ds.dados.contatosProfissionais.push(item); ds.salvar(); }); this.rerenderizar(); }

  // --- CRUD Interacao ---
  abrirFormInteracao(contatoId = null) {
    const contatos = this.contatos;
    const selId = contatoId || this._selContatoInteracao || '';
    const tipoOpts = Object.entries(this.tiposInteracao).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');

    abrirModal(`<h3>✨ Nova Interacao</h3>
      <form id="formModal"><div class="campo-form"><label>Contato</label><select id="fIntContato" aria-label="Contato">${contatos.map(c => `<option value="${c.id}" ${c.id === selId ? 'selected' : ''}>${this.catIcones[c.categoria]||'📋'} ${c.nome}</option>`).join('')}</select></div>
      <div class="campo-form"><label>Tipo</label><select id="fIntTipo" aria-label="Tipo">${tipoOpts}</select></div>
      <div class="campo-form"><label>Data</label><input type="date" id="fIntData" aria-label="Data" value="${new Date().toISOString().slice(0,10)}"></div>
      <div class="campo-form"><label>Resumo</label><textarea id="fIntResumo" aria-label="Resumo" placeholder="Descreva a interacao..."></textarea></div>
      <div class="campo-form"><label>Sentimento</label><select id="fIntSentimento" aria-label="Sentimento"><option value="positivo">😊 Positivo</option><option value="neutro">😐 Neutro</option><option value="negativo">😟 Negativo</option></select></div>
      <div class="campo-form"><label><input type="checkbox" id="fIntFollowUp" aria-label="Necessita follow-up"> 🔝 Necessita follow-up</label></div>
      <div class="campo-form" id="divFollowUpNotas" style="display:none;"><label>Notas do follow-up</label><textarea id="fIntFollowNotas" aria-label="Notas do follow-up" placeholder="O que fazer?"></textarea></div>
      <div class="modal-acoes"><button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button><button type="submit" class="btn-primario">Salvar</button></div></form>`);

    document.getElementById('fIntFollowUp')?.addEventListener('change', () => { document.getElementById('divFollowUpNotas').style.display = document.getElementById('fIntFollowUp').checked ? 'block' : 'none'; });
    document.getElementById('btnCancelarModal').addEventListener('click', fecharModal);
    document.getElementById('formModal').addEventListener('submit', (e) => {
      e.preventDefault();
      this.dataStore.adicionar('interacoes', { contatoId: document.getElementById('fIntContato').value, tipo: document.getElementById('fIntTipo').value, data: document.getElementById('fIntData').value, resumo: document.getElementById('fIntResumo').value.trim(), sentimento: document.getElementById('fIntSentimento').value, followUp: document.getElementById('fIntFollowUp').checked, followUpNotas: document.getElementById('fIntFollowNotas').value.trim(), anexos: [] });
      this.dataStore.atualizar('contatosProfissionais', document.getElementById('fIntContato').value, { ultimoContato: document.getElementById('fIntData').value });
      fecharModal(); mostrarToast('Interacao registrada!', 'sucesso'); this.rerenderizar();
      this.solicitarNotificacao('Interacao registrada', 'Nao se esqueca do follow-up!');
    });
  }

  // --- CRUD Evento ---
  abrirFormEvento(id = null) {
    const e = id ? this.dataStore.buscarPorId('eventos', id) : null;
    const statusOpts = ['pesquisando','inscrito','selecionado','participando','finalizado'].map(s => `<option value="${s}" ${e && e.status === s ? 'selected' : ''}>${s}</option>`).join('');
    const tipoOpts = ['bienal','feira','mostra','edital','premio'].map(t => `<option value="${t}" ${e && e.tipo === t ? 'selected' : ''}>${t}</option>`).join('');
    const obras = this.obras || obraStore().items;
    const obraOpts = obras.map(o => `<option value="${o.id}">${o.titulo || 'Sem titulo'}</option>`).join('');

    abrirModal(`<h3>${e ? '✏️ Editar' : '✨ Novo'} Evento</h3>
      <form id="formModal"><div class="modal-form-grid">
        <div class="campo-full"><input type="text" id="fEvtNome" value="${e ? e.nome||'' : ''}" required aria-label="Nome do evento" placeholder="Nome do evento" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><select id="fEvtTipo" aria-label="Tipo do evento">${tipoOpts}</select></div>
        <div><select id="fEvtStatus" aria-label="Status do evento">${statusOpts}</select></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Inscricao</label><input type="date" id="fEvtDataIns" value="${e ? e.dataInscricao||'' : ''}" aria-label="Data de inscrição" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Evento</label><input type="date" id="fEvtDataEvt" value="${e ? e.dataEvento||'' : ''}" aria-label="Data do evento" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Investimento (R$)</label><input type="number" id="fEvtInvest" value="${e ? e.investimento||0 : 0}" aria-label="Investimento" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Retorno (R$)</label><input type="number" id="fEvtRetorno" value="${e ? e.retorno||0 : 0}" aria-label="Retorno" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Resultado</label><input type="text" id="fEvtResultado" value="${e ? e.resultado||'' : ''}" aria-label="Resultado" placeholder="Ex.: Premiado, selecionado..." style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Documentacao</label><input type="text" id="fEvtDocs" value="${e && e.documentacao ? e.documentacao.join(', ') : ''}" aria-label="Documentação" placeholder="docs separados por virgula" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Obras enviadas</label><select multiple id="fEvtObras" aria-label="Obras enviadas" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;min-height:60px;">${obraOpts}</select></div>
        <div class="campo-full"><textarea id="fEvtNotas" aria-label="Notas" placeholder="Notas..." style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;min-height:50px;">${e ? e.notas||'' : ''}</textarea></div>
      </div><div class="modal-acoes"><button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button><button type="submit" class="btn-primario">Salvar</button></div></form>`);

    document.getElementById('btnCancelarModal').addEventListener('click', fecharModal);
    document.getElementById('formModal').addEventListener('submit', (e2) => {
      e2.preventDefault();
      const sel = document.getElementById('fEvtObras');
      const obrasSel = sel ? Array.from(sel.selectedOptions).map(o => o.value) : [];
      const docs = document.getElementById('fEvtDocs').value.split(',').map(s => s.trim()).filter(Boolean);
      const dados = { nome: document.getElementById('fEvtNome').value.trim(), tipo: document.getElementById('fEvtTipo').value, status: document.getElementById('fEvtStatus').value, dataInscricao: document.getElementById('fEvtDataIns').value, dataEvento: document.getElementById('fEvtDataEvt').value, investimento: Number(document.getElementById('fEvtInvest').value) || 0, retorno: Number(document.getElementById('fEvtRetorno').value) || 0, resultado: document.getElementById('fEvtResultado').value.trim(), documentacao: docs, obrasEnviadas: obrasSel, notas: document.getElementById('fEvtNotas').value.trim() };
      if (!dados.nome) { mostrarToast('Nome obrigatorio.', 'aviso'); return; }
      if (e) { this.dataStore.atualizar('eventos', id, dados); mostrarToast('Evento atualizado!', 'sucesso'); }
      else { this.dataStore.adicionar('eventos', dados); mostrarToast('Evento adicionado!', 'sucesso'); }
      fecharModal(); this.rerenderizar();
    });
  }

  async excluirEvento(id) { if (!await confirmarAcao('Excluir este evento?')) return; const item = this.dataStore.buscarPorId('eventos', id); this.dataStore.remover('eventos', id); const ds = this.dataStore; mostrarToastComDesfazer('Evento excluido.', () => { ds.dados.eventos.push(item); ds.salvar(); }); this.rerenderizar(); }

  // --- LEMBRETES ---
  verificarLembretes() {
    const hoje = new Date();
    const contatos = this.contatos;
    const pendentes = [];
    contatos.forEach(c => {
      if (!c.ultimoContato) return;
      const dias = Math.floor((hoje - new Date(c.ultimoContato)) / 86400000);
      if (dias > 60) pendentes.push({ nome: c.nome, dias, passo: c.proximoPasso || 'revisar relacionamento' });
    });
    if (pendentes.length > 0 && 'Notification' in window && Notification.permission === 'granted') {
      pendentes.slice(0, 3).forEach(p => {
        try { new Notification('🔝 Rede Profissional', { body: `Voce nao contata ${p.nome} ha ${p.dias} dias. Sugestao: ${p.passo}` }); } catch (e) { console.warn(e) }
      });
    }
  }

  solicitarNotificacao(titulo, corpo) {
    if (!('Notification' in window) || Notification.permission === 'denied') return;
    if (Notification.permission === 'granted') { try { new Notification(titulo, { body: corpo }); } catch (e) { console.warn(e) } }
    else { Notification.requestPermission(); }
  }

  // --- PDF ---
  exportarRelatorioPDF() {
    if ((typeof window.jspdf === 'undefined' && typeof jspdf === 'undefined') || !window.jspdf?.jsPDF) { mostrarToast('jsPDF nao carregado.', 'erro'); return; }
    mostrarLoading('Gerando relatorio de networking...');
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const contatos = this.contatos; const eventos = this.eventos;
    const margem = 20; let y = 20; const larg = 170;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.text('Relatorio de Networking', margem, y); y += 7;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, margem, y); y += 5;
    doc.setDrawColor(200); doc.line(margem, y, margem+larg, y); y += 7;

    doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.text('Contatos ('+contatos.length+')', margem, y); y += 6;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
    contatos.forEach(c => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`${c.nome || ''} — ${c.instituicao || ''} (${c.categoria || ''}) ${c.nivelRelacionamento ? '★'.repeat(c.nivelRelacionamento) : ''}`, margem, y); y += 4;
      if (c.proximoPasso) { doc.text(`  → Proximo passo: ${c.proximoPasso}`, margem+4, y); y += 4; }
    });
    y += 5; doc.setDrawColor(200); doc.line(margem, y, margem+larg, y); y += 7;

    doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.text('Eventos ('+eventos.length+')', margem, y); y += 6;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
    eventos.forEach(e => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`${e.nome || ''} — ${e.tipo || ''} (${e.status || ''}) ${e.dataEvento ? '· '+e.dataEvento : ''}`, margem, y); y += 4;
    });

    doc.save('relatorio-networking.pdf');
    esconderLoading();
    mostrarToast('Relatorio exportado em PDF!', 'sucesso');
  }

}