import { BadRequestException, Injectable, UploadedFile } from '@nestjs/common';
import { join } from 'path';
import { existsSync } from 'fs';

import { envs } from '../config';


@Injectable()
export class FilesService {

  uploadImage(file: Express.Multer.File) {

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const secureUrl = `${envs.hostAPI}/files/product/${file.filename}`;

    return {
      secureUrl
    };
  }

  findProductImage(imageName: string) {
    
    const path = join(__dirname, '..', '..', '..', 'static', 'products', imageName);

    if (!existsSync(path)) {
      throw new BadRequestException('Image not found');
    }

    return path;
  }
}
