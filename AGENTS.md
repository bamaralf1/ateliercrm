# Atelier CRM — Resumo das alterações

## O que é
CRM para artistas visuais: catálogo de obras, clientes, vendas, certificados, contatos profissionais, finanças, galeria virtual, precificador inteligente, diário criativo.

## Stack
- Single HTML: 1 arquivo `index.html` + `translations.js` (dados locais, sem backend)
- TypeScript → concatenado por `tools/concat-source.js` → compilado por `tsc` → `js/atelier-crm.js`
- **CSS: fonte única** `src/styles/style.scss` (partials `_tokens/_themes/_animations/_responsive/_premium-v5`) → `tools/sync-css.js` compila (sass, `style:'compressed'`) e **substitui o bloco `<style>` inline do `index.html`**. Editar só o scss + rodar `npm run styles` (ou `build`). `src/vite-entry.ts` NÃO importa mais scss
- `npm run build`: `concat-source.js && sync-css.js && vite build` (Vite = servidor dev/build; CSS gerido pelo sync-css)
- 26 arquivos em `src/`, 10 classes de view, 3 classes de serviço
- CDNs carregadas: jsPDF, html2canvas, Chart.js 4.4.1, qrcodejs, D3.js 7.8.5 (Three.js removido — ver Galeria 2D); ícones: **Lucide vendorizado** em `public/lucide.min.js` (ver V13)
- Dados: `localStorage` (5 MB), imagens comprimidas para 1200 px JPEG
- Testes: Jest (jsdom), 14 suites, 199 testes, todos passando. `npm test` (pretest: `concat-source.js && tsc`). Requisito no Windows: `node_modules/unrs-resolver/index.js` precisa do fallback JS (o binding nativo exige VCRUNTIME140.dll ausente) — patch manual: sobrescrever as functions `sync`/`async`/etc. com `JsFallbackResolver` via `require.resolve`; **não persiste após `npm install`/`npm ci`**. `jest.setup.js` fornece mock IDB funcional (put/get/delete disparando `oncomplete`), polyfills TextEncoder/Decoder, `crypto` forçado para `require('crypto').webcrypto` (jsdom sem `subtle`), stubs Image/canvas/URL.createObjectURL. Padrões: testes de CloudSync precisam `delete global.indexedDB`; tema padrão é `dourado` (não `classico`); `_salvarPin` hasheia o PIN (SHA-256) e os helpers `hashPin`/`verificarPin`/`isPinHashed` são exportados por `main.ts`. Validar também com `npm run build` + browser

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

### CSS consolidado em fonte única (tools/sync-css.js, tools/port-inline-only.js)
- **Problema**: CSS duplicado em 2 fontes — `<style>` inline gigante no `index.html` (~4800 linhas) + `style.scss` injetado pelo Vite (precedência desordenada, divergência entre fontes).
- **Solução**: `tools/sync-css.js` compila `src/styles/style.scss` (sass) e **substitui** todo o bloco `<style>` do `index.html` (~211 kB injetado). `tools/port-inline-only.js` (one-shot) portou 446 unidades que existiam só no inline (fonte: `git show HEAD:index.html`) para o scss, com união de declarações (scss vence conflito = comportamento "live" pré-consolidação).
- Normalização obrigatória no port: seletores com aspas em atributos — `[data-tema="classico"]` (inline) vs `[data-tema=classico]` (sass) — sem isso o bloco de tema inteiro duplica e o valor antigo (ex.: fonte Georgia) vence o scss.
- Regras inúteis descartadas no port: `@media (...)` com corpo sem `{` (blocos planos que o browser ignorava) e regras vazias (sass remove).
- **Cascade do style.scss**: `@use` _tokens/_themes/_animations/_responsive (topo) → base → bloco portado `/* @port-inline ... */` → `@import '_premium-v5';` (FIM, p/ camada premium vencer). Dart Sass permite `@import` após regras (warning de deprecation; ok até Sass 3.0).

