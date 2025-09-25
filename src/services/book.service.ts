import {Author} from "../models/author.model";
import {Book} from "../models/book.model";
import {AuthorDTO} from "../dto/author.dto";
import {bookCopyService} from "./bookCopy.service";
import {CustomError} from "../middlewares/errorHandler";

export class BookService {
    public async getAllBooks(): Promise<Book[]> {
        return Book.findAll({
            include: [{
                model: Author,
                as: 'author'
            }]
        });
    }

    // Récupère un livre par ID
    public async getBookById(id: number): Promise<Book | null> {
        return Book.findByPk(id);
    }

    // Récupère les livres par auteur
    public async getBooksByAuthor(author: Author): Promise<Book[] | null> {
        return Book.findAll({where: {authorId: author.id}});
    }

    // Crée un nouveau livre
    public async createBook(
        title: string,
        publishYear: number,
        authorId: number | undefined,
        isbn: string
    ): Promise<Book> {
        return Book.create({
            title,
            publishYear,
            isbn,
            authorId
        });
    }


    // Met à jour un livre
    public async updateBook(
        id: number,
        title?: string,
        publishYear?: number,
        author?: AuthorDTO,
        isbn?: string
    ): Promise<Book | null> {
        const book = await Book.findByPk(id);
        if (book) {
            if (title) book.title = title;
            if (publishYear) book.publishYear = publishYear;
            if (author) book.author = author;
            if (isbn) book.isbn = isbn;
            await book.save();
            return book;
        }
        return null;
    }

    // Supprime un livre par ID
    public async deleteBook(id: number): Promise<void> {
        const book = await Book.findByPk(id);
        const bookCopies = await bookCopyService.getBookCopysByBookId(id);
        if (bookCopies) {
            let error: CustomError = new Error("Cannot delete book with existing copies");
            error.status = 400;
            throw error;
        }
        if (book) {
            await book.destroy();
        }
    }
}

export const bookService = new BookService();