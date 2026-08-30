import { DataStore } from './data-store'
import { obraStore, useObraStore } from './stores/obraStore'
import { clienteStore, useClienteStore } from './stores/clienteStore'
import { vendaStore, useVendaStore } from './stores/vendaStore'
import { configStore } from './stores/configStore'
import { pinia } from './stores/pinia'

const COLLECTION_STORE_MAP = {
  obras: { get: useObraStore, single: obraStore },
  clientes: { get: useClienteStore, single: clienteStore },
  vendas: { get: useVendaStore, single: vendaStore },
}

export class StoreBridge {
  dataStore: DataStore
  dados: any

  constructor(dataStore: DataStore) {
    this.dataStore = dataStore
    this.dados = dataStore.dados
    this._initStores()
  }

  private _initStores() {
    obraStore().carregar(this.dataStore.listar('obras'))
    clienteStore().carregar(this.dataStore.listar('clientes'))
    vendaStore().carregar(this.dataStore.listar('vendas'))
    configStore().carregar()
  }

  private _piniaStore(colecao: string) {
    const entry = COLLECTION_STORE_MAP[colecao]
    return entry ? entry.get(pinia) : null
  }

  listar(colecao: string) {
    const store = this._piniaStore(colecao)
    if (store) return store.items
    return this.dataStore.listar(colecao)
  }

  adicionar(colecao: string, item: any) {
    // Freemium: verifica limite de quantidade no plano gratuito
    if (typeof window !== 'undefined' && window.Freemium) {
      const check = window.Freemium.podeAdicionar(colecao);
      if (!check.ok) {
        const limite = check.limite;
        mostrarPaywall(`${capitalizarTexto(colecao)} — limite de ${limite} itens no plano Grátis`);
        mostrarToast('Limite do plano Grátis atingido. Assine o Pro para itens ilimitados.', 'aviso');
        return null;
      }
    }
    const store = this._piniaStore(colecao)
    if (store) {
      item.id = crypto.randomUUID ? crypto.randomUUID() : 'id_' + Date.now() + '_' + Math.floor(Math.random() * 1000)
      item.criadoEm = item.criadoEm || new Date().toISOString()
      store.adicionar({ ...item })
      this.dataStore.dados[colecao] = store.items
      this.dataStore.salvar()
      return item
    }
    return this.dataStore.adicionar(colecao, item)
  }

  atualizar(colecao: string, id: string, novosCampos: any) {
    const store = this._piniaStore(colecao)
    if (store) {
      store.atualizar(id, novosCampos)
      this.dataStore.dados[colecao] = store.items
      this.dataStore.salvar()
      return store.porId(id)
    }
    return this.dataStore.atualizar(colecao, id, novosCampos)
  }

  remover(colecao: string, id: string) {
    const store = this._piniaStore(colecao)
    if (store) {
      store.remover(id)
      this.dataStore.dados[colecao] = store.items
      this.dataStore.salvar()
    } else {
      this.dataStore.remover(colecao, id)
    }
  }

  buscarPorId(colecao: string, id: string) {
    const store = this._piniaStore(colecao)
    if (store) return store.porId(id)
    return this.dataStore.buscarPorId(colecao, id)
  }

  salvar() {
    this.dataStore.salvar()
    configStore().salvar()
  }

  exportarBackup() { return this.dataStore.exportarBackup() }
  exportarColecao(n: string) { return this.dataStore.exportarColecao(n) }
  importarBackup(j: string) { return this.dataStore.importarBackup(j) }
  previewImport(j: string) { return this.dataStore.previewImport(j) }
  obterHistoricoExport() { return this.dataStore.obterHistoricoExport() }
}