### Premium V5 — design language global (_premium-v5.scss)
- Camada mais externa do cascade (importada no fim do style.scss): **não altera layout** — refino visual puramente aditivo.
- **Atmosfera por tema**: `body::before` (pseudo livre) com 3 radiais fixos + tokens `--pv5-amb-1/2/3` por tema (classico/clean/escuro/galeria/boho/dourado/marmore/esmeralda); `html` ganha `background: var(--bg)` + `scrollbar-color`.
- **Títulos de view**: `.view-cabecalho h2` com gradiente de texto por tema (`--pv5-h2-grad`) + `font-family: var(--font-display)` + tracking negativo; `.subtitulo` com weighting/letterspacing.
- **Vidro**: `backdrop-filter: blur(20px) saturate(1.35)` em `.glass-premium`/`.header`/`.painel-filtros`; `.modal-overlay` blur(10px) saturate(1.2).
- **Tabelas**: `thead th` sticky + gradiente tridimensional (card↔accent) + hairline `th::after`; hover de linha com barra `inset 2px 0 var(--accent)`; `td` com borda suavizada; `.tabela-wrapper` radius 14px.
- **Sombras premium**: card/painel/catalogo-filtros/tabela-wrapper com cadeia 1/4/14px + bevel interno top (variantes escuro/dourado/esmeralda mais profundas).
- **Foco**: `:focus-visible` ring accent (outline 2px accent+white, offset 2px); inputs com glow triplo (ring accent-soft + sombra + inset); `::selection` tintado accent.
- Botões: `.btn-gradient:hover` glow accent + bevel interno; `.btn-primario` com luz superior + profundidade inferior.
- Acessibilidade: `body[data-high-contrast]` desliga a atmosfera (`body::before{display:none}`) e appliques; `@media (prefers-reduced-motion)` sem transições novas.

### Freemium removido — commit `b0cd888`
- Removido plano gratuito/paywall: arquivos `src/plano.ts` e `src/views/planos-view.ts` deletados, strings freemium removidas (i18n), `window.Freemium` eliminado, `tools/concat-source.js` sem plano.ts/planos-view.ts.
- Todos os recursos liberados: 16 itens na sidebar (sem "Planos"), Galeria e Precificador (4 abas) sem paywall, Configurações → Sync aberto, `window.Freemium` undefined, console zero erros.

### Premium V6–V12 — refinamentos progressivos (_premium-v5.scss, base)
- V6: `--elev-1/2/3` + `--ring-fina`/`--ring-fina-esc`; sombras em camadas com bevel interno; gradiente suave topo em cards (`::after`); `font-variant-numeric: tabular-nums` em valores/preços; scan de luz `.btn-primario::before`; estado-vazio com anel pontilhado girando.
- V7: `.toast` com borda colorida por tipo (`--ok/--warn/--danger/--info`), `.toast i` centralizado; navbar ativo com `::before` barra lateral gradiente + glow; foco de inputs com glow triplo (ring-accent + sombra + inset); hover de linha `tr:hover td` background accent 6%.
- V8: `.card/.painel/.kpi-card` com gradiente de superfície aditivo e transições suaves; hover com sombra accent + `translateY(-2px)`; modal `::before` topo com gradiente; subtítulos em serif itálico (`.view-cabecalho p.subtitulo`); `.tag-status` uppercase.
- V9: animações de entrada — `v9Rise` (view header, tabelas, grids com stagger por nth-child) + `v9Fade` (modal); scrollbar custom em `.view/.tabela-wrapper/.modal-caixa`; `body::before` ganha 5º radial com `--pv5-glow-c` em topo/base.
- V10: `--font-display` (Playfair) em KPI/preços/`kpi-valor`; logo sidebar com gradiente texto (`.sidebar-logo .rotulo` background-clip text); nav-item com `letter-spacing`; `kpi-icone` com ring + glow accent.
- V11: background fixo — `body{background:transparent}`, `body::before` passa a ter gradiente linear + radiais (glow no topo/base); `html{background:var(--bg)}` com `scrollbar-color`; high-contrast desliga atmosfera/header-gradient; `:target`/`.conteudo` scroll-margin.
- V12: `body::after` grão (SVG feTurbulence data-uri, `mix-blend-mode:overlay`, `opacity:.05`, `.035`→`.05`); source-altas `scroll-padding-top`; `h1..h4{text-wrap:balance}`; `::-webkit-scrollbar-thumb` com `border+background-clip:content-box`; `themed h2` drop-shadow para escuro/dourado/esmeralda.

