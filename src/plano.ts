// plano.ts — Módulo Freemium
// Gerencia o plano (gratuito vs premium), limites de quantidade,
// bloqueio de recursos avançados e a conversão via link de pagamento.

/* eslint-disable @typescript-eslint/no-unused-vars */

// Limites de quantidade no plano gratuito (por coleção)
const LIMITES_FREE = {
  obras: 15,
  clientes: 15,
  vendas: 30,
  encomendas: 10,
  certificados: 10,
  contatosProfissionais: 20,
  eventos: 10,
  referencias: 20,
  transacoes: 50,
  materiais: 20,
  entradasDiario: 30,
  precificadorOrcamentos: 5,
  precificadorRegras: 3,
};

// Recursos premium (bloqueados no plano gratuito)
const RECURSOS_PREMIUM = {
  precificador_ml: { rotulo: 'Inteligência do Precificador (ML)', descricao: 'Análise de break-even, acurácia ML, projeção de valorização e regras de precificação.' },
  precificador_orcamentos: { rotulo: 'Orçamentos Premium', descricao: 'Kanban de orçamentos, QR de aceite, proposta PDF com templates premium e conversão em venda.' },
  precificador_regras: { rotulo: 'Regras de precificação', descricao: 'Criar e aplicar regras automáticas de preço em lote.' },
  portal_cliente: { rotulo: 'Portal do Cliente', descricao: 'Página pública para o cliente acompanhar encomendas e aceitar orçamentos.' },
  galeria_virtual: { rotulo: 'Galeria Virtual 2D', descricao: 'Apresentação em slides com zoom e tour guiado para compartilhar.' },
  sync_cloud: { rotulo: 'Sync em Nuvem', descricao: 'Backup e sincronização com Google Drive, WebDAV e auto-backup agendado.' },
  export_pdf: { rotulo: 'Relatórios e PDFs premium', descricao: 'Catálogo PDF, certidões e relatórios financeiros com marca d\'água e template premium.' },
  certificados_avancado: { rotulo: 'Certificados avançados', descricao: 'Múltiplos documentos por certificado e edições/variações.' },
  rede_avancado: { rotulo: 'Mapa de Rede (D3)', descricao: 'Visualização em grafo das conexões profissionais com zoom e hubs.' },
};

const CHAVE_MESTRA = 'ATELIER-PRO-2026'; // código de ativação de contingência/demonstração

export class Freemium {
  dataStore: any;

  constructor(dataStore: any) {
    this.dataStore = dataStore;
  }

  get config() {
    return (this.dataStore && this.dataStore.dados && this.dataStore.dados.config) || {};
  }

  get plano() {
    return this.config.plano || { tier: 'free', ativo: false };
  }

  ehPremium(): boolean {
    const p = this.plano;
    return p.tier === 'premium' && p.ativo === true;
  }

  get tier(): string {
    return this.ehPremium() ? 'premium' : 'free';
  }

  get pagamentoUrl(): string {
    return this.plano.pagamentoUrl || 'https://checkout.stripe.com/pay/cs_test_seu_link_aqui';
  }

  setPagamentoUrl(url: string) {
    this.config.plano = { ...this.plano, pagamentoUrl: url };
    this.salvar();
  }

  // Limite de quantidade (null = ilimitado no tier atual)
  limitePara(colecao: string): number | null {
    if (this.ehPremium()) return null;
    return LIMITES_FREE[colecao] !== undefined ? LIMITES_FREE[colecao] : null;
  }

  // Quantidade atual (usa StoreBridge se disponível, senão dataStore)
  quantidadeAtual(colecao: string): number {
    const lista = (this.dataStore && this.dataStore.dados && this.dataStore.dados[colecao]) || [];
    return Array.isArray(lista) ? lista.length : 0;
  }

  // Restam X itens no plano atual
  restantes(colecao: string): number | null {
    const limite = this.limitePara(colecao);
    if (limite === null) return null;
    return Math.max(0, limite - this.quantidadeAtual(colecao));
  }

  // Pode adicionar mais um item? retorna { ok, limite, atual }
  podeAdicionar(colecao: string): { ok: boolean; limite: number | null; atual: number } {
    const limite = this.limitePara(colecao);
    const atual = this.quantidadeAtual(colecao);
    if (limite === null) return { ok: true, limite, atual };
    return { ok: atual < limite, limite, atual };
  }

  // Recurso premium liberado?
  recursoLiberado(chave: string): boolean {
    if (this.ehPremium()) return true;
    return RECURSOS_PREMIUM[chave] === undefined;
  }

  rotuloRecurso(chave: string): string {
    return (RECURSOS_PREMIUM[chave] && RECURSOS_PREMIUM[chave].rotulo) || chave;
  }

