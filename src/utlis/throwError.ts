export class CustomError extends Error {
  status: number;
  constructor(messgae: string, status: number, name: string) {
    super(messgae);
    (this.name = name), (this.status = status);
  }
}
