import { Request, Response } from 'express';
import { PostModel } from '../post/post.model';
import { CommentModel } from './comment.model';

export async function createComment(req: Request, res: Response) {
    const { id: postID } = req.params;
    const { comment } = req.body;
    const { userID } = req;

    try {
        if (!comment) return res.status(400).json({ message: 'Comment is required' });

        const createdComment = await CommentModel.create({ comment, commentBy: userID });
        if (!createdComment) return res.status(400).json({ message: 'Comment creation failed' });

        // to avoid fetching post separately, directly finding & updating with 'new:true'
        // if its there, then good, else delete the comment
        const updatePost = await PostModel.findByIdAndUpdate(
            postID,
            { $push: { comments: createdComment._id } },
            { new: true }
        );
        if (!updatePost) {
            await CommentModel.findByIdAndDelete(createdComment._id);
            return res.status(400).json({ message: 'Post not found' });
        }

        return res.status(201).json({ message: 'Comment created successfully' });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export async function getCommentByID(req: Request, res: Response) {
    const { id: postID } = req.params;

    try {
        const comment = await CommentModel.find({ _id: postID });
        if (!comment) return res.status(400).json({ message: 'Comment not found' });

        return res.status(200).json({ comment });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}
