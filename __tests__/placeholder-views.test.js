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

  test('render mostra "WebGL não disponível" quando threeReady é false', () => {
    obraStore().items = [{ id: 'o1', titulo: 'Teste', status: 'disponível', imagem: 'data:,img' }];
    view = new GaleriaVirtualView(ds, { navegar: jest.fn(), viewAtual: 'galeriaVirtual' });
    const html = view.render();
    expect(html).toContain('WebGL não disponível');
    expect(html).toContain('threeContainer');
  });

  test('_checkWebGL retorna false em jsdom', () => {
    expect(view._checkWebGL()).toBe(false);
  });

  test('toggleTour inicia quando parado', () => {
    view.obrasVisiveis = [{ id: 'o1' }];
    view.obraData = [{ id: 'o1' }];
    view.tourAtivo = false;
    view.toggleTour();
    expect(view.tourAtivo).toBe(true);
  });

  test('toggleTour para quando ativo', () => {
    view.obrasVisiveis = [{ id: 'o1' }];
    view.obraData = [{ id: 'o1' }];
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
    view.obrasVisiveis = [{ id: 'o1' }];
    view.obraData = [{ id: 'o1' }];
    view.iniciarTour();
    view.pararTour();
    expect(view.tourAtivo).toBe(false);
    expect(view.tourInterval).toBeNull();
  });

  test('tourAnterior navega ciclicamente', () => {
    view.obrasVisiveis = [{ id: 'o1' }, { id: 'o2' }];
    view.obraData = [{ id: 'o1' }, { id: 'o2' }];
    view.tourIndex = 0;
    view.tourAnterior();
    expect(view.tourIndex).toBe(1);
  });

  test('tourProximo navega e para ao completar ciclo', () => {
    view.obrasVisiveis = [{ id: 'o1' }, { id: 'o2' }];
    view.obraData = [{ id: 'o1' }, { id: 'o2' }];
    view.tourAtivo = true;
    view.tourIndex = 0;
    view.tourProximo();
    expect(view.tourIndex).toBe(1);
    view.tourProximo();
    expect(view.tourAtivo).toBe(false);
  });

  test('_focarObraTour atualiza progresso', () => {
    view.obrasVisiveis = [{ id: 'o1' }, { id: 'o2' }, { id: 'o3' }];
    view.obraData = [{ id: 'o1' }, { id: 'o2' }, { id: 'o3' }];
    view._focarObraTour(1);
    expect(view.tourIndex).toBe(1);
  });

  test('_focarObraTour é seguro com índice inválido', () => {
    view.obraData = [];
    expect(() => view._focarObraTour(5)).not.toThrow();
  });

  test('destruirThree não lança sem renderer', () => {
    expect(() => view.destruirThree()).not.toThrow();
  });

  test('destruir três chamadas seguras', () => {
    view.obrasVisiveis = [{ id: 'o1' }];
    view.obraData = [{ id: 'o1' }];
    expect(() => { view.destruir(); view.destruir(); view.destruir(); }).not.toThrow();
  });

  test('fecharZoom é seguro sem lightbox global', () => {
    expect(() => view.fecharZoom()).not.toThrow();
  });

  test('_onResize é seguro sem container', () => {
    expect(() => view._onResize()).not.toThrow();
  });

  test('_checkClick é seguro sem raycaster', () => {
    view.raycaster = null;
    expect(() => view._checkClick()).not.toThrow();
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
