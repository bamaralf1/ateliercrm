export class ClientesView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.busca = '';
    this.modo = 'lista';
    this.selecionados = new Set();
    eventBus.on('abrir-novo-cliente', () => this.abrirFormulario());
  }

  clientesFiltrados() {
    let clientes = clienteStore().items;
    if (this.busca) {
      const termo = this.busca.toLowerCase();
      clientes = clientes.filter(c =>
        (c.nome || '').toLowerCase().includes(termo) ||
        (c.email || '').toLowerCase().includes(termo) ||
        (c.tags || []).some(t => t.toLowerCase().includes(termo))
      );
    }
    return [...clientes].sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
  }

  comprasDoCliente(clienteId) {
    return vendaStore().items
      .filter(v => v.clienteId === clienteId)
      .sort((a, b) => new Date(b.data) - new Date(a.data));
  }

  render() {
    const clientes = this.clientesFiltrados();
    const conteudo = clientes.length
      ? (this.modo === 'lista' ? this.renderTabela(clientes) : this.renderCards(clientes))
      : `<div class="tabela-wrapper"><div class="estado-vazio"><div class="icone-vazio">👤</div><p>Nenhum cliente encontrado.</p></div></div>`;

    const totalCompras = clientes.reduce((s, c) => s + (c.aquisicoes || 0), 0);
    return `
      <div class="view-cabecalho">
        <div>
          <h2>Clientes</h2>
          <p class="subtitulo">${clientes.length} cliente${clientes.length === 1 ? '' : 's'} · ${totalCompras} aquisição${totalCompras === 1 ? '' : 'ões'} no total</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAllCli" ${this.selecionados.size === clientes.length && clientes.length > 0 ? 'checked' : ''}>
            <label for="selectAllCli">Todos</label>
          </div>
          <div class="toggle-visualizacao">
            <button id="btnListaCli" class="${this.modo === 'lista' ? 'ativo' : ''}" title="Tabela">☰ Lista</button>
            <button id="btnGridCli" class="${this.modo === 'grid' ? 'ativo' : ''}" title="Cards">▦ Cards</button>
          </div>
          <button class="btn-gradient" id="btnNovoCliente">✚ Novo Cliente</button>
        </div>
      </div>
      ${this.selecionados.size > 0 ? this.renderBarraBulk() : ''}
      <div class="catalogo-filtros">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="buscaClientes" placeholder="Nome, e-mail ou tag..." value="${this.busca}">
        </div>
      </div>
      ${conteudo}
    `;
  }

  renderBarraBulk() {
    return `
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} cliente${this.selecionados.size === 1 ? '' : 's'} selecionado${this.selecionados.size === 1 ? '' : 's'}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkExportCli">📄 Exportar</button>
          <button class="btn-secundario btn-danger" id="bulkExcluirCli">🗑 Excluir</button>
          <button class="btn-secundario" id="bulkCancelarCli">✕ Cancelar</button>
        </div>
      </div>
    `;
  }

  renderTabela(clientes) {
    const linhas = clientes.map(c => `
      <tr class="${this.selecionados.has(c.id) ? 'linha-selecionada' : ''}">
        <td onclick="event.stopPropagation()">
          <input type="checkbox" class="checkbox-item-cli" data-id="${c.id}" ${this.selecionados.has(c.id) ? 'checked' : ''}>
        </td>
        <td data-abrir-ficha-cliente="${c.id}" style="cursor:pointer;"><strong>${c.nome}</strong></td>
        <td data-abrir-ficha-cliente="${c.id}" style="cursor:pointer;">${c.email || '-'}</td>
        <td>${c.telefone || '-'}</td>
        <td>${c.aquisicoes || 0}</td>
        <td>${(c.tags || []).map(t => `<span class="badge-tag">${t}</span>`).join('') || '-'}</td>
        <td class="acoes-linha-tabela" onclick="event.stopPropagation()">
          <button class="btn-icone-tabela" data-editar-cliente="${c.id}" title="Editar">✏️</button>
          <button class="btn-icone-tabela" data-excluir-cliente="${c.id}" title="Excluir">🗑️</button>
        </td>
      </tr>
    `).join('');
    return `
      <div class="tabela-wrapper">
        <table>
          <thead><tr><th style="width:36px;"></th><th>Nome</th><th>E-mail</th><th>Telefone</th><th>Aquisições</th><th>Tags</th><th></th></tr></thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>
    `;
  }

  renderCards(clientes) {
    return `
      <div class="grid-clientes stagger-in">
        ${clientes.map(c => `
          <div class="card-cliente ${this.selecionados.has(c.id) ? 'selecionada' : ''}">
            <div class="checkbox-bulk">
              <input type="checkbox" class="checkbox-item-cli" data-id="${c.id}" ${this.selecionados.has(c.id) ? 'checked' : ''}>
            </div>
            <div class="cc-avatar">${(c.nome || '?').charAt(0).toUpperCase()}</div>
            <div class="cc-info" data-abrir-ficha-cliente="${c.id}">
              <div class="cc-nome">${c.nome}</div>
              <div class="cc-meta">${c.email || 'sem email'}</div>
            </div>
            <div class="cc-footer">
              <span class="cc-aquisicoes">${c.aquisicoes || 0} compra${(c.aquisicoes || 0) === 1 ? '' : 's'}</span>
              <div class="cc-tags">${(c.tags || []).slice(0, 2).map(t => `<span class="badge-tag">${t}</span>`).join('')}</div>
            </div>
            <div class="cc-acoes">
              <button data-editar-cliente="${c.id}" title="Editar">✏️</button>
              <button data-excluir-cliente="${c.id}" title="Excluir">🗑️</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  aposRenderizar() {
    this.removerListeners();
    const container = document.getElementById('viewPrincipal');

    document.getElementById('btnListaCli')?.addEventListener('click', () => { this.modo = 'lista'; this.rerenderizar(); });
    document.getElementById('btnGridCli')?.addEventListener('click', () => { this.modo = 'grid'; this.rerenderizar(); });
    document.getElementById('btnNovoCliente')?.addEventListener('click', () => this.abrirFormulario());

    const campoBusca = document.getElementById('buscaClientes');
    if (campoBusca) campoBusca.addEventListener('input', (e) => { this.busca = e.target.value; this.rerenderizar(true); });

    const selectAll = document.getElementById('selectAllCli');
    if (selectAll) {
      selectAll.addEventListener('change', (e) => {
        const clientes = this.clientesFiltrados();
        if (e.target.checked) { clientes.forEach(c => this.selecionados.add(c.id)); }
        else { this.selecionados.clear(); }
        this.rerenderizar();
      });
    }

    container.addEventListener('change', (e) => {
      if (e.target.classList.contains('checkbox-item-cli')) {
        const id = e.target.dataset.id;
        if (e.target.checked) { this.selecionados.add(id); }
        else { this.selecionados.delete(id); }
        this.rerenderizar();
      }
    });

    document.getElementById('bulkExportCli')?.addEventListener('click', () => this.bulkAcao('exportar'));
    document.getElementById('bulkExcluirCli')?.addEventListener('click', () => this.bulkAcao('excluir'));
    document.getElementById('bulkCancelarCli')?.addEventListener('click', () => { this.selecionados.clear(); this.rerenderizar(); });

    const delegHandler = (e) => {
      const alvoEditar = e.target.closest('[data-editar-cliente]');
      const alvoExcluir = e.target.closest('[data-excluir-cliente]');
      const alvoFicha = e.target.closest('[data-abrir-ficha-cliente]');
      if (alvoEditar) { this.abrirFormulario(alvoEditar.dataset.editarCliente); return; }
      if (alvoExcluir) { this.excluirCliente(alvoExcluir.dataset.excluirCliente); return; }
      if (alvoFicha) { this.abrirFicha(alvoFicha.dataset.abrirFichaCliente); return; }
    };
    container.addEventListener('click', delegHandler);
    this._bindCache['delegClientes'] = { el: container, handler: delegHandler, type: 'click' };
  }

  rerenderizar(manterFoco = false) {
    const container = document.getElementById('viewPrincipal');
    const idFoco = manterFoco ? document.activeElement.id : null;
    this.removerListeners();
    container.innerHTML = this.render();
    this.aposRenderizar();
    if (idFoco) { const el = document.getElementById(idFoco); if (el) { el.focus(); const v = el.value; el.value = ''; el.value = v; } }
  }

  bulkAcao(acao) {
    const ids = Array.from(this.selecionados);
    if (ids.length === 0) return;
    switch (acao) {
      case 'exportar': {
        const clientes = ids.map(id => clienteStore().porId(id)).filter(Boolean);
        const csv = [['nome', 'email', 'telefone', 'aquisicoes', 'tags'].join(','),
          ...clientes.map(c => [c.nome, c.email || '', c.telefone || '', c.aquisicoes || 0, (c.tags || []).join(';')].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
        ].join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = `clientes-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click(); URL.revokeObjectURL(a.href);
        mostrarToast(`${clientes.length} cliente(s) exportado(s)`);
        break;
      }
      case 'excluir': {
        ids.forEach(id => {
          const c = clienteStore().porId(id);
          if (c && !vendaStore().items.some(v => v.clienteId === id)) {
            clienteStore().remover(id);
          }
        });
        mostrarToast(`${ids.length} cliente(s) excluído(s) (com vendas preservados)`);
        break;
      }
    }
    this.selecionados.clear();
    this.rerenderizar();
  }

  abrirFormulario(id = null) {
    const existente = id ? clienteStore().porId(id) : null;
    abrirModal(`
      <h3>${existente ? 'Editar Cliente' : 'Novo Cliente'}</h3>
      <form id="formCliente">
        <div class="campo-form">
          <label>Nome completo *</label>
          <input type="text" id="campoNomeCliente" value="${existente ? existente.nome : ''}" required>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>E-mail</label>
            <input type="email" id="campoEmailCliente" value="${existente ? (existente.email || '') : ''}">
          </div>
          <div class="campo-form">
            <label>Telefone</label>
            <input type="text" id="campoTelefoneCliente" value="${existente ? (existente.telefone || '') : ''}" placeholder="(00) 00000-0000">
          </div>
        </div>
        <div class="campo-form">
          <label>Endereço</label>
          <input type="text" id="campoEnderecoCliente" value="${existente ? (existente.endereco || '') : ''}">
        </div>
        <div class="campo-form">
          <label>Tags (separadas por vírgula)</label>
          <input type="text" id="campoTagsCliente" value="${existente ? (existente.tags || []).join(', ') : ''}" placeholder="Ex: colecionador, aquarela">
        </div>
        <div class="campo-form">
          <label>Notas</label>
          <textarea id="campoNotasCliente">${existente ? (existente.notas || '') : ''}</textarea>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarCliente">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar Cliente</button>
        </div>
      </form>
    `);
    document.getElementById('btnCancelarCliente').addEventListener('click', fecharModal);
    document.getElementById('formCliente').addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('campoNomeCliente').value.trim();
      if (!nome) { mostrarToast('O nome do cliente é obrigatório.'); return; }
      const tags = document.getElementById('campoTagsCliente').value.split(',').map(t => t.trim()).filter(Boolean);
      const dados = {
        nome,
        email: document.getElementById('campoEmailCliente').value.trim(),
        telefone: document.getElementById('campoTelefoneCliente').value.trim(),
        endereco: document.getElementById('campoEnderecoCliente').value.trim(),
        notas: document.getElementById('campoNotasCliente').value.trim(),
        tags
      };
      if (existente) {
        clienteStore().atualizar(existente.id, dados);
        mostrarToast('Cliente atualizado com sucesso!');
      } else {
        dados.aquisicoes = 0;
        clienteStore().adicionar(dados);
        mostrarToast('Cliente cadastrado com sucesso!');
      }
      fecharModal();
      this.router.navegar('clientes');
    });
  }

  excluirCliente(id) {
    const cliente = clienteStore().porId(id);
    if (!cliente) return;
    const temVendas = vendaStore().items.some(v => v.clienteId === id);
    if (temVendas) { mostrarToast('Este cliente possui vendas registradas e não pode ser excluído.'); return; }
    if (!confirm(`Excluir o cliente "${cliente.nome}"?`)) return;
    clienteStore().remover(id);
    this.rerenderizar();
  }

  abrirFicha(id) {
    const c = clienteStore().porId(id);
    if (!c) return;
    const compras = this.comprasDoCliente(id);
    const obras = obraStore().items;
    const timelineHtml = compras.length ? compras.map(v => {
      const obra = obras.find(o => o.id === v.obraId);
      return `
        <li class="timeline-item">
          <div class="timeline-data">${formatarData(v.data)}</div>
          <div class="timeline-conteudo">
            <strong>${obra ? obra.titulo : 'Obra removida'}</strong>
            ${formatarMoeda(v.precoFinal)} · <span class="tag-status ${classeStatusVenda(v.status)}">${rotuloStatusVenda(v.status)}</span>
          </div>
        </li>
      `;
    }).join('') : '<p style="font-size:0.85rem;color:var(--text-muted);">Nenhuma compra registrada ainda.</p>';

    abrirModal(`
      <h3>${c.nome}</h3>
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">${c.email || 'sem e-mail'} · ${c.telefone || 'sem telefone'}</p>
      <div style="margin-bottom:10px;">${(c.tags || []).map(t => `<span class="badge-tag">${t}</span>`).join('') || ''}</div>
      ${c.endereco ? `<p style="font-size:0.82rem;margin-top:8px;"><strong>Endereço:</strong> ${c.endereco}</p>` : ''}
      ${c.notas ? `<p style="font-size:0.82rem;margin-top:6px;"><strong>Notas:</strong> ${c.notas}</p>` : ''}
      <h3 style="margin-top:20px;font-size:0.95rem;">Histórico de compras</h3>
      <ul class="timeline-cliente">${timelineHtml}</ul>
      <div class="modal-acoes">
        <button class="btn-secundario" id="btnFecharFichaCliente">Fechar</button>
        <button class="btn-primario" id="btnEditarFichaCliente">✏️ Editar</button>
      </div>
    `);
    document.getElementById('btnFecharFichaCliente').addEventListener('click', fecharModal);
    document.getElementById('btnEditarFichaCliente').addEventListener('click', () => { fecharModal(); this.abrirFormulario(c.id); });
  }
}
