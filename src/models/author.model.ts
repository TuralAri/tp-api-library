import {Model, DataTypes} from "sequelize";
import sequelize from "../config/database";
import {Book} from "./book.model"; // Connexion à la base de données

export interface AuthorAttributes {
    id?: number;
    firstName: string;
    lastName: string;
    books?: Book[];
}

export class Author extends Model<AuthorAttributes> implements AuthorAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public books?: Book[];
}

Author.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "first_name",
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "last_name",
        },
    },
    {
        sequelize,
        tableName: "Author",
    }
);