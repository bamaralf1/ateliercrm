export class EncomendasView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.filtroStatus = '';
    this.busca = '';
  }

  render() {
    const encomendas = this.filtrarEncomendas();
    const todas = this.dataStore.listar('encomendas') || [];
    const linhas = encomendas.map(e => this.renderLinha(e)).join('');

    const statusOpts = ['','criado','em_andamento','aprovacao','finalizado','entregue','cancelado'].map(s =>
      `<option value="${s}" ${this.filtroStatus === s ? 'selected' : ''}>${s ? this.rotuloStatus(s) : 'Todos'}</option>`
    ).join('');

    const totalPendente = todas.filter(e => !['entregue','cancelado','finalizado'].includes(e.status)).length;
    const totalPrevisto = todas.reduce((s, e) => s + (e.valor || 0), 0);
    const chipsStatus = ['criado','em_andamento','aprovacao','finalizado','entregue','cancelado'].map(st => {
      const qtd = todas.filter(e => e.status === st).length;
      const stInfo = { criado: { rot: 'Criado', cor: '#3b82f6' }, em_andamento: { rot: 'Andamento', cor: '#f59e0b' }, aprovacao: { rot: 'Aprovação', cor: '#8b5cf6' }, finalizado: { rot: 'Finalizado', cor: '#16a34a' }, entregue: { rot: 'Entregue', cor: '#065f46' }, cancelado: { rot: 'Cancelado', cor: '#dc2626' } };
      return qtd ? `<span class="chip-filtro" style="font-size:0.72rem;padding:2px 8px;border:1px solid ${stInfo[st].cor}40;background:${stInfo[st].cor}15;color:${stInfo[st].cor};">${stInfo[st].rot}: ${qtd}</span>` : '';
    }).join('');

    return `
      <div class="view-cabecalho">
        <div>
          <h2>Encomendas</h2>
          <p class="subtitulo">${todas.length} encomenda${todas.length === 1 ? '' : 's'} · ${totalPendente} pendente${totalPendente === 1 ? '' : 's'} · ${formatarMoeda(totalPrevisto)} previsto</p>
        </div>
        <button class="btn-gradient" id="btnNovaEncomenda">✚ Nova Encomenda</button>
      </div>
      ${chipsStatus ? `<div class="vendas-summary">${chipsStatus}</div>` : ''}
      <div class="filtros-linha">
        <input type="text" id="buscaEncomenda" placeholder="<i class="fas fa-search"></i> Buscar por cliente ou descrição..." value="${sanitizarHTML(this.busca)}" style="flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
        <select id="filtroStatusEncomenda" style="padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">${statusOpts}</select>
        <button class="btn-secundario" id="btnPortaisCliente"><i class="fas fa-link"></i> Links de Acesso</button>
      </div>
      ${encomendas.length > 0 ? `
      <div class="tabela-wrapper">
        <table>
          <thead><tr>
            <th>Cliente</th><th>Descrição</th><th>Valor</th><th>Prazo</th><th>Status</th><th>Ações</th>
          </tr></thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>` : `
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-box"></i></div><p>Nenhuma encomenda encontrada.</p></div>
      </div>`}
    `;
  }

  rotuloStatus(s) {
    const m = { criado: 'Criado', em_andamento: 'Em Andamento', aprovacao: 'Aprovação', finalizado: 'Finalizado', entregue: 'Entregue', cancelado: 'Cancelado' };
    return m[s] || s;
  }

  classeStatus(s) {
    const m = { criado: '', em_andamento: 'exposicao', aprovacao: 'reservada', finalizado: 'vendida', entregue: 'vendida', cancelado: '' };
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
    const statusMap = {
      criado: { rotulo: 'Criado', cor: '#3b82f6' },
      em_andamento: { rotulo: 'Em Andamento', cor: '#f59e0b' },
      aprovacao: { rotulo: 'Aprovação', cor: '#8b5cf6' },
      finalizado: { rotulo: 'Finalizado', cor: '#16a34a' },
      entregue: { rotulo: 'Entregue', cor: '#065f46' },
      cancelado: { rotulo: 'Cancelado', cor: '#dc2626' }
    };
    const st = statusMap[e.status] || { rotulo: e.status, cor: '#6b7280' };
    const dias = e.prazo ? Math.ceil((new Date(e.prazo) - new Date()) / 86400000) : null;
    const prazoHtml = dias !== null
      ? `<span style="${dias < 0 ? 'color:#dc2626;font-weight:600;' : dias <= 15 ? 'color:#f59e0b;' : ''}">${formatarData(e.prazo)}${dias < 0 ? ' (atrasado)' : ` (${dias}d)`}</span>`
      : '—';
    return `
      <tr>
        <td><strong>${sanitizarHTML(e.clienteNome) || '—'}</strong>${e.clienteEmail ? `<br><span style="font-size:0.75rem;color:var(--text-muted);">${sanitizarHTML(e.clienteEmail)}</span>` : ''}</td>
        <td>${sanitizarRich(e.descricao) || '—'}</td>
        <td>${formatarMoeda(e.valor || 0)}</td>
        <td>${prazoHtml}</td>
        <td><span class="tag-status ${this.classeStatus(e.status)}" style="background:${st.cor}20;color:${st.cor};">${st.rotulo}</span></td>
        <td>
          <button class="btn-miniatura btn-editar-enc" data-id="${e.id}" title="Editar"><i class="fas fa-pen"></i></button>
          <button class="btn-miniatura btn-atualizar-enc" data-id="${e.id}" title="Adicionar atualização"><i class="fas fa-pencil-alt"></i></button>
          <button class="btn-miniatura btn-remover-enc" data-id="${e.id}" title="Excluir" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  }

  // --- Modais ---
  abrirModalForm(enc) {
    const e = enc || {};
    const isEdit = !!e.id;
    const clientes = clienteStore().items;
    this._encImagens = e.imagens ? [...e.imagens] : [];
    this._encImagensRef = [];
    const optsClientes = clientes.map(c => `<option value="${c.id}" ${c.nome === e.clienteNome ? 'selected' : ''}>${c.nome} (${c.email || ''})</option>`).join('');
    abrirModal(`
      <h3>${isEdit ? '<i class="fas fa-pen"></i> Editar' : '<i class="fas fa-box"></i> Nova'} Encomenda</h3>
      <form id="formEncomenda">
        <div class="campo-form"><label>Cliente</label>
          <div style="display:flex;gap:6px;">
            <select id="encClienteSelect" style="flex:1;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
              <option value="">— Digitar nome manualmente —</option>
              ${optsClientes}
            </select>
          </div>
        </div>
        <div class="campo-form"><label>Nome do Cliente</label><input type="text" id="encClienteNome" value="${sanitizarHTML(e.clienteNome || '')}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Email</label><input type="email" id="encClienteEmail" value="${sanitizarHTML(e.clienteEmail || '')}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Telefone</label><input type="text" id="encClienteTel" value="${sanitizarHTML(e.clienteTelefone || '')}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form"><label>Descrição</label><textarea id="encDescricao" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:60px;background:var(--bg);color:var(--text);">${sanitizarHTML(e.descricao || '')}</textarea></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Valor (R$)</label><input type="number" id="encValor" value="${e.valor || 0}" min="0" step="0.01" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Prazo</label><input type="date" id="encPrazo" value="${e.prazo ? new Date(e.prazo).toISOString().slice(0, 10) : ''}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form"><label>Status</label>
          <select id="encStatus" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
            ${['criado','em_andamento','aprovacao','finalizado','entregue','cancelado'].map(s =>
              `<option value="${s}" ${e.status === s ? 'selected' : ''}>${this.rotuloStatus(s)}</option>`
            ).join('')}
          </select>
        </div>
        <div class="campo-form">
          <label>Fotos da obra/referências</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <input type="file" id="encImagens" accept="image/*" multiple style="display:none">
            <button type="button" class="btn-secundario" id="btnEncAddImagens" style="font-size:0.8rem;padding:6px 12px;"><i class="fas fa-camera"></i> Adicionar Fotos</button>
            <span id="encContagemImagens" style="font-size:0.8rem;color:var(--text-muted);">${(e.imagens || []).length > 0 ? `${e.imagens.length} foto(s)` : ''}</span>
          </div>
          <div id="encPreviewImagens" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
            ${(e.imagens && e.imagens.length > 0) ? e.imagens.map((img, i) => `
              <div style="position:relative;width:60px;height:60px;border-radius:6px;overflow:hidden;border:1px solid var(--border);">
                <img src="${img.startsWith('idb:') ? IDB_IMG_PLACEHOLDER : img}" style="width:100%;height:100%;object-fit:cover;">
                <button type="button" class="btn-remover-foto-enc" data-idx="${i}" style="position:absolute;top:1px;right:1px;width:18px;height:18px;border-radius:50%;border:none;background:#dc2626;color:#fff;font-size:0.6rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
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
        <button type="button" class="btn-remover-foto-enc" data-idx="${i}" style="position:absolute;top:1px;right:1px;width:18px;height:18px;border-radius:50%;border:none;background:#dc2626;color:#fff;font-size:0.6rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      </div>`).join('');
    if (contagem) contagem.textContent = `${this._encImagens.length} foto(s)`;
  }

  abrirModalAtualizacao(encId) {
    const enc = this.dataStore.buscarPorId('encomendas', encId);
    if (!enc) { mostrarToast('Encomenda não encontrada.'); return; }
    const statusOpts = ['criado','em_andamento','aprovacao','finalizado','entregue','cancelado'].map(s =>
      `<option value="${s}" ${enc.status === s ? 'selected' : ''}>${this.rotuloStatus(s)}</option>`
    ).join('');
    abrirModal(`
      <h3><i class="fas fa-pencil-alt"></i> Atualizar Status — ${sanitizarHTML(enc.descricao)}</h3>
      <form id="formAtualizacao">
        <div class="campo-form"><label>Novo Status</label>
          <select id="atuStatus" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">${statusOpts}</select>
        </div>
        <div class="campo-form"><label>Mensagem para o cliente</label>
          <textarea id="atuMensagem" placeholder="Ex: Iniciei a pintura, as cores estão secando..." style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:80px;background:var(--bg);color:var(--text);"></textarea>
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
            <button class="btn-miniatura btn-copiar-link" data-link="${window.location.origin}${window.location.pathname}#portal?token=${p.token}" title="Copiar link"><i class="fas fa-clipboard"></i></button>
            <button class="btn-miniatura btn-toggle-portal" data-id="${p.id}" title="${p.ativo ? 'Desativar' : 'Ativar'}">${p.ativo ? '<i class="fas fa-unlock"></i>' : '<i class="fas fa-lock"></i>'}</button>
            <button class="btn-miniatura btn-remover-portal" data-id="${p.id}" title="Remover" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
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
        <select id="selClientePortal" style="flex:1;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
          ${clientesOpts || '<option value="">Nenhum cliente com encomenda</option>'}
        </select>
        <button class="btn-primario" id="btnGerarPortal"><i class="fas fa-link"></i> Gerar Link</button>
      </div>
      <hr style="margin:12px 0;border-color:var(--border);">
      <h4 style="font-size:0.85rem;margin:0 0 8px;">Página autônoma do portal</h4>
      <p class="texto-ajuda" style="margin-bottom:8px;">Gere um arquivo HTML completo para hospedar em serviços gratuitos como GitHub Pages ou Vercel.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <select id="selClientePortalExport" style="flex:1;min-width:150px;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
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
      navigator.clipboard.writeText(texto).then(() => mostrarToast('Instruções copiadas!')).catch(() => mostrarToast('Erro ao copiar.'));
    });
    document.querySelector('.portais-lista')?.addEventListener('click', (e) => {
      if (e.target.closest('.btn-copiar-link')) {
        const link = e.target.closest('.btn-copiar-link').dataset.link;
        navigator.clipboard.writeText(link).then(() => mostrarToast('Link copiado!')).catch(() => mostrarToast('Erro ao copiar.'));
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
      status: document.getElementById('encStatus')?.value || 'criado'
    };
    if (!dados.clienteNome || !dados.descricao) { mostrarToast('Preencha nome do cliente e descrição.'); return; }

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
      mostrarToast('Encomenda atualizada!');
      activityLogger.registrar('atualizacao', 'Encomenda atualizada', dados.clienteNome, 'atualizacao');
    } else {
      dados.atualizacoes = [{ data: new Date().toISOString(), status: 'criado', mensagem: 'Pedido registrado.' }];
      this.dataStore.adicionar('encomendas', dados);
      mostrarToast('Encomenda criada!');
      activityLogger.registrar('criacao', 'Nova encomenda', dados.clienteNome, 'criacao');
    }
    fecharModal();
    this.rerenderizar();
  }

  salvarAtualizacao(enc) {
    const novoStatus = document.getElementById('atuStatus')?.value || enc.status;
    const mensagem = document.getElementById('atuMensagem')?.value?.trim() || '';
    const atualizacoes = enc.atualizacoes || [];
    atualizacoes.push({ data: new Date().toISOString(), status: novoStatus, mensagem: mensagem || 'Status atualizado.' });
    this.dataStore.atualizar('encomendas', enc.id, { status: novoStatus, atualizacoes });
    mostrarToast('Atualização registrada!');
    activityLogger.registrar('atualizacao', `Encomenda: ${novoStatus}`, enc.clienteNome, 'atualizacao');
    fecharModal();
    this.rerenderizar();
  }

  gerarLinkPortal() {
    const sel = document.getElementById('selClientePortal');
    if (!sel || !sel.value) { mostrarToast('Selecione um cliente.'); return; }
    const cliente = clienteStore().items.find(c => c.id === sel.value);
    if (!cliente) { mostrarToast('Cliente não encontrado.'); return; }

    const portais = this.dataStore.listar('portais') || [];
    const existente = portais.find(p => p.clienteId === cliente.id);
    if (existente) {
      if (existente.ativo) { mostrarToast('Este cliente já possui um link ativo.'); return; }
      existente.ativo = true;
      this.dataStore.salvar();
      mostrarToast('Link reativado!');
      this.rerenderizar();
      fecharModal();
      return;
    }

    const token = 'pt_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
    const portal = {
      id: 'portal_' + Date.now(),
      clienteId: cliente.id,
      clienteNome: cliente.nome,
      token,
      ativo: true,
      criadoEm: new Date().toISOString(),
      ultimoAcesso: ''
    };
    this.dataStore.dados.portais.push(portal);
    this.dataStore.salvar();
    mostrarToast('Link gerado! Compartilhe com o cliente.');
    activityLogger.registrar('criacao', 'Link de portal gerado', cliente.nome, 'criacao');
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

  removerPortal(portalId) {
    if (!confirm('Remover este link de acesso?')) return;
    this.dataStore.remover('portais', portalId);
    this.dataStore.salvar();
    this.rerenderizar();
    fecharModal();
  }

  exportarPortalHTML() {
    const sel = document.getElementById('selClientePortalExport');
    if (!sel || !sel.value) { mostrarToast('Selecione um cliente.'); return; }
    const cliente = clienteStore().items.find(c => c.id === sel.value);
    if (!cliente) { mostrarToast('Cliente não encontrado.'); return; }

    const encomendas = this.dataStore.listar('encomendas').filter(e => e.clienteNome === cliente.nome);
    if (encomendas.length === 0) { mostrarToast('Este cliente não possui encomendas.'); return; }

    mostrarLoading(true);
    Promise.all(encomendas.map(async (e) => {
      const imgs = [];
      for (const img of (e.imagens || [])) {
        if (img && img.startsWith('idb:')) { try { const url = await imageStore.carregar(img); imgs.push(url || img); } catch { imgs.push(img); } }
        else { imgs.push(img || ''); }
      }
      return { ...e, imagens: imgs.filter(Boolean) };
    })).then((encs) => {
      const config = this.dataStore.obter('configuracoes') || {};
      const dados = {
        artista: config.nomeArtista || 'Artista',
        contatoEmail: config.email || '',
        contatoTel: config.contato || '',
        token: cliente.id,
        encomendas: encs
      };

      fetch('portal-cliente.html')
        .then(r => r.text())
        .then(html => {
          const dataStr = JSON.stringify(dados);
          const tag = '<script id="portalData" type="application/json">';
          const s = html.indexOf(tag);
          const e = html.indexOf('</script>', s);
          const novo = html.slice(0, s + tag.length) + '\n' + dataStr + '\n' + html.slice(e);
          downloadHTML(novo, `portal-${cliente.nome.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.html`);
        })
        .catch(() => {
          const html = gerarPortalHTML(dados);
          downloadHTML(html, `portal-${cliente.nome.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.html`);
        });
    });
  }

  excluirEncomenda(id) {
    if (!confirm('Excluir esta encomenda permanentemente?')) return;
    this.dataStore.remover('encomendas', id);
    mostrarToast('Encomenda excluída.');
    this.rerenderizar();
  }

  aposRenderizar() {
    this.removerListeners();

    document.getElementById('btnNovaEncomenda')?.addEventListener('click', () => this.abrirModalForm(null));

    document.getElementById('buscaEncomenda')?.addEventListener('input', (e) => {
      this.busca = e.target.value;
      this.rerenderizar();
    });
    document.getElementById('filtroStatusEncomenda')?.addEventListener('change', (e) => {
      this.filtroStatus = e.target.value;
      this.rerenderizar();
    });
    document.getElementById('btnPortaisCliente')?.addEventListener('click', () => this.abrirModalPortais());

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
  }
}
