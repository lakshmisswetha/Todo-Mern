import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
const jwt = require("jsonwebtoken");

interface IUser {
    id: string | ObjectId;
    email: string;
    username: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const userAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const bearer = req?.headers?.authorization;
        if (!bearer) {
            return res.status(401).json({
                status: false,
                error: "Access Denied, No token",
            });
        }
        const token = bearer.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (decodedToken) {
            req.user = decodedToken;
            next();
        } else {
            return res
                .status(401)
                .json({ status: false, error: "invalid token" });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ status: false });
    }
};
