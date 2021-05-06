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
    const category = query.category;
    const requestToken = query.token;
    const insideToken = config.token;

    if (requestToken == insideToken) {
      return this.productsService.addProducts(
        name,
        description,
        price,
        category,
      );
    } else {
      return {
        status: false,
        msg: 'invalid token',
      };
    }
  }

  @Post('/api/getProducts')
  getProducts(@Query() query): Promise<Record<string, unknown>> {
    const category = query.category;

    return this.productsService.getProducts(category);
  }

  @Post('/api/getProductById')
  getProduct(@Query() query): Promise<Record<string, unknown>> {
    const id = query.id;

    return this.productsService.getProductById(id);
  }

  @Post('/api/deleteProduct')
  delProduct(
    @Query() query,
  ): Promise<Record<string, unknown>> | Record<string, unknown> {
    const id = query.id;
    const requestToken = query.token;
    const insideToken = config.token;

    if (requestToken == insideToken) {
      return this.productsService.deleteProduct(id);
    } else {
      return {
        status: false,
        msg: 'invalid token',
      };
    }
  }

  @Post('/api/updateProduct')
  updateProduct(
    @Query() query,
  ): Promise<Record<string, unknown>> | Record<string, unknown> {
    const id = query.id;
    const name = query.name;
    const description = query.description;
    const price = query.price;
    const requestToken = query.token;
    const insideToken = config.token;

    if (requestToken == insideToken) {
      return this.productsService.updateProduct(id, name, description, price);
    } else {
      return {
        status: false,
        msg: 'invalid token',
      };
    }
  }
}
