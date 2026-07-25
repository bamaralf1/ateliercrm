const {
  PortalView, CloudSync, ImageLightbox, abrirLightbox, DataStore, gerarImagemPlaceholder
} = require('../js/atelier-crm.js');

describe('PortalView', () => {
  let ds, view, router;

  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    router = { navegar: jest.fn(), viewAtual: 'portal' };
    view = new PortalView(ds, router);
    window.location.hash = '';
  });

  test('render retorna erro sem token', () => {
    const html = view.render();
    expect(html).toContain('Link inválido');
  });

  test('render retorna acesso negado com token inválido', () => {
    window.location.hash = '#portal?token=invalido';
    const html = view.render();
    expect(html).toContain('Acesso não autorizado');
  });

  test('render mostra encomendas com token válido', () => {
    ds.adicionar('portais', { id: 'p1', token: 'abc123', ativo: true, clienteId: 'c1', clienteNome: 'Maria' });
    ds.adicionar('encomendas', { id: 'e1', descricao: 'Quadro personalizado', clienteNome: 'Maria', valor: 1500, status: 'em_andamento', prazo: '2026-12-31' });
    window.location.hash = '#portal?token=abc123';
    const html = view.render();
    expect(html).toContain('Quadro personalizado');
    expect(html).toContain('Maria');
    expect(html).toContain('Em Andamento');
  });

  test('render mostra "nenhuma encomenda" quando cliente não tem encomendas', () => {
    ds.adicionar('portais', { id: 'p1', token: 'abc456', ativo: true, clienteId: 'c2', clienteNome: 'João' });
    window.location.hash = '#portal?token=abc456';
    const html = view.render();
    expect(html).toContain('Nenhuma encomenda');
  });

  test('extrairToken retorna token do hash', () => {
    window.location.hash = '#portal?token=meutoken123';
    expect(view.extrairToken()).toBe('meutoken123');
  });

  test('extrairToken retorna vazio sem hash', () => {
    expect(view.extrairToken()).toBe('');
  });

  test('renderEncomendaCard mostra prazo restante', () => {
    const futuro = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
    const enc = { id: 'e2', descricao: 'Retrato', valor: 2000, status: 'criado', prazo: futuro, clienteNome: 'Ana', atualizacoes: [] };
    const html = view.renderEncomendaCard(enc);
    expect(html).toContain('Retrato');
    expect(html).toContain('Pedido Recebido');
    expect(html).toContain('30 dias');
  });

  test('renderEncomendaCard mostra timeline de atualizações', () => {
    const enc = { id: 'e3', descricao: 'Paisagem', valor: 3000, status: 'finalizado', prazo: null, clienteNome: 'José', clienteEmail: 'jose@email.com', atualizacoes: [{ status: 'em_andamento', mensagem: 'Comecei o esboço', data: '2026-07-01' }] };
    const html = view.renderEncomendaCard(enc);
    expect(html).toContain('Comecei o esboço');
    expect(html).toContain('Em Andamento');
    expect(html).toContain('jose@email.com');
  });
});

describe('CloudSync', () => {
  let ds, sync;

  beforeEach(() => {
    localStorage.clear();
    ds = new DataStore();
    sync = new CloudSync(ds);
  });

  test('constructor armazena dataStore', () => {
    expect(sync.dataStore).toBe(ds);
  });

  test('googleToken retorna vazio sem config', () => {
    expect(sync.googleToken).toBe('');
  });

  test('googleClientId retorna vazio sem config', () => {
    expect(sync.googleClientId).toBe('');
  });

  test('googleToken retorna token da config', () => {
    ds.dados.config.syncGoogleToken = 'tok123';
    expect(sync.googleToken).toBe('tok123');
  });

  test('salvarSnapshotIDB rejeita sem indexedDB', async () => {
    await expect(sync.salvarSnapshotIDB('teste')).rejects.toThrow();
  });

  test('listarSnapshotsIDB rejeita sem indexedDB', async () => {
    await expect(sync.listarSnapshotsIDB()).rejects.toThrow();
  });

  test('restaurarSnapshotIDB rejeita sem indexedDB', async () => {
    await expect(sync.restaurarSnapshotIDB(1)).rejects.toThrow();
  });

  test('removerSnapshotIDB rejeita sem indexedDB', async () => {
    await expect(sync.removerSnapshotIDB(1)).rejects.toThrow();
  });

  test('backupGoogle retorna false sem token', async () => {
    const result = await sync.backupGoogle();
    expect(result).toBe(false);
  });
});

