import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { PostModel } from './post.model';

export async function createPost(req: Request, res: Response) {
    const { title, description } = req.body;
    const { userID } = req;

    try {
        const post = await PostModel.create({ title, description, postBy: userID });
        if (!post) return res.status(400).json({ message: 'Post creation failed' });

        return res.status(201).json({
            'Post-ID': post._id,
            Title: title,
            Description: description,
            'Created Time': post.createdAt,
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export async function deletePost(req: Request, res: Response) {
    const { id: postID } = req.params;
    try {
        const post = await PostModel.findByIdAndDelete(postID);
        if (!post) return res.status(400).json({ message: 'Post not found' });

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export async function likePost(req: Request, res: Response) {
    const { id } = req.params;
    const { userID } = req;

    try {
        const postID = new ObjectId(id);
        const userId = new ObjectId(userID);

        const post = await PostModel.findById(postID);
        if (!post) return res.status(400).json({ message: 'Post not found' });

        const isLiked = post.likes.includes(userId);
        if (isLiked) return res.status(400).json({ message: 'Post already liked' });

        post.likes.push(userId);
        await post.save();

        return res.status(200).json({ message: 'Post liked successfully' });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export async function unlikePost(req: Request, res: Response) {
    const { id } = req.params;
    const { userID } = req;

    try {
        const postID = new ObjectId(id);
        const userId = new ObjectId(userID);

        const post = await PostModel.findById(postID);
        if (!post) return res.status(400).json({ message: 'Post not found' });

        if (!post.likes.includes(userId))
            return res.status(400).json({ message: 'Post not liked' });

        await PostModel.updateOne({ _id: postID }, { $pull: { likes: userId } });

        return res.status(200).json({ message: 'Post unliked successfully' });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export async function getPostData(req: Request, res: Response) {
    const { id: postID } = req.params;

    try {
        const post = await PostModel.findById(postID).populate({
            path: 'comments',
            select: 'comment',
        });
        if (!post) return res.status(400).json({ message: 'Post not found' });

        return res
            .status(200)
            .json({
                'Post-ID': post._id,
                Title: post.title,
                Description: post.description,
                Comments: post.comments,
                Likes: post.likes.length,
            });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export async function getAllPostByUser(req: Request, res: Response) {
    const { userID } = req;

    try {
        const allPosts = await PostModel.find({ postBy: userID }).populate({
            path: 'comments',
            select: 'comment',
        });
        if (!allPosts) return res.status(400).json({ message: 'No posts found' });

        const formattedPosts = allPosts.map((post) => ({
            id: post._id,
            title: post.title,
            desc: post.description,
            created_at: post.createdAt,
            comments: post.comments,
            likes: post.likes.length,
        }));

        return res.status(200).json({ all_posts: formattedPosts });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}
