import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  //   Get,
  //   NotFoundException,
  //   Param,
  Post,
  //   UseGuards,
  UseInterceptors,
  //   Request,
} from "@nestjs/common";
import {
  // ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";
// import { CreateUserDto, UserDto } from "@brisacorp/common/dtos";
// import { JwtAuthGuard } from "@brisacorp/common/security";
import { CreateHospitalUseCase } from "./use-cases/create-hospital.usecase";
import { CreateHospitalDto } from "@brisacorp/common/dtos/hospitals/create-hospital.dto";
import { HospitalDto } from "@brisacorp/common/dtos/hospitals/hospital.dto";

@Controller("/v1/hospitals")
@ApiTags("Hospital")
export class HospitalsController {
  constructor(private readonly createHospitalUseCase: CreateHospitalUseCase) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  public create(@Body() hospital: CreateHospitalDto): Promise<HospitalDto> {
    return this.createHospitalUseCase.execute(hospital);
  }
}
