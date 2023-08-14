import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ENV from '../utils/env';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ error: 'authorization nahi hai' });

    const token = authorization.split(' ')[1];

    try {
        const decodedData = jwt.verify(token, ENV.SECRET_STRING) as JwtPayload;
        req.userID = decodedData._id;

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'unauthorized request' });
    }
};
