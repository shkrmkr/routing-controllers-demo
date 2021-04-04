import { plainToClass } from "class-transformer";
import {
  Body,
  Delete,
  Get,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { getConnection } from "typeorm";
import { Book } from "./Book.entity";
import { CreateBookDto } from "./CreateBook.dto";
import { UpdateBookDto } from "./UpdateBook.dto";

@JsonController("/books")
export class BookController {
  @Get()
  getAll(): Promise<Book[]> {
    return Book.find();
  }

  @Get("/:id")
  async getOne(@Param("id") id: number): Promise<Book> {
    const book = await Book.findOne(id);

    if (!book) {
      throw new NotFoundError(`book with id ${id} not found.`);
    }

    return book;
  }

  @Post()
  post(@Body() bookDto: CreateBookDto): Promise<Book> {
    return Book.create({ ...bookDto }).save();
  }

  @Put("/:id")
  async put(
    @Param("id") id: number,
    @Body() bookDto: UpdateBookDto
  ): Promise<Book> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Book)
      .set(bookDto)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    if (!result.affected) {
      throw new NotFoundError(`book with id ${id} not found.`);
    }

    return plainToClass(Book, result.raw[0]);
  }

  @Delete("/:id")
  async delete(@Param("id") id: number): Promise<boolean> {
    const result = await Book.delete(id);

    if (!result.affected) {
      throw new NotFoundError(`Book with id ${id} not found.`);
    }

    return true;
  }
}
