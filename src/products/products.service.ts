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

  async getProducts(): Promise<Record<string, unknown>> {
    const result = await this.usersRepository
      .createQueryBuilder('products')
      .getMany();

    return {
      status: Boolean(result),
      products: result,
    };
  }

  async getProductById(id): Promise<Record<string, unknown>> {
    const result = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();

    return {
      status: Boolean(result),
      product: result,
    };
  }

  async deleteProduct(id): Promise<Record<string, unknown>> {
    const result = await this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('id = :id', { id: id })
      .execute();

    return {
      status: Boolean(result),
    };
  }

  async updateProduct(
    id,
    name,
    description,
    price,
  ): Promise<Record<string, unknown>> {
    const result = await this.usersRepository
      .createQueryBuilder()
      .update(Product)
      .set({
        name: name,
        description: description,
        price: price,
      })
      .where('id = :id', { id: id })
      .execute();

    return {
      status: Boolean(result),
    };
  }
}
