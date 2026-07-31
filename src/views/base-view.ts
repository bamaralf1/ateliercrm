// BaseView — Classe base para todas as views

export class BaseView {
  constructor(dataStore, router) {
    if (new.target === BaseView) throw new Error('BaseView não pode ser instanciada diretamente');
    this.dataStore = dataStore;
    this.router = router;
    this._bindCache = {};
    this._eventoCleanups = [];
  }
  _escutarEvento(evento, callback) {
    const cleanup = eventBus.on(evento, callback);
    this._eventoCleanups.push(cleanup);
  }
  removerListeners() {
    Object.values(this._bindCache).forEach(({ el, handler, type }) => {
      try { el.removeEventListener(type, handler); } catch (e) { console.warn(e) }
    });
    this._bindCache = {};
    this._eventoCleanups.forEach(fn => { try { fn(); } catch (e) { console.warn(e) } });
    this._eventoCleanups = [];
  }
  rerenderizar(manterFoco = false) {
    const c = document.getElementById('viewPrincipal');
    if (!c) return;
    const idFoco = manterFoco ? document.activeElement.id : null;
    this.removerListeners();
    c.innerHTML = this.render();
    this.aposRenderizar();
    if (idFoco) { const el = document.getElementById(idFoco); if (el) { el.focus(); const v = el.value; el.value = ''; el.value = v; } }
  }
  destruir() { this.removerListeners(); }
  render() { return ''; }
  aposRenderizar() { this.removerListeners(); }
}
