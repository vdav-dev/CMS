import { Controller, Post, Query } from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) {}
}
