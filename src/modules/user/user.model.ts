import { Schema, Types, model } from 'mongoose';

type UserSchema = {
    id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
};

const UserSchema = new Schema<UserSchema>({
    id: Types.ObjectId,
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
});

export const UserModel = model<UserSchema>('User', UserSchema);
