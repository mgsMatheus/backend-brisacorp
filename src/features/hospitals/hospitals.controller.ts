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
import { CreateHospitalUseCase } from "./use-cases/create-hospital.usecase";
import { CreateHospitalDto } from "@brisacorp/common/dtos/hospitals/create-hospital.dto";
import { HospitalDto } from "@brisacorp/common/dtos/hospitals/hospital.dto";
import { JwtAuthGuard } from "@brisacorp/common/security";
import { GetHospitalByIdUseCase } from "./use-cases/get-hospital-by-id.usecase";

@Controller("/v1/hospitals")
@ApiTags("Hospital")
export class HospitalsController {
  constructor(
    private readonly createHospitalUseCase: CreateHospitalUseCase,
    private readonly getHospitalById: GetHospitalByIdUseCase,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  public create(@Body() hospital: CreateHospitalDto): Promise<HospitalDto> {
    return this.createHospitalUseCase.execute(hospital);
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
  ): Promise<HospitalDto | NotFoundException> {
    return this.getHospitalById.execute(id).then((user) => {
      if (!user) {
        throw new NotFoundException("Usuario não encontrado");
      }
      return user;
    });
  }
}
