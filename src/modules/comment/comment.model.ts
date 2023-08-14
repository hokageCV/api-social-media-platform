import { Schema, Types, model } from 'mongoose';

type CommentSchema = {
    id: Types.ObjectId;
    commentBody: string;
    commentBy: string;
};

const CommentSchema = new Schema<CommentSchema>({
    id: Types.ObjectId,
    commentBody: { type: String, trim: true, required: true },
    commentBy: { type: String, ref: 'User' },
});

export const CommentModel = model<CommentSchema>('Comment', CommentSchema);
