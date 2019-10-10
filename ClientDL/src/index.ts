// ClientDL/src/index.ts
import { createDecipheriv, Decipher } from 'crypto';
import { Readable } from 'stream';
import { extract } from 'tar-fs-fixed';
import { getCipherKey } from './Crypto/getCipherKey';
import {
  GetLatestBackup,
  GetLatestBackupSubscription,
  GetLatestBackupSubscriptionVariables
} from './Backup/GetLastestBackup.gen';
import { initApollo } from './initApollo';

const URL = process.env.API_URL || 'http://localhost/graphql';
const SECRET_KEY = process.env.SECRET_KEY || 'password';

export const clientToken = process.env.CLIENT_TOKEN;

async function startClientDL(): Promise<void> {
  console.log('Starting ClientDL');

  const readStream = new Readable({
    read() {}
  });

  const extractStream = extract('/extracted', { strict: true });

  const client = initApollo({ URL });

  let initVect: Buffer;
  let firstChunk = false;
  let decipher: Decipher;

  const cipherKey = getCipherKey(SECRET_KEY);

  client
    .subscribe<
      GetLatestBackupSubscription,
      GetLatestBackupSubscriptionVariables
    >({ query: GetLatestBackup, variables: { clientToken } })
    .subscribe({
      next({ data }) {
        if (!data) return;
        let buffer: Buffer;
        if (!initVect && !firstChunk) {
          const newBuff = Buffer.from(data.getLatestBackup, 'base64');
          initVect = newBuff.slice(0, 16);
          buffer = newBuff.slice(16);
          firstChunk = true;
        } else buffer = Buffer.from(data.getLatestBackup, 'base64');
        if (!decipher) {
          decipher = createDecipheriv('aes256', cipherKey, initVect);
          readStream.pipe(decipher);
          decipher.pipe(extractStream);
        }
        readStream.push(buffer);
      },
      complete() {
        console.log(`Extracted`);
      }
    });
}

startClientDL();
