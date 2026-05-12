import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { FilesModule } from './files/files.module';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, CategoriesModule, FilesModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'src/static'),
    serveRoot: '/static',
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
