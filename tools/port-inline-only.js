// @ts-check
// port-inline-only — preserva no style.scss regras que existiam apenas no <style> inline do index.html (fonte: git HEAD)
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sass = require('sass');

const ROOT = path.join(__dirname, '..');
const SCSS = path.join(ROOT, 'src', 'styles', 'style.scss');
const INDEX = path.join(ROOT, 'index.html');

const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '');
const norm = (s) => s
  .replace(/\s+/g, ' ')
  .trim()
  // sass emite atributos sem aspas ([data-tema=classico]); nivelar com o inline (com aspas)
  .replace(/="([^"]*)"/g, '=$1')
  .replace(/='([^']*)'/g, '=$1');

function units(css) {
  css = stripComments(css);
  const out = [];
  let i = 0;
  const n = css.length;
  while (i < n) {
    const ob = css.indexOf('{', i);
    if (ob === -1) break;
    const head = css.slice(i, ob).trim();
    if (!head) { i = ob + 1; continue; }
    let depth = 1;
    let j = ob + 1;
    while (j < n && depth > 0) {
      const c = css[j];
      if (c === '{') depth++;
      else if (c === '}') depth--;
      j++;
    }
    out.push({ head: norm(head), body: css.slice(ob + 1, j - 1), txt: head + '{' + css.slice(ob + 1, j - 1) + '}' });
    i = j;
  }
  return out;
}

function decls(body) {
  const d = [];
  for (const part of body.split(';')) {
    const m = part.match(/^\s*([-\w]+)\s*:\s*(.+)$/);
    if (m) d.push([m[1], norm(m[2])]);
  }
  return d;
}

// Retorna regras a serem REPLICADAS do B que não existem (ou faltam props) em A.
// Regras com cabeçalhos idênticos: só declarações cuja propriedade não existe em A.
function merge(A, B) {
  const mapA = new Map(A.map((u) => [u.head, u]));
  const extras = [];
  const unitarInvalido = (b) => {
    // Bloco @ que nao contem regras internas (declaracoes soltas) era ignorado pelo navegador; descarta.
    if (/^@/.test(b.head) && !b.body.includes('{')) return true;
    return false;
  };
  for (const b of B) {
    const a = mapA.get(b.head);
    // Bloco @ (media/supports/container) com corpo plano (declaracoes soltas) era ignorado
    // pelo navegador no inline original; nao pode virar regra valida via uniao de props.
    if (/^@/.test(b.head) && !b.body.includes('{')) continue;
    if (!a) { if (!unitarInvalido(b)) extras.push({ head: b.head, body: b.body, all: true }); continue; }
    if (norm(a.body) === norm(b.body)) continue;
    if (b.body.includes('{')) {
      const mA = mapA.get(b.head) ? units(mapA.get(b.head).body) : [];
      const inner = merge(mA, units(b.body));
      if (inner.extras.length) {
        const corpo = inner.extras.map((x) => x.head + '{' + x.body + '}').join(' ');
        extras.push({ head: b.head, body: corpo, all: false });
      }
      continue;
    }
    const dB = decls(b.body);
    const propsA = new Set(decls(mapA.get(b.head).body).map((p) => p[0]));
    const missing = dB.filter((p) => !propsA.has(p[0]));
    if (missing.length) extras.push({ head: b.head, body: missing.map((p) => `${p[0]}: ${p[1]}`).join('; ') + ';', all: false });
  }
  return { extras };
}

function main() {
  let htmlB;
  try {
    htmlB = execSync('git show HEAD:index.html', { cwd: ROOT, encoding: 'utf8' });
  } catch (e) {
    console.error('[port-inline-only] falha ao ler index.html do git HEAD');
    process.exit(1);
  }
  const styleOpen = htmlB.indexOf('<style>');
  const styleClose = htmlB.indexOf('</style>');
  const cssB = htmlB.slice(styleOpen + 7, styleClose);

  const cssA = sass.compile(SCSS, { style: 'expanded' }).css;
  const r = merge(units(cssA), units(cssB));
  if (!r.extras.length) { console.log('[port-inline-only] nenhuma regra a portar'); return; }

  const banner = '\n/* @port-inline preservado a partir do <style> do index.html (git HEAD) */\n';
  const section = banner + r.extras.map((x) => (x.all ? `${x.head}{${x.body}}` : `${x.head}{${x.body}}`)).join('\n');
  fs.appendFileSync(SCSS, '\n' + section, 'utf8');

  // Verificação: recompilar e conferir que todos os seletores do inline original existem no novo CSS
  const cssNovo = sass.compile(SCSS, { style: 'expanded' }).css;
  const chavesB = new Set(units(cssB).map((u) => u.head));
  const chavesNovo = new Set(units(cssNovo).map((u) => u.head));
  const faltando = [...chavesB].filter((k) => !chavesNovo.has(k));
  console.log(`[port-inline-only] portadas ${r.extras.length} unidades para style.scss`);
  console.log(faltando.length ? `[port-inline-only] ATENC AO: ${faltando.length} chaves ausentes no novo css: ${faltando.slice(0, 10).join(' | ')}` : '[port-inline-only] OK — todos os seletores do inline agora existem no css compilado');
}

main();