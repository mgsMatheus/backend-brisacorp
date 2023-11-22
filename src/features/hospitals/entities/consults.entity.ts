import { BaseEntity } from "@brisacorp/common/base/data/entities/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ConsultDocument = HydratedDocument<Consult>;

@Schema()
export class Consult extends BaseEntity {
  @Prop()
  userId: string;

  @Prop()
  nameDoctor: string;

  @Prop()
  date: string;

  @Prop()
  nameHospital: string;

  @Prop()
  specialty: string;
}

export const ConsultsSchema = SchemaFactory.createForClass(Consult);
