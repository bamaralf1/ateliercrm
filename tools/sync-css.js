// @ts-check
// sync-css — fonte única: compila src/styles/style.scss e injeta no <style> inline do index.html
const fs = require('fs');
const path = require('path');
const sass = require('sass');

const ROOT = path.join(__dirname, '..');
const SCSS = path.join(ROOT, 'src', 'styles', 'style.scss');
const INDEX = path.join(ROOT, 'index.html');

function main() {
  if (sass.info && !sass.info.includes('dart-sass')) {
    console.error('[sync-css] sass dart-sass esperado');
    process.exit(1);
  }
  const result = sass.compile(SCSS, { style: 'compressed' });
  const css = result.css.replace(/\s+$/, '');
  let html = fs.readFileSync(INDEX, 'utf8');
  const open = html.indexOf('<style>');
  const close = html.indexOf('</style>');
  if (open === -1 || close === -1 || close < open) {
    console.error('[sync-css] <style> nao encontrado em index.html');
    process.exit(1);
  }
  const htmlInicio = html.slice(0, open + '<style>'.length);
  const htmlFim = html.slice(close);
  const novo = htmlInicio + '\n' + css + '\n' + htmlFim;
  fs.writeFileSync(INDEX, novo, 'utf8');
  console.log(`[sync-css] OK — ${(css.length / 1024).toFixed(1)} kB injetado em index.html`);
}

main();