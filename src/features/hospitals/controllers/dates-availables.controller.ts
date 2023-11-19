import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@brisacorp/common/security";
import { CreateDateAvailableUseCase } from "../use-cases/dates-availables";
import { DateAvailableDto } from "@brisacorp/common/dtos/hospitals/date-available.dto";
import { CreateDateAvailableDTO } from "@brisacorp/common/dtos/hospitals/create-date-available.dto";

@Controller("/v1/datesAvailables")
@ApiTags("Hospital")
export class DatesAvailablesController {
  constructor(
    private readonly createDateAvailableUseCase: CreateDateAvailableUseCase,
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
}