describe('ImageLightbox', () => {
  let lb, images;

  beforeEach(() => {
    lb = new ImageLightbox();
    images = [
      { src: 'data:image/png,base64,A', title: 'Obra 1', subtitle: 'óleo · 2026', caption: 'Descrição 1', price: 'R$ 1.500' },
      { src: 'data:image/png,base64,B', title: 'Obra 2', subtitle: 'aquarela · 2025', caption: 'Descrição 2', price: '' },
    ];
  });

  afterEach(() => {
    if (lb.isOpen) lb.close();
    document.querySelectorAll('.lb-overlay').forEach(el => el.remove());
  });

  test('constructor inicializa estado', () => {
    expect(lb.isOpen).toBe(false);
    expect(lb.scale).toBe(1);
    expect(lb.currentIndex).toBe(0);
    expect(lb.images).toEqual([]);
  });

  test('open não faz nada com array vazio', () => {
    lb.open([], 0);
    expect(lb.isOpen).toBe(false);
  });

  test('open adiciona overlay ao DOM', () => {
    lb.open(images, 0);
    expect(lb.isOpen).toBe(true);
    expect(document.querySelector('.lb-overlay')).toBeTruthy();
    expect(document.querySelectorAll('.lb-thumb').length).toBe(2);
  });

  test('open mostra índice corretamente', () => {
    lb.open(images, 1);
    expect(lb.currentIndex).toBe(1);
  });

  test('close remove overlay', () => {
    lb.open(images, 0);
    lb.close();
    expect(lb.isOpen).toBe(false);
    expect(document.querySelector('.lb-overlay')).toBeFalsy();
  });

  test('navigate avança e volta', () => {
    lb.open(images, 0);
    lb.navigate(1);
    expect(lb.currentIndex).toBe(1);
    lb.navigate(-1);
    expect(lb.currentIndex).toBe(0);
  });

  test('navigate faz wrap circular', () => {
    lb.open(images, 0);
    lb.navigate(-1);
    expect(lb.currentIndex).toBe(1);
    lb.navigate(1);
    expect(lb.currentIndex).toBe(0);
  });

  test('zoomIn aumenta escala', () => {
    lb.open(images, 0);
    const antes = lb.scale;
    lb.zoomIn();
    expect(lb.scale).toBeGreaterThan(antes);
  });

  test('zoomOut diminui escala', () => {
    lb.open(images, 0);
    lb.zoomIn();
    const alto = lb.scale;
    lb.zoomOut();
    expect(lb.scale).toBeLessThan(alto);
  });

  test('resetZoom volta para escala 1', () => {
    lb.open(images, 0);
    lb.zoomIn();
    lb.resetZoom();
    expect(lb.scale).toBe(1);
    expect(lb.offsetX).toBe(0);
    expect(lb.offsetY).toBe(0);
  });

  test('toggleAutoPlay inicia e para slideshow', () => {
    lb.open(images, 0);
    expect(lb.autoPlayTimer).toBeFalsy();
    lb.toggleAutoPlay();
    expect(lb.autoPlayTimer).toBeTruthy();
    lb.toggleAutoPlay();
    expect(lb.autoPlayTimer).toBeFalsy();
  });

  test('startAutoPlay não inicia com 1 imagem', () => {
    lb.open([{ src: 'data:,' }], 0);
    lb.startAutoPlay();
    expect(lb.autoPlayTimer).toBeFalsy();
  });

  test('_download cria elemento <a> e remove', () => {
    lb.open(images, 0);
    const spy = jest.spyOn(document.body, 'appendChild');
    lb._download();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('close é seguro chamar múltiplas vezes', () => {
    lb.close();
    lb.close();
    expect(lb.isOpen).toBe(false);
  });

  test('abrirLightbox cria singleton', () => {
    const lb1 = abrirLightbox(images, 0);
    const lb2 = abrirLightbox(images, 1);
    expect(lb1).toBe(lb2);
    lb1.close();
  });
});
