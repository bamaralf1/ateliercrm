import{n as e,t}from"./vendor-vue-Bx7dbpLB.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),((e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports))((()=>{(function(){window.AtelierCRMTranslations={locale:`pt-BR`,t:function(e){return e}}})()}))();function n(e){return(e||0).toLocaleString(`pt-BR`,{style:`currency`,currency:`BRL`})}function r(e){return e?new Date(e).toLocaleDateString(`pt-BR`):`-`}function i(e){let t=document.getElementById(`toast`);t.textContent=e,t.classList.add(`mostrar`),clearTimeout(window._toastTimeout),window._toastTimeout=setTimeout(()=>t.classList.remove(`mostrar`),2800)}function a(e=`Aguarde...`){document.getElementById(`loadingTexto`).textContent=e,document.getElementById(`loadingOverlay`).classList.add(`ativo`)}function o(){document.getElementById(`loadingOverlay`).classList.remove(`ativo`)}function s(e){document.getElementById(`modalCaixa`).innerHTML=e,document.getElementById(`modalOverlay`).classList.add(`aberto`)}function c(){let e=document.getElementById(`modalOverlay`);e.classList.remove(`aberto`),setTimeout(()=>{e.classList.contains(`aberto`)||(document.getElementById(`modalCaixa`).innerHTML=``)},300)}function l(e){return{disponivel:`disponivel`,disponível:`disponivel`,vendida:`vendida`,reservada:`reservada`,"em exposicao":`exposicao`,"em exposição":`exposicao`}[e]||`disponivel`}function u(e){return{disponivel:`Disponível`,disponível:`Disponível`,vendida:`Vendida`,reservada:`Reservada`,"em exposicao":`Em Exposição`,"em exposição":`Em Exposição`}[e]||e}function d(e,t){let n=`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
    <rect width="400" height="400" fill="${e}"/>
    <text x="50%" y="50%" font-size="130" text-anchor="middle" dominant-baseline="central">${t}</text>
  </svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(n)}`}function f(e){let t=new Date,n=[];for(let e=5;e>=0;e--){let r=new Date(t.getFullYear(),t.getMonth()-e,1);n.push({ano:r.getFullYear(),mes:r.getMonth(),rotulo:r.toLocaleDateString(`pt-BR`,{month:`short`}),total:0})}return e.forEach(e=>{let t=new Date(e.dataCadastro||e.criadoEm),r=n.find(e=>e.ano===t.getFullYear()&&e.mes===t.getMonth());r&&r.total++}),n}function p(e){let t=452/e.length,n=Math.max(1,...e.map(e=>e.total)),r=``;return e.forEach((e,i)=>{let a=e.total/n*132,o=i*t+(t-36)/2,s=152-a;r+=`
      <rect class="barra-grafico" x="${o}" y="${s}" width="36" height="${Math.max(a,2)}" rx="4"></rect>
      <text class="grafico-valor" x="${o+36/2}" y="${s-6}" text-anchor="middle">${e.total}</text>
      <text class="grafico-label" x="${o+36/2}" y="172" text-anchor="middle">${e.rotulo}</text>
    `}),`
    <svg class="grafico-svg" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gráfico de obras criadas por mês">
      <line x1="0" y1="152" x2="480" y2="152" stroke="var(--border)" stroke-width="1"></line>
      ${r}
    </svg>
  `}function m(e){if(!e.length)return[];let t={};e.forEach(e=>{e.tecnica&&(t[e.tecnica]=(t[e.tecnica]||0)+1)});let n=e.length;return Object.entries(t).map(([e,t])=>({tecnica:e,quantidade:t,porcentagem:t/n*100})).sort((e,t)=>t.quantidade-e.quantidade).slice(0,5)}function h(e){if(!e.length)return 0;let t=new Date,n=t.getMonth(),r=t.getFullYear(),i=n===0?11:n-1,a=n===0?r-1:r,o=e.filter(e=>{let t=new Date(e.dataCadastro||e.criadoEm);return t.getMonth()===n&&t.getFullYear()===r}).length,s=e.filter(e=>{let t=new Date(e.dataCadastro||e.criadoEm);return t.getMonth()===i&&t.getFullYear()===a}).length;return s===0?o>0?100:0:(o-s)/s*100}function g({titulo:e,subtitulo:t,icone:n,colecao:r,dataStore:i,colunas:a,renderLinha:o,textoBotao:s}){let c=i.listar(r);return`
    <div class="view-cabecalho">
      <div>
        <h2>${e}</h2>
        <p class="subtitulo">${t}</p>
      </div>
      <button class="btn-primario" data-abrir-modal="${r}">✚ ${s}</button>
    </div>
    ${c.length?`
    <div class="tabela-wrapper">
      <table>
        <thead>
          <tr>${a.map(e=>`<th>${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          ${c.map(o).join(``)}
        </tbody>
      </table>
    </div>
  `:`
    <div class="tabela-wrapper">
      <div class="estado-vazio">
        <div class="icone-vazio">${n}</div>
        <p>Nenhum registro em "${e}" ainda.</p>
      </div>
    </div>
  `}
  `}function _(e){return e?e.charAt(0).toUpperCase()+e.slice(1):`-`}function v(e){return{pendente:`pendente`,paga:`paga`,cancelada:`cancelada`,negociacao:`negociacao`,"em negociação":`negociacao`,"em negociações":`negociacao`}[e]||`pendente`}function y(e){return{pendente:`Pendente`,paga:`Paga`,cancelada:`Cancelada`,negociacao:`Negociação`,"em negociação":`Em Negociação`,"em negociações":`Em Negociação`}[e]||e}function b(e){let t=document.createElement(`canvas`);t.width=200,t.height=200;let n=t.getContext(`2d`);return n.fillStyle=`white`,n.fillRect(0,0,200,200),n.fillStyle=`black`,n.font=`14px sans-serif`,n.textAlign=`center`,n.fillText(`QR`,200/2,200/2-10),n.fillText(e.length>20?e.slice(0,20)+`...`:e,200/2,120),t.toDataURL()}function x(e,t){return{obras:[{tipo:`text`,nome:`titulo`,rotulo:`Título *`,obrigatorio:!0},{tipo:`select`,nome:`tecnica`,rotulo:`Técnica *`,opcoes:[`óleo`,`aquarela`,`escultura`,`outra`],obrigatorio:!0},{tipo:`number`,nome:`ano`,rotulo:`Ano`},{tipo:`dimensoes`,nome:`dimensoes`,rotulo:`Dimensões (cm)`},{tipo:`textarea`,nome:`descricao`,rotulo:`Descrição`},{tipo:`number`,nome:`preco`,rotulo:`Preço (R$) *`,obrigatorio:!0},{tipo:`select`,nome:`status`,rotulo:`Status`,opcoes:[`disponível`,`reservada`,`vendida`,`em exposição`]},{tipo:`text`,nome:`serie`,rotulo:`Série`},{tipo:`file`,nome:`imagem`,rotulo:`Imagem`}],clientes:[{tipo:`text`,nome:`nome`,rotulo:`Nome *`,obrigatorio:!0},{tipo:`email`,nome:`email`,rotulo:`E-mail`},{tipo:`tel`,nome:`telefone`,rotulo:`Telefone`},{tipo:`text`,nome:`endereco`,rotulo:`Endereço`},{tipo:`textarea`,nome:`notas`,rotulo:`Notas`}],vendas:[{tipo:`select`,nome:`obraId`,rotulo:`Obra *`,opcoes:(t.listar(`obras`)||[]).filter(e=>e.status!==`vendida`).map(e=>({valor:e.id,rotulo:e.titulo})),obrigatorio:!0},{tipo:`select`,nome:`clienteId`,rotulo:`Cliente *`,opcoes:(t.listar(`clientes`)||[]).map(e=>({valor:e.id,rotulo:e.nome})),obrigatorio:!0},{tipo:`number`,nome:`valorTotal`,rotulo:`Valor Total *`,obrigatorio:!0},{tipo:`select`,nome:`formaPagamento`,rotulo:`Forma de Pagamento`,opcoes:[`à vista`,`cartão`,`boleto`,`pix`,`transferência`,`parcelado`]},{tipo:`select`,nome:`status`,rotulo:`Status`,opcoes:[`pendente`,`paga`,`cancelada`,`em negociação`]}],certificados:[{tipo:`select`,nome:`obraId`,rotulo:`Obra *`,opcoes:(t.listar(`obras`)||[]).map(e=>({valor:e.id,rotulo:e.titulo})),obrigatorio:!0},{tipo:`select`,nome:`edicaoTipo`,rotulo:`Tipo de Edição`,opcoes:[`unica`,`edicao_limitada`,`prova_de_artista`,`reproducao`]},{tipo:`text`,nome:`local`,rotulo:`Local de Criação`}]}[e]||[]}function S(e){let t=e.obrigatorio?` required`:``;if(e.tipo===`select`){let n=(e.opcoes||[]).map(e=>`<option value="${typeof e==`object`?e.valor:e}">${typeof e==`object`?e.rotulo:e}</option>`).join(``);return`<div class="campo-form"><label>${e.rotulo}</label><select id="campo_${e.nome}"${t}>${n}</select></div>`}return e.tipo===`textarea`?`<div class="campo-form"><label>${e.rotulo}</label><textarea id="campo_${e.nome}"${t}></textarea></div>`:e.tipo===`dimensoes`?`<div class="campo-form"><label>${e.rotulo}</label><div class="form-linha">
      <input type="number" id="campoAltura" placeholder="Altura">
      <input type="number" id="campoLargura" placeholder="Largura">
      <input type="number" id="campoProfundidade" placeholder="Profundidade">
    </div></div>`:e.tipo===`file`?`<div class="campo-form"><label>${e.rotulo}</label><input type="file" id="campo_${e.nome}" accept="image/*"${t}></div>`:`<div class="campo-form"><label>${e.rotulo}</label><input type="${e.tipo}" id="campo_${e.nome}"${t}></div>`}function C(e,t,n){let r=x(e,t);s(`
    <h3>Novo ${e.charAt(0).toUpperCase()+e.slice(1)}</h3>
    <form id="formGenerico">
      ${r.map(S).join(``)}
      <div class="modal-acoes">
        <button type="button" class="btn-secundario" id="btnCancelarGenerico">Cancelar</button>
        <button type="submit" class="btn-primario">Salvar</button>
      </div>
    </form>
  `),document.getElementById(`btnCancelarGenerico`).addEventListener(`click`,c),document.getElementById(`formGenerico`).addEventListener(`submit`,a=>{a.preventDefault();let o={};r.forEach(e=>{e.tipo===`dimensoes`?(o.altura=Number(document.getElementById(`campoAltura`)?.value)||0,o.largura=Number(document.getElementById(`campoLargura`)?.value)||0,o.profundidade=Number(document.getElementById(`campoProfundidade`)?.value)||0):e.tipo===`file`||(o[e.nome]=document.getElementById(`campo_`+e.nome)?.value||``)}),t.adicionar(e,o),i(`${e.charAt(0).toUpperCase()+e.slice(1)} cadastrado com sucesso!`),c(),n.navegar(e)})}var w=class{constructor(){this.chave=`atelier_crm_dados`,this.dados=this.carregar();let e=!1;[`materiais`,`fornecedores`,`consumos`,`contatosProfissionais`,`interacoes`,`eventos`].forEach(t=>{this.dados[t]||(this.dados[t]=[],e=!0)}),this.dados.config&&!this.dados.config.precificador&&(this.dados.config.precificador={valorHora:60,multiplicadorExperiencia:1.5,metaMensal:1e4,metaAnual:12e4,metaInicio:new Date().toISOString().slice(0,7)},e=!0),this.dados.entradasDiario||(this.dados.entradasDiario=[],e=!0),this.dados.etapasProcesso||(this.dados.etapasProcesso=[],e=!0),this.dados.config&&this.dados.config.idioma===void 0&&(this.dados.config.idioma=`pt-BR`,e=!0),this.dados.config&&this.dados.config.altoContraste===void 0&&(this.dados.config.altoContraste=!1,e=!0),this.dados.config&&this.dados.config.tamanhoFonte===void 0&&(this.dados.config.tamanhoFonte=`medio`,e=!0),this.dados.config&&!this.dados.config.precificadorRegras&&(this.dados.config.precificadorRegras=[],e=!0),this.dados.config&&!this.dados.config.moedaPadrao&&(this.dados.config.moedaPadrao=`BRL`,e=!0),this.dados.config&&!this.dados.config.taxasCambio&&(this.dados.config.taxasCambio={USD:5,EUR:5.5,GBP:6.3},e=!0),this.dados.config&&this.dados.config.pin===void 0&&(this.dados.config.pin=``,e=!0),this.dados.config&&this.dados.config.autoLock===void 0&&(this.dados.config.autoLock=!1,e=!0),this.dados.config&&this.dados.config.tourCompleted===void 0&&(this.dados.config.tourCompleted=!1,e=!0),this.dados.portais||(this.dados.portais=[],e=!0),this.dados.encomendas&&this.dados.encomendas.length>0&&!this.dados.encomendas[0].atualizacoes&&(this.dados.encomendas.forEach(e=>{e.atualizacoes=e.atualizacoes||[],e.valor=e.valor||0,e.imagens=e.imagens||[],e.criadoEm=e.criadoEm||new Date().toISOString()}),e=!0),this.dados.obras&&this.dados.obras.length>0&&!this.dados.obras[0].imagens&&(this.dados.obras.forEach(e=>{e.imagens=[],e.imagem&&!e.imagem.includes(`svg+xml`)&&(e.imagens.push(e.imagem),e.imagemDestacada=e.imagem)}),e=!0),e&&this.salvar()}estruturaPadrao(){return{obras:[],clientes:[],vendas:[],certificados:[],referencias:[],encomendas:[],exposicoes:[],transacoes:[],materiais:[],fornecedores:[],consumos:[],contatosProfissionais:[],interacoes:[],eventos:[],entradasDiario:[],etapasProcesso:[],portais:[],config:{artista:{nome:`Meu Ateliê`,email:``,telefone:``,assinatura:``},tema:`classico`,contadorRecibos:{},contadorPropostas:{},contadorCertificados:{},textoGarantia:`Este documento certifica a autenticidade da obra descrita acima, de autoria exclusiva do artista identificado neste recibo. A obra é entregue em perfeito estado de conservação, livre de quaisquer ônus. Reprodução, cópias ou uso comercial da imagem sem autorização expressa do artista são vedados.`,precificador:{valorHora:60,multiplicadorExperiencia:1.5,metaMensal:1e4,metaAnual:12e4,metaInicio:new Date().toISOString().slice(0,7)},idioma:`pt-BR`,altoContraste:!1,tamanhoFonte:`medio`,pin:``,autoLock:!1,tourCompleted:!1}}}carregar(){let e=localStorage.getItem(this.chave);if(e)try{return JSON.parse(e)}catch(e){console.error(`Erro ao ler dados salvos, recriando estrutura.`,e)}let t=this.estruturaPadrao();return this.dados=t,this.popularExemplos(),this.salvar(),this.dados}salvar(){try{localStorage.setItem(this.chave,JSON.stringify(this.dados))}catch(e){e.name===`QuotaExceededError`||e.code===22?i(`Armazenamento local cheio. Exporte um backup e limpe dados antigos para continuar salvando.`,`erro`):i(`Erro ao salvar dados: `+e.message,`erro`)}}listar(e){return this.dados[e]||[]}adicionar(e,t){return t.id=`id_`+Date.now()+`_`+Math.floor(Math.random()*1e3),t.criadoEm=t.criadoEm||new Date().toISOString(),this.dados[e].push(t),this.salvar(),t}atualizar(e,t,n){let r=this.dados[e].find(e=>e.id===t);return r&&(Object.assign(r,n),this.salvar()),r}remover(e,t){this.dados[e]=this.dados[e].filter(e=>e.id!==t),this.salvar()}buscarPorId(e,t){return this.dados[e].find(e=>e.id===t)}popularExemplos(){let e=new Date,t=t=>{let n=new Date(e);return n.setMonth(n.getMonth()-t),n.toISOString()};this.dados.obras=[{id:`obra_ex_1`,titulo:`Marinha ao Entardecer`,tecnica:`óleo`,dimensoes:{altura:60,largura:80,profundidade:0},ano:2024,descricao:`Estudo de luz sobre o mar ao entardecer, com pinceladas soltas capturando o movimento das ondas e o reflexo dourado do sol.`,preco:3200,status:`disponível`,imagem:d(`#d97757`,`🌅`),dataCadastro:t(1),criadoEm:t(1),serie:`Paisagens Marinhas`,custoMateriais:420,horasTrabalho:28,historicoPrecos:[{preco:2800,data:`2025-06-01`,motivo:`Ajuste inicial`},{preco:3200,data:`2025-09-15`,motivo:`Reajuste por demanda`}],imagens:[d(`#d97757`,`🌅`),d(`#e8a060`,`🌊`)],imagemDestacada:d(`#d97757`,`🌅`)},{id:`obra_ex_2`,titulo:`Autorretrato em Ocre`,tecnica:`óleo`,dimensoes:{altura:50,largura:40,profundidade:0},ano:2023,descricao:`Autorretrato em tons terrosos, explorando contrastes de luz e sombra sobre o rosto.`,preco:2100,status:`vendida`,imagem:d(`#8b5e3c`,`🧑‍🎨`),dataCadastro:t(5),criadoEm:t(5),serie:``,custoMateriais:180,horasTrabalho:16,historicoPrecos:[{preco:1500,data:`2024-10-01`,motivo:`Preço inicial`},{preco:1800,data:`2025-02-10`,motivo:`Ajuste`},{preco:2100,data:`2025-06-20`,motivo:`Valorização`}],imagens:[d(`#8b5e3c`,`🧑‍🎨`)],imagemDestacada:d(`#8b5e3c`,`🧑‍🎨`)},{id:`obra_ex_3`,titulo:`Jardim das Aquarelas`,tecnica:`aquarela`,dimensoes:{altura:30,largura:40,profundidade:0},ano:2024,descricao:`Composição floral em técnica úmida sobre úmido, valorizando a transparência da aquarela.`,preco:850,status:`reservada`,imagem:d(`#e8a0bf`,`🌸`),dataCadastro:t(2),criadoEm:t(2),serie:`Jardins`,custoMateriais:90,horasTrabalho:8,imagens:[d(`#e8a0bf`,`🌸`)],imagemDestacada:d(`#e8a0bf`,`🌸`)},{id:`obra_ex_4`,titulo:`Ipê Amarelo`,tecnica:`aquarela`,dimensoes:{altura:25,largura:35,profundidade:0},ano:2025,descricao:`Estudo rápido de um ipê florido, feito em plein air durante o início da primavera.`,preco:620,status:`em exposição`,imagem:d(`#f2c14e`,`🌼`),dataCadastro:t(0),criadoEm:t(0),serie:`Jardins`,custoMateriais:70,horasTrabalho:6,imagens:[d(`#f2c14e`,`🌼`)],imagemDestacada:d(`#f2c14e`,`🌼`)},{id:`obra_ex_5`,titulo:`Forma em Repouso`,tecnica:`escultura`,dimensoes:{altura:45,largura:22,profundidade:20},ano:2023,descricao:`Escultura em bronze fundido, explorando curvas orgânicas e o equilíbrio entre volume e vazio.`,preco:5400,status:`disponível`,imagem:d(`#7a7a7a`,`🗿`),dataCadastro:t(4),criadoEm:t(4),serie:``,custoMateriais:1200,horasTrabalho:60,historicoPrecos:[{preco:4800,data:`2024-08-01`,motivo:`Preço inicial`},{preco:5400,data:`2025-03-10`,motivo:`Reajuste anual`}],imagens:[d(`#7a7a7a`,`🗿`)],imagemDestacada:d(`#7a7a7a`,`🗿`)}],this.dados.clientes=[{id:`cli_ex_1`,nome:`Fernanda Alcântara`,email:`fernanda@exemplo.com`,telefone:`(21) 99999-0001`,endereco:`Rua das Palmeiras, 120 - Rio Bonito/RJ`,notas:`Colecionadora frequente, prefere obras em aquarela com temas florais.`,tags:[`colecionadora`,`aquarela`],aquisicoes:1,criadoEm:t(3)},{id:`cli_ex_2`,nome:`Ricardo Bittencourt`,email:`ricardo.bit@exemplo.com`,telefone:`(21) 98888-0002`,endereco:`Av. Atlântica, 500 - Rio de Janeiro/RJ`,notas:`Interessado em esculturas para decoração de escritório.`,tags:[`interessado`,`escultura`],aquisicoes:0,criadoEm:t(1)}],this.dados.vendas=[{id:`venda_ex_1`,numeroRecibo:`REC-`+e.getFullYear()+`-001`,obraId:`obra_ex_3`,clienteId:`cli_ex_1`,precoFinal:850,valorTotal:850,data:t(2),dataVenda:t(2),formaPagamento:`à vista`,status:`paga`,criadoEm:t(2)}],this.dados.config.contadorRecibos[e.getFullYear()]=1,this.dados.encomendas=[{id:`enc_ex_1`,clienteNome:`Fernanda Alcântara`,clienteEmail:`fernanda@exemplo.com`,clienteTelefone:`(21) 99999-0001`,descricao:`Retrato em aquarela 40x60cm — jardim particular`,prazo:new Date(e.getFullYear(),e.getMonth()+2,15).toISOString(),status:`em_andamento`,valor:1200,atualizacoes:[{data:new Date(e.getFullYear(),e.getMonth(),10).toISOString(),status:`criado`,mensagem:`Pedido recebido, aguardando referências fotográficas.`},{data:new Date(e.getFullYear(),e.getMonth(),18).toISOString(),status:`em_andamento`,mensagem:`Esboço inicial aprovado. Iniciando camadas de cor.`}],imagens:[],criadoEm:t(0)},{id:`enc_ex_2`,clienteNome:`Ricardo Bittencourt`,clienteEmail:`ricardo.bit@exemplo.com`,clienteTelefone:`(21) 98888-0002`,descricao:`Escultura em bronze 35cm — figura abstrata`,prazo:new Date(e.getFullYear(),e.getMonth()+4,1).toISOString(),status:`criado`,valor:3500,atualizacoes:[{data:new Date(e.getFullYear(),e.getMonth(),5).toISOString(),status:`criado`,mensagem:`Pedido registrado. Orçamento aprovado.`}],imagens:[],criadoEm:t(0)}],this.dados.portais=[],this.dados.certificados=[{id:`cert_ex_1`,numeroSerie:`ART-`+e.getFullYear()+`-001`,obraId:`obra_ex_3`,tituloObra:`Jardim das Aquarelas`,tecnica:`aquarela`,dimensoesTexto:`30 x 40 cm`,ano:2024,edicaoTipo:`unica`,edicaoAtual:null,edicaoTotal:null,local:`Rio Bonito/RJ`,dataEmissao:t(2),imagem:d(`#e8a0bf`,`🌸`),criadoEm:t(2)}],this.dados.config.contadorCertificados[e.getFullYear()]=1,this.dados.referencias=[{id:`ref_ex_1`,tipo:`imagem`,imagem:d(`#ffcda3`,`🌅`),titulo:`Paleta de pôr do sol`,nota:``,url:``,tags:[`cor`,`laranja`,`quente`],categoria:`cor`,obraVinculada:`obra_ex_1`,criadoEm:t(2)},{id:`ref_ex_2`,tipo:`nota`,imagem:``,titulo:`Ideia para série floral`,nota:`Explorar aquarela úmida sobre úmido com flores tropicais...`,url:``,tags:[`aquarela`,`jardim`,`ideia`],categoria:`época`,obraVinculada:`obra_ex_3`,criadoEm:t(3)},{id:`ref_ex_3`,tipo:`link`,imagem:``,titulo:`Referência de luz - pintura impressionista`,nota:``,url:`https://upload.wikimedia.org/wikipedia/commons/6/62/Claude_Monet%2C_Impression%2C_soleil_levant.jpg`,tags:[`artista`,`luz`,`impressionismo`],categoria:`artista`,obraVinculada:``,criadoEm:t(4)}];let n=new Date,r=e=>{let t=new Date(n);return t.setDate(t.getDate()-e),t.toISOString()},i=e=>{let t=new Date(n);return t.setDate(t.getDate()-e),t.toISOString().slice(0,10)};this.dados.entradasDiario=[{id:`dia_ex_7`,data:r(7),humor:4,oQueTrabalhou:`<p>Finalizei a camada de velatura...</p>`,obrasTrabalhadas:[`obra_ex_1`],fotos:[],horasTrabalhadas:4.5,bloqueios:``,avancos:`Velatura do céu concluída com sucesso`,descobertas:`Misturar um toque de alizarim crimson no azul ultramar dá um violeta sutil incrível para as nuvens`,criadoEm:r(7)},{id:`dia_ex_6`,data:r(6),humor:3,oQueTrabalhou:`<p>Dia de organização do ateliê...</p>`,obrasTrabalhadas:[`obra_ex_4`],fotos:[],horasTrabalhadas:3,bloqueios:`Dificuldade em capturar a luz...`,avancos:`A organização trouxe clareza mental.`,descobertas:`Usar máscara líquida nos brancos...`,criadoEm:r(6)},{id:`dia_ex_5`,data:r(5),humor:5,oQueTrabalhou:`<p>Dia intenso na "Forma em Repouso"...</p>`,obrasTrabalhadas:[`obra_ex_5`],fotos:[],horasTrabalhadas:7,bloqueios:``,avancos:`Pátina verde alcançou o tom ideal!`,descobertas:`Aplicar a pátina com pincel de cerdas macias...`,criadoEm:r(5)},{id:`dia_ex_4`,data:r(4),humor:2,oQueTrabalhou:`<p>Dia frustrante. A tela grande...</p>`,obrasTrabalhadas:[],fotos:[],horasTrabalhadas:2,bloqueios:`Chassis empenado por causa da chuva.`,avancos:``,descobertas:`Preciso comprar um desumidificador...`,criadoEm:r(4)},{id:`dia_ex_3`,data:r(3),humor:4,oQueTrabalhou:`<p>Voltei para a aquarela "Jardim das Aquarelas"...</p>`,obrasTrabalhadas:[`obra_ex_3`],fotos:[],horasTrabalhadas:5,bloqueios:``,avancos:`Cliente visitou o ateliê...`,descobertas:`Misturar violeta de cobalto com siena natural...`,criadoEm:r(3)},{id:`dia_ex_2`,data:r(2),humor:1,oQueTrabalhou:`<p>Dia administrativo...</p>`,obrasTrabalhadas:[],fotos:[],horasTrabalhadas:1.5,bloqueios:`Bloqueio criativo total.`,avancos:`Pelo menos a papelada está em dia.`,descobertas:`Dias administrativos são necessários...`,criadoEm:r(2)},{id:`dia_ex_1`,data:r(1),humor:5,oQueTrabalhou:`<p>Dia mais produtivo da semana...</p>`,obrasTrabalhadas:[`obra_ex_4`],fotos:[],horasTrabalhadas:8,bloqueios:``,avancos:`Ipê Amarelo finalizado!`,descobertas:`Usar um palito de dentes para respingar...`,criadoEm:r(1)}],this.dados.etapasProcesso=[{id:`proc_ex_1`,obraId:`obra_ex_4`,etapas:[{id:`etp_1`,titulo:`Sketch inicial`,data:i(14),descricao:`Desenho a lápis...`,notasTecnicas:`Lápis 2B, papel Canson 180g`,foto:``,videoLink:``},{id:`etp_2`,titulo:`Estudo de cor`,data:i(12),descricao:`Paleta restrita...`,notasTecnicas:`Aquarela Windsor & Newton`,foto:``,videoLink:``},{id:`etp_3`,titulo:`Primeira camada (fundos)`,data:i(10),descricao:`Lavagem úmida...`,notasTecnicas:`Pincel chato nº 14`,foto:``,videoLink:``},{id:`etp_4`,titulo:`Camadas intermediárias`,data:i(7),descricao:`Construção das formas...`,notasTecnicas:`Pincel redondo nº 6`,foto:``,videoLink:``},{id:`etp_5`,titulo:`Detalhamento`,data:i(4),descricao:`Detalhes finos...`,notasTecnicas:`Pincel liner nº 1`,foto:``,videoLink:``},{id:`etp_6`,titulo:`Finalização`,data:i(1),descricao:`Assinatura e ajustes finais...`,notasTecnicas:`Caneta nanquim`,foto:``,videoLink:``}],criadoEm:r(14)},{id:`proc_ex_2`,obraId:`obra_ex_1`,etapas:[{id:`etp_2_1`,titulo:`Sketch inicial`,data:i(45),descricao:`Composição em carvão...`,notasTecnicas:`Carvão vegetal`,foto:``,videoLink:``},{id:`etp_2_2`,titulo:`Imprimatura`,data:i(42),descricao:`Camada fina de acrílico...`,notasTecnicas:`Acrílico transparente`,foto:``,videoLink:``},{id:`etp_2_3`,titulo:`Primeira camada a óleo`,data:i(38),descricao:`Manchas grossas...`,notasTecnicas:`Óleo Windsor & Newton`,foto:``,videoLink:``},{id:`etp_2_4`,titulo:`Velaturas`,data:i(25),descricao:`Camadas finas...`,notasTecnicas:`Meio de velatura em gel`,foto:``,videoLink:``},{id:`etp_2_5`,titulo:`Detalhamento das ondas`,data:i(15),descricao:`Estudo das espumas...`,notasTecnicas:`Pincel redondo nº 4`,foto:``,videoLink:``}],criadoEm:r(45)}],this.dados.transacoes=[{id:`trans_ex_1`,tipo:`entrada`,descricao:`Venda - Jardim das Aquarelas`,valor:850,data:t(2),criadoEm:t(2)},{id:`trans_ex_2`,tipo:`saida`,descricao:`Compra de materiais`,valor:220,data:t(1),criadoEm:t(1)}],this.dados.materiais=[{id:`mat_1`,nome:`Tinta Óleo Azul Ultramar`,categoria:`tintas`,subcategoria:`óleo`,marca:`Windsor & Newton`,quantidade:500,unidade:`ml`,quantidadeMinima:100,local:`Prateleira A3`,dataAquisicao:`2025-01-15`,validade:`2027-01-15`,precoUnitario:45,foto:``,notas:`Tom indispensável para céus e águas`},{id:`mat_2`,nome:`Tela de Algodão 50×70`,categoria:`superficies`,subcategoria:`tela`,marca:`Atlantis`,quantidade:8,unidade:`un`,quantidadeMinima:3,local:`Cavalete 2`,dataAquisicao:`2025-03-10`,validade:``,precoUnitario:38,foto:``,notas:`Tela tripla priming`},{id:`mat_3`,nome:`Pincel Chato Nº 12`,categoria:`ferramentas`,subcategoria:`pincel`,marca:`Tigre`,quantidade:5,unidade:`un`,quantidadeMinima:2,local:`Porta-pincéis`,dataAquisicao:`2025-02-20`,validade:``,precoUnitario:22,foto:``,notas:`Cerdas sintéticas`},{id:`mat_4`,nome:`Papel Aquarela 300g A3`,categoria:`superficies`,subcategoria:`papel`,marca:`Canson`,quantidade:15,unidade:`un`,quantidadeMinima:5,local:`Gaveta B1`,dataAquisicao:`2025-04-05`,validade:``,precoUnitario:12,foto:``,notas:`Granulação média`},{id:`mat_5`,nome:`Tinta Acrílica Dourada`,categoria:`tintas`,subcategoria:`acrílico`,marca:`Acrilex`,quantidade:200,unidade:`ml`,quantidadeMinima:50,local:`Prateleira A1`,dataAquisicao:`2025-05-01`,validade:`2026-05-01`,precoUnitario:18,foto:``,notas:`Acabamento metálico`},{id:`mat_6`,nome:`Moldura Clássica 30×40`,categoria:`molduras`,subcategoria:`clássica`,marca:`Molduraz`,quantidade:2,unidade:`un`,quantidadeMinima:4,local:`Depósito`,dataAquisicao:`2025-06-10`,validade:``,precoUnitario:65,foto:``,notas:`â\xA0ï¸ ABAIXO DO MÍNIMO — repor urgente!`}],this.dados.fornecedores=[{id:`forn_1`,nome:`Casa do Artista`,contato:`(11) 99999-0001`,email:`vendas@casaartista.com.br`,especialidade:`Tintas e pincéis`,avaliacao:4,notas:`Bom prazo de entrega.`,historicoCompras:[{data:`2025-01-15`,valor:320,itens:`Tintas diversas`}]},{id:`forn_2`,nome:`Telas & Molduras Ltda`,contato:`(21) 98888-0002`,email:`pedidos@telasmolduras.com`,especialidade:`Telas, papéis e molduras`,avaliacao:5,notas:`Qualidade excepcional.`,historicoCompras:[{data:`2025-02-20`,valor:450,itens:`Telas 50×70`}]}],this.dados.consumos=[{id:`cons_1`,materialId:`mat_1`,obraId:`obra_ex_1`,quantidade:120,data:`2025-06-10`,notas:`Camada de fundo do céu`},{id:`cons_2`,materialId:`mat_1`,obraId:`obra_ex_1`,quantidade:80,data:`2025-06-12`,notas:`Reflexos do mar`},{id:`cons_3`,materialId:`mat_2`,obraId:`obra_ex_1`,quantidade:1,data:`2025-06-05`,notas:`Suporte da obra`}],this.dados.contatosProfissionais=[{id:`cont_ex_1`,nome:`Ana Luísa Martins`,categoria:`galerista`,instituicao:`Galeria Martins & Associados`,cargo:`Diretora`,contato:`(11) 99999-1001`,email:`ana@martinsgaleria.com.br`,nivelRelacionamento:4,ultimoContato:`2025-08-10`,estagio:`em_conversa`},{id:`cont_ex_2`,nome:`Dr. Ricardo Tavares`,categoria:`curador`,instituicao:`Museu de Arte Moderna - SP`,cargo:`Curador-Chefe`,contato:`(11) 98888-2002`,email:`rtavares@mam.org.br`,nivelRelacionamento:2,ultimoContato:`2025-09-05`,estagio:`primeira_aproximacao`},{id:`cont_ex_3`,nome:`Carla Bergman`,categoria:`critico`,instituicao:`Arte & Crítica Magazine`,cargo:`Editora de Arte`,contato:`(21) 97777-3003`,email:`carla@artecriticamag.com.br`,nivelRelacionamento:1,ultimoContato:`2025-09-20`,estagio:`novo_contato`},{id:`cont_ex_4`,nome:`Felipe Nogueira`,categoria:`artista`,instituicao:`Coletivo Atelier Aberto`,cargo:`Artista Plástico`,contato:`(31) 96666-4004`,email:`felipe@coletivoatelier.com.br`,nivelRelacionamento:5,ultimoContato:`2025-09-28`,estagio:`colaboracao_consolidada`},{id:`cont_ex_5`,nome:`Marta Silveira`,categoria:`colecionador`,cargo:`Colecionadora`,contato:`(21) 95555-5005`,email:`marta.silveira@email.com`,nivelRelacionamento:3,ultimoContato:`2025-09-15`,estagio:`parceria_ativa`,vip:!0}],this.dados.interacoes=[{id:`int_ex_1`,contatoId:`cont_ex_1`,data:`2025-08-10`,tipo:`reuniao`,resumo:`Primeira reunião presencial...`,sentimento:`positivo`,followUp:!0,followUpNotas:`Enviar fotos`,anexos:[]},{id:`int_ex_2`,contatoId:`cont_ex_1`,data:`2025-09-01`,tipo:`email`,resumo:`Envio de portfólio...`,sentimento:`positivo`,followUp:!1,followUpNotas:``,anexos:[]},{id:`int_ex_3`,contatoId:`cont_ex_4`,data:`2025-09-28`,tipo:`visita`,resumo:`Visita ao ateliê do Felipe...`,sentimento:`positivo`,followUp:!0,followUpNotas:`Definir cronograma`,anexos:[]}],this.dados.eventos=[{id:`evt_ex_1`,nome:`SP-Arte 2026`,tipo:`feira`,dataInscricao:`2025-10-01`,dataEvento:`2026-04-15`,dataFim:`2026-04-19`,status:`inscrito`,resultado:``,investimento:3500,retorno:0,documentacao:[`Portfolio.pdf`,`Release`],obrasEnviadas:[`obra_ex_1`,`obra_ex_5`],notas:`Maior feira de arte da América Latina.`},{id:`evt_ex_2`,nome:`Edital Funarte Artes Visuais 2026`,tipo:`edital`,dataInscricao:`2025-11-15`,dataEvento:`2026-06-01`,dataFim:`2026-12-31`,status:`pesquisando`,investimento:0,retorno:0,documentacao:[],obrasEnviadas:[],notas:`Edital federal para circulação de exposição.`}]}exportarBackup(){a(`Exportando backup...`);let e=JSON.stringify(this.dados,null,2),t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`),i=new Date().toISOString().replace(/[:.]/g,`-`);r.href=n,r.download=`atelier-crm-backup-${i}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n),o(),this.salvarHistoricoExport(`completo`,this.dados)}exportarColecao(e){if(!this.dados[e])return console.error(`Coleção não encontrada:`,e),!1;let t={[e]:this.dados[e],exportadoEm:new Date().toISOString(),versao:`1.0`},n=JSON.stringify(t,null,2),r=new Blob([n],{type:`application/json`}),i=URL.createObjectURL(r),a=document.createElement(`a`),o=new Date().toISOString().replace(/[:.]/g,`-`);return a.href=i,a.download=`atelier-crm-${e}-${o}.json`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i),this.salvarHistoricoExport(e,t),!0}salvarHistoricoExport(e,t){let n=JSON.parse(localStorage.getItem(`atelier-export-history`)||`[]`);n.unshift({tipo:e,data:new Date().toISOString(),tamanho:JSON.stringify(t).length}),n.length>10&&n.pop(),localStorage.setItem(`atelier-export-history`,JSON.stringify(n))}obterHistoricoExport(){return JSON.parse(localStorage.getItem(`atelier-export-history`)||`[]`)}importarBackup(e){try{let t=JSON.parse(e);if(typeof t!=`object`||!t)throw Error(`Formato inválido: esperado objeto`);let n=[`obras`,`clientes`,`vendas`,`certificados`,`referencias`,`pedidos`,`exposicoes`,`transacoes`,`materiais`,`fornecedores`,`consumicoes`,`contatos`,`interacoes`,`eventos`,`diario`,`processos`,`config`].some(e=>e in t);return n?this.dados=t:Object.keys(t).forEach(e=>{e!==`exportadoEm`&&e!==`versao`&&(this.dados[e]=t[e])}),this.salvar(),{sucesso:!0,tipo:n?`completo`:`parcial`}}catch(e){return{sucesso:!1,erro:e.message}}}previewImport(e){try{let t=JSON.parse(e),n={valido:!0,tipo:`completo`,colecoes:[]},r=[`obras`,`clientes`,`vendas`,`certificados`,`referencias`,`pedidos`,`exposicoes`,`transacoes`,`materiais`,`fornecedores`,`consumicoes`,`contatos`,`interacoes`,`eventos`,`diario`,`processos`,`config`];return r.some(e=>e in t)?n.colecoes=r.filter(e=>e in t).map(e=>({nome:e,quantidade:Array.isArray(t[e])?t[e].length:Object.keys(t[e]).length})):(n.tipo=`parcial`,n.colecoes=Object.keys(t).filter(e=>e!==`exportadoEm`&&e!==`versao`).map(e=>({nome:e,quantidade:Array.isArray(t[e])?t[e].length:Object.keys(t[e]).length}))),n}catch(e){return{valido:!1,erro:e.message}}}},T=class{constructor(){this._eventos={}}on(e,t){return this._eventos[e]||(this._eventos[e]=[]),this._eventos[e].push(t),()=>this.off(e,t)}off(e,t){this._eventos[e]&&(this._eventos[e]=this._eventos[e].filter(e=>e!==t))}emitir(e,...t){(this._eventos[e]||[]).forEach(e=>e(...t))}},ee=class{constructor(){this.atividades=this.carregarAtividades()}carregarAtividades(){try{let e=localStorage.getItem(`atelier-activities`);return e?JSON.parse(e):[]}catch{return[]}}salvarAtividades(){localStorage.setItem(`atelier-activities`,JSON.stringify(this.atividades.slice(0,50)))}registrar(e,t,n,r=`atualizacao`){let i={id:Date.now().toString()+Math.random().toString(36).substr(2,9),tipo:e,titulo:t,detalhes:n,timestamp:new Date,badge:r};this.atividades.unshift(i),this.salvarAtividades(),Y.emitir(`nova-atividade`,i)}obterRecentes(e=10){return this.atividades.slice(0,e)}limpar(){this.atividades=[],this.salvarAtividades()}formatarTempo(e){let t=new Date().getTime()-e.getTime(),n=Math.floor(t/6e4),r=Math.floor(t/36e5),i=Math.floor(t/864e5);return n<1?`Agora mesmo`:n<60?`${n} min atrás`:r<24?`${r}h atrás`:i<7?`${i}d atrás`:e.toLocaleDateString(`pt-BR`)}obterIcone(e){return{criacao:`✨`,atualizacao:`✏️`,exclusao:`🗑️`,venda:`💰`,favorita:`⭐`,export:`📄`,import:`📥`,status:`📝`}[e]||`📌`}},te=class{constructor(e){this.dataStore=e,this.temaAtual=this.dataStore.dados.config.tema||`classico`}inicializar(){this.aplicarTema(this.temaAtual);let e=document.getElementById(`seletorTema`);e&&(e.value=this.temaAtual,e.addEventListener(`change`,e=>this.aplicarTema(e.target.value))),this.dataStore.dados.config.altoContraste&&document.body.setAttribute(`data-high-contrast`,`true`),document.body.setAttribute(`data-font-size`,this.dataStore.dados.config.tamanhoFonte||`medio`);let t=this.dataStore.dados.config.idioma||`pt-BR`;window.AtelierCRMTranslations&&(window.AtelierCRMTranslations.locale=t)}aplicarTema(e){document.body.setAttribute(`data-tema`,e),this.temaAtual=e,this.dataStore.dados.config.tema=e,this.dataStore.salvar()}},E=class{constructor(e){this.dataStore=e,this.viewAtual=`dashboard`,this.container=document.getElementById(`viewPrincipal`),this.rotas={dashboard:{rotulo:`Dashboard`,icone:`📊`,render:()=>ze.render(),aposRender:()=>ze.aposRenderizar()},portal:{rotulo:`Portal`,icone:`🔗`,render:()=>Ye.render(),aposRender:()=>Ye.aposRenderizar(),oculta:!0},catalogo:{rotulo:`Catálogo`,icone:`🖼️`,render:()=>Z.render(),aposRender:()=>Z.aposRenderizar()},clientes:{rotulo:`Clientes`,icone:`👤`,render:()=>Ve.render(),aposRender:()=>Ve.aposRenderizar()},vendas:{rotulo:`Vendas`,icone:`💰`,render:()=>He.render(),aposRender:()=>He.aposRenderizar()},certificados:{rotulo:`Certificados`,icone:`📜`,render:()=>Ue.render(),aposRender:()=>Ue.aposRenderizar()},referencias:{rotulo:`Referências`,icone:`📚`,render:()=>We.render(),aposRender:()=>We.aposRenderizar()},encomendas:{rotulo:`Encomendas`,icone:`📦`,render:()=>Xe.render(),aposRender:()=>Xe.aposRenderizar()},exposicoes:{rotulo:`Exposições`,icone:`🏛️`,render:()=>Ze.render(),aposRender:()=>Ze.aposRenderizar()},galeriaVirtual:{rotulo:`Galeria Virtual`,icone:`🥽`,render:()=>Q.render(),aposRender:()=>Q.aposRenderizar()},precificador:{rotulo:`Precificador`,icone:`💎`,render:()=>Ge.render(),aposRender:()=>Ge.aposRenderizar()},atelier:{rotulo:`Atelier`,icone:`🔧`,render:()=>Ke.render(),aposRender:()=>Ke.aposRenderizar()},diario:{rotulo:`Diário`,icone:`📖`,render:()=>qe.render(),aposRender:()=>qe.aposRenderizar()},rede:{rotulo:`Rede`,icone:`🤝`,render:()=>Je.render(),aposRender:()=>Je.aposRenderizar()},financeiro:{rotulo:`Financeiro`,icone:`📈`,render:()=>Qe.render(),aposRender:()=>Qe.aposRenderizar()},configuracoes:{rotulo:`Configurações`,icone:`⚙️`,render:()=>$e.render(),aposRender:()=>$e.aposRenderizar()},exportar:{rotulo:`Exportar/Importar`,icone:`📦`,render:()=>et.render(),aposRender:()=>et.aposRenderizar()}}}montarSidebar(){let e=document.getElementById(`navLista`);e.innerHTML=``,Object.entries(this.rotas).forEach(([t,n])=>{if(n.oculta)return;let r=document.createElement(`li`);r.className=`nav-item`+(t===this.viewAtual?` ativo`:``),r.dataset.rota=t,r.innerHTML=`<span class="icone">${n.icone}</span><span class="rotulo">${n.rotulo}</span>`,r.addEventListener(`click`,()=>this.navegar(t)),e.appendChild(r)})}navegar(e){this.rotas[e]&&(this.viewAtual=e,document.querySelectorAll(`.nav-item`).forEach(t=>{t.classList.toggle(`ativo`,t.dataset.rota===e)}),this.container.innerHTML=this.rotas[e].render(),typeof this.rotas[e].aposRender==`function`&&this.rotas[e].aposRender(),window.innerWidth<=860&&document.getElementById(`sidebar`).classList.add(`colapsada`),this.container.scrollTop=0)}inicializar(){this.montarSidebar(),this.navegar(`dashboard`)}},D=class e{constructor(t,n){if(new.target===e)throw Error(`BaseView não pode ser instanciada diretamente`);this.dataStore=t,this.router=n,this._bindCache={}}removerListeners(){Object.values(this._bindCache).forEach(({el:e,handler:t,type:n})=>{try{e.removeEventListener(n,t)}catch{}}),this._bindCache={}}rerenderizar(){let e=document.getElementById(`viewPrincipal`);e&&(this.removerListeners(),e.innerHTML=this.render(),this.aposRenderizar())}destruir(){this.removerListeners()}render(){return``}aposRenderizar(){this.removerListeners()}},ne=class extends D{constructor(e,t){super(e,t),this.charts={},this.widgetOrdem=this.carregarOrdemWidgets(),this.widgetsDisponiveis=[{id:`producao`,rotulo:`Produção Mensal`,icone:`📈`,visivel:!0},{id:`tecnicas`,rotulo:`Técnicas`,icone:`🎨`,visivel:!0},{id:`receita`,rotulo:`Receita`,icone:`💰`,visivel:!0},{id:`previsao`,rotulo:`Previsão de Faturamento`,icone:`🔮`,visivel:!0},{id:`notificacoes`,rotulo:`Notificações Inteligentes`,icone:`🔔`,visivel:!0},{id:`metas`,rotulo:`Metas Financeiras`,icone:`🎯`,visivel:!0},{id:`recentes`,rotulo:`Obras Recentes`,icone:`🖼️`,visivel:!0},{id:`atividades`,rotulo:`Atividades`,icone:`📋`,visivel:!0},{id:`dica`,rotulo:`Dica do Dia`,icone:`💡`,visivel:!0}]}carregarOrdemWidgets(){try{let e=localStorage.getItem(`atelier_dashboard_widgets`);return e?JSON.parse(e):null}catch{return null}}salvarOrdemWidgets(){localStorage.setItem(`atelier_dashboard_widgets`,JSON.stringify(this.widgetOrdem))}obterWidgetsOrdenados(){let e=this.widgetsDisponiveis.filter(e=>e.visivel).map(e=>e.id);if(!this.widgetOrdem||this.widgetOrdem.length===0)return e;let t=this.widgetOrdem.filter(t=>e.includes(t)),n=e.filter(e=>!this.widgetOrdem.includes(e));return[...t,...n]}render(){let e=P().items,t=R().items,r=I().items;this.dataStore.listar(`materiais`),this.dataStore.listar(`eventos`);let i=e.filter(e=>e.status===`vendida`),a=e.filter(e=>e.status!==`vendida`).reduce((e,t)=>e+(Number(t.preco)||0),0),o=t.reduce((e,t)=>e+(Number(t.valorTotal||t.valor)||0),0),s=t.length>0?o/t.length:0,c=h(e),l=e.filter(e=>e.favorita).length,u=new Date,d=u.getMonth(),f=u.getFullYear(),p=d===0?11:d-1,m=d===0?f-1:f,g=t.filter(e=>{let t=new Date(e.dataVenda||e.data||e.criadoEm);return t.getMonth()===d&&t.getFullYear()===f}),_=t.filter(e=>{let t=new Date(e.dataVenda||e.data||e.criadoEm);return t.getMonth()===p&&t.getFullYear()===m}),v=g.reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0),y=_.reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0),b=y>0?(v-y)/y*100:0,x=e.filter(e=>{let t=new Date(e.dataCadastro||e.criadoEm);return t.getMonth()===d&&t.getFullYear()===f}).length,S=e.filter(e=>{let t=new Date(e.dataCadastro||e.criadoEm);return t.getMonth()===p&&t.getFullYear()===m}).length,C=S>0?(x-S)/S*100:0,w=[{rotulo:`Total de Obras`,valor:e.length,tendencia:c,icone:`🖼️`,cor:`#2563eb`,sparkline:this.gerarSparkline(e,`criacao`),variacao:e.length>0?C:null},{rotulo:`Obras Vendidas`,valor:i.length,sub:`${e.length>0?(i.length/e.length*100).toFixed(1):0}% do total`,icone:`✅`,cor:`#16a34a`,sparkline:``},{rotulo:`Valor do Acervo`,valor:n(a),sub:`Ticket médio: ${n(s)}`,icone:`💰`,cor:`#d97706`,sparkline:``},{rotulo:`Total Vendido`,valor:n(o),sub:`${v>0?n(v)+` este mês`:t.length+` venda(s)`}`,icone:`📊`,cor:`#7c3aed`,sparkline:this.gerarSparkline(t,`receita`),variacao:b},{rotulo:`Clientes`,valor:r.length,sub:`${this.contarClientesAtivos(r)} ativos`,icone:`👥`,cor:`#0891b2`,sparkline:``},{rotulo:`Favoritas`,valor:l,sub:`⭐ obras marcadas`,icone:`⭐`,cor:`#dc2626`,sparkline:``}],T=this.obterWidgetsOrdenados();return this.widgetOrdem,`
      <div class="view-cabecalho">
        <div>
          <h2>Dashboard</h2>
          <p class="subtitulo">Visão geral do seu ateliê · ${u.toLocaleDateString(`pt-BR`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`})}</p>
        </div>
        <div class="dashboard-acoes">
          <button class="btn-gradient" id="btnDownloadDashboard" title="Baixar dashboard como imagem">📸 Exportar</button>
          <button class="btn-secundario" id="btnConfigWidgets" title="Configurar widgets">⚙️</button>
          <button class="btn-secundario" id="btnAtualizarDashboard" title="Atualizar dados">🔄</button>
        </div>
      </div>

      <div class="kpi-grid stagger-in">
        ${w.map(e=>`
          <div class="kpi-card" style="--kpi-cor: ${e.cor}">
            <div class="kpi-icone">${e.icone}</div>
            <div class="kpi-conteudo">
              <div class="kpi-rotulo">${e.rotulo}</div>
              <div class="kpi-valor">${e.valor}</div>
              ${e.sub?`<div class="kpi-sub">${e.sub}</div>`:``}
              ${e.variacao!==null&&e.variacao!==void 0?`<div class="kpi-variacao ${e.variacao>=0?`positiva`:`negativa`}">${e.variacao>=0?`↑`:`↓`} ${Math.abs(e.variacao).toFixed(1)}% vs mês anterior</div>`:``}
            </div>
            ${e.sparkline?`<div class="kpi-sparkline">${e.sparkline}</div>`:``}
          </div>
        `).join(``)}
      </div>

      <div class="widgets-toolbar">
        <span class="widgets-toolbar-dica">💡 Arraste os widgets para reordenar. Clique em ⚙️ para mostrar/ocultar.</span>
      </div>

      <div class="widgets-grid" id="widgetsGrid">
        ${T.map(e=>{let t=this.widgetsDisponiveis.find(t=>t.id===e);return t?`
            <div class="widget-card glass-premium" data-widget="${e}" draggable="true">
              <div class="widget-header">
                <span class="widget-drag-handle">⠿</span>
                <h3 class="widget-titulo">${t.icone} ${t.rotulo}</h3>
              </div>
              <div class="widget-body" id="widgetBody_${e}">
                ${this.renderizarWidget(e)}
              </div>
            </div>
          `:``}).join(``)}
      </div>

      <div class="painel atalhos-rodape">
        <h3>⚡ Atalhos rápidos</h3>
        <div class="atalhos-rapidos">
          <button class="btn-gradient" id="btnAtalhoNovaObra">✚ Nova Obra</button>
          <button class="btn-ghost" id="btnAtalhoVenda">✚ Nova Venda</button>
          <button class="btn-ghost" id="btnAtalhoRecibo">🧾 Gerar Recibo</button>
          <button class="btn-ghost" id="btnAtalhoClientes">👤 Gerenciar Clientes</button>
        </div>
      </div>

      ${this.renderModalConfig()}
    `}renderizarWidget(e){switch(e){case`producao`:return this.renderWidgetProducao();case`tecnicas`:return this.renderWidgetTecnicas();case`receita`:return this.renderWidgetReceita();case`previsao`:return this.renderWidgetPrevisao();case`notificacoes`:return this.renderWidgetNotificacoes();case`metas`:return this.renderWidgetMetas();case`recentes`:return this.renderWidgetRecentes();case`atividades`:return this.renderWidgetAtividades();case`dica`:return this.renderWidgetDica();default:return`<p>Widget não encontrado.</p>`}}renderModalConfig(){return`
      <div class="widget-config-overlay" id="widgetConfigOverlay" style="display:none">
        <div class="widget-config-modal">
          <h3>⚙️ Configurar Widgets</h3>
          <p class="texto-ajuda">Marque/desmarque os widgets para mostrar no dashboard. Arraste para reordenar.</p>
          <div class="widget-config-lista" id="widgetConfigLista">
            ${this.widgetsDisponiveis.map(e=>`
              <label class="widget-config-item">
                <input type="checkbox" data-wconfig="${e.id}" ${e.visivel?`checked`:``}>
                <span>${e.icone} ${e.rotulo}</span>
              </label>
            `).join(``)}
          </div>
          <div class="modal-acoes">
            <button class="btn-secundario" id="btnFecharConfigWidgets">Fechar</button>
            <button class="btn-primario" id="btnSalvarConfigWidgets">Salvar</button>
          </div>
        </div>
      </div>
    `}gerarSparkline(e,t){if(!e||e.length===0)return``;let n=[],r=new Date;for(let i=5;i>=0;i--){let a=new Date(r.getFullYear(),r.getMonth()-i,1),o=e.filter(e=>{let n=new Date(e.dataCadastro||e.criadoEm||e.data||e.dataVenda);return t===`receita`?n.getMonth()===a.getMonth()&&n.getFullYear()===a.getFullYear()&&n<=r:n.getMonth()===a.getMonth()&&n.getFullYear()===a.getFullYear()}).length;if(t===`receita`){let t=e.filter(e=>{let t=new Date(e.dataCadastro||e.criadoEm||e.data||e.dataVenda);return t.getMonth()===a.getMonth()&&t.getFullYear()===a.getFullYear()&&t<=r}).reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0);n.push(t)}else n.push(o)}if(n.every(e=>e===0))return``;let i=Math.max(...n,1);return`<svg width="80" height="30" viewBox="0 0 80 30"><polyline fill="none" stroke="var(--kpi-cor)" stroke-width="2" points="${n.map((e,t)=>`${t/(n.length-1)*80},${30-e/i*30}`).join(` `)}"/></svg>`}contarClientesAtivos(e){let t=new Date;return t.setMonth(t.getMonth()-3),e.filter(e=>e.criadoEm&&new Date(e.criadoEm)>=t).length}renderWidgetProducao(){return`<canvas id="chartProducao" height="180"></canvas>`}renderWidgetTecnicas(){return`<canvas id="chartTecnicas" height="180"></canvas>`}renderWidgetReceita(){return`<canvas id="chartReceita" height="180"></canvas>`}renderWidgetPrevisao(){let e=R().items,t=this.calcularPrevisao(e);return`
      <div class="previsao-container">
        <div class="previsao-valor-atual">
          <span class="previsao-rotulo">Faturamento nos últimos 6 meses</span>
          <span class="previsao-numero">${n(t.total6M)}</span>
        </div>
        <div class="previsao-barra-container">
          <div class="previsao-barra-item">
            <span>Média mensal</span>
            <span class="previsao-numero-peq">${n(t.mediaMensal)}</span>
          </div>
          <div class="previsao-barra-item">
            <span>Projeção próximos 6 meses</span>
            <span class="previsao-numero-peq ${t.tendencia>0?`positiva`:`negativa`}">${n(Math.abs(t.projecao6M))} ${t.tendencia>0?`📈`:`📉`}</span>
          </div>
        </div>
        <div class="previsao-detalhe">
          <span class="texto-ajuda">Baseado em regressão linear simples sobre os últimos meses</span>
          ${t.tendencia>0?`<span class="tag-status disponivel">Tendência positiva 📈</span>`:`<span class="tag-status vendida">Tendência negativa 📉</span>`}
        </div>
        <canvas id="chartPrevisao" height="120"></canvas>
      </div>
    `}calcularPrevisao(e){let t=[],n=new Date;for(let r=5;r>=0;r--){let i=new Date(n.getFullYear(),n.getMonth()-r,1),a=e.filter(e=>{let t=new Date(e.dataVenda||e.data||e.criadoEm);return t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()}).reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0);t.push({mes:i,total:a})}let r=t.reduce((e,t)=>e+t.total,0),i=r/t.length,a=t.length,o=(a-1)/2,s=r/a,c=0,l=0;t.forEach((e,t)=>{c+=(t-o)*(e.total-s),l+=(t-o)*(t-o)});let u=l===0?0:c/l,d=s-u*o,f=0;for(let e=0;e<6;e++)f+=Math.max(0,u*(a+e)+d);return{total6M:r,mediaMensal:i,inclinacao:u,intercept:d,projecao6M:f,tendencia:u,meses:t}}renderWidgetNotificacoes(){let e=this.dataStore.listar(`materiais`),t=I().items,r=this.dataStore.listar(`eventos`),i=P().items,a=new Date,o=[];return e.forEach(e=>{e.quantidade<=e.quantidadeMinima&&o.push({tipo:`estoque`,gravidade:e.quantidade<=(e.quantidadeMinima||0)/2?`alta`:`media`,icone:`⚠️`,mensagem:`"${e.nome}" está com estoque crítico (${e.quantidade} ${e.unidade||`un`})`,acao:`Ir para Atelier`,rota:`atelier`})}),t.forEach(e=>{if(e.ultimoContato||e.criadoEm){let t=e.ultimoContato||e.criadoEm,n=Math.floor((a-new Date(t))/864e5);n>60&&o.push({tipo:`cliente`,gravidade:n>180?`alta`:`media`,icone:`👤`,mensagem:`"${e.nome}" sem contato há ${n} dias`,acao:`Ver cliente`,rota:`clientes`})}}),r.forEach(e=>{if(e.dataEvento){let t=Math.floor((new Date(e.dataEvento)-a)/864e5);t>0&&t<=60&&o.push({tipo:`evento`,gravidade:t<=15?`alta`:`media`,icone:`📅`,mensagem:`"${e.nome}" em ${t} dias (${e.status})`,acao:`Ver eventos`,rota:`exposicoes`})}}),i.forEach(e=>{if(e.historicoPrecos&&e.historicoPrecos.length>1){let t=e.historicoPrecos[e.historicoPrecos.length-1],r=e.historicoPrecos[e.historicoPrecos.length-2];t.preco<r.preco&&o.push({tipo:`preco`,gravidade:`media`,icone:`🏷️`,mensagem:`"${e.titulo}" teve redução de preço (${n(r.preco)} → ${n(t.preco)})`,acao:`Ver obra`,rota:`catalogo`})}}),o.length===0?`<div class="estado-vazio"><div class="icone-vazio">✅</div><p>Tudo em ordem! Nenhuma notificação pendente.</p></div>`:`
      <div class="notificacoes-lista">
        ${o.sort((e,t)=>e.gravidade===`alta`?-1:1).slice(0,8).map(e=>`
          <div class="notificacao-item notificacao-${e.gravidade}">
            <span class="notificacao-icone">${e.icone}</span>
            <span class="notificacao-msg">${e.mensagem}</span>
            <button class="btn-miniatura notificacao-acao" data-rota="${e.rota}">${e.acao}</button>
          </div>
        `).join(``)}
        ${o.length>8?`<p class="texto-ajuda">+${o.length-8} notificações</p>`:``}
      </div>
    `}renderWidgetMetas(){let e=z().precificador||{},t=e.metaMensal||1e4,r=e.metaAnual||12e4,i=R().items,a=new Date,o=i.filter(e=>{let t=new Date(e.dataVenda||e.data||e.criadoEm);return t.getMonth()===a.getMonth()&&t.getFullYear()===a.getFullYear()}).reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0),s=i.filter(e=>new Date(e.dataVenda||e.data||e.criadoEm).getFullYear()===a.getFullYear()).reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0),c=Math.min(100,o/t*100),l=Math.min(100,s/r*100),u=new Date(a.getFullYear(),a.getMonth()+1,0).getDate()-a.getDate()+1,d=u>0?Math.max(0,(t-o)/u):0;return`
      <div class="metas-container">
        <div class="meta-card">
          <div class="meta-header">
            <span>Meta Mensal</span>
            <span>${n(o)} / ${n(t)}</span>
          </div>
          <div class="meta-barra"><div class="meta-barra-preenchimento" style="width:${c}%"></div></div>
          <div class="meta-footer">
            <span>${c.toFixed(1)}% concluído</span>
            <span class="${c>=100?`positiva`:``}">${c>=100?`✅ Meta atingida!`:`Faltam ${n(t-o)}`}</span>
          </div>
          ${c<100?`<div class="meta-diaria">🎯 Meta diária necessária: ${n(d)}/dia (${u} dias restantes)</div>`:``}
        </div>
        <div class="meta-card">
          <div class="meta-header">
            <span>Meta Anual</span>
            <span>${n(s)} / ${n(r)}</span>
          </div>
          <div class="meta-barra"><div class="meta-barra-preenchimento anual" style="width:${l}%"></div></div>
          <div class="meta-footer">
            <span>${l.toFixed(1)}% concluído</span>
            <span class="${l>=100?`positiva`:``}">${l>=100?`✅ Parabéns!`:`Faltam ${n(r-s)}`}</span>
          </div>
        </div>
      </div>
    `}renderWidgetRecentes(){let e=[...P().items].sort((e,t)=>new Date(t.dataCadastro||t.criadoEm)-new Date(e.dataCadastro||e.criadoEm)).slice(0,5);return e.length===0?`<div class="estado-vazio"><div class="icone-vazio">🖼️</div><p>Nenhuma obra cadastrada ainda.</p></div>`:`
      <ul class="lista-obras-recentes stagger-in">
        ${e.map(e=>{let t=e.imagemDestacada||e.imagens&&e.imagens[0]||e.imagem||``;return`
            <li class="item-obra-recente">
              <div class="thumb-obra">${t?`<img src="${t}" alt="${e.titulo}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`:`🖼️`}</div>
              <div class="info-obra-recente">
                <div class="nome">${e.titulo}</div>
                <div class="meta">${e.tecnica||``} · ${r(e.dataCadastro||e.criadoEm)}</div>
              </div>
              <span class="tag-status ${l(e.status)}">${u(e.status)}</span>
            </li>
          `}).join(``)}
      </ul>
    `}renderWidgetAtividades(){let e=X.obterRecentes(8);return e.length===0?`<div class="estado-vazio"><p>Nenhuma atividade registrada ainda.</p></div>`:`
      <div class="activity-feed">
        ${e.map(e=>`
          <div class="activity-item">
            <div class="activity-icone">${X.obterIcone(e.tipo)}</div>
            <div class="activity-detalhes">
              <div class="activity-titulo">${e.titulo} <span class="activity-badge ${e.badge}">${e.badge}</span></div>
              <div class="activity-tempo">${X.formatarTempo(new Date(e.timestamp))}</div>
            </div>
          </div>
        `).join(``)}
      </div>
    `}renderWidgetDica(){return`<div class="dica-card"><div class="dica-icone">💡</div><div class="dica-texto"><p>${Ie()||`Reserve 15 minutos ao final do dia para registrar seu progresso no Diário Criativo.`}</p><span class="texto-ajuda">Dica do dia · Atualiza automaticamente</span></div></div>`}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`);document.getElementById(`btnAtualizarDashboard`)?.addEventListener(`click`,()=>this.rerenderizar()),document.getElementById(`btnDownloadDashboard`)?.addEventListener(`click`,()=>{if(typeof html2canvas>`u`){i(`Biblioteca de captura indisponível.`);return}i(`Gerando imagem do dashboard...`);let e=document.getElementById(`viewPrincipal`).querySelector(`.kpi-grid`)?.parentElement||document.getElementById(`viewPrincipal`);html2canvas(e,{backgroundColor:getComputedStyle(document.body).getPropertyValue(`--bg`).trim()||`#ffffff`,scale:2,useCORS:!0,logging:!1}).then(e=>{let t=document.createElement(`a`);t.download=`dashboard-${new Date().toISOString().slice(0,10)}.png`,t.href=e.toDataURL(`image/png`),t.click(),i(`Dashboard exportado!`)}).catch(()=>i(`Erro ao gerar imagem.`))}),document.getElementById(`btnAtalhoNovaObra`)?.addEventListener(`click`,()=>{this.router.navegar(`catalogo`),setTimeout(()=>Y.emitir(`abrir-nova-obra`),200)}),document.getElementById(`btnAtalhoVenda`)?.addEventListener(`click`,()=>{this.router.navegar(`vendas`),setTimeout(()=>Y.emitir(`abrir-nova-venda`),200)}),document.getElementById(`btnAtalhoRecibo`)?.addEventListener(`click`,()=>Y.emitir(`abrir-recibo-rapido`)),document.getElementById(`btnAtalhoClientes`)?.addEventListener(`click`,()=>this.router.navegar(`clientes`)),e.addEventListener(`click`,e=>{let t=e.target.closest(`.notificacao-acao`);if(t&&t.dataset.rota){this.router.navegar(t.dataset.rota);return}}),this.initDragDrop(),this.initConfigModal(),this.initCharts()}initCharts(){if(typeof Chart>`u`){document.querySelectorAll(`[id^="chart"]`).forEach(e=>{e.tagName===`CANVAS`&&(e.parentElement.innerHTML=`<p class="texto-ajuda">Gráfico indisponível (Chart.js não carregou).</p>`)});return}Object.values(this.charts).forEach(e=>{try{e.destroy()}catch{}}),this.charts={};let e=P().items,t=R().items,n=new Date,r=[`#2563eb`,`#16a34a`,`#d97706`,`#7c3aed`,`#dc2626`,`#0891b2`,`#ca8a04`,`#be185d`],i=document.getElementById(`chartProducao`);if(i){let t=[];for(let r=5;r>=0;r--){let i=new Date(n.getFullYear(),n.getMonth()-r,1),a=e.filter(e=>{let t=new Date(e.dataCadastro||e.criadoEm);return t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()}).length;t.push({rotulo:i.toLocaleDateString(`pt-BR`,{month:`short`}),total:a})}this.charts.producao=new Chart(i.getContext(`2d`),{type:`bar`,data:{labels:t.map(e=>e.rotulo),datasets:[{label:`Obras criadas`,data:t.map(e=>e.total),backgroundColor:r,borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}})}let a=document.getElementById(`chartTecnicas`);if(a){let t={};e.forEach(e=>{e.tecnica&&(t[e.tecnica]=(t[e.tecnica]||0)+1)});let n=Object.keys(t),i=Object.values(t);this.charts.tecnicas=new Chart(a.getContext(`2d`),{type:`doughnut`,data:{labels:n,datasets:[{data:i,backgroundColor:r,borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`right`,labels:{boxWidth:12,padding:8}}}}})}let o=document.getElementById(`chartReceita`);if(o){let e=[];for(let r=5;r>=0;r--){let i=new Date(n.getFullYear(),n.getMonth()-r,1),a=t.filter(e=>{let t=new Date(e.dataVenda||e.data||e.criadoEm);return t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()}).reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0);e.push({rotulo:i.toLocaleDateString(`pt-BR`,{month:`short`}),total:a})}this.charts.receita=new Chart(o.getContext(`2d`),{type:`line`,data:{labels:e.map(e=>e.rotulo),datasets:[{label:`Receita`,data:e.map(e=>e.total),borderColor:`#16a34a`,backgroundColor:`rgba(22,163,74,0.1)`,fill:!0,tension:.4,pointRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{callback:e=>`R$`+e.toLocaleString(`pt-BR`)}}}}})}let s=document.getElementById(`chartPrevisao`);if(s){let e=this.calcularPrevisao(t),n=e.meses.map(e=>e.mes.toLocaleDateString(`pt-BR`,{month:`short`})),r=e.meses.map(e=>e.total),i=[];for(let t=0;t<6;t++)i.push(Math.max(0,e.inclinacao*(e.meses.length+t)+e.intercept));let a=[...n,...Array.from({length:6},(e,t)=>`+${t+1}m`)];this.charts.previsao=new Chart(s.getContext(`2d`),{type:`line`,data:{labels:a,datasets:[{label:`Realizado`,data:[...r,...[,,,,,,].fill(null)],borderColor:`#2563eb`,backgroundColor:`rgba(37,99,235,0.1)`,fill:!0,tension:.4,pointRadius:4},{label:`Projetado`,data:[...Array(n.length).fill(null),...i],borderColor:`#d97706`,borderDash:[5,5],tension:.4,pointRadius:3,pointStyle:`circle`}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{boxWidth:12,padding:8}}},scales:{y:{beginAtZero:!0,ticks:{callback:e=>`R$`+Math.round(e).toLocaleString(`pt-BR`)}}}}})}}initDragDrop(){let e=document.getElementById(`widgetsGrid`);if(!e)return;let t=null;e.addEventListener(`dragstart`,e=>{let n=e.target.closest(`.widget-card`);n&&(t=n,n.classList.add(`dragging`),e.dataTransfer.effectAllowed=`move`)}),e.addEventListener(`dragend`,e=>{let n=e.target.closest(`.widget-card`);n&&n.classList.remove(`dragging`),t=null}),e.addEventListener(`dragover`,n=>{n.preventDefault();let r=n.target.closest(`.widget-card`);if(!r||r===t)return;let i=r.getBoundingClientRect(),a=i.top+i.height/2;n.clientY<a?e.insertBefore(t,r):e.insertBefore(t,r.nextSibling)}),e.addEventListener(`drop`,t=>{t.preventDefault();let n=Array.from(e.querySelectorAll(`.widget-card`)).map(e=>e.dataset.widget);this.widgetOrdem=n,this.salvarOrdemWidgets()})}initConfigModal(){let e=document.getElementById(`btnConfigWidgets`),t=document.getElementById(`widgetConfigOverlay`);!e||!t||(e.addEventListener(`click`,()=>{t.style.display=`flex`}),document.getElementById(`btnFecharConfigWidgets`)?.addEventListener(`click`,()=>{t.style.display=`none`}),document.getElementById(`btnSalvarConfigWidgets`)?.addEventListener(`click`,()=>{t.querySelectorAll(`input[type="checkbox"]`).forEach(e=>{let t=this.widgetsDisponiveis.find(t=>t.id===e.dataset.wconfig);t&&(t.visivel=e.checked)}),this.salvarOrdemWidgets(),t.style.display=`none`,this.rerenderizar()}),t.addEventListener(`click`,e=>{e.target===t&&(t.style.display=`none`)}))}destruir(){Object.values(this.charts).forEach(e=>{try{e.destroy()}catch{}}),this.charts={},super.destruir()}},re=class extends D{constructor(e,t){super(e,t),this.modo=`grid`,this.filtros={busca:``,tecnica:``,status:``,ano:``,precoMin:``,precoMax:``,ordenar:`recentes`},this.filtroRapido=``,this.filtrosSalvos=[],this.selecionados=new Set,this.imagensFormAtual=[],this.imagemDestacadaAtual=null,this.modoComparacao=!1,this.idsComparacao=[],Y.on(`abrir-nova-obra`,()=>this.abrirFormulario())}obrasFiltradas(){let e=this.filtros,t=P().items;if(e.busca){let n=e.busca.toLowerCase();t=t.filter(e=>(e.titulo||``).toLowerCase().includes(n)||(e.descricao||``).toLowerCase().includes(n)||(e.serie||``).toLowerCase().includes(n))}return e.tecnica&&(t=t.filter(t=>t.tecnica===e.tecnica)),e.status&&(t=t.filter(t=>l(t.status)===l(e.status))),e.ano&&(t=t.filter(t=>String(t.ano)===String(e.ano))),e.precoMin!==``&&(t=t.filter(t=>Number(t.preco||0)>=Number(e.precoMin))),e.precoMax!==``&&(t=t.filter(t=>Number(t.preco||0)<=Number(e.precoMax))),this.filtroRapido===`favoritas`&&(t=t.filter(e=>e.favorita)),[...t].sort((e,t)=>new Date(t.dataCadastro||t.criadoEm||0)-new Date(e.dataCadastro||e.criadoEm||0))}anosDisponiveis(){return[...new Set(P().items.map(e=>e.ano).filter(Boolean))].sort((e,t)=>t-e)}render(){let e=this.obrasFiltradas(),t=this.anosDisponiveis(),n=e.length?this.modo===`grid`?this.renderGrid(e):this.renderLista(e):this.renderEstadoVazio(),r=Object.entries(this.filtros).filter(([e,t])=>t!==``&&e!==`ordenar`).length+ +!!this.filtroRapido;return`
      <div class="view-cabecalho">
        <div>
          <h2>Catálogo de Obras</h2>
          <p class="subtitulo">${e.length} obra${e.length===1?``:`s`} encontrada${e.length===1?``:`s`}${r>0?`<span class="filtros-ativo-badge">· ${r} filtro${r>1?`s`:``} ativo${r>1?`s`:``}</span>`:``}</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAll" ${this.selecionados.size===e.length&&e.length>0?`checked`:``}>
            <label for="selectAll">Selecionar todos</label>
          </div>
          <button class="btn-secundario" id="btnComparar" title="Comparar obras selecionadas" ${this.selecionados.size<2?`disabled`:``}>📊 Comparar</button>
          <button class="btn-secundario" id="btnImportacaoLote" title="Importar múltiplas obras">📸 Importar</button>
          <div class="toggle-visualizacao">
            <button id="btnModoGrid" class="${this.modo===`grid`?`ativo`:``}" title="Visualização em grid">☰ Grid</button>
            <button id="btnModoLista" class="${this.modo===`lista`?`ativo`:``}" title="Visualização em lista">☰ Lista</button>
          </div>
        </div>
      </div>

      ${this.selecionados.size>0?this.renderBarraBulk():``}

      ${this.renderFiltros(t)}

      <div class="catalogo-acoes-rapidas">
        <button class="btn-ghost" id="btnNovaObraRapida">➕ Nova Obra</button>
        <button class="btn-ghost" id="btnSlideshowTodas">▶ Slideshow Geral</button>
        <button class="btn-ghost" id="btnExportarTodas">📥 Exportar Tudo</button>
      </div>

      ${n}

      <button class="fab-nova-obra" id="fabNovaObra" title="Nova Obra">➕</button>
    `}renderEstadoVazio(){return`
      <div class="tabela-wrapper">
        <div class="estado-vazio">
          <div class="icone-vazio">🖼️</div>
          <p>Nenhuma obra encontrada com os filtros atuais.</p>
          <p class="texto-ajuda">Tente limpar os filtros ou cadastrar uma nova obra.</p>
        </div>
      </div>
    `}renderBarraBulk(){return`
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} obra${this.selecionados.size===1?``:`s`} selecionada${this.selecionados.size===1?``:`s`}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkMarcarFavorita">⭐ Favoritar</button>
          <button class="btn-secundario" id="bulkDesmarcarFavorita">☆ Desfavoritar</button>
          <button class="btn-secundario" id="bulkMudarStatus">📝 Mudar Status</button>
          <button class="btn-secundario" id="bulkExportar">📊 Exportar</button>
          <button class="btn-secundario" id="bulkExportarPDF">📄 Catálogo PDF</button>
          <button class="btn-secundario btn-danger" id="bulkExcluir">🗑 Excluir</button>
          <button class="btn-secundario" id="bulkCancelar">✕ Cancelar</button>
        </div>
      </div>
    `}renderFiltros(e){return`
      <div class="catalogo-filtros">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="filtroBusca" placeholder="Título, descrição, série..." value="${this.filtros.busca}" data-tooltip="Busca inteligente: título, descrição, série">
        </div>
        <div class="campo-filtro">
          <label>Técnica</label>
          <select id="filtroTecnica">
            <option value="">Todas</option>
            <option value="óleo" ${this.filtros.tecnica===`óleo`?`selected`:``}>Óleo</option>
            <option value="aquarela" ${this.filtros.tecnica===`aquarela`?`selected`:``}>Aquarela</option>
            <option value="escultura" ${this.filtros.tecnica===`escultura`?`selected`:``}>Escultura</option>
            <option value="outra" ${this.filtros.tecnica===`outra`?`selected`:``}>Outra</option>
          </select>
        </div>
        <div class="campo-filtro">
          <label>Status</label>
          <select id="filtroStatus">
            <option value="">Todos</option>
            <option value="disponível" ${this.filtros.status===`disponível`?`selected`:``}>Disponível</option>
            <option value="reservada" ${this.filtros.status===`reservada`?`selected`:``}>Reservada</option>
            <option value="vendida" ${this.filtros.status===`vendida`?`selected`:``}>Vendida</option>
            <option value="em exposição" ${this.filtros.status===`em exposição`?`selected`:``}>Em Exposição</option>
          </select>
        </div>
        <div class="campo-filtro">
          <label>Ano</label>
          <select id="filtroAno">
            <option value="">Todos</option>
            ${e.map(e=>`<option value="${e}" ${String(this.filtros.ano)===String(e)?`selected`:``}>${e}</option>`).join(``)}
          </select>
        </div>
        <div class="campo-filtro">
          <label>Faixa de preço (R$)</label>
          <div class="faixa-preco">
            <input type="number" id="filtroPrecoMin" placeholder="Mín." value="${this.filtros.precoMin}">
            <span>—</span>
            <input type="number" id="filtroPrecoMax" placeholder="Máx." value="${this.filtros.precoMax}">
          </div>
        </div>
        <div class="campo-filtro">
          <label>Ordenar por</label>
          <select id="filtroOrdenar">
            <option value="recentes" ${this.filtros.ordenar===`recentes`?`selected`:``}>Mais recentes</option>
            <option value="antigas" ${this.filtros.ordenar===`antigas`?`selected`:``}>Mais antigas</option>
            <option value="preco-asc" ${this.filtros.ordenar===`preco-asc`?`selected`:``}>Preço: menor → maior</option>
            <option value="preco-desc" ${this.filtros.ordenar===`preco-desc`?`selected`:``}>Preço: maior → menor</option>
            <option value="titulo" ${this.filtros.ordenar===`titulo`?`selected`:``}>Título A-Z</option>
            <option value="ano-desc" ${this.filtros.ordenar===`ano-desc`?`selected`:``}>Ano: mais recente</option>
          </select>
        </div>
        <button class="btn-secundario" id="btnLimparFiltros">Limpar filtros</button>
        <button class="btn-secundario" id="btnSalvarFiltro" title="Salvar filtro atual">💾 Salvar</button>
      </div>

      <div class="filtros-rapidos">
        <span class="rotulo-filtros">Filtros rápidos:</span>
        <button class="chip-filtro ${this.filtroRapido===`disponiveis`?`ativo`:``}" data-filtro="disponiveis">🟢 Disponíveis</button>
        <button class="chip-filtro ${this.filtroRapido===`vendidas`?`ativo`:``}" data-filtro="vendidas">🟡 Vendidas</button>
        <button class="chip-filtro ${this.filtroRapido===`recentes`?`ativo`:``}" data-filtro="recentes">📅 Este mês</button>
        <button class="chip-filtro ${this.filtroRapido===`favoritas`?`ativo`:``}" data-filtro="favoritas">⭐ Favoritas</button>
      </div>

      ${this.filtrosSalvos.length>0?`
      <div class="filtros-salvos">
        <span class="rotulo-filtros">Filtros salvos:</span>
        ${this.filtrosSalvos.map((e,t)=>`
          <button class="chip-filtro-salvo" data-indice="${t}" title="${e.descricao}">${e.nome}</button>
        `).join(``)}
      </div>
      `:``}
    `}renderGrid(e){return`
      <div class="grid-obras stagger-in">
        ${e.map(e=>`
          <div class="card-obra ${e.favorita?`favorita`:``} ${this.selecionados.has(e.id)?`selecionada`:``}">
            <div class="checkbox-bulk">
              <input type="checkbox" class="checkbox-item" data-id="${e.id}" ${this.selecionados.has(e.id)?`checked`:``}>
            </div>
            ${e.favorita?`<div class="badge-favorita">⭐</div>`:``}
            <div class="imagem-card-wrapper" data-abrir-ficha="${e.id}">
              <img class="imagem-obra lazy-img" src="${this.obterImagem(e)}" alt="${e.titulo}" loading="lazy">
              ${e.imagens&&e.imagens.length>1?`<span class="badge-multiplas-imagens">+${e.imagens.length}</span>`:``}
              <button class="btn-slideshow-card" data-slideshow="${e.id}" title="Ver galeria">▶</button>
            </div>
            <div class="corpo-card-obra" data-abrir-ficha="${e.id}">
              <div class="titulo-obra">${e.titulo}</div>
              <div class="meta-obra">${_(e.tecnica)} · ${this.formatarDimensoes(e.dimensoes)}</div>
              <div class="rodape-card-obra">
                <span class="preco-obra">${n(e.preco)}</span>
                <span class="tag-status ${l(e.status)}">${u(e.status)}</span>
              </div>
            </div>
            <div class="acoes-card-obra">
              <button data-favoritar-obra="${e.id}" title="${e.favorita?`Remover favorita`:`Marcar favorita`}">${e.favorita?`★`:`☆`}</button>
              <button data-comparar-obra="${e.id}" title="Adicionar à comparação">📊</button>
              <button data-editar-obra="${e.id}">✎ Editar</button>
              <button class="btn-excluir-obra" data-excluir-obra="${e.id}">🗑 Excluir</button>
            </div>
          </div>
        `).join(``)}
      </div>
    `}renderLista(e){return`
      <div class="lista-obras-wrapper stagger-in">
        ${e.map(e=>`
          <div class="linha-obra-lista ${e.favorita?`favorita`:``} ${this.selecionados.has(e.id)?`selecionada`:``}">
            <div class="checkbox-bulk-lista">
              <input type="checkbox" class="checkbox-item" data-id="${e.id}" ${this.selecionados.has(e.id)?`checked`:``}>
            </div>
            ${e.favorita?`<span class="icone-favorita-lista">⭐</span>`:``}
            <img class="thumb-lista lazy-img" data-abrir-ficha="${e.id}" src="${this.obterImagem(e)}" alt="${e.titulo}" loading="lazy">
            <div class="info-lista" data-abrir-ficha="${e.id}">
              <div class="titulo-obra">${e.titulo}</div>
              <div class="meta-obra">${_(e.tecnica)} · ${this.formatarDimensoes(e.dimensoes)} · ${e.ano||`-`}</div>
            </div>
            <span class="tag-status ${l(e.status)}">${u(e.status)}</span>
            <span class="preco-lista">${n(e.preco)}</span>
            <div class="acoes-lista">
              <button data-favoritar-obra="${e.id}" title="${e.favorita?`Remover favorita`:`Marcar favorita`}">${e.favorita?`★`:`☆`}</button>
              <button data-comparar-obra="${e.id}" title="Adicionar à comparação">📊</button>
              <button data-editar-obra="${e.id}">✎</button>
              <button data-excluir-obra="${e.id}">🗑</button>
            </div>
          </div>
        `).join(``)}
      </div>
    `}obterImagem(e){return e.imagemDestacada||e.imagens&&e.imagens[0]||e.imagem||d(`#cccccc`,`🖼️`)}formatarDimensoes(e){if(!e||!e.altura&&!e.largura&&!e.profundidade)return`-`;let t=[e.altura,e.largura,e.profundidade].filter(e=>e&&Number(e)>0);return t.length?`${t.join(` x `)} cm`:`-`}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`),t=document.getElementById(`btnModoGrid`),r=document.getElementById(`btnModoLista`);t&&t.addEventListener(`click`,()=>{this.modo=`grid`,this.rerenderizar()}),r&&r.addEventListener(`click`,()=>{this.modo=`lista`,this.rerenderizar()});let a=document.getElementById(`filtroBusca`);a&&a.addEventListener(`input`,e=>{this.filtros.busca=e.target.value,this.rerenderizar(!0)}),[`filtroTecnica`,`filtroStatus`,`filtroAno`,`filtroPrecoMin`,`filtroPrecoMax`].forEach(e=>{let t=document.getElementById(e);if(!t)return;let n={filtroTecnica:`tecnica`,filtroStatus:`status`,filtroAno:`ano`,filtroPrecoMin:`precoMin`,filtroPrecoMax:`precoMax`}[e];t.addEventListener(`change`,e=>{this.filtros[n]=e.target.value,this.rerenderizar()})});let o=document.getElementById(`filtroOrdenar`);o&&o.addEventListener(`change`,e=>{this.filtros.ordenar=e.target.value,this.rerenderizar()});let s=document.getElementById(`btnLimparFiltros`);s&&s.addEventListener(`click`,()=>{this.filtros={busca:``,tecnica:``,status:``,ano:``,precoMin:``,precoMax:``,ordenar:`recentes`},this.filtroRapido=``,this.rerenderizar()}),e.addEventListener(`keydown`,e=>{if((e.ctrlKey||e.metaKey)&&e.key===`a`){e.preventDefault(),this.obrasFiltradas().forEach(e=>this.selecionados.add(e.id)),this.rerenderizar();return}e.key===`Escape`&&this.selecionados.size>0&&(this.selecionados.clear(),this.rerenderizar())});let c=-1;e.addEventListener(`click`,e=>{let t=e.target.closest(`.checkbox-item`);if(t&&e.shiftKey){e.preventDefault();let n=this.obrasFiltradas(),r=n.findIndex(e=>e.id===t.dataset.id);if(c>=0&&r>=0){let[e,t]=c<=r?[c,r]:[r,c];for(let r=e;r<=t;r++)this.selecionados.add(n[r].id);this.rerenderizar()}c=r}else t&&(c=this.obrasFiltradas().findIndex(e=>e.id===t.dataset.id))});let l=document.getElementById(`btnComparar`);l&&l.addEventListener(`click`,()=>this.abrirComparacao(Array.from(this.selecionados)));let u=document.getElementById(`selectAll`);u&&u.addEventListener(`change`,e=>{let t=this.obrasFiltradas();e.target.checked?t.forEach(e=>this.selecionados.add(e.id)):this.selecionados.clear(),this.rerenderizar()}),e.addEventListener(`change`,e=>{if(e.target.classList.contains(`checkbox-item`)){let t=e.target.dataset.id;e.target.checked?this.selecionados.add(t):this.selecionados.delete(t),this.rerenderizar()}}),document.getElementById(`bulkMarcarFavorita`)?.addEventListener(`click`,()=>this.bulkAcao(`favoritar`)),document.getElementById(`bulkDesmarcarFavorita`)?.addEventListener(`click`,()=>this.bulkAcao(`desfavoritar`)),document.getElementById(`bulkMudarStatus`)?.addEventListener(`click`,()=>this.bulkAcao(`mudarStatus`)),document.getElementById(`bulkExportar`)?.addEventListener(`click`,()=>this.bulkAcao(`exportar`)),document.getElementById(`bulkExportarPDF`)?.addEventListener(`click`,()=>this.bulkAcao(`exportarPDF`)),document.getElementById(`bulkExcluir`)?.addEventListener(`click`,()=>this.bulkAcao(`excluir`)),document.getElementById(`bulkCancelar`)?.addEventListener(`click`,()=>{this.selecionados.clear(),this.rerenderizar()}),document.getElementById(`btnImportacaoLote`)?.addEventListener(`click`,()=>this.abrirImportacaoLote()),document.getElementById(`btnNovaObraRapida`)?.addEventListener(`click`,()=>this.abrirFormulario()),document.getElementById(`btnSlideshowTodas`)?.addEventListener(`click`,()=>{let e=this.obrasFiltradas();if(e.length===0){i(`Nenhuma obra para exibir.`);return}j(e.map(e=>({src:this.obterImagem(e),legenda:`${e.titulo} · ${n(e.preco)}`})),0)}),document.getElementById(`btnExportarTodas`)?.addEventListener(`click`,()=>{let e=this.obrasFiltradas().map(e=>e.id);if(e.length===0){i(`Nenhuma obra para exportar.`);return}this.exportarObrasJSON(e)});let d=document.getElementById(`fabNovaObra`);d&&d.addEventListener(`click`,()=>this.abrirFormulario());let f=e=>{let t=e.target.closest(`.imagem-card-wrapper img, .thumb-lista`),n=e.target.closest(`[data-abrir-ficha]`),r=e.target.closest(`[data-editar-obra]`),i=e.target.closest(`[data-excluir-obra]`),a=e.target.closest(`[data-comparar-obra]`),o=e.target.closest(`[data-slideshow]`),s=e.target.closest(`[data-filtro]`),c=e.target.closest(`[data-indice]`);if(r){this.abrirFormulario(r.dataset.editarObra);return}if(i){this.excluirObra(i.dataset.excluirObra);return}if(a){this.adicionarComparacao(a.dataset.compararObra);return}if(o){e.stopPropagation(),this.abrirSlideshow(o.dataset.slideshow);return}if(t){e.stopPropagation();let n=t.closest(`[data-abrir-ficha]`)?.dataset?.abrirFicha;n&&this.abrirSlideshow(n);return}if(s){let e=s.dataset.filtro;this.filtroRapido=this.filtroRapido===e?``:e,this.aplicarFiltroRapido(),this.rerenderizar();return}if(c){this.carregarFiltroSalvo(parseInt(c.dataset.indice));return}if(n){this.abrirFichaTecnica(n.dataset.abrirFicha);return}};e.addEventListener(`click`,f),this._bindCache.delegCatalogo={el:e,handler:f,type:`click`};let p=document.getElementById(`btnSalvarFiltro`);p&&p.addEventListener(`click`,()=>this.salvarFiltroAtual())}aplicarFiltroRapido(){let e=new Date;switch(this.filtroRapido){case`disponiveis`:this.filtros.status=`disponível`;break;case`vendidas`:this.filtros.status=`vendida`,this.filtroRapido=`vendidas`;break;case`recentes`:this.filtros.status=``,this.filtros.ano=String(e.getFullYear());break;case`favoritas`:break;default:break}}salvarFiltroAtual(){let e=prompt(`Nome para este filtro:`);e&&(this.filtrosSalvos.push({nome:e,descricao:Object.entries(this.filtros).map(([e,t])=>t?`${e}:${t}`:``).filter(Boolean).join(`, `),filtros:{...this.filtros}}),this.rerenderizar())}carregarFiltroSalvo(e){let t=this.filtrosSalvos[e];t&&(this.filtros={...t.filtros},this.rerenderizar())}rerenderizar(e=!1){let t=document.getElementById(`viewPrincipal`),n=e?document.activeElement.id:null;if(t.innerHTML=this.render(),this.aposRenderizar(),n){let e=document.getElementById(n);if(e){e.focus();let t=e.value;e.value=``,e.value=t}}}bulkAcao(e){let t=Array.from(this.selecionados);if(t.length!==0){switch(e){case`favoritar`:t.forEach(e=>{let t=P().porId(e);t&&(t.favorita=!0,P().atualizar(e,t))}),i(`${t.length} obra${t.length===1?``:`s`} favoritada${t.length===1?``:`s`}`);break;case`desfavoritar`:t.forEach(e=>{let t=P().porId(e);t&&(t.favorita=!1,P().atualizar(e,t))}),i(`${t.length} obra${t.length===1?``:`s`} desfavoritada${t.length===1?``:`s`}`);break;case`mudarStatus`:s(`
          <h3>Mudar Status em Lote</h3>
          <div class="campo-form">
            <label>Novo Status</label>
            <select id="novoStatusBulk">
              <option value="disponível">Disponível</option>
              <option value="reservada">Reservada</option>
              <option value="vendida">Vendida</option>
              <option value="em exposição">Em Exposição</option>
            </select>
          </div>
          <div class="modal-acoes">
            <button class="btn-primario" id="btnConfirmarStatus">Confirmar</button>
            <button class="btn-secundario" id="btnCancelarStatus">Cancelar</button>
          </div>
        `),document.getElementById(`btnConfirmarStatus`).addEventListener(`click`,()=>{let e=document.getElementById(`novoStatusBulk`).value;t.forEach(t=>{let n=P().porId(t);n&&(n.status=e,P().atualizar(t,n))}),i(`${t.length} obra${t.length===1?``:`s`} atualizada${t.length===1?``:`s`}`),this.selecionados.clear(),c(),this.rerenderizar()}),document.getElementById(`btnCancelarStatus`).addEventListener(`click`,()=>c());return;case`exportar`:this.exportarObrasJSON(t);break;case`exportarPDF`:this.exportarCatalogoPDF(t);break;case`excluir`:if(!confirm(`Tem certeza que deseja excluir ${t.length} obra${t.length===1?``:`s`}? Esta ação não pode ser desfeita.`))return;t.forEach(e=>P().remover(e)),i(`${t.length} obra${t.length===1?``:`s`} excluída${t.length===1?``:`s`}`);break}this.selecionados.clear(),this.rerenderizar()}}exportarObrasJSON(e){let t={obras:e.map(e=>P().porId(e)).filter(Boolean),exportadoEm:new Date().toISOString(),versao:`1.0`},n=new Blob([JSON.stringify(t,null,2)],{type:`application/json`}),r=URL.createObjectURL(n),a=document.createElement(`a`),o=new Date().toISOString().replace(/[:.]/g,`-`);a.href=r,a.download=`atelier-crm-obras-${o}.json`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(r),i(`${e.length} obra${e.length===1?``:`s`} exportada${e.length===1?``:`s`}`)}exportarCatalogoPDF(e){if(!window.jspdf){i(`Biblioteca de PDF indisponível.`);return}let t=e.map(e=>P().porId(e)).filter(Boolean);if(t.length===0)return;a(`Gerando catálogo PDF...`);let{jsPDF:r}=window.jspdf,s=new r({unit:`mm`,format:`a4`}),c=s.internal.pageSize.getWidth(),l=s.internal.pageSize.getHeight(),d=z().artista&&z().artista.nome||`Ateliê do Artista`;t.forEach((e,r)=>{r>0&&s.addPage(),s.setFont(`helvetica`,`bold`),s.setFontSize(20),s.setTextColor(30,30,30),s.text(d,c/2,22,{align:`center`}),s.setDrawColor(200),s.setLineWidth(.4),s.line(25,28,c-25,28),s.setFont(`helvetica`,`normal`),s.setFontSize(10),s.setTextColor(130),s.text(`Catálogo de Obras · Página ${r+1} de ${t.length}`,c/2,35,{align:`center`});let i=46,a=this.obterImagem(e);if(/^data:image\/(png|jpe?g)/i.test(a||``))try{let e=/png/i.test(a)?`PNG`:`JPEG`;s.addImage(a,e,(c-100)/2,i,100,100,void 0,`FAST`),i+=112}catch(e){console.warn(`Erro ao inserir imagem no PDF:`,e)}s.setFont(`helvetica`,`bold`),s.setFontSize(16),s.setTextColor(20),s.text(e.titulo||`Sem título`,c/2,i,{align:`center`}),i+=9,e.serie&&(s.setFont(`helvetica`,`italic`),s.setFontSize(10),s.setTextColor(120),s.text(`Série: ${e.serie}`,c/2,i,{align:`center`}),i+=8),s.setFont(`helvetica`,`normal`),s.setFontSize(11),s.setTextColor(60),[`Técnica: ${_(e.tecnica)}`,`Dimensões: ${this.formatarDimensoes(e.dimensoes)}`,`Ano: ${e.ano||`-`}`,`Status: ${u(e.status)}`,`Preço: ${n(e.preco)}`].forEach(e=>{s.text(e,c/2,i,{align:`center`}),i+=6.5}),e.descricao&&(i+=4,s.setFont(`helvetica`,`italic`),s.setFontSize(10),s.setTextColor(90),s.text(s.splitTextToSize(e.descricao,c-60),c/2,i,{align:`center`})),s.setDrawColor(210),s.line(25,l-20,c-25,l-20),s.setFont(`helvetica`,`normal`),s.setFontSize(8),s.setTextColor(150),s.text(`Catálogo gerado em ${new Date().toLocaleDateString(`pt-BR`)} · Atelier CRM`,c/2,l-14,{align:`center`})});let f=`catalogo-${t.length}-obras-${new Date().toISOString().slice(0,10)}.pdf`;s.save(f),o(),i(`Catálogo PDF exportado com ${t.length} obra${t.length===1?``:`s`}!`)}abrirFormulario(e=null){let t=e?P().porId(e):null;this.imagensFormAtual=t?[...t.imagens||[]]:[],this.imagemDestacadaAtual=t?t.imagemDestacada||t.imagens&&t.imagens[0]||t.imagem:null;let n=t&&t.dimensoes||{};s(`
      <h3>${t?`Editar Obra`:`Nova Obra`}</h3>
      <form id="formObra" class="form-obra-premium">
        <div class="campo-form">
          <label>Título *</label>
          <input type="text" id="campoTitulo" value="${t?t.titulo:``}" required>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Técnica *</label>
            <select id="campoTecnica" required>
              <option value="">Selecione...</option>
              <option value="óleo" ${t&&t.tecnica===`óleo`?`selected`:``}>Óleo</option>
              <option value="aquarela" ${t&&t.tecnica===`aquarela`?`selected`:``}>Aquarela</option>
              <option value="escultura" ${t&&t.tecnica===`escultura`?`selected`:``}>Escultura</option>
              <option value="outra" ${t&&t.tecnica===`outra`?`selected`:``}>Outra</option>
            </select>
          </div>
          <div class="campo-form">
            <label>Ano</label>
            <input type="number" id="campoAno" value="${t?t.ano||``:new Date().getFullYear()}">
          </div>
        </div>
        <div class="campo-form">
          <label>Dimensões (cm)</label>
          <div class="form-linha">
            <input type="number" id="campoAltura" placeholder="Altura" value="${n.altura||``}">
            <input type="number" id="campoLargura" placeholder="Largura" value="${n.largura||``}">
            <input type="number" id="campoProfundidade" placeholder="Profundidade" value="${n.profundidade||``}">
          </div>
        </div>
        <div class="campo-form">
          <label>Série (opcional)</label>
          <input type="text" id="campoSerie" value="${t&&t.serie||``}">
        </div>
        <div class="campo-form">
          <label>Descrição</label>
          <textarea id="campoDescricao">${t&&t.descricao||``}</textarea>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Preço (R$) *</label>
            <input type="number" id="campoPreco" value="${t?t.preco:``}" required>
          </div>
          <div class="campo-form">
            <label>Status</label>
            <select id="campoStatus">
              <option value="disponível" ${!t||l(t.status)===`disponivel`?`selected`:``}>Disponível</option>
              <option value="reservada" ${t&&l(t.status)===`reservada`?`selected`:``}>Reservada</option>
              <option value="vendida" ${t&&l(t.status)===`vendida`?`selected`:``}>Vendida</option>
              <option value="em exposição" ${t&&l(t.status)===`exposicao`?`selected`:``}>Em Exposição</option>
            </select>
          </div>
        </div>

        <div class="campo-form">
          <label>Imagens da Obra</label>
          <div class="dropzone-imagens" id="dropzoneImagens">
            <div class="dropzone-placeholder">
              <span class="dropzone-icone">📷</span>
              <p>Arraste imagens para cá ou clique para selecionar</p>
              <p class="texto-ajuda">JPG, PNG · Múltiplos arquivos · Máx 5 imagens</p>
            </div>
            <input type="file" id="campoImagens" accept="image/*" multiple style="display:none">
          </div>
          <div class="preview-galeria" id="previewGaleria">
            ${this.imagensFormAtual.length===0?`<p class="texto-ajuda">Nenhuma imagem selecionada ainda.</p>`:``}
          </div>
        </div>

        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarObra">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar Obra</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarObra`).addEventListener(`click`,c),this.iniciarDropzone(),this.renderizarPreviewGaleria(),document.getElementById(`formObra`).addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`campoTitulo`).value.trim(),r=document.getElementById(`campoTecnica`).value,a=document.getElementById(`campoPreco`).value;if(!n||!r||a===``){i(`Preencha os campos obrigatórios: título, técnica e preço.`);return}let o={titulo:n,tecnica:r,dimensoes:{altura:Number(document.getElementById(`campoAltura`).value)||0,largura:Number(document.getElementById(`campoLargura`).value)||0,profundidade:Number(document.getElementById(`campoProfundidade`).value)||0},ano:Number(document.getElementById(`campoAno`).value)||null,descricao:document.getElementById(`campoDescricao`).value.trim(),preco:Number(a),status:document.getElementById(`campoStatus`).value,imagem:this.imagemDestacadaAtual||this.imagensFormAtual[0]||d(`#cccccc`,`🖼️`),imagens:this.imagensFormAtual,imagemDestacada:this.imagemDestacadaAtual||this.imagensFormAtual[0]||``,serie:document.getElementById(`campoSerie`).value.trim()};t?(P().atualizar(t.id,o),i(`Obra atualizada com sucesso!`)):(o.dataCadastro=new Date().toISOString(),P().adicionar(o),i(`Obra cadastrada com sucesso!`)),c(),this.router.navegar(`catalogo`)})}iniciarDropzone(){let e=document.getElementById(`dropzoneImagens`),t=document.getElementById(`campoImagens`);e&&(e.addEventListener(`click`,()=>t.click()),e.addEventListener(`dragover`,t=>{t.preventDefault(),e.classList.add(`dragging`)}),e.addEventListener(`dragleave`,()=>{e.classList.remove(`dragging`)}),e.addEventListener(`drop`,t=>{t.preventDefault(),e.classList.remove(`dragging`),this.processarArquivos(t.dataTransfer.files)}),t.addEventListener(`change`,e=>{this.processarArquivos(e.target.files),e.target.value=``}))}processarArquivos(e){if(this.imagensFormAtual.length+e.length>5){i(`Máximo de 5 imagens por obra.`);return}Array.from(e).forEach(e=>{if(!e.type.startsWith(`image/`))return;let t=new FileReader;t.onload=e=>{let t=e.target.result;this.comprimirImagem(t,1200,.8,e=>{this.imagensFormAtual.push(e),this.imagemDestacadaAtual||(this.imagemDestacadaAtual=e),this.renderizarPreviewGaleria()})},t.readAsDataURL(e)})}comprimirImagem(e,t,n,r){let i=new Image;i.onload=()=>{let e=document.createElement(`canvas`),{width:a,height:o}=i;a>t&&(o=o*t/a,a=t),e.width=a,e.height=o;let s=e.getContext(`2d`);s.imageSmoothingEnabled=!0,s.imageSmoothingQuality=`high`,s.drawImage(i,0,0,a,o),r(e.toDataURL(`image/jpeg`,n))},i.onerror=()=>r(e),i.src=e}renderizarPreviewGaleria(){let e=document.getElementById(`previewGaleria`);if(!e)return;if(this.imagensFormAtual.length===0){e.innerHTML=`<p class="texto-ajuda">Nenhuma imagem selecionada ainda.</p>`;return}let t=-1;e.innerHTML=`
      <div class="grade-miniaturas drop-reorder">
        ${this.imagensFormAtual.map((e,t)=>`
          <div class="miniatura-imagem ${e===this.imagemDestacadaAtual?`destacada`:``}" draggable="true" data-idx="${t}">
            <img src="${e}" alt="Imagem ${t+1}">
            <div class="miniaturas-acoes">
              <button type="button" class="btn-miniatura ${e===this.imagemDestacadaAtual?`ativo`:``}" data-destacar="${t}" title="Marcar como destacada">⭐</button>
              <button type="button" class="btn-miniatura" data-editar-img="${t}" title="Editar imagem">✎</button>
              <button type="button" class="btn-miniatura" data-remover-img="${t}" title="Remover imagem">✕</button>
            </div>
            <span class="mi-ordem">${t+1}</span>
          </div>
        `).join(``)}
      </div>
      <p class="texto-ajuda">⭐ = imagem destacada (capa). Arraste as imagens para reordenar.</p>
    `,e.querySelectorAll(`.miniatura-imagem[draggable]`).forEach(n=>{n.addEventListener(`dragstart`,e=>{t=parseInt(n.dataset.idx),n.classList.add(`d-r-arrastando`),e.dataTransfer.effectAllowed=`move`}),n.addEventListener(`dragend`,()=>{n.classList.remove(`d-r-arrastando`),e.querySelectorAll(`.miniatura-imagem`).forEach(e=>e.classList.remove(`d-r-alvo`))}),n.addEventListener(`dragover`,e=>{e.preventDefault(),e.dataTransfer.dropEffect=`move`}),n.addEventListener(`dragenter`,e=>{e.preventDefault(),n.classList.add(`d-r-alvo`)}),n.addEventListener(`dragleave`,()=>n.classList.remove(`d-r-alvo`)),n.addEventListener(`drop`,e=>{e.preventDefault(),n.classList.remove(`d-r-alvo`);let r=parseInt(n.dataset.idx);if(t>=0&&r>=0&&t!==r){let[e]=this.imagensFormAtual.splice(t,1);this.imagensFormAtual.splice(r,0,e),this.renderizarPreviewGaleria()}})}),e.querySelectorAll(`[data-destacar]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=parseInt(e.dataset.destacar);this.imagemDestacadaAtual=this.imagensFormAtual[n],this.renderizarPreviewGaleria()})}),e.querySelectorAll(`[data-remover-img]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=parseInt(e.dataset.removerImg);this.imagensFormAtual.splice(n,1),(this.imagemDestacadaAtual===this.imagensFormAtual[n]||!this.imagensFormAtual.includes(this.imagemDestacadaAtual))&&(this.imagemDestacadaAtual=this.imagensFormAtual[0]||null),this.renderizarPreviewGaleria()})}),e.querySelectorAll(`[data-editar-img]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=parseInt(e.dataset.editarImg);this.abrirEditorImagem(n)})})}abrirImportacaoLote(){s(`
      <h3>📸 Importar Múltiplas Obras</h3>
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Arraste imagens ou clique para selecionar. Cada imagem se tornará uma nova obra.</p>
      <div class="dropzone-imagens batch-dropzone" id="batchDropzone">
        <div class="dropzone-placeholder">
          <span class="dropzone-icone">📷</span>
          <p>Arraste imagens para cá</p>
          <p class="texto-ajuda">JPG, PNG · Múltiplos arquivos · Sem limite</p>
        </div>
        <input type="file" id="batchFileInput" accept="image/*" multiple style="display:none">
      </div>
      <div id="batchPreviewContainer"></div>
      <div class="batch-campos-comuns" id="batchCamposComuns" style="display:none;">
        <h4 style="font-size:0.85rem;margin-bottom:8px;">Campos comuns (aplicados a todas)</h4>
        <div class="form-linha">
          <div class="campo-form"><label>Técnica</label><select id="batchTecnica"><option value="">—</option><option value="óleo">Óleo</option><option value="aquarela">Aquarela</option><option value="escultura">Escultura</option><option value="outra">Outra</option></select></div>
          <div class="campo-form"><label>Status</label><select id="batchStatus"><option value="disponível">Disponível</option><option value="reservada">Reservada</option><option value="vendida">Vendida</option><option value="em exposição">Em Exposição</option></select></div>
          <div class="campo-form"><label>Ano</label><input type="number" id="batchAno" value="${new Date().getFullYear()}"></div>
        </div>
        <div class="campo-form"><label>Série (opcional)</label><input type="text" id="batchSerie" placeholder="Ex: Série Jardins"></div>
      </div>
      <div class="modal-acoes" id="batchAcoes" style="display:none;">
        <button class="btn-secundario" id="batchCancelar">Cancelar</button>
        <button class="btn-primario" id="batchCriar">Importar Obras</button>
      </div>
    `),this.iniciarBatchDrop()}iniciarBatchDrop(){let e=document.getElementById(`batchDropzone`),t=document.getElementById(`batchFileInput`),n=[];if(!e)return;e.addEventListener(`click`,()=>t.click()),e.addEventListener(`dragover`,t=>{t.preventDefault(),e.classList.add(`dragging`)}),e.addEventListener(`dragleave`,()=>e.classList.remove(`dragging`)),e.addEventListener(`drop`,t=>{t.preventDefault(),e.classList.remove(`dragging`),r(t.dataTransfer.files)}),t.addEventListener(`change`,()=>{t.files.length&&r(t.files)});let r=e=>{let t=Array.from(e).filter(e=>e.type.startsWith(`image/`));if(t.length===0){i(`Nenhuma imagem encontrada.`);return}let r=0;t.forEach(e=>{let i=new FileReader;i.onload=e=>{a(e.target.result,1200,.8,e=>{n.push(e),r++,r===t.length&&o(n)})},i.readAsDataURL(e)})},a=(e,t,n,r)=>{let i=new Image;i.onload=()=>{let e=document.createElement(`canvas`),{width:a,height:o}=i;a>t&&(o=o*t/a,a=t),e.width=a,e.height=o;let s=e.getContext(`2d`);s.imageSmoothingEnabled=!0,s.imageSmoothingQuality=`high`,s.drawImage(i,0,0,a,o),r(e.toDataURL(`image/jpeg`,n))},i.onerror=()=>r(e),i.src=e},o=e=>{let t=document.getElementById(`batchPreviewContainer`),n=document.getElementById(`batchCamposComuns`),r=document.getElementById(`batchAcoes`);t&&(t.innerHTML=`
          <div class="batch-preview-grid">
            ${e.map((e,t)=>`
              <div class="batch-item" data-idx="${t}">
                <img src="${e}" alt="Obra ${t+1}">
                <button class="batch-remover" data-idx="${t}" title="Remover">✕</button>
                <span class="batch-label">Obra ${t+1}</span>
              </div>
            `).join(``)}
          </div>
          <p class="texto-ajuda">${e.length} imagem(ns) preparada(s) para importação.</p>
        `,t.querySelectorAll(`.batch-remover`).forEach(t=>{t.addEventListener(`click`,()=>{let n=parseInt(t.dataset.idx);e.splice(n,1),o(e)})})),n&&(n.style.display=e.length>0?`block`:`none`),r&&(r.style.display=e.length>0?`flex`:`none`),document.getElementById(`batchCancelar`)?.addEventListener(`click`,c),document.getElementById(`batchCriar`)?.addEventListener(`click`,()=>{let t=document.getElementById(`batchTecnica`)?.value||``,n=document.getElementById(`batchStatus`)?.value||`disponível`,r=parseInt(document.getElementById(`batchAno`)?.value)||new Date().getFullYear(),a=document.getElementById(`batchSerie`)?.value.trim()||``,o=e.map(e=>({titulo:`Obra ${Date.now()}`,tecnica:t,ano:r,status:n,serie:a,imagem:e,imagens:[e],imagemDestacada:e,preco:0,dataCadastro:new Date().toISOString()}));o.forEach(e=>P().adicionar(e)),c(),i(`${o.length} obra(s) importada(s) com sucesso!`),this.router.navegar(`catalogo`)})}}abrirEditorImagem(e){let t=this.imagensFormAtual[e],n=document.createElement(`canvas`),r=n.getContext(`2d`),a=new Image,o=0,l=0,u=!1;a.onload=()=>{n.width=a.width,n.height=a.height,r.drawImage(a,0,0),a.width,a.height,d()},a.src=t;let d=()=>{s(`
        <h3>✎ Editor de Imagem</h3>
        <div class="editor-imagem-container">
          <div class="editor-imagem-tela">
            <img src="${f()}" id="previewEditor" style="max-width:100%;max-height:400px;">
            ${u?`<div class="crop-overlay"></div>`:``}
          </div>
          <div class="editor-imagem-controles">
            <div class="editor-controle-grupo">
              <label>Girar</label>
              <button class="btn-miniatura" id="btnRotacionarEsq">↺ Esquerda</button>
              <button class="btn-miniatura" id="btnRotacionarDir">↻ Direita</button>
            </div>
            <div class="editor-controle-grupo">
              <label>Brilho: ${l>0?`+`:``}${l}</label>
              <input type="range" id="sliderBrilho" min="-100" max="100" value="${l}" style="width:100%">
            </div>
            <div class="editor-controle-grupo">
              <label>Cortar</label>
              <button class="btn-miniatura" id="btnAtivarCrop">${u?`✕ Cancelar Crop`:`✂ Ativar Crop`}</button>
              <p class="texto-ajuda">Clique e arraste na imagem para selecionar a área</p>
            </div>
          </div>
        </div>
        <div class="modal-acoes">
          <button class="btn-secundario" id="btnCancelarEditor">Cancelar</button>
          <button class="btn-primario" id="btnAplicarEditor">Aplicar</button>
        </div>
      `),document.getElementById(`btnRotacionarEsq`).addEventListener(`click`,()=>{o-=90,d()}),document.getElementById(`btnRotacionarDir`).addEventListener(`click`,()=>{o+=90,d()}),document.getElementById(`sliderBrilho`).addEventListener(`input`,e=>{l=parseInt(e.target.value),d()}),document.getElementById(`btnAtivarCrop`).addEventListener(`click`,()=>{u=!u,d()}),document.getElementById(`btnCancelarEditor`).addEventListener(`click`,c),document.getElementById(`btnAplicarEditor`).addEventListener(`click`,()=>{this.imagensFormAtual[e]=f(),this.renderizarPreviewGaleria(),c(),i(`Imagem editada com sucesso!`)})},f=()=>{let e=document.createElement(`canvas`),t=e.getContext(`2d`),n=o*Math.PI/180,r=Math.abs(Math.cos(n)),i=Math.abs(Math.sin(n)),s=a.width,c=a.height;if(o%180!=0){let o=c*r+s*i,l=c*i+s*r;e.width=Math.ceil(o),e.height=Math.ceil(l),t.translate(e.width/2,e.height/2),t.rotate(n),t.drawImage(a,-s/2,-c/2)}else e.width=s,e.height=c,t.drawImage(a,0,0);if(l!==0){let n=t.getImageData(0,0,e.width,e.height),r=n.data,i=1+l/100;for(let e=0;e<r.length;e+=4)r[e]=Math.min(255,r[e]*i),r[e+1]=Math.min(255,r[e+1]*i),r[e+2]=Math.min(255,r[e+2]*i);t.putImageData(n,0,0)}return e.toDataURL(`image/jpeg`,.9)}}abrirFichaTecnica(e){let t=P().porId(e);if(!t)return;let i=t.imagens&&t.imagens.length>0?t.imagens:[t.imagem],a=i.length>1;if(s(`
      <div class="ficha-tecnica-obra ficha-premium">
        <div class="ficha-galeria">
          <div class="ficha-imagem-principal">
            <img id="fichaImgPrincipal" src="${this.obterImagem(t)}" alt="${t.titulo}">
            ${a?`
            <button class="ficha-nav-btn ficha-nav-prev" id="fichaNavPrev">◀</button>
            <button class="ficha-nav-btn ficha-nav-next" id="fichaNavNext">▶</button>
            <button class="ficha-slideshow-btn" id="fichaSlideshow">▶ Iniciar Slideshow</button>
            `:``}
          </div>
          ${a?`
          <div class="ficha-miniaturas" id="fichaMiniaturas">
            ${i.map((e,t)=>`
              <img src="${e}" class="ficha-thumb ${t===0?`ativo`:``}" data-ficha-indice="${t}" alt="Imagem ${t+1}">
            `).join(``)}
          </div>
          `:``}
        </div>
        <div class="ficha-info">
          <div class="titulo-ficha">${t.titulo}</div>
          <div class="serie-ficha">${t.serie?`Série: `+t.serie:`&nbsp;`}</div>
          <table class="tabela-ficha">
            <tr><td>Técnica</td><td>${_(t.tecnica)}</td></tr>
            <tr><td>Dimensões</td><td>${this.formatarDimensoes(t.dimensoes)}</td></tr>
            <tr><td>Ano</td><td>${t.ano||`-`}</td></tr>
            <tr><td>Status</td><td><span class="tag-status ${l(t.status)}">${u(t.status)}</span></td></tr>
            <tr><td>Preço</td><td>${n(t.preco)}</td></tr>
            <tr><td>Cadastrada em</td><td>${r(t.dataCadastro||t.criadoEm)}</td></tr>
          </table>
          ${t.descricao?`<div class="descricao-ficha">${t.descricao}</div>`:``}
          <div class="ficha-qrcode" id="fichaQRCode"></div>
          <div class="acoes-ficha">
            <button class="btn-secundario" id="btnEditarFicha">✎ Editar</button>
            <button class="btn-primario" id="btnExportarPdfFicha">📄 Exportar PDF</button>
            <button class="btn-secundario" id="btnCompartilharObra">🔗 Compartilhar</button>
          </div>
        </div>
      </div>
    `),document.getElementById(`btnEditarFicha`).addEventListener(`click`,()=>{c(),this.abrirFormulario(t.id)}),document.getElementById(`btnExportarPdfFicha`).addEventListener(`click`,()=>this.exportarPDF(t)),document.getElementById(`btnCompartilharObra`)?.addEventListener(`click`,()=>this.compartilharObra(t)),a){let e=0,n=document.getElementById(`fichaImgPrincipal`),r=document.querySelectorAll(`.ficha-thumb`),a=t=>{e=t,n.src=i[t],r.forEach((e,n)=>e.classList.toggle(`ativo`,n===t))};document.getElementById(`fichaNavPrev`).addEventListener(`click`,()=>{a((e-1+i.length)%i.length)}),document.getElementById(`fichaNavNext`).addEventListener(`click`,()=>{a((e+1)%i.length)}),document.getElementById(`fichaSlideshow`).addEventListener(`click`,()=>{this.abrirSlideshow(t.id)}),r.forEach(e=>{e.addEventListener(`click`,()=>a(parseInt(e.dataset.fichaIndice)))})}this.gerarQRCodeObra(t)}compartilharObra(e){let t=`${e.titulo} - ${_(e.tecnica)} - ${this.formatarDimensoes(e.dimensoes)} - ${n(e.preco)}`;navigator.share?navigator.share({title:e.titulo,text:t}).catch(()=>{}):navigator.clipboard.writeText(t).then(()=>i(`Informação copiadas para a área de transferência!`)).catch(()=>{})}gerarQRCodeObra(e){let t=document.getElementById(`fichaQRCode`);if(t){if(typeof QRCode>`u`){t.innerHTML=`<p class="texto-ajuda">QR Code indisponível.</p>`;return}try{let n=JSON.stringify({titulo:e.titulo,tecnica:e.tecnica,ano:e.ano,preco:e.preco,dimensoes:this.formatarDimensoes(e.dimensoes)});t.innerHTML=``;let r=document.createElement(`div`);t.appendChild(r),new QRCode(r,{text:n,width:120,height:120,colorDark:`#1a1a1a`,colorLight:`#ffffff`,correctLevel:QRCode.CorrectLevel.H})}catch{t.innerHTML=`<p class="texto-ajuda">Erro ao gerar QR Code.</p>`}}}abrirSlideshow(e){let t=P().porId(e);if(!t)return;let r=t.imagens&&t.imagens.length>0?t.imagens:[t.imagem];!r||r.length===0||j(r.map((e,i)=>({src:e,title:t.titulo||`Sem título`,subtitle:[t.tecnica,t.ano].filter(Boolean).join(` · `)+(r.length>1?` — Imagem ${i+1}/${r.length}`:``),caption:t.descricao||``,price:t.preco?n(t.preco):``,id:t.id})),0)}abrirComparacao(e){if(e.length<2){i(`Selecione pelo menos 2 obras para comparar.`);return}let t=e.map(e=>P().porId(e)).filter(Boolean);if(t.length<2)return;let r=t.map(e=>`
      <div class="comparacao-coluna">
        <div class="comparacao-imagem">
          <img src="${this.obterImagem(e)}" alt="${e.titulo}">
        </div>
        <h3 class="comparacao-titulo">${e.titulo}</h3>
        ${e.serie?`<p class="comparacao-serie">${e.serie}</p>`:``}
        <table class="comparacao-tabela">
          <tr><td>Técnica</td><td>${_(e.tecnica)}</td></tr>
          <tr><td>Dimensões</td><td>${this.formatarDimensoes(e.dimensoes)}</td></tr>
          <tr><td>Ano</td><td>${e.ano||`-`}</td></tr>
          <tr><td>Status</td><td><span class="tag-status ${l(e.status)}">${u(e.status)}</span></td></tr>
          <tr><td>Preço</td><td>${n(e.preco)}</td></tr>
          <tr><td>Série</td><td>${e.serie||`-`}</td></tr>
        </table>
      </div>
    `).join(``);s(`
      <h3>📊 Comparação de Obras</h3>
      <div class="comparacao-container" style="grid-template-columns: repeat(${Math.min(t.length,4)}, 1fr)">
        ${r}
      </div>
      <div class="modal-acoes">
        <button class="btn-secundario" id="btnFecharComparacao">Fechar</button>
        <button class="btn-primario" id="btnExportarComparacao">📄 Exportar Comparação</button>
      </div>
    `),document.getElementById(`btnFecharComparacao`).addEventListener(`click`,c),document.getElementById(`btnExportarComparacao`).addEventListener(`click`,()=>{this.exportarComparacaoPDF(t)})}adicionarComparacao(e){this.idsComparacao.includes(e)?(this.idsComparacao=this.idsComparacao.filter(t=>t!==e),this.idsComparacao.length===0&&(this.modoComparacao=!1)):(this.idsComparacao.push(e),this.modoComparacao=!0,this.selecionados.add(e)),this.rerenderizar(),this.idsComparacao.length>=2&&(this.abrirComparacao([...this.idsComparacao]),this.idsComparacao=[])}exportarComparacaoPDF(e){if(!window.jspdf){i(`Biblioteca de PDF indisponível.`);return}a(`Gerando comparação em PDF...`);let{jsPDF:t}=window.jspdf,r=new t({unit:`mm`,format:`a4`,orientation:e.length>2?`landscape`:`portrait`});r.setFont(`helvetica`,`bold`),r.setFontSize(18),r.text(`Comparação de Obras`,r.internal.pageSize.getWidth()/2,20,{align:`center`});let s=35,c=(r.internal.pageSize.getWidth()-30)/e.length;e.forEach((e,t)=>{let i=15+t*c;r.setDrawColor(200),r.rect(i,s-5,c-4,80);let a=this.obterImagem(e);if(/^data:image\/(png|jpe?g)/i.test(a||``))try{r.addImage(a,/png/i.test(a)?`PNG`:`JPEG`,i+2,s,c-8,35,void 0,`FAST`)}catch{}s+=40,r.setFont(`helvetica`,`bold`),r.setFontSize(10),r.text(e.titulo||`Sem título`,i+(c-4)/2,s,{align:`center`,maxWidth:c-8}),s+=6,r.setFont(`helvetica`,`normal`),r.setFontSize(8),[[`Técnica`,_(e.tecnica)],[`Dimensões`,this.formatarDimensoes(e.dimensoes)],[`Ano`,String(e.ano||`-`)],[`Status`,u(e.status)],[`Preço`,n(e.preco)]].forEach(([e,t])=>{r.setFont(`helvetica`,`bold`),r.text(e+`:`,i+2,s),r.setFont(`helvetica`,`normal`);let n=r.getTextWidth(e+`: `);r.text(t,i+2+n,s),s+=5}),s=35}),r.save(`comparacao-obras-${new Date().toISOString().slice(0,10)}.pdf`),o(),i(`Comparação exportada em PDF!`)}excluirObra(e){let t=P().porId(e);t&&confirm(`Excluir a obra "${t.titulo}"? Essa ação não pode ser desfeita.`)&&(P().remover(e),i(`Obra excluída.`),this.rerenderizar())}exportarPDF(e){if(!window.jspdf){i(`Biblioteca de PDF indisponível (verifique sua conexão com a internet).`);return}a(`Gerando ficha técnica em PDF...`);let{jsPDF:t}=window.jspdf,r=new t({unit:`mm`,format:`a4`}),s=r.internal.pageSize.getWidth(),c=r.internal.pageSize.getHeight(),l=z().artista&&z().artista.nome||`Ateliê do Artista`;r.setFont(`helvetica`,`bold`),r.setFontSize(20),r.setTextColor(30,30,30),r.text(l,s/2,22,{align:`center`}),r.setDrawColor(200),r.setLineWidth(.4),r.line(25,28,s-25,28),r.setFont(`helvetica`,`normal`),r.setFontSize(10),r.setTextColor(130),r.text(`Ficha Técnica de Obra`,s/2,35,{align:`center`});let d=46,f=this.obterImagem(e);if(/^data:image\/(png|jpe?g)/i.test(f||``))try{let e=/png/i.test(f)?`PNG`:`JPEG`;r.addImage(f,e,(s-110)/2,d,110,110,void 0,`FAST`),d+=122}catch(e){console.warn(`Não foi possível inserir a imagem no PDF:`,e)}else r.setDrawColor(210),r.rect((s-90)/2,d,90,90),r.setFontSize(9),r.setTextColor(180),r.text(`Imagem não disponível`,s/2,d+45,{align:`center`}),d+=102;r.setFont(`helvetica`,`bold`),r.setFontSize(16),r.setTextColor(20),r.text(e.titulo||`Sem título`,s/2,d,{align:`center`}),d+=9,e.serie&&(r.setFont(`helvetica`,`italic`),r.setFontSize(10),r.setTextColor(120),r.text(`Série: ${e.serie}`,s/2,d,{align:`center`}),d+=8),r.setFont(`helvetica`,`normal`),r.setFontSize(11),r.setTextColor(60),[`Técnica: ${_(e.tecnica)}`,`Dimensões: ${this.formatarDimensoes(e.dimensoes)}`,`Ano: ${e.ano||`-`}`,`Status: ${u(e.status)}`,`Preço: ${n(e.preco)}`].forEach(e=>{r.text(e,s/2,d,{align:`center`}),d+=6.5}),e.descricao&&(d+=4,r.setFont(`helvetica`,`italic`),r.setFontSize(10),r.setTextColor(90),r.text(r.splitTextToSize(e.descricao,s-60),s/2,d,{align:`center`})),r.setDrawColor(210),r.line(25,c-20,s-25,c-20),r.setFont(`helvetica`,`normal`),r.setFontSize(8),r.setTextColor(150),r.text(`Ficha gerada em ${new Date().toLocaleDateString(`pt-BR`)} · Atelier CRM`,s/2,c-14,{align:`center`});let p=`ficha-${(e.titulo||`obra`).toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/[^a-z0-9]+/g,`-`)}.pdf`;r.save(p),o(),i(`PDF exportado com sucesso!`)}},ie=class extends D{constructor(e,t){super(e,t),this.busca=``,this.modo=`lista`,this.selecionados=new Set,Y.on(`abrir-novo-cliente`,()=>this.abrirFormulario())}clientesFiltrados(){let e=I().items;if(this.busca){let t=this.busca.toLowerCase();e=e.filter(e=>(e.nome||``).toLowerCase().includes(t)||(e.email||``).toLowerCase().includes(t)||(e.tags||[]).some(e=>e.toLowerCase().includes(t)))}return[...e].sort((e,t)=>(e.nome||``).localeCompare(t.nome||``))}comprasDoCliente(e){return R().items.filter(t=>t.clienteId===e).sort((e,t)=>new Date(t.data)-new Date(e.data))}render(){let e=this.clientesFiltrados(),t=e.length?this.modo===`lista`?this.renderTabela(e):this.renderCards(e):`<div class="tabela-wrapper"><div class="estado-vazio"><div class="icone-vazio">👤</div><p>Nenhum cliente encontrado.</p></div></div>`,n=e.reduce((e,t)=>e+(t.aquisicoes||0),0);return`
      <div class="view-cabecalho">
        <div>
          <h2>Clientes</h2>
          <p class="subtitulo">${e.length} cliente${e.length===1?``:`s`} · ${n} aquisição${n===1?``:`ões`} no total</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAllCli" ${this.selecionados.size===e.length&&e.length>0?`checked`:``}>
            <label for="selectAllCli">Todos</label>
          </div>
          <div class="toggle-visualizacao">
            <button id="btnListaCli" class="${this.modo===`lista`?`ativo`:``}" title="Tabela">☰ Lista</button>
            <button id="btnGridCli" class="${this.modo===`grid`?`ativo`:``}" title="Cards">▦ Cards</button>
          </div>
          <button class="btn-gradient" id="btnNovoCliente">✚ Novo Cliente</button>
        </div>
      </div>
      ${this.selecionados.size>0?this.renderBarraBulk():``}
      <div class="catalogo-filtros">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="buscaClientes" placeholder="Nome, e-mail ou tag..." value="${this.busca}">
        </div>
      </div>
      ${t}
    `}renderBarraBulk(){return`
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} cliente${this.selecionados.size===1?``:`s`} selecionado${this.selecionados.size===1?``:`s`}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkExportCli">📄 Exportar</button>
          <button class="btn-secundario btn-danger" id="bulkExcluirCli">🗑 Excluir</button>
          <button class="btn-secundario" id="bulkCancelarCli">✕ Cancelar</button>
        </div>
      </div>
    `}renderTabela(e){return`
      <div class="tabela-wrapper">
        <table>
          <thead><tr><th style="width:36px;"></th><th>Nome</th><th>E-mail</th><th>Telefone</th><th>Aquisições</th><th>Tags</th><th></th></tr></thead>
          <tbody>${e.map(e=>`
      <tr class="${this.selecionados.has(e.id)?`linha-selecionada`:``}">
        <td onclick="event.stopPropagation()">
          <input type="checkbox" class="checkbox-item-cli" data-id="${e.id}" ${this.selecionados.has(e.id)?`checked`:``}>
        </td>
        <td data-abrir-ficha-cliente="${e.id}" style="cursor:pointer;"><strong>${e.nome}</strong></td>
        <td data-abrir-ficha-cliente="${e.id}" style="cursor:pointer;">${e.email||`-`}</td>
        <td>${e.telefone||`-`}</td>
        <td>${e.aquisicoes||0}</td>
        <td>${(e.tags||[]).map(e=>`<span class="badge-tag">${e}</span>`).join(``)||`-`}</td>
        <td class="acoes-linha-tabela" onclick="event.stopPropagation()">
          <button class="btn-icone-tabela" data-editar-cliente="${e.id}" title="Editar">✏️</button>
          <button class="btn-icone-tabela" data-excluir-cliente="${e.id}" title="Excluir">🗑️</button>
        </td>
      </tr>
    `).join(``)}</tbody>
        </table>
      </div>
    `}renderCards(e){return`
      <div class="grid-clientes stagger-in">
        ${e.map(e=>`
          <div class="card-cliente ${this.selecionados.has(e.id)?`selecionada`:``}">
            <div class="checkbox-bulk">
              <input type="checkbox" class="checkbox-item-cli" data-id="${e.id}" ${this.selecionados.has(e.id)?`checked`:``}>
            </div>
            <div class="cc-avatar">${(e.nome||`?`).charAt(0).toUpperCase()}</div>
            <div class="cc-info" data-abrir-ficha-cliente="${e.id}">
              <div class="cc-nome">${e.nome}</div>
              <div class="cc-meta">${e.email||`sem email`}</div>
            </div>
            <div class="cc-footer">
              <span class="cc-aquisicoes">${e.aquisicoes||0} compra${(e.aquisicoes||0)===1?``:`s`}</span>
              <div class="cc-tags">${(e.tags||[]).slice(0,2).map(e=>`<span class="badge-tag">${e}</span>`).join(``)}</div>
            </div>
            <div class="cc-acoes">
              <button data-editar-cliente="${e.id}" title="Editar">✏️</button>
              <button data-excluir-cliente="${e.id}" title="Excluir">🗑️</button>
            </div>
          </div>
        `).join(``)}
      </div>
    `}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`);document.getElementById(`btnListaCli`)?.addEventListener(`click`,()=>{this.modo=`lista`,this.rerenderizar()}),document.getElementById(`btnGridCli`)?.addEventListener(`click`,()=>{this.modo=`grid`,this.rerenderizar()}),document.getElementById(`btnNovoCliente`)?.addEventListener(`click`,()=>this.abrirFormulario());let t=document.getElementById(`buscaClientes`);t&&t.addEventListener(`input`,e=>{this.busca=e.target.value,this.rerenderizar(!0)});let n=document.getElementById(`selectAllCli`);n&&n.addEventListener(`change`,e=>{let t=this.clientesFiltrados();e.target.checked?t.forEach(e=>this.selecionados.add(e.id)):this.selecionados.clear(),this.rerenderizar()}),e.addEventListener(`change`,e=>{if(e.target.classList.contains(`checkbox-item-cli`)){let t=e.target.dataset.id;e.target.checked?this.selecionados.add(t):this.selecionados.delete(t),this.rerenderizar()}}),document.getElementById(`bulkExportCli`)?.addEventListener(`click`,()=>this.bulkAcao(`exportar`)),document.getElementById(`bulkExcluirCli`)?.addEventListener(`click`,()=>this.bulkAcao(`excluir`)),document.getElementById(`bulkCancelarCli`)?.addEventListener(`click`,()=>{this.selecionados.clear(),this.rerenderizar()});let r=e=>{let t=e.target.closest(`[data-editar-cliente]`),n=e.target.closest(`[data-excluir-cliente]`),r=e.target.closest(`[data-abrir-ficha-cliente]`);if(t){this.abrirFormulario(t.dataset.editarCliente);return}if(n){this.excluirCliente(n.dataset.excluirCliente);return}if(r){this.abrirFicha(r.dataset.abrirFichaCliente);return}};e.addEventListener(`click`,r),this._bindCache.delegClientes={el:e,handler:r,type:`click`}}rerenderizar(e=!1){let t=document.getElementById(`viewPrincipal`),n=e?document.activeElement.id:null;if(this.removerListeners(),t.innerHTML=this.render(),this.aposRenderizar(),n){let e=document.getElementById(n);if(e){e.focus();let t=e.value;e.value=``,e.value=t}}}bulkAcao(e){let t=Array.from(this.selecionados);if(t.length!==0){switch(e){case`exportar`:{let e=t.map(e=>I().porId(e)).filter(Boolean),n=[[`nome`,`email`,`telefone`,`aquisicoes`,`tags`].join(`,`),...e.map(e=>[e.nome,e.email||``,e.telefone||``,e.aquisicoes||0,(e.tags||[]).join(`;`)].map(e=>`"${String(e).replace(/"/g,`""`)}"`).join(`,`))].join(`
`),r=new Blob([`﻿`+n],{type:`text/csv;charset=utf-8`}),a=document.createElement(`a`);a.href=URL.createObjectURL(r),a.download=`clientes-${new Date().toISOString().slice(0,10)}.csv`,a.click(),URL.revokeObjectURL(a.href),i(`${e.length} cliente(s) exportado(s)`);break}case`excluir`:t.forEach(e=>{I().porId(e)&&!R().items.some(t=>t.clienteId===e)&&I().remover(e)}),i(`${t.length} cliente(s) excluído(s) (com vendas preservados)`);break}this.selecionados.clear(),this.rerenderizar()}}abrirFormulario(e=null){let t=e?I().porId(e):null;s(`
      <h3>${t?`Editar Cliente`:`Novo Cliente`}</h3>
      <form id="formCliente">
        <div class="campo-form">
          <label>Nome completo *</label>
          <input type="text" id="campoNomeCliente" value="${t?t.nome:``}" required>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>E-mail</label>
            <input type="email" id="campoEmailCliente" value="${t&&t.email||``}">
          </div>
          <div class="campo-form">
            <label>Telefone</label>
            <input type="text" id="campoTelefoneCliente" value="${t&&t.telefone||``}" placeholder="(00) 00000-0000">
          </div>
        </div>
        <div class="campo-form">
          <label>Endereço</label>
          <input type="text" id="campoEnderecoCliente" value="${t&&t.endereco||``}">
        </div>
        <div class="campo-form">
          <label>Tags (separadas por vírgula)</label>
          <input type="text" id="campoTagsCliente" value="${t?(t.tags||[]).join(`, `):``}" placeholder="Ex: colecionador, aquarela">
        </div>
        <div class="campo-form">
          <label>Notas</label>
          <textarea id="campoNotasCliente">${t&&t.notas||``}</textarea>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarCliente">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar Cliente</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarCliente`).addEventListener(`click`,c),document.getElementById(`formCliente`).addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`campoNomeCliente`).value.trim();if(!n){i(`O nome do cliente é obrigatório.`);return}let r=document.getElementById(`campoTagsCliente`).value.split(`,`).map(e=>e.trim()).filter(Boolean),a={nome:n,email:document.getElementById(`campoEmailCliente`).value.trim(),telefone:document.getElementById(`campoTelefoneCliente`).value.trim(),endereco:document.getElementById(`campoEnderecoCliente`).value.trim(),notas:document.getElementById(`campoNotasCliente`).value.trim(),tags:r};t?(I().atualizar(t.id,a),i(`Cliente atualizado com sucesso!`)):(a.aquisicoes=0,I().adicionar(a),i(`Cliente cadastrado com sucesso!`)),c(),this.router.navegar(`clientes`)})}excluirCliente(e){let t=I().porId(e);if(t){if(R().items.some(t=>t.clienteId===e)){i(`Este cliente possui vendas registradas e não pode ser excluído.`);return}confirm(`Excluir o cliente "${t.nome}"?`)&&(I().remover(e),this.rerenderizar())}}abrirFicha(e){let t=I().porId(e);if(!t)return;let i=this.comprasDoCliente(e),a=P().items,o=i.length?i.map(e=>{let t=a.find(t=>t.id===e.obraId);return`
        <li class="timeline-item">
          <div class="timeline-data">${r(e.data)}</div>
          <div class="timeline-conteudo">
            <strong>${t?t.titulo:`Obra removida`}</strong>
            ${n(e.precoFinal)} · <span class="tag-status ${v(e.status)}">${y(e.status)}</span>
          </div>
        </li>
      `}).join(``):`<p style="font-size:0.85rem;color:var(--text-muted);">Nenhuma compra registrada ainda.</p>`;s(`
      <h3>${t.nome}</h3>
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">${t.email||`sem e-mail`} · ${t.telefone||`sem telefone`}</p>
      <div style="margin-bottom:10px;">${(t.tags||[]).map(e=>`<span class="badge-tag">${e}</span>`).join(``)||``}</div>
      ${t.endereco?`<p style="font-size:0.82rem;margin-top:8px;"><strong>Endereço:</strong> ${t.endereco}</p>`:``}
      ${t.notas?`<p style="font-size:0.82rem;margin-top:6px;"><strong>Notas:</strong> ${t.notas}</p>`:``}
      <h3 style="margin-top:20px;font-size:0.95rem;">Histórico de compras</h3>
      <ul class="timeline-cliente">${o}</ul>
      <div class="modal-acoes">
        <button class="btn-secundario" id="btnFecharFichaCliente">Fechar</button>
        <button class="btn-primario" id="btnEditarFichaCliente">✏️ Editar</button>
      </div>
    `),document.getElementById(`btnFecharFichaCliente`).addEventListener(`click`,c),document.getElementById(`btnEditarFichaCliente`).addEventListener(`click`,()=>{c(),this.abrirFormulario(t.id)})}},ae=class extends D{constructor(e,t,n){super(e,t),this.pdfGenerator=n,this.filtros={cliente:``,status:``,dataInicio:``,dataFim:``},this.selecionados=new Set,Y.on(`abrir-nova-venda`,()=>this.abrirFormulario()),Y.on(`abrir-recibo-rapido`,()=>this.abrirEscolhaRapida())}vendasFiltradas(){let e=this.filtros,t=R().items;return e.cliente&&(t=t.filter(t=>t.clienteId===e.cliente)),e.status&&(t=t.filter(t=>v(t.status)===v(e.status))),e.dataInicio&&(t=t.filter(t=>new Date(t.data)>=new Date(e.dataInicio))),e.dataFim&&(t=t.filter(t=>new Date(t.data)<=new Date(e.dataFim))),[...t].sort((e,t)=>new Date(t.data)-new Date(e.data))}render(){let e=this.vendasFiltradas(),t=P().items,i=I().items,a=[`negociação`,`aprovada`,`paga`,`entregue`],o=e.map(e=>{let o=t.find(t=>t.id===e.obraId),s=i.find(t=>t.id===e.clienteId);return`
        <tr class="${this.selecionados.has(e.id)?`linha-selecionada`:``}">
          <td onclick="event.stopPropagation()">
            <input type="checkbox" class="checkbox-item-vend" data-id="${e.id}" ${this.selecionados.has(e.id)?`checked`:``}>
          </td>
          <td>${o?o.titulo:`<span style="color:var(--text-muted)">Obra removida</span>`}</td>
          <td>${s?s.nome:`-`}</td>
          <td>${n(e.precoFinal)}</td>
          <td>${r(e.data)}</td>
          <td>${_(e.formaPagamento)}</td>
          <td>
            <select class="select-status-venda" data-status-venda="${e.id}">
              ${a.map(t=>`<option value="${t}" ${v(e.status)===v(t)?`selected`:``}>${y(t)}</option>`).join(``)}
            </select>
          </td>
          <td class="acoes-linha-tabela">
            <button class="btn-icone-tabela" data-gerar-recibo="${e.id}">ð Recibo</button>
            <button class="btn-icone-tabela" data-gerar-proposta="${e.id}">ð Proposta</button>
            <button class="btn-icone-tabela" data-cancelar-venda="${e.id}" title="Cancelar venda">â</button>
          </td>
        </tr>
      `}).join(``),s=e.length?`
      <div class="tabela-wrapper">
        <table>
          <thead><tr><th style="width:36px;"></th><th>Obra</th><th>Cliente</th><th>Valor</th><th>Data</th><th>Pagamento</th><th>Status</th><th></th></tr></thead>
          <tbody>${o}</tbody>
        </table>
      </div>
    `:`
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio">ð°</div><p>Nenhuma venda encontrada com os filtros atuais.</p></div>
      </div>
    `,c=e.reduce((e,t)=>e+Number(t.precoFinal||0),0),l={};e.forEach(e=>{let t=y(e.status);l[t]=(l[t]||0)+1});let u=Object.entries(l).map(([e,t])=>`<span class="chip-filtro" style="font-size:0.72rem;padding:2px 8px;cursor:default;">${e}: ${t}</span>`).join(` `);return`
      <div class="view-cabecalho">
        <div>
          <h2>Vendas</h2>
          <p class="subtitulo">${e.length} venda${e.length===1?``:`s`} · ${n(c)} em negócios</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAllVend" ${this.selecionados.size===e.length&&e.length>0?`checked`:``}>
            <label for="selectAllVend">Todos</label>
          </div>
          <button class="btn-gradient" id="btnNovaVenda">â Nova Venda</button>
        </div>
      </div>
      ${e.length>0?`<div class="vendas-summary">${u}</div>`:``}
      ${this.selecionados.size>0?`
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} venda${this.selecionados.size===1?``:`s`} selecionada${this.selecionados.size===1?``:`s`}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkExportVend">ð Exportar</button>
          <button class="btn-secundario btn-danger" id="bulkCancelarVend">â Cancelar</button>
        </div>
      </div>`:``}
      <div class="catalogo-filtros">
        <div class="campo-filtro">
          <label>Cliente</label>
          <select id="filtroVendaCliente">
            <option value="">Todos</option>
            ${i.map(e=>`<option value="${e.id}" ${this.filtros.cliente===e.id?`selected`:``}>${e.nome}</option>`).join(``)}
          </select>
        </div>
        <div class="campo-filtro">
          <label>Status</label>
          <select id="filtroVendaStatus">
            <option value="">Todos</option>
            ${a.map(e=>`<option value="${e}" ${this.filtros.status===e?`selected`:``}>${y(e)}</option>`).join(``)}
          </select>
        </div>
        <div class="campo-filtro"><label>De</label><input type="date" id="filtroVendaDataInicio" value="${this.filtros.dataInicio}"></div>
        <div class="campo-filtro"><label>Até</label><input type="date" id="filtroVendaDataFim" value="${this.filtros.dataFim}"></div>
        <button class="btn-secundario" id="btnLimparFiltrosVenda">Limpar filtros</button>
      </div>

      ${s}
    `}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`),t=document.getElementById(`btnNovaVenda`);t&&t.addEventListener(`click`,()=>this.abrirFormulario());let n={filtroVendaCliente:`cliente`,filtroVendaStatus:`status`,filtroVendaDataInicio:`dataInicio`,filtroVendaDataFim:`dataFim`};Object.keys(n).forEach(e=>{let t=document.getElementById(e);t&&t.addEventListener(`change`,t=>{this.filtros[n[e]]=t.target.value,this.rerenderizar()})});let r=document.getElementById(`btnLimparFiltrosVenda`);r&&r.addEventListener(`click`,()=>{this.filtros={cliente:``,status:``,dataInicio:``,dataFim:``},this.rerenderizar()});let i=document.getElementById(`selectAllVend`);i&&i.addEventListener(`change`,e=>{let t=this.vendasFiltradas();e.target.checked?t.forEach(e=>this.selecionados.add(e.id)):this.selecionados.clear(),this.rerenderizar()}),e.addEventListener(`change`,e=>{if(e.target.classList.contains(`checkbox-item-vend`)){let t=e.target.dataset.id;e.target.checked?this.selecionados.add(t):this.selecionados.delete(t),this.rerenderizar()}}),document.getElementById(`bulkExportVend`)?.addEventListener(`click`,()=>this.bulkAcao(`exportar`)),document.getElementById(`bulkCancelarVend`)?.addEventListener(`click`,()=>{this.selecionados.clear(),this.rerenderizar()});let a=e=>{let t=e.target.closest(`[data-gerar-recibo]`),n=e.target.closest(`[data-gerar-proposta]`),r=e.target.closest(`[data-cancelar-venda]`);if(t){this.pdfGenerator.abrirModalAssinatura(R().porId(t.dataset.gerarRecibo),`recibo`);return}if(n){this.pdfGenerator.abrirModalAssinatura(R().porId(n.dataset.gerarProposta),`proposta`);return}if(r){this.cancelarVenda(r.dataset.cancelarVenda);return}};e.addEventListener(`click`,a),this._bindCache.delegVendasClick={el:e,handler:a,type:`click`};let o=e=>{let t=e.target.closest(`[data-status-venda]`);t&&this.atualizarStatus(t.dataset.statusVenda,e.target.value)};e.addEventListener(`change`,o),this._bindCache.delegVendasChange={el:e,handler:o,type:`change`}}atualizarStatus(e,t){R().atualizar(e,{status:t}),i(`Status da venda atualizado.`)}bulkAcao(e){let t=Array.from(this.selecionados);if(t.length!==0){switch(e){case`exportar`:{let e=t.map(e=>R().porId(e)).filter(Boolean),n=P().items,r=I().items,a=[[`obra`,`cliente`,`valor`,`data`,`pagamento`,`status`].join(`,`),...e.map(e=>{let t=n.find(t=>t.id===e.obraId),i=r.find(t=>t.id===e.clienteId);return[t?.titulo||``,i?.nome||``,e.precoFinal||0,e.data||``,e.formaPagamento||``,e.status||``].map(e=>`"${String(e).replace(/"/g,`""`)}"`).join(`,`)})].join(`
`),o=new Blob([`﻿`+a],{type:`text/csv;charset=utf-8`}),s=document.createElement(`a`);s.href=URL.createObjectURL(o),s.download=`vendas-${new Date().toISOString().slice(0,10)}.csv`,s.click(),URL.revokeObjectURL(s.href),i(`${e.length} venda(s) exportada(s)`);break}}this.selecionados.clear(),this.rerenderizar()}}abrirFormulario(){let e=P().items.filter(e=>l(e.status)!==`vendida`),t=I().items;if(!e.length){i(`Não há obras disponíveis para venda no momento.`);return}s(`
      <h3>Nova Venda</h3>
      <form id="formVenda">
        <div class="campo-form">
          <label>Obra *</label>
          <select id="campoObraVenda" required>
            <option value="">Selecione a obra...</option>
            ${e.map(e=>`<option value="${e.id}" data-preco="${e.preco}">${e.titulo} (${n(e.preco)})</option>`).join(``)}
          </select>
        </div>
        <div class="campo-form">
          <label>Cliente *</label>
          <select id="campoClienteVenda" required>
            <option value="">Selecione...</option>
            ${t.map(e=>`<option value="${e.id}">${e.nome}</option>`).join(``)}
            <option value="__novo__">+ Cadastrar novo cliente</option>
          </select>
        </div>
        <div id="blocoNovoClienteVenda" style="display:none;">
          <div class="form-linha">
            <div class="campo-form"><label>Nome do novo cliente *</label><input type="text" id="campoNovoClienteNome"></div>
            <div class="campo-form"><label>Telefone</label><input type="text" id="campoNovoClienteTelefone"></div>
          </div>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Preço final (R$) *</label>
            <input type="number" id="campoPrecoVenda" required>
          </div>
          <div class="campo-form">
            <label>Data</label>
            <input type="date" id="campoDataVenda" value="${new Date().toISOString().slice(0,10)}">
          </div>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Forma de pagamento</label>
            <select id="campoFormaPagamento">
              <option value="à vista">à vista</option>
              <option value="parcelado">Parcelado</option>
              <option value="transferência">Transferência</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
          </div>
          <div class="campo-form">
            <label>Status</label>
            <select id="campoStatusVenda">
              <option value="negociação">Negociação</option>
              <option value="aprovada">Aprovada</option>
              <option value="paga">Paga</option>
              <option value="entregue">Entregue</option>
            </select>
          </div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarVenda">Cancelar</button>
          <button type="submit" class="btn-primario">Confirmar Venda</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarVenda`).addEventListener(`click`,c),document.getElementById(`campoObraVenda`).addEventListener(`change`,e=>{let t=e.target.selectedOptions[0];t&&t.dataset.preco&&(document.getElementById(`campoPrecoVenda`).value=t.dataset.preco)}),document.getElementById(`campoClienteVenda`).addEventListener(`change`,e=>{document.getElementById(`blocoNovoClienteVenda`).style.display=e.target.value===`__novo__`?`block`:`none`}),document.getElementById(`formVenda`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`campoObraVenda`).value,n=document.getElementById(`campoClienteVenda`).value,r=document.getElementById(`campoPrecoVenda`).value;if(!t||!n||r===``){i(`Selecione a obra, o cliente e informe o preço final.`);return}if(n===`__novo__`){let e=document.getElementById(`campoNovoClienteNome`).value.trim();if(!e){i(`Informe o nome do novo cliente.`);return}n=I().adicionar({nome:e,telefone:document.getElementById(`campoNovoClienteTelefone`).value.trim(),email:``,endereco:``,notas:``,tags:[],aquisicoes:0}).id}let a={obraId:t,clienteId:n,precoFinal:Number(r),data:document.getElementById(`campoDataVenda`).value||new Date().toISOString().slice(0,10),formaPagamento:document.getElementById(`campoFormaPagamento`).value,status:document.getElementById(`campoStatusVenda`).value};R().adicionar(a),P().atualizar(t,{status:`vendida`});let o=I().porId(n);o&&I().atualizar(n,{aquisicoes:(o.aquisicoes||0)+1}),c(),i(`Venda registrada com sucesso!`),this.router.navegar(`vendas`)})}cancelarVenda(e){let t=R().porId(e);if(!t||!confirm(`Cancelar esta venda? A obra voltará a ficar disponível no catálogo.`))return;P().atualizar(t.obraId,{status:`disponível`});let n=I().porId(t.clienteId);n&&I().atualizar(t.clienteId,{aquisicoes:Math.max(0,(n.aquisicoes||0)-1)}),R().remover(e),i(`Venda cancelada.`),this.rerenderizar()}abrirEscolhaRapida(){let e=R().items;if(!e.length){i(`Nenhuma venda registrada ainda. Registre uma venda primeiro.`);return}let t=P().items,r=I().items;s(`
      <h3>Selecione a venda</h3>
      <ul class="lista-escolha-venda">${e.map(e=>{let i=t.find(t=>t.id===e.obraId),a=r.find(t=>t.id===e.clienteId);return`
        <li class="item-escolha-venda">
          <span>${i?i.titulo:`-`} â ${a?a.nome:`-`} (${n(e.precoFinal)})</span>
          <button class="btn-secundario" data-escolher-venda="${e.id}">Gerar Recibo</button>
        </li>
      `}).join(``)}</ul>
      <div class="modal-acoes"><button class="btn-secundario" id="btnFecharEscolhaVenda">Fechar</button></div>
    `),document.getElementById(`btnFecharEscolhaVenda`).addEventListener(`click`,c),document.querySelectorAll(`[data-escolher-venda]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=R().porId(e.dataset.escolherVenda);c(),this.pdfGenerator.abrirModalAssinatura(t,`recibo`)})})}},oe=class{constructor(e){this.dataStore=e}gerarNumero(e){let t=new Date().getFullYear(),n=this.dataStore.dados.config,r=e===`proposta`?`contadorPropostas`:`contadorRecibos`;return n[r]||(n[r]={}),n[r][t]=(n[r][t]||0)+1,this.dataStore.salvar(),`${e===`proposta`?`ORC`:`REC`}-${t}-${String(n[r][t]).padStart(3,`0`)}`}obterCoresTema(){let e=getComputedStyle(document.body);return{bg:e.getPropertyValue(`--bg`).trim()||`#ffffff`,text:e.getPropertyValue(`--text`).trim()||`#1a1a1a`,textMuted:e.getPropertyValue(`--text-muted`).trim()||`#6b7280`,accent:e.getPropertyValue(`--accent`).trim()||`#2563eb`,card:e.getPropertyValue(`--card`).trim()||`#f8fafc`,border:e.getPropertyValue(`--border`).trim()||`#e5e7eb`,fonte:(e.getPropertyValue(`--font-principal`).trim()||`Arial, sans-serif`).replace(/'/g,``)}}abrirModalAssinatura(e,t){if(!e){i(`Venda não encontrada.`);return}let r=this.dataStore.buscarPorId(`obras`,e.obraId),a=this.dataStore.buscarPorId(`clientes`,e.clienteId);if(!r||!a){i(`Não foi possível localizar a obra ou o cliente desta venda.`);return}let o=t===`proposta`?`numeroProposta`:`numeroRecibo`;e[o]||(e[o]=this.gerarNumero(t),this.dataStore.atualizar(`vendas`,e.id,{[o]:e[o]})),s(`
      <h3>Gerar ${t===`proposta`?`Proposta de Orçamento`:`Recibo de Venda`}</h3>
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:14px;">
        ${r.titulo} — ${a.nome} — ${n(e.precoFinal)} · Nº ${e[o]}
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
    `);let l=document.getElementById(`canvasAssinatura`),u=l.getContext(`2d`);u.lineWidth=2,u.lineCap=`round`,u.strokeStyle=`#1a1a1a`;let d=!1,f=e=>{let t=l.getBoundingClientRect(),n=e.touches?e.touches[0]:e;return{x:(n.clientX-t.left)*(l.width/t.width),y:(n.clientY-t.top)*(l.height/t.height)}},p=e=>{d=!0;let t=f(e);u.beginPath(),u.moveTo(t.x,t.y),e.preventDefault()},m=e=>{if(!d)return;let t=f(e);u.lineTo(t.x,t.y),u.stroke(),e.preventDefault()},h=()=>{d=!1};l.addEventListener(`mousedown`,p),l.addEventListener(`mousemove`,m),window.addEventListener(`mouseup`,h),l.addEventListener(`touchstart`,p,{passive:!1}),l.addEventListener(`touchmove`,m,{passive:!1}),l.addEventListener(`touchend`,h),document.getElementById(`btnLimparAssinatura`).addEventListener(`click`,()=>u.clearRect(0,0,l.width,l.height)),document.getElementById(`btnCancelarPdf`).addEventListener(`click`,c),document.getElementById(`btnGerarPdfFinal`).addEventListener(`click`,()=>{this.gerarPdf(e,r,a,t,l.toDataURL(`image/png`))})}async gerarPdf(e,t,a,o,s){if(!window.jspdf||!window.html2canvas){i(`Bibliotecas de PDF indisponíveis (verifique sua conexão com a internet).`);return}i(`Gerando PDF, aguarde...`);let l=this.obterCoresTema(),u=this.dataStore.dados.config.artista||{},d=u.nome||`Ateliê do Artista`,f=e[o===`proposta`?`numeroProposta`:`numeroRecibo`],p=o===`proposta`?`PROPOSTA DE ORÇAMENTO`:`RECIBO DE VENDA`,m=this.dataStore.dados.config.textoGarantia||``,h=t.dimensoes||{},g=[h.altura,h.largura,h.profundidade].filter(e=>e&&Number(e)>0),v=g.length?`${g.join(` x `)} cm`:`-`,b=/^data:image\/(png|jpe?g)/i.test(t.imagem||``)?`<img src="${t.imagem}" style="width:150px;height:150px;object-fit:cover;border-radius:6px;border:1px solid ${l.border};">`:``,x=document.createElement(`div`);x.style.cssText=`position:fixed;left:-9999px;top:0;width:750px;background:${l.bg};color:${l.text};font-family:${l.fonte};padding:48px;box-sizing:border-box;`,x.innerHTML=`
      <div style="text-align:center;border-bottom:2px solid ${l.border};padding-bottom:18px;margin-bottom:24px;">
        <div style="font-size:26px;font-weight:700;">${d}</div>
        <div style="font-size:12px;color:${l.textMuted};margin-top:4px;">${u.email||``}${u.telefone?` · `+u.telefone:``}</div>
      </div>
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:20px;font-weight:700;color:${l.accent};letter-spacing:1px;">${p}</div>
        <div style="font-size:12px;color:${l.textMuted};margin-top:6px;">Nº ${f} · ${r(e.data)}</div>
      </div>
      <div style="display:flex;gap:24px;margin-bottom:24px;">
        <div style="flex:1;background:${l.card};border:1px solid ${l.border};border-radius:10px;padding:16px;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:${l.textMuted};margin-bottom:8px;">Comprador</div>
          <div style="font-size:14px;font-weight:700;">${a.nome}</div>
          <div style="font-size:12px;color:${l.textMuted};margin-top:4px;">${a.email||``}</div>
          <div style="font-size:12px;color:${l.textMuted};">${a.telefone||``}</div>
          ${a.endereco?`<div style="font-size:12px;color:${l.textMuted};margin-top:4px;">${a.endereco}</div>`:``}
        </div>
        <div style="flex:1;background:${l.card};border:1px solid ${l.border};border-radius:10px;padding:16px;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:${l.textMuted};margin-bottom:8px;">Pagamento</div>
          <div style="font-size:20px;font-weight:700;color:${l.accent};">${n(e.precoFinal)}</div>
          <div style="font-size:12px;color:${l.textMuted};margin-top:4px;">Forma: ${_(e.formaPagamento)}</div>
          <div style="font-size:12px;color:${l.textMuted};">Status: ${y(e.status)}</div>
        </div>
      </div>
      <div style="display:flex;gap:20px;align-items:flex-start;background:${l.card};border:1px solid ${l.border};border-radius:10px;padding:16px;margin-bottom:24px;">
        ${b}
        <div>
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:${l.textMuted};margin-bottom:6px;">Obra</div>
          <div style="font-size:16px;font-weight:700;">${t.titulo}</div>
          <div style="font-size:12px;color:${l.textMuted};margin-top:4px;">${_(t.tecnica)} · ${v} · ${t.ano||`-`}</div>
        </div>
      </div>
      ${m?`<div style="font-size:11px;color:${l.textMuted};line-height:1.6;border-top:1px solid ${l.border};padding-top:14px;margin-bottom:28px;">${m}</div>`:``}
      <div style="display:flex;justify-content:center;margin-bottom:8px;">
        <div style="text-align:center;">
          ${s?`<img src="${s}" style="height:70px;">`:``}
          <div style="border-top:1px solid ${l.text};padding-top:6px;margin-top:2px;font-size:12px;min-width:220px;">${d}</div>
          <div style="font-size:10px;color:${l.textMuted};">Assinatura do artista</div>
        </div>
      </div>
      <div style="text-align:center;font-size:9px;color:${l.textMuted};margin-top:20px;border-top:1px solid ${l.border};padding-top:10px;">
        Documento gerado em ${new Date().toLocaleDateString(`pt-BR`)} · Atelier CRM
      </div>
    `,document.body.appendChild(x);try{let e=await window.html2canvas(x,{scale:2,backgroundColor:l.bg,useCORS:!0}),t=e.toDataURL(`image/png`),{jsPDF:n}=window.jspdf,r=new n({unit:`px`,format:[e.width,e.height]});r.addImage(t,`PNG`,0,0,e.width,e.height),r.save(`${o===`proposta`?`proposta`:`recibo`}-${f.toLowerCase()}.pdf`),i(`PDF gerado com sucesso!`),c()}catch(e){console.error(`Erro ao gerar PDF:`,e),i(`Não foi possível gerar o PDF. Tente novamente.`)}finally{document.body.removeChild(x)}}},se=class extends D{constructor(e,t){super(e,t)}certificadosOrdenados(){return[...this.dataStore.listar(`certificados`)].sort((e,t)=>new Date(t.dataEmissao||t.criadoEm)-new Date(e.dataEmissao||e.criadoEm))}render(){let e=this.certificadosOrdenados(),t=e.map(e=>`
      <tr>
        <td><strong>${e.tituloObra||`-`}</strong></td>
        <td>${e.numeroSerie}</td>
        <td>${e.edicaoTipo===`limitada`?`${e.edicaoAtual}/${e.edicaoTotal}`:`Única`}</td>
        <td>${r(e.dataEmissao||e.criadoEm)}</td>
        <td class="acoes-linha-tabela">
          <button class="btn-icone-tabela" data-baixar-certificado="${e.id}">📄 PDF</button>
          <button class="btn-icone-tabela" data-excluir-certificado="${e.id}">🗑️</button>
        </td>
      </tr>
    `).join(``),n=e.length?`
      <div class="tabela-wrapper">
        <table>
          <thead><tr><th>Obra</th><th>Nº de Série</th><th>Edição</th><th>Emitido em</th><th></th></tr></thead>
          <tbody>${t}</tbody>
        </table>
      </div>
    `:`
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio">📜</div><p>Nenhum certificado emitido ainda.</p></div>
      </div>
    `;return`
      <div class="view-cabecalho">
        <div>
          <h2>Certificados de Autenticidade</h2>
          <p class="subtitulo">${e.length} certificado${e.length===1?``:`s`} emitido${e.length===1?``:`s`}</p>
        </div>
        <button class="btn-gradient" id="btnNovoCertificado">🔏 Novo Certificado</button>
      </div>
      ${n}
    `}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`),t=document.getElementById(`btnNovoCertificado`);t&&t.addEventListener(`click`,()=>this.abrirFormulario());let n=e=>{let t=e.target.closest(`[data-baixar-certificado]`),n=e.target.closest(`[data-excluir-certificado]`);if(t){this.baixarNovamente(t.dataset.baixarCertificado);return}if(n){this.excluirCertificado(n.dataset.excluirCertificado);return}};e.addEventListener(`click`,n),this._bindCache.delegCertificados={el:e,handler:n,type:`click`}}excluirCertificado(e){confirm(`Excluir este certificado do histórico? O PDF já baixado não será afetado.`)&&(this.dataStore.remover(`certificados`,e),i(`Certificado excluído do histórico.`),this.rerenderizar())}gerarNumeroSerie(){let e=new Date().getFullYear(),t=this.dataStore.dados.config;return t.contadorCertificados||(t.contadorCertificados={}),t.contadorCertificados[e]=(t.contadorCertificados[e]||0)+1,this.dataStore.salvar(),`ART-${e}-${String(t.contadorCertificados[e]).padStart(3,`0`)}`}abrirFormulario(){let e=this.dataStore.listar(`obras`),t=(this.dataStore.dados.config.artista||{}).assinatura||``;s(`
      <h3>Novo Certificado de Autenticidade</h3>
      <form id="formCertificado">
        <div class="campo-form">
          <label>Origem dos dados</label>
          <select id="campoOrigemCertificado">
            <option value="">— Preencher manualmente —</option>
            ${e.map(e=>`<option value="${e.id}">${e.titulo}</option>`).join(``)}
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
          <div class="campo-form"><label>Data</label><input type="date" id="campoDataCert" value="${new Date().toISOString().slice(0,10)}"></div>
        </div>
        <div class="campo-form">
          <label>Assinatura do artista</label>
          <canvas id="canvasAssinaturaCert" class="area-assinatura" width="500" height="150"></canvas>
          <div class="legenda-assinatura">
            <label style="display:flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:400;color:var(--text-muted);">
              <input type="checkbox" id="campoSalvarAssinatura" ${t?`checked`:``}> Usar/salvar como assinatura padrão
            </label>
            <button type="button" class="btn-secundario" id="btnLimparAssinaturaCert" style="padding:5px 10px;font-size:0.75rem;">Limpar</button>
          </div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarCertificado">Cancelar</button>
          <button type="submit" class="btn-primario">Gerar Certificado (PDF)</button>
        </div>
      </form>
    `);let n=``;document.getElementById(`campoOrigemCertificado`).addEventListener(`change`,t=>{let r=e.find(e=>e.id===t.target.value);if(!r){n=``;return}document.getElementById(`campoTituloCert`).value=r.titulo,document.getElementById(`campoTecnicaCert`).value=r.tecnica,document.getElementById(`campoAnoCert`).value=r.ano||``;let i=r.dimensoes||{},a=[i.altura,i.largura,i.profundidade].filter(e=>e&&Number(e)>0);document.getElementById(`campoDimensoesCert`).value=a.length?`${a.join(` x `)} cm`:``,n=r.imagem||``}),document.getElementById(`campoEdicaoTipo`).addEventListener(`change`,e=>{document.getElementById(`blocoEdicaoLimitada`).style.display=e.target.value===`limitada`?`block`:`none`});let r=document.getElementById(`canvasAssinaturaCert`),a=r.getContext(`2d`);if(a.lineWidth=2,a.lineCap=`round`,a.strokeStyle=`#1a1a1a`,t){let e=new Image;e.onload=()=>a.drawImage(e,0,0,r.width,r.height),e.src=t}let o=!1,l=e=>{let t=r.getBoundingClientRect(),n=e.touches?e.touches[0]:e;return{x:(n.clientX-t.left)*(r.width/t.width),y:(n.clientY-t.top)*(r.height/t.height)}},u=e=>{o=!0;let t=l(e);a.beginPath(),a.moveTo(t.x,t.y),e.preventDefault()},d=e=>{if(!o)return;let t=l(e);a.lineTo(t.x,t.y),a.stroke(),e.preventDefault()},f=()=>{o=!1};r.addEventListener(`mousedown`,u),r.addEventListener(`mousemove`,d),window.addEventListener(`mouseup`,f),r.addEventListener(`touchstart`,u,{passive:!1}),r.addEventListener(`touchmove`,d,{passive:!1}),r.addEventListener(`touchend`,f),document.getElementById(`btnLimparAssinaturaCert`).addEventListener(`click`,()=>a.clearRect(0,0,r.width,r.height)),document.getElementById(`btnCancelarCertificado`).addEventListener(`click`,c),document.getElementById(`formCertificado`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`campoTituloCert`).value.trim(),a=document.getElementById(`campoTecnicaCert`).value;if(!t||!a){i(`Preencha ao menos o título e a técnica da obra.`);return}let o=document.getElementById(`campoEdicaoTipo`).value,s={numeroSerie:this.gerarNumeroSerie(),obraId:document.getElementById(`campoOrigemCertificado`).value||null,tituloObra:t,tecnica:a,dimensoesTexto:document.getElementById(`campoDimensoesCert`).value.trim(),ano:Number(document.getElementById(`campoAnoCert`).value)||null,edicaoTipo:o,edicaoAtual:o===`limitada`?Number(document.getElementById(`campoEdicaoAtual`).value)||1:null,edicaoTotal:o===`limitada`?Number(document.getElementById(`campoEdicaoTotal`).value)||1:null,local:document.getElementById(`campoLocalCert`).value.trim(),dataEmissao:document.getElementById(`campoDataCert`).value||new Date().toISOString().slice(0,10),imagem:n},l=r.toDataURL(`image/png`);document.getElementById(`campoSalvarAssinatura`).checked&&(this.dataStore.dados.config.artista=this.dataStore.dados.config.artista||{},this.dataStore.dados.config.artista.assinatura=l,this.dataStore.salvar());let u=this.dataStore.adicionar(`certificados`,s);c(),i(`Gerando certificado em PDF...`),await this.gerarPdfCertificado(u,l),this.router.navegar(`certificados`)})}async baixarNovamente(e){let t=this.dataStore.buscarPorId(`certificados`,e);if(!t)return;let n=(this.dataStore.dados.config.artista||{}).assinatura||``;i(`Gerando PDF...`),await this.gerarPdfCertificado(t,n)}async gerarPdfCertificado(e,t){if(!window.jspdf){i(`Biblioteca de PDF indisponível (verifique sua conexão com a internet).`);return}let{jsPDF:n}=window.jspdf,a=new n({unit:`mm`,format:`a4`}),o=a.internal.pageSize.getWidth(),s=a.internal.pageSize.getHeight(),c=(this.dataStore.dados.config.artista||{}).nome||`Ateliê do Artista`;a.setDrawColor(190),a.setLineWidth(.9),a.rect(10,10,o-20,s-20),a.setLineWidth(.25),a.rect(14,14,o-28,s-28),a.setFont(`times`,`bold`),a.setFontSize(23),a.setTextColor(30,30,30),a.text(`CERTIFICADO DE AUTENTICIDADE`,o/2,34,{align:`center`}),a.setFont(`helvetica`,`normal`),a.setFontSize(10),a.setTextColor(130),a.text(c,o/2,41,{align:`center`});let l=54;if(/^data:image\/(png|jpe?g)/i.test(e.imagem||``))try{let t=/png/i.test(e.imagem)?`PNG`:`JPEG`;a.addImage(e.imagem,t,(o-78)/2,l,78,78,void 0,`FAST`),l+=88}catch(e){console.warn(`Não foi possível inserir a imagem no certificado:`,e)}else l+=4;a.setFont(`times`,`bold`),a.setFontSize(15),a.setTextColor(20),a.text(e.tituloObra||`Obra sem título`,o/2,l,{align:`center`}),l+=7,a.setFont(`helvetica`,`normal`),a.setFontSize(10),a.setTextColor(80),a.text(`${_(e.tecnica)} · ${e.dimensoesTexto||`-`} · ${e.ano||`-`}`,o/2,l,{align:`center`}),l+=12,a.setFont(`helvetica`,`italic`),a.setFontSize(10.5),a.setTextColor(55);let u=`Certifico que a obra acima é original, de minha autoria, executada em ${e.tecnica}. Não existem reproduções autorizadas além da edição declarada.`,d=a.splitTextToSize(u,o-64);a.text(d,o/2,l,{align:`center`}),l+=d.length*5.5+8,a.setFont(`helvetica`,`bold`),a.setFontSize(10.5),a.setTextColor(30),a.text(e.edicaoTipo===`limitada`?`Edição: ${e.edicaoAtual} de ${e.edicaoTotal}`:`Edição: Única`,o/2,l,{align:`center`}),l+=6,a.setFont(`helvetica`,`normal`),a.setFontSize(9),a.setTextColor(110),a.text(`Número de série: ${e.numeroSerie}`,o/2,l,{align:`center`}),l+=16;let f=l,p=o/2-42,m=o/2+42;if(t)try{a.addImage(t,`PNG`,p-27,f,54,22)}catch{}a.setDrawColor(140),a.line(p-27,f+25,p+27,f+25),a.setFont(`helvetica`,`normal`),a.setFontSize(8.5),a.setTextColor(90),a.text(c,p,f+30,{align:`center`}),a.setFontSize(7.5),a.setTextColor(140),a.text(`Assinatura do artista`,p,f+34,{align:`center`}),a.setFontSize(8.5),a.setTextColor(90),a.text(`${e.local||``}${e.local?`, `:``}${r(e.dataEmissao)}`,p,f+41,{align:`center`});let h=await b(`Obra: ${e.tituloObra} | Artista: ${c} | Autenticada em: ${r(e.dataEmissao)}`);if(h)try{a.addImage(h,`PNG`,m-14,f,28,28),a.setFontSize(7.5),a.setTextColor(140),a.text(`Validação digital`,m,f+34,{align:`center`})}catch{}a.setDrawColor(210),a.line(25,s-20,o-25,s-20),a.setFontSize(8),a.setTextColor(150),a.text(`Emitido em ${new Date().toLocaleDateString(`pt-BR`)} · Atelier CRM`,o/2,s-14,{align:`center`}),a.save(`certificado-${e.numeroSerie.toLowerCase()}.pdf`),i(`Certificado gerado com sucesso!`)}},ce=class extends D{constructor(e,t){super(e,t),this.filtros={tag:``,categoria:``,obra:``},this.indiceArrastado=null,this.itensApresentacao=[],this.indiceApresentacao=0}referenciasFiltradas(){let e=this.dataStore.listar(`referencias`),t=this.filtros;return t.tag&&(e=e.filter(e=>(e.tags||[]).includes(t.tag))),t.categoria&&(e=e.filter(e=>e.categoria===t.categoria)),t.obra&&(e=e.filter(e=>e.obraVinculada===t.obra)),e}tagsDisponiveis(){let e=this.dataStore.listar(`referencias`).flatMap(e=>e.tags||[]);return[...new Set(e)].sort()}categoriasDisponiveis(){let e=this.dataStore.listar(`referencias`).map(e=>e.categoria).filter(Boolean);return[...new Set(e)].sort()}render(){let e=this.referenciasFiltradas(),t=this.tagsDisponiveis(),n=this.categoriasDisponiveis(),r=this.dataStore.listar(`obras`),i=e.length?`
      <div class="grid-referencias" id="gridReferencias">
        ${e.map((e,t)=>this.renderCard(e,t,r)).join(``)}
      </div>
    `:`
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio">📒</div><p>Nenhuma referência encontrada. Adicione imagens, links ou notas para montar seu board.</p></div>
      </div>
    `;return`
      <div class="view-cabecalho">
        <div>
          <h2>Board de Referências</h2>
          <p class="subtitulo">${e.length} item${e.length===1?``:`ns`}  ·  arraste os cards para reorganizar</p>
        </div>
        <div class="barra-acoes-referencias">
          <button class="btn-secundario" id="btnApresentarReferencias">📺 Apresentar</button>
          <button class="btn-primario" id="btnNovaReferencia">➕ Nova Referência</button>
        </div>
      </div>

      <div class="catalogo-filtros">
        <div class="campo-filtro">
          <label>Tag</label>
          <select id="filtroRefTag">
            <option value="">Todas</option>
            ${t.map(e=>`<option value="${e}" ${this.filtros.tag===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
        </div>
        <div class="campo-filtro">
          <label>Categoria</label>
          <select id="filtroRefCategoria">
            <option value="">Todas</option>
            ${n.map(e=>`<option value="${e}" ${this.filtros.categoria===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
        </div>
        <div class="campo-filtro">
          <label>Obra vinculada</label>
          <select id="filtroRefObra">
            <option value="">Todas</option>
            ${r.map(e=>`<option value="${e.id}" ${this.filtros.obra===e.id?`selected`:``}>${e.titulo}</option>`).join(``)}
          </select>
        </div>
        <button class="btn-secundario" id="btnLimparFiltrosRef">Limpar filtros</button>
      </div>

      ${i}
    `}renderCard(e,t,n){let r=e.obraVinculada?n.find(t=>t.id===e.obraVinculada):null,i=(e.tags||[]).map(e=>`<span class="badge-tag">${e}</span>`).join(``),a=``;return a=e.tipo===`imagem`?`
        <img class="imagem-referencia" data-apresentar="${t}" src="${e.imagem}" alt="${e.titulo||`Referência`}">
        <div class="corpo-referencia">
          <div class="icone-tipo-referencia">🖼️ Imagem</div>
          ${e.titulo?`<div class="titulo-referencia">${e.titulo}</div>`:``}
        </div>
      `:e.tipo===`link`?`
        <img class="imagem-referencia" data-apresentar="${t}" src="${e.url}" alt="${e.titulo||`Link de referência`}" onerror="this.style.display='none'">
        <div class="corpo-referencia">
          <div class="icone-tipo-referencia">🔗 Link externo</div>
          ${e.titulo?`<div class="titulo-referencia">${e.titulo}</div>`:``}
          <a class="link-referencia" href="${e.url}" target="_blank" rel="noopener">${e.url}</a>
        </div>
      `:`
        <div class="corpo-referencia" data-apresentar="${t}" style="cursor:pointer;">
          <div class="icone-tipo-referencia">📝 Nota</div>
          ${e.titulo?`<div class="titulo-referencia">${e.titulo}</div>`:``}
          <div class="nota-referencia">${e.nota||``}</div>
        </div>
      `,`
      <div class="card-referencia" draggable="true" data-indice="${t}" data-id="${e.id}">
        ${a}
        <div class="corpo-referencia" style="padding-top:0;">
          ${i?`<div class="tags-referencia">${i}</div>`:``}
          ${r?`<span class="badge-obra-vinculada">Usado em: ${r.titulo}</span>`:``}
        </div>
        <div class="acoes-referencia">
          <button class="btn-icone-tabela" data-excluir-referencia="${e.id}" style="flex:1;">🗑️ Excluir</button>
        </div>
      </div>
    `}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`),t=document.getElementById(`btnNovaReferencia`);t&&t.addEventListener(`click`,()=>this.abrirFormulario());let n=document.getElementById(`btnApresentarReferencias`);n&&n.addEventListener(`click`,()=>this.abrirApresentacao(0));let r={filtroRefTag:`tag`,filtroRefCategoria:`categoria`,filtroRefObra:`obra`};Object.keys(r).forEach(e=>{let t=document.getElementById(e);t&&t.addEventListener(`change`,t=>{this.filtros[r[e]]=t.target.value,this.rerenderizar()})});let i=document.getElementById(`btnLimparFiltrosRef`);i&&i.addEventListener(`click`,()=>{this.filtros={tag:``,categoria:``,obra:``},this.rerenderizar()});let a=e=>{let t=e.target.closest(`[data-excluir-referencia]`),n=e.target.closest(`[data-apresentar]`);if(t){this.excluirReferencia(t.dataset.excluirReferencia);return}if(n){this.abrirApresentacao(Number(n.dataset.apresentar));return}};e.addEventListener(`click`,a),this._bindCache.delegReferencias={el:e,handler:a,type:`click`},this.ligarDragAndDrop()}ligarDragAndDrop(){let e=document.getElementById(`gridReferencias`);e&&e.querySelectorAll(`.card-referencia`).forEach(e=>{e.addEventListener(`dragstart`,()=>{this.indiceArrastado=Number(e.dataset.indice),e.classList.add(`arrastando`)}),e.addEventListener(`dragend`,()=>e.classList.remove(`arrastando`)),e.addEventListener(`dragover`,t=>{t.preventDefault(),e.classList.add(`zona-drop`)}),e.addEventListener(`dragleave`,()=>e.classList.remove(`zona-drop`)),e.addEventListener(`drop`,t=>{t.preventDefault(),e.classList.remove(`zona-drop`);let n=Number(e.dataset.indice);if(this.indiceArrastado===null||this.indiceArrastado===n)return;let r=this.referenciasFiltradas(),[i]=r.splice(this.indiceArrastado,1);r.splice(n,0,i);let a=r.map(e=>e.id),o=this.dataStore.listar(`referencias`).filter(e=>!a.includes(e.id));this.dataStore.dados.referencias=[...r,...o],this.dataStore.salvar(),this.indiceArrastado=null,this.rerenderizar()})})}abrirFormulario(){s(`
      <h3>Nova Referência</h3>
      <div class="grupo-botoes-toggle" id="grupoTipoReferencia">
        <button type="button" class="ativo" data-tipo-ref="imagem">🖼️ Imagem</button>
        <button type="button" data-tipo-ref="link">🔗 Link</button>
        <button type="button" data-tipo-ref="nota">📝 Nota</button>
      </div>
      <form id="formReferencia">
        <div class="campo-form"><label>Título (opcional)</label><input type="text" id="campoTituloRef"></div>

        <div class="campo-form" data-bloco-tipo="imagem">
          <label>Imagem</label>
          <input type="file" id="campoArquivoRef" accept="image/*">
          <img id="previewImagemRef" class="preview-imagem-form" style="display:none;">
        </div>

        <div class="campo-form" data-bloco-tipo="link" style="display:none;">
          <label>URL da imagem/página</label>
          <input type="url" id="campoUrlRef" placeholder="https://...">
          <p class="texto-ajuda">Se a URL apontar para uma imagem, o preview aparecerá automaticamente no board.</p>
        </div>

        <div class="campo-form" data-bloco-tipo="nota" style="display:none;">
          <label>Nota</label>
          <textarea id="campoNotaRef" placeholder="Escreva sua ideia, inspiração ou observação..."></textarea>
        </div>

        <div class="form-linha">
          <div class="campo-form">
            <label>Categoria</label>
            <input type="text" id="campoCategoriaRef" list="listaCategoriasRef" placeholder="cor, época, artista, emoção...">
            <datalist id="listaCategoriasRef">
              <option value="cor"><option value="época"><option value="artista"><option value="emoção"><option value="composição">
            </datalist>
          </div>
          <div class="campo-form">
            <label>Obra vinculada</label>
            <select id="campoObraVinculadaRef">
              <option value="">Nenhuma</option>
              ${this.dataStore.listar(`obras`).map(e=>`<option value="${e.id}">${e.titulo}</option>`).join(``)}
            </select>
          </div>
        </div>
        <div class="campo-form"><label>Tags (separadas por vírgula)</label><input type="text" id="campoTagsRef" placeholder="Ex: quente, retrato, luz suave"></div>

        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarReferencia">Cancelar</button>
          <button type="submit" class="btn-primario">Adicionar ao Board</button>
        </div>
      </form>
    `);let e=`imagem`,t=``;document.querySelectorAll(`[data-tipo-ref]`).forEach(t=>{t.addEventListener(`click`,()=>{e=t.dataset.tipoRef,document.querySelectorAll(`[data-tipo-ref]`).forEach(e=>e.classList.toggle(`ativo`,e===t)),document.querySelectorAll(`[data-bloco-tipo]`).forEach(t=>{t.style.display=t.dataset.blocoTipo===e?`block`:`none`})})}),document.getElementById(`campoArquivoRef`).addEventListener(`change`,e=>{let n=e.target.files[0];if(!n)return;let r=new FileReader;r.onload=e=>{t=e.target.result;let n=document.getElementById(`previewImagemRef`);n.src=t,n.style.display=`block`},r.readAsDataURL(n)}),document.getElementById(`btnCancelarReferencia`).addEventListener(`click`,c),document.getElementById(`formReferencia`).addEventListener(`submit`,n=>{if(n.preventDefault(),e===`imagem`&&!t){i(`Selecione uma imagem para continuar.`);return}let r=document.getElementById(`campoUrlRef`).value.trim();if(e===`link`&&!r){i(`Informe a URL do link de referência.`);return}let a=document.getElementById(`campoNotaRef`).value.trim();if(e===`nota`&&!a){i(`Escreva o conteúdo da nota.`);return}let o=document.getElementById(`campoTagsRef`).value.split(`,`).map(e=>e.trim()).filter(Boolean),s={tipo:e,titulo:document.getElementById(`campoTituloRef`).value.trim(),imagem:e===`imagem`?t:``,url:e===`link`?r:``,nota:e===`nota`?a:``,categoria:document.getElementById(`campoCategoriaRef`).value.trim(),obraVinculada:document.getElementById(`campoObraVinculadaRef`).value||``,tags:o};this.dataStore.adicionar(`referencias`,s),c(),i(`Referência adicionada ao board!`),this.rerenderizar()})}excluirReferencia(e){confirm(`Remover este item do board de referências?`)&&(this.dataStore.remover(`referencias`,e),i(`Referência removida.`),this.rerenderizar())}abrirApresentacao(e){if(this.itensApresentacao=this.referenciasFiltradas(),!this.itensApresentacao.length){i(`Não há itens para apresentar.`);return}this.indiceApresentacao=e||0;let t=document.createElement(`div`);t.className=`overlay-apresentacao`,t.id=`overlayApresentacaoRef`,document.body.appendChild(t);let n=document.createElement(`button`);n.className=`btn-fechar-apresentacao`,n.textContent=`✕`,n.addEventListener(`click`,()=>this.fecharApresentacao()),document.body.appendChild(n),t.dataset.temBotaoFechar=`true`,this._botaoFecharApresentacao=n,this._teclaApresentacao=e=>{e.key===`Escape`&&this.fecharApresentacao(),e.key===`ArrowRight`&&this.navegarApresentacao(1),e.key===`ArrowLeft`&&this.navegarApresentacao(-1)},window.addEventListener(`keydown`,this._teclaApresentacao),this.renderizarSlideApresentacao()}renderizarSlideApresentacao(){let e=document.getElementById(`overlayApresentacaoRef`);if(!e)return;let t=this.itensApresentacao[this.indiceApresentacao],n=``;n=t.tipo===`imagem`?`<img class="midia-apresentacao" src="${t.imagem}" alt="${t.titulo||``}">`:t.tipo===`link`?`<img class="midia-apresentacao" src="${t.url}" alt="${t.titulo||``}" onerror="this.outerHTML='<div class=\\'nota-apresentacao\\'>Link: ${t.url}</div>'">`:`<div class="nota-apresentacao">${t.nota||``}</div>`,e.innerHTML=`
      ${n}
      <div class="legenda-apresentacao">
        ${t.titulo?`<strong>${t.titulo}</strong>  ·  `:``}${this.indiceApresentacao+1} / ${this.itensApresentacao.length}
      </div>
      <div class="controles-apresentacao">
        <button id="btnApresentacaoAnterior">◀ Anterior</button>
        <button id="btnApresentacaoProxima">Próxima ▶</button>
      </div>
    `,document.getElementById(`btnApresentacaoAnterior`).addEventListener(`click`,()=>this.navegarApresentacao(-1)),document.getElementById(`btnApresentacaoProxima`).addEventListener(`click`,()=>this.navegarApresentacao(1))}navegarApresentacao(e){let t=this.itensApresentacao.length;this.indiceApresentacao=(this.indiceApresentacao+e+t)%t,this.renderizarSlideApresentacao()}fecharApresentacao(){let e=document.getElementById(`overlayApresentacaoRef`);e&&document.body.removeChild(e),this._botaoFecharApresentacao&&(document.body.removeChild(this._botaoFecharApresentacao),this._botaoFecharApresentacao=null),this._teclaApresentacao&&(window.removeEventListener(`keydown`,this._teclaApresentacao),this._teclaApresentacao=null)}},le=class{constructor(e,t){this.dataStore=e,this.router=t,this.obrasVisiveis=[],this.zoomAtivo=null,this.zoomIndice=0,this.ambienteAtual=`branca`,this.tourAtivo=!1,this.tourIndex=0,this.tourInterval=null,this.tourDuracao=4,this.renderer=null,this.scene=null,this.camera=null,this.clock=null,this.obraMeshes=[],this.obraData=[],this.frameId=null,this.raycaster=null,this.mouse={x:0,y:0},this.isMouseDown=!1,this.prevMouse={x:0,y:0},this.targetTheta=0,this.targetPhi=.25,this.targetDist=500,this.currentTheta=0,this.currentPhi=.25,this.currentDist=500,this.minDist=200,this.maxDist=1200,this.autoRotate=!1,this.autoRotateSpeed=.15,this.wallGroups=[],this.threeReady=typeof THREE<`u`&&this._checkWebGL(),this._boundResize=null,this._boundKeyDown=null}_checkWebGL(){try{let e=document.createElement(`canvas`);return!!(e.getContext(`webgl`)||e.getContext(`experimental-webgl`))}catch{return!1}}carregarObras(){let e=P().items;this.obrasVisiveis=e.filter(e=>e.imagem&&(e.status===`disponivel`||e.status===`em exposicao`||e.status===`disponível`||e.status===`em exposição`)),this.obrasVisiveis.length===0&&(this.obrasVisiveis=e.filter(e=>e.imagem).slice(0,20)),this.obrasVisiveis.length>20&&(this.obrasVisiveis=this.obrasVisiveis.slice(0,20))}render(){return this.carregarObras(),this.obrasVisiveis.length>0?`
      <div class="galeria-virtual" id="galeriaContainer">
        <div class="barra-topo">
          <h2>🏛️ Galeria Virtual</h2>
          <div class="acoes-barra">
            <button class="btn-bar" id="btnCompartilhar" title="Compartilhar galeria">🔗 Compartilhar</button>
            <button class="btn-bar ${this.tourAtivo?`ativo`:``}" id="btnTourToggle" title="Iniciar tour guiado">🎧 Tour</button>
            <button class="btn-bar" id="btnAutoRotate" title="Rotação automática">🔄 Auto</button>
            <select class="ambiente-select" id="selectAmbiente">
              <option value="branca" ${this.ambienteAtual===`branca`?`selected`:``}>🏛️ Galeria Branca</option>
              <option value="classico" ${this.ambienteAtual===`classico`?`selected`:``}>🪵 Atelier Clássico</option>
              <option value="moderno" ${this.ambienteAtual===`moderno`?`selected`:``}>🖼️ Museu Moderno</option>
            </select>
          </div>
        </div>
        <div class="three-container" id="threeContainer">
          <div class="loading-3d" id="loading3d">${this.threeReady?`Carregando galeria 3D...`:`WebGL não disponível — use um navegador moderno.`}</div>
        </div>
        <div class="hud-navegacao" id="hudNavegacao">
          <span class="nav-indicador" id="navIndicador">${this.obrasVisiveis.length} obras</span>
          <span class="hint-controle">Arraste para girar · Scroll para zoom</span>
        </div>
        <div class="hud-tour ${this.tourAtivo?`visivel`:``}" id="hudTour">
          <button class="tour-btn" id="tourPrev">◀</button>
          <button class="tour-btn ${this.tourAtivo?`ativo`:``}" id="tourPlayPause">${this.tourAtivo?`⏸`:`▶`}</button>
          <button class="tour-btn" id="tourNext">▶</button>
          <span class="tour-progresso" id="tourProgresso">1 / ${this.obrasVisiveis.length}</span>
        </div>
      </div>`:`
        <div class="galeria-virtual" style="display:flex;align-items:center;justify-content:center;background:var(--bg);min-height:400px;">
          <div style="text-align:center;color:var(--text-muted);">
            <div style="font-size:3rem;margin-bottom:12px;">🏛️</div>
            <h3 style="margin:0 0 8px;color:var(--text);">Galeria Virtual</h3>
            <p style="margin:0;font-size:0.9rem;">Adicione obras com imagem no Catálogo para vê-las aqui.</p>
            <button class="btn-primario" style="margin-top:16px;" data-acao="irCatalogo">Ir para Catálogo</button>
          </div>
        </div>`}aposRenderizar(){if(this.pararTour(),this.fecharZoom(),this.destruirThree(),this.obrasVisiveis.length===0||!this.threeReady)return;this.container=document.getElementById(`threeContainer`);let e=document.getElementById(`loading3d`);if(!this.container)return;this._initThree(),this._construirSala(),this._bindThreeEvents(),e&&(e.style.display=`none`);let t=document.getElementById(`selectAmbiente`);t&&t.addEventListener(`change`,()=>{this.ambienteAtual=t.value,this._aplicarAmbiente()}),document.getElementById(`btnAutoRotate`)?.addEventListener(`click`,()=>{this.autoRotate=!this.autoRotate,document.getElementById(`btnAutoRotate`)?.classList.toggle(`ativo`,this.autoRotate)}),document.getElementById(`btnTourToggle`)?.addEventListener(`click`,()=>this.toggleTour()),document.getElementById(`tourPlayPause`)?.addEventListener(`click`,()=>this.toggleTour()),document.getElementById(`tourPrev`)?.addEventListener(`click`,()=>this.tourAnterior()),document.getElementById(`tourNext`)?.addEventListener(`click`,()=>this.tourProximo()),document.getElementById(`btnCompartilhar`)?.addEventListener(`click`,()=>this.compartilhar()),this._boundResize=()=>this._onResize(),window.addEventListener(`resize`,this._boundResize)}_initThree(){let e=this.container.clientWidth,t=this.container.clientHeight;this.renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!1}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=THREE.PCFSoftShadowMap,this.renderer.toneMapping=THREE.ACESFilmicToneMapping,this.renderer.toneMappingExposure=1,this.renderer.outputEncoding=THREE.sRGBEncoding,this.container.appendChild(this.renderer.domElement),this.scene=new THREE.Scene,this.scene.fog=new THREE.Fog(this._corFundo(),600,1400),this.camera=new THREE.PerspectiveCamera(50,e/t,1,2e3),this._updateCamera();let n=new THREE.AmbientLight(4210784,.4);this.scene.add(n);let r=new THREE.HemisphereLight(16777215,4473924,.5);this.scene.add(r);let i=new THREE.DirectionalLight(16772829,1.2);i.position.set(300,500,400),i.castShadow=!0,i.shadow.mapSize.width=1024,i.shadow.mapSize.height=1024,i.shadow.camera.near=1,i.shadow.camera.far=1500,i.shadow.camera.left=-500,i.shadow.camera.right=500,i.shadow.camera.top=500,i.shadow.camera.bottom=-500,this.scene.add(i);let a=new THREE.DirectionalLight(8947967,.3);a.position.set(-300,100,-400),this.scene.add(a);let o=new THREE.DirectionalLight(16777215,.2);o.position.set(0,-300,0),this.scene.add(o),this.clock=new THREE.Clock,this.raycaster=new THREE.Raycaster,this._startLoop()}_corFundo(){return this.ambienteAtual===`branca`?1118481:this.ambienteAtual===`classico`?657414:328965}_updateCamera(){if(!this.camera)return;let e=this.currentTheta,t=this.currentPhi,n=this.currentDist;this.camera.position.x=n*Math.sin(e)*Math.cos(t),this.camera.position.y=n*Math.sin(t),this.camera.position.z=n*Math.cos(e)*Math.cos(t),this.camera.lookAt(0,0,0)}_startLoop(){let e=()=>{this.frameId=requestAnimationFrame(e);let t=this.clock.getDelta();this.currentTheta+=(this.targetTheta-this.currentTheta)*.06,this.currentPhi+=(this.targetPhi-this.currentPhi)*.06,this.currentDist+=(this.targetDist-this.currentDist)*.06,this.autoRotate&&(this.targetTheta+=this.autoRotateSpeed*t),this._updateCamera(),this.renderer&&this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)};this.frameId=requestAnimationFrame(e)}_construirSala(){this.obraMeshes=[],this.obraData=[],this.wallGroups=[];let e=this.ambienteAtual===`branca`?15790320:this.ambienteAtual===`classico`?9139029:2236962,t=this.ambienteAtual===`branca`?13948116:this.ambienteAtual===`classico`?6045747:3355443,n=this.ambienteAtual===`branca`?16119285:this.ambienteAtual===`classico`?8022864:1710618,r=new THREE.PlaneGeometry(900,900),i=new THREE.MeshStandardMaterial({color:t,roughness:.9,metalness:0}),a=new THREE.Mesh(r,i);a.rotation.x=-Math.PI/2,a.position.y=-200,a.receiveShadow=!0,this.scene.add(a);let o=new THREE.MeshStandardMaterial({color:n,roughness:.9,metalness:0}),s=new THREE.Mesh(new THREE.PlaneGeometry(900,900),o);s.rotation.x=Math.PI/2,s.position.y=200,this.scene.add(s);let c=new THREE.MeshStandardMaterial({color:e,roughness:.7,metalness:0}),l=[`back`,`left`,`right`,`front`];l.forEach(e=>this._criarParedeEstrutural(e,c,800,400));let u=this.obrasVisiveis,d=Math.ceil(u.length/4);l.forEach((e,t)=>{let n=t*d,r=Math.min(n+d,u.length),i=u.slice(n,r);if(i.length===0)return;let a=new THREE.Group;this._posicionarGrupoParede(a,e),this._adicionarObrasAoGrupo(a,i,e),this.scene.add(a),this.wallGroups.push({group:a,wallId:e,obras:i})})}_criarParedeEstrutural(e,t,n,r){let i=new THREE.Mesh(new THREE.PlaneGeometry(n,r),t);switch(i.receiveShadow=!0,e){case`back`:i.position.set(0,0,-350);break;case`front`:i.position.set(0,0,350),i.rotation.y=Math.PI;break;case`left`:i.position.set(-350,0,0),i.rotation.y=-Math.PI/2;break;case`right`:i.position.set(350,0,0),i.rotation.y=Math.PI/2;break}this.scene.add(i)}_posicionarGrupoParede(e,t){switch(t){case`back`:e.position.set(0,0,-349);break;case`front`:e.position.set(0,0,349),e.rotation.y=Math.PI;break;case`left`:e.position.set(-349,0,0),e.rotation.y=-Math.PI/2;break;case`right`:e.position.set(349,0,0),e.rotation.y=Math.PI/2;break}}_adicionarObrasAoGrupo(e,t,n){let r=Math.min(4,t.length),i=Math.ceil(t.length/r),a=(r-1)*150/2,o=(i-1)*150/2,s=this.ambienteAtual===`branca`?13935988:this.ambienteAtual===`classico`?9127187:5592405,c=new THREE.MeshStandardMaterial({color:s,roughness:.4,metalness:.3});t.forEach((t,n)=>{let i=n%r,s=Math.floor(n/r),l=i*150-a,u=-(s*150-o);t.dimensoes&&t.dimensoes.largura&&t.dimensoes.altura;let d=t.dimensoes&&t.dimensoes.largura&&t.dimensoes.altura?t.dimensoes.largura/t.dimensoes.altura:.75,f=80/Math.max(d,.1),p=new THREE.MeshStandardMaterial({color:2236962,roughness:.6}),m=new THREE.Mesh(new THREE.BoxGeometry(94,f+14,3),p);m.position.set(l,u,-1),m.castShadow=!0,e.add(m);let h=new THREE.Mesh(new THREE.BoxGeometry(98,f+18,2),c);h.position.set(l,u,.5),e.add(h);let g=new THREE.MeshStandardMaterial({roughness:.3,metalness:0,side:THREE.DoubleSide}),_=new THREE.Mesh(new THREE.PlaneGeometry(80,f),g);_.position.set(l,u,2),_.userData={obra:t,index:this.obraMeshes.length},e.add(_),this.obraMeshes.push(_),this.obraData.push(t),this._carregarTextura(_,t.imagem)})}_carregarTextura(e,t){!t||!e.material||new THREE.TextureLoader().load(t,t=>{t.encoding=THREE.sRGBEncoding,e.material.map=t,e.material.needsUpdate=!0},void 0,()=>{})}_aplicarAmbiente(){this.scene&&(this.scene.fog.color.setHex(this._corFundo()),this.scene.fog.far=this.ambienteAtual===`moderno`?1e3:1400,this.renderer.setClearColor(this._corFundo()),this._reconstruirSala())}_reconstruirSala(){this.wallGroups.forEach(e=>{this.scene.remove(e.group),e.group.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}),this.wallGroups=[],this.obraMeshes=[],this._construirSala()}_bindThreeEvents(){let e=this.renderer?.domElement;e&&(e.addEventListener(`mousedown`,e=>{this.isMouseDown=!0,this.prevMouse={x:e.clientX,y:e.clientY}}),window.addEventListener(`mousemove`,e=>{if(!this.isMouseDown){this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1;return}let t=e.clientX-this.prevMouse.x,n=e.clientY-this.prevMouse.y;this.targetTheta-=t*.005,this.targetPhi=Math.max(-.8,Math.min(.8,this.targetPhi+n*.005)),this.prevMouse={x:e.clientX,y:e.clientY}}),window.addEventListener(`mouseup`,()=>{this.isMouseDown&&(this.isMouseDown=!1,this._checkClick())}),e.addEventListener(`wheel`,e=>{e.preventDefault(),this.targetDist=Math.max(this.minDist,Math.min(this.maxDist,this.targetDist+e.deltaY*.5))},{passive:!1}),e.addEventListener(`touchstart`,e=>{e.touches.length===1&&(this.isMouseDown=!0,this.prevMouse={x:e.touches[0].clientX,y:e.touches[0].clientY})},{passive:!0}),e.addEventListener(`touchmove`,e=>{if(e.touches.length===1&&this.isMouseDown){let t=e.touches[0].clientX-this.prevMouse.x,n=e.touches[0].clientY-this.prevMouse.y;this.targetTheta-=t*.005,this.targetPhi=Math.max(-.8,Math.min(.8,this.targetPhi+n*.005)),this.prevMouse={x:e.touches[0].clientX,y:e.touches[0].clientY}}},{passive:!0}),e.addEventListener(`touchend`,()=>{this.isMouseDown=!1},{passive:!0}))}_checkClick(){if(!this.raycaster||!this.camera||!this.renderer)return;this.raycaster.setFromCamera(this.mouse,this.camera);let e=this.raycaster.intersectObjects(this.obraMeshes);if(e.length>0){let t=e[0].object.userData;t&&t.obra&&t.index!==void 0&&this.abrirZoom(t.index)}}_onResize(){if(!this.container||!this.renderer||!this.camera)return;let e=this.container.clientWidth,t=this.container.clientHeight;e>0&&t>0&&(this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix())}toggleTour(){this.tourAtivo?this.pararTour():this.iniciarTour()}iniciarTour(){this.obrasVisiveis.length!==0&&(this.tourAtivo=!0,this.tourIndex=0,this._mostrarHudTour(!0),this._atualizarBotaoTour(),this._focarObraTour(0),this._iniciarTimerTour())}pararTour(){this.tourAtivo=!1,this._pararTimerTour(),this._mostrarHudTour(!1),this._atualizarBotaoTour()}_iniciarTimerTour(){this._pararTimerTour(),this.tourInterval=setInterval(()=>{this.tourAtivo&&this.tourProximo()},this.tourDuracao*1e3)}_pararTimerTour(){this.tourInterval&&(clearInterval(this.tourInterval),this.tourInterval=null)}tourAnterior(){this.obrasVisiveis.length!==0&&(this.tourIndex=(this.tourIndex-1+this.obrasVisiveis.length)%this.obrasVisiveis.length,this._focarObraTour(this.tourIndex),this.tourAtivo&&this._reiniciarTimerTour())}tourProximo(){if(this.obrasVisiveis.length!==0){if(this.tourIndex=(this.tourIndex+1)%this.obrasVisiveis.length,this.tourIndex===0&&this.tourAtivo){this.pararTour();return}this._focarObraTour(this.tourIndex),this.tourAtivo&&this._reiniciarTimerTour()}}_reiniciarTimerTour(){this.tourAtivo&&(this._pararTimerTour(),this._iniciarTimerTour())}_focarObraTour(e){if(e<0||e>=this.obraData.length)return;this.tourIndex=e;let t=Math.ceil(this.obraData.length/4),n=Math.floor(e/t),r=[0,Math.PI/2,-Math.PI/2,Math.PI];this.targetTheta=r[Math.min(n,3)]||0,this.targetPhi=.1,this.targetDist=350;let i=document.getElementById(`tourProgresso`);i&&(i.textContent=`${e+1} / ${this.obraData.length}`)}_mostrarHudTour(e){let t=document.getElementById(`hudTour`);t&&t.classList.toggle(`visivel`,e)}_atualizarBotaoTour(){let e=document.getElementById(`btnTourToggle`);e&&(e.classList.toggle(`ativo`,this.tourAtivo),e.textContent=this.tourAtivo?`⏹ Tour`:`🎧 Tour`);let t=document.getElementById(`tourPlayPause`);t&&(t.classList.toggle(`ativo`,this.tourAtivo),t.textContent=this.tourAtivo?`⏸`:`▶`)}abrirZoom(e){e<0||e>=this.obraData.length||j(this.obraData.map(e=>({src:e.imagem||``,title:e.titulo||`Sem título`,subtitle:[e.tecnica,e.ano].filter(Boolean).join(` · `),caption:e.descricao||``,price:e.preco?n(e.preco):``,id:e.id})),e)}fecharZoom(){A&&A.close()}compartilhar(){let e=window.location.origin+window.location.pathname+`#galeria=virtual&tour=obras-disponiveis`,t=`Olá! 🎨 Convido você para um tour virtual pela minha galeria de obras:\n${e}\n\nAprecie a exposição!`;navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t).then(()=>this._mostrarToastCompartilhar(e)).catch(()=>this._fallbackCompartilhar(e,t)):this._fallbackCompartilhar(e,t)}_fallbackCompartilhar(e,t){let n=document.createElement(`textarea`);n.value=t,n.style.position=`fixed`,n.style.left=`-9999px`,document.body.appendChild(n),n.select();try{document.execCommand(`copy`),this._mostrarToastCompartilhar(e)}catch{prompt(`Copie o link abaixo:`,e)}document.body.removeChild(n)}_mostrarToastCompartilhar(e){let t=document.querySelector(`.toast-compartilhar`);t&&t.remove();let n=document.createElement(`div`);n.className=`toast-compartilhar`,n.innerHTML=`
      <span>✅ Link copiado!</span>
      <span style="font-size:0.75rem;color:rgba(255,255,255,0.5);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e}</span>
      <button class="btn-toast" id="btnAbrirLinkCompartilhado">Abrir</button>`,document.body.appendChild(n),document.getElementById(`btnAbrirLinkCompartilhado`)?.addEventListener(`click`,()=>{n.remove(),this.router&&this.router.navegar(`galeriaVirtual`)}),setTimeout(()=>{n.parentNode&&n.remove()},5e3)}destruirThree(){this.frameId&&(cancelAnimationFrame(this.frameId),this.frameId=null),this._boundResize&&(window.removeEventListener(`resize`,this._boundResize),this._boundResize=null),this.renderer&&(this.renderer.domElement.remove(),this.renderer.dispose(),this.renderer=null),this.scene=null,this.camera=null,this.clock=null,this.raycaster=null,this.wallGroups=[],this.obraMeshes=[],this.obraData=[]}destruir(){this.pararTour(),this.fecharZoom(),this.destruirThree()}},ue=class extends D{constructor(e,t){super(e,t),this.calc={materiais:0,horas:0,valorHora:60,largura:0,altura:0,complexidade:3,obraId:``},this.fatoresComplexidade=[0,.7,.85,1,1.2,1.5]}get config(){return z().precificador||{}}get cfgRoot(){return z()}get moeda(){return this.cfgRoot.moedaPadrao||`BRL`}get taxas(){return this.cfgRoot.taxasCambio||{}}get regras(){return this.cfgRoot.precificadorRegras||[]}salvarConfig(e){let t=this.cfgRoot;t.precificador={...t.precificador||{},...e},z().salvar()}fmt(e,t){let n=t||this.moeda,r={BRL:`pt-BR`,USD:`en-US`,EUR:`de-DE`,GBP:`en-GB`}[n]||`pt-BR`;try{return(Number(e)||0).toLocaleString(r,{style:`currency`,currency:n,maximumFractionDigits:2})}catch{return(Number(e)||0).toLocaleString(`pt-BR`,{style:`currency`,currency:`BRL`})}}converter(e,t,n){let r=Number(e)||0;if(t===n)return r;let i=this.taxas,a=t===`BRL`?r:i[t]?r*i[t]:r;return n===`BRL`?a:i[n]?a/i[n]:a}render(){let e=P().items||[],t=R().items||[],n=e.length>0;this.calc.valorHora=this.config.valorHora||60;let r=e.map(e=>`<option value="${e.id}">${e.titulo||`Sem título`} — ${this.fmt(e.preco)}</option>`).join(``);return`
      <div class="precificador" id="precificadorContainer">
        <div class="precificador-toolbar">
          <div class="moeda-selector">
            <label>Moeda:</label>
            <select id="selMoedaPadrao">
              ${[`BRL`,`USD`,`EUR`,`GBP`].map(e=>`<option value="${e}" ${this.moeda===e?`selected`:``}>${e}</option>`).join(``)}
            </select>
            <button class="btn-miniatura" id="btnEditarTaxas" title="Editar taxas de câmbio">💱</button>
          </div>
          <button class="btn-secundario" id="btnAbrirRegras">📋 Regras de Precificação</button>
          <button class="btn-primario" id="btnExportarRelatorio">📞 Relatório PDF</button>
        </div>

        <div class="card">
          <h3>🧮 Calculadora de Preço</h3>
          <div class="calc-grid">
            <div class="campo-calc" style="grid-column:1/-1">
              <label>Obra de referência</label>
              <select class="sel-obra-calc" id="selObraCalc"><option value="">— Selecionar obra —</option>${r}</select>
            </div>
            <div class="campo-calc">
              <label>💰 Custo materiais (${this.moeda})</label>
              <input type="number" id="calcMateriais" value="${this.calc.materiais}" min="0" step="0.1">
            </div>
            <div class="campo-calc">
              <label>⏱ Horas trabalhadas</label>
              <input type="number" id="calcHoras" value="${this.calc.horas}" min="0" step="0.5">
            </div>
            <div class="campo-calc">
              <label>🙵 Valor hora (${this.moeda})</label>
              <input type="number" id="calcValorHora" value="${this.calc.valorHora}" min="0" step="1">
            </div>
            <div class="campo-calc">
              <label>📐 Dimensões (cm)</label>
              <div style="display:flex;gap:6px;">
                <input type="number" id="calcLargura" value="${this.calc.largura}" min="0" placeholder="Larg." style="flex:1">
                <span style="align-self:center;color:var(--text-muted);font-size:0.8rem;">×</span>
                <input type="number" id="calcAltura" value="${this.calc.altura}" min="0" placeholder="Alt." style="flex:1">
              </div>
            </div>
            <div class="campo-calc">
              <label>⭐ Complexidade</label>
              <div class="estrelas-input" id="estrelasInput">
                ${[1,2,3,4,5].map(e=>`<span class="estrela ${e<=this.calc.complexidade?`preenchida`:``}" data-val="${e}">★</span>`).join(``)}
              </div>
            </div>
          </div>

          <div class="resultado-preco" id="resultadoPreco">
            <div class="rotulo-sugerido">Preço Sugerido</div>
            <div class="valor-sugerido" id="valorSugerido">${this.fmt(this.calcularPreco(this.calc))}</div>
            <div class="detalhe-calculo" id="detalheCalculo">${this.detalharCalculo(this.calcularPreco(this.calc))}</div>
            <div id="conversoesMultiMoeda" class="conversoes-multi"></div>
          </div>

          <div id="faixaComparativa">${this.renderFaixaComparativa(e)}</div>
          <button class="btn-primario" id="btnSalvarPrecoCalc" style="margin-top:12px;width:100%;">💾 Salvar preço sugerido na obra</button>
        </div>

        ${n?this.renderBreakEven(e):``}
        ${n?this.renderMLCard(e,t):``}
        ${n?this.renderProjecao(e):``}

        <div class="card card-full">
          <h3>📊 Análise do Portfólio</h3>
          ${n?this.renderAnalise(e,t):`<p style="color:var(--text-muted);font-size:0.85rem;">Adicione obras no Catálogo para ver análises.</p>`}
        </div>

        <div class="card card-full">
          <h3>🎯 Metas Financeiras</h3>
          ${this.renderMetas(e,t)}
        </div>
      </div>

      ${this.renderModalRegras()}
      ${this.renderModalTaxas()}
    `}calcularPreco(e){let t=Number(e.materiais)||0,n=Number(e.horas)||0,r=Number(e.valorHora)||60,i=Math.max(1,Math.min(5,Number(e.complexidade)||3)),a=this.config.multiplicadorExperiencia||1.5,o=this.fatoresComplexidade[i]||1,s=t+n*r,c=(Number(e.largura)||0)*(Number(e.altura)||0),l=c>0?1+c/1e4:1;return Math.round(s*a*o*l)}detalharCalculo(e){let t=this.calc,n=Number(t.materiais)||0,r=Number(t.horas)||0,i=Number(t.valorHora)||60,a=this.config.multiplicadorExperiencia||1.5,o=this.fatoresComplexidade[Math.max(1,Math.min(5,Number(t.complexidade)||3))],s=(Number(t.largura)||0)*(Number(t.altura)||0),c=s>0?1+s/1e4:1;return`${this.fmt(n)} + (${r}h × ${this.fmt(i)}) × ${a} × ${o}${c===1?``:` × ${c.toFixed(2)} (área)`} = ${this.fmt(e)}`}renderFaixaComparativa(e){let t=this.calc,n=(Number(t.largura)||0)*(Number(t.altura)||0);if(!n||e.length<2)return``;let r=e.filter(e=>{let t=e.dimensoes;if(!t||!t.largura||!t.altura)return!1;let r=t.largura*t.altura;return r>n*.5&&r<n*1.5&&e.preco>0});if(r.length<2)return``;let i=r.map(e=>Number(e.preco)).sort((e,t)=>e-t),a=i[0],o=i[i.length-1],s=Math.round(i.reduce((e,t)=>e+t,0)/i.length);return`
      <div class="faixa-comparativo">
        <div class="faixa-item"><div class="faixa-valor">${this.fmt(a)}</div><div class="faixa-rotulo">Menor similar</div></div>
        <div class="faixa-item"><div class="faixa-valor">${this.fmt(s)}</div><div class="faixa-rotulo">Média similares</div></div>
        <div class="faixa-item"><div class="faixa-valor">${this.fmt(o)}</div><div class="faixa-rotulo">Maior similar</div></div>
      </div>
    `}renderBreakEven(e){let t=e.filter(e=>(e.custoMateriais>0||e.horasTrabalho>0)&&e.preco>0);return t.length===0?``:`
      <div class="card card-full">
        <h3>📊 Análise de Break-Even</h3>
        <div class="be-tabela-wrapper">
          <table class="be-tabela">
            <thead><tr>
              <th>Obra</th><th>Custo Total</th><th>Preço</th><th>Margem</th><th>Markup</th><th>Lucro</th>
            </tr></thead>
            <tbody>${t.map(e=>{let t=(Number(e.custoMateriais)||0)+(Number(e.horasTrabalho)||0)*(this.config.valorHora||60),n=Number(e.preco)||0,r=n>0?(n-t)/n*100:0,i=t>0?n/t:0;return`<tr class="${r>=50?`be-alta`:r>=25?`be-media`:`be-baixa`}">
        <td>${e.titulo||`Sem título`}</td>
        <td>${this.fmt(t)}</td>
        <td>${this.fmt(n)}</td>
        <td class="be-num">${r.toFixed(1)}%</td>
        <td class="be-num">${i.toFixed(2)}×</td>
        <td>${this.fmt(n-t)}</td>
      </tr>`}).join(``)}</tbody>
          </table>
        </div>
        <div class="be-legend">
          <span class="be-tag be-alta">≥ 50% margem</span>
          <span class="be-tag be-media">25–50%</span>
          <span class="be-tag be-baixa">< 25%</span>
        </div>
      </div>
    `}renderMLCard(e,t){let n=e.filter(e=>e.historicoPrecos&&e.historicoPrecos.length>0&&e.dimensoes&&e.dimensoes.largura);if(n.length<2)return``;let r=0,i=0,a=0,o=[];n.forEach(e=>{let t={materiais:Number(e.custoMateriais)||0,horas:Number(e.horasTrabalho)||0,valorHora:this.config.valorHora||60,largura:e.dimensoes.largura,altura:e.dimensoes.altura,complexidade:3},n=this.calcularPreco(t),s=Number(e.preco)||0;if(s>0){let t=Math.abs(n-s);a+=t;let c=t/s*100;c<=20?r++:i++,o.push({titulo:e.titulo,real:s,sugerido:n,pctErro:c})}});let s=r+i;if(s===0)return``;let c=r/s*100,l=a/s,u=o.sort((e,t)=>t.pctErro-e.pctErro).slice(0,5);return`
      <div class="card card-full">
        <h3>🤖 Precisão (ML) — Sugestão vs. Realidade</h3>
        <div class="ml-precisao-grid">
          <div class="ml-precisao-card ${c>=70?`ml-bom`:c>=40?`ml-medio`:`ml-ruim`}">
            <div class="ml-numero">${c.toFixed(0)}%</div>
            <div class="ml-rotulo">Hit Rate</div>
            <div class="ml-sub">${r}/${s} dentro de 20% do real</div>
          </div>
          <div class="ml-precisao-card">
            <div class="ml-numero">${this.fmt(l)}</div>
            <div class="ml-rotulo">Erro Médio Absoluto</div>
          </div>
          <div class="ml-precisao-card">
            <div class="ml-numero">${i}</div>
            <div class="ml-rotulo">Fora da Margem</div>
          </div>
        </div>
        ${u.length>0?`
        <h4 style="margin:12px 0 6px;font-size:0.8rem;color:var(--text-muted);">Maiores discrepâncias</h4>
        <table class="be-tabela">
          <thead><tr><th>Obra</th><th>Sugerido</th><th>Real</th><th>Erro</th></tr></thead>
          <tbody>${u.map(e=>`<tr class="${e.pctErro>20?`be-baixa`:`be-alta`}">
            <td>${e.titulo||`—`}</td>
            <td>${this.fmt(e.sugerido)}</td>
            <td>${this.fmt(e.real)}</td>
            <td>${e.pctErro.toFixed(0)}%</td>
          </tr>`).join(``)}</tbody>
        </table>`:``}
      </div>
    `}renderProjecao(e){let t=e.filter(e=>e.historicoPrecos&&e.historicoPrecos.length>=2);if(t.length===0)return``;let n=t.map(e=>`<option value="${e.id}">${e.titulo||`Sem título`}</option>`).join(``),r=t[0],i=this.projetarPreco(r);return`
      <div class="card card-full">
        <h3>🔮 Projeção de Valorização</h3>
        <div style="margin-bottom:12px;">
          <select id="selProjecaoObra" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;">${n}</select>
        </div>
        ${this.renderProjecaoDetalhe(r,i)}
      </div>
    `}projetarPreco(e){let t=(e.historicoPrecos||[]).map(e=>({preco:Number(e.preco),data:new Date(e.data).getTime()}));t.push({preco:Number(e.preco)||0,data:Date.now()});let n=t.filter(e=>e.preco>0);if(n.length<2)return null;let r=n.length,i=(r-1)/2,a=0;n.forEach(e=>a+=e.preco),a/=r;let o=0,s=0;n.forEach((e,t)=>{o+=(t-i)*(e.preco-a),s+=(t-i)*(t-i)});let c=s===0?0:o/s,l=a-c*i,u=[1,3,5],d=n[n.length-1].preco;return{ultimo:d,inclinacao:c,intercept:l,projecoes:u.map(e=>{let n=Math.round(e*12/Math.max(1,Math.round((t[t.length-1].data-t[0].data)/(864e5*30)))),i=r+n,a=Math.max(0,c*(i-1)+l),o=d>0?((a/d)**(1/e)-1)*100:0;return{anos:e,projetado:Math.round(a),aprecAnual:o}}),r2:this.calcularR2(n,c,l)}}calcularR2(e,t,n){let r=e.length,i=0;e.forEach(e=>i+=e.preco),i/=r;let a=0,o=0;return e.forEach((e,r)=>{let s=t*r+n;a+=(e.preco-s)**2,o+=(e.preco-i)**2}),o>0?1-a/o:0}renderProjecaoDetalhe(e,t){return t?`
      <div class="projecao-grid">
        ${t.projecoes.map(e=>`
          <div class="projecao-card">
            <div class="proj-numero">${this.fmt(e.projetado)}</div>
            <div class="proj-rotulo">Em ${e.anos} ano${e.anos>1?`s`:``}</div>
            <div class="proj-apreciacao ${e.aprecAnual>0?`proj-positiva`:`proj-negativa`}">
              ${e.aprecAnual>0?`📈`:`📉`} ${e.aprecAnual.toFixed(1)}% a.a.
            </div>
          </div>
        `).join(``)}
      </div>
      <div class="proj-detalhes">
        <span>Preço atual: <strong>${this.fmt(t.ultimo)}</strong></span>
        <span>R²: <strong>${t.r2.toFixed(3)}</strong> ${t.r2>.7?`(boa correlação)`:t.r2>.3?`(correlação moderada)`:`(baixa correlação)`}</span>
        <span>Baseado em regressão linear sobre histórico de preços</span>
      </div>
    `:`<p style="color:var(--text-muted);">Dados insuficientes para projeção (mín. 2 pontos).</p>`}renderModalRegras(){let e=this.regras;return`
      <div class="widget-config-overlay" id="regrasOverlay" style="display:none">
        <div class="widget-config-modal" style="max-width:800px;">
          <h3>📋 Regras de Precificação</h3>
          <p class="texto-ajuda">Defina regras automáticas: técnica + dimensão → preço sugerido. Use "qualquer" para técnica.</p>
          <div class="regras-lista" id="regrasLista">
            ${e.length===0?`<p style="color:var(--text-muted);text-align:center;">Nenhuma regra cadastrada.</p>`:``}
            ${e.map((e,t)=>`
              <div class="regra-item" data-regra-idx="${t}">
                <div class="regra-info">
                  <strong>${e.nome}</strong>
                  <span class="texto-ajuda">${e.tecnica||`qualquer`} · ${e.larguraMin}–${e.larguraMax}×${e.alturaMin}–${e.alturaMax}cm · ×${e.multiplicador} · base ${this.fmt(e.precoBase)}</span>
                </div>
                <div class="regra-acoes">
                  <button class="btn-miniatura btn-aplicar-regra" data-idx="${t}">▶ Aplicar</button>
                  <button class="btn-miniatura btn-remover-regra" data-idx="${t}" style="color:#dc2626;">✕</button>
                </div>
              </div>
            `).join(``)}
          </div>
          <hr style="margin:12px 0;border-color:var(--border);">
          <h4 style="margin:0 0 8px;font-size:0.85rem;">Nova Regra</h4>
          <div class="regra-form">
            <input type="text" id="regraNome" placeholder="Nome da regra" class="regra-input">
            <select id="regraTecnica" class="regra-input">
              <option value="">Qualquer técnica</option>
              <option value="óleo">Óleo</option>
              <option value="aquarela">Aquarela</option>
              <option value="escultura">Escultura</option>
              <option value="acrílica">Acrílica</option>
              <option value="outra">Outra</option>
            </select>
            <div style="display:flex;gap:6px;grid-column:1/-1;">
              <input type="number" id="regraLargMin" placeholder="Larg. min (cm)" class="regra-input" style="flex:1">
              <input type="number" id="regraLargMax" placeholder="Larg. max (cm)" class="regra-input" style="flex:1">
              <input type="number" id="regraAltMin" placeholder="Alt. min (cm)" class="regra-input" style="flex:1">
              <input type="number" id="regraAltMax" placeholder="Alt. max (cm)" class="regra-input" style="flex:1">
            </div>
            <div style="display:flex;gap:6px;grid-column:1/-1;">
              <input type="number" id="regraMult" placeholder="Multiplicador (ex: 2.0)" class="regra-input" value="1.5" style="flex:1">
              <input type="number" id="regraBase" placeholder="Preço base" class="regra-input" value="0" style="flex:1">
              <input type="number" id="regraComplexidade" placeholder="Complexidade (1-5)" class="regra-input" value="3" min="1" max="5" style="flex:1">
            </div>
            <button class="btn-primario" id="btnAdicionarRegra" style="grid-column:1/-1;">+ Adicionar Regra</button>
          </div>
          <div class="modal-acoes" style="margin-top:12px;">
            <button class="btn-secundario" id="btnAplicarRegrasTodas">▶ Aplicar todas as regras em obras sem preço</button>
            <button class="btn-secundario" id="btnFecharRegras">Fechar</button>
          </div>
        </div>
      </div>
    `}renderModalTaxas(){let e=this.taxas;return`
      <div class="widget-config-overlay" id="taxasOverlay" style="display:none">
        <div class="widget-config-modal" style="max-width:400px;">
          <h3>💱 Taxas de Câmbio</h3>
          <p class="texto-ajuda">Valor de 1 ${this.moeda} em cada moeda. Deixe 1 para a moeda padrão.</p>
          <div class="taxas-form">
            ${[`USD`,`EUR`,`GBP`].map(t=>`
              <div class="taxa-item">
                <label>${t}</label>
                <input type="number" id="taxa${t}" value="${e[t]||1}" step="0.01" min="0.01">
              </div>
            `).join(``)}
          </div>
          <div class="modal-acoes">
            <button class="btn-secundario" id="btnFecharTaxas">Fechar</button>
            <button class="btn-primario" id="btnSalvarTaxas">Salvar</button>
          </div>
        </div>
      </div>
    `}renderHistoricoPrecos(e){let t=e.filter(e=>e.historicoPrecos&&e.historicoPrecos.length>0);if(t.length===0)return``;let n=t[0],r=n.historicoPrecos,i=r.map(e=>Number(e.preco)).concat([Number(n.preco)||0]).filter(e=>e>0);if(i.length<2)return``;let a=Math.max(...i)*1.15,o=Math.min(...i)*.85,s=a-o||1,c=i.map((e,t)=>({x:40+t/(i.length-1||1)*320,y:120-(e-o)/s*100,valor:e,label:t<r.length?r[t].data?.slice(0,7)||``:`Atual`})),l=c.map((e,t)=>`${t===0?`M`:`L`}${e.x.toFixed(1)},${e.y.toFixed(1)}`).join(` `),u=`M${c[0].x},120 ${l.slice(1)} L${c[c.length-1].x},120 Z`,d=(R().items||[]).filter(e=>String(e.obraId)===n.id||e.obraTitulo===n.titulo);return`
      <div class="card">
        <h3>📋 Histórico de Preços</h3>
        <div style="margin-bottom:12px;">
          <select id="selHistoricoObra" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
            ${t.map(e=>`<option value="${e.id}">${e.titulo||`Sem título`}</option>`).join(``)}
          </select>
          <span style="font-size:0.75rem;color:var(--text-muted);margin-left:8px;">${n.titulo} — ${r.length} reajustes</span>
        </div>
        <svg viewBox="0 0 400 140" class="svg-chart" style="height:140px;">
          <defs><linearGradient id="gradArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--accent)"/><stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
          ${[.25,.5,.75].map(e=>`<line class="chart-grid" x1="40" y1="${120-100*e}" x2="360" y2="${120-100*e}"/>`).join(``)}
          ${[0,.25,.5,.75,1].map(e=>`<text class="chart-label" x="32" y="${120-100*e+3}" text-anchor="end">${this.fmt(o+s*e)}</text>`).join(``)}
          <path class="chart-area" d="${u}"/>
          <path class="chart-line" d="${l}"/>
          ${c.map((e,t)=>`<circle class="chart-dot ${t<r.length&&d.some(e=>e.dataVenda&&new Date(e.dataVenda)>=new Date(r[t].data||0)-864e5&&new Date(e.dataVenda)<=new Date(r[t].data||Date.now())+864e5)?`vendido`:``}" cx="${e.x}" cy="${e.y}"/>`).join(``)}
          ${c.map(e=>`<text class="chart-valor" x="${e.x}" y="${e.y-8}">${this.fmt(e.valor)}</text>`).join(``)}
          ${c.map(e=>`<text class="chart-label" x="${e.x}" y="134">${e.label}</text>`).join(``)}
        </svg>
        <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;display:flex;gap:12px;justify-content:center;">
          <span>━ <span style="color:var(--accent)">Evolução</span></span>
          <span>● <span style="color:#10b981">Vendido</span></span>
        </div>
      </div>
    `}renderAnalise(e,t){let n=e.filter(e=>Number(e.preco)>0).map(e=>Number(e.preco)),r=n.length?Math.round(n.reduce((e,t)=>e+t,0)/n.length):0,i=n.length?Math.max(...n):0,a=n.length?Math.min(...n):0,o=n.reduce((e,t)=>e+t,0),s={};e.forEach(e=>{if(!e.preco)return;let t=e.tecnica||`Outra`;s[t]||(s[t]={soma:0,count:0}),s[t].soma+=Number(e.preco),s[t].count++});let c=Object.entries(s).map(([e,t])=>({tec:e,media:Math.round(t.soma/t.count),count:t.count})).sort((e,t)=>t.media-e.media),l=Math.max(...n,1)/8||1,u=Array(8).fill(0),d=[];for(let e=0;e<8;e++)d.push(`${this.fmt(e*l)}–${this.fmt((e+1)*l)}`);n.forEach(e=>{let t=Math.min(Math.floor(e/l),7);u[t]++});let f=Math.max(...u,1),p=u.map((e,t)=>`<div class="barra" style="height:${e/f*100}%"><span class="barra-count">${e}</span><span class="barra-label">${d[t]}</span></div>`).join(``),m=e.filter(t=>{if(!t.preco||!t.dimensoes||!t.dimensoes.largura||!t.dimensoes.altura)return!1;let n=t.dimensoes.largura*t.dimensoes.altura,r=e.filter(e=>{if(e.id===t.id||!e.preco)return!1;let r=e.dimensoes;if(!r||!r.largura||!r.altura)return!1;let i=r.largura*r.altura;return i>n*.5&&i<n*1.5});if(r.length<2)return!1;let i=r.reduce((e,t)=>e+Number(t.preco),0)/r.length;return Number(t.preco)<i*.7}),h=t.filter(e=>e.dataVenda&&e.obraId).map(t=>{let n=e.find(e=>e.id===t.obraId);if(!n||!n.criadoEm)return null;let r=new Date(n.criadoEm).getTime(),i=new Date(t.dataVenda).getTime();return i>r?Math.round((i-r)/864e5):null}).filter(e=>e!==null),g=h.length?Math.round(h.reduce((e,t)=>e+t,0)/h.length):null;return`
      <div class="analise-grid" style="margin-bottom:16px;">
        <div class="analise-card"><div class="analise-valor">${this.fmt(r)}</div><div class="analise-rotulo">💰 Preço médio</div></div>
        <div class="analise-card"><div class="analise-valor">${this.fmt(o)}</div><div class="analise-rotulo">📦 Valor total do portfólio</div></div>
        <div class="analise-card"><div class="analise-valor">${n.length}</div><div class="analise-rotulo">🗃️ Obras precificadas</div></div>
        <div class="analise-card"><div class="analise-valor">${this.fmt(a)} — ${this.fmt(i)}</div><div class="analise-rotulo">📐 Faixa de preços</div></div>
        <div class="analise-card"><div class="analise-valor">${g===null?`—`:g+` dias`}</div><div class="analise-rotulo">⏱ Tempo médio p/ vender</div></div>
        <div class="analise-card"><div class="analise-valor">${m.length}</div><div class="analise-rotulo">⚡ Possivelmente subprecificadas</div></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div>
          <h4 style="margin:0 0 8px;font-size:0.85rem;color:var(--text-muted);">Distribuição de Preços</h4>
          <div class="histograma">${p}</div>
        </div>
        <div>
          <h4 style="margin:0 0 8px;font-size:0.85rem;color:var(--text-muted);">Média de Preço por Técnica</h4>
          <table class="tabela-media">
            <tr><th>Técnica</th><th>Média</th><th>Obras</th></tr>
            ${c.map(e=>`<tr><td>${e.tec}</td><td>${this.fmt(e.media)}</td><td>${e.count}</td></tr>`).join(``)}
          </table>
        </div>
      </div>
      ${m.length>0?`
      <div style="margin-top:16px;">
        <h4 style="margin:0 0 8px;font-size:0.85rem;color:#92400e;">⚡ Obras que podem estar subprecificadas</h4>
        <ul class="sub-list">
          ${m.map(t=>{let n=t.dimensoes.largura*t.dimensoes.altura,r=e.filter(e=>{if(e.id===t.id||!e.preco)return!1;let r=e.dimensoes;if(!r||!r.largura||!r.altura)return!1;let i=r.largura*r.altura;return i>n*.5&&i<n*1.5}),i=r.reduce((e,t)=>e+Number(t.preco),0)/r.length,a=Math.round(i-Number(t.preco));return`<li class="sub-alert"><span class="sub-nome">${t.titulo||`Sem título`}</span><span class="sub-valores">Atual: ${this.fmt(t.preco)} | Sugerido: ${this.fmt(i)}</span><span class="sub-diff">+${this.fmt(a)}</span></li>`}).join(``)}
        </ul>
      </div>`:``}
    `}renderMetas(e,t){let n=this.config,r=Number(n.metaMensal)||1e4,i=Number(n.metaAnual)||12e4,a=new Date,o=a.getMonth(),s=a.getFullYear(),c=t.filter(e=>{if(!e.dataVenda||!e.valorTotal)return!1;let t=new Date(e.dataVenda);return t.getMonth()===o&&t.getFullYear()===s}).reduce((e,t)=>e+Number(t.valorTotal),0),l=t.filter(e=>!e.dataVenda||!e.valorTotal?!1:new Date(e.dataVenda).getFullYear()===s).reduce((e,t)=>e+Number(t.valorTotal),0),u=Math.min(100,r>0?Math.round(c/r*100):0),d=Math.min(100,i>0?Math.round(l/i*100):0),f=a.getDate(),p=new Date(s,o+1,0).getDate()-f,m=f>0?c/f:0,h=m>0?Math.ceil((r-c)/m):null,g=m>0?`Com o ritmo atual (${this.fmt(Math.round(m))}/dia), você ${h!==null&&h<=p?`atingirá a meta mensal em <strong>${h} dias</strong>.`:`<strong>não</strong> atingirá a meta mensal a tempo.`}`:``,_=Math.max(0,r-c),v=e.filter(e=>Number(e.preco)>0),y=v.length>0?v.reduce((e,t)=>e+Number(t.preco),0)/v.length:0,b=y>0?Math.ceil(_/y):0,x=_>0&&y>0?`Você precisa vender <strong>${b} obra${b>1?`s`:``}</strong> de ~${this.fmt(Math.round(y))} para atingir a meta mensal.`:`Meta mensal já atingida! 🎉`,S=this.circuloProgresso(u,`${u}%`,`do mês`),C=this.circuloProgresso(d,`${d}%`,`do ano`);return`
      <div class="metas-grid">
        <div class="card meta-card">
          <div class="meta-rotulo">Meta Mensal</div>
          <div class="meta-valor">${this.fmt(r)}</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin:8px 0;">
            <span style="font-size:0.85rem;color:var(--text-muted);">Faturamento: ${this.fmt(c)}</span>
          </div>
          ${S}
          <div class="meta-edit">
            <input type="number" id="metaMensalInput" value="${r}" min="0" step="100">
            <button class="btn-secundario" id="btnSalvarMetaMensal">Salvar</button>
          </div>
          ${g?`<div class="meta-projecao">📈 ${g}</div>`:``}
          ${x?`<div class="meta-sugestao">💡 ${x}</div>`:``}
        </div>
        <div class="card meta-card">
          <div class="meta-rotulo">Meta Anual</div>
          <div class="meta-valor">${this.fmt(i)}</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin:8px 0;">
            <span style="font-size:0.85rem;color:var(--text-muted);">Faturamento: ${this.fmt(l)}</span>
          </div>
          ${C}
          <div class="meta-edit">
            <input type="number" id="metaAnualInput" value="${i}" min="0" step="1000">
            <button class="btn-secundario" id="btnSalvarMetaAnual">Salvar</button>
          </div>
          <div class="meta-projecao">📆 ${p} dias restantes no mês</div>
        </div>
      </div>
    `}circuloProgresso(e,t,n){let r=2*Math.PI*56;return`
      <div class="circulo-progresso">
        <svg viewBox="0 0 140 140">
          <circle class="bg-circle" cx="70" cy="70" r="56"/>
          <circle class="progress-circle" cx="70" cy="70" r="56" stroke-dasharray="${r}" stroke-dashoffset="${r-e/100*r}"/>
        </svg>
        <div class="centro-texto">
          <div class="pct">${t}</div>
          <div class="pct-label">${n}</div>
        </div>
      </div>
    `}aposRenderizar(){this.removerListeners();let e=document.getElementById(`selMoedaPadrao`);if(e){let t=()=>{this.cfgRoot.moedaPadrao=e.value,z().salvar(),this.rerenderizar()};e.addEventListener(`change`,t),this._bindCache.selMoedaPadrao={el:e,handler:t,type:`change`}}document.getElementById(`btnEditarTaxas`)?.addEventListener(`click`,()=>{document.getElementById(`taxasOverlay`).style.display=`flex`}),document.getElementById(`btnFecharTaxas`)?.addEventListener(`click`,()=>{document.getElementById(`taxasOverlay`).style.display=`none`}),document.getElementById(`btnSalvarTaxas`)?.addEventListener(`click`,()=>{let e=this.cfgRoot.taxasCambio||{};[`USD`,`EUR`,`GBP`].forEach(t=>{let n=document.getElementById(`taxa`+t);n&&(e[t]=Number(n.value)||1)}),this.cfgRoot.taxasCambio=e,z().salvar(),document.getElementById(`taxasOverlay`).style.display=`none`,i(`Taxas de câmbio salvas!`),this.rerenderizar()}),document.getElementById(`btnAbrirRegras`)?.addEventListener(`click`,()=>{document.getElementById(`regrasOverlay`).style.display=`flex`}),document.getElementById(`btnFecharRegras`)?.addEventListener(`click`,()=>{document.getElementById(`regrasOverlay`).style.display=`none`}),document.getElementById(`btnAdicionarRegra`)?.addEventListener(`click`,()=>this.adicionarRegra()),document.getElementById(`btnAplicarRegrasTodas`)?.addEventListener(`click`,()=>this.aplicarRegrasEmTodas());let t=document.getElementById(`regrasLista`);t&&t.addEventListener(`click`,e=>{let t=e.target.closest(`.btn-aplicar-regra`),n=e.target.closest(`.btn-remover-regra`);if(t){let e=Number(t.dataset.idx);this.aplicarRegra(e)}if(n){let e=Number(n.dataset.idx);this.removerRegra(e)}}),[`calcMateriais`,`calcHoras`,`calcValorHora`,`calcLargura`,`calcAltura`].forEach(e=>{let t=document.getElementById(e);if(!t)return;let n=()=>{this.calc[e.replace(`calc`,``).toLowerCase()]=Number(t.value)||0,e===`calcValorHora`&&this.salvarConfig({valorHora:Number(t.value)||60}),this.atualizarResultado()};t.addEventListener(`input`,n),this._bindCache[e]={el:t,handler:n,type:`input`}});let n=document.getElementById(`estrelasInput`);if(n){let e=e=>{let t=e.target.closest(`.estrela`);t&&(this.calc.complexidade=Number(t.dataset.val),n.querySelectorAll(`.estrela`).forEach(e=>e.classList.toggle(`preenchida`,Number(e.dataset.val)<=this.calc.complexidade)),this.atualizarResultado())};n.addEventListener(`click`,e),this._bindCache.estrelasInput={el:n,handler:e,type:`click`}}let r=document.getElementById(`selObraCalc`);if(r){let e=()=>{let e=P().porId(r.value);e?(document.getElementById(`calcMateriais`).value=e.custoMateriais||0,document.getElementById(`calcHoras`).value=e.horasTrabalho||0,e.dimensoes&&(document.getElementById(`calcLargura`).value=e.dimensoes.largura||0,document.getElementById(`calcAltura`).value=e.dimensoes.altura||0),this.calc.materiais=Number(e.custoMateriais)||0,this.calc.horas=Number(e.horasTrabalho)||0,this.calc.largura=e.dimensoes&&e.dimensoes.largura||0,this.calc.altura=e.dimensoes&&e.dimensoes.altura||0,this.calc.obraId=e.id,this.atualizarResultado()):(this.calc.obraId=``,this.atualizarResultado())};r.addEventListener(`change`,e),this._bindCache.selObraCalc={el:r,handler:e,type:`change`}}document.getElementById(`btnSalvarPrecoCalc`)?.addEventListener(`click`,()=>this.salvarPrecoNaObra()),document.getElementById(`selHistoricoObra`)?.addEventListener(`change`,()=>this.rerenderizar()),document.getElementById(`selProjecaoObra`)?.addEventListener(`change`,()=>this.rerenderizar()),document.getElementById(`btnSalvarMetaMensal`)?.addEventListener(`click`,()=>{let e=Number(document.getElementById(`metaMensalInput`)?.value)||0;this.salvarConfig({metaMensal:e}),i(`Meta mensal salva!`),this.rerenderizar()}),document.getElementById(`btnSalvarMetaAnual`)?.addEventListener(`click`,()=>{let e=Number(document.getElementById(`metaAnualInput`)?.value)||0;this.salvarConfig({metaAnual:e}),i(`Meta anual salva!`),this.rerenderizar()}),document.getElementById(`btnExportarRelatorio`)?.addEventListener(`click`,()=>this.exportarRelatorioPDF())}atualizarResultado(){let e=this.calcularPreco(this.calc),t=document.getElementById(`valorSugerido`),n=document.getElementById(`detalheCalculo`),r=document.getElementById(`faixaComparativa`),i=document.getElementById(`conversoesMultiMoeda`);if(t&&(t.textContent=this.fmt(e)),n&&(n.textContent=this.detalharCalculo(e)),i&&(i.innerHTML=[`USD`,`EUR`,`GBP`].filter(e=>e!==this.moeda).map(t=>`<span class="conv-moeda">${t}: ${this.fmt(this.converter(e,this.moeda,t),t)}</span>`).join(``)),r){let e=P().items||[];r.innerHTML=this.renderFaixaComparativa(e)}}salvarPrecoNaObra(){let e=this.calc.obraId||document.getElementById(`selObraCalc`)?.value;if(!e){i(`Selecione uma obra primeiro.`);return}let t=this.calcularPreco(this.calc),n=P().porId(e);if(!n){i(`Obra não encontrada.`);return}let r=n.historicoPrecos||[];n.preco&&Number(n.preco)>0&&r.push({preco:Number(n.preco),data:new Date().toISOString().slice(0,10),motivo:`Reajuste via Precificador`}),r.push({preco:t,data:new Date().toISOString().slice(0,10),motivo:`Preço sugerido pelo Precificador`}),P().atualizar(e,{preco:t,custoMateriais:Number(this.calc.materiais)||0,horasTrabalho:Number(this.calc.horas)||0,historicoPrecos:r}),i(`Preço ${this.fmt(t)} salvo na obra "${n.titulo||``}"!`),this.rerenderizar()}adicionarRegra(){let e=document.getElementById(`regraNome`)?.value?.trim();if(!e){i(`Informe um nome para a regra.`);return}let t=this.cfgRoot.precificadorRegras||[];t.push({id:`regra_`+Date.now(),nome:e,tecnica:document.getElementById(`regraTecnica`)?.value||``,larguraMin:Number(document.getElementById(`regraLargMin`)?.value)||0,larguraMax:Number(document.getElementById(`regraLargMax`)?.value)||9999,alturaMin:Number(document.getElementById(`regraAltMin`)?.value)||0,alturaMax:Number(document.getElementById(`regraAltMax`)?.value)||9999,complexidade:Number(document.getElementById(`regraComplexidade`)?.value)||3,multiplicador:Number(document.getElementById(`regraMult`)?.value)||1.5,precoBase:Number(document.getElementById(`regraBase`)?.value)||0}),this.cfgRoot.precificadorRegras=t,z().salvar(),i(`Regra adicionada!`),this.rerenderizar()}removerRegra(e){let t=this.cfgRoot.precificadorRegras||[];t.splice(e,1),this.cfgRoot.precificadorRegras=t,z().salvar(),this.rerenderizar()}aplicarRegra(e){let t=(this.cfgRoot.precificadorRegras||[])[e];if(!t)return;let n=P().items||[],r=0;n.forEach(e=>{let n=e.dimensoes;if(!n||t.tecnica&&e.tecnica!==t.tecnica||n.largura<t.larguraMin||n.largura>t.larguraMax||n.altura<t.alturaMin||n.altura>t.alturaMax)return;let i=1+n.largura*n.altura/1e4,a=Math.round((t.precoBase||0)*t.multiplicador*this.fatoresComplexidade[t.complexidade]*i);if(a>0){let n=e.historicoPrecos||[];e.preco&&Number(e.preco)>0&&n.push({preco:Number(e.preco),data:new Date().toISOString().slice(0,10),motivo:`Reajuste por regra: `+t.nome}),P().atualizar(e.id,{preco:a,historicoPrecos:n}),r++}}),i(`Regra "${t.nome}" aplicada em ${r} obra${r>1?`s`:``}.`),this.rerenderizar()}aplicarRegrasEmTodas(){let e=this.cfgRoot.precificadorRegras||[];if(e.length===0){i(`Nenhuma regra cadastrada.`);return}let t=(P().items||[]).filter(e=>!e.preco||Number(e.preco)===0),n=0;t.forEach(t=>{let r=t.dimensoes;if(!r||!r.largura)return;let i=e.find(e=>!(e.tecnica&&t.tecnica!==e.tecnica||r.largura<e.larguraMin||r.largura>e.larguraMax||r.altura<e.alturaMin||r.altura>e.alturaMax));if(!i)return;let a=1+r.largura*r.altura/1e4,o=Math.round((i.precoBase||0)*i.multiplicador*this.fatoresComplexidade[i.complexidade||3]*a);o>0&&(P().atualizar(t.id,{preco:o}),n++)}),i(`Regras aplicadas em ${n} obra${n>1?`s`:``} sem preço.`),this.rerenderizar()}exportarRelatorioPDF(){if(window.jspdf===void 0&&typeof jspdf>`u`){i(`jsPDF não carregado. Tente novamente.`);return}a(`Gerando relatório de precificação...`);let{jsPDF:e}=window.jspdf,t=new e({orientation:`portrait`,unit:`mm`,format:`a4`}),n=P().items||[],r=R().items||[],s=this.config,c=z().artista?.nome||`Artista`,l=20;t.setFont(`helvetica`,`bold`),t.setFontSize(16),t.text(`Relatório de Precificação`,20,l),l+=8,t.setFont(`helvetica`,`normal`),t.setFontSize(9),t.text(`Artista: ${c} | Moeda: ${this.moeda} | Gerado em: ${new Date().toLocaleDateString(`pt-BR`)}`,20,l),l+=6,t.setDrawColor(200),t.line(20,l,190,l),l+=8,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Preços Sugeridos`,20,l),l+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(8);let u=n.filter(e=>e.dimensoes&&e.dimensoes.largura&&e.dimensoes.altura);u.length>0?u.slice(0,20).forEach(e=>{let n={materiais:Number(e.custoMateriais)||0,horas:Number(e.horasTrabalho)||0,valorHora:s.valorHora||60,largura:e.dimensoes.largura,altura:e.dimensoes.altura,complexidade:3},r=this.calcularPreco(n);l>270&&(t.addPage(),l=20),t.text(`${e.titulo||`Sem título`} — Atual: ${this.fmt(e.preco)} | Sugerido: ${this.fmt(r)} | ${e.tecnica||``} | ${e.dimensoes.largura}×${e.dimensoes.altura}cm`,20,l),l+=5}):(t.text(`Nenhuma obra com dimensões para calcular preço sugerido.`,20,l),l+=5),l+=6,t.setDrawColor(200),t.line(20,l,190,l),l+=8,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Análise de Break-Even`,20,l),l+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(8);let d=n.filter(e=>(e.custoMateriais>0||e.horasTrabalho>0)&&e.preco>0);d.length>0?d.slice(0,15).forEach(e=>{let n=(Number(e.custoMateriais)||0)+(Number(e.horasTrabalho)||0)*(s.valorHora||60),r=Number(e.preco)||0,i=r>0?(r-n)/r*100:0;l>270&&(t.addPage(),l=20),t.text(`${e.titulo||`Sem título`} — Custo: ${this.fmt(n)} | Preço: ${this.fmt(r)} | Margem: ${i.toFixed(1)}%`,i,l),l+=5}):(t.text(`Nenhuma obra com dados de custo.`,20,l),l+=5),l+=6,t.setDrawColor(200),t.line(20,l,190,l),l+=8,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Metas Financeiras`,20,l),l+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(9);let f=new Date,p=f.getMonth(),m=f.getFullYear(),h=r.filter(e=>e.dataVenda&&e.valorTotal&&new Date(e.dataVenda).getMonth()===p&&new Date(e.dataVenda).getFullYear()===m).reduce((e,t)=>e+Number(t.valorTotal),0),g=r.filter(e=>e.dataVenda&&e.valorTotal&&new Date(e.dataVenda).getFullYear()===m).reduce((e,t)=>e+Number(t.valorTotal),0);t.text(`Meta Mensal: ${this.fmt(s.metaMensal||1e4)} | Faturamento: ${this.fmt(h)}`,20,l),l+=5,t.text(`Meta Anual: ${this.fmt(s.metaAnual||12e4)} | Faturamento: ${this.fmt(g)}`,20,l),l+=5,t.text(`Progresso mensal: ${s.metaMensal>0?Math.round(h/s.metaMensal*100):0}%`,20,l),l+=5,l+=6,t.setDrawColor(200),t.line(20,l,190,l),l+=8,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Análise do Portfólio`,20,l),l+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(9);let _=n.filter(e=>Number(e.preco)>0).map(e=>Number(e.preco)),v=_.length?Math.round(_.reduce((e,t)=>e+t,0)/_.length):0,y=_.reduce((e,t)=>e+t,0);t.text(`Obras precificadas: ${_.length}`,20,l),l+=5,t.text(`Preço médio: ${this.fmt(v)}`,20,l),l+=5,t.text(`Valor total do portfólio: ${this.fmt(y)}`,20,l),l+=5,_.length>0&&(t.text(`Menor preço: ${this.fmt(Math.min(..._))} | Maior preço: ${this.fmt(Math.max(..._))}`,20,l),l+=5),t.save(`relatorio-precificacao.pdf`),o(),i(`Relatório PDF exportado com sucesso!`)}},de=class extends D{constructor(e,t){super(e,t),this.tabAtiva=`estoque`,this.filtroCategoria=``,this.catIcones={tintas:`🎨`,superficies:`📐`,ferramentas:`🔧`,molduras:`🖼️`},this.catLabels={tintas:`Tintas`,superficies:`Superfícies`,ferramentas:`Ferramentas`,molduras:`Molduras`}}get materiais(){return this.dataStore.listar(`materiais`)||[]}get fornecedores(){return this.dataStore.listar(`fornecedores`)||[]}get consumos(){return this.dataStore.listar(`consumos`)||[]}get obras(){return this.dataStore.listar(`obras`)||[]}render(){let e=[`estoque`,`consumo`,`compras`,`fornecedores`,`custo`],t={estoque:`📦 Estoque`,consumo:`📋 Consumo`,compras:`🛒 Compras`,fornecedores:`🏪 Fornecedores`,custo:`💰 Custo p/ Obra`};return`
      <div>
        <div class="atelier-tabs">
          ${e.map(e=>`<button class="tab-btn ${e===this.tabAtiva?`ativo`:``}" data-tab="${e}">${t[e]}</button>`).join(``)}
        </div>
        <div id="atelierContent">${{estoque:()=>this.renderEstoque(),consumo:()=>this.renderConsumo(),compras:()=>this.renderCompras(),fornecedores:()=>this.renderFornecedores(),custo:()=>this.renderCustoObra()}[this.tabAtiva]()}</div>
      </div>
    `}renderEstoque(){let e=this.materiais,t=Object.keys(this.catLabels),n=this.filtroCategoria?e.filter(e=>e.categoria===this.filtroCategoria):e;return`
      <div class="mat-filtros">
        <select id="filtroCatEstoque">
          <option value="">📚 Todas as categorias</option>
          ${t.map(e=>`<option value="${e}" ${this.filtroCategoria===e?`selected`:``}>${this.catIcones[e]} ${this.catLabels[e]}</option>`).join(``)}
        </select>
        <button class="btn-primario" id="btnNovoMaterial" style="font-size:0.8rem;padding:6px 14px;">➕ Novo Material</button>
        <span style="font-size:0.8rem;color:var(--text-muted);margin-left:auto;">${n.length} item(ns)</span>
      </div>
      <div class="mat-grid">
        ${n.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum material encontrado.</p>`:``}
        ${n.map(e=>this.renderCardMaterial(e)).join(``)}
      </div>
    `}renderCardMaterial(e){let t=Number(e.quantidade)||0,n=Number(e.quantidadeMinima)||0,r=t<=0||n>0&&t<=n?`baixo`:n>0&&t<=n*2?`medio`:`ok`,i=r===`baixo`?`⚠️ Repor`:r===`medio`?`⚠️ Atenção`:`✔ OK`,a=e.categoria||`outros`;return`
      <div class="mat-card">
        <div class="mat-faixa-alerta ${r}"></div>
        <div class="mat-header">
          <div>
            <div class="mat-nome">${this.catIcones[a]||`📦`} ${e.nome||``}</div>
            <span class="mat-cat ${a}">${this.catLabels[a]||a} ${e.subcategoria?`· `+e.subcategoria:``}</span>
          </div>
          <div style="text-align:right;">
            <div class="mat-qtd ${r===`baixo`?`alerta`:`ok`}">${t}</div>
            <div class="mat-qtd-label">${e.unidade||`un`}</div>
            <span class="mat-badge ${r}">${i}</span>
          </div>
        </div>
        <div class="mat-detalhes">
          ${e.marca?`<span>🏷️ ${e.marca}</span>`:``}
          ${e.local?`<span>📍 ${e.local}</span>`:``}
          ${e.precoUnitario?`<span>💰 R$ ${Number(e.precoUnitario).toFixed(2)}/${e.unidade||`un`}</span>`:``}
          ${e.dataAquisicao?`<span>📅 ${e.dataAquisicao}</span>`:``}
          ${e.validade?`<span>⏳ Val: ${e.validade}</span>`:``}
        </div>
        ${e.notas?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📝 ${e.notas}</div>`:``}
        <div class="mat-acoes">
          <button data-acao="editarMaterial" data-id="${e.id}">✏️ Editar</button>
          <button data-acao="consumirMaterial" data-id="${e.id}">📉 Consumir</button>
          <button data-acao="excluirMaterial" data-id="${e.id}" style="color:#dc2626;">🗑️</button>
        </div>
      </div>
    `}renderConsumo(){let e=this.consumos,t=this.materiais,r=this.obras,i=e.map(e=>{let n=t.find(t=>t.id===e.materialId),i=r.find(t=>t.id===e.obraId),a=n&&n.precoUnitario?Number(e.quantidade)*Number(n.precoUnitario):null;return{...e,matNome:n?n.nome:`(removido)`,obraTitulo:i?i.titulo:`(removida)`,custo:a}}).reverse();return`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <button class="btn-primario" id="btnNovoConsumo" style="font-size:0.8rem;padding:6px 14px;">➕ Registrar Consumo</button>
        <span style="font-size:0.8rem;color:var(--text-muted);">${e.length} registro(s)</span>
      </div>
      ${i.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum consumo registrado.</p>`:`
      <table class="cons-table">
        <tr><th>Material</th><th>Obra</th><th>Qtd</th><th>Custo</th><th>Data</th><th>Notas</th><th></th></tr>
        ${i.map(e=>`
          <tr>
            <td class="cons-obra">${e.matNome}</td>
            <td>${e.obraTitulo}</td>
            <td>${e.quantidade}</td>
            <td>${e.custo===null?`—`:n(e.custo)}</td>
            <td>${e.data||`—`}</td>
            <td style="font-size:0.75rem;color:var(--text-muted);max-width:150px;overflow:hidden;text-overflow:ellipsis;">${e.notas||``}</td>
            <td><button data-acao="excluirConsumo" data-id="${e.id}" style="font-size:0.7rem;padding:2px 6px;border:1px solid var(--border);background:var(--bg);color:#dc2626;cursor:pointer;">🗑️</button></td>
          </tr>
        `).join(``)}
      </table>`}
    `}renderCompras(){let e=this.materiais,t=e.filter(e=>{let t=Number(e.quantidade)||0,n=Number(e.quantidadeMinima)||0;return n>0&&t<=n});e.filter(e=>e.comprado!==void 0);let r=e.filter(e=>e.comprado===!1),i=e.filter(e=>e.comprado===!0),a=r.reduce((e,t)=>e+(Number(t.precoUnitario)||0)*Math.max(1,Math.ceil(((Number(t.quantidadeMinima)||0)*2-(Number(t.quantidade)||0))/1)),0);return`
      <div class="compras-resumo">
        <div class="cr-item"><div class="cr-valor">${t.length}</div><div class="cr-label">⚠️ Abaixo do mínimo</div></div>
        <div class="cr-item"><div class="cr-valor">${r.length}</div><div class="cr-label">🛒 Para comprar</div></div>
        <div class="cr-item"><div class="cr-valor">${i.length}</div><div class="cr-label">✔ Comprados</div></div>
        <div class="cr-item"><div class="cr-valor">${n(Math.round(a))}</div><div class="cr-label">💰 Custo estimado</div></div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
        <button class="btn-primario" id="btnGerarLista" style="font-size:0.8rem;padding:6px 14px;">⚡ Gerar lista automática</button>
        <button class="btn-secundario" id="btnAddItemLista" style="font-size:0.8rem;padding:6px 14px;">➕ Adicionar item manual</button>
        <button class="btn-secundario" id="btnExportarListaTXT" style="font-size:0.8rem;padding:6px 14px;">📞 Exportar TXT</button>
      </div>
      ${r.length===0&&i.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum item na lista. Clique em "Gerar lista automática".</p>`:``}
      <ul class="lista-compras">
        ${r.map(e=>this.renderItemCompra(e,!1)).join(``)}
        ${i.map(e=>this.renderItemCompra(e,!0)).join(``)}
      </ul>
    `}renderItemCompra(e,t){let r=Math.max(1,Math.ceil((Number(e.quantidadeMinima)||0)*2-(Number(e.quantidade)||0)));return`
      <li class="${t?`comprado`:``}">
        <div class="lc-info">
          <div class="lc-nome">${this.catIcones[e.categoria]||`📦`} ${e.nome}</div>
          <div class="lc-cat">${this.catLabels[e.categoria]||e.categoria} ${e.marca?`· `+e.marca:``}</div>
        </div>
        <div class="lc-qtd">${t?`✔️`:`Qtd: ${r} ${e.unidade||`un`}`}</div>
        ${e.precoUnitario?`<div class="lc-preco">${n(Math.round((Number(e.precoUnitario)||0)*r))}</div>`:``}
        <div class="lc-acoes">
          ${t?`<button data-acao="desmarcarComprado" data-id="${e.id}">↩️</button>`:`<button data-acao="marcarComprado" data-id="${e.id}">✔</button>`}
          <button data-acao="removerLista" data-id="${e.id}" style="color:#dc2626;">🗑️</button>
        </div>
      </li>
    `}renderFornecedores(){let e=this.fornecedores;return`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <button class="btn-primario" id="btnNovoFornecedor" style="font-size:0.8rem;padding:6px 14px;">➕ Novo Fornecedor</button>
        <span style="font-size:0.8rem;color:var(--text-muted);">${e.length} fornecedor(es)</span>
      </div>
      <div class="forn-grid">
        ${e.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum fornecedor cadastrado.</p>`:``}
        ${e.map(e=>{let t=e.historicoCompras||[],r=t.reduce((e,t)=>e+Number(t.valor||0),0);return`
            <div class="forn-card">
              <div class="forn-nome">🏪 ${e.nome}</div>
              <div class="forn-contato">${e.contato||``}${e.email?` · `+e.email:``}</div>
              <div class="forn-esp">📒 ${e.especialidade||`Sem especialidade`}</div>
              ${e.avaliacao?`<div class="forn-estrelas">${`★`.repeat(Math.min(5,Number(e.avaliacao)))}${`☆`.repeat(Math.max(0,5-Number(e.avaliacao)))}</div>`:``}
              ${e.notas?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📝 ${e.notas}</div>`:``}
              ${t.length>0?`
                <div class="forn-hist">
                  <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted);margin-bottom:4px;">Histórico (Total: ${n(r)})</div>
                  ${t.map(e=>`<div class="hist-item"><span>${e.data||``} — ${e.itens||``}</span><span>${n(Number(e.valor)||0)}</span></div>`).join(``)}
                </div>
              `:``}
              <div class="forn-acoes">
                <button data-acao="editarFornecedor" data-id="${e.id}">✏️ Editar</button>
                <button data-acao="excluirFornecedor" data-id="${e.id}" style="color:#dc2626;">🗑️</button>
              </div>
            </div>
          `}).join(``)}
      </div>
    `}renderCustoObra(){let e=this.obras;return this.consumos,this.materiais,`
      <div style="margin-bottom:12px;">
        <select id="selCustoObra" style="padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.9rem;background:var(--bg);color:var(--text);width:100%;max-width:400px;">
          <option value="">— Selecione uma obra —</option>
          ${e.map(e=>`<option value="${e.id}">${e.titulo||`Sem título`} ${e.preco?`— `+n(e.preco):``}</option>`).join(``)}
        </select>
      </div>
      <div id="custoObraDetalhe">
        <p style="color:var(--text-muted);font-size:0.85rem;">Selecione uma obra para ver o detalhamento de custos.</p>
      </div>
    `}renderCustoDetalhe(e){let t=this.dataStore.buscarPorId(`obras`,e);if(!t)return`<p style="color:var(--text-muted);">Obra não encontrada.</p>`;let r=this.consumos.filter(t=>t.obraId===e),i=this.materiais,a=0,o=r.map(e=>{let t=i.find(t=>t.id===e.materialId),n=t&&t.precoUnitario?Number(e.quantidade)*Number(t.precoUnitario):0;return a+=n,{...e,matNome:t?t.nome:`(removido)`,custo:n}}),s=Number(t.preco)||0,c=s>0?(s-a)/s*100:0,l=c>=60?`lucro-alta`:c>=30?`lucro-media`:`lucro-baixa`;return`
      <div class="custo-obra-header">
        <div class="custo-obra-card">
          <div class="co-valor">${n(Math.round(a))}</div>
          <div class="co-label">💰 Custo de produção</div>
        </div>
        <div class="custo-obra-card">
          <div class="co-valor">${s>0?n(s):`—`}</div>
          <div class="co-label">🏷️ Preço de venda</div>
        </div>
        <div class="custo-obra-card">
          <div class="co-valor ${l}">${c>0?c.toFixed(1)+`%`:`—`}</div>
          ${c>0?`<div class="co-label">📊 Margem de lucro ${c>=60?`✔`:c>=30?`⚠️`:`🔽`}</div>`:`<div class="co-label">Sem venda definida</div>`}
        </div>
      </div>
      ${o.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum material registrado como consumido nesta obra.</p>`:`
      <table class="cons-table">
        <tr><th>Material</th><th>Qtd</th><th>Valor unit.</th><th>Custo</th><th>Data</th><th>Notas</th></tr>
        ${o.map(e=>`<tr><td class="cons-obra">${e.matNome}</td><td>${e.quantidade}</td><td>${i.find(t=>t.id===e.materialId)?.precoUnitario?`R$ `+Number(i.find(t=>t.id===e.materialId).precoUnitario).toFixed(2):`—`}</td><td>${n(Math.round(e.custo))}</td><td>${e.data||`—`}</td><td style="font-size:0.75rem;color:var(--text-muted);">${e.notas||``}</td></tr>`).join(``)}
        <tr style="font-weight:600;"><td>TOTAL</td><td></td><td></td><td>${n(Math.round(a))}</td><td></td><td></td></tr>
      </table>`}
      <div style="margin-top:12px;font-size:0.85rem;color:var(--text-muted);">
        💡 Dica: Registre materiais usados na aba <strong>Consumo</strong> para ver o custo real de cada obra.
      </div>
    `}aposRenderizar(){this.removerListeners(),document.querySelectorAll(`.tab-btn[data-tab]`).forEach(e=>{let t=()=>{this.tabAtiva=e.dataset.tab,this.rerenderizar()};e.addEventListener(`click`,t),this._bindCache[`tab_`+e.dataset.tab]={el:e,handler:t,type:`click`}});let e=document.getElementById(`filtroCatEstoque`);if(e){let t=()=>{this.filtroCategoria=e.value,this.rerenderizar()};e.addEventListener(`change`,t),this._bindCache.filtroCatEstoque={el:e,handler:t,type:`change`}}document.getElementById(`btnNovoMaterial`)?.addEventListener(`click`,()=>this.abrirFormMaterial()),document.getElementById(`btnNovoConsumo`)?.addEventListener(`click`,()=>this.abrirFormConsumo()),document.getElementById(`btnNovoFornecedor`)?.addEventListener(`click`,()=>this.abrirFormFornecedor()),document.getElementById(`btnGerarLista`)?.addEventListener(`click`,()=>this.gerarListaCompras()),document.getElementById(`btnAddItemLista`)?.addEventListener(`click`,()=>this.abrirFormMaterial(!0)),document.getElementById(`btnExportarListaTXT`)?.addEventListener(`click`,()=>this.exportarListaTXT());let t=document.getElementById(`selCustoObra`);if(t){let e=()=>{let e=document.getElementById(`custoObraDetalhe`);e&&(e.innerHTML=t.value?this.renderCustoDetalhe(t.value):`<p style="color:var(--text-muted);font-size:0.85rem;">Selecione uma obra para ver o detalhamento de custos.</p>`)};t.addEventListener(`change`,e),this._bindCache.selCustoObra={el:t,handler:e,type:`change`}}let n=document.getElementById(`atelierContent`)||document.getElementById(`viewPrincipal`);if(n){let e=e=>{let t=e.target.closest(`[data-acao]`);if(!t)return;let n=t.dataset.acao,r=t.dataset.id;n===`editarMaterial`?this.abrirFormMaterial(!1,r):n===`excluirMaterial`?this.excluirMaterial(r):n===`consumirMaterial`?this.consumirRapido(r):n===`excluirConsumo`?this.excluirConsumo(r):n===`editarFornecedor`?this.abrirFormFornecedor(r):n===`excluirFornecedor`?this.excluirFornecedor(r):n===`marcarComprado`?this.marcarComprado(r,!0):n===`desmarcarComprado`?this.marcarComprado(r,!1):n===`removerLista`&&this.removerDaLista(r)};n.addEventListener(`click`,e),this._bindCache.delegatedAtelier={el:n,handler:e,type:`click`}}}abrirFormMaterial(e=!1,t=null){let n=t?this.dataStore.buscarPorId(`materiais`,t):null,r=e||n&&n.comprado!==void 0,a=Object.keys(this.catLabels).map(e=>`<option value="${e}" ${n&&n.categoria===e?`selected`:``}>${this.catIcones[e]} ${this.catLabels[e]}</option>`).join(``);s(`
      <h3>${n?`✏️ Editar`:r?`➕ Adicionar à Lista`:`➕ Novo Material`}</h3>
      <form id="formModal" style="display:grid;gap:10px;">
        <div class="modal-form-grid">
          <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Nome *</label><input type="text" id="fMatNome" value="${n&&n.nome||``}" required style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Categoria</label><select id="fMatCat" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">${a}</select></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Subcategoria</label><input type="text" id="fMatSub" value="${n&&n.subcategoria||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Marca</label><input type="text" id="fMatMarca" value="${n&&n.marca||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Quantidade atual</label><input type="number" id="fMatQtd" value="${n&&n.quantidade||0}" min="0" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Unidade</label><input type="text" id="fMatUn" value="${n&&n.unidade||`un`}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Qtd. mínima (alerta)</label><input type="number" id="fMatMin" value="${n&&n.quantidadeMinima||0}" min="0" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Preço unit. (R$)</label><input type="number" id="fMatPreco" value="${n&&n.precoUnitario||0}" min="0" step="0.01" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Local</label><input type="text" id="fMatLocal" value="${n&&n.local||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Data aquisição</label><input type="date" id="fMatData" value="${n&&n.dataAquisicao||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Notas</label><textarea id="fMatNotas" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;min-height:50px;">${n&&n.notas||``}</textarea></div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarModal`).addEventListener(`click`,c),document.getElementById(`formModal`).addEventListener(`submit`,e=>{e.preventDefault();let a={nome:document.getElementById(`fMatNome`).value.trim(),categoria:document.getElementById(`fMatCat`).value,subcategoria:document.getElementById(`fMatSub`).value.trim(),marca:document.getElementById(`fMatMarca`).value.trim(),quantidade:Number(document.getElementById(`fMatQtd`).value)||0,unidade:document.getElementById(`fMatUn`).value.trim()||`un`,quantidadeMinima:Number(document.getElementById(`fMatMin`).value)||0,precoUnitario:Number(document.getElementById(`fMatPreco`).value)||0,local:document.getElementById(`fMatLocal`).value.trim(),dataAquisicao:document.getElementById(`fMatData`).value,notas:document.getElementById(`fMatNotas`).value.trim()};if(!a.nome){i(`O nome é obrigatório.`);return}r&&(a.comprado=!1),n?(this.dataStore.atualizar(`materiais`,t,a),i(`Material atualizado!`)):(this.dataStore.adicionar(`materiais`,a),i(`Material adicionado!`)),c(),this.rerenderizar()})}excluirMaterial(e){confirm(`Excluir este material?`)&&(this.dataStore.remover(`materiais`,e),i(`Material excluído.`),this.rerenderizar())}consumirRapido(e){let t=this.dataStore.buscarPorId(`materiais`,e);if(!t)return;let n=this.obras.map(e=>`<option value="${e.id}">${e.titulo||`Sem título`}</option>`).join(``);s(`
      <h3>📉 Consumir: ${t.nome}</h3>
      <form id="formModal">
        <div class="campo-form"><label>Obra</label><select id="fConsObra">${n}</select></div>
        <div class="campo-form"><label>Quantidade (${t.unidade||`un`} — atual: ${t.quantidade})</label><input type="number" id="fConsQtd" value="1" min="0.1" step="0.1"></div>
        <div class="campo-form"><label>Data</label><input type="date" id="fConsData" value="${new Date().toISOString().slice(0,10)}"></div>
        <div class="campo-form"><label>Notas</label><textarea id="fConsNotas" placeholder="Ex.: Camada de fundo"></textarea></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">Consumir</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarModal`).addEventListener(`click`,c),document.getElementById(`formModal`).addEventListener(`submit`,n=>{n.preventDefault();let r=Number(document.getElementById(`fConsQtd`).value)||0;if(r<=0){i(`Quantidade inválida.`);return}let a=Math.max(0,(Number(t.quantidade)||0)-r);this.dataStore.atualizar(`materiais`,e,{quantidade:a}),this.dataStore.adicionar(`consumos`,{materialId:e,obraId:document.getElementById(`fConsObra`).value,quantidade:r,data:document.getElementById(`fConsData`).value,notas:document.getElementById(`fConsNotas`).value.trim()}),c(),i(`${r} ${t.unidade||`un`} consumido(s) de "${t.nome}". Novo estoque: ${a}.`),this.rerenderizar()})}abrirFormConsumo(){let e=this.materiais,t=this.obras;s(`
      <h3>📋 Registrar Consumo</h3>
      <form id="formModal">
        <div class="campo-form"><label>Material</label><select id="fConsMat">${e.map(e=>`<option value="${e.id}">${this.catIcones[e.categoria]||`📦`} ${e.nome} (${e.quantidade} ${e.unidade||`un`})</option>`).join(``)}</select></div>
        <div class="campo-form"><label>Obra</label><select id="fConsObraFull">${t.map(e=>`<option value="${e.id}">${e.titulo||`Sem título`}</option>`).join(``)}</select></div>
        <div class="campo-form"><label>Quantidade</label><input type="number" id="fConsQtdFull" value="1" min="0.1" step="0.1"></div>
        <div class="campo-form"><label>Data</label><input type="date" id="fConsDataFull" value="${new Date().toISOString().slice(0,10)}"></div>
        <div class="campo-form"><label>Notas</label><textarea id="fConsNotasFull" placeholder="Ex.: Camada de fundo"></textarea></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">Registrar</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarModal`).addEventListener(`click`,c),document.getElementById(`formModal`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`fConsMat`).value,n=Number(document.getElementById(`fConsQtdFull`).value)||0;if(n<=0){i(`Quantidade inválida.`);return}let r=this.dataStore.buscarPorId(`materiais`,t);if(r){let e=Math.max(0,(Number(r.quantidade)||0)-n);this.dataStore.atualizar(`materiais`,t,{quantidade:e})}this.dataStore.adicionar(`consumos`,{materialId:t,obraId:document.getElementById(`fConsObraFull`).value,quantidade:n,data:document.getElementById(`fConsDataFull`).value,notas:document.getElementById(`fConsNotasFull`).value.trim()}),c(),i(`Consumo registrado e estoque atualizado!`),this.rerenderizar()})}excluirConsumo(e){confirm(`Excluir este registro de consumo?`)&&(this.dataStore.remover(`consumos`,e),i(`Registro excluído.`),this.rerenderizar())}abrirFormFornecedor(e=null){let t=e?this.dataStore.buscarPorId(`fornecedores`,e):null;s(`
      <h3>${t?`✏️ Editar Fornecedor`:`➕ Novo Fornecedor`}</h3>
      <form id="formModal" style="display:grid;gap:10px;">
        <div class="modal-form-grid">
          <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Nome *</label><input type="text" id="fFornNome" value="${t&&t.nome||``}" required style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Contato</label><input type="text" id="fFornContato" value="${t&&t.contato||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">E-mail</label><input type="email" id="fFornEmail" value="${t&&t.email||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Especialidade</label><input type="text" id="fFornEsp" value="${t&&t.especialidade||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Avaliação (1-5)</label><input type="number" id="fFornAval" value="${t&&t.avaliacao||0}" min="0" max="5" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Notas</label><textarea id="fFornNotas" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;min-height:50px;">${t&&t.notas||``}</textarea></div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarModal`).addEventListener(`click`,c),document.getElementById(`formModal`).addEventListener(`submit`,n=>{n.preventDefault();let r=document.getElementById(`fFornNome`).value.trim();if(!r){i(`O nome é obrigatório.`);return}let a={nome:r,contato:document.getElementById(`fFornContato`).value.trim(),email:document.getElementById(`fFornEmail`).value.trim(),especialidade:document.getElementById(`fFornEsp`).value.trim(),avaliacao:Math.min(5,Math.max(0,Number(document.getElementById(`fFornAval`).value)||0)),notas:document.getElementById(`fFornNotas`).value.trim(),historicoCompras:t&&t.historicoCompras||[]};t?(this.dataStore.atualizar(`fornecedores`,e,a),i(`Fornecedor atualizado!`)):(this.dataStore.adicionar(`fornecedores`,a),i(`Fornecedor adicionado!`)),c(),this.rerenderizar()})}excluirFornecedor(e){confirm(`Excluir este fornecedor?`)&&(this.dataStore.remover(`fornecedores`,e),i(`Fornecedor excluído.`),this.rerenderizar())}gerarListaCompras(){let e=this.materiais,t=0;e.forEach(e=>{let n=Number(e.quantidade)||0,r=Number(e.quantidadeMinima)||0;r>0&&n<=r&&e.comprado===void 0&&(this.dataStore.atualizar(`materiais`,e.id,{comprado:!1}),t++)}),i(`${t} item(ns) adicionado(s) à lista de compras!`),this.rerenderizar()}marcarComprado(e,t){this.dataStore.atualizar(`materiais`,e,{comprado:t}),i(t?`Marcado como comprado!`:`Reaberto na lista.`),this.rerenderizar()}removerDaLista(e){this.dataStore.atualizar(`materiais`,e,{comprado:void 0}),i(`Item removido da lista.`),this.rerenderizar()}exportarListaTXT(){let e=this.materiais.filter(e=>e.comprado===!1);if(e.length===0){i(`Lista vazia.`);return}let t=`=== LISTA DE COMPRAS — ATELIER ===
`;t+=`Gerada em: ${new Date().toLocaleDateString(`pt-BR`)}\n\n`;let r=0;e.forEach(e=>{let i=Math.max(1,Math.ceil((Number(e.quantidadeMinima)||0)*2-(Number(e.quantidade)||0))),a=(Number(e.precoUnitario)||0)*i;r+=a,t+=`□ ${e.nome}\n`,t+=`   Qtd: ${i} ${e.unidade||`un`} | Cat: ${this.catLabels[e.categoria]||e.categoria}${e.marca?` | Marca: `+e.marca:``}\n`,t+=`   Est.: ${n(Math.round(a))}\n\n`}),t+=`=== CUSTO TOTAL ESTIMADO: ${n(Math.round(r))} ===\n`;let a=new Blob([t],{type:`text/plain;charset=utf-8`}),o=URL.createObjectURL(a),s=document.createElement(`a`);s.href=o,s.download=`lista-compras-${new Date().toISOString().slice(0,10)}.txt`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o),i(`Lista exportada em TXT!`)}},fe=class extends D{constructor(e,t){super(e,t),this.tabAtiva=`contatos`,this.filtroCategoria=``,this.filtroEstagio=``,this.catLabels={galerista:`Galerista`,curador:`Curador`,critico:`Critico`,artista:`Artista`,colecionador:`Colecionador`,fornecedor:`Fornecedor`},this.catIcones={galerista:`🏛️`,curador:`📓`,critico:`✍️`,artista:`🎨`,colecionador:`👤`,fornecedor:`🏪`},this.estagios={novo_contato:`🆕 Novo Contato`,primeira_aproximacao:`🤝 Primeira Aproximacao`,em_conversa:`💬 Em Conversa`,parceria_ativa:`🤲 Parceria Ativa`,colaboracao_consolidada:`🌟 Colaboracao Consolidada`},this.estagiosOrdem=Object.keys(this.estagios),this.tiposInteracao={email:`📧 E-mail`,ligacao:`📞 Ligacao`,reuniao:`🤝 Reuniao`,visita:`🏠 Visita`,evento:`🎪 Evento`},this._d3Initiated=!1}get contatos(){return this.dataStore.listar(`contatosProfissionais`)||[]}get interacoes(){return this.dataStore.listar(`interacoes`)||[]}get eventos(){return this.dataStore.listar(`eventos`)||[]}get clientes(){return this.dataStore.listar(`clientes`)||[]}render(){let e=[`contatos`,`pipeline`,`interacoes`,`eventos`,`mapa`],t={contatos:`📋 Contatos`,pipeline:`🔞 Pipeline`,interacoes:`📹 Interacoes`,eventos:`🎪 Eventos`,mapa:`🔺️ Mapa de Influencia`};return`<div><div class="rede-tabs">${e.map(e=>`<button class="tab-btn ${e===this.tabAtiva?`ativo`:``}" data-tab="${e}">${t[e]}</button>`).join(``)}</div><div id="redeContent">${{contatos:()=>this.renderContatos(),pipeline:()=>this.renderPipeline(),interacoes:()=>this.renderInteracoes(),eventos:()=>this.renderEventos(),mapa:()=>this.renderMapa()}[this.tabAtiva]()}</div></div>`}renderContatos(){let e=Object.keys(this.catLabels),t=this.contatos;this.filtroCategoria&&(t=t.filter(e=>e.categoria===this.filtroCategoria)),this.filtroEstagio&&(t=t.filter(e=>e.estagio===this.filtroEstagio));let n=new Date;return`
      <div class="rede-filtros">
        <select id="filtroCatRede"><option value="">📊 Todos os contatos</option>${e.map(e=>`<option value="${e}" ${this.filtroCategoria===e?`selected`:``}>${this.catIcones[e]} ${this.catLabels[e]}</option>`).join(``)}</select>
        <select id="filtroEstagioRede"><option value="">🔞 Todos os estagios</option>${this.estagiosOrdem.map(e=>`<option value="${e}" ${this.filtroEstagio===e?`selected`:``}>${this.estagios[e]}</option>`).join(``)}</select>
        <button class="btn-primario" id="btnNovoContato" style="font-size:0.8rem;padding:6px 14px;">✨ Novo Contato</button>
        <span style="font-size:0.8rem;color:var(--text-muted);margin-left:auto;">${t.length} contato(s)</span>
      </div>
      <div class="cont-grid">${t.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum contato encontrado.</p>`:``}${t.map(e=>this.renderCardContato(e,n)).join(``)}</div>`}renderCardContato(e,t){let n=e.categoria||`outros`,r=e.ultimoContato?Math.floor((t-new Date(e.ultimoContato))/864e5):null,i=r!==null&&r>30?r>90?`urgente`:`follow-up`:null,a=r!==null&&r>30?`⚠️ ${r} dias sem contato`:``;return`
      <div class="cont-card" style="border-left-color:var(--accent)">
        ${e.vip?`<span class="cont-vip">👑 VIP</span>`:``}
        <div class="cont-nome">${this.catIcones[n]||`📋`} ${e.nome||``}</div>
        <span class="cont-cat-tag ${n}">${this.catLabels[n]||n}</span>
        ${e.nivelRelacionamento?`<span class="cont-estrelas" style="margin-left:6px;">${`★`.repeat(Math.min(5,Number(e.nivelRelacionamento)))}${`☆`.repeat(Math.max(0,5-Number(e.nivelRelacionamento)))}</span>`:``}
        <div class="cont-inst">${e.instituicao||``}${e.cargo?` · `+e.cargo:``}</div>
        <div class="cont-contato">${e.contato||``}${e.email?` · `+e.email:``}${e.redes?`<br>🖐 `+e.redes:``}</div>
        ${e.comoConheceu?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">🤝 ${e.comoConheceu}</div>`:``}
        ${e.notas?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📝 ${e.notas}</div>`:``}
        ${e.estagio?`<div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">${this.estagios[e.estagio]||e.estagio}</div>`:``}
        ${i?`<div class="cont-alerta ${i}">${a}</div>`:``}
        ${e.proximoPasso?`<div class="cont-passos">🎯 ${e.proximoPasso}</div>`:``}
        <div class="cont-acoes"><button data-acao="editarContato" data-id="${e.id}">✏️ Editar</button><button data-acao="interagirContato" data-id="${e.id}">💬 Interagir</button><button data-acao="excluirContato" data-id="${e.id}" style="color:#dc2626;">🗑️</button></div>
      </div>`}renderPipeline(){let e=this.contatos,t=new Date,n={};return this.estagiosOrdem.forEach(t=>{n[t]=e.filter(e=>e.estagio===t)}),`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span style="font-size:0.9rem;color:var(--text-muted);">Arraste os cards entre os estagios (use os botoes ◀ ▶)</span><span style="font-size:0.8rem;color:var(--text-muted);">${e.length} contato(s)</span></div>
      <div class="pipeline">${this.estagiosOrdem.map(e=>`
        <div class="coluna-pipe" data-estagio="${e}">
          <div class="pipe-titulo"><span>${this.estagios[e]}</span><span>${n[e]?.length||0}</span></div>
          ${(n[e]||[]).map(e=>{let n=e.ultimoContato?Math.floor((t-new Date(e.ultimoContato))/864e5):null;return`<div class="pipe-card" data-id="${e.id}">
              <div class="pipe-nome">${this.catIcones[e.categoria]||`📋`} ${e.nome}</div>
              <div class="pipe-cat">${this.catLabels[e.categoria]||e.categoria}</div>
              ${n===null?``:`<div class="pipe-dias">${n>30?`⚠️ `+n+` dias`:`✅ `+n+` dias`}</div>`}
              <div style="display:flex;gap:4px;margin-top:6px;">
                <button data-acao="pipeMovEsq" data-id="${e.id}" style="font-size:0.7rem;padding:2px 6px;border:1px solid var(--border);background:var(--bg);cursor:pointer;">◀</button>
                <button data-acao="pipeMovDir" data-id="${e.id}" style="font-size:0.7rem;padding:2px 6px;border:1px solid var(--border);background:var(--bg);cursor:pointer;">▶</button>
              </div>
            </div>`}).join(``)}
        </div>`).join(``)}</div>`}moverPipeline(e,t){let n=this.dataStore.buscarPorId(`contatosProfissionais`,e);if(!n)return;let r=this.estagiosOrdem.indexOf(n.estagio||`novo_contato`),i=Math.max(0,Math.min(this.estagiosOrdem.length-1,r+t));i!==r&&(this.dataStore.atualizar(`contatosProfissionais`,e,{estagio:this.estagiosOrdem[i]}),this.rerenderizar())}renderInteracoes(){let e=this.contatos;this.interacoes;let t=this._selContatoInteracao||``;return`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <select class="sel-interacao-contato" id="selInteracaoContato">
          <option value="">— Todos os contatos —</option>
          ${e.map(e=>`<option value="${e.id}" ${t===e.id?`selected`:``}>${this.catIcones[e.categoria]||`📋`} ${e.nome}</option>`).join(``)}
        </select>
        <button class="btn-primario" id="btnNovaInteracao" style="font-size:0.8rem;padding:6px 14px;">✨ Nova Interacao</button>
      </div>
      ${t?this.renderTimelineContato(t):`<p style="color:var(--text-muted);font-size:0.85rem;">Selecione um contato para ver o historico de interacoes.</p>`}`}renderTimelineContato(e){let t=this.dataStore.buscarPorId(`contatosProfissionais`,e),n=this.interacoes.filter(t=>t.contatoId===e).sort((e,t)=>new Date(t.data||0)-new Date(e.data||0));return t?`
      <div style="margin-bottom:12px;font-size:0.9rem;font-weight:600;color:var(--text);">${this.catIcones[t.categoria]||`📋`} ${t.nome} — ${n.length} interacao(oes)</div>
      ${n.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhuma interacao registrada.</p>`:`
      <div class="timeline">${n.map(e=>`
        <div class="tl-item">
          <div class="tl-tipo">${this.tiposInteracao[e.tipo]||e.tipo} · ${e.data||``}</div>
          <div class="tl-resumo">${e.resumo||``}</div>
          ${e.sentimento?`<span class="tl-sentimento ${e.sentimento}">${e.sentimento===`positivo`?`😊`:e.sentimento===`neutro`?`😐`:`😟`} ${e.sentimento}</span>`:``}
          ${e.followUp?`<span style="font-size:0.7rem;color:#92400e;margin-left:6px;">🔝 Follow-up: ${e.followUpNotas||`pendente`}</span>`:``}
          <div class="tl-data">${e.anexos&&e.anexos.length>0?`📎 `+e.anexos.length+` anexo(s)`:``}</div>
        </div>`).join(``)}</div>`}`:`<p style="color:var(--text-muted);">Contato nao encontrado.</p>`}renderEventos(){let e=this.eventos,t={pesquisando:`🔍 Pesquisando`,inscrito:`📝 Inscrito`,selecionado:`✅ Selecionado`,participando:`🎯 Participando`,finalizado:`🏁 Finalizado`},n={bienal:`Bienal`,feira:`Feira`,mostra:`Mostra`,edital:`Edital`,premio:`Premio`};return`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <button class="btn-primario" id="btnNovoEvento" style="font-size:0.8rem;padding:6px 14px;">✨ Novo Evento</button>
        <span style="font-size:0.8rem;color:var(--text-muted);">${e.length} evento(s)</span>
      </div>
      <div class="evt-grid">${e.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum evento cadastrado.</p>`:``}${e.map(e=>{let r=(e.obrasEnviadas||[]).map(e=>{let t=this.dataStore.buscarPorId(`obras`,e);return t?t.titulo:null}).filter(Boolean);return`<div class="evt-card">
          <span class="evt-tipo-tag ${e.tipo||`mostra`}">${n[e.tipo]||e.tipo}</span>
          <div class="evt-nome" style="margin-top:4px;">${e.nome}</div>
          <div class="evt-status ${e.status||`pesquisando`}">${t[e.status]||e.status}</div>
          <div class="evt-info">${e.dataEvento?`📅 `+e.dataEvento:``}${e.dataInscricao?` · Inscricao: `+e.dataInscricao:``}${e.investimento?`<br>💰 R$ `+Number(e.investimento).toFixed(2):``}${e.retorno&&Number(e.retorno)>0?` · Retorno: R$ `+Number(e.retorno).toFixed(2):``}</div>
          ${e.notas?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📝 ${e.notas}</div>`:``}
          ${r.length>0?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">🖼️ Obras: ${r.join(`, `)}</div>`:``}
          ${e.documentacao&&e.documentacion.length>0?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📞 Docs: ${e.documentacao.join(`, `)}</div>`:``}
          ${e.resultado?`<div style="font-size:0.8rem;color:var(--text);margin-top:6px;">🏆 ${e.resultado}</div>`:``}
          <div class="evt-acoes"><button data-acao="editarEvento" data-id="${e.id}">✏️ Editar</button><button data-acao="excluirEvento" data-id="${e.id}" style="color:#dc2626;">🗑️</button></div>
        </div>`}).join(``)}</div>`}renderMapa(){return this.contatos.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Adicione contatos para ver o mapa.</p>`:`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-size:0.85rem;color:var(--text-muted);">Tamanho = nivel de relacionamento · Cores por categoria · Arraste nos</span>
        <button class="btn-primario" id="btnExportarRedePDF" style="font-size:0.8rem;padding:6px 14px;">📞 Exportar Relatorio PDF</button>
      </div>
      <div class="mapa-container" id="d3MapaContainer">
        <svg id="d3MapaSVG"></svg>
      </div>
      <div id="d3MapaHubs" style="margin-top:12px;font-size:0.85rem;color:var(--text-muted);">💡 Processando rede...</div>`}aposRenderizar(){this.removerListeners(),document.querySelectorAll(`.tab-btn[data-tab]`).forEach(e=>{let t=()=>{this.tabAtiva=e.dataset.tab,this.rerenderizar()};e.addEventListener(`click`,t),this._bindCache[`tab_`+e.dataset.tab]={el:e,handler:t,type:`click`}});let e=document.getElementById(`filtroCatRede`);if(e){let t=()=>{this.filtroCategoria=e.value,this.rerenderizar()};e.addEventListener(`change`,t),this._bindCache.filtroCatRede={el:e,handler:t,type:`change`}}let t=document.getElementById(`filtroEstagioRede`);if(t){let e=()=>{this.filtroEstagio=t.value,this.rerenderizar()};t.addEventListener(`change`,e),this._bindCache.filtroEstagioRede={el:t,handler:e,type:`change`}}document.getElementById(`btnNovoContato`)?.addEventListener(`click`,()=>this.abrirFormContato()),document.getElementById(`btnNovaInteracao`)?.addEventListener(`click`,()=>this.abrirFormInteracao()),document.getElementById(`btnNovoEvento`)?.addEventListener(`click`,()=>this.abrirFormEvento());let n=document.getElementById(`selInteracaoContato`);if(n){let e=()=>{this._selContatoInteracao=n.value,this.rerenderizar()};n.addEventListener(`change`,e),this._bindCache.selInteracaoContato={el:n,handler:e,type:`change`}}document.getElementById(`btnExportarRedePDF`)?.addEventListener(`click`,()=>this.exportarRelatorioPDF());let r=document.getElementById(`redeContent`)||document.getElementById(`viewPrincipal`);if(r){let e=e=>{let t=e.target.closest(`[data-acao]`);if(!t)return;let n=t.dataset.acao,r=t.dataset.id;n===`editarContato`?this.abrirFormContato(r):n===`excluirContato`?this.excluirContato(r):n===`interagirContato`?(this._selContatoInteracao=r,this.tabAtiva=`interacoes`,this.rerenderizar(),setTimeout(()=>this.abrirFormInteracao(r),100)):n===`pipeMovEsq`?this.moverPipeline(r,-1):n===`pipeMovDir`?this.moverPipeline(r,1):n===`editarEvento`?this.abrirFormEvento(r):n===`excluirEvento`&&this.excluirEvento(r)};r.addEventListener(`click`,e),this._bindCache.delegatedRede={el:r,handler:e,type:`click`}}this.tabAtiva===`mapa`&&this.contatos.length>0&&setTimeout(()=>this.iniciarMapaD3(),50),this.verificarLembretes()}iniciarMapaD3(){if(typeof d3>`u`)return;let e=document.getElementById(`d3MapaContainer`),t=document.getElementById(`d3MapaSVG`),n=document.getElementById(`d3MapaHubs`);if(!e||!t)return;let r=this.contatos,i={galerista:`#3b82f6`,curador:`#10b981`,critico:`#f59e0b`,artista:`#6366f1`,colecionador:`#ec4899`,fornecedor:`#0ea5e9`},a=r.map(e=>({...e,r:10+(e.nivelRelacionamento||1)/5*25})),o=[];for(let e=0;e<a.length;e++)for(let t=e+1;t<a.length;t++){let n=a[e],r=a[t];n.instituicao&&r.instituicao&&n.instituicao===r.instituicao?o.push({source:e,target:t,strength:.3}):n.comoConheceu&&r.comoConheceu&&(n.comoConheceu.toLowerCase().includes((r.nome||``).toLowerCase().slice(0,5))||r.comoConheceu.toLowerCase().includes((n.nome||``).toLowerCase().slice(0,5)))&&o.push({source:e,target:t,strength:.2})}let s=e.clientWidth||700,c=e.clientHeight||400,l=d3.select(t).attr(`viewBox`,`0 0 ${s} ${c}`).style(`width`,`100%`).style(`height`,`100%`);l.selectAll(`*`).remove();let u=l.append(`g`),d=d3.zoom().scaleExtent([.3,3]).on(`zoom`,e=>{u.attr(`transform`,e.transform)});l.call(d);let f=d3.forceSimulation(a).force(`link`,d3.forceLink(o).id((e,t)=>t).distance(100)).force(`charge`,d3.forceManyBody().strength(-300)).force(`center`,d3.forceCenter(s/2,c/2)).force(`collide`,d3.forceCollide().radius(e=>e.r+10)),p=u.append(`g`).selectAll(`line`).data(o).join(`line`).attr(`stroke`,`var(--border)`).attr(`stroke-width`,1.5).attr(`stroke-dasharray`,`4,4`),m=u.append(`g`).selectAll(`g`).data(a).join(`g`).call(d3.drag().on(`start`,(e,t)=>{e.active||f.alphaTarget(.3).restart(),t.fx=t.x,t.fy=t.y}).on(`drag`,(e,t)=>{t.fx=e.x,t.fy=e.y}).on(`end`,(e,t)=>{e.active||f.alphaTarget(0),t.fx=null,t.fy=null}));m.append(`circle`).attr(`r`,e=>e.r).attr(`fill`,e=>i[e.categoria]||`#6b7280`).attr(`opacity`,.8).attr(`stroke`,`#fff`).attr(`stroke-width`,2).style(`cursor`,`pointer`),m.append(`text`).text(e=>(e.nome||`?`).slice(0,2)).attr(`text-anchor`,`middle`).attr(`dy`,`0.35em`).attr(`fill`,`#fff`).attr(`font-size`,e=>e.r>20?9:6).attr(`font-weight`,`600`).style(`pointer-events`,`none`),m.append(`text`).text(e=>(e.nome||``).length>18?(e.nome||``).slice(0,16)+`...`:e.nome||``).attr(`text-anchor`,`middle`).attr(`dy`,e=>e.r+14).attr(`fill`,`var(--text-muted)`).attr(`font-size`,9).style(`pointer-events`,`none`),m.on(`click`,(e,t)=>{t.id&&(this._selContatoInteracao=t.id,this.tabAtiva=`interacoes`,this.rerenderizar())}),m.append(`title`).text(e=>`${e.nome||`Sem nome`}\n${this.catLabels[e.categoria]||e.categoria||``}${e.instituicao?`
`+e.instituicao:``}${e.nivelRelacionamento?`
Relacionamento: `+`★`.repeat(e.nivelRelacionamento):``}`),f.on(`tick`,()=>{p.attr(`x1`,e=>e.source.x).attr(`y1`,e=>e.source.y).attr(`x2`,e=>e.target.x).attr(`y2`,e=>e.target.y),m.attr(`transform`,e=>`translate(${e.x},${e.y})`)}),setTimeout(()=>{let e={};o.forEach(t=>{let n=typeof t.source==`object`?t.source.id||t.source.nome:null,r=typeof t.target==`object`?t.target.id||t.target.nome:null;n&&(e[n]=(e[n]||0)+1),r&&(e[r]=(e[r]||0)+1)});let t=a.filter(t=>e[t.id||t.nome]>0).sort((t,n)=>(e[n.id||n.nome]||0)-(e[t.id||t.nome]||0)).slice(0,3).map(e=>`<strong>${e.nome}</strong>`).join(`, `);n&&(n.innerHTML=t?`💡 Contatos que mais conectam (hubs): ${t}`:`💡 Nenhum hub identificado.`)},2e3)}abrirFormContato(e=null){let t=e?this.dataStore.buscarPorId(`contatosProfissionais`,e):null,n=Object.keys(this.catLabels).map(e=>`<option value="${e}" ${t&&t.categoria===e?`selected`:``}>${this.catIcones[e]} ${this.catLabels[e]}</option>`).join(``),r=this.estagiosOrdem.map(e=>`<option value="${e}" ${t&&t.estagio===e?`selected`:``}>${this.estagios[e]}</option>`).join(``);s(`<h3>${t?`✏️ Editar`:`✨ Novo`} Contato Profissional</h3>
      <form id="formModal" style="display:grid;gap:10px;"><div class="modal-form-grid">
        <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Nome *</label><input type="text" id="fContNome" value="${t&&t.nome||``}" required style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Categoria</label><select id="fContCat" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;">${n}</select></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Estagio</label><select id="fContEstagio" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;">${r}</select></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Instituicao</label><input type="text" id="fContInst" value="${t&&t.instituicao||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Cargo</label><input type="text" id="fContCargo" value="${t&&t.cargo||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Contato</label><input type="text" id="fContTel" value="${t&&t.contato||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">E-mail</label><input type="email" id="fContEmail" value="${t&&t.email||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Redes sociais</label><input type="text" id="fContRedes" value="${t&&t.redes||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Relacionamento (1-5)</label><input type="number" id="fContNivel" value="${t&&t.nivelRelacionamento||0}" min="1" max="5" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Como conheceu</label><input type="text" id="fContConheceu" value="${t&&t.comoConheceu||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Ultimo contato</label><input type="date" id="fContUltimo" value="${t&&t.ultimoContato||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Proximo passo</label><input type="text" id="fContPasso" value="${t&&t.proximoPasso||``}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div class="campo-full"><label><input type="checkbox" id="fContVip" ${t&&t.vip?`checked`:``}> 👑 Contato VIP (colecionador)</label></div>
        <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Notas</label><textarea id="fContNotas" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;min-height:50px;">${t&&t.notas||``}</textarea></div>
      </div><div class="modal-acoes"><button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button><button type="submit" class="btn-primario">Salvar</button></div></form>`),document.getElementById(`btnCancelarModal`).addEventListener(`click`,c),document.getElementById(`formModal`).addEventListener(`submit`,n=>{n.preventDefault();let r=document.getElementById(`fContNome`).value.trim();if(!r){i(`Nome obrigatorio.`);return}let a={nome:r,categoria:document.getElementById(`fContCat`).value,estagio:document.getElementById(`fContEstagio`).value,instituicao:document.getElementById(`fContInst`).value.trim(),cargo:document.getElementById(`fContCargo`).value.trim(),contato:document.getElementById(`fContTel`).value.trim(),email:document.getElementById(`fContEmail`).value.trim(),redes:document.getElementById(`fContRedes`).value.trim(),nivelRelacionamento:Number(document.getElementById(`fContNivel`).value)||0,comoConheceu:document.getElementById(`fContConheceu`).value.trim(),ultimoContato:document.getElementById(`fContUltimo`).value,proximoPasso:document.getElementById(`fContPasso`).value.trim(),vip:document.getElementById(`fContVip`).checked,notas:document.getElementById(`fContNotas`).value.trim()};t?(this.dataStore.atualizar(`contatosProfissionais`,e,a),i(`Contato atualizado!`)):(this.dataStore.adicionar(`contatosProfissionais`,a),i(`Contato adicionado!`)),c(),this.rerenderizar()})}excluirContato(e){confirm(`Excluir este contato?`)&&(this.dataStore.remover(`contatosProfissionais`,e),i(`Contato excluido.`),this.rerenderizar())}abrirFormInteracao(e=null){let t=this.contatos,n=e||this._selContatoInteracao||``,r=Object.entries(this.tiposInteracao).map(([e,t])=>`<option value="${e}">${t}</option>`).join(``);s(`<h3>✨ Nova Interacao</h3>
      <form id="formModal"><div class="campo-form"><label>Contato</label><select id="fIntContato">${t.map(e=>`<option value="${e.id}" ${e.id===n?`selected`:``}>${this.catIcones[e.categoria]||`📋`} ${e.nome}</option>`).join(``)}</select></div>
      <div class="campo-form"><label>Tipo</label><select id="fIntTipo">${r}</select></div>
      <div class="campo-form"><label>Data</label><input type="date" id="fIntData" value="${new Date().toISOString().slice(0,10)}"></div>
      <div class="campo-form"><label>Resumo</label><textarea id="fIntResumo" placeholder="Descreva a interacao..."></textarea></div>
      <div class="campo-form"><label>Sentimento</label><select id="fIntSentimento"><option value="positivo">😊 Positivo</option><option value="neutro">😐 Neutro</option><option value="negativo">😟 Negativo</option></select></div>
      <div class="campo-form"><label><input type="checkbox" id="fIntFollowUp"> 🔝 Necessita follow-up</label></div>
      <div class="campo-form" id="divFollowUpNotas" style="display:none;"><label>Notas do follow-up</label><textarea id="fIntFollowNotas" placeholder="O que fazer?"></textarea></div>
      <div class="modal-acoes"><button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button><button type="submit" class="btn-primario">Salvar</button></div></form>`),document.getElementById(`fIntFollowUp`)?.addEventListener(`change`,()=>{document.getElementById(`divFollowUpNotas`).style.display=document.getElementById(`fIntFollowUp`).checked?`block`:`none`}),document.getElementById(`btnCancelarModal`).addEventListener(`click`,c),document.getElementById(`formModal`).addEventListener(`submit`,e=>{e.preventDefault(),this.dataStore.adicionar(`interacoes`,{contatoId:document.getElementById(`fIntContato`).value,tipo:document.getElementById(`fIntTipo`).value,data:document.getElementById(`fIntData`).value,resumo:document.getElementById(`fIntResumo`).value.trim(),sentimento:document.getElementById(`fIntSentimento`).value,followUp:document.getElementById(`fIntFollowUp`).checked,followUpNotas:document.getElementById(`fIntFollowNotas`).value.trim(),anexos:[]}),this.dataStore.atualizar(`contatosProfissionais`,document.getElementById(`fIntContato`).value,{ultimoContato:document.getElementById(`fIntData`).value}),c(),i(`Interacao registrada!`),this.rerenderizar(),this.solicitarNotificacao(`Interacao registrada`,`Nao se esqueca do follow-up!`)})}abrirFormEvento(e=null){let t=e?this.dataStore.buscarPorId(`eventos`,e):null,n=[`pesquisando`,`inscrito`,`selecionado`,`participando`,`finalizado`].map(e=>`<option value="${e}" ${t&&t.status===e?`selected`:``}>${e}</option>`).join(``),r=[`bienal`,`feira`,`mostra`,`edital`,`premio`].map(e=>`<option value="${e}" ${t&&t.tipo===e?`selected`:``}>${e}</option>`).join(``),a=(this.obras||this.dataStore.listar(`obras`)||[]).map(e=>`<option value="${e.id}">${e.titulo||`Sem titulo`}</option>`).join(``);s(`<h3>${t?`✏️ Editar`:`✨ Novo`} Evento</h3>
      <form id="formModal"><div class="modal-form-grid">
        <div class="campo-full"><input type="text" id="fEvtNome" value="${t&&t.nome||``}" required placeholder="Nome do evento" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><select id="fEvtTipo">${r}</select></div>
        <div><select id="fEvtStatus">${n}</select></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Inscricao</label><input type="date" id="fEvtDataIns" value="${t&&t.dataInscricao||``}" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Evento</label><input type="date" id="fEvtDataEvt" value="${t&&t.dataEvento||``}" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Investimento (R$)</label><input type="number" id="fEvtInvest" value="${t&&t.investimento||0}" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Retorno (R$)</label><input type="number" id="fEvtRetorno" value="${t&&t.retorno||0}" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Resultado</label><input type="text" id="fEvtResultado" value="${t&&t.resultado||``}" placeholder="Ex.: Premiado, selecionado..." style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Documentacao</label><input type="text" id="fEvtDocs" value="${t&&t.documentacao?t.documentacao.join(`, `):``}" placeholder="docs separados por virgula" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Obras enviadas</label><select multiple id="fEvtObras" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;min-height:60px;">${a}</select></div>
        <div class="campo-full"><textarea id="fEvtNotas" placeholder="Notas..." style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;min-height:50px;">${t&&t.notas||``}</textarea></div>
      </div><div class="modal-acoes"><button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button><button type="submit" class="btn-primario">Salvar</button></div></form>`),document.getElementById(`btnCancelarModal`).addEventListener(`click`,c),document.getElementById(`formModal`).addEventListener(`submit`,n=>{n.preventDefault();let r=document.getElementById(`fEvtObras`),a=r?Array.from(r.selectedOptions).map(e=>e.value):[],o=document.getElementById(`fEvtDocs`).value.split(`,`).map(e=>e.trim()).filter(Boolean),s={nome:document.getElementById(`fEvtNome`).value.trim(),tipo:document.getElementById(`fEvtTipo`).value,status:document.getElementById(`fEvtStatus`).value,dataInscricao:document.getElementById(`fEvtDataIns`).value,dataEvento:document.getElementById(`fEvtDataEvt`).value,investimento:Number(document.getElementById(`fEvtInvest`).value)||0,retorno:Number(document.getElementById(`fEvtRetorno`).value)||0,resultado:document.getElementById(`fEvtResultado`).value.trim(),documentacao:o,obrasEnviadas:a,notas:document.getElementById(`fEvtNotas`).value.trim()};if(!s.nome){i(`Nome obrigatorio.`);return}t?(this.dataStore.atualizar(`eventos`,e,s),i(`Evento atualizado!`)):(this.dataStore.adicionar(`eventos`,s),i(`Evento adicionado!`)),c(),this.rerenderizar()})}excluirEvento(e){confirm(`Excluir este evento?`)&&(this.dataStore.remover(`eventos`,e),i(`Evento excluido.`),this.rerenderizar())}verificarLembretes(){let e=new Date,t=this.contatos,n=[];t.forEach(t=>{if(!t.ultimoContato)return;let r=Math.floor((e-new Date(t.ultimoContato))/864e5);r>60&&n.push({nome:t.nome,dias:r,passo:t.proximoPasso||`revisar relacionamento`})}),n.length>0&&`Notification`in window&&Notification.permission===`granted`&&n.slice(0,3).forEach(e=>{try{new Notification(`🔝 Rede Profissional`,{body:`Voce nao contata ${e.nome} ha ${e.dias} dias. Sugestao: ${e.passo}`})}catch{}})}solicitarNotificacao(e,t){if(!(!(`Notification`in window)||Notification.permission===`denied`))if(Notification.permission===`granted`)try{new Notification(e,{body:t})}catch{}else Notification.requestPermission()}exportarRelatorioPDF(){if(window.jspdf===void 0&&typeof jspdf>`u`||!window.jspdf?.jsPDF){i(`jsPDF nao carregado.`);return}a(`Gerando relatorio de networking...`);let{jsPDF:e}=window.jspdf,t=new e({orientation:`portrait`,unit:`mm`,format:`a4`}),n=this.contatos,r=this.eventos,s=20;t.setFont(`helvetica`,`bold`),t.setFontSize(14),t.text(`Relatorio de Networking`,20,s),s+=7,t.setFont(`helvetica`,`normal`),t.setFontSize(9),t.text(`Gerado em: ${new Date().toLocaleDateString(`pt-BR`)}`,20,s),s+=5,t.setDrawColor(200),t.line(20,s,190,s),s+=7,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Contatos (`+n.length+`)`,20,s),s+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(8),n.forEach(e=>{s>270&&(t.addPage(),s=20),t.text(`${e.nome||``} — ${e.instituicao||``} (${e.categoria||``}) ${e.nivelRelacionamento?`★`.repeat(e.nivelRelacionamento):``}`,20,s),s+=4,e.proximoPasso&&(t.text(`  → Proximo passo: ${e.proximoPasso}`,24,s),s+=4)}),s+=5,t.setDrawColor(200),t.line(20,s,190,s),s+=7,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Eventos (`+r.length+`)`,20,s),s+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(8),r.forEach(e=>{s>270&&(t.addPage(),s=20),t.text(`${e.nome||``} — ${e.tipo||``} (${e.status||``}) ${e.dataEvento?`· `+e.dataEvento:``}`,20,s),s+=4}),t.save(`relatorio-networking.pdf`),o(),i(`Relatorio exportado em PDF!`)}},O=class extends D{constructor(e,t){super(e,t),this.tabAtiva=`entradas`,this.calData=new Date,this.calVisao=`mensal`,this._filtroObraProc=``,this._entradaEditando=null,this._fotosTemporarias=[],this._selHumor=0,this.humorEmojis={1:`😫`,2:`😕`,3:`😐`,4:`🙂`,5:`🤩`},this.humorLabels={1:`Terrível`,2:`Difícil`,3:`Neutro`,4:`Bom`,5:`Excelente`},this.tipoAtividade={pintura:`#3b82f6`,escultura:`#8b5cf6`,admin:`#f59e0b`,descanso:`#10b981`},this.etapasPadrao=[`Sketch inicial`,`Estudo de cor`,`Primeira camada`,`Camadas intermediárias`,`Detalhamento`,`Finalização`,`Verniz`],this.citacoes=[{texto:`A arte é a mentira que nos permite conhecer a verdade.`,autor:`Pablo Picasso`},{texto:`Não há nada mais artístico do que amar as pessoas.`,autor:`Vincent van Gogh`},{texto:`A criatividade é a inteligência se divertindo.`,autor:`Albert Einstein`},{texto:`A pintura é poesia silenciosa.`,autor:`Plutarco`},{texto:`A arte lava da alma a poeira do cotidiano.`,autor:`Pablo Picasso`},{texto:`Eu sonho minha pintura e pinto meu sonho.`,autor:`Vincent van Gogh`},{texto:`A cor é o teclado, os olhos são os martelos, a alma é o piano com muitas cordas.`,autor:`Wassily Kandinsky`},{texto:`O artista não é nada sem o dom, mas o dom não é nada sem o trabalho.`,autor:`Émile Zola`},{texto:`A arte não reproduz o visível, ela torna visível.`,autor:`Paul Klee`},{texto:`Comece onde você está. Use o que você tem. Faça o que você pode.`,autor:`Arthur Ashe`},{texto:`A perfeição não é quando não há mais nada a acrescentar, mas quando não há mais nada a retirar.`,autor:`Antoine de Saint-Exupéry`},{texto:`A arte é a expressão dos mais profundos pensamentos pelo caminho mais simples.`,autor:`Albert Einstein`},{texto:`Toda criança é artista. O problema é como permanecer artista depois de crescer.`,autor:`Pablo Picasso`},{texto:`A criatividade é contaminante. Passe adiante.`,autor:`Albert Einstein`},{texto:`A simplicidade é o último grau da sofisticação.`,autor:`Leonardo da Vinci`},{texto:`A arte deve confortar os perturbados e perturbar os confortáveis.`,autor:`Banksy`},{texto:`O propósito da arte é lavar a poeira da vida cotidiana de nossas almas.`,autor:`Pablo Picasso`},{texto:`A inspiração existe, mas precisa te encontrar trabalhando.`,autor:`Pablo Picasso`},{texto:`Grandes coisas são feitas por uma série de pequenas coisas reunidas.`,autor:`Vincent van Gogh`},{texto:`A arte não é um artesanato, é a transmissão de uma emoção que o artista experimentou.`,autor:`Leonardo da Vinci`},{texto:`Pinte como se você nunca tivesse medo de errar.`,autor:`Bob Ross`},{texto:`Não há erro na arte, apenas oportunidades.`,autor:`Bob Ross`},{texto:`A arte é a assinatura da civilização.`,autor:`Beverly Sills`},{texto:`O mundo real é apenas um, mas a arte pode criar muitos mundos.`,autor:`Frida Kahlo`},{texto:`Pinto autorretratos porque estou sempre disponível.`,autor:`Frida Kahlo`},{texto:`A arte é a mais bela das mentiras.`,autor:`Claude Debussy`},{texto:`Nuances, nuances, sempre nuances!`,autor:`Eugène Delacroix`},{texto:`O olhar do pintor só se completa no olhar do espectador.`,autor:`Marcel Duchamp`},{texto:`A forma segue a intuição.`,autor:`Joan Miró`},{texto:`Não pinte o que vê, pinte o que sente.`,autor:`Henri Matisse`},{texto:`A cor é um poder que influencia diretamente a alma.`,autor:`Wassily Kandinsky`},{texto:`A arte não é o que você vê, mas o que você faz os outros verem.`,autor:`Edgar Degas`},{texto:`Primeiro aprenda as regras como um profissional, depois quebre-as como um artista.`,autor:`Pablo Picasso`},{texto:`A luz não está na tela, está no olho de quem vê.`,autor:`Claude Monet`},{texto:`O importante é a emoção, não a técnica.`,autor:`Vincent van Gogh`},{texto:`Eu procuro nas cores uma vibração que não precise de explicação.`,autor:`Paul Cézanne`},{texto:`O desenho é a honestidade da arte.`,autor:`Jean-Auguste-Dominique Ingres`},{texto:`A arte é feita para incomodar. A ciência para tranquilizar.`,autor:`Georges Braque`},{texto:`A única tradição verdadeira é a da inovação.`,autor:`Piet Mondrian`},{texto:`Menos é mais.`,autor:`Ludwig Mies van der Rohe`},{texto:`A arte é o prazer de um espírito que penetra na natureza.`,autor:`Auguste Renoir`},{texto:`O segredo da arte é o amor.`,autor:`Camille Pissarro`},{texto:`Sem emoção, não há arte.`,autor:`Wassily Kandinsky`},{texto:`A arte é uma mentira que nos faz perceber a verdade.`,autor:`Pablo Picasso`},{texto:`O importante é fazer da arte um ato de amor.`,autor:`Frida Kahlo`},{texto:`Pinte a luz, não a coisa.`,autor:`Claude Monet`},{texto:`A arte é a mais intensa forma de individualismo que o mundo conhece.`,autor:`Oscar Wilde`},{texto:`O talento é a capacidade de fazer um esforço que vale a pena.`,autor:`Francisco de Goya`},{texto:`As cores são as ação da luz, ação e paixões.`,autor:`Johann Wolfgang von Goethe`},{texto:`O olho é a janela da alma e o pincel é a sua voz.`,autor:`Leonardo da Vinci`}],this.promptsDiarios=[`Experimente uma paleta restrita de apenas 3 cores hoje.`,`Desenhe algo que você ama usando apenas a mão não-dominante.`,`Pinte o mesmo objeto em 3 humores diferentes.`,`Crie uma textura usando materiais não convencionais (café, areia, tecido).`,`Faça um estudo de luz com apenas preto e branco.`,`Pegue uma obra inacabada e finalize em 30 minutos.`,`Crie um gradiente de 10 tons entre duas cores complementares.`,`Desenhe de memória um lugar que você visitou há muito tempo.`,`Use uma espátula em vez de pincel o dia todo.`,`Pinte ao ar livre por pelo menos 1 hora.`,`Escolha uma cor que você evita e crie algo só com ela.`,`Faça 10 miniaturas de composição antes de começar a obra do dia.`,`Releia um esboço antigo e dê uma nova versão.`,`Misture técnica: use aquarela com toques de óleo.`,`Observe uma sombra por 5 minutos e pinte apenas ela.`,`Crie uma paleta inspirada em uma fotografia que você ama.`,`Trabalhe apenas com tons pastéis hoje.`,`Desafio monocromático: pinte usando um único pigmento.`,`Faça um autorretrato emocional (como você se sente agora).`,`Use uma paleta de cores que você nunca usou antes.`,`Pinte uma memória de infância em 20 minutos.`,`Copie um mestre para aprender sua técnica de pincelada.`,`Crie uma série de 3 obras que contem uma história.`,`Pinte com os olhos fechados e veja o que surge.`,`Use um pincel diferente do habitual para cada etapa.`,`Adicione douramento ou folha de ouro a uma obra existente.`,`Crie um estudo de mãos hoje.`,`Faça uma pintura gestual em menos de 10 minutos.`,`Transforme um erro em destaque criativo intencional.`,`Pinte o mesmo tema em dois estilos completamente diferentes.`],this.desafiosSemanais=[`Série relâmpago: 7 pinturas em 7 dias sobre o mesmo tema.`,`Semana do preto e branco: apenas tons neutros por 7 dias.`,`Desafio da transparência: explore camadas e sobreposição.`,`Semana do retrato: estude rostos de 7 pessoas diferentes.`,`Desafio do movimento: capture algo em movimento a cada dia.`,`Semana macro: pinte detalhes ampliados de objetos pequenos.`,`Desafio da cor complementar: cada dia um par de complementares.`,`Semana de arte colaborativa: convide outro artista para trocar telas.`]}get entradas(){return this.dataStore.listar(`entradasDiario`)||[]}get processos(){return this.dataStore.listar(`etapasProcesso`)||[]}get obras(){return this.dataStore.listar(`obras`)||[]}get encomendas(){return this.dataStore.listar(`encomendas`)||[]}render(){let e=[`entradas`,`cronograma`,`processo`,`estatisticas`,`inspiracao`],t={entradas:`📋 Entradas`,cronograma:`📅 Cronograma`,processo:`📝 Processo`,estatisticas:`📊 Estatísticas`,inspiracao:`💡 Inspiração`};return`
      <div class="diario-header">
        <div>
          <h2>📋 Diário Criativo</h2>
          <div class="diario-sub">Registro íntimo do seu processo artístico  ·  ${new Date().toLocaleDateString(`pt-BR`)}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-primario" id="btnNovaEntrada" style="font-size:0.8rem;padding:6px 14px;">➕ Nova Entrada</button>
        </div>
      </div>
      <div class="diario-tabs">
        ${e.map(e=>`<button class="tab-btn ${e===this.tabAtiva?`ativo`:``}" data-tab="${e}">${t[e]}</button>`).join(``)}
      </div>
      <div id="diarioContent">${{entradas:()=>this.renderEntradas(),cronograma:()=>this.renderCronograma(),processo:()=>this.renderProcesso(),estatisticas:()=>this.renderEstatisticas(),inspiracao:()=>this.renderInspiracao()}[this.tabAtiva]()}</div>
    `}renderEntradas(){let e=[...this.entradas].sort((e,t)=>new Date(t.data||t.criadoEm)-new Date(e.data||e.criadoEm));return`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
        <span style="font-size:0.85rem;color:var(--text-muted);">${e.length} registro(s)  ·  última semana: ${e.filter(e=>{let t=new Date;return t.setDate(t.getDate()-7),new Date(e.data)>=t}).length} entrada(s)</span>
      </div>
      ${e.length===0?`<div class="diario-card" style="text-align:center;padding:30px;color:var(--text-muted);"><p style="font-size:1.2rem;margin-bottom:6px;">📝</p><p>Nenhuma entrada no diário ainda.<br>Clique em "Nova Entrada" para começar seu registro criativo.</p></div>`:``}
      <div class="diario-entry-grid">
        ${e.map(e=>this.renderCardEntrada(e)).join(``)}
      </div>
    `}renderCardEntrada(e){let t=e.humor||3,n=this.humorEmojis[t]||`😐`,r=this.humorLabels[t]||``,i=e.data?new Date(e.data).toLocaleDateString(`pt-BR`,{weekday:`short`,day:`numeric`,month:`short`}):``,a=(e.obrasTrabalhadas||[]).map(e=>{let t=this.dataStore.buscarPorId(`obras`,e);return t?t.titulo:null}).filter(Boolean),o=e.fotos||[];return`
      <div class="diario-card">
        <div class="dc-data">${i}</div>
        <div class="dc-humor" title="${r}">${n} <span style="font-size:0.7rem;color:var(--text-muted);font-weight:400;">${r}</span></div>
        <div class="dc-horas"><strong>⏰ ${e.horasTrabalhadas||0}h</strong> trabalhadas</div>
        <div class="dc-texto">${e.oQueTrabalhou||``}</div>
        ${a.length>0?`<div class="dc-obras">${a.map(e=>`<span>🖼️ ${e}</span>`).join(``)}</div>`:``}
        ${e.bloqueios?`<div class="dc-bloqueios">⚠️ ${e.bloqueios}</div>`:``}
        ${e.avancos?`<div class="dc-avancos">✅ ${e.avancos}</div>`:``}
        ${e.descobertas?`<div class="dc-descobertas">💡 ${e.descobertas}</div>`:``}
        ${o.length>0?`<div class="dc-fotos">${o.map(e=>`<img src="${e}" onclick="window.open('${e}')">`).join(``)}</div>`:``}
        <div class="diario-acoes">
          <button data-acao="editarEntrada" data-id="${e.id}">✏️ Editar</button>
          <button data-acao="excluirEntrada" data-id="${e.id}" style="color:#dc2626;">🗑️</button>
        </div>
      </div>
    `}renderCronograma(){let e=this.calData.getFullYear(),t=this.calData.getMonth(),n=new Date,r=new Date(e,t,1),i=new Date(e,t+1,0).getDate(),a=r.getDay(),o=[],s=new Date(e,t,0).getDate();for(let e=a-1;e>=0;e--)o.push({dia:s-e,outro:!0});let c=[];for(let r=1;r<=i;r++){let i=`${e}-${String(t+1).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`,a=new Date(e,t,r).toDateString()===n.toDateString(),o=this.entradas.filter(n=>{if(!n.data)return!1;let i=new Date(n.data);return i.getFullYear()===e&&i.getMonth()===t&&i.getDate()===r}),s=this.encomendas.filter(n=>{if(!n.prazo)return!1;let i=new Date(n.prazo);return i.getFullYear()===e&&i.getMonth()===t&&i.getDate()===r}),l=[];o.forEach(e=>{let t=(e.oQueTrabalhou||``).toLowerCase();t.includes(`escultura`)||t.includes(`argila`)||t.includes(`bronze`)?l.push(`escultura`):t.includes(`admin`)||t.includes(`organiz`)||t.includes(`email`)||t.includes(`papel`)||t.includes(`nota`)?l.push(`admin`):e.horasTrabalhadas===0||e.bloqueios&&e.bloqueios.includes(`descanso`)?l.push(`descanso`):l.push(`pintura`)});let u=o.reduce((e,t)=>e+(t.horasTrabalhadas||0),0),d=u>0?`${u}h`:``;c.push({dia:r,dataStr:i,ehHoje:a,atividades:o,prazos:s,cores:l,metaText:d})}let l=o.length+c.length,u=[],d=l%7==0?0:7-l%7;for(let e=1;e<=d;e++)u.push({dia:e,outro:!0});return`
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button id="calMesAnt">◀</button>
          <span>${this.calData.toLocaleDateString(`pt-BR`,{month:`long`,year:`numeric`})}</span>
          <button id="calMesProx">▶</button>
          <button id="calHoje" style="margin-left:4px;font-size:0.75rem;padding:4px 10px;">Hoje</button>
        </div>
        <div style="display:flex;gap:6px;align-items:center;">
          <span style="font-size:0.78rem;color:var(--text-muted);">Total: ${this.entradas.reduce((e,t)=>e+(t.horasTrabalhadas||0),0).toFixed(1)}h</span>
        </div>
      </div>
      <div class="cal-grid">
        ${[`Dom`,`Seg`,`Ter`,`Qua`,`Qui`,`Sex`,`Sáb`].map(e=>`<div class="cal-header-cell">${e}</div>`).join(``)}
        ${[...o,...c,...u].map(e=>{let t=[`cal-cell`];return e.outro&&t.push(`outro-mes`),e.ehHoje&&t.push(`hoje`),e.atividades&&e.atividades.length>0&&t.push(`tem-atividade`),e.prazos&&e.prazos.length>0&&t.push(`tem-prazo`),`
            <div class="${t.join(` `)}" ${e.dataStr?`data-data="${e.dataStr}"`:``}>
              <div class="cal-num">${e.dia}</div>
              ${e.cores?`<div class="cal-atividades">${e.cores.map(e=>`<span class="cal-dot ${e}" title="${e}"></span>`).join(``)}${e.prazos?e.prazos.map(()=>`<span class="cal-dot prazo" title="Prazo"></span>`).join(``):``}</div>`:``}
              ${e.prazos&&e.prazos.length>0?`<div style="font-size:0.55rem;color:#ef4444;font-weight:600;margin-top:1px;">⚠️ ${e.prazos.length}</div>`:``}
              ${e.metaText?`<div class="cal-meta-text">${e.metaText}</div>`:``}
            </div>
          `}).join(``)}
      </div>
      <div class="cal-legenda">
        <span><span class="leg-dot" style="background:#3b82f6;"></span> Pintura</span>
        <span><span class="leg-dot" style="background:#8b5cf6;"></span> Escultura</span>
        <span><span class="leg-dot" style="background:#f59e0b;"></span> Administrativo</span>
        <span><span class="leg-dot" style="background:#10b981;"></span> Descanso</span>
        <span><span class="leg-dot" style="background:#ef4444;animation:pulse-dot 1.5s infinite;"></span> Prazo</span>
      </div>
    `}renderProcesso(){let e=this.obras,t=this.processos,n=this._filtroObraProc,r=n?t.find(e=>e.obraId===n):null,i=r&&r.etapas||[];return`
      <div class="proc-worksel">
        <select id="selObraProcesso">${`<option value="">→ Selecione uma obra —</option>
      ${e.map(e=>`<option value="${e.id}" ${e.id===n?`selected`:``}>${e.titulo||`Sem título`}</option>`).join(``)}`}</select>
        <button class="btn-primario" id="btnNovaEtapa" style="font-size:0.75rem;padding:5px 12px;margin-left:8px;" ${n?``:`disabled`}>➕ Nova Etapa</button>
        ${n?`<button class="btn-secundario" id="btnExportarProcessoPDF" style="font-size:0.75rem;padding:5px 12px;margin-left:4px;">📤 Exportar Making Of PDF</button>`:``}
      </div>
      ${n?i.length===0?`<div style="text-align:center;padding:30px;color:var(--text-muted);"><p style="font-size:1.2rem;">📉</p><p>Nenhuma etapa documentada para esta obra ainda.<br>Clique em "Nova Etapa" para iniciar a linha do tempo do processo criativo.</p></div>`:``:`<p style="color:var(--text-muted);font-size:0.85rem;">Selecione uma obra para ver o processo criativo documentado.</p>`}
      ${i.length>0?`
        <div style="margin-bottom:12px;font-size:0.85rem;color:var(--text-muted);">${i.length} etapa(s)  ·  ${e.find(e=>e.id===n)?.titulo||``}</div>
        <div class="proc-timeline">
          ${i.sort((e,t)=>new Date(e.data||0)-new Date(t.data||0)).map((e,t)=>`
            <div class="proc-step">
              <div class="ps-titulo">${t+1}. ${e.titulo||`Etapa`}</div>
              <div class="ps-data">📅 ${e.data?new Date(e.data).toLocaleDateString(`pt-BR`):`—`}</div>
              <div class="ps-desc">${e.descricao||``}</div>
              ${e.notasTecnicas?`<div class="ps-notas">📝 ${e.notasTecnicas}</div>`:``}
              ${e.foto?`<div class="ps-foto"><img src="${e.foto}" onclick="window.open('${e.foto}')"></div>`:``}
              ${e.videoLink?`<div class="ps-video">📉 <a href="${e.videoLink}" target="_blank">Ver vídeo time-lapse</a></div>`:``}
              <div class="diario-acoes">
                <button data-acao="editarEtapa" data-id="${e.id}">✏️ Editar</button>
                <button data-acao="excluirEtapa" data-id="${e.id}" style="color:#dc2626;">🗑️</button>
              </div>
            </div>
          `).join(``)}
        </div>
      `:``}
    `}renderEstatisticas(){let e=this.entradas,t=this.obras,n={},r={},i={},a=0;e.forEach(e=>{if(!e.data||!e.horasTrabalhadas)return;let t=new Date(e.data),o=`${t.getFullYear()}-S${Math.ceil((t.getDate()-t.getDay()+1)/7)}`,s=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`,c=t.getFullYear(),l=e.horasTrabalhadas||0;n[o]=(n[o]||0)+l,r[s]=(r[s]||0)+l,i[c]=(i[c]||0)+l,a+=l});let o={};e.forEach(e=>{(e.obrasTrabalhadas||[]).forEach(t=>{let n=this.dataStore.buscarPorId(`obras`,t);n&&n.tecnica&&(o[n.tecnica]=(o[n.tecnica]||0)+(e.horasTrabalhadas||0))})});let s={};t.forEach(e=>{if(!e.dataCadastro||!e.criadoEm)return;let t=this.processos.find(t=>t.obraId===e.id),n=t&&t.etapas||[],r=n.length>0?new Date(n[n.length-1].data):new Date(e.criadoEm),i=new Date(e.criadoEm),a=Math.round((r-i)/864e5);a>0&&e.tecnica&&(s[e.tecnica]||(s[e.tecnica]={total:0,count:0}),s[e.tecnica].total+=a,s[e.tecnica].count++)});let c=[...e].filter(e=>e.humor>=4&&e.horasTrabalhadas>=4).sort((e,t)=>(t.horasTrabalhadas||0)-(e.horasTrabalhadas||0)).slice(0,5),l=[],u=new Date;for(let e=5;e>=0;e--){let t=new Date(u.getFullYear(),u.getMonth()-e,1),n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`,i=t.toLocaleDateString(`pt-BR`,{month:`short`});l.push({chave:n,rotulo:i,horas:r[n]||0})}let d=Math.max(1,...l.map(e=>e.horas)),f=436/l.length-8,p=l.map((e,t)=>{let n=24+t*(436/l.length),r=e.horas/d*100,i=130-r;return`<rect class="stats-bar" x="${n}" y="${i}" width="${Math.max(f,6)}" height="${Math.max(r,2)}" rx="3"></rect>
        <text class="stats-value" x="${n+f/2}" y="${i-4}">${e.horas.toFixed(0)}</text>
        <text class="stats-label" x="${n+f/2}" y="138">${e.rotulo}</text>`}).join(``),m=Object.entries(o).sort((e,t)=>t[1]-e[1]),h=Math.max(1,...m.map(e=>e[1]));return`
      <div class="stats-grid">
        <div class="stats-card">
          <h4>⏰ Total de Horas</h4>
          <div class="stats-valor">${a.toFixed(1)}h</div>
          <div class="stats-sub">${e.length} dias registrados</div>
        </div>
        <div class="stats-card">
          <h4>📅 Média Diária</h4>
          <div class="stats-valor">${e.length>0?(a/e.length).toFixed(1):0}h</div>
          <div class="stats-sub">por dia de trabalho</div>
        </div>
        <div class="stats-card">
          <h4>📝 Média p/ Obra</h4>
          <div class="stats-valor">${Object.values(s).length>0?(Object.values(s).reduce((e,t)=>e+t.total/t.count,0)/Object.values(s).length).toFixed(0):`—`}</div>
          <div class="stats-sub">dias em média (${Object.keys(s).length} técnicas)</div>
        </div>
        <div class="stats-card" style="grid-column:1/-1;">
          <h4>📆 Horas por Mês</h4>
          <svg class="stats-svg" viewBox="0 0 460 140">${p}</svg>
        </div>
        ${m.length>0?`
        <div class="stats-card" style="grid-column:1/-1;">
          <h4>📝 Produtividade por Técnica</h4>
          ${m.map(([e,t])=>`
            <div style="margin-bottom:8px;">
              <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:2px;">
                <span>${e}</span><span>${t.toFixed(1)}h</span>
              </div>
              <div class="stats-barra"><div class="fill" style="width:${t/h*100}%"></div></div>
            </div>
          `).join(``)}
        </div>`:``}
        <div class="stats-card">
          <h4>🤩 Dias de Maior Criatividade</h4>
          ${c.length===0?`<p style="font-size:0.8rem;color:var(--text-muted);">Registre mais entradas com humor alto para ver esta análise.</p>`:c.map(e=>`
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;padding:3px 0;border-bottom:1px solid var(--border);">
              <span>${e.data?new Date(e.data).toLocaleDateString(`pt-BR`):``}</span>
              <span>${this.humorEmojis[e.humor]||`😐`} ${e.horasTrabalhadas||0}h</span>
            </div>
          `).join(``)}
        </div>
        <div class="stats-card">
          <h4>🎨 Por Técnica — Dias Médios</h4>
          ${Object.entries(s).length===0?`<p style="font-size:0.8rem;color:var(--text-muted);">Dados insuficientes.</p>`:Object.entries(s).map(([e,t])=>`
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;padding:3px 0;border-bottom:1px solid var(--border);">
              <span>${e}</span><span><strong>${(t.total/t.count).toFixed(0)}</strong> dias (${t.count} obra(s))</span>
            </div>
          `).join(``)}
        </div>
      </div>
      <div style="margin-top:14px;font-size:0.8rem;color:var(--text-muted);">
        💡 Registre entradas diárias com humor e horas para estatísticas mais precisas.
      </div>
    `}renderInspiracao(){let e=new Date,t=Math.floor((e-new Date(e.getFullYear(),0,0))/864e5),n=t%this.citacoes.length,r=t%this.promptsDiarios.length,i=e.getDay()===1?Math.floor(t/7)%this.desafiosSemanais.length:-1,a=this.citacoes[n],o=this.promptsDiarios[r],s=i>=0?this.desafiosSemanais[i]:null;return`
      <div class="inspiracao-card">
        <div class="ic-citacao">"${a.texto}"</div>
        <div class="ic-autor">— ${a.autor}</div>
        <div class="ic-prompt">💡 Prompt criativo de hoje: <strong>${o}</strong></div>
        ${s?`<div class="ic-desafio">🎯 Desafio da semana: ${s}</div>`:``}
      </div>
      <div style="margin-top:16px;">
        <button class="btn-primario" id="btnNovaCitacao" style="font-size:0.8rem;padding:6px 14px;">➕ Nova citação</button>
        <button class="btn-secundario" id="btnNovoPrompt" style="font-size:0.8rem;padding:6px 14px;margin-left:6px;">➕ Novo prompt</button>
      </div>
      <div style="margin-top:24px;">
        <h4 style="font-size:0.9rem;margin-bottom:8px;">📋 Todas as citação</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:8px;">
          ${this.citacoes.map(e=>`
            <div style="font-size:0.75rem;padding:8px 10px;background:var(--card);border-radius:6px;border:1px solid var(--border);">
              <em>"${e.texto}"</em><br><span style="color:var(--text-muted);">— ${e.autor}</span>
            </div>
          `).join(``)}
        </div>
      </div>
    `}aposRenderizar(){this.removerListeners(),document.querySelectorAll(`.diario-tabs .tab-btn[data-tab]`).forEach(e=>{let t=()=>{this.tabAtiva=e.dataset.tab,this.rerenderizar()};e.addEventListener(`click`,t),this._bindCache[`tab_`+e.dataset.tab]={el:e,handler:t,type:`click`}}),document.getElementById(`btnNovaEntrada`)?.addEventListener(`click`,()=>this.abrirFormEntrada()),document.getElementById(`calMesAnt`)?.addEventListener(`click`,()=>{this.calData.setMonth(this.calData.getMonth()-1),this.rerenderizar()}),document.getElementById(`calMesProx`)?.addEventListener(`click`,()=>{this.calData.setMonth(this.calData.getMonth()+1),this.rerenderizar()}),document.getElementById(`calHoje`)?.addEventListener(`click`,()=>{this.calData=new Date,this.rerenderizar()}),document.querySelectorAll(`.cal-cell[data-data]`).forEach(e=>{let t=()=>{let t=e.dataset.data,n=this.entradas.find(e=>e.data&&e.data.startsWith(t));n?(this._entradaEditando=n.id,this.abrirFormEntrada(n.id)):(this._entradaEditando=null,this.abrirFormEntrada(null,t))};e.addEventListener(`click`,t),this._bindCache[`cal_`+e.dataset.data]={el:e,handler:t,type:`click`}});let e=document.getElementById(`selObraProcesso`);if(e){let t=()=>{this._filtroObraProc=e.value,this.rerenderizar()};e.addEventListener(`change`,t),this._bindCache.selObraProcesso={el:e,handler:t,type:`change`}}document.getElementById(`btnNovaEtapa`)?.addEventListener(`click`,()=>this.abrirFormEtapa()),document.getElementById(`btnExportarProcessoPDF`)?.addEventListener(`click`,()=>this.exportarProcessoPDF()),document.getElementById(`btnNovaCitacao`)?.addEventListener(`click`,()=>this.rerenderizar()),document.getElementById(`btnNovoPrompt`)?.addEventListener(`click`,()=>this.rerenderizar());let t=document.getElementById(`diarioContent`)||document.getElementById(`viewPrincipal`);if(t){let e=e=>{let t=e.target.closest(`[data-acao]`);if(!t)return;let n=t.dataset.acao,r=t.dataset.id;n===`editarEntrada`?this.abrirFormEntrada(r):n===`excluirEntrada`?this.excluirEntrada(r):n===`editarEtapa`?this.abrirFormEtapa(r):n===`excluirEtapa`&&this.excluirEtapa(r)};t.addEventListener(`click`,e),this._bindCache.delegatedDiario={el:t,handler:e,type:`click`}}}abrirFormEntrada(e=null,t=null){let n=e?this.dataStore.buscarPorId(`entradasDiario`,e):null,r=this.obras.map(e=>`<option value="${e.id}">🖼️ ${e.titulo||`Sem título`}</option>`).join(``);n&&n.obrasTrabalhadas;let a=n&&n.fotos||[],o=n?n.data.slice(0,10):t||new Date().toISOString().slice(0,10),l=n&&n.humor||3,u=n&&n.oQueTrabalhou||``,d=n&&n.horasTrabalhadas||0,f=n&&n.bloqueios||``,p=n&&n.avancos||``,m=n&&n.descobertas||``;this._fotosTemporarias=[...a],this._selHumor=l;let h=[1,2,3,4,5].map(e=>`<button type="button" class="humor-btn ${e===this._selHumor?`selecionado`:``}" data-humor="${e}">${this.humorEmojis[e]}</button>`).join(``);s(`
      <h3>${n?`✏️ Editar Entrada`:`➕ Nova Entrada do Diário`}</h3>
      <form id="formModal" class="diario-form-grid">
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);">📅 Data</label>
          <input type="date" id="fEntData" value="${o}" required style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
        </div>
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);">😀 Humor criativo</label>
          <div class="humor-selector" id="humorSelector">${h}</div>
        </div>
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);">📝 O que trabalhou hoje</label>
          <div style="margin-bottom:4px;display:flex;gap:4px;flex-wrap:wrap;">
            <button type="button" class="btn-toolbar" data-insere="<p></p>" style="font-size:0.7rem;padding:2px 8px;border:1px solid var(--border);border-radius:4px;background:var(--card);cursor:pointer;">Parágrafo</button>
            <button type="button" class="btn-toolbar" data-insere="<strong></strong>" style="font-size:0.7rem;padding:2px 8px;border:1px solid var(--border);border-radius:4px;background:var(--card);cursor:pointer;"><strong>Negrito</strong></button>
            <button type="button" class="btn-toolbar" data-insere="<em></em>" style="font-size:0.7rem;padding:2px 8px;border:1px solid var(--border);border-radius:4px;background:var(--card);cursor:pointer;"><em>Itálico</em></button>
          </div>
          <textarea id="fEntTexto" style="width:100%;min-height:100px;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);font-family:inherit;" placeholder="Descreva seu dia criativo...">${u}</textarea>
        </div>
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);">🖼️ Obras trabalhadas (segure Ctrl para múltiplas)</label>
          <select multiple id="fEntObras" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;min-height:60px;font-size:0.85rem;background:var(--bg);color:var(--text);">${r}</select>
          <div style="font-size:0.7rem;color:var(--text-muted);margin-top:2px;">Selecione as obras que trabalhou hoje</div>
        </div>
        <div>
          <label style="font-size:0.8rem;color:var(--text-muted);">⏰ Horas trabalhadas</label>
          <input type="number" id="fEntHoras" value="${d}" min="0" step="0.5" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
        </div>
        <div>
          <label style="font-size:0.8rem;color:var(--text-muted);">⚠️ Bloqueios criativos</label>
          <textarea id="fEntBloqueios" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;background:var(--bg);color:var(--text);min-height:40px;" placeholder="O que te travou hoje?">${f}</textarea>
        </div>
        <div>
          <label style="font-size:0.8rem;color:var(--text-muted);">✅ Avanços</label>
          <textarea id="fEntAvancos" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;background:var(--bg);color:var(--text);min-height:40px;" placeholder="O que conquistou hoje?">${p}</textarea>
        </div>
        <div>
          <label style="font-size:0.8rem;color:var(--text-muted);">💡 Descobertas</label>
          <textarea id="fEntDescobertas" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;background:var(--bg);color:var(--text);min-height:40px;" placeholder="O que aprendeu hoje?">${m}</textarea>
        </div>
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);">📷 Fotos do dia</label>
          <input type="file" id="fEntFotos" accept="image/*" multiple style="font-size:0.8rem;">
          <div class="photo-strip" id="photoStrip">${a.map(e=>`<div class="ps-item"><img src="${e}"><button type="button" class="ps-remove" data-foto="${e}">📷</button></div>`).join(``)}</div>
        </div>
        <div class="modal-acoes" style="grid-column:1/-1;">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">${n?`Atualizar`:`Salvar Entrada`}</button>
        </div>
      </form>
    `),document.querySelectorAll(`.humor-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.humor-btn`).forEach(e=>e.classList.remove(`selecionado`)),e.classList.add(`selecionado`),this._selHumor=Number(e.dataset.humor)})}),document.querySelectorAll(`.btn-toolbar`).forEach(e=>{e.addEventListener(`click`,()=>{let t=document.getElementById(`fEntTexto`),n=e.dataset.insere,r=t.selectionStart,i=t.value,a=i.slice(0,r),o=i.slice(r);t.value=a+n+o,t.focus(),t.selectionStart=t.selectionEnd=r+n.indexOf(`>`)+1})}),document.getElementById(`fEntFotos`)?.addEventListener(`change`,e=>{let t=e.target.files;Array.from(t).forEach(e=>{let t=new FileReader;t.onload=e=>{this._fotosTemporarias.push(e.target.result),this.atualizarPhotoStrip()},t.readAsDataURL(e)})}),document.querySelectorAll(`.ps-remove`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.foto;this._fotosTemporarias=this._fotosTemporarias.filter(e=>e!==t),this.atualizarPhotoStrip()})}),document.getElementById(`btnCancelarModal`).addEventListener(`click`,c),document.getElementById(`formModal`).addEventListener(`submit`,t=>{t.preventDefault();let r=document.getElementById(`fEntObras`),a=r?Array.from(r.selectedOptions).map(e=>e.value):[],o={data:document.getElementById(`fEntData`).value,humor:this._selHumor,oQueTrabalhou:document.getElementById(`fEntTexto`).value.trim(),obrasTrabalhadas:a,fotos:this._fotosTemporarias,horasTrabalhadas:Number(document.getElementById(`fEntHoras`).value)||0,bloqueios:document.getElementById(`fEntBloqueios`).value.trim(),avancos:document.getElementById(`fEntAvancos`).value.trim(),descobertas:document.getElementById(`fEntDescobertas`).value.trim()};if(!o.data){i(`A data é obrigatória.`);return}n?(this.dataStore.atualizar(`entradasDiario`,e,o),i(`Entrada atualizada!`)):(this.dataStore.adicionar(`entradasDiario`,o),i(`Entrada registrada no diário!`)),c(),this._fotosTemporarias=[],this.rerenderizar()})}atualizarPhotoStrip(){let e=document.getElementById(`photoStrip`);e&&(e.innerHTML=this._fotosTemporarias.map(e=>`<div class="ps-item"><img src="${e}"><button type="button" class="ps-remove" data-foto="${e}">📷</button></div>`).join(``),e.querySelectorAll(`.ps-remove`).forEach(e=>{e.addEventListener(`click`,()=>{this._fotosTemporarias=this._fotosTemporarias.filter(t=>t!==e.dataset.foto),this.atualizarPhotoStrip()})}))}excluirEntrada(e){confirm(`Excluir esta entrada do diário?`)&&(this.dataStore.remover(`entradasDiario`,e),i(`Entrada excluída.`),this.rerenderizar())}abrirFormEtapa(e=null){let t=this._filtroObraProc;if(!t){i(`Selecione uma obra primeiro.`);return}let n=this.processos.find(e=>e.obraId===t),r=null;e&&n&&(r=(n.etapas||[]).find(t=>t.id===e));let a=this.etapasPadrao.map(e=>`<option value="${e}" ${r&&r.titulo===e?`selected`:``}>${e}</option>`).join(``);s(`
      <h3>${r?`✏️ Editar Etapa`:`➕ Nova Etapa do Processo`}</h3>
      <form id="formModal">
        <div class="campo-form"><label>Etapa</label><select id="fEtpTitulo"><option value="">→ Personalizada —</option>${a}</select></div>
        <div class="campo-form"><label>Ou digite título personalizado</label><input type="text" id="fEtpTituloCustom" value="${r&&!this.etapasPadrao.includes(r.titulo)&&r.titulo||``}" placeholder="Ex.: Aplicação de verniz" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form"><label>📅 Data</label><input type="date" id="fEtpData" value="${r?r.data||``:new Date().toISOString().slice(0,10)}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div class="campo-form"><label>📝 Descrição</label><textarea id="fEtpDesc" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;min-height:70px;font-family:inherit;">${r&&r.descricao||``}</textarea></div>
        <div class="campo-form"><label>📝 Notas técnicas (cores, pincéis, misturas)</label><textarea id="fEtpNotas" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;min-height:50px;">${r&&r.notasTecnicas||``}</textarea></div>
        <div class="campo-form"><label>📷 Foto da etapa</label><input type="file" id="fEtpFoto" accept="image/*"></div>
        ${r&&r.foto?`<div style="margin-bottom:8px;"><img src="${r.foto}" style="max-width:150px;max-height:100px;border-radius:4px;"></div>`:``}
        <div class="campo-form"><label>📉 Link de vídeo (YouTube/Vimeo)</label><input type="url" id="fEtpVideo" value="${r&&r.videoLink||``}" placeholder="https://..." style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">${r?`Atualizar`:`Adicionar Etapa`}</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarModal`).addEventListener(`click`,c),document.getElementById(`formModal`).addEventListener(`submit`,e=>{e.preventDefault();let a=document.getElementById(`fEtpTitulo`).value||document.getElementById(`fEtpTituloCustom`).value.trim();if(!a){i(`Título da etapa é obrigatório.`);return}let o={id:r?r.id:`etp_`+Date.now()+`_`+Math.floor(Math.random()*1e3),titulo:a,data:document.getElementById(`fEtpData`).value,descricao:document.getElementById(`fEtpDesc`).value.trim(),notasTecnicas:document.getElementById(`fEtpNotas`).value.trim(),foto:r?r.foto:``,videoLink:document.getElementById(`fEtpVideo`).value.trim()},s=document.getElementById(`fEtpFoto`);if(s&&s.files&&s.files[0]){let e=new FileReader;e.onload=e=>{o.foto=e.target.result,this.salvarEtapa(t,n,o,r)},e.readAsDataURL(s.files[0])}else r&&(o.foto=r.foto),this.salvarEtapa(t,n,o,r)})}salvarEtapa(e,t,n,r){if(t)if(r){let e=t.etapas.findIndex(e=>e.id===r.id);e>=0&&(t.etapas[e]=n),this.dataStore.atualizar(`etapasProcesso`,t.id,{etapas:t.etapas}),i(`Etapa atualizada!`)}else t.etapas.push(n),this.dataStore.atualizar(`etapasProcesso`,t.id,{etapas:t.etapas}),i(`Etapa adicionada!`);else this.dataStore.adicionar(`etapasProcesso`,{obraId:e,etapas:[n]}),i(`Processo criado e etapa adicionada!`);c(),this.rerenderizar()}excluirEtapa(e){if(!confirm(`Excluir esta etapa do processo?`))return;let t=this._filtroObraProc,n=this.processos.find(e=>e.obraId===t);n&&(n.etapas=(n.etapas||[]).filter(t=>t.id!==e),n.etapas.length===0?this.dataStore.remover(`etapasProcesso`,n.id):this.dataStore.atualizar(`etapasProcesso`,n.id,{etapas:n.etapas}),i(`Etapa excluída.`),this.rerenderizar())}exportarProcessoPDF(){if(window.jspdf===void 0||!window.jspdf.jsPDF){i(`jsPDF não carregado.`);return}a(`Exportando making of...`);let e=this._filtroObraProc,t=this.dataStore.buscarPorId(`obras`,e),r=this.processos.find(t=>t.obraId===e);if(!t||!r){i(`Selecione uma obra com processo documentado.`);return}let{jsPDF:s}=window.jspdf,c=new s({orientation:`portrait`,unit:`mm`,format:`a4`}),l=20;c.setFont(`helvetica`,`bold`),c.setFontSize(22),c.text(`Making Of`,20,l),l+=10,c.setFontSize(14),c.setFont(`helvetica`,`normal`),c.text(t.titulo||`Obra sem título`,20,l),l+=7,c.setFontSize(10),c.text(`${t.tecnica||``}  ·  ${t.dimensoes?t.dimensoes.altura+`x`+t.dimensoes.largura+(t.dimensoes.profundidade?`x`+t.dimensoes.profundidade:``)+` cm`:``}`,20,l),l+=5,c.text(`Processo criativo documentado  ·  ${new Date().toLocaleDateString(`pt-BR`)}`,20,l),l+=8,c.setDrawColor(200),c.line(20,l,190,l),l+=10;let u=(r.etapas||[]).sort((e,t)=>new Date(e.data||0)-new Date(t.data||0));u.forEach((e,t)=>{l>250&&(c.addPage(),l=20),c.setFont(`helvetica`,`bold`),c.setFontSize(11),c.text(`${t+1}. ${e.titulo||`Etapa`}`,20,l),l+=5,c.setFont(`helvetica`,`normal`),c.setFontSize(8),e.data&&(c.text(`📅 ${new Date(e.data).toLocaleDateString(`pt-BR`)}`,20,l),l+=4),e.descricao&&c.splitTextToSize(e.descricao,170).forEach(e=>{l>270&&(c.addPage(),l=20),c.text(e,22,l),l+=4}),e.notasTecnicas&&(l>265&&(c.addPage(),l=20),c.text(`📝 Técnica: ${e.notasTecnicas}`,22,l),l+=5),t<u.length-1&&(c.setDrawColor(220),c.line(20,l,190,l),l+=4)}),l>230&&(c.addPage(),l=20),l+=6,c.setDrawColor(200),c.line(20,l,190,l),l+=6,c.setFont(`helvetica`,`bold`),c.setFontSize(10),c.text(`Dados da Obra`,20,l),l+=5,c.setFont(`helvetica`,`normal`),c.setFontSize(8),t.preco&&(c.text(`💵 Preço: ${n(t.preco)}`,20,l),l+=4),t.serie&&(c.text(`📁 Série: ${t.serie}`,20,l),l+=4),t.descricao&&c.splitTextToSize(t.descricao,170).forEach(e=>{c.text(e,20,l),l+=4}),c.save(`making-of-${(t.titulo||`obra`).replace(/\s+/g,`-`).toLowerCase()}.pdf`),o(),i(`Making Of exportado em PDF!`)}},k=class extends D{constructor(e,t){super(e,t),this.token=``,this.cliente=null,this.encomendas=[]}render(){if(this.token=this.extrairToken(),!this.token)return`
        <div class="portal-wrapper">
          <div class="portal-card portal-erro">
            <div class="portal-icone">🔒</div>
            <h2>Link inválido</h2>
            <p>O link de acesso não é válido ou expirou. Entre em contato com o artista para obter um novo link.</p>
          </div>
        </div>
      `;let e=this.dataStore.listar(`portais`).find(e=>e.token===this.token&&e.ativo);if(!e)return`
        <div class="portal-wrapper">
          <div class="portal-card portal-erro">
            <div class="portal-icone">🔒</div>
            <h2>Acesso não autorizado</h2>
            <p>Este link não está mais ativo ou é inválido. Solicite um novo link ao artista.</p>
          </div>
        </div>
      `;e.ultimoAcesso=new Date().toISOString(),this.dataStore.salvar(),this.cliente={id:e.clienteId,nome:e.clienteNome},this.encomendas=this.dataStore.listar(`encomendas`).filter(t=>t.clienteNome===e.clienteNome||t.clienteEmail===e.clienteId);let t=this.encomendas.length>0?this.encomendas.map(e=>this.renderEncomendaCard(e)).join(``):`<div class="portal-vazio">Nenhuma encomenda encontrada para este cliente.</div>`,n=this.dataStore.dados.config.artista?.nome||`Artista`;return`
      <div class="portal-wrapper">
        <div class="portal-header">
          <div class="portal-header-info">
            <h2>📦 Acompanhamento de Encomendas</h2>
            <p class="portal-sub">${e.clienteNome} · via ${n}</p>
          </div>
        </div>
        <div class="portal-encomendas-lista">
          ${t}
        </div>
        <div class="portal-footer">
          <p>Dúvidas? Entre em contato direto com o artista.</p>
          <p class="portal-footer-peq">Atualizado em ${new Date().toLocaleString(`pt-BR`)}</p>
        </div>
      </div>
    `}extrairToken(){try{let e=window.location.hash;return new URLSearchParams(e.replace(`#portal?`,``)).get(`token`)||``}catch{return``}}renderEncomendaCard(e){let t={criado:{rotulo:`Pedido Recebido`,cor:`#3b82f6`,icone:`📋`},em_andamento:{rotulo:`Em Andamento`,cor:`#f59e0b`,icone:`🎨`},aprovacao:{rotulo:`Aguardando Aprovação`,cor:`#8b5cf6`,icone:`✅`},finalizado:{rotulo:`Finalizado`,cor:`#16a34a`,icone:`✨`},entregue:{rotulo:`Entregue`,cor:`#065f46`,icone:`📦`},cancelado:{rotulo:`Cancelado`,cor:`#dc2626`,icone:`❌`}},i=t[e.status]||{rotulo:e.status,cor:`#6b7280`,icone:`📋`},a=e.prazo?Math.ceil((new Date(e.prazo)-new Date)/864e5):null,o=a===null?`Sem prazo definido`:a>0?`${a} dia${a>1?`s`:``} restante${a>1?`s`:``}`:`Prazo encerrado`,s=e.atualizacoes&&e.atualizacoes.length>0?e.atualizacoes.map(e=>`
        <div class="portal-timeline-item">
          <div class="portal-timeline-dot" style="background:${t[e.status]?.cor||`#6b7280`}"></div>
          <div class="portal-timeline-content">
            <div class="portal-timeline-status">${t[e.status]?.rotulo||e.status}</div>
            <div class="portal-timeline-msg">${B(e.mensagem)}</div>
            <div class="portal-timeline-data">${r(e.data)}</div>
          </div>
        </div>
      `).join(``):`<div class="portal-timeline-empty">Nenhuma atualização ainda.</div>`;return`
      <div class="portal-encomenda-card">
        <div class="portal-encomenda-header">
          <div class="portal-encomenda-titulo">
            <h3>${B(e.descricao)||`Encomenda`}</h3>
            <span class="portal-badge" style="background:${i.cor}20;color:${i.cor};border:1px solid ${i.cor}40;">
              ${i.icone} ${i.rotulo}
            </span>
          </div>
          <div class="portal-encomenda-meta">
            <span>💰 ${n(e.valor||0)}</span>
            <span>📅 ${o}</span>
            ${e.clienteEmail?`<span>✉️ ${B(e.clienteEmail)}</span>`:``}
          </div>
        </div>
        <div class="portal-encomenda-body">
          <h4>📜 Atualizações</h4>
          <div class="portal-timeline">
            ${s}
          </div>
        </div>
      </div>
    `}aposRenderizar(){this.removerListeners()}},pe=class extends D{constructor(e,t){super(e,t),this.filtroStatus=``,this.busca=``}render(){let e=this.filtrarEncomendas(),t=this.dataStore.listar(`encomendas`)||[],r=e.map(e=>this.renderLinha(e)).join(``),i=[``,`criado`,`em_andamento`,`aprovacao`,`finalizado`,`entregue`,`cancelado`].map(e=>`<option value="${e}" ${this.filtroStatus===e?`selected`:``}>${e?this.rotuloStatus(e):`Todos`}</option>`).join(``),a=t.filter(e=>![`entregue`,`cancelado`,`finalizado`].includes(e.status)).length,o=t.reduce((e,t)=>e+(t.valor||0),0),s=[`criado`,`em_andamento`,`aprovacao`,`finalizado`,`entregue`,`cancelado`].map(e=>{let n=t.filter(t=>t.status===e).length,r={criado:{rot:`Criado`,cor:`#3b82f6`},em_andamento:{rot:`Andamento`,cor:`#f59e0b`},aprovacao:{rot:`Aprovação`,cor:`#8b5cf6`},finalizado:{rot:`Finalizado`,cor:`#16a34a`},entregue:{rot:`Entregue`,cor:`#065f46`},cancelado:{rot:`Cancelado`,cor:`#dc2626`}};return n?`<span class="chip-filtro" style="font-size:0.72rem;padding:2px 8px;border:1px solid ${r[e].cor}40;background:${r[e].cor}15;color:${r[e].cor};">${r[e].rot}: ${n}</span>`:``}).join(``);return`
      <div class="view-cabecalho">
        <div>
          <h2>Encomendas</h2>
          <p class="subtitulo">${t.length} encomenda${t.length===1?``:`s`} · ${a} pendente${a===1?``:`s`} · ${n(o)} previsto</p>
        </div>
        <button class="btn-gradient" id="btnNovaEncomenda">✚ Nova Encomenda</button>
      </div>
      ${s?`<div class="vendas-summary">${s}</div>`:``}
      <div class="filtros-linha">
        <input type="text" id="buscaEncomenda" placeholder="🔍 Buscar por cliente ou descrição..." value="${B(this.busca)}" style="flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
        <select id="filtroStatusEncomenda" style="padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">${i}</select>
        <button class="btn-secundario" id="btnPortaisCliente">🔗 Links de Acesso</button>
      </div>
      ${e.length>0?`
      <div class="tabela-wrapper">
        <table>
          <thead><tr>
            <th>Cliente</th><th>Descrição</th><th>Valor</th><th>Prazo</th><th>Status</th><th>Ações</th>
          </tr></thead>
          <tbody>${r}</tbody>
        </table>
      </div>`:`
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio">📦</div><p>Nenhuma encomenda encontrada.</p></div>
      </div>`}
    `}rotuloStatus(e){return{criado:`Criado`,em_andamento:`Em Andamento`,aprovacao:`Aprovação`,finalizado:`Finalizado`,entregue:`Entregue`,cancelado:`Cancelado`}[e]||e}classeStatus(e){return{criado:``,em_andamento:`exposicao`,aprovacao:`reservada`,finalizado:`vendida`,entregue:`vendida`,cancelado:``}[e]||``}filtrarEncomendas(){let e=this.dataStore.listar(`encomendas`)||[];if(this.filtroStatus&&(e=e.filter(e=>e.status===this.filtroStatus)),this.busca){let t=this.busca.toLowerCase();e=e.filter(e=>(e.clienteNome||``).toLowerCase().includes(t)||(e.descricao||``).toLowerCase().includes(t))}return e.sort((e,t)=>new Date(t.criadoEm||0)-new Date(e.criadoEm||0))}renderLinha(e){let t={criado:{rotulo:`Criado`,cor:`#3b82f6`},em_andamento:{rotulo:`Em Andamento`,cor:`#f59e0b`},aprovacao:{rotulo:`Aprovação`,cor:`#8b5cf6`},finalizado:{rotulo:`Finalizado`,cor:`#16a34a`},entregue:{rotulo:`Entregue`,cor:`#065f46`},cancelado:{rotulo:`Cancelado`,cor:`#dc2626`}}[e.status]||{rotulo:e.status,cor:`#6b7280`},i=e.prazo?Math.ceil((new Date(e.prazo)-new Date)/864e5):null,a=i===null?`—`:`<span style="${i<0?`color:#dc2626;font-weight:600;`:i<=15?`color:#f59e0b;`:``}">${r(e.prazo)}${i<0?` (atrasado)`:` (${i}d)`}</span>`;return`
      <tr>
        <td><strong>${B(e.clienteNome)||`—`}</strong>${e.clienteEmail?`<br><span style="font-size:0.75rem;color:var(--text-muted);">${B(e.clienteEmail)}</span>`:``}</td>
        <td>${V(e.descricao)||`—`}</td>
        <td>${n(e.valor||0)}</td>
        <td>${a}</td>
        <td><span class="tag-status ${this.classeStatus(e.status)}" style="background:${t.cor}20;color:${t.cor};">${t.rotulo}</span></td>
        <td>
          <button class="btn-miniatura btn-editar-enc" data-id="${e.id}" title="Editar">✏️</button>
          <button class="btn-miniatura btn-atualizar-enc" data-id="${e.id}" title="Adicionar atualização">📝</button>
          <button class="btn-miniatura btn-remover-enc" data-id="${e.id}" title="Excluir" style="color:#dc2626;">🗑️</button>
        </td>
      </tr>
    `}abrirModalForm(e){let t=e||{},n=!!t.id,r=this.dataStore.listar(`clientes`)||[],i=r.map(e=>`<option value="${e.id}" ${e.nome===t.clienteNome?`selected`:``}>${e.nome} (${e.email||``})</option>`).join(``);s(`
      <h3>${n?`✏️ Editar`:`📦 Nova`} Encomenda</h3>
      <form id="formEncomenda">
        <div class="campo-form"><label>Cliente</label>
          <div style="display:flex;gap:6px;">
            <select id="encClienteSelect" style="flex:1;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
              <option value="">— Digitar nome manualmente —</option>
              ${i}
            </select>
          </div>
        </div>
        <div class="campo-form"><label>Nome do Cliente</label><input type="text" id="encClienteNome" value="${B(t.clienteNome||``)}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Email</label><input type="email" id="encClienteEmail" value="${B(t.clienteEmail||``)}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Telefone</label><input type="text" id="encClienteTel" value="${B(t.clienteTelefone||``)}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form"><label>Descrição</label><textarea id="encDescricao" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:60px;background:var(--bg);color:var(--text);">${B(t.descricao||``)}</textarea></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Valor (R$)</label><input type="number" id="encValor" value="${t.valor||0}" min="0" step="0.01" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Prazo</label><input type="date" id="encPrazo" value="${t.prazo?new Date(t.prazo).toISOString().slice(0,10):``}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form"><label>Status</label>
          <select id="encStatus" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
            ${[`criado`,`em_andamento`,`aprovacao`,`finalizado`,`entregue`,`cancelado`].map(e=>`<option value="${e}" ${t.status===e?`selected`:``}>${this.rotuloStatus(e)}</option>`).join(``)}
          </select>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarEnc">Cancelar</button>
          <button type="submit" class="btn-primario">${n?`Salvar`:`Criar`}</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarEnc`)?.addEventListener(`click`,c),document.getElementById(`encClienteSelect`)?.addEventListener(`change`,e=>{let t=r.find(t=>t.id===e.target.value);t&&(document.getElementById(`encClienteNome`).value=t.nome,document.getElementById(`encClienteEmail`).value=t.email||``,document.getElementById(`encClienteTel`).value=t.telefone||``)}),document.getElementById(`formEncomenda`)?.addEventListener(`submit`,t=>{t.preventDefault(),this.salvarEncomenda(e)})}abrirModalAtualizacao(e){let t=this.dataStore.buscarPorId(`encomendas`,e);if(!t){i(`Encomenda não encontrada.`);return}let n=[`criado`,`em_andamento`,`aprovacao`,`finalizado`,`entregue`,`cancelado`].map(e=>`<option value="${e}" ${t.status===e?`selected`:``}>${this.rotuloStatus(e)}</option>`).join(``);s(`
      <h3>📝 Atualizar Status — ${B(t.descricao)}</h3>
      <form id="formAtualizacao">
        <div class="campo-form"><label>Novo Status</label>
          <select id="atuStatus" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">${n}</select>
        </div>
        <div class="campo-form"><label>Mensagem para o cliente</label>
          <textarea id="atuMensagem" placeholder="Ex: Iniciei a pintura, as cores estão secando..." style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:80px;background:var(--bg);color:var(--text);"></textarea>
        </div>
        <div class="campo-form" style="font-size:0.8rem;color:var(--text-muted);">
          💡 Esta atualização ficará visível no portal do cliente.
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarAtu">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar Atualização</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarAtu`)?.addEventListener(`click`,c),document.getElementById(`formAtualizacao`)?.addEventListener(`submit`,e=>{e.preventDefault(),this.salvarAtualizacao(t)})}abrirModalPortais(){let e=this.dataStore.listar(`portais`)||[],t=this.dataStore.listar(`clientes`)||[],n=this.dataStore.listar(`encomendas`)||[];s(`
      <h3>🔗 Links de Acesso do Cliente</h3>
      <p class="texto-ajuda" style="margin-bottom:12px;">Gere links para que seus clientes acompanhem o status das encomendas.</p>
      <div class="portais-lista">${e.length>0?e.map(e=>{let t=n.filter(t=>t.clienteNome===e.clienteNome).length;return`
        <div class="portal-item">
          <div class="portal-item-info">
            <strong>${B(e.clienteNome)}</strong>
            <span class="texto-ajuda">${t} encomenda${t>1?`s`:``} · ${e.ativo?`🟢 Ativo`:`🔴 Inativo`}</span>
            <span class="texto-ajuda">Último acesso: ${e.ultimoAcesso?r(e.ultimoAcesso):`Nunca`}</span>
          </div>
          <div class="portal-item-acoes">
            <input type="text" readonly value="${window.location.origin}${window.location.pathname}#portal?token=${e.token}" style="padding:4px 8px;border:1px solid var(--border);border-radius:4px;font-size:0.75rem;width:240px;background:var(--bg);color:var(--text);" onclick="this.select()">
            <button class="btn-miniatura btn-copiar-link" data-link="${window.location.origin}${window.location.pathname}#portal?token=${e.token}" title="Copiar link">📋</button>
            <button class="btn-miniatura btn-toggle-portal" data-id="${e.id}" title="${e.ativo?`Desativar`:`Ativar`}">${e.ativo?`🔓`:`🔒`}</button>
            <button class="btn-miniatura btn-remover-portal" data-id="${e.id}" title="Remover" style="color:#dc2626;">🗑️</button>
          </div>
        </div>
      `}).join(``):`<p style="color:var(--text-muted);text-align:center;padding:12px;">Nenhum link de acesso gerado ainda.</p>`}</div>
      <hr style="margin:12px 0;border-color:var(--border);">
      <h4 style="font-size:0.85rem;margin:0 0 8px;">Gerar novo link</h4>
      <div style="display:flex;gap:8px;align-items:center;">
        <select id="selClientePortal" style="flex:1;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
          ${t.filter(e=>n.some(t=>t.clienteNome===e.nome)).map(e=>`<option value="${e.id}">${e.nome}</option>`).join(``)||`<option value="">Nenhum cliente com encomenda</option>`}
        </select>
        <button class="btn-primario" id="btnGerarPortal">🔗 Gerar Link</button>
      </div>
      <div class="modal-acoes" style="margin-top:16px;">
        <button class="btn-secundario" id="btnFecharPortais">Fechar</button>
      </div>
    `),document.getElementById(`btnFecharPortais`)?.addEventListener(`click`,c),document.getElementById(`btnGerarPortal`)?.addEventListener(`click`,()=>this.gerarLinkPortal()),document.querySelector(`.portais-lista`)?.addEventListener(`click`,e=>{if(e.target.closest(`.btn-copiar-link`)){let t=e.target.closest(`.btn-copiar-link`).dataset.link;navigator.clipboard.writeText(t).then(()=>i(`Link copiado!`)).catch(()=>i(`Erro ao copiar.`))}e.target.closest(`.btn-toggle-portal`)&&this.togglePortal(e.target.closest(`.btn-toggle-portal`).dataset.id),e.target.closest(`.btn-remover-portal`)&&this.removerPortal(e.target.closest(`.btn-remover-portal`).dataset.id)})}salvarEncomenda(e){let t={clienteNome:document.getElementById(`encClienteNome`)?.value?.trim()||``,clienteEmail:document.getElementById(`encClienteEmail`)?.value?.trim()||``,clienteTelefone:document.getElementById(`encClienteTel`)?.value?.trim()||``,descricao:document.getElementById(`encDescricao`)?.value?.trim()||``,valor:Number(document.getElementById(`encValor`)?.value)||0,prazo:document.getElementById(`encPrazo`)?.value||``,status:document.getElementById(`encStatus`)?.value||`criado`};if(!t.clienteNome||!t.descricao){i(`Preencha nome do cliente e descrição.`);return}e&&e.id?(this.dataStore.atualizar(`encomendas`,e.id,t),i(`Encomenda atualizada!`),X.registrar(`atualizacao`,`Encomenda atualizada`,t.clienteNome,`atualizacao`)):(t.atualizacoes=[{data:new Date().toISOString(),status:`criado`,mensagem:`Pedido registrado.`}],t.imagens=[],this.dataStore.adicionar(`encomendas`,t),i(`Encomenda criada!`),X.registrar(`criacao`,`Nova encomenda`,t.clienteNome,`criacao`)),c(),this.rerenderizar()}salvarAtualizacao(e){let t=document.getElementById(`atuStatus`)?.value||e.status,n=document.getElementById(`atuMensagem`)?.value?.trim()||``,r=e.atualizacoes||[];r.push({data:new Date().toISOString(),status:t,mensagem:n||`Status atualizado.`}),this.dataStore.atualizar(`encomendas`,e.id,{status:t,atualizacoes:r}),i(`Atualização registrada!`),X.registrar(`atualizacao`,`Encomenda: ${t}`,e.clienteNome,`atualizacao`),c(),this.rerenderizar()}gerarLinkPortal(){let e=document.getElementById(`selClientePortal`);if(!e||!e.value){i(`Selecione um cliente.`);return}let t=this.dataStore.buscarPorId(`clientes`,e.value);if(!t){i(`Cliente não encontrado.`);return}let n=(this.dataStore.listar(`portais`)||[]).find(e=>e.clienteId===t.id);if(n){if(n.ativo){i(`Este cliente já possui um link ativo.`);return}n.ativo=!0,this.dataStore.salvar(),i(`Link reativado!`),this.rerenderizar(),c();return}let r=`pt_`+Date.now().toString(36)+`_`+Math.random().toString(36).slice(2,8),a={id:`portal_`+Date.now(),clienteId:t.id,clienteNome:t.nome,token:r,ativo:!0,criadoEm:new Date().toISOString(),ultimoAcesso:``};this.dataStore.dados.portais.push(a),this.dataStore.salvar(),i(`Link gerado! Compartilhe com o cliente.`),X.registrar(`criacao`,`Link de portal gerado`,t.nome,`criacao`),this.rerenderizar(),c()}togglePortal(e){let t=this.dataStore.buscarPorId(`portais`,e);t&&(t.ativo=!t.ativo,this.dataStore.salvar(),this.rerenderizar(),c())}removerPortal(e){confirm(`Remover este link de acesso?`)&&(this.dataStore.remover(`portais`,e),this.dataStore.salvar(),this.rerenderizar(),c())}excluirEncomenda(e){confirm(`Excluir esta encomenda permanentemente?`)&&(this.dataStore.remover(`encomendas`,e),i(`Encomenda excluída.`),this.rerenderizar())}aposRenderizar(){this.removerListeners(),document.getElementById(`btnNovaEncomenda`)?.addEventListener(`click`,()=>this.abrirModalForm(null)),document.getElementById(`buscaEncomenda`)?.addEventListener(`input`,e=>{this.busca=e.target.value,this.rerenderizar()}),document.getElementById(`filtroStatusEncomenda`)?.addEventListener(`change`,e=>{this.filtroStatus=e.target.value,this.rerenderizar()}),document.getElementById(`btnPortaisCliente`)?.addEventListener(`click`,()=>this.abrirModalPortais()),document.querySelectorAll(`.btn-editar-enc`).forEach(e=>{e.addEventListener(`click`,()=>{let t=this.dataStore.buscarPorId(`encomendas`,e.dataset.id);t&&this.abrirModalForm(t)})}),document.querySelectorAll(`.btn-atualizar-enc`).forEach(e=>{e.addEventListener(`click`,()=>this.abrirModalAtualizacao(e.dataset.id))}),document.querySelectorAll(`.btn-remover-enc`).forEach(e=>{e.addEventListener(`click`,()=>this.excluirEncomenda(e.dataset.id))})}},me=class{constructor(){this.images=[],this.currentIndex=0,this.isOpen=!1,this.scale=1,this.minScale=.5,this.maxScale=5,this.offsetX=0,this.offsetY=0,this.isDragging=!1,this.dragStart={x:0,y:0},this.dragOffset={x:0,y:0},this.touchStartDistance=0,this.touchStartScale=1,this.swipeStartX=0,this.swipeStartY=0,this.isSwiping=!1,this.autoPlayTimer=null,this.autoPlayInterval=3500,this.zoomBtn=null,this.thumbScrollPos=0,this._onKeyDown=null,this._onMouseMove=null,this._onMouseUp=null,this._onTouchStart=null,this._onTouchMove=null,this._onTouchEnd=null,this._onWheel=null,this.overlay=null}open(e,t=0){!e||e.length===0||(this.images=e,this.currentIndex=Math.max(0,Math.min(t,e.length-1)),this.scale=1,this.offsetX=0,this.offsetY=0,this.isOpen=!0,document.body.style.overflow=`hidden`,this._render(),this._bindEvents(),this._showImage())}close(){this.isOpen&&(this.isOpen=!1,this.stopAutoPlay(),this._unbindEvents(),this.overlay&&this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay),this.overlay=null,document.body.style.overflow=``)}navigate(e){let t=(this.currentIndex+e+this.images.length)%this.images.length;this.currentIndex=t,this.scale=1,this.offsetX=0,this.offsetY=0,this._showImage(),this._updateThumbActive()}zoomIn(){this._setScale(this.scale*1.3)}zoomOut(){this._setScale(this.scale/1.3)}resetZoom(){this._setScale(1),this.offsetX=0,this.offsetY=0,this._applyTransform()}toggleAutoPlay(){this.autoPlayTimer?this.stopAutoPlay():this.startAutoPlay()}startAutoPlay(){if(this.autoPlayTimer||this.images.length<=1)return;this.autoPlayTimer=setInterval(()=>this.navigate(1),this.autoPlayInterval);let e=this.overlay?.querySelector(`.lb-ctrl-autoplay`);e&&(e.textContent=`⏸`,e.classList.add(`ativo`))}stopAutoPlay(){this.autoPlayTimer&&(clearInterval(this.autoPlayTimer),this.autoPlayTimer=null);let e=this.overlay?.querySelector(`.lb-ctrl-autoplay`);e&&(e.textContent=`▶`,e.classList.remove(`ativo`))}_render(){let e=document.querySelector(`.lb-overlay`);e&&e.remove();let t=document.createElement(`div`);t.className=`lb-overlay`,t.innerHTML=`
      <div class="lb-topbar">
        <span class="lb-counter">${this.currentIndex+1} / ${this.images.length}</span>
        <div class="lb-top-actions">
          <button class="lb-btn lb-ctrl-autoplay" title="Slideshow">▶</button>
          <button class="lb-btn lb-ctrl-download" title="Download">⬇</button>
          <button class="lb-btn lb-ctrl-share" title="Compartilhar">🔗</button>
          <button class="lb-btn lb-ctrl-close" title="Fechar (ESC)">✕</button>
        </div>
      </div>
      <div class="lb-main">
        <div class="lb-img-container">
          <img class="lb-img" alt="">
          <div class="lb-loader"></div>
          <div class="lb-caption">
            <div class="lb-caption-title"></div>
            <div class="lb-caption-sub"></div>
          </div>
        </div>
      </div>
      <button class="lb-nav lb-nav-prev" title="Anterior (←)">◀</button>
      <button class="lb-nav lb-nav-next" title="Próximo (→)">▶</button>
      <div class="lb-thumbstrip">
        <div class="lb-thumb-track"></div>
      </div>
      <div class="lb-zoom-indicator">${Math.round(this.scale*100)}%</div>
    `,document.body.appendChild(t),this.overlay=t,t.querySelector(`.lb-ctrl-close`)?.addEventListener(`click`,()=>this.close()),t.querySelector(`.lb-nav-prev`)?.addEventListener(`click`,()=>this.navigate(-1)),t.querySelector(`.lb-nav-next`)?.addEventListener(`click`,()=>this.navigate(1)),t.querySelector(`.lb-ctrl-autoplay`)?.addEventListener(`click`,()=>this.toggleAutoPlay()),t.querySelector(`.lb-ctrl-download`)?.addEventListener(`click`,()=>this._download()),t.querySelector(`.lb-ctrl-share`)?.addEventListener(`click`,()=>this._share()),this._renderThumbs(),t.querySelector(`.lb-main`)?.addEventListener(`dblclick`,e=>{this.scale>1?this.resetZoom():this._setScale(2.5)})}_renderThumbs(){let e=this.overlay?.querySelector(`.lb-thumb-track`);e&&(e.innerHTML=this.images.map((e,t)=>`
      <div class="lb-thumb ${t===this.currentIndex?`ativo`:``}" data-idx="${t}">
        <img src="${e.src}" alt="" loading="lazy">
      </div>
    `).join(``),e.querySelectorAll(`.lb-thumb`).forEach(e=>{e.addEventListener(`click`,()=>{this.currentIndex=parseInt(e.dataset.idx),this.scale=1,this.offsetX=0,this.offsetY=0,this._showImage(),this._updateThumbActive()})}),this._scrollThumbIntoView())}_updateThumbActive(){this.overlay?.querySelectorAll(`.lb-thumb`).forEach(e=>{e.classList.toggle(`ativo`,parseInt(e.dataset.idx)===this.currentIndex)}),this._scrollThumbIntoView();let e=this.overlay?.querySelector(`.lb-counter`);e&&(e.textContent=`${this.currentIndex+1} / ${this.images.length}`)}_scrollThumbIntoView(){let e=this.overlay?.querySelector(`.lb-thumb.ativo`);e&&e.scrollIntoView({behavior:`smooth`,inline:`center`,block:`nearest`})}_showImage(){if(!this.overlay)return;let e=this.images[this.currentIndex],t=this.overlay.querySelector(`.lb-img`),n=this.overlay.querySelector(`.lb-loader`),r=this.overlay.querySelector(`.lb-caption-title`),i=this.overlay.querySelector(`.lb-caption-sub`);if(!t)return;n.style.display=`block`,t.style.opacity=`0`;let a=new Image;a.onload=()=>{t.src=e.src,t.style.opacity=`1`,n&&(n.style.display=`none`),this._applyTransform()},a.onerror=()=>{t.alt=`Erro ao carregar`,t.style.opacity=`1`,n&&(n.style.display=`none`)},a.src=e.src;let o=[];e.title&&o.push(e.title),e.subtitle&&o.push(e.subtitle),r.textContent=o.join(` · `)||``,e.price?i.textContent=e.price:i.textContent=e.caption||``}_applyTransform(){let e=this.overlay?.querySelector(`.lb-img`);if(!e)return;e.style.transform=`translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.scale})`;let t=this.overlay?.querySelector(`.lb-zoom-indicator`);t&&(t.textContent=`${Math.round(this.scale*100)}%`)}_setScale(e){this.scale=Math.max(this.minScale,Math.min(this.maxScale,e)),this.scale<=1&&(this.offsetX=0,this.offsetY=0),this._applyTransform()}_calcZoomCenter(e,t){let n=this.overlay?.querySelector(`.lb-img`);if(!n)return;let r=n.getBoundingClientRect();return{cx:(e-r.left)/r.width,cy:(t-r.top)/r.height}}_download(){let e=this.images[this.currentIndex];if(!e||!e.src)return;let t=document.createElement(`a`);t.href=e.src,t.download=(e.title||`imagem`)+`.jpg`,document.body.appendChild(t),t.click(),document.body.removeChild(t),this._toast(`⬇ Imagem baixada`)}_share(){let e=this.images[this.currentIndex],t=e.title?`${e.title}${e.price?` - `+e.price:``}`:`Minha obra de arte`;navigator.share?navigator.share({title:t,text:t}).catch(()=>{}):navigator.clipboard?navigator.clipboard.writeText(t).then(()=>this._toast(`🔗 Info copiada!`)).catch(()=>{}):this._toast(`📋 `+t)}_toast(e){let t=document.createElement(`div`);t.className=`lb-toast`,t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},2e3)}_bindEvents(){this._onKeyDown=e=>{if(this.isOpen)switch(e.key){case`Escape`:this.close();break;case`ArrowLeft`:this.navigate(-1);break;case`ArrowRight`:this.navigate(1);break;case`+`:case`=`:this.zoomIn();break;case`-`:this.zoomOut();break;case`0`:this.resetZoom();break;case` `:e.preventDefault(),this.toggleAutoPlay();break}},this._onMouseMove=e=>{if(!this.isDragging)return;let t=e.clientX-this.dragStart.x,n=e.clientY-this.dragStart.y;this.offsetX=this.dragOffset.x+t,this.offsetY=this.dragOffset.y+n,this._applyTransform()},this._onMouseUp=()=>{if(this.isSwiping){let e=this.dragStart.x-(this.dragOffset.x+(this.offsetX-this.dragOffset.x));Math.abs(e)>80&&this.navigate(e>0?1:-1)}this.isDragging=!1,this.isSwiping=!1},this._onWheel=e=>{this.isOpen&&(e.preventDefault(),e.deltaY<0?this.zoomIn():this.zoomOut())},window.addEventListener(`keydown`,this._onKeyDown),window.addEventListener(`mousemove`,this._onMouseMove),window.addEventListener(`mouseup`,this._onMouseUp),this.overlay?.addEventListener(`wheel`,this._onWheel,{passive:!1}),this.overlay?.querySelector(`.lb-main`)?.addEventListener(`mousedown`,e=>{e.target.closest(`.lb-caption`)||e.target.closest(`.lb-thumbstrip`)||(this.dragStart={x:e.clientX,y:e.clientY},this.dragOffset={x:this.offsetX,y:this.offsetY},this.isDragging=!0,this.isSwiping=this.scale<=1)}),this.overlay?.querySelector(`.lb-main`)?.addEventListener(`click`,e=>{if(!this.isSwiping&&!this.isDragging){let t=e.currentTarget.getBoundingClientRect(),n=e.clientX-t.left;n<t.width*.3?this.navigate(-1):n>t.width*.7&&this.navigate(1)}}),this._onTouchStart=e=>{if(e.touches.length===1)this.dragStart={x:e.touches[0].clientX,y:e.touches[0].clientY},this.dragOffset={x:this.offsetX,y:this.offsetY},this.swipeStartX=e.touches[0].clientX,this.swipeStartY=e.touches[0].clientY,this.isDragging=!0,this.isSwiping=this.scale<=1;else if(e.touches.length===2){this.isDragging=!1;let t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY;this.touchStartDistance=Math.sqrt(t*t+n*n),this.touchStartScale=this.scale}},this._onTouchMove=e=>{if(this.isOpen){if(e.preventDefault(),e.touches.length===1&&this.isDragging){let t=e.touches[0].clientX-this.dragStart.x,n=e.touches[0].clientY-this.dragStart.y;this.isSwiping&&this.scale,this.offsetX=this.dragOffset.x+t,this.offsetY=this.dragOffset.y+n,this._applyTransform()}else if(e.touches.length===2){let t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY,r=Math.sqrt(t*t+n*n);if(this.touchStartDistance>0){let e=r/this.touchStartDistance;this._setScale(this.touchStartScale*e)}}}},this._onTouchEnd=e=>{if(this.isSwiping&&this.scale<=1){let t=this.swipeStartX-(e.changedTouches[0]?.clientX||this.swipeStartX);Math.abs(t)>60?(this.navigate(t>0?1:-1),this.offsetX=0,this.offsetY=0,this._applyTransform()):(this.offsetX=0,this.offsetY=0,this._applyTransform())}this.isDragging=!1,this.isSwiping=!1},this.overlay?.addEventListener(`touchstart`,this._onTouchStart,{passive:!0}),this.overlay?.addEventListener(`touchmove`,this._onTouchMove,{passive:!1}),this.overlay?.addEventListener(`touchend`,this._onTouchEnd,{passive:!0})}_unbindEvents(){this._onKeyDown&&window.removeEventListener(`keydown`,this._onKeyDown),this._onMouseMove&&window.removeEventListener(`mousemove`,this._onMouseMove),this._onMouseUp&&window.removeEventListener(`mouseup`,this._onMouseUp),this.overlay&&(this._onWheel&&this.overlay.removeEventListener(`wheel`,this._onWheel),this._onTouchStart&&this.overlay.removeEventListener(`touchstart`,this._onTouchStart),this._onTouchMove&&this.overlay.removeEventListener(`touchmove`,this._onTouchMove),this._onTouchEnd&&this.overlay.removeEventListener(`touchend`,this._onTouchEnd)),this._onKeyDown=null,this._onMouseMove=null,this._onMouseUp=null,this._onWheel=null,this._onTouchStart=null,this._onTouchMove=null,this._onTouchEnd=null}},A=null;function j(e,t=0){return A||(A=new me),A.open(e,t),A}var he=class extends D{constructor(e,t){super(e,t),this.abaAtiva=`exportar`,this.previewData=null,this.arquivoCarregado=null}render(){return`
      <div class="view-cabecalho">
        <div>
          <h2>📦 Exportar / Importar Dados</h2>
          <p class="subtitulo">Backup completo, exportação seletiva e restauração</p>
        </div>
      </div>
      <div class="ei-tabs">
        <button class="ei-tab ${this.abaAtiva===`exportar`?`ativo`:``}" data-ei-tab="exportar">📤 Exportar</button>
        <button class="ei-tab ${this.abaAtiva===`importar`?`ativo`:``}" data-ei-tab="importar">📥 Importar</button>
        <button class="ei-tab ${this.abaAtiva===`historico`?`ativo`:``}" data-ei-tab="historico">🕐 Histórico</button>
      </div>
      <div class="ei-painel">${this.renderPainel()}</div>
    `}renderPainel(){return this.abaAtiva===`exportar`?this.renderExportar():this.abaAtiva===`importar`?this.renderImportar():this.renderHistorico()}renderExportar(){let e=[`obras`,`clientes`,`vendas`,`encomendas`,`contatosProfissionais`,`interacoes`,`eventos`,`financas`],t={};e.forEach(e=>{t[e]=(this.dataStore.listar(e)||[]).length});let n=Object.values(t).reduce((e,t)=>e+t,0),r=e.map(e=>`
        <div class="ei-colecao-card" data-colecao="${e}">
          <div class="eicc-header"><span class="eicc-icone">${{obras:`🖼️ Obras`,clientes:`👤 Clientes`,vendas:`💰 Vendas`,encomendas:`📦 Encomendas`,contatosProfissionais:`🤝 Contatos`,interacoes:`💬 Interações`,eventos:`🎪 Eventos`,financas:`📈 Finanças`}[e]||e}</span><span class="eicc-nome">${e}</span></div>
          <div class="eicc-qtd">${t[e]} registros</div>
          <div class="eicc-acoes">
            <button class="btn-miniatura ei-export-json" data-colecao="${e}" title="Exportar JSON">📋 JSON</button>
            <button class="btn-miniatura ei-export-csv" data-colecao="${e}" title="Exportar CSV">📊 CSV</button>
          </div>
        </div>
      `).join(``);return`
      <div class="ei-export-grid">
        <div class="ei-secao-destaque">
          <div class="ei-destaque-icon">💾</div>
          <div class="ei-destaque-info">
            <h3>Backup Completo</h3>
            <p>Exporta todos os dados do CRM em um único arquivo JSON.</p>
            <p style="font-size:0.8rem;color:var(--text-muted);">${n} registros · ${Object.keys(t).length} coleções</p>
          </div>
          <button class="btn-primario" id="eiBackupCompleto">📥 Exportar Tudo</button>
        </div>
        <div class="ei-secao">
          <h3 style="margin-bottom:12px;">Exportar por Coleção</h3>
          <div class="ei-cards-grid">${r}</div>
        </div>
      </div>
    `}renderImportar(){return`
      <div class="ei-import-area" id="eiDropZone">
        <div class="ei-drop-content">
          <div class="ei-drop-icon">📥</div>
          <p><strong>Arraste um arquivo JSON</strong> ou clique para selecionar</p>
          <p style="font-size:0.8rem;color:var(--text-muted);">Formatos aceitos: backup completo (.json) ou exportação parcial</p>
        </div>
        <input type="file" id="eiFileInput" accept=".json" style="display:none;">
      </div>
      <div id="eiPreviewContainer">${this.previewData&&this.arquivoCarregado?this.renderPreview():``}</div>
    `}renderPreview(){if(!this.previewData||!this.previewData.valido)return`<div class="ei-preview-box ei-preview-erro"><span>❌</span> Arquivo inválido: ${this.previewData?.erro||`formato não reconhecido`}</div>`;let e=this.previewData.colecoes.map(e=>`<tr><td>${e.nome}</td><td>${e.quantidade}</td><td>${e.quantidade>0?`🆕 Novos dados`:`—`}</td></tr>`).join(``),t=this.previewData.tipo===`completo`;return`
      <div class="ei-preview-box">
        <div class="ei-preview-header">
          <span class="ei-preview-badge ${t?`ei-bg-azul`:`ei-bg-verde`}">${t?`Backup Completo`:`Dados Parciais`}</span>
          <span style="color:var(--text-muted);font-size:0.85rem;">${this.arquivoCarregado}</span>
        </div>
        <table class="ei-preview-tabela">
          <thead><tr><th>Coleção</th><th>Registros</th><th>Ação</th></tr></thead>
          <tbody>${e}</tbody>
        </table>
        <div class="ei-import-opcoes">
          <label class="ei-checkbox"><input type="radio" name="eiModo" value="substituir" checked> Substituir dados existentes</label>
          <label class="ei-checkbox"><input type="radio" name="eiModo" value="mesclar"> Mesclar com dados existentes (mantém IDs duplicados)</label>
        </div>
        <div class="ei-import-acoes">
          <button class="btn-primario" id="eiConfirmarImport">✅ Confirmar Importação</button>
          <button class="btn-secundario" id="eiCancelarImport">Cancelar</button>
        </div>
      </div>
    `}renderHistorico(){let e=this.dataStore.obterHistoricoExport()||[];if(e.length===0)return`<div class="estado-vazio"><div class="icone-vazio">🕐</div><p>Nenhum backup exportado ainda.</p></div>`;let t=e.map((e,t)=>{let n=e.tamanho>1024?`${(e.tamanho/1024).toFixed(1)} KB`:`${e.tamanho} B`;return`
        <tr>
          <td>${r(e.data)}</td>
          <td><span class="tag-status" style="background:var(--accent)15;color:var(--accent);">${typeof e.tipo==`string`?e.tipo:`completo`}</span></td>
          <td>${n}</td>
        </tr>
      `}).join(``);return`
      <div class="ei-historico">
        <p style="margin-bottom:12px;color:var(--text-muted);font-size:0.85rem;">Últimos ${e.length} backups exportados.</p>
        <div class="tabela-wrapper">
          <table>
            <thead><tr><th>Data</th><th>Tipo</th><th>Tamanho</th></tr></thead>
            <tbody>${t}</tbody>
          </table>
        </div>
      </div>
    `}aposRenderizar(){this.configurarTabs(),this.configurarExportar(),this.configurarImportar(),this.configurarHistorico()}configurarTabs(){document.querySelectorAll(`.ei-tab`).forEach(e=>{e.addEventListener(`click`,()=>{this.abaAtiva=e.dataset.eiTab;let t=document.querySelector(`.ei-painel`);t&&(t.innerHTML=this.renderPainel(),this.aposRenderizar())})})}configurarExportar(){document.getElementById(`eiBackupCompleto`)?.addEventListener(`click`,()=>{this.dataStore.exportarBackup()}),document.querySelectorAll(`.ei-export-json`).forEach(e=>{e.addEventListener(`click`,()=>{this.dataStore.exportarColecao(e.dataset.colecao)})}),document.querySelectorAll(`.ei-export-csv`).forEach(e=>{e.addEventListener(`click`,()=>{this.exportarCSV(e.dataset.colecao)})})}exportarCSV(e){let t=this.dataStore.listar(e)||[];if(t.length===0){i(`Nenhum registro para exportar.`,`erro`);return}let n=Object.keys(t[0]).filter(e=>!e.startsWith(`_`)),r=t.map(e=>n.map(t=>{let n=e[t];if(n==null)return``;let r=String(n);return r.includes(`,`)||r.includes(`"`)||r.includes(`
`)?`"${r.replace(/"/g,`""`)}"`:r}).join(`,`)),a=[n.join(`,`),...r].join(`
`),o=new Blob([`﻿`+a],{type:`text/csv;charset=utf-8`}),s=URL.createObjectURL(o),c=document.createElement(`a`);c.href=s,c.download=`atelier-crm-${e}-${new Date().toISOString().replace(/[:.]/g,`-`)}.csv`,document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(s),this.dataStore.salvarHistoricoExport(e,{tipo:`csv`,tamanho:a.length}),i(`📊 CSV exportado: ${t.length} registros`,`sucesso`)}configurarImportar(){let e=document.getElementById(`eiDropZone`),t=document.getElementById(`eiFileInput`);e&&(e.addEventListener(`click`,()=>t.click()),e.addEventListener(`dragover`,t=>{t.preventDefault(),e.classList.add(`ei-drop-over`)}),e.addEventListener(`dragleave`,()=>{e.classList.remove(`ei-drop-over`)}),e.addEventListener(`drop`,t=>{t.preventDefault(),e.classList.remove(`ei-drop-over`);let n=t.dataTransfer.files[0];n&&this.processarArquivo(n)}),t.addEventListener(`change`,()=>{t.files[0]&&this.processarArquivo(t.files[0])}))}processarArquivo(e){if(!e.name.endsWith(`.json`)){i(`Apenas arquivos .json são suportados.`,`erro`);return}let t=new FileReader;t.onload=t=>{let n=t.target.result,r=this.dataStore.previewImport(n);this.previewData=r,this.arquivoCarregado=e.name;let i=document.getElementById(`eiPreviewContainer`);i&&(i.innerHTML=this.renderPreview(),this.configurarAcoesImport(n))},t.readAsText(e)}configurarAcoesImport(e){document.getElementById(`eiConfirmarImport`)?.addEventListener(`click`,()=>{document.querySelector(`input[name="eiModo"]:checked`)?.value;let t=this.dataStore.importarBackup(e);if(t.sucesso){i(`✅ Dados importados com sucesso (${t.tipo})`,`sucesso`),this.previewData=null,this.arquivoCarregado=null;let e=document.getElementById(`eiPreviewContainer`);e&&(e.innerHTML=``),this.router&&this.router.navegar(this.router.viewAtual)}else i(`❌ Erro na importação: ${t.erro}`,`erro`)}),document.getElementById(`eiCancelarImport`)?.addEventListener(`click`,()=>{this.previewData=null,this.arquivoCarregado=null;let e=document.getElementById(`eiPreviewContainer`);e&&(e.innerHTML=``)})}configurarHistorico(){}},ge=class extends D{constructor(e,t){super(e,t),this.busca=``}render(){let e=this.filtrarExposicoes(),t=this.dataStore.listar(`exposicoes`)||[],n=t.filter(e=>e.status!==`encerrada`).length,i=e.map(e=>`
      <tr>
        <td><strong>${B(e.nome)||`-`}</strong></td>
        <td>${B(e.local)||`-`}</td>
        <td>${r(e.data)}</td>
        <td><span class="tag-status ${e.status===`confirmada`?`exposicao`:e.status===`encerrada`?`vendida`:``}" style="background:${e.status===`confirmada`?`#16a34a20`:e.status===`encerrada`?`#6b728020`:`#f59e0b20`};color:${e.status===`confirmada`?`#16a34a`:e.status===`encerrada`?`#6b7280`:`#f59e0b`};">${e.status||`planejada`}</span></td>
        <td class="acoes-linha-tabela">
          <button class="btn-icone-tabela" data-editar-expo="${e.id}" title="Editar">✏️</button>
          <button class="btn-icone-tabela" data-excluir-expo="${e.id}" title="Excluir" style="color:#dc2626;">🗑️</button>
        </td>
      </tr>
    `).join(``);return`
      <div class="view-cabecalho">
        <div>
          <h2>Exposicoes</h2>
          <p class="subtitulo">${t.length} exposicao${t.length===1?``:`es`} · ${n} ativa${n===1?``:`s`}</p>
        </div>
        <button class="btn-gradient" id="btnNovaExposicao">✚ Nova Exposicao</button>
      </div>
      <div class="catalogo-filtros">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="buscaExposicao" placeholder="Nome ou local..." value="${B(this.busca)}">
        </div>
      </div>
      ${e.length?`
      <div class="tabela-wrapper">
        <table>
          <thead><tr><th>Nome</th><th>Local</th><th>Data</th><th>Status</th><th></th></tr></thead>
          <tbody>${i}</tbody>
        </table>
      </div>`:`
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio">🖼️</div><p>Nenhuma exposicao encontrada.</p></div>
      </div>`}
    `}filtrarExposicoes(){let e=this.dataStore.listar(`exposicoes`)||[];if(this.busca){let t=this.busca.toLowerCase();e=e.filter(e=>(e.nome||``).toLowerCase().includes(t)||(e.local||``).toLowerCase().includes(t))}return e.sort((e,t)=>new Date(t.data||0)-new Date(e.data||0))}abrirFormExposicao(e){let t=e||{};s(`
      <h3>${t.id?`✏️ Editar`:`✚ Nova`} Exposicao</h3>
      <form id="formExposicao">
        <div class="campo-form"><label>Nome *</label><input type="text" id="expoNome" value="${B(t.nome||``)}" required style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Local</label><input type="text" id="expoLocal" value="${B(t.local||``)}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Data</label><input type="date" id="expoData" value="${t.data||new Date().toISOString().slice(0,10)}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form">
          <label>Status</label>
          <select id="expoStatus" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
            <option value="planejada" ${t.status===`planejada`||!t.status?`selected`:``}>Planejada</option>
            <option value="confirmada" ${t.status===`confirmada`?`selected`:``}>Confirmada</option>
            <option value="encerrada" ${t.status===`encerrada`?`selected`:``}>Encerrada</option>
          </select>
        </div>
        <div class="campo-form"><label>Descricao</label><textarea id="expoDescricao" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:60px;background:var(--bg);color:var(--text);">${B(t.descricao||``)}</textarea></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarExpo">Cancelar</button>
          <button type="submit" class="btn-primario">${t.id?`Salvar`:`Criar`}</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarExpo`)?.addEventListener(`click`,c),document.getElementById(`formExposicao`)?.addEventListener(`submit`,e=>{e.preventDefault(),this.salvarExposicao(t)})}salvarExposicao(e){let t={nome:document.getElementById(`expoNome`)?.value?.trim()||``,local:document.getElementById(`expoLocal`)?.value?.trim()||``,data:document.getElementById(`expoData`)?.value||``,status:document.getElementById(`expoStatus`)?.value||`planejada`,descricao:document.getElementById(`expoDescricao`)?.value?.trim()||``};if(!t.nome){i(`Preencha o nome da exposicao.`);return}e&&e.id?(this.dataStore.atualizar(`exposicoes`,e.id,t),i(`Exposicao atualizada!`)):(this.dataStore.adicionar(`exposicoes`,t),i(`Exposicao criada!`)),c(),this.rerenderizar()}excluirExposicao(e){confirm(`Excluir esta exposicao permanentemente?`)&&(this.dataStore.remover(`exposicoes`,e),i(`Exposicao excluida.`),this.rerenderizar())}aposRenderizar(){this.removerListeners(),document.getElementById(`btnNovaExposicao`)?.addEventListener(`click`,()=>this.abrirFormExposicao(null)),document.getElementById(`buscaExposicao`)?.addEventListener(`input`,e=>{this.busca=e.target.value,this.rerenderizar()}),document.querySelectorAll(`[data-editar-expo]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=this.dataStore.buscarPorId(`exposicoes`,e.dataset.editarExpo);t&&this.abrirFormExposicao(t)})}),document.querySelectorAll(`[data-excluir-expo]`).forEach(e=>{e.addEventListener(`click`,()=>this.excluirExposicao(e.dataset.excluirExpo))})}rerenderizar(){let e=document.getElementById(`viewPrincipal`);e&&(this.removerListeners(),e.innerHTML=this.render(),this.aposRenderizar())}},_e=class extends D{constructor(e,t){super(e,t),this.filtroTipo=``,this.busca=``}render(){let e=this.filtrarTransacoes(),t=this.dataStore.listar(`transacoes`)||[],i=t.filter(e=>e.tipo===`entrada`).reduce((e,t)=>e+Number(t.valor||0),0),a=t.filter(e=>e.tipo===`saida`).reduce((e,t)=>e+Number(t.valor||0),0),o=i-a,s=e.map(e=>`
      <tr>
        <td>${V(e.descricao)}</td>
        <td><span class="tag-status ${e.tipo===`entrada`?`vendida`:``}" style="background:${e.tipo===`entrada`?`#16a34a20`:`#dc262620`};color:${e.tipo===`entrada`?`#16a34a`:`#dc2626`};">${e.tipo===`entrada`?`💰 Entrada`:`💸 Saida`}</span></td>
        <td style="font-weight:600;color:${e.tipo===`entrada`?`#16a34a`:`#dc2626`};">${e.tipo===`entrada`?`+`:`-`}${n(e.valor)}</td>
        <td>${r(e.data)}</td>
        <td class="acoes-linha-tabela">
          <button class="btn-icone-tabela" data-excluir-transacao="${e.id}" title="Excluir">🗑️</button>
        </td>
      </tr>
    `).join(``),c=[...new Set(t.map(e=>e.categoria).filter(Boolean))],l=c.map(e=>{let r=t.filter(t=>t.categoria===e).reduce((e,t)=>e+Number(t.valor||0),0),o=i+a>0?Math.round(r/(i+a)*100):0;return`<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.8rem;border-bottom:1px solid var(--border);"><span>${B(e)}</span><span style="font-weight:600;">${n(r)} (${o}%)</span></div>`}).join(``),u=e.length?`
      <div class="tabela-wrapper" style="margin-top:16px;">
        <table>
          <thead><tr><th>Descricao</th><th>Tipo</th><th>Valor</th><th>Data</th><th></th></tr></thead>
          <tbody>${s}</tbody>
        </table>
      </div>
    `:`
      <div class="tabela-wrapper" style="margin-top:16px;">
        <div class="estado-vazio"><div class="icone-vazio">📊</div><p>Nenhuma transacao encontrada.</p></div>
      </div>
    `;return`
      <div class="view-cabecalho">
        <div>
          <h2>Financeiro</h2>
          <p class="subtitulo">${t.length} transacao${t.length===1?``:`es`} · ${n(i)} entradas · ${n(a)} saidas</p>
        </div>
        <button class="btn-gradient" id="btnNovaTransacao">✚ Nova Transacao</button>
      </div>
      <div class="grid-cards">
        <div class="card"><div class="rotulo-card" style="color:#16a34a;">💰 Entradas</div><div class="valor-card">${n(i)}</div></div>
        <div class="card"><div class="rotulo-card" style="color:#dc2626;">💸 Saidas</div><div class="valor-card">${n(a)}</div></div>
        <div class="card"><div class="rotulo-card">🏦 Saldo</div><div class="valor-card" style="color:${o>=0?`#16a34a`:`#dc2626`};">${n(o)}</div></div>
      </div>
      ${c.length?`<div class="card" style="margin-top:12px;padding:12px 16px;"><h4 style="margin:0 0 6px;font-size:0.82rem;">Categorias</h4>${l}</div>`:``}
      <div class="catalogo-filtros" style="margin-top:12px;">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="buscaTransacao" placeholder="Descricao..." value="${B(this.busca)}">
        </div>
        <div class="campo-filtro">
          <label>Tipo</label>
          <select id="filtroTipoTransacao">
            <option value="">Todos</option>
            <option value="entrada" ${this.filtroTipo===`entrada`?`selected`:``}>Entrada</option>
            <option value="saida" ${this.filtroTipo===`saida`?`selected`:``}>Saida</option>
          </select>
        </div>
      </div>
      ${u}
    `}filtrarTransacoes(){let e=this.dataStore.listar(`transacoes`)||[];if(this.filtroTipo&&(e=e.filter(e=>e.tipo===this.filtroTipo)),this.busca){let t=this.busca.toLowerCase();e=e.filter(e=>(e.descricao||``).toLowerCase().includes(t))}return e.sort((e,t)=>new Date(t.data||0)-new Date(e.data||0))}abrirFormTransacao(e){let t=e||{};s(`
      <h3>${t.id?`✏️ Editar`:`✚ Nova`} Transacao</h3>
      <form id="formTransacao">
        <div class="campo-form"><label>Descricao *</label><input type="text" id="transDescricao" value="${B(t.descricao||``)}" required style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Tipo *</label>
            <select id="transTipo" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
              <option value="entrada" ${t.tipo===`entrada`||!t.tipo?`selected`:``}>💰 Entrada</option>
              <option value="saida" ${t.tipo===`saida`?`selected`:``}>💸 Saida</option>
            </select>
          </div>
          <div><label>Valor (R$) *</label><input type="number" id="transValor" value="${t.valor||``}" min="0" step="0.01" required style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Data</label><input type="date" id="transData" value="${t.data||new Date().toISOString().slice(0,10)}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Categoria</label>
            <select id="transCategoria" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
              <option value="">— Selecione —</option>
              ${[`Venda`,`Comissao`,`Material`,`Inscricao`,`Frete`,`Embalagem`,`Ferramenta`,`Assinatura`,`Outro`].map(e=>`<option value="${e}" ${t.categoria===e?`selected`:``}>${e}</option>`).join(``)}
            </select>
          </div>
        </div>
        <div class="campo-form"><label>Notas</label><textarea id="transNotas" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:50px;background:var(--bg);color:var(--text);">${B(t.notas||``)}</textarea></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarTrans">Cancelar</button>
          <button type="submit" class="btn-primario">${t.id?`Salvar`:`Adicionar`}</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarTrans`)?.addEventListener(`click`,c),document.getElementById(`formTransacao`)?.addEventListener(`submit`,e=>{e.preventDefault(),this.salvarTransacao(t)})}salvarTransacao(e){let t={descricao:document.getElementById(`transDescricao`)?.value?.trim()||``,tipo:document.getElementById(`transTipo`)?.value||`entrada`,valor:Number(document.getElementById(`transValor`)?.value)||0,data:document.getElementById(`transData`)?.value||new Date().toISOString().slice(0,10),categoria:document.getElementById(`transCategoria`)?.value||``,notas:document.getElementById(`transNotas`)?.value?.trim()||``};if(!t.descricao||!t.valor){i(`Preencha descricao e valor.`);return}e&&e.id?(this.dataStore.atualizar(`transacoes`,e.id,t),i(`Transacao atualizada!`)):(this.dataStore.adicionar(`transacoes`,t),i(`Transacao adicionada!`)),c(),this.rerenderizar()}excluirTransacao(e){confirm(`Excluir esta transacao?`)&&(this.dataStore.remover(`transacoes`,e),i(`Transacao excluida.`),this.rerenderizar())}aposRenderizar(){this.removerListeners(),document.getElementById(`btnNovaTransacao`)?.addEventListener(`click`,()=>this.abrirFormTransacao(null)),document.getElementById(`buscaTransacao`)?.addEventListener(`input`,e=>{this.busca=e.target.value,this.rerenderizar()}),document.getElementById(`filtroTipoTransacao`)?.addEventListener(`change`,e=>{this.filtroTipo=e.target.value,this.rerenderizar()}),document.querySelectorAll(`[data-excluir-transacao]`).forEach(e=>{e.addEventListener(`click`,()=>this.excluirTransacao(e.dataset.excluirTransacao))})}rerenderizar(){let e=document.getElementById(`viewPrincipal`);e&&(this.removerListeners(),e.innerHTML=this.render(),this.aposRenderizar())}},ve=class extends D{constructor(e,t){super(e,t)}_salvar(){let e=document.getElementById(`cfgNome`).value.trim(),t=document.getElementById(`cfgEmail`).value.trim(),n=document.getElementById(`cfgTelefone`).value.trim();z().artista={nome:e,email:t,telefone:n},z().textoGarantia=document.getElementById(`cfgTextoGarantia`).value.trim();let r=document.getElementById(`cfgIdioma`);r&&(z().idioma=r.value,window.AtelierCRMTranslations&&(window.AtelierCRMTranslations.locale=r.value));let a=document.getElementById(`cfgAltoContraste`);a&&(z().altoContraste=a.checked,document.body.setAttribute(`data-high-contrast`,a.checked));let o=document.getElementById(`cfgTamanhoFonte`);o&&(z().tamanhoFonte=o.value,document.body.setAttribute(`data-font-size`,o.value));let s=document.getElementById(`cfgGoogleClientId`);s&&(z().syncGoogleClientId=s.value.trim());let c=document.getElementById(`cfgWebDAVUrl`);c&&(z().syncWebDAVUrl=c.value.trim());let l=document.getElementById(`cfgWebDAVUser`);l&&(z().syncWebDAVUser=l.value.trim());let u=document.getElementById(`cfgWebDAVPass`);u&&(z().syncWebDAVPass=u.value.trim());let d=document.getElementById(`cfgAutoSync`);d&&(z().syncAutoBackup=d.checked);let f=document.getElementById(`cfgSyncInterval`);f&&(z().syncAutoBackupInterval=Number(f.value)||30),z().salvar(),i(`Configurações salvas com sucesso!`)}_salvarPin(){let e=document.getElementById(`cfgPin`)?.value;e&&e.length===4&&/^\d{4}$/.test(e)?(z().pin=e,z().salvar(),i(`PIN salvo com sucesso!`),document.getElementById(`cfgPin`).value=``):i(`Digite um PIN de 4 dígitos.`)}_removerPin(){confirm(`Remover o PIN de acesso?`)&&(z().pin=``,z().autoLock=!1,z().salvar(),i(`PIN removido.`),this.router.viewAtual===`configuracoes`&&this.router.navegar(`configuracoes`))}render(){let e=z().artista||{},t=z().textoGarantia||``,n=z().idioma||`pt-BR`,i=z().altoContraste||!1,a=z().tamanhoFonte||`medio`,o=z().pin||``,s=z(),c=s.syncLastBackup?r(s.syncLastBackup):`Nunca`;return`
      <div class="view-cabecalho">
        <div>
          <h2>Configurações</h2>
          <p class="subtitulo">Dados do artista e preferências do sistema</p>
        </div>
      </div>
      <div class="painel" style="max-width:560px">
        <h3>👤 Perfil do Artista</h3>
        <div class="campo-form">
          <label>Nome / Nome do Ateliê</label>
          <input type="text" id="cfgNome" value="${B(e.nome||``)}">
        </div>
        <div class="campo-form">
          <label>E-mail</label>
          <input type="email" id="cfgEmail" value="${B(e.email||``)}">
        </div>
        <div class="campo-form">
          <label>Telefone</label>
          <input type="text" id="cfgTelefone" value="${B(e.telefone||``)}">
        </div>
        <div class="campo-form">
          <label>Texto de garantia/autenticidade (usado nos recibos e propostas)</label>
          <textarea id="cfgTextoGarantia" style="min-height:110px;">${B(t)}</textarea>
        </div>
      </div>
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3>🌐 Idioma</h3>
        <div class="campo-form">
          <label>Idioma da interface</label>
          <select id="cfgIdioma">${[{v:`pt-BR`,r:`🇧🇷 Português (BR)`},{v:`en-US`,r:`🇺🇸 English (US)`},{v:`es`,r:`🇪🇸 Español`},{v:`fr`,r:`🇫🇷 Français`},{v:`it`,r:`🇮🇹 Italiano`}].map(e=>`<option value="${e.v}" ${n===e.v?`selected`:``}>${e.r}</option>`).join(``)}</select>
        </div>
      </div>
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3>♿ Acessibilidade</h3>
        <div class="campo-form">
          <label><input type="checkbox" id="cfgAltoContraste" ${i?`checked`:``}> 🔒 Alto contraste</label>
        </div>
        <div class="campo-form">
          <label>Tamanho da fonte</label>
          <select id="cfgTamanhoFonte">
            <option value="pequeno" ${a===`pequeno`?`selected`:``}>Pequeno</option>
            <option value="medio" ${a===`medio`?`selected`:``}>Médio</option>
            <option value="grande" ${a===`grande`?`selected`:``}>Grande</option>
          </select>
        </div>
      </div>
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3>🔐 Segurança</h3>
        <div class="campo-form">
          <label>PIN de acesso (4 dígitos) ${o?`🔒 Ativo`:`❌ Desativado`}</label>
          <div style="display:flex;gap:8px;">
            <input type="password" id="cfgPin" maxlength="4" pattern="[0-9]*" inputmode="numeric" placeholder="****" style="width:100px;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:1.2rem;text-align:center;background:var(--bg);color:var(--text);letter-spacing:4px;">
            <button class="btn-secundario" id="btnSalvarPin" style="font-size:0.8rem;padding:6px 14px;">${o?`Alterar`:`Ativar`} PIN</button>
            ${o?`<button class="btn-secundario" id="btnRemoverPin" style="font-size:0.8rem;padding:6px 14px;color:#dc2626;">Remover PIN</button>`:``}
          </div>
        </div>
        <div class="campo-form">
          <label><input type="checkbox" id="cfgAutoLock" ${z().autoLock?`checked`:``}> 🔐 Bloquear automaticamente após inatividade</label>
        </div>
      </div>

      <!-- Sincronização -->
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3>☁️ Sincronização na Nuvem</h3>
        <p class="texto-ajuda" style="margin-bottom:12px;">Último backup: ${c}</p>

        <div class="sync-tabs" style="display:flex;gap:4px;margin-bottom:12px;">
          <button class="sync-tab ativo" data-sync-tab="indexeddb">💾 Local (IDB)</button>
          <button class="sync-tab" data-sync-tab="googledrive">☁️ Google Drive</button>
          <button class="sync-tab" data-sync-tab="webdav">📁 WebDAV</button>
        </div>

        <div class="sync-panel" id="syncPanelIndexedDB">
          <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:8px;">Snapshots salvos no navegador (IndexedDB — sem limite de espaço).</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn-secundario" id="btnIDBSnapshot">💾 Tirar Snapshot</button>
            <button class="btn-secundario" id="btnIDBListar">📋 Listar Snapshots</button>
          </div>
          <div id="idbSnapshotList" style="margin-top:8px;"></div>
        </div>

        <div class="sync-panel" id="syncPanelGoogleDrive" style="display:none;">
          <div class="campo-form">
            <label>Google Drive Client ID (OAuth 2.0)</label>
            <input type="text" id="cfgGoogleClientId" value="${B(s.syncGoogleClientId||``)}" placeholder="123456789-xxxxx.apps.googleusercontent.com" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;width:100%;background:var(--bg);color:var(--text);">
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
            <button class="btn-secundario" id="btnGoogleAuth">🔑 Autenticar</button>
            <button class="btn-secundario" id="btnGoogleBackup">☁️ Fazer Backup</button>
            <button class="btn-secundario" id="btnGoogleListar">📋 Listar Backups</button>
          </div>
          <div id="googleBackupList" style="margin-top:8px;"></div>
        </div>

        <div class="sync-panel" id="syncPanelWebDAV" style="display:none;">
          <div class="campo-form">
            <label>URL do servidor WebDAV</label>
            <input type="url" id="cfgWebDAVUrl" value="${B(s.syncWebDAVUrl||``)}" placeholder="https://meu-servidor.com/remote.php/dav/files/usuario/" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;width:100%;background:var(--bg);color:var(--text);">
          </div>
          <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div><label>Usuário</label><input type="text" id="cfgWebDAVUser" value="${B(s.syncWebDAVUser||``)}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;width:100%;background:var(--bg);color:var(--text);"></div>
            <div><label>Senha</label><input type="password" id="cfgWebDAVPass" value="${B(s.syncWebDAVPass||``)}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;width:100%;background:var(--bg);color:var(--text);"></div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
            <button class="btn-secundario" id="btnWebDAVTest">🔗 Testar Conexão</button>
            <button class="btn-secundario" id="btnWebDAVBackup">☁️ Fazer Backup</button>
            <button class="btn-secundario" id="btnWebDAVListar">📋 Listar Backups</button>
          </div>
          <div id="webdavBackupList" style="margin-top:8px;"></div>
        </div>

        <div class="campo-form" style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);">
          <label><input type="checkbox" id="cfgAutoSync" ${s.syncAutoBackup?`checked`:``}> 🔄 Backup automático no IndexedDB</label>
          <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
            <span style="font-size:0.75rem;color:var(--text-muted);">A cada</span>
            <select id="cfgSyncInterval" style="padding:4px 8px;border:1px solid var(--border);border-radius:4px;font-size:0.8rem;background:var(--bg);color:var(--text);">
              ${[5,10,15,30,60,120].map(e=>`<option value="${e}" ${(s.syncAutoBackupInterval||30)===e?`selected`:``}>${e} min</option>`).join(``)}
            </select>
          </div>
        </div>
      </div>

      <button class="btn-primario" id="btnSalvarConfig" style="margin-top:16px;">Salvar Configurações</button>
    `}aposRenderizar(){this.removerListeners();let e=document.getElementById(`btnSalvarConfig`);if(e){let t=()=>this._salvar();e.addEventListener(`click`,t),this._bindCache.btnSalvarConfig={el:e,handler:t,type:`click`}}let t=document.getElementById(`btnSalvarPin`);if(t){let e=()=>this._salvarPin();t.addEventListener(`click`,e),this._bindCache.btnSalvarPin={el:t,handler:e,type:`click`}}let n=document.getElementById(`btnRemoverPin`);if(n){let e=()=>this._removerPin();n.addEventListener(`click`,e),this._bindCache.btnRemoverPin={el:n,handler:e,type:`click`}}document.querySelectorAll(`.sync-tab`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.sync-tab`).forEach(e=>e.classList.remove(`ativo`)),e.classList.add(`ativo`),document.querySelectorAll(`.sync-panel`).forEach(e=>e.style.display=`none`);let t=document.getElementById(`syncPanel`+e.dataset.syncTab.replace(`g`,`G`).replace(`i`,`I`).replace(`w`,`W`));t&&(t.style.display=`block`)})}),document.getElementById(`btnIDBSnapshot`)?.addEventListener(`click`,()=>{$.salvarSnapshotIDB().then(()=>this._mostrarIDBSnapshots())}),document.getElementById(`btnIDBListar`)?.addEventListener(`click`,()=>this._mostrarIDBSnapshots()),document.getElementById(`btnGoogleAuth`)?.addEventListener(`click`,()=>$.autenticarGoogle()),document.getElementById(`btnGoogleBackup`)?.addEventListener(`click`,()=>$.backupGoogle()),document.getElementById(`btnGoogleListar`)?.addEventListener(`click`,()=>this._listarGoogle()),document.getElementById(`btnWebDAVTest`)?.addEventListener(`click`,async()=>{this._salvar(),i(await $.testarWebDAV()?`✅ Conexão WebDAV OK!`:`❌ Falha na conexão WebDAV`)}),document.getElementById(`btnWebDAVBackup`)?.addEventListener(`click`,()=>$.backupWebDAV()),document.getElementById(`btnWebDAVListar`)?.addEventListener(`click`,()=>this._listarWebDAV())}async _mostrarIDBSnapshots(){let e=document.getElementById(`idbSnapshotList`);if(e){e.innerHTML=`<span style="color:var(--text-muted);font-size:0.8rem;">Carregando...</span>`;try{let t=await $.listarSnapshotsIDB();if(t.length===0){e.innerHTML=`<span style="color:var(--text-muted);font-size:0.8rem;">Nenhum snapshot encontrado.</span>`;return}e.innerHTML=`
        <div style="max-height:200px;overflow-y:auto;">
          ${t.map(e=>`
            <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:var(--bg);border-radius:4px;margin-bottom:4px;border:1px solid var(--border);">
              <span style="font-size:0.75rem;color:var(--text);">${e.label||e.timestamp}</span>
              <span style="font-size:0.7rem;color:var(--text-muted);">${new Date(e.timestamp).toLocaleString(`pt-BR`)}</span>
              <span>
                <button class="btn-miniatura btn-restaurar-idb" data-id="${e.id}" title="Restaurar">↩️</button>
                <button class="btn-miniatura btn-remover-idb" data-id="${e.id}" title="Excluir" style="color:#dc2626;">🗑️</button>
              </span>
            </div>
          `).join(``)}
        </div>
      `,e.querySelectorAll(`.btn-restaurar-idb`).forEach(e=>{e.addEventListener(`click`,()=>$.restaurarSnapshotIDB(Number(e.dataset.id)).then(()=>{this.router.viewAtual===`configuracoes`&&this.router.navegar(`configuracoes`)}))}),e.querySelectorAll(`.btn-remover-idb`).forEach(e=>{e.addEventListener(`click`,async()=>{await $.removerSnapshotIDB(Number(e.dataset.id)),this._mostrarIDBSnapshots()})})}catch(t){e.innerHTML=`<span style="color:#dc2626;font-size:0.8rem;">Erro ao carregar: `+t.message+`</span>`}}}async _listarGoogle(){let e=document.getElementById(`googleBackupList`);if(!e)return;e.innerHTML=`<span style="color:var(--text-muted);font-size:0.8rem;">Carregando...</span>`;let t=await $.listarBackupsGoogle();if(t.length===0){e.innerHTML=`<span style="color:var(--text-muted);font-size:0.8rem;">Nenhum backup no Google Drive.</span>`;return}e.innerHTML=`
      <div style="max-height:200px;overflow-y:auto;">
        ${t.map(e=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:var(--bg);border-radius:4px;margin-bottom:4px;border:1px solid var(--border);">
            <span style="font-size:0.75rem;color:var(--text);">${e.nome}</span>
            <span style="font-size:0.7rem;color:var(--text-muted);">${new Date(e.data).toLocaleString(`pt-BR`)}</span>
            <button class="btn-miniatura btn-restaurar-gd" data-id="${e.id}" title="Restaurar">↩️</button>
          </div>
        `).join(``)}
      </div>
    `,e.querySelectorAll(`.btn-restaurar-gd`).forEach(e=>{e.addEventListener(`click`,()=>$.restaurarGoogle(e.dataset.id).then(()=>{this.router.viewAtual===`configuracoes`&&this.router.navegar(`configuracoes`)}))})}async _listarWebDAV(){let e=document.getElementById(`webdavBackupList`);if(!e)return;e.innerHTML=`<span style="color:var(--text-muted);font-size:0.8rem;">Carregando...</span>`;let t=await $.listarBackupsWebDAV();if(t.length===0){e.innerHTML=`<span style="color:var(--text-muted);font-size:0.8rem;">Nenhum backup no WebDAV.</span>`;return}e.innerHTML=`
      <div style="max-height:200px;overflow-y:auto;">
        ${t.map(e=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:var(--bg);border-radius:4px;margin-bottom:4px;border:1px solid var(--border);">
            <span style="font-size:0.75rem;color:var(--text);">${e.nome}</span>
            <span style="font-size:0.7rem;color:var(--text-muted);">${e.data||``}</span>
            <button class="btn-miniatura btn-restaurar-wd" data-nome="${e.nome}" title="Restaurar">↩️</button>
          </div>
        `).join(``)}
      </div>
    `,e.querySelectorAll(`.btn-restaurar-wd`).forEach(e=>{e.addEventListener(`click`,()=>$.restaurarWebDAV(e.dataset.nome).then(()=>{this.router.viewAtual===`configuracoes`&&this.router.navegar(`configuracoes`)}))})}},ye=class{constructor(e){this.dataStore=e,this._db=null,this._dbPromise=null}get db(){return this._dbPromise||(this._dbPromise=new Promise((e,t)=>{let n=indexedDB.open(`AtelierCRM`,1);n.onupgradeneeded=e=>{let t=e.target.result;if(!t.objectStoreNames.contains(`snapshots`)){let e=t.createObjectStore(`snapshots`,{keyPath:`id`,autoIncrement:!0});e.createIndex(`timestamp`,`timestamp`,{unique:!1}),e.createIndex(`label`,`label`,{unique:!1})}},n.onsuccess=t=>{this._db=t.target.result,e(this._db)},n.onerror=e=>t(e.target.error)})),this._dbPromise}async salvarSnapshotIDB(e){let t=(await this.db).transaction(`snapshots`,`readwrite`).objectStore(`snapshots`),n={dados:JSON.parse(JSON.stringify(this.dataStore.dados)),timestamp:new Date().toISOString(),label:e||`Backup `+new Date().toLocaleString(`pt-BR`)};return new Promise((e,r)=>{let a=t.add(n);a.onsuccess=()=>{i(`Snapshot salvo no IndexedDB!`),e(a.result)},a.onerror=()=>r(a.error)})}async listarSnapshotsIDB(){let e=(await this.db).transaction(`snapshots`,`readonly`).objectStore(`snapshots`).index(`timestamp`);return new Promise((t,n)=>{let r=e.openCursor(null,`prev`),i=[];r.onsuccess=e=>{let n=e.target.result;n?(i.push(n.value),n.continue()):t(i)},r.onerror=()=>n(r.error)})}async restaurarSnapshotIDB(e){let t=(await this.db).transaction(`snapshots`,`readonly`).objectStore(`snapshots`);return new Promise((n,r)=>{let a=t.get(e);a.onsuccess=e=>{let t=e.target.result;t?(this.dataStore.dados=JSON.parse(JSON.stringify(t.dados)),this.dataStore.salvar(),i(`Snapshot restaurado com sucesso!`),n(!0)):r(Error(`Snapshot não encontrado`))},a.onerror=()=>r(a.error)})}async removerSnapshotIDB(e){let t=(await this.db).transaction(`snapshots`,`readwrite`).objectStore(`snapshots`);return new Promise((n,r)=>{let i=t.delete(e);i.onsuccess=()=>n(!0),i.onerror=()=>r(i.error)})}get googleToken(){return this.dataStore.dados.config.syncGoogleToken||``}get googleClientId(){return this.dataStore.dados.config.syncGoogleClientId||``}async autenticarGoogle(){let e=this.googleClientId;return e?new Promise(t=>{let n=window.location.origin+window.location.pathname,r=`crm_sync_`+Date.now(),a=`https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=`+encodeURIComponent(e)+`&redirect_uri=`+encodeURIComponent(n)+`&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file&state=`+r,o=window.open(a,`google_oauth`,`width=600,height=700`);if(!o){i(`Pop-up bloqueado. Permita pop-ups para usar o Google Drive.`),t(!1);return}let s=setInterval(()=>{try{if(o.closed){clearInterval(s),t(!1);return}if(o.location.hash&&o.location.hash.includes(`access_token`)){let e=new URLSearchParams(o.location.hash.replace(`#`,``)).get(`access_token`);e&&(this.dataStore.dados.config.syncGoogleToken=e,this.dataStore.salvar(),i(`Google Drive autenticado!`),o.close(),clearInterval(s),t(!0))}}catch{}},500)}):(i(`Configure o Client ID do Google Drive nas Configurações.`),!1)}async _reqGoogle(e,t,n){let r=this.googleToken;if(!r)throw Error(`Google Drive não autenticado`);let a={method:t||`GET`,headers:{Authorization:`Bearer `+r,"Content-Type":`application/json`}};n&&(a.body=JSON.stringify(n));let o=await fetch(`https://www.googleapis.com/drive/v3/`+e,a);if(o.status===401)throw this.dataStore.dados.config.syncGoogleToken=``,this.dataStore.salvar(),i(`Token expirado. Autentique novamente.`,`erro`),Error(`Token expirado`);return o.json()}async _garantirPastaGoogle(){let e=await this._reqGoogle(`files?q=name%3D%27AtelierCRM%27%20and%20mimeType%3D%27application%2Fvnd.google-apps.folder%27&fields=files(id,name)`);return e.files&&e.files.length>0?e.files[0].id:(await this._reqGoogle(`files`,`POST`,{name:`AtelierCRM`,mimeType:`application/vnd.google-apps.folder`})).id}async backupGoogle(){if(!this.googleToken&&!await this.autenticarGoogle())return!1;a(`Enviando backup para Google Drive...`);try{let e=await this._garantirPastaGoogle(),t=JSON.stringify(this.dataStore.dados),n=`atelier-crm-backup-${new Date().toISOString().replace(/[:.]/g,`-`)}.json`,r=`crm_boundary_`+Date.now(),a=[`--`+r,`Content-Type: application/json; charset=UTF-8`,``,JSON.stringify({name:n,parents:[e]}),`--`+r,`Content-Type: application/json`,``,t,`--`+r+`--`].join(`\r
`),s=this.googleToken,c=await(await fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`,{method:`POST`,headers:{Authorization:`Bearer `+s,"Content-Type":`multipart/related; boundary=`+r},body:a})).json();return c.id?(this.dataStore.dados.config.syncLastBackup=new Date().toISOString(),this.dataStore.salvar(),o(),i(`Backup enviado para Google Drive!`),!0):(o(),i(`Erro: `+(c.error?.message||`Falha no upload`),`erro`),!1)}catch(e){return o(),i(`Erro ao fazer backup no Google Drive: `+e.message,`erro`),!1}}async listarBackupsGoogle(){if(!this.googleToken)return[];try{return((await this._reqGoogle(`files?q=name%20contains%20%27atelier-crm-backup%27&orderBy=createdTime%20desc&fields=files(id,name,createdTime,size)`)).files||[]).map(e=>({id:e.id,nome:e.name,data:e.createdTime,tamanho:e.size}))}catch{return[]}}async restaurarGoogle(e){if(!this.googleToken)return i(`Google Drive não autenticado.`,`erro`),!1;a(`Restaurando do Google Drive...`);try{let t=await fetch(`https://www.googleapis.com/drive/v3/files/`+e+`?alt=media`,{headers:{Authorization:`Bearer `+this.googleToken}});if(!t.ok)throw Error(`Erro HTTP `+t.status);let n=await t.json();return n&&n.obras?(this.dataStore.dados=n,this.dataStore.salvar(),o(),i(`Backup restaurado do Google Drive!`),!0):(o(),i(`Arquivo inválido no Google Drive.`,`erro`),!1)}catch(e){return o(),i(`Erro ao restaurar: `+e.message,`erro`),!1}}_webdavConfig(){let e=this.dataStore.dados.config;return{url:e.syncWebDAVUrl||``,user:e.syncWebDAVUser||``,pass:e.syncWebDAVPass||``}}async _reqWebDAV(e,t,n){let r=this._webdavConfig();if(!r.url)throw Error(`WebDAV não configurado`);let i=r.url.replace(/\/+$/,``)+`/`+e.replace(/^\//,``),a=btoa(r.user+`:`+r.pass),o={method:t||`GET`,headers:{Authorization:`Basic `+a}};n&&(o.body=n);let s=await fetch(i,o);if(!s.ok)throw Error(`WebDAV HTTP `+s.status);return s}async testarWebDAV(){try{return await this._reqWebDAV(``,`PROPFIND`),!0}catch{return!1}}async backupWebDAV(){a(`Enviando backup para WebDAV...`);try{let e=JSON.stringify(this.dataStore.dados),t=`atelier-crm-backup-${new Date().toISOString().replace(/[:.]/g,`-`)}.json`;return await this._reqWebDAV(t,`PUT`,e),this.dataStore.dados.config.syncLastBackup=new Date().toISOString(),this.dataStore.salvar(),o(),i(`Backup enviado para WebDAV!`),!0}catch(e){return o(),i(`Erro WebDAV: `+e.message,`erro`),!1}}async listarBackupsWebDAV(){try{let e=await(await this._reqWebDAV(``,`PROPFIND`)).text(),t=new DOMParser().parseFromString(e,`text/xml`).querySelectorAll(`response`),n=[];return t.forEach(e=>{let t=e.querySelector(`href`)?.textContent||``,r=t.split(`/`).filter(Boolean).pop()||``;if(r.startsWith(`atelier-crm-backup`)){let i=e.querySelector(`getcontentlength`)?.textContent||`0`,a=e.querySelector(`getlastmodified`)?.textContent||``;n.push({nome:r,data:a,tamanho:i,href:t})}}),n.reverse()}catch{return[]}}async restaurarWebDAV(e){a(`Restaurando do WebDAV...`);try{let t=await(await this._reqWebDAV(e,`GET`)).json();return t&&t.obras?(this.dataStore.dados=t,this.dataStore.salvar(),o(),i(`Backup restaurado do WebDAV!`),!0):(o(),i(`Arquivo inválido no WebDAV.`,`erro`),!1)}catch(e){return o(),i(`Erro ao restaurar WebDAV: `+e.message,`erro`),!1}}iniciarAutoBackup(){let e=this.dataStore.dados.config;if(!e.syncAutoBackup)return;let t=(e.syncAutoBackupInterval||30)*60*1e3;setInterval(()=>{this.salvarSnapshotIDB(`Auto `+new Date().toLocaleString(`pt-BR`))},t)}},M=t(),N=e(`obras`,{state:()=>({items:[],_loaded:!1}),getters:{porId:e=>t=>e.items.find(e=>e.id===t),filtrados:e=>t=>t?e.items.filter(e=>(e.titulo||``).toLowerCase().includes(t)):e.items,total:e=>e.items.length,valorAcervo:e=>e.items.reduce((e,t)=>e+(Number(t.preco)||0),0),vendidas:e=>e.items.filter(e=>e.status===`vendida`),emEstoque:e=>e.items.filter(e=>e.status!==`vendida`)},actions:{carregar(e){this.items=e,this._loaded=!0},adicionar(e){this.items.unshift(e),this._persistir()},atualizar(e,t){let n=this.items.findIndex(t=>t.id===e);n>=0&&(this.items[n]={...this.items[n],...t},this._persistir())},remover(e){this.items=this.items.filter(t=>t.id!==e),this._persistir()},_persistir(){try{localStorage.setItem(`atelier_crm_obras`,JSON.stringify(this.items));try{window.dataStore&&(window.dataStore.dados.obras=this.items)}catch{}}catch(e){console.warn(`Falha ao persistir obras`,e)}}}}),P=()=>N(M),F=e(`clientes`,{state:()=>({items:[],_loaded:!1}),getters:{porId:e=>t=>e.items.find(e=>e.id===t),total:e=>e.items.length},actions:{carregar(e){this.items=e,this._loaded=!0},adicionar(e){this.items.unshift(e),this._persistir()},atualizar(e,t){let n=this.items.findIndex(t=>t.id===e);n>=0&&(this.items[n]={...this.items[n],...t},this._persistir())},remover(e){this.items=this.items.filter(t=>t.id!==e),this._persistir()},_persistir(){try{localStorage.setItem(`atelier_crm_clientes`,JSON.stringify(this.items));try{window.dataStore&&(window.dataStore.dados.clientes=this.items)}catch{}}catch(e){console.warn(e)}}}}),I=()=>F(M),L=e(`vendas`,{state:()=>({items:[],_loaded:!1}),getters:{porId:e=>t=>e.items.find(e=>e.id===t),total:e=>e.items.length,valorTotal:e=>e.items.reduce((e,t)=>e+(Number(t.valor)||0),0),doCliente:e=>t=>e.items.filter(e=>e.clienteId===t)},actions:{carregar(e){this.items=e,this._loaded=!0},adicionar(e){this.items.unshift(e),this._persistir()},atualizar(e,t){let n=this.items.findIndex(t=>t.id===e);n>=0&&(this.items[n]={...this.items[n],...t},this._persistir())},remover(e){this.items=this.items.filter(t=>t.id!==e),this._persistir()},_persistir(){try{localStorage.setItem(`atelier_crm_vendas`,JSON.stringify(this.items));try{window.dataStore&&(window.dataStore.dados.vendas=this.items)}catch{}}catch(e){console.warn(e)}}}}),R=()=>L(M),be=`atelier_crm_config`,xe=e(`config`,{state:()=>({artista:{nome:`Meu Ateliê`,email:``,telefone:``,assinatura:``},tema:`classico`,idioma:`pt-BR`,altoContraste:!1,tamanhoFonte:`medio`,pin:``,autoLock:!1,tourCompleted:!1,precificador:{valorHora:60,multiplicadorExperiencia:1.5,metaMensal:1e4,metaAnual:12e4,metaInicio:``},precificadorRegras:[],moedaPadrao:`BRL`,taxasCambio:{USD:5,EUR:5.5,GBP:6.3},contadorRecibos:{},contadorPropostas:{},contadorCertificados:{},textoGarantia:``,syncGoogleClientId:``,syncGoogleToken:``,syncWebDAVUrl:``,syncWebDAVUser:``,syncWebDAVPass:``,syncAutoBackup:!1,syncAutoBackupInterval:30,syncLastBackup:``}),actions:{carregar(){try{let e=localStorage.getItem(be);e&&Object.assign(this,JSON.parse(e))}catch(e){console.warn(`Falha ao carregar config`,e)}},salvar(){try{localStorage.setItem(be,JSON.stringify(this.$state));try{window.dataStore&&(window.dataStore.dados.config=this.$state)}catch{}}catch(e){console.warn(e)}},atualizar(e){Object.assign(this,e),this.salvar()}}}),z=()=>xe(M),Se={obras:{get:N,single:P},clientes:{get:F,single:I},vendas:{get:L,single:R}},Ce=class{constructor(e){this.dataStore=e,this.dados=e.dados,this._initStores()}_initStores(){P().carregar(this.dataStore.listar(`obras`)),I().carregar(this.dataStore.listar(`clientes`)),R().carregar(this.dataStore.listar(`vendas`)),z().carregar()}_piniaStore(e){let t=Se[e];return t?t.get(M):null}listar(e){let t=this._piniaStore(e);return t?t.items:this.dataStore.listar(e)}adicionar(e,t){let n=this._piniaStore(e);return n?(t.id=`id_`+Date.now()+`_`+Math.floor(Math.random()*1e3),t.criadoEm=t.criadoEm||new Date().toISOString(),n.adicionar({...t}),this.dataStore.dados[e]=n.items,this.dataStore.salvar(),t):this.dataStore.adicionar(e,t)}atualizar(e,t,n){let r=this._piniaStore(e);return r?(r.atualizar(t,n),this.dataStore.dados[e]=r.items,this.dataStore.salvar(),r.porId(t)):this.dataStore.atualizar(e,t,n)}remover(e,t){let n=this._piniaStore(e);n?(n.remover(t),this.dataStore.dados[e]=n.items,this.dataStore.salvar()):this.dataStore.remover(e,t)}buscarPorId(e,t){let n=this._piniaStore(e);return n?n.porId(t):this.dataStore.buscarPorId(e,t)}salvar(){this.dataStore.salvar(),z().salvar()}exportarBackup(){return this.dataStore.exportarBackup()}exportarColecao(e){return this.dataStore.exportarColecao(e)}importarBackup(e){return this.dataStore.importarBackup(e)}previewImport(e){return this.dataStore.previewImport(e)}obterHistoricoExport(){return this.dataStore.obterHistoricoExport()}};function we(e){let t=e.listar(`obras`),i=e.listar(`vendas`);e.listar(`clientes`);let a=t.filter(e=>e.status===`vendida`),o=t.filter(e=>e.status!==`vendida`),s=o.reduce((e,t)=>e+(Number(t.preco)||0),0),c=i.reduce((e,t)=>e+(Number(t.valor)||0),0),d=p(f(t)),g=m(t),v=i.length>0?c/i.length:0,y=h(t),b=t.filter(e=>e.favorita).length,x=[...t].sort((e,t)=>new Date(t.dataCadastro||t.criadoEm)-new Date(e.dataCadastro||e.criadoEm)).slice(0,5),S=x.length?x.map(e=>`
    <li class="item-obra-recente">
      <div class="thumb-obra">${e.imagem?`<img src="${e.imagem}" alt="${e.titulo}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`:e.emoji||`ð¼ï¸`}</div>
      <div class="info-obra-recente">
        <div class="nome">${e.titulo}</div>
        <div class="meta">${e.tecnica||``} · ${r(e.dataCadastro||e.criadoEm)}</div>
      </div>
      <span class="tag-status ${l(e.status)}">${u(e.status)}</span>
    </li>
  `).join(``):`<div class="estado-vazio"><div class="icone-vazio">ð¼ï¸</div><p>Nenhuma obra cadastrada ainda. Clique em "Nova Obra" para começar.</p></div>`;return`
    <div class="view-cabecalho">
      <div>
        <h2>Dashboard</h2>
        <p class="subtitulo">Visão geral do seu ateliê · ${new Date().toLocaleDateString(`pt-BR`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`})}</p>
      </div>
      <div class="dashboard-acoes">
        <button class="btn-secundario" id="btnAtualizarDashboard" title="Atualizar dados">🔄</button>
      </div>
    </div>
    <div class="grid-cards stagger-in">
      <div class="card card-destaque"><div class="rotulo-card">Total de Obras</div><div class="valor-card">${t.length}</div><div class="card-tendencia ${y>=0?`positiva`:`negativa`}">${y>=0?`â`:`↓`} ${Math.abs(y).toFixed(1)}% este mês</div></div>
      <div class="card"><div class="rotulo-card">Obras Vendidas</div><div class="valor-card">${a.length}</div><div class="card-sub">${t.length>0?(a.length/t.length*100).toFixed(1):0}% do total</div></div>
      <div class="card"><div class="rotulo-card">Em Estoque</div><div class="valor-card">${o.length}</div><div class="card-sub">${t.length>0?(o.length/t.length*100).toFixed(1):0}% disponível</div></div>
      <div class="card card-valor"><div class="rotulo-card">Valor do Acervo</div><div class="valor-card">${n(s)}</div><div class="card-sub">Ticket médio: ${n(v)}</div></div>
      <div class="card"><div class="rotulo-card">Total Vendido</div><div class="valor-card">${n(c)}</div><div class="card-sub">${i.length} venda${i.length===1?``:`s`}</div></div>
      <div class="card"><div class="rotulo-card">Favoritas</div><div class="valor-card">${b}</div><div class="card-sub">⭐ Obras marcadas</div></div>
    </div>
    <div class="grid-painel">
      <div class="painel"><h3>📊 Produtividade Mensal</h3><div class="grafico-container">${d}</div><div class="grafico-legenda"><span class="leg-item">📊 Obras criadas por mês</span></div></div>
      <div class="painel"><h3>ð¨ Técnicas Mais Usadas</h3><div class="tecnicas-container">${g.length>0?g.map((e,t)=>`<div class="barra-tecnica"><div class="tecnica-nome">${_(e.tecnica)}</div><div class="tecnica-barra-wrapper"><div class="tecnica-barra" style="width: ${e.porcentagem}%"></div></div><div class="tecnica-valor">${e.quantidade} (${e.porcentagem.toFixed(0)}%)</div></div>`).join(``):`<div class="estado-vazio"><p>Sem dados suficientes</p></div>`}</div></div>
    </div>
    <div class="grid-painel">
      <div class="painel"><h3>ð Obras mais recentes</h3><ul class="lista-obras-recentes stagger-in">${S}</ul></div>
      <div class="painel"><h3>📋 Atividades Recentes</h3><div class="activity-feed">${X.obterRecentes(5).length>0?X.obterRecentes(5).map(e=>`<div class="activity-item"><div class="activity-icone">${X.obterIcone(e.tipo)}</div><div class="activity-detalhes"><div class="activity-titulo">${e.titulo} <span class="activity-badge ${e.badge}">${e.badge}</span></div><div class="activity-tempo">${X.formatarTempo(new Date(e.timestamp))}</div></div></div>`).join(``):`<div class="estado-vazio"><p>Nenhuma atividade registrada ainda.</p></div>`}</div></div>
    </div>
    <div class="painel"><h3>⚡ Atalhos rápidos</h3><div class="atalhos-rapidos"><button class="btn-primario" id="btnAtalhoNovaObra">â Nova Obra</button><button class="btn-secundario" id="btnAtalhoVenda">â Nova Venda</button><button class="btn-secundario" id="btnAtalhoRecibo">ð§¾ Gerar Recibo</button><button class="btn-secundario" id="btnAtalhoClientes">ð¤ Gerenciar Clientes</button></div></div>
  `}function B(e){if(!e)return``;let t=document.createElement(`div`);return t.textContent=e,t.innerHTML.replace(/"/g,`&quot;`).replace(/'/g,`&#x27;`)}function Te(e){if(!e)return``;let t=String(e).trim();try{let e=new URL(t,window.location.origin);return[`http:`,`https:`,`data:`,`mailto:`].includes(e.protocol)?t:``}catch{return``}}function V(e){if(!e)return``;let t=/<\/?(p|br|strong|em|b|i|u|ul|ol|li|span|div)(\s[^>]*)?>/gi,n={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#x27;`},r=/\s+(style|class|id)\s*=\s*("[^"]*"|'[^']*')/gi,i=0,a=[];for(let o;(o=t.exec(e))!==null;){let s=e.slice(i,o.index);s&&a.push(s.replace(/[&<>"']/g,e=>n[e]));let c=o[0],l=o[1],u=o[2];if(c[1]===`/`||!u||!u.trim())a.push(c);else{let e=[];r.lastIndex=0;for(let t;(t=r.exec(u))!==null;)e.push(t[0]);a.push(`<${l}${e.join(``)}>`)}i=t.lastIndex}let o=e.slice(i);return o&&a.push(o.replace(/[&<>"']/g,e=>n[e])),a.join(``)}function Ee(){if(!(`IntersectionObserver`in window))return;let e=new IntersectionObserver(t=>{t.forEach(t=>{if(t.isIntersecting){let n=t.target;n.src=n.dataset.src||n.src,n.classList.add(`carregado`),e.unobserve(n)}})},{rootMargin:`200px`});document.querySelectorAll(`.lazy-img:not(.carregado)`).forEach(t=>e.observe(t))}var H=[];function De(e,t){let n=H.length>1?H[H.length-2]:null;n&&(H.indexOf(t),H.indexOf(n)),e.classList.remove(`view-enter-forward`,`view-enter-back`,`view-enter-fade`,`view-transition`),e.offsetWidth;let r=`view-enter-fade`;if(H.length>1){let e=H.map((e,n)=>e===t?n:-1).filter(e=>e>=0);H.length-1;let n=H.length-2;e.length>0&&e[e.length-1]<n?r=`view-enter-back`:e.length>0&&(r=`view-enter-forward`)}if(e.classList.add(r,`view-transition`),!H.includes(t))H.push(t);else{let e=H.indexOf(t);H.splice(e,1),H.push(t)}H.length>20&&H.shift(),requestAnimationFrame(()=>{e.querySelectorAll(`.stagger-in > *`).forEach((e,t)=>{e.style.animationDelay=`${t*30}ms`,e.style.animationDuration=`0.4s`})})}function Oe(e,t=200){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}var ke=[{key:`k`,ctrl:!0,desc:`Busca global (spotlight)`,acao:()=>Ae()},{key:`n`,ctrl:!0,desc:`Nova obra`,acao:()=>{J?.navegar(`catalogo`),setTimeout(()=>Y.emitir(`abrir-nova-obra`),200)}},{key:`v`,ctrl:!0,desc:`Nova venda`,acao:()=>{J?.navegar(`vendas`),setTimeout(()=>Y.emitir(`abrir-nova-venda`),200)}},{key:`c`,ctrl:!0,desc:`Novo cliente`,acao:()=>{J?.navegar(`clientes`),setTimeout(()=>Y.emitir(`abrir-novo-cliente`),200)}},{key:`d`,ctrl:!0,desc:`Dashboard`,acao:()=>J?.navegar(`dashboard`)},{key:`g`,ctrl:!0,desc:`Galeria Virtual`,acao:()=>J?.navegar(`galeriaVirtual`)},{key:`p`,ctrl:!0,desc:`Precificador`,acao:()=>J?.navegar(`precificador`)},{key:`a`,ctrl:!0,desc:`Atelier/Estoque`,acao:()=>J?.navegar(`atelier`)},{key:`f`,ctrl:!0,desc:`Financeiro`,acao:()=>J?.navegar(`financeiro`)},{key:`r`,ctrl:!0,desc:`Rede Profissional`,acao:()=>J?.navegar(`rede`)},{key:`j`,ctrl:!0,desc:`Diário Criativo`,acao:()=>J?.navegar(`diario`)},{key:`b`,ctrl:!0,desc:`Backup rápido`,acao:()=>{q?.exportarBackup(),i(`Backup exportado!`),X.registrar(`export`,`Backup exportado`,`Backup completo do sistema`,`export`)}},{key:`s`,ctrl:!0,desc:`Salvar dados`,acao:()=>{q?.salvar(),i(`Dados salvos!`),X.registrar(`atualizacao`,`Dados salvos`,`Salvamento manual`,`atualizacao`)}},{key:`Escape`,desc:`Fechar modal`,acao:()=>c()},{key:`/`,desc:`Mostrar todos os atalhos`,acao:()=>Me()},{key:`?`,desc:`Mostrar ajuda`,acao:()=>Me()}];document.addEventListener(`keydown`,e=>{if([`INPUT`,`TEXTAREA`,`SELECT`].includes(e.target.tagName)&&e.key!==`Escape`)return;let t=e.ctrlKey||e.metaKey;for(let n of ke)if(n.key===e.key&&(!n.ctrl||t)){e.preventDefault(),n.acao();return}e.key===`Escape`&&(document.querySelector(`.spotlight-overlay`)&&document.querySelector(`.spotlight-overlay`).remove(),c())});function Ae(){let e=document.createElement(`div`);e.className=`spotlight-overlay`,e.innerHTML=`<div class="spotlight-box"><input class="spotlight-input" placeholder="Buscar obras, clientes, vendas..." autofocus><div class="spotlight-results"></div><div class="spotlight-footer"><span>â¬â¬ Navegar</span><span>â Abrir</span><span>ESC Fechar</span></div></div>`,document.body.appendChild(e);let t=e.querySelector(`.spotlight-input`),r=e.querySelector(`.spotlight-results`),i=-1;function a(e){if(e)try{let t=JSON.parse(localStorage.getItem(`atelier_spotlight_hist`)||`[]`);t=[e,...t.filter(t=>t!==e)].slice(0,5),localStorage.setItem(`atelier_spotlight_hist`,JSON.stringify(t))}catch{}}function o(){r.querySelectorAll(`.spotlight-item`).forEach((e,t)=>{e.classList.toggle(`destaque`,t===i),t===i&&e.scrollIntoView({block:`nearest`})})}function s(n){if(!n)return;let r=n.dataset.rota,i=n.dataset.payload;e.remove(),r===`catalogo`&&i?(a(t.value),J?.navegar(`catalogo`)):r&&(a(t.value),J?.navegar(r))}function c(e,t){return`<div class="sp-secao"><span>${t}</span> ${e}</div>`}let l=Oe(e=>{if(i=-1,!e){try{let e=JSON.parse(localStorage.getItem(`atelier_spotlight_hist`)||`[]`);if(e.length>0){r.innerHTML=c(`Recentes`,`ð`)+e.map(e=>`<div class="spotlight-item sp-historico" data-termo="${e}"><span class="si-icone">ð</span><span>${e}</span><span class="si-info">busca recente</span></div>`).join(``),r.querySelectorAll(`.sp-historico`).forEach(e=>e.addEventListener(`click`,()=>{t.value=e.dataset.termo,l(e.dataset.termo)}));return}}catch{}r.innerHTML=`<div class="spotlight-item" style="color:var(--text-muted);justify-content:center;">Digite para buscar em todo o sistema...</div>`;return}let a=e.toLowerCase(),o=(q?.listar(`obras`)||[]).filter(e=>(e.titulo||``).toLowerCase().includes(a)||(e.descricao||``).toLowerCase().includes(a)||(e.tecnica||``).toLowerCase().includes(a)||(e.serie||``).toLowerCase().includes(a)).slice(0,5),u=(q?.listar(`clientes`)||[]).filter(e=>(e.nome||``).toLowerCase().includes(a)||(e.email||``).toLowerCase().includes(a)).slice(0,5),d=(q?.listar(`vendas`)||[]).filter(e=>(e.numeroRecibo||``).toLowerCase().includes(a)||(e.clienteNome||``).toLowerCase().includes(a)).slice(0,5),f=(q?.listar(`contatosProfissionais`)||[]).filter(e=>(e.nome||``).toLowerCase().includes(a)||(e.instituicao||``).toLowerCase().includes(a)).slice(0,5),p=(q?.listar(`encomendas`)||[]).filter(e=>(e.cliente||``).toLowerCase().includes(a)||(e.descricao||``).toLowerCase().includes(a)).slice(0,5),m=(q?.listar(`eventos`)||[]).filter(e=>(e.nome||``).toLowerCase().includes(a)).slice(0,5),h=``;o.length&&(h+=c(`Obras`,`ð¼ï¸`)+o.map(e=>`<div class="spotlight-item" data-rota="catalogo" data-payload="${e.id}"><span class="si-icone" style="background-image:url('${e.imagem||``}');background-size:cover;width:28px;height:28px;border-radius:4px;"></span><span>${e.titulo}</span><span class="si-info">${e.tecnica||``} · ${n(e.preco)}</span></div>`).join(``)),u.length&&(h+=c(`Clientes`,`ð¤`)+u.map(e=>`<div class="spotlight-item" data-rota="clientes"><span class="si-icone">ð¤</span><span>${e.nome}</span><span class="si-info">${e.email||``}</span></div>`).join(``)),d.length&&(h+=c(`Vendas`,`ð°`)+d.map(e=>`<div class="spotlight-item" data-rota="vendas"><span class="si-icone">ð°</span><span>Recibo ${e.numeroRecibo||``}</span><span class="si-info">${n(e.valorTotal||e.valor)}</span></div>`).join(``)),f.length&&(h+=c(`Contatos`,`ð¤`)+f.map(e=>`<div class="spotlight-item" data-rota="rede"><span class="si-icone">ð¤</span><span>${e.nome}</span><span class="si-info">${e.instituicao||``}</span></div>`).join(``)),p.length&&(h+=c(`Encomendas`,`ð¦`)+p.map(e=>`<div class="spotlight-item" data-rota="encomendas"><span class="si-icone">ð¦</span><span>${e.cliente}</span><span class="si-info">${e.descricao?e.descricao.slice(0,40):``}</span></div>`).join(``)),m.length&&(h+=c(`Eventos`,`ðª`)+m.map(e=>`<div class="spotlight-item" data-rota="exposicoes"><span class="si-icone">ðª</span><span>${e.nome}</span><span class="si-info">${e.tipo||``}</span></div>`).join(``)),r.innerHTML=h||`<div class="spotlight-item" style="color:var(--text-muted);justify-content:center;">Nenhum resultado encontrado.</div>`,r.querySelectorAll(`.spotlight-item`).forEach(e=>{e.addEventListener(`click`,()=>s(e))})},150);t.addEventListener(`input`,()=>l(t.value)),t.addEventListener(`keydown`,e=>{let t=r.querySelectorAll(`.spotlight-item:not(.sp-secao)`);e.key===`ArrowDown`?(e.preventDefault(),i=Math.min(t.length-1,i+1),o()):e.key===`ArrowUp`?(e.preventDefault(),i=Math.max(-1,i-1),o()):e.key===`Enter`&&i>=0&&t[i]?s(t[i]):e.key===`Enter`&&t.length===1&&s(t[0])}),e.addEventListener(`click`,t=>{t.target===e&&e.remove()}),setTimeout(()=>t.focus(),50)}function je(){let e=document.getElementById(`fabMain`),t=document.getElementById(`fabSpeedial`),n=document.getElementById(`fabBackdrop`);if(!e)return;function r(){e.classList.remove(`ativo`),t.classList.remove(`visivel`),n.classList.remove(`visivel`)}function i(){let r=e.classList.toggle(`ativo`);t.classList.toggle(`visivel`,r),n.classList.toggle(`visivel`,r)}e.addEventListener(`click`,i),n.addEventListener(`click`,r);let a={obra:()=>{J?.navegar(`catalogo`),setTimeout(()=>Y.emitir(`abrir-nova-obra`),200)},venda:()=>{J?.navegar(`vendas`),setTimeout(()=>Y.emitir(`abrir-nova-venda`),200)},cliente:()=>{J?.navegar(`clientes`),setTimeout(()=>Y.emitir(`abrir-novo-cliente`),200)},encomenda:()=>{J?.navegar(`encomendas`)},contato:()=>{J?.navegar(`rede`)},evento:()=>{J?.navegar(`exposicoes`)}};document.querySelectorAll(`[data-fab]`).forEach(e=>{e.addEventListener(`click`,()=>{r();let t=e.dataset.fab;a[t]&&a[t]()})}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&t?.classList.contains(`visivel`)&&r()})}function Me(){s(`<h3>⌨️ Atalhos de Teclado</h3><p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px;">Use estes atalhos para navegar rapidamente pelo sistema.</p>${Object.entries({Navegação:[`d`,`g`,`p`,`a`,`f`,`r`,`j`],Criação:[`n`,`v`,`c`],Dados:[`b`,`s`],Ajuda:[`/`,`?`,`k`,`Escape`]}).map(([e,t])=>`<div class="sc-categoria"><h4>${e}</h4><div class="shortcuts-grid">${ke.filter(e=>t.includes(e.key)).map(e=>{let t=e.ctrl?`<span class="sc-key">${navigator.platform?.includes(`Mac`)?`⌘`:`Ctrl`}</span><span class="sc-key">${e.key.toUpperCase()}</span>`:`<span class="sc-key">${e.key}</span>`;return`<div class="sc-item"><span>${e.desc}</span><span>${t}</span></div>`}).join(``)}</div></div>`).join(``)}<div class="modal-acoes" style="margin-top:16px;"><button class="btn-secundario" id="btnCancelarModal">Fechar</button></div>`),document.getElementById(`btnCancelarModal`)?.addEventListener(`click`,c)}var U=null,W=!1;function G(){if(!q?.dados?.config?.autoLock||!q?.dados?.config?.pin)return;let e=()=>{W||(clearTimeout(U),U=setTimeout(()=>Ne(),600*1e3))};[`click`,`keydown`,`mousemove`,`touchstart`].forEach(t=>document.addEventListener(t,e)),e()}function Ne(){if(W)return;W=!0;let e=q.dados.config.pin;if(!e)return;let t=0;function n(){let n=``,r=()=>{s(`<h3>🔒 Tela Bloqueada</h3><p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px;">Digite seu PIN de 4 dígitos para continuar</p><div class="pin-display">${`•`.repeat(n.length).padEnd(4,`_`)}</div>${t>0?`<p style="color:#ef4444;font-size:0.8rem;">PIN incorreto. Tente novamente.</p>`:``}<div class="pin-pad">${[1,2,3,4,5,6,7,8,9,``,0,`⌫`].map(e=>e===``?`<button disabled></button>`:`<button data-val="${e}">${e}</button>`).join(``)}</div><div class="modal-acoes"><button class="btn-secundario" id="btnSairPin">Sair</button></div>`),document.querySelectorAll(`.pin-pad button[data-val]`).forEach(a=>{a.addEventListener(`click`,()=>{if(a.dataset.val===`⌫`){n=n.slice(0,-1),r();return}n.length>=4||(n+=a.dataset.val,n.length===4?n===e?(W=!1,c(),i(`Bem-vindo de volta!`),G()):(t++,n=``,r()):r())})}),document.getElementById(`btnSairPin`)?.addEventListener(`click`,()=>{c()}),document.getElementById(`btnCancelarModal`)?.addEventListener(`click`,c)};r()}n()}function Pe(){let e=document.createElement(`canvas`);e.className=`confetti-canvas`,document.body.appendChild(e);let t=e.getContext(`2d`);e.width=window.innerWidth,e.height=window.innerHeight;let n=Array.from({length:80},()=>({x:e.width/2+(Math.random()-.5)*200,y:e.height/2,vx:(Math.random()-.5)*8,vy:-Math.random()*10-4,size:Math.random()*6+3,color:[`#ff0`,`#f0f`,`#0ff`,`#f00`,`#0f0`,`#00f`,`#ffa500`,`#ff69b4`][Math.floor(Math.random()*8)],rotation:Math.random()*360,rotSpeed:(Math.random()-.5)*10,gravity:.2+Math.random()*.1})),r=0,i=()=>{r++,t.clearRect(0,0,e.width,e.height),n.forEach(e=>{e.x+=e.vx,e.y+=e.vy,e.vy+=e.gravity,e.rotation+=e.rotSpeed,t.save(),t.translate(e.x,e.y),t.rotate(e.rotation*Math.PI/180),t.fillStyle=e.color,t.fillRect(-e.size/2,-e.size/4,e.size,e.size/2),t.restore()}),r<90?requestAnimationFrame(i):e.remove()};i()}new MutationObserver(()=>{document.querySelector(`.toast`)?.textContent?.includes(`Venda registrada`)&&Pe()}).observe(document.getElementById(`toast`),{childList:!0,subtree:!0,characterData:!0});var Fe=[`Reserve 15 minutos ao final do dia para registrar seu progresso no Diário Criativo.`,`Uma obra bem documentada valoriza 30% mais no mercado secundário.`,`Clientes que recebem atualizações do processo criativo têm 2x mais chances de recomprar.`,`Experimente a técnica dos 3 valores: luz, meia-tinta e sombra para dar volume.`,`Mantenha seu catálogo sempre atualizado — você nunca sabe quando um comprador aparece.`,`Use o Precificador para calcular o valor justo da sua hora de trabalho artístico.`,`Tire fotos das suas obras com luz natural difusa para melhores resultados.`,`O descanso é parte do processo criativo. Respeite seus limites.`,`Analise suas estatísticas criativas todo mês para identificar padrões de produtividade.`,`Uma boa relação com galeristas começa com um portfólio digital organizado.`,`Documente cada etapa do processo — o "making of" é tão valioso quanto a obra final.`,`Estabeleça metas realistas. 3 horas de pintura por dia é mais sustentável que 8.`,`Participe de pelo menos 2 editais ou exposições por ano.`,`Materiais de qualidade fazem diferença. Invista nos melhores pincéis que puder.`,`Faça pausas a cada 50 minutos para evitar fadiga visual e manter a criatividade.`,`Seu diário criativo é seu melhor instrumento de autoconhecimento artístico.`,`Compartilhe seu processo nas redes — o público ama ver o "antes e depois".`,`Uma paleta limitada (3-5 cores) força soluções criativas e harmoniosas.`,`Artistas que diversificam técnicas tendem a ter carreiras mais longas.`,`O networking não é sobre quantidade, mas qualidade das conexões.`,`Recibos e certificados bem feitos transmitem profissionalismo e segurança.`,`Revisite obras antigas periodicamente — sua evolução técnica vai te surpreender.`,`Crie uma série temática anual. Colecionadores valorizam coesão de portfólio.`,`Use o calendário do Diário para planejar seus ciclos criativos com antecedência.`,`A luz do seu ateliê muda com as estações. Aproveite cada qualidade de luz.`,`Faça um backup dos dados toda semana — seu registro criativo é precioso.`,`O mercado de arte valoriza histórias. Cada obra tem uma — conte-a bem.`,`Estude um mestre por mês. Incorpore uma técnica nova ao seu repertório.`,`Clientes satisfeitos indicam. Invista no pós-venda e no relacionamento.`,`A arte é um músculo: quanto mais você pratica, mais forte sua voz criativa fica.`];function Ie(){return Fe[Math.floor((new Date-new Date(new Date().getFullYear(),0,0))/864e5)%Fe.length]}var K=[{alvo:`.sidebar`,titulo:`ð¨ Bem-vindo ao Atelier CRM!`,desc:`Este é seu hub criativo. Navegue entre os módulos pelo menu lateral.`,pos:`right`},{alvo:`#seletorTema`,titulo:`🎭 Escolha seu Tema`,desc:`Personalize o visual com 5 temas.`,pos:`bottom`},{alvo:`#btnBackup`,titulo:`💾 Backup Seguro`,desc:`Exporte seus dados periodicamente.`,pos:`bottom`},{alvo:`[data-rota="catalogo"]`,titulo:`ð¼ï¸ Catálogo de Obras`,desc:`Cadastre, edite e gerencie seu portfólio.`,pos:`right`},{alvo:`[data-rota="vendas"]`,titulo:`ð° Vendas e Recibos`,desc:`Registre vendas e gere recibos em PDF.`,pos:`right`},{alvo:`[data-rota="diario"]`,titulo:`📖 Diário Criativo`,desc:`Registre seu processo diário.`,pos:`right`},{alvo:`[data-rota="configuracoes"]`,titulo:`⚙️ Configurações`,desc:`Configure idioma, segurança e dados do artista.`,pos:`right`}];function Le(){if(q?.dados?.config?.tourCompleted)return;let e=0;function t(){let r=K[e],i=document.querySelector(r.alvo);if(!i){e++,e<K.length?t():n();return}document.querySelectorAll(`.tour-highlight`).forEach(e=>e.classList.remove(`tour-highlight`)),document.querySelectorAll(`.tour-tooltip`).forEach(e=>e.remove()),i.classList.add(`tour-highlight`);let a=i.getBoundingClientRect(),o=document.createElement(`div`);o.className=`tour-tooltip`;let s,c;r.pos===`right`?(c=a.right+12,s=a.top):(r.pos,c=a.left,s=a.bottom+12),c+320>window.innerWidth&&(c=window.innerWidth-340),s<10&&(s=10),o.style.left=c+`px`,o.style.top=s+`px`;let l=e===K.length-1;o.innerHTML=`<div class="tt-titulo">${r.titulo}</div><div class="tt-desc">${r.desc}</div><div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:8px;">${e+1} de ${K.length}</div><div class="tt-acoes"><button class="tt-btn-skip" id="tourSkip">Pular</button>${e>0?`<button class="tt-btn-prev" id="tourPrev">â Anterior</button>`:``}<button class="tt-btn-next" id="tourNext">${l?`â Finalizar`:`Próximo â`}</button></div>`,document.body.appendChild(o),document.getElementById(`tourNext`)?.addEventListener(`click`,()=>{l?n():(e++,t())}),document.getElementById(`tourPrev`)?.addEventListener(`click`,()=>{e--,t()}),document.getElementById(`tourSkip`)?.addEventListener(`click`,n)}function n(){document.querySelectorAll(`.tour-highlight`).forEach(e=>e.classList.remove(`tour-highlight`)),document.querySelectorAll(`.tour-tooltip`).forEach(e=>e.remove()),q&&(q.dados.config.tourCompleted=!0,q.salvar())}setTimeout(t,600)}var q=new Ce(new w);window.dataStore=q;var Re=new te(q),J=new E(q),Y=new T,X=new ee,ze=new ne(q,J),Z=new re(q,J),Be=new oe(q),Ve=new ie(q,J),He=new ae(q,J,Be),Ue=new se(q,J),We=new ce(q,J),Q=new le(q,J),Ge=new ue(q,J),Ke=new de(q,J),qe=new O(q,J),Je=new fe(q,J),Ye=new k(q,J),$=new ye(q),Xe=new pe(q,J),Ze=new ge(q,J),Qe=new _e(q,J),$e=new ve(q,J),et=new he(q,J);document.getElementById(`viewPrincipal`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-abrir-modal]`);if(t){C(t.dataset.abrirModal,q,J);return}if(e.target.id===`btnAtalhoNovaObra`){Y.emitir(`abrir-nova-obra`);return}if(e.target.getAttribute(`data-acao`)===`irCatalogo`){J.navegar(`catalogo`);return}if(e.target.id===`btnAtalhoVenda`){Y.emitir(`abrir-nova-venda`);return}if(e.target.id===`btnAtalhoRecibo`){Y.emitir(`abrir-recibo-rapido`);return}}),document.getElementById(`btnColapsar`).addEventListener(`click`,()=>{document.getElementById(`sidebar`).classList.toggle(`colapsada`)}),document.getElementById(`btnBackup`).addEventListener(`click`,()=>{q.exportarBackup(),i(`Backup exportado com sucesso!`)}),document.getElementById(`modalOverlay`).addEventListener(`click`,e=>{e.target.id===`modalOverlay`&&c()}),window.innerWidth<=860&&document.getElementById(`sidebar`).classList.add(`colapsada`);var tt=window.mostrarToast;window.mostrarToast=function(e,t=`info`){let n=document.getElementById(`toast`);if(!n)return tt?.(e);n.textContent=e,n.className=`toast `+t,n.classList.add(`mostrar`),clearTimeout(window._toastTimeout),window._toastTimeout=setTimeout(()=>{n.classList.remove(`mostrar`),n.className=`toast`},2800)};var nt=E.prototype.navegar;E.prototype.navegar=function(e){nt.call(this,e),De(this.container,e)},`serviceWorker`in navigator&&navigator.serviceWorker.register(`sw.js`).catch(()=>{}),Re.inicializar(),J.inicializar(),setTimeout(()=>G(),500),setTimeout(()=>$.iniciarAutoBackup(),2e3),je(),q&&!q.dados.config.tourCompleted&&setTimeout(()=>Le(),1e3),(function(){let e=document.getElementById(`btnNotificacoes`),t=document.getElementById(`notifPanel`),n=document.getElementById(`notifLista`),r=document.getElementById(`notifBadge`);if(!e||!t)return;function i(){try{return JSON.parse(localStorage.getItem(`atelier-notif-lidas`)||`[]`)}catch{return[]}}function a(e){localStorage.setItem(`atelier-notif-lidas`,JSON.stringify(e))}function o(){let e=i(),t=X.obterRecentes(20).filter(t=>!e.includes(t.id)).length;t>0?(r.textContent=t>99?`99+`:String(t),r.style.display=`flex`):r.style.display=`none`}function s(){let e=i(),t=X.obterRecentes(20);if(t.length===0){n.innerHTML=`<div class="notif-vazio">ð Nenhuma notificação ainda.</div>`;return}n.innerHTML=t.map(t=>`
      <div class="notif-item ${e.includes(t.id)?``:`ni-nao-lida`}" data-id="${t.id}">
        <span class="ni-icone">${X.obterIcone(t.tipo)}</span>
        <div class="ni-conteudo">
          <div class="ni-titulo">${B(t.titulo)}</div>
          <div class="ni-detalhes">${B(t.detalhes||``)}</div>
          <div class="ni-tempo">${X.formatarTempo(new Date(t.timestamp))}</div>
        </div>
        <button class="ni-marcar" data-id="${t.id}" title="Marcar como lida">â</button>
      </div>
    `).join(``),n.querySelectorAll(`.ni-marcar`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.id,r=i();r.includes(n)||(r.push(n),a(r)),s(),o()})})}e.addEventListener(`click`,e=>{e.stopPropagation(),t.classList.toggle(`visivel`),t.classList.contains(`visivel`)&&s()}),document.addEventListener(`click`,n=>{!t.contains(n.target)&&n.target!==e&&!e.contains(n.target)&&t.classList.remove(`visivel`)}),document.getElementById(`notifMarcarLidas`)?.addEventListener(`click`,()=>{a(X.obterRecentes(20).map(e=>e.id)),s(),o()}),document.getElementById(`notifLimpar`)?.addEventListener(`click`,()=>{X.limpar(),a([]),s(),o()}),Y?.on(`nova-atividade`,()=>{o()}),o()})(),(function(){let e=document.getElementById(`globalDropOverlay`);e||(e=document.createElement(`div`),e.id=`globalDropOverlay`,e.className=`global-drop-overlay`,e.innerHTML=`<div class="gdo-content"><div class="gdo-icon">ð¸</div><div class="gdo-text">Solte para adicionar imagens</div><div class="gdo-hint">JPG · PNG â Múltiplos arquivos</div></div>`,document.body.appendChild(e));let t=0;document.addEventListener(`dragenter`,n=>{n.dataTransfer.types?.includes(`Files`)&&(clearTimeout(t),e.classList.add(`gdo-visivel`))}),document.addEventListener(`dragover`,e=>{e.dataTransfer.types?.includes(`Files`)&&e.preventDefault()}),document.addEventListener(`dragleave`,n=>{n.relatedTarget&&e.contains(n.relatedTarget)||(clearTimeout(t),t=setTimeout(()=>e.classList.remove(`gdo-visivel`),100))}),document.addEventListener(`drop`,t=>{t.preventDefault(),e.classList.remove(`gdo-visivel`);let n=t.dataTransfer.files;if(!n||n.length===0)return;let r=Array.from(n).filter(e=>e.type.startsWith(`image/`));if(r.length===0){i(`â\xA0ï¸ Apenas imagens (JPG/PNG) são suportadas.`,`erro`);return}r.length===1?(J?.navegar(`catalogo`),setTimeout(()=>Y.emitir(`abrir-nova-obra`),300)):(J?.navegar(`catalogo`),setTimeout(()=>{Z&&typeof Z.abrirImportacaoLote==`function`&&Z.abrirImportacaoLote()},400))})})(),new MutationObserver(()=>{Ee()}).observe(document.getElementById(`viewPrincipal`),{childList:!0,subtree:!0}),(function(){let e=window.location.hash;e&&e.startsWith(`#portal`)?setTimeout(()=>J.navegar(`portal`),200):e&&e.includes(`galeria=virtual`)&&setTimeout(()=>{J.navegar(`galeriaVirtual`),e.includes(`tour=obras-disponiveis`)&&Q&&setTimeout(()=>Q.iniciarTour(),800)},300)})(),typeof module<`u`&&module.exports&&(module.exports={DataStore:w,StoreBridge:Ce,pinia:M,obraStore:P,useObraStore:N,clienteStore:I,useClienteStore:F,vendaStore:R,useVendaStore:L,configStore:z,useConfigStore:xe,EventBus:T,ThemeEngine:te,Router:E,DashboardView:ne,CatalogoView:re,ClientesView:ie,VendasView:ae,CertificadosView:se,ReferenciasView:ce,GaleriaVirtualView:le,PrecificadorView:ue,AtelierView:de,RedeView:fe,DiarioView:O,PortalView:k,CloudSync:ye,EncomendasView:pe,ExposicoesView:ge,FinanceiroView:_e,ConfiguracoesView:ve,ExportImportView:he,ImageLightbox:me,abrirLightbox:j,imageLightbox:A,formatarMoeda:n,formatarData:r,classeStatus:l,rotuloStatus:u,classeStatusVenda:v,rotuloStatusVenda:y,sanitizarHTML:B,sanitizarURL:Te,sanitizarRich:V,debounce:Oe,gerarImagemPlaceholder:d,calcularObrasPorMes:f,gerarGraficoSVG:p,capitalizarTexto:_,abrirModal:s,fecharModal:c,mostrarToast:i,renderizarDashboard:we,renderizarViewPlaceholder:g,PDFGenerator:oe,gerarQRCodeDataUrl:b,observarImagens:Ee,aplicarTransicaoView:De,iniciarMonitorInatividade:G,bloquearTela:Ne,dispararConfetti:Pe,obterDicaDoDia:Ie,iniciarTour:Le});