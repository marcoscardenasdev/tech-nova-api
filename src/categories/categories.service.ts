import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { PaginationDto } from '../common/pagination.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesService {

  private readonly logger = new Logger('CategoriesService');

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prismaService.category.create({
        data: createCategoryDto
      });

      return category;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, page = 1 } = paginationDto;

    const categories = await this.prismaService.category.findMany({
       take: limit,
       skip: (page - 1) * limit,
    });

    const total = await this.prismaService.category.count();
    const lastPage = Math.ceil(total / limit);
    return {
      data: categories,
      meta: {
        limit,
        page,
        total,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });

    if ( !category ) {
      throw new NotFoundException(`Category with #${id} was not found`);
    }
    return category;
  }

  /*update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }*/

  async remove(id: number) {

    const category = await this.findOne(id);
    try {

      await this.prismaService.category.delete({
        where: { id },
      });

      return {
        category,
        message: 'Success',
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  private handleDBExceptions(error: any) {

    if (error.code === 'P2003') {
      throw new ConflictException('Foreign key constraint violated on the foreign key');
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
