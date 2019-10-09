// ClientBCK/src/Crypto/AppendInitVect.ts
import { Transform } from 'stream';

export class AppendInitVect extends Transform {
  public initVect: Buffer;
  public appended: boolean;

  constructor(initVect: Buffer) {
    super({});
    this.initVect = initVect;
    this.appended = false;
  }

  _transform(chunk: Buffer, encoding: string, cb: () => any) {
    if (!this.appended) {
      this.push(this.initVect);
      this.appended = true;
    }
    this.push(chunk);
    cb();
  }
}
