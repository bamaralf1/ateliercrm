// BaseView — Classe base para todas as views

export class BaseView {
  constructor(dataStore, router) {
    if (new.target === BaseView) throw new Error('BaseView não pode ser instanciada diretamente');
    this.dataStore = dataStore;
    this.router = router;
    this._bindCache = {};
  }
  removerListeners() {
    Object.values(this._bindCache).forEach(({ el, handler, type }) => {
      try { el.removeEventListener(type, handler); } catch (e) {}
    });
    this._bindCache = {};
  }
  rerenderizar() {
    const c = document.getElementById('viewPrincipal');
    if (c) { this.removerListeners(); c.innerHTML = this.render(); this.aposRenderizar(); }
  }
  destruir() { this.removerListeners(); }
  render() { return ''; }
  aposRenderizar() { this.removerListeners(); }
}
