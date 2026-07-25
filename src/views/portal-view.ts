export class PortalView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this.token = '';
    this.cliente = null;
    this.encomendas = [];
  }

  render() {
    this.token = this.extrairToken();
    if (!this.token) {
      return `
        <div class="portal-wrapper">
          <div class="portal-card portal-erro">
            <div class="portal-icone">🔒</div>
            <h2>Link inválido</h2>
            <p>O link de acesso não é válido ou expirou. Entre em contato com o artista para obter um novo link.</p>
          </div>
        </div>
      `;
    }

    const portal = this.dataStore.listar('portais').find(p => p.token === this.token && p.ativo);
    if (!portal) {
      return `
        <div class="portal-wrapper">
          <div class="portal-card portal-erro">
            <div class="portal-icone">🔒</div>
            <h2>Acesso não autorizado</h2>
            <p>Este link não está mais ativo ou é inválido. Solicite um novo link ao artista.</p>
          </div>
        </div>
      `;
    }

    // Registrar acesso
    portal.ultimoAcesso = new Date().toISOString();
    this.dataStore.salvar();

    this.cliente = { id: portal.clienteId, nome: portal.clienteNome };
    this.encomendas = this.dataStore.listar('encomendas').filter(e =>
      e.clienteNome === portal.clienteNome || e.clienteEmail === portal.clienteId
    );

    const encomendasHtml = this.encomendas.length > 0
      ? this.encomendas.map(e => this.renderEncomendaCard(e)).join('')
      : '<div class="portal-vazio">Nenhuma encomenda encontrada para este cliente.</div>';

    const artista = configStore().artista?.nome || 'Artista';

    return `
      <div class="portal-wrapper">
        <div class="portal-header">
          <div class="portal-header-info">
            <h2>📦 Acompanhamento de Encomendas</h2>
            <p class="portal-sub">${portal.clienteNome} · via ${artista}</p>
          </div>
        </div>
        <div class="portal-encomendas-lista">
          ${encomendasHtml}
        </div>
        <div class="portal-footer">
          <p>Dúvidas? Entre em contato direto com o artista.</p>
          <p class="portal-footer-peq">Atualizado em ${new Date().toLocaleString('pt-BR')}</p>
        </div>
      </div>
    `;
  }

  extrairToken() {
    try {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace('#portal?', ''));
      return params.get('token') || '';
    } catch { return ''; }
  }

  renderEncomendaCard(enc) {
    const statusMap = {
      'criado': { rotulo: 'Pedido Recebido', cor: '#3b82f6', icone: '📋' },
      'em_andamento': { rotulo: 'Em Andamento', cor: '#f59e0b', icone: '🎨' },
      'aprovacao': { rotulo: 'Aguardando Aprovação', cor: '#8b5cf6', icone: '✅' },
      'finalizado': { rotulo: 'Finalizado', cor: '#16a34a', icone: '✨' },
      'entregue': { rotulo: 'Entregue', cor: '#065f46', icone: '📦' },
      'cancelado': { rotulo: 'Cancelado', cor: '#dc2626', icone: '❌' }
    };
    const st = statusMap[enc.status] || { rotulo: enc.status, cor: '#6b7280', icone: '📋' };
    const diasRestantes = enc.prazo ? Math.ceil((new Date(enc.prazo) - new Date()) / 86400000) : null;
    const prazoLabel = diasRestantes !== null
      ? (diasRestantes > 0 ? `${diasRestantes} dia${diasRestantes > 1 ? 's' : ''} restante${diasRestantes > 1 ? 's' : ''}` : 'Prazo encerrado')
      : 'Sem prazo definido';

    const timeline = enc.atualizacoes && enc.atualizacoes.length > 0
      ? enc.atualizacoes.map(a => `
        <div class="portal-timeline-item">
          <div class="portal-timeline-dot" style="background:${statusMap[a.status]?.cor || '#6b7280'}"></div>
          <div class="portal-timeline-content">
            <div class="portal-timeline-status">${statusMap[a.status]?.rotulo || a.status}</div>
            <div class="portal-timeline-msg">${sanitizarHTML(a.mensagem)}</div>
            <div class="portal-timeline-data">${formatarData(a.data)}</div>
          </div>
        </div>
      `).join('')
      : '<div class="portal-timeline-empty">Nenhuma atualização ainda.</div>';

    return `
      <div class="portal-encomenda-card">
        <div class="portal-encomenda-header">
          <div class="portal-encomenda-titulo">
            <h3>${sanitizarHTML(enc.descricao) || 'Encomenda'}</h3>
            <span class="portal-badge" style="background:${st.cor}20;color:${st.cor};border:1px solid ${st.cor}40;">
              ${st.icone} ${st.rotulo}
            </span>
          </div>
          <div class="portal-encomenda-meta">
            <span>💰 ${formatarMoeda(enc.valor || 0)}</span>
            <span>📅 ${prazoLabel}</span>
            ${enc.clienteEmail ? `<span>✉️ ${sanitizarHTML(enc.clienteEmail)}</span>` : ''}
          </div>
        </div>
        <div class="portal-encomenda-body">
          <h4>📜 Atualizações</h4>
          <div class="portal-timeline">
            ${timeline}
          </div>
        </div>
      </div>
    `;
  }

  aposRenderizar() {
    this.removerListeners();
  }
}
