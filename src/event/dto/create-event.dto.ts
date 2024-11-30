import { IsDate, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateEventDto {
    @IsString()
    @MinLength(3)
    @MaxLength(150)
    title           : string;

    @IsString()
    @MinLength(3)
    description     : string;

    @IsDate()
    @IsOptional()
    date            : Date;

    @IsString()
    location        : string;

    @IsNumber()
    organizer_id    : number;

    @IsDate()
    @IsOptional()
    create_at       : Date;

    @IsNumber()
    @IsOptional()
    categoryId?     : number;
}
