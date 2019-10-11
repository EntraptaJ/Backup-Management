// ClientBCKUP/src/getFiles.ts
import { randomBytes, createCipheriv } from 'crypto';
import { AppendInitVect } from './Crypto/AppendInitVect';
import { getCipherKey } from './Crypto/getCipherKey';
import { pack } from 'tar-fs-fixed';

export function getPathStream(sourcePath: string, password: string): any {
  const initVect = randomBytes(16);

  const CIPHER_KEY = getCipherKey(password);

  const readStream = pack(sourcePath);

  const encryptStream = createCipheriv('aes256', CIPHER_KEY, initVect);

  const appendInitVectStream = new AppendInitVect(initVect);

  readStream.pipe(encryptStream);
  encryptStream.pipe(appendInitVectStream);

  return appendInitVectStream;
}
