import { FileType } from "@brisacorp/common/enums";

export class CreateFileDto {
  public type: FileType;
  public file: Express.Multer.File;
}
