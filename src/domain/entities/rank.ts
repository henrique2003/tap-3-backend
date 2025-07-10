export class Rank {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly startValue: number,
    public readonly endValue: number,
    public readonly receivePoints: number,
    public readonly deductionPoints: number,
    public readonly color: string,
  ) {}
}
