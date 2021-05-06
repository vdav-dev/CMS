import { Controller, Post, Query } from '@nestjs/common';

import { ProductsService } from './products.service';

import * as config from './../cmsconfig.json';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('/api/addProduct')
  addProducts(
    @Query() query,
  ): Promise<Record<string, unknown>> | Record<string, unknown> {
    const name = query.name;
    const description = query.description;
    const price = query.price;
    const requestToken = query.token;
    const insideToken = config.token;

    if (requestToken == insideToken) {
      return this.productsService.addProducts(name, description, price);
    } else {
      return {
        status: false,
        msg: 'invalid token',
      };
    }
  }
}
