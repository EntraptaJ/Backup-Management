// ClientBCKUP/src/Crypto/getCipherKey.ts
import { createHash } from 'crypto';

export function getCipherKey(password: string) {
  return createHash('sha256')
    .update(password)
    .digest();
}
