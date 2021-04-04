import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { Book } from "./Book.entity";

export class CreateBookDto implements Partial<Book> {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price: number;
}
