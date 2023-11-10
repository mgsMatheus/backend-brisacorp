import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import { UserDto } from "@brisacorp/common/dtos";
import { UsersRepository } from "../users.repository";

@Injectable()
export class GetUserByIdUseCase implements UseCase<UserDto> {
  constructor(private readonly userRepository: UsersRepository) {}

  public execute(id: string): Promise<UserDto> {
    return this.userRepository.getById(id);
  }
}
