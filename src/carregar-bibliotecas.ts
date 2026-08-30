// Carregamento dinâmico de bibliotecas CDN pesadas (code splitting)
const _cache = new Map<string, Promise<void>>();

function carregarScript(url: string): Promise<void> {
  if (_cache.has(url)) return _cache.get(url)!;
  const prom = new Promise<void>((resolve, reject) => {
    if (typeof document === 'undefined') { resolve(); return; }
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Falha ao carregar: ${url}`));
    document.head.appendChild(script);
  });
  _cache.set(url, prom);
  return prom;
}

export function carregarD3(): Promise<void> {
  return carregarScript('https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js');
}

export function carregarChartJS(): Promise<void> {
  return carregarScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js');
}
