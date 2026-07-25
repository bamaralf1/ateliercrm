import { defineStore } from 'pinia'
import { pinia } from './pinia'

export const useVendaStore = defineStore('vendas', {
  state: () => ({
    items: [] as any[],
    _loaded: false,
  }),

  getters: {
    porId: (state) => (id: string) => state.items.find(v => v.id === id),
    total: (state) => state.items.length,
    valorTotal: (state) => state.items.reduce((s, v) => s + (Number(v.valor) || 0), 0),
    doCliente: (state) => (clienteId: string) => state.items.filter(v => v.clienteId === clienteId),
  },

  actions: {
    carregar(dados: any[]) {
      this.items = dados; this._loaded = true
    },
    adicionar(venda: any) {
      this.items.unshift(venda); this._persistir()
    },
    atualizar(id: string, dados: Partial<any>) {
      const idx = this.items.findIndex(v => v.id === id)
      if (idx >= 0) { this.items[idx] = { ...this.items[idx], ...dados }; this._persistir() }
    },
    remover(id: string) {
      this.items = this.items.filter(v => v.id !== id); this._persistir()
    },
    _persistir() {
      try {
        localStorage.setItem('atelier_crm_vendas', JSON.stringify(this.items))
        try { if ((window as any).dataStore) { (window as any).dataStore.dados.vendas = this.items } } catch (e) { console.warn('Falha ao sincronizar vendas com DataStore', e) }
      } catch (e) { console.warn(e) }
    },
  },
})

export const vendaStore = () => useVendaStore(pinia)
