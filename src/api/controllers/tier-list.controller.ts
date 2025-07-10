import { Controller, Get } from '@nestjs/common';
import { GetTierListUseCase } from 'src/application/usecases';

@Controller('tier-list')
export class TierListController {
  constructor(private readonly getTierListUseCase: GetTierListUseCase) {}

  @Get()
  async getTierList() {
    const result = await this.getTierListUseCase.execute();
    return result.isSuccess()
      ? result.getValue()
      : { error: result.getError() };
  }
}
