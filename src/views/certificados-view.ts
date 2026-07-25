export class CertificadosView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
  }

  certificadosOrdenados() {
    return [...this.dataStore.listar('certificados')]
      .sort((a, b) => new Date(b.dataEmissao || b.criadoEm) - new Date(a.dataEmissao || a.criadoEm));
  }

  render() {
    const certificados = this.certificadosOrdenados();

    const linhas = certificados.map(c => `
      <tr>
        <td><strong>${c.tituloObra || '-'}</strong></td>
        <td>${c.numeroSerie}</td>
        <td>${c.edicaoTipo === 'limitada' ? `${c.edicaoAtual}/${c.edicaoTotal}` : 'Única'}</td>
        <td>${formatarData(c.dataEmissao || c.criadoEm)}</td>
        <td class="acoes-linha-tabela">
          <button class="btn-icone-tabela" data-baixar-certificado="${c.id}">📄 PDF</button>
          <button class="btn-icone-tabela" data-excluir-certificado="${c.id}">🗑️</button>
        </td>
      </tr>
    `).join('');

    const tabela = certificados.length ? `
      <div class="tabela-wrapper">
        <table>
          <thead><tr><th>Obra</th><th>Nº de Série</th><th>Edição</th><th>Emitido em</th><th></th></tr></thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>
    ` : `
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio">📜</div><p>Nenhum certificado emitido ainda.</p></div>
      </div>
    `;

    return `
      <div class="view-cabecalho">
        <div>
          <h2>Certificados de Autenticidade</h2>
          <p class="subtitulo">${certificados.length} certificado${certificados.length === 1 ? '' : 's'} emitido${certificados.length === 1 ? '' : 's'}</p>
        </div>
        <button class="btn-gradient" id="btnNovoCertificado">🔏 Novo Certificado</button>
      </div>
      ${tabela}
    `;
  }

  aposRenderizar() {
    this.removerListeners();
    const container = document.getElementById('viewPrincipal');
    const btnNovo = document.getElementById('btnNovoCertificado');
    if (btnNovo) btnNovo.addEventListener('click', () => this.abrirFormulario());

    const delegHandler = (e) => {
      const alvoBaixar = e.target.closest('[data-baixar-certificado]');
      const alvoExcluir = e.target.closest('[data-excluir-certificado]');
      if (alvoBaixar) { this.baixarNovamente(alvoBaixar.dataset.baixarCertificado); return; }
      if (alvoExcluir) { this.excluirCertificado(alvoExcluir.dataset.excluirCertificado); return; }
    };
    container.addEventListener('click', delegHandler);
    this._bindCache['delegCertificados'] = { el: container, handler: delegHandler, type: 'click' };
  }

  excluirCertificado(id) {
    if (!confirm('Excluir este certificado do histórico? O PDF já baixado não será afetado.')) return;
    this.dataStore.remover('certificados', id);
    mostrarToast('Certificado excluído do histórico.');
    this.rerenderizar();
  }

  // Numeração sequencial por ano: ART-2026-001, ART-2026-002...
  gerarNumeroSerie() {
    const ano = new Date().getFullYear();
    const cfg = this.dataStore.dados.config;
    if (!cfg.contadorCertificados) cfg.contadorCertificados = {};
    cfg.contadorCertificados[ano] = (cfg.contadorCertificados[ano] || 0) + 1;
    this.dataStore.salvar();
    return `ART-${ano}-${String(cfg.contadorCertificados[ano]).padStart(3, '0')}`;
  }

  // Modal de emissão: a partir de obra existente (autopreenche) ou manual
  abrirFormulario() {
    // ===== Integração com o Catálogo: lista as obras cadastradas para autopreenchimento =====
    const obras = this.dataStore.listar('obras');
    const assinaturaSalva = (this.dataStore.dados.config.artista || {}).assinatura || '';

    abrirModal(`
      <h3>Novo Certificado de Autenticidade</h3>
      <form id="formCertificado">
        <div class="campo-form">
          <label>Origem dos dados</label>
          <select id="campoOrigemCertificado">
            <option value="">— Preencher manualmente —</option>
            ${obras.map(o => `<option value="${o.id}">${o.titulo}</option>`).join('')}
          </select>
        </div>
        <div class="campo-form">
          <label>Título da obra *</label>
          <input type="text" id="campoTituloCert" required>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Técnica *</label>
            <select id="campoTecnicaCert" required>
              <option value="">Selecione...</option>
              <option value="óleo">Óleo</option>
              <option value="aquarela">Aquarela</option>
              <option value="escultura">Escultura</option>
              <option value="outra">Outra</option>
            </select>
          </div>
          <div class="campo-form"><label>Ano</label><input type="number" id="campoAnoCert" value="${new Date().getFullYear()}"></div>
        </div>
        <div class="campo-form"><label>Dimensões (ex: 60 x 80 cm)</label><input type="text" id="campoDimensoesCert"></div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Edição</label>
            <select id="campoEdicaoTipo">
              <option value="unica">Única</option>
              <option value="limitada">Limitada</option>
            </select>
          </div>
          <div class="campo-form" id="blocoEdicaoLimitada" style="display:none;">
            <label>Nº / Total</label>
            <div class="form-linha">
              <input type="number" id="campoEdicaoAtual" placeholder="Ex: 2" min="1">
              <input type="number" id="campoEdicaoTotal" placeholder="Ex: 10" min="1">
            </div>
          </div>
        </div>
        <div class="form-linha">
          <div class="campo-form"><label>Local</label><input type="text" id="campoLocalCert" placeholder="Ex: Rio Bonito/RJ"></div>
          <div class="campo-form"><label>Data</label><input type="date" id="campoDataCert" value="${new Date().toISOString().slice(0, 10)}"></div>
        </div>
        <div class="campo-form">
          <label>Assinatura do artista</label>
          <canvas id="canvasAssinaturaCert" class="area-assinatura" width="500" height="150"></canvas>
          <div class="legenda-assinatura">
            <label style="display:flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:400;color:var(--text-muted);">
              <input type="checkbox" id="campoSalvarAssinatura" ${assinaturaSalva ? 'checked' : ''}> Usar/salvar como assinatura padrão
            </label>
            <button type="button" class="btn-secundario" id="btnLimparAssinaturaCert" style="padding:5px 10px;font-size:0.75rem;">Limpar</button>
          </div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarCertificado">Cancelar</button>
          <button type="submit" class="btn-primario">Gerar Certificado (PDF)</button>
        </div>
      </form>
    `);

    let imagemSelecionada = '';

    // Autopreenche os campos ao escolher uma obra existente
    document.getElementById('campoOrigemCertificado').addEventListener('change', (e) => {
      const obra = obras.find(o => o.id === e.target.value);
      if (!obra) { imagemSelecionada = ''; return; }
      document.getElementById('campoTituloCert').value = obra.titulo;
      document.getElementById('campoTecnicaCert').value = obra.tecnica;
      document.getElementById('campoAnoCert').value = obra.ano || '';
      const dim = obra.dimensoes || {};
      const partes = [dim.altura, dim.largura, dim.profundidade].filter(v => v && Number(v) > 0);
      document.getElementById('campoDimensoesCert').value = partes.length ? `${partes.join(' x ')} cm` : '';
      imagemSelecionada = obra.imagem || '';
    });

    document.getElementById('campoEdicaoTipo').addEventListener('change', (e) => {
      document.getElementById('blocoEdicaoLimitada').style.display = e.target.value === 'limitada' ? 'block' : 'none';
    });

    // Canvas de assinatura: pré-carrega a assinatura salva (se existir) e permite redesenhar
    const canvas = document.getElementById('canvasAssinaturaCert');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.strokeStyle = '#1a1a1a';
    if (assinaturaSalva) {
      const imgAssinatura = new Image();
      imgAssinatura.onload = () => ctx.drawImage(imgAssinatura, 0, 0, canvas.width, canvas.height);
      imgAssinatura.src = assinaturaSalva;
    }
    let desenhando = false;
    const posicaoRelativa = (evento) => {
      const rect = canvas.getBoundingClientRect();
      const ponto = evento.touches ? evento.touches[0] : evento;
      return { x: (ponto.clientX - rect.left) * (canvas.width / rect.width), y: (ponto.clientY - rect.top) * (canvas.height / rect.height) };
    };
    const iniciar = (e) => { desenhando = true; const p = posicaoRelativa(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); e.preventDefault(); };
    const desenhar = (e) => { if (!desenhando) return; const p = posicaoRelativa(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault(); };
    const finalizar = () => { desenhando = false; };
    canvas.addEventListener('mousedown', iniciar);
    canvas.addEventListener('mousemove', desenhar);
    window.addEventListener('mouseup', finalizar);
    canvas.addEventListener('touchstart', iniciar, { passive: false });
    canvas.addEventListener('touchmove', desenhar, { passive: false });
    canvas.addEventListener('touchend', finalizar);
    document.getElementById('btnLimparAssinaturaCert').addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));

    document.getElementById('btnCancelarCertificado').addEventListener('click', fecharModal);

    document.getElementById('formCertificado').addEventListener('submit', async (e) => {
      e.preventDefault();
      const tituloObra = document.getElementById('campoTituloCert').value.trim();
      const tecnica = document.getElementById('campoTecnicaCert').value;
      if (!tituloObra || !tecnica) { mostrarToast('Preencha ao menos o título e a técnica da obra.'); return; }

      const edicaoTipo = document.getElementById('campoEdicaoTipo').value;
      const cert = {
        numeroSerie: this.gerarNumeroSerie(),
        obraId: document.getElementById('campoOrigemCertificado').value || null,
        tituloObra,
        tecnica,
        dimensoesTexto: document.getElementById('campoDimensoesCert').value.trim(),
        ano: Number(document.getElementById('campoAnoCert').value) || null,
        edicaoTipo,
        edicaoAtual: edicaoTipo === 'limitada' ? Number(document.getElementById('campoEdicaoAtual').value) || 1 : null,
        edicaoTotal: edicaoTipo === 'limitada' ? Number(document.getElementById('campoEdicaoTotal').value) || 1 : null,
        local: document.getElementById('campoLocalCert').value.trim(),
        dataEmissao: document.getElementById('campoDataCert').value || new Date().toISOString().slice(0, 10),
        imagem: imagemSelecionada
      };

      const assinaturaDataUrl = canvas.toDataURL('image/png');

      // Salva a assinatura como padrão do artista, se solicitado (reaproveitada nos próximos certificados)
      if (document.getElementById('campoSalvarAssinatura').checked) {
        this.dataStore.dados.config.artista = this.dataStore.dados.config.artista || {};
        this.dataStore.dados.config.artista.assinatura = assinaturaDataUrl;
        this.dataStore.salvar();
      }

      const registrado = this.dataStore.adicionar('certificados', cert);
      fecharModal();
      mostrarToast('Gerando certificado em PDF...');
      await this.gerarPdfCertificado(registrado, assinaturaDataUrl);
      this.router.navegar('certificados');
    });
  }

  // Regenera o PDF de um certificado já emitido, reaproveitando a assinatura salva (se houver)
  async baixarNovamente(id) {
    const cert = this.dataStore.buscarPorId('certificados', id);
    if (!cert) return;
    const assinaturaSalva = (this.dataStore.dados.config.artista || {}).assinatura || '';
    mostrarToast('Gerando PDF...');
    await this.gerarPdfCertificado(cert, assinaturaSalva);
  }

  // Monta o PDF do certificado com jsPDF puro: borda decorativa, foto, texto
  // padrão de autenticidade, edição, assinatura e QR Code de validação
  async gerarPdfCertificado(cert, assinaturaDataUrl) {
    if (!window.jspdf) { mostrarToast('Biblioteca de PDF indisponível (verifique sua conexão com a internet).'); return; }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();
    const artista = this.dataStore.dados.config.artista || {};
    const nomeArtista = artista.nome || 'Ateliê do Artista';

    // Borda decorativa sutil (moldura dupla)
    doc.setDrawColor(190);
    doc.setLineWidth(0.9);
    doc.rect(10, 10, w - 20, h - 20);
    doc.setLineWidth(0.25);
    doc.rect(14, 14, w - 28, h - 28);

    doc.setFont('times', 'bold');
    doc.setFontSize(23);
    doc.setTextColor(30, 30, 30);
    doc.text('CERTIFICADO DE AUTENTICIDADE', w / 2, 34, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(130);
    doc.text(nomeArtista, w / 2, 41, { align: 'center' });

    let y = 54;

    // Foto da obra centralizada (apenas formatos suportados nativamente: JPEG/PNG)
    const suportada = /^data:image\/(png|jpe?g)/i.test(cert.imagem || '');
    if (suportada) {
      try {
        const tipo = /png/i.test(cert.imagem) ? 'PNG' : 'JPEG';
        const lado = 78;
        doc.addImage(cert.imagem, tipo, (w - lado) / 2, y, lado, lado, undefined, 'FAST');
        y += lado + 10;
      } catch (erro) {
        console.warn('Não foi possível inserir a imagem no certificado:', erro);
      }
    } else {
      y += 4;
    }

    doc.setFont('times', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(20);
    doc.text(cert.tituloObra || 'Obra sem título', w / 2, y, { align: 'center' });
    y += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(`${capitalizarTexto(cert.tecnica)} · ${cert.dimensoesTexto || '-'} · ${cert.ano || '-'}`, w / 2, y, { align: 'center' });
    y += 12;

    // Texto padrão de autenticidade
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10.5);
    doc.setTextColor(55);
    const textoPadrao = `Certifico que a obra acima é original, de minha autoria, executada em ${cert.tecnica}. Não existem reproduções autorizadas além da edição declarada.`;
    const linhasTexto = doc.splitTextToSize(textoPadrao, w - 64);
    doc.text(linhasTexto, w / 2, y, { align: 'center' });
    y += linhasTexto.length * 5.5 + 8;

    // Edição
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(30);
    doc.text(cert.edicaoTipo === 'limitada' ? `Edição: ${cert.edicaoAtual} de ${cert.edicaoTotal}` : 'Edição: Única', w / 2, y, { align: 'center' });
    y += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(110);
    doc.text(`Número de série: ${cert.numeroSerie}`, w / 2, y, { align: 'center' });
    y += 16;

    // Assinatura (à esquerda) e QR Code de validação (à direita)
    const yBase = y;
    const centroEsquerda = w / 2 - 42;
    const centroDireita = w / 2 + 42;

    if (assinaturaDataUrl) {
      try { doc.addImage(assinaturaDataUrl, 'PNG', centroEsquerda - 27, yBase, 54, 22); } catch (erro) { /* assinatura opcional */ }
    }
    doc.setDrawColor(140);
    doc.line(centroEsquerda - 27, yBase + 25, centroEsquerda + 27, yBase + 25);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(90);
    doc.text(nomeArtista, centroEsquerda, yBase + 30, { align: 'center' });
    doc.setFontSize(7.5);
    doc.setTextColor(140);
    doc.text('Assinatura do artista', centroEsquerda, yBase + 34, { align: 'center' });
    doc.setFontSize(8.5);
    doc.setTextColor(90);
    doc.text(`${cert.local || ''}${cert.local ? ', ' : ''}${formatarData(cert.dataEmissao)}`, centroEsquerda, yBase + 41, { align: 'center' });

    // QR Code — codifica um texto de validação com obra, artista e data de autenticação
    const textoQR = `Obra: ${cert.tituloObra} | Artista: ${nomeArtista} | Autenticada em: ${formatarData(cert.dataEmissao)}`;
    const qrDataUrl = await gerarQRCodeDataUrl(textoQR);
    if (qrDataUrl) {
      try {
        doc.addImage(qrDataUrl, 'PNG', centroDireita - 14, yBase, 28, 28);
        doc.setFontSize(7.5);
        doc.setTextColor(140);
        doc.text('Validação digital', centroDireita, yBase + 34, { align: 'center' });
      } catch (erro) { /* QR opcional */ }
    }

    doc.setDrawColor(210);
    doc.line(25, h - 20, w - 25, h - 20);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Emitido em ${new Date().toLocaleDateString('pt-BR')} · Atelier CRM`, w / 2, h - 14, { align: 'center' });

    doc.save(`certificado-${cert.numeroSerie.toLowerCase()}.pdf`);
    mostrarToast('Certificado gerado com sucesso!');
  }
}

/* --------------------------------------------------------------------------
