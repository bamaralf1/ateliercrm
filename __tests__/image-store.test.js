// Testes para ImageStore (IDB)
const { DataStore } = require('../js/atelier-crm.js');

beforeEach(() => {
  localStorage.clear();
  window.imageStore = undefined;
});

describe('ImageStore', () => {
  test('window.imageStore está disponível', () => {
    require('../js/atelier-crm.js');
    expect(window.imageStore).toBeDefined();
    expect(typeof window.imageStore.salvar).toBe('function');
    expect(typeof window.imageStore.carregar).toBe('function');
    expect(typeof window.imageStore.remover).toBe('function');
    expect(typeof window.imageStore.migrar).toBe('function');
  });

  test('salvar retorna referência idb:', async () => {
    require('../js/atelier-crm.js');
    // pixel 1x1 PNG base64
    const tinyPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const ref = await window.imageStore.salvar(tinyPng);
    expect(ref.id).toMatch(/^idb:/);
    expect(ref.thumb).toMatch(/^idb:.*:thumb$/);
    expect(ref.medium).toMatch(/^idb:.*:medium$/);
    expect(ref.full).toMatch(/^idb:.*:full$/);
  });

  test('carregar retorna blob URL para referência idb:', async () => {
    require('../js/atelier-crm.js');
    const tinyPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const ref = await window.imageStore.salvar(tinyPng);
    const url = await window.imageStore.carregar(ref.medium);
    expect(url).toMatch(/^blob:/);
    window.imageStore.liberarTodas();
  });

  test('carregar retorna vazio para referência inválida', async () => {
    require('../js/atelier-crm.js');
    const result = await window.imageStore.carregar('idb:inexistente:thumb');
    expect(result).toBe('');
  });

  test('carregar retorna string base64 sem alteração', async () => {
    require('../js/atelier-crm.js');
    const dataUrl = 'data:image/png;base64,abc123';
    const result = await window.imageStore.carregar(dataUrl);
    expect(result).toBe(dataUrl);
  });

  test('migrar converte imagens base64 de obras para idb:', async () => {
    require('../js/atelier-crm.js');
    const tinyPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const obras = [
      { imagem: tinyPng, imagens: [tinyPng], imagemDestacada: tinyPng },
      { imagem: 'idb:existente:full', imagens: [], imagemDestacada: '' }
    ];
    const count = await window.imageStore.migrar(obras);
    expect(count).toBe(3); // imagem + imagens[0] + imagemDestacada
    expect(obras[0].imagem).toMatch(/^idb:/);
    expect(obras[0].imagens[0]).toMatch(/^idb:/);
    expect(obras[0].imagemDestacada).toMatch(/^idb:/);
    expect(obras[1].imagem).toBe('idb:existente:full'); // não migrada
  });

  test('migrar ignora imagens já em idb:', async () => {
    require('../js/atelier-crm.js');
    const obras = [
      { imagem: 'idb:abc123:full', imagens: ['idb:abc123:thumb'], imagemDestacada: 'idb:abc123:medium' }
    ];
    const count = await window.imageStore.migrar(obras);
    expect(count).toBe(0);
  });

  test('liberar libera blob URL', async () => {
    require('../js/atelier-crm.js');
    const tinyPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const ref = await window.imageStore.salvar(tinyPng);
    await window.imageStore.carregar(ref.medium);
    window.imageStore.liberar(ref.medium);
    // Após liberar, cache deve estar vazio
    const url2 = await window.imageStore.carregar(ref.medium);
    expect(url2).toMatch(/^blob:/); // recarrega do IDB
    window.imageStore.liberarTodas();
  });
});
