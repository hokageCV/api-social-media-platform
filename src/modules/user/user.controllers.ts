import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ENV from '../../utils/env';
import { UserModel } from './user.model';

// =============================================
type CreateTokenType = {
    _id: string;
    email: string;
};

const createToken = ({ _id, email }: CreateTokenType) => {
    return jwt.sign({ _id, email }, ENV.SECRET_STRING, { expiresIn: '1d' });
};
// =============================================

export async function authenticateUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: 'email not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }

        const token = createToken({ _id: user._id.toString(), email: user.email });

        res.status(200).json({ user, token });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export function follow(req: Request, res: Response) {
    try {
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export function unFollow(req: Request, res: Response) {
    try {
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export function getSelfData(req: Request, res: Response) {
    try {
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}
