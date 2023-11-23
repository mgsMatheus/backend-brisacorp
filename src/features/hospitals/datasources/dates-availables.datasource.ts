import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CrudDataSource } from "@brisacorp/common/base/data";
import { DateAvailable } from "../entities/dates-availables.entity";
import { DatesAvailablesDto } from "@brisacorp/common/dtos/hospitals/dates-availables.dto";
import { UpdateStatusDateAvailableDTO } from "@brisacorp/common/dtos/hospitals/update-date-available.dto";

@Injectable()
export class DatesAvailablesDataSource extends CrudDataSource<DateAvailable> {
  constructor(
    @InjectModel(DateAvailable.name)
    private readonly dateAvailableModel: Model<DateAvailable>,
  ) {
    super(dateAvailableModel);
  }

  public async getByDoctorId(doctorId: string): Promise<DateAvailable[]> {
    return this.dateAvailableModel
      .find({
        doctorId,
        active: true,
      })
      .exec();
  }

  public async getDoctorsAvailable(
    specialty: string,
    date: string,
  ): Promise<DatesAvailablesDto[]> {
    const hour = await this.dateAvailableModel.aggregate([
      {
        $project: {
          date: 1,
          active: 1,
          _idDoctor: {
            $toObjectId: "$doctorId",
          },
        },
      },
      {
        $lookup: {
          from: "hospitals",
          localField: "_idDoctor",
          foreignField: "doctors._id",
          as: "datesDoctors",
        },
      },
      {
        $match: {
          "datesDoctors.doctors.specialty": specialty,
          active: true,
          date: date,
        },
      },
    ]);
    return hour;
  }

  public updateStatusDateAvailable(
    id: string,
    body: UpdateStatusDateAvailableDTO,
  ) {
    return this.dateAvailableModel.updateOne({
      id,
      $set: { active: body.status },
    });
  }
}
