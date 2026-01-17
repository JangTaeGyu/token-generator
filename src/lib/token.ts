export const TOKEN_TYPES = [
  { id: 'random-64', name: 'Random 64', desc: '영문+숫자 64자', category: 'random' },
  { id: 'random-128', name: 'Random 128', desc: '영문+숫자 128자', category: 'random' },
  { id: 'random-256', name: 'Random 256', desc: '영문+숫자 256자', category: 'random' },
  { id: 'uuid-v4', name: 'UUID v4', desc: '랜덤 기반 (가장 일반적)', category: 'uuid' },
  { id: 'uuid-v1', name: 'UUID v1', desc: '타임스탬프 + MAC 기반', category: 'uuid' },
  { id: 'uuid-v7', name: 'UUID v7', desc: '타임스탬프 + 랜덤 (최신)', category: 'uuid' },
  { id: 'hex-32', name: 'Hex 32', desc: '16진수 32자', category: 'hex' },
  { id: 'hex-64', name: 'Hex 64', desc: '16진수 64자', category: 'hex' },
  { id: 'base64-32', name: 'Base64 32', desc: 'Base64 인코딩 32자', category: 'base64' },
  { id: 'base64-64', name: 'Base64 64', desc: 'Base64 인코딩 64자', category: 'base64' },
  { id: 'api-key', name: 'API Key', desc: 'sk_live_xxx 형식', category: 'api' },
  { id: 'bearer', name: 'Bearer Token', desc: 'JWT 스타일 토큰', category: 'api' },
  { id: 'numeric-6', name: 'OTP 6자리', desc: '숫자만 6자리', category: 'numeric' },
  { id: 'numeric-8', name: 'OTP 8자리', desc: '숫자만 8자리', category: 'numeric' },
] as const;

export const CATEGORIES = [
  { id: 'all', name: '전체' },
  { id: 'random', name: 'Random' },
  { id: 'uuid', name: 'UUID' },
  { id: 'hex', name: 'Hex' },
  { id: 'base64', name: 'Base64' },
  { id: 'api', name: 'API Key' },
  { id: 'numeric', name: 'Numeric' },
] as const;

export type TokenTypeId = typeof TOKEN_TYPES[number]['id'];
export type CategoryId = typeof CATEGORIES[number]['id'];

const CHARS = {
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  hex: '0123456789abcdef',
  base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  numeric: '0123456789',
  variant: '89ab',
};

const randomStr = (charset: string, length: number): string => {
  return Array.from({ length }, () =>
    charset[Math.floor(Math.random() * charset.length)]
  ).join('');
};

const generateUUID = (version: 1 | 4 | 7): string => {
  const getHex = (len: number) => randomStr(CHARS.hex, len);
  const timestamp = Date.now().toString(16).padStart(12, '0');

  switch (version) {
    case 1:
      return `${timestamp.slice(-8)}-${timestamp.slice(-12, -8)}-1${getHex(3)}-${randomStr(CHARS.variant, 1)}${getHex(3)}-${getHex(12)}`;
    case 4:
      return `${getHex(8)}-${getHex(4)}-4${getHex(3)}-${randomStr(CHARS.variant, 1)}${getHex(3)}-${getHex(12)}`;
    case 7:
      return `${timestamp.slice(0, 8)}-${timestamp.slice(8, 12)}-7${getHex(3)}-${randomStr(CHARS.variant, 1)}${getHex(3)}-${getHex(12)}`;
    default:
      return `${getHex(8)}-${getHex(4)}-4${getHex(3)}-${randomStr(CHARS.variant, 1)}${getHex(3)}-${getHex(12)}`;
  }
};

export const generateToken = (type: TokenTypeId): string => {
  switch (type) {
    case 'random-64':
      return randomStr(CHARS.alphanumeric, 64);
    case 'random-128':
      return randomStr(CHARS.alphanumeric, 128);
    case 'random-256':
      return randomStr(CHARS.alphanumeric, 256);
    case 'uuid-v1':
      return generateUUID(1);
    case 'uuid-v4':
      return generateUUID(4);
    case 'uuid-v7':
      return generateUUID(7);
    case 'hex-32':
      return randomStr(CHARS.hex, 32);
    case 'hex-64':
      return randomStr(CHARS.hex, 64);
    case 'base64-32':
      return randomStr(CHARS.base64, 32);
    case 'base64-64':
      return randomStr(CHARS.base64, 64);
    case 'api-key':
      return `sk_live_${randomStr(CHARS.alphanumeric, 48)}`;
    case 'bearer':
      return `eyJ${randomStr(CHARS.base64, 36)}.eyJ${randomStr(CHARS.base64, 60)}.${randomStr(CHARS.base64, 43)}`;
    case 'numeric-6':
      return randomStr(CHARS.numeric, 6);
    case 'numeric-8':
      return randomStr(CHARS.numeric, 8);
    default:
      return randomStr(CHARS.alphanumeric, 64);
  }
};
