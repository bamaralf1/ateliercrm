export class DiarioView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.tabAtiva = 'entradas';
    this.calData = new Date();
    this.calVisao = 'mensal';
    this._filtroObraProc = '';
    this._entradaEditando = null;
    this._fotosTemporarias = [];
    this._selHumor = 0;

    // Emojis de humor (escala)
    this.humorEmojis = { 1: '😫', 2: '😕', 3: '😐', 4: '🙂', 5: '🤩' };
    this.humorLabels = { 1: 'Terrível', 2: 'Difícil', 3: 'Neutro', 4: 'Bom', 5: 'Excelente' };

    // Tipos de atividade para o calendário
    this.tipoAtividade = { pintura: '#3b82f6', escultura: '#8b5cf6', admin: '#f59e0b', descanso: '#10b981' };

    // Etapas padrão de processo criativo
    this.etapasPadrao = [
      'Sketch inicial', 'Estudo de cor', 'Primeira camada', 'Camadas intermediárias',
      'Detalhamento', 'Finalização', 'Verniz'
    ];

    // Citação de artistas (50)
    this.citacoes = [
      { texto: 'A arte é a mentira que nos permite conhecer a verdade.', autor: 'Pablo Picasso' },
      { texto: 'Não há nada mais artístico do que amar as pessoas.', autor: 'Vincent van Gogh' },
      { texto: 'A criatividade é a inteligência se divertindo.', autor: 'Albert Einstein' },
      { texto: 'A pintura é poesia silenciosa.', autor: 'Plutarco' },
      { texto: 'A arte lava da alma a poeira do cotidiano.', autor: 'Pablo Picasso' },
      { texto: 'Eu sonho minha pintura e pinto meu sonho.', autor: 'Vincent van Gogh' },
      { texto: 'A cor é o teclado, os olhos são os martelos, a alma é o piano com muitas cordas.', autor: 'Wassily Kandinsky' },
      { texto: 'O artista não é nada sem o dom, mas o dom não é nada sem o trabalho.', autor: 'Émile Zola' },
      { texto: 'A arte não reproduz o visível, ela torna visível.', autor: 'Paul Klee' },
      { texto: 'Comece onde você está. Use o que você tem. Faça o que você pode.', autor: 'Arthur Ashe' },
      { texto: 'A perfeição não é quando não há mais nada a acrescentar, mas quando não há mais nada a retirar.', autor: 'Antoine de Saint-Exupéry' },
      { texto: 'A arte é a expressão dos mais profundos pensamentos pelo caminho mais simples.', autor: 'Albert Einstein' },
      { texto: 'Toda criança é artista. O problema é como permanecer artista depois de crescer.', autor: 'Pablo Picasso' },
      { texto: 'A criatividade é contaminante. Passe adiante.', autor: 'Albert Einstein' },
      { texto: 'A simplicidade é o último grau da sofisticação.', autor: 'Leonardo da Vinci' },
      { texto: 'A arte deve confortar os perturbados e perturbar os confortáveis.', autor: 'Banksy' },
      { texto: 'O propósito da arte é lavar a poeira da vida cotidiana de nossas almas.', autor: 'Pablo Picasso' },
      { texto: 'A inspiração existe, mas precisa te encontrar trabalhando.', autor: 'Pablo Picasso' },
      { texto: 'Grandes coisas são feitas por uma série de pequenas coisas reunidas.', autor: 'Vincent van Gogh' },
      { texto: 'A arte não é um artesanato, é a transmissão de uma emoção que o artista experimentou.', autor: 'Leonardo da Vinci' },
      { texto: 'Pinte como se você nunca tivesse medo de errar.', autor: 'Bob Ross' },
      { texto: 'Não há erro na arte, apenas oportunidades.', autor: 'Bob Ross' },
      { texto: 'A arte é a assinatura da civilização.', autor: 'Beverly Sills' },
      { texto: 'O mundo real é apenas um, mas a arte pode criar muitos mundos.', autor: 'Frida Kahlo' },
      { texto: 'Pinto autorretratos porque estou sempre disponível.', autor: 'Frida Kahlo' },
      { texto: 'A arte é a mais bela das mentiras.', autor: 'Claude Debussy' },
      { texto: 'Nuances, nuances, sempre nuances!', autor: 'Eugène Delacroix' },
      { texto: 'O olhar do pintor só se completa no olhar do espectador.', autor: 'Marcel Duchamp' },
      { texto: 'A forma segue a intuição.', autor: 'Joan Miró' },
      { texto: 'Não pinte o que vê, pinte o que sente.', autor: 'Henri Matisse' },
      { texto: 'A cor é um poder que influencia diretamente a alma.', autor: 'Wassily Kandinsky' },
      { texto: 'A arte não é o que você vê, mas o que você faz os outros verem.', autor: 'Edgar Degas' },
      { texto: 'Primeiro aprenda as regras como um profissional, depois quebre-as como um artista.', autor: 'Pablo Picasso' },
      { texto: 'A luz não está na tela, está no olho de quem vê.', autor: 'Claude Monet' },
      { texto: 'O importante é a emoção, não a técnica.', autor: 'Vincent van Gogh' },
      { texto: 'Eu procuro nas cores uma vibração que não precise de explicação.', autor: 'Paul Cézanne' },
      { texto: 'O desenho é a honestidade da arte.', autor: 'Jean-Auguste-Dominique Ingres' },
      { texto: 'A arte é feita para incomodar. A ciência para tranquilizar.', autor: 'Georges Braque' },
      { texto: 'A única tradição verdadeira é a da inovação.', autor: 'Piet Mondrian' },
      { texto: 'Menos é mais.', autor: 'Ludwig Mies van der Rohe' },
      { texto: 'A arte é o prazer de um espírito que penetra na natureza.', autor: 'Auguste Renoir' },
      { texto: 'O segredo da arte é o amor.', autor: 'Camille Pissarro' },
      { texto: 'Sem emoção, não há arte.', autor: 'Wassily Kandinsky' },
      { texto: 'A arte é uma mentira que nos faz perceber a verdade.', autor: 'Pablo Picasso' },
      { texto: 'O importante é fazer da arte um ato de amor.', autor: 'Frida Kahlo' },
      { texto: 'Pinte a luz, não a coisa.', autor: 'Claude Monet' },
      { texto: 'A arte é a mais intensa forma de individualismo que o mundo conhece.', autor: 'Oscar Wilde' },
      { texto: 'O talento é a capacidade de fazer um esforço que vale a pena.', autor: 'Francisco de Goya' },
      { texto: 'As cores são as ação da luz, ação e paixões.', autor: 'Johann Wolfgang von Goethe' },
      { texto: 'O olho é a janela da alma e o pincel é a sua voz.', autor: 'Leonardo da Vinci' }
    ];

    // Prompts criativos diários (30)
    this.promptsDiarios = [
      'Experimente uma paleta restrita de apenas 3 cores hoje.',
      'Desenhe algo que você ama usando apenas a mão não-dominante.',
      'Pinte o mesmo objeto em 3 humores diferentes.',
      'Crie uma textura usando materiais não convencionais (café, areia, tecido).',
      'Faça um estudo de luz com apenas preto e branco.',
      'Pegue uma obra inacabada e finalize em 30 minutos.',
      'Crie um gradiente de 10 tons entre duas cores complementares.',
      'Desenhe de memória um lugar que você visitou há muito tempo.',
      'Use uma espátula em vez de pincel o dia todo.',
      'Pinte ao ar livre por pelo menos 1 hora.',
      'Escolha uma cor que você evita e crie algo só com ela.',
      'Faça 10 miniaturas de composição antes de começar a obra do dia.',
      'Releia um esboço antigo e dê uma nova versão.',
      'Misture técnica: use aquarela com toques de óleo.',
      'Observe uma sombra por 5 minutos e pinte apenas ela.',
      'Crie uma paleta inspirada em uma fotografia que você ama.',
      'Trabalhe apenas com tons pastéis hoje.',
      'Desafio monocromático: pinte usando um único pigmento.',
      'Faça um autorretrato emocional (como você se sente agora).',
      'Use uma paleta de cores que você nunca usou antes.',
      'Pinte uma memória de infância em 20 minutos.',
      'Copie um mestre para aprender sua técnica de pincelada.',
      'Crie uma série de 3 obras que contem uma história.',
      'Pinte com os olhos fechados e veja o que surge.',
      'Use um pincel diferente do habitual para cada etapa.',
      'Adicione douramento ou folha de ouro a uma obra existente.',
      'Crie um estudo de mãos hoje.',
      'Faça uma pintura gestual em menos de 10 minutos.',
      'Transforme um erro em destaque criativo intencional.',
      'Pinte o mesmo tema em dois estilos completamente diferentes.'
    ];

    // Desafios semanais
    this.desafiosSemanais = [
      'Série relâmpago: 7 pinturas em 7 dias sobre o mesmo tema.',
      'Semana do preto e branco: apenas tons neutros por 7 dias.',
      'Desafio da transparência: explore camadas e sobreposição.',
      'Semana do retrato: estude rostos de 7 pessoas diferentes.',
      'Desafio do movimento: capture algo em movimento a cada dia.',
      'Semana macro: pinte detalhes ampliados de objetos pequenos.',
      'Desafio da cor complementar: cada dia um par de complementares.',
      'Semana de arte colaborativa: convide outro artista para trocar telas.'
    ];
  }

  // --- Getters ---
  get entradas() { return this.dataStore.listar('entradasDiario') || []; }
  get processos() { return this.dataStore.listar('etapasProcesso') || []; }
  get obras() { return obraStore().items; }
  get encomendas() { return this.dataStore.listar('encomendas') || []; }

  // --- RENDER PRINCIPAL ---
  render() {
    const tabs = ['entradas', 'cronograma', 'processo', 'estatisticas', 'inspiracao'];
    const tabLabels = { entradas: '<i class="fas fa-clipboard"></i> Entradas', cronograma: '<i class="fas fa-calendar-alt"></i> Cronograma', processo: '<i class="fas fa-pencil-alt"></i> Processo', estatisticas: '<i class="fas fa-chart-bar"></i> Estatísticas', inspiracao: '<i class="fas fa-lightbulb"></i> Inspiração' };
    const content = {
      entradas: () => this.renderEntradas(),
      cronograma: () => this.renderCronograma(),
      processo: () => this.renderProcesso(),
      estatisticas: () => this.renderEstatisticas(),
      inspiracao: () => this.renderInspiracao()
    };
    return `
      <div class="diario-header">
        <div>
          <h2><i class="fas fa-clipboard"></i> Diário Criativo</h2>
          <div class="diario-sub">Registro íntimo do seu processo artístico  ·  ${new Date().toLocaleDateString('pt-BR')}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-primario" id="btnNovaEntrada" style="font-size:0.8rem;padding:6px 14px;"><i class="fas fa-plus"></i> Nova Entrada</button>
        </div>
      </div>
      <div class="diario-tabs">
        ${tabs.map(t => `<button class="tab-btn ${t === this.tabAtiva ? 'ativo' : ''}" data-tab="${t}">${tabLabels[t]}</button>`).join('')}
      </div>
      <div id="diarioContent">${content[this.tabAtiva]()}</div>
    `;
  }

  // ======================= 1. ENTRADAS DIÁRIAS =======================
  renderEntradas() {
    const entradas = [...this.entradas].sort((a, b) => new Date(b.data || b.criadoEm) - new Date(a.data || a.criadoEm));
    return `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
        <span style="font-size:0.85rem;color:var(--text-muted);">${entradas.length} registro(s)  ·  última semana: ${entradas.filter(e => { const d = new Date(); d.setDate(d.getDate() - 7); return new Date(e.data) >= d; }).length} entrada(s)</span>
      </div>
      ${entradas.length === 0 ? '<div class="diario-card" style="text-align:center;padding:30px;color:var(--text-muted);"><p style="font-size:1.2rem;margin-bottom:6px;"><i class="fas fa-pencil-alt"></i></p><p>Nenhuma entrada no diário ainda.<br>Clique em "Nova Entrada" para começar seu registro criativo.</p></div>' : ''}
      <div class="diario-entry-grid">
        ${entradas.map(e => this.renderCardEntrada(e)).join('')}
      </div>
    `;
  }

  renderCardEntrada(e) {
    const humor = e.humor || 3;
    const emoji = this.humorEmojis[humor] || '😐';
    const label = this.humorLabels[humor] || '';
    const data = e.data ? new Date(e.data).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }) : '';
    const obrasNomes = (e.obrasTrabalhadas || []).map(id => { const o = obraStore().items.find(o => o.id === id); return o ? o.titulo : null; }).filter(Boolean);
    const fotos = e.fotos || [];

    return `
      <div class="diario-card">
        <div class="dc-data">${data}</div>
        <div class="dc-humor" title="${label}">${emoji} <span style="font-size:0.7rem;color:var(--text-muted);font-weight:400;">${label}</span></div>
        <div class="dc-horas"><strong>⏰ ${e.horasTrabalhadas || 0}h</strong> trabalhadas</div>
        <div class="dc-texto">${e.oQueTrabalhou || ''}</div>
        ${obrasNomes.length > 0 ? `<div class="dc-obras">${obrasNomes.map(n => `<span><i class="fas fa-images"></i> ${n}</span>`).join('')}</div>` : ''}
        ${e.bloqueios ? `<div class="dc-bloqueios"><i class="fas fa-exclamation-triangle"></i> ${e.bloqueios}</div>` : ''}
        ${e.avancos ? `<div class="dc-avancos"><i class="fas fa-check"></i> ${e.avancos}</div>` : ''}
        ${e.descobertas ? `<div class="dc-descobertas"><i class="fas fa-lightbulb"></i> ${e.descobertas}</div>` : ''}
        ${fotos.length > 0 ? `<div class="dc-fotos">${fotos.map(f => `<img src="${f}" onclick="window.open('${f}')">`).join('')}</div>` : ''}
        <div class="diario-acoes">
          <button data-acao="editarEntrada" data-id="${e.id}"><i class="fas fa-pen"></i> Editar</button>
          <button data-acao="excluirEntrada" data-id="${e.id}" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
  }

  // ======================= 2. CRONOGRAMA DE PRODUÇÃO =======================
  renderCronograma() {
    const ano = this.calData.getFullYear();
    const mes = this.calData.getMonth();
    const hoje = new Date();

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaSemanaInicio = primeiroDia.getDay();

    // Dias do mês anterior para preencher
    const diasMesAnterior = [];
    const ultimoMes = new Date(ano, mes, 0);
    const ultimoDiaMesAnt = ultimoMes.getDate();
    for (let i = diaSemanaInicio - 1; i >= 0; i--) {
      diasMesAnterior.push({ dia: ultimoDiaMesAnt - i, outro: true });
    }

    // Dias do mês atual
    const diasMes = [];
    for (let i = 1; i <= diasNoMes; i++) {
      const dataStr = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const data = new Date(ano, mes, i);
      const ehHoje = data.toDateString() === hoje.toDateString();

      // Atividades das entradas
      const atividades = this.entradas.filter(e => {
        if (!e.data) return false;
        const ed = new Date(e.data);
        return ed.getFullYear() === ano && ed.getMonth() === mes && ed.getDate() === i;
      });

      // Prazos de encomendas
      const prazos = this.encomendas.filter(enc => {
        if (!enc.prazo) return false;
        const pd = new Date(enc.prazo);
        return pd.getFullYear() === ano && pd.getMonth() === mes && pd.getDate() === i;
      });

      // Cores por tipo de atividade (heurística simples baseada no texto)
      const cores = [];
      atividades.forEach(a => {
        const texto = (a.oQueTrabalhou || '').toLowerCase();
        if (texto.includes('escultura') || texto.includes('argila') || texto.includes('bronze')) cores.push('escultura');
        else if (texto.includes('admin') || texto.includes('organiz') || texto.includes('email') || texto.includes('papel') || texto.includes('nota')) cores.push('admin');
        else if (a.horasTrabalhadas === 0 || (a.bloqueios && a.bloqueios.includes('descanso'))) cores.push('descanso');
        else cores.push('pintura');
      });

      const horasTot = atividades.reduce((s, a) => s + (a.horasTrabalhadas || 0), 0);
      const metaText = horasTot > 0 ? `${horasTot}h` : '';

      diasMes.push({ dia: i, dataStr, ehHoje, atividades, prazos, cores, metaText });
    }

    // Dias do próximo mês para completar
    const totalCelulas = diasMesAnterior.length + diasMes.length;
    const diasProxMes = [];
    const resto = totalCelulas % 7 === 0 ? 0 : 7 - (totalCelulas % 7);
    for (let i = 1; i <= resto; i++) {
      diasProxMes.push({ dia: i, outro: true });
    }

    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const nomeMes = this.calData.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    return `
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button id="calMesAnt">◀</button>
          <span>${nomeMes}</span>
          <button id="calMesProx">▶</button>
          <button id="calHoje" style="margin-left:4px;font-size:0.75rem;padding:4px 10px;">Hoje</button>
        </div>
        <div style="display:flex;gap:6px;align-items:center;">
          <span style="font-size:0.78rem;color:var(--text-muted);">Total: ${this.entradas.reduce((s, e) => s + (e.horasTrabalhadas || 0), 0).toFixed(1)}h</span>
        </div>
      </div>
      <div class="cal-grid">
        ${diasDaSemana.map(d => `<div class="cal-header-cell">${d}</div>`).join('')}
        ${[...diasMesAnterior, ...diasMes, ...diasProxMes].map(cel => {
          const classes = ['cal-cell'];
          if (cel.outro) classes.push('outro-mes');
          if (cel.ehHoje) classes.push('hoje');
          if (cel.atividades && cel.atividades.length > 0) classes.push('tem-atividade');
          if (cel.prazos && cel.prazos.length > 0) classes.push('tem-prazo');

          return `
            <div class="${classes.join(' ')}" ${cel.dataStr ? `data-data="${cel.dataStr}"` : ''}>
              <div class="cal-num">${cel.dia}</div>
              ${cel.cores ? `<div class="cal-atividades">${cel.cores.map(c => `<span class="cal-dot ${c}" title="${c}"></span>`).join('')}${cel.prazos ? cel.prazos.map(() => `<span class="cal-dot prazo" title="Prazo"></span>`).join('') : ''}</div>` : ''}
              ${cel.prazos && cel.prazos.length > 0 ? `<div style="font-size:0.55rem;color:#ef4444;font-weight:600;margin-top:1px;"><i class="fas fa-exclamation-triangle"></i> ${cel.prazos.length}</div>` : ''}
              ${cel.metaText ? `<div class="cal-meta-text">${cel.metaText}</div>` : ''}
            </div>
          `;
        }).join('')}
      </div>
      <div class="cal-legenda">
        <span><span class="leg-dot" style="background:#3b82f6;"></span> Pintura</span>
        <span><span class="leg-dot" style="background:#8b5cf6;"></span> Escultura</span>
        <span><span class="leg-dot" style="background:#f59e0b;"></span> Administrativo</span>
        <span><span class="leg-dot" style="background:#10b981;"></span> Descanso</span>
        <span><span class="leg-dot" style="background:#ef4444;animation:pulse-dot 1.5s infinite;"></span> Prazo</span>
      </div>
    `;
  }

  // ======================= 3. DOCUMENTAÇÃO DE PROCESSO =======================
  renderProcesso() {
    const obras = this.obras;
    const processos = this.processos;
    const obraId = this._filtroObraProc;
    const proc = obraId ? processos.find(p => p.obraId === obraId) : null;
    const etapas = proc ? (proc.etapas || []) : [];

    const opcoes = `<option value="">→ Selecione uma obra —</option>
      ${obras.map(o => `<option value="${o.id}" ${o.id === obraId ? 'selected' : ''}>${o.titulo || 'Sem título'}</option>`).join('')}`;

    return `
      <div class="proc-worksel">
        <select id="selObraProcesso">${opcoes}</select>
        <button class="btn-primario" id="btnNovaEtapa" style="font-size:0.75rem;padding:5px 12px;margin-left:8px;" ${!obraId ? 'disabled' : ''}><i class="fas fa-plus"></i> Nova Etapa</button>
        ${obraId ? `<button class="btn-secundario" id="btnExportarProcessoPDF" style="font-size:0.75rem;padding:5px 12px;margin-left:4px;">📤 Exportar Making Of PDF</button>` : ''}
      </div>
      ${!obraId ? '<p style="color:var(--text-muted);font-size:0.85rem;">Selecione uma obra para ver o processo criativo documentado.</p>' : (
        etapas.length === 0 ? `<div style="text-align:center;padding:30px;color:var(--text-muted);"><p style="font-size:1.2rem;">📉</p><p>Nenhuma etapa documentada para esta obra ainda.<br>Clique em "Nova Etapa" para iniciar a linha do tempo do processo criativo.</p></div>` : ''
      )}
      ${etapas.length > 0 ? `
        <div style="margin-bottom:12px;font-size:0.85rem;color:var(--text-muted);">${etapas.length} etapa(s)  ·  ${obras.find(o => o.id === obraId)?.titulo || ''}</div>
        <div class="proc-timeline">
          ${etapas.sort((a, b) => new Date(a.data || 0) - new Date(b.data || 0)).map((et, i) => `
            <div class="proc-step">
              <div class="ps-titulo">${i + 1}. ${et.titulo || 'Etapa'}</div>
              <div class="ps-data"><i class="fas fa-calendar-alt"></i> ${et.data ? new Date(et.data).toLocaleDateString('pt-BR') : '—'}</div>
              <div class="ps-desc">${et.descricao || ''}</div>
              ${et.notasTecnicas ? `<div class="ps-notas"><i class="fas fa-pencil-alt"></i> ${et.notasTecnicas}</div>` : ''}
              ${et.foto ? `<div class="ps-foto"><img src="${et.foto}" onclick="window.open('${et.foto}')"></div>` : ''}
              ${et.videoLink ? `<div class="ps-video">📉 <a href="${et.videoLink}" target="_blank">Ver vídeo time-lapse</a></div>` : ''}
              <div class="diario-acoes">
                <button data-acao="editarEtapa" data-id="${et.id}"><i class="fas fa-pen"></i> Editar</button>
                <button data-acao="excluirEtapa" data-id="${et.id}" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
  }

  // ======================= 4. ESTATÍSTICAS CRIATIVAS =======================
  renderEstatisticas() {
    const entradas = this.entradas;
    const obras = this.obras;

    // Horas por semana
    const horasSemana = {};
    const horasMes = {};
    const horasAno = {};
    let totalHoras = 0;

    entradas.forEach(e => {
      if (!e.data || !e.horasTrabalhadas) return;
      const d = new Date(e.data);
      const semana = `${d.getFullYear()}-S${Math.ceil((d.getDate() - d.getDay() + 1) / 7)}`;
      const mes = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const ano = d.getFullYear();
      const h = e.horasTrabalhadas || 0;
      horasSemana[semana] = (horasSemana[semana] || 0) + h;
      horasMes[mes] = (horasMes[mes] || 0) + h;
      horasAno[ano] = (horasAno[ano] || 0) + h;
      totalHoras += h;
    });

    // Produtividade por técnica
    const tecnicas = {};
    entradas.forEach(e => {
      (e.obrasTrabalhadas || []).forEach(oid => {
        const o = obraStore().items.find(o => o.id === oid);
        if (o && o.tecnica) {
          tecnicas[o.tecnica] = (tecnicas[o.tecnica] || 0) + (e.horasTrabalhadas || 0);
        }
      });
    });

    // Média de dias para completar obra por técnica
    const mediasObra = {};
    obras.forEach(o => {
      if (!o.dataCadastro || !o.criadoEm) return;
      // Heurística: última etapa de processo ou data de venda
      const proc = this.processos.find(p => p.obraId === o.id);
      const etapas = proc ? proc.etapas || [] : [];
      const dataFim = etapas.length > 0 ? new Date(etapas[etapas.length - 1].data) : new Date(o.criadoEm);
      const dataInicio = new Date(o.criadoEm);
      const dias = Math.round((dataFim - dataInicio) / 86400000);
      if (dias > 0 && o.tecnica) {
        if (!mediasObra[o.tecnica]) mediasObra[o.tecnica] = { total: 0, count: 0 };
        mediasObra[o.tecnica].total += dias;
        mediasObra[o.tecnica].count++;
      }
    });

    // Dias de maior criatividade (correlação humor + horas)
    const topDias = [...entradas].filter(e => e.humor >= 4 && e.horasTrabalhadas >= 4).sort((a, b) => (b.horasTrabalhadas || 0) - (a.horasTrabalhadas || 0)).slice(0, 5);

    // Gráfico SVG: horas por mês (últimos 6)
    const meses = [];
    const agora = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(agora.getFullYear(), agora.getMonth() - i, 1);
      const chave = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const rotulo = d.toLocaleDateString('pt-BR', { month: 'short' });
      meses.push({ chave, rotulo, horas: horasMes[chave] || 0 });
    }
    const maxHoras = Math.max(1, ...meses.map(m => m.horas));

    const svgW = 460, svgH = 140, margem = 24;
    const largBarra = (svgW - margem) / meses.length - 8;
    const altUtil = svgH - 30;

    const barras = meses.map((m, i) => {
      const x = margem + i * ((svgW - margem) / meses.length);
      const h = (m.horas / maxHoras) * (altUtil - 10);
      const y = svgH - 10 - h;
      return `<rect class="stats-bar" x="${x}" y="${y}" width="${Math.max(largBarra, 6)}" height="${Math.max(h, 2)}" rx="3"></rect>
        <text class="stats-value" x="${x + largBarra / 2}" y="${y - 4}">${m.horas.toFixed(0)}</text>
        <text class="stats-label" x="${x + largBarra / 2}" y="${svgH - 2}">${m.rotulo}</text>`;
    }).join('');

    const tecArray = Object.entries(tecnicas).sort((a, b) => b[1] - a[1]);
    const maxTec = Math.max(1, ...tecArray.map(t => t[1]));

    return `
      <div class="stats-grid">
        <div class="stats-card">
          <h4>⏰ Total de Horas</h4>
          <div class="stats-valor">${totalHoras.toFixed(1)}h</div>
          <div class="stats-sub">${entradas.length} dias registrados</div>
        </div>
        <div class="stats-card">
          <h4><i class="fas fa-calendar-alt"></i> Média Diária</h4>
          <div class="stats-valor">${entradas.length > 0 ? (totalHoras / entradas.length).toFixed(1) : 0}h</div>
          <div class="stats-sub">por dia de trabalho</div>
        </div>
        <div class="stats-card">
          <h4><i class="fas fa-pencil-alt"></i> Média p/ Obra</h4>
          <div class="stats-valor">${Object.values(mediasObra).length > 0 ? (Object.values(mediasObra).reduce((s, m) => s + m.total / m.count, 0) / Object.values(mediasObra).length).toFixed(0) : '—'}</div>
          <div class="stats-sub">dias em média (${Object.keys(mediasObra).length} técnicas)</div>
        </div>
        <div class="stats-card" style="grid-column:1/-1;">
          <h4>📆 Horas por Mês</h4>
          <svg class="stats-svg" viewBox="0 0 ${svgW} ${svgH}">${barras}</svg>
        </div>
        ${tecArray.length > 0 ? `
        <div class="stats-card" style="grid-column:1/-1;">
          <h4><i class="fas fa-pencil-alt"></i> Produtividade por Técnica</h4>
          ${tecArray.map(([tec, horas]) => `
            <div style="margin-bottom:8px;">
              <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:2px;">
                <span>${tec}</span><span>${horas.toFixed(1)}h</span>
              </div>
              <div class="stats-barra"><div class="fill" style="width:${(horas / maxTec) * 100}%"></div></div>
            </div>
          `).join('')}
        </div>` : ''}
        <div class="stats-card">
          <h4>🤩 Dias de Maior Criatividade</h4>
          ${topDias.length === 0 ? '<p style="font-size:0.8rem;color:var(--text-muted);">Registre mais entradas com humor alto para ver esta análise.</p>' : topDias.map(d => `
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;padding:3px 0;border-bottom:1px solid var(--border);">
              <span>${d.data ? new Date(d.data).toLocaleDateString('pt-BR') : ''}</span>
              <span>${this.humorEmojis[d.humor] || '😐'} ${d.horasTrabalhadas || 0}h</span>
            </div>
          `).join('')}
        </div>
        <div class="stats-card">
          <h4><i class="fas fa-palette"></i> Por Técnica — Dias Médios</h4>
          ${Object.entries(mediasObra).length === 0 ? '<p style="font-size:0.8rem;color:var(--text-muted);">Dados insuficientes.</p>' : Object.entries(mediasObra).map(([tec, m]) => `
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;padding:3px 0;border-bottom:1px solid var(--border);">
              <span>${tec}</span><span><strong>${(m.total / m.count).toFixed(0)}</strong> dias (${m.count} obra(s))</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div style="margin-top:14px;font-size:0.8rem;color:var(--text-muted);">
        <i class="fas fa-lightbulb"></i> Registre entradas diárias com humor e horas para estatísticas mais precisas.
      </div>
    `;
  }

  // ======================= 5. INSPIRAÇÃO DO DIA =======================
  renderInspiracao() {
    const hoje = new Date();
    const diaDoAno = Math.floor((hoje - new Date(hoje.getFullYear(), 0, 0)) / 86400000);
    const idxCitacao = diaDoAno % this.citacoes.length;
    const idxPrompt = diaDoAno % this.promptsDiarios.length;
    const idxDesafio = hoje.getDay() === 1 ? Math.floor(diaDoAno / 7) % this.desafiosSemanais.length : -1;

    const cit = this.citacoes[idxCitacao];
    const prompt = this.promptsDiarios[idxPrompt];
    const desafio = idxDesafio >= 0 ? this.desafiosSemanais[idxDesafio] : null;

    return `
      <div class="inspiracao-card">
        <div class="ic-citacao">"${cit.texto}"</div>
        <div class="ic-autor">— ${cit.autor}</div>
        <div class="ic-prompt"><i class="fas fa-lightbulb"></i> Prompt criativo de hoje: <strong>${prompt}</strong></div>
        ${desafio ? `<div class="ic-desafio"><i class="fas fa-bullseye"></i> Desafio da semana: ${desafio}</div>` : ''}
      </div>
      <div style="margin-top:16px;">
        <button class="btn-primario" id="btnNovaCitacao" style="font-size:0.8rem;padding:6px 14px;"><i class="fas fa-plus"></i> Nova citação</button>
        <button class="btn-secundario" id="btnNovoPrompt" style="font-size:0.8rem;padding:6px 14px;margin-left:6px;"><i class="fas fa-plus"></i> Novo prompt</button>
      </div>
      <div style="margin-top:24px;">
        <h4 style="font-size:0.9rem;margin-bottom:8px;"><i class="fas fa-clipboard"></i> Todas as citação</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:8px;">
          ${this.citacoes.map(c => `
            <div style="font-size:0.75rem;padding:8px 10px;background:var(--card);border-radius:6px;border:1px solid var(--border);">
              <em>"${c.texto}"</em><br><span style="color:var(--text-muted);">— ${c.autor}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ======================= EVENT BINDING =======================
  aposRenderizar() {
    this.removerListeners();

    // Tabs
    document.querySelectorAll('.diario-tabs .tab-btn[data-tab]').forEach(btn => {
      const h = () => { this.tabAtiva = btn.dataset.tab; this.rerenderizar(); };
      btn.addEventListener('click', h); this._bindCache['tab_' + btn.dataset.tab] = { el: btn, handler: h, type: 'click' };
    });

    // Nova entrada
    document.getElementById('btnNovaEntrada')?.addEventListener('click', () => this.abrirFormEntrada());

    // Calendário: navegação
    document.getElementById('calMesAnt')?.addEventListener('click', () => { this.calData.setMonth(this.calData.getMonth() - 1); this.rerenderizar(); });
    document.getElementById('calMesProx')?.addEventListener('click', () => { this.calData.setMonth(this.calData.getMonth() + 1); this.rerenderizar(); });
    document.getElementById('calHoje')?.addEventListener('click', () => { this.calData = new Date(); this.rerenderizar(); });

    // Clique em dia do calendário
    document.querySelectorAll('.cal-cell[data-data]').forEach(cel => {
      const h = () => {
        const data = cel.dataset.data;
        const entradaExistente = this.entradas.find(e => e.data && e.data.startsWith(data));
        if (entradaExistente) {
          this._entradaEditando = entradaExistente.id;
          this.abrirFormEntrada(entradaExistente.id);
        } else {
          this._entradaEditando = null;
          this.abrirFormEntrada(null, data);
        }
      };
      cel.addEventListener('click', h); this._bindCache['cal_' + cel.dataset.data] = { el: cel, handler: h, type: 'click' };
    });

    // Select obra processo
    const selObra = document.getElementById('selObraProcesso');
    if (selObra) {
      const h = () => { this._filtroObraProc = selObra.value; this.rerenderizar(); };
      selObra.addEventListener('change', h); this._bindCache['selObraProcesso'] = { el: selObra, handler: h, type: 'change' };
    }

    document.getElementById('btnNovaEtapa')?.addEventListener('click', () => this.abrirFormEtapa());
    document.getElementById('btnExportarProcessoPDF')?.addEventListener('click', () => this.exportarProcessoPDF());
    document.getElementById('btnNovaCitacao')?.addEventListener('click', () => this.rerenderizar());
    document.getElementById('btnNovoPrompt')?.addEventListener('click', () => this.rerenderizar());

    // Delegated actions
    const container = document.getElementById('diarioContent') || document.getElementById('viewPrincipal');
    if (container) {
      const h = (e) => {
        const btn = e.target.closest('[data-acao]'); if (!btn) return;
        const acao = btn.dataset.acao, id = btn.dataset.id;
        if (acao === 'editarEntrada') this.abrirFormEntrada(id);
        else if (acao === 'excluirEntrada') this.excluirEntrada(id);
        else if (acao === 'editarEtapa') this.abrirFormEtapa(id);
        else if (acao === 'excluirEtapa') this.excluirEtapa(id);
      };
      container.addEventListener('click', h); this._bindCache['delegatedDiario'] = { el: container, handler: h, type: 'click' };
    }
  }

  // ======================= CRUD ENTRADAS =======================
  abrirFormEntrada(id = null, dataPrefill = null) {
    const entrada = id ? this.dataStore.buscarPorId('entradasDiario', id) : null;
    const obras = this.obras;
    const obraOpts = obras.map(o => `<option value="${o.id}"><i class="fas fa-images"></i> ${o.titulo || 'Sem título'}</option>`).join('');
    const selObras = entrada ? (entrada.obrasTrabalhadas || []) : [];
    const fotos = entrada ? (entrada.fotos || []) : [];

    const dataVal = entrada ? entrada.data.slice(0, 10) : (dataPrefill || new Date().toISOString().slice(0, 10));
    const humorVal = entrada ? (entrada.humor || 3) : 3;
    const textoVal = entrada ? (entrada.oQueTrabalhou || '') : '';
    const horasVal = entrada ? (entrada.horasTrabalhadas || 0) : 0;
    const bloqueiosVal = entrada ? (entrada.bloqueios || '') : '';
    const avancosVal = entrada ? (entrada.avancos || '') : '';
    const descobertasVal = entrada ? (entrada.descobertas || '') : '';

    this._fotosTemporarias = [...fotos];
    this._selHumor = humorVal;

    const humorBtns = [1, 2, 3, 4, 5].map(n =>
      `<button type="button" class="humor-btn ${n === this._selHumor ? 'selecionado' : ''}" data-humor="${n}">${this.humorEmojis[n]}</button>`
    ).join('');

    abrirModal(`
      <h3>${entrada ? '<i class="fas fa-pen"></i> Editar Entrada' : '<i class="fas fa-plus"></i> Nova Entrada do Diário'}</h3>
      <form id="formModal" class="diario-form-grid">
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);"><i class="fas fa-calendar-alt"></i> Data</label>
          <input type="date" id="fEntData" value="${dataVal}" required style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
        </div>
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);">😀 Humor criativo</label>
          <div class="humor-selector" id="humorSelector">${humorBtns}</div>
        </div>
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);"><i class="fas fa-pencil-alt"></i> O que trabalhou hoje</label>
          <div style="margin-bottom:4px;display:flex;gap:4px;flex-wrap:wrap;">
            <button type="button" class="btn-toolbar" data-insere="<p></p>" style="font-size:0.7rem;padding:2px 8px;border:1px solid var(--border);border-radius:4px;background:var(--card);cursor:pointer;">Parágrafo</button>
            <button type="button" class="btn-toolbar" data-insere="<strong></strong>" style="font-size:0.7rem;padding:2px 8px;border:1px solid var(--border);border-radius:4px;background:var(--card);cursor:pointer;"><strong>Negrito</strong></button>
            <button type="button" class="btn-toolbar" data-insere="<em></em>" style="font-size:0.7rem;padding:2px 8px;border:1px solid var(--border);border-radius:4px;background:var(--card);cursor:pointer;"><em>Itálico</em></button>
          </div>
          <textarea id="fEntTexto" style="width:100%;min-height:100px;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);font-family:inherit;" placeholder="Descreva seu dia criativo...">${textoVal}</textarea>
        </div>
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);"><i class="fas fa-images"></i> Obras trabalhadas (segure Ctrl para múltiplas)</label>
          <select multiple id="fEntObras" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;min-height:60px;font-size:0.85rem;background:var(--bg);color:var(--text);">${obraOpts}</select>
          <div style="font-size:0.7rem;color:var(--text-muted);margin-top:2px;">Selecione as obras que trabalhou hoje</div>
        </div>
        <div>
          <label style="font-size:0.8rem;color:var(--text-muted);">⏰ Horas trabalhadas</label>
          <input type="number" id="fEntHoras" value="${horasVal}" min="0" step="0.5" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
        </div>
        <div>
          <label style="font-size:0.8rem;color:var(--text-muted);"><i class="fas fa-exclamation-triangle"></i> Bloqueios criativos</label>
          <textarea id="fEntBloqueios" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;background:var(--bg);color:var(--text);min-height:40px;" placeholder="O que te travou hoje?">${bloqueiosVal}</textarea>
        </div>
        <div>
          <label style="font-size:0.8rem;color:var(--text-muted);"><i class="fas fa-check"></i> Avanços</label>
          <textarea id="fEntAvancos" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;background:var(--bg);color:var(--text);min-height:40px;" placeholder="O que conquistou hoje?">${avancosVal}</textarea>
        </div>
        <div>
          <label style="font-size:0.8rem;color:var(--text-muted);"><i class="fas fa-lightbulb"></i> Descobertas</label>
          <textarea id="fEntDescobertas" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;background:var(--bg);color:var(--text);min-height:40px;" placeholder="O que aprendeu hoje?">${descobertasVal}</textarea>
        </div>
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);">📷 Fotos do dia</label>
          <input type="file" id="fEntFotos" accept="image/*" multiple style="font-size:0.8rem;">
          <div class="photo-strip" id="photoStrip">${fotos.map(f => `<div class="ps-item"><img src="${f}"><button type="button" class="ps-remove" data-foto="${f}">📷</button></div>`).join('')}</div>
        </div>
        <div class="modal-acoes" style="grid-column:1/-1;">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">${entrada ? 'Atualizar' : 'Salvar Entrada'}</button>
        </div>
      </form>
    `);

    // Humor selector
    document.querySelectorAll('.humor-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.humor-btn').forEach(b => b.classList.remove('selecionado'));
        btn.classList.add('selecionado');
        this._selHumor = Number(btn.dataset.humor);
      });
    });

    // Toolbar buttons
    document.querySelectorAll('.btn-toolbar').forEach(btn => {
      btn.addEventListener('click', () => {
        const textarea = document.getElementById('fEntTexto');
        const tag = btn.dataset.insere;
        const cursorPos = textarea.selectionStart;
        const text = textarea.value;
        const before = text.slice(0, cursorPos);
        const after = text.slice(cursorPos);
        textarea.value = before + tag + after;
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = cursorPos + tag.indexOf('>') + 1;
      });
    });

    // Photo upload
    document.getElementById('fEntFotos')?.addEventListener('change', (e) => {
      const files = e.target.files;
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          this._fotosTemporarias.push(ev.target.result);
          this.atualizarPhotoStrip();
        };
        reader.readAsDataURL(file);
      });
    });

    // Remove photo
    document.querySelectorAll('.ps-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const foto = btn.dataset.foto;
        this._fotosTemporarias = this._fotosTemporarias.filter(f => f !== foto);
        this.atualizarPhotoStrip();
      });
    });

    document.getElementById('btnCancelarModal').addEventListener('click', fecharModal);
    document.getElementById('formModal').addEventListener('submit', (e) => {
      e.preventDefault();
      const sel = document.getElementById('fEntObras');
      const obrasSel = sel ? Array.from(sel.selectedOptions).map(o => o.value) : [];

      const dados = {
        data: document.getElementById('fEntData').value,
        humor: this._selHumor,
        oQueTrabalhou: document.getElementById('fEntTexto').value.trim(),
        obrasTrabalhadas: obrasSel,
        fotos: this._fotosTemporarias,
        horasTrabalhadas: Number(document.getElementById('fEntHoras').value) || 0,
        bloqueios: document.getElementById('fEntBloqueios').value.trim(),
        avancos: document.getElementById('fEntAvancos').value.trim(),
        descobertas: document.getElementById('fEntDescobertas').value.trim()
      };

      if (!dados.data) { mostrarToast('A data é obrigatória.'); return; }

      if (entrada) {
        this.dataStore.atualizar('entradasDiario', id, dados);
        mostrarToast('Entrada atualizada!');
      } else {
        this.dataStore.adicionar('entradasDiario', dados);
        mostrarToast('Entrada registrada no diário!');
      }
      fecharModal();
      this._fotosTemporarias = [];
      this.rerenderizar();
    });
  }

  atualizarPhotoStrip() {
    const strip = document.getElementById('photoStrip');
    if (!strip) return;
    strip.innerHTML = this._fotosTemporarias.map(f =>
      `<div class="ps-item"><img src="${f}"><button type="button" class="ps-remove" data-foto="${f}">📷</button></div>`
    ).join('');
    // Re-bind remove buttons
    strip.querySelectorAll('.ps-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        this._fotosTemporarias = this._fotosTemporarias.filter(f => f !== btn.dataset.foto);
        this.atualizarPhotoStrip();
      });
    });
  }

  excluirEntrada(id) {
    if (!confirm('Excluir esta entrada do diário?')) return;
    this.dataStore.remover('entradasDiario', id);
    mostrarToast('Entrada excluída.');
    this.rerenderizar();
  }

  // ======================= CRUD ETAPAS DE PROCESSO =======================
  abrirFormEtapa(id = null) {
    const obraId = this._filtroObraProc;
    if (!obraId) { mostrarToast('Selecione uma obra primeiro.'); return; }

    const proc = this.processos.find(p => p.obraId === obraId);
    let etapa = null;
    if (id && proc) etapa = (proc.etapas || []).find(e => e.id === id);

    const etapaOpts = this.etapasPadrao.map(e =>
      `<option value="${e}" ${(etapa && etapa.titulo === e) ? 'selected' : ''}>${e}</option>`
    ).join('');

    abrirModal(`
      <h3>${etapa ? '<i class="fas fa-pen"></i> Editar Etapa' : '<i class="fas fa-plus"></i> Nova Etapa do Processo'}</h3>
      <form id="formModal">
        <div class="campo-form"><label>Etapa</label><select id="fEtpTitulo"><option value="">→ Personalizada —</option>${etapaOpts}</select></div>
        <div class="campo-form"><label>Ou digite título personalizado</label><input type="text" id="fEtpTituloCustom" value="${etapa && !this.etapasPadrao.includes(etapa.titulo) ? (etapa.titulo || '') : ''}" placeholder="Ex.: Aplicação de verniz" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form"><label><i class="fas fa-calendar-alt"></i> Data</label><input type="date" id="fEtpData" value="${etapa ? etapa.data || '' : new Date().toISOString().slice(0, 10)}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div class="campo-form"><label><i class="fas fa-pencil-alt"></i> Descrição</label><textarea id="fEtpDesc" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;min-height:70px;font-family:inherit;">${etapa ? etapa.descricao || '' : ''}</textarea></div>
        <div class="campo-form"><label><i class="fas fa-pencil-alt"></i> Notas técnicas (cores, pincéis, misturas)</label><textarea id="fEtpNotas" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;min-height:50px;">${etapa ? etapa.notasTecnicas || '' : ''}</textarea></div>
        <div class="campo-form"><label>📷 Foto da etapa</label><input type="file" id="fEtpFoto" accept="image/*"></div>
        ${etapa && etapa.foto ? `<div style="margin-bottom:8px;"><img src="${etapa.foto}" style="max-width:150px;max-height:100px;border-radius:4px;"></div>` : ''}
        <div class="campo-form"><label>📉 Link de vídeo (YouTube/Vimeo)</label><input type="url" id="fEtpVideo" value="${etapa ? etapa.videoLink || '' : ''}" placeholder="https://..." style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">${etapa ? 'Atualizar' : 'Adicionar Etapa'}</button>
        </div>
      </form>
    `);

    document.getElementById('btnCancelarModal').addEventListener('click', fecharModal);
    document.getElementById('formModal').addEventListener('submit', (e) => {
      e.preventDefault();

      const titulo = document.getElementById('fEtpTitulo').value || document.getElementById('fEtpTituloCustom').value.trim();
      if (!titulo) { mostrarToast('Título da etapa é obrigatório.'); return; }

      const dadosEtapa = {
        id: etapa ? etapa.id : 'etp_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        titulo,
        data: document.getElementById('fEtpData').value,
        descricao: document.getElementById('fEtpDesc').value.trim(),
        notasTecnicas: document.getElementById('fEtpNotas').value.trim(),
        foto: etapa ? etapa.foto : '',
        videoLink: document.getElementById('fEtpVideo').value.trim()
      };

      // Handle photo upload
      const fotoInput = document.getElementById('fEtpFoto');
      if (fotoInput && fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          dadosEtapa.foto = ev.target.result;
          this.salvarEtapa(obraId, proc, dadosEtapa, etapa);
        };
        reader.readAsDataURL(fotoInput.files[0]);
      } else {
        if (etapa) dadosEtapa.foto = etapa.foto;
        this.salvarEtapa(obraId, proc, dadosEtapa, etapa);
      }
    });
  }

  salvarEtapa(obraId, proc, dadosEtapa, etapa) {
    if (proc) {
      if (etapa) {
        const idx = proc.etapas.findIndex(e => e.id === etapa.id);
        if (idx >= 0) proc.etapas[idx] = dadosEtapa;
        this.dataStore.atualizar('etapasProcesso', proc.id, { etapas: proc.etapas });
        mostrarToast('Etapa atualizada!');
      } else {
        proc.etapas.push(dadosEtapa);
        this.dataStore.atualizar('etapasProcesso', proc.id, { etapas: proc.etapas });
        mostrarToast('Etapa adicionada!');
      }
    } else {
      this.dataStore.adicionar('etapasProcesso', {
        obraId,
        etapas: [dadosEtapa]
      });
      mostrarToast('Processo criado e etapa adicionada!');
    }
    fecharModal();
    this.rerenderizar();
  }

  excluirEtapa(id) {
    if (!confirm('Excluir esta etapa do processo?')) return;
    const obraId = this._filtroObraProc;
    const proc = this.processos.find(p => p.obraId === obraId);
    if (!proc) return;
    proc.etapas = (proc.etapas || []).filter(e => e.id !== id);
    if (proc.etapas.length === 0) {
      this.dataStore.remover('etapasProcesso', proc.id);
    } else {
      this.dataStore.atualizar('etapasProcesso', proc.id, { etapas: proc.etapas });
    }
    mostrarToast('Etapa excluída.');
    this.rerenderizar();
  }

  // ======================= PDF MAKING OF =======================
  exportarProcessoPDF() {
    if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) { mostrarToast('jsPDF não carregado.'); return; }
    mostrarLoading('Exportando making of...');
    const obraId = this._filtroObraProc;
    const obra = obraStore().items.find(o => o.id === obraId);
    const proc = this.processos.find(p => p.obraId === obraId);
    if (!obra || !proc) { mostrarToast('Selecione uma obra com processo documentado.'); return; }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const margem = 20;
    let y = 20;
    const larg = 170;

    // Capa
    doc.setFont('helvetica', 'bold'); doc.setFontSize(22);
    doc.text('Making Of', margem, y); y += 10;
    doc.setFontSize(14); doc.setFont('helvetica', 'normal');
    doc.text(obra.titulo || 'Obra sem título', margem, y); y += 7;
    doc.setFontSize(10);
    doc.text(`${obra.tecnica || ''}  ·  ${obra.dimensoes ? obra.dimensoes.altura + 'x' + obra.dimensoes.largura + (obra.dimensoes.profundidade ? 'x' + obra.dimensoes.profundidade : '') + ' cm' : ''}`, margem, y); y += 5;
    doc.text(`Processo criativo documentado  ·  ${new Date().toLocaleDateString('pt-BR')}`, margem, y); y += 8;
    doc.setDrawColor(200); doc.line(margem, y, margem + larg, y); y += 10;

    // Etapas
    const etapas = (proc.etapas || []).sort((a, b) => new Date(a.data || 0) - new Date(b.data || 0));
    etapas.forEach((et, i) => {
      if (y > 250) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
      doc.text(`${i + 1}. ${et.titulo || 'Etapa'}`, margem, y); y += 5;
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
      if (et.data) { doc.text(`<i class="fas fa-calendar-alt"></i> ${new Date(et.data).toLocaleDateString('pt-BR')}`, margem, y); y += 4; }
      if (et.descricao) {
        const lines = doc.splitTextToSize(et.descricao, larg);
        lines.forEach(l => { if (y > 270) { doc.addPage(); y = 20; } doc.text(l, margem + 2, y); y += 4; });
      }
      if (et.notasTecnicas) {
        if (y > 265) { doc.addPage(); y = 20; }
        doc.text(`<i class="fas fa-pencil-alt"></i> Técnica: ${et.notasTecnicas}`, margem + 2, y); y += 5;
      }
      if (i < etapas.length - 1) {
        doc.setDrawColor(220); doc.line(margem, y, margem + larg, y); y += 4;
      }
    });

    // Dados da obra
    if (y > 230) { doc.addPage(); y = 20; }
    y += 6; doc.setDrawColor(200); doc.line(margem, y, margem + larg, y); y += 6;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
    doc.text('Dados da Obra', margem, y); y += 5;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
    if (obra.preco) { doc.text(`💵 Preço: ${formatarMoeda(obra.preco)}`, margem, y); y += 4; }
    if (obra.serie) { doc.text(`<i class="fas fa-folder"></i> Série: ${obra.serie}`, margem, y); y += 4; }
    if (obra.descricao) {
      const lines = doc.splitTextToSize(obra.descricao, larg);
      lines.forEach(l => { doc.text(l, margem, y); y += 4; });
    }

    doc.save(`making-of-${(obra.titulo || 'obra').replace(/\s+/g, '-').toLowerCase()}.pdf`);
    esconderLoading();
    mostrarToast('Making Of exportado em PDF!');
  }

}
