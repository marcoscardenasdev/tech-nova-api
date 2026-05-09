import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/pagination.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {

  constructor(
    private readonly prismaService: PrismaService,
  ) { 
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.prismaService.product.create({
      data: createProductDto,
    });
    return product;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    
    const products = await this.prismaService.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
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
        ...updateProductDto
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
