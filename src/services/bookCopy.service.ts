import {BookCopy} from "../models/bookCopy.model";
import {Book} from "../models/book.model";
import {BookDTO} from "../dto/book.dto";

export class BookCopyService {
    public async getAllBookCopys(): Promise<BookCopy[]> {
        return BookCopy.findAll({
            include: [{
                model: Book,
                as: 'book'
            }]
        });
    }

    // Récupère une copie de livre par ID
    public async getBookCopyById(id: number): Promise<BookCopy | null> {
        return BookCopy.findByPk(id);
    }

    // Récupère une ou plusieurs copie(s) de livre par l'ID d'un livre
    public async getBookCopysByBookId(id: number): Promise<BookCopy[] | null> {
        return BookCopy.findAll({where: {bookId: id}});
    }

    // Crée une nouvelle copie de livre
    public async createBookCopy(
        available: number,
        state: number,
        book: BookDTO | undefined,
    ): Promise<BookCopy> {
        return BookCopy.create({
            bookId: book?.id,
            available: available,
            state: state,
            book: book
        });
    }

    // Met à jour une copie de livre
    public async updateBookCopy(
        id: number,
        bookId?: number,
        available?: number,
        state?: number,
        book?: Book,
    ): Promise<BookCopy | null> {
        const bookCopy = await BookCopy.findByPk(id);
        if (bookCopy) {
            if (bookId) bookCopy.bookId = bookId;
            if (available) bookCopy.available = available;
            if (state) bookCopy.state = state;
            if (book) bookCopy.book = book;
            await bookCopy.save();
            return bookCopy;
        }
        return null;
    }

    // Supprime une copie de livre par ID
    public async deleteBookCopy(id: number): Promise<void> {
        const bookCopy = await BookCopy.findByPk(id);
        if (bookCopy) {
            await bookCopy.destroy();
        }
    }
}

export const bookCopyService = new BookCopyService();