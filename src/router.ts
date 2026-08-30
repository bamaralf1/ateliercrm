// Router — Controla a navegação entre views (SPA sem reload)

const SIDEBAR_GRUPOS = [
  { titulo: '', rotas: ['dashboard'] },
  { titulo: 'Gestão', rotas: ['catalogo', 'clientes', 'vendas', 'certificados', 'encomendas'] },
  { titulo: 'Criativo', rotas: ['diario', 'galeriaVirtual', 'referencias', 'exposicoes'] },
  { titulo: 'Negócios', rotas: ['precificador', 'financeiro', 'rede', 'atelier'] },
  { titulo: 'Sistema', rotas: ['configuracoes', 'exportar'] },
];

export class Router {
  constructor(dataStore) {
    this.dataStore = dataStore;
    this.viewAtual = 'dashboard';
    this.container = document.getElementById('viewPrincipal');

    this.rotas = {
      dashboard:    { rotulo: 'Dashboard',    icone: ICONES.dashboard, render: () => dashboardView.render(), aposRender: () => dashboardView.aposRenderizar() },
      portal:       { rotulo: 'Portal',       icone: ICONES.portal, render: () => portalView.render(), aposRender: () => portalView.aposRenderizar(), oculta: true },
      catalogo:     { rotulo: 'Catálogo',     icone: ICONES.catalogo, render: () => catalogoView.render(), aposRender: () => catalogoView.aposRenderizar() },
      clientes:     { rotulo: 'Clientes',     icone: ICONES.clientes, render: () => clientesView.render(), aposRender: () => clientesView.aposRenderizar() },
      vendas:       { rotulo: 'Vendas',       icone: ICONES.vendas, render: () => vendasView.render(), aposRender: () => vendasView.aposRenderizar() },
      certificados: { rotulo: 'Certificados', icone: ICONES.certificados, render: () => certificadosView.render(), aposRender: () => certificadosView.aposRenderizar() },
      referencias:  { rotulo: 'Referências',  icone: ICONES.referencias, render: () => referenciasView.render(), aposRender: () => referenciasView.aposRenderizar() },
      encomendas:   { rotulo: 'Encomendas',   icone: ICONES.encomendas, render: () => encomendasView.render(), aposRender: () => encomendasView.aposRenderizar() },
      exposicoes:   { rotulo: 'Exposições',   icone: ICONES.exposicoes, render: () => exposicoesView.render(), aposRender: () => exposicoesView.aposRenderizar() },
      galeriaVirtual:{ rotulo: 'Galeria Virtual',icone: ICONES.galeria, render: () => galeriaVirtualView.render(), aposRender: () => galeriaVirtualView.aposRenderizar() },
      precificador: { rotulo: 'Precificador', icone: ICONES.precificador, render: () => precificadorView.render(), aposRender: () => precificadorView.aposRenderizar() },
      atelier:      { rotulo: 'Atelier',      icone: ICONES.atelier, render: () => atelierView.render(), aposRender: () => atelierView.aposRenderizar() },
      diario:       { rotulo: 'Diário',      icone: ICONES.diario, render: () => diarioView.render(), aposRender: () => diarioView.aposRenderizar() },
      rede:         { rotulo: 'Rede',         icone: ICONES.rede, render: () => redeView.render(), aposRender: () => redeView.aposRenderizar() },
      financeiro:   { rotulo: 'Financeiro',   icone: ICONES.financeiro, render: () => financeiroView.render(), aposRender: () => financeiroView.aposRenderizar() },
      configuracoes:{ rotulo: 'Configurações',icone: ICONES.configuracoes, render: () => configuracoesView.render(), aposRender: () => configuracoesView.aposRenderizar() },
      exportar:     { rotulo: 'Exportar/Importar', icone: ICONES.exportar, render: () => exportImportView.render(), aposRender: () => exportImportView.aposRenderizar() }
    };
  }

  montarSidebar() {
    const navLista = document.getElementById('navLista');
    navLista.innerHTML = '';
    const sidebarColapsada = document.getElementById('sidebar')?.classList.contains('colapsada');

    SIDEBAR_GRUPOS.forEach(grupo => {
      const rotasVisiveis = grupo.rotas.filter(r => !this.rotas[r]?.oculta);
      if (rotasVisiveis.length === 0) return;

      if (grupo.titulo && !sidebarColapsada) {
        const sep = document.createElement('li');
        sep.className = 'nav-separador';
        sep.textContent = grupo.titulo;
        navLista.appendChild(sep);
      }

      rotasVisiveis.forEach(chave => {
        const rota = this.rotas[chave];
        const li = document.createElement('li');
        li.className = 'nav-item' + (chave === this.viewAtual ? ' ativo' : '');
        li.dataset.rota = chave;
        li.innerHTML = `<span class="icone">${rota.icone}</span><span class="rotulo">${rota.rotulo}</span>`;
        li.addEventListener('click', () => this.navegar(chave));
        navLista.appendChild(li);
      });
    });
  }

  navegar(chave) {
    if (!this.rotas[chave]) return;
    this.viewAtual = chave;
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('ativo', item.dataset.rota === chave);
    });
    this.container.style.opacity = '0';
    this.container.style.transform = 'translateY(4px)';
    // O conteúdo precisa estar disponível imediatamente para teclado, leitores
    // de tela e testes; apenas a animação é adiada para o próximo frame.
    this.container.innerHTML = this.rotas[chave].render();
    if (typeof this.rotas[chave].aposRender === 'function') this.rotas[chave].aposRender();
    requestAnimationFrame(() => {
      this.container.style.opacity = '1';
      this.container.style.transform = 'translateY(0)';
    });
    const bc = document.getElementById('breadcrumbAtual');
    if (bc) bc.textContent = this.rotas[chave].rotulo;
    if (window.innerWidth <= 860) { document.getElementById('sidebar').classList.add('colapsada'); }
    this.container.scrollTop = 0;
  }

  inicializar() {
    this.montarSidebar();
    this.navegar('dashboard');
  }
}
