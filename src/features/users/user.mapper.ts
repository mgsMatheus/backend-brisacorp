import { Injectable } from "@nestjs/common";
import { Mapper } from "@brisacorp/common/base/mapper";
import { User, UserDocument } from "./entities/users.entity";
import { UserDto } from "@brisacorp/common/dtos";

@Injectable()
export class UserMapper implements Mapper<User, UserDto> {
  public toDto(entity: UserDocument): UserDto {
    const { id, cpf, name, email, password, phone } = entity;

    const dto = new UserDto();
    dto.id = id;
    dto.cpf = cpf;
    dto.name = name;
    dto.email = email;
    dto.password = password;
    dto.phone = phone;

    return dto;
  }

  public toEntity(dto: UserDto): User {
    const { cpf, name, email, password, phone } = dto;

    const user = new User();
    user.name = name;
    user.cpf = cpf;
    user.name = name;
    user.email = email;
    user.password = password;
    user.phone = phone;

    return user;
  }
}
