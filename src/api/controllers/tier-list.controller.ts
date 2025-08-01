import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { GetTierListUseCase } from 'src/application/usecases';
import { Response } from 'express';

@Controller('tier-list')
export class TierListController {
  constructor(private readonly getTierListUseCase: GetTierListUseCase) {}

  @Get()
  async getTierList(
    @Res() reply: Response,
    @Query() { page }: { page: string },
  ) {
    const result = await this.getTierListUseCase.execute({
      page: parseInt(page),
    });
    if (result.isFailure()) {
      return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: result.getError(),
      });
    }

    return reply.status(HttpStatus.OK).send(result.getValue());
  }
}
