// ThemeEngine — Gerenciamento de temas visuais

export function atualizarThemeColor() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  const cor = getComputedStyle(document.body).getPropertyValue('--sidebar-bg').trim();
  if (cor) meta.setAttribute('content', cor);
}

export class ThemeEngine {
  constructor(dataStore) {
    this.dataStore = dataStore;
    this.temaAtual = this.dataStore.dados.config.tema || 'classico';
  }

  inicializar() {
    this.aplicarTema(this.temaAtual);
    const seletor = document.getElementById('seletorTema');
    if (seletor) {
      seletor.value = this.temaAtual;
      seletor.addEventListener('change', (e) => this.aplicarTema(e.target.value));
    }
    if (this.dataStore.dados.config.altoContraste) {
      document.body.setAttribute('data-high-contrast', 'true');
    }
    document.body.setAttribute('data-font-size', this.dataStore.dados.config.tamanhoFonte || 'medio');
    const idioma = this.dataStore.dados.config.idioma || 'pt-BR';
    if (window.AtelierCRMTranslations) { window.AtelierCRMTranslations.locale = idioma; }
    atualizarThemeColor();
  }

  aplicarTema(nomeTema) {
    document.body.setAttribute('data-tema', nomeTema);
    this.temaAtual = nomeTema;
    this.dataStore.dados.config.tema = nomeTema;
    this.dataStore.salvar();
    atualizarThemeColor();
  }
}
