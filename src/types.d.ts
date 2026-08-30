/* Globais injetadas pelo jsPDF (CDN) e pelo módulo de tradução */
interface Window {
  jspdf: { jsPDF: new (format?: string, unit?: string) => jsPDFInstance };
  AtelierCRMTranslations: { locale: string; t: (key: string) => string; };
  _toastTimeout?: ReturnType<typeof setTimeout>;
}

interface jsPDFInstance {
  addPage: () => void;
  text: (text: string, x: number, y: number, opts?: Record<string, unknown>) => void;
  addFont: (url: string, name: string, style: string) => void;
  setFont: (name: string) => void;
  setFontSize: (size: number) => void;
  setTextColor: (r: number, g: number, b: number) => void;
  addImage: (img: string, type: string, x: number, y: number, w: number, h: number) => void;
  output: (type: string) => string | Blob;
  save: (filename: string) => void;
  internal: { pageSize: { getWidth: () => number; getHeight: () => number; } };
  getNumberOfPages: () => number;
}

/* Estruturas de dados do CRM */
interface DadosCRM {
  schemaVersion?: number;
  obras: Obra[];
  clientes: Cliente[];
  vendas: Venda[];
  certificados: Certificado[];
  referencias: Referencia[];
  encomendas: Encomenda[];
  portais: PortalCliente[];
  exposicoes: Exposicao[];
  transacoes: Transacao[];
  materiais: Material[];
  fornecedores: Fornecedor[];
  consumos: Consumo[];
  contatosProfissionais: ContatoProf[];
  interacoes: Interacao[];
  eventos: EventoCRM[];
  entradasDiario: EntradaDiario[];
  etapasProcesso: EtapaProcesso[];
  config: ConfigCRM;
}

interface Obra {
  id: string;
  titulo: string;
  tecnica: string;
  dimensoes: { altura: number; largura: number; profundidade: number; };
  ano?: number;
  descricao: string;
  preco: number;
  status: string;
  imagem: string;
  imagens: string[];
  imagemDestacada: string;
  dataCadastro: string;
  criadoEm: string;
  serie: string;
  custoMateriais: number;
  horasTrabalho: number;
  historicoPrecos?: { preco: number; data: string; motivo: string; }[];
}

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  notas: string;
  tags: string[];
  aquisicoes: number;
  criadoEm: string;
}

interface Venda {
  id: string;
  numeroRecibo?: string;
  obraId: string;
  clienteId: string;
  precoFinal: number;
  valorTotal: number;
  data: string;
  dataVenda: string;
  formaPagamento: string;
  status: string;
  criadoEm: string;
}

interface Certificado {
  id: string;
  numeroSerie: string;
  obraId: string;
  tituloObra: string;
  tecnica: string;
  dimensoesTexto: string;
  ano: number;
  edicaoTipo: string;
  edicaoAtual: number | null;
  edicaoTotal: number | null;
  local: string;
  dataEmissao: string;
  imagem: string;
  criadoEm: string;
}

interface Referencia {
  id: string;
  tipo: string;
  imagem: string;
  titulo: string;
  nota: string;
  url: string;
  tags: string[];
  categoria: string;
  obraVinculada: string;
  criadoEm: string;
}

interface Encomenda {
  id: string;
  clienteNome: string;
  clienteEmail: string;
  clienteTelefone: string;
  descricao: string;
  prazo: string;
  status: string;
  valor: number;
  atualizacoes: { data: string; status: string; mensagem: string; }[];
  imagens: string[];
  criadoEm: string;
}

interface PortalCliente {
  id: string;
  clienteId: string;
  encomendaId?: string;
  clienteNome: string;
  token: string;
  ativo: boolean;
  criadoEm: string;
  ultimoAcesso: string;
}
interface Exposicao { id: string; [key: string]: unknown; }
interface Transacao { id: string; tipo: string; descricao: string; valor: number; data: string; criadoEm: string; }
interface Material { id: string; nome: string; categoria: string; quantidade: number; [key: string]: unknown; }
interface Fornecedor { id: string; nome: string; [key: string]: unknown; }
interface Consumo { id: string; materialId: string; obraId: string; quantidade: number; data: string; [key: string]: unknown; }
interface ContatoProf { id: string; nome: string; [key: string]: unknown; }
interface Interacao { id: string; contatoId: string; data: string; tipo: string; resumo: string; [key: string]: unknown; }
interface EventoCRM { id: string; nome: string; tipo: string; [key: string]: unknown; }
interface EntradaDiario { id: string; data: string; humor: number; [key: string]: unknown; }
interface EtapaProcesso { id: string; obraId: string; etapas: { id: string; titulo: string; data: string; descricao: string; [key: string]: unknown; }[]; criadoEm: string; }
interface ConfigCRM { artista: { nome: string; email: string; telefone: string; assinatura: string; }; tema: string; contadorRecibos: Record<string, number>; contadorPropostas: Record<string, number>; contadorCertificados: Record<string, number>; textoGarantia: string; precificador: { valorHora: number; multiplicadorExperiencia: number; metaMensal: number; metaAnual: number; metaInicio: string; }; precificadorRegras: { id: string; nome: string; tecnica: string; larguraMin: number; larguraMax: number; alturaMin: number; complexidade: number; multiplicador: number; precoBase: number; }[]; moedaPadrao: string; taxasCambio: Record<string, number>; idioma: string; altoContraste: boolean; tamanhoFonte: string; pin: string; autoLock: boolean; tourCompleted: boolean; syncGoogleClientId: string; syncGoogleToken: string; syncWebDAVUrl: string; syncWebDAVUser: string; syncWebDAVPass: string; syncAutoBackup: boolean; syncAutoBackupInterval: number; syncLastBackup: string; plano?: { tier: 'free' | 'premium'; ativo: boolean; dataAtivacao?: string; pagamentoUrl?: string; }; supabaseUrl?: string; supabasePublishableKey?: string; syncSupabaseAccessToken?: string; syncSupabaseUserId?: string; }
