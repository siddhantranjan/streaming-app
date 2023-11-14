import { Transform } from "class-transformer";
import { IsEmail, IsInt, IsString } from "class-validator";

export class Payload{
    @IsString()
    username: string;

    @IsString()
    id: string;
    
}

export class LoginUser{
    @IsEmail()
    @Transform(({value}) => value.toLowerCase())
    username: string;

    @IsString()
    password: string;
}

export class RegisterUser{
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    @Transform(({value}) => value.toLowerCase())
    email: string;

    @IsString()
    username: string

    @IsString()
    stream_key: string

    @IsString()
    @Transform(({value}) => String(value))
    phone: string;

    @IsString()
    password: string;
}