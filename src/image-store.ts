const DB_NAME = 'AtelierCRM_Images';
const DB_VERSION = 1;
const STORE_NAME = 'images';

let _dbPromise: Promise<IDBDatabase> | null = null;

function abrirDB(): Promise<IDBDatabase> {
  if (_dbPromise) return _dbPromise;
  _dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return _dbPromise;
}

interface ImagemRecord {
  id: string;
  thumb: string;
  medium: string;
  full: string;
  criadoEm: string;
}

const blobCache = new Map<string, string>();

function base64ToBlob(base64: string): Blob {
  const [meta, data] = base64.split(',');
  const mime = (meta && meta.match(/:(.*?);/)?.[1]) || 'image/jpeg';
  const bytes = atob(data);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

function comprimirBase64(base64: string, maxLargura: number, qualidade: number): Promise<string> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let w = img.width, h = img.height;
      if (w > maxLargura) { h = (h * maxLargura) / w; w = maxLargura; }
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', qualidade));
    };
    img.onerror = () => resolve(base64);
    img.src = base64;
  });
}

// Salva uma imagem base64 no IDB em 3 tamanhos
async function salvarRecord(base64: string): Promise<{ id: string; thumb: string; medium: string; full: string }> {
  const id = crypto.randomUUID();
  const [thumb, medium, full] = await Promise.all([
    comprimirBase64(base64, 200, 0.7),
    comprimirBase64(base64, 600, 0.75),
    base64, // full = original já comprimida a 1200px
  ]);
  const db = await abrirDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put({ id, thumb, medium, full, criadoEm: new Date().toISOString() });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  blobCache.forEach((url, key) => { if (key.startsWith(`idb:${id}`)) { URL.revokeObjectURL(url); blobCache.delete(key); } });
  return { id: `idb:${id}`, thumb: `idb:${id}:thumb`, medium: `idb:${id}:medium`, full: `idb:${id}:full` };
}

// Carrega imagem: se for idb:, busca do IDB e retorna blob URL; se for base64, retorna como está
async function loadRecord(referencia: string): Promise<string> {
  if (!referencia || !referencia.startsWith('idb:')) return referencia || '';
  const cached = blobCache.get(referencia);
  if (cached) return cached;
  const parts = referencia.replace('idb:', '').split(':');
  const id = parts[0];
  const size = parts[1] || 'medium';
  const db = await abrirDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const record = await new Promise<ImagemRecord | undefined>((resolve, reject) => {
    const req = tx.objectStore(STORE_NAME).get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  if (!record) return '';
  const data = record[size as keyof ImagemRecord] || record.medium || record.full || record.thumb || '';
  if (!data) return '';
  const blob = base64ToBlob(data as string);
  const url = URL.createObjectURL(blob);
  blobCache.set(referencia, url);
  return url;
}

// Libera blob URL de uma referência
function freeOne(referencia: string): void {
  const url = blobCache.get(referencia);
  if (url) { URL.revokeObjectURL(url); blobCache.delete(referencia); }
}

// Libera todos os blob URLs
function freeAll(): void {
  blobCache.forEach(url => URL.revokeObjectURL(url));
  blobCache.clear();
}

// Remove uma imagem do IDB
async function removeRecord(referencia: string): Promise<void> {
  const id = referencia.replace('idb:', '').replace(/:(thumb|medium|full)$/, '');
  const db = await abrirDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  freeOne(referencia);
}

// Migra todas as imagens base64 de obras e encomendas para IDB
async function migrateAll(obras: any[], encomendas?: any[]): Promise<number> {
  let count = 0;
  // Migrar obras
  for (const obra of obras) {
    const toMigrate = new Set<string>();
    if (obra.imagem && !obra.imagem.startsWith('idb:')) toMigrate.add(obra.imagem);
    if (obra.imagemDestacada && !obra.imagemDestacada.startsWith('idb:')) toMigrate.add(obra.imagemDestacada);
    if (obra.imagens) { obra.imagens.forEach((i: string) => { if (i && !i.startsWith('idb:')) toMigrate.add(i); }); }
    if (toMigrate.size === 0) continue;
    const idMap = new Map<string, string>();
    for (const img of toMigrate) {
      if (img.startsWith('data:')) { const r = await salvarRecord(img); idMap.set(img, r.medium); }
    }
    if (idMap.size === 0) continue;
    if (obra.imagem && idMap.has(obra.imagem)) obra.imagem = idMap.get(obra.imagem)!;
    if (obra.imagemDestacada && idMap.has(obra.imagemDestacada)) obra.imagemDestacada = idMap.get(obra.imagemDestacada)!;
    if (obra.imagens) { obra.imagens = obra.imagens.map((i: string) => idMap.get(i) || i); }
    count += idMap.size;
  }
  // Migrar encomendas
  if (encomendas) {
    for (const enc of encomendas) {
      if (!enc.imagens || enc.imagens.length === 0) continue;
      const toMigrate = enc.imagens.filter((i: string) => i && !i.startsWith('idb:') && i.startsWith('data:'));
      if (toMigrate.length === 0) continue;
      for (const img of toMigrate) {
        const r = await salvarRecord(img);
        const idx = enc.imagens.indexOf(img);
        if (idx >= 0) enc.imagens[idx] = r.medium;
        count++;
      }
    }
  }
  return count;
}

// API global
window.imageStore = { salvar: salvarRecord, carregar: loadRecord, remover: removeRecord, liberar: freeOne, liberarTodas: freeAll, migrar: migrateAll };
