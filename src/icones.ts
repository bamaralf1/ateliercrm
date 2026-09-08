// Mapeamento de ícones — Lucide plano 24x24 via data-lucide (vendored em public/js/lucide.min.js)
const LUCIDE: Record<string, string> = {
  dashboard: 'bar-chart-3',
  catalogo: 'images',
  clientes: 'users',
  vendas: 'shopping-cart',
  certificados: 'award',
  referencias: 'bookmark',
  encomendas: 'truck',
  exposicoes: 'calendar',
  galeria: 'layout-grid',
  precificador: 'gem',
  atelier: 'paintbrush',
  diario: 'book-open',
  rede: 'share-2',
  financeiro: 'chart-line',
  configuracoes: 'settings',
  exportar: 'file-output',
  portal: 'external-link',
  // Ações comuns
  novo: 'plus',
  salvar: 'save',
  editar: 'pencil',
  excluir: 'trash-2',
  buscar: 'search',
  filtro: 'filter',
  voltar: 'arrow-left',
  avancar: 'arrow-right',
  fechar: 'x',
  download: 'download',
  upload: 'upload',
  compartilhar: 'share-2',
  imprimir: 'printer',
  pdf: 'file-text',
  imagem: 'image',
  link: 'link',
  aviso: 'triangle-alert',
  sucesso: 'circle-check',
  erro: 'circle-x',
  info: 'info',
  dinheiro: 'dollar-sign',
  obra: 'palette',
  tag: 'tag',
  data: 'calendar',
  usuario: 'user',
  email: 'mail',
  telefone: 'phone',
  local: 'map-pin',
  notificacao: 'bell',
  config: 'settings',
  backup: 'database',
  marca: 'tag',
  categoria: 'folder',
  estoque: 'package',
  compras: 'shopping-bag',
  lista: 'list',
  grafico: 'pie-chart',
  mapa: 'map',
  estrela: 'star',
  coracao: 'heart',
};

// Cada entrada vira um marcador <i data-lucide="..."> que o runtime do Lucide troca por <svg>.
export const ICONES: Record<string, string> = Object.fromEntries(
  Object.entries(LUCIDE).map(([chave, nome]) => [chave, `<i data-lucide="${nome}" aria-hidden="true"></i>`])
);

type LucideRuntime = { createIcons: () => void };
function obterLucide(): LucideRuntime | null {
  const w = window as unknown as { lucide?: LucideRuntime };
  return w.lucide || null;
}

// Converte os marcadores <i data-lucide> presentes no DOM em SVG.
// Guard `i[data-lucide]`: após a troca o svg mantém data-lucide, então só dispara se houver <i> real
// (evita loop do MutationObserver).
export function sincronizarIcones(): void {
  const lucide = obterLucide();
  if (lucide && lucide.createIcons && document.querySelector('i[data-lucide]')) {
    try { lucide.createIcons(); } catch (e) { /* conteúdo dinâmico pode ainda estar incompleto */ }
  }
}

// Sincroniza ícones injetados dinamicamente (views, modais, toasts).
export function inicializarIconesLucide(): void {
  sincronizarIcones();
  if (typeof MutationObserver === 'undefined' || !document.body) return;
  let timer = 0;
  new MutationObserver(() => {
    if (timer) return;
    timer = window.setTimeout(() => { timer = 0; sincronizarIcones(); }, 80);
  }).observe(document.body, { childList: true, subtree: true });
}