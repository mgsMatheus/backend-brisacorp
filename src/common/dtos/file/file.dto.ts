import { FileType } from "@brisacorp/common/enums/file-type.enum";

export class FileDto {
  id: string;
  public fileName: string;
  public contentType: string;
  public url: string;
  public type: FileType;
}
