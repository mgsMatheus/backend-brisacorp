// auth.mapper.ts

import { Injectable } from "@nestjs/common";
import { Mapper } from "@brisacorp/common/base/mapper";
import { UserAuthenticateDto } from "@brisacorp/common/dtos";
import { User, UserDocument } from "./entities/user.entity";

@Injectable()
export class AuthMapper implements Mapper<User, UserAuthenticateDto> {
  public toDto(entity: Partial<UserDocument>): UserAuthenticateDto {
    const { id, cpf, password } = entity;

    const dto = new UserAuthenticateDto();
    dto.id = id;
    dto.cpf = cpf;
    dto.password = password;

    return dto;
  }

  public toEntity(dto: UserAuthenticateDto): User {
    const { cpf, password } = dto;

    const auth = new User();
    auth.cpf = cpf;
    auth.password = password;

    return auth;
  }
}