### Migração Font Awesome + emojis → Lucide (V13)
- **Motivo**: usuário escolheu "ícones mais desenvolvidos/premium" — Font Awesome e emojis substituídos por Lucide (stroke, 1em, inline-block).
- **Fornecimento**: cdnjs NÃO tem "lucide" → **vendorizado localmente** em `public/lucide.min.js` (UMD, ~433 kB, 2073 ícones, expõe `window.lucide.createIcons`), referenciado como `<script src="lucide.min.js">` (raiz do publicDir — NÃO `public/js/` que o `.gitignore` ignora via `js/`).
- **Marcadores**: `<i data-lucide="nome" aria-hidden="true"></i>` são trocados por `<svg data-lucide>` em runtime pelo `lucide.createIcons()`. `src/icones.ts` define `LUCIDE`/`ICONES` (46 nomes: dashboard→bar-chart-3, financeiro→chart-line, rede→share-2, atelier→paintbrush, galeria→layout-grid) + `sincronizarIcones()` (guarda `i[data-lucide]` p/ anti-loop do MutationObserver) + `inicializarIconesLucide()` (observer com debounce 80ms) chamado no Init de `main.ts`; router injeta `<span class="icone">${rota.icone}</span>` (agora `<i data-lucide>`).
- **Toast**: `src/utils.ts`/`main.ts` usam `#toastIcon` + setAttribute `data-lucide` (`sucesso:circle-check, erro:circle-x, aviso:triangle-alert, info:info`).
- **Codemods** (one-shot, mantidos em tools/): `tools/fa-to-lucide.js` (329 trocas `fas fa-X`→`data-lucide` em 26 .ts + portal-cliente.html) e `tools/emoji-to-lucide.js` (PassA tags `>emoji<` em 10 arquivos, PassB `icone:'X'` em 13; dashboard 🖼️→image/gem, tema 🎨🌙🌿⚪👑👛💚→palette/moon/leaf/circle/crown/landmark/gem, ✨→sparkles).
- **index.html**: logo🎨→palette, colapsar☰→menu, Backup💾→save, notif🔔→bell, limpar🗑️→trash-2, breadcrumb home/chevron-right, FABs (obra/venda/cliente/encomenda/contato/evento→image/dollar-sign/user/package/handshake/tent), FAB main+→plus, toast info; `<option>` de temas sem emoji (options não renderizam HTML); link CDN Font Awesome **removido**; `<script src="lucide.min.js">` antes do module.
- **portal-cliente.html**: STAGES icon→clipboard/paintbrush/check/star/package; dinâmicos `data-lucide="${...}"`; `lucide.createIcons()` chamado após cada `render()`; corrigido bug pré-existente `s(data.artista)` → `function s = sanitizar` alias (ReferenceError `s is not defined` do HEAD).
- **CSS V13** (fim do _premium-v5.scss): `svg[data-lucide]{display:inline-block;width:1em;height:1em;vertical-align:-0.125em;flex-shrink:0}`, overrides `.kpi-icone/.fi-icone/.icone-vazio` 1.1em, `.btn-header/.btn-notif/.btn-miniatura` 0.95em, `.stage-dot/.timeline-dot` stroke-width 2.5, high-contrast 2.25.
- **Mantidos como emoji**: `<option>`/mapas de categoria (`catIcones`) e prosa sentimental (moods, bandeiras, status dots coloridos) — não renderizam HTML/SVG.
- **⚠️ Regra dura**: NUNCA reescrever `index.html`/`portal-cliente.html` via PowerShell `Set-Content`/`Add-Content` (PS 5.1 lê sem BOM como ANSI/GBK → dupla codificação `Ações`→`AÃ§Ãµes` + BOM). Sempre Edit tool ou Node `fs.writeFileSync(...,'utf8')`; após `git checkout -- index.html` rodar `node tools/sync-css.js` (o `<style>` do HEAD fica desatualizado vs scss V5–V13).
- **Verificação browser**: app 66 SVGs/0 pendentes, nav/logo/toast/kpi ok; portal-cliente 20 SVGs com encomenda real e console limpo.

