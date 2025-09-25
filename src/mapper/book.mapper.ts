import { BookDTO } from "../dto/book.dto";
import { Book } from "../models/book.model";

export function toDto(book: Book): BookDTO {
    return {id: book.id, title: book.title, publishYear: book.publishYear, author: book.author, isbn: book.isbn  };
}