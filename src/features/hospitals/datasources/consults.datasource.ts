import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CrudDataSource } from "@brisacorp/common/base/data";
import { Consult } from "../entities/consults.entity";

@Injectable()
export class ConsultsDataSource extends CrudDataSource<Consult> {
  constructor(
    @InjectModel(Consult.name)
    private readonly consultModel: Model<Consult>,
  ) {
    super(consultModel);
  }

  public async getByUserId(userId: string): Promise<Consult[]> {
    return this.consultModel
      .find({
        userId,
      })
      .exec();
  }
}
