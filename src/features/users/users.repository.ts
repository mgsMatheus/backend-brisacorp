// users.repository.ts

import { Injectable } from "@nestjs/common";
import { UsersDataSource } from "./users.datasource";
import { UserMapper } from "./user.mapper";
import { UserDto } from "@brisacorp/common/dtos";
import { CrudRepository } from "@brisacorp/common/base/data";
import { User } from "./entities/users.entity";

@Injectable()
export class UsersRepository extends CrudRepository<
  User,
  UserDto,
  UsersDataSource,
  UserMapper
> {
  constructor(
    private readonly usersDataSource: UsersDataSource,
    private readonly userMapper: UserMapper,
  ) {
    super(usersDataSource, userMapper);
  }
}
