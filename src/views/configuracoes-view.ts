export class ConfiguracoesView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
  }

  _salvar() {
    const nome = document.getElementById('cfgNome').value.trim();
    const email = document.getElementById('cfgEmail').value.trim();
    const telefone = document.getElementById('cfgTelefone').value.trim();
    configStore().artista = { nome, email, telefone };
    configStore().textoGarantia = document.getElementById('cfgTextoGarantia').value.trim();
    const langSel = document.getElementById('cfgIdioma');
    if (langSel) { configStore().idioma = langSel.value; if (window.AtelierCRMTranslations) { window.AtelierCRMTranslations.locale = langSel.value; } }
    const hcSel = document.getElementById('cfgAltoContraste');
    if (hcSel) { configStore().altoContraste = hcSel.checked; document.body.setAttribute('data-high-contrast', hcSel.checked); }
    const fontSel = document.getElementById('cfgTamanhoFonte');
    if (fontSel) { configStore().tamanhoFonte = fontSel.value; document.body.setAttribute('data-font-size', fontSel.value); }
    // Sync
    const gc = document.getElementById('cfgGoogleClientId');
    if (gc) configStore().syncGoogleClientId = gc.value.trim();
    const wu = document.getElementById('cfgWebDAVUrl');
    if (wu) configStore().syncWebDAVUrl = wu.value.trim();
    const wuser = document.getElementById('cfgWebDAVUser');
    if (wuser) configStore().syncWebDAVUser = wuser.value.trim();
    const wpass = document.getElementById('cfgWebDAVPass');
    if (wpass) configStore().syncWebDAVPass = wpass.value.trim();
    const auto = document.getElementById('cfgAutoSync');
    if (auto) configStore().syncAutoBackup = auto.checked;
    const interval = document.getElementById('cfgSyncInterval');
    if (interval) configStore().syncAutoBackupInterval = Number(interval.value) || 30;
    configStore().salvar();
    mostrarToast('Configurações salvas com sucesso!');
  }

  _salvarPin() {
    const pinVal = document.getElementById('cfgPin')?.value;
    if (pinVal && pinVal.length === 4 && /^\d{4}$/.test(pinVal)) {
      configStore().pin = pinVal;
      configStore().salvar();
      mostrarToast('PIN salvo com sucesso!');
      document.getElementById('cfgPin').value = '';
    } else {
      mostrarToast('Digite um PIN de 4 dígitos.');
    }
  }

  _removerPin() {
    if (confirm('Remover o PIN de acesso?')) {
      configStore().pin = '';
      configStore().autoLock = false;
      configStore().salvar();
      mostrarToast('PIN removido.');
      if (this.router.viewAtual === 'configuracoes') this.router.navegar('configuracoes');
    }
  }

  render() {
    const cfg = configStore().artista || {};
    const textoGarantia = configStore().textoGarantia || '';
    const idiomaAtual = configStore().idioma || 'pt-BR';
    const altoContraste = configStore().altoContraste || false;
    const tamanhoFonte = configStore().tamanhoFonte || 'medio';
    const pinAtivo = configStore().pin || '';
    const s = configStore();
    const ultimoBackup = s.syncLastBackup ? formatarData(s.syncLastBackup) : 'Nunca';

    const idiomas = [
      { v: 'pt-BR', r: '🇧🇷 Português (BR)' },
      { v: 'en-US', r: '🇺🇸 English (US)' },
      { v: 'es', r: '🇪🇸 Español' },
      { v: 'fr', r: '🇫🇷 Français' },
      { v: 'it', r: '🇮🇹 Italiano' }
    ];

    return `
      <div class="view-cabecalho">
        <div>
          <h2>Configurações</h2>
          <p class="subtitulo">Dados do artista e preferências do sistema</p>
        </div>
      </div>
      <div class="painel" style="max-width:560px">
        <h3><i class="fas fa-user"></i> Perfil do Artista</h3>
        <div class="campo-form">
          <label>Nome / Nome do Ateliê</label>
          <input type="text" id="cfgNome" value="${sanitizarHTML(cfg.nome || '')}">
        </div>
        <div class="campo-form">
          <label>E-mail</label>
          <input type="email" id="cfgEmail" value="${sanitizarHTML(cfg.email || '')}">
        </div>
        <div class="campo-form">
          <label>Telefone</label>
          <input type="text" id="cfgTelefone" value="${sanitizarHTML(cfg.telefone || '')}">
        </div>
        <div class="campo-form">
          <label>Texto de garantia/autenticidade (usado nos recibos e propostas)</label>
          <textarea id="cfgTextoGarantia" style="min-height:110px;">${sanitizarHTML(textoGarantia)}</textarea>
        </div>
      </div>
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3><i class="fas fa-globe"></i> Idioma</h3>
        <div class="campo-form">
          <label>Idioma da interface</label>
          <select id="cfgIdioma">${idiomas.map(i => `<option value="${i.v}" ${idiomaAtual === i.v ? 'selected' : ''}>${i.r}</option>`).join('')}</select>
        </div>
      </div>
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3>♿ Acessibilidade</h3>
        <div class="campo-form">
          <label><input type="checkbox" id="cfgAltoContraste" ${altoContraste ? 'checked' : ''}> <i class="fas fa-lock"></i> Alto contraste</label>
        </div>
        <div class="campo-form">
          <label>Tamanho da fonte</label>
          <select id="cfgTamanhoFonte">
            <option value="pequeno" ${tamanhoFonte === 'pequeno' ? 'selected' : ''}>Pequeno</option>
            <option value="medio" ${tamanhoFonte === 'medio' ? 'selected' : ''}>Médio</option>
            <option value="grande" ${tamanhoFonte === 'grande' ? 'selected' : ''}>Grande</option>
          </select>
        </div>
      </div>
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3>🔐 Segurança</h3>
        <div class="campo-form">
          <label>PIN de acesso (4 dígitos) ${pinAtivo ? '<i class="fas fa-lock"></i> Ativo' : '<i class="fas fa-times"></i> Desativado'}</label>
          <div style="display:flex;gap:8px;">
            <input type="password" id="cfgPin" maxlength="4" pattern="[0-9]*" inputmode="numeric" placeholder="****" style="width:100px;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:1.2rem;text-align:center;background:var(--bg);color:var(--text);letter-spacing:4px;">
            <button class="btn-secundario" id="btnSalvarPin" style="font-size:0.8rem;padding:6px 14px;">${pinAtivo ? 'Alterar' : 'Ativar'} PIN</button>
            ${pinAtivo ? `<button class="btn-secundario" id="btnRemoverPin" style="font-size:0.8rem;padding:6px 14px;color:#dc2626;">Remover PIN</button>` : ''}
          </div>
        </div>
        <div class="campo-form">
          <label><input type="checkbox" id="cfgAutoLock" ${configStore().autoLock ? 'checked' : ''}> 🔐 Bloquear automaticamente após inatividade</label>
        </div>
      </div>

      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3><i class="fas fa-keyboard"></i> Atalhos de Teclado</h3>
        <p class="texto-ajuda" style="margin-bottom:8px;">Personalize os atalhos para navegar mais rápido.</p>
        <button class="btn-secundario" id="btnEditarAtalhos"><i class="fas fa-pen"></i> Personalizar Atalhos</button>
      </div>

      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3><i class="fas fa-database"></i> Gerenciamento de Imagens</h3>
        <p class="texto-ajuda" style="margin-bottom:8px;">Armazene imagens no IndexedDB (sem limite de 5MB do localStorage).</p>
        <button class="btn-secundario" id="btnMigrarImagens"><i class="fas fa-arrow-up"></i> Migrar imagens para IndexedDB</button>
        <span id="migracaoStatus" style="margin-left:8px;font-size:0.8rem;color:var(--text-muted);"></span>
      </div>

      <!-- Sincronização -->
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3><i class="fas fa-cloud"></i> Sincronização na Nuvem</h3>
        <p class="texto-ajuda" style="margin-bottom:12px;">Último backup: ${ultimoBackup}</p>

        <div class="sync-tabs" style="display:flex;gap:4px;margin-bottom:12px;">
          <button class="sync-tab ativo" data-sync-tab="indexeddb"><i class="fas fa-save"></i> Local (IDB)</button>
          <button class="sync-tab" data-sync-tab="googledrive">☁️ Google Drive</button>
          <button class="sync-tab" data-sync-tab="webdav"><i class="fas fa-folder"></i> WebDAV</button>
        </div>

        <div class="sync-panel" id="syncPanelIndexedDB">
          <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:8px;">Snapshots salvos no navegador (IndexedDB — sem limite de espaço).</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn-secundario" id="btnIDBSnapshot"><i class="fas fa-save"></i> Tirar Snapshot</button>
            <button class="btn-secundario" id="btnIDBListar"><i class="fas fa-clipboard"></i> Listar Snapshots</button>
          </div>
          <div id="idbSnapshotList" style="margin-top:8px;"></div>
        </div>

        <div class="sync-panel" id="syncPanelGoogleDrive" style="display:none;">
          <div class="campo-form">
            <label>Google Drive Client ID (OAuth 2.0)</label>
            <input type="text" id="cfgGoogleClientId" value="${sanitizarHTML(s.syncGoogleClientId || '')}" placeholder="123456789-xxxxx.apps.googleusercontent.com" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;width:100%;background:var(--bg);color:var(--text);">
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
            <button class="btn-secundario" id="btnGoogleAuth"><i class="fas fa-key"></i> Autenticar</button>
            <button class="btn-secundario" id="btnGoogleBackup">☁️ Fazer Backup</button>
            <button class="btn-secundario" id="btnGoogleListar"><i class="fas fa-clipboard"></i> Listar Backups</button>
          </div>
          <div id="googleBackupList" style="margin-top:8px;"></div>
        </div>

        <div class="sync-panel" id="syncPanelWebDAV" style="display:none;">
          <div class="campo-form">
            <label>URL do servidor WebDAV</label>
            <input type="url" id="cfgWebDAVUrl" value="${sanitizarHTML(s.syncWebDAVUrl || '')}" placeholder="https://meu-servidor.com/remote.php/dav/files/usuario/" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;width:100%;background:var(--bg);color:var(--text);">
          </div>
          <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div><label>Usuário</label><input type="text" id="cfgWebDAVUser" value="${sanitizarHTML(s.syncWebDAVUser || '')}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;width:100%;background:var(--bg);color:var(--text);"></div>
            <div><label>Senha</label><input type="password" id="cfgWebDAVPass" value="${sanitizarHTML(s.syncWebDAVPass || '')}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;width:100%;background:var(--bg);color:var(--text);"></div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
            <button class="btn-secundario" id="btnWebDAVTest"><i class="fas fa-link"></i> Testar Conexão</button>
            <button class="btn-secundario" id="btnWebDAVBackup">☁️ Fazer Backup</button>
            <button class="btn-secundario" id="btnWebDAVListar"><i class="fas fa-clipboard"></i> Listar Backups</button>
          </div>
          <div id="webdavBackupList" style="margin-top:8px;"></div>
        </div>

        <div class="campo-form" style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);">
          <label><input type="checkbox" id="cfgAutoSync" ${s.syncAutoBackup ? 'checked' : ''}> <i class="fas fa-sync"></i> Backup automático no IndexedDB</label>
          <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
            <span style="font-size:0.75rem;color:var(--text-muted);">A cada</span>
            <select id="cfgSyncInterval" style="padding:4px 8px;border:1px solid var(--border);border-radius:4px;font-size:0.8rem;background:var(--bg);color:var(--text);">
              ${[5,10,15,30,60,120].map(m => `<option value="${m}" ${(s.syncAutoBackupInterval || 30) === m ? 'selected' : ''}>${m} min</option>`).join('')}
            </select>
          </div>
        </div>
      </div>

      <button class="btn-primario" id="btnSalvarConfig" style="margin-top:16px;">Salvar Configurações</button>
    `;
  }

  aposRenderizar() {
    this.removerListeners();
    const btnSalvar = document.getElementById('btnSalvarConfig');
    if (btnSalvar) {
      const h = () => this._salvar();
      btnSalvar.addEventListener('click', h);
      this._bindCache['btnSalvarConfig'] = { el: btnSalvar, handler: h, type: 'click' };
    }
    const btnPin = document.getElementById('btnSalvarPin');
    if (btnPin) {
      const h = () => this._salvarPin();
      btnPin.addEventListener('click', h);
      this._bindCache['btnSalvarPin'] = { el: btnPin, handler: h, type: 'click' };
    }
    const btnRem = document.getElementById('btnRemoverPin');
    if (btnRem) {
      const h = () => this._removerPin();
      btnRem.addEventListener('click', h);
      this._bindCache['btnRemoverPin'] = { el: btnRem, handler: h, type: 'click' };
    }

    // Sync tabs
    document.querySelectorAll('.sync-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.sync-tab').forEach(t => t.classList.remove('ativo'));
        tab.classList.add('ativo');
        document.querySelectorAll('.sync-panel').forEach(p => p.style.display = 'none');
        const panel = document.getElementById('syncPanel' + tab.dataset.syncTab.replace('g', 'G').replace('i', 'I').replace('w', 'W'));
        if (panel) panel.style.display = 'block';
      });
    });

    // Atalhos
    document.getElementById('btnEditarAtalhos')?.addEventListener('click', () => editarAtalhos());

    // Migração de imagens
    document.getElementById('btnMigrarImagens')?.addEventListener('click', async () => {
      const btn = document.getElementById('btnMigrarImagens');
      const status = document.getElementById('migracaoStatus');
      if (btn) btn.disabled = true;
      if (status) status.textContent = 'Migrando...';
      const obras = obraStore().items;
      const count = await imageStore.migrar(obras);
      obras.forEach(o => obraStore().atualizar(o.id, o));
      if (status) status.textContent = `✓ ${count} imagem(ns) migrada(s) para IndexedDB.`;
      if (btn) btn.disabled = false;
    });

    // IndexedDB
    document.getElementById('btnIDBSnapshot')?.addEventListener('click', () => {
      cloudSync.salvarSnapshotIDB().then(() => this._mostrarIDBSnapshots());
    });
    document.getElementById('btnIDBListar')?.addEventListener('click', () => this._mostrarIDBSnapshots());

    // Google Drive
    document.getElementById('btnGoogleAuth')?.addEventListener('click', () => cloudSync.autenticarGoogle());
    document.getElementById('btnGoogleBackup')?.addEventListener('click', () => cloudSync.backupGoogle());
    document.getElementById('btnGoogleListar')?.addEventListener('click', () => this._listarGoogle());

    // WebDAV
    document.getElementById('btnWebDAVTest')?.addEventListener('click', async () => {
      this._salvar();
      const ok = await cloudSync.testarWebDAV();
      mostrarToast(ok ? '<i class="fas fa-check"></i> Conexão WebDAV OK!' : '<i class="fas fa-times"></i> Falha na conexão WebDAV');
    });
    document.getElementById('btnWebDAVBackup')?.addEventListener('click', () => cloudSync.backupWebDAV());
    document.getElementById('btnWebDAVListar')?.addEventListener('click', () => this._listarWebDAV());
  }

  async _mostrarIDBSnapshots() {
    const container = document.getElementById('idbSnapshotList');
    if (!container) return;
    container.innerHTML = '<span style="color:var(--text-muted);font-size:0.8rem;">Carregando...</span>';
    try {
      const snaps = await cloudSync.listarSnapshotsIDB();
      if (snaps.length === 0) { container.innerHTML = '<span style="color:var(--text-muted);font-size:0.8rem;">Nenhum snapshot encontrado.</span>'; return; }
      container.innerHTML = `
        <div style="max-height:200px;overflow-y:auto;">
          ${snaps.map(s => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:var(--bg);border-radius:4px;margin-bottom:4px;border:1px solid var(--border);">
              <span style="font-size:0.75rem;color:var(--text);">${s.label || s.timestamp}</span>
              <span style="font-size:0.7rem;color:var(--text-muted);">${new Date(s.timestamp).toLocaleString('pt-BR')}</span>
              <span>
                <button class="btn-miniatura btn-restaurar-idb" data-id="${s.id}" title="Restaurar">↩️</button>
                <button class="btn-miniatura btn-remover-idb" data-id="${s.id}" title="Excluir" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
              </span>
            </div>
          `).join('')}
        </div>
      `;
      container.querySelectorAll('.btn-restaurar-idb').forEach(btn => {
        btn.addEventListener('click', () => cloudSync.restaurarSnapshotIDB(Number(btn.dataset.id)).then(() => { if (this.router.viewAtual === 'configuracoes') this.router.navegar('configuracoes'); }));
      });
      container.querySelectorAll('.btn-remover-idb').forEach(btn => {
        btn.addEventListener('click', async () => {
          await cloudSync.removerSnapshotIDB(Number(btn.dataset.id));
          this._mostrarIDBSnapshots();
        });
      });
    } catch (e) {
      container.innerHTML = '<span style="color:#dc2626;font-size:0.8rem;">Erro ao carregar: ' + e.message + '</span>';
    }
  }

  async _listarGoogle() {
    const container = document.getElementById('googleBackupList');
    if (!container) return;
    container.innerHTML = '<span style="color:var(--text-muted);font-size:0.8rem;">Carregando...</span>';
    const backups = await cloudSync.listarBackupsGoogle();
    if (backups.length === 0) { container.innerHTML = '<span style="color:var(--text-muted);font-size:0.8rem;">Nenhum backup no Google Drive.</span>'; return; }
    container.innerHTML = `
      <div style="max-height:200px;overflow-y:auto;">
        ${backups.map(b => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:var(--bg);border-radius:4px;margin-bottom:4px;border:1px solid var(--border);">
            <span style="font-size:0.75rem;color:var(--text);">${b.nome}</span>
            <span style="font-size:0.7rem;color:var(--text-muted);">${new Date(b.data).toLocaleString('pt-BR')}</span>
            <button class="btn-miniatura btn-restaurar-gd" data-id="${b.id}" title="Restaurar">↩️</button>
          </div>
        `).join('')}
      </div>
    `;
    container.querySelectorAll('.btn-restaurar-gd').forEach(btn => {
      btn.addEventListener('click', () => cloudSync.restaurarGoogle(btn.dataset.id).then(() => { if (this.router.viewAtual === 'configuracoes') this.router.navegar('configuracoes'); }));
    });
  }

  async _listarWebDAV() {
    const container = document.getElementById('webdavBackupList');
    if (!container) return;
    container.innerHTML = '<span style="color:var(--text-muted);font-size:0.8rem;">Carregando...</span>';
    const backups = await cloudSync.listarBackupsWebDAV();
    if (backups.length === 0) { container.innerHTML = '<span style="color:var(--text-muted);font-size:0.8rem;">Nenhum backup no WebDAV.</span>'; return; }
    container.innerHTML = `
      <div style="max-height:200px;overflow-y:auto;">
        ${backups.map(b => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:var(--bg);border-radius:4px;margin-bottom:4px;border:1px solid var(--border);">
            <span style="font-size:0.75rem;color:var(--text);">${b.nome}</span>
            <span style="font-size:0.7rem;color:var(--text-muted);">${b.data || ''}</span>
            <button class="btn-miniatura btn-restaurar-wd" data-nome="${b.nome}" title="Restaurar">↩️</button>
          </div>
        `).join('')}
      </div>
    `;
    container.querySelectorAll('.btn-restaurar-wd').forEach(btn => {
      btn.addEventListener('click', () => cloudSync.restaurarWebDAV(btn.dataset.nome).then(() => { if (this.router.viewAtual === 'configuracoes') this.router.navegar('configuracoes'); }));
    });
  }
}
