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

  test('render contém abas de navegação', () => {
    const html = view.render();
    expect(html).toContain('Contatos');
    expect(html).toContain('Pipeline');
    expect(html).toContain('Mapa de Influencia');
  });

  test('renderContatos lista contatos de exemplo', () => {
    const html = view.renderContatos();
    expect(html).toContain('Ana Luísa Martins');
    expect(html).toContain('5 contato(s)');
  });

  test('renderContatos filtra por categoria', () => {
    view.filtroCategoria = 'galerista';
    const html = view.renderContatos();
    expect(html).toContain('Ana Luísa Martins');
    expect(html).toContain('1 contato(s)');
    expect(html).not.toContain('Dr. Ricardo Tavares');
  });

  test('renderContatos filtra por estágio', () => {
    view.filtroEstagio = 'parceria_ativa';
    const html = view.renderContatos();
    expect(html).toContain('Marta Silveira');
    expect(html).toContain('1 contato(s)');
  });

  test('renderCardContato mostra alerta de follow-up para contato antigo', () => {
    const c = { id: 'c1', nome: 'Ana', categoria: 'galerista', ultimoContato: '2025-01-01' };
    const hoje = new Date('2026-07-25');
    const html = view.renderCardContato(c, hoje);
    expect(html).toContain('dias sem contato');
  });

  test('renderCardContato não mostra alerta para contato recente', () => {
    const c = { id: 'c2', nome: 'Bob', categoria: 'galerista', ultimoContato: '2026-07-20' };
    const hoje = new Date('2026-07-25');
    const html = view.renderCardContato(c, hoje);
    expect(html).not.toContain('dias sem contato');
  });

  test('renderCardContato mostra tag VIP', () => {
    const c = { id: 'c3', nome: 'VIP', categoria: 'colecionador', vip: true };
    const hoje = new Date();
    const html = view.renderCardContato(c, hoje);
    expect(html).toContain('VIP');
  });

  test('renderPipeline mostra estágios com contagens', () => {
    const html = view.renderPipeline();
    expect(html).toContain('Novo Contato');
    expect(html).toContain('Parceria Ativa');
  });

  test('moverPipeline move contato de exemplo para estágio seguinte', () => {
    view.moverPipeline('cont_ex_3', 1);
    const c = ds.buscarPorId('contatosProfissionais', 'cont_ex_3');
    expect(c.estagio).toBe('primeira_aproximacao');
  });

  test('moverPipeline não move além do último estágio', () => {
    view.moverPipeline('cont_ex_4', 1);
    const c = ds.buscarPorId('contatosProfissionais', 'cont_ex_4');
    expect(c.estagio).toBe('colaboracao_consolidada');
  });

  test('renderInteracoes mostra prompt sem contato selecionado', () => {
    const html = view.renderInteracoes();
    expect(html).toContain('Selecione um contato');
  });

  test('renderTimelineContato mostra interações do contato de exemplo', () => {
    const html = view.renderTimelineContato('cont_ex_1');
    expect(html).toContain('Ana Luísa Martins');
    expect(html).toContain('Reuniao');
    expect(html).toContain('E-mail');
  });

  test('renderTimelineContato retorna vazio para contato sem interações', () => {
    const html = view.renderTimelineContato('cont_ex_3');
    expect(html).toContain('Carla Bergman');
    expect(html).toContain('Nenhuma interacao');
  });

  test('renderEventos mostra eventos de exemplo', () => {
    const html = view.renderEventos();
    expect(html).toContain('SP-Arte 2026');
    expect(html).toContain('Inscrito');
    expect(html).toContain('Edital Funarte');
  });

  test('renderMapa mostra HTML com SVG', () => {
    const html = view.renderMapa();
    expect(html).toContain('d3MapaSVG');
    expect(html).toContain('Exportar Relatorio PDF');
  });

  test('verificarLembretes não lança erro', () => {
    expect(() => view.verificarLembretes()).not.toThrow();
  });

  test('solicitarNotificacao não lança erro', () => {
    expect(() => view.solicitarNotificacao('teste', 'corpo')).not.toThrow();
  });

  test('exportarRelatorioPDF não lança sem jsPDF', () => {
    expect(() => view.exportarRelatorioPDF()).not.toThrow();
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
