import { IsEmail, IsIn, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    public fullName: string;
    @IsEmail()
    public email: string;
    @IsString()
    @MinLength(8)
    @Matches(
        /^(?=.*[A-Z])(?=.*\d).+$/
    )
    public password: string;
    @IsOptional()
    @IsString()
    @IsIn(['ADMIN', 'CLIENT'])
    public rol: string;

    constructor(fullName: string, email: string, password: string, rol: string) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }
}
