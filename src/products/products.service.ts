import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from '../common/pagination.dto';
import { PrismaService } from '../prisma.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoriesService: CategoriesService,
  ) { 
  }

  async create(createProductDto: CreateProductDto) {

    const { categoryId, images } = createProductDto;
    
    // Validar que la categoría exista
    await this.categoriesService.findOne(categoryId);

    const product = await this.prismaService.product.create({
      data: {
        ...createProductDto,
        categoryId,
        images: {
      create: images.map( url => ({ url }) ),
    },
      }
    });
    return product;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    
    const products = await this.prismaService.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
      omit: {
        categoryId: true,
      },
      include: {
        category: true,
      }
    });

    const total = await this.prismaService.product.count();
    const lastPage = Math.ceil( total / limit );
    return {
      data: products,
      meta: {
        limit,
        page,
        total,
        lastPage
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      omit: {
        categoryId: true,
      },
      include: {
        category: true,
      }
    });

    if ( !product ) {
      throw new NotFoundException(`Product with #${id} was not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    await this.findOne(id);

    const product = await this.prismaService.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        images: {
        }
      },
    });

    return product;
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.prismaService.product.delete({
      where: { id },
    });
    return {
      product,
      message: 'Success'
    }
  }
}
