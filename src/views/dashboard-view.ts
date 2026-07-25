export class DashboardView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.charts = {};
    this.widgetOrdem = this.carregarOrdemWidgets();
    this.widgetsDisponiveis = [
      { id: 'producao', rotulo: 'Produção Mensal', icone: '<i class="fas fa-chart-line"></i>', visivel: true },
      { id: 'tecnicas', rotulo: 'Técnicas', icone: '<i class="fas fa-palette"></i>', visivel: true },
      { id: 'receita', rotulo: 'Receita', icone: '<i class="fas fa-dollar-sign"></i>', visivel: true },
      { id: 'previsao', rotulo: 'Previsão de Faturamento', icone: '🔮', visivel: true },
      { id: 'notificacoes', rotulo: 'Notificações Inteligentes', icone: '<i class="fas fa-bell"></i>', visivel: true },
      { id: 'metas', rotulo: 'Metas Financeiras', icone: '<i class="fas fa-bullseye"></i>', visivel: true },
      { id: 'recentes', rotulo: 'Obras Recentes', icone: '<i class="fas fa-images"></i>', visivel: true },
      { id: 'atividades', rotulo: 'Atividades', icone: '<i class="fas fa-clipboard"></i>', visivel: true },
      { id: 'dica', rotulo: 'Dica do Dia', icone: '<i class="fas fa-lightbulb"></i>', visivel: true }
    ];
  }

  carregarOrdemWidgets() {
    try {
      const salvo = localStorage.getItem('atelier_dashboard_widgets');
      return salvo ? JSON.parse(salvo) : null;
    } catch { return null; }
  }

  salvarOrdemWidgets() {
    localStorage.setItem('atelier_dashboard_widgets', JSON.stringify(this.widgetOrdem));
  }

  obterWidgetsOrdenados() {
    const padrao = this.widgetsDisponiveis.filter(w => w.visivel).map(w => w.id);
    if (!this.widgetOrdem || this.widgetOrdem.length === 0) return padrao;
    const ordenados = this.widgetOrdem.filter(id => padrao.includes(id));
    const novos = padrao.filter(id => !this.widgetOrdem.includes(id));
    return [...ordenados, ...novos];
  }

  render() {
    const obras = obraStore().items;
    const vendas = vendaStore().items;
    const clientes = clienteStore().items;
    const materiais = this.dataStore.listar('materiais');
    const eventos = this.dataStore.listar('eventos');

    const vendidas = obras.filter(o => o.status === 'vendida');
    const emEstoque = obras.filter(o => o.status !== 'vendida');
    const valorAcervo = emEstoque.reduce((soma, o) => soma + (Number(o.preco) || 0), 0);
    const valorVendido = vendas.reduce((soma, v) => soma + (Number(v.valorTotal || v.valor) || 0), 0);
    const ticketMedio = vendas.length > 0 ? valorVendido / vendas.length : 0;
    const crescimentoMensal = calcularCrescimentoMensal(obras);
    const obrasFavoritas = obras.filter(o => o.favorita).length;

    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();
    const mesPassado = mesAtual === 0 ? 11 : mesAtual - 1;
    const anoPassado = mesAtual === 0 ? anoAtual - 1 : anoAtual;

    const vendasMes = vendas.filter(v => { const d = new Date(v.dataVenda || v.data || v.criadoEm); return d.getMonth() === mesAtual && d.getFullYear() === anoAtual; });
    const vendasMesPassado = vendas.filter(v => { const d = new Date(v.dataVenda || v.data || v.criadoEm); return d.getMonth() === mesPassado && d.getFullYear() === anoPassado; });
    const receitaMes = vendasMes.reduce((s, v) => s + Number(v.valorTotal || v.valor || 0), 0);
    const receitaMesPassado = vendasMesPassado.reduce((s, v) => s + Number(v.valorTotal || v.valor || 0), 0);
    const variacaoReceita = receitaMesPassado > 0 ? ((receitaMes - receitaMesPassado) / receitaMesPassado * 100) : 0;

    const obrasMes = obras.filter(o => { const d = new Date(o.dataCadastro || o.criadoEm); return d.getMonth() === mesAtual && d.getFullYear() === anoAtual; }).length;
    const obrasMesPassado = obras.filter(o => { const d = new Date(o.dataCadastro || o.criadoEm); return d.getMonth() === mesPassado && d.getFullYear() === anoPassado; }).length;
    const variacaoObras = obrasMesPassado > 0 ? ((obrasMes - obrasMesPassado) / obrasMesPassado * 100) : 0;

    const kpis = [
      { rotulo: 'Total de Obras', valor: obras.length, tendencia: crescimentoMensal, icone: '<i class="fas fa-images"></i>', cor: '#2563eb', sparkline: this.gerarSparkline(obras, 'criacao'), variacao: obras.length > 0 ? variacaoObras : null },
      { rotulo: 'Obras Vendidas', valor: vendidas.length, sub: `${obras.length > 0 ? ((vendidas.length / obras.length) * 100).toFixed(1) : 0}% do total`, icone: '<i class="fas fa-check"></i>', cor: '#16a34a', sparkline: '' },
      { rotulo: 'Valor do Acervo', valor: formatarMoeda(valorAcervo), sub: `Ticket médio: ${formatarMoeda(ticketMedio)}`, icone: '<i class="fas fa-dollar-sign"></i>', cor: '#d97706', sparkline: '' },
      { rotulo: 'Total Vendido', valor: formatarMoeda(valorVendido), sub: `${receitaMes > 0 ? formatarMoeda(receitaMes) + ' este mês' : vendas.length + ' venda(s)'}`, icone: '<i class="fas fa-chart-bar"></i>', cor: '#7c3aed', sparkline: this.gerarSparkline(vendas, 'receita'), variacao: variacaoReceita },
      { rotulo: 'Clientes', valor: clientes.length, sub: `${this.contarClientesAtivos(clientes)} ativos`, icone: '👥', cor: '#0891b2', sparkline: '' },
      { rotulo: 'Favoritas', valor: obrasFavoritas, sub: '<i class="fas fa-star"></i> obras marcadas', icone: '<i class="fas fa-star"></i>', cor: '#dc2626', sparkline: '' }
    ];

    const widgetsVisiveis = this.obterWidgetsOrdenados();
    const ordemIds = this.widgetOrdem || widgetsVisiveis;

    return `
      <div class="view-cabecalho">
        <div>
          <h2>Dashboard</h2>
          <p class="subtitulo">Visão geral do seu ateliê · ${hoje.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div class="dashboard-acoes">
          <button class="btn-gradient" id="btnDownloadDashboard" title="Baixar dashboard como imagem"><i class="fas fa-camera"></i> Exportar</button>
          <button class="btn-secundario" id="btnConfigWidgets" title="Configurar widgets">⚙️</button>
          <button class="btn-secundario" id="btnAtualizarDashboard" title="Atualizar dados"><i class="fas fa-sync"></i></button>
        </div>
      </div>

      <div class="kpi-grid stagger-in">
        ${kpis.map(k => `
          <div class="kpi-card" style="--kpi-cor: ${k.cor}">
            <div class="kpi-icone">${k.icone}</div>
            <div class="kpi-conteudo">
              <div class="kpi-rotulo">${k.rotulo}</div>
              <div class="kpi-valor">${k.valor}</div>
              ${k.sub ? `<div class="kpi-sub">${k.sub}</div>` : ''}
              ${k.variacao !== null && k.variacao !== undefined ? `<div class="kpi-variacao ${k.variacao >= 0 ? 'positiva' : 'negativa'}">${k.variacao >= 0 ? '↑' : '↓'} ${Math.abs(k.variacao).toFixed(1)}% vs mês anterior</div>` : ''}
            </div>
            ${k.sparkline ? `<div class="kpi-sparkline">${k.sparkline}</div>` : ''}
          </div>
        `).join('')}
      </div>

      <div class="widgets-toolbar">
        <span class="widgets-toolbar-dica"><i class="fas fa-lightbulb"></i> Arraste os widgets para reordenar. Clique em ⚙️ para mostrar/ocultar.</span>
      </div>

      <div class="widgets-grid" id="widgetsGrid">
        ${widgetsVisiveis.map(id => {
          const w = this.widgetsDisponiveis.find(x => x.id === id);
          if (!w) return '';
          return `
            <div class="widget-card glass-premium" data-widget="${id}" draggable="true">
              <div class="widget-header">
                <span class="widget-drag-handle">⠿</span>
                <h3 class="widget-titulo">${w.icone} ${w.rotulo}</h3>
              </div>
              <div class="widget-body" id="widgetBody_${id}">
                ${this.renderizarWidget(id)}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="painel atalhos-rodape">
        <h3>⚡ Atalhos rápidos</h3>
        <div class="atalhos-rapidos">
          <button class="btn-gradient" id="btnAtalhoNovaObra">✚ Nova Obra</button>
          <button class="btn-ghost" id="btnAtalhoVenda">✚ Nova Venda</button>
          <button class="btn-ghost" id="btnAtalhoRecibo">🧾 Gerar Recibo</button>
          <button class="btn-ghost" id="btnAtalhoClientes"><i class="fas fa-user"></i> Gerenciar Clientes</button>
        </div>
      </div>

      ${this.renderModalConfig()}
    `;
  }

  renderizarWidget(id) {
    switch (id) {
      case 'producao': return this.renderWidgetProducao();
      case 'tecnicas': return this.renderWidgetTecnicas();
      case 'receita': return this.renderWidgetReceita();
      case 'previsao': return this.renderWidgetPrevisao();
      case 'notificacoes': return this.renderWidgetNotificacoes();
      case 'metas': return this.renderWidgetMetas();
      case 'recentes': return this.renderWidgetRecentes();
      case 'atividades': return this.renderWidgetAtividades();
      case 'dica': return this.renderWidgetDica();
      default: return '<p>Widget não encontrado.</p>';
    }
  }

  renderModalConfig() {
    return `
      <div class="widget-config-overlay" id="widgetConfigOverlay" style="display:none">
        <div class="widget-config-modal">
          <h3>⚙️ Configurar Widgets</h3>
          <p class="texto-ajuda">Marque/desmarque os widgets para mostrar no dashboard. Arraste para reordenar.</p>
          <div class="widget-config-lista" id="widgetConfigLista">
            ${this.widgetsDisponiveis.map(w => `
              <label class="widget-config-item">
                <input type="checkbox" data-wconfig="${w.id}" ${w.visivel ? 'checked' : ''}>
                <span>${w.icone} ${w.rotulo}</span>
              </label>
            `).join('')}
          </div>
          <div class="modal-acoes">
            <button class="btn-secundario" id="btnFecharConfigWidgets">Fechar</button>
            <button class="btn-primario" id="btnSalvarConfigWidgets">Salvar</button>
          </div>
        </div>
      </div>
    `;
  }

  /* ---- Sparkline ---- */
  gerarSparkline(itens, tipo) {
    if (!itens || itens.length === 0) return '';
    const pontos = [];
    const hoje = new Date();
    for (let i = 5; i >= 0; i--) {
      const alvo = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      const count = itens.filter(item => {
        const d = new Date(item.dataCadastro || item.criadoEm || item.data || item.dataVenda);
        if (tipo === 'receita') {
          return d.getMonth() === alvo.getMonth() && d.getFullYear() === alvo.getFullYear() && d <= hoje;
        }
        return d.getMonth() === alvo.getMonth() && d.getFullYear() === alvo.getFullYear();
      }).length;
      if (tipo === 'receita') {
        const total = itens.filter(item => {
          const d = new Date(item.dataCadastro || item.criadoEm || item.data || item.dataVenda);
          return d.getMonth() === alvo.getMonth() && d.getFullYear() === alvo.getFullYear() && d <= hoje;
        }).reduce((s, v) => s + Number(v.valorTotal || v.valor || 0), 0);
        pontos.push(total);
      } else {
        pontos.push(count);
      }
    }
    if (pontos.every(p => p === 0)) return '';
    const max = Math.max(...pontos, 1);
    const w = 80, h = 30;
    const pts = pontos.map((p, i) => `${(i / (pontos.length - 1)) * w},${h - (p / max) * h}`).join(' ');
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polyline fill="none" stroke="var(--kpi-cor)" stroke-width="2" points="${pts}"/></svg>`;
  }

  contarClientesAtivos(clientes) {
    const tresMeses = new Date();
    tresMeses.setMonth(tresMeses.getMonth() - 3);
    return clientes.filter(c => c.criadoEm && new Date(c.criadoEm) >= tresMeses).length;
  }

  /* ---- Widget: Produção Mensal ---- */
  renderWidgetProducao() {
    return '<canvas id="chartProducao" height="180"></canvas>';
  }

  /* ---- Widget: Técnicas ---- */
  renderWidgetTecnicas() {
    return '<canvas id="chartTecnicas" height="180"></canvas>';
  }

  /* ---- Widget: Receita ---- */
  renderWidgetReceita() {
    return '<canvas id="chartReceita" height="180"></canvas>';
  }

  /* ---- Widget: Previsão de Faturamento ---- */
  renderWidgetPrevisao() {
    const vendas = vendaStore().items;
    const dados = this.calcularPrevisao(vendas);
    return `
      <div class="previsao-container">
        <div class="previsao-valor-atual">
          <span class="previsao-rotulo">Faturamento nos últimos 6 meses</span>
          <span class="previsao-numero">${formatarMoeda(dados.total6M)}</span>
        </div>
        <div class="previsao-barra-container">
          <div class="previsao-barra-item">
            <span>Média mensal</span>
            <span class="previsao-numero-peq">${formatarMoeda(dados.mediaMensal)}</span>
          </div>
          <div class="previsao-barra-item">
            <span>Projeção próximos 6 meses</span>
            <span class="previsao-numero-peq ${dados.tendencia > 0 ? 'positiva' : 'negativa'}">${formatarMoeda(Math.abs(dados.projecao6M))} ${dados.tendencia > 0 ? '<i class="fas fa-chart-line"></i>' : '📉'}</span>
          </div>
        </div>
        <div class="previsao-detalhe">
          <span class="texto-ajuda">Baseado em regressão linear simples sobre os últimos meses</span>
          ${dados.tendencia > 0 ? `<span class="tag-status disponivel">Tendência positiva <i class="fas fa-chart-line"></i></span>` : `<span class="tag-status vendida">Tendência negativa 📉</span>`}
        </div>
        <canvas id="chartPrevisao" height="120"></canvas>
      </div>
    `;
  }

  calcularPrevisao(vendas) {
    const meses = [];
    const hoje = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      const total = vendas.filter(v => {
        const dataV = new Date(v.dataVenda || v.data || v.criadoEm);
        return dataV.getMonth() === d.getMonth() && dataV.getFullYear() === d.getFullYear();
      }).reduce((s, v) => s + Number(v.valorTotal || v.valor || 0), 0);
      meses.push({ mes: d, total });
    }
    const total6M = meses.reduce((s, m) => s + m.total, 0);
    const mediaMensal = total6M / meses.length;

    const n = meses.length;
    const xMean = (n - 1) / 2;
    const yMean = total6M / n;
    let num = 0, den = 0;
    meses.forEach((m, i) => {
      num += (i - xMean) * (m.total - yMean);
      den += (i - xMean) * (i - xMean);
    });
    const inclinacao = den !== 0 ? num / den : 0;
    const intercept = yMean - inclinacao * xMean;
    let projecao6M = 0;
    for (let i = 0; i < 6; i++) {
      projecao6M += Math.max(0, inclinacao * (n + i) + intercept);
    }
    return { total6M, mediaMensal, inclinacao, intercept, projecao6M, tendencia: inclinacao, meses };
  }

  /* ---- Widget: Notificações Inteligentes ---- */
  renderWidgetNotificacoes() {
    const materiais = this.dataStore.listar('materiais');
    const clientes = clienteStore().items;
    const eventos = this.dataStore.listar('eventos');
    const obras = obraStore().items;
    const hoje = new Date();
    const notificacoes = [];

    materiais.forEach(m => {
      if (m.quantidade <= m.quantidadeMinima) {
        notificacoes.push({ tipo: 'estoque', gravidade: m.quantidade <= (m.quantidadeMinima || 0) / 2 ? 'alta' : 'media', icone: '<i class="fas fa-exclamation-triangle"></i>', mensagem: `"${m.nome}" está com estoque crítico (${m.quantidade} ${m.unidade || 'un'})`, acao: 'Ir para Atelier', rota: 'atelier' });
      }
    });

    clientes.forEach(c => {
      if (c.ultimoContato || c.criadoEm) {
        const dataRef = c.ultimoContato || c.criadoEm;
        const dias = Math.floor((hoje - new Date(dataRef)) / 86400000);
        if (dias > 60) {
          notificacoes.push({ tipo: 'cliente', gravidade: dias > 180 ? 'alta' : 'media', icone: '<i class="fas fa-user"></i>', mensagem: `"${c.nome}" sem contato há ${dias} dias`, acao: 'Ver cliente', rota: 'clientes' });
        }
      }
    });

    eventos.forEach(e => {
      if (e.dataEvento) {
        const dias = Math.floor((new Date(e.dataEvento) - hoje) / 86400000);
        if (dias > 0 && dias <= 60) {
          notificacoes.push({ tipo: 'evento', gravidade: dias <= 15 ? 'alta' : 'media', icone: '<i class="fas fa-calendar-alt"></i>', mensagem: `"${e.nome}" em ${dias} dias (${e.status})`, acao: 'Ver eventos', rota: 'exposicoes' });
        }
      }
    });

    obras.forEach(o => {
      if (o.historicoPrecos && o.historicoPrecos.length > 1) {
        const ultimo = o.historicoPrecos[o.historicoPrecos.length - 1];
        const penultimo = o.historicoPrecos[o.historicoPrecos.length - 2];
        if (ultimo.preco < penultimo.preco) {
          notificacoes.push({ tipo: 'preco', gravidade: 'media', icone: '<i class="fas fa-tag"></i>', mensagem: `"${o.titulo}" teve redução de preço (${formatarMoeda(penultimo.preco)} → ${formatarMoeda(ultimo.preco)})`, acao: 'Ver obra', rota: 'catalogo' });
        }
      }
    });

    if (notificacoes.length === 0) {
      return '<div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-check"></i></div><p>Tudo em ordem! Nenhuma notificação pendente.</p></div>';
    }

    return `
      <div class="notificacoes-lista">
        ${notificacoes.sort((a, b) => a.gravidade === 'alta' ? -1 : 1).slice(0, 8).map(n => `
          <div class="notificacao-item notificacao-${n.gravidade}">
            <span class="notificacao-icone">${n.icone}</span>
            <span class="notificacao-msg">${n.mensagem}</span>
            <button class="btn-miniatura notificacao-acao" data-rota="${n.rota}">${n.acao}</button>
          </div>
        `).join('')}
        ${notificacoes.length > 8 ? `<p class="texto-ajuda">+${notificacoes.length - 8} notificações</p>` : ''}
      </div>
    `;
  }

  /* ---- Widget: Metas Financeiras ---- */
  renderWidgetMetas() {
    const config = configStore();
    const prec = config.precificador || {};
    const metaMensal = prec.metaMensal || 10000;
    const metaAnual = prec.metaAnual || 120000;
    const vendas = vendaStore().items;
    const hoje = new Date();

    const faturamentoMes = vendas.filter(v => {
      const d = new Date(v.dataVenda || v.data || v.criadoEm);
      return d.getMonth() === hoje.getMonth() && d.getFullYear() === hoje.getFullYear();
    }).reduce((s, v) => s + Number(v.valorTotal || v.valor || 0), 0);

    const faturamentoAno = vendas.filter(v => {
      const d = new Date(v.dataVenda || v.data || v.criadoEm);
      return d.getFullYear() === hoje.getFullYear();
    }).reduce((s, v) => s + Number(v.valorTotal || v.valor || 0), 0);

    const pctMes = Math.min(100, (faturamentoMes / metaMensal) * 100);
    const pctAno = Math.min(100, (faturamentoAno / metaAnual) * 100);
    const diasRestantes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate() - hoje.getDate() + 1;
    const metaDiaria = diasRestantes > 0 ? Math.max(0, (metaMensal - faturamentoMes) / diasRestantes) : 0;

    return `
      <div class="metas-container">
        <div class="meta-card">
          <div class="meta-header">
            <span>Meta Mensal</span>
            <span>${formatarMoeda(faturamentoMes)} / ${formatarMoeda(metaMensal)}</span>
          </div>
          <div class="meta-barra"><div class="meta-barra-preenchimento" style="width:${pctMes}%"></div></div>
          <div class="meta-footer">
            <span>${pctMes.toFixed(1)}% concluído</span>
            <span class="${pctMes >= 100 ? 'positiva' : ''}">${pctMes >= 100 ? '<i class="fas fa-check"></i> Meta atingida!' : `Faltam ${formatarMoeda(metaMensal - faturamentoMes)}`}</span>
          </div>
          ${pctMes < 100 ? `<div class="meta-diaria"><i class="fas fa-bullseye"></i> Meta diária necessária: ${formatarMoeda(metaDiaria)}/dia (${diasRestantes} dias restantes)</div>` : ''}
        </div>
        <div class="meta-card">
          <div class="meta-header">
            <span>Meta Anual</span>
            <span>${formatarMoeda(faturamentoAno)} / ${formatarMoeda(metaAnual)}</span>
          </div>
          <div class="meta-barra"><div class="meta-barra-preenchimento anual" style="width:${pctAno}%"></div></div>
          <div class="meta-footer">
            <span>${pctAno.toFixed(1)}% concluído</span>
            <span class="${pctAno >= 100 ? 'positiva' : ''}">${pctAno >= 100 ? '<i class="fas fa-check"></i> Parabéns!' : `Faltam ${formatarMoeda(metaAnual - faturamentoAno)}`}</span>
          </div>
        </div>
      </div>
    `;
  }

  /* ---- Widget: Obras Recentes ---- */
  renderWidgetRecentes() {
    const obras = obraStore().items;
    const recentes = [...obras].sort((a, b) => new Date(b.dataCadastro || b.criadoEm) - new Date(a.dataCadastro || a.criadoEm)).slice(0, 5);
    if (recentes.length === 0) {
      return '<div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-images"></i></div><p>Nenhuma obra cadastrada ainda.</p></div>';
    }
    return `
      <ul class="lista-obras-recentes stagger-in">
        ${recentes.map(o => {
          const imgSrc = o.imagemDestacada || (o.imagens && o.imagens[0]) || o.imagem || '';
          return `
            <li class="item-obra-recente">
              <div class="thumb-obra">${imgSrc ? `<img src="${imgSrc}" alt="${o.titulo}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">` : '<i class="fas fa-images"></i>'}</div>
              <div class="info-obra-recente">
                <div class="nome">${o.titulo}</div>
                <div class="meta">${o.tecnica || ''} · ${formatarData(o.dataCadastro || o.criadoEm)}</div>
              </div>
              <span class="tag-status ${classeStatus(o.status)}">${rotuloStatus(o.status)}</span>
            </li>
          `;
        }).join('')}
      </ul>
    `;
  }

  /* ---- Widget: Atividades ---- */
  renderWidgetAtividades() {
    const recentes = activityLogger.obterRecentes(8);
    if (recentes.length === 0) {
      return '<div class="estado-vazio"><p>Nenhuma atividade registrada ainda.</p></div>';
    }
    return `
      <div class="activity-feed">
        ${recentes.map(a => `
          <div class="activity-item">
            <div class="activity-icone">${activityLogger.obterIcone(a.tipo)}</div>
            <div class="activity-detalhes">
              <div class="activity-titulo">${a.titulo} <span class="activity-badge ${a.badge}">${a.badge}</span></div>
              <div class="activity-tempo">${activityLogger.formatarTempo(new Date(a.timestamp))}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ---- Widget: Dica do Dia ---- */
  renderWidgetDica() {
    const dica = obterDicaDoDia() || 'Reserve 15 minutos ao final do dia para registrar seu progresso no Diário Criativo.';
    return `<div class="dica-card"><div class="dica-icone"><i class="fas fa-lightbulb"></i></div><div class="dica-texto"><p>${dica}</p><span class="texto-ajuda">Dica do dia · Atualiza automaticamente</span></div></div>`;
  }

  /* ---- Lifecycle ---- */
  aposRenderizar() {
    this.removerListeners();
    const container = document.getElementById('viewPrincipal');

    document.getElementById('btnAtualizarDashboard')?.addEventListener('click', () => this.rerenderizar());
    document.getElementById('btnDownloadDashboard')?.addEventListener('click', () => {
      if (typeof html2canvas === 'undefined') { mostrarToast('Biblioteca de captura indisponível.'); return; }
      mostrarToast('Gerando imagem do dashboard...');
      const el = document.getElementById('viewPrincipal').querySelector('.kpi-grid')?.parentElement || document.getElementById('viewPrincipal');
      html2canvas(el, { backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg').trim() || '#ffffff', scale: 2, useCORS: true, logging: false }).then(canvas => {
        const link = document.createElement('a'); link.download = `dashboard-${new Date().toISOString().slice(0,10)}.png`;
        link.href = canvas.toDataURL('image/png'); link.click(); mostrarToast('Dashboard exportado!');
      }).catch(() => mostrarToast('Erro ao gerar imagem.'));
    });
    document.getElementById('btnAtalhoNovaObra')?.addEventListener('click', () => { this.router.navegar('catalogo'); setTimeout(() => eventBus.emitir('abrir-nova-obra'), 200); });
    document.getElementById('btnAtalhoVenda')?.addEventListener('click', () => { this.router.navegar('vendas'); setTimeout(() => eventBus.emitir('abrir-nova-venda'), 200); });
    document.getElementById('btnAtalhoRecibo')?.addEventListener('click', () => eventBus.emitir('abrir-recibo-rapido'));
    document.getElementById('btnAtalhoClientes')?.addEventListener('click', () => this.router.navegar('clientes'));

    container.addEventListener('click', (e) => {
      const notifBtn = e.target.closest('.notificacao-acao');
      if (notifBtn && notifBtn.dataset.rota) {
        this.router.navegar(notifBtn.dataset.rota);
        return;
      }
    });

    this.initDragDrop();
    this.initConfigModal();
    if (typeof Chart === 'undefined') {
      carregarChartJS().then(() => this.initCharts()).catch(() => {});
    } else {
      this.initCharts();
    }
  }

  initCharts() {
    if (typeof Chart === 'undefined') {
      document.querySelectorAll('[id^="chart"]').forEach(el => {
        if (el.tagName === 'CANVAS') {
          el.parentElement.innerHTML = '<p class="texto-ajuda">Gráfico indisponível (Chart.js não carregou).</p>';
        }
      });
      return;
    }

    Object.values(this.charts).forEach(c => { try { c.destroy(); } catch (e) { console.warn(e) } });
    this.charts = {};

    const obras = obraStore().items;
    const vendas = vendaStore().items;
    const hoje = new Date();
    const ctxColors = ['#2563eb', '#16a34a', '#d97706', '#7c3aed', '#dc2626', '#0891b2', '#ca8a04', '#be185d'];

    // Produção Mensal (bar chart)
    const prodCanvas = document.getElementById('chartProducao');
    if (prodCanvas) {
      const meses = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
        const total = obras.filter(o => {
          const dataO = new Date(o.dataCadastro || o.criadoEm);
          return dataO.getMonth() === d.getMonth() && dataO.getFullYear() === d.getFullYear();
        }).length;
        meses.push({ rotulo: d.toLocaleDateString('pt-BR', { month: 'short' }), total });
      }
      this.charts.producao = new Chart(prodCanvas.getContext('2d'), {
        type: 'bar', data: {
          labels: meses.map(m => m.rotulo),
          datasets: [{ label: 'Obras criadas', data: meses.map(m => m.total), backgroundColor: ctxColors, borderRadius: 4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
      });
    }

    // Técnicas (doughnut)
    const tecCanvas = document.getElementById('chartTecnicas');
    if (tecCanvas) {
      const contagem = {};
      obras.forEach(o => { if (o.tecnica) contagem[o.tecnica] = (contagem[o.tecnica] || 0) + 1; });
      const labels = Object.keys(contagem);
      const data = Object.values(contagem);
      this.charts.tecnicas = new Chart(tecCanvas.getContext('2d'), {
        type: 'doughnut', data: {
          labels, datasets: [{ data, backgroundColor: ctxColors, borderWidth: 0 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { boxWidth: 12, padding: 8 } } } }
      });
    }

    // Receita (line)
    const recCanvas = document.getElementById('chartReceita');
    if (recCanvas) {
      const meses = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
        const total = vendas.filter(v => {
          const dataV = new Date(v.dataVenda || v.data || v.criadoEm);
          return dataV.getMonth() === d.getMonth() && dataV.getFullYear() === d.getFullYear();
        }).reduce((s, v) => s + Number(v.valorTotal || v.valor || 0), 0);
        meses.push({ rotulo: d.toLocaleDateString('pt-BR', { month: 'short' }), total });
      }
      this.charts.receita = new Chart(recCanvas.getContext('2d'), {
        type: 'line', data: {
          labels: meses.map(m => m.rotulo),
          datasets: [{ label: 'Receita', data: meses.map(m => m.total), borderColor: '#16a34a', backgroundColor: 'rgba(22,163,74,0.1)', fill: true, tension: 0.4, pointRadius: 4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { callback: v => 'R$' + v.toLocaleString('pt-BR') } } } }
      });
    }

    // Previsão
    const prevCanvas = document.getElementById('chartPrevisao');
    if (prevCanvas) {
      const dados = this.calcularPrevisao(vendas);
      const meses = dados.meses.map(m => m.mes.toLocaleDateString('pt-BR', { month: 'short' }));
      const reais = dados.meses.map(m => m.total);
      const projetados = [];
      for (let i = 0; i < 6; i++) {
        projetados.push(Math.max(0, dados.inclinacao * (dados.meses.length + i) + dados.intercept));
      }
      const labelsProj = [...meses, ...Array.from({ length: 6 }, (_, i) => `+${i + 1}m`)];
      this.charts.previsao = new Chart(prevCanvas.getContext('2d'), {
        type: 'line', data: {
          labels: labelsProj,
          datasets: [
            { label: 'Realizado', data: [...reais, ...Array(6).fill(null)], borderColor: '#2563eb', backgroundColor: 'rgba(37,99,235,0.1)', fill: true, tension: 0.4, pointRadius: 4 },
            { label: 'Projetado', data: [...Array(meses.length).fill(null), ...projetados], borderColor: '#d97706', borderDash: [5, 5], tension: 0.4, pointRadius: 3, pointStyle: 'circle' }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 8 } } },
          scales: { y: { beginAtZero: true, ticks: { callback: v => 'R$' + Math.round(v).toLocaleString('pt-BR') } } } }
      });
    }
  }

  initDragDrop() {
    const grid = document.getElementById('widgetsGrid');
    if (!grid) return;
    let dragging = null;

    grid.addEventListener('dragstart', (e) => {
      const card = e.target.closest('.widget-card');
      if (!card) return;
      dragging = card;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    grid.addEventListener('dragend', (e) => {
      const card = e.target.closest('.widget-card');
      if (card) card.classList.remove('dragging');
      dragging = null;
    });

    grid.addEventListener('dragover', (e) => {
      e.preventDefault();
      const target = e.target.closest('.widget-card');
      if (!target || target === dragging) return;
      const rect = target.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      if (e.clientY < mid) {
        grid.insertBefore(dragging, target);
      } else {
        grid.insertBefore(dragging, target.nextSibling);
      }
    });

    grid.addEventListener('drop', (e) => {
      e.preventDefault();
      const ids = Array.from(grid.querySelectorAll('.widget-card')).map(el => el.dataset.widget);
      this.widgetOrdem = ids;
      this.salvarOrdemWidgets();
    });
  }

  initConfigModal() {
    const btnConfig = document.getElementById('btnConfigWidgets');
    const overlay = document.getElementById('widgetConfigOverlay');
    if (!btnConfig || !overlay) return;

    btnConfig.addEventListener('click', () => { overlay.style.display = 'flex'; });

    document.getElementById('btnFecharConfigWidgets')?.addEventListener('click', () => { overlay.style.display = 'none'; });
    document.getElementById('btnSalvarConfigWidgets')?.addEventListener('click', () => {
      overlay.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        const w = this.widgetsDisponiveis.find(x => x.id === cb.dataset.wconfig);
        if (w) w.visivel = cb.checked;
      });
      this.salvarOrdemWidgets();
      overlay.style.display = 'none';
      this.rerenderizar();
    });

    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; });
  }

  destruir() {
    Object.values(this.charts).forEach(c => { try { c.destroy(); } catch (e) { console.warn(e) } });
    this.charts = {};
    super.destruir();
  }
}
