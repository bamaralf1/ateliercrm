export class ReferenciasView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.filtros = { tag: '', categoria: '', obra: '' };
    this.indiceArrastado = null; // índice do card sendo arrastado (drag & drop)
    this.itensApresentacao = [];
    this.indiceApresentacao = 0;
  }

  // Mantém a ordem salva no array (usada para persistir o drag & drop)
  referenciasFiltradas() {
    let refs = this.dataStore.listar('referencias');
    const f = this.filtros;
    if (f.tag) refs = refs.filter(r => (r.tags || []).includes(f.tag));
    if (f.categoria) refs = refs.filter(r => r.categoria === f.categoria);
    if (f.obra) refs = refs.filter(r => r.obraVinculada === f.obra);
    return refs;
  }

  tagsDisponiveis() {
    const todas = this.dataStore.listar('referencias').flatMap(r => r.tags || []);
    return [...new Set(todas)].sort();
  }

  categoriasDisponiveis() {
    const todas = this.dataStore.listar('referencias').map(r => r.categoria).filter(Boolean);
    return [...new Set(todas)].sort();
  }

  render() {
    const refs = this.referenciasFiltradas();
    const tags = this.tagsDisponiveis();
    const categorias = this.categoriasDisponiveis();
    const obras = obraStore().items;

    const cardsHtml = refs.length ? `
      <div class="grid-referencias" id="gridReferencias">
        ${refs.map((r, indice) => this.renderCard(r, indice, obras)).join('')}
      </div>
    ` : `
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio">📒</div><p>Nenhuma referência encontrada. Adicione imagens, links ou notas para montar seu board.</p></div>
      </div>
    `;

    return `
      <div class="view-cabecalho">
        <div>
          <h2>Board de Referências</h2>
          <p class="subtitulo">${refs.length} item${refs.length === 1 ? '' : 'ns'}  ·  arraste os cards para reorganizar</p>
        </div>
        <div class="barra-acoes-referencias">
          <button class="btn-secundario" id="btnApresentarReferencias">📺 Apresentar</button>
          <button class="btn-primario" id="btnNovaReferencia"><i class="fas fa-plus"></i> Nova Referência</button>
        </div>
      </div>

      <div class="catalogo-filtros">
        <div class="campo-filtro">
          <label>Tag</label>
          <select id="filtroRefTag">
            <option value="">Todas</option>
            ${tags.map(t => `<option value="${t}" ${this.filtros.tag === t ? 'selected' : ''}>${t}</option>`).join('')}
          </select>
        </div>
        <div class="campo-filtro">
          <label>Categoria</label>
          <select id="filtroRefCategoria">
            <option value="">Todas</option>
            ${categorias.map(c => `<option value="${c}" ${this.filtros.categoria === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
        <div class="campo-filtro">
          <label>Obra vinculada</label>
          <select id="filtroRefObra">
            <option value="">Todas</option>
            ${obras.map(o => `<option value="${o.id}" ${this.filtros.obra === o.id ? 'selected' : ''}>${o.titulo}</option>`).join('')}
          </select>
        </div>
        <button class="btn-secundario" id="btnLimparFiltrosRef">Limpar filtros</button>
      </div>

      ${cardsHtml}
    `;
  }

  renderCard(r, indice, obras) {
    const obraVinculada = r.obraVinculada ? obras.find(o => o.id === r.obraVinculada) : null;
    const tagsHtml = (r.tags || []).map(t => `<span class="badge-tag">${t}</span>`).join('');

    let corpoHtml;
    if (r.tipo === 'imagem') {
      corpoHtml = `
        <img class="imagem-referencia" data-apresentar="${indice}" src="${r.imagem}" alt="${r.titulo || 'Referência'}">
        <div class="corpo-referencia">
          <div class="icone-tipo-referencia"><i class="fas fa-images"></i> Imagem</div>
          ${r.titulo ? `<div class="titulo-referencia">${r.titulo}</div>` : ''}
        </div>
      `;
    } else if (r.tipo === 'link') {
      corpoHtml = `
        <img class="imagem-referencia" data-apresentar="${indice}" src="${r.url}" alt="${r.titulo || 'Link de referência'}" onerror="this.style.display='none'">
        <div class="corpo-referencia">
          <div class="icone-tipo-referencia"><i class="fas fa-link"></i> Link externo</div>
          ${r.titulo ? `<div class="titulo-referencia">${r.titulo}</div>` : ''}
          <a class="link-referencia" href="${r.url}" target="_blank" rel="noopener">${r.url}</a>
        </div>
      `;
    } else {
      corpoHtml = `
        <div class="corpo-referencia" data-apresentar="${indice}" style="cursor:pointer;">
          <div class="icone-tipo-referencia"><i class="fas fa-pencil-alt"></i> Nota</div>
          ${r.titulo ? `<div class="titulo-referencia">${r.titulo}</div>` : ''}
          <div class="nota-referencia">${r.nota || ''}</div>
        </div>
      `;
    }

    return `
      <div class="card-referencia" draggable="true" data-indice="${indice}" data-id="${r.id}">
        ${corpoHtml}
        <div class="corpo-referencia" style="padding-top:0;">
          ${tagsHtml ? `<div class="tags-referencia">${tagsHtml}</div>` : ''}
          ${obraVinculada ? `<span class="badge-obra-vinculada">Usado em: ${obraVinculada.titulo}</span>` : ''}
        </div>
        <div class="acoes-referencia">
          <button class="btn-icone-tabela" data-excluir-referencia="${r.id}" style="flex:1;"><i class="fas fa-trash"></i> Excluir</button>
        </div>
      </div>
    `;
  }

  aposRenderizar() {
    this.removerListeners();
    const container = document.getElementById('viewPrincipal');

    const btnNova = document.getElementById('btnNovaReferencia');
    if (btnNova) btnNova.addEventListener('click', () => this.abrirFormulario());

    const btnApresentar = document.getElementById('btnApresentarReferencias');
    if (btnApresentar) btnApresentar.addEventListener('click', () => this.abrirApresentacao(0));

    const mapaFiltros = { filtroRefTag: 'tag', filtroRefCategoria: 'categoria', filtroRefObra: 'obra' };
    Object.keys(mapaFiltros).forEach(idCampo => {
      const el = document.getElementById(idCampo);
      if (!el) return;
      el.addEventListener('change', (e) => { this.filtros[mapaFiltros[idCampo]] = e.target.value; this.rerenderizar(); });
    });
    const btnLimpar = document.getElementById('btnLimparFiltrosRef');
    if (btnLimpar) btnLimpar.addEventListener('click', () => { this.filtros = { tag: '', categoria: '', obra: '' }; this.rerenderizar(); });

    const delegHandler = (e) => {
      const alvoExcluir = e.target.closest('[data-excluir-referencia]');
      const alvoApresentar = e.target.closest('[data-apresentar]');
      if (alvoExcluir) { this.excluirReferencia(alvoExcluir.dataset.excluirReferencia); return; }
      if (alvoApresentar) { this.abrirApresentacao(Number(alvoApresentar.dataset.apresentar)); return; }
    };
    container.addEventListener('click', delegHandler);
    this._bindCache['delegReferencias'] = { el: container, handler: delegHandler, type: 'click' };

    this.ligarDragAndDrop();
  }

  // Reordenação por arrastar e soltar (HTML5 Drag & Drop API nativa)
  ligarDragAndDrop() {
    const grid = document.getElementById('gridReferencias');
    if (!grid) return;
    const cards = grid.querySelectorAll('.card-referencia');

    cards.forEach(card => {
      card.addEventListener('dragstart', () => {
        this.indiceArrastado = Number(card.dataset.indice);
        card.classList.add('arrastando');
      });
      card.addEventListener('dragend', () => card.classList.remove('arrastando'));
      card.addEventListener('dragover', (e) => { e.preventDefault(); card.classList.add('zona-drop'); });
      card.addEventListener('dragleave', () => card.classList.remove('zona-drop'));
      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('zona-drop');
        const indiceDestino = Number(card.dataset.indice);
        if (this.indiceArrastado === null || this.indiceArrastado === indiceDestino) return;

        // Reordena o array de referências filtradas e persiste a nova ordem no DataStore
        const refsAtuais = this.referenciasFiltradas();
        const [item] = refsAtuais.splice(this.indiceArrastado, 1);
        refsAtuais.splice(indiceDestino, 0, item);

        // Reconstrói a coleção completa preservando itens fora do filtro atual
        const idsOrdenados = refsAtuais.map(r => r.id);
        const restante = this.dataStore.listar('referencias').filter(r => !idsOrdenados.includes(r.id));
        this.dataStore.dados.referencias = [...refsAtuais, ...restante];
        this.dataStore.salvar();

        this.indiceArrastado = null;
        this.rerenderizar();
      });
    });
  }

  // Modal de criação de referência (imagem / link / nota)
  abrirFormulario() {
    const obras = obraStore().items;

    abrirModal(`
      <h3>Nova Referência</h3>
      <div class="grupo-botoes-toggle" id="grupoTipoReferencia">
        <button type="button" class="ativo" data-tipo-ref="imagem"><i class="fas fa-images"></i> Imagem</button>
        <button type="button" data-tipo-ref="link"><i class="fas fa-link"></i> Link</button>
        <button type="button" data-tipo-ref="nota"><i class="fas fa-pencil-alt"></i> Nota</button>
      </div>
      <form id="formReferencia">
        <div class="campo-form"><label>Título (opcional)</label><input type="text" id="campoTituloRef"></div>

        <div class="campo-form" data-bloco-tipo="imagem">
          <label>Imagem</label>
          <input type="file" id="campoArquivoRef" accept="image/*">
          <img id="previewImagemRef" class="preview-imagem-form" style="display:none;">
        </div>

        <div class="campo-form" data-bloco-tipo="link" style="display:none;">
          <label>URL da imagem/página</label>
          <input type="url" id="campoUrlRef" placeholder="https://...">
          <p class="texto-ajuda">Se a URL apontar para uma imagem, o preview aparecerá automaticamente no board.</p>
        </div>

        <div class="campo-form" data-bloco-tipo="nota" style="display:none;">
          <label>Nota</label>
          <textarea id="campoNotaRef" placeholder="Escreva sua ideia, inspiração ou observação..."></textarea>
        </div>

        <div class="form-linha">
          <div class="campo-form">
            <label>Categoria</label>
            <input type="text" id="campoCategoriaRef" list="listaCategoriasRef" placeholder="cor, época, artista, emoção...">
            <datalist id="listaCategoriasRef">
              <option value="cor"><option value="época"><option value="artista"><option value="emoção"><option value="composição">
            </datalist>
          </div>
          <div class="campo-form">
            <label>Obra vinculada</label>
            <select id="campoObraVinculadaRef">
              <option value="">Nenhuma</option>
              ${obras.map(o => `<option value="${o.id}">${o.titulo}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="campo-form"><label>Tags (separadas por vírgula)</label><input type="text" id="campoTagsRef" placeholder="Ex: quente, retrato, luz suave"></div>

        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarReferencia">Cancelar</button>
          <button type="submit" class="btn-primario">Adicionar ao Board</button>
        </div>
      </form>
    `);

    let tipoAtual = 'imagem';
    let imagemBase64 = '';

    document.querySelectorAll('[data-tipo-ref]').forEach(btn => {
      btn.addEventListener('click', () => {
        tipoAtual = btn.dataset.tipoRef;
        document.querySelectorAll('[data-tipo-ref]').forEach(b => b.classList.toggle('ativo', b === btn));
        document.querySelectorAll('[data-bloco-tipo]').forEach(bloco => {
          bloco.style.display = bloco.dataset.blocoTipo === tipoAtual ? 'block' : 'none';
        });
      });
    });

    document.getElementById('campoArquivoRef').addEventListener('change', (e) => {
      const arquivo = e.target.files[0];
      if (!arquivo) return;
      const leitor = new FileReader();
      leitor.onload = (ev) => {
        imagemBase64 = ev.target.result;
        const preview = document.getElementById('previewImagemRef');
        preview.src = imagemBase64;
        preview.style.display = 'block';
      };
      leitor.readAsDataURL(arquivo);
    });

    document.getElementById('btnCancelarReferencia').addEventListener('click', fecharModal);

    document.getElementById('formReferencia').addEventListener('submit', (e) => {
      e.preventDefault();

      if (tipoAtual === 'imagem' && !imagemBase64) { mostrarToast('Selecione uma imagem para continuar.'); return; }
      const url = document.getElementById('campoUrlRef').value.trim();
      if (tipoAtual === 'link' && !url) { mostrarToast('Informe a URL do link de referência.'); return; }
      const nota = document.getElementById('campoNotaRef').value.trim();
      if (tipoAtual === 'nota' && !nota) { mostrarToast('Escreva o conteúdo da nota.'); return; }

      const tags = document.getElementById('campoTagsRef').value.split(',').map(t => t.trim()).filter(Boolean);

      const referencia = {
        tipo: tipoAtual,
        titulo: document.getElementById('campoTituloRef').value.trim(),
        imagem: tipoAtual === 'imagem' ? imagemBase64 : '',
        url: tipoAtual === 'link' ? url : '',
        nota: tipoAtual === 'nota' ? nota : '',
        categoria: document.getElementById('campoCategoriaRef').value.trim(),
        obraVinculada: document.getElementById('campoObraVinculadaRef').value || '',
        tags
      };

      this.dataStore.adicionar('referencias', referencia);
      fecharModal();
      mostrarToast('Referência adicionada ao board!');
      this.rerenderizar();
    });
  }

  excluirReferencia(id) {
    if (!confirm('Remover este item do board de referências?')) return;
    this.dataStore.remover('referencias', id);
    mostrarToast('Referência removida.');
    this.rerenderizar();
  }

  // Modo apresentação em tela cheia: navega pelos itens filtrados atualmente exibidos
  abrirApresentacao(indiceInicial) {
    this.itensApresentacao = this.referenciasFiltradas();
    if (!this.itensApresentacao.length) { mostrarToast('Não há itens para apresentar.'); return; }
    this.indiceApresentacao = indiceInicial || 0;

    const overlay = document.createElement('div');
    overlay.className = 'overlay-apresentacao';
    overlay.id = 'overlayApresentacaoRef';
    document.body.appendChild(overlay);

    const botaoFechar = document.createElement('button');
    botaoFechar.className = 'btn-fechar-apresentacao';
    botaoFechar.textContent = '✕';
    botaoFechar.addEventListener('click', () => this.fecharApresentacao());
    document.body.appendChild(botaoFechar);
    overlay.dataset.temBotaoFechar = 'true';
    this._botaoFecharApresentacao = botaoFechar;

    this._teclaApresentacao = (e) => {
      if (e.key === 'Escape') this.fecharApresentacao();
      if (e.key === 'ArrowRight') this.navegarApresentacao(1);
      if (e.key === 'ArrowLeft') this.navegarApresentacao(-1);
    };
    window.addEventListener('keydown', this._teclaApresentacao);

    this.renderizarSlideApresentacao();
  }

  renderizarSlideApresentacao() {
    const overlay = document.getElementById('overlayApresentacaoRef');
    if (!overlay) return;
    const item = this.itensApresentacao[this.indiceApresentacao];

    let midiaHtml;
    if (item.tipo === 'imagem') midiaHtml = `<img class="midia-apresentacao" src="${item.imagem}" alt="${item.titulo || ''}">`;
    else if (item.tipo === 'link') midiaHtml = `<img class="midia-apresentacao" src="${item.url}" alt="${item.titulo || ''}" onerror="this.outerHTML='<div class=\\'nota-apresentacao\\'>Link: ${item.url}</div>'">`;
    else midiaHtml = `<div class="nota-apresentacao">${item.nota || ''}</div>`;

    overlay.innerHTML = `
      ${midiaHtml}
      <div class="legenda-apresentacao">
        ${item.titulo ? `<strong>${item.titulo}</strong>  ·  ` : ''}${this.indiceApresentacao + 1} / ${this.itensApresentacao.length}
      </div>
      <div class="controles-apresentacao">
        <button id="btnApresentacaoAnterior">◀ Anterior</button>
        <button id="btnApresentacaoProxima">Próxima ▶</button>
      </div>
    `;

    document.getElementById('btnApresentacaoAnterior').addEventListener('click', () => this.navegarApresentacao(-1));
    document.getElementById('btnApresentacaoProxima').addEventListener('click', () => this.navegarApresentacao(1));
  }

  navegarApresentacao(direcao) {
    const total = this.itensApresentacao.length;
    this.indiceApresentacao = (this.indiceApresentacao + direcao + total) % total;
    this.renderizarSlideApresentacao();
  }

  fecharApresentacao() {
    const overlay = document.getElementById('overlayApresentacaoRef');
    if (overlay) document.body.removeChild(overlay);
    if (this._botaoFecharApresentacao) { document.body.removeChild(this._botaoFecharApresentacao); this._botaoFecharApresentacao = null; }
    if (this._teclaApresentacao) { window.removeEventListener('keydown', this._teclaApresentacao); this._teclaApresentacao = null; }
  }
}
