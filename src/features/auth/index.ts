import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthUseCase } from "./use-cases";
import { JwtAuthGuardModule } from "@brisacorp/common/security";
import { AuthRepository } from "./auth.repository";
import { AuthDataSource } from "./auth.datasource";
import { AuthMapper } from "./auth.mapper";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.entity";
import { CryptService } from "@brisacorp/common/providers";

@Module({
  controllers: [AuthController],
  imports: [
    JwtAuthGuardModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AuthUseCase,
    AuthRepository,
    AuthDataSource,
    AuthMapper,
    CryptService,
  ],
})
export class AuthModules {}
