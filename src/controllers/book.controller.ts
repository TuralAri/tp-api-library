import {Controller, Body, Patch, Get, Post, Route, Tags, Path, Delete, Security} from "tsoa";
import { BookDTO } from "../dto/book.dto";
import { bookService } from "../services/book.service";
import { CustomError } from "../middlewares/errorHandler";
import { Book } from "../models/book.model";
import { toDto } from "../mapper/book.mapper";
import {BookCopyDTO} from "../dto/bookCopy.dto";
import {bookCopyService} from "../services/bookCopy.service";

@Route("books")
@Tags("Books")
@Security("jwt")
export class BookController extends Controller {
    @Security("jwt", ["read"])
    @Get("/")
    public async getAllBooks(): Promise<BookDTO[]> {
        return bookService.getAllBooks();
    }

    @Security("jwt", ["read"])
    @Get("{id}")
    public async getBookById(id: number): Promise<BookDTO> {
        let book: Book | null = await bookService.getBookById(id);

        if(book === null) {
            let error: CustomError = new Error(`Book ${id} not found`);
            error.status = 404;
            throw error;
        }

        return toDto(book);
    }

    @Post("/")
    @Security("jwt", ["write"])
    public async createBook(@Body() requestBody: BookDTO): Promise<BookDTO> {
        let {title, publishYear, author, isbn} = requestBody;

        if(author?.id === undefined) {
            let error : CustomError = new Error("Author ID is required to create a book");
            error.status = 400;
            throw error;
        }

        return bookService.createBook(title, publishYear, author?.id, isbn)
    }

    @Security("jwt", ["update"])
    @Patch("{id}")
    public async updateBook(
        @Path() id: number,
        @Body() requestBody: BookDTO
    ): Promise<BookDTO | null> {
        const {title, publishYear, author, isbn} = requestBody;
        const book: Book | null = await bookService.updateBook(id, title, publishYear, author, isbn);
        if (!book) {
            let error: CustomError = new Error("Book not found");
            error.status = 404;
            throw error;
        }
        return book;
    }

    // Supprime un livre par ID
    @Security("jwt", ["delete"])
    @Delete("{id}")
    public async deleteBook(@Path() id: number): Promise<void> {
        await bookService.deleteBook(id);
    }

    // Récupère les copies d'un livre par ID
    @Security("jwt", ["read"])
    @Get("/{id}/bookCopys")
    public async getBookCopysById(@Path() id: number): Promise<BookCopyDTO[] | null> {
        const book: Book | null = await bookService.getBookById(id);
        if (!book) {
            let error: CustomError = new Error("Book not found");
            error.status = 404;
            throw error;
        }

        return bookCopyService.getBookCopysByBookId(id);
    }
}