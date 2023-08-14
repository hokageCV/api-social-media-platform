import { Schema, Types, model } from 'mongoose';

type CommentSchema = {
    id: Types.ObjectId;
    comment: string;
    commentBy: string;
};

const CommentSchema = new Schema<CommentSchema>({
    id: Types.ObjectId,
    comment: { type: String, trim: true, required: true },
    commentBy: { type: String, ref: 'User' },
});

export const CommentModel = model<CommentSchema>('Comment', CommentSchema);