### Contraste do texto no hover de botões (V14) — _premium-v5.scss
- **Halo universal**: `text-shadow` com `color-mix(in srgb, var(--bg) 92%...)` — `--bg` é claro em temas claros (classico/clean/galeria/boho/marmore) e escuro em temas escuros (escuro/dourado/esmeralda), então o halo sempre recorta as letras contra o fundo accent do botão, em TODOS os temas.
- `.btn-primario/.btn-gradient:hover`: `color: var(--accent-contrast)` + `font-weight:600` + halo `--bg` (7px/3px) + `0 1px 1px rgba(0,0,0,.25)`.
- `.btn-secundario/.btn-ghost:hover`: `color: color-mix(in srgb, var(--accent) 70%, var(--text))` + `600` + halo.
- `.btn-header/.btn-notif/.btn-miniatura/.tab-btn/.chip-filtro:hover`: `color: var(--accent)` + `600` + halo.
- Ícones no hover: `stroke-width:2.3` nas famílias acima.
- ⚠️ **Transição vs override**: o `transition: text-shadow .2s` da família sólida mantinha o halo "animado" mesmo com o override de alto contraste (browser interpola para o estado do elemento). Solução: `body[data-high-contrast="true"]` ganha `transition:none` nos botões (cor pura, sem halo).
- Validado em browser com hover real (CDP): Exportar (btn-gradient) tema Clean (texto branco, halo `#faf9f6`), Escuro (texto `#191303`, halo `#0e1116`), high-contrast (`text-shadow:none`, `transition:none`). Console limpo, build OK.

### Atmosfera cinematográfica (V15) — _premium-v5.scss + main.ts
- **Direção escolhida**: "atmosfera cinematográfica" — aurora animada, glow seguindo o cursor, grão de filme, vinheta, transições luxuosas.
- **Glow do cursor**: `body` ganha `--glow-x:50%; --glow-y:0%`; `src/main.ts#iniciarAtmosferaCinematografica()` (chamada no Init após `iniciarDragDrop()`) escuta `pointermove` (passivo, rAF-throttled) e seta `--glow-x/--glow-y` em % no `document.body`. Guards: `prefers-reduced-motion: reduce` e `pointer: fine` (nada em mobile).
- **`body::before` redefinido** (9 camadas): radial do cursor usando `var(--pv5-glow-c)` em `var(--glow-x/y)`, gradiente linear translúcido, glow topo/base, ambientes `--pv5-amb-1/2`, vinheta (clara: `transparent 62% → color-mix(var(--bg) 20%, rgba(0,0,0,.28))`; override escuro/dourado/esmeralda mais forte + vinheta `rgba(0,0,0,.38)`); `animation: v15Respirar 11s ease-in-out infinite` (opacity .92↔1).
- **Grão de filme**: `body::after` anima opacity `.035→.06→.045` com `animation: v15GrainZigue .9s steps(2) infinite`.
- **Sheen de botões ADITIVO**: NÃO redefine `::before` (base usa sheen por `left` em style.scss:3169/4593). Só `transition: left .7s cubic-bezier(.16,1,.3,1)` + `mix-blend-mode:screen` em `.btn-gradient::before/.btn-primario::before`, com `:hover::before { left:100% }` já existente.
- **Modal cinematográfico**: animação SÓ no estado aberto (`.modal-overlay.aberto { animation: v15Fade .25s ease both }`, `.modal-overlay.aberto .modal-caixa { animation: v15Modal .42s cubic-bezier(.16,1,.3,1) both; transform-origin:top center }` — de `opacity:0; scale(.96) translateY(18px); blur(6px)`). ⚠️ Não colocar `animation` no `.modal-overlay`/`.modal-caixa` base: fill-mode `both` congelaria opacity 1 (overlay visível) e sobrescreveria o mecanismo `scale(0.9)→scale(1)` do `fecharModal` (utils.ts). O v15Modal vence o `modalIn` base por ordem de cascade.
- **FAB**: `.fab-main { animation: v15FabGlow 3.2s infinite }` — pulso de box-shadow com `color-mix(accent 55%, accent-glow)`.
- **Cards**: `.card/.painel/.kpi-card/.catalogo-filtros:hover::after { box-shadow: inset 0 1px 0 color-mix(var(--pv5-glow-c) 34%) }` (aditivo; `::after` base já tem gradiente); `.kpi-card:hover { transform: translateY(-3px) }`.
- **Acessibilidade V15**: `body[data-high-contrast="true"]::before/::after { animation:none; display:none }` (cuidado com seletor — SEM `body` duplicado: `body[data-high-contrast=true] body::after` nunca casa); `@media (prefers-reduced-motion: reduce)` desliga `body::before/::after`, `.fab-main`, `.modal-overlay.aberto`, `.modal-overlay.aberto .modal-caixa`.
- **Perf**: glow do cursor é só variáveis CSS (composited), aurora usa opacity-only keyframes; `pointermove` rAF-throttled com `raf=null` guard p/ não estourar a fila de rAF.
- Validado no browser (CDP): CSS minificado 238.8 kB, `v15Respirar/v15GrainZigue/v15Modal/v15FabGlow/v15Fade` presentes; pointermove seta `--glow-x/y` (ex.: 300,200 → 23.98%, 39.2%); abrir modal real mostra `v15Modal` com `blur(6px)`/`opacity:0` inicial e overlay `v15Fade`; high-contrast desliga `before/after`; hover real Esmeralda: halo `#0d1712`, color accent `#3cae72`, weight 600. Console limpo, build OK.

