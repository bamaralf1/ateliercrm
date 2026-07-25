const { DataStore } = require('../js/atelier-crm.js');

beforeEach(() => {
  localStorage.clear();
});

describe('DataStore', () => {
  test('cria instância e carrega exemplos', () => {
    const ds = new DataStore();
    expect(ds.listar('obras')).toHaveLength(5);
    expect(ds.listar('clientes')).toHaveLength(2); // exemplos
  });

  test('adiciona obra', () => {
    const ds = new DataStore();
    const obra = { titulo: 'Nova Obra', status: 'disponivel' };
    const salva = ds.adicionar('obras', obra);
    expect(salva.id).toBeTruthy();
    expect(salva.criadoEm).toBeTruthy();
    expect(ds.listar('obras')).toHaveLength(6);
  });

  test('atualiza obra existente pelo id', () => {
    const ds = new DataStore();
    const { id } = ds.listar('obras')[0];
    ds.atualizar('obras', id, { titulo: 'Atualizada' });
    expect(ds.buscarPorId('obras', id).titulo).toBe('Atualizada');
  });

  test('remove obra pelo id', () => {
    const ds = new DataStore();
    const { id } = ds.listar('obras')[0];
    ds.remover('obras', id);
    expect(ds.listar('obras')).toHaveLength(4);
  });

  test('persiste dados no localStorage', () => {
    const ds1 = new DataStore();
    const enc = ds1.adicionar('encomendas', { descricao: 'Retrato 40x50' });

    const ds2 = new DataStore();
    const lista = ds2.listar('encomendas');
    expect(lista.length).toBeGreaterThanOrEqual(3);
    expect(lista.find(e => e.descricao === 'Retrato 40x50')).toBeTruthy();
  });

  test('buscarPorId retorna obra específica', () => {
    const ds = new DataStore();
    const obra = ds.buscarPorId('obras', 'obra_ex_1');
    expect(obra).toBeTruthy();
    expect(obra.titulo).toBe('Marinha ao Entardecer');
    expect(ds.buscarPorId('obras', 'inexistente')).toBeUndefined();
  });
});