import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UpdateUserUseCase } from 'src/application/usecases';
import { CreateUserUseCase } from 'src/application/usecases/users/create-user/create-user.usecase';
import { GetUserByIdUseCase } from 'src/application/usecases/users/get-user-by-id/get-user-by-id.usecase';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post('create')
  async create(@Body() input: object, @Res() reply: Response) {
    const result = await this.createUserUseCase.execute(input);
    if (result.isFailure()) {
      return reply.status(HttpStatus.BAD_REQUEST).send({
        error: result.getError(),
      });
    }

    return reply.status(HttpStatus.CREATED).send(result.getValue());
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() reply: Response) {
    const result = await this.getUserByIdUseCase.execute({ id });
    if (result.isFailure()) {
      return reply.status(HttpStatus.NOT_FOUND).send({
        error: result.getError(),
      });
    }

    return reply.status(HttpStatus.OK).send(result.getValue());
  }

  @Put(':id')
  async update(
    @Body() input: object,
    @Param('id') id: string,
    @Res() reply: Response,
  ) {
    const result = await this.updateUserUseCase.execute({ id, ...input });
    if (result.isFailure()) {
      return reply.status(HttpStatus.NOT_FOUND).send({
        error: result.getError(),
      });
    }

    return reply.status(HttpStatus.OK).send(result.getValue());
  }
}