### Correção de exportações quebradas (V16) — html2canvas-pro, qrcode-generator, KPI
- **html2canvas 1.4.1 → html2canvas-pro 1.5.8** (CDN `https://cdn.jsdelivr.net/npm/html2canvas-pro@1.5.8/dist/html2canvas-pro.min.js`): o vanilla NÃO parseia `color(...)` (valor computado do `color-mix` massivo das camadas premium V5–V15) → **todas as capturas quebravam com** `Attempting to parse an unsupported color function "color"`: dashboard "Exportar" (PNG), recibos/propostas (html2canvas→jsPDF). O fork `html2canvas-pro` suporta `srgb/oklch/lab/lch`. É **drop-in** (expõe `window.html2canvas`, mesma API). CSP: adicionar `https://cdn.jsdelivr.net` ao `script-src`.
- **qrcodejs 1.0.0 → qrcode-generator 1.4.4** (CDN `https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js`): o qrcodejs antigo **estoura com acentos em MODE_8BIT_BYTE** (`code length overflow. (892>688)` — calcula bytes UTF-8 errado). Quebrava certificados (`Obra: ... Autenticada em:` com `ê`) — o PDF nunca salvava e o toast ficava preso em "Gerando PDF...". O `qrcode-generator` lida UTF-8 correto: `qrcode(0,'H').addData(texto,'Byte')` → `getModuleCount()` → desenha em `<canvas>` → `toDataURL('image/png')`.
- **`gerarQRCodeDataUrl` (utils.ts:240) reescrito** p/ `qrcode-generator` com fallback placeholder; NÃO usa mais `new QRCode(div,...)`/`QRCode.CorrectLevel`. **⚠️ `QRCode` global não existe mais** — qualquer código antigo com `new QRCode(...)` quebra. `catalogo-view.ts gerarQRCodeObra` (QR da ficha da obra) migrado p/ `await gerarQRCodeDataUrl()` + `<img>`.
- **KPI cortado ("TOTAL VENDIDO")**: sparkline do dashboard `gerarSparkline` (dashboard-view.ts:209) `w=80→56` (roubava espaço); `.kpi-valor` ganha `overflow-wrap:anywhere; word-break:break-word` + `.kpi-conteudo{min-width:0}` (_premium-v5.scss) — o `toLocaleString('pt-BR')` de `formatarMoeda` emite NBSP (`R$\u00A0850,00`) que impedia quebra natural e o `overflow:hidden` do `.kpi-card` cortava. Validado: todos os KPIs `scrollWidth == width`.
- Validações (dev 3000 + prod 4100): dashboard Exportar → toast "Dashboard exportado!", certificado → "Certificado gerado com sucesso!" (QR com `ê` OK), recibo → "PDF gerado com sucesso!", backup header e Exportar/Importar → "Backup exportado com sucesso!" (JSON ~26.9 kB), QR ficha de obra → `data:image/png`, console limpo, build OK.

