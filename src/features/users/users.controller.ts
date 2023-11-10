import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateUserUseCase, GetUserByIdUseCase } from "./use-cases";
import { CreateUserDto, UserDto } from "@brisacorp/common/dtos";
import { JwtAuthGuard } from "@brisacorp/common/security";

@Controller("/v1/users")
@ApiTags("Usuários")
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  public create(@Body() user: CreateUserDto): Promise<UserDto> {
    return this.createUserUseCase.execute(user);
  }

  @Get("me")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public getProfile(@Request() req: Express.Request) {
    return this.getById(req.user.id);
  }

  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  public getById(
    @Param("id") id: string,
  ): Promise<UserDto | NotFoundException> {
    return this.getUserByIdUseCase.execute(id).then((user) => {
      if (!user) {
        throw new NotFoundException("Usuario não encontrado");
      }
      return user;
    });
  }
}
