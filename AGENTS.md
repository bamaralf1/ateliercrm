# Atelier CRM — Resumo das alterações

## O que é
CRM para artistas visuais: catálogo de obras, clientes, vendas, certificados, contatos profissionais, finanças, galeria 3D, precificador inteligente, diário criativo.

## Stack
- Single HTML (zero dependências de build): 1 arquivo `index.html` + `translations.js`
- TypeScript → concatenado por `tools/concat-source.js` → compilado por `tsc` → `js/atelier-crm.js`
- 26 arquivos em `src/`, 10 classes de view, 3 classes de serviço
- CDNs carregadas: jsPDF, html2canvas, Chart.js 4.4.1, qrcodejs, Three.js r128, D3.js 7.8.5
- Dados: `localStorage` (5 MB), imagens comprimidas para 1200 px JPEG
- Testes: Jest (jsdom), 12 suites, 123 testes

## Hierarquia de classes
- `BaseView` → todas as views: `render()` → HTML, `aposRenderizar()` → bind de eventos, `destruir()` → cleanup
- Views registradas no `Router` com nome, label, ícone e flag `oculta`
- `DataStore` gerencia `localStorage` com schema versionado (migration `_migrarDados`)
- `main.ts` instancia tudo, faz bootstrap, expõe APIs no `window`

## Estrutura de dados (types.d.ts)
- `Obra`: id, titulo, tecnica, dimensoes, preco, imagem (base64), status, serie, descricao, ano, favorita, tags, documentos, materiais, tecnicas
- `Cliente`: id, nome, contato, email, endereco, notas, obrasCompradas[]
- `Venda`: id, clienteId, obraIds[], data, valorTotal, status, parcelas[], notas
- `Encomenda`: id, cliente, clienteEmail, clienteTelefone, descricao, valor, status, prazo, atualizacoes[], imagens[], criadoEm
- `ContatoProfissional`: id, nome, categoria, estagio, instituicao, cargo, contato, email, redes, nivelRelacionamento, comoConheceu, ultimoContato, proximoPasso, vip, notas
- `Interacao`: id, contatoId, tipo, data, resumo, sentimento, followUp, followUpNotas, anexos[]
- `Evento`: id, nome, tipo, status, dataInscricao, dataEvento, investimento, retorno, resultado, documentacao[], obrasEnviadas[], notas
- `LancamentoFinanceiro`: id, tipo, descricao, valor, data, categoria, obraId, parcelamento, parcelas, notas
- `PortalCliente`: id, encomendaId, token, criadoEm, ativo
- `ConfigCRM`: nomeArtista, contato, email, bio, idioma, tema, contraste, fonteSize, pinHash, syncGoogleClientId, syncGoogleToken, syncWebDAVUrl, syncWebDAVUser, syncWebDAVPass, syncAutoBackup, syncAutoBackupInterval, syncLastBackup
- `DadosCRM`: obras[], clientes[], vendas[], encomendas[], contatosProfissionais[], interacoes[], eventos[], financas[], configuracoes, tema, linguagem, contraste, fonteSize, serieAtual, portais[]

## Resumo das alterações

### Precificador com ML (precificador-view.ts)
- Calculadora multi-moeda (BRL/USD/EUR/GBP com taxas editáveis)
- Análise de break-even com margem colorida (🟢>40% 🟡20-40% 🔴<20%), markup e lucro
- ML accuracy tracker: hit rate, MAE, maiores discrepâncias
- Projeção de valorização (regressão linear, 1/3/5 anos com R²)
- Regras de precificação por série (CRUD + aplicar em lote)
- PDF exporta com break-even embutido
- CSS: `.conversoes-multi`, `.be-tabela`, `.ml-precisao-grid`, `.projecao-grid`, `.regras-lista`, `.regra-form`, `.taxas-form`

