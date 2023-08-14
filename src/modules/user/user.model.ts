import { Schema, Types, model } from 'mongoose';

type UserSchema = {
    id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    following: Types.ObjectId[];
    followers: Types.ObjectId[];
};

const UserSchema = new Schema<UserSchema>({
    id: Types.ObjectId,
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    following: [{ type: Types.ObjectId, ref: 'User' }],
    followers: [{ type: Types.ObjectId, ref: 'User' }],
});

export const UserModel = model<UserSchema>('User', UserSchema);
