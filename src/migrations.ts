// migrations.ts — Sistema de migrações versionado para o schema do CRM

type Migration = {
  version: number;
  up: (dados: any) => void;
};

export const MIGRACIONS: Migration[] = [
  {
    version: 2,
    up: (dados) => {
      ['materiais', 'fornecedores', 'consumos', 'contatosProfissionais', 'interacoes', 'eventos'].forEach(n => {
        if (!dados[n]) dados[n] = [];
      });
      if (dados.config && !dados.config.precificador) {
        dados.config.precificador = { valorHora: 60, multiplicadorExperiencia: 1.5, metaMensal: 10000, metaAnual: 120000, metaInicio: new Date().toISOString().slice(0, 7) };
      }
      if (!dados.entradasDiario) dados.entradasDiario = [];
      if (!dados.etapasProcesso) dados.etapasProcesso = [];
      if (dados.config && dados.config.idioma === undefined) dados.config.idioma = 'pt-BR';
      if (dados.config && dados.config.altoContraste === undefined) dados.config.altoContraste = false;
      if (dados.config && dados.config.tamanhoFonte === undefined) dados.config.tamanhoFonte = 'medio';
      if (dados.config && !dados.config.precificadorRegras) dados.config.precificadorRegras = [];
      if (dados.config && !dados.config.moedaPadrao) dados.config.moedaPadrao = 'BRL';
      if (dados.config && !dados.config.taxasCambio) dados.config.taxasCambio = { USD: 5.0, EUR: 5.5, GBP: 6.3 };
      if (dados.config && dados.config.pin === undefined) dados.config.pin = '';
      if (dados.config && dados.config.autoLock === undefined) dados.config.autoLock = false;
      if (dados.config && dados.config.tourCompleted === undefined) dados.config.tourCompleted = false;
      if (!dados.portais) dados.portais = [];
    }
  },
  {
    version: 3,
    up: (dados) => {
      // Migração portais: encomendaId
      if (dados.portais && dados.portais.length > 0 && !dados.portais[0].encomendaId) {
        dados.portais.forEach((p: any) => { p.encomendaId = ''; });
      }
      // Migração encomendas: add campos novos
      if (dados.encomendas && dados.encomendas.length > 0 && !dados.encomendas[0].atualizacoes) {
        dados.encomendas.forEach((e: any) => {
          e.atualizacoes = e.atualizacoes || [];
          e.valor = e.valor || 0;
          e.imagens = e.imagens || [];
          e.criadoEm = e.criadoEm || new Date().toISOString();
        });
      }
    }
  },
  {
    version: 4,
    up: (dados) => {
      // Migração: múltiplas imagens por obra
      if (dados.obras && dados.obras.length > 0 && !dados.obras[0].imagens) {
        dados.obras.forEach((o: any) => {
          o.imagens = [];
          if (o.imagem && !o.imagem.includes('svg+xml')) {
            o.imagens.push(o.imagem);
            o.imagemDestacada = o.imagem;
          }
        });
      }
    }
  },
  {
    version: 5,
    up: (dados) => {
      // PIN hash — a migração real é async e feita no construtor do DataStore
      // Esta versão marca que o schema suporta PIN hasheado
    }
  },
  {
    version: 6,
    up: (dados) => {
      // Plano freemium
      if (dados.config && !dados.config.plano) {
        dados.config.plano = {
          tier: 'free',
          ativo: false,
          pagamentoUrl: 'https://checkout.stripe.com/pay/cs_test_seu_link_aqui'
        };
      }
    }
  }
];

export const CURRENT_SCHEMA_VERSION = Math.max(...MIGRACIONS.map(m => m.version));

export function executarMigricoes(dados: any): boolean {
  const versaoAtual = dados.schemaVersion || 1;
  let migrou = false;

  for (const migracao of MIGRACIONS) {
    if (migracao.version > versaoAtual) {
      migracao.up(dados);
      dados.schemaVersion = migracao.version;
      migrou = true;
    }
  }

  return migrou;
}
