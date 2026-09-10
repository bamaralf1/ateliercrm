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

// Mock matchMedia (jsdom não implementa)
global.matchMedia = (query) => ({
  matches: false,
  media: query,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  onchange: null,
  dispatchEvent: () => false,
});

// Stub translations
global.AtelierCRMTranslations = { locale: 'pt-BR' };

// Mock window.print
global.print = () => {};

// Mock scrollIntoView for jsdom
Element.prototype.scrollIntoView = () => {};

// Polyfill TextEncoder/TextDecoder (jsdom não expõe; usado por hashPin/CloudSync)
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// crypto: jsdom expõe getter read-only sem subtle → força webcrypto do Node
try {
  Object.defineProperty(global, 'crypto', { value: require('crypto').webcrypto, configurable: true, writable: true });
} catch (e) {}
if (typeof global.crypto.randomUUID !== 'function') {
  global.crypto.randomUUID = () => 'id-' + Math.random().toString(36).slice(2);
}

// URL.createObjectURL/revokeObjectURL (jsdom não implementa)
global.URL = global.URL || {};
if (typeof global.URL.createObjectURL !== 'function') {
  global.URL.createObjectURL = () => 'blob:mock-url-' + Math.random().toString(36).slice(2);
  global.URL.revokeObjectURL = () => {};
}

// Stub Image: dispara onload imediatamente (jsdom não carrega recursos)
class FakeImage {
  constructor() { this.width = 100; this.height = 100; this.onload = null; this.onerror = null; this._src = ''; }
  set src(v) { this._src = v; if (typeof this.onload === 'function') setTimeout(() => this.onload(), 0); }
  get src() { return this._src; }
}
global.Image = FakeImage;

// Stub canvas 2D (sem pacote canvas, jsdom não renderiza)
if (typeof global.HTMLCanvasElement !== 'undefined') {
  global.HTMLCanvasElement.prototype.getContext = () => ({
    imageSmoothingEnabled: false,
    imageSmoothingQuality: 'low',
    drawImage() {},
  });
  global.HTMLCanvasElement.prototype.toDataURL = () => 'data:image/jpeg;base64,QUJD';
}

// Mock IndexedDB funcional para jsdom
class IDBRequest {
  constructor() { this.result = null; this.onsuccess = null; this.onerror = null; }
}
class IDBObjectStore {
  constructor(data) { this._data = data; this._txDone = null; }
  put(record, key) {
    const k = key || record.id;
    this._data.set(k, record);
    const req = new IDBRequest();
    req.result = k;
    setTimeout(() => { if (req.onsuccess) req.onsuccess(); if (this._txDone) this._txDone(); }, 0);
    return req;
  }
  get(key) {
    const store = this;
    const req = new IDBRequest();
    req.result = this._data.get(key);
    setTimeout(() => { if (req.onsuccess) req.onsuccess(); if (store._txDone) store._txDone(); }, 0);
    return req;
  }
  delete(key) {
    const store = this;
    this._data.delete(key);
    const req = new IDBRequest();
    setTimeout(() => { if (req.onsuccess) req.onsuccess(); if (store._txDone) store._txDone(); }, 0);
    return req;
  }
}
class IDBTransaction {
  constructor(name, storeMap) {
    this._name = name;
    this._storeMap = storeMap;
    this._store = null;
    this.oncomplete = null;
    this.onerror = null;
  }
  objectStore() {
    if (!this._store) {
      this._store = new IDBObjectStore(this._storeMap);
      this._store._txDone = () => { if (this.oncomplete) this.oncomplete(); };
    }
    return this._store;
  }
}
class IDBOpenDBRequest {
  constructor() { this.result = null; this.onupgradeneeded = null; this.onsuccess = null; this.onerror = null; }
}
const _idbDbs = new Map();
global.indexedDB = {
  open: (name) => {
    const req = new IDBOpenDBRequest();
    let storeMaps = _idbDbs.get(name);
    if (!storeMaps) { storeMaps = {}; _idbDbs.set(name, storeMaps); }
    const db = {
      objectStoreNames: { contains: (n) => Boolean(storeMaps[n]) },
      createObjectStore: (n, opts) => {
        const s = new Map();
        s._keyPath = opts && opts.keyPath;
        storeMaps[n] = s;
        return s;
      },
      transaction: (n) => new IDBTransaction(n, storeMaps[n] || (storeMaps[n] = new Map())),
    };
    setTimeout(() => {
      req.result = db;
      if (req.onupgradeneeded) req.onupgradeneeded({ target: { result: db } });
      if (req.onsuccess) req.onsuccess({ target: { result: db } });
    }, 0);
    return req;
  }
};