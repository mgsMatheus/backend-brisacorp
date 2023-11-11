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

  public async getByLogin(login: string): Promise<UserAuthenticateDto> {
    let entity;
    if (login.length === 11) {
      entity = await this.authDataSource.getByCPF(login);
    } else {
      entity = await this.authDataSource.getByCNPJ(login);
    }

    return entity ? this.mapper.toDto(entity) : null;
  }
}
