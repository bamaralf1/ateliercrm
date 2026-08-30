// planos-view.ts — Página de Planos (Freemium)
// Comparativo Free vs Pro, ativação via link de pagamento e chave de ativação.

class PlanosView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
  }

  render() {
    const freemium = window.Freemium;
    const premium = freemium && freemium.ehPremium();
    const plano = (freemium && freemium.plano) || {};
    const limites = freemium ? freemium.listaLimites() : [];
    const recursos = freemium ? freemium.listaRecursos() : [];
    const pagamentoUrl = freemium ? freemium.pagamentoUrl : '';

    const blocoLimites = limites.map(l => `
      <li><span class="pl-fato ${premium ? 'sim' : ''}">
        ${premium ? '<i class="fas fa-check"></i>' : `<i class="fas fa-check"></i>`} ${sanitizarHTML(l.rotulo)}
      </span><span class="pl-valor">${premium ? 'Ilimitado' : l.limite + ' itens'}</span></li>
    `).join('');

    const blocoRecursos = recursos.map(r => `
      <tr>
        <td>${sanitizarHTML(r.rotulo)}</td>
        <td class="${premium ? 'liberado' : 'bloqueado'}">${premium ? '<i class="fas fa-check"></i>' : '<i class="fas fa-lock"></i>'}</td>
      </tr>
    `).join('');

    return `
      <div class="view-cabecalho">
        <div>
          <h2>Planos</h2>
          <p class="subtitulo">Escolha o plano ideal para o seu ateliê</p>
        </div>
      </div>

      ${premium ? `
      <div class="plano-ativo-banner">
        <div class="plano-ativo-icone">👑</div>
        <div>
          <strong>Você é assinante do Atelier CRM Pro</strong>
          <div class="plano-ativo-meta">Ativado${plano.dataAtivacao ? ' em ' + new Date(plano.dataAtivacao).toLocaleDateString('pt-BR') : ''} · todos os recursos liberados e limites removidos</div>
        </div>
        <button class="btn-secundario" id="btnDesativarPremium">Gerenciar</button>
      </div>
      ` : `
      <div class="plano-gratis-chip">
        <span>Você está no plano <strong>Grátis</strong></span>
        <button class="btn-upgrade" id="btnAssinarHdr">Assinar Pro</button>
      </div>
      `}

      <div class="planos-grid">
        <div class="plano-card plano-free ${premium ? 'nenhum' : 'destaque'}">
          <div class="plano-nome">Grátis</div>
          <div class="plano-preco">R$ 0<span>/mês</span></div>
          <div class="plano-desc">Para artistas começando a organizar o ateliê.</div>
          <ul class="plano-lista">
            <li><i class="fas fa-check"></i> <strong>${limites.length} módulos</strong> do Atelier CRM</li>
            ${blocoLimites}
            <li><i class="fas fa-lock"></i> Recursos avançados bloqueados</li>
          </ul>
          <div class="plano-cta">Plano atual</div>
        </div>

        <div class="plano-card plano-pro ${!premium ? 'destaque' : 'ativo'}">
          <div class="plano-badge">👑 MAIS POPULAR</div>
          <div class="plano-nome">Pro</div>
          <div class="plano-preco">R$ 29<span>/mês</span></div>
          <div class="plano-desc">Tudo do Grátis, com recursos ilimitados e avançados.</div>
          <ul class="plano-lista">
            <li><i class="fas fa-check"></i> Todos os módulos <strong>ilimitados</strong></li>
            ${recursos.map(r => `<li><i class="fas fa-check"></i> ${sanitizarHTML(r.rotulo)}</li>`).join('')}
            <li><i class="fas fa-check"></i> Suporte prioritário</li>
          </ul>
          <div class="plano-cta">
            ${premium
              ? '<button class="btn-plano-ativo" disabled><i class="fas fa-check"></i> Ativo</button>'
              : `<button class="btn-assinar" id="btnAssinarPro"><i class="fas fa-bolt"></i> Assinar Pro — R$ 29/mês</button>`}
          </div>
        </div>
      </div>

      <div class="planos-section">
        <h3>Comparativo de recursos</h3>
        <table class="planos-tabela">
          <thead>
            <tr><th>Recurso</th><th>Grátis</th><th>Pro</th></tr>
          </thead>
          <tbody>
            ${blocoRecursos}
          </tbody>
        </table>
      </div>

      <div class="planos-section plano-ativar">
        <h3><i class="fas fa-key"></i> Ativar Pro</h3>
        <p>Já fez o pagamento ou recebeu um código de ativação? Insira abaixo para liberar o Premium.</p>
        <div class="planos-ativar-form">
          <input type="text" id="inpChaveAtivacao" placeholder="Código de ativação (ex. PRO-2026-XXXXXX)" autocomplete="off">
          <button class="btn-primario" id="btnAtivarChave">Ativar</button>
        </div>
        <div id="planoAtivarMsg" class="plano-ativar-msg"></div>
        <p class="plano-ajuda">💡 <strong>Demonstração:</strong> use a chave <code>ATELIER-PRO-2026</code> para ativar instantaneamente e explorar todos os recursos.</p>
      </div>
    `;
  }

  aposRenderizar() {
    this.removerListeners();

    const freemium = window.Freemium;

    const btnAssinar = document.getElementById('btnAssinarPro') || document.getElementById('btnAssinarHdr');
    if (btnAssinar) {
      btnAssinar.addEventListener('click', () => {
        if (freemium && freemium.pagamentoUrl) {
          window.open(freemium.pagamentoUrl, '_blank');
          mostrarToast('Abrindo pagamento seguro... Confirme e volte para ativar com a chave.', 'info');
        }
      });
    }

    const btnIrPlanos = document.getElementById('btnIrPlanos');
    if (btnIrPlanos) btnIrPlanos.addEventListener('click', () => this.router.navegar('planos'));

    const btnDesativar = document.getElementById('btnDesativarPremium');
    if (btnDesativar) {
      btnDesativar.addEventListener('click', () => {
        confirmarAcao('Desativar o Premium? Isso bloqueia os recursos avançados.', () => {
          if (freemium) freemium.desativarPremium();
          this.rerenderizar();
        });
      });
    }

    const btnAtivar = document.getElementById('btnAtivarChave');
    if (btnAtivar) {
      btnAtivar.addEventListener('click', () => {
        const chave = (document.getElementById('inpChaveAtivacao')?.value || '').trim();
        const msg = document.getElementById('planoAtivarMsg');
        if (!chave) { if (msg) { msg.textContent = 'Digite um código de ativação.'; msg.className = 'plano-ativar-msg erro'; } return; }
        if (freemium && freemium.tentarAtivar(chave)) {
          if (msg) { msg.textContent = '✅ Premium ativado com sucesso!'; msg.className = 'plano-ativar-msg ok'; }
          mostrarToast('👑 Bem-vindo ao Atelier CRM Pro!', 'sucesso');
          setTimeout(() => this.rerenderizar(), 900);
        } else {
          if (msg) { msg.textContent = 'Código inválido. Verifique e tente novamente.'; msg.className = 'plano-ativar-msg erro'; }
          mostrarToast('Código de ativação inválido.', 'erro');
        }
      });
      const inp = document.getElementById('inpChaveAtivacao');
      if (inp) inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') btnAtivar.click(); });
    }
  }
}
