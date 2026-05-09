import { Type } from "class-transformer";
import { IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    public name: string;
    @IsOptional()
    @MaxLength(500)
    public description: string;
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public price: number;
    @IsInt()
    @Min(0)
    public stock: number;
    @IsString()
    @IsIn(['Smartphones', 'Laptops', 'Tablets', 'Audio', 'Accessories'])
    public category: string;
    constructor(
        name: string,
        description: string,
        price: number,
        stock: number,
        category: string,
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }
}
