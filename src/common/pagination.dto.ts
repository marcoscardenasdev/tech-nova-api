import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    public limit?: number;
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    public page?: number;

    constructor(
        limit: number,
        page: number,
    ) {
        this.limit = limit;
        this.page = page;
    }
}