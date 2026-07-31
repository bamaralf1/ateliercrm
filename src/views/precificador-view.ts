const ORC_STATUS = [
  { status: 'rascunho', rotulo: 'Rascunho', cor: '#6b7280' },
  { status: 'enviado', rotulo: 'Enviado', cor: '#3b82f6' },
  { status: 'aprovado', rotulo: 'Aprovado', cor: '#16a34a' },
  { status: 'recusado', rotulo: 'Recusado', cor: '#dc2626' }
];

export class PrecificadorView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.calc = {
      nome: '', clienteId: '', tecnica: '',
      materiais: 0, horas: 0, valorHora: 60,
      largura: 0, altura: 0, profundidade: 0,
      complexidade: 3,
      multiplicador: 1.5, arredondamento: 0
    };
    this.fatoresComplexidade = [0, 0.7, 0.85, 1.0, 1.2, 1.5];
    this.modoOrcamentos = localStorage.getItem('atelier-crm-view-mode-orcamentos') || 'kanban';
  }

  get config() { return configStore().precificador || {}; }
  get cfgRoot() { return configStore(); }
  get moeda() { return this.cfgRoot.moedaPadrao || 'BRL'; }
  get taxas() { return this.cfgRoot.taxasCambio || {}; }
  get regras() { return this.cfgRoot.precificadorRegras || []; }
  get orcamentos() { return this.cfgRoot.precificadorOrcamentos || []; }

  salvarConfig(cfg) {
    const c = this.cfgRoot;
    c.precificador = { ...(c.precificador || {}), ...cfg };
    configStore().salvar();
  }

  fmt(valor, moeda) {
    const m = moeda || this.moeda;
    const localeMap = { BRL: 'pt-BR', USD: 'en-US', EUR: 'de-DE', GBP: 'en-GB' };
    const loc = localeMap[m] || 'pt-BR';
    try {
      return (Number(valor) || 0).toLocaleString(loc, { style: 'currency', currency: m, maximumFractionDigits: 2 });
    } catch {
      return (Number(valor) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
  }

  converter(valor, de, para) {
    const v = Number(valor) || 0;
    if (de === para) return v;
    const tx = this.taxas;
    const emBRL = de === 'BRL' ? v : (tx[de] ? v * tx[de] : v);
    return para === 'BRL' ? emBRL : (tx[para] ? emBRL / tx[para] : emBRL);
  }

  // --- RENDER ---
  render() {
    const obras = obraStore().items || [];
    const vendas = vendaStore().items || [];
    const clientes = clienteStore().items || [];
    const temObras = obras.length > 0;
    this.calc.valorHora = Number(this.calc.valorHora) || this.config.valorHora || 60;
    this.calc.multiplicador = Number(this.calc.multiplicador) || this.config.multiplicadorExperiencia || 1.5;
    this.calc.arredondamento = Number(this.calc.arredondamento) || this.config.arredondamento || 0;

    const opcoesClientes = clientes.map(c =>
      `<option value="${c.id}" ${this.calc.clienteId === c.id ? 'selected' : ''}>${c.nome}${c.email ? ' — ' + c.email : ''}</option>`
    ).join('');

    const tecnicas = ['', 'óleo', 'acrílica', 'aquarela', 'guache', 'têmpera', 'desenho', 'gravura', 'escultura', 'cerâmica', 'têxtil', 'outra'];
    const opcoesTecnica = tecnicas.map(t =>
      `<option value="${t}" ${this.calc.tecnica === t ? 'selected' : ''}>${t ? capitalizarTexto(t) : 'Técnica livre'}</option>`
    ).join('');

    return `
      <div class="precificador" id="precificadorContainer">
        <div class="precificador-toolbar">
          <div class="moeda-selector">
            <label>Moeda:</label>
            <select id="selMoedaPadrao">
              ${['BRL','USD','EUR','GBP'].map(m =>
                `<option value="${m}" ${this.moeda === m ? 'selected' : ''}>${m}</option>`
              ).join('')}
            </select>
            <button class="btn-miniatura" id="btnEditarTaxas" title="Editar taxas de câmbio" aria-label="Editar taxas de câmbio">💱</button>
          </div>
          <button class="btn-secundario" id="btnAbrirRegras"><i class="fas fa-clipboard"></i> Regras de Precificação</button>
          <button class="btn-primario" id="btnExportarRelatorio"><i class="fas fa-phone"></i> Relatório PDF</button>
        </div>

        <div class="card">
          <h3>🧮 Calculadora de Preço <span class="badge">Orçamento</span></h3>
          <div class="calc-grid">
            <div class="campo-calc" style="grid-column:1/-1">
              <label>🖼️ Obra / peça <span class="texto-ajuda">(nome do orçamento)</span></label>
              <input type="text" id="calcNome" placeholder="Ex.: Pintura acrílica sobre tela — Série Horizonte" value="${this.calc.nome || ''}">
            </div>
            <div class="campo-calc">
              <label><i class="fas fa-user"></i> Cliente</label>
              <select id="calcCliente" aria-label="Cliente"><option value="">— Cliente avulso —</option>${opcoesClientes}</select>
            </div>
            <div class="campo-calc">
              <label>🎨 Técnica</label>
              <select id="calcTecnica" aria-label="Técnica">${opcoesTecnica}</select>
            </div>
            <div class="campo-calc">
              <label><i class="fas fa-dollar-sign"></i> Custo materiais (${this.moeda})</label>
              <input type="number" id="calcMateriais" aria-label="Custo materiais" value="${this.calc.materiais}" min="0" step="0.1">
            </div>
            <div class="campo-calc">
              <label>⏱ Horas trabalhadas</label>
              <input type="number" id="calcHoras" aria-label="Horas trabalhadas" value="${this.calc.horas}" min="0" step="0.5">
            </div>
            <div class="campo-calc">
              <label>🙵 Valor hora (${this.moeda})</label>
              <input type="number" id="calcValorHora" aria-label="Valor hora" value="${this.calc.valorHora}" min="0" step="1">
            </div>
            <div class="campo-calc">
              <label>📐 Dimensões (cm)</label>
              <div class="calc-dims">
                <input type="number" id="calcLargura" aria-label="Largura" value="${this.calc.largura}" min="0" placeholder="Larg.">
                <span>×</span>
                <input type="number" id="calcAltura" aria-label="Altura" value="${this.calc.altura}" min="0" placeholder="Alt.">
                <span>×</span>
                <input type="number" id="calcProfundidade" aria-label="Profundidade" value="${this.calc.profundidade}" min="0" placeholder="Prof.">
              </div>
            </div>
            <div class="campo-calc">
              <label><i class="fas fa-star"></i> Complexidade</label>
              <div class="estrelas-input" id="estrelasInput">
                ${[1,2,3,4,5].map(i =>
                  `<span class="estrela ${i <= this.calc.complexidade ? 'preenchida' : ''}" data-val="${i}">★</span>`
                ).join('')}
              </div>
            </div>
            <div class="campo-calc">
              <label>⚡ Multiplicador <span class="texto-ajuda">(experiência/marca)</span></label>
              <input type="number" id="calcMultiplicador" aria-label="Multiplicador" value="${this.calc.multiplicador}" min="1" step="0.1">
            </div>
            <div class="campo-calc">
              <label>🔢 Arredondamento</label>
              <select id="calcArredondamento" aria-label="Arredondamento">
                <option value="0" ${this.calc.arredondamento === 0 ? 'selected' : ''}>Sem arredondamento</option>
                <option value="50" ${this.calc.arredondamento === 50 ? 'selected' : ''}>Múltiplos de 50</option>
                <option value="100" ${this.calc.arredondamento === 100 ? 'selected' : ''}>Múltiplos de 100</option>
                <option value="250" ${this.calc.arredondamento === 250 ? 'selected' : ''}>Múltiplos de 250</option>
                <option value="500" ${this.calc.arredondamento === 500 ? 'selected' : ''}>Múltiplos de 500</option>
              </select>
            </div>
          </div>

          <div class="resultado-preco" id="resultadoPreco">
            <div class="rotulo-sugerido">Preço Sugerido</div>
            <div class="valor-sugerido" id="valorSugerido">${this.fmt(this.calcularPreco(this.calc))}</div>
            <div class="detalhe-calculo" id="detalheCalculo">${this.detalharCalculo(this.calcularPreco(this.calc))}</div>
            <div id="conversoesMultiMoeda" class="conversoes-multi"></div>
          </div>

          <div class="breakdown-grid" id="breakdownGrid">${this.renderBreakdown(this.calcularBreakdown(this.calc))}</div>
          <div id="regraAuto">${this.renderRegraAuto()}</div>
          <div id="faixaComparativa">${this.renderFaixaComparativa(obras)}</div>

          <div class="orcamento-acoes">
            <select id="selTemplateProposta" class="orc-status-select" aria-label="Template da proposta PDF" title="Template da proposta PDF">
              <option value="classico" ${(this.config.templateProposta || 'classico') === 'classico' ? 'selected' : ''}>📜 Clássico serifado</option>
              <option value="moderno" ${this.config.templateProposta === 'moderno' ? 'selected' : ''}>🎨 Moderno</option>
              <option value="minimalista" ${this.config.templateProposta === 'minimalista' ? 'selected' : ''}>◽ Minimalista</option>
            </select>
            <button class="btn-secundario" id="btnCopiarPreco"><i class="fas fa-copy"></i> Copiar</button>
            <button class="btn-primario" id="btnSalvarOrcamento"><i class="fas fa-save"></i> Salvar Orçamento</button>
            <button class="btn-secundario" id="btnPropostaPDF"><i class="fas fa-file-pdf"></i> Proposta PDF</button>
            <button class="btn-secundario" id="btnCriarEncomenda"><i class="fas fa-box-open"></i> Criar Encomenda</button>
          </div>
        </div>

        ${this.renderOrcamentos()}

        ${temObras ? this.renderBreakEven(obras) : ''}
        ${temObras ? this.renderMLCard(obras, vendas) : ''}
        ${temObras ? this.renderProjecao(obras) : ''}

        <div class="card card-full">
          <h3><i class="fas fa-chart-bar"></i> Análise do Portfólio</h3>
          ${temObras ? this.renderAnalise(obras, vendas) : '<p style="color:var(--text-muted);font-size:0.85rem;">Adicione obras no Catálogo para ver análises.</p>'}
        </div>

        <div class="card card-full">
          <h3><i class="fas fa-bullseye"></i> Metas Financeiras</h3>
          ${this.renderMetas(obras, vendas)}
        </div>
      </div>

      ${this.renderModalRegras()}
      ${this.renderModalTaxas()}
    `;
  }

  // --- Orçamentos Salvos ---
  renderOrcamentos() {
    const lista = this.orcamentos;
    const corpo = lista.length === 0
      ? `<div class="estado-vazio"><div class="icone-vazio">🧾</div><p>Nenhum orçamento salvo ainda. Preencha a calculadora e clique em <strong>Salvar Orçamento</strong>.</p></div>`
      : (this.modoOrcamentos === 'lista' ? this.renderOrcamentosLista(lista) : this.renderOrcamentosKanban(lista));
    return `
      <div class="card card-full" id="orcamentosContainer">
        <div class="orc-toolbar">
          <h3>🗂️ Orçamentos Salvos <span class="badge">${lista.length}</span></h3>
          <div class="toggle-visualizacao">
            <button id="btnKanbanOrc" class="${this.modoOrcamentos === 'kanban' ? 'ativo' : ''}" aria-label="Visualizar como kanban"><i class="fas fa-columns"></i> Kanban</button>
            <button id="btnListaOrc" class="${this.modoOrcamentos === 'lista' ? 'ativo' : ''}" aria-label="Visualizar como lista"><i class="fas fa-list"></i> Lista</button>
          </div>
        </div>
        ${corpo}
      </div>
    `;
  }

  renderOrcamentosKanban(lista) {
    const colunas = ORC_STATUS.map(s => {
      const orcs = lista.filter(o => (o.status || 'rascunho') === s.status);
      return `
        <div class="kanban-coluna" data-status="${s.status}" style="border-top: 3px solid ${s.cor};">
          <div class="kanban-coluna-header" style="color:${s.cor};">
            <span class="kanban-coluna-titulo">${s.rotulo}</span>
            <span class="kanban-coluna-contagem">${orcs.length}</span>
          </div>
          <div class="kanban-coluna-corpo">
            ${orcs.map(o => this._kanbanCardHtml(o)).join('')}
            ${orcs.length === 0 ? '<div style="font-size:0.72rem;color:var(--text-muted);text-align:center;padding:14px 0;">Arraste orçamentos aqui</div>' : ''}
          </div>
        </div>
      `;
    }).join('');
    return `<div class="kanban-board">${colunas}</div>`;
  }

  _kanbanCardHtml(o) {
    const dims = [o.largura, o.altura, o.profundidade].filter(Boolean).join('×');
    const outrosStatus = ORC_STATUS.filter(s => s.status !== (o.status || 'rascunho'));
    const convertido = o.convertidoEm ? `<span class="orc-convertido" title="Convertido em venda em ${formatarData(o.convertidoEm)}">✓ Vendido</span>` : '';
    const statusRotulos = { rascunho: 'Rascunho', enviado: 'Enviado', aprovado: 'Aprovado', recusado: 'Recusado' };
    return `
      <div class="kanban-card" draggable="true" data-id="${o.id}" data-status="${o.status || 'rascunho'}">
        <div class="kanban-card-corpo">
          ${o.numero ? `<div class="orc-kb-numero"><span>${o.numero}</span>${convertido}</div>` : ''}
          <div class="kanban-card-nome"><strong>${o.nome || 'Orçamento sem nome'}</strong></div>
          <div class="kanban-card-desc">${o.clienteNome || 'Cliente avulso'}${o.tecnica ? ' · ' + capitalizarTexto(o.tecnica) : ''}</div>
          <div class="kanban-card-meta">
            <span style="font-weight:700;">${this.fmt(o.preco, o.moeda || this.moeda)}</span>
            ${dims ? `<span class="orc-kb-dims">${dims}cm</span>` : ''}
          </div>
        </div>
        <div class="kanban-card-acoes">
          <button class="btn-miniatura btn-orc-carregar" data-id="${o.id}" title="Carregar na calculadora" aria-label="Carregar na calculadora">✎</button>
          <button class="btn-miniatura btn-orc-pdf" data-id="${o.id}" title="Exportar proposta PDF" aria-label="Exportar proposta PDF">📄</button>
          <button class="btn-miniatura btn-orc-encomenda" data-id="${o.id}" title="Criar encomenda" aria-label="Criar encomenda">📦</button>
          ${o.status === 'aprovado' && !o.convertidoEm ? `<button class="btn-miniatura btn-orc-venda" data-id="${o.id}" title="Aprovar e registrar venda" aria-label="Registrar venda">💰</button>` : ''}
          <button class="kanban-mobile-menu-btn" data-id="${o.id}" title="Mover etapa / excluir" aria-label="Mais ações"><i class="fas fa-ellipsis-v"></i></button>
          <div class="kanban-mobile-dropdown" data-id="${o.id}">
            ${outrosStatus.map(s => `<button class="kanban-mover-btn" data-id="${o.id}" data-status="${s.status}"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${s.cor};margin-right:6px;"></span>${s.rotulo}</button>`).join('')}
            <button class="kanban-mover-btn btn-orc-excluir" data-id="${o.id}" style="color:#dc2626;">✕ Excluir</button>
          </div>
        </div>
      </div>
    `;
  }

  renderOrcamentosLista(lista) {
    const statusRotulos = { rascunho: 'Rascunho', enviado: 'Enviado', aprovado: 'Aprovado', recusado: 'Recusado' };
    return `
      <div class="orcamentos-lista">
        ${lista.map(o => {
          const dims = [o.largura, o.altura, o.profundidade].filter(Boolean).join('×');
          return `
          <div class="orcamento-item" data-id="${o.id}">
            <div class="orc-ident">
              <div class="orc-nome">${o.nome || 'Orçamento sem nome'} <span class="orc-status st-${o.status || 'rascunho'}">${statusRotulos[o.status] || 'Rascunho'}</span>${o.convertidoEm ? ' <span class="orc-convertido">✓ Vendido</span>' : ''}</div>
              <div class="orc-meta">${o.numero ? o.numero + ' · ' : ''}${o.clienteNome || 'Cliente avulso'}${o.tecnica ? ' · ' + capitalizarTexto(o.tecnica) : ''}${dims ? ' · ' + dims + 'cm' : ''} · ${formatarData(o.data || o.criadoEm)}${o.validadeData ? ' · válido até ' + formatarData(o.validadeData) : ''}</div>
            </div>
            <div class="orc-preco">${this.fmt(o.preco, o.moeda || this.moeda)}</div>
            <div class="orc-acoes">
              <select class="orc-status-select" data-acao="status" aria-label="Alterar status do orçamento">
                ${Object.keys(statusRotulos).map(s => `<option value="${s}" ${(o.status || 'rascunho') === s ? 'selected' : ''}>${statusRotulos[s]}</option>`).join('')}
              </select>
              <button class="btn-miniatura btn-orc-carregar" data-id="${o.id}" title="Carregar na calculadora" aria-label="Carregar na calculadora">✎ Carregar</button>
              <button class="btn-miniatura btn-orc-pdf" data-id="${o.id}" title="Exportar proposta PDF" aria-label="Exportar proposta PDF">📄</button>
              <button class="btn-miniatura btn-orc-encomenda" data-id="${o.id}" title="Criar encomenda" aria-label="Criar encomenda">📦</button>
              ${o.status === 'aprovado' && !o.convertidoEm ? `<button class="btn-miniatura btn-orc-venda" data-id="${o.id}" title="Aprovar e registrar venda" aria-label="Registrar venda">💰 Venda</button>` : ''}
              <button class="btn-miniatura btn-orc-excluir" data-id="${o.id}" style="color:#dc2626;" title="Excluir orçamento" aria-label="Excluir orçamento">✕</button>
            </div>
          </div>`;
        }).join('')}
      </div>
    `;
  }

  // --- Cálculo ---
  calcularBreakdown(c) {
    const materiais = Number(c.materiais) || 0;
    const horas = Number(c.horas) || 0;
    const valorHora = Number(c.valorHora) || 60;
    const complexidade = Math.max(1, Math.min(5, Number(c.complexidade) || 3));
    const mult = Number(c.multiplicador) || this.config.multiplicadorExperiencia || 1.5;
    const fator = this.fatoresComplexidade[complexidade] || 1.0;
    const maoObra = horas * valorHora;
    const custoTotal = materiais + maoObra;
    const largura = Number(c.largura) || 0;
    const altura = Number(c.altura) || 0;
    const profundidade = Number(c.profundidade) || 0;
    const area = largura * altura;
    const bonus = area > 0 ? 1 + (area / 10000) : 1;
    const precoBruto = custoTotal * mult * fator * bonus;
    const arred = Number(c.arredondamento) || 0;
    const preco = arred > 0 ? Math.max(arred, Math.round(precoBruto / arred) * arred) : Math.round(precoBruto);
    const lucro = preco - custoTotal;
    const margem = preco > 0 ? (lucro / preco) * 100 : 0;
    const markup = custoTotal > 0 ? preco / custoTotal : 0;
    return { materiais, horas, valorHora, maoObra, custoTotal, fator, mult, bonus, arred, precoBruto, preco, lucro, margem, markup, largura, altura, profundidade, area };
  }

  calcularPreco(c) {
    return this.calcularBreakdown(c).preco;
  }

  detalharCalculo(preco) {
    const b = this.calcularBreakdown(this.calc);
    const formula = `${this.fmt(b.materiais)} + (${b.horas}h × ${this.fmt(b.valorHora)}) = ${this.fmt(b.custoTotal)}`;
    return `${formula} × ${b.mult} × ${b.fator}${b.bonus !== 1 ? ` × ${b.bonus.toFixed(2)} (área)` : ''} = ${this.fmt(preco)}`;
  }

  renderBreakdown(b) {
    const margemClasse = b.margem >= 50 ? 'bd-ok' : b.margem >= 25 ? 'bd-medio' : 'bd-baixo';
    return `
      <div class="bd-item"><span class="bd-label">Custo materiais</span><span class="bd-valor">${this.fmt(b.materiais)}</span></div>
      <div class="bd-item"><span class="bd-label">Mão de obra (${b.horas}h × ${this.fmt(b.valorHora)})</span><span class="bd-valor">${this.fmt(b.maoObra)}</span></div>
      <div class="bd-item bd-total"><span class="bd-label">Custo total</span><span class="bd-valor">${this.fmt(b.custoTotal)}</span></div>
      <div class="bd-item"><span class="bd-label">Multiplicador</span><span class="bd-valor">× ${b.mult}</span></div>
      <div class="bd-item"><span class="bd-label">Complexidade</span><span class="bd-valor">× ${b.fator}</span></div>
      ${b.bonus !== 1 ? `<div class="bd-item"><span class="bd-label">Bônus área (${(b.area / 10000).toFixed(2)} m²)</span><span class="bd-valor">× ${b.bonus.toFixed(2)}</span></div>` : ''}
      <div class="bd-item"><span class="bd-label">Lucro estimado</span><span class="bd-valor">${this.fmt(b.lucro)}</span></div>
      <div class="bd-item"><span class="bd-label">Markup</span><span class="bd-valor">${b.markup.toFixed(2)}×</span></div>
      <div class="bd-item"><span class="bd-label">Margem</span><span class="bd-valor ${margemClasse}">${b.margem.toFixed(1)}%</span></div>
    `;
  }

  renderRegraAuto() {
    const c = this.calc;
    const largura = Number(c.largura) || 0;
    const altura = Number(c.altura) || 0;
    const area = largura * altura;
    if (!area) return '';
    const regra = this.regras.find(r => {
      if (r.tecnica && c.tecnica && r.tecnica !== c.tecnica) return false;
      if (largura && (largura < r.larguraMin || largura > r.larguraMax)) return false;
      if (altura && (altura < r.alturaMin || altura > r.alturaMax)) return false;
      return true;
    });
    if (!regra) return '';
    const precoRegra = Math.round((regra.precoBase || 0) * regra.multiplicador * this.fatoresComplexidade[regra.complexidade || 3] * (1 + area / 10000));
    const sugerido = this.calcularPreco(this.calc);
    return `
      <div class="regra-auto">
        <span class="ra-icone">⚡</span>
        <div class="ra-texto">
          <strong>Regra automática aplicável: ${regra.nome}</strong>
          <span class="texto-ajuda">Preço pela regra: ${this.fmt(precoRegra)}${sugerido > 0 ? ` · Sugerido: ${this.fmt(sugerido)}` : ''}</span>
        </div>
      </div>
    `;
  }

  renderFaixaComparativa(obras) {
    const c = this.calc;
    const area = (Number(c.largura) || 0) * (Number(c.altura) || 0);
    if (!area || obras.length < 2) return '';
    const similares = obras.filter(o => {
      const dim = o.dimensoes;
      if (!dim || !dim.largura || !dim.altura) return false;
      const oArea = dim.largura * dim.altura;
      return oArea > area * 0.5 && oArea < area * 1.5 && o.preco > 0;
    });
    if (similares.length < 2) return '';
    const precos = similares.map(o => Number(o.preco)).sort((a, b) => a - b);
    const min = precos[0], max = precos[precos.length - 1];
    const media = Math.round(precos.reduce((s, v) => s + v, 0) / precos.length);
    return `
      <div class="faixa-comparativo">
        <div class="faixa-item"><div class="faixa-valor">${this.fmt(min)}</div><div class="faixa-rotulo">Menor similar</div></div>
        <div class="faixa-item"><div class="faixa-valor">${this.fmt(media)}</div><div class="faixa-rotulo">Média similares</div></div>
        <div class="faixa-item"><div class="faixa-valor">${this.fmt(max)}</div><div class="faixa-rotulo">Maior similar</div></div>
      </div>
    `;
  }

  // --- Break-Even ---
  renderBreakEven(obras) {
    const comCusto = obras.filter(o => (o.custoMateriais > 0 || o.horasTrabalho > 0) && o.preco > 0);
    if (comCusto.length === 0) return '';

    const linhas = comCusto.map(o => {
      const custoMat = Number(o.custoMateriais) || 0;
      const horas = Number(o.horasTrabalho) || 0;
      const vh = this.config.valorHora || 60;
      const custoTotal = custoMat + (horas * vh);
      const preco = Number(o.preco) || 0;
      const margem = preco > 0 ? ((preco - custoTotal) / preco) * 100 : 0;
      const markup = custoTotal > 0 ? preco / custoTotal : 0;
      const classeMargem = margem >= 50 ? 'be-alta' : margem >= 25 ? 'be-media' : 'be-baixa';
      return `<tr class="${classeMargem}">
        <td>${o.titulo || 'Sem título'}</td>
        <td>${this.fmt(custoTotal)}</td>
        <td>${this.fmt(preco)}</td>
        <td class="be-num">${margem.toFixed(1)}%</td>
        <td class="be-num">${markup.toFixed(2)}×</td>
        <td>${this.fmt(preco - custoTotal)}</td>
      </tr>`;
    }).join('');

    return `
      <div class="card card-full">
        <h3><i class="fas fa-chart-bar"></i> Análise de Break-Even</h3>
        <div class="be-tabela-wrapper">
          <table class="be-tabela">
            <caption class="sr-only">Análise de Break-Even</caption>
            <thead><tr>
              <th>Obra</th><th>Custo Total</th><th>Preço</th><th>Margem</th><th>Markup</th><th>Lucro</th>
            </tr></thead>
            <tbody>${linhas}</tbody>
          </table>
        </div>
        <div class="be-legend">
          <span class="be-tag be-alta">≥ 50% margem</span>
          <span class="be-tag be-media">25–50%</span>
          <span class="be-tag be-baixa">< 25%</span>
        </div>
      </div>
    `;
  }

  // --- ML Accuracy ---
  renderMLCard(obras, vendas) {
    const comHistorico = obras.filter(o => o.historicoPrecos && o.historicoPrecos.length > 0 && o.dimensoes && o.dimensoes.largura);
    if (comHistorico.length < 2) return '';

    let acertos = 0, erros = 0, erroTotal = 0;
    const amostras = [];
    comHistorico.forEach(o => {
      const calcTemp = {
        materiais: Number(o.custoMateriais) || 0,
        horas: Number(o.horasTrabalho) || 0,
        valorHora: this.config.valorHora || 60,
        largura: o.dimensoes.largura,
        altura: o.dimensoes.altura,
        complexidade: 3
      };
      const sugerido = this.calcularPreco(calcTemp);
      const real = Number(o.preco) || 0;
      if (real > 0) {
        const diff = Math.abs(sugerido - real);
        erroTotal += diff;
        const pctErro = (diff / real) * 100;
        if (pctErro <= 20) acertos++;
        else erros++;
        amostras.push({ titulo: o.titulo, real, sugerido, pctErro });
      }
    });

    const total = acertos + erros;
    if (total === 0) return '';
    const hitRate = (acertos / total) * 100;
    const erroMedio = erroTotal / total;
    const ultimas = amostras.sort((a, b) => b.pctErro - a.pctErro).slice(0, 5);

    return `
      <div class="card card-full">
        <h3>🤖 Precisão (ML) — Sugestão vs. Realidade</h3>
        <div class="ml-precisao-grid">
          <div class="ml-precisao-card ${hitRate >= 70 ? 'ml-bom' : hitRate >= 40 ? 'ml-medio' : 'ml-ruim'}">
            <div class="ml-numero">${hitRate.toFixed(0)}%</div>
            <div class="ml-rotulo">Hit Rate</div>
            <div class="ml-sub">${acertos}/${total} dentro de 20% do real</div>
          </div>
          <div class="ml-precisao-card">
            <div class="ml-numero">${this.fmt(erroMedio)}</div>
            <div class="ml-rotulo">Erro Médio Absoluto</div>
          </div>
          <div class="ml-precisao-card">
            <div class="ml-numero">${erros}</div>
            <div class="ml-rotulo">Fora da Margem</div>
          </div>
        </div>
        ${ultimas.length > 0 ? `
        <h4 style="margin:12px 0 6px;font-size:0.8rem;color:var(--text-muted);">Maiores discrepâncias</h4>
        <table class="be-tabela">
          <caption class="sr-only">Maiores discrepâncias entre preço sugerido e real</caption>
          <thead><tr><th>Obra</th><th>Sugerido</th><th>Real</th><th>Erro</th></tr></thead>
          <tbody>${ultimas.map(u => `<tr class="${u.pctErro > 20 ? 'be-baixa' : 'be-alta'}">
            <td>${u.titulo || '—'}</td>
            <td>${this.fmt(u.sugerido)}</td>
            <td>${this.fmt(u.real)}</td>
            <td>${u.pctErro.toFixed(0)}%</td>
          </tr>`).join('')}</tbody>
        </table>` : ''}
      </div>
    `;
  }

  // --- Projeção de Preços ---
  renderProjecao(obras) {
    const comHistorico = obras.filter(o => o.historicoPrecos && o.historicoPrecos.length >= 2);
    if (comHistorico.length === 0) return '';

    const selOpts = comHistorico.map(o =>
      `<option value="${o.id}">${o.titulo || 'Sem título'}</option>`
    ).join('');

    const obra = comHistorico[0];
    const proj = this.projetarPreco(obra);

    return `
      <div class="card card-full">
        <h3>🔮 Projeção de Valorização</h3>
        <div style="margin-bottom:12px;">
          <select id="selProjecaoObra" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;">${selOpts}</select>
        </div>
        ${this.renderProjecaoDetalhe(obra, proj)}
      </div>
    `;
  }

  projetarPreco(obra) {
    const hist = obra.historicoPrecos || [];
    const pts = hist.map(h => ({ preco: Number(h.preco), data: new Date(h.data).getTime() }));
    pts.push({ preco: Number(obra.preco) || 0, data: Date.now() });
    const precos = pts.filter(p => p.preco > 0);
    if (precos.length < 2) return null;

    const n = precos.length;
    const xMean = (n - 1) / 2;
    let yMean = 0;
    precos.forEach(p => yMean += p.preco);
    yMean /= n;

    let num = 0, den = 0;
    precos.forEach((p, i) => {
      num += (i - xMean) * (p.preco - yMean);
      den += (i - xMean) * (i - xMean);
    });
    const inclinacao = den !== 0 ? num / den : 0;
    const intercept = yMean - inclinacao * xMean;

    const anos = [1, 3, 5];
    const ultimo = precos[precos.length - 1].preco;
    const projecoes = anos.map(a => {
      const passos = Math.round(a * 12 / Math.max(1, Math.round((pts[pts.length - 1].data - pts[0].data) / (86400000 * 30))));
      const totalPassos = n + passos;
      const projetado = Math.max(0, inclinacao * (totalPassos - 1) + intercept);
      const aprecAnual = ultimo > 0 ? (((projetado / ultimo) ** (1 / a)) - 1) * 100 : 0;
      return { anos: a, projetado: Math.round(projetado), aprecAnual };
    });

    return { ultimo, inclinacao, intercept, projecoes, r2: this.calcularR2(precos, inclinacao, intercept) };
  }

  calcularR2(precos, inclinacao, intercept) {
    const n = precos.length;
    let yMean = 0;
    precos.forEach(p => yMean += p.preco);
    yMean /= n;
    let ssRes = 0, ssTot = 0;
    precos.forEach((p, i) => {
      const pred = inclinacao * i + intercept;
      ssRes += (p.preco - pred) ** 2;
      ssTot += (p.preco - yMean) ** 2;
    });
    return ssTot > 0 ? 1 - ssRes / ssTot : 0;
  }

  renderProjecaoDetalhe(obra, proj) {
    if (!proj) return '<p style="color:var(--text-muted);">Dados insuficientes para projeção (mín. 2 pontos).</p>';

    return `
      <div class="projecao-grid">
        ${proj.projecoes.map(p => `
          <div class="projecao-card">
            <div class="proj-numero">${this.fmt(p.projetado)}</div>
            <div class="proj-rotulo">Em ${p.anos} ano${p.anos > 1 ? 's' : ''}</div>
            <div class="proj-apreciacao ${p.aprecAnual > 0 ? 'proj-positiva' : 'proj-negativa'}">
              ${p.aprecAnual > 0 ? '<i class="fas fa-chart-line"></i>' : '📉'} ${p.aprecAnual.toFixed(1)}% a.a.
            </div>
          </div>
        `).join('')}
      </div>
      <div class="proj-detalhes">
        <span>Preço atual: <strong>${this.fmt(proj.ultimo)}</strong></span>
        <span>R²: <strong>${proj.r2.toFixed(3)}</strong> ${proj.r2 > 0.7 ? '(boa correlação)' : proj.r2 > 0.3 ? '(correlação moderada)' : '(baixa correlação)'}</span>
        <span>Baseado em regressão linear sobre histórico de preços</span>
      </div>
    `;
  }

  // --- Regras de Precificação ---
  renderModalRegras() {
    const regras = this.regras;
    return `
      <div class="widget-config-overlay" id="regrasOverlay" style="display:none">
        <div class="widget-config-modal" style="max-width:800px;">
          <h3><i class="fas fa-clipboard"></i> Regras de Precificação</h3>
          <p class="texto-ajuda">Defina regras automáticas: técnica + dimensão → preço sugerido. Use "qualquer" para técnica.</p>
          <div class="regras-lista" id="regrasLista">
            ${regras.length === 0 ? '<p style="color:var(--text-muted);text-align:center;">Nenhuma regra cadastrada.</p>' : ''}
            ${regras.map((r, i) => `
              <div class="regra-item" data-regra-idx="${i}">
                <div class="regra-info">
                  <strong>${r.nome}</strong>
                  <span class="texto-ajuda">${r.tecnica || 'qualquer'} · ${r.larguraMin}–${r.larguraMax}×${r.alturaMin}–${r.alturaMax}cm · ×${r.multiplicador} · base ${this.fmt(r.precoBase)}</span>
                </div>
                <div class="regra-acoes">
                  <button class="btn-miniatura btn-aplicar-regra" data-idx="${i}">▶ Aplicar</button>
                  <button class="btn-miniatura btn-remover-regra" data-idx="${i}" style="color:#dc2626;" aria-label="Remover regra">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
          <hr style="margin:12px 0;border-color:var(--border);">
          <h4 style="margin:0 0 8px;font-size:0.85rem;">Nova Regra</h4>
          <div class="regra-form">
            <input type="text" id="regraNome" placeholder="Nome da regra" class="regra-input" aria-label="Nome da regra">
            <select id="regraTecnica" class="regra-input" aria-label="Técnica">
              <option value="">Qualquer técnica</option>
              <option value="óleo">Óleo</option>
              <option value="aquarela">Aquarela</option>
              <option value="escultura">Escultura</option>
              <option value="acrílica">Acrílica</option>
              <option value="outra">Outra</option>
            </select>
            <div style="display:flex;gap:6px;grid-column:1/-1;">
              <input type="number" id="regraLargMin" placeholder="Larg. min (cm)" class="regra-input" style="flex:1" aria-label="Largura mínima">
              <input type="number" id="regraLargMax" placeholder="Larg. max (cm)" class="regra-input" style="flex:1" aria-label="Largura máxima">
              <input type="number" id="regraAltMin" placeholder="Alt. min (cm)" class="regra-input" style="flex:1" aria-label="Altura mínima">
              <input type="number" id="regraAltMax" placeholder="Alt. max (cm)" class="regra-input" style="flex:1" aria-label="Altura máxima">
            </div>
            <div style="display:flex;gap:6px;grid-column:1/-1;">
              <input type="number" id="regraMult" placeholder="Multiplicador (ex: 2.0)" class="regra-input" value="1.5" style="flex:1" aria-label="Multiplicador">
              <input type="number" id="regraBase" placeholder="Preço base" class="regra-input" value="0" style="flex:1" aria-label="Preço base">
              <input type="number" id="regraComplexidade" placeholder="Complexidade (1-5)" class="regra-input" value="3" min="1" max="5" style="flex:1" aria-label="Complexidade">
            </div>
            <button class="btn-primario" id="btnAdicionarRegra" style="grid-column:1/-1;">+ Adicionar Regra</button>
          </div>
          <div class="modal-acoes" style="margin-top:12px;">
            <button class="btn-secundario" id="btnAplicarRegrasTodas">▶ Aplicar todas as regras em obras sem preço</button>
            <button class="btn-secundario" id="btnFecharRegras">Fechar</button>
          </div>
        </div>
      </div>
    `;
  }

  renderModalTaxas() {
    const tx = this.taxas;
    return `
      <div class="widget-config-overlay" id="taxasOverlay" style="display:none">
        <div class="widget-config-modal" style="max-width:400px;">
          <h3>💱 Taxas de Câmbio</h3>
          <p class="texto-ajuda">Valor de 1 ${this.moeda} em cada moeda. Deixe 1 para a moeda padrão.</p>
          <div class="taxas-form">
            ${['USD','EUR','GBP'].map(m => `
              <div class="taxa-item">
                <label>${m}</label>
                <input type="number" id="taxa${m}" value="${tx[m] || 1}" step="0.01" min="0.01" aria-label="Taxa de câmbio ${m}">
              </div>
            `).join('')}
          </div>
          <div class="modal-acoes">
            <button class="btn-secundario" id="btnFecharTaxas">Fechar</button>
            <button class="btn-primario" id="btnSalvarTaxas">Salvar</button>
          </div>
        </div>
      </div>
    `;
  }

  // --- Histórico de Preços ---
  renderHistoricoPrecos(obras) {
    const comHistorico = obras.filter(o => o.historicoPrecos && o.historicoPrecos.length > 0);
    if (comHistorico.length === 0) return '';

    const obra = comHistorico[0];
    const hist = obra.historicoPrecos;
    const precos = hist.map(h => Number(h.preco)).concat([Number(obra.preco) || 0]).filter(p => p > 0);
    if (precos.length < 2) return '';

    const maxP = Math.max(...precos) * 1.15;
    const minP = Math.min(...precos) * 0.85;
    const range = maxP - minP || 1;
    const w = 400, h = 140;
    const padX = 40, padY = 20;
    const cw = w - padX * 2, ch = h - padY * 2;

    const pts = precos.map((p, i) => ({
      x: padX + (i / (precos.length - 1 || 1)) * cw,
      y: padY + ch - ((p - minP) / range) * ch,
      valor: p,
      label: i < hist.length ? (hist[i].data?.slice(0, 7) || '') : 'Atual'
    }));

    const lineD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const areaD = `M${pts[0].x},${padY + ch} ${lineD.slice(1)} L${pts[pts.length - 1].x},${padY + ch} Z`;

    const vendas = vendaStore().items || [];
    const vendaObra = vendas.filter(v => String(v.obraId) === obra.id || v.obraTitulo === obra.titulo);

    const selOpts = comHistorico.map(o =>
      `<option value="${o.id}">${o.titulo || 'Sem título'}</option>`
    ).join('');

    return `
      <div class="card">
        <h3><i class="fas fa-clipboard"></i> Histórico de Preços</h3>
        <div style="margin-bottom:12px;">
          <select id="selHistoricoObra" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
            ${selOpts}
          </select>
          <span style="font-size:0.75rem;color:var(--text-muted);margin-left:8px;">${obra.titulo} — ${hist.length} reajustes</span>
        </div>
        <svg viewBox="0 0 ${w} ${h}" class="svg-chart" style="height:${h}px;">
          <defs><linearGradient id="gradArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--accent)"/><stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
          ${[0.25,0.5,0.75].map(f => `<line class="chart-grid" x1="${padX}" y1="${padY + ch - ch * f}" x2="${padX + cw}" y2="${padY + ch - ch * f}"/>`).join('')}
          ${[0,0.25,0.5,0.75,1].map(f => `<text class="chart-label" x="${padX - 8}" y="${padY + ch - ch * f + 3}" text-anchor="end">${this.fmt(minP + range * f)}</text>`).join('')}
          <path class="chart-area" d="${areaD}"/>
          <path class="chart-line" d="${lineD}"/>
          ${pts.map((p, i) => `<circle class="chart-dot ${i < hist.length && vendaObra.some(v => v.dataVenda && new Date(v.dataVenda) >= new Date(hist[i].data || 0) - 86400000 && new Date(v.dataVenda) <= new Date(hist[i].data || Date.now()) + 86400000) ? 'vendido' : ''}" cx="${p.x}" cy="${p.y}"/>`).join('')}
          ${pts.map(p => `<text class="chart-valor" x="${p.x}" y="${p.y - 8}">${this.fmt(p.valor)}</text>`).join('')}
          ${pts.map(p => `<text class="chart-label" x="${p.x}" y="${padY + ch + 14}">${p.label}</text>`).join('')}
        </svg>
        <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;display:flex;gap:12px;justify-content:center;">
          <span>━ <span style="color:var(--accent)">Evolução</span></span>
          <span>● <span style="color:#10b981">Vendido</span></span>
        </div>
      </div>
    `;
  }

  // --- Análise ---
  renderAnalise(obras, vendas) {
    const precos = obras.filter(o => Number(o.preco) > 0).map(o => Number(o.preco));
    const precoMedio = precos.length ? Math.round(precos.reduce((s, v) => s + v, 0) / precos.length) : 0;
    const maiorPreco = precos.length ? Math.max(...precos) : 0;
    const menorPreco = precos.length ? Math.min(...precos) : 0;
    const valorTotal = precos.reduce((s, v) => s + v, 0);

    const tecnicas = {};
    obras.forEach(o => {
      if (!o.preco) return;
      const tec = o.tecnica || 'Outra';
      if (!tecnicas[tec]) tecnicas[tec] = { soma: 0, count: 0 };
      tecnicas[tec].soma += Number(o.preco);
      tecnicas[tec].count++;
    });

    const tecRows = Object.entries(tecnicas).map(([tec, d]) => ({
      tec, media: Math.round(d.soma / d.count), count: d.count
    })).sort((a, b) => b.media - a.media);

    const numBarras = 8;
    const maxPreco = Math.max(...precos, 1);
    const bucketSize = maxPreco / numBarras || 1;
    const buckets = Array(numBarras).fill(0);
    const bucketLabels = [];
    for (let i = 0; i < numBarras; i++) {
      bucketLabels.push(`${this.fmt(i * bucketSize)}–${this.fmt((i + 1) * bucketSize)}`);
    }
    precos.forEach(p => {
      const idx = Math.min(Math.floor(p / bucketSize), numBarras - 1);
      buckets[idx]++;
    });
    const maxCount = Math.max(...buckets, 1);
    const histBars = buckets.map((c, i) => `<div class="barra" style="height:${(c / maxCount) * 100}%"><span class="barra-count">${c}</span><span class="barra-label">${bucketLabels[i]}</span></div>`).join('');

    const subprecificadas = obras.filter(o => {
      if (!o.preco || !o.dimensoes || !o.dimensoes.largura || !o.dimensoes.altura) return false;
      const area = o.dimensoes.largura * o.dimensoes.altura;
      const similares = obras.filter(s => {
        if (s.id === o.id || !s.preco) return false;
        const sd = s.dimensoes;
        if (!sd || !sd.largura || !sd.altura) return false;
        const sa = sd.largura * sd.altura;
        return sa > area * 0.5 && sa < area * 1.5;
      });
      if (similares.length < 2) return false;
      const mediaSimilar = similares.reduce((s, v) => s + Number(v.preco), 0) / similares.length;
      return Number(o.preco) < mediaSimilar * 0.7;
    });

    const vendasComObra = vendas.filter(v => v.dataVenda && v.obraId);
    const temposVenda = vendasComObra.map(v => {
      const obra = obras.find(o => o.id === v.obraId);
      if (!obra || !obra.criadoEm) return null;
      const criacao = new Date(obra.criadoEm).getTime();
      const venda = new Date(v.dataVenda).getTime();
      return venda > criacao ? Math.round((venda - criacao) / 86400000) : null;
    }).filter(t => t !== null);
    const tempoMedio = temposVenda.length ? Math.round(temposVenda.reduce((s, t) => s + t, 0) / temposVenda.length) : null;

    return `
      <div class="analise-grid" style="margin-bottom:16px;">
        <div class="analise-card"><div class="analise-valor">${this.fmt(precoMedio)}</div><div class="analise-rotulo"><i class="fas fa-dollar-sign"></i> Preço médio</div></div>
        <div class="analise-card"><div class="analise-valor">${this.fmt(valorTotal)}</div><div class="analise-rotulo"><i class="fas fa-box"></i> Valor total do portfólio</div></div>
        <div class="analise-card"><div class="analise-valor">${precos.length}</div><div class="analise-rotulo">🗃️ Obras precificadas</div></div>
        <div class="analise-card"><div class="analise-valor">${this.fmt(menorPreco)} — ${this.fmt(maiorPreco)}</div><div class="analise-rotulo">📐 Faixa de preços</div></div>
        <div class="analise-card"><div class="analise-valor">${tempoMedio !== null ? tempoMedio + ' dias' : '—'}</div><div class="analise-rotulo">⏱ Tempo médio p/ vender</div></div>
        <div class="analise-card"><div class="analise-valor">${subprecificadas.length}</div><div class="analise-rotulo">⚡ Possivelmente subprecificadas</div></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div>
          <h4 style="margin:0 0 8px;font-size:0.85rem;color:var(--text-muted);">Distribuição de Preços</h4>
          <div class="histograma">${histBars}</div>
        </div>
        <div>
          <h4 style="margin:0 0 8px;font-size:0.85rem;color:var(--text-muted);">Média de Preço por Técnica</h4>
          <table class="tabela-media">
            <caption class="sr-only">Média de preço por técnica</caption>
            <tr><th>Técnica</th><th>Média</th><th>Obras</th></tr>
            ${tecRows.map(r => `<tr><td>${r.tec}</td><td>${this.fmt(r.media)}</td><td>${r.count}</td></tr>`).join('')}
          </table>
        </div>
      </div>
      ${subprecificadas.length > 0 ? `
      <div style="margin-top:16px;">
        <h4 style="margin:0 0 8px;font-size:0.85rem;color:#92400e;">⚡ Obras que podem estar subprecificadas</h4>
        <ul class="sub-list">
          ${subprecificadas.map(o => {
            const area = o.dimensoes.largura * o.dimensoes.altura;
            const similares = obras.filter(s => {
              if (s.id === o.id || !s.preco) return false;
              const sd = s.dimensoes;
              if (!sd || !sd.largura || !sd.altura) return false;
              const sa = sd.largura * sd.altura;
              return sa > area * 0.5 && sa < area * 1.5;
            });
            const mediaSimilar = similares.reduce((s, v) => s + Number(v.preco), 0) / similares.length;
            const diff = Math.round(mediaSimilar - Number(o.preco));
            return `<li class="sub-alert"><span class="sub-nome">${o.titulo || 'Sem título'}</span><span class="sub-valores">Atual: ${this.fmt(o.preco)} | Sugerido: ${this.fmt(mediaSimilar)}</span><span class="sub-diff">+${this.fmt(diff)}</span></li>`;
          }).join('')}
        </ul>
      </div>` : ''}
    `;
  }

  // --- Metas ---
  renderMetas(obras, vendas) {
    const cfg = this.config;
    const metaMensal = Number(cfg.metaMensal) || 10000;
    const metaAnual = Number(cfg.metaAnual) || 120000;

    const agora = new Date();
    const mesAtual = agora.getMonth();
    const anoAtual = agora.getFullYear();

    const faturamentoMes = vendas.filter(v => {
      if (!v.dataVenda || !v.valorTotal) return false;
      const d = new Date(v.dataVenda);
      return d.getMonth() === mesAtual && d.getFullYear() === anoAtual;
    }).reduce((s, v) => s + Number(v.valorTotal), 0);

    const faturamentoAno = vendas.filter(v => {
      if (!v.dataVenda || !v.valorTotal) return false;
      const d = new Date(v.dataVenda);
      return d.getFullYear() === anoAtual;
    }).reduce((s, v) => s + Number(v.valorTotal), 0);

    const pctMes = Math.min(100, metaMensal > 0 ? Math.round((faturamentoMes / metaMensal) * 100) : 0);
    const pctAno = Math.min(100, metaAnual > 0 ? Math.round((faturamentoAno / metaAnual) * 100) : 0);

    const diaAtual = agora.getDate();
    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
    const diasRestantes = diasNoMes - diaAtual;
    const ritmoDiario = diaAtual > 0 ? faturamentoMes / diaAtual : 0;
    const diasParaMeta = ritmoDiario > 0 ? Math.ceil((metaMensal - faturamentoMes) / ritmoDiario) : null;
    const projecao = ritmoDiario > 0
      ? `Com o ritmo atual (${this.fmt(Math.round(ritmoDiario))}/dia), você ${diasParaMeta !== null && diasParaMeta <= diasRestantes ? `atingirá a meta mensal em <strong>${diasParaMeta} dias</strong>.` : `<strong>não</strong> atingirá a meta mensal a tempo.`}`
      : '';

    const falta = Math.max(0, metaMensal - faturamentoMes);
    const precos = obras.filter(o => Number(o.preco) > 0);
    const precoMedio = precos.length > 0 ? precos.reduce((s, o) => s + Number(o.preco), 0) / precos.length : 0;
    const obrasNecessarias = precoMedio > 0 ? Math.ceil(falta / precoMedio) : 0;
    const sugestao = falta > 0 && precoMedio > 0
      ? `Você precisa vender <strong>${obrasNecessarias} obra${obrasNecessarias > 1 ? 's' : ''}</strong> de ~${this.fmt(Math.round(precoMedio))} para atingir a meta mensal.`
      : 'Meta mensal já atingida! 🎉';

    const circM = this.circuloProgresso(pctMes, `${pctMes}%`, 'do mês');
    const circA = this.circuloProgresso(pctAno, `${pctAno}%`, 'do ano');

    return `
      <div class="metas-grid">
        <div class="card meta-card">
          <div class="meta-rotulo">Meta Mensal</div>
          <div class="meta-valor">${this.fmt(metaMensal)}</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin:8px 0;">
            <span style="font-size:0.85rem;color:var(--text-muted);">Faturamento: ${this.fmt(faturamentoMes)}</span>
          </div>
          ${circM}
          <div class="meta-edit">
            <input type="number" id="metaMensalInput" value="${metaMensal}" min="0" step="100" aria-label="Meta mensal">
            <button class="btn-secundario" id="btnSalvarMetaMensal">Salvar</button>
          </div>
          ${projecao ? `<div class="meta-projecao"><i class="fas fa-chart-line"></i> ${projecao}</div>` : ''}
          ${sugestao ? `<div class="meta-sugestao"><i class="fas fa-lightbulb"></i> ${sugestao}</div>` : ''}
        </div>
        <div class="card meta-card">
          <div class="meta-rotulo">Meta Anual</div>
          <div class="meta-valor">${this.fmt(metaAnual)}</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin:8px 0;">
            <span style="font-size:0.85rem;color:var(--text-muted);">Faturamento: ${this.fmt(faturamentoAno)}</span>
          </div>
          ${circA}
          <div class="meta-edit">
            <input type="number" id="metaAnualInput" value="${metaAnual}" min="0" step="1000" aria-label="Meta anual">
            <button class="btn-secundario" id="btnSalvarMetaAnual">Salvar</button>
          </div>
          <div class="meta-projecao">📆 ${diasRestantes} dias restantes no mês</div>
        </div>
      </div>
    `;
  }

  circuloProgresso(pct, label, subtitulo) {
    const r = 56, circ = 2 * Math.PI * r;
    const offset = circ - (pct / 100) * circ;
    return `
      <div class="circulo-progresso">
        <svg viewBox="0 0 140 140">
          <circle class="bg-circle" cx="70" cy="70" r="${r}"/>
          <circle class="progress-circle" cx="70" cy="70" r="${r}" stroke-dasharray="${circ}" stroke-dashoffset="${offset}"/>
        </svg>
        <div class="centro-texto">
          <div class="pct">${label}</div>
          <div class="pct-label">${subtitulo}</div>
        </div>
      </div>
    `;
  }

  // --- EVENT BINDING ---
  aposRenderizar() {
    this.removerListeners();

    // Moeda padrão
    const selMoeda = document.getElementById('selMoedaPadrao');
    if (selMoeda) {
      const handler = () => {
        this.cfgRoot.moedaPadrao = selMoeda.value;
        configStore().salvar();
        this.rerenderizar();
      };
      selMoeda.addEventListener('change', handler);
      this._bindCache['selMoedaPadrao'] = { el: selMoeda, handler, type: 'change' };
    }

    document.getElementById('btnEditarTaxas')?.addEventListener('click', () => {
      document.getElementById('taxasOverlay').style.display = 'flex';
    });
    document.getElementById('btnFecharTaxas')?.addEventListener('click', () => {
      document.getElementById('taxasOverlay').style.display = 'none';
    });
    document.getElementById('btnSalvarTaxas')?.addEventListener('click', () => {
      const tx = this.cfgRoot.taxasCambio || {};
      ['USD','EUR','GBP'].forEach(m => {
        const el = document.getElementById('taxa' + m);
        if (el) tx[m] = Number(el.value) || 1;
      });
      this.cfgRoot.taxasCambio = tx;
      configStore().salvar();
      document.getElementById('taxasOverlay').style.display = 'none';
      mostrarToast('Taxas de câmbio salvas!', 'sucesso');
      this.rerenderizar();
    });

    // Regras
    document.getElementById('btnAbrirRegras')?.addEventListener('click', () => {
      document.getElementById('regrasOverlay').style.display = 'flex';
    });
    document.getElementById('btnFecharRegras')?.addEventListener('click', () => {
      document.getElementById('regrasOverlay').style.display = 'none';
    });
    document.getElementById('btnAdicionarRegra')?.addEventListener('click', () => this.adicionarRegra());
    document.getElementById('btnAplicarRegrasTodas')?.addEventListener('click', () => this.aplicarRegrasEmTodas());

    const regrasLista = document.getElementById('regrasLista');
    if (regrasLista) {
      regrasLista.addEventListener('click', (e) => {
        const btnAplicar = e.target.closest('.btn-aplicar-regra');
        const btnRemover = e.target.closest('.btn-remover-regra');
        if (btnAplicar) {
          const idx = Number(btnAplicar.dataset.idx);
          this.aplicarRegra(idx);
        }
        if (btnRemover) {
          const idx = Number(btnRemover.dataset.idx);
          this.removerRegra(idx);
        }
      });
    }

    // Calculadora
    const bindNum = (id, campo) => {
      const el = document.getElementById(id);
      if (!el) return;
      const handler = () => {
        this.calc[campo] = Number(el.value) || 0;
        if (campo === 'valorHora') this.salvarConfig({ valorHora: Number(el.value) || 60 });
        this.atualizarResultado();
      };
      el.addEventListener('input', handler);
      this._bindCache[id] = { el, handler, type: 'input' };
    };
    bindNum('calcMateriais', 'materiais');
    bindNum('calcHoras', 'horas');
    bindNum('calcValorHora', 'valorHora');
    bindNum('calcLargura', 'largura');
    bindNum('calcAltura', 'altura');
    bindNum('calcProfundidade', 'profundidade');
    bindNum('calcMultiplicador', 'multiplicador');

    const bindTexto = (id, campo) => {
      const el = document.getElementById(id);
      if (!el) return;
      const handler = () => {
        this.calc[campo] = el.value;
        this.atualizarResultado();
      };
      el.addEventListener('input', handler);
      this._bindCache[id] = { el, handler, type: 'input' };
    };
    bindTexto('calcNome', 'nome');

    const bindSelect = (id, campo) => {
      const el = document.getElementById(id);
      if (!el) return;
      const handler = () => {
        this.calc[campo] = el.value;
        if (campo === 'arredondamento') {
          this.calc.arredondamento = Number(el.value) || 0;
          this.salvarConfig({ arredondamento: this.calc.arredondamento });
        }
        this.atualizarResultado();
      };
      el.addEventListener('change', handler);
      this._bindCache[id] = { el, handler, type: 'change' };
    };
    bindSelect('calcCliente', 'clienteId');
    bindSelect('calcTecnica', 'tecnica');
    bindSelect('calcArredondamento', 'arredondamento');

    const estrelasContainer = document.getElementById('estrelasInput');
    if (estrelasContainer) {
      const handler = (e) => {
        const est = e.target.closest('.estrela');
        if (!est) return;
        this.calc.complexidade = Number(est.dataset.val);
        estrelasContainer.querySelectorAll('.estrela').forEach(el => el.classList.toggle('preenchida', Number(el.dataset.val) <= this.calc.complexidade));
        this.atualizarResultado();
      };
      estrelasContainer.addEventListener('click', handler);
      this._bindCache['estrelasInput'] = { el: estrelasContainer, handler, type: 'click' };
    }

    // Ações do orçamento
    document.getElementById('btnSalvarOrcamento')?.addEventListener('click', () => this.salvarOrcamento());
    document.getElementById('btnCopiarPreco')?.addEventListener('click', () => this.copiarPreco());
    document.getElementById('btnPropostaPDF')?.addEventListener('click', () => this.exportarPropostaPDF(null));
    document.getElementById('btnCriarEncomenda')?.addEventListener('click', () => this.criarEncomenda(null));

    const selTemplate = document.getElementById('selTemplateProposta');
    if (selTemplate) {
      const handler = () => this.salvarConfig({ templateProposta: selTemplate.value });
      selTemplate.addEventListener('change', handler);
      this._bindCache['selTemplateProposta'] = { el: selTemplate, handler, type: 'change' };
    }

    // Orçamentos salvos (lista + kanban)
    document.getElementById('btnKanbanOrc')?.addEventListener('click', () => {
      localStorage.setItem('atelier-crm-view-mode-orcamentos', 'kanban');
      this.rerenderizar();
    });
    document.getElementById('btnListaOrc')?.addEventListener('click', () => {
      localStorage.setItem('atelier-crm-view-mode-orcamentos', 'lista');
      this.rerenderizar();
    });

    const orcamentosContainer = document.getElementById('orcamentosContainer');
    if (orcamentosContainer) {
      const clickHandler = (e) => {
        if (!e.target.closest('.kanban-mobile-menu-btn')) {
          orcamentosContainer.querySelectorAll('.kanban-mobile-dropdown.visivel').forEach(d => d.classList.remove('visivel'));
        }
        const idEl = e.target.closest('[data-id]');
        const id = idEl ? idEl.dataset.id : null;
        if (e.target.closest('.btn-orc-carregar')) { if (id) this.carregarOrcamento(id); return; }
        if (e.target.closest('.btn-orc-pdf')) { if (id) this.exportarPropostaPDF(id); return; }
        if (e.target.closest('.btn-orc-encomenda')) { if (id) this.criarEncomenda(id); return; }
        if (e.target.closest('.btn-orc-venda')) { if (id) this.registrarVenda(id); return; }
        if (e.target.closest('.btn-orc-excluir')) { if (id) this.excluirOrcamento(id); return; }
        if (e.target.closest('.kanban-mobile-menu-btn')) {
          const card = e.target.closest('.kanban-card');
          if (card) {
            const dd = card.querySelector('.kanban-mobile-dropdown');
            if (dd) dd.classList.toggle('visivel');
          }
          return;
        }
        if (e.target.closest('.kanban-mover-btn')) {
          const btn = e.target.closest('.kanban-mover-btn');
          if (btn.dataset.status && id) this._moverOrcamentoParaStatus(id, btn.dataset.status);
          return;
        }
      };
      const changeHandler = (e) => {
        const sel = e.target.closest('.orc-status-select');
        if (!sel) return;
        const id = sel.closest('.orcamento-item')?.dataset.id;
        if (!id) return;
        this.definirStatusOrcamento(id, sel.value);
      };
      orcamentosContainer.addEventListener('click', clickHandler);
      orcamentosContainer.addEventListener('change', changeHandler);
      this._bindCache['orcamentosContainer'] = { el: orcamentosContainer, handler: clickHandler, type: 'click' };
      this._bindCache['orcamentosContainerChange'] = { el: orcamentosContainer, handler: changeHandler, type: 'change' };

      // Drag & drop do kanban
      const board = orcamentosContainer.querySelector('.kanban-board');
      if (board) {
        const onDragStart = (e) => {
          const card = e.target.closest('.kanban-card');
          if (!card) return;
          card.classList.add('arrastando');
          e.dataTransfer.setData('text/plain', card.dataset.id);
        };
        const onDragEnd = (e) => {
          const card = e.target.closest('.kanban-card');
          if (card) card.classList.remove('arrastando');
        };
        const onDragOver = (e) => {
          e.preventDefault();
          const col = e.target.closest('.kanban-coluna');
          if (col) col.classList.add('kanban-coluna--drag-over');
        };
        const onDragLeave = (e) => {
          const col = e.target.closest('.kanban-coluna');
          if (col) col.classList.remove('kanban-coluna--drag-over');
        };
        const onDrop = (e) => {
          e.preventDefault();
          const col = e.target.closest('.kanban-coluna');
          if (!col) return;
          col.classList.remove('kanban-coluna--drag-over');
          const id = e.dataTransfer.getData('text/plain');
          if (id) this._moverOrcamentoParaStatus(id, col.dataset.status);
        };
        const bindDrag = (tipo, handler) => {
          board.addEventListener(tipo, handler);
          this._bindCache['kb' + tipo] = { el: board, handler, type: tipo };
        };
        bindDrag('dragstart', onDragStart);
        bindDrag('dragend', onDragEnd);
        bindDrag('dragover', onDragOver);
        bindDrag('dragleave', onDragLeave);
        bindDrag('drop', onDrop);
      }
    }

    // Histórico
    document.getElementById('selHistoricoObra')?.addEventListener('change', () => this.rerenderizar());

    // Projeção
    document.getElementById('selProjecaoObra')?.addEventListener('change', () => this.rerenderizar());

    // Metas
    document.getElementById('btnSalvarMetaMensal')?.addEventListener('click', () => {
      const v = Number(document.getElementById('metaMensalInput')?.value) || 0;
      this.salvarConfig({ metaMensal: v });
      mostrarToast('Meta mensal salva!', 'sucesso');
      this.rerenderizar();
    });
    document.getElementById('btnSalvarMetaAnual')?.addEventListener('click', () => {
      const v = Number(document.getElementById('metaAnualInput')?.value) || 0;
      this.salvarConfig({ metaAnual: v });
      mostrarToast('Meta anual salva!', 'sucesso');
      this.rerenderizar();
    });

    // Exportar PDF
    document.getElementById('btnExportarRelatorio')?.addEventListener('click', () => this.exportarRelatorioPDF());

    this.atualizarResultado();
  }

  atualizarResultado() {
    const preco = this.calcularPreco(this.calc);
    const elValor = document.getElementById('valorSugerido');
    const elDetalhe = document.getElementById('detalheCalculo');
    const elFaixa = document.getElementById('faixaComparativa');
    const elConversoes = document.getElementById('conversoesMultiMoeda');
    const elBreakdown = document.getElementById('breakdownGrid');
    const elRegra = document.getElementById('regraAuto');
    if (elValor) elValor.textContent = this.fmt(preco);
    if (elDetalhe) elDetalhe.textContent = this.detalharCalculo(preco);
    if (elBreakdown) elBreakdown.innerHTML = this.renderBreakdown(this.calcularBreakdown(this.calc));
    if (elRegra) elRegra.innerHTML = this.renderRegraAuto();

    // Conversões multi-moeda
    if (elConversoes) {
      const moedas = ['USD','EUR','GBP'];
      elConversoes.innerHTML = moedas.filter(m => m !== this.moeda).map(m =>
        `<span class="conv-moeda">${m}: ${this.fmt(this.converter(preco, this.moeda, m), m)}</span>`
      ).join('');
    }

    if (elFaixa) {
      const obras = obraStore().items || [];
      elFaixa.innerHTML = this.renderFaixaComparativa(obras);
    }
  }

  // --- Ações do orçamento ---
  _dadosOrcamentoAtual() {
    const cliente = this.calc.clienteId ? clienteStore().items.find(c => c.id === this.calc.clienteId) : null;
    return {
      id: 'orc_' + Date.now(),
      nome: this.calc.nome?.trim() || 'Orçamento sem nome',
      clienteId: this.calc.clienteId || '',
      clienteNome: cliente ? cliente.nome : '',
      clienteEmail: cliente ? cliente.email : '',
      clienteTelefone: cliente ? cliente.telefone : '',
      tecnica: this.calc.tecnica || '',
      materiais: Number(this.calc.materiais) || 0,
      horas: Number(this.calc.horas) || 0,
      valorHora: Number(this.calc.valorHora) || 60,
      largura: Number(this.calc.largura) || 0,
      altura: Number(this.calc.altura) || 0,
      profundidade: Number(this.calc.profundidade) || 0,
      complexidade: Number(this.calc.complexidade) || 3,
      multiplicador: Number(this.calc.multiplicador) || this.config.multiplicadorExperiencia || 1.5,
      arredondamento: Number(this.calc.arredondamento) || 0,
      preco: this.calcularPreco(this.calc),
      moeda: this.moeda,
      numero: '',
      validade: 30,
      validadeData: '',
      status: 'rascunho',
      data: new Date().toISOString(),
      criadoEm: new Date().toISOString()
    };
  }

  _gerarNumeroProposta() {
    const cfg = this.cfgRoot;
    const ano = new Date().getFullYear();
    if (!cfg.contadorPropostas || typeof cfg.contadorPropostas !== 'object') cfg.contadorPropostas = {};
    cfg.contadorPropostas[ano] = (Number(cfg.contadorPropostas[ano]) || 0) + 1;
    configStore().salvar();
    return `PRO-${ano}-${String(cfg.contadorPropostas[ano]).padStart(4, '0')}`;
  }

  _persistirOrcamento(orc) {
    if (!orc.numero) {
      orc.numero = this._gerarNumeroProposta();
      const vd = new Date(Date.now() + 30 * 86400000);
      orc.validadeData = vd.toISOString().slice(0, 10);
    }
    this._garantirAceiteToken(orc);
    const lista = this.cfgRoot.precificadorOrcamentos || [];
    const idx = lista.findIndex(o => o.id === orc.id);
    if (idx >= 0) lista[idx] = orc; else lista.unshift(orc);
    this.cfgRoot.precificadorOrcamentos = lista;
    configStore().salvar();
    return orc;
  }

  _garantirAceiteToken(orc) {
    if (orc.aceiteToken) return orc.aceiteToken;
    orc.aceiteToken = 'aceite_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    configStore().salvar();
    return orc.aceiteToken;
  }

  salvarOrcamento() {
    if (this.calcularPreco(this.calc) <= 0) {
      mostrarToast('Preencha pelo menos materiais, horas ou dimensões.', 'aviso');
      return;
    }
    const orc = this._persistirOrcamento(this._dadosOrcamentoAtual());
    mostrarToast(`Orçamento salvo: ${this.fmt(orc.preco)}!`, 'sucesso');
    activityLogger.registrar('criacao', 'Orçamento criado', orc.nome, 'criacao');
    this.rerenderizar();
  }

  copiarPreco() {
    const preco = this.calcularPreco(this.calc);
    if (preco <= 0) { mostrarToast('Calcule um preço primeiro.', 'aviso'); return; }
    const texto = this.calc.nome ? `${this.calc.nome}: ` : '';
    navigator.clipboard.writeText(`${texto}${this.fmt(preco)}`).then(
      () => mostrarToast(`Preço ${this.fmt(preco)} copiado!`, 'sucesso')
    ).catch(() => mostrarToast('Erro ao copiar.', 'erro'));
  }

  carregarOrcamento(id) {
    const orc = this.orcamentos.find(o => o.id === id);
    if (!orc) { mostrarToast('Orçamento não encontrado.', 'aviso'); return; }
    this.calc = {
      nome: orc.nome || '', clienteId: orc.clienteId || '', tecnica: orc.tecnica || '',
      materiais: orc.materiais || 0, horas: orc.horas || 0, valorHora: orc.valorHora || this.config.valorHora || 60,
      largura: orc.largura || 0, altura: orc.altura || 0, profundidade: orc.profundidade || 0,
      complexidade: orc.complexidade || 3,
      multiplicador: orc.multiplicador || this.config.multiplicadorExperiencia || 1.5,
      arredondamento: orc.arredondamento || 0
    };
    mostrarToast('Orçamento carregado na calculadora.', 'info');
    this.rerenderizar();
    const container = document.getElementById('precificadorContainer');
    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  definirStatusOrcamento(id, status) {
    const lista = this.cfgRoot.precificadorOrcamentos || [];
    const orc = lista.find(o => o.id === id);
    if (!orc) return;
    orc.status = status;
    this.cfgRoot.precificadorOrcamentos = lista;
    configStore().salvar();
    const statusRotulos = { rascunho: 'Rascunho', enviado: 'Enviado', aprovado: 'Aprovado', recusado: 'Recusado' };
    const item = document.querySelector(`.orcamento-item[data-id="${id}"]`);
    if (item) {
      const badge = item.querySelector('.orc-status');
      if (badge) {
        badge.textContent = statusRotulos[status] || status;
        badge.className = 'orc-status st-' + (status || 'rascunho');
      }
    } else {
      this.rerenderizar();
    }
    mostrarToast(`Orçamento marcado como "${statusRotulos[status] || status}".`, 'sucesso');
  }

  _moverOrcamentoParaStatus(id, novoStatus) {
    const lista = this.cfgRoot.precificadorOrcamentos || [];
    const orc = lista.find(o => o.id === id);
    if (!orc || (orc.status || 'rascunho') === novoStatus) return;
    orc.status = novoStatus;
    this.cfgRoot.precificadorOrcamentos = lista;
    configStore().salvar();
    const rotulo = ORC_STATUS.find(s => s.status === novoStatus)?.rotulo || novoStatus;
    mostrarToast(`Orçamento movido para "${rotulo}".`, 'sucesso');
    this.rerenderizar();
  }

  async registrarVenda(orcId) {
    const orc = this.orcamentos.find(o => o.id === orcId);
    if (!orc) { mostrarToast('Orçamento não encontrado.', 'aviso'); return; }
    if ((orc.status || 'rascunho') !== 'aprovado') { mostrarToast('Aprove o orçamento antes de registrar a venda.', 'aviso'); return; }
    if (orc.convertidoEm) { mostrarToast('Este orçamento já foi convertido em venda.', 'aviso'); return; }
    const ok = await confirmarAcao(`Registrar a venda de "${orc.nome}" por ${this.fmt(orc.preco, orc.moeda)}?`, { textoConfirmar: 'Registrar Venda', titulo: 'Converter em Venda' });
    if (!ok) return;
    const dados = {
      obraId: '',
      obraTitulo: orc.nome || 'Obra sem título',
      clienteId: orc.clienteId || '',
      clienteNome: orc.clienteNome || 'Cliente avulso',
      precoFinal: orc.preco || 0,
      valorTotal: orc.preco || 0,
      data: new Date().toISOString().slice(0, 10),
      dataVenda: new Date().toISOString().slice(0, 10),
      formaPagamento: 'a combinar',
      status: 'aprovada',
      orcamentoId: orc.id,
      numeroProposta: orc.numero || ''
    };
    const venda = this.dataStore.adicionar('vendas', dados);
    if (orc.clienteId) {
      const cliente = clienteStore().items.find(c => c.id === orc.clienteId);
      if (cliente) clienteStore().atualizar(orc.clienteId, { aquisicoes: (Number(cliente.aquisicoes) || 0) + 1 });
    }
    orc.convertidoEm = new Date().toISOString();
    orc.vendaId = venda ? venda.id : '';
    this.cfgRoot.precificadorOrcamentos = this.orcamentos;
    configStore().salvar();
    mostrarToast(`Venda registrada: ${this.fmt(orc.preco, orc.moeda)}!`, 'sucesso');
    activityLogger.registrar('venda', 'Venda registrada a partir do orçamento', orc.nome, 'venda');
    if (this.router && typeof this.router.navegar === 'function') {
      setTimeout(() => this.router.navegar('vendas'), 400);
    }
  }

  async excluirOrcamento(id) {
    const ok = await confirmarAcao('Excluir este orçamento?', { textoConfirmar: 'Excluir', perigoso: true });
    if (!ok) return;
    this.cfgRoot.precificadorOrcamentos = (this.cfgRoot.precificadorOrcamentos || []).filter(o => o.id !== id);
    configStore().salvar();
    mostrarToast('Orçamento excluído.', 'sucesso');
    this.rerenderizar();
  }

  criarEncomenda(orcId) {
    let orc = orcId ? this.orcamentos.find(o => o.id === orcId) : null;
    if (!orc) {
      if (this.calcularPreco(this.calc) <= 0) { mostrarToast('Calcule um preço primeiro.', 'aviso'); return; }
      orc = this._dadosOrcamentoAtual();
    }
    const descricao = orc.nome + (orc.tecnica ? ` — ${orc.tecnica}` : '') + (orc.largura ? ` — ${[orc.largura, orc.altura, orc.profundidade].filter(Boolean).join('×')}cm` : '');
    const dados = {
      clienteNome: orc.clienteNome || 'Cliente avulso',
      clienteEmail: orc.clienteEmail || '',
      clienteTelefone: orc.clienteTelefone || '',
      descricao,
      prazo: '',
      status: 'recebido',
      valor: orc.preco || 0,
      atualizacoes: [{ data: new Date().toISOString(), status: 'recebido', mensagem: `Encomenda criada a partir do orçamento "${orc.nome}".` }],
      imagens: []
    };
    this.dataStore.adicionar('encomendas', dados);
    mostrarToast(`Encomenda criada (${this.fmt(orc.preco, orc.moeda)})!`, 'sucesso');
    activityLogger.registrar('criacao', 'Encomenda criada do orçamento', orc.nome, 'criacao');
    if (this.router && typeof this.router.navegar === 'function') {
      setTimeout(() => this.router.navegar('encomendas'), 400);
    }
  }

  exportarPropostaPDF(orcId) {
    if (typeof window.jspdf === 'undefined' && typeof jspdf === 'undefined') {
      mostrarToast('jsPDF não carregado. Tente novamente.', 'erro');
      return;
    }
    let orc = orcId ? this.orcamentos.find(o => o.id === orcId) : null;
    if (!orc) {
      if (this.calcularPreco(this.calc) <= 0) { mostrarToast('Calcule um preço primeiro.', 'aviso'); return; }
      orc = this._persistirOrcamento(this._dadosOrcamentoAtual());
      mostrarToast('Orçamento salvo automaticamente para gerar o QR de aceite.', 'info');
      this.rerenderizar();
    }
    const template = this.config.templateProposta || 'classico';
    mostrarLoading('Gerando proposta PDF...');
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const d = this._prepararProposta(orc);
    const qr = this._gerarQRProposta(orc);
    if (template === 'moderno') this._propostaModerno(doc, d, qr);
    else if (template === 'minimalista') this._propostaMinimalista(doc, d, qr);
    else this._propostaClassico(doc, d, qr);
    doc.save(`proposta-${(orc.nome || 'obra').toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'obra'}.pdf`);
    esconderLoading();
    mostrarToast('Proposta PDF exportada!', 'sucesso');
  }

  _prepararProposta(orc) {
    const artista = configStore().artista?.nome || 'Artista';
    const contato = configStore().artista?.email ? ` | ${configStore().artista.email}` : '';
    const dims = [orc.largura, orc.altura, orc.profundidade].filter(Boolean).join(' × ');
    return {
      orc,
      artista, contato,
      numero: orc.numero || String(orc.id || '').replace('orc_', ''),
      data: new Date().toLocaleDateString('pt-BR'),
      nome: orc.nome || 'Obra sem título',
      tecnica: orc.tecnica ? capitalizarTexto(orc.tecnica) : '',
      dims,
      complexidade: orc.complexidade ? '★'.repeat(Math.max(1, Math.min(5, Number(orc.complexidade) || 1))) : '',
      cliente: orc.clienteNome || 'Cliente avulso',
      clienteEmail: orc.clienteEmail || '',
      materiais: orc.materiais || 0,
      horas: orc.horas || 0,
      valorHora: orc.valorHora || 60,
      maoObra: (orc.horas || 0) * (orc.valorHora || 60),
      custoTotal: (orc.materiais || 0) + (orc.horas || 0) * (orc.valorHora || 60),
      multiplicador: orc.multiplicador || 1.5,
      preco: orc.preco || 0,
      moeda: orc.moeda || this.moeda,
      validadeData: orc.validadeData ? formatarData(orc.validadeData) : ''
    };
  }

  _gerarQRProposta(orc) {
    const token = orc.aceiteToken || this._garantirAceiteToken(orc);
    let base = '';
    try {
      if (window.location.origin && window.location.origin !== 'null' && !window.location.origin.startsWith('file')) {
        base = window.location.origin + window.location.pathname;
      }
    } catch {}
    return gerarQRCodeDataUrl(base + '#portal?token=' + token);
  }

  // --- Templates de proposta PDF ---
  _propostaClassico(doc, d, qr) {
    const margem = 22, larg = 166;
    doc.setFont('times', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text('PROPOSTA DE OBRA', margem, 24);
    doc.setFont('times', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(90);
    doc.text(`${d.artista}${d.contato}`, margem, 31);
    doc.setTextColor(140);
    doc.setDrawColor(120);
    doc.setLineWidth(0.4);
    doc.line(margem, 35, margem + larg, 35);
    doc.setLineWidth(0.15);
    doc.line(margem, 36.2, margem + larg, 36.2);
    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Proposta Nº ${d.numero}`, margem + larg, 44, { align: 'right' });
    doc.text(`Emissão: ${d.data}`, margem + larg, 48, { align: 'right' });

    let y = 58;
    const secao = (titulo) => {
      doc.setFont('times', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(60);
      doc.text(titulo.toUpperCase(), margem, y);
      y += 5.5;
    };
    const linha = (label, valor) => {
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(40);
      doc.text(label, margem, y);
      doc.setFont('times', 'italic');
      doc.setTextColor(80);
      if (valor) doc.text(String(valor), margem + 50, y);
      y += 6;
    };

    secao('Obra');
    linha('Título:', d.nome);
    const detalhes = [d.tecnica, d.dims ? d.dims + ' cm' : '', d.complexidade].filter(Boolean).join('   ·   ');
    if (detalhes) linha('Detalhes:', detalhes);
    linha('Cliente:', d.cliente + (d.clienteEmail ? ' — ' + d.clienteEmail : ''));
    y += 3;
    doc.setDrawColor(180);
    doc.setLineWidth(0.15);
    doc.line(margem, y, margem + larg, y);
    y += 8;

    secao('Composição do valor');
    linha('Materiais:', this.fmt(d.materiais, d.moeda));
    linha('Mão de obra:', `${d.horas}h × ${this.fmt(d.valorHora, d.moeda)} = ${this.fmt(d.maoObra, d.moeda)}`);
    linha('Custo total:', this.fmt(d.custoTotal, d.moeda));
    linha('Multiplicador:', `× ${d.multiplicador}`);
    y += 3;
    doc.setDrawColor(180);
    doc.line(margem, y, margem + larg, y);
    y += 10;

    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(30);
    doc.text(`Valor da proposta: ${this.fmt(d.preco, d.moeda)}`, margem, y);
    y += 8;
    doc.setFont('times', 'italic');
    doc.setFontSize(9.5);
    doc.setTextColor(90);
    doc.text(`Validade da proposta: 30 dias${d.validadeData ? ' (até ' + d.validadeData + ')' : ''}.`, margem, y);
    y += 5;
    doc.text('Aceite por meio do QR code abaixo ou assinatura manual.', margem, y);
    y += 4;

    if (qr) {
      doc.addImage(qr, 'PNG', margem + larg - 42, y, 42, 42);
      doc.setDrawColor(140);
      doc.setLineWidth(0.2);
      doc.rect(margem + larg - 44, y - 2, 46, 46);
      doc.setFont('times', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(110);
      doc.text('Escaneie para aceitar a proposta digitalmente.', margem, y + 48);
    }

    const sigY = 262;
    doc.setDrawColor(150);
    doc.setLineWidth(0.2);
    doc.line(margem, sigY, margem + 70, sigY);
    doc.line(margem + larg - 70, sigY, margem + larg, sigY);
    doc.setFont('times', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(110);
    doc.text('Cliente', margem, sigY + 5);
    doc.text('Artista', margem + larg - 70, sigY + 5);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`${d.artista} · ${d.data}`, margem + larg - 70, sigY + 10, { align: 'right' });
  }

  _propostaModerno(doc, d, qr) {
    const accent = [146, 100, 45];
    const dk = [60, 45, 30];
    const margem = 20, larg = 170;

    doc.setFillColor(accent[0], accent[1], accent[2]);
    doc.rect(0, 0, 210, 7, 'F');
    doc.setTextColor(255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('PROPOSTA DE OBRA', margem, 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`${d.numero} · ${d.data}`, 210 - margem, 5, { align: 'right' });

    let y = 26;
    doc.setTextColor(dk[0], dk[1], dk[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(d.nome, margem, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(120);
    const det = [d.tecnica, d.dims ? d.dims + ' cm' : '', d.complexidade].filter(Boolean).join('  ·  ');
    if (det) { doc.text(det, margem, y); y += 6; }
    doc.text(`Cliente: ${d.cliente}${d.clienteEmail ? ' · ' + d.clienteEmail : ''}`, margem, y);
    y += 6;
    doc.text(`${d.artista}${d.contato}`, margem, y);
    y += 8;

    doc.setDrawColor(accent[0], accent[1], accent[2]);
    doc.setLineWidth(0.5);
    doc.line(margem, y, margem + larg, y);
    y += 9;

    const secao = (titulo) => {
      doc.setFillColor(accent[0], accent[1], accent[2]);
      doc.roundedRect(margem, y - 4, 6, 6, 1, 1, 'F');
      doc.setTextColor(dk[0], dk[1], dk[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(titulo.toUpperCase(), margem + 10, y);
      y += 7;
    };
    const item = (label, valor) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(95);
      doc.text(label, margem + 10, y);
      doc.setTextColor(dk[0], dk[1], dk[2]);
      doc.text(String(valor), margem + 90, y);
      y += 6;
    };

    secao('Composição do valor');
    item('Materiais', this.fmt(d.materiais, d.moeda));
    item('Mão de obra', `${d.horas}h × ${this.fmt(d.valorHora, d.moeda)}`);
    item('Custo total', this.fmt(d.custoTotal, d.moeda));
    item('Multiplicador', `× ${d.multiplicador}`);
    y += 3;
    doc.setDrawColor(215);
    doc.setLineWidth(0.2);
    doc.line(margem, y, margem + larg, y);
    y += 9;

    doc.setFillColor(250, 243, 233);
    doc.setDrawColor(accent[0], accent[1], accent[2]);
    doc.setLineWidth(0.6);
    doc.roundedRect(margem, y - 6, larg, 20, 2, 2, 'FD');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text('VALOR DA PROPOSTA', margem + 8, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(accent[0], accent[1], accent[2]);
    doc.text(this.fmt(d.preco, d.moeda), margem + 8, y + 7);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(`Validade: 30 dias${d.validadeData ? ' (até ' + d.validadeData + ')' : ''}`, margem + larg - 8, y + 7, { align: 'right' });
    y += 27;

    if (qr) {
      doc.addImage(qr, 'PNG', margem, y, 38, 38);
      doc.setDrawColor(215);
      doc.setLineWidth(0.3);
      doc.rect(margem, y, 38, 38);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text('Aceite digital', margem + 45, y + 6);
      doc.setFontSize(8);
      doc.text('Escaneie o QR code para aprovar', margem + 45, y + 11);
      doc.text('esta proposta automaticamente.', margem + 45, y + 15);
      doc.setFontSize(9);
      doc.setTextColor(130);
      doc.text('Ou assine:', margem + 45, y + 24);
      doc.setDrawColor(150);
      doc.line(margem + 45, y + 27, margem + larg, y + 27);
      doc.setFontSize(8);
      doc.text('Cliente', margem + 45, y + 31);
    }
  }

  _propostaMinimalista(doc, d, qr) {
    const margem = 30, larg = 150;
    let y = 30;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(d.numero, margem, y);
    doc.text(d.data, margem + larg, y, { align: 'right' });
    y += 7;
    doc.setTextColor(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text(d.nome, margem, y);
    y += 9;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(130);
    const det = [d.tecnica, d.dims ? d.dims + ' cm' : '', d.complexidade].filter(Boolean).join('   ·   ');
    if (det) { doc.text(det, margem, y); y += 6; }
    doc.text(`Cliente: ${d.cliente}${d.clienteEmail ? ' · ' + d.clienteEmail : ''}`, margem, y);
    y += 6;
    doc.text(d.artista + (d.contato ? d.contato.replace(' | ', ' · ') : ''), margem, y);
    y += 14;
    doc.setDrawColor(220);
    doc.setLineWidth(0.2);
    doc.line(margem, y, margem + larg, y);
    y += 13;

    const item = (label, valor) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(label.toUpperCase(), margem, y);
      doc.setTextColor(60);
      doc.text(String(valor), margem + larg, y, { align: 'right' });
      y += 6.5;
    };
    item('Materiais', this.fmt(d.materiais, d.moeda));
    item('Mão de obra', `${d.horas}h × ${this.fmt(d.valorHora, d.moeda)}`);
    item('Custo total', this.fmt(d.custoTotal, d.moeda));
    item('Multiplicador', `× ${d.multiplicador}`);
    y += 8;
    doc.setDrawColor(220);
    doc.line(margem, y, margem + larg, y);
    y += 15;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(30);
    doc.setTextColor(20);
    doc.text(this.fmt(d.preco, d.moeda), margem, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(140);
    doc.text(`Validade: 30 dias${d.validadeData ? ' (até ' + d.validadeData + ')' : ''}`, margem, y);
    y += 18;

    if (qr) {
      doc.addImage(qr, 'PNG', margem, y, 34, 34);
      doc.setDrawColor(220);
      doc.setLineWidth(0.2);
      doc.line(margem + 40, y + 4, margem + larg, y + 4);
      doc.setFontSize(8);
      doc.setTextColor(140);
      doc.text('Cliente', margem + 40, y + 9);
      doc.line(margem + 40, y + 20, margem + larg, y + 20);
      doc.setTextColor(160);
      doc.text('Artista', margem + 40, y + 25);
      doc.setTextColor(140);
      doc.text('Escaneie o QR para aprovar digitalmente.', margem, y + 40);
    }
  }

  // --- Regras ---
  adicionarRegra() {
    const nome = document.getElementById('regraNome')?.value?.trim();
    if (!nome) { mostrarToast('Informe um nome para a regra.', 'aviso'); return; }

    const regras = this.cfgRoot.precificadorRegras || [];
    regras.push({
      id: 'regra_' + Date.now(),
      nome,
      tecnica: document.getElementById('regraTecnica')?.value || '',
      larguraMin: Number(document.getElementById('regraLargMin')?.value) || 0,
      larguraMax: Number(document.getElementById('regraLargMax')?.value) || 9999,
      alturaMin: Number(document.getElementById('regraAltMin')?.value) || 0,
      alturaMax: Number(document.getElementById('regraAltMax')?.value) || 9999,
      complexidade: Number(document.getElementById('regraComplexidade')?.value) || 3,
      multiplicador: Number(document.getElementById('regraMult')?.value) || 1.5,
      precoBase: Number(document.getElementById('regraBase')?.value) || 0
    });
    this.cfgRoot.precificadorRegras = regras;
    configStore().salvar();
    mostrarToast('Regra adicionada!', 'sucesso');
    this.rerenderizar();
  }

  removerRegra(idx) {
    const regras = this.cfgRoot.precificadorRegras || [];
    regras.splice(idx, 1);
    this.cfgRoot.precificadorRegras = regras;
    configStore().salvar();
    this.rerenderizar();
  }

  aplicarRegra(idx) {
    const regras = this.cfgRoot.precificadorRegras || [];
    const regra = regras[idx];
    if (!regra) return;

    const obras = obraStore().items || [];
    let count = 0;
    obras.forEach(o => {
      const dim = o.dimensoes;
      if (!dim) return;
      if (regra.tecnica && o.tecnica !== regra.tecnica) return;
      if (dim.largura < regra.larguraMin || dim.largura > regra.larguraMax) return;
      if (dim.altura < regra.alturaMin || dim.altura > regra.alturaMax) return;

      const area = dim.largura * dim.altura;
      const bonusArea = 1 + (area / 10000);
      const preco = Math.round((regra.precoBase || 0) * regra.multiplicador * this.fatoresComplexidade[regra.complexidade] * bonusArea);
      if (preco > 0) {
        const hist = o.historicoPrecos || [];
        if (o.preco && Number(o.preco) > 0) {
          hist.push({ preco: Number(o.preco), data: new Date().toISOString().slice(0, 10), motivo: 'Reajuste por regra: ' + regra.nome });
        }
        obraStore().atualizar(o.id, { preco, historicoPrecos: hist });
        count++;
      }
    });
    mostrarToast(`Regra "${regra.nome}" aplicada em ${count} obra${count > 1 ? 's' : ''}.`, 'sucesso');
    this.rerenderizar();
  }

  aplicarRegrasEmTodas() {
    const regras = this.cfgRoot.precificadorRegras || [];
    if (regras.length === 0) { mostrarToast('Nenhuma regra cadastrada.', 'aviso'); return; }

    const obras = obraStore().items || [];
    const semPreco = obras.filter(o => !o.preco || Number(o.preco) === 0);
    let count = 0;

    semPreco.forEach(o => {
      const dim = o.dimensoes;
      if (!dim || !dim.largura) return;

      const regraAplicada = regras.find(r => {
        if (r.tecnica && o.tecnica !== r.tecnica) return false;
        if (dim.largura < r.larguraMin || dim.largura > r.larguraMax) return false;
        if (dim.altura < r.alturaMin || dim.altura > r.alturaMax) return false;
        return true;
      });
      if (!regraAplicada) return;

      const area = dim.largura * dim.altura;
      const bonusArea = 1 + (area / 10000);
      const preco = Math.round((regraAplicada.precoBase || 0) * regraAplicada.multiplicador * this.fatoresComplexidade[regraAplicada.complexidade || 3] * bonusArea);
      if (preco > 0) {
        obraStore().atualizar(o.id, { preco });
        count++;
      }
    });
    mostrarToast(`Regras aplicadas em ${count} obra${count > 1 ? 's' : ''} sem preço.`, 'sucesso');
    this.rerenderizar();
  }

  // --- PDF Export ---
  exportarRelatorioPDF() {
    if (typeof window.jspdf === 'undefined' && typeof jspdf === 'undefined') {
      mostrarToast('jsPDF não carregado. Tente novamente.', 'erro');
      return;
    }
    mostrarLoading('Gerando relatório de precificação...');
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const obras = obraStore().items || [];
    const vendas = vendaStore().items || [];
    const cfg = this.config;
    const artista = configStore().artista?.nome || 'Artista';

    let y = 20;
    const margem = 20;
    const larg = 170;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Relatório de Precificação', margem, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Artista: ${artista} | Moeda: ${this.moeda} | Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, margem, y);
    y += 6;
    doc.setDrawColor(200);
    doc.line(margem, y, margem + larg, y);
    y += 8;

    // Preços sugeridos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Preços Sugeridos', margem, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    const precificaveis = obras.filter(o => o.dimensoes && o.dimensoes.largura && o.dimensoes.altura);
    if (precificaveis.length > 0) {
      precificaveis.slice(0, 20).forEach(o => {
        const calcTemp = {
          materiais: Number(o.custoMateriais) || 0,
          horas: Number(o.horasTrabalho) || 0,
          valorHora: cfg.valorHora || 60,
          largura: o.dimensoes.largura,
          altura: o.dimensoes.altura,
          complexidade: 3
        };
        const sugerido = this.calcularPreco(calcTemp);
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`${o.titulo || 'Sem título'} — Atual: ${this.fmt(o.preco)} | Sugerido: ${this.fmt(sugerido)} | ${o.tecnica || ''} | ${o.dimensoes.largura}×${o.dimensoes.altura}cm`, margem, y);
        y += 5;
      });
    } else {
      doc.text('Nenhuma obra com dimensões para calcular preço sugerido.', margem, y);
      y += 5;
    }

    y += 6;
    doc.setDrawColor(200);
    doc.line(margem, y, margem + larg, y);
    y += 8;

    // Break-Even
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Análise de Break-Even', margem, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    const comCusto = obras.filter(o => (o.custoMateriais > 0 || o.horasTrabalho > 0) && o.preco > 0);
    if (comCusto.length > 0) {
      comCusto.slice(0, 15).forEach(o => {
        const custoTotal = (Number(o.custoMateriais) || 0) + ((Number(o.horasTrabalho) || 0) * (cfg.valorHora || 60));
        const preco = Number(o.preco) || 0;
        const margem = preco > 0 ? ((preco - custoTotal) / preco) * 100 : 0;
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`${o.titulo || 'Sem título'} — Custo: ${this.fmt(custoTotal)} | Preço: ${this.fmt(preco)} | Margem: ${margem.toFixed(1)}%`, margem, y);
        y += 5;
      });
    } else {
      doc.text('Nenhuma obra com dados de custo.', margem, y);
      y += 5;
    }

    y += 6;
    doc.setDrawColor(200);
    doc.line(margem, y, margem + larg, y);
    y += 8;

    // Metas
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Metas Financeiras', margem, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const agora = new Date();
    const mesAtual = agora.getMonth(), anoAtual = agora.getFullYear();
    const fatMes = vendas.filter(v => v.dataVenda && v.valorTotal && new Date(v.dataVenda).getMonth() === mesAtual && new Date(v.dataVenda).getFullYear() === anoAtual).reduce((s, v) => s + Number(v.valorTotal), 0);
    const fatAno = vendas.filter(v => v.dataVenda && v.valorTotal && new Date(v.dataVenda).getFullYear() === anoAtual).reduce((s, v) => s + Number(v.valorTotal), 0);
    doc.text(`Meta Mensal: ${this.fmt(cfg.metaMensal || 10000)} | Faturamento: ${this.fmt(fatMes)}`, margem, y); y += 5;
    doc.text(`Meta Anual: ${this.fmt(cfg.metaAnual || 120000)} | Faturamento: ${this.fmt(fatAno)}`, margem, y); y += 5;
    doc.text(`Progresso mensal: ${cfg.metaMensal > 0 ? Math.round((fatMes / cfg.metaMensal) * 100) : 0}%`, margem, y); y += 5;

    y += 6;
    doc.setDrawColor(200);
    doc.line(margem, y, margem + larg, y);
    y += 8;

    // Análise
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Análise do Portfólio', margem, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const precos = obras.filter(o => Number(o.preco) > 0).map(o => Number(o.preco));
    const media = precos.length ? Math.round(precos.reduce((s, v) => s + v, 0) / precos.length) : 0;
    const total = precos.reduce((s, v) => s + v, 0);
    doc.text(`Obras precificadas: ${precos.length}`, margem, y); y += 5;
    doc.text(`Preço médio: ${this.fmt(media)}`, margem, y); y += 5;
    doc.text(`Valor total do portfólio: ${this.fmt(total)}`, margem, y); y += 5;
    if (precos.length > 0) {
      doc.text(`Menor preço: ${this.fmt(Math.min(...precos))} | Maior preço: ${this.fmt(Math.max(...precos))}`, margem, y); y += 5;
    }

    const orcs = this.orcamentos;
    if (orcs.length > 0) {
      if (y > 240) { doc.addPage(); y = 20; }
      y += 6;
      doc.setDrawColor(200);
      doc.line(margem, y, margem + larg, y);
      y += 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Orçamentos Salvos', margem, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const statusRotulos = { rascunho: 'Rascunho', enviado: 'Enviado', aprovado: 'Aprovado', recusado: 'Recusado' };
      orcs.slice(0, 25).forEach(o => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`${o.nome || 'Sem nome'} — ${statusRotulos[o.status] || o.status} — ${this.fmt(o.preco, o.moeda || this.moeda)} — ${o.clienteNome || 'Cliente avulso'}`, margem, y);
        y += 5;
      });
    }

    doc.save('relatorio-precificacao.pdf');
    esconderLoading();
    mostrarToast('Relatório PDF exportado com sucesso!', 'sucesso');
  }
}
