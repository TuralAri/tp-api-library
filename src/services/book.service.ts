import { Author } from "../models/author.model";
import { Book } from "../models/book.model";
import {BookDTO} from "../dto/book.dto";
import {AuthorService} from "./author.service";
import {CustomError} from "../middlewares/errorHandler";

export class BookService {

    public authorService = new AuthorService();

    public async getAllBooks(): Promise<Book[]> {
        return Book.findAll({
            include: [{
                model: Author,
                as: 'author'
            }]
        });
    }

    public async createBook(
        title: string,
        publishYear: number,
        authorId: number,
        isbn: string,
    ): Promise<Book> {
        let author: Author | null = await this.authorService.getAuthorById(authorId);
        if (!author) {
            let error: CustomError = new Error("Author not found");
            error.status = 404;
            throw error;
        }
        return Book.create({ title, publishYear, authorId, isbn });
    }

    public async getBookById(id: number): Promise<Book | null > {
        return Book.findByPk(id, {
            include: [
                {
                    model: Author,
                    as: 'author',
                },
            ],
        });
    }
}

export const bookService = new BookService();