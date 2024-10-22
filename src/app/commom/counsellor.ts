export class Counsellor {
  constructor(
    public cId: number,
    public counsellorName: string,
    public counsellorEmail: string,
    public counsellorPwd: string,
    public counsellorPhno: string,
    public createdDate?: Date,
    public updatedDate?: Date
  ) {}
}
