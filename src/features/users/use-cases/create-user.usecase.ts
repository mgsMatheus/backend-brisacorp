import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import { CreateUserDto, UserDto } from "@brisacorp/common/dtos";
import { UsersRepository } from "../users.repository";
import { CryptService } from "@brisacorp/common/providers";

@Injectable()
export class CreateUserUseCase implements UseCase<UserDto> {
  constructor(
    private readonly repository: UsersRepository,
    private readonly cryptService: CryptService,
  ) {}

  public execute(user: CreateUserDto): Promise<UserDto> {
    return this.cryptService
      .hash(user.password)
      .then((password) => this.repository.create({ ...user, password }));
  }
}
