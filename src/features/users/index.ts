import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { User, UserSchema } from "./entities/users.entity";

import { CreateUserUseCase, GetUserByIdUseCase } from "./use-cases";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersDataSource } from "./users.datasource";
import { UsersRepository } from "./users.repository";
import { UsersController } from "./users.controller";
import { UserMapper } from "./user.mapper";
import { CryptService } from "@brisacorp/common/providers";
import { JwtAuthGuardModule } from "@brisacorp/common/security";

const usecases = [CreateUserUseCase, GetUserByIdUseCase];

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtAuthGuardModule,
  ],
  providers: [
    ...usecases,
    UserMapper,
    UsersDataSource,
    UsersRepository,
    CryptService,
  ],
})
export class UsersModules {}
