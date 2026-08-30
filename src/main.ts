// Bootstrap e inicialização
import { StoreBridge } from './store-bridge'
import { confirmarAcao, mostrarToastComDesfazer } from './confirmacao'
import { verificarPin, isPinHashed, hashPin } from './secure-storage'

// Módulos extraídos
import { iniciarObserverConfetti } from './confetti'
import { iniciarTour } from './tour'
import { registrarAtalhosTeclado } from './shortcuts'
import { iniciarFab } from './fab'
import { iniciarMonitorInatividade } from './security'
import { iniciarNotificacoes } from './notificacoes'
import { iniciarDragDrop } from './drag-drop'

// Renderiza o Dashboard
export function renderizarDashboard(dataStore) {
  const obras = dataStore.listar('obras');
  const vendas = dataStore.listar('vendas');
  const clientes = dataStore.listar('clientes');
  const vendidas = obras.filter(o => o.status === 'vendida');
  const emEstoque = obras.filter(o => o.status !== 'vendida');
  const valorAcervo = emEstoque.reduce((soma, o) => soma + (Number(o.preco) || 0), 0);
  const valorVendido = vendas.reduce((soma, v) => soma + (Number(v.valor) || 0), 0);
  const dadosMeses = calcularObrasPorMes(obras);
  const graficoSvg = gerarGraficoSVG(dadosMeses);
  const tecnicaMaisComum = calcularTecnicaMaisComum(obras);
  const ticketMedio = vendas.length > 0 ? valorVendido / vendas.length : 0;
  const crescimentoMensal = calcularCrescimentoMensal(obras);
  const obrasFavoritas = obras.filter(o => o.favorita).length;
  const recentes = [...obras].sort((a, b) => new Date(b.dataCadastro || b.criadoEm) - new Date(a.dataCadastro || a.criadoEm)).slice(0, 5);
  const listaRecentesHtml = recentes.length ? recentes.map(o => `
    <li class="item-obra-recente">
      <div class="thumb-obra">${o.imagem ? `<img src="${sanitizarURL(o.imagem)}" alt="${sanitizarHTML(o.titulo)}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">` : (o.emoji || '<i class="fas fa-images"></i>')}</div>
      <div class="info-obra-recente">
        <div class="nome">${sanitizarHTML(o.titulo)}</div>
        <div class="meta">${sanitizarHTML(o.tecnica || '')} · ${formatarData(o.dataCadastro || o.criadoEm)}</div>
      </div>
      <span class="tag-status ${classeStatus(o.status)}">${rotuloStatus(o.status)}</span>
    </li>
  `).join('') : `<div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-images"></i></div><p>Nenhuma obra cadastrada ainda. Clique em "Nova Obra" para começar.</p></div>`;
  return `
    <div class="view-cabecalho">
      <div>
        <h2>Dashboard</h2>
        <p class="subtitulo">Visão geral do seu ateliê · ${new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <div class="dashboard-acoes">
        <button class="btn-secundario" id="btnAtualizarDashboard" title="Atualizar dados"><i class="fas fa-sync"></i></button>
      </div>
    </div>
    <div class="grid-cards stagger-in">
      <div class="card card-destaque"><div class="rotulo-card">Total de Obras</div><div class="valor-card">${obras.length}</div><div class="card-tendencia ${crescimentoMensal >= 0 ? 'positiva' : 'negativa'}">${crescimentoMensal >= 0 ? '↑' : '↓'} ${Math.abs(crescimentoMensal).toFixed(1)}% este mês</div></div>
      <div class="card"><div class="rotulo-card">Obras Vendidas</div><div class="valor-card">${vendidas.length}</div><div class="card-sub">${obras.length > 0 ? ((vendidas.length / obras.length) * 100).toFixed(1) : 0}% do total</div></div>
      <div class="card"><div class="rotulo-card">Em Estoque</div><div class="valor-card">${emEstoque.length}</div><div class="card-sub">${obras.length > 0 ? ((emEstoque.length / obras.length) * 100).toFixed(1) : 0}% disponível</div></div>
      <div class="card card-valor"><div class="rotulo-card">Valor do Acervo</div><div class="valor-card">${formatarMoeda(valorAcervo)}</div><div class="card-sub">Ticket médio: ${formatarMoeda(ticketMedio)}</div></div>
      <div class="card"><div class="rotulo-card">Total Vendido</div><div class="valor-card">${formatarMoeda(valorVendido)}</div><div class="card-sub">${vendas.length} venda${vendas.length === 1 ? '' : 's'}</div></div>
      <div class="card"><div class="rotulo-card">Favoritas</div><div class="valor-card">${obrasFavoritas}</div><div class="card-sub"><i class="fas fa-star"></i> Obras marcadas</div></div>
    </div>
    <div class="grid-painel">
      <div class="painel"><h3><i class="fas fa-chart-bar"></i> Produtividade Mensal</h3><div class="grafico-container">${graficoSvg}</div><div class="grafico-legenda"><span class="leg-item"><i class="fas fa-chart-bar"></i> Obras criadas por mês</span></div></div>
      <div class="painel"><h3><i class="fas fa-palette"></i> Técnicas Mais Usadas</h3><div class="tecnicas-container">${tecnicaMaisComum.length > 0 ? tecnicaMaisComum.map((t, i) => `<div class="barra-tecnica"><div class="tecnica-nome">${capitalizarTexto(t.tecnica)}</div><div class="tecnica-barra-wrapper"><div class="tecnica-barra" style="width: ${t.porcentagem}%"></div></div><div class="tecnica-valor">${t.quantidade} (${t.porcentagem.toFixed(0)}%)</div></div>`).join('') : '<div class="estado-vazio"><p>Sem dados suficientes</p></div>'}</div></div>
    </div>
    <div class="grid-painel">
      <div class="painel"><h3>🕐 Obras mais recentes</h3><ul class="lista-obras-recentes stagger-in">${listaRecentesHtml}</ul></div>
      <div class="painel"><h3><i class="fas fa-clipboard"></i> Atividades Recentes</h3><div class="activity-feed">${activityLogger.obterRecentes(5).length > 0 ? activityLogger.obterRecentes(5).map(a => `<div class="activity-item"><div class="activity-icone">${activityLogger.obterIcone(a.tipo)}</div><div class="activity-detalhes"><div class="activity-titulo">${sanitizarHTML(a.titulo)} <span class="activity-badge ${sanitizarHTML(a.badge)}">${sanitizarHTML(a.badge)}</span></div><div class="activity-tempo">${activityLogger.formatarTempo(new Date(a.timestamp))}</div></div></div>`).join('') : '<div class="estado-vazio"><p>Nenhuma atividade registrada ainda.</p></div>'}</div></div>
    </div>
    <div class="painel"><h3>⚡ Atalhos rápidos</h3><div class="atalhos-rapidos"><button class="btn-primario" id="btnAtalhoNovaObra">✚ Nova Obra</button><button class="btn-secundario" id="btnAtalhoVenda">✚ Nova Venda</button><button class="btn-secundario" id="btnAtalhoRecibo">🧾 Gerar Recibo</button><button class="btn-secundario" id="btnAtalhoClientes"><i class="fas fa-user"></i> Gerenciar Clientes</button></div></div>
  `;
}

