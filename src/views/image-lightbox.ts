export class ImageLightbox {
  constructor() {
    this.images = [];
    this.currentIndex = 0;
    this.isOpen = false;
    this.scale = 1;
    this.minScale = 0.5;
    this.maxScale = 5;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.dragOffset = { x: 0, y: 0 };
    this.touchStartDistance = 0;
    this.touchStartScale = 1;
    this.swipeStartX = 0;
    this.swipeStartY = 0;
    this.isSwiping = false;
    this.autoPlayTimer = null;
    this.autoPlayInterval = 3500;
    this.zoomBtn = null;
    this.thumbScrollPos = 0;
    this._onKeyDown = null;
    this._onMouseMove = null;
    this._onMouseUp = null;
    this._onTouchStart = null;
    this._onTouchMove = null;
    this._onTouchEnd = null;
    this._onWheel = null;
    this.overlay = null;
  }

  open(images, index = 0) {
    if (!images || images.length === 0) return;
    this.images = images;
    this.currentIndex = Math.max(0, Math.min(index, images.length - 1));
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
    this._render();
    this._bindEvents();
    this._showImage();
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.stopAutoPlay();
    this._unbindEvents();
    if (this.overlay && this.overlay.parentNode) this.overlay.parentNode.removeChild(this.overlay);
    this.overlay = null;
    document.body.style.overflow = '';
  }

  navigate(dir) {
    const newIndex = (this.currentIndex + dir + this.images.length) % this.images.length;
    this.currentIndex = newIndex;
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this._showImage();
    this._updateThumbActive();
  }

  zoomIn() {
    this._setScale(this.scale * 1.3);
  }

  zoomOut() {
    this._setScale(this.scale / 1.3);
  }

  resetZoom() {
    this._setScale(1);
    this.offsetX = 0;
    this.offsetY = 0;
    this._applyTransform();
  }

  toggleAutoPlay() {
    if (this.autoPlayTimer) this.stopAutoPlay();
    else this.startAutoPlay();
  }

  startAutoPlay() {
    if (this.autoPlayTimer || this.images.length <= 1) return;
    this.autoPlayTimer = setInterval(() => this.navigate(1), this.autoPlayInterval);
    const btn = this.overlay?.querySelector('.lb-ctrl-autoplay');
    if (btn) { btn.textContent = '⏸'; btn.classList.add('ativo'); }
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) { clearInterval(this.autoPlayTimer); this.autoPlayTimer = null; }
    const btn = this.overlay?.querySelector('.lb-ctrl-autoplay');
    if (btn) { btn.textContent = '▶'; btn.classList.remove('ativo'); }
  }

  _render() {
    const existing = document.querySelector('.lb-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.innerHTML = `
      <div class="lb-topbar">
        <span class="lb-counter">${this.currentIndex + 1} / ${this.images.length}</span>
        <div class="lb-top-actions">
          <button class="lb-btn lb-ctrl-autoplay" title="Slideshow" aria-label="Iniciar slideshow">▶</button>
          <button class="lb-btn lb-ctrl-download" title="Download" aria-label="Baixar imagem">⬇</button>
          <button class="lb-btn lb-ctrl-share" title="Compartilhar" aria-label="Compartilhar"><i class="fas fa-link"></i></button>
          <button class="lb-btn lb-ctrl-close" title="Fechar (ESC)" aria-label="Fechar">✕</button>
        </div>
      </div>
      <div class="lb-main">
        <div class="lb-img-container">
          <img class="lb-img" alt="">
          <div class="lb-loader"></div>
          <div class="lb-caption">
            <div class="lb-caption-title"></div>
            <div class="lb-caption-sub"></div>
          </div>
        </div>
      </div>
      <button class="lb-nav lb-nav-prev" title="Anterior (←)" aria-label="Imagem anterior">◀</button>
      <button class="lb-nav lb-nav-next" title="Próximo (→)" aria-label="Próxima imagem">▶</button>
      <div class="lb-thumbstrip">
        <div class="lb-thumb-track"></div>
      </div>
      <div class="lb-zoom-indicator">${Math.round(this.scale * 100)}%</div>
    `;
    document.body.appendChild(overlay);
    this.overlay = overlay;

    overlay.querySelector('.lb-ctrl-close')?.addEventListener('click', () => this.close());
    overlay.querySelector('.lb-nav-prev')?.addEventListener('click', () => this.navigate(-1));
    overlay.querySelector('.lb-nav-next')?.addEventListener('click', () => this.navigate(1));
    overlay.querySelector('.lb-ctrl-autoplay')?.addEventListener('click', () => this.toggleAutoPlay());
    overlay.querySelector('.lb-ctrl-download')?.addEventListener('click', () => this._download());
    overlay.querySelector('.lb-ctrl-share')?.addEventListener('click', () => this._share());

    this._renderThumbs();
    overlay.querySelector('.lb-main')?.addEventListener('dblclick', (e) => {
      if (this.scale > 1) this.resetZoom();
      else this._setScale(2.5);
    });
  }

  _renderThumbs() {
    const track = this.overlay?.querySelector('.lb-thumb-track');
    if (!track) return;
    track.innerHTML = this.images.map((img, i) => `
      <div class="lb-thumb ${i === this.currentIndex ? 'ativo' : ''}" data-idx="${i}">
        <img src="${img.src}" alt="Miniatura da obra" loading="lazy">
      </div>
    `).join('');
    track.querySelectorAll('.lb-thumb').forEach(el => {
      el.addEventListener('click', () => {
        this.currentIndex = parseInt(el.dataset.idx);
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this._showImage();
        this._updateThumbActive();
      });
    });
    this._scrollThumbIntoView();
  }

  _updateThumbActive() {
    this.overlay?.querySelectorAll('.lb-thumb').forEach(el => {
      el.classList.toggle('ativo', parseInt(el.dataset.idx) === this.currentIndex);
    });
    this._scrollThumbIntoView();
    const counter = this.overlay?.querySelector('.lb-counter');
    if (counter) counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
  }

  _scrollThumbIntoView() {
    const active = this.overlay?.querySelector('.lb-thumb.ativo');
    if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  _showImage() {
    if (!this.overlay) return;
    const img = this.images[this.currentIndex];
    const imgEl = this.overlay.querySelector('.lb-img');
    const loader = this.overlay.querySelector('.lb-loader');
    const captionTitle = this.overlay.querySelector('.lb-caption-title');
    const captionSub = this.overlay.querySelector('.lb-caption-sub');

    if (!imgEl) return;

    loader.style.display = 'block';
    imgEl.style.opacity = '0';

    const tempImg = new Image();
    tempImg.onload = () => {
      imgEl.src = img.src;
      imgEl.alt = img.title || 'Imagem da obra';
      imgEl.style.opacity = '1';
      if (loader) loader.style.display = 'none';
      this._applyTransform();
    };
    tempImg.onerror = () => {
      imgEl.alt = 'Erro ao carregar imagem';
      imgEl.style.opacity = '1';
      if (loader) loader.style.display = 'none';
    };
    tempImg.src = img.src;

    const parts = [];
    if (img.title) parts.push(img.title);
    if (img.subtitle) parts.push(img.subtitle);
    captionTitle.textContent = parts.join(' · ') || '';
    if (img.price) captionSub.textContent = img.price;
    else captionSub.textContent = img.caption || '';
  }

  _applyTransform() {
    const imgEl = this.overlay?.querySelector('.lb-img');
    if (!imgEl) return;
    imgEl.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.scale})`;
    const ind = this.overlay?.querySelector('.lb-zoom-indicator');
    if (ind) ind.textContent = `${Math.round(this.scale * 100)}%`;
  }

  _setScale(s) {
    this.scale = Math.max(this.minScale, Math.min(this.maxScale, s));
    if (this.scale <= 1) {
      this.offsetX = 0;
      this.offsetY = 0;
    }
    this._applyTransform();
  }

  _calcZoomCenter(cursorX, cursorY) {
    const imgEl = this.overlay?.querySelector('.lb-img');
    if (!imgEl) return;
    const rect = imgEl.getBoundingClientRect();
    const cx = (cursorX - rect.left) / rect.width;
    const cy = (cursorY - rect.top) / rect.height;
    return { cx, cy };
  }

  _download() {
    const img = this.images[this.currentIndex];
    if (!img || !img.src) return;
    const a = document.createElement('a');
    a.href = img.src;
    a.download = (img.title || 'imagem') + '.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    this._toast('⬇ Imagem baixada');
  }

  _share() {
    const img = this.images[this.currentIndex];
    const text = img.title ? `${img.title}${img.price ? ' - ' + img.price : ''}` : 'Minha obra de arte';
    if (navigator.share) {
      navigator.share({ title: text, text }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => this._toast('<i class="fas fa-link"></i> Info copiada!')).catch(() => {});
    } else {
      this._toast('<i class="fas fa-clipboard"></i> ' + text);
    }
  }

  _toast(msg) {
    const t = document.createElement('div');
    t.className = 'lb-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { if (t.parentNode) t.remove(); }, 2000);
  }

  _bindEvents() {
    this._onKeyDown = (e) => {
      if (!this.isOpen) return;
      switch (e.key) {
        case 'Escape': this.close(); break;
        case 'ArrowLeft': this.navigate(-1); break;
        case 'ArrowRight': this.navigate(1); break;
        case '+': case '=': this.zoomIn(); break;
        case '-': this.zoomOut(); break;
        case '0': this.resetZoom(); break;
        case ' ': e.preventDefault(); this.toggleAutoPlay(); break;
      }
    };

    this._onMouseMove = (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.dragStart.x;
      const dy = e.clientY - this.dragStart.y;
      this.offsetX = this.dragOffset.x + dx;
      this.offsetY = this.dragOffset.y + dy;
      this._applyTransform();
    };

    this._onMouseUp = () => {
      if (this.isSwiping) {
        const dist = this.dragStart.x - (this.dragOffset.x + (this.offsetX - this.dragOffset.x));
        if (Math.abs(dist) > 80) {
          this.navigate(dist > 0 ? 1 : -1);
        }
      }
      this.isDragging = false;
      this.isSwiping = false;
    };

    this._onWheel = (e) => {
      if (!this.isOpen) return;
      e.preventDefault();
      if (e.deltaY < 0) this.zoomIn();
      else this.zoomOut();
    };

    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseup', this._onMouseUp);
    this.overlay?.addEventListener('wheel', this._onWheel, { passive: false });

    this.overlay?.querySelector('.lb-main')?.addEventListener('mousedown', (e) => {
      if (e.target.closest('.lb-caption') || e.target.closest('.lb-thumbstrip')) return;
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.dragOffset = { x: this.offsetX, y: this.offsetY };
      this.isDragging = true;
      this.isSwiping = this.scale <= 1;
    });

    this.overlay?.querySelector('.lb-main')?.addEventListener('click', (e) => {
      if (!this.isSwiping && !this.isDragging) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width * 0.3) this.navigate(-1);
        else if (x > rect.width * 0.7) this.navigate(1);
      }
    });

    this._onTouchStart = (e) => {
      if (e.touches.length === 1) {
        this.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        this.dragOffset = { x: this.offsetX, y: this.offsetY };
        this.swipeStartX = e.touches[0].clientX;
        this.swipeStartY = e.touches[0].clientY;
        this.isDragging = true;
        this.isSwiping = this.scale <= 1;
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        this.touchStartDistance = Math.sqrt(dx * dx + dy * dy);
        this.touchStartScale = this.scale;
      }
    };

    this._onTouchMove = (e) => {
      if (!this.isOpen) return;
      e.preventDefault();
      if (e.touches.length === 1 && this.isDragging) {
        const dx = e.touches[0].clientX - this.dragStart.x;
        const dy = e.touches[0].clientY - this.dragStart.y;
        if (this.isSwiping && this.scale <= 1) {
          this.offsetX = this.dragOffset.x + dx;
          this.offsetY = this.dragOffset.y + dy;
        } else {
          this.offsetX = this.dragOffset.x + dx;
          this.offsetY = this.dragOffset.y + dy;
        }
        this._applyTransform();
      } else if (e.touches.length === 2) {
        const dx2 = e.touches[0].clientX - e.touches[1].clientX;
        const dy2 = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (this.touchStartDistance > 0) {
          const ratio = dist / this.touchStartDistance;
          this._setScale(this.touchStartScale * ratio);
        }
      }
    };

    this._onTouchEnd = (e) => {
      if (this.isSwiping && this.scale <= 1) {
        const dx = this.swipeStartX - (e.changedTouches[0]?.clientX || this.swipeStartX);
        if (Math.abs(dx) > 60) {
          this.navigate(dx > 0 ? 1 : -1);
          this.offsetX = 0;
          this.offsetY = 0;
          this._applyTransform();
        } else {
          this.offsetX = 0;
          this.offsetY = 0;
          this._applyTransform();
        }
      }
      this.isDragging = false;
      this.isSwiping = false;
    };

    this.overlay?.addEventListener('touchstart', this._onTouchStart, { passive: true });
    this.overlay?.addEventListener('touchmove', this._onTouchMove, { passive: false });
    this.overlay?.addEventListener('touchend', this._onTouchEnd, { passive: true });
  }

  _unbindEvents() {
    if (this._onKeyDown) window.removeEventListener('keydown', this._onKeyDown);
    if (this._onMouseMove) window.removeEventListener('mousemove', this._onMouseMove);
    if (this._onMouseUp) window.removeEventListener('mouseup', this._onMouseUp);
    if (this.overlay) {
      if (this._onWheel) this.overlay.removeEventListener('wheel', this._onWheel);
      if (this._onTouchStart) this.overlay.removeEventListener('touchstart', this._onTouchStart);
      if (this._onTouchMove) this.overlay.removeEventListener('touchmove', this._onTouchMove);
      if (this._onTouchEnd) this.overlay.removeEventListener('touchend', this._onTouchEnd);
    }
    this._onKeyDown = null;
    this._onMouseMove = null;
    this._onMouseUp = null;
    this._onWheel = null;
    this._onTouchStart = null;
    this._onTouchMove = null;
    this._onTouchEnd = null;
  }
}

let imageLightbox = null;
export function abrirLightbox(images, index = 0) {
  if (!imageLightbox) imageLightbox = new ImageLightbox();
  imageLightbox.open(images, index);
  return imageLightbox;
}