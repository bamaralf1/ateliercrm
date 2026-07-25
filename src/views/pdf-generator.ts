export class PDFGenerator {
  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  // Gera numeração sequencial por ano e tipo (REC-2026-001 / ORC-2026-001),
  // persistindo o contador em config para nunca repetir um número
  gerarNumero(tipo) {
    const ano = new Date().getFullYear();
    const cfg = this.dataStore.dados.config;
    const chave = tipo === 'proposta' ? 'contadorPropostas' : 'contadorRecibos';
    if (!cfg[chave]) cfg[chave] = {};
    cfg[chave][ano] = (cfg[chave][ano] || 0) + 1;
    this.dataStore.salvar();
    const prefixo = tipo === 'proposta' ? 'ORC' : 'REC';
    return `${prefixo}-${ano}-${String(cfg[chave][ano]).padStart(3, '0')}`;
  }

  // Resolve as CSS variables do tema atual em valores concretos (hex/rgb),
  // pois o html2canvas nem sempre interpreta var(--x) corretamente
  obterCoresTema() {
    const cs = getComputedStyle(document.body);
    return {
      bg: cs.getPropertyValue('--bg').trim() || '#ffffff',
      text: cs.getPropertyValue('--text').trim() || '#1a1a1a',
      textMuted: cs.getPropertyValue('--text-muted').trim() || '#6b7280',
      accent: cs.getPropertyValue('--accent').trim() || '#2563eb',
      card: cs.getPropertyValue('--card').trim() || '#f8fafc',
      border: cs.getPropertyValue('--border').trim() || '#e5e7eb',
      fonte: (cs.getPropertyValue('--font-principal').trim() || 'Arial, sans-serif').replace(/'/g, '')
    };
  }

  // Abre o modal com o resumo do documento e a área de assinatura (canvas touch/mouse)
  abrirModalAssinatura(venda, tipo) {
    if (!venda) { mostrarToast('Venda não encontrada.'); return; }
    const obra = this.dataStore.buscarPorId('obras', venda.obraId);
    const cliente = this.dataStore.buscarPorId('clientes', venda.clienteId);
    if (!obra || !cliente) { mostrarToast('Não foi possível localizar a obra ou o cliente desta venda.'); return; }

    // Numeração estável: gera uma única vez por documento e reaproveita em novas exportações
    const chaveNumero = tipo === 'proposta' ? 'numeroProposta' : 'numeroRecibo';
    if (!venda[chaveNumero]) {
      venda[chaveNumero] = this.gerarNumero(tipo);
      this.dataStore.atualizar('vendas', venda.id, { [chaveNumero]: venda[chaveNumero] });
    }

    const tituloDoc = tipo === 'proposta' ? 'Proposta de Orçamento' : 'Recibo de Venda';

    abrirModal(`
      <h3>Gerar ${tituloDoc}</h3>
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:14px;">
        ${obra.titulo} — ${cliente.nome} — ${formatarMoeda(venda.precoFinal)} · Nº ${venda[chaveNumero]}
      </p>
      <div class="campo-form">
        <label>Assinatura do artista</label>
        <canvas id="canvasAssinatura" class="area-assinatura" width="500" height="160"></canvas>
        <div class="legenda-assinatura">
          <span class="texto-ajuda">Desenhe com o mouse ou o dedo (touch)</span>
          <button type="button" class="btn-secundario" id="btnLimparAssinatura" style="padding:5px 10px;font-size:0.75rem;">Limpar</button>
        </div>
      </div>
      <div class="modal-acoes">
        <button type="button" class="btn-secundario" id="btnCancelarPdf">Cancelar</button>
        <button type="button" class="btn-primario" id="btnGerarPdfFinal">⬇️ Gerar PDF</button>
      </div>
    `);

    const canvas = document.getElementById('canvasAssinatura');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1a1a1a';
    let desenhando = false;

    // Converte a posição do ponteiro (mouse/touch) para a escala real do canvas
    const posicaoRelativa = (evento) => {
      const rect = canvas.getBoundingClientRect();
      const ponto = evento.touches ? evento.touches[0] : evento;
      return {
        x: (ponto.clientX - rect.left) * (canvas.width / rect.width),
        y: (ponto.clientY - rect.top) * (canvas.height / rect.height)
      };
    };
    const iniciarTraco = (e) => { desenhando = true; const p = posicaoRelativa(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); e.preventDefault(); };
    const continuarTraco = (e) => { if (!desenhando) return; const p = posicaoRelativa(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault(); };
    const finalizarTraco = () => { desenhando = false; };

    canvas.addEventListener('mousedown', iniciarTraco);
    canvas.addEventListener('mousemove', continuarTraco);
    window.addEventListener('mouseup', finalizarTraco);
    canvas.addEventListener('touchstart', iniciarTraco, { passive: false });
    canvas.addEventListener('touchmove', continuarTraco, { passive: false });
    canvas.addEventListener('touchend', finalizarTraco);

    document.getElementById('btnLimparAssinatura').addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
    document.getElementById('btnCancelarPdf').addEventListener('click', fecharModal);
    document.getElementById('btnGerarPdfFinal').addEventListener('click', () => {
      this.gerarPdf(venda, obra, cliente, tipo, canvas.toDataURL('image/png'));
    });
  }

  // Monta um HTML off-screen estilizado com as cores do tema ativo, captura com
  // html2canvas e embute a imagem resultante em um PDF (via jsPDF)
  async gerarPdf(venda, obra, cliente, tipo, assinaturaDataUrl) {
    if (!window.jspdf || !window.html2canvas) {
      mostrarToast('Bibliotecas de PDF indisponíveis (verifique sua conexão com a internet).');
      return;
    }
    mostrarToast('Gerando PDF, aguarde...');

    const cores = this.obterCoresTema();
    const artista = this.dataStore.dados.config.artista || {};
    const nomeArtista = artista.nome || 'Ateliê do Artista';
    const numero = venda[tipo === 'proposta' ? 'numeroProposta' : 'numeroRecibo'];
    const tituloDoc = tipo === 'proposta' ? 'PROPOSTA DE ORÇAMENTO' : 'RECIBO DE VENDA';
    const textoGarantia = this.dataStore.dados.config.textoGarantia || '';

    const dim = obra.dimensoes || {};
    const partesDim = [dim.altura, dim.largura, dim.profundidade].filter(v => v && Number(v) > 0);
    const dimensoesTexto = partesDim.length ? `${partesDim.join(' x ')} cm` : '-';

    const imagemObraHtml = /^data:image\/(png|jpe?g)/i.test(obra.imagem || '')
      ? `<img src="${obra.imagem}" style="width:150px;height:150px;object-fit:cover;border-radius:6px;border:1px solid ${cores.border};">`
      : '';

    // Container off-screen usado apenas para a captura visual (removido logo após gerar o PDF)
    const container = document.createElement('div');
    container.style.cssText = `position:fixed;left:-9999px;top:0;width:750px;background:${cores.bg};color:${cores.text};font-family:${cores.fonte};padding:48px;box-sizing:border-box;`;

    container.innerHTML = `
      <div style="text-align:center;border-bottom:2px solid ${cores.border};padding-bottom:18px;margin-bottom:24px;">
        <div style="font-size:26px;font-weight:700;">${nomeArtista}</div>
        <div style="font-size:12px;color:${cores.textMuted};margin-top:4px;">${artista.email || ''}${artista.telefone ? ' · ' + artista.telefone : ''}</div>
      </div>
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:20px;font-weight:700;color:${cores.accent};letter-spacing:1px;">${tituloDoc}</div>
        <div style="font-size:12px;color:${cores.textMuted};margin-top:6px;">Nº ${numero} · ${formatarData(venda.data)}</div>
      </div>
      <div style="display:flex;gap:24px;margin-bottom:24px;">
        <div style="flex:1;background:${cores.card};border:1px solid ${cores.border};border-radius:10px;padding:16px;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:${cores.textMuted};margin-bottom:8px;">Comprador</div>
          <div style="font-size:14px;font-weight:700;">${cliente.nome}</div>
          <div style="font-size:12px;color:${cores.textMuted};margin-top:4px;">${cliente.email || ''}</div>
          <div style="font-size:12px;color:${cores.textMuted};">${cliente.telefone || ''}</div>
          ${cliente.endereco ? `<div style="font-size:12px;color:${cores.textMuted};margin-top:4px;">${cliente.endereco}</div>` : ''}
        </div>
        <div style="flex:1;background:${cores.card};border:1px solid ${cores.border};border-radius:10px;padding:16px;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:${cores.textMuted};margin-bottom:8px;">Pagamento</div>
          <div style="font-size:20px;font-weight:700;color:${cores.accent};">${formatarMoeda(venda.precoFinal)}</div>
          <div style="font-size:12px;color:${cores.textMuted};margin-top:4px;">Forma: ${capitalizarTexto(venda.formaPagamento)}</div>
          <div style="font-size:12px;color:${cores.textMuted};">Status: ${rotuloStatusVenda(venda.status)}</div>
        </div>
      </div>
      <div style="display:flex;gap:20px;align-items:flex-start;background:${cores.card};border:1px solid ${cores.border};border-radius:10px;padding:16px;margin-bottom:24px;">
        ${imagemObraHtml}
        <div>
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:${cores.textMuted};margin-bottom:6px;">Obra</div>
          <div style="font-size:16px;font-weight:700;">${obra.titulo}</div>
          <div style="font-size:12px;color:${cores.textMuted};margin-top:4px;">${capitalizarTexto(obra.tecnica)} · ${dimensoesTexto} · ${obra.ano || '-'}</div>
        </div>
      </div>
      ${textoGarantia ? `<div style="font-size:11px;color:${cores.textMuted};line-height:1.6;border-top:1px solid ${cores.border};padding-top:14px;margin-bottom:28px;">${textoGarantia}</div>` : ''}
      <div style="display:flex;justify-content:center;margin-bottom:8px;">
        <div style="text-align:center;">
          ${assinaturaDataUrl ? `<img src="${assinaturaDataUrl}" style="height:70px;">` : ''}
          <div style="border-top:1px solid ${cores.text};padding-top:6px;margin-top:2px;font-size:12px;min-width:220px;">${nomeArtista}</div>
          <div style="font-size:10px;color:${cores.textMuted};">Assinatura do artista</div>
        </div>
      </div>
      <div style="text-align:center;font-size:9px;color:${cores.textMuted};margin-top:20px;border-top:1px solid ${cores.border};padding-top:10px;">
        Documento gerado em ${new Date().toLocaleDateString('pt-BR')} · Atelier CRM
      </div>
    `;

    document.body.appendChild(container);

    try {
      const canvasCapturado = await window.html2canvas(container, { scale: 2, backgroundColor: cores.bg, useCORS: true });
      const imgData = canvasCapturado.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'px', format: [canvasCapturado.width, canvasCapturado.height] });
      doc.addImage(imgData, 'PNG', 0, 0, canvasCapturado.width, canvasCapturado.height);
      doc.save(`${tipo === 'proposta' ? 'proposta' : 'recibo'}-${numero.toLowerCase()}.pdf`);
      mostrarToast('PDF gerado com sucesso!');
      fecharModal();
    } catch (erro) {
      console.error('Erro ao gerar PDF:', erro);
      mostrarToast('Não foi possível gerar o PDF. Tente novamente.');
    } finally {
      document.body.removeChild(container);
    }
  }
}
