const { CatalogoView, DataStore, StoreBridge, EventBus } = require('../js/atelier-crm.js');

describe('CatalogoView', () => {
  let ds, view, eventBus;

  beforeEach(() => {
    localStorage.clear();
    ds = new StoreBridge(new DataStore());
    eventBus = new EventBus();
    view = new CatalogoView(ds, { navigate: jest.fn(), viewAtual: 'catalogo' });
  });

  test('construtor inicializa estado padrão', () => {
    expect(view.modo).toBe('grid');
    expect(view.filtros).toEqual({ busca: '', tecnica: '', status: '', ano: '', precoMin: '', precoMax: '', ordenar: 'recentes' });
    expect(view.selecionados).toBeInstanceOf(Set);
    expect(view.selecionados.size).toBe(0);
  });

  test('obrasFiltradas retorna todas as obras sem filtros', () => {
    const resultado = view.obrasFiltradas();
    expect(resultado).toHaveLength(5);
  });

  test('obrasFiltradas filtra por busca no título', () => {
    view.filtros.busca = 'marinha';
    const resultado = view.obrasFiltradas();
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every(o => o.titulo.toLowerCase().includes('marinha'))).toBe(true);
  });

  test('obrasFiltradas retorna vazio para busca sem resultado', () => {
    view.filtros.busca = 'zzzzzz';
    expect(view.obrasFiltradas()).toHaveLength(0);
  });

  test('obrasFiltradas filtra por técnica', () => {
    view.filtros.tecnica = 'óleo';
    const resultado = view.obrasFiltradas();
    expect(resultado.every(o => o.tecnica === 'óleo')).toBe(true);
  });

  test('obrasFiltradas filtra por status', () => {
    view.filtros.status = 'disponível';
    const resultado = view.obrasFiltradas();
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every(o => view.dataStore.dados.obras.find(ow => ow.id === o.id).status === 'disponível')).toBe(true);
  });

  test('obrasFiltradas ordena por mais recentes por padrão', () => {
    const resultado = view.obrasFiltradas();
    for (let i = 1; i < resultado.length; i++) {
      const d1 = new Date(resultado[i - 1].dataCadastro || resultado[i - 1].criadoEm || 0);
      const d2 = new Date(resultado[i].dataCadastro || resultado[i].criadoEm || 0);
      expect(d1.getTime()).toBeGreaterThanOrEqual(d2.getTime());
    }
  });

  test('anosDisponiveis retorna anos únicos ordenados decrescente', () => {
    const anos = view.anosDisponiveis();
    expect(anos.length).toBeGreaterThan(0);
    for (let i = 1; i < anos.length; i++) {
      expect(anos[i - 1]).toBeGreaterThanOrEqual(anos[i]);
    }
  });

  test('render retorna HTML com título Catálogo de Obras', () => {
    const html = view.render();
    expect(html).toContain('Catálogo de Obras');
    expect(html).toContain('obras encontradas');
  });

  test('render mostra grid por padrão', () => {
    const html = view.render();
    expect(html).toContain('grid-obras');
    expect(html).not.toContain('lista-obras-wrapper');
  });

  test('render mostra lista quando modo é lista', () => {
    view.modo = 'lista';
    const html = view.render();
    expect(html).toContain('lista-obras-wrapper');
    expect(html).not.toContain('grid-obras');
  });

  test('render mostra estado vazio quando nenhuma obra encontrada', () => {
    view.filtros.busca = 'zzzzzz';
    const html = view.render();
    expect(html).toContain('Nenhuma obra encontrada');
  });

  test('render mostra bulk actions quando há selecionados', () => {
    const obra = ds.listar('obras')[0];
    view.selecionados.add(obra.id);
    const html = view.render();
    expect(html).toContain('selecionada');
  });

  test('render não mostra bulk actions sem selecionados', () => {
    const html = view.render();
    expect(html).not.toContain('bulk-actions-bar');
  });

  test('formatarDimensoes formata corretamente', () => {
    expect(view.formatarDimensoes({ altura: 60, largura: 80 })).toBe('60 x 80 cm');
    expect(view.formatarDimensoes({ altura: 45, largura: 22, profundidade: 20 })).toBe('45 x 22 x 20 cm');
    expect(view.formatarDimensoes({})).toBe('-');
    expect(view.formatarDimensoes(null)).toBe('-');
  });

  test('bulkAcao favoritar marca obras como favoritas', () => {
    const obras = ds.listar('obras').slice(0, 2);
    obras.forEach(o => view.selecionados.add(o.id));
    view.bulkAcao('favoritar');
    obras.forEach(o => {
      const atualizada = ds.buscarPorId('obras', o.id);
      expect(atualizada.favorita).toBe(true);
    });
    expect(view.selecionados.size).toBe(0);
  });

  test('bulkAcao desfavoritar desmarca obras favoritas', () => {
    const obras = ds.listar('obras').slice(0, 2);
    obras.forEach(o => {
      const obra = ds.buscarPorId('obras', o.id);
      obra.favorita = true;
      ds.atualizar('obras', o.id, obra);
      view.selecionados.add(o.id);
    });
    view.bulkAcao('desfavoritar');
    obras.forEach(o => {
      const atualizada = ds.buscarPorId('obras', o.id);
      expect(atualizada.favorita).toBe(false);
    });
  });

  test('bulkAcao excluir remove obras selecionadas', async () => {
    const obras = ds.listar('obras').slice(0, 2);
    const ids = obras.map(o => o.id);
    ids.forEach(id => view.selecionados.add(id));
    const exclusao = view.bulkAcao('excluir');
    document.getElementById('btnConfirmarAcao').click();
    await exclusao;
    ids.forEach(id => {
      expect(ds.buscarPorId('obras', id)).toBeUndefined();
    });
    expect(ds.listar('obras')).toHaveLength(3);
  });

  test('bulkAcao nao faz nada sem selecionados', () => {
    const len = ds.listar('obras').length;
    view.bulkAcao('favoritar');
    expect(ds.listar('obras')).toHaveLength(len);
  });

  test('aposRenderizar não lança erro sem elementos no DOM', () => {
    document.getElementById('viewPrincipal').innerHTML = view.render();
    expect(() => view.aposRenderizar()).not.toThrow();
  });

  test('toggle modo grid/lista via aposRenderizar', () => {
    document.getElementById('viewPrincipal').innerHTML = view.render();
    view.aposRenderizar();
    const btnLista = document.getElementById('btnModoLista');
    expect(btnLista).toBeTruthy();
    btnLista.click();
    expect(view.modo).toBe('lista');
  });
});
