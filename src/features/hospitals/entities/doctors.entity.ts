import { BaseEntity } from "@brisacorp/common/base/data/entities/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema()
export class Doctor extends BaseEntity {
  @Prop()
  name: string;

  @Prop()
  specialty: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
