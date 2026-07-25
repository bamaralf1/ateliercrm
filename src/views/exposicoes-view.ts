export class ExposicoesView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.busca = '';
  }

  render() {
    const exposicoes = this.filtrarExposicoes();
    const todas = this.dataStore.listar('exposicoes') || [];

    const ativas = todas.filter(e => e.status !== 'encerrada').length;
    const linhas = exposicoes.map(ex => `
      <tr>
        <td><strong>${sanitizarHTML(ex.nome) || '-'}</strong></td>
        <td>${sanitizarHTML(ex.local) || '-'}</td>
        <td>${formatarData(ex.data)}</td>
        <td><span class="tag-status ${ex.status === 'confirmada' ? 'exposicao' : ex.status === 'encerrada' ? 'vendida' : ''}" style="background:${ex.status === 'confirmada' ? '#16a34a20' : ex.status === 'encerrada' ? '#6b728020' : '#f59e0b20'};color:${ex.status === 'confirmada' ? '#16a34a' : ex.status === 'encerrada' ? '#6b7280' : '#f59e0b'};">${ex.status || 'planejada'}</span></td>
        <td class="acoes-linha-tabela">
          <button class="btn-icone-tabela" data-editar-expo="${ex.id}" title="Editar"><i class="fas fa-pen"></i></button>
          <button class="btn-icone-tabela" data-excluir-expo="${ex.id}" title="Excluir" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');

    return `
      <div class="view-cabecalho">
        <div>
          <h2>Exposicoes</h2>
          <p class="subtitulo">${todas.length} exposicao${todas.length === 1 ? '' : 'es'} · ${ativas} ativa${ativas === 1 ? '' : 's'}</p>
        </div>
        <button class="btn-gradient" id="btnNovaExposicao">✚ Nova Exposicao</button>
      </div>
      <div class="catalogo-filtros">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="buscaExposicao" placeholder="Nome ou local..." value="${sanitizarHTML(this.busca)}">
        </div>
      </div>
      ${exposicoes.length ? `
      <div class="tabela-wrapper">
        <table>
          <thead><tr><th>Nome</th><th>Local</th><th>Data</th><th>Status</th><th></th></tr></thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>` : `
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-images"></i></div><p>Nenhuma exposicao encontrada.</p></div>
      </div>`}
    `;
  }

  filtrarExposicoes() {
    let lista = this.dataStore.listar('exposicoes') || [];
    if (this.busca) {
      const q = this.busca.toLowerCase();
      lista = lista.filter(e => (e.nome || '').toLowerCase().includes(q) || (e.local || '').toLowerCase().includes(q));
    }
    return lista.sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0));
  }

  abrirFormExposicao(existente) {
    const e = existente || {};
    abrirModal(`
      <h3>${e.id ? '<i class="fas fa-pen"></i> Editar' : '✚ Nova'} Exposicao</h3>
      <form id="formExposicao">
        <div class="campo-form"><label>Nome *</label><input type="text" id="expoNome" value="${sanitizarHTML(e.nome || '')}" required style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Local</label><input type="text" id="expoLocal" value="${sanitizarHTML(e.local || '')}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Data</label><input type="date" id="expoData" value="${e.data || new Date().toISOString().slice(0, 10)}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form">
          <label>Status</label>
          <select id="expoStatus" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
            <option value="planejada" ${e.status === 'planejada' || !e.status ? 'selected' : ''}>Planejada</option>
            <option value="confirmada" ${e.status === 'confirmada' ? 'selected' : ''}>Confirmada</option>
            <option value="encerrada" ${e.status === 'encerrada' ? 'selected' : ''}>Encerrada</option>
          </select>
        </div>
        <div class="campo-form"><label>Descricao</label><textarea id="expoDescricao" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:60px;background:var(--bg);color:var(--text);">${sanitizarHTML(e.descricao || '')}</textarea></div>
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
    if (!dados.nome) { mostrarToast('Preencha o nome da exposicao.'); return; }
    if (existente && existente.id) {
      this.dataStore.atualizar('exposicoes', existente.id, dados);
      mostrarToast('Exposicao atualizada!');
    } else {
      this.dataStore.adicionar('exposicoes', dados);
      mostrarToast('Exposicao criada!');
    }
    fecharModal();
    this.rerenderizar();
  }

  excluirExposicao(id) {
    if (!confirm('Excluir esta exposicao permanentemente?')) return;
    this.dataStore.remover('exposicoes', id);
    mostrarToast('Exposicao excluida.');
    this.rerenderizar();
  }

  aposRenderizar() {
    this.removerListeners();
    document.getElementById('btnNovaExposicao')?.addEventListener('click', () => this.abrirFormExposicao(null));
    document.getElementById('buscaExposicao')?.addEventListener('input', (e) => {
      this.busca = e.target.value;
      this.rerenderizar();
    });
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

  rerenderizar() {
    const c = document.getElementById('viewPrincipal');
    if (c) { this.removerListeners(); c.innerHTML = this.render(); this.aposRenderizar(); }
  }
}