const { ThemeEngine, DataStore } = require('../js/atelier-crm.js');

describe('ThemeEngine', () => {
  let ds, engine;
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <header><button id="btnColapsar"></button><button id="btnBackup"></button></header>
      <div id="sidebar" class="colapsada"><ul id="navLista"></ul></div>
      <div id="viewPrincipal"></div>
      <div id="toast"></div>
      <div id="modalOverlay" class=""><div id="modalCaixa"></div></div>
      <select id="seletorTema"><option value="classico">Clássico</option><option value="escuro">Escuro</option></select>
    `;
    ds = new DataStore();
    engine = new ThemeEngine(ds);
  });

  test('construtor carrega tema padrão', () => {
    expect(engine.temaAtual).toBe('classico');
  });

  test('aplicarTema muda atributo data-tema no body', () => {
    engine.aplicarTema('escuro');
    expect(document.body.getAttribute('data-tema')).toBe('escuro');
    expect(engine.temaAtual).toBe('escuro');
  });

  test('aplicarTema persiste no DataStore', () => {
    engine.aplicarTema('vibrante');
    expect(ds.dados.config.tema).toBe('vibrante');
  });

  test('inicializar aplica tema e configura seletor', () => {
    engine.inicializar();
    expect(document.body.getAttribute('data-tema')).toBe('classico');
    const seletor = document.getElementById('seletorTema');
    expect(seletor.value).toBe('classico');
  });

  test('inicializar aplica configurações de contraste e fonte', () => {
    ds.dados.config.altoContraste = true;
    ds.dados.config.tamanhoFonte = 'grande';
    engine.inicializar();
    expect(document.body.getAttribute('data-high-contrast')).toBe('true');
    expect(document.body.getAttribute('data-font-size')).toBe('grande');
  });
});