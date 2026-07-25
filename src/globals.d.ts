// Globais do Atelier CRM — funções expostas no escopo global pelo main.ts

declare function mostrarToast(mensagem: string, tipo?: string): void;
declare function mostrarLoading(mostrar: boolean): void;
declare function esconderLoading(): void;
declare function abrirModal(titulo: string, conteudo: string): void;
declare function fecharModal(): void;
declare function debounce<T extends (...args: unknown[]) => unknown>(fn: T, ms: number): T;
declare function formatarMoeda(valor: number): string;
declare function formatarData(data: string | Date): string;
declare function capitalizarTexto(texto: string): string;
declare function classeStatus(status: string): string;
declare function rotuloStatus(status: string): string;
declare function classeStatusVenda(status: string): string;
declare function rotuloStatusVenda(status: string): string;
declare function gerarId(): string;
declare function lerArquivoComoBase64(file: File): Promise<string>;
declare function sanitizarHTML(str: string): string;
declare function salvarHistorico(termo: string): void;

// Biblioteca de códigos de barras / QR Code
declare class QRCode {
  constructor(el: HTMLElement, opts: { text: string; width?: number; height?: number });
  makeCode(msg: string): void;
}

// CDN globals
declare const THREE: typeof import('three');
declare const d3: typeof import('d3');
declare const Chart: typeof import('chart.js');
// jsPDF é carregado como "window.jspdf"
declare namespace jspdf {
  class jsPDF {
    constructor(opts?: { orientation?: string; unit?: string; format?: string });
    addPage(): void;
    setFontSize(size: number): void;
    text(text: string, x: number, y: number, opts?: { align?: string; maxWidth?: number }): void;
    addImage(img: string, format: string, x: number, y: number, w: number, h: number): void;
    save(name: string): void;
    output(type: string): string;
    setDrawColor(r: number, g?: number, b?: number): void;
    line(x1: number, y1: number, x2: number, y2: number): void;
  }
}
// Declaração do módulo vue para o concat
declare module 'vue' {
  export function shallowRef<T>(value: T): { value: T };
  export function computed<T>(fn: () => T): { value: T };
  export function toRefs<T>(obj: T): T;
  export function watch<T>(source: () => T, callback: (val: T, oldVal: T) => void): void;
}
declare module 'pinia' {
  export function defineStore(id: string, options: { state: () => Record<string, unknown>; getters?: Record<string, unknown>; actions?: Record<string, unknown> }): unknown;
  export function createPinia(): unknown;
  export function getActivePinia(): unknown;
  export function setActivePinia(pinia: unknown): void;
}
