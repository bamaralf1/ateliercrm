export class FinanceiroView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.filtroTipo = '';
    this.busca = '';
    this.selecionados = new Set();
  }

  render() {
    const transacoes = this.filtrarTransacoes();
    const todas = this.dataStore.listar('transacoes') || [];
    const entradas = todas.filter(t => t.tipo === 'entrada').reduce((s, t) => s + Number(t.valor || 0), 0);
    const saidas = todas.filter(t => t.tipo === 'saida').reduce((s, t) => s + Number(t.valor || 0), 0);
    const saldo = entradas - saidas;

    const linhas = transacoes.map(t => `
      <tr class="${this.selecionados.has(t.id) ? 'linha-selecionada' : ''}">
        <td onclick="event.stopPropagation()">
          <input type="checkbox" class="checkbox-item-fin" data-id="${t.id}" aria-label="Selecionar ${t.descricao || 'transação'}" ${this.selecionados.has(t.id) ? 'checked' : ''}>
        </td>
        <td>${sanitizarRich(t.descricao)}</td>
        <td><span class="tag-status ${t.tipo === 'entrada' ? 'vendida' : ''}" style="background:${t.tipo === 'entrada' ? '#16a34a20' : '#dc262620'};color:${t.tipo === 'entrada' ? '#16a34a' : '#dc2626'};">${t.tipo === 'entrada' ? '<i class="fas fa-dollar-sign"></i> Entrada' : '💸 Saida'}</span></td>
        <td style="font-weight:600;color:${t.tipo === 'entrada' ? '#16a34a' : '#dc2626'};">${t.tipo === 'entrada' ? '+' : '-'}${formatarMoeda(t.valor)}</td>
        <td>${formatarData(t.data)}</td>
        <td class="acoes-linha-tabela">
          <button class="btn-icone-tabela" data-excluir-transacao="${t.id}" title="Excluir" aria-label="Excluir transação"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');

    const categorias = [...new Set(todas.map(t => t.categoria).filter(Boolean))];
    const catsComTotal = categorias.map(cat => {
      const total = todas.filter(t => t.categoria === cat).reduce((s, t) => s + Number(t.valor || 0), 0);
      const pct = entradas + saidas > 0 ? Math.round(total / (entradas + saidas) * 100) : 0;
      return { nome: cat, total, pct };
    }).sort((a, b) => b.total - a.total);
    const maxTotal = catsComTotal.length > 0 ? catsComTotal[0].total : 1;
    const catsHtml = catsComTotal.map((cat, i) => {
      const hue = (i * 47 + 200) % 360;
      return `
        <div class="cat-bar-linha">
          <div class="cat-bar-label"><span>${sanitizarHTML(cat.nome)}</span><span class="cat-bar-valor">${formatarMoeda(cat.total)} (${cat.pct}%)</span></div>
          <div class="cat-bar-trilha"><div class="cat-bar-preenchimento" style="width:${Math.round(cat.total / maxTotal * 100)}%;background:hsl(${hue},55%,50%);"></div></div>
        </div>`;
    }).join('');

    const tabela = transacoes.length ? `
      <div class="tabela-wrapper" style="margin-top:16px;">
        <table>
          <caption class="sr-only">Lista de transações</caption>
          <thead><tr><th style="width:36px;"></th><th>Descricao</th><th>Tipo</th><th>Valor</th><th>Data</th><th></th></tr></thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>` : `
      <div class="tabela-wrapper" style="margin-top:16px;">
        <div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-chart-bar"></i></div><p>Nenhuma transacao encontrada.</p></div>
      </div>
    `;

    return `
      <div class="view-cabecalho">
        <div>
          <h2>Financeiro</h2>
          <p class="subtitulo">${todas.length} transacao${todas.length === 1 ? '' : 'es'} · ${formatarMoeda(entradas)} entradas · ${formatarMoeda(saidas)} saidas</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAllFin" aria-label="Selecionar todas as transações" ${this.selecionados.size === transacoes.length && transacoes.length > 0 ? 'checked' : ''}>
            <label for="selectAllFin">Todos</label>
          </div>
          <button class="btn-gradient" id="btnNovaTransacao">✚ Nova Transacao</button>
        </div>
      </div>
      ${this.selecionados.size > 0 ? this.renderBarraBulk() : ''}
      <div class="grid-cards">
        <div class="card"><div class="rotulo-card" style="color:#16a34a;"><i class="fas fa-dollar-sign"></i> Entradas</div><div class="valor-card">${formatarMoeda(entradas)}</div></div>
        <div class="card"><div class="rotulo-card" style="color:#dc2626;">💸 Saidas</div><div class="valor-card">${formatarMoeda(saidas)}</div></div>
        <div class="card"><div class="rotulo-card">🏦 Saldo</div><div class="valor-card" style="color:${saldo >= 0 ? '#16a34a' : '#dc2626'};">${formatarMoeda(saldo)}</div></div>
      </div>
      ${categorias.length ? `<div class="card" style="margin-top:12px;padding:12px 16px;"><h4 style="margin:0 0 6px;font-size:0.82rem;">Categorias</h4>${catsHtml}</div>` : ''}
      <div class="catalogo-filtros" style="margin-top:12px;">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="buscaTransacao" placeholder="Descricao..." value="${sanitizarHTML(this.busca)}" aria-label="Buscar transações">
        </div>
        <div class="campo-filtro">
          <label>Tipo</label>
          <select id="filtroTipoTransacao">
            <option value="">Todos</option>
            <option value="entrada" ${this.filtroTipo === 'entrada' ? 'selected' : ''}>Entrada</option>
            <option value="saida" ${this.filtroTipo === 'saida' ? 'selected' : ''}>Saida</option>
          </select>
        </div>
      </div>
      ${tabela}
    `;
  }

  filtrarTransacoes() {
    let lista = this.dataStore.listar('transacoes') || [];
    if (this.filtroTipo) lista = lista.filter(t => t.tipo === this.filtroTipo);
    if (this.busca) {
      const q = this.busca.toLowerCase();
      lista = lista.filter(t => (t.descricao || '').toLowerCase().includes(q));
    }
    return lista.sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0));
  }

  renderBarraBulk() {
    return `
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} transação${this.selecionados.size === 1 ? '' : 'ões'} selecionada${this.selecionados.size === 1 ? '' : 's'}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkExportFin"><i class="fas fa-file"></i> Exportar</button>
          <button class="btn-secundario" id="bulkCategoriaFin"><i class="fas fa-tag"></i> Categoria</button>
          <button class="btn-secundario btn-danger" id="bulkExcluirFin">🗑 Excluir</button>
          <button class="btn-secundario" id="bulkCancelarFin">✕ Cancelar</button>
        </div>
      </div>
    `;
  }

  async bulkAcao(acao) {
    const ids = Array.from(this.selecionados);
    if (ids.length === 0) return;
    switch (acao) {
      case 'exportar': {
        const transacoes = ids.map(id => this.dataStore.buscarPorId('transacoes', id)).filter(Boolean);
        const csv = [['descricao', 'tipo', 'valor', 'data', 'categoria'].join(','),
          ...transacoes.map(t => [t.descricao, t.tipo, t.valor || 0, t.data || '', t.categoria || ''].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
        ].join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = `transacoes-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click(); URL.revokeObjectURL(a.href);
        mostrarToast(`${transacoes.length} transação(ões) exportada(s)`, 'sucesso');
        break;
      }
      case 'categoria': {
        const todas = this.dataStore.listar('transacoes') || [];
        const cats = [...new Set(todas.map(t => t.categoria).filter(Boolean))].sort();
        abrirModal(`
          <h3>Mudar categoria em lote</h3>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">${ids.length} transação(ões) selecionada(s).</p>
          <select id="loteCategoriaSelect" aria-label="Nova categoria" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
            <option value="">— Selecione —</option>
            ${['Venda','Comissao','Material','Inscricao','Frete','Embalagem','Ferramenta','Assinatura','Outro', ...cats].filter((v,i,a) => a.indexOf(v) === i).map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
          <div class="modal-acoes" style="margin-top:12px;">
            <button type="button" class="btn-secundario" id="btnCancelarLoteCat">Cancelar</button>
            <button type="button" class="btn-primario" id="btnAplicarLoteCat">Aplicar</button>
          </div>
        `);
        document.getElementById('btnCancelarLoteCat')?.addEventListener('click', fecharModal);
        document.getElementById('btnAplicarLoteCat')?.addEventListener('click', () => {
          const novaCat = document.getElementById('loteCategoriaSelect')?.value;
          if (!novaCat) { mostrarToast('Selecione uma categoria.', 'aviso'); return; }
          ids.forEach(id => this.dataStore.atualizar('transacoes', id, { categoria: novaCat }));
          mostrarToast(`${ids.length} transação(ões) atualizada(s) para "${novaCat}"`, 'sucesso');
          fecharModal();
          this.selecionados.clear();
          this.rerenderizar();
        });
        return;
      }
      case 'excluir': {
        if (!await confirmarAcao(`Excluir ${ids.length} transação(ões) permanentemente?`)) return;
        ids.forEach(id => this.dataStore.remover('transacoes', id));
        mostrarToast(`${ids.length} transação(ões) excluída(s)`, 'sucesso');
        break;
      }
    }
    this.selecionados.clear();
    this.rerenderizar();
  }

  abrirFormTransacao(existente) {
    const e = existente || {};
    abrirModal(`
      <h3>${e.id ? '<i class="fas fa-pen"></i> Editar' : '✚ Nova'} Transacao</h3>
      <form id="formTransacao">
        <div class="campo-form"><label>Descricao *</label><input type="text" id="transDescricao" value="${sanitizarHTML(e.descricao || '')}" required aria-label="Descrição" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Tipo *</label>
            <select id="transTipo" aria-label="Tipo" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
              <option value="entrada" ${e.tipo === 'entrada' || !e.tipo ? 'selected' : ''}><i class="fas fa-dollar-sign"></i> Entrada</option>
              <option value="saida" ${e.tipo === 'saida' ? 'selected' : ''}>💸 Saida</option>
            </select>
          </div>
          <div><label>Valor (R$) *</label><input type="number" id="transValor" value="${e.valor || ''}" min="0" step="0.01" required aria-label="Valor" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Data</label><input type="date" id="transData" value="${e.data || new Date().toISOString().slice(0, 10)}" aria-label="Data" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Categoria</label>
            <select id="transCategoria" aria-label="Categoria" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
              <option value="">— Selecione —</option>
              ${['Venda','Comissao','Material','Inscricao','Frete','Embalagem','Ferramenta','Assinatura','Outro'].map(cat =>
                `<option value="${cat}" ${e.categoria === cat ? 'selected' : ''}>${cat}</option>`
              ).join('')}
            </select>
          </div>
        </div>
        <div class="campo-form"><label>Notas</label><textarea id="transNotas" aria-label="Notas" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:50px;background:var(--bg);color:var(--text);">${sanitizarHTML(e.notas || '')}</textarea></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarTrans">Cancelar</button>
          <button type="submit" class="btn-primario">${e.id ? 'Salvar' : 'Adicionar'}</button>
        </div>
      </form>
    `);
    document.getElementById('btnCancelarTrans')?.addEventListener('click', fecharModal);
    document.getElementById('formTransacao')?.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.salvarTransacao(e);
    });
  }

  salvarTransacao(existente) {
    const dados = {
      descricao: document.getElementById('transDescricao')?.value?.trim() || '',
      tipo: document.getElementById('transTipo')?.value || 'entrada',
      valor: Number(document.getElementById('transValor')?.value) || 0,
      data: document.getElementById('transData')?.value || new Date().toISOString().slice(0, 10),
      categoria: document.getElementById('transCategoria')?.value || '',
      notas: document.getElementById('transNotas')?.value?.trim() || ''
    };
    if (!dados.descricao || !dados.valor) { mostrarToast('Preencha descricao e valor.', 'aviso'); return; }
    if (existente && existente.id) {
      this.dataStore.atualizar('transacoes', existente.id, dados);
      mostrarToast('Transacao atualizada!', 'sucesso');
    } else {
      this.dataStore.adicionar('transacoes', dados);
      mostrarToast('Transacao adicionada!', 'sucesso');
    }
    fecharModal();
    this.rerenderizar();
  }

  async excluirTransacao(id) {
    if (!await confirmarAcao('Excluir esta transacao?')) return;
    const item = this.dataStore.buscarPorId('transacoes', id);
    this.dataStore.remover('transacoes', id);
    const { dataStore } = this;
    mostrarToastComDesfazer('Transacao excluida.', () => { dataStore.dados.transacoes.push(item); dataStore.salvar(); });
    this.rerenderizar();
  }

  aposRenderizar() {
    this.removerListeners();
    const container = document.getElementById('viewPrincipal');
    document.getElementById('btnNovaTransacao')?.addEventListener('click', () => this.abrirFormTransacao(null));
    document.getElementById('buscaTransacao')?.addEventListener('input', debounce((e) => {
      this.busca = e.target.value;
      this.rerenderizar(true);
    }, 250));
    document.getElementById('filtroTipoTransacao')?.addEventListener('change', (e) => {
      this.filtroTipo = e.target.value;
      this.rerenderizar();
    });

    const selectAll = document.getElementById('selectAllFin');
    if (selectAll) {
      selectAll.addEventListener('change', (e) => {
        const transacoes = this.filtrarTransacoes();
        if (e.target.checked) { transacoes.forEach(t => this.selecionados.add(t.id)); }
        else { this.selecionados.clear(); }
        this.rerenderizar();
      });
    }

    container.addEventListener('change', (e) => {
      if (e.target.classList.contains('checkbox-item-fin')) {
        const id = e.target.dataset.id;
        if (e.target.checked) { this.selecionados.add(id); }
        else { this.selecionados.delete(id); }
        this.rerenderizar();
      }
    });

    document.getElementById('bulkExportFin')?.addEventListener('click', () => this.bulkAcao('exportar'));
    document.getElementById('bulkCategoriaFin')?.addEventListener('click', () => this.bulkAcao('categoria'));
    document.getElementById('bulkExcluirFin')?.addEventListener('click', () => this.bulkAcao('excluir'));
    document.getElementById('bulkCancelarFin')?.addEventListener('click', () => { this.selecionados.clear(); this.rerenderizar(); });

    document.querySelectorAll('[data-excluir-transacao]').forEach(el => {
      el.addEventListener('click', () => this.excluirTransacao(el.dataset.excluirTransacao));
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