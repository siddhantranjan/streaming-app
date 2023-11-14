import { IsString } from "class-validator";

export class VideoDetails{
    @IsString()
    video_title: string;
}