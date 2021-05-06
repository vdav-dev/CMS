import { Body, Controller, Post } from '@nestjs/common';
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.productsService.addComment(dto);
  }
}
