// Confirmacao — Modal temático de confirmação com suporte a desfazer

export function confirmarAcao(mensagem, opcoes = {}) {
  const { textoConfirmar = 'Excluir', titulo = 'Confirmar', perigoso = true } = opcoes;
  return new Promise((resolve) => {
    const classeBtn = perigoso ? 'btn-danger' : 'btn-primario';
    abrirModal(`
      <h3>${titulo}</h3>
      <p style="margin:14px 0;font-size:0.9rem;line-height:1.5;color:var(--text);">${mensagem}</p>
      <div class="modal-acoes">
        <button type="button" class="btn-secundario" id="btnConfirmarCancelar">Cancelar</button>
        <button type="button" class="${classeBtn}" id="btnConfirmarAcao">${textoConfirmar}</button>
      </div>
    `);
    const limpar = (resultado) => {
      document.removeEventListener('keydown', onKeydown);
      fecharModal();
      resolve(resultado);
    };
    const onKeydown = (e) => { if (e.key === 'Escape') limpar(false); };
    document.getElementById('btnConfirmarCancelar').addEventListener('click', () => limpar(false));
    document.getElementById('btnConfirmarAcao').addEventListener('click', () => limpar(true));
    document.addEventListener('keydown', onKeydown);
    document.getElementById('btnConfirmarCancelar').focus();
  });
}

export function mostrarToastComDesfazer(mensagem, aoDesfazer) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;
  const fechar = () => {
    toast.classList.add('saindo');
    setTimeout(() => { toast.classList.remove('mostrar', 'saindo'); }, 250);
  };
  clearTimeout(window._toastTimeout);
  msgEl.innerHTML = `${mensagem} <button class="btn-toast-desfazer" id="btnDesfazerExclusao">Desfazer</button>`;
  toast.className = 'toast aviso';
  toast.classList.add('mostrar');
  const timeout = setTimeout(fechar, 6000);
  window._toastTimeout = timeout;
  const btn = document.getElementById('btnDesfazerExclusao');
  if (btn) {
    btn.addEventListener('click', () => {
      clearTimeout(timeout);
      window._toastTimeout = null;
      aoDesfazer();
      msgEl.innerHTML = 'Item restaurado!';
      window._toastTimeout = setTimeout(fechar, 2800);
    });
  }
}
