import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';

import { UserEntity } from '@app/user/user.entity';
import { FollowEntity } from '@app/profile/entity/follow.entity';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, UserEntity, FollowEntity]),
  ],
})
export class ArticleModule {}
