import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { Book } from "./book.model";

export interface AuthorAttributes {
  id?: number;
  firstName: string;
  lastName: string;
}

export class Author extends Model<AuthorAttributes> implements AuthorAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
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