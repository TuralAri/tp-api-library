import {Model, DataTypes} from "sequelize";
import sequelize from "../config/database"; // Connection à la base de données
import {BookDTO} from "../dto/book.dto";
import {Book} from "./book.model";

export interface BookCopyAttributes {
    id?: number;
    bookId?: number;
    available: number;
    state: number;
    book?: BookDTO;
}

export class BookCopy extends Model<BookCopyAttributes> implements BookCopyAttributes {
    public id?: number;
    public bookId!: number;
    public available!: number;
    public state!: number;
    public book?: BookDTO;
}

BookCopy.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "book_id",
        },
        available: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "BookCopy",
    }
);

BookCopy.belongsTo(Book, { foreignKey: "bookId", as: "book" });
Book.hasMany(BookCopy, {
    foreignKey: "book_id",
    as: "copys",
    sourceKey: "id",
})