import { defineStore } from 'pinia'
import { pinia } from './pinia'

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
    precificador: { valorHora: 60, multiplicadorExperiencia: 1.5, metaMensal: 10000, metaAnual: 120000, metaInicio: '' },
    precificadorRegras: [] as any[],
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
  }),

  actions: {
    carregar() {
      try {
        const raw = localStorage.getItem(CHAVE)
        if (raw) Object.assign(this, JSON.parse(raw))
      } catch (e) { console.warn('Falha ao carregar config', e) }
    },
    salvar() {
      try {
        localStorage.setItem(CHAVE, JSON.stringify(this.$state))
        try { (window as any).dataStore && ((window as any).dataStore.dados.config = this.$state) } catch (e) { console.warn('Falha ao sincronizar config com DataStore', e) }
      } catch (e) { console.warn(e) }
    },
    atualizar(dados: Partial<any>) {
      Object.assign(this, dados)
      this.salvar()
    },
  },
})

export const configStore = () => useConfigStore(pinia)
