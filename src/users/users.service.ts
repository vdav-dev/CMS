import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHmac } from 'crypto';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  encryptPassword(password): string {
    const secret = 'salt';

    return createHmac('sha256', secret).update(password).digest('hex');
  }

  async authUser(email, password): Promise<Record<string, unknown>> {
    const result = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email AND user.password = :password', {
        email: email,
        password: password,
      })
      .getOne();

    return {
      status: Boolean(result),
      email: result.email,
      name: result.name,
      surname: result.surname,
      phone: result.phone,
    };
  }

  async addUser(
    name,
    surname,
    email,
    phone,
    password,
  ): Promise<Record<string, unknown>> {
    const status = await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: name,
          surname: surname,
          email: email,
          phone: phone,
          password: password,
        },
      ])
      .execute();

    return {
      status: Boolean(status),
    };
  }
}
