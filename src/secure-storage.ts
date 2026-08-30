/**
 * Dados de acesso nunca devem entrar no backup comum nem ficar gravados em
 * localStorage. Esta pequena "cofre de sessão" mantém as credenciais somente
 * até o navegador ser fechado. Uma integração remota deve usar OAuth/PKCE ou
 * segredos do lado do servidor para persistência.
 */
const CHAVE_SESSAO = 'atelier_crm_credenciais_sessao';

export const CAMPOS_SENSIVEIS = [
  'pin', 'syncGoogleToken', 'syncWebDAVPass', 'syncWebDAVUser', 'syncWebDAVUrl', 'syncSupabaseAccessToken'
] as const;

export function lerCredenciaisDaSessao(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem(CHAVE_SESSAO) || '{}'); }
  catch { return {}; }
}

export function salvarCredenciaisNaSessao(config: Record<string, unknown>): void {
  const credenciais: Record<string, string> = {};
  CAMPOS_SENSIVEIS.forEach(campo => {
    const valor = config[campo];
    if (typeof valor === 'string' && valor) credenciais[campo] = valor;
  });
  try {
    if (Object.keys(credenciais).length) sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(credenciais));
    else sessionStorage.removeItem(CHAVE_SESSAO);
  } catch { /* armazenamento de sessão indisponível */ }
}

export function semCredenciais<T extends Record<string, any>>(dados: T): T {
  const copia = structuredClone(dados);
  if (!copia.config) return copia;
  CAMPOS_SENSIVEIS.forEach(campo => { delete copia.config[campo]; });
  return copia;
}

// ==================== PIN Hash (SHA-256 via Web Crypto API) ====================

const SALT_PIN = 'atelier-crm-pin-v1';

async function deriveKey(pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin + SALT_PIN);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function hashPin(pin: string): Promise<string> {
  return deriveKey(pin);
}

export async function verificarPin(entrada: string, hashArmazenado: string): Promise<boolean> {
  if (!entrada || !hashArmazenado) return false;
  const hashEntrada = await deriveKey(entrada);
  return hashEntrada === hashArmazenado;
}

export function isPinHashed(pin: string): boolean {
  return /^[a-f0-9]{64}$/.test(pin);
}
