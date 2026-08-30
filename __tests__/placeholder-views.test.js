const {
  EncomendasView, ExposicoesView, FinanceiroView,
  GaleriaVirtualView, ReferenciasView,
  DataStore, obraStore
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

  test('carregarObras filtra obras disponíveis/expostas das de exemplo', () => {
    view.carregarObras();
    const titulos = view.obrasVisiveis.map(o => o.titulo);
    expect(titulos).toContain('Marinha ao Entardecer');
    expect(titulos).toContain('Ipê Amarelo');
    expect(titulos).not.toContain('Autorretrato em Ocre');
  });

  test('carregarObras retorna até 20 obras', () => {
    view.carregarObras();
    expect(view.obrasVisiveis.length).toBeLessThanOrEqual(20);
  });

  test('carregarObras aceita obra sem status com imagem como fallback', () => {
    const store = obraStore();
    store.items = [{ id: 'v1', titulo: 'Sem status', imagem: 'data:,img' }];
    view.carregarObras();
    const titulos = view.obrasVisiveis.map(o => o.titulo);
    expect(titulos).toContain('Sem status');
  });

  test('carregarObras exclui obra sem imagem', () => {
    const store = obraStore();
    store.items = [{ id: 'o1', titulo: 'Sem img', status: 'disponível' }];
    view.carregarObras();
    expect(view.obrasVisiveis.length).toBe(0);
  });

  test('render mostra estado vazio se obraStore vazio', () => {
    const store = obraStore();
    store.items = [];
    const html = view.render();
    expect(html).toContain('Adicione obras com imagem');
    expect(html).toContain('Ir para Catálogo');
  });

  test('render mostra slideshow 2D com obra visível', () => {
    obraStore().items = [{ id: 'o1', titulo: 'Teste', status: 'disponível', imagem: 'data:,img' }];
    view = new GaleriaVirtualView(ds, { navegar: jest.fn(), viewAtual: 'galeriaVirtual' });
    const html = view.render();
    expect(html).toContain('gv-slide-container');
    expect(html).toContain('gvImagem');
    expect(html).toContain('gv-thumbstrip');
    expect(html).toContain('Teste');
  });

  test('toggleTour inicia quando parado', () => {
    view.obrasVisiveis = [{ id: 'o1', titulo: 't', imagem: 'data:,img' }];
    view.tourAtivo = false;
    view.toggleTour();
    expect(view.tourAtivo).toBe(true);
  });

  test('toggleTour para quando ativo', () => {
    view.obrasVisiveis = [{ id: 'o1', titulo: 't', imagem: 'data:,img' }];
    view.tourAtivo = true;
    view.toggleTour();
    expect(view.tourAtivo).toBe(false);
  });

  test('iniciarTour não faz nada sem obras visíveis', () => {
    view.obrasVisiveis = [];
    view.iniciarTour();
    expect(view.tourAtivo).toBe(false);
  });

  test('pararTour limpa timer e estado', () => {
    view.obrasVisiveis = [{ id: 'o1', titulo: 't', imagem: 'data:,img' }];
    view.iniciarTour();
    view.pararTour();
    expect(view.tourAtivo).toBe(false);
    expect(view.tourInterval).toBeNull();
  });

  test('anterior navega ciclicamente', () => {
    view.obrasVisiveis = [{ id: 'o1', titulo: 't' }, { id: 'o2', titulo: 't' }];
    view.indiceAtual = 0;
    view.anterior();
    expect(view.indiceAtual).toBe(1);
  });

  test('proximo navega ciclicamente sem parar tour', () => {
    view.obrasVisiveis = [{ id: 'o1', titulo: 't' }, { id: 'o2', titulo: 't' }];
    view.tourAtivo = true;
    view.indiceAtual = 0;
    view.proximo();
    expect(view.indiceAtual).toBe(1);
    view.proximo();
    expect(view.indiceAtual).toBe(0);
    expect(view.tourAtivo).toBe(true);
  });

  test('tourAnterior navega ciclicamente', () => {
    view.obrasVisiveis = [{ id: 'o1', titulo: 't' }, { id: 'o2', titulo: 't' }];
    view.indiceAtual = 0;
    view.tourAnterior();
    expect(view.indiceAtual).toBe(1);
  });

  test('tourProximo navega e para ao completar ciclo', () => {
    view.obrasVisiveis = [{ id: 'o1', titulo: 't' }, { id: 'o2', titulo: 't' }];
    view.tourAtivo = true;
    view.indiceAtual = 0;
    view.tourProximo();
    expect(view.indiceAtual).toBe(1);
    view.tourProximo();
    expect(view.tourAtivo).toBe(false);
  });

  test('_aplicarZoom limita entre mínimo e máximo', () => {
    view._aplicarZoom(10);
    expect(view.zoomNivel).toBe(view.zoomMax);
    view._aplicarZoom(0.1);
    expect(view.zoomNivel).toBe(view.zoomMin);
    view._aplicarZoom(2);
    expect(view.zoomNivel).toBe(2);
  });

  test('destruir é seguro com múltiplas chamadas', () => {
    view.obrasVisiveis = [{ id: 'o1', titulo: 't', imagem: 'data:,img' }];
    expect(() => { view.destruir(); view.destruir(); view.destruir(); }).not.toThrow();
  });

  test('fecharZoom é seguro sem lightbox global', () => {
    expect(() => view.fecharZoom()).not.toThrow();
  });

  test('aposRenderizar não lança quando não há obras', () => {
    const store = obraStore();
    store.items = [];
    expect(() => view.aposRenderizar()).not.toThrow();
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
