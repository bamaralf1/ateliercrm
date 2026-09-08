// one-shot: converte `class="fas fa-X"` → `data-lucide="Y"` em src/*.ts e portal-cliente.html
// Uso: node tools/fa-to-lucide.js
const fs = require('fs');
const path = require('path');

const MAP = {
  'arrow-left': 'arrow-left', 'arrow-right': 'arrow-right', 'arrow-up': 'arrow-up',
  bell: 'bell', book: 'book', 'book-open': 'book-open', bookmark: 'bookmark',
  box: 'package', boxes: 'box', 'box-open': 'package-open', bullseye: 'target',
  calendar: 'calendar', 'calendar-alt': 'calendar', camera: 'camera',
  certificate: 'award', 'chart-bar': 'bar-chart-3', 'chart-line': 'chart-line',
  'chart-pie': 'pie-chart', check: 'check', 'check-circle': 'circle-check',
  circle: 'circle', clipboard: 'clipboard', clock: 'clock', cloud: 'cloud',
  cog: 'settings', columns: 'columns-2', copy: 'copy', cube: 'cube',
  database: 'database', 'dollar-sign': 'dollar-sign', download: 'download',
  edit: 'pencil', 'ellipsis-v': 'ellipsis-vertical', envelope: 'mail',
  'exclamation-triangle': 'triangle-alert', 'external-link-alt': 'external-link',
  file: 'file-text', 'file-export': 'file-output', 'file-pdf': 'file-text',
  filter: 'filter', folder: 'folder', gem: 'gem', globe: 'globe', heart: 'heart',
  history: 'history', hourglass: 'hourglass', image: 'image', images: 'images',
  'info-circle': 'info', key: 'key', keyboard: 'keyboard', lightbulb: 'lightbulb',
  link: 'link', list: 'list', lock: 'lock', map: 'map',
  'map-marker-alt': 'map-pin', 'paint-brush': 'paintbrush', palette: 'palette',
  pen: 'pen', 'pencil-alt': 'pencil', phone: 'phone', plus: 'plus',
  'plus-circle': 'circle-plus', print: 'printer', save: 'save', search: 'search',
  share: 'share', 'share-alt': 'share-2', 'shopping-bag': 'shopping-bag',
  'shopping-cart': 'shopping-cart', star: 'star', swatchbook: 'swatch-book',
  sync: 'refresh-cw', tag: 'tag', thumbtack: 'pin', times: 'x',
  'times-circle': 'circle-x', tools: 'wrench', trash: 'trash-2', truck: 'truck',
  tv: 'tv', undo: 'undo-2', unlock: 'lock-open', upload: 'upload',
  user: 'user', users: 'users',
};

const RE_CLASS = /class="fas fa-([a-z0-9-]+)(?:\s+fa-[a-z0-9-]+)*"/g;
const RE_SINGLE = /class='fas fa-([a-z0-9-]+)(?:\s+fa-[a-z0-9-]+)*'/g;

function transformar(texto, caminho, relator) {
  let faltando = new Set();
  let trocas = 0;
  const sub = (re) => texto.replace(re, (m, nome) => {
    if (!MAP[nome]) { faltando.add(nome); return m; }
    trocas++;
    return `data-lucide="${MAP[nome]}"`;
  });
  texto = sub(RE_CLASS);
  texto = sub(RE_SINGLE);
  if (faltando.size) relator.push(`  [${caminho}] FALTANDO MAP: ${[...faltando].join(', ')}`);
  return { texto, trocas };
}

const alvo = [];
const SRC = path.join(__dirname, '..', 'src');
for (const dir of [SRC, path.join(SRC, 'views')]) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.ts') || f === 'atelier-crm.ts' || f === 'icones.ts') continue;
    alvo.push(path.join(dir, f));
  }
}
const att = path.join(__dirname, '..', 'portal-cliente.html');
if (fs.existsSync(att)) alvo.push(att);

const ausentes = [];
let total = 0;
for (const fp of alvo) {
  const rel = path.relative(path.join(__dirname, '..'), fp);
  const antes = fs.readFileSync(fp, 'utf-8');
  const { texto, trocas } = transformar(antes, rel, ausentes);
  if (trocas) { fs.writeFileSync(fp, texto); total += trocas; console.log(`  ✓ ${rel}: ${trocas} trocas`); }
}
console.log(`Total: ${total} ícones convertidos em ${alvo.length} arquivos`);
if (ausentes.length) { console.log('AUSENTES DO MAPA:'); ausentes.forEach(l => console.log(l)); }