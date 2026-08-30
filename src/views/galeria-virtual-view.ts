export class GaleriaVirtualView {
  constructor(dataStore, router) {
    this.dataStore = dataStore;
    this.router = router;
    this.obrasVisiveis = [];
    this.indiceAtual = 0;
    this.tourAtivo = false;
    this.tourInterval = null;
    this.tourDuracao = 4;
    this.zoomNivel = 1;
    this.zoomMin = 1;
    this.zoomMax = 4;
    this._boundKeyDown = null;
    this._boundResize = null;
  }

  carregarObras() {
    const todas = obraStore().items;
    this.obrasVisiveis = todas.filter(o => o.imagem && (o.status === 'disponivel' || o.status === 'em exposicao' || o.status === 'disponível' || o.status === 'em exposição'));
    if (this.obrasVisiveis.length === 0) { this.obrasVisiveis = todas.filter(o => o.imagem).slice(0, 20); }
    if (this.obrasVisiveis.length > 20) this.obrasVisiveis = this.obrasVisiveis.slice(0, 20);
    if (this.indiceAtual >= this.obrasVisiveis.length) this.indiceAtual = 0;
  }

  render() {
    this.carregarObras();
    const temObras = this.obrasVisiveis.length > 0;
    if (!temObras) {
      return `
        <div class="galeria-virtual" style="display:flex;align-items:center;justify-content:center;background:var(--bg);min-height:400px;">
          <div style="text-align:center;color:var(--text-muted);">
            <div style="font-size:3rem;margin-bottom:12px;">🏛️</div>
            <h3 style="margin:0 0 8px;color:var(--text);">Galeria Virtual</h3>
            <p style="margin:0;font-size:0.9rem;">Adicione obras com imagem no Catálogo para vê-las aqui.</p>
            <button class="btn-primario" style="margin-top:16px;" data-acao="irCatalogo">Ir para Catálogo</button>
          </div>
        </div>`;
    }
    const obra = this.obrasVisiveis[this.indiceAtual];
    const obraImg = obra.imagem || '';
    const titulo = obra.titulo || 'Sem título';
    const tecnica = obra.tecnica || '';
    const ano = obra.ano || '';
    const preco = obra.preco ? formatarMoeda(obra.preco) : '';
    const descricao = obra.descricao || '';
    const meta = [tecnica, ano].filter(Boolean).join(' · ');

    const thumbs = this.obrasVisiveis.map((o, i) => `
      <div class="gv-thumb ${i === this.indiceAtual ? 'ativo' : ''}" data-indice="${i}" title="${o.titulo || ''}">
        <img src="${o.imagem || ''}" alt="${o.titulo || ''}" loading="lazy">
      </div>
    `).join('');

    return `
      <div class="galeria-virtual gv-2d" id="galeriaContainer">
        <div class="barra-topo">
          <h2>🏛️ Galeria Virtual</h2>
          <div class="acoes-barra">
            <button class="btn-bar" id="btnCompartilhar" title="Compartilhar galeria"><i class="fas fa-link"></i> Compartilhar</button>
            <button class="btn-bar ${this.tourAtivo ? 'ativo' : ''}" id="btnTourToggle" title="Iniciar tour guiado">🎧 Tour</button>
          </div>
        </div>
        <div class="gv-slide-container" id="gvSlideContainer">
          <div class="gv-slide" id="gvSlide">
            <div class="gv-moldura" id="gvMoldura">
              <img class="gv-imagem" id="gvImagem" src="${obraImg}" alt="${titulo}" draggable="false">
              <div class="gv-legenda">
                <div class="gv-titulo">${titulo}</div>
                ${meta ? `<div class="gv-meta">${meta}</div>` : ''}
                ${preco ? `<div class="gv-preco">${preco}</div>` : ''}
              </div>
            </div>
          </div>
          <button class="gv-nav gv-nav-prev" id="gvPrev" title="Anterior (←)" aria-label="Obra anterior">◀</button>
          <button class="gv-nav gv-nav-next" id="gvNext" title="Próxima (→)" aria-label="Próxima obra">▶</button>
          <div class="gv-zoom-controles" id="gvZoomControles">
            <button class="gv-zoom-btn" id="gvZoomOut" title="Diminuir zoom" aria-label="Diminuir zoom">−</button>
            <span class="gv-zoom-indicador" id="gvZoomIndicador">${Math.round(this.zoomNivel * 100)}%</span>
            <button class="gv-zoom-btn" id="gvZoomIn" title="Aumentar zoom" aria-label="Aumentar zoom">+</button>
            <button class="gv-zoom-btn" id="gvZoomReset" title="Resetar zoom" aria-label="Resetar zoom">⟲</button>
          </div>
          <div class="gv-hint">Scroll para zoom · Duplo clique para ampliar · ← → para navegar</div>
        </div>
        <div class="gv-thumbstrip" id="gvThumbstrip">
          ${thumbs}
        </div>
        <div class="hud-navegacao" id="hudNavegacao">
          <span class="nav-indicador" id="navIndicador">${this.indiceAtual + 1} / ${this.obrasVisiveis.length} obras</span>
        </div>
        <div class="hud-tour ${this.tourAtivo ? 'visivel' : ''}" id="hudTour">
          <button class="tour-btn" id="tourPrev" aria-label="Obra anterior">◀</button>
          <button class="tour-btn ${this.tourAtivo ? 'ativo' : ''}" id="tourPlayPause" aria-label="Reproduzir ou pausar tour">${this.tourAtivo ? '⏸' : '▶'}</button>
          <button class="tour-btn" id="tourNext" aria-label="Próxima obra">▶</button>
          <span class="tour-progresso" id="tourProgresso">${this.indiceAtual + 1} / ${this.obrasVisiveis.length}</span>
        </div>
      </div>`;
  }

  async aposRenderizar() {
    this.pararTour();
    this._limparEventos();

    if (this.obrasVisiveis.length === 0) return;

    this._bindEventos();
    this._atualizarImagem();
  }

  _bindEventos() {
    const prev = document.getElementById('gvPrev');
    const next = document.getElementById('gvNext');
    const slideContainer = document.getElementById('gvSlideContainer');
    const slide = document.getElementById('gvSlide');
    const moldura = document.getElementById('gvMoldura');
    const imagem = document.getElementById('gvImagem');
    const zoomIn = document.getElementById('gvZoomIn');
    const zoomOut = document.getElementById('gvZoomOut');
    const zoomReset = document.getElementById('gvZoomReset');

    prev?.addEventListener('click', () => this.anterior());
    next?.addEventListener('click', () => this.proximo());
    zoomIn?.addEventListener('click', () => this._aplicarZoom(this.zoomNivel * 1.3));
    zoomOut?.addEventListener('click', () => this._aplicarZoom(this.zoomNivel / 1.3));
    zoomReset?.addEventListener('click', () => this._aplicarZoom(1));

    document.querySelectorAll('.gv-thumb').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.indice);
        if (!isNaN(idx) && idx >= 0 && idx < this.obrasVisiveis.length) {
          this.indiceAtual = idx;
          this._aplicarZoom(1);
          this._atualizarImagem();
        }
      });
    });

    // Navegação por teclado
    this._boundKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowLeft') { this.anterior(); }
      else if (e.key === 'ArrowRight') { this.proximo(); }
      else if (e.key === '+' || e.key === '=') { this._aplicarZoom(this.zoomNivel * 1.3); }
      else if (e.key === '-') { this._aplicarZoom(this.zoomNivel / 1.3); }
      else if (e.key === '0') { this._aplicarZoom(1); }
    };
    window.addEventListener('keydown', this._boundKeyDown);

    // Zoom com scroll
    slideContainer?.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY < 0) this._aplicarZoom(this.zoomNivel * 1.15);
      else this._aplicarZoom(this.zoomNivel / 1.15);
    }, { passive: false });

    // Duplo clique para ampliar
    slideContainer?.addEventListener('dblclick', (e) => {
      e.preventDefault();
      if (this.zoomNivel > 1) this._aplicarZoom(1);
      else this._aplicarZoom(2.5);
    });

    // Clique na imagem abre lightbox premium
    slideContainer?.addEventListener('click', (e) => {
      if (e.target.closest('.gv-nav') || e.target.closest('.gv-zoom-controles')) return;
      if (this.zoomNivel > 1) return;
      this.abrirZoom(this.indiceAtual);
    });

    // Tour
    document.getElementById('btnTourToggle')?.addEventListener('click', () => this.toggleTour());
    document.getElementById('tourPlayPause')?.addEventListener('click', () => this.toggleTour());
    document.getElementById('tourPrev')?.addEventListener('click', () => this.tourAnterior());
    document.getElementById('tourNext')?.addEventListener('click', () => this.tourProximo());

    // Compartilhar
    document.getElementById('btnCompartilhar')?.addEventListener('click', () => this.compartilhar());

    // Resize
    this._boundResize = () => this._atualizarImagem();
    window.addEventListener('resize', this._boundResize);
  }

  _limparEventos() {
    if (this._boundKeyDown) { window.removeEventListener('keydown', this._boundKeyDown); this._boundKeyDown = null; }
    if (this._boundResize) { window.removeEventListener('resize', this._boundResize); this._boundResize = null; }
  }

  _atualizarImagem() {
    if (this.obrasVisiveis.length === 0) return;
    const obra = this.obrasVisiveis[this.indiceAtual];
    const imagem = document.getElementById('gvImagem');
    const tituloEl = document.querySelector('.gv-titulo');
    const metaEl = document.querySelector('.gv-meta');
    const precoEl = document.querySelector('.gv-preco');
    const navIndicador = document.getElementById('navIndicador');
    const tourProgresso = document.getElementById('tourProgresso');

    if (imagem) {
      imagem.style.opacity = '0';
      setTimeout(() => {
        imagem.src = obra.imagem || '';
        imagem.alt = obra.titulo || 'Sem título';
        imagem.style.opacity = '1';
      }, 150);
    }
    if (tituloEl) tituloEl.textContent = obra.titulo || 'Sem título';
    if (metaEl) {
      const meta = [obra.tecnica, obra.ano].filter(Boolean).join(' · ');
      metaEl.textContent = meta;
      metaEl.style.display = meta ? '' : 'none';
    }
    if (precoEl) {
      const preco = obra.preco ? formatarMoeda(obra.preco) : '';
      precoEl.textContent = preco;
      precoEl.style.display = preco ? '' : 'none';
    }
    if (navIndicador) navIndicador.textContent = `${this.indiceAtual + 1} / ${this.obrasVisiveis.length} obras`;
    if (tourProgresso) tourProgresso.textContent = `${this.indiceAtual + 1} / ${this.obrasVisiveis.length}`;

    document.querySelectorAll('.gv-thumb').forEach(el => {
      el.classList.toggle('ativo', parseInt(el.dataset.indice) === this.indiceAtual);
    });
    const thumbAtiva = document.querySelector('.gv-thumb.ativo');
    if (thumbAtiva) thumbAtiva.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  _aplicarZoom(nivel) {
    this.zoomNivel = Math.max(this.zoomMin, Math.min(this.zoomMax, nivel));
    const slide = document.getElementById('gvSlide');
    const indicador = document.getElementById('gvZoomIndicador');
    if (slide) {
      slide.style.transform = `scale(${this.zoomNivel})`;
      slide.style.cursor = this.zoomNivel > 1 ? 'zoom-out' : 'zoom-in';
    }
    if (indicador) indicador.textContent = `${Math.round(this.zoomNivel * 100)}%`;
  }

  anterior() {
    if (this.obrasVisiveis.length === 0) return;
    this.indiceAtual = (this.indiceAtual - 1 + this.obrasVisiveis.length) % this.obrasVisiveis.length;
    this._aplicarZoom(1);
    this._atualizarImagem();
    if (this.tourAtivo) this._reiniciarTimerTour();
  }

  proximo() {
    if (this.obrasVisiveis.length === 0) return;
    this.indiceAtual = (this.indiceAtual + 1) % this.obrasVisiveis.length;
    this._aplicarZoom(1);
    this._atualizarImagem();
    if (this.tourAtivo) this._reiniciarTimerTour();
  }

  // --- Tour ---
  toggleTour() {
    if (this.tourAtivo) { this.pararTour(); } else { this.iniciarTour(); }
  }

  iniciarTour() {
    if (this.obrasVisiveis.length === 0) return;
    this.tourAtivo = true;
    this._mostrarHudTour(true);
    this._atualizarBotaoTour();
    this._iniciarTimerTour();
  }

  pararTour() {
    this.tourAtivo = false;
    this._pararTimerTour();
    this._mostrarHudTour(false);
    this._atualizarBotaoTour();
  }

  _iniciarTimerTour() {
    this._pararTimerTour();
    this.tourInterval = setInterval(() => {
      if (this.tourAtivo) this.proximo();
    }, this.tourDuracao * 1000);
  }

  _pararTimerTour() {
    if (this.tourInterval) { clearInterval(this.tourInterval); this.tourInterval = null; }
  }

  _reiniciarTimerTour() {
    if (this.tourAtivo) { this._pararTimerTour(); this._iniciarTimerTour(); }
  }

  tourAnterior() {
    if (this.obrasVisiveis.length === 0) return;
    this.indiceAtual = (this.indiceAtual - 1 + this.obrasVisiveis.length) % this.obrasVisiveis.length;
    this._aplicarZoom(1);
    this._atualizarImagem();
    if (this.tourAtivo) this._reiniciarTimerTour();
  }

  tourProximo() {
    if (this.obrasVisiveis.length === 0) return;
    this.indiceAtual = (this.indiceAtual + 1) % this.obrasVisiveis.length;
    if (this.indiceAtual === 0 && this.tourAtivo) { this.pararTour(); return; }
    this._aplicarZoom(1);
    this._atualizarImagem();
    if (this.tourAtivo) this._reiniciarTimerTour();
  }

  _mostrarHudTour(visivel) {
    const hud = document.getElementById('hudTour');
    if (hud && hud.classList) hud.classList.toggle('visivel', visivel);
  }

  _atualizarBotaoTour() {
    const btn = document.getElementById('btnTourToggle');
    if (btn && btn.classList) { btn.classList.toggle('ativo', this.tourAtivo); btn.textContent = this.tourAtivo ? '⏹ Tour' : '🎧 Tour'; }
    const pp = document.getElementById('tourPlayPause');
    if (pp && pp.classList) { pp.classList.toggle('ativo', this.tourAtivo); pp.textContent = this.tourAtivo ? '⏸' : '▶'; }
  }

  // --- Zoom (via Lightbox Premium) ---
  abrirZoom(idx) {
    if (idx < 0 || idx >= this.obrasVisiveis.length) return;
    const images = this.obrasVisiveis.map(o => ({
      src: o.imagem || '',
      title: o.titulo || 'Sem título',
      subtitle: [o.tecnica, o.ano].filter(Boolean).join(' · '),
      caption: o.descricao || '',
      price: o.preco ? formatarMoeda(o.preco) : '',
      id: o.id
    }));
    abrirLightbox(images, idx);
  }

  fecharZoom() {
    if (imageLightbox) imageLightbox.close();
  }

  // --- Compartilhar ---
  compartilhar() {
    const hash = '#galeria=virtual&tour=obras-disponiveis';
    const url = window.location.origin + window.location.pathname + hash;
    const msg = `Olá! <i class="fas fa-palette"></i> Convido você para um tour virtual pela minha galeria de obras:\n${url}\n\nAprecie a exposição!`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(msg).then(() => this._mostrarToastCompartilhar(url)).catch(() => this._fallbackCompartilhar(url, msg));
    } else {
      this._fallbackCompartilhar(url, msg);
    }
  }

  _fallbackCompartilhar(url, msg) {
    const ta = document.createElement('textarea');
    ta.value = msg;
    ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); this._mostrarToastCompartilhar(url); } catch (e) { prompt('Copie o link abaixo:', url); }
    document.body.removeChild(ta);
  }

  _mostrarToastCompartilhar(url) {
    const existente = document.querySelector('.toast-compartilhar');
    if (existente) existente.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-compartilhar';
    toast.innerHTML = `
      <span><i class="fas fa-check"></i> Link copiado!</span>
      <span style="font-size:0.75rem;color:rgba(255,255,255,0.5);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${url}</span>
      <button class="btn-toast" id="btnAbrirLinkCompartilhado">Abrir</button>`;
    document.body.appendChild(toast);
    document.getElementById('btnAbrirLinkCompartilhado')?.addEventListener('click', () => {
      toast.remove();
      if (this.router) this.router.navegar('galeriaVirtual');
    });
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 5000);
  }

  // --- Cleanup ---
  destruir() {
    this.pararTour();
    this.fecharZoom();
    this._limparEventos();
  }
}