### Legibilidade botões/KPI (V17) — commit `e255011`
- **Botões invisíveis**: removido o `text-shadow` halo do V14 (cores puras em hover); `.btn-gradient` unificado para `accent → accent-strong` (sem índigo fixo); `.btn-miniatura`/`.btn-mover-esq/dir` com fundo/letra do tema (`:not(.ativo)`), preservando `.ativo`.
- **KPI invisível**: `.kpi-valor` usava gradiente-clip (`-webkit-text-fill-color:transparent` + `background-clip:text`) dependente de `--kpi-cor`; sem a variável o gradiente era inválido → `background:none` → letras transparentes. Novo: `color: var(--kpi-cor, var(--text)); background:none; -webkit-background-clip:initial; background-clip:initial; -webkit-text-fill-color:currentColor`.
- Validado dev+prod, Dashboard e Catálogo, temas claro/escuro, 0 transparentes.

### Ultra-premium pass (V18 — Atelier Premier) — _premium-v5.scss
- Pedido "MUITO MUITO MUITO mais premium": passada aditiva no fim de `_premium-v5.scss` (importado por último → vence no cascade). Não altera layout.
- **Sidebar**: `background` em 3 camadas (radial sidebar-vignette topo-esquerda + radial accent canto inferior + linear sidebar-bg→accent); `.sidebar-topo::after` hairline accent; `.sidebar-logo .icone` `drop-shadow` accent animado; `.nav-separador` mini-caps `letter-spacing .18em` com `::after` linha gradiente; `.nav-item` radius 11 + hover glow; ativo com **gradiente 115deg accent→accent-strong** + `::before` barra 3px branca com glow + `box-shadow` externo accent (seletor `#sidebar .nav-item.ativo` com longhand `background-image` — `body .nav-item.ativo` com shorthand `background` NÃO aplicava: Chrome devolve `background-image` vazio no cascade real); `.btn-colapsar:hover` gira 90°; `.sidebar-rodape` hairline.
- **Header**: gradiente de superfície + `backdrop-filter` vidro; `.header::after` hairline accent 1px; `h1` em `--font-display`; `.select-tema` radius 10 + hover borda accent; `.btn-header` radius 10 + hover `translateY(-1px)` + active squash; `.notif-badge` ring + sombra.
- **Cards/KPI**: `.card/.painel:hover` `translateY(-2px)` + sombra camada accent (ring + glow); `.kpi-card:hover` `translateY(-4px) scale(1.02)` com `perspective`; `.kpi-icone/.fi-icone:hover` `scale(1.12)` + drop-shadow accent.
- **Tabelas**: `th + th::before` hairline vertical extra; hover de linha mantém barra `inset 2px accent`.
- **Modais**: `.modal-caixa` `box-shadow` volumétrico (>90px accent tint) + `::before` hairline topo 2px.
- **Toasts**: `backdrop-filter` vidro + sombra + glow colorido por tipo (`--ok`).
- **Scrollbar**: thumb gradiente accent (`.view/.tabela-wrapper/.modal-caixa`).
- **Guards**: `@media (prefers-reduced-motion)` desliga transições/`transform` novos; `[data-high-contrast]` zera transform dos cards e fundos especiais.
- **⚠️ Aprendizado**: `color-mix(in srgb, X 130%, transparent)` — **proporção >100% invalida a declaração inteira** (ex.: background radial vira `none`). Sempre usar ≤100%.
- Validado dev+prod: ativo dourado/clássico com gradiente+barra+texto contrastante, sidebar 3 camadas, KPI 0 transparentes, modal aberto com sombra+hairline, tabela com separadores, console limpo, build OK.

