import {IsInt, IsString} from 'class-validator'

export class Payload{
    @IsString()
    username: string;

    @IsInt()
    id: number;
}