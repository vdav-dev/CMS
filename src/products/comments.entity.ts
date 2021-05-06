import { Prop } from '@nestjs/typeorm';
import * as typeorm from '@nestjs/typeorm';
import { Product } from './products.entity';


export class Comment {
  @Prop()
  username: string;

  @Prop()
  text: string;

  @Prop()
  id: number;

  @Prop({ type: typeorm.ObjectId, ref: 'Product' })
  product: Product;
}