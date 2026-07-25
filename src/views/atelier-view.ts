export class AtelierView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.tabAtiva = 'estoque';
    this.filtroCategoria = '';
    this.catIcones = { tintas: 'ðŸŽ¨', superficies: 'ðŸ“', ferramentas: 'ðŸ”§', molduras: 'ðŸ–¼ï¸' };
    this.catLabels = { tintas: 'Tintas', superficies: 'SuperfÃ­cies', ferramentas: 'Ferramentas', molduras: 'Molduras' };
  }

  get materiais() { return this.dataStore.listar('materiais') || []; }
  get fornecedores() { return this.dataStore.listar('fornecedores') || []; }
  get consumos() { return this.dataStore.listar('consumos') || []; }
  get obras() { return obraStore().items; }

  // --- RENDER ---
  render() {
    const tabs = ['estoque', 'consumo', 'compras', 'fornecedores', 'custo'];
    const tabLabels = { estoque: 'ðŸ“¦ Estoque', consumo: 'ðŸ“‹ Consumo', compras: 'ðŸ›’ Compras', fornecedores: 'ðŸª Fornecedores', custo: 'ðŸ’° Custo p/ Obra' };
    const tabContent = {
      estoque: () => this.renderEstoque(),
      consumo: () => this.renderConsumo(),
      compras: () => this.renderCompras(),
      fornecedores: () => this.renderFornecedores(),
      custo: () => this.renderCustoObra()
    };

    return `
      <div>
        <div class="atelier-tabs">
          ${tabs.map(t => `<button class="tab-btn ${t === this.tabAtiva ? 'ativo' : ''}" data-tab="${t}">${tabLabels[t]}</button>`).join('')}
        </div>
        <div id="atelierContent">${tabContent[this.tabAtiva]()}</div>
      </div>
    `;
  }

  // --- ESTOQUE ---
  renderEstoque() {
    const materiais = this.materiais;
    const cats = Object.keys(this.catLabels);
    const filtrados = this.filtroCategoria ? materiais.filter(m => m.categoria === this.filtroCategoria) : materiais;

    return `
      <div class="mat-filtros">
        <select id="filtroCatEstoque">
          <option value="">ðŸ“š Todas as categorias</option>
          ${cats.map(c => `<option value="${c}" ${this.filtroCategoria === c ? 'selected' : ''}>${this.catIcones[c]} ${this.catLabels[c]}</option>`).join('')}
        </select>
        <button class="btn-primario" id="btnNovoMaterial" style="font-size:0.8rem;padding:6px 14px;">âž• Novo Material</button>
        <span style="font-size:0.8rem;color:var(--text-muted);margin-left:auto;">${filtrados.length} item(ns)</span>
      </div>
      <div class="mat-grid">
        ${filtrados.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum material encontrado.</p>' : ''}
        ${filtrados.map(m => this.renderCardMaterial(m)).join('')}
      </div>
    `;
  }

  renderCardMaterial(m) {
    const qtd = Number(m.quantidade) || 0;
    const min = Number(m.quantidadeMinima) || 0;
    const nivel = qtd <= 0 ? 'baixo' : (min > 0 && qtd <= min ? 'baixo' : (min > 0 && qtd <= min * 2 ? 'medio' : 'ok'));
    const badgeLabel = nivel === 'baixo' ? 'âš ï¸ Repor' : (nivel === 'medio' ? 'âš ï¸ AtenÃ§Ã£o' : 'âœ” OK');
    const categoria = m.categoria || 'outros';

    return `
      <div class="mat-card">
        <div class="mat-faixa-alerta ${nivel}"></div>
        <div class="mat-header">
          <div>
            <div class="mat-nome">${this.catIcones[categoria] || 'ðŸ“¦'} ${m.nome || ''}</div>
            <span class="mat-cat ${categoria}">${this.catLabels[categoria] || categoria} ${m.subcategoria ? 'Â· '+m.subcategoria : ''}</span>
          </div>
          <div style="text-align:right;">
            <div class="mat-qtd ${nivel === 'baixo' ? 'alerta' : 'ok'}">${qtd}</div>
            <div class="mat-qtd-label">${m.unidade || 'un'}</div>
            <span class="mat-badge ${nivel}">${badgeLabel}</span>
          </div>
        </div>
        <div class="mat-detalhes">
          ${m.marca ? `<span>ðŸ·ï¸ ${m.marca}</span>` : ''}
          ${m.local ? `<span>ðŸ“ ${m.local}</span>` : ''}
          ${m.precoUnitario ? `<span>ðŸ’° R$ ${Number(m.precoUnitario).toFixed(2)}/${m.unidade || 'un'}</span>` : ''}
          ${m.dataAquisicao ? `<span>ðŸ“… ${m.dataAquisicao}</span>` : ''}
          ${m.validade ? `<span>â³ Val: ${m.validade}</span>` : ''}
        </div>
        ${m.notas ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">ðŸ“ ${m.notas}</div>` : ''}
        <div class="mat-acoes">
          <button data-acao="editarMaterial" data-id="${m.id}">âœï¸ Editar</button>
          <button data-acao="consumirMaterial" data-id="${m.id}">ðŸ“‰ Consumir</button>
          <button data-acao="excluirMaterial" data-id="${m.id}" style="color:#dc2626;">ðŸ—‘ï¸</button>
        </div>
      </div>
    `;
  }

  // --- CONSUMO ---
  renderConsumo() {
    const consumos = this.consumos;
    const materiais = this.materiais;
    const obras = this.obras;

    const rows = consumos.map(c => {
      const mat = materiais.find(m => m.id === c.materialId);
      const obra = obras.find(o => o.id === c.obraId);
      const custo = mat && mat.precoUnitario ? (Number(c.quantidade) * Number(mat.precoUnitario)) : null;
      return { ...c, matNome: mat ? mat.nome : '(removido)', obraTitulo: obra ? obra.titulo : '(removida)', custo };
    }).reverse();

    return `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <button class="btn-primario" id="btnNovoConsumo" style="font-size:0.8rem;padding:6px 14px;">âž• Registrar Consumo</button>
        <span style="font-size:0.8rem;color:var(--text-muted);">${consumos.length} registro(s)</span>
      </div>
      ${rows.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum consumo registrado.</p>' : `
      <table class="cons-table">
        <tr><th>Material</th><th>Obra</th><th>Qtd</th><th>Custo</th><th>Data</th><th>Notas</th><th></th></tr>
        ${rows.map(r => `
          <tr>
            <td class="cons-obra">${r.matNome}</td>
            <td>${r.obraTitulo}</td>
            <td>${r.quantidade}</td>
            <td>${r.custo !== null ? formatarMoeda(r.custo) : 'â€”'}</td>
            <td>${r.data || 'â€”'}</td>
            <td style="font-size:0.75rem;color:var(--text-muted);max-width:150px;overflow:hidden;text-overflow:ellipsis;">${r.notas || ''}</td>
            <td><button data-acao="excluirConsumo" data-id="${r.id}" style="font-size:0.7rem;padding:2px 6px;border:1px solid var(--border);background:var(--bg);color:#dc2626;cursor:pointer;">ðŸ—‘ï¸</button></td>
          </tr>
        `).join('')}
      </table>`}
    `;
  }

  // --- COMPRAS ---
  renderCompras() {
    const materiais = this.materiais;
    const abaixoMin = materiais.filter(m => { const q = Number(m.quantidade) || 0; const min = Number(m.quantidadeMinima) || 0; return min > 0 && q <= min; });
    const todosItens = materiais.filter(m => m.comprado !== undefined);
    const paraComprar = materiais.filter(m => m.comprado === false);
    const comprados = materiais.filter(m => m.comprado === true);
    const totalEst = paraComprar.reduce((s, m) => s + (Number(m.precoUnitario) || 0) * Math.max(1, Math.ceil(((Number(m.quantidadeMinima) || 0) * 2 - (Number(m.quantidade) || 0)) / 1)), 0);

    return `
      <div class="compras-resumo">
        <div class="cr-item"><div class="cr-valor">${abaixoMin.length}</div><div class="cr-label">âš ï¸ Abaixo do mÃ­nimo</div></div>
        <div class="cr-item"><div class="cr-valor">${paraComprar.length}</div><div class="cr-label">ðŸ›’ Para comprar</div></div>
        <div class="cr-item"><div class="cr-valor">${comprados.length}</div><div class="cr-label">âœ” Comprados</div></div>
        <div class="cr-item"><div class="cr-valor">${formatarMoeda(Math.round(totalEst))}</div><div class="cr-label">ðŸ’° Custo estimado</div></div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
        <button class="btn-primario" id="btnGerarLista" style="font-size:0.8rem;padding:6px 14px;">âš¡ Gerar lista automÃ¡tica</button>
        <button class="btn-secundario" id="btnAddItemLista" style="font-size:0.8rem;padding:6px 14px;">âž• Adicionar item manual</button>
        <button class="btn-secundario" id="btnExportarListaTXT" style="font-size:0.8rem;padding:6px 14px;">ðŸ“ž Exportar TXT</button>
      </div>
      ${paraComprar.length === 0 && comprados.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum item na lista. Clique em "Gerar lista automÃ¡tica".</p>' : ''}
      <ul class="lista-compras">
        ${paraComprar.map(m => this.renderItemCompra(m, false)).join('')}
        ${comprados.map(m => this.renderItemCompra(m, true)).join('')}
      </ul>
    `;
  }

  renderItemCompra(m, comprado) {
    const qtdSugerida = Math.max(1, Math.ceil(((Number(m.quantidadeMinima) || 0) * 2 - (Number(m.quantidade) || 0))));
    return `
      <li class="${comprado ? 'comprado' : ''}">
        <div class="lc-info">
          <div class="lc-nome">${this.catIcones[m.categoria] || 'ðŸ“¦'} ${m.nome}</div>
          <div class="lc-cat">${this.catLabels[m.categoria] || m.categoria} ${m.marca ? 'Â· '+m.marca : ''}</div>
        </div>
        <div class="lc-qtd">${comprado ? 'âœ”ï¸' : `Qtd: ${qtdSugerida} ${m.unidade || 'un'}`}</div>
        ${m.precoUnitario ? `<div class="lc-preco">${formatarMoeda(Math.round((Number(m.precoUnitario) || 0) * qtdSugerida))}</div>` : ''}
        <div class="lc-acoes">
          ${comprado ? `<button data-acao="desmarcarComprado" data-id="${m.id}">â†©ï¸</button>` : `<button data-acao="marcarComprado" data-id="${m.id}">âœ”</button>`}
          <button data-acao="removerLista" data-id="${m.id}" style="color:#dc2626;">ðŸ—‘ï¸</button>
        </div>
      </li>
    `;
  }

  // --- FORNECEDORES ---
  renderFornecedores() {
    const fornecedores = this.fornecedores;
    return `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <button class="btn-primario" id="btnNovoFornecedor" style="font-size:0.8rem;padding:6px 14px;">âž• Novo Fornecedor</button>
        <span style="font-size:0.8rem;color:var(--text-muted);">${fornecedores.length} fornecedor(es)</span>
      </div>
      <div class="forn-grid">
        ${fornecedores.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum fornecedor cadastrado.</p>' : ''}
        ${fornecedores.map(f => {
          const hist = f.historicoCompras || [];
          const totalGasto = hist.reduce((s, h) => s + Number(h.valor || 0), 0);
          return `
            <div class="forn-card">
              <div class="forn-nome">ðŸª ${f.nome}</div>
              <div class="forn-contato">${f.contato || ''}${f.email ? ' Â· '+f.email : ''}</div>
              <div class="forn-esp">ðŸ“’ ${f.especialidade || 'Sem especialidade'}</div>
              ${f.avaliacao ? `<div class="forn-estrelas">${'â˜…'.repeat(Math.min(5, Number(f.avaliacao)))}${'â˜†'.repeat(Math.max(0, 5 - Number(f.avaliacao)))}</div>` : ''}
              ${f.notas ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">ðŸ“ ${f.notas}</div>` : ''}
              ${hist.length > 0 ? `
                <div class="forn-hist">
                  <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted);margin-bottom:4px;">HistÃ³rico (Total: ${formatarMoeda(totalGasto)})</div>
                  ${hist.map(h => `<div class="hist-item"><span>${h.data || ''} â€” ${h.itens || ''}</span><span>${formatarMoeda(Number(h.valor) || 0)}</span></div>`).join('')}
                </div>
              ` : ''}
              <div class="forn-acoes">
                <button data-acao="editarFornecedor" data-id="${f.id}">âœï¸ Editar</button>
                <button data-acao="excluirFornecedor" data-id="${f.id}" style="color:#dc2626;">ðŸ—‘ï¸</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // --- CUSTO POR OBRA ---
  renderCustoObra() {
    const obras = this.obras;
    const consumos = this.consumos;
    const materiais = this.materiais;

    return `
      <div style="margin-bottom:12px;">
        <select id="selCustoObra" style="padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.9rem;background:var(--bg);color:var(--text);width:100%;max-width:400px;">
          <option value="">â€” Selecione uma obra â€”</option>
          ${obras.map(o => `<option value="${o.id}">${o.titulo || 'Sem tÃ­tulo'} ${o.preco ? 'â€” '+formatarMoeda(o.preco) : ''}</option>`).join('')}
        </select>
      </div>
      <div id="custoObraDetalhe">
        <p style="color:var(--text-muted);font-size:0.85rem;">Selecione uma obra para ver o detalhamento de custos.</p>
      </div>
    `;
  }

  renderCustoDetalhe(obraId) {
    const obra = obraStore().items.find(o => o.id === obraId);
    if (!obra) return '<p style="color:var(--text-muted);">Obra nÃ£o encontrada.</p>';
    const consumosObra = this.consumos.filter(c => c.obraId === obraId);
    const materiais = this.materiais;

    let custoTotal = 0;
    const rows = consumosObra.map(c => {
      const mat = materiais.find(m => m.id === c.materialId);
      const custo = mat && mat.precoUnitario ? Number(c.quantidade) * Number(mat.precoUnitario) : 0;
      custoTotal += custo;
      return { ...c, matNome: mat ? mat.nome : '(removido)', custo };
    });

    const precoVenda = Number(obra.preco) || 0;
    const margem = precoVenda > 0 ? ((precoVenda - custoTotal) / precoVenda * 100) : 0;
    const margemClass = margem >= 60 ? 'lucro-alta' : (margem >= 30 ? 'lucro-media' : 'lucro-baixa');

    return `
      <div class="custo-obra-header">
        <div class="custo-obra-card">
          <div class="co-valor">${formatarMoeda(Math.round(custoTotal))}</div>
          <div class="co-label">ðŸ’° Custo de produÃ§Ã£o</div>
        </div>
        <div class="custo-obra-card">
          <div class="co-valor">${precoVenda > 0 ? formatarMoeda(precoVenda) : 'â€”'}</div>
          <div class="co-label">ðŸ·ï¸ PreÃ§o de venda</div>
        </div>
        <div class="custo-obra-card">
          <div class="co-valor ${margemClass}">${margem > 0 ? margem.toFixed(1) + '%' : 'â€”'}</div>
          ${margem > 0 ? `<div class="co-label">ðŸ“Š Margem de lucro ${margem >= 60 ? 'âœ”' : (margem >= 30 ? 'âš ï¸' : 'ðŸ”½')}</div>` : '<div class="co-label">Sem venda definida</div>'}
        </div>
      </div>
      ${rows.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum material registrado como consumido nesta obra.</p>' : `
      <table class="cons-table">
        <tr><th>Material</th><th>Qtd</th><th>Valor unit.</th><th>Custo</th><th>Data</th><th>Notas</th></tr>
        ${rows.map(r => `<tr><td class="cons-obra">${r.matNome}</td><td>${r.quantidade}</td><td>${materiais.find(m => m.id === r.materialId)?.precoUnitario ? 'R$ '+Number(materiais.find(m => m.id === r.materialId).precoUnitario).toFixed(2) : 'â€”'}</td><td>${formatarMoeda(Math.round(r.custo))}</td><td>${r.data || 'â€”'}</td><td style="font-size:0.75rem;color:var(--text-muted);">${r.notas || ''}</td></tr>`).join('')}
        <tr style="font-weight:600;"><td>TOTAL</td><td></td><td></td><td>${formatarMoeda(Math.round(custoTotal))}</td><td></td><td></td></tr>
      </table>`}
      <div style="margin-top:12px;font-size:0.85rem;color:var(--text-muted);">
        ðŸ’¡ Dica: Registre materiais usados na aba <strong>Consumo</strong> para ver o custo real de cada obra.
      </div>
    `;
  }

  // --- EVENT BINDING ---
  aposRenderizar() {
    this.removerListeners();

    // Tabs
    document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
      const handler = () => {
        this.tabAtiva = btn.dataset.tab;
        this.rerenderizar();
      };
      btn.addEventListener('click', handler);
      this._bindCache['tab_' + btn.dataset.tab] = { el: btn, handler, type: 'click' };
    });

    // Filtro estoque
    const filtro = document.getElementById('filtroCatEstoque');
    if (filtro) {
      const handler = () => { this.filtroCategoria = filtro.value; this.rerenderizar(); };
      filtro.addEventListener('change', handler);
      this._bindCache['filtroCatEstoque'] = { el: filtro, handler, type: 'change' };
    }

    // Novo material
    document.getElementById('btnNovoMaterial')?.addEventListener('click', () => this.abrirFormMaterial());
    document.getElementById('btnNovoConsumo')?.addEventListener('click', () => this.abrirFormConsumo());
    document.getElementById('btnNovoFornecedor')?.addEventListener('click', () => this.abrirFormFornecedor());

    // Compras buttons
    document.getElementById('btnGerarLista')?.addEventListener('click', () => this.gerarListaCompras());
    document.getElementById('btnAddItemLista')?.addEventListener('click', () => this.abrirFormMaterial(true));
    document.getElementById('btnExportarListaTXT')?.addEventListener('click', () => this.exportarListaTXT());

    // Select custo obra
    const selCusto = document.getElementById('selCustoObra');
    if (selCusto) {
      const handler = () => {
        const detalhe = document.getElementById('custoObraDetalhe');
        if (detalhe) detalhe.innerHTML = selCusto.value ? this.renderCustoDetalhe(selCusto.value) : '<p style="color:var(--text-muted);font-size:0.85rem;">Selecione uma obra para ver o detalhamento de custos.</p>';
      };
      selCusto.addEventListener('change', handler);
      this._bindCache['selCustoObra'] = { el: selCusto, handler, type: 'change' };
    }

    // Delegated actions
    const container = document.getElementById('atelierContent') || document.getElementById('viewPrincipal');
    if (container) {
      const handler = (e) => {
        const btn = e.target.closest('[data-acao]');
        if (!btn) return;
        const acao = btn.dataset.acao;
        const id = btn.dataset.id;
        if (acao === 'editarMaterial') this.abrirFormMaterial(false, id);
        else if (acao === 'excluirMaterial') this.excluirMaterial(id);
        else if (acao === 'consumirMaterial') this.consumirRapido(id);
        else if (acao === 'excluirConsumo') this.excluirConsumo(id);
        else if (acao === 'editarFornecedor') this.abrirFormFornecedor(id);
        else if (acao === 'excluirFornecedor') this.excluirFornecedor(id);
        else if (acao === 'marcarComprado') this.marcarComprado(id, true);
        else if (acao === 'desmarcarComprado') this.marcarComprado(id, false);
        else if (acao === 'removerLista') this.removerDaLista(id);
      };
      container.addEventListener('click', handler);
      this._bindCache['delegatedAtelier'] = { el: container, handler, type: 'click' };
    }
  }

  // --- CRUD Material ---
  abrirFormMaterial(ehLista = false, id = null) {
    const mat = id ? this.dataStore.buscarPorId('materiais', id) : null;
    const isLista = ehLista || (mat && mat.comprado !== undefined);

    const cats = Object.keys(this.catLabels);
    const catOpts = cats.map(c => `<option value="${c}" ${mat && mat.categoria === c ? 'selected' : ''}>${this.catIcones[c]} ${this.catLabels[c]}</option>`).join('');

    abrirModal(`
      <h3>${mat ? 'âœï¸ Editar' : isLista ? 'âž• Adicionar Ã  Lista' : 'âž• Novo Material'}</h3>
      <form id="formModal" style="display:grid;gap:10px;">
        <div class="modal-form-grid">
          <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Nome *</label><input type="text" id="fMatNome" value="${mat ? mat.nome || '' : ''}" required style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Categoria</label><select id="fMatCat" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">${catOpts}</select></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Subcategoria</label><input type="text" id="fMatSub" value="${mat ? mat.subcategoria || '' : ''}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Marca</label><input type="text" id="fMatMarca" value="${mat ? mat.marca || '' : ''}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Quantidade atual</label><input type="number" id="fMatQtd" value="${mat ? mat.quantidade || 0 : 0}" min="0" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Unidade</label><input type="text" id="fMatUn" value="${mat ? mat.unidade || 'un' : 'un'}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Qtd. mÃ­nima (alerta)</label><input type="number" id="fMatMin" value="${mat ? mat.quantidadeMinima || 0 : 0}" min="0" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">PreÃ§o unit. (R$)</label><input type="number" id="fMatPreco" value="${mat ? mat.precoUnitario || 0 : 0}" min="0" step="0.01" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Local</label><input type="text" id="fMatLocal" value="${mat ? mat.local || '' : ''}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Data aquisiÃ§Ã£o</label><input type="date" id="fMatData" value="${mat ? mat.dataAquisicao || '' : ''}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Notas</label><textarea id="fMatNotas" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;min-height:50px;">${mat ? mat.notas || '' : ''}</textarea></div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar</button>
        </div>
      </form>
    `);

    document.getElementById('btnCancelarModal').addEventListener('click', fecharModal);
    document.getElementById('formModal').addEventListener('submit', (e) => {
      e.preventDefault();
      const dados = {
        nome: document.getElementById('fMatNome').value.trim(),
        categoria: document.getElementById('fMatCat').value,
        subcategoria: document.getElementById('fMatSub').value.trim(),
        marca: document.getElementById('fMatMarca').value.trim(),
        quantidade: Number(document.getElementById('fMatQtd').value) || 0,
        unidade: document.getElementById('fMatUn').value.trim() || 'un',
        quantidadeMinima: Number(document.getElementById('fMatMin').value) || 0,
        precoUnitario: Number(document.getElementById('fMatPreco').value) || 0,
        local: document.getElementById('fMatLocal').value.trim(),
        dataAquisicao: document.getElementById('fMatData').value,
        notas: document.getElementById('fMatNotas').value.trim()
      };
      if (!dados.nome) { mostrarToast('O nome Ã© obrigatÃ³rio.'); return; }
      if (isLista) dados.comprado = false;
      if (mat) {
        this.dataStore.atualizar('materiais', id, dados);
        mostrarToast('Material atualizado!');
      } else {
        this.dataStore.adicionar('materiais', dados);
        mostrarToast('Material adicionado!');
      }
      fecharModal();
      this.rerenderizar();
    });
  }

  excluirMaterial(id) {
    if (!confirm('Excluir este material?')) return;
    this.dataStore.remover('materiais', id);
    mostrarToast('Material excluÃ­do.');
    this.rerenderizar();
  }

  consumirRapido(id) {
    const mat = this.dataStore.buscarPorId('materiais', id);
    if (!mat) return;
    const obras = this.obras;
    const opcoes = obras.map(o => `<option value="${o.id}">${o.titulo || 'Sem tÃ­tulo'}</option>`).join('');

    abrirModal(`
      <h3>ðŸ“‰ Consumir: ${mat.nome}</h3>
      <form id="formModal">
        <div class="campo-form"><label>Obra</label><select id="fConsObra">${opcoes}</select></div>
        <div class="campo-form"><label>Quantidade (${mat.unidade || 'un'} â€” atual: ${mat.quantidade})</label><input type="number" id="fConsQtd" value="1" min="0.1" step="0.1"></div>
        <div class="campo-form"><label>Data</label><input type="date" id="fConsData" value="${new Date().toISOString().slice(0, 10)}"></div>
        <div class="campo-form"><label>Notas</label><textarea id="fConsNotas" placeholder="Ex.: Camada de fundo"></textarea></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">Consumir</button>
        </div>
      </form>
    `);

    document.getElementById('btnCancelarModal').addEventListener('click', fecharModal);
    document.getElementById('formModal').addEventListener('submit', (e) => {
      e.preventDefault();
      const qtd = Number(document.getElementById('fConsQtd').value) || 0;
      if (qtd <= 0) { mostrarToast('Quantidade invÃ¡lida.'); return; }
      const novaQtd = Math.max(0, (Number(mat.quantidade) || 0) - qtd);
      this.dataStore.atualizar('materiais', id, { quantidade: novaQtd });
      this.dataStore.adicionar('consumos', {
        materialId: id,
        obraId: document.getElementById('fConsObra').value,
        quantidade: qtd,
        data: document.getElementById('fConsData').value,
        notas: document.getElementById('fConsNotas').value.trim()
      });
      fecharModal();
      mostrarToast(`${qtd} ${mat.unidade || 'un'} consumido(s) de "${mat.nome}". Novo estoque: ${novaQtd}.`);
      this.rerenderizar();
    });
  }

  // --- CRUD Consumo ---
  abrirFormConsumo() {
    const materiais = this.materiais;
    const obras = this.obras;
    const matOpts = materiais.map(m => `<option value="${m.id}">${this.catIcones[m.categoria] || 'ðŸ“¦'} ${m.nome} (${m.quantidade} ${m.unidade || 'un'})</option>`).join('');
    const obrOpts = obras.map(o => `<option value="${o.id}">${o.titulo || 'Sem tÃ­tulo'}</option>`).join('');

    abrirModal(`
      <h3>ðŸ“‹ Registrar Consumo</h3>
      <form id="formModal">
        <div class="campo-form"><label>Material</label><select id="fConsMat">${matOpts}</select></div>
        <div class="campo-form"><label>Obra</label><select id="fConsObraFull">${obrOpts}</select></div>
        <div class="campo-form"><label>Quantidade</label><input type="number" id="fConsQtdFull" value="1" min="0.1" step="0.1"></div>
        <div class="campo-form"><label>Data</label><input type="date" id="fConsDataFull" value="${new Date().toISOString().slice(0, 10)}"></div>
        <div class="campo-form"><label>Notas</label><textarea id="fConsNotasFull" placeholder="Ex.: Camada de fundo"></textarea></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">Registrar</button>
        </div>
      </form>
    `);

    document.getElementById('btnCancelarModal').addEventListener('click', fecharModal);
    document.getElementById('formModal').addEventListener('submit', (e) => {
      e.preventDefault();
      const matId = document.getElementById('fConsMat').value;
      const qtd = Number(document.getElementById('fConsQtdFull').value) || 0;
      if (qtd <= 0) { mostrarToast('Quantidade invÃ¡lida.'); return; }
      const mat = this.dataStore.buscarPorId('materiais', matId);
      if (mat) {
        const novaQtd = Math.max(0, (Number(mat.quantidade) || 0) - qtd);
        this.dataStore.atualizar('materiais', matId, { quantidade: novaQtd });
      }
      this.dataStore.adicionar('consumos', {
        materialId: matId,
        obraId: document.getElementById('fConsObraFull').value,
        quantidade: qtd,
        data: document.getElementById('fConsDataFull').value,
        notas: document.getElementById('fConsNotasFull').value.trim()
      });
      fecharModal();
      mostrarToast('Consumo registrado e estoque atualizado!');
      this.rerenderizar();
    });
  }

  excluirConsumo(id) {
    if (!confirm('Excluir este registro de consumo?')) return;
    this.dataStore.remover('consumos', id);
    mostrarToast('Registro excluÃ­do.');
    this.rerenderizar();
  }

  // --- Fornecedores ---
  abrirFormFornecedor(id = null) {
    const f = id ? this.dataStore.buscarPorId('fornecedores', id) : null;

    abrirModal(`
      <h3>${f ? 'âœï¸ Editar Fornecedor' : 'âž• Novo Fornecedor'}</h3>
      <form id="formModal" style="display:grid;gap:10px;">
        <div class="modal-form-grid">
          <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Nome *</label><input type="text" id="fFornNome" value="${f ? f.nome || '' : ''}" required style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Contato</label><input type="text" id="fFornContato" value="${f ? f.contato || '' : ''}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">E-mail</label><input type="email" id="fFornEmail" value="${f ? f.email || '' : ''}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Especialidade</label><input type="text" id="fFornEsp" value="${f ? f.especialidade || '' : ''}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">AvaliaÃ§Ã£o (1-5)</label><input type="number" id="fFornAval" value="${f ? f.avaliacao || 0 : 0}" min="0" max="5" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Notas</label><textarea id="fFornNotas" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;min-height:50px;">${f ? f.notas || '' : ''}</textarea></div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar</button>
        </div>
      </form>
    `);

    document.getElementById('btnCancelarModal').addEventListener('click', fecharModal);
    document.getElementById('formModal').addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('fFornNome').value.trim();
      if (!nome) { mostrarToast('O nome Ã© obrigatÃ³rio.'); return; }
      const dados = {
        nome,
        contato: document.getElementById('fFornContato').value.trim(),
        email: document.getElementById('fFornEmail').value.trim(),
        especialidade: document.getElementById('fFornEsp').value.trim(),
        avaliacao: Math.min(5, Math.max(0, Number(document.getElementById('fFornAval').value) || 0)),
        notas: document.getElementById('fFornNotas').value.trim(),
        historicoCompras: f ? (f.historicoCompras || []) : []
      };
      if (f) { this.dataStore.atualizar('fornecedores', id, dados); mostrarToast('Fornecedor atualizado!'); }
      else { this.dataStore.adicionar('fornecedores', dados); mostrarToast('Fornecedor adicionado!'); }
      fecharModal();
      this.rerenderizar();
    });
  }

  excluirFornecedor(id) {
    if (!confirm('Excluir este fornecedor?')) return;
    this.dataStore.remover('fornecedores', id);
    mostrarToast('Fornecedor excluÃ­do.');
    this.rerenderizar();
  }

  // --- Lista de Compras ---
  gerarListaCompras() {
    const materiais = this.materiais;
    let count = 0;
    materiais.forEach(m => {
      const q = Number(m.quantidade) || 0;
      const min = Number(m.quantidadeMinima) || 0;
      if (min > 0 && q <= min && m.comprado === undefined) {
        this.dataStore.atualizar('materiais', m.id, { comprado: false });
        count++;
      }
    });
    mostrarToast(`${count} item(ns) adicionado(s) Ã  lista de compras!`);
    this.rerenderizar();
  }

  marcarComprado(id, comprado) {
    this.dataStore.atualizar('materiais', id, { comprado });
    mostrarToast(comprado ? 'Marcado como comprado!' : 'Reaberto na lista.');
    this.rerenderizar();
  }

  removerDaLista(id) {
    this.dataStore.atualizar('materiais', id, { comprado: undefined });
    mostrarToast('Item removido da lista.');
    this.rerenderizar();
  }

  exportarListaTXT() {
    const materiais = this.materiais.filter(m => m.comprado === false);
    if (materiais.length === 0) { mostrarToast('Lista vazia.'); return; }

    let txt = '=== LISTA DE COMPRAS â€” ATELIER ===\n';
    txt += `Gerada em: ${new Date().toLocaleDateString('pt-BR')}\n\n`;
    let total = 0;
    materiais.forEach(m => {
      const qtd = Math.max(1, Math.ceil(((Number(m.quantidadeMinima) || 0) * 2 - (Number(m.quantidade) || 0))));
      const preco = (Number(m.precoUnitario) || 0) * qtd;
      total += preco;
      txt += `â–¡ ${m.nome}\n`;
      txt += `   Qtd: ${qtd} ${m.unidade || 'un'} | Cat: ${this.catLabels[m.categoria] || m.categoria}${m.marca ? ' | Marca: '+m.marca : ''}\n`;
      txt += `   Est.: ${formatarMoeda(Math.round(preco))}\n\n`;
    });
    txt += `=== CUSTO TOTAL ESTIMADO: ${formatarMoeda(Math.round(total))} ===\n`;

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lista-compras-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    mostrarToast('Lista exportada em TXT!');
  }

}
