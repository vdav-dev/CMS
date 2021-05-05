import { Controller, Get, Post, Render, Query, Session } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/api/regUser')
  async regUser(@Query() query): Promise<Record<string, unknown>> {
    const name = query.name;
    const surname = query.surname;
    const email = query.email;
    const phone = query.phone;
    const stockPassword = query.password;
    const hashedPassword = await this.usersService.encryptPassword(
      stockPassword,
    );

    return this.usersService.addUser(
      name,
      surname,
      email,
      phone,
      hashedPassword,
    );
  }

  @Post('/api/authUser')
  async authUser(
    @Query() query,
    @Session() session,
  ): Promise<Record<string, unknown>> {
    const email = query.email;
    const stockPassword = query.password;
    const hashedPassword = await this.usersService.encryptPassword(
      stockPassword,
    );

    const result = await this.usersService.authUser(email, hashedPassword);

    session.email = result.email;
    session.name = result.name;
    session.surname = result.surname;
    session.phone = result.phone;

    return {
      status: Boolean(result),
    };
  }
}
