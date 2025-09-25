import {Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import {BookCopyDTO} from "../dto/bookCopy.dto";
import {bookCopyService} from "../services/bookCopy.service";
import {CustomError} from "../middlewares/errorHandler";
import {BookCopy} from "../models/bookCopy.model";

@Route("book-copies")
@Tags("Book-copies")
export class BookCopyController extends Controller {
    @Get("/")
    public async getAllBookCopys(): Promise<BookCopyDTO[]> {
        return bookCopyService.getAllBookCopys();
    }

    // Récupère une copie de livre par ID
    @Get("/{id}")
    public async getBookCopyById(@Path() id: number): Promise<BookCopyDTO | null> {
        const bookCopy: BookCopy | null = await bookCopyService.getBookCopyById(id);
        if (!bookCopy) {
            let error: CustomError = new Error("BookCopy not found");
            error.status = 404;
            throw error;
        }
        return bookCopy;
    }

    // Crée une nouvelle copie de livre
    @Post("/")
    public async createBookCopy(
        @Body() requestBody: BookCopyDTO
    ): Promise<BookCopyDTO> {
        const {
            available,
            state,
            book
        } = requestBody;
        return bookCopyService.createBookCopy(available, state, book);
    }

    // Met à jour une copie de livre par ID
    @Patch("{id}")
    public async updateBookCopy(
        @Path() id: number,
        @Body() requestBody: BookCopyDTO
    ): Promise<BookCopyDTO | null> {
        const {bookId, available, state} = requestBody;
        const bookCopy: BookCopy | null = await bookCopyService.updateBookCopy(id, bookId, available, state);
        if (!bookCopy) {
            let error: CustomError = new Error("BookCopy not found");
            error.status = 404;
            throw error;
        }
        return bookCopy;
    }

    // Supprime une copie de livre par ID
    @Delete("{id}")
    public async deleteBookCopy(@Path() id: number): Promise<void> {
        await bookCopyService.deleteBookCopy(id);
    }
}