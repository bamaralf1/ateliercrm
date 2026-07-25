const { Router, DataStore } = require('../js/atelier-crm.js');

describe('Router', () => {
  let ds, router;
  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    router = new Router(ds);
  });

  test('construtor define viewAtual como dashboard', () => {
    expect(router.viewAtual).toBe('dashboard');
  });

  test('construtor armazena container', () => {
    expect(router.container).toBe(document.getElementById('viewPrincipal'));
  });

  test('rotas possui todas as chaves esperadas', () => {
    const esperadas = ['dashboard', 'portal', 'catalogo', 'clientes', 'vendas', 'certificados',
      'referencias', 'encomendas', 'exportar', 'exposicoes', 'galeriaVirtual', 'precificador',
      'atelier', 'diario', 'rede', 'financeiro', 'configuracoes'];
    expect(Object.keys(router.rotas).sort()).toEqual(esperadas.sort());
  });

  test('navegar para rota inexistente não altera view', () => {
    router.navegar('inexistente');
    expect(router.viewAtual).toBe('dashboard');
  });

  test('navegar altera viewAtual e conteúdo do container', () => {
    router.navegar('catalogo');
    expect(router.viewAtual).toBe('catalogo');
    expect(router.container.innerHTML.length).toBeGreaterThan(0);
  });
});