const { VendasView, DataStore, StoreBridge, PDFGenerator } = require('../js/atelier-crm.js');

describe('VendasView', () => {
  let ds, view, pdfGen;

  beforeEach(() => {
    localStorage.clear();
    ds = new StoreBridge(new DataStore());
    pdfGen = new PDFGenerator(ds);
    view = new VendasView(ds, { navegar: jest.fn(), viewAtual: 'vendas' }, pdfGen);
  });

  test('construtor inicializa filtros', () => {
    expect(view.filtros).toEqual({ cliente: '', status: '', dataInicio: '', dataFim: '' });
  });

  test('vendasFiltradas retorna todas sem filtros', () => {
    expect(view.vendasFiltradas().length).toBeGreaterThanOrEqual(1);
  });

  test('vendasFiltradas filtra por cliente', () => {
    ds.adicionar('vendas', { clienteId: 'cli_1', status: 'paga', data: new Date().toISOString() });
    view.filtros.cliente = 'cli_1';
    expect(view.vendasFiltradas()).toHaveLength(1);
  });

  test('vendasFiltradas filtra por status', () => {
    ds.adicionar('vendas', { clienteId: 'cli_1', status: 'pendente', data: new Date().toISOString() });
    ds.adicionar('vendas', { clienteId: 'cli_2', status: 'paga', data: new Date().toISOString() });
    view.filtros.status = 'paga';
    const res = view.vendasFiltradas();
    expect(res.every(v => v.status === 'paga')).toBe(true);
  });

  test('render retorna HTML com título Vendas', () => {
    const html = view.render();
    expect(html).toContain('Vendas');
    expect(html).toContain('em negócios');
  });

  test('render mostra vendas quando existem', () => {
    ds.adicionar('vendas', { clienteId: 'cli_ex_1', precoFinal: 2000, status: 'paga', data: new Date().toISOString(), formaPagamento: 'à vista' });
    const html = view.render();
    expect(html).toContain('Fernanda');
  });
});