### Orçamentos premium P0 (precificador-view.ts, portal-view.ts, vendas-view.ts) — commit `da2e560`
- **Calculadora de orçamento** (sem obra de referência): `this.calc = { nome, clienteId, tecnica, materiais, horas, valorHora, largura/altura/profundidade, complexidade, multiplicador, arredondamento }`; breakdown com `bd-ok/bd-medio/bd-baixo`, regra automática, faixa comparativa, conversões multi-moeda.
- **Numeração sequencial**: `_gerarNumeroProposta()` → `PRO-${ano}-${4 dígitos}` via `config.contadorPropostas` (por ano); exibido no card/list a e na proposta PDF; validade 30 dias (`orc.validadeData`).
- **Kanban de orçamentos** por status (Rascunho/Enviado/Aprovado/Recusado) com DnD (`_moverOrcamentoParaStatus`), toggle Kanban/Lista (`localStorage['atelier-crm-view-mode-orcamentos']`), dropdown móvel por card, cores `.orc-status.st-*`.
- **Conversão aprovado → Venda**: botão `btn-orc-venda` (💰) só em status `aprovado` e sem `convertidoEm`; `registrarVenda()` cria venda via `dataStore.adicionar('vendas', { obraId:'', obraTitulo, clienteId, clienteNome, precoFinal, dataVenda, formaPagamento:'a combinar', status:'aprovada', orcamentoId, numeroProposta })`, incrementa `aquisicoes` do cliente, marca `orc.convertidoEm`/`vendaId` e navega para Vendas. Vendas de orçamento caem na tabela de Vendas com fallback `v.obraTitulo`/`v.clienteNome` (sem obra).
- **Proposta PDF premium**: 3 templates (`_propostaClassico` times serifado / `_propostaModerno` banda+bloco de valor / `_propostaMinimalista` hairline) selecionáveis por `precificador.templateProposta` (select `selTemplateProposta`). Exportar proposta sem orçamento salvo **auto-salva** o orçamento (gera número + token).
- **QR de aceite**: `_garantirAceiteToken(orc)` cria `aceite_xxx` persistido; `_gerarQRProposta` usa `gerarQRCodeDataUrl(base + '#portal?token=' + token)`; cliente escaneia → `PortalView.renderAceiteOrcamento()` reconhece token `aceite_*`, marca `status:'aprovado'` + `aceiteData` (idempotente: re-scan mostra "Proposta já aceita"). CSS `.portal-aceite*`.
- Helpers: `_persistirOrcamento(orc)` (numero+validade+token+upsert), `_prepararProposta`, `_propostaClassico/Moderno/Minimalista`, `definirStatusOrcamento` (lista in-place / kanban rerender).

### Portal do Cliente (portal-view.ts, encomendas-view.ts)
- `PortalCliente` com token único por encomenda
- `portal-view.ts`: valida token do hash `#portal?token=xxx`, timeline visual, cards com badges
- `encomendas-view.ts`: CRUD completo, modal de portal (criar/copiar/toggle/delete), filtros, busca
- Rota `portal` como `oculta: true` (não aparece na sidebar)
- CSS: `.portal-wrapper`, `.portal-encomenda-card`, `.portal-timeline`, `.portal-badge`, `.portais-lista`

### Sync Cloud (cloud-sync.ts, configuracoes-view.ts)
- IndexedDB (`AtelierCRM` db, `snapshots` store): salvar, listar, restaurar, remover snapshots
- Google Drive: OAuth 2.0 implicit flow (`drive.file`), folder auto-create, multipart upload
- WebDAV: PROPFIND list, PUT upload, GET restore, Basic Auth
- Auto-backup configurável com intervalo
- UI em 3 abas (IDB, Google Drive, WebDAV) com botões de testar conexão
- CSS: `.sync-tabs`, `.sync-tab.ativo`, `.sync-panel`

