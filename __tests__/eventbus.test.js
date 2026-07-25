const { EventBus } = require('../js/atelier-crm.js');

describe('EventBus', () => {
  test('registra e dispara evento', () => {
    const bus = new EventBus();
    const fn = jest.fn();
    bus.on('teste', fn);
    bus.emitir('teste', 'arg1', 42);
    expect(fn).toHaveBeenCalledWith('arg1', 42);
  });

  test('dispara múltiplos listeners na ordem', () => {
    const bus = new EventBus();
    const ordem = [];
    bus.on('evt', () => ordem.push(1));
    bus.on('evt', () => ordem.push(2));
    bus.emitir('evt');
    expect(ordem).toEqual([1, 2]);
  });

  test('off remove listener e impede disparo', () => {
    const bus = new EventBus();
    const fn = jest.fn();
    bus.on('evt', fn);
    bus.off('evt', fn);
    bus.emitir('evt');
    expect(fn).not.toHaveBeenCalled();
  });

  test('emitir sem listeners não lança erro', () => {
    const bus = new EventBus();
    expect(() => bus.emitir('inexistente')).not.toThrow();
  });

  test('off em listener inexistente não lança erro', () => {
    const bus = new EventBus();
    expect(() => bus.off('fake', () => {})).not.toThrow();
  });

  test('on retorna função de cleanup', () => {
    const bus = new EventBus();
    const fn = jest.fn();
    const cleanup = bus.on('evt', fn);
    cleanup();
    bus.emitir('evt');
    expect(fn).not.toHaveBeenCalled();
  });

  test('off de um evento não afeta outros eventos', () => {
    const bus = new EventBus();
    const fn = jest.fn();
    bus.on('a', fn);
    bus.on('b', fn);
    bus.off('a', fn);
    bus.emitir('b');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});