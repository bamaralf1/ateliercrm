import { defineStore } from 'pinia'
import { pinia } from './pinia'
import { CAMPOS_SENSIVEIS, lerCredenciaisDaSessao, salvarCredenciaisNaSessao } from '../secure-storage'

const CHAVE = 'atelier_crm_config'


export const useConfigStore = defineStore('config', {
  state: () => ({
    artista: { nome: 'Meu Ateliê', email: '', telefone: '', assinatura: '' },
    tema: 'classico' as string,
    idioma: 'pt-BR',
    altoContraste: false,
    tamanhoFonte: 'medio',
    pin: '',
    autoLock: false,
    tourCompleted: false,
    precificador: { valorHora: 60, multiplicadorExperiencia: 1.5, arredondamento: 0, metaMensal: 10000, metaAnual: 120000, metaInicio: '', comissaoGaleria: 0, negociacaoMin: -10, negociacaoMeta: 0, negociacaoIdeal: 15 },
    tecnicasCusto: {
        'óleo': { valorHora: 80, multiplicador: 2 },
        'acrílica': { valorHora: 70, multiplicador: 1.8 },
        'aquarela': { valorHora: 65, multiplicador: 1.6 },
        'guache': { valorHora: 60, multiplicador: 1.5 },
        'têmpera': { valorHora: 65, multiplicador: 1.6 },
        'desenho': { valorHora: 45, multiplicador: 1.3 },
        'gravura': { valorHora: 70, multiplicador: 1.8 },
        'escultura': { valorHora: 90, multiplicador: 2.2 },
        'cerâmica': { valorHora: 75, multiplicador: 1.9 },
        'têxtil': { valorHora: 55, multiplicador: 1.5 },
        'outra': { valorHora: 60, multiplicador: 1.5 },
    },
    precificadorRegras: [] as any[],
    precificadorOrcamentos: [] as any[],
    moedaPadrao: 'BRL',
    taxasCambio: { USD: 5.0, EUR: 5.5, GBP: 6.3 },
    contadorRecibos: {} as Record<string, number>,
    contadorPropostas: {} as Record<string, number>,
    contadorCertificados: {} as Record<string, number>,
    textoGarantia: '',
    syncGoogleClientId: '',
    syncGoogleToken: '',
    syncWebDAVUrl: '',
    syncWebDAVUser: '',
    syncWebDAVPass: '',
    syncAutoBackup: false,
    syncAutoBackupInterval: 30,
    syncLastBackup: '',
    supabaseUrl: '',
    supabasePublishableKey: '',
    syncSupabaseAccessToken: '',
    syncSupabaseUserId: '',
  }),

  actions: {
    carregar() {
      try {
        const raw = localStorage.getItem(CHAVE)
        if (raw) {
          const dados = JSON.parse(raw)
          Object.assign(this, dados)
        }
        Object.assign(this, lerCredenciaisDaSessao())
      } catch (e) { console.warn('Falha ao carregar config', e) }
    },
    salvar() {
      try {
        salvarCredenciaisNaSessao(this.$state)
        const paraSalvar = { ...this.$state } as Record<string, any>
        CAMPOS_SENSIVEIS.forEach(c => { delete paraSalvar[c] })
        localStorage.setItem(CHAVE, JSON.stringify(paraSalvar))
        try { if ((window as any).dataStore) { (window as any).dataStore.dados.config = this.$state } } catch (e) { console.warn('Falha ao sincronizar config com DataStore', e) }
      } catch (e) { console.warn(e) }
    },
    atualizar(dados: Partial<any>) {
      Object.assign(this, dados)
      this.salvar()
    },
  },
})

export const configStore = () => useConfigStore(pinia)
