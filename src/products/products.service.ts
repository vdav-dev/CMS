import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectModel } from '@nestjs/typeorm';
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Repository, Model } from 'typeorm';
import { Comment } from "./comments.entity";
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private usersRepository: Repository<Product>,
    @InjectModel(Product.name)
    private productModel: Model<Product>,
    @InjectModel(Comment.name)
    private commentModel: Model<Comment>,
  ) {}

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const product = await this.productModel.findById(dto.product_id);
    const comment = await this.commentModel.create({ ...dto })
    product.comments.push(comment._id)
    await product.save();
    return comment;
  }
}
