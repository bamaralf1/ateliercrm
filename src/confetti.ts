// Confetti — Animação de confetti para vendas

export function dispararConfetti() {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const particles = Array.from({ length: 80 }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 200,
    y: canvas.height / 2,
    vx: (Math.random() - 0.5) * 8,
    vy: -Math.random() * 10 - 4,
    size: Math.random() * 6 + 3,
    color: ['#ff0','#f0f','#0ff','#f00','#0f0','#00f','#ffa500','#ff69b4'][Math.floor(Math.random() * 8)],
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 10,
    gravity: 0.2 + Math.random() * 0.1
  }));
  let frame = 0;
  const anim = () => {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.rotation += p.rotSpeed;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });
    if (frame < 90) requestAnimationFrame(anim);
    else canvas.remove();
  };
  anim();
}

export function iniciarObserverConfetti() {
  const _vendaObserver = new MutationObserver(() => {
    if (document.querySelector('.toast')?.textContent?.includes('Venda registrada')) {
      dispararConfetti();
    }
  });
  _vendaObserver.observe(document.getElementById('toast'), { childList: true, subtree: true, characterData: true });
}
