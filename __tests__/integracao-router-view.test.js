const {
  Router, DataStore, StoreBridge, EventBus,
  CatalogoView, ClientesView, VendasView,
  renderizarDashboard
} = require('../js/atelier-crm.js');

describe('Integração Router ↔ Views', () => {
  let ds, router;

  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    router = new Router(ds);
  });

  test('navegar para catalogo renderiza Catálogo', () => {
    router.navegar('catalogo');
    expect(document.getElementById('viewPrincipal').innerHTML).toContain('Catálogo de Obras');
  });

  test('navegar para clientes renderiza Clientes', () => {
    router.navegar('clientes');
    expect(document.getElementById('viewPrincipal').innerHTML).toContain('Clientes');
  });

  test('navegar para dashboard renderiza visão geral', () => {
    router.navegar('dashboard');
    expect(document.getElementById('viewPrincipal').innerHTML).toContain('Visão geral');
  });

  test('navegação sequencial alterna conteúdo', () => {
    router.navegar('catalogo');
    expect(document.getElementById('viewPrincipal').innerHTML).toContain('Catálogo de Obras');

    router.navegar('clientes');
    expect(document.getElementById('viewPrincipal').innerHTML).toContain('Clientes');

    router.navegar('dashboard');
    expect(document.getElementById('viewPrincipal').innerHTML).toContain('Visão geral');
  });

  test('router.viewAtual reflete última navegação', () => {
    router.navegar('clientes');
    expect(router.viewAtual).toBe('clientes');
    router.navegar('catalogo');
    expect(router.viewAtual).toBe('catalogo');
  });

  test('navegar para rota inexistente mantém view atual', () => {
    router.navegar('clientes');
    router.navegar('rota_inexistente');
    expect(router.viewAtual).toBe('clientes');
  });
});

describe('Integração DataStore ↔ Views', () => {
  let ds, catalogoView;

  beforeEach(() => {
    localStorage.clear();
    ds = new StoreBridge(new DataStore());
    catalogoView = new CatalogoView(ds, { navegar: jest.fn(), viewAtual: 'catalogo' });
  });

  test('adicionar obra reflete na renderização', () => {
    document.getElementById('viewPrincipal').innerHTML = catalogoView.render();
    expect(document.getElementById('viewPrincipal').textContent).toContain('5 obras encontradas');

    ds.adicionar('obras', {
      titulo: 'Obra Teste Integração',
      status: 'disponivel',
      tecnica: 'outra',
      ano: 2026,
      dimensoes: { altura: 10, largura: 10 }
    });
    document.getElementById('viewPrincipal').innerHTML = catalogoView.render();
    expect(document.getElementById('viewPrincipal').textContent).toContain('6 obras encontradas');
    expect(document.getElementById('viewPrincipal').textContent).toContain('Obra Teste Integração');
  });

  test('remover obra some do catálogo após rerenderizar', () => {
    const obras = ds.listar('obras');
    const tituloRemovido = obras[0].titulo;
    ds.remover('obras', obras[0].id);
    document.getElementById('viewPrincipal').innerHTML = catalogoView.render();
    expect(document.getElementById('viewPrincipal').textContent).not.toContain(tituloRemovido);
  });

  test('adicionar cliente aparece na VendasView', () => {
    const vendasView = new VendasView(ds, { navegar: jest.fn(), viewAtual: 'vendas' }, null);
    ds.adicionar('clientes', { id: 'cli_int_1', nome: 'Cliente Integração', email: 'test@test.com' });
    ds.adicionar('vendas', { clienteId: 'cli_int_1', precoFinal: 500, status: 'paga', data: new Date().toISOString(), formaPagamento: 'à vista' });
    document.getElementById('viewPrincipal').innerHTML = vendasView.render();
    expect(document.getElementById('viewPrincipal').textContent).toContain('Cliente Integração');
  });
});
