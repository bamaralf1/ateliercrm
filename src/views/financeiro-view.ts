export class FinanceiroView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.filtroTipo = '';
    this.busca = '';
  }

  render() {
    const transacoes = this.filtrarTransacoes();
    const todas = this.dataStore.listar('transacoes') || [];
    const entradas = todas.filter(t => t.tipo === 'entrada').reduce((s, t) => s + Number(t.valor || 0), 0);
    const saidas = todas.filter(t => t.tipo === 'saida').reduce((s, t) => s + Number(t.valor || 0), 0);
    const saldo = entradas - saidas;

    const linhas = transacoes.map(t => `
      <tr>
        <td>${sanitizarRich(t.descricao)}</td>
        <td><span class="tag-status ${t.tipo === 'entrada' ? 'vendida' : ''}" style="background:${t.tipo === 'entrada' ? '#16a34a20' : '#dc262620'};color:${t.tipo === 'entrada' ? '#16a34a' : '#dc2626'};">${t.tipo === 'entrada' ? '<i class="fas fa-dollar-sign"></i> Entrada' : '💸 Saida'}</span></td>
        <td style="font-weight:600;color:${t.tipo === 'entrada' ? '#16a34a' : '#dc2626'};">${t.tipo === 'entrada' ? '+' : '-'}${formatarMoeda(t.valor)}</td>
        <td>${formatarData(t.data)}</td>
        <td class="acoes-linha-tabela">
          <button class="btn-icone-tabela" data-excluir-transacao="${t.id}" title="Excluir"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join('');

    const categorias = [...new Set(todas.map(t => t.categoria).filter(Boolean))];
    const catsHtml = categorias.map(cat => {
      const total = todas.filter(t => t.categoria === cat).reduce((s, t) => s + Number(t.valor || 0), 0);
      const pct = entradas + saidas > 0 ? Math.round(total / (entradas + saidas) * 100) : 0;
      return `<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.8rem;border-bottom:1px solid var(--border);"><span>${sanitizarHTML(cat)}</span><span style="font-weight:600;">${formatarMoeda(total)} (${pct}%)</span></div>`;
    }).join('');

    const tabela = transacoes.length ? `
      <div class="tabela-wrapper" style="margin-top:16px;">
        <table>
          <thead><tr><th>Descricao</th><th>Tipo</th><th>Valor</th><th>Data</th><th></th></tr></thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>
    ` : `
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
        <button class="btn-gradient" id="btnNovaTransacao">✚ Nova Transacao</button>
      </div>
      <div class="grid-cards">
        <div class="card"><div class="rotulo-card" style="color:#16a34a;"><i class="fas fa-dollar-sign"></i> Entradas</div><div class="valor-card">${formatarMoeda(entradas)}</div></div>
        <div class="card"><div class="rotulo-card" style="color:#dc2626;">💸 Saidas</div><div class="valor-card">${formatarMoeda(saidas)}</div></div>
        <div class="card"><div class="rotulo-card">🏦 Saldo</div><div class="valor-card" style="color:${saldo >= 0 ? '#16a34a' : '#dc2626'};">${formatarMoeda(saldo)}</div></div>
      </div>
      ${categorias.length ? `<div class="card" style="margin-top:12px;padding:12px 16px;"><h4 style="margin:0 0 6px;font-size:0.82rem;">Categorias</h4>${catsHtml}</div>` : ''}
      <div class="catalogo-filtros" style="margin-top:12px;">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="buscaTransacao" placeholder="Descricao..." value="${sanitizarHTML(this.busca)}">
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

  abrirFormTransacao(existente) {
    const e = existente || {};
    abrirModal(`
      <h3>${e.id ? '<i class="fas fa-pen"></i> Editar' : '✚ Nova'} Transacao</h3>
      <form id="formTransacao">
        <div class="campo-form"><label>Descricao *</label><input type="text" id="transDescricao" value="${sanitizarHTML(e.descricao || '')}" required style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Tipo *</label>
            <select id="transTipo" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
              <option value="entrada" ${e.tipo === 'entrada' || !e.tipo ? 'selected' : ''}><i class="fas fa-dollar-sign"></i> Entrada</option>
              <option value="saida" ${e.tipo === 'saida' ? 'selected' : ''}>💸 Saida</option>
            </select>
          </div>
          <div><label>Valor (R$) *</label><input type="number" id="transValor" value="${e.valor || ''}" min="0" step="0.01" required style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Data</label><input type="date" id="transData" value="${e.data || new Date().toISOString().slice(0, 10)}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Categoria</label>
            <select id="transCategoria" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
              <option value="">— Selecione —</option>
              ${['Venda','Comissao','Material','Inscricao','Frete','Embalagem','Ferramenta','Assinatura','Outro'].map(cat =>
                `<option value="${cat}" ${e.categoria === cat ? 'selected' : ''}>${cat}</option>`
              ).join('')}
            </select>
          </div>
        </div>
        <div class="campo-form"><label>Notas</label><textarea id="transNotas" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:50px;background:var(--bg);color:var(--text);">${sanitizarHTML(e.notas || '')}</textarea></div>
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
    if (!dados.descricao || !dados.valor) { mostrarToast('Preencha descricao e valor.'); return; }
    if (existente && existente.id) {
      this.dataStore.atualizar('transacoes', existente.id, dados);
      mostrarToast('Transacao atualizada!');
    } else {
      this.dataStore.adicionar('transacoes', dados);
      mostrarToast('Transacao adicionada!');
    }
    fecharModal();
    this.rerenderizar();
  }

  excluirTransacao(id) {
    if (!confirm('Excluir esta transacao?')) return;
    this.dataStore.remover('transacoes', id);
    mostrarToast('Transacao excluida.');
    this.rerenderizar();
  }

  aposRenderizar() {
    this.removerListeners();
    document.getElementById('btnNovaTransacao')?.addEventListener('click', () => this.abrirFormTransacao(null));
    document.getElementById('buscaTransacao')?.addEventListener('input', (e) => {
      this.busca = e.target.value;
      this.rerenderizar();
    });
    document.getElementById('filtroTipoTransacao')?.addEventListener('change', (e) => {
      this.filtroTipo = e.target.value;
      this.rerenderizar();
    });
    document.querySelectorAll('[data-excluir-transacao]').forEach(el => {
      el.addEventListener('click', () => this.excluirTransacao(el.dataset.excluirTransacao));
    });
  }

  rerenderizar() {
    const c = document.getElementById('viewPrincipal');
    if (c) { this.removerListeners(); c.innerHTML = this.render(); this.aposRenderizar(); }
  }
}