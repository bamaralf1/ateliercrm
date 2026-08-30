// @ts-check
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const ORDER = [
  'utils.ts',
  'confirmacao.ts',
  'icones.ts',
  'image-store.ts',
  'carregar-bibliotecas.ts',
  'secure-storage.ts',
  'migrations.ts',
  'data-store.ts',
  'plano.ts',
  'event-bus.ts',
  'activity-logger.ts',
  'theme-engine.ts',
  'router.ts',
  'views/base-view.ts',
  'views/dashboard-view.ts',
  'views/catalogo-view.ts',
  'views/clientes-view.ts',
  'views/vendas-view.ts',
  'views/pdf-generator.ts',
  'views/certificados-view.ts',
  'views/referencias-view.ts',
  'views/galeria-virtual-view.ts',
  'views/precificador-view.ts',
  'views/atelier-view.ts',
  'views/rede-view.ts',
  'views/diario-view.ts',
  'views/portal-view.ts',
  'views/encomendas-view.ts',
  'views/image-lightbox.ts',
  'views/export-import-view.ts',
  'views/exposicoes-view.ts',
  'views/financeiro-view.ts',
  'views/configuracoes-view.ts',
  'views/planos-view.ts',
  'cloud-sync.ts',
  'remote-sync.ts',
  'stores/pinia.ts',
  'stores/obraStore.ts',
  'stores/clienteStore.ts',
  'stores/vendaStore.ts',
  'stores/configStore.ts',
  'store-bridge.ts',
  'spotlight.ts',
  'confetti.ts',
  'tour.ts',
  'security.ts',
  'shortcuts.ts',
  'fab.ts',
  'notificacoes.ts',
  'drag-drop.ts',
  'main.ts',
];

let content = `// @ts-nocheck
/* ==========================================================================
   ATELIER CRM - APLICAÇÃO PRINCIPAL (AUTO-GERADO)
   Edite os arquivos individuais em src/, não este arquivo.
   Para regenerar: node tools/concat-source.js
   ========================================================================== */

// Imports de módulos externos (node_modules), mantidos uma única vez
import { defineStore, createPinia, getActivePinia, setActivePinia } from 'pinia';
import { shallowRef, computed, toRefs, watch } from 'vue';

`;

for (const file of ORDER) {
  const fp = path.join(SRC, file);
  if (!fs.existsSync(fp)) {
    console.warn(`[concat-source] WARNING: ${file} not found, skipping`);
    continue;
  }
  const src = fs.readFileSync(fp, 'utf-8')
    // Strip all imports (relative and node_modules) to avoid duplicates in concatenated output
    .replace(/^import\s+(?:\*\s+as\s+\w+\s+from\s+)?(?:\{[^}]*\}\s+from\s+)?['"]([^'"]+)['"];?\s*$/gm, (_, p) => `// import from ${p} stripped for concat`)
    .replace(/^export\s+\{[^}]*\}\s*from\s+['"]([^'"]+)['"];?\s*$/gm, (_, p) => `// re-export from ${p} stripped for concat`);
  content += `/* ===== ${file} ===== */\n${src}\n\n`;
}

const out = path.join(SRC, 'atelier-crm.ts');
fs.writeFileSync(out, content);
console.log(`[concat-source] ✓ Wrote ${out} (${content.split('\n').length} lines from ${ORDER.length} files)`);
