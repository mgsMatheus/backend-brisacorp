import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
} from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateHospitalUseCase } from "./use-cases/create-hospital.usecase";
import { CreateHospitalDto } from "@brisacorp/common/dtos/hospitals/create-hospital.dto";
import { HospitalDto } from "@brisacorp/common/dtos/hospitals/hospital.dto";
import { JwtAuthGuard } from "@brisacorp/common/security";
import { GetHospitalByIdUseCase } from "./use-cases/get-hospital-by-id.usecase";
import { DoctorDto } from "@brisacorp/common/dtos/hospitals/doctor.dto";
import { CreateDoctorUseCase } from "./use-cases/create-doctor.usecase";
import { GetDoctorByIdUseCase } from "./use-cases";

@Controller("/v1/hospitals")
@ApiTags("Hospital")
export class HospitalsController {
  constructor(
    private readonly createHospitalUseCase: CreateHospitalUseCase,
    private readonly createDoctorUseCase: CreateDoctorUseCase,
    private readonly getHospitalById: GetHospitalByIdUseCase,
    private readonly getDoctor: GetDoctorByIdUseCase,
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

  @Post(":hospitalId/doctor")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public createDoctorInHospital(
    @Param("hospitalId") hospitalId: string,
    @Body() doctor: DoctorDto,
  ): Promise<DoctorDto> {
    return this.createDoctorUseCase.execute(hospitalId, doctor);
  }

  @Get(":hospitalId/doctors")
  @ApiBearerAuth()
  @ApiQuery({
    name: "doctor",
    type: String,
    required: false,
  })
  @ApiQuery({
    name: "specialty",
    type: String,
    required: false,
  })
  @UseGuards(JwtAuthGuard)
  public getDoctors(
    @Param("hospitalId") hospitalId: string,
    @Query("doctor") doctor: string,
    @Query("specialty") specialty: string,
  ): Promise<DoctorDto[]> {
    return this.getDoctor.execute(hospitalId, doctor, specialty);
  }
}
