import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { Book } from "./Book.entity";

export class UpdateBookDto implements Partial<Book> {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsPositive()
  @IsNumber(
    { maxDecimalPlaces: 2 }
    // { message: "only accepts 2 decimal places" }
  )
  price: number;
}
