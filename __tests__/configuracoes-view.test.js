const { ConfiguracoesView, DataStore, useConfigStore } = require('../js/atelier-crm.js');

describe('ConfiguracoesView', () => {
  let ds, view;

  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    view = new ConfiguracoesView(ds, { navegar: jest.fn(), viewAtual: 'configuracoes' });
    useConfigStore().artista = { nome: '', email: '', telefone: '' };
    useConfigStore().pin = '';
  });

  test('render retorna HTML com seções de configuração', () => {
    const html = view.render();
    expect(html).toContain('Configurações');
    expect(html).toContain('Perfil do Artista');
    expect(html).toContain('Idioma');
    expect(html).toContain('Acessibilidade');
    expect(html).toContain('Segurança');
  });

  test('render preenche valores do artista', () => {
    useConfigStore().artista = { nome: 'João', email: 'joao@arte.com', telefone: '(11) 99999-8888' };
    const html = view.render();
    expect(html).toContain('João');
    expect(html).toContain('joao@arte.com');
  });

  test('_salvar persiste configurações no configStore', () => {
    document.getElementById('viewPrincipal').innerHTML = view.render();
    view.aposRenderizar();
    document.getElementById('cfgNome').value = 'Maria Artista';
    document.getElementById('cfgEmail').value = 'maria@arte.com';
    view._salvar();
    expect(useConfigStore().artista.nome).toBe('Maria Artista');
    expect(useConfigStore().artista.email).toBe('maria@arte.com');
  });

  test('_salvarPin valida PIN de 4 dígitos', () => {
    document.getElementById('viewPrincipal').innerHTML = view.render();
    view.aposRenderizar();
    document.getElementById('cfgPin').value = '1234';
    view._salvarPin();
    expect(useConfigStore().pin).toBe('1234');
  });

  test('_salvarPin rejeita PIN inválido', () => {
    document.getElementById('viewPrincipal').innerHTML = view.render();
    view.aposRenderizar();
    document.getElementById('cfgPin').value = '12';
    view._salvarPin();
    expect(useConfigStore().pin).toBeFalsy();
  });

  test('_removerPin limpa PIN após confirmação', () => {
    global.confirm = jest.fn(() => true);
    useConfigStore().pin = '1234';
    view._removerPin();
    expect(useConfigStore().pin).toBe('');
  });

  test('aposRenderizar não lança erro', () => {
    document.getElementById('viewPrincipal').innerHTML = view.render();
    expect(() => view.aposRenderizar()).not.toThrow();
  });
});
