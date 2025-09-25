import {BookDTO} from "./book.dto";

export interface BookCopyDTO {
    id?: number;
    bookId: number;
    available: number;
    state: number;
    book?: BookDTO;
}