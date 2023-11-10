export class UserAuthenticatedDto {
  public token: string;

  constructor(partial?: Partial<UserAuthenticatedDto>) {
    Object.assign(this, partial);
  }
}
