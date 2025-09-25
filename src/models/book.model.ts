import {Model, DataTypes} from "sequelize";
import sequelize from "../config/database"; // Connection à la base de données
import {Author} from "./author.model";
import {AuthorDTO} from "../dto/author.dto";
import {BookCopy} from "./bookCopy.model";

export interface BookAttributes {
    id?: number;
    title: string;
    publishYear: number;
    authorId?: number;
    isbn: string;
    author?: AuthorDTO;
    copys?: BookCopy[];
}

export class Book extends Model<BookAttributes> implements BookAttributes {
    public id!: number;
    public title!: string;
    public publishYear!: number;
    public authorId?: number;
    public isbn!: string;
    public author?: AuthorDTO;
    public copys?: BookCopy[];
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publishYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "publish_year",
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "author_id",
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: "Book",
    }
);

Book.belongsTo(Author, { foreignKey: "authorId", as: "author" });
Author.hasMany(Book, {
    foreignKey: "author_id",
    as: "books",
    sourceKey: "id"
});