import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { authorService } from "../services/author.service";
import { AuthorDTO } from "../dto/author.dto";
import { Author } from "../models/author.model";
import { CustomError } from "../middlewares/errorHandler";
import {bookService} from "../services/book.service";
import {BookDTO} from "../dto/book.dto";

@Route("authors")
@Tags("Authors")
export class AuthorController extends Controller {
  // Récupère tous les auteurs
  @Get("/")
  public async getAllAuthors(): Promise<AuthorDTO[]> {
    return authorService.getAllAuthors();
  }

// Récupère un auteur par ID
    @Get("{id}")
    public async getAuthorById(@Path() id: number): Promise<AuthorDTO> {
        let author = await authorService.getAuthorById(id);

        if (!author) {
            let error : CustomError = new Error("Author not found");
            error.status = 404;
            throw error;
        }else{
            return author;
        }
    }

  // Crée un nouvel auteur
  @Post("/")
  public async createAuthor(
    @Body() requestBody: AuthorDTO
  ): Promise<AuthorDTO> {
    const { firstName, lastName } = requestBody;
    return authorService.createAuthor(firstName, lastName);
  }

  // Supprime un auteur par ID
  @Delete("{id}")
  public async deleteAuthor(@Path() id: number): Promise<void> {
    await authorService.deleteAuthor(id);
  }

    // Met à jour un auteur par ID
    @Patch("{id}")
    public async updateAuthor(
        @Path() id: number,
        @Body() requestBody: AuthorDTO
    ): Promise<AuthorDTO> {
        const { firstName, lastName } = requestBody;
        let author = await authorService.updateAuthor(id, firstName, lastName);

        if(author === null) {
            let error: CustomError = new Error("Author not found");
            error.status = 404;
            throw error;
        }

        return author;
    }

    // Récupère les livres de l'auteur par ID
    @Get("{id}/books")
    public async getAuthorBooksById(@Path() id: number): Promise<BookDTO[] | null> {
        let author: Author | null = await authorService.getAuthorById(id);
        if (!author) {
            let error: CustomError = new Error("Author not found");
            error.status = 404;
            throw error;
        }

        return bookService.getBooksByAuthor(author);
    }
}
