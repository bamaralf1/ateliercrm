// EventBus — Barramento de eventos para comunicação entre módulos

export class EventBus {
  _eventos: Record<string, Array<(...args: unknown[]) => void>>;

  constructor() { this._eventos = {}; }
  on(evento, callback) {
    if (!this._eventos[evento]) this._eventos[evento] = [];
    this._eventos[evento].push(callback);
    return () => this.off(evento, callback);
  }
  off(evento, callback) {
    if (!this._eventos[evento]) return;
    this._eventos[evento] = this._eventos[evento].filter(cb => cb !== callback);
  }
  emitir(evento, ...args) {
    (this._eventos[evento] || []).forEach(cb => cb(...args));
  }
}
