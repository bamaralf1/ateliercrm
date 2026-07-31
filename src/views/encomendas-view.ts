const STATUS_ENCOMENDA = ['recebido','esboco','em_producao','ajustes_finais','acabamento','pronto_para_envio','entregue','cancelado'];

const STATUS_MAP = {
  recebido:{rotulo:'Recebido',cor:'#3b82f6'},
  esboco:{rotulo:'Esboço',cor:'#8b5cf6'},
  em_producao:{rotulo:'Em Produção',cor:'#f59e0b'},
  ajustes_finais:{rotulo:'Ajustes Finais',cor:'#f97316'},
  acabamento:{rotulo:'Acabamento',cor:'#ec4899'},
  pronto_para_envio:{rotulo:'Pronto p/ Envio',cor:'#14b8a6'},
  entregue:{rotulo:'Entregue',cor:'#065f46'},
  cancelado:{rotulo:'Cancelado',cor:'#dc2626'}
};

export class EncomendasView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.filtroStatus = '';
    this.busca = '';
    this.selecionados = new Set();
    this.modo = localStorage.getItem('atelier-crm-view-mode-encomendas') || 'lista';
    this.mostrarCanceladas = false;
  }

  render() {
    const encomendas = this.filtrarEncomendas();
    const todas = this.dataStore.listar('encomendas') || [];

    const statusOpts = ['',...STATUS_ENCOMENDA].map(s =>
      `<option value="${s}" ${this.filtroStatus === s ? 'selected' : ''}>${s ? this.rotuloStatus(s) : 'Todos'}</option>`
    ).join('');

    const totalPendente = todas.filter(e => e.status !== 'entregue' && e.status !== 'cancelado').length;
    const totalPrevisto = todas.reduce((s, e) => s + (e.valor || 0), 0);
    const chipsStatus = STATUS_ENCOMENDA.map(st => {
      const qtd = todas.filter(e => e.status === st).length;
      const info = STATUS_MAP[st];
      return qtd ? `<span class="chip-filtro" style="font-size:0.72rem;padding:2px 8px;border:1px solid ${info.cor}40;background:${info.cor}15;color:${info.cor};">${info.rotulo}: ${qtd}</span>` : '';
    }).join('');

    const conteudo = encomendas.length > 0
      ? (this.modo === 'lista' ? this.renderTabela(encomendas)
        : this.modo === 'grid' ? this.renderCards(encomendas)
        : this.renderKanban(encomendas))
      : `<div class="tabela-wrapper"><div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-box"></i></div><p>Nenhuma encomenda encontrada.</p></div></div>`;

    return `
      <div class="view-cabecalho">
        <div>
          <h2>Encomendas</h2>
          <p class="subtitulo">${todas.length} encomenda${todas.length === 1 ? '' : 's'} · ${totalPendente} pendente${totalPendente === 1 ? '' : 's'} · ${formatarMoeda(totalPrevisto)} previsto</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk" style="${this.modo === 'kanban' ? 'display:none' : ''}">
            <input type="checkbox" id="selectAllEnc" aria-label="Selecionar todas as encomendas" ${this.selecionados.size === encomendas.length && encomendas.length > 0 ? 'checked' : ''}>
            <label for="selectAllEnc">Todos</label>
          </div>
          <div class="toggle-visualizacao">
            <button id="btnListaEnc" class="${this.modo === 'lista' ? 'ativo' : ''}" title="Tabela">☰ Lista</button>
            <button id="btnGridEnc" class="${this.modo === 'grid' ? 'ativo' : ''}" title="Cards">▦ Cards</button>
            <button id="btnKanbanEnc" class="${this.modo === 'kanban' ? 'ativo' : ''}" title="Kanban">📋 Kanban</button>
          </div>
          <button class="btn-gradient" id="btnNovaEncomenda">✚ Nova Encomenda</button>
        </div>
      </div>
      ${this.selecionados.size > 0 ? this.renderBarraBulk() : ''}
      ${chipsStatus ? `<div class="vendas-summary">${chipsStatus}</div>` : ''}
      <div class="filtros-linha">
        <input type="text" id="buscaEncomenda" placeholder="Buscar por cliente ou descricao..." value="${sanitizarHTML(this.busca)}" aria-label="Buscar encomendas" style="flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
        ${this.modo === 'kanban' ? `<label style="display:flex;align-items:center;gap:6px;font-size:0.82rem;white-space:nowrap;color:var(--text-muted);"><input type="checkbox" id="chkMostrarCanceladas" ${this.mostrarCanceladas ? 'checked' : ''}> Mostrar canceladas</label>` : `<select id="filtroStatusEncomenda" style="padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">${statusOpts}</select>`}
        <button class="btn-secundario" id="btnPortaisCliente"><i class="fas fa-link"></i> Links de Acesso</button>
      </div>
      ${conteudo}
    `;
  }

  renderKanban(encomendas) {
    const statusColunas = this.mostrarCanceladas ? STATUS_ENCOMENDA : STATUS_ENCOMENDA.filter(s => s !== 'cancelado');

    return `
      <div class="kanban-board" id="kanbanBoardEnc">
        ${statusColunas.map(st => {
          const info = STATUS_MAP[st];
          const cards = encomendas.filter(e => e.status === st);
          return `
            <div class="kanban-coluna" data-status="${st}">
              <div class="kanban-coluna-header" style="border-left:4px solid ${info.cor};">
                <span class="kanban-coluna-titulo">${info.rotulo}</span>
                <span class="kanban-coluna-contagem">${cards.length}</span>
              </div>
              <div class="kanban-coluna-corpo">
                ${cards.map(e => this._kanbanCardHtml(e)).join('')}
                ${cards.length === 0 ? '<div class="kanban-vazio">Nenhuma</div>' : ''}
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }

  _kanbanCardHtml(e) {
    const info = STATUS_MAP[e.status] || { rotulo: e.status, cor: '#6b7280' };
    const dias = e.prazo ? Math.ceil((new Date(e.prazo) - new Date()) / 86400000) : null;
    const prazoHtml = dias !== null
      ? `<span style="font-size:0.72rem;${dias < 0 ? 'color:#dc2626;font-weight:600;' : dias <= 15 ? 'color:#f59e0b;' : 'color:var(--text-muted);'}">${formatarData(e.prazo)}${dias < 0 ? ' ⚠' : ''}</span>`
      : '';
    const stIdx = STATUS_ENCOMENDA.indexOf(e.status);
    const temAnterior = stIdx > 0 && STATUS_ENCOMENDA[stIdx - 1] !== 'cancelado';
    const temProximo = stIdx >= 0 && stIdx < STATUS_ENCOMENDA.length - 1;
    return `
      <div class="kanban-card" draggable="true" data-id="${e.id}">
        <div class="kanban-card-corpo">
          <div class="kanban-card-nome"><strong>${sanitizarHTML(e.clienteNome) || '—'}</strong></div>
          <div class="kanban-card-desc">${sanitizarRich(e.descricao) || '—'}</div>
          <div class="kanban-card-meta">
            <span style="font-weight:600;">${formatarMoeda(e.valor || 0)}</span>
            ${prazoHtml}
          </div>
        </div>
        <div class="kanban-card-acoes">
          <button class="btn-miniatura btn-editar-enc" data-id="${e.id}" title="Editar" aria-label="Editar"><i class="fas fa-pen"></i></button>
          <button class="kanban-mobile-menu-btn" data-id="${e.id}" title="Mover etapa" aria-label="Mover etapa"><i class="fas fa-ellipsis-v"></i></button>
          <div class="kanban-mobile-dropdown" data-id="${e.id}">
            ${temAnterior ? `<button class="kanban-mover-btn" data-id="${e.id}" data-status="${STATUS_ENCOMENDA[stIdx - 1]}" data-direcao="anterior">↑ ${STATUS_MAP[STATUS_ENCOMENDA[stIdx - 1]]?.rotulo}</button>` : ''}
            ${temProximo ? `<button class="kanban-mover-btn" data-id="${e.id}" data-status="${STATUS_ENCOMENDA[stIdx + 1]}" data-direcao="proximo">↓ ${STATUS_MAP[STATUS_ENCOMENDA[stIdx + 1]]?.rotulo}</button>` : ''}
          </div>
        </div>
      </div>`;
  }

  renderTabela(encomendas) {
    const linhas = encomendas.map(e => this.renderLinha(e)).join('');
    return `
      <div class="tabela-wrapper">
        <table>
          <caption class="sr-only">Lista de encomendas</caption>
          <thead><tr>
            <th style="width:36px;"></th><th>Cliente</th><th>Descrição</th><th>Valor</th><th>Prazo</th><th>Status</th><th>Ações</th>
          </tr></thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>`;
  }

  renderCards(encomendas) {
    return `
      <div class="grid-encomendas stagger-in">
        ${encomendas.map(e => {
          const st = STATUS_MAP[e.status] || { rotulo: e.status, cor: '#6b7280' };
          const dias = e.prazo ? Math.ceil((new Date(e.prazo) - new Date()) / 86400000) : null;
          const prazoCard = dias !== null
            ? `<span style="${dias < 0 ? 'color:#dc2626;font-weight:600;' : dias <= 15 ? 'color:#f59e0b;' : ''}">${formatarData(e.prazo)}${dias < 0 ? ' (atrasado)' : ` (${dias}d)`}</span>`
            : '—';
          return `
            <div class="card-encomenda ${this.selecionados.has(e.id) ? 'selecionada' : ''}">
              <div class="checkbox-bulk">
                <input type="checkbox" class="checkbox-item-enc" data-id="${e.id}" aria-label="Selecionar ${e.clienteNome || 'encomenda'}" ${this.selecionados.has(e.id) ? 'checked' : ''}>
              </div>
              <div class="enc-header">
                <strong>${sanitizarHTML(e.clienteNome) || '—'}</strong>
                ${e.clienteEmail ? `<span class="enc-email">${sanitizarHTML(e.clienteEmail)}</span>` : ''}
              </div>
              <div class="enc-descricao">${sanitizarRich(e.descricao) || '—'}</div>
              <div class="enc-valor-prazo">
                <span class="enc-valor">${formatarMoeda(e.valor || 0)}</span>
                <span class="enc-prazo">${prazoCard}</span>
              </div>
              <span class="tag-status ${this.classeStatus(e.status)}" style="background:${st.cor}20;color:${st.cor};">${st.rotulo}</span>
              <div class="enc-acoes">
                <button class="btn-miniatura btn-portal-enc" data-id="${e.id}" title="Portal" aria-label="Gerar link do portal"><i class="fas fa-link"></i></button>
                <button class="btn-miniatura btn-editar-enc" data-id="${e.id}" title="Editar" aria-label="Editar encomenda"><i class="fas fa-pen"></i></button>
                <button class="btn-miniatura btn-atualizar-enc" data-id="${e.id}" title="Atualizar" aria-label="Adicionar atualização"><i class="fas fa-pencil-alt"></i></button>
                <button class="btn-miniatura btn-exportar-enc" data-id="${e.id}" title="Exportar" aria-label="Baixar portal HTML"><i class="fas fa-download"></i></button>
                <button class="btn-miniatura btn-remover-enc" data-id="${e.id}" title="Excluir" aria-label="Excluir encomenda" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }

  rotuloStatus(s) {
    return STATUS_MAP[s]?.rotulo || s;
  }

  classeStatus(s) {
    const m = { entregue: 'vendida' };
    return m[s] || '';
  }

  filtrarEncomendas() {
    let lista = this.dataStore.listar('encomendas') || [];
    if (this.filtroStatus) lista = lista.filter(e => e.status === this.filtroStatus);
    if (this.busca) {
      const t = this.busca.toLowerCase();
      lista = lista.filter(e => (e.clienteNome || '').toLowerCase().includes(t) || (e.descricao || '').toLowerCase().includes(t));
    }
    return lista.sort((a, b) => new Date(b.criadoEm || 0) - new Date(a.criadoEm || 0));
  }

  renderLinha(e) {
    const st = STATUS_MAP[e.status] || { rotulo: e.status, cor: '#6b7280' };
    const dias = e.prazo ? Math.ceil((new Date(e.prazo) - new Date()) / 86400000) : null;
    const prazoHtml = dias !== null
      ? `<span style="${dias < 0 ? 'color:#dc2626;font-weight:600;' : dias <= 15 ? 'color:#f59e0b;' : ''}">${formatarData(e.prazo)}${dias < 0 ? ' (atrasado)' : ` (${dias}d)`}</span>`
      : '—';
    return `
      <tr class="${this.selecionados.has(e.id) ? 'linha-selecionada' : ''}">
        <td onclick="event.stopPropagation()">
          <input type="checkbox" class="checkbox-item-enc" data-id="${e.id}" aria-label="Selecionar ${e.clienteNome || 'encomenda'}" ${this.selecionados.has(e.id) ? 'checked' : ''}>
        </td>
        <td><strong>${sanitizarHTML(e.clienteNome) || '—'}</strong>${e.clienteEmail ? `<br><span style="font-size:0.75rem;color:var(--text-muted);">${sanitizarHTML(e.clienteEmail)}</span>` : ''}</td>
        <td>${sanitizarRich(e.descricao) || '—'}</td>
        <td>${formatarMoeda(e.valor || 0)}</td>
        <td>${prazoHtml}</td>
        <td><span class="tag-status ${this.classeStatus(e.status)}" style="background:${st.cor}20;color:${st.cor};">${st.rotulo}</span></td>
        <td>
          <button class="btn-miniatura btn-portal-enc" data-id="${e.id}" title="Gerar link do portal" aria-label="Gerar link do portal"><i class="fas fa-link"></i></button>
          <button class="btn-miniatura btn-editar-enc" data-id="${e.id}" title="Editar" aria-label="Editar encomenda"><i class="fas fa-pen"></i></button>
          <button class="btn-miniatura btn-atualizar-enc" data-id="${e.id}" title="Adicionar atualização" aria-label="Adicionar atualização"><i class="fas fa-pencil-alt"></i></button>
          <button class="btn-miniatura btn-exportar-enc" data-id="${e.id}" title="Baixar portal HTML" aria-label="Baixar portal HTML"><i class="fas fa-download"></i></button>
          <button class="btn-miniatura btn-remover-enc" data-id="${e.id}" title="Excluir" aria-label="Excluir encomenda" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  }

  renderBarraBulk() {
    return `
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} encomenda${this.selecionados.size === 1 ? '' : 's'} selecionada${this.selecionados.size === 1 ? '' : 's'}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkExportEnc"><i class="fas fa-file"></i> Exportar</button>
          <button class="btn-secundario btn-danger" id="bulkExcluirEnc">🗑 Excluir</button>
          <button class="btn-secundario" id="bulkCancelarEnc">✕ Cancelar</button>
        </div>
      </div>
    `;
  }

  async bulkAcao(acao) {
    const ids = Array.from(this.selecionados);
    if (ids.length === 0) return;
    switch (acao) {
      case 'exportar': {
        const encomendas = ids.map(id => this.dataStore.buscarPorId('encomendas', id)).filter(Boolean);
        const csv = [['cliente', 'email', 'descricao', 'valor', 'prazo', 'status'].join(','),
          ...encomendas.map(e => [e.clienteNome, e.clienteEmail || '', e.descricao || '', e.valor || 0, e.prazo || '', e.status].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
        ].join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = `encomendas-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click(); URL.revokeObjectURL(a.href);
        mostrarToast(`${encomendas.length} encomenda(s) exportada(s)`, 'sucesso');
        break;
      }
      case 'excluir': {
        if (!await confirmarAcao(`Excluir ${ids.length} encomenda(s) permanentemente?`)) return;
        ids.forEach(id => this.dataStore.remover('encomendas', id));
        mostrarToast(`${ids.length} encomenda(s) excluída(s)`, 'sucesso');
        break;
      }
    }
    this.selecionados.clear();
    this.rerenderizar();
  }

  // --- Modais ---
  abrirModalForm(enc) {
    const e = enc || {};
    const isEdit = !!e.id;
    const clientes = clienteStore().items;
    this._encImagens = e.imagens ? [...e.imagens] : [];
    this._encImagensRef = [];
    const optsClientes = clientes.map(c => `<option value="${c.id}" ${c.nome === e.clienteNome ? 'selected' : ''}>${c.nome} (${c.email || ''})</option>`).join('');
    const statusOpts = STATUS_ENCOMENDA.map(s =>
      `<option value="${s}" ${e.status === s ? 'selected' : ''}>${this.rotuloStatus(s)}</option>`
    ).join('');
    const extraStatus = e.status && !STATUS_ENCOMENDA.includes(e.status)
      ? `<option value="${e.status}" selected>${e.status}</option>` : '';
    abrirModal(`
      <h3>${isEdit ? '<i class="fas fa-pen"></i> Editar' : '<i class="fas fa-box"></i> Nova'} Encomenda</h3>
      <form id="formEncomenda">
        <div class="campo-form"><label>Cliente</label>
          <div style="display:flex;gap:6px;">
            <select id="encClienteSelect" aria-label="Cliente" style="flex:1;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
              <option value="">— Digitar nome manualmente —</option>
              ${optsClientes}
            </select>
          </div>
        </div>
        <div class="campo-form"><label>Nome do Cliente</label><input type="text" id="encClienteNome" value="${sanitizarHTML(e.clienteNome || '')}" aria-label="Nome do Cliente" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Email</label><input type="email" id="encClienteEmail" value="${sanitizarHTML(e.clienteEmail || '')}" aria-label="Email" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Telefone</label><input type="text" id="encClienteTel" value="${sanitizarHTML(e.clienteTelefone || '')}" aria-label="Telefone" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form"><label>Descrição</label><textarea id="encDescricao" aria-label="Descrição" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:60px;background:var(--bg);color:var(--text);">${sanitizarHTML(e.descricao || '')}</textarea></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Valor (R$)</label><input type="number" id="encValor" value="${e.valor || 0}" min="0" step="0.01" aria-label="Valor" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Prazo</label><input type="date" id="encPrazo" value="${e.prazo ? new Date(e.prazo).toISOString().slice(0, 10) : ''}" aria-label="Prazo" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form"><label>Status</label>
          <select id="encStatus" aria-label="Status" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
            ${extraStatus}${statusOpts}
          </select>
        </div>
        <div class="campo-form">
          <label>Fotos da obra/referências</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <input type="file" id="encImagens" accept="image/*" multiple aria-label="Fotos da obra" style="display:none">
            <button type="button" class="btn-secundario" id="btnEncAddImagens" style="font-size:0.8rem;padding:6px 12px;"><i class="fas fa-camera"></i> Adicionar Fotos</button>
            <span id="encContagemImagens" style="font-size:0.8rem;color:var(--text-muted);">${(e.imagens || []).length > 0 ? `${e.imagens.length} foto(s)` : ''}</span>
          </div>
          <div id="encPreviewImagens" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
            ${(e.imagens && e.imagens.length > 0) ? e.imagens.map((img, i) => `
              <div style="position:relative;width:60px;height:60px;border-radius:6px;overflow:hidden;border:1px solid var(--border);">
                <img src="${img.startsWith('idb:') ? IDB_IMG_PLACEHOLDER : img}" style="width:100%;height:100%;object-fit:cover;">
                <button type="button" class="btn-remover-foto-enc" data-idx="${i}" aria-label="Remover foto" style="position:absolute;top:1px;right:1px;width:18px;height:18px;border-radius:50%;border:none;background:#dc2626;color:#fff;font-size:0.6rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
              </div>`).join('') : ''}
          </div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarEnc">Cancelar</button>
          <button type="submit" class="btn-primario">${isEdit ? 'Salvar' : 'Criar'}</button>
        </div>
      </form>
    `);
    document.getElementById('btnCancelarEnc')?.addEventListener('click', fecharModal);
    document.getElementById('encClienteSelect')?.addEventListener('change', (ev) => {
      const c = clientes.find(cl => cl.id === ev.target.value);
      if (c) {
        document.getElementById('encClienteNome').value = c.nome;
        document.getElementById('encClienteEmail').value = c.email || '';
        document.getElementById('encClienteTel').value = c.telefone || '';
      }
    });

    const inputFotos = document.getElementById('encImagens');
    document.getElementById('btnEncAddImagens')?.addEventListener('click', () => inputFotos?.click());
    inputFotos?.addEventListener('change', (ev) => {
      const files = Array.from(ev.target.files).filter(f => f.type.startsWith('image/'));
      files.forEach(f => {
        const reader = new FileReader();
        reader.onload = async (ev2) => {
          const base64 = ev2.target.result;
          try {
            const ref = await imageStore.salvar(base64);
            const url = await imageStore.carregar(ref.medium);
            this._encImagens.push(url);
            this._encImagensRef.push(ref.medium);
          } catch {
            this._encImagens.push(base64);
            this._encImagensRef.push('');
          }
          this._renderEncPreview();
        };
        reader.readAsDataURL(f);
      });
      ev.target.value = '';
    });

    document.getElementById('encPreviewImagens')?.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.btn-remover-foto-enc');
      if (btn) {
        const idx = parseInt(btn.dataset.idx);
        this._encImagens.splice(idx, 1);
        this._encImagensRef.splice(idx, 1);
        this._renderEncPreview();
      }
    });

    document.getElementById('formEncomenda')?.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      await this.salvarEncomenda(enc);
    });
  }

  _renderEncPreview() {
    const container = document.getElementById('encPreviewImagens');
    const contagem = document.getElementById('encContagemImagens');
    if (!container) return;
    if (this._encImagens.length === 0) { container.innerHTML = ''; if (contagem) contagem.textContent = ''; return; }
    container.innerHTML = this._encImagens.map((img, i) => `
      <div style="position:relative;width:60px;height:60px;border-radius:6px;overflow:hidden;border:1px solid var(--border);">
        <img src="${img}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
        <button type="button" class="btn-remover-foto-enc" data-idx="${i}" aria-label="Remover foto" style="position:absolute;top:1px;right:1px;width:18px;height:18px;border-radius:50%;border:none;background:#dc2626;color:#fff;font-size:0.6rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      </div>`).join('');
    if (contagem) contagem.textContent = `${this._encImagens.length} foto(s)`;
  }

  abrirModalAtualizacao(encId) {
    const enc = this.dataStore.buscarPorId('encomendas', encId);
    if (!enc) { mostrarToast('Encomenda não encontrada.', 'aviso'); return; }
    const statusOpts = STATUS_ENCOMENDA.map(s =>
      `<option value="${s}" ${enc.status === s ? 'selected' : ''}>${this.rotuloStatus(s)}</option>`
    ).join('');
    abrirModal(`
      <h3><i class="fas fa-pencil-alt"></i> Atualizar Status — ${sanitizarHTML(enc.descricao)}</h3>
      <form id="formAtualizacao">
        <div class="campo-form"><label>Novo Status</label>
          <select id="atuStatus" aria-label="Novo status" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">${statusOpts}</select>
        </div>
        <div class="campo-form"><label>Mensagem para o cliente</label>
          <textarea id="atuMensagem" aria-label="Mensagem para o cliente" placeholder="Ex: Iniciei a pintura, as cores estão secando..." style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:80px;background:var(--bg);color:var(--text);"></textarea>
        </div>
        <div class="campo-form" style="font-size:0.8rem;color:var(--text-muted);">
          <i class="fas fa-lightbulb"></i> Esta atualização ficará visível no portal do cliente.
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarAtu">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar Atualização</button>
        </div>
      </form>
    `);
    document.getElementById('btnCancelarAtu')?.addEventListener('click', fecharModal);
    document.getElementById('formAtualizacao')?.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.salvarAtualizacao(enc);
    });
  }

  abrirModalPortais() {
    const portais = this.dataStore.listar('portais') || [];
    const clientes = clienteStore().items;
    const encomendas = this.dataStore.listar('encomendas') || [];

    const portaisHtml = portais.length > 0 ? portais.map(p => {
      const encCliente = encomendas.filter(e => e.clienteNome === p.clienteNome).length;
      return `
        <div class="portal-item">
          <div class="portal-item-info">
            <strong>${sanitizarHTML(p.clienteNome)}</strong>
            <span class="texto-ajuda">${encCliente} encomenda${encCliente > 1 ? 's' : ''} · ${p.ativo ? '🟢 Ativo' : '🔴 Inativo'}</span>
            <span class="texto-ajuda">Último acesso: ${p.ultimoAcesso ? formatarData(p.ultimoAcesso) : 'Nunca'}</span>
          </div>
          <div class="portal-item-acoes">
            <input type="text" readonly value="${window.location.origin}${window.location.pathname}#portal?token=${p.token}" style="padding:4px 8px;border:1px solid var(--border);border-radius:4px;font-size:0.75rem;width:240px;background:var(--bg);color:var(--text);" onclick="this.select()">
            <button class="btn-miniatura btn-copiar-link" data-link="${window.location.origin}${window.location.pathname}#portal?token=${p.token}" title="Copiar link" aria-label="Copiar link"><i class="fas fa-clipboard"></i></button>
            <button class="btn-miniatura btn-toggle-portal" data-id="${p.id}" title="${p.ativo ? 'Desativar' : 'Ativar'}" aria-label="${p.ativo ? 'Desativar portal' : 'Ativar portal'}">${p.ativo ? '<i class="fas fa-unlock"></i>' : '<i class="fas fa-lock"></i>'}</button>
            <button class="btn-miniatura btn-remover-portal" data-id="${p.id}" title="Remover" aria-label="Remover portal" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
    }).join('') : '<p style="color:var(--text-muted);text-align:center;padding:12px;">Nenhum link de acesso gerado ainda.</p>';

    const clientesComEncomenda = clientes.filter(c => encomendas.some(e => e.clienteNome === c.nome));
    const clientesOpts = clientesComEncomenda.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');

    abrirModal(`
      <h3><i class="fas fa-link"></i> Links de Acesso do Cliente</h3>
      <p class="texto-ajuda" style="margin-bottom:12px;">Gere links para que seus clientes acompanhem o status das encomendas.</p>
      <div class="portais-lista">${portaisHtml}</div>
      <hr style="margin:12px 0;border-color:var(--border);">
      <h4 style="font-size:0.85rem;margin:0 0 8px;">Gerar novo link</h4>
      <div style="display:flex;gap:8px;align-items:center;">
        <select id="selClientePortal" aria-label="Selecionar cliente" style="flex:1;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
          ${clientesOpts || '<option value="">Nenhum cliente com encomenda</option>'}
        </select>
        <button class="btn-primario" id="btnGerarPortal"><i class="fas fa-link"></i> Gerar Link</button>
      </div>
      <hr style="margin:12px 0;border-color:var(--border);">
      <h4 style="font-size:0.85rem;margin:0 0 8px;">Página autônoma do portal</h4>
      <p class="texto-ajuda" style="margin-bottom:8px;">Gere um arquivo HTML completo para hospedar em serviços gratuitos como GitHub Pages ou Vercel.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <select id="selClientePortalExport" aria-label="Selecionar cliente para exportar" style="flex:1;min-width:150px;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
          ${clientesOpts || '<option value="">Nenhum cliente com encomenda</option>'}
        </select>
        <button class="btn-primario" id="btnExportarPortal"><i class="fas fa-download"></i> Baixar HTML</button>
        <button class="btn-secundario" id="btnCopiarInstrucoes"><i class="fas fa-copy"></i> Instruções</button>
      </div>
      <div class="modal-acoes" style="margin-top:16px;">
        <button class="btn-secundario" id="btnFecharPortais">Fechar</button>
      </div>
    `);

    document.getElementById('btnFecharPortais')?.addEventListener('click', fecharModal);
    document.getElementById('btnGerarPortal')?.addEventListener('click', () => this.gerarLinkPortal());
    document.getElementById('btnExportarPortal')?.addEventListener('click', () => this.exportarPortalHTML());
    document.getElementById('btnCopiarInstrucoes')?.addEventListener('click', () => {
      const texto = `Para hospedar a página do portal:\n\n1. Crie um repositório no GitHub\n2. Faça upload do arquivo portal-cliente.html\n3. Ative o GitHub Pages em Settings > Pages\n4. Use o link: https://seuusuario.github.io/seurepo/portal-cliente.html\n\nOu hospede no Vercel arrastando o arquivo para vercel.com/new`;
      navigator.clipboard.writeText(texto).then(() => mostrarToast('Instruções copiadas!', 'info')).catch(() => mostrarToast('Erro ao copiar.', 'erro'));
    });
    document.querySelector('.portais-lista')?.addEventListener('click', (e) => {
      if (e.target.closest('.btn-copiar-link')) {
        const link = e.target.closest('.btn-copiar-link').dataset.link;
        navigator.clipboard.writeText(link).then(() => mostrarToast('Link copiado!', 'info')).catch(() => mostrarToast('Erro ao copiar.', 'erro'));
      }
      if (e.target.closest('.btn-toggle-portal')) {
        this.togglePortal(e.target.closest('.btn-toggle-portal').dataset.id);
      }
      if (e.target.closest('.btn-remover-portal')) {
        this.removerPortal(e.target.closest('.btn-remover-portal').dataset.id);
      }
    });
  }

  // --- Ações ---
  async salvarEncomenda(encExistente) {
    const dados = {
      clienteNome: document.getElementById('encClienteNome')?.value?.trim() || '',
      clienteEmail: document.getElementById('encClienteEmail')?.value?.trim() || '',
      clienteTelefone: document.getElementById('encClienteTel')?.value?.trim() || '',
      descricao: document.getElementById('encDescricao')?.value?.trim() || '',
      valor: Number(document.getElementById('encValor')?.value) || 0,
      prazo: document.getElementById('encPrazo')?.value || '',
      status: document.getElementById('encStatus')?.value || 'recebido'
    };
    if (!dados.clienteNome || !dados.descricao) { mostrarToast('Preencha nome do cliente e descrição.', 'aviso'); return; }

    const imagens = [];
    for (let i = 0; i < (this._encImagens || []).length; i++) {
      const img = this._encImagens[i];
      const ref = this._encImagensRef?.[i];
      if (ref) { imagens.push(ref); }
      else if (img && img.startsWith('data:')) {
        try { const r = await imageStore.salvar(img); imagens.push(r.medium); } catch { imagens.push(img); }
      } else { imagens.push(img || ''); }
    }
    dados.imagens = imagens;

    if (encExistente && encExistente.id) {
      const atual = this.dataStore.buscarPorId('encomendas', encExistente.id);
      dados.atualizacoes = atual?.atualizacoes || [];
      this.dataStore.atualizar('encomendas', encExistente.id, dados);
      mostrarToast('Encomenda atualizada!', 'sucesso');
      activityLogger.registrar('atualizacao', 'Encomenda atualizada', dados.clienteNome, 'atualizacao');
    } else {
      dados.atualizacoes = [{ data: new Date().toISOString(), status: 'recebido', mensagem: 'Pedido registrado.' }];
      this.dataStore.adicionar('encomendas', dados);
      mostrarToast('Encomenda criada!', 'sucesso');
      activityLogger.registrar('criacao', 'Nova encomenda', dados.clienteNome, 'criacao');
    }
    fecharModal();
    this.rerenderizar();
  }

  salvarAtualizacao(enc, statusOverride) {
    const novoStatus = statusOverride || document.getElementById('atuStatus')?.value || enc.status;
    const mensagem = statusOverride ? 'Status alterado via Kanban.' : (document.getElementById('atuMensagem')?.value?.trim() || '');
    const atualizacoes = enc.atualizacoes || [];
    atualizacoes.push({ data: new Date().toISOString(), status: novoStatus, mensagem: mensagem || 'Status atualizado.' });
    this.dataStore.atualizar('encomendas', enc.id, { status: novoStatus, atualizacoes });
    mostrarToast(`Encomenda movida para "${this.rotuloStatus(novoStatus)}"`, 'sucesso');
    activityLogger.registrar('atualizacao', `Encomenda: ${novoStatus}`, enc.clienteNome, 'atualizacao');
    fecharModal();
    this.rerenderizar();
  }

  async _moverParaStatus(encId, novoStatus) {
    const enc = this.dataStore.buscarPorId('encomendas', encId);
    if (!enc || enc.status === novoStatus) return;
    const atualizacoes = enc.atualizacoes || [];
    atualizacoes.push({ data: new Date().toISOString(), status: novoStatus, mensagem: 'Status alterado via Kanban.' });
    this.dataStore.atualizar('encomendas', encId, { status: novoStatus, atualizacoes });
    mostrarToast(`Encomenda movida para "${this.rotuloStatus(novoStatus)}"`, 'sucesso');
    activityLogger.registrar('atualizacao', `Encomenda: ${novoStatus}`, enc.clienteNome, 'atualizacao');
    this.rerenderizar();
  }

  gerarLinkPortal(encomendaId) {
    let cliente;
    let enc;
    if (encomendaId) {
      enc = this.dataStore.buscarPorId('encomendas', encomendaId);
      if (!enc) { mostrarToast('Encomenda não encontrada.', 'aviso'); return; }
      cliente = clienteStore().items.find(c => c.nome === enc.clienteNome) || { id: enc.clienteEmail || enc.id, nome: enc.clienteNome };
    } else {
      const sel = document.getElementById('selClientePortal');
      if (!sel || !sel.value) { mostrarToast('Selecione um cliente.', 'aviso'); return; }
      cliente = clienteStore().items.find(c => c.id === sel.value);
      if (!cliente) { mostrarToast('Cliente não encontrado.', 'aviso'); return; }
    }

    const portais = this.dataStore.listar('portais') || [];
    const existente = encomendaId ? portais.find(p => p.encomendaId === encomendaId) : portais.find(p => p.clienteId === cliente.id && !p.encomendaId);
    if (existente) {
      const link = window.location.origin + window.location.pathname + '#portal?token=' + existente.token;
      if (existente.ativo) { mostrarToast('Link já existe: ' + link, 'aviso'); return; }
      existente.ativo = true;
      this.dataStore.salvar();
      mostrarToast('Link reativado: ' + link, 'sucesso');
      this.rerenderizar();
      fecharModal();
      return;
    }

    const token = 'enc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
    const portal = {
      id: 'portal_' + Date.now(),
      clienteId: cliente.id,
      encomendaId: encomendaId || '',
      clienteNome: cliente.nome,
      token,
      ativo: true,
      criadoEm: new Date().toISOString(),
      ultimoAcesso: ''
    };
    this.dataStore.dados.portais.push(portal);
    this.dataStore.salvar();
    mostrarToast('Link gerado!', 'sucesso');
    activityLogger.registrar('criacao', 'Link de portal gerado', encomendaId ? (enc?.descricao || cliente.nome) : cliente.nome, 'criacao');
    this.rerenderizar();
    fecharModal();
  }

  togglePortal(portalId) {
    const portal = this.dataStore.buscarPorId('portais', portalId);
    if (!portal) return;
    portal.ativo = !portal.ativo;
    this.dataStore.salvar();
    this.rerenderizar();
    fecharModal();
  }

  async removerPortal(portalId) {
    if (!await confirmarAcao('Remover este link de acesso?')) return;
    const item = this.dataStore.buscarPorId('portais', portalId);
    this.dataStore.remover('portais', portalId);
    const { dataStore } = this;
    mostrarToastComDesfazer('Link removido.', () => { dataStore.dados.portais.push(item); dataStore.salvar(); });
    this.rerenderizar();
    fecharModal();
  }

  async exportarPortalHTML(encomendaId) {
    const enc = encomendaId ? this.dataStore.buscarPorId('encomendas', encomendaId) : null;
    if (!enc) { mostrarToast('Selecione uma encomenda para exportar.', 'aviso'); return; }
    const config = this.dataStore.obter('configuracoes') || {};

    mostrarLoading(true);
    const imgs = [];
    for (const img of (enc.imagens || [])) {
      if (img && img.startsWith('idb:')) { try { const url = await imageStore.carregar(img); imgs.push(url || img); } catch { imgs.push(img); } }
      else { imgs.push(img || ''); }
    }
    const encomenda = { ...enc, imagens: imgs.filter(Boolean) };
    const dados = {
      artista: config.nomeArtista || 'Artista',
      contatoEmail: config.email || '',
      contatoTel: config.contato || '',
      encomenda
    };

    try {
      const resp = await fetch('portal-cliente.html');
      const html = await resp.text();
      const dataStr = JSON.stringify(dados);
      const tag = '<script id="portalData" type="application/json">';
      const s = html.indexOf(tag);
      const e = html.indexOf('</script>', s);
      const novo = html.slice(0, s + tag.length) + '\n' + dataStr + '\n' + html.slice(e);
      downloadHTML(novo, `encomenda-${enc.id.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.html`);
    } catch {
      const html = gerarPortalHTML(dados);
      downloadHTML(html, `encomenda-${enc.id.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.html`);
    }
    esconderLoading();
  }

  async excluirEncomenda(id) {
    if (!await confirmarAcao('Excluir esta encomenda permanentemente?')) return;
    const item = this.dataStore.buscarPorId('encomendas', id);
    this.dataStore.remover('encomendas', id);
    const { dataStore } = this;
    mostrarToastComDesfazer('Encomenda excluída.', () => { dataStore.dados.encomendas.push(item); dataStore.salvar(); });
    this.rerenderizar();
  }

  aposRenderizar() {
    this.removerListeners();
    const container = document.getElementById('viewPrincipal');

    document.getElementById('btnNovaEncomenda')?.addEventListener('click', () => this.abrirModalForm(null));

    const salvarModo = (modo) => {
      this.modo = modo;
      localStorage.setItem('atelier-crm-view-mode-encomendas', modo);
      this.rerenderizar();
    };

    document.getElementById('btnListaEnc')?.addEventListener('click', () => salvarModo('lista'));
    document.getElementById('btnGridEnc')?.addEventListener('click', () => salvarModo('grid'));
    document.getElementById('btnKanbanEnc')?.addEventListener('click', () => salvarModo('kanban'));

    document.getElementById('buscaEncomenda')?.addEventListener('input', debounce((e) => {
      this.busca = e.target.value;
      this.rerenderizar(true);
    }, 250));
    document.getElementById('filtroStatusEncomenda')?.addEventListener('change', (e) => {
      this.filtroStatus = e.target.value;
      this.rerenderizar();
    });
    document.getElementById('btnPortaisCliente')?.addEventListener('click', () => this.abrirModalPortais());

    document.getElementById('chkMostrarCanceladas')?.addEventListener('change', (e) => {
      this.mostrarCanceladas = e.target.checked;
      this.rerenderizar();
    });

    const selectAll = document.getElementById('selectAllEnc');
    if (selectAll) {
      selectAll.addEventListener('change', (e) => {
        const encomendas = this.filtrarEncomendas();
        if (e.target.checked) { encomendas.forEach(enc => this.selecionados.add(enc.id)); }
        else { this.selecionados.clear(); }
        this.rerenderizar();
      });
    }

    container.addEventListener('change', (e) => {
      if (e.target.classList.contains('checkbox-item-enc')) {
        const id = e.target.dataset.id;
        if (e.target.checked) { this.selecionados.add(id); }
        else { this.selecionados.delete(id); }
        this.rerenderizar();
      }
    });

    document.getElementById('bulkExportEnc')?.addEventListener('click', () => this.bulkAcao('exportar'));
    document.getElementById('bulkExcluirEnc')?.addEventListener('click', () => this.bulkAcao('excluir'));
    document.getElementById('bulkCancelarEnc')?.addEventListener('click', () => { this.selecionados.clear(); this.rerenderizar(); });

    document.querySelectorAll('.btn-portal-enc').forEach(btn => {
      btn.addEventListener('click', () => {
        const enc = this.dataStore.buscarPorId('encomendas', btn.dataset.id);
        if (!enc) return;
        const portais = this.dataStore.listar('portais') || [];
        const portal = portais.find(p => p.encomendaId === enc.id);
        if (portal && portal.ativo) {
          const link = window.location.origin + window.location.pathname + '#portal?token=' + portal.token;
          navigator.clipboard.writeText(link).then(() => mostrarToast('Link copiado: ' + link, 'info')).catch(() => {});
        } else {
          this.gerarLinkPortal(enc.id);
        }
      });
    });
    document.querySelectorAll('.btn-exportar-enc').forEach(btn => {
      btn.addEventListener('click', () => this.exportarPortalHTML(btn.dataset.id));
    });
    document.querySelectorAll('.btn-editar-enc').forEach(btn => {
      btn.addEventListener('click', () => {
        const enc = this.dataStore.buscarPorId('encomendas', btn.dataset.id);
        if (enc) this.abrirModalForm(enc);
      });
    });
    document.querySelectorAll('.btn-atualizar-enc').forEach(btn => {
      btn.addEventListener('click', () => this.abrirModalAtualizacao(btn.dataset.id));
    });
    document.querySelectorAll('.btn-remover-enc').forEach(btn => {
      btn.addEventListener('click', () => this.excluirEncomenda(btn.dataset.id));
    });

    // --- DnD Kanban ---
    const kanbanBoard = document.getElementById('kanbanBoardEnc');
    if (kanbanBoard) {
      let arrastandoId = null;

      kanbanBoard.querySelectorAll('.kanban-card').forEach(card => {
        card.addEventListener('dragstart', (e) => {
          arrastandoId = card.dataset.id;
          e.dataTransfer.setData('text/plain', card.dataset.id);
          e.dataTransfer.effectAllowed = 'move';
          card.classList.add('arrastando');
        });
        card.addEventListener('dragend', () => {
          card.classList.remove('arrastando');
          kanbanBoard.querySelectorAll('.kanban-coluna').forEach(col => col.classList.remove('kanban-coluna--drag-over'));
          arrastandoId = null;
        });
      });

      kanbanBoard.querySelectorAll('.kanban-coluna-corpo').forEach(colBody => {
        colBody.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          colBody.closest('.kanban-coluna')?.classList.add('kanban-coluna--drag-over');
        });
        colBody.addEventListener('dragleave', () => {
          colBody.closest('.kanban-coluna')?.classList.remove('kanban-coluna--drag-over');
        });
        colBody.addEventListener('drop', (e) => {
          e.preventDefault();
          const col = colBody.closest('.kanban-coluna');
          col?.classList.remove('kanban-coluna--drag-over');
          const id = e.dataTransfer.getData('text/plain');
          const novoStatus = col?.dataset.status;
          if (id && novoStatus) {
            this._moverParaStatus(id, novoStatus);
          }
        });
      });

      // Mobile menu toggle (delegated)
      kanbanBoard.addEventListener('click', (e) => {
        const menuBtn = e.target.closest('.kanban-mobile-menu-btn');
        if (menuBtn) {
          e.stopPropagation();
          const id = menuBtn.dataset.id;
          kanbanBoard.querySelectorAll('.kanban-mobile-dropdown.visivel').forEach(d => {
            if (d.dataset.id !== id) d.classList.remove('visivel');
          });
          const dropdown = kanbanBoard.querySelector(`.kanban-mobile-dropdown[data-id="${id}"]`);
          dropdown?.classList.toggle('visivel');
          return;
        }

        const moverBtn = e.target.closest('.kanban-mover-btn');
        if (moverBtn) {
          const id = moverBtn.dataset.id;
          const status = moverBtn.dataset.status;
          if (id && status) {
            this._moverParaStatus(id, status);
          }
          return;
        }

        // Close any open dropdown when clicking elsewhere
        kanbanBoard.querySelectorAll('.kanban-mobile-dropdown.visivel').forEach(d => d.classList.remove('visivel'));
      });
    }
  }
}
