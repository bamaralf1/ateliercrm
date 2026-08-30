// Drag & Drop — Overlay global para arrastar imagens

export function iniciarDragDrop() {
  let overlay = document.getElementById('globalDropOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'globalDropOverlay';
    overlay.className = 'global-drop-overlay';
    overlay.innerHTML = '<div class="gdo-content"><div class="gdo-icon"><i class="fas fa-camera"></i></div><div class="gdo-text">Solte para adicionar imagens</div><div class="gdo-hint">JPG · PNG — Múltiplos arquivos</div></div>';
    document.body.appendChild(overlay);
  }
  let dropTimer = 0;
  document.addEventListener('dragenter', (e) => {
    if (!e.dataTransfer.types?.includes('Files')) return;
    clearTimeout(dropTimer);
    overlay.classList.add('gdo-visivel');
  });
  document.addEventListener('dragover', (e) => { if (e.dataTransfer.types?.includes('Files')) e.preventDefault(); });
  document.addEventListener('dragleave', (e) => {
    if (e.relatedTarget && overlay.contains(e.relatedTarget)) return;
    clearTimeout(dropTimer);
    dropTimer = setTimeout(() => overlay.classList.remove('gdo-visivel'), 100);
  });
  document.addEventListener('drop', (e) => {
    e.preventDefault();
    overlay.classList.remove('gdo-visivel');
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    const imagens = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (imagens.length === 0) { mostrarToast('<i class="fas fa-exclamation-triangle"></i> Apenas imagens (JPG/PNG) são suportadas.', 'erro'); return; }
    if (imagens.length === 1) {
      router?.navegar('catalogo');
      setTimeout(() => eventBus.emitir('abrir-nova-obra'), 300);
    } else {
      router?.navegar('catalogo');
      setTimeout(() => {
        if (catalogoView && typeof catalogoView.abrirImportacaoLote === 'function') {
          catalogoView.abrirImportacaoLote();
        }
      }, 400);
    }
  });
}
