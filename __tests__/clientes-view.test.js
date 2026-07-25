const { ClientesView, DataStore, StoreBridge, EventBus } = require('../js/atelier-crm.js');

describe('ClientesView', () => {
  let ds, view, router;

  beforeEach(() => {
    localStorage.clear();
    ds = new StoreBridge(new DataStore());
    router = { navegar: jest.fn(), viewAtual: 'clientes' };
    view = new ClientesView(ds, router);
  });

  test('construtor inicializa busca vazia', () => {
    expect(view.busca).toBe('');
  });

  test('clientesFiltrados retorna todos sem filtro', () => {
    expect(view.clientesFiltrados()).toHaveLength(2);
  });

  test('clientesFiltrados filtra por nome', () => {
    view.busca = 'fernanda';
    const res = view.clientesFiltrados();
    expect(res.length).toBeGreaterThan(0);
    expect(res.every(c => c.nome.toLowerCase().includes('fernanda'))).toBe(true);
  });

  test('clientesFiltrados retorna vazio para busca sem resultado', () => {
    view.busca = 'zzzzz';
    expect(view.clientesFiltrados()).toHaveLength(0);
  });

  test('clientesFiltrados ordena alfabeticamente', () => {
    const res = view.clientesFiltrados();
    for (let i = 1; i < res.length; i++) {
      expect(res[i - 1].nome.localeCompare(res[i].nome)).toBeLessThanOrEqual(0);
    }
  });

  test('comprasDoCliente retorna vendas do cliente', () => {
    const cliente = ds.listar('clientes')[0];
    const compras = view.comprasDoCliente(cliente.id);
    expect(Array.isArray(compras)).toBe(true);
  });

  test('render retorna HTML com título Clientes', () => {
    const html = view.render();
    expect(html).toContain('Clientes');
    expect(html).toContain('aquisição no total');
  });

  test('render mostra tabela com clientes', () => {
    const html = view.render();
    expect(html).toContain('<table>');
    expect(html).toContain('Fernanda');
  });

  test('render mostra estado vazio sem clientes', () => {
    ds.remover('clientes', ds.listar('clientes')[0].id);
    ds.remover('clientes', ds.listar('clientes')[0].id);
    const html = view.render();
    expect(html).toContain('Nenhum cliente encontrado');
  });

  test('excluirCliente bloqueia exclusão com vendas', () => {
    const cliente = ds.listar('clientes')[0];
    ds.adicionar('vendas', { clienteId: cliente.id });
    view.excluirCliente(cliente.id);
    expect(ds.buscarPorId('clientes', cliente.id)).toBeTruthy();
  });

  test('excluirCliente remove cliente sem vendas', () => {
    global.confirm = jest.fn(() => true);
    const cliente = ds.listar('clientes')[1];
    view.excluirCliente(cliente.id);
    expect(ds.buscarPorId('clientes', cliente.id)).toBeUndefined();
  });

  test('aposRenderizar não lança erro', () => {
    document.getElementById('viewPrincipal').innerHTML = view.render();
    expect(() => view.aposRenderizar()).not.toThrow();
  });
});
