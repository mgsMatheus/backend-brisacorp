import { BaseEntity } from "@brisacorp/common/base/data/entities/base.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DateAvailableDocument = HydratedDocument<DateAvailable>;

@Schema()
export class DateAvailable extends BaseEntity {
  @Prop()
  doctorId: string;

  @Prop()
  date: string;

  @Prop()
  hour: string[];
}

export const DateAvailableSchema = SchemaFactory.createForClass(DateAvailable);
