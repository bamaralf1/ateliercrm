export class VendasView extends BaseView {
  constructor(dataStore, router, pdfGenerator) {
    super(dataStore, router);
    this.pdfGenerator = pdfGenerator; // ===== Integração com o Gerador de PDF =====
    this.filtros = { cliente: '', status: '', dataInicio: '', dataFim: '' };
    this.selecionados = new Set();
    this._escutarEvento('abrir-nova-venda', () => this.abrirFormulario());
    this._escutarEvento('abrir-recibo-rapido', () => this.abrirEscolhaRapida());
  }

  // Aplica filtros de cliente, status e período, ordenando por data mais recente
  vendasFiltradas() {
    const f = this.filtros;
    let vendas = vendaStore().items;
    if (f.cliente) vendas = vendas.filter(v => v.clienteId === f.cliente);
    if (f.status) vendas = vendas.filter(v => classeStatusVenda(v.status) === classeStatusVenda(f.status));
    if (f.dataInicio) vendas = vendas.filter(v => new Date(v.data) >= new Date(f.dataInicio));
    if (f.dataFim) vendas = vendas.filter(v => new Date(v.data) <= new Date(f.dataFim));
    return [...vendas].sort((a, b) => new Date(b.data) - new Date(a.data));
  }

  render() {
    const vendas = this.vendasFiltradas();
    // ===== Integração com Catálogo e Clientes: lê as coleção compartilhadas do DataStore =====
    const obras = obraStore().items;
    const clientes = clienteStore().items;
    const statusPossiveis = ['negociação', 'aprovada', 'paga', 'entregue'];

    const linhas = vendas.map(v => {
      const obra = obras.find(o => o.id === v.obraId);
      const cliente = clientes.find(c => c.id === v.clienteId);
      const comissaoPct = Number(v.comissaoPct) || 0;
      const liquido = comissaoPct > 0 ? Number(v.precoFinal) * (1 - comissaoPct / 100) : null;
      return `
        <tr class="${this.selecionados.has(v.id) ? 'linha-selecionada' : ''}">
          <td onclick="event.stopPropagation()">
            <input type="checkbox" class="checkbox-item-vend" aria-label="Selecionar venda" data-id="${v.id}" ${this.selecionados.has(v.id) ? 'checked' : ''}>
          </td>
          <td>${obra ? obra.titulo : (v.obraTitulo ? v.obraTitulo : '<span style="color:var(--text-muted)">Obra removida</span>')}</td>
          <td>${cliente ? cliente.nome : (v.clienteNome ? v.clienteNome : '-')}</td>
          <td>
            <div style="font-weight:600;font-variant-numeric:tabular-nums;">${formatarMoeda(v.precoFinal)}</div>
            ${liquido !== null ? `<div style="font-size:0.7rem;color:var(--text-muted);">líquido ${formatarMoeda(liquido)}${v.comissaoNome ? ' · ' + sanitizarHTML(v.comissaoNome) : ''}</div>` : ''}
          </td>
          <td>${formatarData(v.data)}</td>
          <td>${capitalizarTexto(v.formaPagamento)}</td>
          <td>
            <select class="select-status-venda" data-status-venda="${v.id}">
              ${statusPossiveis.map(s => `<option value="${s}" ${classeStatusVenda(v.status) === classeStatusVenda(s) ? 'selected' : ''}>${rotuloStatusVenda(s)}</option>`).join('')}
            </select>
          </td>
          <td class="acoes-linha-tabela">
            <button class="btn-icone-tabela" data-gerar-recibo="${v.id}"><i data-lucide="file-text"></i> Recibo</button>
            <button class="btn-icone-tabela" data-gerar-proposta="${v.id}"><i data-lucide="pencil"></i> Proposta</button>
            <button class="btn-icone-tabela" data-cancelar-venda="${v.id}" title="Cancelar venda" aria-label="Cancelar venda"><i data-lucide="x" aria-hidden="true"></i></button>
          </td>
        </tr>
      `;
    }).join('');

    const tabela = vendas.length ? `
      <div class="tabela-wrapper">
        <table>
          <caption class="sr-only">Lista de vendas</caption>
          <thead><tr><th style="width:36px;"></th><th>Obra</th><th>Cliente</th><th>Valor</th><th>Data</th><th>Pagamento</th><th>Status</th><th></th></tr></thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>
    ` : `
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio"><i data-lucide="dollar-sign"></i></div><p>Nenhuma venda encontrada com os filtros atuais.</p></div>
      </div>
    `;

    const totalVendas = vendas.reduce((s, v) => s + Number(v.precoFinal || 0), 0);
    const statusCount = {};
    vendas.forEach(v => { const k = rotuloStatusVenda(v.status); statusCount[k] = (statusCount[k] || 0) + 1; });
    const statusSummary = Object.entries(statusCount).map(([k, v]) => `<span class="chip-filtro" style="font-size:0.72rem;padding:2px 8px;cursor:default;">${k}: ${v}</span>`).join(' ');

    // KPIs premium (V17)
    const hoje = new Date();
    const mes = hoje.getMonth(); const ano = hoje.getFullYear();
    const vendasMes = vendaStore().items.filter(v => { const d = new Date(v.data || v.dataVenda || v.criadoEm); return d.getMonth() === mes && d.getFullYear() === ano; });
    const receitaMes = vendasMes.reduce((s, v) => s + Number(v.precoFinal || 0), 0);
    const aReceber = vendaStore().items.filter(v => v.status === 'negociação' || v.status === 'aprovada').reduce((s, v) => s + Number(v.precoFinal || 0), 0);
    const ticketMedio = totalVendas > 0 ? totalVendas / Math.max(1, vendas.length) : 0;
    const liquidoTotal = totalVendas - vendaStore().items.reduce((s, v) => s + (Number(v.precoFinal || 0) * (Number(v.comissaoPct) || 0) / 100), 0);

    const kpis = `
      <div class="kpi-grid cert-kpis stagger-in">
        <div class="kpi-card"><div class="kpi-icone"><i data-lucide="bar-chart-3"></i></div><div class="kpi-conteudo"><div class="kpi-rotulo">Faturamento no mês</div><div class="kpi-valor">${formatarMoeda(receitaMes)}</div><div class="kpi-sub">${vendasMes.length} venda${vendasMes.length === 1 ? '' : 's'}</div></div></div>
        <div class="kpi-card" style="--kpi-cor:${aReceber > 0 ? '#d97706' : '#16a34a'}"><div class="kpi-icone"><i data-lucide="clock"></i></div><div class="kpi-conteudo"><div class="kpi-rotulo">A receber</div><div class="kpi-valor">${formatarMoeda(aReceber)}</div><div class="kpi-sub">negociação + aprovada</div></div></div>
        <div class="kpi-card"><div class="kpi-icone"><i data-lucide="receipt"></i></div><div class="kpi-conteudo"><div class="kpi-rotulo">Ticket médio</div><div class="kpi-valor">${formatarMoeda(ticketMedio)}</div><div class="kpi-sub">${vendas.length} venda${vendas.length === 1 ? '' : 's'} no filtro</div></div></div>
        <div class="kpi-card"><div class="kpi-icone"><i data-lucide="piggy-bank"></i></div><div class="kpi-conteudo"><div class="kpi-rotulo">Líquido (sem comissões)</div><div class="kpi-valor">${formatarMoeda(liquidoTotal)}</div><div class="kpi-sub">comissões: ${formatarMoeda(totalVendas - liquidoTotal)}</div></div></div>
      </div>`;

    return `
      <div class="view-cabecalho">
        <div>
          <h2><i data-lucide="handshake"></i> Vendas</h2>
          <p class="subtitulo">${vendas.length} venda${vendas.length === 1 ? '' : 's'} · ${formatarMoeda(totalVendas)} em negócios</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAllVend" aria-label="Selecionar todos" ${this.selecionados.size === vendas.length && vendas.length > 0 ? 'checked' : ''}>
            <label for="selectAllVend">Todos</label>
          </div>
          <button class="btn-gradient" id="btnNovaVenda">✚ Nova Venda</button>
        </div>
      </div>
      ${kpis}
      ${vendas.length > 0 ? `<div class="vendas-summary">${statusSummary}</div>` : ''}
      ${this.selecionados.size > 0 ? `
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} venda${this.selecionados.size === 1 ? '' : 's'} selecionada${this.selecionados.size === 1 ? '' : 's'}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkExportVend"><i data-lucide="file-text"></i> Exportar</button>
          <button class="btn-secundario btn-danger" id="bulkCancelarVend">✕ Cancelar</button>
        </div>
      </div>` : ''}
      <div class="catalogo-filtros">
        <div class="campo-filtro">
          <label>Cliente</label>
          <select id="filtroVendaCliente" aria-label="Cliente">
            <option value="">Todos</option>
            ${clientes.map(c => `<option value="${c.id}" ${this.filtros.cliente === c.id ? 'selected' : ''}>${c.nome}</option>`).join('')}
          </select>
        </div>
        <div class="campo-filtro">
          <label>Status</label>
          <select id="filtroVendaStatus" aria-label="Status">
            <option value="">Todos</option>
            ${statusPossiveis.map(s => `<option value="${s}" ${this.filtros.status === s ? 'selected' : ''}>${rotuloStatusVenda(s)}</option>`).join('')}
          </select>
        </div>
        <div class="campo-filtro"><label>De</label><input type="date" id="filtroVendaDataInicio" aria-label="De" value="${this.filtros.dataInicio}"></div>
        <div class="campo-filtro"><label>Até</label><input type="date" id="filtroVendaDataFim" aria-label="Até" value="${this.filtros.dataFim}"></div>
        <button class="btn-secundario" id="btnLimparFiltrosVenda">Limpar filtros</button>
      </div>

      ${tabela}
    `;
  }

  aposRenderizar() {
    this.removerListeners();
    const container = document.getElementById('viewPrincipal');

    const btnNova = document.getElementById('btnNovaVenda');
    if (btnNova) btnNova.addEventListener('click', () => this.abrirFormulario());

    const mapaFiltros = { filtroVendaCliente: 'cliente', filtroVendaStatus: 'status', filtroVendaDataInicio: 'dataInicio', filtroVendaDataFim: 'dataFim' };
    Object.keys(mapaFiltros).forEach(idCampo => {
      const el = document.getElementById(idCampo);
      if (!el) return;
      el.addEventListener('change', (e) => { this.filtros[mapaFiltros[idCampo]] = e.target.value; this.rerenderizar(); });
    });

    const btnLimpar = document.getElementById('btnLimparFiltrosVenda');
    if (btnLimpar) btnLimpar.addEventListener('click', () => { this.filtros = { cliente: '', status: '', dataInicio: '', dataFim: '' }; this.rerenderizar(); });

    const selectAllVend = document.getElementById('selectAllVend');
    if (selectAllVend) {
      selectAllVend.addEventListener('change', (e) => {
        const vendas = this.vendasFiltradas();
        if (e.target.checked) { vendas.forEach(v => this.selecionados.add(v.id)); }
        else { this.selecionados.clear(); }
        this.rerenderizar();
      });
    }

    container.addEventListener('change', (e) => {
      if (e.target.classList.contains('checkbox-item-vend')) {
        const id = e.target.dataset.id;
        if (e.target.checked) { this.selecionados.add(id); }
        else { this.selecionados.delete(id); }
        this.rerenderizar();
      }
    });

    document.getElementById('bulkExportVend')?.addEventListener('click', () => this.bulkAcao('exportar'));
    document.getElementById('bulkCancelarVend')?.addEventListener('click', () => { this.selecionados.clear(); this.rerenderizar(); });

    const clickHandler = (e) => {
      const alvoRecibo = e.target.closest('[data-gerar-recibo]');
      const alvoProposta = e.target.closest('[data-gerar-proposta]');
      const alvoCancelar = e.target.closest('[data-cancelar-venda]');
      if (alvoRecibo) { this.pdfGenerator.abrirModalAssinatura(vendaStore().porId(alvoRecibo.dataset.gerarRecibo), 'recibo'); return; }
      if (alvoProposta) { this.pdfGenerator.abrirModalAssinatura(vendaStore().porId(alvoProposta.dataset.gerarProposta), 'proposta'); return; }
      if (alvoCancelar) { this.cancelarVenda(alvoCancelar.dataset.cancelarVenda); return; }
    };
    container.addEventListener('click', clickHandler);
    this._bindCache['delegVendasClick'] = { el: container, handler: clickHandler, type: 'click' };

    // Atualização inline do status da venda (pipeline negociação  →  aprovada  →  paga  →  entregue)
    const changeHandler = (e) => {
      const selectStatus = e.target.closest('[data-status-venda]');
      if (selectStatus) this.atualizarStatus(selectStatus.dataset.statusVenda, e.target.value);
    };
    container.addEventListener('change', changeHandler);
    this._bindCache['delegVendasChange'] = { el: container, handler: changeHandler, type: 'change' };
  }

  atualizarStatus(id, novoStatus) {
    vendaStore().atualizar(id, { status: novoStatus });
    mostrarToast('Status da venda atualizado.', 'sucesso');
  }

  bulkAcao(acao) {
    const ids = Array.from(this.selecionados);
    if (ids.length === 0) return;
    switch (acao) {
      case 'exportar': {
        const vendas = ids.map(id => vendaStore().porId(id)).filter(Boolean);
        const obras = obraStore().items;
        const clientes = clienteStore().items;
        const csv = [['obra', 'cliente', 'valor', 'data', 'pagamento', 'status'].join(','),
          ...vendas.map(v => {
            const obra = obras.find(o => o.id === v.obraId);
            const cliente = clientes.find(c => c.id === v.clienteId);
            return [obra?.titulo || '', cliente?.nome || '', v.precoFinal || 0, v.data || '', v.formaPagamento || '', v.status || '']
              .map(s => `"${String(s).replace(/"/g, '""')}"`).join(',');
          })
        ].join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = `vendas-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click(); URL.revokeObjectURL(a.href);
        mostrarToast(`${vendas.length} venda(s) exportada(s)`, 'sucesso');
        break;
      }
    }
    this.selecionados.clear();
    this.rerenderizar();
  }

  // Modal de registro de nova venda: obra + cliente (ou cadastro rápido) + condição
  abrirFormulario() {
    // ===== Integração com o Catálogo: só oferece obras que ainda não foram vendidas =====
    const obrasDisponiveis = obraStore().items.filter(o => classeStatus(o.status) !== 'vendida');
    const clientes = clienteStore().items;

    if (!obrasDisponiveis.length) {
      mostrarToast('Não há obras disponíveis para venda no momento.', 'aviso');
      return;
    }

    abrirModal(`
      <h3>Nova Venda</h3>
      <form id="formVenda">
        <div class="campo-form">
          <label>Obra *</label>
          <select id="campoObraVenda" required aria-label="Obra">
            <option value="">Selecione a obra...</option>
            ${obrasDisponiveis.map(o => `<option value="${o.id}" data-preco="${o.preco}">${o.titulo} (${formatarMoeda(o.preco)})</option>`).join('')}
          </select>
        </div>
        <div class="campo-form">
          <label>Cliente *</label>
          <select id="campoClienteVenda" required aria-label="Cliente">
            <option value="">Selecione...</option>
            ${clientes.map(c => `<option value="${c.id}">${c.nome}</option>`).join('')}
            <option value="__novo__">+ Cadastrar novo cliente</option>
          </select>
        </div>
        <div id="blocoNovoClienteVenda" style="display:none;">
          <div class="form-linha">
            <div class="campo-form"><label>Nome do novo cliente *</label><input type="text" id="campoNovoClienteNome" aria-label="Nome do novo cliente"></div>
            <div class="campo-form"><label>Telefone</label><input type="text" id="campoNovoClienteTelefone" aria-label="Telefone"></div>
          </div>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Preço final (R$) *</label>
            <input type="number" id="campoPrecoVenda" required aria-label="Preço final">
          </div>
          <div class="campo-form">
            <label>Data</label>
            <input type="date" id="campoDataVenda" aria-label="Data" value="${new Date().toISOString().slice(0, 10)}">
          </div>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Forma de pagamento</label>
            <select id="campoFormaPagamento" aria-label="Forma de pagamento">
              <option value="à vista">à vista</option>
              <option value="parcelado">Parcelado</option>
              <option value="transferência">Transferência</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
          </div>
          <div class="campo-form">
            <label>Status</label>
            <select id="campoStatusVenda" aria-label="Status">
              <option value="negociação">Negociação</option>
              <option value="aprovada">Aprovada</option>
              <option value="paga">Paga</option>
              <option value="entregue">Entregue</option>
            </select>
          </div>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Comissão de galeria/agente (%)</label>
            <input type="number" id="campoComissaoPct" min="0" max="90" step="1" value="0" aria-label="Comissão de galeria em percentual">
          </div>
          <div class="campo-form">
            <label>Galeria/Agente</label>
            <input type="text" id="campoComissaoNome" placeholder="Galeria X, Agente..." aria-label="Nome da galeria ou agente">
          </div>
        </div>
        <div id="resumoComissao" class="comissao-resumo" style="font-size:0.8rem;color:var(--text-muted);"></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarVenda">Cancelar</button>
          <button type="submit" class="btn-primario">Confirmar Venda</button>
        </div>
      </form>
    `);

    document.getElementById('btnCancelarVenda').addEventListener('click', fecharModal);

    // Pré-preenche o preço final com o preço de tabela da obra selecionada (editável)
    document.getElementById('campoObraVenda').addEventListener('change', (e) => {
      const opt = e.target.selectedOptions[0];
      if (opt && opt.dataset.preco) document.getElementById('campoPrecoVenda').value = opt.dataset.preco;
      atualizarResumoComissao();
    });
    document.getElementById('campoPrecoVenda').addEventListener('input', atualizarResumoComissao);
    document.getElementById('campoComissaoPct').addEventListener('input', atualizarResumoComissao);

    function atualizarResumoComissao() {
      const preco = Number(document.getElementById('campoPrecoVenda')?.value) || 0;
      const pct = Math.min(90, Math.max(0, Number(document.getElementById('campoComissaoPct')?.value) || 0));
      const resumo = document.getElementById('resumoComissao');
      if (!resumo) return;
      if (pct > 0 && preco > 0) {
        const comissao = preco * pct / 100;
        resumo.innerHTML = `<i data-lucide="piggy-bank"></i> Comissão: ${formatarMoeda(comissao)} · Seu líquido: <strong style="color:var(--accent);">${formatarMoeda(preco - comissao)}</strong>`;
      } else {
        resumo.innerHTML = '';
      }
      if (window.inicializarIconesLucide) window.inicializarIconesLucide();
    }

    // Exibe o cadastro rápido de cliente quando "+ Cadastrar novo cliente" é escolhido
    document.getElementById('campoClienteVenda').addEventListener('change', (e) => {
      document.getElementById('blocoNovoClienteVenda').style.display = e.target.value === '__novo__' ? 'block' : 'none';
    });

    document.getElementById('formVenda').addEventListener('submit', (e) => {
      e.preventDefault();
      const obraId = document.getElementById('campoObraVenda').value;
      let clienteId = document.getElementById('campoClienteVenda').value;
      const preco = document.getElementById('campoPrecoVenda').value;

      if (!obraId || !clienteId || preco === '') {
        mostrarToast('Selecione a obra, o cliente e informe o preço final.', 'aviso');
        return;
      }

      // Cadastro rápido de cliente (integração com o módulo Clientes)
      if (clienteId === '__novo__') {
        const nomeNovo = document.getElementById('campoNovoClienteNome').value.trim();
        if (!nomeNovo) { mostrarToast('Informe o nome do novo cliente.', 'aviso'); return; }
        const novoCliente = clienteStore().adicionar({
          nome: nomeNovo,
          telefone: document.getElementById('campoNovoClienteTelefone').value.trim(),
          email: '', endereco: '', notas: '', tags: [], aquisicoes: 0
        });
        clienteId = novoCliente.id;
      }

      const dadosVenda = {
        obraId,
        clienteId,
        precoFinal: Number(preco),
        data: document.getElementById('campoDataVenda').value || new Date().toISOString().slice(0, 10),
        formaPagamento: document.getElementById('campoFormaPagamento').value,
        status: document.getElementById('campoStatusVenda').value,
        comissaoPct: Number(document.getElementById('campoComissaoPct')?.value) || 0,
        comissaoNome: (document.getElementById('campoComissaoNome')?.value || '').trim()
      };
      vendaStore().adicionar(dadosVenda);

      // ===== Integração com o Catálogo (CatalogoView): a obra passa a "vendida" ao confirmar a venda =====
      obraStore().atualizar(obraId, { status: 'vendida' });

      // ===== Integração com Clientes (ClientesView): +1 aquisição, refletido na listagem e na timeline =====
      const cliente = clienteStore().porId(clienteId);
      if (cliente) clienteStore().atualizar(clienteId, { aquisicoes: (cliente.aquisicoes || 0) + 1 });

      fecharModal();
      mostrarToast('Venda registrada com sucesso!', 'sucesso');
      this.router.navegar('vendas');
    });
  }

  // Cancela uma venda: reverte a obra para "disponível" e desfaz a aquisição do cliente
  async cancelarVenda(id) {
    const venda = vendaStore().porId(id);
    if (!venda) return;
    if (!await confirmarAcao('Cancelar esta venda? A obra voltará a ficar disponível no catálogo.', { textoConfirmar: 'Cancelar Venda', perigoso: true })) return;

    const statusAnterior = obraStore().porId(venda.obraId)?.status;
    obraStore().atualizar(venda.obraId, { status: 'disponível' });
    const cliente = clienteStore().porId(venda.clienteId);
    if (cliente) clienteStore().atualizar(venda.clienteId, { aquisicoes: Math.max(0, (cliente.aquisicoes || 0) - 1) });

    vendaStore().remover(id);
    mostrarToastComDesfazer('Venda cancelada.', () => {
      vendaStore().items.unshift(venda); vendaStore()._persistir();
      if (statusAnterior) obraStore().atualizar(venda.obraId, { status: statusAnterior });
      if (cliente) clienteStore().atualizar(venda.clienteId, { aquisicoes: Math.max(0, (cliente.aquisicoes || 0) + 1) });
    });
    this.rerenderizar();
  }

  // Modal de escolha rápida de venda, usado pelo atalho "Gerar Recibo" do Dashboard
  abrirEscolhaRapida() {
    const vendas = vendaStore().items;
    if (!vendas.length) { mostrarToast('Nenhuma venda registrada ainda. Registre uma venda primeiro.', 'aviso'); return; }

    const obras = obraStore().items;
    const clientes = clienteStore().items;

    const itensHtml = vendas.map(v => {
      const obra = obras.find(o => o.id === v.obraId);
      const cliente = clientes.find(c => c.id === v.clienteId);
      return `
        <li class="item-escolha-venda">
          <span>${obra ? obra.titulo : (v.obraTitulo ? v.obraTitulo : '-')} — ${cliente ? cliente.nome : (v.clienteNome ? v.clienteNome : '-')} (${formatarMoeda(v.precoFinal)})</span>
          <button class="btn-secundario" data-escolher-venda="${v.id}">Gerar Recibo</button>
        </li>
      `;
    }).join('');

    abrirModal(`
      <h3>Selecione a venda</h3>
      <ul class="lista-escolha-venda">${itensHtml}</ul>
      <div class="modal-acoes"><button class="btn-secundario" id="btnFecharEscolhaVenda">Fechar</button></div>
    `);

    document.getElementById('btnFecharEscolhaVenda').addEventListener('click', fecharModal);
    document.querySelectorAll('[data-escolher-venda]').forEach(btn => {
      btn.addEventListener('click', () => {
        const venda = vendaStore().porId(btn.dataset.escolherVenda);
        fecharModal();
        this.pdfGenerator.abrirModalAssinatura(venda, 'recibo');
      });
    });
  }
}

