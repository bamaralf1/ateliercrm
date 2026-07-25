import { defineStore } from 'pinia'
import { pinia } from './pinia'

export const useObraStore = defineStore('obras', {
  state: () => ({
    items: [] as any[],
    _loaded: false,
  }),

  getters: {
    porId: (state) => (id: string) => state.items.find(o => o.id === id),
    filtrados: (state) => (filtro: string) =>
      filtro ? state.items.filter(o => (o.titulo || '').toLowerCase().includes(filtro)) : state.items,
    total: (state) => state.items.length,
    valorAcervo: (state) => state.items.reduce((s, o) => s + (Number(o.preco) || 0), 0),
    vendidas: (state) => state.items.filter(o => o.status === 'vendida'),
    emEstoque: (state) => state.items.filter(o => o.status !== 'vendida'),
  },

  actions: {
    carregar(dados: any[]) {
      this.items = dados
      this._loaded = true
    },
    adicionar(obra: any) {
      this.items.unshift(obra)
      this._persistir()
    },
    atualizar(id: string, dados: Partial<any>) {
      const idx = this.items.findIndex(o => o.id === id)
      if (idx >= 0) {
        this.items[idx] = { ...this.items[idx], ...dados }
        this._persistir()
      }
    },
    remover(id: string) {
      this.items = this.items.filter(o => o.id !== id)
      this._persistir()
    },
    _persistir() {
      try {
        localStorage.setItem('atelier_crm_obras', JSON.stringify(this.items))
        try { (window as any).dataStore && ((window as any).dataStore.dados.obras = this.items) } catch (e) { console.warn('Falha ao sincronizar obras com DataStore', e) }
      } catch (e) { console.warn('Falha ao persistir obras', e) }
    },
  },
})

export const obraStore = () => useObraStore(pinia)
