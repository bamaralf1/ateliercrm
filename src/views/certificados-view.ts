// Certificados de Autenticidade — template dourado premium, hash anti-falsificação,
// emissão em lote, re-emissão com histórico e QR de validação.

// Hash determinístico (djb2) para código de verificação legível e estável
function hashStringParaCertificado(entrada) {
  let h = 5381;
  for (let i = 0; i < entrada.length; i++) {
    h = ((h << 5) + h + entrada.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16).toUpperCase().padStart(8, '0');
}

export class CertificadosView extends BaseView {
  constructor(dataStore, router) {
    super(dataStore, router);
    this._resultadoVerificacao = null;
    this._hashJaVerificado = '';
  }

  certificadosOrdenados() {
    return [...this.dataStore.listar('certificados')]
      .sort((a, b) => new Date(b.dataEmissao || b.criadoEm) - new Date(a.dataEmissao || a.criadoEm));
  }

  render() {
    const certificados = this.certificadosOrdenados();

    const linhas = certificados.map(c => {
      const hash = c.hashAutenticidade || this.calcularHashAutenticidade(c);
      return `
      <tr>
        <td><strong>${sanitizarHTML(c.tituloObra) || '-'}</strong><div class="cert-subtitulo">${c.edicaoTipo === 'limitada' ? `<i data-lucide="layers" aria-hidden="true"></i> Edição limitada` : ''}</div></td>
        <td><span class="cert-numero-serie">${sanitizarHTML(c.numeroSerie)}</span></td>
        <td>${c.edicaoTipo === 'limitada' ? `<span class="cert-edicao">${c.edicaoAtual}/${c.edicaoTotal}</span>` : 'Única'}</td>
        <td>${formatarData(c.dataEmissao || c.criadoEm)}<div class="cert-subtitulo"><i data-lucide="badge-check"></i> ${this._formatarHash(hash)}</div></td>
        <td>${(c.reemissoes || 0) > 0 ? `<span class="cert-reexpedicao">${c.reemissoes}× reemitido</span>` : '<span class="cert-reexpedicao cert-reexpedicao-nova">original</span>'}</td>
        <td class="acoes-linha-tabela">
          <button class="btn-icone-tabela" data-baixar-certificado="${c.id}" title="Baixar PDF"><i data-lucide="file-text"></i> PDF</button>
          <button class="btn-icone-tabela" data-verificar-certificado="${c.id}" title="Verificar autenticidade"><i data-lucide="shield-check"></i></button>
          <button class="btn-icone-tabela" data-excluir-certificado="${c.id}" aria-label="Excluir certificado"><i data-lucide="trash-2"></i></button>
        </td>
      </tr>
    `;
    }).join('');

    const kpis = certificados.length > 0 ? `
      <div class="kpi-grid cert-kpis">
        <div class="kpi-card"><div class="kpi-icone"><i data-lucide="badge-check"></i></div><div class="kpi-conteudo"><div class="kpi-rotulo">Certificados</div><div class="kpi-valor">${certificados.length}</div></div></div>
        <div class="kpi-card"><div class="kpi-icone"><i data-lucide="image"></i></div><div class="kpi-conteudo"><div class="kpi-rotulo">Obras cobertas</div><div class="kpi-valor">${new Set(certificados.map(c => c.obraId || c.tituloObra)).size}</div></div></div>
        <div class="kpi-card"><div class="kpi-icone"><i data-lucide="shield"></i></div><div class="kpi-conteudo"><div class="kpi-rotulo">Não reemitidos</div><div class="kpi-valor">${certificados.filter(c => !(c.reemissoes || 0)).length}</div></div></div>
      </div>
    ` : '';

    const tabela = certificados.length ? `
      <div class="tabela-wrapper">
        <table><caption class="sr-only">Lista de certificados</caption>
          <thead><tr><th>Obra</th><th>Nº de Série</th><th>Edição</th><th>Emitido em</th><th>Reemissões</th><th></th></tr></thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>
    ` : `
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio"><i data-lucide="badge-check"></i></div><p>Nenhum certificado emitido ainda.</p><p class="estado-vazio-sub">Emita o primeiro ou gere vários de uma vez.</p></div>
      </div>
    `;

    return `
      <div class="view-cabecalho">
        <div>
          <h2>Certificados de Autenticidade</h2>
          <p class="subtitulo">${certificados.length} certificado${certificados.length === 1 ? '' : 's'} emitido${certificados.length === 1 ? '' : 's'} · assinados digitalmente com hash de verificação</p>
        </div>
        <div class="dashboard-acoes">
          <button class="btn-secundario" id="btnNovaFicha"><i data-lucide="layers"></i> Emissão em lote</button>
          <button class="btn-gradient" id="btnNovoCertificado"><i data-lucide="file-signature"></i> Novo Certificado</button>
        </div>
      </div>
      ${kpis}
      ${tabela}
    `;
  }

  _formatarHash(hash) {
    if (hash.length <= 8) return `ATR-${hash}`;
    return `ATR-${hash.slice(0, 4)}-${hash.slice(4, 8)}`;
  }

  aposRenderizar() {
    this.removerListeners();
    const container = document.getElementById('viewPrincipal');
    const btnNovo = document.getElementById('btnNovoCertificado');
    if (btnNovo) btnNovo.addEventListener('click', () => this.abrirFormulario());
    const btnLote = document.getElementById('btnNovaFicha');
    if (btnLote) btnLote.addEventListener('click', () => this.abrirEmissaoLote());

    const delegHandler = (e) => {
      const alvoBaixar = e.target.closest('[data-baixar-certificado]');
      const alvoVerificar = e.target.closest('[data-verificar-certificado]');
      const alvoExcluir = e.target.closest('[data-excluir-certificado]');
      if (alvoBaixar) { this.baixarNovamente(alvoBaixar.dataset.baixarCertificado); return; }
      if (alvoVerificar) { this.verificarAutenticidade(alvoVerificar.dataset.verificarCertificado); return; }
      if (alvoExcluir) { this.excluirCertificado(alvoExcluir.dataset.excluirCertificado); return; }
    };
    container.addEventListener('click', delegHandler);
    this._bindCache['delegCertificados'] = { el: container, handler: delegHandler, type: 'click' };

    if (window.inicializarIconesLucide) window.inicializarIconesLucide();
  }

  async excluirCertificado(id) {
    if (!await confirmarAcao('Excluir este certificado do histórico? O PDF já baixado não será afetado.')) return;
    const item = this.dataStore.buscarPorId('certificados', id);
    this.dataStore.remover('certificados', id);
    const { dataStore } = this;
    mostrarToastComDesfazer('Certificado excluído do histórico.', () => { dataStore.dados.certificados.push(item); dataStore.salvar(); });
    this.rerenderizar();
  }

  // Hash determinístico: recalcula o código de verificação a partir dos dados
  calcularHashAutenticidade(cert) {
    const origem = [
      cert.numeroSerie,
      cert.tituloObra,
      cert.tecnica,
      cert.ano,
      cert.dimensoesTexto,
      cert.edicaoTipo,
      cert.edicaoAtual,
      cert.edicaoTotal,
      cert.dataEmissao,
      cert.local
    ].join('|');
    return hashStringParaCertificado(origem);
  }

  abrirModalVerificacao(cert) {
    const hash = cert.hashAutenticidade || this.calcularHashAutenticidade(cert);
    const hashRecalculado = this.calcularHashAutenticidade(cert);
    const valido = hash === hashRecalculado;
    abrirModal(`
      <h3>Verificação de autenticidade</h3>
      <div class="cert-verificacao ${valido ? 'ok' : 'invalida'}">
        <div class="cert-verif-status"><i data-lucide="${valido ? 'shield-check' : 'shield-alert'}"></i> ${valido ? 'Certificado íntegro' : 'Dados alterados'}</div>
        <p>O hash do certificado foi recalculado com os dados registrados${valido ? ' e conferido com o emitido' : ', e houve divergência com o registro'}. Qualquer alteração em obra, edição ou data quebra a verificação.</p>
        <div class="cert-verif-linha"><strong>Obra:</strong> ${sanitizarHTML(cert.tituloObra) || '-'}</div>
        <div class="cert-verif-linha"><strong>Nº de série:</strong> ${sanitizarHTML(cert.numeroSerie) || '-'}</div>
        <div class="cert-verif-linha"><strong>Código:</strong> <code>${this._formatarHash(hash)}</code></div>
        <div class="cert-verif-linha"><strong>Emitido em:</strong> ${formatarData(cert.dataEmissao || cert.criadoEm)}${cert.ultimaReemissao ? ` <span class="cert-verif-reemisao">· reemitido em ${formatarData(cert.ultimaReemissao)}</span>` : ''} (${cert.reemissoes || 0} reemissão${(cert.reemissoes || 0) === 1 ? '' : 'ões'})</div>
        <p class="cert-verif-ajuda">O mesmo código está impresso no PDF ao lado do QR. Quem receber o documento pode confirmar aqui no app.</p>
      </div>
    `);
    if (window.inicializarIconesLucide) window.inicializarIconesLucide();
  }

  verificarAutenticidade(id) {
    const cert = this.dataStore.buscarPorId('certificados', id);
    if (!cert) return;
    this.abrirModalVerificacao(cert);
  }

  // ===== Verificação por código (colecionador escaneia o QR ou digita o código) =====
  obterCodigoDoHash() {
    try {
      const h = window.location.hash.replace(/^#/, '');
      if (!h.startsWith('verificar')) return '';
      const resto = h.slice('verificar'.length);
      if (resto.startsWith('=')) return decodeURIComponent(resto.slice(1));
      if (resto.startsWith('?')) return new URLSearchParams(resto.slice(1)).get('codigo') || '';
      return '';
    } catch { return ''; }
  }

  normalizarCodigo(codigo) {
    return String(codigo || '').trim().toUpperCase().replace(/ATR-?/g, '').replace(/[^A-F0-9]/g, '');
  }

  verificarCodigo(codigo) {
    const alvo = this.normalizarCodigo(codigo);
    if (!alvo) return null;
    const achado = this.dataStore.listar('certificados').find(c => {
      const hash = (c.hashAutenticidade || this.calcularHashAutenticidade(c)).toUpperCase();
      return this.normalizarCodigo(hash) === alvo;
    });
    if (!achado) return { encontrado: false };
    const hashRegistrado = (achado.hashAutenticidade || this.calcularHashAutenticidade(achado)).toUpperCase();
    const hashRecalculado = this.calcularHashAutenticidade(achado).toUpperCase();
    return { encontrado: true, cert: achado, hash: hashRegistrado, hashRecalculado };
  }

  _htmlResultadoVerificacao(resultado) {
    if (!resultado || !resultado.encontrado || !resultado.cert) {
      return `
        <div class="cert-verificacao invalida">
          <div class="cert-verif-status"><i data-lucide="shield-alert"></i> Nenhum certificado encontrado</div>
          <p>O código informado não corresponde a nenhum certificado registrado neste app. Confira o código impresso no PDF (formato ATR-XXXXXXXX).</p>
        </div>`;
    }
    const cert = resultado.cert;
    const valido = resultado.hash === resultado.hashRecalculado;
    return `
      <div class="cert-verificacao ${valido ? 'ok' : 'invalida'}">
        <div class="cert-verif-status"><i data-lucide="${valido ? 'shield-check' : 'shield-alert'}"></i> ${valido ? 'Certificado íntegro' : 'Dados alterados'}</div>
        <p>${valido
          ? 'O código confere com os dados registrados neste ateliê. As informações abaixo batem com o documento emitido.'
          : 'O código foi encontrado, mas os dados registrados divergem do documento. A autenticidade precisa de revisão.'}</p>
        <div class="cert-verif-linha"><strong>Obra:</strong> ${sanitizarHTML(cert.tituloObra) || '-'}</div>
        <div class="cert-verif-linha"><strong>Nº de série:</strong> ${sanitizarHTML(cert.numeroSerie) || '-'}</div>
        <div class="cert-verif-linha"><strong>Técnica:</strong> ${sanitizarHTML(cert.tecnica) || '-'} ${cert.edicaoTipo === 'limitada' ? `(${cert.edicaoAtual}/${cert.edicaoTotal})` : '(única)'}</div>
        <div class="cert-verif-linha"><strong>Código:</strong> <code>${this._formatarHash(resultado.hash)}</code></div>
        <div class="cert-verif-linha"><strong>Emitido em:</strong> ${formatarData(cert.dataEmissao || cert.criadoEm)}${(cert.reemissoes || 0) > 0 ? ` · reemitido ${cert.reemissoes}x` : ' · original'}</div>
      </div>`;
  }

  renderVerificar() {
    const codigo = this.obterCodigoDoHash();
    const alvo = this.normalizarCodigo(codigo);
    let resultado = this._resultadoVerificacao;
    if (alvo && this._hashJaVerificado !== alvo) {
      resultado = this.verificarCodigo(alvo);
      this._resultadoVerificacao = resultado;
      this._hashJaVerificado = alvo;
    }
    return `
      <div class="view-cabecalho">
        <div>
          <h2>Verificação de autenticidade</h2>
          <p class="subtitulo">Confirme o código impresso no certificado (ex.: ATR-9F3C2A81) ou escaneie o QR com o app aberto</p>
        </div>
      </div>
      <div class="card" style="max-width:640px;">
        <div class="cert-verif-form" style="display:flex;gap:8px;margin-bottom:12px;">
          <label for="txtCodigoVerificacao" class="sr-only">Código de verificação</label>
          <input type="text" id="txtCodigoVerificacao" placeholder="Digite ou cole o código (ATR-XXXXXXXX)" value="${sanitizarHTML(codigo)}" autocomplete="off" style="flex:1;"${resultado ? ' disabled' : ''}>
          <button class="btn-primario" id="btnVerificarCodigo"><i data-lucide="shield-check"></i> Verificar</button>
        </div>
        <div id="verifResultado">${resultado ? this._htmlResultadoVerificacao(resultado) : ''}</div>
      </div>
    `;
  }

  aposRenderizarVerificar() {
    this.removerListeners();
    const container = document.getElementById('viewPrincipal');
    const reRender = () => {
      container.innerHTML = this.renderVerificar();
      this.aposRenderizarVerificar();
    };
    const processar = () => {
      const input = document.getElementById('txtCodigoVerificacao');
      const alvo = this.normalizarCodigo(input ? input.value : '');
      if (!alvo) { mostrarToast('Informe um código de verificação.', 'aviso'); return; }
      this._resultadoVerificacao = this.verificarCodigo(alvo);
      this._hashJaVerificado = alvo;
      reRender();
    };
    const btn = document.getElementById('btnVerificarCodigo');
    if (btn) {
      btn.addEventListener('click', processar);
      this._bindCache['btnVerificarCodigo'] = { el: btn, handler: processar, type: 'click' };
    }
    const input = document.getElementById('txtCodigoVerificacao');
    if (input) {
      const onEnter = (e) => { if (e.key === 'Enter') processar(); };
      input.addEventListener('keydown', onEnter);
      this._bindCache['txtCodigoVerificacao'] = { el: input, handler: onEnter, type: 'keydown' };
    }
    if (window.inicializarIconesLucide) window.inicializarIconesLucide();
  }

  // Numeração sequencial por ano: ART-2026-001, ART-2026-002...
  gerarNumeroSerie() {
    const ano = new Date().getFullYear();
    const cfg = configStore();
    if (!cfg.contadorCertificados) cfg.contadorCertificados = {};
    cfg.contadorCertificados[ano] = (cfg.contadorCertificados[ano] || 0) + 1;
    cfg.salvar();
    return `ART-${ano}-${String(cfg.contadorCertificados[ano]).padStart(3, '0')}`;
  }

  // ===== Emissão em lote: várias obras de uma vez, um PDF multi-página =====
  async abrirEmissaoLote() {
    const obras = obraStore().items.filter(o => o.titulo);
    if (obras.length === 0) {
      mostrarToast('Cadastre obras no catálogo antes de emitir em lote.', 'aviso');
      return;
    }
    mostrarToast('Preparando listagem das obras...', 'info');
    const imagens = new Map();
    await Promise.all(obras.map(async (o) => {
      if (!o.imagem) return;
      if (o.imagem.startsWith('idb:')) {
        try { imagens.set(o.id, await imageStore.carregarDataURL(o.imagem).catch(() => '')); } catch { imagens.set(o.id, ''); }
      } else {
        imagens.set(o.id, o.imagem);
      }
    }));
    const todasSelecionadas = true;
    abrirModal(`
      <h3>Emissão em lote — Certificados</h3>
      <p class="campo-form" style="margin-top:6px;margin-bottom:4px;">Selecione as obras. Cada uma gera seu próprio certificado, todos reunidos em um único PDF.</p>
      <label style="display:flex;gap:8px;align-items:center;font-size:0.85rem;margin-bottom:8px;cursor:pointer;">
        <input type="checkbox" id="certLoteSelecionarTodos" checked> Selecionar todas
      </label>
      <div class="cert-lote-lista" id="certLoteLista" style="max-height:300px;overflow-y:auto;">
        ${obras.map((o) => {
          const img = imagens.get(o.id) || '';
          return `
          <label class="cert-lote-item">
            <input type="checkbox" class="cert-lote-check" data-obra="${o.id}" ${todasSelecionadas ? 'checked' : ''}>
            <span class="cert-lote-thumb">${img ? `<img src="${img}" alt="" loading="lazy" onerror="this.style.display='none'">` : '<i data-lucide="image"></i>'}</span>
            <span class="cert-lote-titulo">${sanitizarHTML(o.titulo)}</span>
            <span class="cert-lote-tec">${capitalizarTexto(o.tecnica || '')}${o.ano ? ` · ${o.ano}` : ''}</span>
          </label>
        `;
        }).join('')}
      </div>
      <div class="campo-form" style="margin-top:12px;">
        <label style="display:flex;align-items:center;gap:6px;font-size:0.8rem;font-weight:400;color:var(--text-muted);">
          <input type="checkbox" id="certLoteSalvarAssinatura" ${configStore().artista?.assinatura ? 'checked' : ''}> Usar/salvar assinatura padrão do artista
        </label>
      </div>
      <div class="modal-acoes">
        <button type="button" class="btn-secundario" id="btnCancelarLote">Cancelar</button>
        <button type="button" class="btn-primario" id="btnGerarLote">Gerar ${obras.length} certificados</button>
      </div>
    `);
    if (window.inicializarIconesLucide) window.inicializarIconesLucide();

    document.getElementById('certLoteSelecionarTodos').addEventListener('change', (e) => {
      document.querySelectorAll('.cert-lote-check').forEach(c => { c.checked = e.target.checked; });
    });
    const lista = document.getElementById('certLoteLista');
    lista.addEventListener('change', (ev) => {
      if (ev.target.classList.contains('cert-lote-check')) {
        const total = document.querySelectorAll('.cert-lote-check').length;
        const marcados = document.querySelectorAll('.cert-lote-check:checked').length;
        document.getElementById('btnGerarLote').textContent = `Gerar ${marcados} certificado${marcados === 1 ? '' : 's'}`;
        const todos = document.getElementById('certLoteSelecionarTodos');
        todos.checked = marcados === total;
      }
    });
    document.getElementById('btnCancelarLote').addEventListener('click', fecharModal);

    document.getElementById('btnGerarLote').addEventListener('click', async () => {
      const selecionadas = [...document.querySelectorAll('.cert-lote-check:checked')].map(c => c.dataset.obra);
      if (selecionadas.length === 0) { mostrarToast('Selecione ao menos uma obra.', 'aviso'); return; }
      const assinaturaDataUrl = configStore().artista?.assinatura || '';
      const gerados = await this._emitirEmLote(selecionadas, assinaturaDataUrl);
      fecharModal();
      if (gerados.length === 0) { mostrarToast('Nenhum certificado gerado — verifique o cadastro das obras.', 'erro'); return; }
      mostrarToast(`Gerando PDF com ${gerados.length} certificado${gerados.length === 1 ? '' : 's'}...`, 'info');
      await this._gerarPdfLote(gerados, assinaturaDataUrl);
      this.rerenderizar();
    });
  }

  async _emitirEmLote(ids, assinaturaDataUrl) {
    const gerados = [];
    for (const obraId of ids) {
      const obra = obraStore().items.find(o => o.id === obraId);
      if (!obra) continue;
      const dim = obra.dimensoes || {};
      const partes = [dim.altura, dim.largura, dim.profundidade].filter(v => v && Number(v) > 0);
      let imagem = obra.imagem || '';
      if (imagem.startsWith('idb:')) {
        try { imagem = await imageStore.carregarDataURL(imagem); } catch { imagem = ''; }
      }
      const cert = {
        numeroSerie: this.gerarNumeroSerie(),
        obraId,
        tituloObra: obra.titulo,
        tecnica: obra.tecnica || 'outra',
        dimensoesTexto: partes.length ? `${partes.join(' x ')} cm` : '',
        ano: obra.ano || null,
        edicaoTipo: 'unica',
        edicaoAtual: null,
        edicaoTotal: null,
        local: '',
        dataEmissao: new Date().toISOString().slice(0, 10),
        imagem,
        reemissoes: 0,
        ultimaReemissao: null
      };
      cert.hashAutenticidade = this.calcularHashAutenticidade(cert);
      gerados.push(this.dataStore.adicionar('certificados', cert));
    }
    return gerados;
  }

  // ===== Emissão unitária (formulário com canvas de assinatura) =====
  abrirFormulario() {
    const obras = obraStore().items;
    const assinaturaSalva = configStore().artista?.assinatura || '';

    abrirModal(`
      <h3>Novo Certificado de Autenticidade</h3>
      <form id="formCertificado">
        <div class="campo-form">
          <label>Origem dos dados</label>
          <select id="campoOrigemCertificado" aria-label="Origem dos dados">
            <option value="">— Preencher manualmente —</option>
            ${obras.map(o => `<option value="${o.id}">${sanitizarHTML(o.titulo)}</option>`).join('')}
          </select>
        </div>
        <div class="campo-form">
          <label>Título da obra *</label>
          <input type="text" id="campoTituloCert" required aria-label="Título da obra">
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Técnica *</label>
            <select id="campoTecnicaCert" required aria-label="Técnica">
              <option value="">Selecione...</option>
              <option value="óleo">Óleo</option>
              <option value="aquarela">Aquarela</option>
              <option value="escultura">Escultura</option>
              <option value="outra">Outra</option>
            </select>
          </div>
          <div class="campo-form"><label>Ano</label><input type="number" id="campoAnoCert" aria-label="Ano" value="${new Date().getFullYear()}"></div>
        </div>
        <div class="campo-form"><label>Dimensões (ex: 60 x 80 cm)</label><input type="text" id="campoDimensoesCert" aria-label="Dimensões"></div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Edição</label>
            <select id="campoEdicaoTipo" aria-label="Edição">
              <option value="unica">Única</option>
              <option value="limitada">Limitada</option>
            </select>
          </div>
          <div class="campo-form" id="blocoEdicaoLimitada" style="display:none;">
            <label>Nº / Total</label>
            <div class="form-linha">
              <input type="number" id="campoEdicaoAtual" aria-label="Número da edição atual" placeholder="Ex: 2" min="1">
              <input type="number" id="campoEdicaoTotal" aria-label="Total de edições" placeholder="Ex: 10" min="1">
            </div>
          </div>
        </div>
        <div class="form-linha">
          <div class="campo-form"><label>Local</label><input type="text" id="campoLocalCert" aria-label="Local" placeholder="Ex: Rio Bonito/RJ"></div>
          <div class="campo-form"><label>Data</label><input type="date" id="campoDataCert" aria-label="Data" value="${new Date().toISOString().slice(0, 10)}"></div>
        </div>
        <div class="campo-form">
          <label>Assinatura do artista</label>
          <canvas id="canvasAssinaturaCert" class="area-assinatura" width="500" height="150" aria-label="Assinatura do artista"></canvas>
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

    let promessaImagem = Promise.resolve('');

    document.getElementById('campoOrigemCertificado').addEventListener('change', (e) => {
      const obra = obras.find(o => o.id === e.target.value);
      if (!obra) { promessaImagem = Promise.resolve(''); return; }
      document.getElementById('campoTituloCert').value = obra.titulo;
      document.getElementById('campoTecnicaCert').value = obra.tecnica;
      document.getElementById('campoAnoCert').value = obra.ano || '';
      const dim = obra.dimensoes || {};
      const partes = [dim.altura, dim.largura, dim.profundidade].filter(v => v && Number(v) > 0);
      document.getElementById('campoDimensoesCert').value = partes.length ? `${partes.join(' x ')} cm` : '';
      const refImagem = obra.imagem || '';
      if (refImagem.startsWith('idb:')) {
        mostrarToast('Carregando imagem da obra...', 'info');
        promessaImagem = imageStore.carregarDataURL(refImagem).catch(() => '');
      } else {
        promessaImagem = Promise.resolve(refImagem);
      }
    });

    document.getElementById('campoEdicaoTipo').addEventListener('change', (e) => {
      document.getElementById('blocoEdicaoLimitada').style.display = e.target.value === 'limitada' ? 'block' : 'none';
    });

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
    canvas.addEventListener('mouseup', finalizar);
    canvas.addEventListener('mouseleave', finalizar);
    canvas.addEventListener('touchstart', iniciar, { passive: false });
    canvas.addEventListener('touchmove', desenhar, { passive: false });
    canvas.addEventListener('touchend', finalizar);
    document.getElementById('btnLimparAssinaturaCert').addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));

    const limparAssinatura = () => {
      canvas.removeEventListener('mousedown', iniciar);
      canvas.removeEventListener('mousemove', desenhar);
      canvas.removeEventListener('mouseup', finalizar);
      canvas.removeEventListener('mouseleave', finalizar);
      canvas.removeEventListener('touchstart', iniciar);
      canvas.removeEventListener('touchmove', desenhar);
      canvas.removeEventListener('touchend', finalizar);
    };
    document.getElementById('btnCancelarCertificado').addEventListener('click', () => { limparAssinatura(); fecharModal(); });

    document.getElementById('formCertificado').addEventListener('submit', async (e) => {
      e.preventDefault();
      const tituloObra = document.getElementById('campoTituloCert').value.trim();
      const tecnica = document.getElementById('campoTecnicaCert').value;
      if (!tituloObra || !tecnica) { mostrarToast('Preencha ao menos o título e a técnica da obra.', 'aviso'); return; }

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
        imagem: await promessaImagem,
        reemissoes: 0,
        ultimaReemissao: null
      };
      cert.hashAutenticidade = this.calcularHashAutenticidade(cert);

      const assinaturaDataUrl = canvas.toDataURL('image/png');

      if (document.getElementById('campoSalvarAssinatura').checked) {
        configStore().artista = configStore().artista || {};
        configStore().artista.assinatura = assinaturaDataUrl;
        configStore().salvar();
      }

      const registrado = this.dataStore.adicionar('certificados', cert);
      fecharModal();
      mostrarToast('Gerando certificado em PDF...', 'info');
      await this.gerarPdfCertificado(registrado, assinaturaDataUrl);
      this.rerenderizar();
    });
  }

  // Regenera o PDF de um certificado já emitido, incrementando o contador de reemissões
  async baixarNovamente(id) {
    const cert = this.dataStore.buscarPorId('certificados', id);
    if (!cert) return;
    const assinaturaSalva = configStore().artista?.assinatura || '';
    mostrarToast('Gerando PDF...', 'info');
    try {
      const ok = await this.gerarPdfCertificado(cert, assinaturaSalva);
      if (ok) {
        cert.reemissoes = (cert.reemissoes || 0) + 1;
        cert.ultimaReemissao = new Date().toISOString();
        this.dataStore.salvar();
        this.rerenderizar();
      }
    } catch (erro) {
      console.error('Reemissão falhou:', erro);
      mostrarToast('Erro ao gerar o certificado. Tente novamente.', 'erro');
    }
  }

  // Monta o PDF do certificado com jsPDF puro: moldura dourada premium,
  // faixa decorativa, foto, texto padrão, edição, assinatura, QR e hash.
  // Retorna boolean: true apenas se o PDF foi gerado e salvo com sucesso.
  async gerarPdfCertificado(cert, assinaturaDataUrl) {
    if (!window.jspdf) { mostrarToast('Biblioteca de PDF indisponível (verifique sua conexão com a internet).', 'erro'); return false; }
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      await this._desenharPaginaCertificado(doc, cert, assinaturaDataUrl);
      doc.save(`certificado-${cert.numeroSerie.toLowerCase()}.pdf`);
      mostrarToast('Certificado gerado com sucesso!', 'sucesso');
      return true;
    } catch (erro) {
      console.error('Falha ao gerar certificado PDF:', erro);
      mostrarToast('Erro ao gerar o certificado. Tente novamente.', 'erro');
      return false;
    }
  }

  async _gerarPdfLote(certs, assinaturaDataUrl) {
    if (!window.jspdf) { mostrarToast('Biblioteca de PDF indisponível (verifique sua conexão com a internet).', 'erro'); return; }
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      for (let i = 0; i < certs.length; i++) {
        if (i > 0) doc.addPage();
        await this._desenharPaginaCertificado(doc, certs[i], assinaturaDataUrl);
      }
      const nomeBase = certs.length === 1 ? certs[0].numeroSerie : `lote-${certs.length}`;
      doc.save(`certificados-${nomeBase.toLowerCase()}.pdf`);
      mostrarToast(`${certs.length} certificado${certs.length === 1 ? '' : 's'} gerado${certs.length === 1 ? '' : 's'} com sucesso!`, 'sucesso');
    } catch (erro) {
      console.error('Falha ao gerar lote de certificados:', erro);
      mostrarToast('Erro ao gerar o lote de certificados.', 'erro');
    }
  }

  async _desenharPaginaCertificado(doc, cert, assinaturaDataUrl) {
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();
    const artista = configStore().artista || {};
    const nomeArtista = artista.nome || 'Ateliê do Artista';

    const ORO = [187, 148, 42];
    const ORO_CLARO = [223, 190, 112];
    const ORO_FUNDO = [250, 245, 230];
    const TINTA = [43, 37, 25];

    // Iniciais do artista para o selo de integridade
    const iniciais = (nomeArtista || 'A')
      .trim().split(/\s+/)
      .filter(p => /^[A-Za-zÀ-ú]/.test(p))
      .map(p => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'A';

    // Fundo levemente quente (papel premium)
    doc.setFillColor(252, 250, 244);
    doc.rect(0, 0, w, h, 'F');

    // Moldura dourada dupla com cantos decorativos
    doc.setDrawColor(ORO[0], ORO[1], ORO[2]);
    doc.setLineWidth(1.1);
    doc.rect(10, 10, w - 20, h - 20);
    doc.setLineWidth(0.35);
    doc.rect(14, 14, w - 28, h - 28);
    doc.setLineWidth(0.2);
    doc.setDrawColor(ORO_CLARO[0], ORO_CLARO[1], ORO_CLARO[2]);
    doc.rect(16, 16, w - 32, h - 32);

    // Cantoneiras douradas (pequenos L nos quatro cantos internos)
    doc.setDrawColor(ORO[0], ORO[1], ORO[2]);
    doc.setLineWidth(2.2);
    const cc = [ { x: 10, y: 10, dx: 1, dy: 1 }, { x: w - 10, y: 10, dx: -1, dy: 1 }, { x: 10, y: h - 10, dx: 1, dy: -1 }, { x: w - 10, y: h - 10, dx: -1, dy: -1 } ];
    cc.forEach(p => {
      doc.line(p.x, p.y, p.x + 9 * p.dx, p.y);
      doc.line(p.x, p.y, p.x, p.y + 9 * p.dy);
    });

    // Faixa dourada sob o título
    doc.setFillColor(ORO[0], ORO[1], ORO[2]);
    doc.rect(40, 30, w - 80, 0.8, 'F');
    doc.rect(70, 44, w - 140, 0.3, 'F');

    doc.setFont('times', 'bold');
    doc.setFontSize(23);
    doc.setTextColor(ORO[0], ORO[1], ORO[2]);
    doc.text('CERTIFICADO DE AUTENTICIDADE', w / 2, 26, { align: 'center' });

    doc.setFont('times', 'italic');
    doc.setFontSize(11.5);
    doc.setTextColor(TINTA[0], TINTA[1], TINTA[2]);
    doc.text(`Certificado no. ${cert.numeroSerie} · ${nomeArtista}`, w / 2, 39, { align: 'center' });

    // Linha de dados: edição, série, local/data
    let y = 52;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.6);
    doc.setTextColor(120, 105, 70);
    const dadosBarra = [
      cert.edicaoTipo === 'limitada' ? `Edição ${cert.edicaoAtual}/${cert.edicaoTotal}` : 'Edição única',
      `Série ${cert.numeroSerie}`,
      cert.local ? cert.local : (cert.ano || '')
    ].filter(Boolean).join('   ·   ');
    doc.text(dadosBarra, w / 2, y, { align: 'center' });
    y += 8;

    const suportada = /^data:image\/(png|jpe?g)/i.test(cert.imagem || '');
    if (suportada) {
      try {
        const tipo = /png/i.test(cert.imagem) ? 'PNG' : 'JPEG';
        const lado = 70;
        doc.setDrawColor(ORO_CLARO[0], ORO_CLARO[1], ORO_CLARO[2]);
        doc.setLineWidth(0.35);
        doc.rect((w - lado) / 2 - 2, y - 2, lado + 4, lado + 4);
        doc.addImage(cert.imagem, tipo, (w - lado) / 2, y, lado, lado, undefined, 'FAST');
        y += lado + 12;
      } catch (erro) {
        console.warn('Não foi possível inserir a imagem no certificado:', erro);
      }
    } else {
      y += 4;
    }

    doc.setFont('times', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(TINTA[0], TINTA[1], TINTA[2]);
    const linhasTitulo = doc.splitTextToSize(cert.tituloObra || 'Obra sem título', w - 66);
    doc.text(linhasTitulo, w / 2, y, { align: 'center' });
    y += linhasTitulo.length * 6.2 + 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(90, 80, 60);
    doc.text(`${capitalizarTexto(cert.tecnica)} · ${cert.dimensoesTexto || '-'} · ${cert.ano || '-'}`, w / 2, y, { align: 'center' });
    y += 9;

    // Linha de autenticação (data + local + código legível)
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.8);
    doc.setTextColor(120, 105, 70);
    const autenticadoEm = `Autenticado em ${formatarData(cert.dataEmissao)}${cert.local ? ` · ${cert.local}` : ''}`;
    doc.text(autenticadoEm, w / 2, y, { align: 'center' });
    y += 8;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10.5);
    doc.setTextColor(70, 60, 45);
    const textoPadrao = `Certifico que a obra acima é original, de minha autoria, executada em ${cert.tecnica}. Não existem reproduções autorizadas além da edição declarada. Este documento é autenticado pelo código de verificação impresso na página.`;
    const linhasTexto = doc.splitTextToSize(textoPadrao, w - 66);
    doc.text(linhasTexto, w / 2, y, { align: 'center' });
    y += linhasTexto.length * 5.5 + 8;

    // Proteção de overflow: nunca deixar o bloco de assinatura colar no rodapé
    if (y > h - 58) y = h - 58;

    // Assinatura (esquerda) e QR Code de validação + hash (direita)
    const yBase = y;
    const centroEsquerda = w / 2 - 44;
    const centroDireita = w / 2 + 44;

    if (assinaturaDataUrl && /^data:image\//i.test(assinaturaDataUrl)) {
      try { doc.addImage(assinaturaDataUrl, 'PNG', centroEsquerda - 27, yBase, 54, 20); } catch (erro) { /* assinatura opcional */ }
    }
    doc.setDrawColor(ORO[0], ORO[1], ORO[2]);
    doc.line(centroEsquerda - 27, yBase + 24, centroEsquerda + 27, yBase + 24);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 70, 50);
    doc.text(nomeArtista, centroEsquerda, yBase + 29, { align: 'center' });
    doc.setFontSize(7.5);
    doc.setTextColor(140, 125, 90);
    doc.text('Assinatura do artista', centroEsquerda, yBase + 33, { align: 'center' });
    doc.setFontSize(8.5);
    doc.setTextColor(90, 80, 60);
    const localData = `${cert.local || ''}${cert.local ? ', ' : ''}${formatarData(cert.dataEmissao)}`;
    doc.text(localData, centroEsquerda, yBase + 40, { align: 'center' });

    const hash = cert.hashAutenticidade || this.calcularHashAutenticidade(cert);
    const textoQR = `${window.location.origin + window.location.pathname}#verificar=${hash}`;
    const qrDataUrl = await gerarQRCodeDataUrl(textoQR);
    if (qrDataUrl) {
      try {
        doc.addImage(qrDataUrl, 'PNG', centroDireita - 15, yBase - 2, 30, 30);
        doc.setFontSize(7.5);
        doc.setTextColor(140, 125, 90);
        doc.text('Validação digital', centroDireita, yBase + 34, { align: 'center' });
        doc.setFontSize(7.5);
        doc.setTextColor(120, 105, 70);
        doc.text(this._formatarHash(hash), centroDireita, yBase + 38.5, { align: 'center' });
      } catch (erro) { /* QR opcional */ }
    }

    // Rodapé com selo de integridade
    doc.setDrawColor(ORO[0], ORO[1], ORO[2]);
    doc.setLineWidth(0.8);
    doc.line(25, h - 24, w - 25, h - 24);
    doc.setFillColor(ORO[0], ORO[1], ORO[2]);
    doc.circle(27, h - 18.5, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(255, 255, 255);
    doc.text(iniciais, 27, h - 17.3, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(110, 95, 65);
    doc.text(`Certificado autenticado digitalmente · cod. ${this._formatarHash(hash)}`, w / 2 + 8, h - 16, { align: 'center' });
    doc.setTextColor(150, 135, 100);
    doc.text(`Emitido em ${new Date().toLocaleDateString('pt-BR')} · ${nomeArtista}`, w / 2 + 8, h - 11, { align: 'center' });
  }
}