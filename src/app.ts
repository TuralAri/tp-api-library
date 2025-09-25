import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { RegisterRoutes } from "./routes"; // tsoa va générer ce fichier
import errorHandler from "./middlewares/errorHandler";
import dotenv from "dotenv";

const PORT = process.env.PORT || 8000;

const app: Application = express();

dotenv.config();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);

RegisterRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

RegisterRoutes(app);