import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateCommentDto {

    @IsString()
    content : string;

    @IsDate()
    @IsOptional()
    create_at : Date;
}
