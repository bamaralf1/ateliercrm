const {
  CertificadosView, PrecificadorView, AtelierView, RedeView, DiarioView,
  DataStore, PDFGenerator
} = require('../js/atelier-crm.js');

describe('CertificadosView', () => {
  let ds, view, pdfGen;

  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    pdfGen = new PDFGenerator(ds);
    view = new CertificadosView(ds, { navegar: jest.fn(), viewAtual: 'certificados' }, pdfGen);
  });

  test('render retorna HTML com título Certificados', () => {
    const html = view.render();
    expect(html).toContain('Certificados');
  });

  test('render lista certificados emitidos', () => {
    const html = view.render();
    expect(html).toContain('Certificados de Autenticidade');
    expect(html).toContain('certificado emitido');
  });
});

describe('PrecificadorView', () => {
  let ds, view;

  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    view = new PrecificadorView(ds, { navegar: jest.fn(), viewAtual: 'precificador' });
  });

  test('render retorna HTML com Calculadora', () => {
    const html = view.render();
    expect(html).toContain('Calculadora de Preço');
  });

  test('render contém campos de custo', () => {
    const html = view.render();
    expect(html).toContain('Custo materiais');
    expect(html).toContain('Horas trabalhadas');
  });
});

describe('AtelierView', () => {
  let ds, view;

  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    view = new AtelierView(ds, { navegar: jest.fn(), viewAtual: 'atelier' });
  });

  test('render retorna HTML', () => {
    const html = view.render();
    expect(html).toBeTruthy();
  });
});

describe('RedeView', () => {
  let ds, view;

  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    view = new RedeView(ds, { navegar: jest.fn(), viewAtual: 'rede' });
  });

  test('render retorna HTML', () => {
    const html = view.render();
    expect(html).toBeTruthy();
  });
});

describe('DiarioView', () => {
  let ds, view;

  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    view = new DiarioView(ds, { navegar: jest.fn(), viewAtual: 'diario' });
  });

  test('render retorna HTML', () => {
    const html = view.render();
    expect(html).toBeTruthy();
  });
});
