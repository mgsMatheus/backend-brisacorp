import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseEntity } from "@brisacorp/common/base/data/entities/base.entity";

export type HospitalDocument = HydratedDocument<Hospital>;

@Schema()
export class Hospital extends BaseEntity {
  @Prop({ required: true, unique: true })
  cnpj: string;

  @Prop({ required: true })
  password: string;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);