  // Ativa o premium
  ativarPremium() {
    this.config.plano = { ...this.plano, tier: 'premium', ativo: true, dataAtivacao: this.plano.dataAtivacao || new Date().toISOString() };
    this.salvar();
  }

  // Valida uma chave de ativação
  validarChave(chave: string): boolean {
    if (!chave) return false;
    const limpa = chave.trim().toUpperCase();
    if (limpa === CHAVE_MESTRA) return true;
    // Chave gerada pelo algoritmo (ex.: PRO-<ano>-<md5 curto>)
    const re = /^PRO-20\d{2}-[A-F0-9]{6}$/;
    if (re.test(limpa)) {
      const ano = limpa.slice(4, 8);
      const sufixo = limpa.slice(9);
      const alvo = gerarSufixoAno(Number(ano));
      return sufixo === alvo;
    }
    return false;
  }

  // Tenta ativar premium com chave; retorna true/false
  tentarAtivar(chave: string): boolean {
    if (this.validarChave(chave)) {
      this.ativarPremium();
      return true;
    }
    return false;
  }

  desativarPremium() {
    this.config.plano = { ...this.plano, tier: 'free', ativo: false };
    this.salvar();
  }

  salvar() {
    try {
      if (this.dataStore && typeof this.dataStore.salvar === 'function') this.dataStore.salvar();
    } catch (e) { /* noop */ }
  }

  // Lista de coleções limitadas no free (para exibir na página de planos)
  listaLimites(): { colecao: string; rotulo: string; limite: number }[] {
    const rotulos: Record<string, string> = {
      obras: 'Obras de arte', clientes: 'Clientes', vendas: 'Vendas', encomendas: 'Encomendas',
      certificados: 'Certificados', contatosProfissionais: 'Contatos profissionais', eventos: 'Eventos',
      referencias: 'Referências', transacoes: 'Lançamentos financeiros', materiais: 'Materiais',
      entradasDiario: 'Entradas de diário', precificadorOrcamentos: 'Orçamentos', precificadorRegras: 'Regras de precificação'
    };
    return Object.entries(LIMITES_FREE).map(([colecao, limite]) => ({
      colecao, rotulo: rotulos[colecao] || colecao, limite
    }));
  }

  listaRecursos(): { chave: string; rotulo: string; descricao: string }[] {
    return Object.entries(RECURSOS_PREMIUM).map(([chave, v]) => ({ chave, rotulo: v.rotulo, descricao: v.descricao }));
  }
}

// Gera o sufixo de validação de chave (6 hex do ano)
function gerarSufixoAno(ano: number): string {
  let h = (ano * 2654435761) >>> 0;
  let s = '';
  for (let i = 0; i < 6; i++) {
    s += (h & 15).toString(16).toUpperCase();
    h = (h >>> 4) ^ 0x9e3779b9;
    h = h >>> 0;
  }
  return s;
}

// --- Paywall helpers ---

// Mostra o modal de upgrade (paywall) para recurso premium
export function mostrarPaywall(recurso?: string) {
  const overlay = document.createElement('div');
  overlay.className = 'paywall-overlay';
  overlay.id = 'paywallOverlay';
  overlay.innerHTML = `
    <div class="paywall-card">
      <button class="paywall-fechar" id="paywallFechar" title="Fechar">&times;</button>
      <div class="paywall-icone">👑</div>
      <h3>Recurso Premium</h3>
      <p>${recurso ? `Você está tentando usar <strong>${sanitizarHTML(recurso)}</strong>.` : 'Este recurso está disponível no plano Premium.'} Ele faz parte do <strong>Atelier CRM Pro</strong>.</p>
      <div class="paywall-btns">
        <button class="btn-primario" id="paywallUpgrade">Assinar Premium</button>
        <button class="btn-secundario" id="paywallFecharBtn">Agora não</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const fechar = () => overlay.remove();
  overlay.querySelector('#paywallFechar')?.addEventListener('click', fechar);
  overlay.querySelector('#paywallFecharBtn')?.addEventListener('click', fechar);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });
  overlay.querySelector('#paywallUpgrade')?.addEventListener('click', () => {
    fechar();
    if (typeof window.Freemium !== 'undefined' && window.Freemium.pagamentoUrl) {
      window.open(window.Freemium.pagamentoUrl, '_blank');
      // Após pagamento, orienta a ativar
      setTimeout(() => {
        if (typeof router !== 'undefined' && router.navegar) router.navegar('planos');
      }, 400);
    }
  });
}

// Banner de upgrade discreto (reutilizável no topo de views)
export function bannerUpgrade() {
  return `
    <div class="upgrade-banner">
      <span>💎 Atelier CRM <strong>Pro</strong> — recursos ilimitados e avançados.</span>
      <button id="btnIrPlanos" class="btn-upgrade">Ver planos</button>
    </div>
  `;
}
