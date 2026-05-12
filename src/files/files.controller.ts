import { Controller, Get, Post, Body, Param, UseInterceptors, Res, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import type { Response } from 'express';

import { FilesService } from './files.service';
import { fileFilter, fileName } from './helpers';
import { Auth } from '../auth/decorators';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @Auth( 'ADMIN' )
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/products',
      filename: fileName,
    }),
  }))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadImage(file);
  }

  @Get('product/:imageName')
  findProductImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const path = this.filesService.findProductImage(imageName);

    res.sendFile(path);
  }
}