### Assinatura curatorial por tema (V19) — _premium-v5.scss
- Pedido: "infinitamente mais premium" em **cada um dos 8 temas** (classico/clean/escuro/galeria/boho/dourado/marmore/esmeralda): cada tema ganha identidade própria, não só troca de variável.
- **Tokens por tema** (`--v19-hi` luz, `--v19-sheen` brilho, `--v19-orn` ornamento, `--v19-scroll` scrollbar, `--v19-sel-bg/col` seleção, `--v19-hairline` hairline header, `--v19-th` cabeçalho de tabela, `--v19-hover-shade` barra hover de linha, `--v19-sb-glow1/2` aurora da sidebar) sob `body[data-tema="..."]` — ex.: dourado `--v19-sel-bg:#c9a227`, boho `#c17f59`, esmeralda `#3cae72`, escuro `#c8a35a`.
- **Aplicações genéricas**: `::selection` tintado por tema; `.card/.painel/.kpi-card/.modal-caixa::after` sheen superior fica `--v19-sheen`; `.painel::before` (ornamento 58×2px topo-esquerda) usa `--v19-orn`; `.btn-gradient` agora `body[data-tema] .btn-gradient` (especificidade (0,2,1) p/ vencer os overrides literais de V17) com `color-mix(accent 55%, --v19-hi)`; `#sidebar .nav-item.ativo` com tint `--v19-hi` por cima do gradiente; `.sidebar` aurora `--v19-sb-glow1/2`; `.header::after` hairline `--v19-hairline`; sombra de hover de cardinalizada por tema; `.modal-caixa` sombra colorida; `th` com `--v19-th`; scrollbar com `--v19-scroll`.
- **Guards**: `prefers-reduced-motion` desliga transitions/animações novas; `[data-high-contrast]` zera os fundos especiais e a sombra do modal.
- Vale nota: todas as `::after/::before` de card já eram usadas (base style.scss ~360 sheen, ~4568 gradiente topo), então a passada é **aditiva** — override de propriedades específicas no `_premium-v5.scss` (importado por último), sem novo layout.
- Validado dev+prod (CDP): 8 temas retornam as 8 variáveis V19 corretas no `getComputedStyle`; sidebar/header/btn-gradient/hairline populados em todos; 0 mojibake no CSS injetado; console limpo; build OK.

### Suite Jest verde no Windows (V20) — commits e suítes destravadas
- **Objetivo**: destravar `npm test` no Windows (binding `@unrs/resolver-binding-win32-x64-msvc` do `unrs-resolver` exigia `VCRUNTIME140.dll` ausente) e corrigir suítes que falhavam. Resultado: **14/14 suítes, 199/199 testes**.
- **Patch executável**: `node_modules/unrs-resolver/index.js` sobrescrito para usar `JsFallbackResolver` (via `require.resolve`) no lugar do binding nativo — `sync`/`async`/`cloneWithOptions`/`clearCache`/etc. **NÃO persiste após `npm install`/`npm ci`** (re-patch manual).
- **`jest.setup.js` reescrito**: mock **IDB funcional** (`indexedDB.open` → `onupgradeneeded`/`onsuccess`; `createObjectStore`; transactions com `put`/`get`/`delete` disparando `req.onsuccess` **e** `tx.oncomplete` — ponto crítico p/ `image-store`); polyfills `TextEncoder`/`TextDecoder` (de `node:util`); `crypto` forçado via `Object.defineProperty` para `require('crypto').webcrypto` (jsdom expõe `crypto` read-only sem `subtle`); stubs `URL.createObjectURL`/`revokeObjectURL`, `Image` (fake que dispara `onload`), canvas `getContext('2d')`/`toDataURL`.
- **Padrões registrados**:
  - Testes de CloudSync precisam `delete global.indexedDB` (`beforeAll`) — esperam rejeição sem IDB; o mock global quebrava isso.
  - Tema padrão é `dourado` desde V17 (commit `0aac69b`), `TEMA_PRINCIPAL='dourado'` — testes antigos esperavam `classico`.
  - `_salvarPin` **hasheia** o PIN (SHA-256, `hashPin` em secure-storage) — testes não podem esperar PIN em texto puro; usar `verificarPin`/`isPinHashed`.
- **Bug de export corrigido**: `main.ts` sobrescreve `module.exports` (último arquivo do concat) e **não** expunha `hashPin`/`verificarPin`/`isPinHashed` → adicionados ao objeto em `src/main.ts:508`. Sem isso `hashPin is not a function` nos testes de configurações.
- **Testes atualizados**: `configuracoes-view` (PIN hasheado + async await + `verificarPin`), `image-store` (`migrar` deduplica strings base64 iguais via Set — os 3 campos iguais → count 1; teste agora usa strings distintas), `themeengine` (`classico`→`dourado`), `portal-cloud-sync-lightbox` (`delete global.indexedDB`).
- **Comando local**: `npx jest --config jest.config.js` (ou `npm test`). Se worker crashar: `--no-collectCoverage --runInBand` (jest.config tem `collectCoverage: true`).
