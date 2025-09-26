import * as express from "express";
import * as jwt from "jsonwebtoken";

const adminRight: string[] = ["read", "write", "update", "delete"];
const managerRight: string[] = ["read", "write", "update", "delete:BookCopy"];
const userRight: string[] = ["read", "write:Book"];

const SECRET_KEY = "your_secret_key";

export function generateToken(username: string) {
    let rights: string[] = [];
    switch (username) {
        case "admin":
            rights = adminRight;
            break;
        case "manager":
            rights = managerRight;
            break;
        case "user":
            rights = userRight;
            break;
    }

    const payload = { username, rights };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

// Middleware d'authentification
export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName !== "jwt") {
        throw new Error("Only support JWT authentication");
    }

    const authHeader = request.headers["authorization"];
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    return new Promise((resolve, reject) => {
        if (!token) return reject(new Error("No token provided"));

        jwt.verify(token, SECRET_KEY, (err, decoded: any) => {
            if (err) return reject(new Error("Invalid token"));

            const userRights: string[] = decoded.rights || [];

            // Si aucun scope demandé, renvoyer le token décodé
            if (!scopes || scopes.length === 0) return resolve(decoded);

            // Vérification des droits
            const hasRights = scopes.every(scope => userRights.includes(scope));
            if (!hasRights) return reject(new Error("Insufficient rights"));

            resolve(decoded);
        });
    });
}
