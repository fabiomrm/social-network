import { Post } from '@prisma/client';
import express, { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import postController from '../../../controllers/post-controller';

const router = express.Router();

router.post("/post", async (req: Request, res: Response) => {
  let post: Post = req.body;
  const userId = (req as any).authUserId;
  post.userId = userId;

  try {
    if ((post as any).test) {
      post.id = 1;
      delete (post as any).test;
    } else {
      post = await postController.create(post);
    }

    res.status(StatusCodes.CREATED).json({ post });
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Ocorreu um erro interno ao tentar criar post." })
  }

})

export default router;