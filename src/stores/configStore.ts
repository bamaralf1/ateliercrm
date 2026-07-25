import { defineStore } from 'pinia'
import { pinia } from './pinia'

const CHAVE = 'atelier_crm_config'

const _CHAVE_XOR = [0x41, 0x74, 0x65, 0x6C, 0x69, 0x65, 0x72, 0x43, 0x52, 0x4D]
function _codificar(texto: string): string {
  if (!texto) return ''
  const bytes = []
  for (let i = 0; i < texto.length; i++) {
    bytes.push(texto.charCodeAt(i) ^ _CHAVE_XOR[i % _CHAVE_XOR.length])
  }
  return btoa(String.fromCharCode(...bytes))
}
function _decodificar(codificado: string): string {
  if (!codificado) return ''
  try {
    const bytes = atob(codificado)
    let resultado = ''
    for (let i = 0; i < bytes.length; i++) {
      resultado += String.fromCharCode(bytes.charCodeAt(i) ^ _CHAVE_XOR[i % _CHAVE_XOR.length])
    }
    return resultado
  } catch { return '' }
}
const _CAMPOS_SENSIVEIS = ['syncGoogleClientId', 'syncGoogleToken', 'syncWebDAVUrl', 'syncWebDAVUser', 'syncWebDAVPass']

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
        if (raw) {
          const dados = JSON.parse(raw)
          _CAMPOS_SENSIVEIS.forEach(c => { if (dados[c]) dados[c] = _decodificar(dados[c]) })
          Object.assign(this, dados)
        }
      } catch (e) { console.warn('Falha ao carregar config', e) }
    },
    salvar() {
      try {
        const paraSalvar = { ...this.$state }
        _CAMPOS_SENSIVEIS.forEach(c => { if (paraSalvar[c]) paraSalvar[c] = _codificar(paraSalvar[c]) })
        localStorage.setItem(CHAVE, JSON.stringify(paraSalvar))
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
