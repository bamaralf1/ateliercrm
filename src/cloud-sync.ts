// CloudSync — IndexedDB + Google Drive + WebDAV

export class CloudSync {
  constructor(dataStore) {
    this.dataStore = dataStore;
    this._db = null;
    this._dbPromise = null;
  }

  // ==================== IndexedDB ====================
  get db() {
    if (!this._dbPromise) {
      this._dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open('AtelierCRM', 1);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('snapshots')) {
            const store = db.createObjectStore('snapshots', { keyPath: 'id', autoIncrement: true });
            store.createIndex('timestamp', 'timestamp', { unique: false });
            store.createIndex('label', 'label', { unique: false });
          }
        };
        req.onsuccess = (e) => { this._db = e.target.result; resolve(this._db); };
        req.onerror = (e) => reject(e.target.error);
      });
    }
    return this._dbPromise;
  }

  async salvarSnapshotIDB(label) {
    const db = await this.db;
    const tx = db.transaction('snapshots', 'readwrite');
    const store = tx.objectStore('snapshots');
    const snapshot = {
      dados: JSON.parse(JSON.stringify(this.dataStore.dados)),
      timestamp: new Date().toISOString(),
      label: label || 'Backup ' + new Date().toLocaleString('pt-BR')
    };
    return new Promise((resolve, reject) => {
      const req = store.add(snapshot);
      req.onsuccess = () => { mostrarToast('Snapshot salvo no IndexedDB!', 'sucesso'); resolve(req.result); };
      req.onerror = () => reject(req.error);
    });
  }

  async listarSnapshotsIDB() {
    const db = await this.db;
    const tx = db.transaction('snapshots', 'readonly');
    const store = tx.objectStore('snapshots');
    const index = store.index('timestamp');
    return new Promise((resolve, reject) => {
      const req = index.openCursor(null, 'prev');
      const results = [];
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) { results.push(cursor.value); cursor.continue(); }
        else resolve(results);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async restaurarSnapshotIDB(id) {
    const db = await this.db;
    const tx = db.transaction('snapshots', 'readonly');
    const store = tx.objectStore('snapshots');
    return new Promise((resolve, reject) => {
      const req = store.get(id);
      req.onsuccess = (e) => {
        const snap = e.target.result;
        if (snap) {
          this.dataStore.dados = JSON.parse(JSON.stringify(snap.dados));
          this.dataStore.salvar();
          mostrarToast('Snapshot restaurado com sucesso!', 'sucesso');
          resolve(true);
        } else { reject(new Error('Snapshot não encontrado')); }
      };
      req.onerror = () => reject(req.error);
    });
  }

  async removerSnapshotIDB(id) {
    const db = await this.db;
    const tx = db.transaction('snapshots', 'readwrite');
    const store = tx.objectStore('snapshots');
    return new Promise((resolve, reject) => {
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  // ==================== Google Drive ====================
  get googleToken() { return this.dataStore.dados.config.syncGoogleToken || ''; }
  get googleClientId() { return this.dataStore.dados.config.syncGoogleClientId || ''; }

  async autenticarGoogle() {
    const clientId = this.googleClientId;
    if (!clientId) { mostrarToast('Configure o Client ID do Google Drive nas Configurações.', 'aviso'); return false; }
    return new Promise((resolve) => {
      const redirectUri = window.location.origin + window.location.pathname;
      const scope = 'https://www.googleapis.com/auth/drive.file';
      const state = 'crm_sync_' + Date.now();
      const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=token' +
        '&client_id=' + encodeURIComponent(clientId) +
        '&redirect_uri=' + encodeURIComponent(redirectUri) +
        '&scope=' + encodeURIComponent(scope) +
        '&state=' + state;

      // Abre popup ou redireciona
      const w = window.open(authUrl, 'google_oauth', 'width=600,height=700');
      if (!w) { mostrarToast('Pop-up bloqueado. Permita pop-ups para usar o Google Drive.', 'aviso'); resolve(false); return; }

      const checkInterval = setInterval(() => {
        try {
          if (w.closed) { clearInterval(checkInterval); resolve(false); return; }
          if (w.location.hash && w.location.hash.includes('access_token')) {
            const params = new URLSearchParams(w.location.hash.replace('#', ''));
            const token = params.get('access_token');
            if (token) {
              this.dataStore.dados.config.syncGoogleToken = token;
              this.dataStore.salvar();
              mostrarToast('Google Drive autenticado!', 'sucesso');
              w.close();
              clearInterval(checkInterval);
              resolve(true);
            }
          }
        } catch (e) { console.warn('Polling Google Auth:', e) }
      }, 500);
    });
  }

  async _reqGoogle(path, method, body) {
    const token = this.googleToken;
    if (!token) throw new Error('Google Drive não autenticado');
    const opts = {
      method: method || 'GET',
      headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch('https://www.googleapis.com/drive/v3/' + path, opts);
    if (res.status === 401) {
      this.dataStore.dados.config.syncGoogleToken = '';
      this.dataStore.salvar();
      mostrarToast('Token expirado. Autentique novamente.', 'erro');
      throw new Error('Token expirado');
    }
    return res.json();
  }

  async _garantirPastaGoogle() {
    const res = await this._reqGoogle('files?q=name%3D%27AtelierCRM%27%20and%20mimeType%3D%27application%2Fvnd.google-apps.folder%27&fields=files(id,name)');
    if (res.files && res.files.length > 0) return res.files[0].id;
    const folder = await this._reqGoogle('files', 'POST', {
      name: 'AtelierCRM', mimeType: 'application/vnd.google-apps.folder'
    });
    return folder.id;
  }

  async backupGoogle() {
    if (!this.googleToken) { const ok = await this.autenticarGoogle(); if (!ok) return false; }
    mostrarLoading('Enviando backup para Google Drive...');
    try {
      const folderId = await this._garantirPastaGoogle();
      const conteudo = JSON.stringify(this.dataStore.dados);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const nome = `atelier-crm-backup-${timestamp}.json`;

      // Upload multipart
      const boundary = 'crm_boundary_' + Date.now();
      const body = [
        '--' + boundary,
        'Content-Type: application/json; charset=UTF-8',
        '',
        JSON.stringify({ name: nome, parents: [folderId] }),
        '--' + boundary,
        'Content-Type: application/json',
        '',
        conteudo,
        '--' + boundary + '--'
      ].join('\r\n');

      const token = this.googleToken;
      const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/related; boundary=' + boundary
        },
        body
      });
      const data = await res.json();
      if (data.id) {
        this.dataStore.dados.config.syncLastBackup = new Date().toISOString();
        this.dataStore.salvar();
        esconderLoading();
        mostrarToast('Backup enviado para Google Drive!', 'sucesso');
        return true;
      }
      esconderLoading();
      mostrarToast('Erro: ' + (data.error?.message || 'Falha no upload'), 'erro');
      return false;
    } catch (e) {
      esconderLoading();
      mostrarToast('Erro ao fazer backup no Google Drive: ' + e.message, 'erro');
      return false;
    }
  }

  async listarBackupsGoogle() {
    if (!this.googleToken) return [];
    try {
      const res = await this._reqGoogle('files?q=name%20contains%20%27atelier-crm-backup%27&orderBy=createdTime%20desc&fields=files(id,name,createdTime,size)');
      return (res.files || []).map(f => ({
        id: f.id, nome: f.name, data: f.createdTime, tamanho: f.size
      }));
    } catch (e) { console.warn('Falha ao listar backups Google Drive', e); return []; }
  }

  async restaurarGoogle(fileId) {
    if (!this.googleToken) { mostrarToast('Google Drive não autenticado.', 'erro'); return false; }
    mostrarLoading('Restaurando do Google Drive...');
    try {
      const res = await fetch('https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media', {
        headers: { 'Authorization': 'Bearer ' + this.googleToken }
      });
      if (!res.ok) throw new Error('Erro HTTP ' + res.status);
      const dados = await res.json();
      if (dados && dados.obras) {
        this.dataStore.dados = dados;
        this.dataStore.salvar();
        esconderLoading();
        mostrarToast('Backup restaurado do Google Drive!', 'sucesso');
        return true;
      }
      esconderLoading();
      mostrarToast('Arquivo inválido no Google Drive.', 'erro');
      return false;
    } catch (e) {
      esconderLoading();
      mostrarToast('Erro ao restaurar: ' + e.message, 'erro');
      return false;
    }
  }

  // ==================== WebDAV ====================
  _webdavConfig() {
    const c = this.dataStore.dados.config;
    return { url: c.syncWebDAVUrl || '', user: c.syncWebDAVUser || '', pass: c.syncWebDAVPass || '' };
  }

  async _reqWebDAV(path, method, body) {
    const cfg = this._webdavConfig();
    if (!cfg.url) throw new Error('WebDAV não configurado');
    const url = cfg.url.replace(/\/+$/, '') + '/' + path.replace(/^\//, '');
    const auth = btoa(cfg.user + ':' + cfg.pass);
    const opts = { method: method || 'GET', headers: { 'Authorization': 'Basic ' + auth } };
    if (body) opts.body = body;
    const res = await fetch(url, opts);
    if (!res.ok) throw new Error('WebDAV HTTP ' + res.status);
    return res;
  }

  async testarWebDAV() {
    try {
      await this._reqWebDAV('', 'PROPFIND');
      return true;
    } catch (e) { console.warn('Falha ao testar WebDAV', e); return false; }
  }

  async backupWebDAV() {
    mostrarLoading('Enviando backup para WebDAV...');
    try {
      const conteudo = JSON.stringify(this.dataStore.dados);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const nome = `atelier-crm-backup-${timestamp}.json`;
      await this._reqWebDAV(nome, 'PUT', conteudo);
      this.dataStore.dados.config.syncLastBackup = new Date().toISOString();
      this.dataStore.salvar();
      esconderLoading();
      mostrarToast('Backup enviado para WebDAV!', 'sucesso');
      return true;
    } catch (e) {
      esconderLoading();
      mostrarToast('Erro WebDAV: ' + e.message, 'erro');
      return false;
    }
  }

  async listarBackupsWebDAV() {
    try {
      const res = await this._reqWebDAV('', 'PROPFIND');
      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      const responses = xml.querySelectorAll('response');
      const files = [];
      responses.forEach(r => {
        const href = r.querySelector('href')?.textContent || '';
        const name = href.split('/').filter(Boolean).pop() || '';
        if (name.startsWith('atelier-crm-backup')) {
          const size = r.querySelector('getcontentlength')?.textContent || '0';
          const date = r.querySelector('getlastmodified')?.textContent || '';
          files.push({ nome: name, data: date, tamanho: size, href });
        }
      });
      return files.reverse();
    } catch (e) { console.warn('Falha ao listar backups WebDAV', e); return []; }
  }

  async restaurarWebDAV(nomeArquivo) {
    mostrarLoading('Restaurando do WebDAV...');
    try {
      const res = await this._reqWebDAV(nomeArquivo, 'GET');
      const dados = await res.json();
      if (dados && dados.obras) {
        this.dataStore.dados = dados;
        this.dataStore.salvar();
        esconderLoading();
        mostrarToast('Backup restaurado do WebDAV!', 'sucesso');
        return true;
      }
      esconderLoading();
      mostrarToast('Arquivo inválido no WebDAV.', 'erro');
      return false;
    } catch (e) {
      esconderLoading();
      mostrarToast('Erro ao restaurar WebDAV: ' + e.message, 'erro');
      return false;
    }
  }

  // ==================== Auto Backup ====================
  _backupEmAndamento = false
  iniciarAutoBackup() {
    const cfg = this.dataStore.dados.config;
    if (!cfg.syncAutoBackup) return;
    const interval = (cfg.syncAutoBackupInterval || 30) * 60 * 1000;
    setInterval(async () => {
      if (this._backupEmAndamento) return;
      this._backupEmAndamento = true;
      try {
        await this.salvarSnapshotIDB('Auto ' + new Date().toLocaleString('pt-BR'));
      } catch (e) { console.warn('Auto-backup falhou', e) }
      finally { this._backupEmAndamento = false; }
    }, interval);
  }
}
