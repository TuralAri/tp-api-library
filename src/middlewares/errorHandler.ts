import { Request, Response, NextFunction } from "express";

// Interface pour les erreurs
export type CustomError = Error & {
    status?: number;
}

// Middleware pour gérer les erreurs
const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error("An error occurred:", err);

    // Définir un statut d'erreur par défaut
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    // Envoyer la réponse d'erreur au client
    res.status(statusCode).json({
        status: statusCode,
        message: message,
    });
};

export default errorHandler;