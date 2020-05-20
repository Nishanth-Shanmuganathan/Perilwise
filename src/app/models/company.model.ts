export class Company {
  constructor(
    public companyName: string,
    public contactPersonName: string,
    public contactPersonEmail: string,
    public address: string,
    public city: string,
    public state: string,
    public product: string,
    public id?: string
  ) { }
}
