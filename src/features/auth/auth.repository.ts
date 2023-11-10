// users.repository.ts

import { Injectable } from "@nestjs/common";
import { UserAuthenticateDto } from "@brisacorp/common/dtos";
import { AuthDataSource } from "./auth.datasource";
import { AuthMapper } from "./auth.mapper";

@Injectable()
export class AuthRepository {
  constructor(
    private readonly authDataSource: AuthDataSource,
    private readonly mapper: AuthMapper,
  ) {}

  public async getByCPF(cpf: string): Promise<UserAuthenticateDto> {
    const entity = await this.authDataSource.getByCPF(cpf);

    return entity ? this.mapper.toDto(entity) : null;
  }
}
