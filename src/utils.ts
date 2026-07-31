// Utilitários gerais do CRM

export function formatarMoeda(valor) {
  return (valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarData(isoStr) {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  return d.toLocaleDateString('pt-BR');
}

export function mostrarToast(mensagem, tipo) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;
  const icones = { sucesso: 'fa-check-circle', erro: 'fa-times-circle', aviso: 'fa-exclamation-triangle', info: 'fa-info-circle' };
  const iconEl = toast.querySelector('i');
  if (iconEl && tipo && icones[tipo]) { iconEl.className = 'fas ' + icones[tipo]; }
  msgEl.textContent = mensagem;
  toast.className = 'toast' + (tipo && icones[tipo] ? ' ' + tipo : '');
  toast.classList.add('mostrar');
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.add('saindo');
    setTimeout(() => { toast.classList.remove('mostrar', 'saindo'); }, 250);
  }, 2800);
}

export function skeletonHTML(tipo) {
  const mapas = {
    grafico: '<div class="skeleton skeleton-quadro"></div>',
    lista: '<div class="skeleton skeleton-linha"></div><div class="skeleton skeleton-linha w60"></div><div class="skeleton skeleton-linha"></div><div class="skeleton skeleton-linha w40"></div>',
    grid: '<div class="skeleton-grid">' + Array(4).fill('<div class="skeleton skeleton-card"></div>').join('') + '</div>',
    mapa: '<div class="skeleton skeleton-quadro" style="height:400px"></div>',
  };
  return mapas[tipo] || mapas.lista;
}

export function mostrarLoading(msg = 'Aguarde...') {
  document.getElementById('loadingTexto').textContent = msg;
  document.getElementById('loadingOverlay').classList.add('ativo');
}
export function esconderLoading() {
  document.getElementById('loadingOverlay').classList.remove('ativo');
}

export function abrirModal(htmlConteudo) {
  const caixa = document.getElementById('modalCaixa');
  const overlay = document.getElementById('modalOverlay');
  caixa.innerHTML = htmlConteudo;
  overlay.classList.add('aberto');
  const h3 = caixa.querySelector('h3');
  if (h3 && !h3.id) h3.id = 'modalTitulo_' + Date.now();
  if (h3) caixa.setAttribute('aria-labelledby', h3.id);
}

export function fecharModal() {
  const overlay = document.getElementById('modalOverlay');
  const caixa = document.getElementById('modalCaixa');
  overlay.classList.remove('aberto');
  caixa.removeAttribute('aria-labelledby');
  setTimeout(() => {
    if (!overlay.classList.contains('aberto')) {
      caixa.innerHTML = '';
    }
  }, 300);
}

export function classeStatus(status) {
  const mapa = {
    'disponível': 'disponivel',
    'vendida': 'vendida',
    'reservada': 'reservada',
    'em exposição': 'exposicao',
    'em exposicao': 'exposicao'
  };
  return mapa[status] || 'disponivel';
}

export function rotuloStatus(status) {
  const mapa = {
    'disponível': 'Disponível',
    'vendida': 'Vendida',
    'reservada': 'Reservada',
    'em exposição': 'Em Exposição',
    'em exposicao': 'Em Exposição'
  };
  return mapa[status] || 'Disponível';
}

export function gerarImagemPlaceholder(cor, emoji) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
    <rect width="400" height="400" fill="${cor}"/>
    <text x="50%" y="50%" font-size="130" text-anchor="middle" dominant-baseline="central">${emoji}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function calcularObrasPorMes(obras) {
  const agora = new Date();
  const meses = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(agora.getFullYear(), agora.getMonth() - i, 1);
    meses.push({ ano: d.getFullYear(), mes: d.getMonth(), rotulo: d.toLocaleDateString('pt-BR', { month: 'short' }), total: 0 });
  }
  obras.forEach(obra => {
    const d = new Date(obra.dataCadastro || obra.criadoEm);
    const alvo = meses.find(m => m.ano === d.getFullYear() && m.mes === d.getMonth());
    if (alvo) alvo.total++;
  });
  return meses;
}

