import { IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    public name: string;
    @IsOptional()
    @IsString()
    public description: string;

    constructor(
        name: string,
        description: string,
    ) {
        this.name = name;
        this.description = description;
    }
}
