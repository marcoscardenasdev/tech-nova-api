import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {

    @IsEmail()
    public email: string;
    @IsString()
    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