export function gerarGraficoSVG(dadosMeses) {
  const largura = 480;
  const altura = 180;
  const margemBase = 28;
  const margemTopo = 20;
  const larguraBarra = 36;
  const espacamento = (largura - margemBase) / dadosMeses.length;
  const maiorValor = Math.max(1, ...dadosMeses.map(m => m.total));
  const alturaUtil = altura - margemBase - margemTopo;

  let barrasSvg = '';
  dadosMeses.forEach((m, i) => {
    const alturaBarra = (m.total / maiorValor) * alturaUtil;
    const x = i * espacamento + (espacamento - larguraBarra) / 2;
    const y = altura - margemBase - alturaBarra;
    barrasSvg += `
      <rect class="barra-grafico" x="${x}" y="${y}" width="${larguraBarra}" height="${Math.max(alturaBarra, 2)}" rx="4"></rect>
      <text class="grafico-valor" x="${x + larguraBarra / 2}" y="${y - 6}" text-anchor="middle">${m.total}</text>
      <text class="grafico-label" x="${x + larguraBarra / 2}" y="${altura - 8}" text-anchor="middle">${m.rotulo}</text>
    `;
  });

  return `
    <svg class="grafico-svg" viewBox="0 0 ${largura} ${altura}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gráfico de obras criadas por mês">
      <line x1="0" y1="${altura - margemBase}" x2="${largura}" y2="${altura - margemBase}" stroke="var(--border)" stroke-width="1"></line>
      ${barrasSvg}
    </svg>
  `;
}

export function calcularTecnicaMaisComum(obras) {
  if (!obras.length) return [];
  const contagem = {};
  obras.forEach(o => {
    if (o.tecnica) { contagem[o.tecnica] = (contagem[o.tecnica] || 0) + 1; }
  });
  const total = obras.length;
  return Object.entries(contagem)
    .map(([tecnica, quantidade]) => ({ tecnica, quantidade, porcentagem: (quantidade / total) * 100 }))
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 5);
}

export function calcularCrescimentoMensal(obras) {
  if (!obras.length) return 0;
  const agora = new Date();
  const esteMes = agora.getMonth();
  const esteAno = agora.getFullYear();
  const mesAnterior = esteMes === 0 ? 11 : esteMes - 1;
  const anoAnterior = esteMes === 0 ? esteAno - 1 : esteAno;
  const obrasEsteMes = obras.filter(o => {
    const data = new Date(o.dataCadastro || o.criadoEm);
    return data.getMonth() === esteMes && data.getFullYear() === esteAno;
  }).length;
  const obrasMesAnterior = obras.filter(o => {
    const data = new Date(o.dataCadastro || o.criadoEm);
    return data.getMonth() === mesAnterior && data.getFullYear() === anoAnterior;
  }).length;
  if (obrasMesAnterior === 0) return obrasEsteMes > 0 ? 100 : 0;
  return ((obrasEsteMes - obrasMesAnterior) / obrasMesAnterior) * 100;
}

