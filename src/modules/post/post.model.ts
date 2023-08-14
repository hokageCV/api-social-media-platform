import { Schema, Types, model } from 'mongoose';

type PostSchema = {
    id: Types.ObjectId;
    postBody: string;
    postBy: string;
    likes: Types.ObjectId[];
    comments: Types.ObjectId[];
};

const PostSchema = new Schema<PostSchema>({
    id: Types.ObjectId,
    postBody: { type: String, trim: true, required: true },
    postBy: { type: String, ref: 'User' },
    likes: [{ type: Types.ObjectId, ref: 'User' }],
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
});

export const PostModel = model<PostSchema>('Post', PostSchema);
