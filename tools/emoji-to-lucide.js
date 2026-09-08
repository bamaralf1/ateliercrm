// one-shot: converte emojis STANDALONE em slots de ícone → data-lucide
const fs = require('fs');
const path = require('path');

const MAP = {
  '✨': 'sparkles', '📥': 'inbox', '🌅': 'sunrise', '🌊': 'waves', '🧑': 'user', '🕐': 'clock',
  '⚡': 'zap', '🧾': 'receipt', '🤝': 'handshake', '🎪': 'tent', '⚙️': 'settings', '🎨': 'palette',
  '📐': 'ruler', '🔧': 'wrench', '🖼️': 'image', '📦': 'package', '📋': 'clipboard', '🛒': 'shopping-cart',
  '🏪': 'store', '💰': 'dollar-sign', '📚': 'book', '➕': 'plus', '⚠️': 'triangle-alert', '✅': 'check',
  '🏷️': 'tag', '📍': 'map-pin', '📅': 'calendar', '⏳': 'hourglass', '📝': 'pencil', '✏️': 'pencil',
  '📉': 'trending-down', '🗑️': 'trash-2', '🗑': 'trash-2', '📞': 'phone', '✔️': 'check', '✔': 'check',
  '📒': 'book-open', '📊': 'bar-chart-3', '🔽': 'chevron-down', '💡': 'lightbulb', '☰': 'menu',
  '▶': 'play', '✕': 'x', '✎': 'pencil', '📷': 'camera', '✂': 'scissors', '◀': 'chevron-left',
  '📜': 'scroll', '🔏': 'lock', '🌙': 'moon', '🌿': 'leaf', '⚪': 'circle', '👑': 'crown',
  '🏛️': 'landmark', '💚': 'gem', '♿': 'accessibility', '🔐': 'lock', '☁️': 'cloud', '🔮': 'trending-up',
  '👥': 'users', '⏰': 'alarm-clock', '📤': 'share', '📆': 'calendar', '💵': 'dollar-sign',
  '💬': 'message-circle', '💸': 'banknote', '🎧': 'headphones', '⟲': 'rotate-ccw', '⏸': 'pause',
  '⏹': 'square', '⬇️': 'arrow-down', '✉️': 'mail', '💱': 'repeat', '🧮': 'calculator',
  '🗂️': 'folder-open', '🤖': 'bot', '⏱': 'timer', '🔢': 'hash', '📄': 'file-text', '⚖️': 'scale',
  '🗃️': 'archive', '🎉': 'party-popper', '📓': 'notebook', '✍️': 'pencil', '👤': 'user',
  '🆕': 'sparkles', '🎯': 'target', '🔝': 'arrow-up', '📎': 'paperclip', '🔍': 'search',
  '🏁': 'flag', '🏆': 'trophy', '📺': 'tv', '🌟': 'sparkles', '📧': 'at-sign', '🏠': 'home',
  '📹': 'video', '✓': 'check', '⬆': 'arrow-up',
};

// Pass A: conteúdo sozinho entre tags  (>emoji</  ou  >emoji </)
const ESC = Object.keys(MAP).join('').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const RE_TAG = new RegExp(`>((?:[${ESC}]){1,4})\\s*<`, 'g');

const alvo = [];
if (fs.existsSync('src')) {
  for (const f of fs.readdirSync('src')) if (f.endsWith('.ts') && f !== 'atelier-crm.ts') alvo.push(`src/${f}`);
  for (const f of fs.readdirSync('src/views')) if (f.endsWith('.ts')) alvo.push(`src/views/${f}`);
}

let totalA = 0, totalB = 0, pulados = new Set();
for (const p of alvo) {
  let t = fs.readFileSync(p, 'utf-8');
  const antes = t;
  t = t.replace(RE_TAG, (_m, emojis) => {
    const icons = emojis.split('').map(c => MAP[c]).filter(Boolean);
    if (icons.length !== emojis.length) return _m;
    return `><i data-lucide="${icons[0]}" aria-hidden="true"></i><`;
  });
  if (t !== antes) totalA++;
  t = t.replace(/icone:\s*'([^']+)'/g, (m, val) => {
    const nome = MAP[val.trim()];
    if (!nome) { pulados.add(m); return m; }
    return `icone: '<i data-lucide="${nome}" aria-hidden="true"></i>'`;
  });
  if (t !== antes) totalB++;
  if (t !== antes) fs.writeFileSync(p, t);
}
console.log(`PassA (tags): ${totalA} arquivos | PassB (icone:): ${totalB} arquivos`);
if (pulados.size) { console.log('NÃO convertidos (passB):'); [...pulados].slice(0, 20).forEach(l => console.log('  ' + l)); }