export function renderizarViewPlaceholder({ titulo, subtitulo, icone, colecao, dataStore, colunas, renderLinha, textoBotao }) {
  const itens = dataStore.listar(colecao);
  const tabelaHtml = itens.length ? `
    <div class="tabela-wrapper">
      <table>
        <caption class="sr-only">${titulo}</caption>
        <thead>
          <tr>${colunas.map(c => `<th>${c}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${itens.map(renderLinha).join('')}
        </tbody>
      </table>
    </div>
  ` : `
    <div class="tabela-wrapper">
      <div class="estado-vazio">
        <div class="icone-vazio">${icone}</div>
        <p>Nenhum registro em "${titulo}" ainda.</p>
      </div>
    </div>
  `;
  return `
    <div class="view-cabecalho">
      <div>
        <h2>${titulo}</h2>
        <p class="subtitulo">${subtitulo}</p>
      </div>
      <button class="btn-primario" data-abrir-modal="${colecao}">✚ ${textoBotao}</button>
    </div>
    ${tabelaHtml}
  `;
}

export function capitalizarTexto(texto) {
  if (!texto) return '-';
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function classeStatusVenda(status) {
  const mapa = { 'pendente': 'pendente', 'paga': 'paga', 'cancelada': 'cancelada', 'negociacao': 'negociacao', 'em negociação': 'negociacao', 'em negociações': 'negociacao' };
  return mapa[status] || 'pendente';
}

export function rotuloStatusVenda(status) {
  const mapa = { 'pendente': 'Pendente', 'paga': 'Paga', 'cancelada': 'Cancelada', 'negociacao': 'Negociação', 'em negociação': 'Em Negociação', 'em negociações': 'Em Negociação' };
  return mapa[status] || status;
}

export function gerarQRCodeDataUrl(texto) {
  const tamanho = 200;
  if (typeof QRCode !== 'undefined') {
    const div = document.createElement('div');
    const qr = new QRCode(div, { text: texto, width: tamanho, height: tamanho, correctLevel: QRCode.CorrectLevel.H });
    const canvas = div.querySelector('canvas');
    const dataUrl = canvas ? canvas.toDataURL() : '';
    qr.clear(); div.remove();
    return dataUrl;
  }
  const canvas = document.createElement('canvas');
  canvas.width = tamanho;
  canvas.height = tamanho;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, tamanho, tamanho);
  ctx.fillStyle = 'black';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('QR', tamanho/2, tamanho/2 - 10);
  ctx.fillText(texto.length > 20 ? texto.slice(0,20)+'...' : texto, tamanho/2, tamanho/2 + 20);
  return canvas.toDataURL();
}

export function definicaoFormulario(colecao, dataStore) {
  const campos = {
    obras: [
      { tipo: 'text', nome: 'titulo', rotulo: 'Título *', obrigatorio: true },
      { tipo: 'select', nome: 'tecnica', rotulo: 'Técnica *', opcoes: ['óleo','aquarela','escultura','outra'], obrigatorio: true },
      { tipo: 'number', nome: 'ano', rotulo: 'Ano' },
      { tipo: 'dimensoes', nome: 'dimensoes', rotulo: 'Dimensões (cm)' },
      { tipo: 'textarea', nome: 'descricao', rotulo: 'Descrição' },
      { tipo: 'number', nome: 'preco', rotulo: 'Preço (R$) *', obrigatorio: true },
      { tipo: 'select', nome: 'status', rotulo: 'Status', opcoes: ['disponível','reservada','vendida','em exposição'] },
      { tipo: 'text', nome: 'serie', rotulo: 'Série' },
      { tipo: 'file', nome: 'imagem', rotulo: 'Imagem' }
    ],
    clientes: [
      { tipo: 'text', nome: 'nome', rotulo: 'Nome *', obrigatorio: true },
      { tipo: 'email', nome: 'email', rotulo: 'E-mail' },
      { tipo: 'tel', nome: 'telefone', rotulo: 'Telefone' },
      { tipo: 'text', nome: 'endereco', rotulo: 'Endereço' },
      { tipo: 'textarea', nome: 'notas', rotulo: 'Notas' }
    ],
    vendas: [
      { tipo: 'select', nome: 'obraId', rotulo: 'Obra *', opcoes: (dataStore.listar('obras')||[]).filter(o=>o.status!=='vendida').map(o=>({valor:o.id,rotulo:o.titulo})), obrigatorio: true },
      { tipo: 'select', nome: 'clienteId', rotulo: 'Cliente *', opcoes: (dataStore.listar('clientes')||[]).map(c=>({valor:c.id,rotulo:c.nome})), obrigatorio: true },
      { tipo: 'number', nome: 'valorTotal', rotulo: 'Valor Total *', obrigatorio: true },
      { tipo: 'select', nome: 'formaPagamento', rotulo: 'Forma de Pagamento', opcoes: ['à vista','cartão','boleto','pix','transferência','parcelado'] },
      { tipo: 'select', nome: 'status', rotulo: 'Status', opcoes: ['pendente','paga','cancelada','em negociação'] }
    ],
    certificados: [
      { tipo: 'select', nome: 'obraId', rotulo: 'Obra *', opcoes: (dataStore.listar('obras')||[]).map(o=>({valor:o.id,rotulo:o.titulo})), obrigatorio: true },
      { tipo: 'select', nome: 'edicaoTipo', rotulo: 'Tipo de Edição', opcoes: ['unica','edicao_limitada','prova_de_artista','reproducao'] },
      { tipo: 'text', nome: 'local', rotulo: 'Local de Criação' }
    ]
  };
  return campos[colecao] || [];
}

export function montarCampoHtml(campo) {
  const req = campo.obrigatorio ? ' required' : '';
  if (campo.tipo === 'select') {
    const opcoesHtml = (campo.opcoes || []).map(o => {
      const v = typeof o === 'object' ? o.valor : o;
      const r = typeof o === 'object' ? o.rotulo : o;
      return `<option value="${v}">${r}</option>`;
    }).join('');
    return `<div class="campo-form"><label>${campo.rotulo}</label><select id="campo_${campo.nome}" aria-label="${campo.rotulo}"${req}>${opcoesHtml}</select></div>`;
  }
  if (campo.tipo === 'textarea') {
    return `<div class="campo-form"><label>${campo.rotulo}</label><textarea id="campo_${campo.nome}" aria-label="${campo.rotulo}"${req}></textarea></div>`;
  }
  if (campo.tipo === 'dimensoes') {
    return `<div class="campo-form"><label>${campo.rotulo}</label><div class="form-linha">
      <input type="number" id="campoAltura" placeholder="Altura" aria-label="Altura">
      <input type="number" id="campoLargura" placeholder="Largura" aria-label="Largura">
      <input type="number" id="campoProfundidade" placeholder="Profundidade" aria-label="Profundidade">
    </div></div>`;
  }
  if (campo.tipo === 'file') {
    return `<div class="campo-form"><label>${campo.rotulo}</label><input type="file" id="campo_${campo.nome}" accept="image/*" aria-label="${campo.rotulo}"${req}></div>`;
  }
  return `<div class="campo-form"><label>${campo.rotulo}</label><input type="${campo.tipo}" id="campo_${campo.nome}" aria-label="${campo.rotulo}"${req}></div>`;
}

export function abrirModalNovoItem(colecao, dataStore, router) {
  const campos = definicaoFormulario(colecao, dataStore);
  abrirModal(`
    <h3>Novo ${colecao.charAt(0).toUpperCase() + colecao.slice(1)}</h3>
    <form id="formGenerico">
      ${campos.map(montarCampoHtml).join('')}
      <div class="modal-acoes">
        <button type="button" class="btn-secundario" id="btnCancelarGenerico">Cancelar</button>
        <button type="submit" class="btn-primario">Salvar</button>
      </div>
    </form>
  `);
  document.getElementById('btnCancelarGenerico').addEventListener('click', fecharModal);
  document.getElementById('formGenerico').addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = {};
    campos.forEach(c => {
      if (c.tipo === 'dimensoes') {
        dados.altura = Number(document.getElementById('campoAltura')?.value) || 0;
        dados.largura = Number(document.getElementById('campoLargura')?.value) || 0;
        dados.profundidade = Number(document.getElementById('campoProfundidade')?.value) || 0;
      } else if (c.tipo === 'file') { /* file inputs handled separately */ } else {
        dados[c.nome] = document.getElementById('campo_' + c.nome)?.value || '';
      }
    });
    dataStore.adicionar(colecao, dados);
    mostrarToast(`${colecao.charAt(0).toUpperCase() + colecao.slice(1)} cadastrado com sucesso!`, 'sucesso');
    fecharModal();
    router.navegar(colecao);
  });
}

export function debounce(fn, delayMs = 250) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delayMs);
  };
}


