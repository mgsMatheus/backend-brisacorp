import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  UseInterceptors,
  Delete,
  Query,
  Patch,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@brisacorp/common/security";
import {
  CreateDateAvailableUseCase,
  GetByDoctorIdUseCase,
  GetDoctorsAvailableUseCase,
  UpdateStatusDateAvailableUseCase,
} from "../use-cases/dates-availables";
import { DateAvailableDto } from "@brisacorp/common/dtos/hospitals/date-available.dto";
import { CreateDateAvailableDTO } from "@brisacorp/common/dtos/hospitals/create-date-available.dto";
import { DeleteDateAvailableUseCase } from "../use-cases/dates-availables/delete-date-available.usecase";
import { DatesAvailablesDto } from "@brisacorp/common/dtos/hospitals/dates-availables.dto";
import { UpdateStatusDateAvailableDTO } from "@brisacorp/common/dtos/hospitals/update-date-available.dto";

@Controller("/v1/datesAvailables")
@ApiTags("Hospital")
export class DatesAvailablesController {
  constructor(
    private readonly createDateAvailableUseCase: CreateDateAvailableUseCase,
    private readonly getByDoctorIdUseCase: GetByDoctorIdUseCase,
    private readonly deleteDateAvailableUseCase: DeleteDateAvailableUseCase,
    private readonly getDoctorAvailableUsecase: GetDoctorsAvailableUseCase,
    private readonly updateStatusDateAvailableUseCase: UpdateStatusDateAvailableUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public create(
    @Body() dateAvailable: CreateDateAvailableDTO,
  ): Promise<DateAvailableDto> {
    return this.createDateAvailableUseCase.execute(dateAvailable);
  }
  @Get("doctors-available")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public GetHoursAvailable(
    @Query("specialty") specialty: string,
    @Query("date") date: string,
  ): Promise<DatesAvailablesDto[]> {
    return this.getDoctorAvailableUsecase.execute(specialty, date);
  }

  @Get("/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public getByDoctorId(@Param("id") id: string): Promise<DateAvailableDto[]> {
    return this.getByDoctorIdUseCase.execute(id);
  }

  @Patch("/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public UpdateDateAvailable(
    @Param("id") id: string,
    @Body() body: UpdateStatusDateAvailableDTO,
  ) {
    return this.updateStatusDateAvailableUseCase.execute(id, body);
  }

  @Delete("/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public delete(@Param("id") id: string): Promise<DateAvailableDto> {
    return this.deleteDateAvailableUseCase.execute(id);
  }
}
