// Notificações — Centro de notificações

export function iniciarNotificacoes() {
  const btnNotif = document.getElementById('btnNotificacoes');
  const panel = document.getElementById('notifPanel');
  const lista = document.getElementById('notifLista');
  const badge = document.getElementById('notifBadge');
  if (!btnNotif || !panel) return;

  function lerLidas() {
    try { return JSON.parse(localStorage.getItem('atelier-notif-lidas') || '[]'); } catch { return []; }
  }
  function salvarLidas(ids) { localStorage.setItem('atelier-notif-lidas', JSON.stringify(ids)); }
  function atualizarBadge() {
    const lidas = lerLidas();
    const atividades = activityLogger.obterRecentes(20);
    const naoLidas = atividades.filter(a => !lidas.includes(a.id)).length;
    if (naoLidas > 0) { badge.textContent = naoLidas > 99 ? '99+' : String(naoLidas); badge.style.display = 'flex'; }
    else { badge.style.display = 'none'; }
  }

  function renderizarNotif() {
    const lidas = lerLidas();
    const atividades = activityLogger.obterRecentes(20);
    if (atividades.length === 0) {
      lista.innerHTML = '<div class="notif-vazio"><i class="fas fa-bell"></i> Nenhuma notificação ainda.</div>';
      return;
    }
    lista.innerHTML = atividades.map(a => `
      <div class="notif-item ${lidas.includes(a.id) ? '' : 'ni-nao-lida'}" data-id="${a.id}">
        <span class="ni-icone">${activityLogger.obterIcone(a.tipo)}</span>
        <div class="ni-conteudo">
          <div class="ni-titulo">${sanitizarHTML(a.titulo)}</div>
          <div class="ni-detalhes">${sanitizarHTML(a.detalhes || '')}</div>
          <div class="ni-tempo">${activityLogger.formatarTempo(new Date(a.timestamp))}</div>
        </div>
        <button class="ni-marcar" data-id="${a.id}" title="Marcar como lida">✓</button>
      </div>
    `).join('');
    lista.querySelectorAll('.ni-marcar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const lidas2 = lerLidas();
        if (!lidas2.includes(id)) { lidas2.push(id); salvarLidas(lidas2); }
        renderizarNotif();
        atualizarBadge();
      });
    });
  }

  btnNotif.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('visivel');
    if (panel.classList.contains('visivel')) renderizarNotif();
  });
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== btnNotif && !btnNotif.contains(e.target)) panel.classList.remove('visivel');
  });

  document.getElementById('notifMarcarLidas')?.addEventListener('click', () => {
    const atividades = activityLogger.obterRecentes(20);
    const todosIds = atividades.map(a => a.id);
    salvarLidas(todosIds);
    renderizarNotif();
    atualizarBadge();
  });
  document.getElementById('notifLimpar')?.addEventListener('click', () => {
    activityLogger.limpar();
    salvarLidas([]);
    renderizarNotif();
    atualizarBadge();
  });

  eventBus?.on('nova-atividade', () => { atualizarBadge(); });
  atualizarBadge();
}
