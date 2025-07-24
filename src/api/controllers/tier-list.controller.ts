import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { GetTierListUseCase } from 'src/application/usecases';
import { FastifyReply } from 'fastify';

@Controller('tier-list')
export class TierListController {
  constructor(private readonly getTierListUseCase: GetTierListUseCase) {}

  @Get()
  async getTierList(
    @Res() reply: FastifyReply,
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

    return reply.status(HttpStatus.CREATED).send(result.getValue());
  }
}
