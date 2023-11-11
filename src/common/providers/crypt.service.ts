import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class CryptService {
  public hash(value: string): Promise<string> {
    return bcrypt.genSalt().then((salt) => bcrypt.hash(value, salt));
  }

  public compareHash(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
