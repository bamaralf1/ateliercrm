// ActivityLogger — Sistema de registro de atividades

export class ActivityLogger {
  constructor() { this.atividades = this.carregarAtividades(); }

  carregarAtividades() {
    try { const salvas = localStorage.getItem('atelier-activities'); return salvas ? JSON.parse(salvas) : []; }
    catch (e) { console.warn('Falha ao carregar atividades do localStorage', e); return []; }
  }

  salvarAtividades() { localStorage.setItem('atelier-activities', JSON.stringify(this.atividades.slice(0, 50))); }

  registrar(tipo, titulo, detalhes, badge = 'atualizacao') {
    const atividade = { id: Date.now().toString() + Math.random().toString(36).substr(2, 9), tipo, titulo, detalhes, timestamp: new Date(), badge };
    this.atividades.unshift(atividade);
    this.salvarAtividades();
    eventBus.emitir('nova-atividade', atividade);
  }

  obterRecentes(limite = 10) { return this.atividades.slice(0, limite); }

  limpar() { this.atividades = []; this.salvarAtividades(); }

  formatarTempo(data) {
    const agora = new Date();
    const diff = agora.getTime() - data.getTime();
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);
    if (minutos < 1) return 'Agora mesmo';
    if (minutos < 60) return `${minutos} min atrás`;
    if (horas < 24) return `${horas}h atrás`;
    if (dias < 7) return `${dias}d atrás`;
    return data.toLocaleDateString('pt-BR');
  }

  obterIcone(tipo) {
    const icones = { criacao: '✨', atualizacao: '<i class="fas fa-pen"></i>', exclusao: '<i class="fas fa-trash"></i>', venda: '<i class="fas fa-dollar-sign"></i>', favorita: '<i class="fas fa-star"></i>', export: '<i class="fas fa-file"></i>', import: '📥', status: '<i class="fas fa-pencil-alt"></i>' };
    return icones[tipo] || '<i class="fas fa-thumbtack"></i>';
  }
}
