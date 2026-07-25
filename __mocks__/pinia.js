// Minimal Pinia mock for Jest — Options API only, no Vue reactivity needed
var activePinia = null

var _defaultPinia = null

function createPinia() {
  if (!_defaultPinia) {
    _defaultPinia = { _s: new Map(), state: {}, use() { return this } }
    setActivePinia(_defaultPinia)
    _defaultPinia.install = function(app) { app.provide = app.provide || function() {}; setActivePinia(_defaultPinia) }
  }
  return _defaultPinia
}

function getActivePinia() {
  return activePinia
}

function setActivePinia(pinia) {
  activePinia = pinia
  return pinia
}

function defineStore(id, options) {
  return function useStore(piniaInstance) {
    var pinia = piniaInstance || getActivePinia()
    if (!pinia) throw new Error('[pinia] getActivePinia was called with no active Pinia. Did you forget to install pinia?')
    if (pinia._s.has(id)) return pinia._s.get(id)
    var state = typeof options.state === 'function' ? options.state() : {}
    var store = {}
    Object.keys(state).forEach(function(key) {
      Object.defineProperty(store, key, {
        get: function() { return state[key] },
        set: function(v) { state[key] = v },
        enumerable: true, configurable: true,
      })
    })
    Object.defineProperty(store, '$state', {
      get: function() { return state },
      set: function(v) { Object.assign(state, v) },
    })
    if (options.getters) {
      Object.keys(options.getters).forEach(function(key) {
        var fn = options.getters[key]
        Object.defineProperty(store, key, {
          get: function() { return typeof fn === 'function' ? fn.call(store, state) : fn },
          enumerable: true, configurable: true,
        })
      })
    }
    if (options.actions) {
      Object.keys(options.actions).forEach(function(key) {
        store[key] = options.actions[key].bind(store)
      })
    }
    ;['$patch','$reset','$subscribe','$onAction','$dispose'].forEach(function(m) {
      if (!store[m]) store[m] = function() {}
    })
    pinia._s.set(id, store)
    return store
  }
}

module.exports = { createPinia, defineStore, getActivePinia, setActivePinia }
