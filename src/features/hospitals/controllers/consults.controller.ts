import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@brisacorp/common/security";
import { CreateConsultUseCase } from "../use-cases/consults/create-consult.usecase";
import { CreateConsultDTO } from "@brisacorp/common/dtos/hospitals/create-consult.dto";
import { ConsultDto } from "@brisacorp/common/dtos/hospitals/consult.dto";
import { GetConsultByUserIdUseCase } from "../use-cases/consults";
@Controller("/v1/consult")
@ApiTags("Consultas")
export class ConsultsController {
  constructor(
    private createConsultUseCase: CreateConsultUseCase,
    private getConsultByUserId: GetConsultByUserIdUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public create(@Body() consult: CreateConsultDTO): Promise<ConsultDto> {
    return this.createConsultUseCase.execute(consult);
  }

  @Get("/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public getByDoctorId(@Param("id") userId: string): Promise<ConsultDto[]> {
    return this.getConsultByUserId.execute(userId);
  }
}
