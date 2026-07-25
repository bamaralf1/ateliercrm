// Vite entry point — imports individual source files (ESM)
// For tsc/Jest the concat output (atelier-crm.ts) is used instead

import './styles/style.scss'

class PiniaGuard {
  static loaded = false
  static init() {
    if (this.loaded) return
    this.loaded = true
    // Lazy-import stores after DataStore is ready
    import('./store-bridge')
  }
}

// Re-export everything from the main module
export * from './main'

// Init Pinia bridge on load
PiniaGuard.init()
