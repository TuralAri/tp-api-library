import { Controller, Get, Route, Tags } from "tsoa";
import { BookDTO } from "../dto/book.dto";
import { bookService } from "../services/book.service";
import { CustomError } from "../middlewares/errorHandler";
import { Book } from "../models/book.model";
import { toDto } from "../mapper/book.mapper";

@Route("books")
@Tags("Books")
export class BookController extends Controller {
    @Get("/")
    public async getAllBooks(): Promise<BookDTO[]> {
        return bookService.getAllBooks();
    }

    @Get("{id}")
    public async getBoodById(id: number): Promise<BookDTO> {
        let book: Book | null = await bookService.getBookById(id);

        if(book === null) {
            let error: CustomError = new Error(`Book ${id} not found`);
            error.status = 404;
            throw error;
        }

        return toDto(book);
    }
}