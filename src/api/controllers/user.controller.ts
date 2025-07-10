import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateUserUseCase } from 'src/application/usecases';
import { CreateUserUseCase } from 'src/application/usecases/users/create-user/create-user.usecase';
import { GetUserByIdUseCase } from 'src/application/usecases/users/get-user-by-id/get-user-by-id.usecase';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post('create')
  async create(@Body() input: object) {
    const result = await this.createUserUseCase.execute(input);
    if (result.isFailure()) {
      return { error: result.getError() };
    }

    return result.getValue();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.getUserByIdUseCase.execute({ id });
    if (result.isFailure()) {
      return { error: result.getError() };
    }

    return result.getValue();
  }

  @Put('update/:id')
  async update(@Body() input: object, @Param('id') id: string) {
    const result = await this.updateUserUseCase.execute({ id, ...input });
    if (result.isFailure()) {
      return { error: result.getError() };
    }

    return result.getValue();
  }
}
