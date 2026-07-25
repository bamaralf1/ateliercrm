export class ExportImportView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.abaAtiva = 'exportar';
    this.previewData = null;
    this.arquivoCarregado = null;
  }

  render() {
    return `
      <div class="view-cabecalho">
        <div>
          <h2><i class="fas fa-box"></i> Exportar / Importar Dados</h2>
          <p class="subtitulo">Backup completo, exportação seletiva e restauração</p>
        </div>
      </div>
      <div class="ei-tabs">
        <button class="ei-tab ${this.abaAtiva === 'exportar' ? 'ativo' : ''}" data-ei-tab="exportar">📤 Exportar</button>
        <button class="ei-tab ${this.abaAtiva === 'importar' ? 'ativo' : ''}" data-ei-tab="importar">📥 Importar</button>
        <button class="ei-tab ${this.abaAtiva === 'historico' ? 'ativo' : ''}" data-ei-tab="historico">🕐 Histórico</button>
      </div>
      <div class="ei-painel">${this.renderPainel()}</div>
    `;
  }

  renderPainel() {
    if (this.abaAtiva === 'exportar') return this.renderExportar();
    if (this.abaAtiva === 'importar') return this.renderImportar();
    return this.renderHistorico();
  }

  renderExportar() {
    const colecoes = ['obras', 'clientes', 'vendas', 'encomendas', 'contatosProfissionais', 'interacoes', 'eventos', 'financas'];
    const contagens = {};
    colecoes.forEach(c => { contagens[c] = (this.dataStore.listar(c) || []).length; });
    const totalRegistros = Object.values(contagens).reduce((a, b) => a + b, 0);

    const cards = colecoes.map(c => {
      const rotulos = { obras: '<i class="fas fa-images"></i> Obras', clientes: '<i class="fas fa-user"></i> Clientes', vendas: '<i class="fas fa-dollar-sign"></i> Vendas', encomendas: '<i class="fas fa-box"></i> Encomendas', contatosProfissionais: '🤝 Contatos', interacoes: '💬 Interações', eventos: '🎪 Eventos', financas: '<i class="fas fa-chart-line"></i> Finanças' };
      return `
        <div class="ei-colecao-card" data-colecao="${c}">
          <div class="eicc-header"><span class="eicc-icone">${rotulos[c] || c}</span><span class="eicc-nome">${c}</span></div>
          <div class="eicc-qtd">${contagens[c]} registros</div>
          <div class="eicc-acoes">
            <button class="btn-miniatura ei-export-json" data-colecao="${c}" title="Exportar JSON"><i class="fas fa-clipboard"></i> JSON</button>
            <button class="btn-miniatura ei-export-csv" data-colecao="${c}" title="Exportar CSV"><i class="fas fa-chart-bar"></i> CSV</button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="ei-export-grid">
        <div class="ei-secao-destaque">
          <div class="ei-destaque-icon"><i class="fas fa-save"></i></div>
          <div class="ei-destaque-info">
            <h3>Backup Completo</h3>
            <p>Exporta todos os dados do CRM em um único arquivo JSON.</p>
            <p style="font-size:0.8rem;color:var(--text-muted);">${totalRegistros} registros · ${Object.keys(contagens).length} coleções</p>
          </div>
          <button class="btn-primario" id="eiBackupCompleto">📥 Exportar Tudo</button>
        </div>
        <div class="ei-secao">
          <h3 style="margin-bottom:12px;">Exportar por Coleção</h3>
          <div class="ei-cards-grid">${cards}</div>
        </div>
      </div>
    `;
  }

  renderImportar() {
    const previewHtml = this.previewData && this.arquivoCarregado ? this.renderPreview() : '';
    return `
      <div class="ei-import-area" id="eiDropZone">
        <div class="ei-drop-content">
          <div class="ei-drop-icon">📥</div>
          <p><strong>Arraste um arquivo JSON</strong> ou clique para selecionar</p>
          <p style="font-size:0.8rem;color:var(--text-muted);">Formatos aceitos: backup completo (.json) ou exportação parcial</p>
        </div>
        <input type="file" id="eiFileInput" accept=".json" style="display:none;">
      </div>
      <div id="eiPreviewContainer">${previewHtml}</div>
    `;
  }

  renderPreview() {
    if (!this.previewData || !this.previewData.valido) {
      return `<div class="ei-preview-box ei-preview-erro"><span><i class="fas fa-times"></i></span> Arquivo inválido: ${this.previewData?.erro || 'formato não reconhecido'}</div>`;
    }
    const linhas = this.previewData.colecoes.map(c =>
      `<tr><td>${c.nome}</td><td>${c.quantidade}</td><td>${c.quantidade > 0 ? '<i class="fas fa-plus-circle"></i> Novos dados' : '—'}</td></tr>`
    ).join('');
    const isCompleto = this.previewData.tipo === 'completo';
    return `
      <div class="ei-preview-box">
        <div class="ei-preview-header">
          <span class="ei-preview-badge ${isCompleto ? 'ei-bg-azul' : 'ei-bg-verde'}">${isCompleto ? 'Backup Completo' : 'Dados Parciais'}</span>
          <span style="color:var(--text-muted);font-size:0.85rem;">${this.arquivoCarregado}</span>
        </div>
        <table class="ei-preview-tabela">
          <thead><tr><th>Coleção</th><th>Registros</th><th>Ação</th></tr></thead>
          <tbody>${linhas}</tbody>
        </table>
        <div class="ei-import-opcoes">
          <label class="ei-checkbox"><input type="radio" name="eiModo" value="substituir" checked> Substituir dados existentes</label>
          <label class="ei-checkbox"><input type="radio" name="eiModo" value="mesclar"> Mesclar com dados existentes (mantém IDs duplicados)</label>
        </div>
        <div class="ei-import-acoes">
          <button class="btn-primario" id="eiConfirmarImport"><i class="fas fa-check"></i> Confirmar Importação</button>
          <button class="btn-secundario" id="eiCancelarImport">Cancelar</button>
        </div>
      </div>
    `;
  }

  renderHistorico() {
    const historico = this.dataStore.obterHistoricoExport() || [];
    if (historico.length === 0) {
      return `<div class="estado-vazio"><div class="icone-vazio">🕐</div><p>Nenhum backup exportado ainda.</p></div>`;
    }
    const linhas = historico.map((h, i) => {
      const tamanho = h.tamanho > 1024 ? `${(h.tamanho / 1024).toFixed(1)} KB` : `${h.tamanho} B`;
      const data = formatarData(h.data);
      const tipo = typeof h.tipo === 'string' ? h.tipo : 'completo';
      return `
        <tr>
          <td>${data}</td>
          <td><span class="tag-status" style="background:var(--accent)15;color:var(--accent);">${tipo}</span></td>
          <td>${tamanho}</td>
        </tr>
      `;
    }).join('');
    return `
      <div class="ei-historico">
        <p style="margin-bottom:12px;color:var(--text-muted);font-size:0.85rem;">Últimos ${historico.length} backups exportados.</p>
        <div class="tabela-wrapper">
          <table>
            <thead><tr><th>Data</th><th>Tipo</th><th>Tamanho</th></tr></thead>
            <tbody>${linhas}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  aposRenderizar() {
    this.configurarTabs();
    this.configurarExportar();
    this.configurarImportar();
    this.configurarHistorico();
  }

  configurarTabs() {
    document.querySelectorAll('.ei-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.abaAtiva = tab.dataset.eiTab;
        const painel = document.querySelector('.ei-painel');
        if (painel) {
          painel.innerHTML = this.renderPainel();
          this.aposRenderizar();
        }
      });
    });
  }

  configurarExportar() {
    document.getElementById('eiBackupCompleto')?.addEventListener('click', () => {
      this.dataStore.exportarBackup();
    });
    document.querySelectorAll('.ei-export-json').forEach(btn => {
      btn.addEventListener('click', () => {
        this.dataStore.exportarColecao(btn.dataset.colecao);
      });
    });
    document.querySelectorAll('.ei-export-csv').forEach(btn => {
      btn.addEventListener('click', () => {
        this.exportarCSV(btn.dataset.colecao);
      });
    });
  }

  exportarCSV(colecao) {
    const itens = this.dataStore.listar(colecao) || [];
    if (itens.length === 0) { mostrarToast('Nenhum registro para exportar.', 'erro'); return; }
    const cabecalhos = Object.keys(itens[0]).filter(k => !k.startsWith('_'));
    const linhas = itens.map(item => cabecalhos.map(k => {
      const v = item[k];
      if (v === null || v === undefined) return '';
      const s = String(v);
      return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(','));
    const csv = [cabecalhos.join(','), ...linhas].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atelier-crm-${colecao}-${new Date().toISOString().replace(/[:.]/g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.dataStore.salvarHistoricoExport(colecao, { tipo: 'csv', tamanho: csv.length });
    mostrarToast(`<i class="fas fa-chart-bar"></i> CSV exportado: ${itens.length} registros`, 'sucesso');
  }

  configurarImportar() {
    const dropZone = document.getElementById('eiDropZone');
    const fileInput = document.getElementById('eiFileInput');
    if (!dropZone) return;

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('ei-drop-over');
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('ei-drop-over');
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('ei-drop-over');
      const file = e.dataTransfer.files[0];
      if (file) this.processarArquivo(file);
    });
    fileInput.addEventListener('change', () => {
      if (fileInput.files[0]) this.processarArquivo(fileInput.files[0]);
    });
  }

  processarArquivo(file) {
    if (!file.name.endsWith('.json')) {
      mostrarToast('Apenas arquivos .json são suportados.', 'erro');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const texto = e.target.result;
      const preview = this.dataStore.previewImport(texto);
      this.previewData = preview;
      this.arquivoCarregado = file.name;
      const container = document.getElementById('eiPreviewContainer');
      if (container) {
        container.innerHTML = this.renderPreview();
        this.configurarAcoesImport(texto);
      }
    };
    reader.readAsText(file);
  }

  configurarAcoesImport(jsonTexto) {
    document.getElementById('eiConfirmarImport')?.addEventListener('click', () => {
      const modo = document.querySelector('input[name="eiModo"]:checked')?.value || 'substituir';
      const resultado = this.dataStore.importarBackup(jsonTexto);
      if (resultado.sucesso) {
        mostrarToast(`<i class="fas fa-check"></i> Dados importados com sucesso (${resultado.tipo})`, 'sucesso');
        this.previewData = null;
        this.arquivoCarregado = null;
        const container = document.getElementById('eiPreviewContainer');
        if (container) container.innerHTML = '';
        if (this.router) this.router.navegar(this.router.viewAtual);
      } else {
        mostrarToast(`<i class="fas fa-times"></i> Erro na importação: ${resultado.erro}`, 'erro');
      }
    });
    document.getElementById('eiCancelarImport')?.addEventListener('click', () => {
      this.previewData = null;
      this.arquivoCarregado = null;
      const container = document.getElementById('eiPreviewContainer');
      if (container) container.innerHTML = '';
    });
  }

  configurarHistorico() {}
}
