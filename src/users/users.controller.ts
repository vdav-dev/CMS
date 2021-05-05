import { Controller, Get, Post, Render, Query } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post('/api/regUser')
  async regUser(@Query() query): Promise<Record<string, unknown>> {
    const salt = await bcrypt.genSalt();

    const name = query.name;
    const surname = query.surname;
    const email = query.email;
    const phone = query.phone;
    const stockPassword = query.password;
    const hashedPassword = await bcrypt.hash(stockPassword, salt);

    return this.usersService.addUser(
      name,
      surname,
      email,
      phone,
      hashedPassword,
    );
  }
}
