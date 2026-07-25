const fs = require('fs');
const path = require('path');
const SRC = path.join(__dirname, '..', 'src');

const FILES = [
  'utils.ts','data-store.ts','event-bus.ts','activity-logger.ts',
  'theme-engine.ts','router.ts',
  'views/base-view.ts','views/dashboard-view.ts','views/catalogo-view.ts',
  'views/clientes-view.ts','views/vendas-view.ts','views/pdf-generator.ts',
  'views/certificados-view.ts','views/referencias-view.ts',
  'views/galeria-virtual-view.ts','views/precificador-view.ts',
  'views/atelier-view.ts','views/rede-view.ts','views/diario-view.ts',
  'views/portal-view.ts','views/encomendas-view.ts','views/image-lightbox.ts',
  'views/export-import-view.ts','views/exposicoes-view.ts',
  'views/financeiro-view.ts','views/configuracoes-view.ts',
  'cloud-sync.ts','main.ts',
];

let changed = [];

for (const file of FILES) {
  const fp = path.join(SRC, file);
  if (!fs.existsSync(fp)) { console.warn('SKIP: ' + file); continue; }
  let src = fs.readFileSync(fp, 'utf8');
  let original = src;
  src = src.replace(/^\/\/ @ts-nocheck\s*\n/, '');
  src = src.replace(/^(class \w+)/gm, 'export $1');
  src = src.replace(/^(function \w+)/gm, 'export $1');
  if (src !== original) {
    fs.writeFileSync(fp, src, 'utf8');
    const diff = src.split('\n').length - original.split('\n').length;
    changed.push(file + ' (' + diff + ' lines)');
  }
}

// Create barrel file
let barrel = '// Auto-generated barrel\n';
for (const file of FILES) {
  if (file === 'main.ts' || file === 'types.d.ts') continue;
  barrel += `import './${file.replace(/\.ts$/, '')}';\n`;
}
barrel += "\nexport {}\n";
fs.writeFileSync(path.join(SRC, 'index.ts'), barrel, 'utf8');
changed.push('Created src/index.ts');

console.log('Done:');
changed.forEach(c => console.log('  ' + c));
