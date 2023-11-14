import { Transform } from "class-transformer";
import { IsString, IsOptional } from "class-validator";

export class UpdateUser{
    @IsOptional()
    @IsString()
    first_name: string;

    @IsOptional()
    @IsString()
    last_name: string;

    @IsOptional()
    username: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    @Transform(({value}) => String(value))
    phone: string;
}