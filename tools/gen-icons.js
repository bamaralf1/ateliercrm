// Gera ícones PNG do Atelier CRM (192, 512) — fundo azul, "A" branco, cantos arredondados
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function drawIcon(size, bg, fg, roundedCorner) {
  const raw = Buffer.alloc(size * (size * 4 + 1));
  const radius = size * 0.15;
  const inRadius = (xc, yc) => {
    const cx = xc < size / 2 ? radius : size - radius;
    const cy = yc < size / 2 ? radius : size - radius;
    const dx = xc - cx, dy = yc - cy;
    // canto arredondado: dentro do círculo do canto
    if ((xc < radius || xc > size - radius) && (yc < radius || yc > size - radius)) {
      return dx * dx + dy * dy > radius * radius;
    }
    return false;
  };

  const cx = size / 2;
  const letterW = size * 0.46;
  const letterH = size * 0.5;
  const top = size * 0.3;
  const thick = size * 0.05;
  const crossY = top + letterH * 0.58;

  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const idx = y * (size * 4 + 1) + 1 + x * 4;
      let cr = bg[0], cg = bg[1], cb = bg[2];
      // fundo transparente nos cantos arredondados
      if (roundedCorner && inRadius(x + 0.5, y + 0.5)) {
        raw[idx] = 0; raw[idx + 1] = 0; raw[idx + 2] = 0; raw[idx + 3] = 0;
        continue;
      }
      // perna esquerda do A
      const legL = () => {
        // topo em (cx - letterW/2, top) descendo até (cx, top + letterH)
        const ly = top + ((x - (cx - letterW / 2)) * letterH) / letterW;
        return Math.abs(y + 0.5 - ly) < thick && x > cx - letterW / 2 && x < cx + thick;
      };
      // perna direita: topo em (cx + letterW/2, top) até (cx, top+letterH)
      const legR = () => {
        const ly = top + (((cx + letterW / 2) - x) * letterH) / letterW;
        return Math.abs(y + 0.5 - ly) < thick && x > cx - thick && x < cx + letterW / 2;
      };
      // travessão
      const bar = () => Math.abs(y + 0.5 - crossY) < thick && x > cx - letterW / 2 && x < cx + letterW / 2;
      if (legL() || legR() || bar()) {
        cr = fg[0]; cg = fg[1]; cb = fg[2];
      }
      raw[idx] = cr; raw[idx + 1] = cg; raw[idx + 2] = cb; raw[idx + 3] = 255;
    }
  }
  return raw;
}

function makePng(size, rounded = true) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const raw = drawIcon(size, [37, 99, 235], [255, 255, 255], rounded);
  const idat = zlib.deflateSync(raw);
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const specs = [
  ['icon-192.png', 192, true],
  ['icon-512.png', 512, true],
  ['icon-maskable-192.png', 192, false],
  ['icon-maskable-512.png', 512, false],
];
for (const [name, size, rounded] of specs) {
  const png = makePng(size, rounded);
  fs.writeFileSync(path.join(outDir, name), png);
  console.log(`✓ public/${name} (${png.length} bytes)`);
}
console.log('OK');