### Galeria Virtual 2D (slide com zoom) (galeria-virtual-view.ts)
- **Substitui a antiga galeria 3D (Three.js)**: sem mais WebGL, Three.js não é mais carregado
- Slide 2D com moldura branca + legenda (título, técnica · ano, preço); até 20 obras (disponíveis/em exposição)
- Zoom: scroll wheel (1.15×), botões +/−, double-click (2.5×), teclado `+`/`-`/`0`, indicador de % — escala 1×–4×
- Navegação: botões ◀▶, teclas ← →, thumbstrip inferior com destaque na obra ativa
- Tour guiado: botão 🎧 na barra, HUD com play/pause/prev/next, avanço automático a cada 4s, progresso `N / total`; link `#galeria=virtual&tour=obras-disponiveis` inicia tour automático (tratado em `main.ts`)
- Clique na obra abre o Lightbox Premium (compartilhado com Catálogo)
- Botão Compartilhar copia convite com link do tour
- Cleanup: `destruir()` para tour, keydown/resize; listeners de DOM morrem com o re-render
- CSS: `.gv-2d`, `.gv-slide-container`, `.gv-slide`, `.gv-moldura`, `.gv-imagem`, `.gv-legenda`, `.gv-nav`, `.gv-zoom-controles`, `.gv-thumbstrip`, `.gv-thumb`, `.gv-hint`; responsivo mobile (thumbs 52px, nav menor, hint oculto)

### Lightbox Premium Unificado (image-lightbox.ts)
- Classe singleton `ImageLightbox` + função global `abrirLightbox(images, index)`
- Full-screen overlay com backdrop-filter blur, fade-in animation
- Zoom/pan: scroll wheel zoom (0.5x–5x), drag para pan quando ampliado, double-click toggle zoom
- Navegação por teclado: ← → para navegar, ESC fechar, +/- zoom, 0 reset, Space slideshow
- Touch: swipe para navegar, pinch-to-zoom, drag para pan
- Thumbnails: strip inferior com scroll horizontal, destaque na imagem ativa
- Ações: download, compartilhar (navigator.share ou clipboard), slideshow automático
- Legendas: título, técnica, ano, preço exibidos na parte inferior
- Indicador de zoom (%) no canto inferior direito
- Toast de feedback para download/share
- Integrado na Galeria Virtual (substitui o overlay antigo) e no Catálogo (clique na imagem abre lightbox, botão slideshow usa lightbox)
- CSS responsivo para mobile com navegação adaptada

### Correção de Dupla Codificação UTF-8 em Emoji/Símbolos
- **Problema**: 45 sequências de emoji/símbolos (🖼️, ✅, ⚠️, →, 📸, etc.) em `src/main.ts`, `src/views/vendas-view.ts`, `src/data-store.ts` foram duplamente codificadas durante refatoração — cada byte de um caractere UTF-8 multibyte foi interpretado como Latin-1 e re-encodado, gerando runas `C3 XX C2 YY...`
- **Solução algorítmica** (`tools/fix-emoji.ps1`): varre bytes procurando runas de 3+ pares consecutivos `C2/C3 [80-BF]`, decodifica os bytes originais, valida que formam um caractere UTF-8 multibyte válido (com suporte a VS16), e substitui pela codificação correta. Seguro para acentos portugueses porque estes são pares `C3 XX` isolados (runas de 1 par, ignoradas)
- **Commit**: `3107391` (5 arquivos, +177/-62 linhas)

### Mapa de Rede com D3.js (rede-view.ts)
- D3.js 7.8.5 force-directed graph substitui SVG com círculo fixo anterior
- `forceSimulation` com `forceLink`, `forceManyBody` (-300), `forceCenter`, `forceCollide`
- Nós: círculos com raio proporcional ao nível de relacionamento, cores por categoria
- Arestas: mesmas conexões (instituição compartilhada ou comoConheceu)
- Comportamento de zoom (d3.zoom), drag (d3.drag) com fixação temporária
- Labels: iniciais dentro do círculo, nome completo abaixo
- Tooltip com informações do contato, clique navega para timeline de interações
- Hubs calculados após simulação estabilizar (2s)
- **Perspectiva corrigida**: D3 force layout centraliza naturalmente no viewport — sem o efeito "visto de baixo" do SVG anterior
