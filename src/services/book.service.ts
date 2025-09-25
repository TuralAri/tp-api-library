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

    public async updateBook(id: number, title: string, publishYear: number, authorId: number, isbn: string): Promise<Book | null> {
        let book = await this.getBookById(id);
        if(book === null) {
            // Cette erreur pourrait être levée directement dans le contrôleur pour garder une cohérence de code
            // Possibilité de gérer les erreurs dans le contrôleur ou le service selon les choix de développement
            let error: CustomError = new Error(`Book ${id} not found`);
            error.status = 404;
            throw error;
        } else {
            if(authorId !== undefined) {
                let author = await this.authorService.getAuthorById(authorId);
                if(author === null) {
                    let error: CustomError = new Error(`Author ${authorId} not found`);
                    error.status = 404;
                    throw error;
                }
            }

            if(title !== undefined) {
                book.title = title;
            }

            if(publishYear !== undefined) {
                book.publishYear = publishYear;
            }

            if(isbn !== undefined) {
                book.isbn = isbn;
            }
            return book.save();
        }
    }

}

export const bookService = new BookService();