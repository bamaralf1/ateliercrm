// Security — Bloqueio de tela por inatividade e PIN

let _inatividadeTimer = null;
let _telaBloqueada = false;

export function iniciarMonitorInatividade() {
  if (!dataStore?.dados?.config?.autoLock || !dataStore?.dados?.config?.pin) return;
  const resetTimer = () => {
    if (_telaBloqueada) return;
    clearTimeout(_inatividadeTimer);
    _inatividadeTimer = setTimeout(() => bloquearTela(), 10 * 60 * 1000);
  };
  ['click', 'keydown', 'mousemove', 'touchstart'].forEach(ev => document.addEventListener(ev, resetTimer));
  resetTimer();
}

export function bloquearTela() {
  if (_telaBloqueada) return;
  _telaBloqueada = true;
  const pin = dataStore.dados.config.pin;
  if (!pin) return;
  let tentativas = 0;
  function mostrarPinModal() {
    let entrada = '';
    const render = () => {
      abrirModal(`<h3><i class="fas fa-lock"></i> Tela Bloqueada</h3><p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px;">Digite seu PIN de 4 dígitos para continuar</p><div class="pin-display">${'•'.repeat(entrada.length).padEnd(4, '_')}</div>${tentativas > 0 ? '<p style="color:#ef4444;font-size:0.8rem;">PIN incorreto. Tente novamente.</p>' : ''}<div class="pin-pad">${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(v => v === '' ? '<button disabled></button>' : `<button data-val="${v}">${v}</button>`).join('')}</div><div class="modal-acoes"><button class="btn-secundario" id="btnSairPin">Sair</button></div>`);
      document.querySelectorAll('.pin-pad button[data-val]').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (btn.dataset.val === '⌫') { entrada = entrada.slice(0, -1); render(); return; }
          if (entrada.length >= 4) return;
          entrada += btn.dataset.val;
          if (entrada.length === 4) {
            const valido = await verificarPin(entrada, pin);
            if (valido) { _telaBloqueada = false; fecharModal(); mostrarToast('Bem-vindo de volta!', 'sucesso'); iniciarMonitorInatividade(); }
            else { tentativas++; entrada = ''; render(); }
          } else { render(); }
        });
      });
      document.getElementById('btnSairPin')?.addEventListener('click', () => { fecharModal(); });
      document.getElementById('btnCancelarModal')?.addEventListener('click', fecharModal);
    };
    render();
  }
  mostrarPinModal();
}
