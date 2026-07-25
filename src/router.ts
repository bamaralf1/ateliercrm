// Router — Controla a navegação entre views (SPA sem reload)

export class Router {
  constructor(dataStore) {
    this.dataStore = dataStore;
    this.viewAtual = 'dashboard';
    this.container = document.getElementById('viewPrincipal');

    this.rotas = {
      dashboard:    { rotulo: 'Dashboard',    icone: '📊', render: () => dashboardView.render(), aposRender: () => dashboardView.aposRenderizar() },
      portal:       { rotulo: 'Portal',       icone: '🔗', render: () => portalView.render(), aposRender: () => portalView.aposRenderizar(), oculta: true },
      catalogo:     { rotulo: 'Catálogo',     icone: '🖼️', render: () => catalogoView.render(), aposRender: () => catalogoView.aposRenderizar() },
      clientes:     { rotulo: 'Clientes',     icone: '👤', render: () => clientesView.render(), aposRender: () => clientesView.aposRenderizar() },
      vendas:       { rotulo: 'Vendas',       icone: '💰', render: () => vendasView.render(), aposRender: () => vendasView.aposRenderizar() },
      certificados: { rotulo: 'Certificados', icone: '📜', render: () => certificadosView.render(), aposRender: () => certificadosView.aposRenderizar() },
      referencias:  { rotulo: 'Referências',  icone: '📚', render: () => referenciasView.render(), aposRender: () => referenciasView.aposRenderizar() },
      encomendas:   { rotulo: 'Encomendas',   icone: '📦', render: () => encomendasView.render(), aposRender: () => encomendasView.aposRenderizar() },
      exposicoes:   { rotulo: 'Exposições',   icone: '🏛️', render: () => exposicoesView.render(), aposRender: () => exposicoesView.aposRenderizar() },
      galeriaVirtual:{ rotulo: 'Galeria Virtual',icone: '🥽', render: () => galeriaVirtualView.render(), aposRender: () => galeriaVirtualView.aposRenderizar() },
      precificador: { rotulo: 'Precificador', icone: '💎', render: () => precificadorView.render(), aposRender: () => precificadorView.aposRenderizar() },
      atelier:      { rotulo: 'Atelier',      icone: '🔧', render: () => atelierView.render(), aposRender: () => atelierView.aposRenderizar() },
      diario:       { rotulo: 'Diário',      icone: '📖', render: () => diarioView.render(), aposRender: () => diarioView.aposRenderizar() },
      rede:         { rotulo: 'Rede',         icone: '🤝', render: () => redeView.render(), aposRender: () => redeView.aposRenderizar() },
      financeiro:   { rotulo: 'Financeiro',   icone: '📈', render: () => financeiroView.render(), aposRender: () => financeiroView.aposRenderizar() },
      configuracoes:{ rotulo: 'Configurações',icone: '⚙️', render: () => configuracoesView.render(), aposRender: () => configuracoesView.aposRenderizar() },
      exportar:     { rotulo: 'Exportar/Importar', icone: '📦', render: () => exportImportView.render(), aposRender: () => exportImportView.aposRenderizar() }
    };
  }

  montarSidebar() {
    const navLista = document.getElementById('navLista');
    navLista.innerHTML = '';
    Object.entries(this.rotas).forEach(([chave, rota]) => {
      if (rota.oculta) return;
      const li = document.createElement('li');
      li.className = 'nav-item' + (chave === this.viewAtual ? ' ativo' : '');
      li.dataset.rota = chave;
      li.innerHTML = `<span class="icone">${rota.icone}</span><span class="rotulo">${rota.rotulo}</span>`;
      li.addEventListener('click', () => this.navegar(chave));
      navLista.appendChild(li);
    });
  }

  navegar(chave) {
    if (!this.rotas[chave]) return;
    this.viewAtual = chave;
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('ativo', item.dataset.rota === chave);
    });
    this.container.innerHTML = this.rotas[chave].render();
    if (typeof this.rotas[chave].aposRender === 'function') {
      this.rotas[chave].aposRender();
    }
    if (window.innerWidth <= 860) { document.getElementById('sidebar').classList.add('colapsada'); }
    this.container.scrollTop = 0;
  }

  inicializar() {
    this.montarSidebar();
    this.navegar('dashboard');
  }
}
