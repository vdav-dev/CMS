import * as typeorm from '@nestjs/typeorm';

export class CreateCommentDto {
  readonly username: string;
  readonly comment_text: string;
  readonly product_id: typeorm.type.ObjectId;
}