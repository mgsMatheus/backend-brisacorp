import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import {
  UserAuthenticateDto,
  UserAuthenticatedDto,
} from "@brisacorp/common/dtos";
import { AuthRepository } from "../auth.repository";
import { JwtService } from "@nestjs/jwt";
import { CryptService } from "@brisacorp/common/providers";

@Injectable()
export class AuthUseCase implements UseCase<UserAuthenticatedDto> {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly cryptService: CryptService,
  ) {}

  public execute(auth: UserAuthenticateDto): Promise<UserAuthenticatedDto> {
    return this.repository
      .getByLogin(auth.login.replace(/[^\d]/g, ""))
      .then(async (user) => {
        const compare = await this.cryptService.compareHash(
          auth.password,
          user.password,
        );

        if (compare === true) {
          return new UserAuthenticatedDto({
            token: this.jwtService.sign({
              cpf: user.login,
              id: user.id,
            }),
          });
        }
        return null;
      });
  }
}
