import { defineStore } from 'pinia'
import { pinia } from './pinia'

export const useClienteStore = defineStore('clientes', {
  state: () => ({
    items: [] as any[],
    _loaded: false,
  }),

  getters: {
    porId: (state) => (id: string) => state.items.find(c => c.id === id),
    total: (state) => state.items.length,
  },

  actions: {
    carregar(dados: any[]) {
      this.items = dados
      this._loaded = true
    },
    adicionar(cliente: any) {
      this.items.unshift(cliente)
      this._persistir()
    },
    atualizar(id: string, dados: Partial<any>) {
      const idx = this.items.findIndex(c => c.id === id)
      if (idx >= 0) { this.items[idx] = { ...this.items[idx], ...dados }; this._persistir() }
    },
    remover(id: string) {
      this.items = this.items.filter(c => c.id !== id)
      this._persistir()
    },
    _persistir() {
      try {
        localStorage.setItem('atelier_crm_clientes', JSON.stringify(this.items))
        try { (window as any).dataStore && ((window as any).dataStore.dados.clientes = this.items) } catch {}
      } catch (e) { console.warn(e) }
    },
  },
})

export const clienteStore = () => useClienteStore(pinia)
