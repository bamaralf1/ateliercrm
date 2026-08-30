// DataStore — Gerencia toda a persistência em localStorage
import { semCredenciais, isPinHashed, hashPin } from './secure-storage';
import { executarMigricoes, CURRENT_SCHEMA_VERSION } from './migrations';

export class DataStore {
  chave: string;
  dados: DadosCRM;

  constructor() {
    this.chave = 'atelier_crm_dados';
    this.dados = this.carregar();
    const migrou = executarMigricoes(this.dados);
    // Migração async: hashear PIN em texto plano
    if (this.dados.config && this.dados.config.pin && !isPinHashed(this.dados.config.pin)) {
      const pinAntigo = this.dados.config.pin;
      hashPin(pinAntigo).then(hashed => {
        this.dados.config.pin = hashed;
        this.salvar();
      });
    }
    if (migrou) this.salvar();
    // Migração async: imagens base64 → IDB
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).imageStore && this.dados.obras?.length) {
        (window as any).imageStore.migrar(this.dados.obras, this.dados.encomendas).then((migradas: number) => {
          if (migradas > 0) this.salvar();
        }).catch(() => {});
      }
    }, 2000);
  }

  estruturaPadrao() {
    return {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      obras: [],
      clientes: [],
      vendas: [],
      certificados: [],
      referencias: [],
      encomendas: [],
      exposicoes: [],
      transacoes: [],
      materiais: [],
      fornecedores: [],
      consumos: [],
      contatosProfissionais: [],
      interacoes: [],
      eventos: [],
      entradasDiario: [],
      etapasProcesso: [],
      portais: [],
      config: {
        artista: { nome: 'Meu Ateliê', email: '', telefone: '', assinatura: '' },
        tema: 'classico',
        contadorRecibos: {},
        contadorPropostas: {},
        contadorCertificados: {},
        textoGarantia: 'Este documento certifica a autenticidade da obra descrita acima, de autoria exclusiva do artista identificado neste recibo. A obra é entregue em perfeito estado de conservação, livre de quaisquer ônus. Reprodução, cópias ou uso comercial da imagem sem autorização expressa do artista são vedados.',
        precificador: {
          valorHora: 60,
          multiplicadorExperiencia: 1.5,
          metaMensal: 10000,
          metaAnual: 120000,
          metaInicio: new Date().toISOString().slice(0, 7)
        },
        idioma: 'pt-BR',
        altoContraste: false,
        tamanhoFonte: 'medio',
        pin: '',
        autoLock: false,
        tourCompleted: false,
        plano: {
          tier: 'free',
          ativo: false,
          pagamentoUrl: 'https://checkout.stripe.com/pay/cs_test_seu_link_aqui'
        }
      }
    };
  }

  carregar() {
    const bruto = localStorage.getItem(this.chave);
    if (bruto) {
      try { return JSON.parse(bruto); } catch (e) { console.error('Erro ao ler dados salvos, recriando estrutura.', e); }
    }
    const dadosIniciais = this.estruturaPadrao();
    this.dados = dadosIniciais;
    this.popularExemplos();
    this.salvar();
    return this.dados;
  }

  salvar() {
    try {
      // Backups e persistência local não carregam PIN, tokens ou senhas.
      localStorage.setItem(this.chave, JSON.stringify(semCredenciais(this.dados)));
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        mostrarToast('Armazenamento local cheio. Exporte um backup e limpe dados antigos para continuar salvando.', 'erro');
      } else {
        mostrarToast('Erro ao salvar dados: ' + e.message, 'erro');
      }
    }
  }

  listar(colecao) { return this.dados[colecao] || []; }

  adicionar(colecao, item) {
    item.id = crypto.randomUUID ? crypto.randomUUID() : 'id_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    item.criadoEm = item.criadoEm || new Date().toISOString();
    this.dados[colecao].push(item);
    this.salvar();
    return item;
  }

  atualizar(colecao, id, novosCampos) {
    const item = this.dados[colecao].find(i => i.id === id);
    if (item) { Object.assign(item, novosCampos); this.salvar(); }
    return item;
  }

  remover(colecao, id) {
    this.dados[colecao] = this.dados[colecao].filter(i => i.id !== id);
    this.salvar();
  }

  buscarPorId(colecao, id) { return this.dados[colecao].find(i => i.id === id); }

  popularExemplos() {
    const agora = new Date();
    const mesesAtras = (n) => { const d = new Date(agora); d.setMonth(d.getMonth() - n); return d.toISOString(); };

    this.dados.obras = [
      { id: 'obra_ex_1', titulo: 'Marinha ao Entardecer', tecnica: 'óleo', dimensoes: { altura: 60, largura: 80, profundidade: 0 }, ano: 2024, descricao: 'Estudo de luz sobre o mar ao entardecer, com pinceladas soltas capturando o movimento das ondas e o reflexo dourado do sol.', preco: 3200, status: 'disponível', imagem: gerarImagemPlaceholder('#d97757', '🌅'), dataCadastro: mesesAtras(1), criadoEm: mesesAtras(1), serie: 'Paisagens Marinhas', custoMateriais: 420, horasTrabalho: 28, historicoPrecos: [{ preco: 2800, data: '2025-06-01', motivo: 'Ajuste inicial' },         { preco: 3200, data: '2025-09-15', motivo: 'Reajuste por demanda' }], imagens: [gerarImagemPlaceholder('#d97757', '🌅'), gerarImagemPlaceholder('#e8a060', '🌊')], imagemDestacada: gerarImagemPlaceholder('#d97757', '🌅') },
      { id: 'obra_ex_2', titulo: 'Autorretrato em Ocre', tecnica: 'óleo', dimensoes: { altura: 50, largura: 40, profundidade: 0 }, ano: 2023, descricao: 'Autorretrato em tons terrosos, explorando contrastes de luz e sombra sobre o rosto.', preco: 2100, status: 'vendida', imagem: gerarImagemPlaceholder('#8b5e3c', '🧑‍<i class="fas fa-palette"></i>'), dataCadastro: mesesAtras(5), criadoEm: mesesAtras(5), serie: '', custoMateriais: 180, horasTrabalho: 16, historicoPrecos: [{ preco: 1500, data: '2024-10-01', motivo: 'Preço inicial' }, { preco: 1800, data: '2025-02-10', motivo: 'Ajuste' }, { preco: 2100, data: '2025-06-20', motivo: 'Valorização' }], imagens: [gerarImagemPlaceholder('#8b5e3c', '🧑‍<i class="fas fa-palette"></i>')], imagemDestacada: gerarImagemPlaceholder('#8b5e3c', '🧑‍<i class="fas fa-palette"></i>') },
      { id: 'obra_ex_3', titulo: 'Jardim das Aquarelas', tecnica: 'aquarela', dimensoes: { altura: 30, largura: 40, profundidade: 0 }, ano: 2024, descricao: 'Composição floral em técnica úmida sobre úmido, valorizando a transparência da aquarela.', preco: 850, status: 'reservada', imagem: gerarImagemPlaceholder('#e8a0bf', '🌸'), dataCadastro: mesesAtras(2), criadoEm: mesesAtras(2), serie: 'Jardins', custoMateriais: 90, horasTrabalho: 8, imagens: [gerarImagemPlaceholder('#e8a0bf', '🌸')], imagemDestacada: gerarImagemPlaceholder('#e8a0bf', '🌸') },
      { id: 'obra_ex_4', titulo: 'Ipê Amarelo', tecnica: 'aquarela', dimensoes: { altura: 25, largura: 35, profundidade: 0 }, ano: 2025, descricao: 'Estudo rápido de um ipê florido, feito em plein air durante o início da primavera.', preco: 620, status: 'em exposição', imagem: gerarImagemPlaceholder('#f2c14e', '🌼'), dataCadastro: mesesAtras(0), criadoEm: mesesAtras(0), serie: 'Jardins', custoMateriais: 70, horasTrabalho: 6, imagens: [gerarImagemPlaceholder('#f2c14e', '🌼')], imagemDestacada: gerarImagemPlaceholder('#f2c14e', '🌼') },
      { id: 'obra_ex_5', titulo: 'Forma em Repouso', tecnica: 'escultura', dimensoes: { altura: 45, largura: 22, profundidade: 20 }, ano: 2023, descricao: 'Escultura em bronze fundido, explorando curvas orgânicas e o equilíbrio entre volume e vazio.', preco: 5400, status: 'disponível', imagem: gerarImagemPlaceholder('#7a7a7a', '🗿'), dataCadastro: mesesAtras(4), criadoEm: mesesAtras(4), serie: '', custoMateriais: 1200, horasTrabalho: 60, historicoPrecos: [{ preco: 4800, data: '2024-08-01', motivo: 'Preço inicial' }, { preco: 5400, data: '2025-03-10', motivo: 'Reajuste anual' }], imagens: [gerarImagemPlaceholder('#7a7a7a', '🗿')], imagemDestacada: gerarImagemPlaceholder('#7a7a7a', '🗿') }
    ];

    this.dados.clientes = [
      { id: 'cli_ex_1', nome: 'Fernanda Alcântara', email: 'fernanda@exemplo.com', telefone: '(21) 99999-0001', endereco: 'Rua das Palmeiras, 120 - Rio Bonito/RJ', notas: 'Colecionadora frequente, prefere obras em aquarela com temas florais.', tags: ['colecionadora', 'aquarela'], aquisicoes: 1, criadoEm: mesesAtras(3) },
      { id: 'cli_ex_2', nome: 'Ricardo Bittencourt', email: 'ricardo.bit@exemplo.com', telefone: '(21) 98888-0002', endereco: 'Av. Atlântica, 500 - Rio de Janeiro/RJ', notas: 'Interessado em esculturas para decoração de escritório.', tags: ['interessado', 'escultura'], aquisicoes: 0, criadoEm: mesesAtras(1) }
    ];

    this.dados.vendas = [
      { id: 'venda_ex_1', numeroRecibo: 'REC-' + agora.getFullYear() + '-001', obraId: 'obra_ex_3', clienteId: 'cli_ex_1', precoFinal: 850, valorTotal: 850, data: mesesAtras(2), dataVenda: mesesAtras(2), formaPagamento: 'à vista', status: 'paga', criadoEm: mesesAtras(2) }
    ];
    this.dados.config.contadorRecibos[agora.getFullYear()] = 1;

    this.dados.encomendas = [
      { id: 'enc_ex_1', clienteNome: 'Fernanda Alcântara', clienteEmail: 'fernanda@exemplo.com', clienteTelefone: '(21) 99999-0001', descricao: 'Retrato em aquarela 40x60cm — jardim particular', prazo: new Date(agora.getFullYear(), agora.getMonth() + 2, 15).toISOString(), status: 'em_andamento', valor: 1200, atualizacoes: [{ data: new Date(agora.getFullYear(), agora.getMonth(), 10).toISOString(), status: 'criado', mensagem: 'Pedido recebido, aguardando referências fotográficas.' }, { data: new Date(agora.getFullYear(), agora.getMonth(), 18).toISOString(), status: 'em_andamento', mensagem: 'Esboço inicial aprovado. Iniciando camadas de cor.' }], imagens: [], criadoEm: mesesAtras(0) },
      { id: 'enc_ex_2', clienteNome: 'Ricardo Bittencourt', clienteEmail: 'ricardo.bit@exemplo.com', clienteTelefone: '(21) 98888-0002', descricao: 'Escultura em bronze 35cm — figura abstrata', prazo: new Date(agora.getFullYear(), agora.getMonth() + 4, 1).toISOString(), status: 'criado', valor: 3500, atualizacoes: [{ data: new Date(agora.getFullYear(), agora.getMonth(), 5).toISOString(), status: 'criado', mensagem: 'Pedido registrado. Orçamento aprovado.' }], imagens: [], criadoEm: mesesAtras(0) }
    ];
    this.dados.portais = [];

    this.dados.certificados = [
      { id: 'cert_ex_1', numeroSerie: 'ART-' + agora.getFullYear() + '-001', obraId: 'obra_ex_3', tituloObra: 'Jardim das Aquarelas', tecnica: 'aquarela', dimensoesTexto: '30 x 40 cm', ano: 2024, edicaoTipo: 'unica', edicaoAtual: null, edicaoTotal: null, local: 'Rio Bonito/RJ', dataEmissao: mesesAtras(2), imagem: gerarImagemPlaceholder('#e8a0bf', '🌸'), criadoEm: mesesAtras(2) }
    ];
    this.dados.config.contadorCertificados[agora.getFullYear()] = 1;

    this.dados.referencias = [
      { id: 'ref_ex_1', tipo: 'imagem', imagem: gerarImagemPlaceholder('#ffcda3', '🌅'), titulo: 'Paleta de pôr do sol', nota: '', url: '', tags: ['cor', 'laranja', 'quente'], categoria: 'cor', obraVinculada: 'obra_ex_1', criadoEm: mesesAtras(2) },
      { id: 'ref_ex_2', tipo: 'nota', imagem: '', titulo: 'Ideia para série floral', nota: 'Explorar aquarela úmida sobre úmido com flores tropicais...', url: '', tags: ['aquarela', 'jardim', 'ideia'], categoria: 'época', obraVinculada: 'obra_ex_3', criadoEm: mesesAtras(3) },
      { id: 'ref_ex_3', tipo: 'link', imagem: '', titulo: 'Referência de luz - pintura impressionista', nota: '', url: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Claude_Monet%2C_Impression%2C_soleil_levant.jpg', tags: ['artista', 'luz', 'impressionismo'], categoria: 'artista', obraVinculada: '', criadoEm: mesesAtras(4) }
    ];

    const hoje = new Date();
    const dia = (n) => { const d = new Date(hoje); d.setDate(d.getDate() - n); return d.toISOString(); };
    const diaStr = (n) => { const d = new Date(hoje); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };
    this.dados.entradasDiario = [
      { id: 'dia_ex_7', data: dia(7), humor: 4, oQueTrabalhou: '<p>Finalizei a camada de velatura...</p>', obrasTrabalhadas: ['obra_ex_1'], fotos: [], horasTrabalhadas: 4.5, bloqueios: '', avancos: 'Velatura do céu concluída com sucesso', descobertas: 'Misturar um toque de alizarim crimson no azul ultramar dá um violeta sutil incrível para as nuvens', criadoEm: dia(7) },
      { id: 'dia_ex_6', data: dia(6), humor: 3, oQueTrabalhou: '<p>Dia de organização do ateliê...</p>', obrasTrabalhadas: ['obra_ex_4'], fotos: [], horasTrabalhadas: 3, bloqueios: 'Dificuldade em capturar a luz...', avancos: 'A organização trouxe clareza mental.', descobertas: 'Usar máscara líquida nos brancos...', criadoEm: dia(6) },
      { id: 'dia_ex_5', data: dia(5), humor: 5, oQueTrabalhou: '<p>Dia intenso na "Forma em Repouso"...</p>', obrasTrabalhadas: ['obra_ex_5'], fotos: [], horasTrabalhadas: 7, bloqueios: '', avancos: 'Pátina verde alcançou o tom ideal!', descobertas: 'Aplicar a pátina com pincel de cerdas macias...', criadoEm: dia(5) },
      { id: 'dia_ex_4', data: dia(4), humor: 2, oQueTrabalhou: '<p>Dia frustrante. A tela grande...</p>', obrasTrabalhadas: [], fotos: [], horasTrabalhadas: 2, bloqueios: 'Chassis empenado por causa da chuva.', avancos: '', descobertas: 'Preciso comprar um desumidificador...', criadoEm: dia(4) },
      { id: 'dia_ex_3', data: dia(3), humor: 4, oQueTrabalhou: '<p>Voltei para a aquarela "Jardim das Aquarelas"...</p>', obrasTrabalhadas: ['obra_ex_3'], fotos: [], horasTrabalhadas: 5, bloqueios: '', avancos: 'Cliente visitou o ateliê...', descobertas: 'Misturar violeta de cobalto com siena natural...', criadoEm: dia(3) },
      { id: 'dia_ex_2', data: dia(2), humor: 1, oQueTrabalhou: '<p>Dia administrativo...</p>', obrasTrabalhadas: [], fotos: [], horasTrabalhadas: 1.5, bloqueios: 'Bloqueio criativo total.', avancos: 'Pelo menos a papelada está em dia.', descobertas: 'Dias administrativos são necessários...', criadoEm: dia(2) },
      { id: 'dia_ex_1', data: dia(1), humor: 5, oQueTrabalhou: '<p>Dia mais produtivo da semana...</p>', obrasTrabalhadas: ['obra_ex_4'], fotos: [], horasTrabalhadas: 8, bloqueios: '', avancos: 'Ipê Amarelo finalizado!', descobertas: 'Usar um palito de dentes para respingar...', criadoEm: dia(1) }
    ];

    this.dados.etapasProcesso = [
      { id: 'proc_ex_1', obraId: 'obra_ex_4', etapas: [
        { id: 'etp_1', titulo: 'Sketch inicial', data: diaStr(14), descricao: 'Desenho a lápis...', notasTecnicas: 'Lápis 2B, papel Canson 180g', foto: '', videoLink: '' },
        { id: 'etp_2', titulo: 'Estudo de cor', data: diaStr(12), descricao: 'Paleta restrita...', notasTecnicas: 'Aquarela Windsor & Newton', foto: '', videoLink: '' },
        { id: 'etp_3', titulo: 'Primeira camada (fundos)', data: diaStr(10), descricao: 'Lavagem úmida...', notasTecnicas: 'Pincel chato nº 14', foto: '', videoLink: '' },
        { id: 'etp_4', titulo: 'Camadas intermediárias', data: diaStr(7), descricao: 'Construção das formas...', notasTecnicas: 'Pincel redondo nº 6', foto: '', videoLink: '' },
        { id: 'etp_5', titulo: 'Detalhamento', data: diaStr(4), descricao: 'Detalhes finos...', notasTecnicas: 'Pincel liner nº 1', foto: '', videoLink: '' },
        { id: 'etp_6', titulo: 'Finalização', data: diaStr(1), descricao: 'Assinatura e ajustes finais...', notasTecnicas: 'Caneta nanquim', foto: '', videoLink: '' }
      ], criadoEm: dia(14) },
      { id: 'proc_ex_2', obraId: 'obra_ex_1', etapas: [
        { id: 'etp_2_1', titulo: 'Sketch inicial', data: diaStr(45), descricao: 'Composição em carvão...', notasTecnicas: 'Carvão vegetal', foto: '', videoLink: '' },
        { id: 'etp_2_2', titulo: 'Imprimatura', data: diaStr(42), descricao: 'Camada fina de acrílico...', notasTecnicas: 'Acrílico transparente', foto: '', videoLink: '' },
        { id: 'etp_2_3', titulo: 'Primeira camada a óleo', data: diaStr(38), descricao: 'Manchas grossas...', notasTecnicas: 'Óleo Windsor & Newton', foto: '', videoLink: '' },
        { id: 'etp_2_4', titulo: 'Velaturas', data: diaStr(25), descricao: 'Camadas finas...', notasTecnicas: 'Meio de velatura em gel', foto: '', videoLink: '' },
        { id: 'etp_2_5', titulo: 'Detalhamento das ondas', data: diaStr(15), descricao: 'Estudo das espumas...', notasTecnicas: 'Pincel redondo nº 4', foto: '', videoLink: '' }
      ], criadoEm: dia(45) }
    ];

    this.dados.transacoes = [
      { id: 'trans_ex_1', tipo: 'entrada', descricao: 'Venda - Jardim das Aquarelas', valor: 850, data: mesesAtras(2), criadoEm: mesesAtras(2) },
      { id: 'trans_ex_2', tipo: 'saida', descricao: 'Compra de materiais', valor: 220, data: mesesAtras(1), criadoEm: mesesAtras(1) }
    ];

    this.dados.materiais = [
      { id: 'mat_1', nome: 'Tinta Óleo Azul Ultramar', categoria: 'tintas', subcategoria: 'óleo', marca: 'Windsor & Newton', quantidade: 500, unidade: 'ml', quantidadeMinima: 100, local: 'Prateleira A3', dataAquisicao: '2025-01-15', validade: '2027-01-15', precoUnitario: 45, foto: '', notas: 'Tom indispensável para céus e águas' },
      { id: 'mat_2', nome: 'Tela de Algodão 50×70', categoria: 'superficies', subcategoria: 'tela', marca: 'Atlantis', quantidade: 8, unidade: 'un', quantidadeMinima: 3, local: 'Cavalete 2', dataAquisicao: '2025-03-10', validade: '', precoUnitario: 38, foto: '', notas: 'Tela tripla priming' },
      { id: 'mat_3', nome: 'Pincel Chato Nº 12', categoria: 'ferramentas', subcategoria: 'pincel', marca: 'Tigre', quantidade: 5, unidade: 'un', quantidadeMinima: 2, local: 'Porta-pincéis', dataAquisicao: '2025-02-20', validade: '', precoUnitario: 22, foto: '', notas: 'Cerdas sintéticas' },
      { id: 'mat_4', nome: 'Papel Aquarela 300g A3', categoria: 'superficies', subcategoria: 'papel', marca: 'Canson', quantidade: 15, unidade: 'un', quantidadeMinima: 5, local: 'Gaveta B1', dataAquisicao: '2025-04-05', validade: '', precoUnitario: 12, foto: '', notas: 'Granulação média' },
      { id: 'mat_5', nome: 'Tinta Acrílica Dourada', categoria: 'tintas', subcategoria: 'acrílico', marca: 'Acrilex', quantidade: 200, unidade: 'ml', quantidadeMinima: 50, local: 'Prateleira A1', dataAquisicao: '2025-05-01', validade: '2026-05-01', precoUnitario: 18, foto: '', notas: 'Acabamento metálico' },
      { id: 'mat_6', nome: 'Moldura Clássica 30×40', categoria: 'molduras', subcategoria: 'clássica', marca: 'Molduraz', quantidade: 2, unidade: 'un', quantidadeMinima: 4, local: 'Depósito', dataAquisicao: '2025-06-10', validade: '', precoUnitario: 65, foto: '', notas: '<i class="fas fa-exclamation-triangle"></i> ABAIXO DO MÍNIMO — repor urgente!' }
    ];
    this.dados.fornecedores = [
      { id: 'forn_1', nome: 'Casa do Artista', contato: '(11) 99999-0001', email: 'vendas@casaartista.com.br', especialidade: 'Tintas e pincéis', avaliacao: 4, notas: 'Bom prazo de entrega.', historicoCompras: [{ data: '2025-01-15', valor: 320, itens: 'Tintas diversas' }] },
      { id: 'forn_2', nome: 'Telas & Molduras Ltda', contato: '(21) 98888-0002', email: 'pedidos@telasmolduras.com', especialidade: 'Telas, papéis e molduras', avaliacao: 5, notas: 'Qualidade excepcional.', historicoCompras: [{ data: '2025-02-20', valor: 450, itens: 'Telas 50×70' }] }
    ];
    this.dados.consumos = [
      { id: 'cons_1', materialId: 'mat_1', obraId: 'obra_ex_1', quantidade: 120, data: '2025-06-10', notas: 'Camada de fundo do céu' },
      { id: 'cons_2', materialId: 'mat_1', obraId: 'obra_ex_1', quantidade: 80, data: '2025-06-12', notas: 'Reflexos do mar' },
      { id: 'cons_3', materialId: 'mat_2', obraId: 'obra_ex_1', quantidade: 1, data: '2025-06-05', notas: 'Suporte da obra' }
    ];

    this.dados.contatosProfissionais = [
      { id: 'cont_ex_1', nome: 'Ana Luísa Martins', categoria: 'galerista', instituicao: 'Galeria Martins & Associados', cargo: 'Diretora', contato: '(11) 99999-1001', email: 'ana@martinsgaleria.com.br', nivelRelacionamento: 4, ultimoContato: '2025-08-10', estagio: 'em_conversa' },
      { id: 'cont_ex_2', nome: 'Dr. Ricardo Tavares', categoria: 'curador', instituicao: 'Museu de Arte Moderna - SP', cargo: 'Curador-Chefe', contato: '(11) 98888-2002', email: 'rtavares@mam.org.br', nivelRelacionamento: 2, ultimoContato: '2025-09-05', estagio: 'primeira_aproximacao' },
      { id: 'cont_ex_3', nome: 'Carla Bergman', categoria: 'critico', instituicao: 'Arte & Crítica Magazine', cargo: 'Editora de Arte', contato: '(21) 97777-3003', email: 'carla@artecriticamag.com.br', nivelRelacionamento: 1, ultimoContato: '2025-09-20', estagio: 'novo_contato' },
      { id: 'cont_ex_4', nome: 'Felipe Nogueira', categoria: 'artista', instituicao: 'Coletivo Atelier Aberto', cargo: 'Artista Plástico', contato: '(31) 96666-4004', email: 'felipe@coletivoatelier.com.br', nivelRelacionamento: 5, ultimoContato: '2025-09-28', estagio: 'colaboracao_consolidada' },
      { id: 'cont_ex_5', nome: 'Marta Silveira', categoria: 'colecionador', cargo: 'Colecionadora', contato: '(21) 95555-5005', email: 'marta.silveira@email.com', nivelRelacionamento: 3, ultimoContato: '2025-09-15', estagio: 'parceria_ativa', vip: true }
    ];
    this.dados.interacoes = [
      { id: 'int_ex_1', contatoId: 'cont_ex_1', data: '2025-08-10', tipo: 'reuniao', resumo: 'Primeira reunião presencial...', sentimento: 'positivo', followUp: true, followUpNotas: 'Enviar fotos', anexos: [] },
      { id: 'int_ex_2', contatoId: 'cont_ex_1', data: '2025-09-01', tipo: 'email', resumo: 'Envio de portfólio...', sentimento: 'positivo', followUp: false, followUpNotas: '', anexos: [] },
      { id: 'int_ex_3', contatoId: 'cont_ex_4', data: '2025-09-28', tipo: 'visita', resumo: 'Visita ao ateliê do Felipe...', sentimento: 'positivo', followUp: true, followUpNotas: 'Definir cronograma', anexos: [] }
    ];
    this.dados.eventos = [
      { id: 'evt_ex_1', nome: 'SP-Arte 2026', tipo: 'feira', dataInscricao: '2025-10-01', dataEvento: '2026-04-15', dataFim: '2026-04-19', status: 'inscrito', resultado: '', investimento: 3500, retorno: 0, documentacao: ['Portfolio.pdf', 'Release'], obrasEnviadas: ['obra_ex_1', 'obra_ex_5'], notas: 'Maior feira de arte da América Latina.' },
      { id: 'evt_ex_2', nome: 'Edital Funarte Artes Visuais 2026', tipo: 'edital', dataInscricao: '2025-11-15', dataEvento: '2026-06-01', dataFim: '2026-12-31', status: 'pesquisando', investimento: 0, retorno: 0, documentacao: [], obrasEnviadas: [], notas: 'Edital federal para circulação de exposição.' }
    ];
  }

  exportarBackup() {
    mostrarLoading('Exportando backup...');
    const conteudo = JSON.stringify(semCredenciais(this.dados), null, 2);
    const blob = new Blob([conteudo], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `atelier-crm-backup-${timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    esconderLoading();
    this.salvarHistoricoExport('completo', this.dados);
  }

  exportarColecao(nomeColecao) {
    if (!this.dados[nomeColecao]) { console.error('Coleção não encontrada:', nomeColecao); return false; }
    const dadosExport = { [nomeColecao]: this.dados[nomeColecao], exportadoEm: new Date().toISOString(), versao: '1.0' };
    const conteudo = JSON.stringify(dadosExport, null, 2);
    const blob = new Blob([conteudo], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `atelier-crm-${nomeColecao}-${timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.salvarHistoricoExport(nomeColecao, dadosExport);
    return true;
  }

  salvarHistoricoExport(tipo, dados) {
    const historico = JSON.parse(localStorage.getItem('atelier-export-history') || '[]');
    historico.unshift({ tipo, data: new Date().toISOString(), tamanho: JSON.stringify(dados).length });
    if (historico.length > 10) historico.pop();
    localStorage.setItem('atelier-export-history', JSON.stringify(historico));
  }

  obterHistoricoExport() { return JSON.parse(localStorage.getItem('atelier-export-history') || '[]'); }

  importarBackup(jsonTexto) {
    try {
      const novosDados = JSON.parse(jsonTexto);
      if (!novosDados || typeof novosDados !== 'object' || Array.isArray(novosDados)) throw new Error('Formato inválido: esperado objeto');
      const colecoesEsperadas = ['obras', 'clientes', 'vendas', 'certificados', 'referencias', 'encomendas', 'portais', 'exposicoes', 'transacoes', 'materiais', 'fornecedores', 'consumos', 'contatosProfissionais', 'interacoes', 'eventos', 'entradasDiario', 'etapasProcesso'];
      const isBackupCompleto = colecoesEsperadas.some(c => c in novosDados) || 'config' in novosDados;
      const aliases = { pedidos: 'encomendas', consumicoes: 'consumos', contatos: 'contatosProfissionais', diario: 'entradasDiario', processos: 'etapasProcesso' };
      Object.entries(aliases).forEach(([antigo, atual]) => {
        if (novosDados[antigo] && !novosDados[atual]) novosDados[atual] = novosDados[antigo];
      });
      const invalidas = colecoesEsperadas.filter(c => c in novosDados && !Array.isArray(novosDados[c]));
      if (invalidas.length) throw new Error(`Coleções inválidas: ${invalidas.join(', ')}`);
      if (novosDados.config && (typeof novosDados.config !== 'object' || Array.isArray(novosDados.config))) throw new Error('Configuração inválida');
      if (isBackupCompleto) {
        const padrao = this.estruturaPadrao();
        this.dados = { ...padrao, ...novosDados, schemaVersion: CURRENT_SCHEMA_VERSION };
      } else {
        Object.keys(novosDados).forEach(chave => { if (chave !== 'exportadoEm' && chave !== 'versao' && chave !== 'schemaVersion') this.dados[chave] = novosDados[chave]; });
      }
      executarMigricoes(this.dados);
      this.salvar();
      return { sucesso: true, tipo: isBackupCompleto ? 'completo' : 'parcial' };
    } catch (e) { return { sucesso: false, erro: e.message }; }
  }

  previewImport(jsonTexto) {
    try {
      const dados = JSON.parse(jsonTexto);
      const preview = { valido: true, tipo: 'completo', colecoes: [] };
      const colecoesEsperadas = ['obras', 'clientes', 'vendas', 'certificados', 'referencias', 'encomendas', 'portais', 'exposicoes', 'transacoes', 'materiais', 'fornecedores', 'consumos', 'contatosProfissionais', 'interacoes', 'eventos', 'entradasDiario', 'etapasProcesso', 'config'];
      if (colecoesEsperadas.some(c => c in dados)) {
        preview.colecoes = colecoesEsperadas.filter(c => c in dados).map(c => ({ nome: c, quantidade: Array.isArray(dados[c]) ? dados[c].length : Object.keys(dados[c]).length }));
      } else {
        preview.tipo = 'parcial';
        preview.colecoes = Object.keys(dados).filter(k => k !== 'exportadoEm' && k !== 'versao').map(k => ({ nome: k, quantidade: Array.isArray(dados[k]) ? dados[k].length : Object.keys(dados[k]).length }));
      }
      return preview;
    } catch (e) { return { valido: false, erro: e.message }; }
  }
}
