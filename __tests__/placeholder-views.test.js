const {
  EncomendasView, ExposicoesView, FinanceiroView,
  GaleriaVirtualView, ReferenciasView,
  DataStore
} = require('../js/atelier-crm.js');

describe.each([
  ['EncomendasView', EncomendasView],
  ['ExposicoesView', ExposicoesView],
  ['FinanceiroView', FinanceiroView],
])('%s', (name, ViewClass) => {
  let ds, view;

  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    view = new ViewClass(ds, { navegar: jest.fn(), viewAtual: '' });
  });

  test('render retorna HTML', () => {
    const html = view.render();
    expect(html).toBeTruthy();
    expect(typeof html).toBe('string');
    expect(html.length).toBeGreaterThan(0);
  });

  test('render contém título da view', () => {
    const html = view.render();
    const expected = name.replace('View', '');
    const normalized = expected.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const htmlNorm = html.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    expect(htmlNorm).toContain(normalized);
  });

  test('aposRenderizar não lança erro', () => {
    document.getElementById('viewPrincipal').innerHTML = view.render();
    expect(() => view.aposRenderizar()).not.toThrow();
  });

  test('rerenderizar não lança erro', () => {
    document.getElementById('viewPrincipal').innerHTML = view.render();
    expect(() => view.rerenderizar()).not.toThrow();
  });
});

describe('GaleriaVirtualView', () => {
  let ds, view;

  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    view = new GaleriaVirtualView(ds, { navegar: jest.fn(), viewAtual: 'galeriaVirtual' });
  });

  test('render retorna HTML com título Galeria', () => {
    const html = view.render();
    expect(html).toContain('Galeria');
  });
});

describe('ReferenciasView', () => {
  let ds, view;

  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    view = new ReferenciasView(ds, { navegar: jest.fn(), viewAtual: 'referencias' });
  });

  test('render retorna HTML', () => {
    const html = view.render();
    expect(html).toBeTruthy();
  });
});
