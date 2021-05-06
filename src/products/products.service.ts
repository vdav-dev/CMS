import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private usersRepository: Repository<Product>,
  ) {}

  async addProducts(
    name,
    description,
    price,
  ): Promise<Record<string, unknown>> {
    const result = await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values([
        {
          name: name,
          description: description,
          price: price,
        },
      ])
      .execute();

    return {
      status: Boolean(result),
    };
  }
}
