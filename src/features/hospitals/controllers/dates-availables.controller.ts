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
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@brisacorp/common/security";
import {
  CreateDateAvailableUseCase,
  GetByDoctorIdUseCase,
} from "../use-cases/dates-availables";
import { DateAvailableDto } from "@brisacorp/common/dtos/hospitals/date-available.dto";
import { CreateDateAvailableDTO } from "@brisacorp/common/dtos/hospitals/create-date-available.dto";
import { DeleteDateAvailableUseCase } from "../use-cases/dates-availables/delete-date-available.usecase";

@Controller("/v1/datesAvailables")
@ApiTags("Hospital")
export class DatesAvailablesController {
  constructor(
    private readonly createDateAvailableUseCase: CreateDateAvailableUseCase,
    private readonly getByDoctorIdUseCase: GetByDoctorIdUseCase,
    private readonly deleteDateAvailableUseCase: DeleteDateAvailableUseCase,
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
  @Get("/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public getByDoctorId(@Param("id") id: string): Promise<DateAvailableDto[]> {
    return this.getByDoctorIdUseCase.execute(id);
  }
  @Delete("/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public delete(@Param("id") id: string): Promise<DateAvailableDto> {
    return this.deleteDateAvailableUseCase.execute(id);
  }
}
