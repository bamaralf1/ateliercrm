export class GaleriaVirtualView {
  constructor(dataStore, router) {
    this.dataStore = dataStore;
    this.router = router;
    this.obrasVisiveis = [];
    this.zoomAtivo = null;
    this.zoomIndice = 0;
    this.ambienteAtual = 'branca';
    this.tourAtivo = false;
    this.tourIndex = 0;
    this.tourInterval = null;
    this.tourDuracao = 4;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.clock = null;
    this.obraMeshes = [];
    this.obraData = [];
    this.frameId = null;
    this.raycaster = null;
    this.mouse = { x: 0, y: 0 };
    this.isMouseDown = false;
    this.prevMouse = { x: 0, y: 0 };
    this.targetTheta = 0;
    this.targetPhi = 0.25;
    this.targetDist = 500;
    this.currentTheta = 0;
    this.currentPhi = 0.25;
    this.currentDist = 500;
    this.minDist = 200;
    this.maxDist = 1200;
    this.autoRotate = false;
    this.autoRotateSpeed = 0.15;
    this.wallGroups = [];
    this.threeReady = this._checkWebGL();
    this._boundResize = null;
    this._boundKeyDown = null;
  }

  _checkWebGL() {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
    } catch (e) { return false; }
  }

  carregarObras() {
    const todas = obraStore().items;
    this.obrasVisiveis = todas.filter(o => o.imagem && (o.status === 'disponivel' || o.status === 'em exposicao' || o.status === 'disponível' || o.status === 'em exposição'));
    if (this.obrasVisiveis.length === 0) { this.obrasVisiveis = todas.filter(o => o.imagem).slice(0, 20); }
    if (this.obrasVisiveis.length > 20) this.obrasVisiveis = this.obrasVisiveis.slice(0, 20);
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
    return `
      <div class="galeria-virtual" id="galeriaContainer">
        <div class="barra-topo">
          <h2>🏛️ Galeria Virtual</h2>
          <div class="acoes-barra">
            <button class="btn-bar" id="btnCompartilhar" title="Compartilhar galeria"><i class="fas fa-link"></i> Compartilhar</button>
            <button class="btn-bar ${this.tourAtivo ? 'ativo' : ''}" id="btnTourToggle" title="Iniciar tour guiado">🎧 Tour</button>
            <button class="btn-bar" id="btnAutoRotate" title="Rotação automática"><i class="fas fa-sync"></i> Auto</button>
            <select class="ambiente-select" id="selectAmbiente">
              <option value="branca" ${this.ambienteAtual === 'branca' ? 'selected' : ''}>🏛️ Galeria Branca</option>
              <option value="classico" ${this.ambienteAtual === 'classico' ? 'selected' : ''}>🪵 Atelier Clássico</option>
              <option value="moderno" ${this.ambienteAtual === 'moderno' ? 'selected' : ''}><i class="fas fa-images"></i> Museu Moderno</option>
            </select>
          </div>
        </div>
        <div class="three-container" id="threeContainer">
          <div class="loading-3d" id="loading3d">${this.threeReady ? '<div class="skeleton skeleton-quadro" style="height:400px"></div>' : '<p style="text-align:center;padding:40px;color:var(--text-muted)">WebGL não disponível — use um navegador moderno.</p>'}</div>
        </div>
        <div class="hud-navegacao" id="hudNavegacao">
          <span class="nav-indicador" id="navIndicador">${this.obrasVisiveis.length} obras</span>
          <span class="hint-controle">Arraste para girar · Scroll para zoom</span>
        </div>
        <div class="hud-tour ${this.tourAtivo ? 'visivel' : ''}" id="hudTour">
          <button class="tour-btn" id="tourPrev">◀</button>
          <button class="tour-btn ${this.tourAtivo ? 'ativo' : ''}" id="tourPlayPause">${this.tourAtivo ? '⏸' : '▶'}</button>
          <button class="tour-btn" id="tourNext">▶</button>
          <span class="tour-progresso" id="tourProgresso">1 / ${this.obrasVisiveis.length}</span>
        </div>
      </div>`;
  }

  async aposRenderizar() {
    this.pararTour();
    this.fecharZoom();
    this.destruirThree();

    if (this.obrasVisiveis.length === 0) return;
    if (!this.threeReady) return;

    this.container = document.getElementById('threeContainer');
    const loading = document.getElementById('loading3d');
    if (!this.container) return;

    if (typeof THREE === 'undefined') {
      try {
        await carregarThreeJS();
      } catch {
        if (loading) loading.textContent = 'Erro ao carregar Three.js';
        return;
      }
    }

    this._initThree();
    this._construirSala();
    this._bindThreeEvents();
    if (loading) loading.style.display = 'none';

    const selAmb = document.getElementById('selectAmbiente');
    if (selAmb) selAmb.addEventListener('change', () => {
      this.ambienteAtual = selAmb.value;
      this._aplicarAmbiente();
    });

    document.getElementById('btnAutoRotate')?.addEventListener('click', () => {
      this.autoRotate = !this.autoRotate;
      document.getElementById('btnAutoRotate')?.classList.toggle('ativo', this.autoRotate);
    });
    document.getElementById('btnTourToggle')?.addEventListener('click', () => this.toggleTour());
    document.getElementById('tourPlayPause')?.addEventListener('click', () => this.toggleTour());
    document.getElementById('tourPrev')?.addEventListener('click', () => this.tourAnterior());
    document.getElementById('tourNext')?.addEventListener('click', () => this.tourProximo());

    document.getElementById('btnCompartilhar')?.addEventListener('click', () => this.compartilhar());
    this._boundResize = () => this._onResize();
    window.addEventListener('resize', this._boundResize);
  }

  _initThree() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(this._corFundo(), 600, 1400);

    this.camera = new THREE.PerspectiveCamera(50, w / h, 1, 2000);
    this._updateCamera();

    const ambient = new THREE.AmbientLight(0x404060, 0.4);
    this.scene.add(ambient);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    this.scene.add(hemi);

    const mainLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    mainLight.position.set(300, 500, 400);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.camera.near = 1;
    mainLight.shadow.camera.far = 1500;
    mainLight.shadow.camera.left = -500;
    mainLight.shadow.camera.right = 500;
    mainLight.shadow.camera.top = 500;
    mainLight.shadow.camera.bottom = -500;
    this.scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x8888ff, 0.3);
    fillLight.position.set(-300, 100, -400);
    this.scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
    rimLight.position.set(0, -300, 0);
    this.scene.add(rimLight);

    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this._startLoop();
  }

  _corFundo() {
    return this.ambienteAtual === 'branca' ? 0x111111 : this.ambienteAtual === 'classico' ? 0x0a0806 : 0x050505;
  }

  _updateCamera() {
    if (!this.camera) return;
    const theta = this.currentTheta;
    const phi = this.currentPhi;
    const dist = this.currentDist;
    this.camera.position.x = dist * Math.sin(theta) * Math.cos(phi);
    this.camera.position.y = dist * Math.sin(phi);
    this.camera.position.z = dist * Math.cos(theta) * Math.cos(phi);
    this.camera.lookAt(0, 0, 0);
  }

  _startLoop() {
    const loop = () => {
      this.frameId = requestAnimationFrame(loop);
      const dt = this.clock.getDelta();

      this.currentTheta += (this.targetTheta - this.currentTheta) * 0.06;
      this.currentPhi += (this.targetPhi - this.currentPhi) * 0.06;
      this.currentDist += (this.targetDist - this.currentDist) * 0.06;

      if (this.autoRotate) {
        this.targetTheta += this.autoRotateSpeed * dt;
      }

      this._updateCamera();
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    };
    this.frameId = requestAnimationFrame(loop);
  }

  _construirSala() {
    this.obraMeshes = [];
    this.obraData = [];
    this.wallGroups = [];

    const corParede = this.ambienteAtual === 'branca' ? 0xf0f0f0 : this.ambienteAtual === 'classico' ? 0x8b7355 : 0x222222;
    const corChao = this.ambienteAtual === 'branca' ? 0xd4d4d4 : this.ambienteAtual === 'classico' ? 0x5c4033 : 0x333333;
    const corTeto = this.ambienteAtual === 'branca' ? 0xf5f5f5 : this.ambienteAtual === 'classico' ? 0x7a6b50 : 0x1a1a1a;

    const floorGeo = new THREE.PlaneGeometry(900, 900);
    const floorMat = new THREE.MeshStandardMaterial({ color: corChao, roughness: 0.9, metalness: 0 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -200;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const ceilMat = new THREE.MeshStandardMaterial({ color: corTeto, roughness: 0.9, metalness: 0 });
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), ceilMat);
    ceil.rotation.x = Math.PI / 2;
    ceil.position.y = 200;
    this.scene.add(ceil);

    const wallMat = new THREE.MeshStandardMaterial({ color: corParede, roughness: 0.7, metalness: 0 });
    const wallW = 800;
    const wallH = 400;

    const walls = ['back', 'left', 'right', 'front'];
    walls.forEach(id => this._criarParedeEstrutural(id, wallMat, wallW, wallH));

    const obras = this.obrasVisiveis;
    const obrasPorParede = Math.ceil(obras.length / 4);
    walls.forEach((wallId, wi) => {
      const start = wi * obrasPorParede;
      const end = Math.min(start + obrasPorParede, obras.length);
      const fatia = obras.slice(start, end);
      if (fatia.length === 0) return;
      const group = new THREE.Group();
      this._posicionarGrupoParede(group, wallId);
      this._adicionarObrasAoGrupo(group, fatia, wallId);
      this.scene.add(group);
      this.wallGroups.push({ group, wallId, obras: fatia });
    });
  }

  _criarParedeEstrutural(id, mat, w, h) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    mesh.receiveShadow = true;
    switch (id) {
      case 'back':   mesh.position.set(0, 0, -350); break;
      case 'front':  mesh.position.set(0, 0, 350); mesh.rotation.y = Math.PI; break;
      case 'left':   mesh.position.set(-350, 0, 0); mesh.rotation.y = -Math.PI / 2; break;
      case 'right':  mesh.position.set(350, 0, 0); mesh.rotation.y = Math.PI / 2; break;
    }
    this.scene.add(mesh);
  }

  _posicionarGrupoParede(group, wallId) {
    switch (wallId) {
      case 'back':   group.position.set(0, 0, -349); break;
      case 'front':  group.position.set(0, 0, 349); group.rotation.y = Math.PI; break;
      case 'left':   group.position.set(-349, 0, 0); group.rotation.y = -Math.PI / 2; break;
      case 'right':  group.position.set(349, 0, 0); group.rotation.y = Math.PI / 2; break;
    }
  }

  _adicionarObrasAoGrupo(group, obras, wallId) {
    const cols = Math.min(4, obras.length);
    const rows = Math.ceil(obras.length / cols);
    const spacingX = 150;
    const spacingY = 150;
    const offsetX = (cols - 1) * spacingX / 2;
    const offsetY = (rows - 1) * spacingY / 2;

    const corMoldura = this.ambienteAtual === 'branca' ? 0xd4a574 : this.ambienteAtual === 'classico' ? 0x8b4513 : 0x555555;
    const molduraMat = new THREE.MeshStandardMaterial({ color: corMoldura, roughness: 0.4, metalness: 0.3 });

    obras.forEach((obra, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const lx = col * spacingX - offsetX;
      const ly = -(row * spacingY - offsetY);

      const imgW = obra.dimensoes && obra.dimensoes.largura && obra.dimensoes.altura
        ? 80 : 80;
      const aspect = obra.dimensoes && obra.dimensoes.largura && obra.dimensoes.altura
        ? obra.dimensoes.largura / obra.dimensoes.altura
        : 0.75;
      const pw = imgW;
      const ph = imgW / Math.max(aspect, 0.1);

      const frameDepth = 3;
      const fbMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6 });
      const fb = new THREE.Mesh(new THREE.BoxGeometry(pw + 14, ph + 14, frameDepth), fbMat);
      fb.position.set(lx, ly, -1);
      fb.castShadow = true;
      group.add(fb);

      const borda = new THREE.Mesh(new THREE.BoxGeometry(pw + 18, ph + 18, 2), molduraMat);
      borda.position.set(lx, ly, 0.5);
      group.add(borda);

      const imgMat = new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 0, side: THREE.DoubleSide });
      const imgMesh = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), imgMat);
      imgMesh.position.set(lx, ly, 2);
      imgMesh.userData = { obra, index: this.obraMeshes.length };
      group.add(imgMesh);
      this.obraMeshes.push(imgMesh);
      this.obraData.push(obra);
      this._carregarTextura(imgMesh, obra.imagem);
    });
  }

  _carregarTextura(mesh, url) {
    if (!url || !mesh.material) return;
    const loader = new THREE.TextureLoader();
    loader.load(url, (tex) => {
      tex.encoding = THREE.sRGBEncoding;
      mesh.material.map = tex;
      mesh.material.needsUpdate = true;
    }, undefined, () => {});
  }

  _aplicarAmbiente() {
    if (!this.scene) return;
    this.scene.fog.color.setHex(this._corFundo());
    this.scene.fog.far = this.ambienteAtual === 'moderno' ? 1000 : 1400;
    this.renderer.setClearColor(this._corFundo());

    this._reconstruirSala();
  }

  _reconstruirSala() {
    this.wallGroups.forEach(wg => {
      this.scene.remove(wg.group);
      wg.group.traverse(c => { if (c.geometry) c.geometry.dispose(); if (c.material) c.material.dispose(); });
    });
    this.wallGroups = [];
    this.obraMeshes = [];
    this._construirSala();
  }

  _bindThreeEvents() {
    const canvas = this.renderer?.domElement;
    if (!canvas) return;

    canvas.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
      this.prevMouse = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isMouseDown) {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        return;
      }
      const dx = e.clientX - this.prevMouse.x;
      const dy = e.clientY - this.prevMouse.y;
      this.targetTheta -= dx * 0.005;
      this.targetPhi = Math.max(-0.8, Math.min(0.8, this.targetPhi + dy * 0.005));
      this.prevMouse = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      if (this.isMouseDown) {
        this.isMouseDown = false;
        this._checkClick();
      }
    });

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.targetDist = Math.max(this.minDist, Math.min(this.maxDist, this.targetDist + e.deltaY * 0.5));
    }, { passive: false });

    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isMouseDown = true;
        this.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.isMouseDown) {
        const dx = e.touches[0].clientX - this.prevMouse.x;
        const dy = e.touches[0].clientY - this.prevMouse.y;
        this.targetTheta -= dx * 0.005;
        this.targetPhi = Math.max(-0.8, Math.min(0.8, this.targetPhi + dy * 0.005));
        this.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      this.isMouseDown = false;
    }, { passive: true });
  }

  _checkClick() {
    if (!this.raycaster || !this.camera || !this.renderer) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(this.obraMeshes);
    if (hits.length > 0) {
      const data = hits[0].object.userData;
      if (data && data.obra && data.index !== undefined) {
        this.abrirZoom(data.index);
      }
    }
  }

  _onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w > 0 && h > 0) {
      this.renderer.setSize(w, h);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
  }

  // --- Tour ---
  toggleTour() {
    if (this.tourAtivo) { this.pararTour(); } else { this.iniciarTour(); }
  }

  iniciarTour() {
    if (this.obrasVisiveis.length === 0) return;
    this.tourAtivo = true;
    this.tourIndex = 0;
    this._mostrarHudTour(true);
    this._atualizarBotaoTour();
    this._focarObraTour(0);
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
      if (this.tourAtivo) this.tourProximo();
    }, this.tourDuracao * 1000);
  }

  _pararTimerTour() {
    if (this.tourInterval) { clearInterval(this.tourInterval); this.tourInterval = null; }
  }

  tourAnterior() {
    if (this.obrasVisiveis.length === 0) return;
    this.tourIndex = (this.tourIndex - 1 + this.obrasVisiveis.length) % this.obrasVisiveis.length;
    this._focarObraTour(this.tourIndex);
    if (this.tourAtivo) this._reiniciarTimerTour();
  }

  tourProximo() {
    if (this.obrasVisiveis.length === 0) return;
    this.tourIndex = (this.tourIndex + 1) % this.obrasVisiveis.length;
    if (this.tourIndex === 0 && this.tourAtivo) { this.pararTour(); return; }
    this._focarObraTour(this.tourIndex);
    if (this.tourAtivo) this._reiniciarTimerTour();
  }

  _reiniciarTimerTour() {
    if (this.tourAtivo) { this._pararTimerTour(); this._iniciarTimerTour(); }
  }

  _focarObraTour(idx) {
    if (idx < 0 || idx >= this.obraData.length) return;
    this.tourIndex = idx;
    const totalParedes = 4;
    const obrasPorParede = Math.ceil(this.obraData.length / totalParedes);
    const paredeIdx = Math.floor(idx / obrasPorParede);
    const angulos = [0, Math.PI / 2, -Math.PI / 2, Math.PI];
    this.targetTheta = angulos[Math.min(paredeIdx, 3)] || 0;
    this.targetPhi = 0.1;
    this.targetDist = 350;

    const prog = document.getElementById('tourProgresso');
    if (prog) prog.textContent = `${idx + 1} / ${this.obraData.length}`;
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
    if (idx < 0 || idx >= this.obraData.length) return;
    const images = this.obraData.map(o => ({
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
  destruirThree() {
    if (this.frameId) { cancelAnimationFrame(this.frameId); this.frameId = null; }
    if (this._boundResize) { window.removeEventListener('resize', this._boundResize); this._boundResize = null; }
    if (this.renderer) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
      this.renderer = null;
    }
    this.scene = null;
    this.camera = null;
    this.clock = null;
    this.raycaster = null;
    this.wallGroups = [];
    this.obraMeshes = [];
    this.obraData = [];
  }

  destruir() {
    this.pararTour();
    this.fecharZoom();
    this.destruirThree();
  }
}