// ThemeEngine — Gerenciamento de temas visuais
// Tema dourado é o principal: o app sempre abre nele primeiro.

export function atualizarThemeColor() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  const cor = getComputedStyle(document.body).getPropertyValue('--sidebar-bg').trim();
  if (cor) meta.setAttribute('content', cor);
}

const TEMA_PRINCIPAL = 'dourado';

export class ThemeEngine {
  constructor(dataStore) {
    this.dataStore = dataStore;
    this.temaAtual = this.dataStore.dados.config.tema || TEMA_PRINCIPAL;
  }

  inicializar() {
    this.aplicarTema(TEMA_PRINCIPAL);
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
    document.documentElement.setAttribute('data-tema', nomeTema);
    this.temaAtual = nomeTema;
    this.dataStore.dados.config.tema = nomeTema;
    this.dataStore.salvar();
    atualizarThemeColor();
  }
}
