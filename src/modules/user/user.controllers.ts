import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
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
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Incorrect Password' });

        const token = createToken({ _id: user._id.toString(), email: user.email });

        res.status(200).json({ user, token });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export async function follow(req: Request, res: Response) {
    const { id } = req.params;
    const { userID } = req;

    try {
        const otherUserID = new ObjectId(id);

        const otherUserExits = await UserModel.findById(otherUserID);
        if (!otherUserExits) return res.status(400).json({ message: 'User not found' });

        const user = await UserModel.findById(userID);
        if (!user) return res.status(400).json({ message: 'User not found' });

        if (user.following.includes(otherUserID))
            return res.status(400).json({ message: 'Already following' });

        const userUpdates = UserModel.updateOne(
            { _id: userID },
            { $push: { following: otherUserID } }
        );
        const otherUserUpdates = UserModel.updateOne(
            { _id: otherUserID },
            { $push: { followers: userID } }
        );

        await Promise.all([userUpdates, otherUserUpdates]);

        res.status(200).json({ message: 'Followed' });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export async function unFollow(req: Request, res: Response) {
    const { id } = req.params;
    const { userID } = req;
    try {
        const otherUserID = new ObjectId(id);

        const otherUserExits = await UserModel.findById(otherUserID);
        if (!otherUserExits) return res.status(400).json({ message: 'User not found' });

        const user = await UserModel.findById(userID);
        if (!user) return res.status(400).json({ message: 'User not found' });

        if (!user.following.includes(otherUserID))
            return res.status(400).json({ message: 'Not following' });

        const userUpdates = UserModel.updateOne(
            { _id: userID },
            { $pull: { following: otherUserID } }
        );
        const otherUserUpdates = UserModel.updateOne(
            { _id: otherUserID },
            { $pull: { followers: userID } }
        );

        await Promise.all([userUpdates, otherUserUpdates]);

        res.status(200).json({ message: 'Unfollowed' });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export async function getSelfData(req: Request, res: Response) {
    const { userID } = req;

    try {
        const user = await UserModel.findById(userID);
        if (!user) return res.status(400).json({ message: 'User not found' });

        res.status(200).json({ data: user });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}
