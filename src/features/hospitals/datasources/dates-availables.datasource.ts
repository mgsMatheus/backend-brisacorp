import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CrudDataSource } from "@brisacorp/common/base/data";
import { DateAvailable } from "../entities/dates-availables.entity";

@Injectable()
export class DatesAvailablesDataSource extends CrudDataSource<DateAvailable> {
  constructor(
    @InjectModel(DateAvailable.name)
    private readonly dateAvailable: Model<DateAvailable>,
  ) {
    super(dateAvailable);
  }
}