// Sanitização
export function sanitizarHTML(str) {
  if (!str) return '';
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

export function sanitizarURL(str) {
  if (!str) return '';
  const s = String(str).trim();
  try {
    const u = new URL(s, window.location.origin);
    if (['http:', 'https:', 'mailto:'].includes(u.protocol)) return s;
    return /^data:image\/(png|jpe?g|webp|gif|svg\+xml);/i.test(s) ? s : '';
  } catch { return ''; }
}

export function sanitizarRich(str) {
  if (!str) return '';
  const allowedTag = /<\/?(p|br|strong|em|b|i|u|ul|ol|li|span|div)(\s[^>]*)?>/gi;
  const escMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
  let lastIdx = 0; const partes = [];
  for (let match; (match = allowedTag.exec(str)) !== null; ) {
    const texto = str.slice(lastIdx, match.index);
    if (texto) partes.push(texto.replace(/[&<>"']/g, (m) => escMap[m]));
    const tag = match[0], tagName = match[1], attrs = match[2];
    if (tag[1] === '/' || !attrs || !attrs.trim()) { partes.push(tag); }
    else partes.push(`<${tagName}>`);
    lastIdx = allowedTag.lastIndex;
  }
  const resto = str.slice(lastIdx);
  if (resto) partes.push(resto.replace(/[&<>"']/g, (m) => escMap[m]));
  return partes.join('');
}

export function comprimirImagem(file, maxW = 1200, quality = 0.8) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width, h = img.height;
        if (w > maxW) { h = h * maxW / w; w = maxW; }
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');
        ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export function observarImagens() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('carregado');
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  document.querySelectorAll('.lazy-img:not(.carregado)').forEach(img => obs.observe(img));
}

export const IDB_IMG_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23e0e0e0" width="200" height="200"/%3E%3Ctext x="100" y="105" text-anchor="middle" fill="%23999" font-size="14" font-family="sans-serif"%3E...%3C/text%3E%3C/svg%3E';

export function resolverImagensIDB(container?: HTMLElement) {
  const root = container || document;
  const imgs = root.querySelectorAll<HTMLImageElement>('img[data-img-idb]');
  imgs.forEach(async (img) => {
    const ref = img.dataset.imgIdb;
    if (!ref || img.dataset.idbResolvido) return;
    img.dataset.idbResolvido = '1';
    try {
      const url = await imageStore.carregar(ref);
      if (url) {
        img.src = url;
        img.classList.remove('idb-placeholder');
        img.classList.add('carregado');
      }
    } catch (e) {
      console.warn('Erro ao carregar imagem IDB:', e);
    }
  });
}

export function downloadHTML(html, nomeArquivo) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nomeArquivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export function gerarPortalHTML(dados) {
  const d = JSON.stringify({ artista: dados.artista, contatoEmail: dados.contatoEmail, contatoTel: dados.contatoTel, encomenda: dados.encomenda }).replace(/<\/script>/g, '<\\/script>');
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Portal do Cliente</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#f8f6f2;--card:#fff;--text:#1a1a2e;--text-sec:#4a4a5a;--text-mu:#9a9aae;--border:#e2ddd4;--radius:14px;--accent:#8b5cf6}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.5}
.container{max-width:720px;margin:0 auto;padding:20px 16px}.card{background:var(--card);border-radius:var(--radius);padding:20px;margin-bottom:16px;border:1px solid var(--border)}
.card h2{font-size:1rem;margin-bottom:12px}.card h2 i{color:var(--accent);margin-right:6px}
.ph{text-align:center;padding:32px 0 24px}.ph h1{font-size:1.6rem}.ph .artista{color:var(--text-mu);font-size:0.9rem}
.sb{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:0.85rem;font-weight:600}
.sg{display:flex;gap:4px;margin:16px 0}.si{flex:1;text-align:center}
.sd{width:28px;height:28px;border-radius:50%;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;border:2px solid var(--border);background:var(--card);color:var(--text-mu)}
.sd.active{border-color:var(--accent);background:var(--accent);color:#fff}.sd.done{border-color:#16a34a;background:#16a34a;color:#fff}
.sl{font-size:0.65rem;color:var(--text-mu);line-height:1.2}.sl.active{color:var(--text);font-weight:600}
.pt{height:4px;background:var(--border);border-radius:2px;margin:0 14px 12px}.pf{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--accent),#16a34a);transition:width 0.6s ease}
.ig{display:grid;grid-template-columns:1fr 1fr;gap:12px}.il{font-size:0.7rem;color:var(--text-mu);text-transform:uppercase;letter-spacing:0.5px}.iv{font-size:0.95rem;font-weight:600;margin-top:2px}
.gg{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px}
.gi{aspect-ratio:1;border-radius:8px;overflow:hidden;cursor:pointer;position:relative}
.gi img{width:100%;height:100%;object-fit:cover}.gl{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.6));color:#fff;font-size:0.6rem;padding:4px 6px;text-align:center}
.tl{position:relative;padding-left:28px}.tl::before{content:'';position:absolute;left:10px;top:6px;bottom:6px;width:2px;background:var(--border)}
.ti{position:relative;margin-bottom:18px}.td{position:absolute;left:-22px;top:4px;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.5rem}
.ts{font-weight:600;font-size:0.85rem}.tm{font-size:0.82rem;color:var(--text-sec)}.tda{font-size:0.7rem;color:var(--text-mu)}
.cc{text-align:center}.cr{margin:4px 0;font-size:0.85rem}.cr i{width:20px;color:var(--accent)}
.pf2{text-align:center;padding:20px;font-size:0.75rem;color:var(--text-mu)}
@media(prefers-color-scheme:dark){:root{--bg:#121212;--card:#1e1e2e;--text:#e8e6e3;--text-sec:#b0aeaa;--text-mu:#7a7875;--border:#2e2c3a;--accent:#a78bfa}}
</style>
</head>
<body><div class="container" id="app"></div>
<script id="portalData" type="application/json">${d}</script>
<script>
var STAGES=[
{key:'criado',label:'Pedido Recebido',icon:'fa-clipboard'},
{key:'em_andamento',label:'Em Andamento',icon:'fa-paint-brush'},
{key:'aprovacao',label:'Aprova\u00e7\u00e3o',icon:'fa-check'},
{key:'finalizado',label:'Finalizado',icon:'fa-star'},
{key:'entregue',label:'Entregue',icon:'fa-box'}];
var SS={criado:{cor:'#3b82f6',bg:'#eff6ff'},em_andamento:{cor:'#f59e0b',bg:'#fffbeb'},aprovacao:{cor:'#8b5cf6',bg:'#f5f3ff'},finalizado:{cor:'#16a34a',bg:'#f0fdf4'},entregue:{cor:'#065f46',bg:'#ecfdf5'},cancelado:{cor:'#dc2626',bg:'#fef2f2'}};
function render(){
var data=JSON.parse(document.getElementById('portalData').textContent);
var e=data.encomenda;
var app=document.getElementById('app');
if(!e){app.innerHTML='<div class="ph"><h1><i class="fas fa-palette" style="color:var(--accent)"></i> '+s(data.artista)+'</h1><p class="artista">Portal do Cliente</p></div><div class="card" style="text-align:center;padding:40px;color:var(--text-mu)"><p><i class="fas fa-search"></i> Encomenda n\u00e3o encontrada.</p></div>';return}
var h='<div class="ph"><h1><i class="fas fa-palette" style="color:var(--accent)"></i> '+s(data.artista)+'</h1><p class="artista"><i class="fas fa-paint-brush"></i> Acompanhamento de Encomenda</p></div>';
h+=rc(e);h+='<div class="card cc"><h2><i class="fas fa-envelope"></i> Contato</h2>';
if(data.contatoEmail)h+='<div class="cr"><i class="fas fa-envelope"></i> '+s(data.contatoEmail)+'</div>';
if(data.contatoTel)h+='<div class="cr"><i class="fas fa-phone"></i> '+s(data.contatoTel)+'</div>';
h+='</div><div class="pf2"><p>D\u00favidas? Entre em contato direto com o artista.</p></div>';app.innerHTML=h;
}
function rc(e){
var st=SS[e.status]||{cor:'#6b7280',bg:'#f9fafb'};
var si=STAGES.findIndex(function(x){return x.key===e.status});
var pct=si>=0?si/(STAGES.length-1)*100:0;
var dp=e.prazo?Math.ceil((new Date(e.prazo)-new Date())/86400000):null;
var imgs=e.imagens||[];
var h='<div class="card" style="text-align:center;padding:28px 20px"><div style="font-size:2.4rem;color:var(--accent);margin-bottom:8px"><i class="fas fa-paint-brush"></i></div><h2>Ol\u00e1, '+s(e.clienteNome||'Cliente')+'!</h2><p style="color:var(--text-sec);font-size:0.9rem">Aqui est\u00e1 o progresso da sua encomenda.</p></div>';
h+='<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><h2 style="margin:0"><i class="fas fa-box"></i> '+s(e.descricao||'Encomenda')+'</h2><span class="sb" style="background:'+st.bg+';color:'+st.cor+'"><i class="fas '+(STAGES[si]?STAGES[si].icon:'fa-clipboard')+'"></i> '+(STAGES[si]?STAGES[si].label:e.status)+'</span></div></div>';
h+='<div class="card"><h2><i class="fas fa-chart-line"></i> Progresso</h2><div class="pt"><div class="pf" style="width:'+pct+'%"></div></div><div class="sg">';
STAGES.forEach(function(s,i){var c=i<si||(i===si&&e.status==='entregue')?'done':i===si?'active':'';h+='<div class="si"><div class="sd '+c+'"><i class="fas '+s.icon+'"></i></div><div class="sl '+(c?'active':'')+'">'+s.label+'</div></div>'});
h+='</div></div>';
h+='<div class="card"><h2><i class="fas fa-info-circle"></i> Detalhes</h2><div class="ig"><div class="il">Valor</div><div class="iv">'+fm(e.valor||0)+'</div><div class="il">Previs\u00e3o</div><div class="iv">'+(e.prazo?fd(e.prazo):'\u2014')+'</div></div>';
if(dp!==null&&dp>0)h+='<div style="display:flex;gap:12px;justify-content:center;margin-top:12px"><div style="text-align:center"><div style="font-size:1.6rem;font-weight:700">'+dp+'</div><div style="font-size:0.65rem;color:var(--text-mu)">Dias</div></div></div>';
else if(dp!==null&&dp<=0)h+='<div style="color:#dc2626;text-align:center;padding:8px;margin-top:8px;background:#fef2f2;border-radius:8px"><i class="fas fa-clock"></i> Prazo encerrado</div>';
h+='</div>';
if(imgs.length){h+='<div class="card"><h2><i class="fas fa-camera"></i> Fotos</h2><div class="gg">';
imgs.forEach(function(img,i){h+='<div class="gi"><img src="'+img+'" alt="Foto" loading="lazy"><div class="gl"><i class="fas fa-camera"></i> Foto '+(i+1)+'</div></div>'});
h+='</div></div>'}
h+='<div class="card"><h2><i class="fas fa-history"></i> Atualiza\u00e7\u00f5es</h2><div class="tl">';
var atu=e.atualizacoes||[];
if(atu.length){atu.forEach(function(a){var s2=SS[a.status]||{cor:'#6b7280',bg:'#f9fafb'};var sg2=STAGES.find(function(x){return x.key===a.status});h+='<div class="ti"><div class="td" style="background:'+s2.cor+';color:#fff"><i class="fas '+(sg2?sg2.icon:'fa-circle')+'"></i></div><div class="ts">'+(sg2?sg2.label:a.status)+'</div>'+(a.mensagem?'<div class="tm">'+s(a.mensagem)+'</div>':'')+'<div class="tda">'+fd(a.data)+'</div></div>'})}
else{h+='<div style="text-align:center;padding:12px;color:var(--text-mu)"><i class="fas fa-hourglass"></i> Nenhuma atualiza\u00e7\u00e3o ainda.</div>'}
h+='</div></div>';return h
}
function s(str){if(!str)return '';var d=document.createElement('div');d.textContent=str;return d.innerHTML}
function fd(d){if(!d)return '\u2014';try{return new Date(d).toLocaleDateString('pt-BR',{day:'numeric',month:'long',year:'numeric'})}catch{return d}}
function fm(v){try{return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v||0)}catch{return 'R$ 0,00'}}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',render)}else{render()}
</script>
</body></html>`;
}

const transicaoHistorico = [];
export function aplicarTransicaoView(container, chave) {
  const prev = transicaoHistorico.length > 1 ? transicaoHistorico[transicaoHistorico.length - 2] : null;
  const isVolta = prev && transicaoHistorico.indexOf(chave) < transicaoHistorico.indexOf(prev);

  container.classList.remove('view-enter-forward', 'view-enter-back', 'view-enter-fade', 'view-transition');
  void container.offsetWidth;

  let animClass = 'view-enter-fade';
  if (transicaoHistorico.length > 1) {
    const indices = transicaoHistorico.map((r, i) => r === chave ? i : -1).filter(i => i >= 0);
    const idxAtual = transicaoHistorico.length - 1;
    const idxAnterior = transicaoHistorico.length - 2;
    if (indices.length > 0 && indices[indices.length - 1] < idxAnterior) {
      animClass = 'view-enter-back';
    } else if (indices.length > 0) {
      animClass = 'view-enter-forward';
    }
  }
  container.classList.add(animClass, 'view-transition');

  if (!transicaoHistorico.includes(chave)) transicaoHistorico.push(chave);
  else {
    const idx = transicaoHistorico.indexOf(chave);
    transicaoHistorico.splice(idx, 1);
    transicaoHistorico.push(chave);
  }
  if (transicaoHistorico.length > 20) transicaoHistorico.shift();

  requestAnimationFrame(() => {
    const filhos = container.querySelectorAll('.stagger-in > *');
    filhos.forEach((el, i) => {
      el.style.animationDelay = `${i * 30}ms`;
      el.style.animationDuration = '0.4s';
    });
  });
}

// Dicas do dia
const dicasDiarias = [
  'Reserve 15 minutos ao final do dia para registrar seu progresso no Diário Criativo.',
  'Uma obra bem documentada valoriza 30% mais no mercado secundário.',
  'Clientes que recebem atualizações do processo criativo têm 2x mais chances de recomprar.',
  'Experimente a técnica dos 3 valores: luz, meia-tinta e sombra para dar volume.',
  'Mantenha seu catálogo sempre atualizado — você nunca sabe quando um comprador aparece.',
  'Use o Precificador para calcular o valor justo da sua hora de trabalho artístico.',
  'Tire fotos das suas obras com luz natural difusa para melhores resultados.',
  'O descanso é parte do processo criativo. Respeite seus limites.',
  'Analise suas estatísticas criativas todo mês para identificar padrões de produtividade.',
  'Uma boa relação com galeristas começa com um portfólio digital organizado.',
  'Documente cada etapa do processo — o "making of" é tão valioso quanto a obra final.',
  'Estabeleça metas realistas. 3 horas de pintura por dia é mais sustentável que 8.',
  'Participe de pelo menos 2 editais ou exposições por ano.',
  'Materiais de qualidade fazem diferença. Invista nos melhores pincéis que puder.',
  'Faça pausas a cada 50 minutos para evitar fadiga visual e manter a criatividade.',
  'Seu diário criativo é seu melhor instrumento de autoconhecimento artístico.',
  'Compartilhe seu processo nas redes — o público ama ver o "antes e depois".',
  'Uma paleta limitada (3-5 cores) força soluções criativas e harmoniosas.',
  'Artistas que diversificam técnicas tendem a ter carreiras mais longas.',
  'O networking não é sobre quantidade, mas qualidade das conexões.',
  'Recibos e certificados bem feitos transmitem profissionalismo e segurança.',
  'Revisite obras antigas periodicamente — sua evolução técnica vai te surpreender.',
  'Crie uma série temática anual. Colecionadores valorizam coesão de portfólio.',
  'Use o calendário do Diário para planejar seus ciclos criativos com antecedência.',
  'A luz do seu ateliê muda com as estações. Aproveite cada qualidade de luz.',
  'Faça um backup dos dados toda semana — seu registro criativo é precioso.',
  'O mercado de arte valoriza histórias. Cada obra tem uma — conte-a bem.',
  'Estude um mestre por mês. Incorpore uma técnica nova ao seu repertório.',
  'Clientes satisfeitos indicam. Invista no pós-venda e no relacionamento.',
  'A arte é um músculo: quanto mais você pratica, mais forte sua voz criativa fica.'
];

export function obterDicaDoDia() {
  const diaDoAno = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return dicasDiarias[diaDoAno % dicasDiarias.length];
}

// Instâncias globais
const _dataStore = new DataStore();
const dataStore = new StoreBridge(_dataStore);
(window as any).dataStore = dataStore;
const freemium = new Freemium(dataStore);
(window as any).Freemium = freemium;
const themeEngine = new ThemeEngine(dataStore);
const router = new Router(dataStore);
const eventBus = new EventBus();
const activityLogger = new ActivityLogger();
/* eslint-disable @typescript-eslint/no-unused-vars */
const dashboardView = new DashboardView(dataStore, router);
const catalogoView = new CatalogoView(dataStore, router);
const pdfGenerator = new PDFGenerator(dataStore);
const clientesView = new ClientesView(dataStore, router);
const vendasView = new VendasView(dataStore, router, pdfGenerator);
const certificadosView = new CertificadosView(dataStore, router);
const referenciasView = new ReferenciasView(dataStore, router);
const galeriaVirtualView = new GaleriaVirtualView(dataStore, router);
const precificadorView = new PrecificadorView(dataStore, router);
const atelierView = new AtelierView(dataStore, router);
const diarioView = new DiarioView(dataStore, router);
const redeView = new RedeView(dataStore, router);
const portalView = new PortalView(dataStore, router);
const cloudSync = new CloudSync(dataStore);
const encomendasView = new EncomendasView(dataStore, router);
const exposicoesView = new ExposicoesView(dataStore, router);
const financeiroView = new FinanceiroView(dataStore, router);
const configuracoesView = new ConfiguracoesView(dataStore, router);
const exportImportView = new ExportImportView(dataStore, router);
const planosView = new PlanosView(dataStore, router);
/* eslint-enable @typescript-eslint/no-unused-vars */

// Event listeners
document.getElementById('viewPrincipal').addEventListener('click', (e) => {
  const botaoModal = e.target.closest('[data-abrir-modal]');
  if (botaoModal) { abrirModalNovoItem(botaoModal.dataset.abrirModal, dataStore, router); return; }
  if (e.target.id === 'btnAtalhoNovaObra') { eventBus.emitir('abrir-nova-obra'); return; }
  if (e.target.getAttribute('data-acao') === 'irCatalogo') { router.navegar('catalogo'); return; }
  if (e.target.id === 'btnAtalhoVenda') { eventBus.emitir('abrir-nova-venda'); return; }
  if (e.target.id === 'btnAtalhoRecibo') { eventBus.emitir('abrir-recibo-rapido'); return; }
});

document.getElementById('btnColapsar').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('colapsada');
});

document.getElementById('btnBackup').addEventListener('click', () => {
  dataStore.exportarBackup();
  mostrarToast('Backup exportado com sucesso!', 'sucesso');
});

// Spinner premium no botão de submit enquanto salva
document.addEventListener('submit', (e) => {
  const alvo = e.target;
  const btn = alvo && alvo.querySelector && alvo.querySelector('button[type="submit"]');
  if (btn && btn.tagName === 'BUTTON') {
    btn.classList.add('btn-carregando');
    setTimeout(() => btn.classList.remove('btn-carregando'), 600);
  }
}, true);

document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') fecharModal();
});

if (window.innerWidth <= 860) { document.getElementById('sidebar').classList.add('colapsada'); }

// Override mostrarToast com suporte a tipos
window.mostrarToast = function(mensagem, tipo = 'info') {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  const iconEl = toast?.querySelector('i');
  const progresso = document.getElementById('toastProgress');
  if (!toast || !msgEl) return;
  const icones = { sucesso: 'fa-check-circle', erro: 'fa-times-circle', aviso: 'fa-exclamation-triangle', info: 'fa-info-circle' };
  const temIconeProprio = /<i\s|[\u{1F000}-\u{1FFFF}]/u.test(mensagem);
  if (iconEl && tipo && icones[tipo] && !temIconeProprio) { iconEl.className = 'fas ' + icones[tipo]; }
  msgEl.textContent = mensagem;
  toast.className = 'toast' + (tipo && icones[tipo] ? ' ' + tipo : '');
  toast.classList.add('mostrar');
  if (progresso) {
    progresso.style.animation = 'none';
    void progresso.offsetWidth;
    progresso.style.animation = '';
  }
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.add('saindo');
    setTimeout(() => { toast.classList.remove('mostrar', 'saindo'); }, 250);
  }, 2800);
};

// Override Router.navegar para view transitions
const _navegarOriginal = Router.prototype.navegar;
Router.prototype.navegar = function(chave) {
  _navegarOriginal.call(this, chave);
  aplicarTransicaoView(this.container, chave);
};

// Service Worker
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('./sw.js').catch(() => {}); }

// Init
themeEngine.inicializar();
inicializarChartDefaults();
router.inicializar();
registrarAtalhosTeclado();
setTimeout(() => iniciarMonitorInatividade(), 500);
setTimeout(() => cloudSync.iniciarAutoBackup(), 2000);
iniciarFab();
iniciarObserverConfetti();
iniciarNotificacoes();
iniciarDragDrop();
if (dataStore && !dataStore.dados.config.tourCompleted) { setTimeout(() => iniciarTour(), 1000); }

// Hash listener for portal / galeria virtual
(function() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#portal')) {
    setTimeout(() => router.navegar('portal'), 200);
  } else if (hash && hash.includes('galeria=virtual')) {
    setTimeout(() => {
      router.navegar('galeriaVirtual');
      if (hash.includes('tour=obras-disponiveis') && galeriaVirtualView) { setTimeout(() => galeriaVirtualView.iniciarTour(), 800); }
    }, 300);
  }
})();

// PWA — Service Worker + Install Prompt
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('btnInstalarPWA');
  if (btn) btn.style.display = 'flex';
});
window.instalarPWA = async function() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  if (result.outcome === 'accepted') { deferredPrompt = null; const btn = document.getElementById('btnInstalarPWA'); if (btn) btn.style.display = 'none'; }
};

// Image observer
const _mutationObs = new MutationObserver(() => { observarImagens(); });
_mutationObs.observe(document.getElementById('viewPrincipal'), { childList: true, subtree: true });

// Exports for Jest tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DataStore,
    StoreBridge,
    pinia,
    obraStore,
    useObraStore,
    clienteStore,
    useClienteStore,
    vendaStore,
    useVendaStore,
    configStore,
    useConfigStore,
    EventBus,
    ThemeEngine,
    Router,
    DashboardView,
    CatalogoView,
    ClientesView,
    VendasView,
    CertificadosView,
    ReferenciasView,
    GaleriaVirtualView,
    PrecificadorView,
    AtelierView,
    RedeView,
    DiarioView,
    PortalView,
    CloudSync,
    EncomendasView,
    ExposicoesView,
    FinanceiroView,
    ConfiguracoesView,
    ExportImportView,
    ImageLightbox,
    abrirLightbox,
    imageLightbox,
    formatarMoeda,
    formatarData,
    classeStatus,
    rotuloStatus,
    classeStatusVenda,
    rotuloStatusVenda,
    sanitizarHTML,
    sanitizarURL,
    sanitizarRich,
    debounce,
    gerarImagemPlaceholder,
    calcularObrasPorMes,
    gerarGraficoSVG,
    capitalizarTexto,
    abrirModal,
    fecharModal,
    mostrarToast,
    confirmarAcao,
    mostrarToastComDesfazer,
    renderizarDashboard,
    renderizarViewPlaceholder,
    PDFGenerator,
    gerarQRCodeDataUrl,
    observarImagens,
    aplicarTransicaoView,
    iniciarMonitorInatividade,
    bloquearTela,
    dispararConfetti,
    obterDicaDoDia,
    iniciarTour
  };
}
