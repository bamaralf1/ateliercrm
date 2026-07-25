export class PrecificadorView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.calc = { materiais: 0, horas: 0, valorHora: 60, largura: 0, altura: 0, complexidade: 3, obraId: '' };
    this.fatoresComplexidade = [0, 0.7, 0.85, 1.0, 1.2, 1.5];
  }

  get config() { return configStore().precificador || {}; }
  get cfgRoot() { return configStore(); }
  get moeda() { return this.cfgRoot.moedaPadrao || 'BRL'; }
  get taxas() { return this.cfgRoot.taxasCambio || {}; }
  get regras() { return this.cfgRoot.precificadorRegras || []; }

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
    const temObras = obras.length > 0;
    this.calc.valorHora = this.config.valorHora || 60;

    const opcoesObra = obras.map(o =>
      `<option value="${o.id}">${o.titulo || 'Sem título'} — ${this.fmt(o.preco)}</option>`
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
            <button class="btn-miniatura" id="btnEditarTaxas" title="Editar taxas de câmbio">💱</button>
          </div>
          <button class="btn-secundario" id="btnAbrirRegras">📋 Regras de Precificação</button>
          <button class="btn-primario" id="btnExportarRelatorio">📞 Relatório PDF</button>
        </div>

        <div class="card">
          <h3>🧮 Calculadora de Preço</h3>
          <div class="calc-grid">
            <div class="campo-calc" style="grid-column:1/-1">
              <label>Obra de referência</label>
              <select class="sel-obra-calc" id="selObraCalc"><option value="">— Selecionar obra —</option>${opcoesObra}</select>
            </div>
            <div class="campo-calc">
              <label>💰 Custo materiais (${this.moeda})</label>
              <input type="number" id="calcMateriais" value="${this.calc.materiais}" min="0" step="0.1">
            </div>
            <div class="campo-calc">
              <label>⏱ Horas trabalhadas</label>
              <input type="number" id="calcHoras" value="${this.calc.horas}" min="0" step="0.5">
            </div>
            <div class="campo-calc">
              <label>🙵 Valor hora (${this.moeda})</label>
              <input type="number" id="calcValorHora" value="${this.calc.valorHora}" min="0" step="1">
            </div>
            <div class="campo-calc">
              <label>📐 Dimensões (cm)</label>
              <div style="display:flex;gap:6px;">
                <input type="number" id="calcLargura" value="${this.calc.largura}" min="0" placeholder="Larg." style="flex:1">
                <span style="align-self:center;color:var(--text-muted);font-size:0.8rem;">×</span>
                <input type="number" id="calcAltura" value="${this.calc.altura}" min="0" placeholder="Alt." style="flex:1">
              </div>
            </div>
            <div class="campo-calc">
              <label>⭐ Complexidade</label>
              <div class="estrelas-input" id="estrelasInput">
                ${[1,2,3,4,5].map(i =>
                  `<span class="estrela ${i <= this.calc.complexidade ? 'preenchida' : ''}" data-val="${i}">★</span>`
                ).join('')}
              </div>
            </div>
          </div>

          <div class="resultado-preco" id="resultadoPreco">
            <div class="rotulo-sugerido">Preço Sugerido</div>
            <div class="valor-sugerido" id="valorSugerido">${this.fmt(this.calcularPreco(this.calc))}</div>
            <div class="detalhe-calculo" id="detalheCalculo">${this.detalharCalculo(this.calcularPreco(this.calc))}</div>
            <div id="conversoesMultiMoeda" class="conversoes-multi"></div>
          </div>

          <div id="faixaComparativa">${this.renderFaixaComparativa(obras)}</div>
          <button class="btn-primario" id="btnSalvarPrecoCalc" style="margin-top:12px;width:100%;">💾 Salvar preço sugerido na obra</button>
        </div>

        ${temObras ? this.renderBreakEven(obras) : ''}
        ${temObras ? this.renderMLCard(obras, vendas) : ''}
        ${temObras ? this.renderProjecao(obras) : ''}

        <div class="card card-full">
          <h3>📊 Análise do Portfólio</h3>
          ${temObras ? this.renderAnalise(obras, vendas) : '<p style="color:var(--text-muted);font-size:0.85rem;">Adicione obras no Catálogo para ver análises.</p>'}
        </div>

        <div class="card card-full">
          <h3>🎯 Metas Financeiras</h3>
          ${this.renderMetas(obras, vendas)}
        </div>
      </div>

      ${this.renderModalRegras()}
      ${this.renderModalTaxas()}
    `;
  }

  // --- Cálculo ---
  calcularPreco(c) {
    const materiais = Number(c.materiais) || 0;
    const horas = Number(c.horas) || 0;
    const valorHora = Number(c.valorHora) || 60;
    const complexidade = Math.max(1, Math.min(5, Number(c.complexidade) || 3));
    const mult = this.config.multiplicadorExperiencia || 1.5;
    const fator = this.fatoresComplexidade[complexidade] || 1.0;
    const base = materiais + (horas * valorHora);
    const area = (Number(c.largura) || 0) * (Number(c.altura) || 0);
    const bonusArea = area > 0 ? 1 + (area / 10000) : 1;
    return Math.round(base * mult * fator * bonusArea);
  }

  detalharCalculo(preco) {
    const c = this.calc;
    const m = Number(c.materiais) || 0;
    const h = Number(c.horas) || 0;
    const vh = Number(c.valorHora) || 60;
    const mult = this.config.multiplicadorExperiencia || 1.5;
    const fator = this.fatoresComplexidade[Math.max(1, Math.min(5, Number(c.complexidade) || 3))];
    const area = (Number(c.largura) || 0) * (Number(c.altura) || 0);
    const bonus = area > 0 ? 1 + (area / 10000) : 1;
    return `${this.fmt(m)} + (${h}h × ${this.fmt(vh)}) × ${mult} × ${fator}${bonus !== 1 ? ` × ${bonus.toFixed(2)} (área)` : ''} = ${this.fmt(preco)}`;
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
        <h3>📊 Análise de Break-Even</h3>
        <div class="be-tabela-wrapper">
          <table class="be-tabela">
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
              ${p.aprecAnual > 0 ? '📈' : '📉'} ${p.aprecAnual.toFixed(1)}% a.a.
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
          <h3>📋 Regras de Precificação</h3>
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
                  <button class="btn-miniatura btn-remover-regra" data-idx="${i}" style="color:#dc2626;">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
          <hr style="margin:12px 0;border-color:var(--border);">
          <h4 style="margin:0 0 8px;font-size:0.85rem;">Nova Regra</h4>
          <div class="regra-form">
            <input type="text" id="regraNome" placeholder="Nome da regra" class="regra-input">
            <select id="regraTecnica" class="regra-input">
              <option value="">Qualquer técnica</option>
              <option value="óleo">Óleo</option>
              <option value="aquarela">Aquarela</option>
              <option value="escultura">Escultura</option>
              <option value="acrílica">Acrílica</option>
              <option value="outra">Outra</option>
            </select>
            <div style="display:flex;gap:6px;grid-column:1/-1;">
              <input type="number" id="regraLargMin" placeholder="Larg. min (cm)" class="regra-input" style="flex:1">
              <input type="number" id="regraLargMax" placeholder="Larg. max (cm)" class="regra-input" style="flex:1">
              <input type="number" id="regraAltMin" placeholder="Alt. min (cm)" class="regra-input" style="flex:1">
              <input type="number" id="regraAltMax" placeholder="Alt. max (cm)" class="regra-input" style="flex:1">
            </div>
            <div style="display:flex;gap:6px;grid-column:1/-1;">
              <input type="number" id="regraMult" placeholder="Multiplicador (ex: 2.0)" class="regra-input" value="1.5" style="flex:1">
              <input type="number" id="regraBase" placeholder="Preço base" class="regra-input" value="0" style="flex:1">
              <input type="number" id="regraComplexidade" placeholder="Complexidade (1-5)" class="regra-input" value="3" min="1" max="5" style="flex:1">
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
                <input type="number" id="taxa${m}" value="${tx[m] || 1}" step="0.01" min="0.01">
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
        <h3>📋 Histórico de Preços</h3>
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
        <div class="analise-card"><div class="analise-valor">${this.fmt(precoMedio)}</div><div class="analise-rotulo">💰 Preço médio</div></div>
        <div class="analise-card"><div class="analise-valor">${this.fmt(valorTotal)}</div><div class="analise-rotulo">📦 Valor total do portfólio</div></div>
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
            <input type="number" id="metaMensalInput" value="${metaMensal}" min="0" step="100">
            <button class="btn-secundario" id="btnSalvarMetaMensal">Salvar</button>
          </div>
          ${projecao ? `<div class="meta-projecao">📈 ${projecao}</div>` : ''}
          ${sugestao ? `<div class="meta-sugestao">💡 ${sugestao}</div>` : ''}
        </div>
        <div class="card meta-card">
          <div class="meta-rotulo">Meta Anual</div>
          <div class="meta-valor">${this.fmt(metaAnual)}</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin:8px 0;">
            <span style="font-size:0.85rem;color:var(--text-muted);">Faturamento: ${this.fmt(faturamentoAno)}</span>
          </div>
          ${circA}
          <div class="meta-edit">
            <input type="number" id="metaAnualInput" value="${metaAnual}" min="0" step="1000">
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
      mostrarToast('Taxas de câmbio salvas!');
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
    ['calcMateriais','calcHoras','calcValorHora','calcLargura','calcAltura'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const handler = () => {
        this.calc[id.replace('calc', '').toLowerCase()] = Number(el.value) || 0;
        if (id === 'calcValorHora') this.salvarConfig({ valorHora: Number(el.value) || 60 });
        this.atualizarResultado();
      };
      el.addEventListener('input', handler);
      this._bindCache[id] = { el, handler, type: 'input' };
    });

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

    const selObra = document.getElementById('selObraCalc');
    if (selObra) {
      const handler = () => {
        const obra = obraStore().porId(selObra.value);
        if (obra) {
          document.getElementById('calcMateriais').value = obra.custoMateriais || 0;
          document.getElementById('calcHoras').value = obra.horasTrabalho || 0;
          if (obra.dimensoes) {
            document.getElementById('calcLargura').value = obra.dimensoes.largura || 0;
            document.getElementById('calcAltura').value = obra.dimensoes.altura || 0;
          }
          this.calc.materiais = Number(obra.custoMateriais) || 0;
          this.calc.horas = Number(obra.horasTrabalho) || 0;
          this.calc.largura = (obra.dimensoes && obra.dimensoes.largura) || 0;
          this.calc.altura = (obra.dimensoes && obra.dimensoes.altura) || 0;
          this.calc.obraId = obra.id;
          this.atualizarResultado();
        } else {
          this.calc.obraId = '';
          this.atualizarResultado();
        }
      };
      selObra.addEventListener('change', handler);
      this._bindCache['selObraCalc'] = { el: selObra, handler, type: 'change' };
    }

    document.getElementById('btnSalvarPrecoCalc')?.addEventListener('click', () => this.salvarPrecoNaObra());

    // Histórico
    document.getElementById('selHistoricoObra')?.addEventListener('change', () => this.rerenderizar());

    // Projeção
    document.getElementById('selProjecaoObra')?.addEventListener('change', () => this.rerenderizar());

    // Metas
    document.getElementById('btnSalvarMetaMensal')?.addEventListener('click', () => {
      const v = Number(document.getElementById('metaMensalInput')?.value) || 0;
      this.salvarConfig({ metaMensal: v });
      mostrarToast('Meta mensal salva!');
      this.rerenderizar();
    });
    document.getElementById('btnSalvarMetaAnual')?.addEventListener('click', () => {
      const v = Number(document.getElementById('metaAnualInput')?.value) || 0;
      this.salvarConfig({ metaAnual: v });
      mostrarToast('Meta anual salva!');
      this.rerenderizar();
    });

    // Exportar PDF
    document.getElementById('btnExportarRelatorio')?.addEventListener('click', () => this.exportarRelatorioPDF());
  }

  atualizarResultado() {
    const preco = this.calcularPreco(this.calc);
    const elValor = document.getElementById('valorSugerido');
    const elDetalhe = document.getElementById('detalheCalculo');
    const elFaixa = document.getElementById('faixaComparativa');
    const elConversoes = document.getElementById('conversoesMultiMoeda');
    if (elValor) elValor.textContent = this.fmt(preco);
    if (elDetalhe) elDetalhe.textContent = this.detalharCalculo(preco);

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

  salvarPrecoNaObra() {
    const obraId = this.calc.obraId || document.getElementById('selObraCalc')?.value;
    if (!obraId) { mostrarToast('Selecione uma obra primeiro.'); return; }
    const precoSugerido = this.calcularPreco(this.calc);
    const obra = obraStore().porId(obraId);
    if (!obra) { mostrarToast('Obra não encontrada.'); return; }

    const hist = obra.historicoPrecos || [];
    if (obra.preco && Number(obra.preco) > 0) {
      hist.push({ preco: Number(obra.preco), data: new Date().toISOString().slice(0, 10), motivo: 'Reajuste via Precificador' });
    }
    hist.push({ preco: precoSugerido, data: new Date().toISOString().slice(0, 10), motivo: 'Preço sugerido pelo Precificador' });

    obraStore().atualizar(obraId, {
      preco: precoSugerido,
      custoMateriais: Number(this.calc.materiais) || 0,
      horasTrabalho: Number(this.calc.horas) || 0,
      historicoPrecos: hist
    });
    mostrarToast(`Preço ${this.fmt(precoSugerido)} salvo na obra "${obra.titulo || ''}"!`);
    this.rerenderizar();
  }

  // --- Regras ---
  adicionarRegra() {
    const nome = document.getElementById('regraNome')?.value?.trim();
    if (!nome) { mostrarToast('Informe um nome para a regra.'); return; }

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
    mostrarToast('Regra adicionada!');
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
    mostrarToast(`Regra "${regra.nome}" aplicada em ${count} obra${count > 1 ? 's' : ''}.`);
    this.rerenderizar();
  }

  aplicarRegrasEmTodas() {
    const regras = this.cfgRoot.precificadorRegras || [];
    if (regras.length === 0) { mostrarToast('Nenhuma regra cadastrada.'); return; }

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
    mostrarToast(`Regras aplicadas em ${count} obra${count > 1 ? 's' : ''} sem preço.`);
    this.rerenderizar();
  }

  // --- PDF Export ---
  exportarRelatorioPDF() {
    if (typeof window.jspdf === 'undefined' && typeof jspdf === 'undefined') {
      mostrarToast('jsPDF não carregado. Tente novamente.');
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

    doc.save('relatorio-precificacao.pdf');
    esconderLoading();
    mostrarToast('Relatório PDF exportado com sucesso!');
  }
}
