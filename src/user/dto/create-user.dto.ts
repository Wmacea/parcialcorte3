import { IsDate, IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name      : string

  @IsEmail()
  @MaxLength(100)
  email     : string

  @IsDate()
  @IsOptional()
  create_at : Date
}
