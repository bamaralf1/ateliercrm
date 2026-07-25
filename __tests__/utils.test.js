const {
  formatarMoeda,
  formatarData,
  classeStatus,
  rotuloStatus,
  classeStatusVenda,
  rotuloStatusVenda,
  sanitizarHTML,
  sanitizarURL,
  sanitizarRich,
  debounce,
  capitalizarTexto,
  gerarImagemPlaceholder
} = require('../js/atelier-crm.js');

describe('formatarMoeda', () => {
  test('formata número inteiro', () => {
    expect(formatarMoeda(1500)).toMatch(/1\.500,/);
  });
  test('formata zero', () => {
    expect(formatarMoeda(0)).toMatch(/0,/);
  });
  test('formata valor nulo/undefined como zero', () => {
    expect(formatarMoeda(null)).toMatch(/0,/);
    expect(formatarMoeda(undefined)).toMatch(/0,/);
  });
});

describe('formatarData', () => {
  test('formata data ISO no formato brasileiro', () => {
    const result = formatarData('2025-09-15T12:00:00');
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect(result).toContain('/09/2025');
  });
  test('retorna traço para data inválida', () => {
    expect(formatarData('')).toBe('-');
    expect(formatarData(null)).toBe('-');
  });
});

describe('classeStatus / rotuloStatus', () => {
  test('mapeia status de obra corretamente', () => {
    expect(classeStatus('disponivel')).toBe('disponivel');
    expect(classeStatus('disponível')).toBe('disponivel');
    expect(rotuloStatus('disponivel')).toBe('Disponível');
    expect(rotuloStatus('disponível')).toBe('Disponível');
    expect(rotuloStatus('vendida')).toBe('Vendida');
  });
  test('fallback para status desconhecido', () => {
    expect(rotuloStatus('fake')).toBe('Disponível');
  });
});

describe('classeStatusVenda / rotuloStatusVenda', () => {
  test('mapeia status de venda corretamente', () => {
    expect(classeStatusVenda('negociacao')).toBe('negociacao');
    expect(rotuloStatusVenda('negociacao')).toBe('Negociação');
    expect(rotuloStatusVenda('paga')).toBe('Paga');
  });
  test('fallback para status desconhecido', () => {
    expect(rotuloStatusVenda('concluida')).toBe('concluida');
  });
});

describe('sanitizarHTML', () => {
  test('escapa tags HTML', () => {
    expect(sanitizarHTML('<script>alert("xss")</script>'))
      .toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });
  test('retorna string vazia para null/undefined', () => {
    expect(sanitizarHTML(null)).toBe('');
    expect(sanitizarHTML(undefined)).toBe('');
  });
});

describe('sanitizarURL', () => {
  test('permite URLs http/https', () => {
    expect(sanitizarURL('https://exemplo.com/img.jpg')).toBe('https://exemplo.com/img.jpg');
  });
  test('bloqueia javascript: URLs', () => {
    expect(sanitizarURL('javascript:alert(1)')).toBe('');
  });
});

describe('sanitizarRich', () => {
  test('preserva tags seguras', () => {
    expect(sanitizarRich('<p><strong>texto</strong></p>')).toBe('<p><strong>texto</strong></p>');
  });
  test('escapa tags perigosas', () => {
    expect(sanitizarRich('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
  });
  test('escapa conteúdo de texto', () => {
    expect(sanitizarRich('<p>a < b & c > d</p>')).toBe('<p>a &lt; b &amp; c &gt; d</p>');
  });
  test('remove atributos perigosos (event handlers)', () => {
    const result = sanitizarRich('<p onclick="xss()">parágrafo</p>');
    expect(result).toBe('<p>parágrafo</p>');
  });
  test('preserva tag com atributo style', () => {
    expect(sanitizarRich('<span style="color:red">texto</span>')).toBe('<span style="color:red">texto</span>');
  });
  test('remove event handlers mas preserva atributos seguros', () => {
    expect(sanitizarRich('<div onclick="xss()" style="color:red">texto</div>')).toBe('<div style="color:red">texto</div>');
  });
  test('retorna vazio para null/undefined', () => {
    expect(sanitizarRich(null)).toBe('');
    expect(sanitizarRich(undefined)).toBe('');
  });
});

describe('capitalizarTexto', () => {
  test('capitaliza primeira letra', () => {
    expect(capitalizarTexto('hello world')).toBe('Hello world');
  });
});

describe('gerarImagemPlaceholder', () => {
  test('retorna data URL SVG', () => {
    const url = gerarImagemPlaceholder('#fff', '🎨');
    expect(url).toContain('data:image/svg+xml');
    expect(url).toContain('%23fff');
  });
});

describe('debounce', () => {
  jest.useFakeTimers();

  test('atrasa a chamada da função', () => {
    const fn = jest.fn();
    const deb = debounce(fn, 300);
    deb();
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('cancela chamadas anteriores', () => {
    const fn = jest.fn();
    const deb = debounce(fn, 100);
    deb();
    deb();
    deb();
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});