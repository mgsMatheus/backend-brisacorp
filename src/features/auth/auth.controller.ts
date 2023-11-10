import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  UserAuthenticateDto,
  UserAuthenticatedDto,
} from "@brisacorp/common/dtos";
import { AuthUseCase } from "./use-cases";

@Controller("/v1/auth")
@ApiTags("Autenticação")
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Post("login")
  @HttpCode(200)
  public authenticate(
    @Body() user: UserAuthenticateDto,
  ): Promise<UserAuthenticatedDto> {
    return this.authUseCase.execute(user).then((auth) => {
      if (!auth) {
        throw new UnauthorizedException("Credenciais inválidas.");
      }
      return auth;
    });
  }
}
