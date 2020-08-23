import { IsString, IsInt, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly nickname: string;

  @IsInt()
  readonly gender: number;

  @IsString()
  readonly city: string;

  @IsString()
  readonly avatar: string;
}