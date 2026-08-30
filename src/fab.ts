// FAB — Floating Action Button (speed dial)

export function iniciarFab() {
  const fabMain = document.getElementById('fabMain');
  const fabSpeedial = document.getElementById('fabSpeedial');
  const fabBackdrop = document.getElementById('fabBackdrop');
  if (!fabMain) return;

  function fecharFab() {
    fabMain.classList.remove('ativo');
    fabSpeedial.classList.remove('visivel');
    fabBackdrop.classList.remove('visivel');
  }

  function toggleFab() {
    const aberto = fabMain.classList.toggle('ativo');
    fabSpeedial.classList.toggle('visivel', aberto);
    fabBackdrop.classList.toggle('visivel', aberto);
  }

  fabMain.addEventListener('click', toggleFab);
  fabBackdrop.addEventListener('click', fecharFab);

  const acoes = {
    obra: () => { router?.navegar('catalogo'); setTimeout(() => eventBus.emitir('abrir-nova-obra'), 200); },
    venda: () => { router?.navegar('vendas'); setTimeout(() => eventBus.emitir('abrir-nova-venda'), 200); },
    cliente: () => { router?.navegar('clientes'); setTimeout(() => eventBus.emitir('abrir-novo-cliente'), 200); },
    encomenda: () => { router?.navegar('encomendas'); },
    contato: () => { router?.navegar('rede'); },
    evento: () => { router?.navegar('exposicoes'); }
  };

  document.querySelectorAll('[data-fab]').forEach(btn => {
    btn.addEventListener('click', () => {
      fecharFab();
      const acao = btn.dataset.fab;
      if (acoes[acao]) acoes[acao]();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fabSpeedial?.classList.contains('visivel')) fecharFab();
  });
}
