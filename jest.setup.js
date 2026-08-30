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

// Mock scrollIntoView for jsdom
Element.prototype.scrollIntoView = () => {};

// Mock IndexedDB for jsdom
const IDBStore = {};
class IDBRequest {
  constructor(result) { this.result = result; this.onsuccess = null; this.onerror = null; }
}
class IDBObjectStore {
  constructor(name) { this._name = name; this._data = {}; }
  get(key) { const req = new IDBRequest(this._data[key]); setTimeout(() => req.onsuccess && req.onsuccess(), 0); return req; }
  put(record) { this._data[record.id] = record; const req = new IDBRequest(); setTimeout(() => req.onsuccess && req.onsuccess(), 0); return req; }
  delete(key) { delete this._data[key]; const req = new IDBRequest(); setTimeout(() => req.onsuccess && req.onsuccess(), 0); return req; }
}
class IDBTransaction {
  constructor(stores, mode) { this._stores = stores; this.oncomplete = null; this.onerror = null; this.objectStore = (name) => this._storeObj || (this._storeObj = new IDBObjectStore(name)); }
}
class IDBOpenDBRequest {
  constructor() { this.result = null; this.onupgradeneeded = null; this.onsuccess = null; this.onerror = null; }
}
let _idbStores = {};
global.indexedDB = {
  open: (name, version) => {
    const req = new IDBOpenDBRequest();
    if (!_idbStores[name]) _idbStores[name] = {};
    setTimeout(() => {
      const tx = new IDBTransaction();
      tx._storeObj = { _data: _idbStores[name] };
      if (req.onupgradeneeded) req.onupgradeneeded({ target: { result: { objectStoreNames: { contains: () => false }, objectStore: (n) => tx._storeObj } } });
      req.result = { objectStore: (n) => tx._storeObj };
      if (req.onsuccess) req.onsuccess();
    }, 0);
    return req;
  }
};