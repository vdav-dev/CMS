import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  addUser(name, surname, email, phone, password): Record<string, unknown> {
    const status = this.usersRepository
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
