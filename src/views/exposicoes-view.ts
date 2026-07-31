export class ExposicoesView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.busca = '';
    this.selecionados = new Set();
    this.modo = 'lista';
  }

  render() {
    const exposicoes = this.filtrarExposicoes();
    const todas = this.dataStore.listar('exposicoes') || [];

    const ativas = todas.filter(e => e.status !== 'encerrada').length;

    const conteudo = exposicoes.length > 0
      ? (this.modo === 'lista' ? this.renderTabela(exposicoes) : this.renderCards(exposicoes))
      : `<div class="tabela-wrapper"><div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-images"></i></div><p>Nenhuma exposicao encontrada.</p></div></div>`;

    return `
      <div class="view-cabecalho">
        <div>
          <h2>Exposicoes</h2>
          <p class="subtitulo">${todas.length} exposicao${todas.length === 1 ? '' : 'es'} · ${ativas} ativa${ativas === 1 ? '' : 's'}</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAllExp" aria-label="Selecionar todas as exposições" ${this.selecionados.size === exposicoes.length && exposicoes.length > 0 ? 'checked' : ''}>
            <label for="selectAllExp">Todos</label>
          </div>
          <div class="toggle-visualizacao">
            <button id="btnListaExp" class="${this.modo === 'lista' ? 'ativo' : ''}" title="Tabela">☰ Lista</button>
            <button id="btnGridExp" class="${this.modo === 'grid' ? 'ativo' : ''}" title="Cards">▦ Cards</button>
          </div>
          <button class="btn-gradient" id="btnNovaExposicao">✚ Nova Exposicao</button>
        </div>
      </div>
      ${this.selecionados.size > 0 ? this.renderBarraBulk() : ''}
      <div class="catalogo-filtros">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="buscaExposicao" placeholder="Nome ou local..." value="${sanitizarHTML(this.busca)}" aria-label="Buscar exposições">
        </div>
      </div>
      ${conteudo}
    `;
  }

  renderTabela(exposicoes) {
    const linhas = exposicoes.map(ex => `
      <tr class="${this.selecionados.has(ex.id) ? 'linha-selecionada' : ''}">
        <td onclick="event.stopPropagation()">
          <input type="checkbox" class="checkbox-item-exp" data-id="${ex.id}" aria-label="Selecionar ${ex.nome || 'exposição'}" ${this.selecionados.has(ex.id) ? 'checked' : ''}>
        </td>
        <td><strong>${sanitizarHTML(ex.nome) || '-'}</strong></td>
        <td>${sanitizarHTML(ex.local) || '-'}</td>
        <td>${formatarData(ex.data)}</td>
        <td><span class="tag-status ${ex.status === 'confirmada' ? 'exposicao' : ex.status === 'encerrada' ? 'vendida' : ''}" style="background:${ex.status === 'confirmada' ? '#16a34a20' : ex.status === 'encerrada' ? '#6b728020' : '#f59e0b20'};color:${ex.status === 'confirmada' ? '#16a34a' : ex.status === 'encerrada' ? '#6b7280' : '#f59e0b'};">${ex.status || 'planejada'}</span></td>
        <td class="acoes-linha-tabela">
          <button class="btn-icone-tabela" data-editar-expo="${ex.id}" title="Editar" aria-label="Editar exposição"><i class="fas fa-pen"></i></button>
          <button class="btn-icone-tabela" data-excluir-expo="${ex.id}" title="Excluir" aria-label="Excluir exposição" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
    return `
      <div class="tabela-wrapper">
        <table>
          <caption class="sr-only">Lista de exposições</caption>
          <thead><tr><th style="width:36px;"></th><th>Nome</th><th>Local</th><th>Data</th><th>Status</th><th></th></tr></thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>`;
  }

  renderCards(exposicoes) {
    return `
      <div class="grid-exposicoes stagger-in">
        ${exposicoes.map(ex => `
          <div class="card-exposicao ${this.selecionados.has(ex.id) ? 'selecionada' : ''}">
            <div class="checkbox-bulk">
              <input type="checkbox" class="checkbox-item-exp" data-id="${ex.id}" aria-label="Selecionar ${ex.nome || 'exposição'}" ${this.selecionados.has(ex.id) ? 'checked' : ''}>
            </div>
            <div class="exp-header">
              <strong>${sanitizarHTML(ex.nome) || '-'}</strong>
              <span class="exp-local">${sanitizarHTML(ex.local) || '-'}</span>
            </div>
            <span class="exp-data">${formatarData(ex.data)}</span>
            <span class="tag-status ${ex.status === 'confirmada' ? 'exposicao' : ex.status === 'encerrada' ? 'vendida' : ''}" style="background:${ex.status === 'confirmada' ? '#16a34a20' : ex.status === 'encerrada' ? '#6b728020' : '#f59e0b20'};color:${ex.status === 'confirmada' ? '#16a34a' : ex.status === 'encerrada' ? '#6b7280' : '#f59e0b'};">${ex.status || 'planejada'}</span>
            <div class="exp-acoes">
              <button class="btn-icone-tabela" data-editar-expo="${ex.id}" title="Editar" aria-label="Editar exposição"><i class="fas fa-pen"></i></button>
              <button class="btn-icone-tabela" data-excluir-expo="${ex.id}" title="Excluir" aria-label="Excluir exposição" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        `).join('')}
      </div>`;
  }

  filtrarExposicoes() {
    let lista = this.dataStore.listar('exposicoes') || [];
    if (this.busca) {
      const q = this.busca.toLowerCase();
      lista = lista.filter(e => (e.nome || '').toLowerCase().includes(q) || (e.local || '').toLowerCase().includes(q));
    }
    return lista.sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0));
  }

  renderBarraBulk() {
    return `
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} exposição${this.selecionados.size === 1 ? '' : 'ões'} selecionada${this.selecionados.size === 1 ? '' : 's'}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkExportExp"><i class="fas fa-file"></i> Exportar</button>
          <button class="btn-secundario btn-danger" id="bulkExcluirExp">🗑 Excluir</button>
          <button class="btn-secundario" id="bulkCancelarExp">✕ Cancelar</button>
        </div>
      </div>
    `;
  }

  async bulkAcao(acao) {
    const ids = Array.from(this.selecionados);
    if (ids.length === 0) return;
    switch (acao) {
      case 'exportar': {
        const exposicoes = ids.map(id => this.dataStore.buscarPorId('exposicoes', id)).filter(Boolean);
        const csv = [['nome', 'local', 'data', 'status', 'descricao'].join(','),
          ...exposicoes.map(ex => [ex.nome, ex.local || '', ex.data || '', ex.status || '', ex.descricao || ''].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
        ].join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = `exposicoes-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click(); URL.revokeObjectURL(a.href);
        mostrarToast(`${exposicoes.length} exposição(ões) exportada(s)`, 'sucesso');
        break;
      }
      case 'excluir': {
        if (!await confirmarAcao(`Excluir ${ids.length} exposição(ões) permanentemente?`)) return;
        ids.forEach(id => this.dataStore.remover('exposicoes', id));
        mostrarToast(`${ids.length} exposição(ões) excluída(s)`, 'sucesso');
        break;
      }
    }
    this.selecionados.clear();
    this.rerenderizar();
  }

  abrirFormExposicao(existente) {
    const e = existente || {};
    abrirModal(`
      <h3>${e.id ? '<i class="fas fa-pen"></i> Editar' : '✚ Nova'} Exposicao</h3>
      <form id="formExposicao">
        <div class="campo-form"><label>Nome *</label><input type="text" id="expoNome" value="${sanitizarHTML(e.nome || '')}" required aria-label="Nome da exposição" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Local</label><input type="text" id="expoLocal" value="${sanitizarHTML(e.local || '')}" aria-label="Local" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Data</label><input type="date" id="expoData" value="${e.data || new Date().toISOString().slice(0, 10)}" aria-label="Data" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form">
          <label>Status</label>
          <select id="expoStatus" aria-label="Status" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
            <option value="planejada" ${e.status === 'planejada' || !e.status ? 'selected' : ''}>Planejada</option>
            <option value="confirmada" ${e.status === 'confirmada' ? 'selected' : ''}>Confirmada</option>
            <option value="encerrada" ${e.status === 'encerrada' ? 'selected' : ''}>Encerrada</option>
          </select>
        </div>
        <div class="campo-form"><label>Descricao</label><textarea id="expoDescricao" aria-label="Descrição" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:60px;background:var(--bg);color:var(--text);">${sanitizarHTML(e.descricao || '')}</textarea></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarExpo">Cancelar</button>
          <button type="submit" class="btn-primario">${e.id ? 'Salvar' : 'Criar'}</button>
        </div>
      </form>
    `);
    document.getElementById('btnCancelarExpo')?.addEventListener('click', fecharModal);
    document.getElementById('formExposicao')?.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.salvarExposicao(e);
    });
  }

  salvarExposicao(existente) {
    const dados = {
      nome: document.getElementById('expoNome')?.value?.trim() || '',
      local: document.getElementById('expoLocal')?.value?.trim() || '',
      data: document.getElementById('expoData')?.value || '',
      status: document.getElementById('expoStatus')?.value || 'planejada',
      descricao: document.getElementById('expoDescricao')?.value?.trim() || ''
    };
    if (!dados.nome) { mostrarToast('Preencha o nome da exposicao.', 'aviso'); return; }
    if (existente && existente.id) {
      this.dataStore.atualizar('exposicoes', existente.id, dados);
      mostrarToast('Exposicao atualizada!', 'sucesso');
    } else {
      this.dataStore.adicionar('exposicoes', dados);
      mostrarToast('Exposicao criada!', 'sucesso');
    }
    fecharModal();
    this.rerenderizar();
  }

  async excluirExposicao(id) {
    if (!await confirmarAcao('Excluir esta exposicao permanentemente?')) return;
    const item = this.dataStore.buscarPorId('exposicoes', id);
    this.dataStore.remover('exposicoes', id);
    const { dataStore } = this;
    mostrarToastComDesfazer('Exposicao excluida.', () => { dataStore.dados.exposicoes.push(item); dataStore.salvar(); });
    this.rerenderizar();
  }

  aposRenderizar() {
    this.removerListeners();
    const container = document.getElementById('viewPrincipal');
    document.getElementById('btnNovaExposicao')?.addEventListener('click', () => this.abrirFormExposicao(null));
    document.getElementById('btnListaExp')?.addEventListener('click', () => { this.modo = 'lista'; this.rerenderizar(); });
    document.getElementById('btnGridExp')?.addEventListener('click', () => { this.modo = 'grid'; this.rerenderizar(); });

    document.getElementById('buscaExposicao')?.addEventListener('input', debounce((e) => {
      this.busca = e.target.value;
      this.rerenderizar(true);
    }, 250));

    const selectAll = document.getElementById('selectAllExp');
    if (selectAll) {
      selectAll.addEventListener('change', (e) => {
        const exposicoes = this.filtrarExposicoes();
        if (e.target.checked) { exposicoes.forEach(ex => this.selecionados.add(ex.id)); }
        else { this.selecionados.clear(); }
        this.rerenderizar();
      });
    }

    container.addEventListener('change', (e) => {
      if (e.target.classList.contains('checkbox-item-exp')) {
        const id = e.target.dataset.id;
        if (e.target.checked) { this.selecionados.add(id); }
        else { this.selecionados.delete(id); }
        this.rerenderizar();
      }
    });

    document.getElementById('bulkExportExp')?.addEventListener('click', () => this.bulkAcao('exportar'));
    document.getElementById('bulkExcluirExp')?.addEventListener('click', () => this.bulkAcao('excluir'));
    document.getElementById('bulkCancelarExp')?.addEventListener('click', () => { this.selecionados.clear(); this.rerenderizar(); });

    document.querySelectorAll('[data-editar-expo]').forEach(el => {
      el.addEventListener('click', () => {
        const ex = this.dataStore.buscarPorId('exposicoes', el.dataset.editarExpo);
        if (ex) this.abrirFormExposicao(ex);
      });
    });
    document.querySelectorAll('[data-excluir-expo]').forEach(el => {
      el.addEventListener('click', () => this.excluirExposicao(el.dataset.excluirExpo));
    });
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
}