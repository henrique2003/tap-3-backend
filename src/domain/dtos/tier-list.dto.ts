export class TierListDto {
  public id: string;
  public username: string;
  public rank: {
    value: number;
    color: string;
  };
}
