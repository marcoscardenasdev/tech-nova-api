import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AppModule } from '../app.module';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
