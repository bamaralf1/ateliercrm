// Mock localStorage for jsdom
class LocalStorageMock {
  constructor() { this._store = {}; }
  getItem(key) { return this._store[key] || null; }
  setItem(key, value) { this._store[key] = String(value); }
  removeItem(key) { delete this._store[key]; }
  clear() { this._store = {}; }
}
global.localStorage = new LocalStorageMock();

// Set up minimal DOM structure expected by the app at load time
document.body.innerHTML = `
  <header><button id="btnColapsar"></button><button id="btnBackup"></button></header>
  <div id="sidebar" class="colapsada"><ul id="navLista"></ul></div>
  <div id="viewPrincipal"></div>
  <div id="toast"></div>
  <div id="modalOverlay" class=""><div id="modalCaixa"></div></div>
`;

// Mock window methods used by the app
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.navigator = { platform: 'Win32' };

// Stub translations
global.AtelierCRMTranslations = { locale: 'pt-BR' };

// Mock window.print
global.print = () => {};