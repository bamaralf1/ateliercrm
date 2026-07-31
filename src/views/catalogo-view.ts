export class CatalogoView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.modo = 'grid';
    this.filtros = { busca: '', tecnica: '', status: '', ano: '', precoMin: '', precoMax: '', ordenar: 'recentes' };
    this.filtroRapido = '';
    this.filtrosSalvos = [];
    this.selecionados = new Set();
    this.imagensFormAtual = [];
    this.imagensRefAtual = [];
    this.imagemDestacadaAtual = null;
    this.imagemDestacadaRef = '';
    this.modoComparacao = false;
    this.idsComparacao = [];
    this._skeletonAtivo = false;
    this._escutarEvento('abrir-nova-obra', () => this.abrirFormulario());
  }

  obrasFiltradas() {
    const f = this.filtros;
    let obras = obraStore().items;

    if (f.busca) {
      const termo = f.busca.toLowerCase();
      obras = obras.filter(o =>
        (o.titulo || '').toLowerCase().includes(termo) ||
        (o.descricao || '').toLowerCase().includes(termo) ||
        (o.serie || '').toLowerCase().includes(termo)
      );
    }
    if (f.tecnica) obras = obras.filter(o => o.tecnica === f.tecnica);
    if (f.status) obras = obras.filter(o => classeStatus(o.status) === classeStatus(f.status));
    if (f.ano) obras = obras.filter(o => String(o.ano) === String(f.ano));
    if (f.precoMin !== '') obras = obras.filter(o => Number(o.preco || 0) >= Number(f.precoMin));
    if (f.precoMax !== '') obras = obras.filter(o => Number(o.preco || 0) <= Number(f.precoMax));
    if (this.filtroRapido === 'favoritas') obras = obras.filter(o => o.favorita);

    return [...obras].sort((a, b) => new Date(b.dataCadastro || b.criadoEm || 0) - new Date(a.dataCadastro || a.criadoEm || 0));
  }

  anosDisponiveis() {
    const anos = [...new Set(obraStore().items.map(o => o.ano).filter(Boolean))];
    return anos.sort((a, b) => b - a);
  }

  render() {
    const obras = this.obrasFiltradas();
    const anos = this.anosDisponiveis();

    const conteudoLista = this._skeletonAtivo && this.modo === 'grid'
      ? this.renderSkeletonGrid()
      : obras.length
        ? (this.modo === 'grid' ? this.renderGrid(obras) : this.renderLista(obras))
        : this.renderEstadoVazio();

    const filtrosAtivos = Object.entries(this.filtros).filter(([k, v]) => v !== '' && k !== 'ordenar').length + (this.filtroRapido ? 1 : 0);

    return `
      <div class="view-cabecalho">
        <div>
          <h2>Catálogo de Obras</h2>
          <p class="subtitulo">${obras.length} obra${obras.length === 1 ? '' : 's'} encontrada${obras.length === 1 ? '' : 's'}${filtrosAtivos > 0 ? `<span class="filtros-ativo-badge">· ${filtrosAtivos} filtro${filtrosAtivos > 1 ? 's' : ''} ativo${filtrosAtivos > 1 ? 's' : ''}</span>` : ''}</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAll" aria-label="Selecionar todas as obras" ${this.selecionados.size === obras.length && obras.length > 0 ? 'checked' : ''}>
            <label for="selectAll">Selecionar todos</label>
          </div>
          <button class="btn-secundario" id="btnComparar" title="Comparar obras selecionadas" ${this.selecionados.size < 2 ? 'disabled' : ''}><i class="fas fa-chart-bar"></i> Comparar</button>
          <button class="btn-secundario" id="btnImportacaoLote" title="Importar múltiplas obras"><i class="fas fa-camera"></i> Importar</button>
          <div class="toggle-visualizacao">
            <button id="btnModoGrid" class="${this.modo === 'grid' ? 'ativo' : ''}" title="Visualização em grid">☰ Grid</button>
            <button id="btnModoLista" class="${this.modo === 'lista' ? 'ativo' : ''}" title="Visualização em lista">☰ Lista</button>
          </div>
        </div>
      </div>

      ${this.selecionados.size > 0 ? this.renderBarraBulk() : ''}

      ${this.renderFiltros(anos)}

      <div class="catalogo-acoes-rapidas">
        <button class="btn-ghost" id="btnNovaObraRapida"><i class="fas fa-plus"></i> Nova Obra</button>
        <button class="btn-ghost" id="btnSlideshowTodas">▶ Slideshow Geral</button>
        <button class="btn-ghost" id="btnExportarTodas">📥 Exportar Tudo</button>
      </div>

      ${conteudoLista}

      <button class="fab-nova-obra" id="fabNovaObra" title="Nova Obra" aria-label="Nova Obra"><i class="fas fa-plus"></i></button>
    `;
  }

  renderEstadoVazio() {
    return `
      <div class="tabela-wrapper">
        <div class="estado-vazio">
          <div class="icone-vazio"><i class="fas fa-images"></i></div>
          <p>Nenhuma obra encontrada com os filtros atuais.</p>
          <p class="texto-ajuda">Tente limpar os filtros ou cadastrar uma nova obra.</p>
        </div>
      </div>
    `;
  }

  renderBarraBulk() {
    return `
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} obra${this.selecionados.size === 1 ? '' : 's'} selecionada${this.selecionados.size === 1 ? '' : 's'}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkMarcarFavorita"><i class="fas fa-star"></i> Favoritar</button>
          <button class="btn-secundario" id="bulkDesmarcarFavorita">☆ Desfavoritar</button>
          <button class="btn-secundario" id="bulkMudarStatus"><i class="fas fa-pencil-alt"></i> Mudar Status</button>
          <button class="btn-secundario" id="bulkExportar"><i class="fas fa-chart-bar"></i> Exportar</button>
          <button class="btn-secundario" id="bulkExportarPDF"><i class="fas fa-file"></i> Catálogo PDF</button>
          <button class="btn-secundario btn-danger" id="bulkExcluir">🗑 Excluir</button>
          <button class="btn-secundario" id="bulkCancelar">✕ Cancelar</button>
        </div>
      </div>
    `;
  }

  renderFiltros(anos) {
    return `
      <div class="catalogo-filtros">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="filtroBusca" placeholder="Título, descrição, série..." value="${this.filtros.busca}" data-tooltip="Busca inteligente: título, descrição, série">
        </div>
        <div class="campo-filtro">
          <label>Técnica</label>
          <select id="filtroTecnica">
            <option value="">Todas</option>
            <option value="óleo" ${this.filtros.tecnica === 'óleo' ? 'selected' : ''}>Óleo</option>
            <option value="aquarela" ${this.filtros.tecnica === 'aquarela' ? 'selected' : ''}>Aquarela</option>
            <option value="escultura" ${this.filtros.tecnica === 'escultura' ? 'selected' : ''}>Escultura</option>
            <option value="outra" ${this.filtros.tecnica === 'outra' ? 'selected' : ''}>Outra</option>
          </select>
        </div>
        <div class="campo-filtro">
          <label>Status</label>
          <select id="filtroStatus">
            <option value="">Todos</option>
            <option value="disponível" ${this.filtros.status === 'disponível' ? 'selected' : ''}>Disponível</option>
            <option value="reservada" ${this.filtros.status === 'reservada' ? 'selected' : ''}>Reservada</option>
            <option value="vendida" ${this.filtros.status === 'vendida' ? 'selected' : ''}>Vendida</option>
            <option value="em exposição" ${this.filtros.status === 'em exposição' ? 'selected' : ''}>Em Exposição</option>
          </select>
        </div>
        <div class="campo-filtro">
          <label>Ano</label>
          <select id="filtroAno">
            <option value="">Todos</option>
            ${anos.map(a => `<option value="${a}" ${String(this.filtros.ano) === String(a) ? 'selected' : ''}>${a}</option>`).join('')}
          </select>
        </div>
        <div class="campo-filtro">
          <label>Faixa de preço (R$)</label>
          <div class="faixa-preco">
            <input type="number" id="filtroPrecoMin" placeholder="Mín." aria-label="Preço mínimo" value="${this.filtros.precoMin}">
            <span>—</span>
            <input type="number" id="filtroPrecoMax" placeholder="Máx." aria-label="Preço máximo" value="${this.filtros.precoMax}">
          </div>
        </div>
        <div class="campo-filtro">
          <label>Ordenar por</label>
          <select id="filtroOrdenar">
            <option value="recentes" ${this.filtros.ordenar === 'recentes' ? 'selected' : ''}>Mais recentes</option>
            <option value="antigas" ${this.filtros.ordenar === 'antigas' ? 'selected' : ''}>Mais antigas</option>
            <option value="preco-asc" ${this.filtros.ordenar === 'preco-asc' ? 'selected' : ''}>Preço: menor → maior</option>
            <option value="preco-desc" ${this.filtros.ordenar === 'preco-desc' ? 'selected' : ''}>Preço: maior → menor</option>
            <option value="titulo" ${this.filtros.ordenar === 'titulo' ? 'selected' : ''}>Título A-Z</option>
            <option value="ano-desc" ${this.filtros.ordenar === 'ano-desc' ? 'selected' : ''}>Ano: mais recente</option>
          </select>
        </div>
        <button class="btn-secundario" id="btnLimparFiltros">Limpar filtros</button>
        <button class="btn-secundario" id="btnSalvarFiltro" title="Salvar filtro atual"><i class="fas fa-save"></i> Salvar</button>
      </div>

      <div class="filtros-rapidos">
        <span class="rotulo-filtros">Filtros rápidos:</span>
        <button class="chip-filtro ${this.filtroRapido === 'disponiveis' ? 'ativo' : ''}" data-filtro="disponiveis">🟢 Disponíveis</button>
        <button class="chip-filtro ${this.filtroRapido === 'vendidas' ? 'ativo' : ''}" data-filtro="vendidas">🟡 Vendidas</button>
        <button class="chip-filtro ${this.filtroRapido === 'recentes' ? 'ativo' : ''}" data-filtro="recentes"><i class="fas fa-calendar-alt"></i> Este mês</button>
        <button class="chip-filtro ${this.filtroRapido === 'favoritas' ? 'ativo' : ''}" data-filtro="favoritas"><i class="fas fa-star"></i> Favoritas</button>
      </div>

      ${this.filtrosSalvos.length > 0 ? `
      <div class="filtros-salvos">
        <span class="rotulo-filtros">Filtros salvos:</span>
        ${this.filtrosSalvos.map((f, i) => `
          <button class="chip-filtro-salvo" data-indice="${i}" title="${f.descricao}">${f.nome}</button>
        `).join('')}
      </div>
      ` : ''}
    `;
  }

  renderSkeletonGrid() {
    const cards = Array.from({ length: 8 }, (_, i) => `
      <div class="sk-card-obra">
        <div class="sk-shimmer sk-imagem" style="animation-delay:${i * 0.05}s"></div>
        <div class="sk-shimmer sk-linha" style="width:70%;animation-delay:${i * 0.05}s"></div>
        <div class="sk-shimmer sk-linha" style="width:50%;animation-delay:${i * 0.05}s"></div>
      </div>
    `).join('');
    return `<div class="sk-grid">${cards}</div>`;
  }

  _rerenderizarComSkeleton() {
    if (this.modo !== 'grid') { this.rerenderizar(true); return; }
    this._skeletonAtivo = true;
    this.rerenderizar(true);
    setTimeout(() => {
      this._skeletonAtivo = false;
      this.rerenderizar(true);
    }, 150);
  }

  renderGrid(obras) {
    return `
      <div class="grid-obras stagger-in">
        ${obras.map(o => `
          <div class="card-obra ${o.favorita ? 'favorita' : ''} ${this.selecionados.has(o.id) ? 'selecionada' : ''}">
            <div class="checkbox-bulk">
              <input type="checkbox" class="checkbox-item" data-id="${o.id}" aria-label="Selecionar ${o.titulo || 'obra'}" ${this.selecionados.has(o.id) ? 'checked' : ''}>
            </div>
            ${o.favorita ? '<div class="badge-favorita"><i class="fas fa-star"></i></div>' : ''}
            <div class="imagem-card-wrapper" data-abrir-ficha="${o.id}">
              <img class="imagem-obra lazy-img idb-placeholder" src="${this.obterImagem(o)}" alt="${o.titulo}" loading="lazy"${this.imgDataIdb(o)}>
              ${(o.imagens && o.imagens.length > 1) ? `<span class="badge-multiplas-imagens">+${o.imagens.length}</span>` : ''}
              <button class="btn-slideshow-card" data-slideshow="${o.id}" title="Ver galeria" aria-label="Ver galeria ${o.titulo}">▶</button>
            </div>
            <div class="corpo-card-obra" data-abrir-ficha="${o.id}">
              <div class="titulo-obra">${o.titulo}</div>
              <div class="meta-obra">${capitalizarTexto(o.tecnica)} · ${this.formatarDimensoes(o.dimensoes)}</div>
              <div class="rodape-card-obra">
                <span class="preco-obra">${formatarMoeda(o.preco)}</span>
                <span class="tag-status ${classeStatus(o.status)}">${rotuloStatus(o.status)}</span>
              </div>
            </div>
            <div class="acoes-card-obra">
              <button data-favoritar-obra="${o.id}" title="${o.favorita ? 'Remover favorita' : 'Marcar favorita'}" aria-label="${o.favorita ? 'Remover favorita' : 'Marcar favorita'} ${o.titulo}">${o.favorita ? '★' : '☆'}</button>
              <button data-comparar-obra="${o.id}" title="Adicionar à comparação" aria-label="Adicionar ${o.titulo} à comparação"><i class="fas fa-chart-bar"></i></button>
              <button data-editar-obra="${o.id}">✎ Editar</button>
              <button class="btn-excluir-obra" data-excluir-obra="${o.id}">🗑 Excluir</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderLista(obras) {
    return `
      <div class="lista-obras-wrapper stagger-in">
        ${obras.map(o => `
          <div class="linha-obra-lista ${o.favorita ? 'favorita' : ''} ${this.selecionados.has(o.id) ? 'selecionada' : ''}">
            <div class="checkbox-bulk-lista">
              <input type="checkbox" class="checkbox-item" data-id="${o.id}" aria-label="Selecionar ${o.titulo || 'obra'}" ${this.selecionados.has(o.id) ? 'checked' : ''}>
            </div>
            ${o.favorita ? '<span class="icone-favorita-lista"><i class="fas fa-star"></i></span>' : ''}
            <img class="thumb-lista lazy-img idb-placeholder" data-abrir-ficha="${o.id}" src="${this.obterImagem(o)}" alt="${o.titulo}" loading="lazy"${this.imgDataIdb(o)}>
            <div class="info-lista" data-abrir-ficha="${o.id}">
              <div class="titulo-obra">${o.titulo}</div>
              <div class="meta-obra">${capitalizarTexto(o.tecnica)} · ${this.formatarDimensoes(o.dimensoes)} · ${o.ano || '-'}</div>
            </div>
            <span class="tag-status ${classeStatus(o.status)}">${rotuloStatus(o.status)}</span>
            <span class="preco-lista">${formatarMoeda(o.preco)}</span>
            <div class="acoes-lista">
              <button data-favoritar-obra="${o.id}" title="${o.favorita ? 'Remover favorita' : 'Marcar favorita'}" aria-label="${o.favorita ? 'Remover favorita' : 'Marcar favorita'} ${o.titulo}">${o.favorita ? '★' : '☆'}</button>
              <button data-comparar-obra="${o.id}" title="Adicionar à comparação" aria-label="Adicionar ${o.titulo} à comparação"><i class="fas fa-chart-bar"></i></button>
              <button data-editar-obra="${o.id}" aria-label="Editar obra">✎</button>
              <button data-excluir-obra="${o.id}" aria-label="Excluir ${o.titulo}">🗑</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  obterImagem(obra) {
    const src = obra.imagemDestacada || (obra.imagens && obra.imagens[0]) || obra.imagem || '';
    if (!src) return gerarImagemPlaceholder('#cccccc', '<i class="fas fa-images"></i>');
    if (src.startsWith('idb:')) return IDB_IMG_PLACEHOLDER;
    return src;
  }

  imgDataIdb(obra) {
    const src = obra.imagemDestacada || (obra.imagens && obra.imagens[0]) || obra.imagem || '';
    return src.startsWith('idb:') ? ` data-img-idb="${src}"` : '';
  }

  formatarDimensoes(dim) {
    if (!dim || (!dim.altura && !dim.largura && !dim.profundidade)) return '-';
    const partes = [dim.altura, dim.largura, dim.profundidade].filter(v => v && Number(v) > 0);
    return partes.length ? `${partes.join(' x ')} cm` : '-';
  }

  aposRenderizar() {
    this.removerListeners();
    const container = document.getElementById('viewPrincipal');

    const btnGrid = document.getElementById('btnModoGrid');
    const btnLista = document.getElementById('btnModoLista');
    if (btnGrid) btnGrid.addEventListener('click', () => { this.modo = 'grid'; this._rerenderizarComSkeleton(); });
    if (btnLista) btnLista.addEventListener('click', () => { this.modo = 'lista'; this.rerenderizar(); });

    const campoBusca = document.getElementById('filtroBusca');
    if (campoBusca) campoBusca.addEventListener('input', debounce((e) => { this.filtros.busca = e.target.value; this._rerenderizarComSkeleton(); }, 250));

    ['filtroTecnica', 'filtroStatus', 'filtroAno', 'filtroPrecoMin', 'filtroPrecoMax'].forEach(idCampo => {
      const el = document.getElementById(idCampo);
      if (!el) return;
      const chave = { filtroTecnica: 'tecnica', filtroStatus: 'status', filtroAno: 'ano', filtroPrecoMin: 'precoMin', filtroPrecoMax: 'precoMax' }[idCampo];
      el.addEventListener('change', (e) => { this.filtros[chave] = e.target.value; this._rerenderizarComSkeleton(); });
    });

    const ordenarEl = document.getElementById('filtroOrdenar');
    if (ordenarEl) ordenarEl.addEventListener('change', (e) => {
      this.filtros.ordenar = e.target.value;
      this._rerenderizarComSkeleton();
    });

    const btnLimpar = document.getElementById('btnLimparFiltros');
    if (btnLimpar) btnLimpar.addEventListener('click', () => {
      this.filtros = { busca: '', tecnica: '', status: '', ano: '', precoMin: '', precoMax: '', ordenar: 'recentes' };
      this.filtroRapido = '';
      this._rerenderizarComSkeleton();
    });

    // Keyboard shortcuts for bulk selection
    container.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        this.obrasFiltradas().forEach(o => this.selecionados.add(o.id));
        this.rerenderizar();
        return;
      }
      if (e.key === 'Escape' && this.selecionados.size > 0) {
        this.selecionados.clear();
        this.rerenderizar();
      }
    });

    // Shift+click range selection
    let ultimoClickIdx = -1;
    container.addEventListener('click', (e) => {
      const cb = e.target.closest('.checkbox-item');
      if (cb && e.shiftKey) {
        e.preventDefault();
        const obrasRange = this.obrasFiltradas();
        const atualIdx = obrasRange.findIndex(o => o.id === cb.dataset.id);
        if (ultimoClickIdx >= 0 && atualIdx >= 0) {
          const [inicio, fim] = ultimoClickIdx <= atualIdx ? [ultimoClickIdx, atualIdx] : [atualIdx, ultimoClickIdx];
          for (let i = inicio; i <= fim; i++) { this.selecionados.add(obrasRange[i].id); }
          this.rerenderizar();
        }
        ultimoClickIdx = atualIdx;
      } else if (cb) {
        const obrasRange = this.obrasFiltradas();
        ultimoClickIdx = obrasRange.findIndex(o => o.id === cb.dataset.id);
      }
    });

    const btnComparar = document.getElementById('btnComparar');
    if (btnComparar) btnComparar.addEventListener('click', () => this.abrirComparacao(Array.from(this.selecionados)));

    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
      selectAll.addEventListener('change', (e) => {
        const obras = this.obrasFiltradas();
        if (e.target.checked) {
          obras.forEach(o => this.selecionados.add(o.id));
        } else {
          this.selecionados.clear();
        }
        this.rerenderizar();
      });
    }

    container.addEventListener('change', (e) => {
      if (e.target.classList.contains('checkbox-item')) {
        const id = e.target.dataset.id;
        if (e.target.checked) {
          this.selecionados.add(id);
        } else {
          this.selecionados.delete(id);
        }
        this.rerenderizar();
      }
    });

    document.getElementById('bulkMarcarFavorita')?.addEventListener('click', () => this.bulkAcao('favoritar'));
    document.getElementById('bulkDesmarcarFavorita')?.addEventListener('click', () => this.bulkAcao('desfavoritar'));
    document.getElementById('bulkMudarStatus')?.addEventListener('click', () => this.bulkAcao('mudarStatus'));
    document.getElementById('bulkExportar')?.addEventListener('click', () => this.bulkAcao('exportar'));
    document.getElementById('bulkExportarPDF')?.addEventListener('click', () => this.bulkAcao('exportarPDF'));
    document.getElementById('bulkExcluir')?.addEventListener('click', () => this.bulkAcao('excluir'));
    document.getElementById('bulkCancelar')?.addEventListener('click', () => {
      this.selecionados.clear();
      this.rerenderizar();
    });

    document.getElementById('btnImportacaoLote')?.addEventListener('click', () => this.abrirImportacaoLote());
    document.getElementById('btnNovaObraRapida')?.addEventListener('click', () => this.abrirFormulario());
    document.getElementById('btnSlideshowTodas')?.addEventListener('click', () => {
      const obras = this.obrasFiltradas();
      if (obras.length === 0) { mostrarToast('Nenhuma obra para exibir.', 'aviso'); return; }
      const imagens = obras.map(o => ({ src: this.obterImagem(o), legenda: `${o.titulo} · ${formatarMoeda(o.preco)}` }));
      abrirLightbox(imagens, 0);
    });
    document.getElementById('btnExportarTodas')?.addEventListener('click', () => {
      const ids = this.obrasFiltradas().map(o => o.id);
      if (ids.length === 0) { mostrarToast('Nenhuma obra para exportar.', 'aviso'); return; }
      this.exportarObrasJSON(ids);
    });

    const fab = document.getElementById('fabNovaObra');
    if (fab) fab.addEventListener('click', () => this.abrirFormulario());

    const delegHandler = (e) => {
      const alvoImg = e.target.closest('.imagem-card-wrapper img, .thumb-lista');
      const alvoFicha = e.target.closest('[data-abrir-ficha]');
      const alvoEditar = e.target.closest('[data-editar-obra]');
      const alvoExcluir = e.target.closest('[data-excluir-obra]');
      const alvoComparar = e.target.closest('[data-comparar-obra]');
      const alvoSlideshow = e.target.closest('[data-slideshow]');
      const alvoChipRapido = e.target.closest('[data-filtro]');
      const alvoChipSalvo = e.target.closest('[data-indice]');
      if (alvoEditar) { this.abrirFormulario(alvoEditar.dataset.editarObra); return; }
      if (alvoExcluir) { this.excluirObra(alvoExcluir.dataset.excluirObra); return; }
      if (alvoComparar) { this.adicionarComparacao(alvoComparar.dataset.compararObra); return; }
      if (alvoSlideshow) { e.stopPropagation(); this.abrirSlideshow(alvoSlideshow.dataset.slideshow); return; }
      if (alvoImg) { e.stopPropagation(); const id = alvoImg.closest('[data-abrir-ficha]')?.dataset?.abrirFicha; if (id) this.abrirSlideshow(id); return; }
      if (alvoChipRapido) {
        const f = alvoChipRapido.dataset.filtro;
        this.filtroRapido = this.filtroRapido === f ? '' : f;
        this.aplicarFiltroRapido();
        this._rerenderizarComSkeleton();
        return;
      }
      if (alvoChipSalvo) { this.carregarFiltroSalvo(parseInt(alvoChipSalvo.dataset.indice)); return; }
      if (alvoFicha) { this.abrirFichaTecnica(alvoFicha.dataset.abrirFicha); return; }
    };
    container.addEventListener('click', delegHandler);
    this._bindCache['delegCatalogo'] = { el: container, handler: delegHandler, type: 'click' };

    const btnSalvarFiltro = document.getElementById('btnSalvarFiltro');
    if (btnSalvarFiltro) btnSalvarFiltro.addEventListener('click', () => this.salvarFiltroAtual());

    resolverImagensIDB(container);
  }

  aplicarFiltroRapido() {
    const agora = new Date();
    switch (this.filtroRapido) {
      case 'disponiveis': this.filtros.status = 'disponível'; break;
      case 'vendidas': this.filtros.status = 'vendida'; this.filtroRapido = 'vendidas'; break;
      case 'recentes':
        this.filtros.status = '';
        this.filtros.ano = String(agora.getFullYear());
        break;
      case 'favoritas':
        break;
      default: break;
    }
  }

  salvarFiltroAtual() {
    const nome = prompt('Nome para este filtro:');
    if (!nome) return;
    this.filtrosSalvos.push({ nome, descricao: Object.entries(this.filtros).map(([k, v]) => v ? `${k}:${v}` : '').filter(Boolean).join(', '), filtros: { ...this.filtros } });
    this.rerenderizar();
  }

  carregarFiltroSalvo(indice) {
    const salvo = this.filtrosSalvos[indice];
    if (salvo) { this.filtros = { ...salvo.filtros }; this.rerenderizar(); }
  }

  rerenderizar(manterFoco = false) {
    const container = document.getElementById('viewPrincipal');
    const idFocoAtual = manterFoco ? document.activeElement.id : null;
    container.innerHTML = this.render();
    this.aposRenderizar();
    if (idFocoAtual) {
      const el = document.getElementById(idFocoAtual);
      if (el) { el.focus(); const v = el.value; el.value = ''; el.value = v; }
    }
  }

  async bulkAcao(acao) {
    const ids = Array.from(this.selecionados);
    if (ids.length === 0) return;

    switch (acao) {
      case 'favoritar':
        ids.forEach(id => {
          const obra = obraStore().porId(id);
          if (obra) { obra.favorita = true; obraStore().atualizar(id, obra); }
        });
        mostrarToast(`${ids.length} obra${ids.length === 1 ? '' : 's'} favoritada${ids.length === 1 ? '' : 's'}`, 'sucesso');
        break;
      case 'desfavoritar':
        ids.forEach(id => {
          const obra = obraStore().porId(id);
          if (obra) { obra.favorita = false; obraStore().atualizar(id, obra); }
        });
        mostrarToast(`${ids.length} obra${ids.length === 1 ? '' : 's'} desfavoritada${ids.length === 1 ? '' : 's'}`, 'sucesso');
        break;
      case 'mudarStatus':
        abrirModal(`
          <h3>Mudar Status em Lote</h3>
          <div class="campo-form">
            <label>Novo Status</label>
            <select id="novoStatusBulk">
              <option value="disponível">Disponível</option>
              <option value="reservada">Reservada</option>
              <option value="vendida">Vendida</option>
              <option value="em exposição">Em Exposição</option>
            </select>
          </div>
          <div class="modal-acoes">
            <button class="btn-primario" id="btnConfirmarStatus">Confirmar</button>
            <button class="btn-secundario" id="btnCancelarStatus">Cancelar</button>
          </div>
        `);
        document.getElementById('btnConfirmarStatus').addEventListener('click', () => {
          const novoStatus = document.getElementById('novoStatusBulk').value;
          ids.forEach(id => {
            const obra = obraStore().porId(id);
            if (obra) { obra.status = novoStatus; obraStore().atualizar(id, obra); }
          });
          mostrarToast(`${ids.length} obra${ids.length === 1 ? '' : 's'} atualizada${ids.length === 1 ? '' : 's'}`, 'sucesso');
          this.selecionados.clear();
          fecharModal();
          this.rerenderizar();
        });
        document.getElementById('btnCancelarStatus').addEventListener('click', () => fecharModal());
        return;
      case 'exportar':
        this.exportarObrasJSON(ids);
        break;
      case 'exportarPDF':
        this.exportarCatalogoPDF(ids);
        break;
      case 'excluir':
        if (!await confirmarAcao(`Tem certeza que deseja excluir ${ids.length} obra${ids.length === 1 ? '' : 's'}? Esta ação não pode ser desfeita.`)) return;
        const excluidas = [];
        ids.forEach(id => { const o = obraStore().porId(id); if (o) excluidas.push(o); obraStore().remover(id); });
        mostrarToastComDesfazer(`${ids.length} obra${ids.length === 1 ? '' : 's'} excluída${ids.length === 1 ? '' : 's'}`, () => {
          excluidas.forEach(o => { obraStore().items.unshift(o); }); obraStore()._persistir();
        });
        break;
    }

    this.selecionados.clear();
    this.rerenderizar();
  }

  exportarObrasJSON(ids) {
    const obrasParaExportar = ids.map(id => obraStore().porId(id)).filter(Boolean);
    const dadosExport = { obras: obrasParaExportar, exportadoEm: new Date().toISOString(), versao: '1.0' };
    const blob = new Blob([JSON.stringify(dadosExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url; a.download = `atelier-crm-obras-${timestamp}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    mostrarToast(`${ids.length} obra${ids.length === 1 ? '' : 's'} exportada${ids.length === 1 ? '' : 's'}`, 'sucesso');
  }

  exportarCatalogoPDF(ids) {
    if (!window.jspdf) { mostrarToast('Biblioteca de PDF indisponível.', 'erro'); return; }
    const obras = ids.map(id => obraStore().porId(id)).filter(Boolean);
    if (obras.length === 0) return;
    mostrarLoading('Gerando catálogo PDF...');

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const larguraPagina = doc.internal.pageSize.getWidth();
    const alturaPagina = doc.internal.pageSize.getHeight();
    const nomeArtista = (configStore().artista && configStore().artista.nome) || 'Ateliê do Artista';

    obras.forEach((obra, idx) => {
      if (idx > 0) doc.addPage();

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(30, 30, 30);
      doc.text(nomeArtista, larguraPagina / 2, 22, { align: 'center' });
      doc.setDrawColor(200); doc.setLineWidth(0.4);
      doc.line(25, 28, larguraPagina - 25, 28);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(130);
      doc.text(`Catálogo de Obras · Página ${idx + 1} de ${obras.length}`, larguraPagina / 2, 35, { align: 'center' });

      let yAtual = 46;
      const imgSrc = this.obterImagem(obra);
      if (/^data:image\/(png|jpe?g)/i.test(imgSrc || '')) {
        try {
          const tipo = /png/i.test(imgSrc) ? 'PNG' : 'JPEG';
          doc.addImage(imgSrc, tipo, (larguraPagina - 100) / 2, yAtual, 100, 100, undefined, 'FAST');
          yAtual += 112;
        } catch (e) { console.warn('Erro ao inserir imagem no PDF:', e); }
      }

      doc.setFont('helvetica', 'bold'); doc.setFontSize(16); doc.setTextColor(20);
      doc.text(obra.titulo || 'Sem título', larguraPagina / 2, yAtual, { align: 'center' }); yAtual += 9;

      if (obra.serie) {
        doc.setFont('helvetica', 'italic'); doc.setFontSize(10); doc.setTextColor(120);
        doc.text(`Série: ${obra.serie}`, larguraPagina / 2, yAtual, { align: 'center' }); yAtual += 8;
      }

      doc.setFont('helvetica', 'normal'); doc.setFontSize(11); doc.setTextColor(60);
      const dados = [
        `Técnica: ${capitalizarTexto(obra.tecnica)}`,
        `Dimensões: ${this.formatarDimensoes(obra.dimensoes)}`,
        `Ano: ${obra.ano || '-'}`,
        `Status: ${rotuloStatus(obra.status)}`,
        `Preço: ${formatarMoeda(obra.preco)}`
      ];
      dados.forEach(linha => { doc.text(linha, larguraPagina / 2, yAtual, { align: 'center' }); yAtual += 6.5; });

      if (obra.descricao) {
        yAtual += 4;
        doc.setFont('helvetica', 'italic'); doc.setFontSize(10); doc.setTextColor(90);
        doc.text(doc.splitTextToSize(obra.descricao, larguraPagina - 60), larguraPagina / 2, yAtual, { align: 'center' });
      }

      doc.setDrawColor(210);
      doc.line(25, alturaPagina - 20, larguraPagina - 25, alturaPagina - 20);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(150);
      doc.text(`Catálogo gerado em ${new Date().toLocaleDateString('pt-BR')} · Atelier CRM`, larguraPagina / 2, alturaPagina - 14, { align: 'center' });
    });

    const nomeArquivo = `catalogo-${obras.length}-obras-${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(nomeArquivo);
    esconderLoading();
    mostrarToast(`Catálogo PDF exportado com ${obras.length} obra${obras.length === 1 ? '' : 's'}!`, 'sucesso');
  }

  /* ------------------------------------------------------------------------
     CADASTRO / EDIÇÃO DE OBRA (com múltiplas imagens, drag & drop, editor)
     ------------------------------------------------------------------------ */
  async abrirFormulario(id = null) {
    const obraExistente = id ? obraStore().porId(id) : null;
    this.imagensFormAtual = [];
    this.imagensRefAtual = [];
    this.imagemDestacadaAtual = null;
    this.imagemDestacadaRef = '';

    if (obraExistente) {
      const imgs = obraExistente.imagens?.length ? obraExistente.imagens : (obraExistente.imagem ? [obraExistente.imagem] : []);
      for (const img of imgs) {
        if (img && img.startsWith('idb:')) {
          try {
            const url = await imageStore.carregar(img);
            this.imagensFormAtual.push(url || IDB_IMG_PLACEHOLDER);
            this.imagensRefAtual.push(img);
          } catch { this.imagensFormAtual.push(IDB_IMG_PLACEHOLDER); this.imagensRefAtual.push(''); }
        } else {
          this.imagensFormAtual.push(img || '');
          this.imagensRefAtual.push('');
        }
      }
      const dest = obraExistente.imagemDestacada || (obraExistente.imagens && obraExistente.imagens[0]) || obraExistente.imagem || '';
      if (dest.startsWith('idb:')) {
        try { this.imagemDestacadaAtual = await imageStore.carregar(dest); } catch { this.imagemDestacadaAtual = IDB_IMG_PLACEHOLDER; }
        this.imagemDestacadaRef = dest;
      } else {
        this.imagemDestacadaAtual = dest || this.imagensFormAtual[0] || null;
        this.imagemDestacadaRef = '';
      }
    }
    const dim = (obraExistente && obraExistente.dimensoes) || {};

    abrirModal(`
      <h3>${obraExistente ? 'Editar Obra' : 'Nova Obra'}</h3>
      <form id="formObra" class="form-obra-premium">
        <div class="campo-form">
          <label>Título *</label>
          <input type="text" id="campoTitulo" value="${obraExistente ? obraExistente.titulo : ''}" required>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Técnica *</label>
            <select id="campoTecnica" required>
              <option value="">Selecione...</option>
              <option value="óleo" ${obraExistente && obraExistente.tecnica === 'óleo' ? 'selected' : ''}>Óleo</option>
              <option value="aquarela" ${obraExistente && obraExistente.tecnica === 'aquarela' ? 'selected' : ''}>Aquarela</option>
              <option value="escultura" ${obraExistente && obraExistente.tecnica === 'escultura' ? 'selected' : ''}>Escultura</option>
              <option value="outra" ${obraExistente && obraExistente.tecnica === 'outra' ? 'selected' : ''}>Outra</option>
            </select>
          </div>
          <div class="campo-form">
            <label>Ano</label>
            <input type="number" id="campoAno" value="${obraExistente ? (obraExistente.ano || '') : new Date().getFullYear()}">
          </div>
        </div>
        <div class="campo-form">
          <label>Dimensões (cm)</label>
          <div class="form-linha">
            <input type="number" id="campoAltura" placeholder="Altura" aria-label="Altura em cm" value="${dim.altura || ''}">
            <input type="number" id="campoLargura" placeholder="Largura" aria-label="Largura em cm" value="${dim.largura || ''}">
            <input type="number" id="campoProfundidade" placeholder="Profundidade" aria-label="Profundidade em cm" value="${dim.profundidade || ''}">
          </div>
        </div>
        <div class="campo-form">
          <label>Série (opcional)</label>
          <input type="text" id="campoSerie" value="${obraExistente ? (obraExistente.serie || '') : ''}">
        </div>
        <div class="campo-form">
          <label>Descrição</label>
          <textarea id="campoDescricao">${obraExistente ? (obraExistente.descricao || '') : ''}</textarea>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Preço (R$) *</label>
            <input type="number" id="campoPreco" value="${obraExistente ? obraExistente.preco : ''}" required>
          </div>
          <div class="campo-form">
            <label>Status</label>
            <select id="campoStatus">
              <option value="disponível" ${!obraExistente || classeStatus(obraExistente.status) === 'disponivel' ? 'selected' : ''}>Disponível</option>
              <option value="reservada" ${obraExistente && classeStatus(obraExistente.status) === 'reservada' ? 'selected' : ''}>Reservada</option>
              <option value="vendida" ${obraExistente && classeStatus(obraExistente.status) === 'vendida' ? 'selected' : ''}>Vendida</option>
              <option value="em exposição" ${obraExistente && classeStatus(obraExistente.status) === 'exposicao' ? 'selected' : ''}>Em Exposição</option>
            </select>
          </div>
        </div>

        <div class="campo-form">
          <label>Imagens da Obra</label>
          <div class="dropzone-imagens" id="dropzoneImagens">
            <div class="dropzone-placeholder">
              <span class="dropzone-icone">📷</span>
              <p>Arraste imagens para cá ou clique para selecionar</p>
              <p class="texto-ajuda">JPG, PNG · Múltiplos arquivos · Máx 5 imagens</p>
            </div>
            <input type="file" id="campoImagens" accept="image/*" multiple style="display:none" aria-label="Selecionar imagens da obra">
          </div>
          <div class="preview-galeria" id="previewGaleria">
            ${this.imagensFormAtual.length === 0 ? '<p class="texto-ajuda">Nenhuma imagem selecionada ainda.</p>' : ''}
          </div>
        </div>

        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarObra">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar Obra</button>
        </div>
      </form>
    `);

    document.getElementById('btnCancelarObra').addEventListener('click', fecharModal);
    this.iniciarDropzone();
    this.renderizarPreviewGaleria();

    document.getElementById('formObra').addEventListener('submit', async (e) => {
      e.preventDefault();
      const titulo = document.getElementById('campoTitulo').value.trim();
      const tecnica = document.getElementById('campoTecnica').value;
      const preco = document.getElementById('campoPreco').value;
      if (!titulo || !tecnica || preco === '') {
        mostrarToast('Preencha os campos obrigatórios: título, técnica e preço.', 'aviso');
        return;
      }

      const imagensRef = [...this.imagensRefAtual];
      const imgPrincRef = this.imagemDestacadaRef || imagensRef[0] || '';

      for (let i = 0; i < this.imagensFormAtual.length; i++) {
        const img = this.imagensFormAtual[i];
        if (!imagensRef[i] && img && img.startsWith('data:')) {
          try {
            const ref = await imageStore.salvar(img);
            imagensRef[i] = ref.medium;
          } catch { imagensRef[i] = img; }
        }
      }

      const dadosObra = {
        titulo,
        tecnica,
        dimensoes: {
          altura: Number(document.getElementById('campoAltura').value) || 0,
          largura: Number(document.getElementById('campoLargura').value) || 0,
          profundidade: Number(document.getElementById('campoProfundidade').value) || 0
        },
        ano: Number(document.getElementById('campoAno').value) || null,
        descricao: document.getElementById('campoDescricao').value.trim(),
        preco: Number(preco),
        status: document.getElementById('campoStatus').value,
        imagem: imgPrincRef || gerarImagemPlaceholder('#cccccc', '<i class="fas fa-images"></i>'),
        imagens: imagensRef.filter(Boolean),
        imagemDestacada: imgPrincRef,
        serie: document.getElementById('campoSerie').value.trim()
      };

      if (obraExistente) {
        obraStore().atualizar(obraExistente.id, dadosObra);
        mostrarToast('Obra atualizada com sucesso!', 'sucesso');
      } else {
        dadosObra.dataCadastro = new Date().toISOString();
        obraStore().adicionar(dadosObra);
        mostrarToast('Obra cadastrada com sucesso!', 'sucesso');
      }

      fecharModal();
      this.router.navegar('catalogo');
    });
  }

  iniciarDropzone() {
    const dropzone = document.getElementById('dropzoneImagens');
    const inputFile = document.getElementById('campoImagens');

    if (!dropzone) return;

    dropzone.addEventListener('click', () => inputFile.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragging');
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragging');
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragging');
      this.processarArquivos(e.dataTransfer.files);
    });

    inputFile.addEventListener('change', (e) => {
      this.processarArquivos(e.target.files);
      e.target.value = '';
    });
  }

  processarArquivos(files) {
    if (this.imagensFormAtual.length + files.length > 5) {
      mostrarToast('Máximo de 5 imagens por obra.', 'aviso');
      return;
    }

    Array.from(files).forEach(arquivo => {
      if (!arquivo.type.startsWith('image/')) return;
      const leitor = new FileReader();
      leitor.onload = async (ev) => {
        const imgBase64 = ev.target.result;
        this.comprimirImagem(imgBase64, 1200, 0.8, async (comprimida) => {
          try {
            const ref = await imageStore.salvar(comprimida);
            const thumbURL = await imageStore.carregar(ref.thumb);
            this.imagensFormAtual.push(thumbURL);
            this.imagensRefAtual.push(ref.medium);
            if (!this.imagemDestacadaAtual) {
              this.imagemDestacadaAtual = thumbURL;
              this.imagemDestacadaRef = ref.medium;
            }
          } catch (e) {
            this.imagensFormAtual.push(comprimida);
            this.imagensRefAtual.push('');
            if (!this.imagemDestacadaAtual) {
              this.imagemDestacadaAtual = comprimida;
            }
          }
          this.renderizarPreviewGaleria();
        });
      };
      leitor.readAsDataURL(arquivo);
    });
  }

  comprimirImagem(base64, maxLargura, qualidade, callback) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxLargura) {
        height = (height * maxLargura) / width;
        width = maxLargura;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpeg', qualidade));
    };
    img.onerror = () => callback(base64);
    img.src = base64;
  }

  renderizarPreviewGaleria() {
    const container = document.getElementById('previewGaleria');
    if (!container) return;

    if (this.imagensFormAtual.length === 0) {
      container.innerHTML = '<p class="texto-ajuda">Nenhuma imagem selecionada ainda.</p>';
      return;
    }

    let dragSrcIdx = -1;

    container.innerHTML = `
      <div class="grade-miniaturas drop-reorder">
        ${this.imagensFormAtual.map((img, i) => `
          <div class="miniatura-imagem ${img === this.imagemDestacadaAtual ? 'destacada' : ''}" draggable="true" data-idx="${i}">
            <img src="${img}" alt="Imagem ${i + 1}">
            <div class="miniaturas-acoes">
              <button type="button" class="btn-miniatura ${img === this.imagemDestacadaAtual ? 'ativo' : ''}" data-destacar="${i}" title="Marcar como destacada" aria-label="Marcar imagem ${i + 1} como destacada"><i class="fas fa-star"></i></button>
              <button type="button" class="btn-miniatura" data-editar-img="${i}" title="Editar imagem" aria-label="Editar imagem">✎</button>
              <button type="button" class="btn-miniatura" data-remover-img="${i}" title="Remover imagem" aria-label="Remover imagem">✕</button>
            </div>
            <span class="mi-ordem">${i + 1}</span>
          </div>
        `).join('')}
      </div>
      <p class="texto-ajuda"><i class="fas fa-star"></i> = imagem destacada (capa). Arraste as imagens para reordenar.</p>
    `;

    // Drag-to-reorder
    container.querySelectorAll('.miniatura-imagem[draggable]').forEach(el => {
      el.addEventListener('dragstart', (e) => {
        dragSrcIdx = parseInt(el.dataset.idx);
        el.classList.add('d-r-arrastando');
        e.dataTransfer.effectAllowed = 'move';
      });
      el.addEventListener('dragend', () => {
        el.classList.remove('d-r-arrastando');
        container.querySelectorAll('.miniatura-imagem').forEach(e => e.classList.remove('d-r-alvo'));
      });
      el.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
      el.addEventListener('dragenter', (e) => { e.preventDefault(); el.classList.add('d-r-alvo'); });
      el.addEventListener('dragleave', () => el.classList.remove('d-r-alvo'));
      el.addEventListener('drop', (e) => {
        e.preventDefault();
        el.classList.remove('d-r-alvo');
        const targetIdx = parseInt(el.dataset.idx);
        if (dragSrcIdx >= 0 && targetIdx >= 0 && dragSrcIdx !== targetIdx) {
          const [item] = this.imagensFormAtual.splice(dragSrcIdx, 1);
          this.imagensFormAtual.splice(targetIdx, 0, item);
          const [ref] = this.imagensRefAtual.splice(dragSrcIdx, 1);
          this.imagensRefAtual.splice(targetIdx, 0, ref);
          this.renderizarPreviewGaleria();
        }
      });
    });

    container.querySelectorAll('[data-destacar]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.dataset.destacar);
        this.imagemDestacadaAtual = this.imagensFormAtual[idx];
        this.imagemDestacadaRef = this.imagensRefAtual[idx] || '';
        this.renderizarPreviewGaleria();
      });
    });

    container.querySelectorAll('[data-remover-img]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.dataset.removerImg);
        this.imagensFormAtual.splice(idx, 1);
        this.imagensRefAtual.splice(idx, 1);
        if (this.imagemDestacadaAtual === this.imagensFormAtual[idx] || !this.imagensFormAtual.includes(this.imagemDestacadaAtual)) {
          this.imagemDestacadaAtual = this.imagensFormAtual[0] || null;
          this.imagemDestacadaRef = this.imagensRefAtual[0] || '';
        }
        this.renderizarPreviewGaleria();
      });
    });

    container.querySelectorAll('[data-editar-img]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.dataset.editarImg);
        this.abrirEditorImagem(idx);
      });
    });
  }

  abrirImportacaoLote() {
    abrirModal(`
      <h3><i class="fas fa-camera"></i> Importar Múltiplas Obras</h3>
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Arraste imagens ou clique para selecionar. Cada imagem se tornará uma nova obra.</p>
      <div class="dropzone-imagens batch-dropzone" id="batchDropzone">
        <div class="dropzone-placeholder">
          <span class="dropzone-icone">📷</span>
          <p>Arraste imagens para cá</p>
          <p class="texto-ajuda">JPG, PNG · Múltiplos arquivos · Sem limite</p>
        </div>
        <input type="file" id="batchFileInput" accept="image/*" multiple style="display:none" aria-label="Selecionar arquivos de imagem para importação em lote">
      </div>
      <div id="batchPreviewContainer"></div>
      <div class="batch-campos-comuns" id="batchCamposComuns" style="display:none;">
        <h4 style="font-size:0.85rem;margin-bottom:8px;">Campos comuns (aplicados a todas)</h4>
        <div class="form-linha">
          <div class="campo-form"><label>Técnica</label><select id="batchTecnica"><option value="">—</option><option value="óleo">Óleo</option><option value="aquarela">Aquarela</option><option value="escultura">Escultura</option><option value="outra">Outra</option></select></div>
          <div class="campo-form"><label>Status</label><select id="batchStatus"><option value="disponível">Disponível</option><option value="reservada">Reservada</option><option value="vendida">Vendida</option><option value="em exposição">Em Exposição</option></select></div>
          <div class="campo-form"><label>Ano</label><input type="number" id="batchAno" value="${new Date().getFullYear()}"></div>
        </div>
        <div class="campo-form"><label>Série (opcional)</label><input type="text" id="batchSerie" placeholder="Ex: Série Jardins"></div>
      </div>
      <div class="modal-acoes" id="batchAcoes" style="display:none;">
        <button class="btn-secundario" id="batchCancelar">Cancelar</button>
        <button class="btn-primario" id="batchCriar">Importar Obras</button>
      </div>
    `);
    this.iniciarBatchDrop();
  }

  iniciarBatchDrop() {
    const dropzone = document.getElementById('batchDropzone');
    const fileInput = document.getElementById('batchFileInput');
    const imagensLote = [];

    if (!dropzone) return;

    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragging'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragging'));
    dropzone.addEventListener('drop', (e) => { e.preventDefault(); dropzone.classList.remove('dragging'); processarLote(e.dataTransfer.files); });
    fileInput.addEventListener('change', () => { if (fileInput.files.length) processarLote(fileInput.files); });

    const processarLote = (files) => {
      const imgFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
      if (imgFiles.length === 0) { mostrarToast('Nenhuma imagem encontrada.', 'aviso'); return; }
      let concluidas = 0;
      imgFiles.forEach(f => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          comprimirImagem(ev.target.result, 1200, 0.8, (comprimida) => {
            imagensLote.push(comprimida);
            concluidas++;
            if (concluidas === imgFiles.length) {
              mostrarPreviewLote(imagensLote);
            }
          });
        };
        reader.readAsDataURL(f);
      });
    };

    const comprimirImagem = (base64, maxLargura, qualidade, callback) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxLargura) { height = (height * maxLargura) / width; width = maxLargura; }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg', qualidade));
      };
      img.onerror = () => callback(base64);
      img.src = base64;
    };

    const mostrarPreviewLote = (imagens) => {
      const container = document.getElementById('batchPreviewContainer');
      const campos = document.getElementById('batchCamposComuns');
      const acoes = document.getElementById('batchAcoes');
      if (container) {
        container.innerHTML = `
          <div class="batch-preview-grid">
            ${imagens.map((img, i) => `
              <div class="batch-item" data-idx="${i}">
                <img src="${img}" alt="Obra ${i + 1}">
                <button class="batch-remover" data-idx="${i}" title="Remover" aria-label="Remover obra ${i + 1}">✕</button>
                <span class="batch-label">Obra ${i + 1}</span>
              </div>
            `).join('')}
          </div>
          <p class="texto-ajuda">${imagens.length} imagem(ns) preparada(s) para importação.</p>
        `;
        container.querySelectorAll('.batch-remover').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx);
            imagens.splice(idx, 1);
            mostrarPreviewLote(imagens);
          });
        });
      }
      if (campos) campos.style.display = imagens.length > 0 ? 'block' : 'none';
      if (acoes) acoes.style.display = imagens.length > 0 ? 'flex' : 'none';
      document.getElementById('batchCancelar')?.addEventListener('click', fecharModal);
      document.getElementById('batchCriar')?.addEventListener('click', async () => {
        const tecnica = document.getElementById('batchTecnica')?.value || '';
        const status = document.getElementById('batchStatus')?.value || 'disponível';
        const ano = parseInt(document.getElementById('batchAno')?.value) || new Date().getFullYear();
        const serie = document.getElementById('batchSerie')?.value.trim() || '';
        const obras = await Promise.all(imagens.map(async (img) => {
          let ref = img;
          if (img.startsWith('data:')) {
            try { const r = await imageStore.salvar(img); ref = r.medium; } catch { /* empty */ }
          }
          return { titulo: `Obra ${Date.now()}`, tecnica, ano, status, serie, imagem: ref, imagens: [ref], imagemDestacada: ref, preco: 0, dataCadastro: new Date().toISOString() };
        }));
        obras.forEach(o => obraStore().adicionar(o));
        fecharModal();
        mostrarToast(`${obras.length} obra(s) importada(s) com sucesso!`, 'sucesso');
        this.router.navegar('catalogo');
      });
    };
  }

  /* ------------------------------------------------------------------------
     EDITOR DE IMAGEM INLINE (crop, rotate, brightness)
     ------------------------------------------------------------------------ */
  abrirEditorImagem(idx) {
    const imgSrc = this.imagensFormAtual[idx];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imgObj = new Image();
    let angulo = 0;
    let brilho = 0;
    let crop = { x: 0, y: 0, w: 0, h: 0 };
    let cropAtivo = false;
    const cropInicio = null;

    imgObj.onload = () => {
      canvas.width = imgObj.width;
      canvas.height = imgObj.height;
      ctx.drawImage(imgObj, 0, 0);
      crop = { x: 0, y: 0, w: imgObj.width, h: imgObj.height };
      renderizarEditor();
    };
    imgObj.src = imgSrc;

    const renderizarEditor = () => {
      const previewData = aplicarTransformacoes();
      abrirModal(`
        <h3>✎ Editor de Imagem</h3>
        <div class="editor-imagem-container">
          <div class="editor-imagem-tela">
            <img src="${previewData}" id="previewEditor" style="max-width:100%;max-height:400px;">
            ${cropAtivo ? '<div class="crop-overlay"></div>' : ''}
          </div>
          <div class="editor-imagem-controles">
            <div class="editor-controle-grupo">
              <label>Girar</label>
              <button class="btn-miniatura" id="btnRotacionarEsq">↺ Esquerda</button>
              <button class="btn-miniatura" id="btnRotacionarDir">↻ Direita</button>
            </div>
            <div class="editor-controle-grupo">
              <label>Brilho: ${brilho > 0 ? '+' : ''}${brilho}</label>
              <input type="range" id="sliderBrilho" min="-100" max="100" value="${brilho}" style="width:100%" aria-label="Ajustar brilho">
            </div>
            <div class="editor-controle-grupo">
              <label>Cortar</label>
              <button class="btn-miniatura" id="btnAtivarCrop">${cropAtivo ? '✕ Cancelar Crop' : '✂ Ativar Crop'}</button>
              <p class="texto-ajuda">Clique e arraste na imagem para selecionar a área</p>
            </div>
          </div>
        </div>
        <div class="modal-acoes">
          <button class="btn-secundario" id="btnCancelarEditor">Cancelar</button>
          <button class="btn-primario" id="btnAplicarEditor">Aplicar</button>
        </div>
      `);

      document.getElementById('btnRotacionarEsq').addEventListener('click', () => { angulo -= 90; renderizarEditor(); });
      document.getElementById('btnRotacionarDir').addEventListener('click', () => { angulo += 90; renderizarEditor(); });
      document.getElementById('sliderBrilho').addEventListener('input', (e) => { brilho = parseInt(e.target.value); renderizarEditor(); });
      document.getElementById('btnAtivarCrop').addEventListener('click', () => { cropAtivo = !cropAtivo; renderizarEditor(); });
      document.getElementById('btnCancelarEditor').addEventListener('click', fecharModal);
      document.getElementById('btnAplicarEditor').addEventListener('click', () => {
        this.imagensFormAtual[idx] = aplicarTransformacoes();
        this.renderizarPreviewGaleria();
        fecharModal();
        mostrarToast('Imagem editada com sucesso!', 'sucesso');
      });
    };

    const aplicarTransformacoes = () => {
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      const rotRad = (angulo * Math.PI) / 180;
      const cos = Math.abs(Math.cos(rotRad));
      const sin = Math.abs(Math.sin(rotRad));
      const w = imgObj.width;
      const h = imgObj.height;

      if (angulo % 180 !== 0) {
        const novoW = h * cos + w * sin;
        const novoH = h * sin + w * cos;
        offscreen.width = Math.ceil(novoW);
        offscreen.height = Math.ceil(novoH);
        offCtx.translate(offscreen.width / 2, offscreen.height / 2);
        offCtx.rotate(rotRad);
        offCtx.drawImage(imgObj, -w / 2, -h / 2);
      } else {
        offscreen.width = w;
        offscreen.height = h;
        offCtx.drawImage(imgObj, 0, 0);
      }

      if (brilho !== 0) {
        const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
        const data = imageData.data;
        const fator = 1 + brilho / 100;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * fator);
          data[i + 1] = Math.min(255, data[i + 1] * fator);
          data[i + 2] = Math.min(255, data[i + 2] * fator);
        }
        offCtx.putImageData(imageData, 0, 0);
      }

      return offscreen.toDataURL('image/jpeg', 0.9);
    };
  }

  /* ------------------------------------------------------------------------
     FICHA TÉCNICA (com galeria de imagens, slideshow e QR Code)
     ------------------------------------------------------------------------ */
  abrirFichaTecnica(id) {
    const o = obraStore().porId(id);
    if (!o) return;
    const imagens = (o.imagens && o.imagens.length > 0) ? o.imagens : [o.imagem];
    const temMultiplas = imagens.length > 1;

    const imgPrinc = this.obterImagem(o);
    const imgPrincIdb = (o.imagemDestacada || (o.imagens && o.imagens[0]) || o.imagem || '').startsWith('idb:') ? ` data-img-idb="${o.imagemDestacada || (o.imagens && o.imagens[0]) || o.imagem}"` : '';

    abrirModal(`
      <div class="ficha-tecnica-obra ficha-premium">
        <div class="ficha-galeria">
          <div class="ficha-imagem-principal">
            <img id="fichaImgPrincipal" class="idb-placeholder" src="${imgPrinc}" alt="${o.titulo}"${imgPrincIdb}>
            ${temMultiplas ? `
            <button class="ficha-nav-btn ficha-nav-prev" id="fichaNavPrev" aria-label="Imagem anterior">◀</button>
            <button class="ficha-nav-btn ficha-nav-next" id="fichaNavNext" aria-label="Próxima imagem">▶</button>
            <button class="ficha-slideshow-btn" id="fichaSlideshow">▶ Iniciar Slideshow</button>
            ` : ''}
          </div>
          ${temMultiplas ? `
          <div class="ficha-miniaturas" id="fichaMiniaturas">
            ${imagens.map((img, i) => `
              <img src="${img.startsWith('idb:') ? IDB_IMG_PLACEHOLDER : img}" class="ficha-thumb ${i === 0 ? 'ativo' : ''}"${img.startsWith('idb:') ? ` data-img-idb="${img}"` : ''} data-ficha-indice="${i}" alt="Imagem ${i + 1}">
            `).join('')}
          </div>
          ` : ''}
        </div>
        <div class="ficha-info">
          <div class="titulo-ficha">${o.titulo}</div>
          <div class="serie-ficha">${o.serie ? 'Série: ' + o.serie : '&nbsp;'}</div>
          <table class="tabela-ficha">
            <caption class="sr-only">Ficha técnica da obra</caption>
            <tr><td>Técnica</td><td>${capitalizarTexto(o.tecnica)}</td></tr>
            <tr><td>Dimensões</td><td>${this.formatarDimensoes(o.dimensoes)}</td></tr>
            <tr><td>Ano</td><td>${o.ano || '-'}</td></tr>
            <tr><td>Status</td><td><span class="tag-status ${classeStatus(o.status)}">${rotuloStatus(o.status)}</span></td></tr>
            <tr><td>Preço</td><td>${formatarMoeda(o.preco)}</td></tr>
            <tr><td>Cadastrada em</td><td>${formatarData(o.dataCadastro || o.criadoEm)}</td></tr>
          </table>
          ${o.descricao ? `<div class="descricao-ficha">${o.descricao}</div>` : ''}
          <div class="ficha-qrcode" id="fichaQRCode"></div>
          <div class="acoes-ficha">
            <button class="btn-secundario" id="btnEditarFicha">✎ Editar</button>
            <button class="btn-primario" id="btnExportarPdfFicha"><i class="fas fa-file"></i> Exportar PDF</button>
            <button class="btn-secundario" id="btnCompartilharObra"><i class="fas fa-link"></i> Compartilhar</button>
          </div>
        </div>
      </div>
    `);

    document.getElementById('btnEditarFicha').addEventListener('click', () => { fecharModal(); this.abrirFormulario(o.id); });
    document.getElementById('btnExportarPdfFicha').addEventListener('click', () => this.exportarPDF(o));
    document.getElementById('btnCompartilharObra')?.addEventListener('click', () => this.compartilharObra(o));

    if (temMultiplas) {
      let indiceAtual = 0;
      const imgPrincipal = document.getElementById('fichaImgPrincipal');
      const thumbs = document.querySelectorAll('.ficha-thumb');

      const mostrarImagem = async (idx) => {
        indiceAtual = idx;
        const src = imagens[idx];
        imgPrincipal.src = src.startsWith('idb:') ? IDB_IMG_PLACEHOLDER : src;
        if (src.startsWith('idb:')) {
          try { imgPrincipal.src = await imageStore.carregar(src); } catch { /* empty */ }
        }
        thumbs.forEach((t, i) => t.classList.toggle('ativo', i === idx));
      };

      document.getElementById('fichaNavPrev').addEventListener('click', () => {
        mostrarImagem((indiceAtual - 1 + imagens.length) % imagens.length);
      });
      document.getElementById('fichaNavNext').addEventListener('click', () => {
        mostrarImagem((indiceAtual + 1) % imagens.length);
      });
      document.getElementById('fichaSlideshow').addEventListener('click', () => {
        this.abrirSlideshow(o.id);
      });
      thumbs.forEach(t => {
        t.addEventListener('click', () => mostrarImagem(parseInt(t.dataset.fichaIndice)));
      });
    }

    resolverImagensIDB(document.getElementById('modalOverlay'));
    this.gerarQRCodeObra(o);
  }

  compartilharObra(obra) {
    const texto = `${obra.titulo} - ${capitalizarTexto(obra.tecnica)} - ${this.formatarDimensoes(obra.dimensoes)} - ${formatarMoeda(obra.preco)}`;
    if (navigator.share) {
      navigator.share({ title: obra.titulo, text: texto }).catch(() => {});
    } else {
      navigator.clipboard.writeText(texto).then(() => mostrarToast('Informação copiadas para a área de transferência!', 'info')).catch(() => {});
    }
  }

  gerarQRCodeObra(obra) {
    const container = document.getElementById('fichaQRCode');
    if (!container) return;
    if (typeof QRCode === 'undefined') {
      container.innerHTML = '<p class="texto-ajuda">QR Code indisponível.</p>';
      return;
    }
    try {
      const dados = JSON.stringify({
        titulo: obra.titulo,
        tecnica: obra.tecnica,
        ano: obra.ano,
        preco: obra.preco,
        dimensoes: this.formatarDimensoes(obra.dimensoes)
      });
      container.innerHTML = '';
      const qrDiv = document.createElement('div');
      container.appendChild(qrDiv);
      new QRCode(qrDiv, { text: dados, width: 120, height: 120, colorDark: '#1a1a1a', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.H });
    } catch (e) {
      container.innerHTML = '<p class="texto-ajuda">Erro ao gerar QR Code.</p>';
    }
  }

  /* ------------------------------------------------------------------------
     SLIDESHOW (modo galeria)
     ------------------------------------------------------------------------ */
  async abrirSlideshow(id) {
    const obra = obraStore().porId(id);
    if (!obra) return;
    const imagens = (obra.imagens && obra.imagens.length > 0) ? obra.imagens : [obra.imagem];
    if (!imagens || imagens.length === 0) return;
    const resolved = await Promise.all(imagens.map(async (src) => {
      if (src.startsWith('idb:')) { try { return await imageStore.carregar(src); } catch { /* empty */ } }
      return src;
    }));
    const images = resolved.map((src, i) => ({
      src,
      title: obra.titulo || 'Sem título',
      subtitle: [obra.tecnica, obra.ano].filter(Boolean).join(' · ') + (imagens.length > 1 ? ` — Imagem ${i + 1}/${imagens.length}` : ''),
      caption: obra.descricao || '',
      price: obra.preco ? formatarMoeda(obra.preco) : '',
      id: obra.id
    }));
    abrirLightbox(images, 0);
  }

  /* ------------------------------------------------------------------------
     COMPARAÇÃO LADO A LADO
     ------------------------------------------------------------------------ */
  abrirComparacao(ids) {
    if (ids.length < 2) { mostrarToast('Selecione pelo menos 2 obras para comparar.', 'aviso'); return; }
    const obras = ids.map(id => obraStore().porId(id)).filter(Boolean);
    if (obras.length < 2) return;

    const colunas = obras.map(o => {
      const imgSrc = this.obterImagem(o);
      const imgIdb = this.imgDataIdb(o);
      return `
      <div class="comparacao-coluna">
        <div class="comparacao-imagem">
          <img src="${imgSrc}" alt="${o.titulo}" class="idb-placeholder"${imgIdb}>
        </div>
        <h3 class="comparacao-titulo">${o.titulo}</h3>
        ${o.serie ? `<p class="comparacao-serie">${o.serie}</p>` : ''}
        <table class="comparacao-tabela">
          <caption class="sr-only">Informações da obra</caption>
          <tr><td>Técnica</td><td>${capitalizarTexto(o.tecnica)}</td></tr>
          <tr><td>Dimensões</td><td>${this.formatarDimensoes(o.dimensoes)}</td></tr>
          <tr><td>Ano</td><td>${o.ano || '-'}</td></tr>
          <tr><td>Status</td><td><span class="tag-status ${classeStatus(o.status)}">${rotuloStatus(o.status)}</span></td></tr>
          <tr><td>Preço</td><td>${formatarMoeda(o.preco)}</td></tr>
          <tr><td>Série</td><td>${o.serie || '-'}</td></tr>
        </table>
      </div>
    `}).join('');

    const totalColunas = Math.min(obras.length, 4);
    abrirModal(`
      <h3><i class="fas fa-chart-bar"></i> Comparação de Obras</h3>
      <div class="comparacao-container" style="grid-template-columns: repeat(${totalColunas}, 1fr)">
        ${colunas}
      </div>
      <div class="modal-acoes">
        <button class="btn-secundario" id="btnFecharComparacao">Fechar</button>
        <button class="btn-primario" id="btnExportarComparacao"><i class="fas fa-file"></i> Exportar Comparação</button>
      </div>
    `);

    document.getElementById('btnFecharComparacao').addEventListener('click', fecharModal);
    document.getElementById('btnExportarComparacao').addEventListener('click', () => {
      this.exportarComparacaoPDF(obras);
    });

    resolverImagensIDB(document.getElementById('modalOverlay'));
  }

  adicionarComparacao(id) {
    if (this.idsComparacao.includes(id)) {
      this.idsComparacao = this.idsComparacao.filter(i => i !== id);
      if (this.idsComparacao.length === 0) this.modoComparacao = false;
    } else {
      this.idsComparacao.push(id);
      this.modoComparacao = true;
      this.selecionados.add(id);
    }
    this.rerenderizar();

    if (this.idsComparacao.length >= 2) {
      this.abrirComparacao([...this.idsComparacao]);
      this.idsComparacao = [];
    }
  }

  exportarComparacaoPDF(obras) {
    if (!window.jspdf) { mostrarToast('Biblioteca de PDF indisponível.', 'erro'); return; }
    mostrarLoading('Gerando comparação em PDF...');

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: obras.length > 2 ? 'landscape' : 'portrait' });
    doc.setFont('helvetica', 'bold'); doc.setFontSize(18);
    doc.text('Comparação de Obras', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    const margemEsq = 15;
    let y = 35;
    const colW = (doc.internal.pageSize.getWidth() - 30) / obras.length;

    obras.forEach((obra, i) => {
      const x = margemEsq + i * colW;

      doc.setDrawColor(200); doc.rect(x, y - 5, colW - 4, 80);

      const imgSrc = this.obterImagem(obra);
      if (/^data:image\/(png|jpe?g)/i.test(imgSrc || '')) {
        try {
          doc.addImage(imgSrc, /png/i.test(imgSrc) ? 'PNG' : 'JPEG', x + 2, y, colW - 8, 35, undefined, 'FAST');
        } catch (e) { console.warn(e) }
      }
      y += 40;

      doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
      doc.text(obra.titulo || 'Sem título', x + (colW - 4) / 2, y, { align: 'center', maxWidth: colW - 8 });
      y += 6;

      doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
      const campos = [
        ['Técnica', capitalizarTexto(obra.tecnica)],
        ['Dimensões', this.formatarDimensoes(obra.dimensoes)],
        ['Ano', String(obra.ano || '-')],
        ['Status', rotuloStatus(obra.status)],
        ['Preço', formatarMoeda(obra.preco)]
      ];
      campos.forEach(([k, v]) => {
        doc.setFont('helvetica', 'bold'); doc.text(k + ':', x + 2, y);
        doc.setFont('helvetica', 'normal');
        const tw = doc.getTextWidth(k + ': ');
        doc.text(v, x + 2 + tw, y);
        y += 5;
      });
      y = 35;
    });

    doc.save(`comparacao-obras-${new Date().toISOString().slice(0, 10)}.pdf`);
    esconderLoading();
    mostrarToast('Comparação exportada em PDF!', 'sucesso');
  }

  /* ------------------------------------------------------------------------
     EXCLUSÃO E EXPORTAÇÃO INDIVIDUAL
     ------------------------------------------------------------------------ */
  async excluirObra(id) {
    const obra = obraStore().porId(id);
    if (!obra) return;
    if (!await confirmarAcao(`Excluir a obra "${obra.titulo}"? Essa ação não pode ser desfeita.`)) return;
    obraStore().remover(id);
    mostrarToastComDesfazer('Obra excluída.', () => { obraStore().items.unshift(obra); obraStore()._persistir(); });
    this.rerenderizar();
  }

  exportarPDF(obra) {
    if (!window.jspdf) { mostrarToast('Biblioteca de PDF indisponível (verifique sua conexão com a internet).', 'erro'); return; }
    mostrarLoading('Gerando ficha técnica em PDF...');

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const larguraPagina = doc.internal.pageSize.getWidth();
    const alturaPagina = doc.internal.pageSize.getHeight();
    const nomeArtista = (configStore().artista && configStore().artista.nome) || 'Ateliê do Artista';

    doc.setFont('helvetica', 'bold'); doc.setFontSize(20); doc.setTextColor(30, 30, 30);
    doc.text(nomeArtista, larguraPagina / 2, 22, { align: 'center' });
    doc.setDrawColor(200); doc.setLineWidth(0.4); doc.line(25, 28, larguraPagina - 25, 28);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(130);
    doc.text('Ficha Técnica de Obra', larguraPagina / 2, 35, { align: 'center' });

    let yAtual = 46;
    const imgSrc = this.obterImagem(obra);
    const formatoSuportado = /^data:image\/(png|jpe?g)/i.test(imgSrc || '');
    if (formatoSuportado) {
      try {
        const tipo = /png/i.test(imgSrc) ? 'PNG' : 'JPEG';
        doc.addImage(imgSrc, tipo, (larguraPagina - 110) / 2, yAtual, 110, 110, undefined, 'FAST');
        yAtual += 122;
      } catch (erro) { console.warn('Não foi possível inserir a imagem no PDF:', erro); }
    } else {
      doc.setDrawColor(210); doc.rect((larguraPagina - 90) / 2, yAtual, 90, 90);
      doc.setFontSize(9); doc.setTextColor(180);
      doc.text('Imagem não disponível', larguraPagina / 2, yAtual + 45, { align: 'center' });
      yAtual += 102;
    }

    doc.setFont('helvetica', 'bold'); doc.setFontSize(16); doc.setTextColor(20);
    doc.text(obra.titulo || 'Sem título', larguraPagina / 2, yAtual, { align: 'center' }); yAtual += 9;

    if (obra.serie) {
      doc.setFont('helvetica', 'italic'); doc.setFontSize(10); doc.setTextColor(120);
      doc.text(`Série: ${obra.serie}`, larguraPagina / 2, yAtual, { align: 'center' }); yAtual += 8;
    }

    doc.setFont('helvetica', 'normal'); doc.setFontSize(11); doc.setTextColor(60);
    const linhasDados = [
      `Técnica: ${capitalizarTexto(obra.tecnica)}`,
      `Dimensões: ${this.formatarDimensoes(obra.dimensoes)}`,
      `Ano: ${obra.ano || '-'}`,
      `Status: ${rotuloStatus(obra.status)}`,
      `Preço: ${formatarMoeda(obra.preco)}`
    ];
    linhasDados.forEach(linha => { doc.text(linha, larguraPagina / 2, yAtual, { align: 'center' }); yAtual += 6.5; });

    if (obra.descricao) {
      yAtual += 4; doc.setFont('helvetica', 'italic'); doc.setFontSize(10); doc.setTextColor(90);
      doc.text(doc.splitTextToSize(obra.descricao, larguraPagina - 60), larguraPagina / 2, yAtual, { align: 'center' });
    }

    doc.setDrawColor(210); doc.line(25, alturaPagina - 20, larguraPagina - 25, alturaPagina - 20);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(150);
    doc.text(`Ficha gerada em ${new Date().toLocaleDateString('pt-BR')} · Atelier CRM`, larguraPagina / 2, alturaPagina - 14, { align: 'center' });

    const nomeArquivo = `ficha-${(obra.titulo || 'obra').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')}.pdf`;
    doc.save(nomeArquivo);
    esconderLoading();
    mostrarToast('PDF exportado com sucesso!', 'sucesso');
  }
}
