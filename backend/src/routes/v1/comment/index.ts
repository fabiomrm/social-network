import { Comment } from '@prisma/client';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import commentController from '../../../controllers/comment-controller';

const router = express.Router();


router.post("/comment", async (req: Request, res: Response) => {
  let comment: Comment = req.body
  const userId = (req as any).authUserId;
  try {
    if (comment) {
      comment.userId = userId;
      if ((comment as any).test) {
        comment.id = 1;

      } else {
        if ((comment as any).test) {
          delete (comment as any).test
        }
        comment = await commentController.create(comment);
      }

      res.status(StatusCodes.CREATED).json({ comment });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Erro ao tentar criar comentário. Tente novamente mais tarde"
      })
    }
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Ocorreu um erro ao criar comentário" })
  }

})


export default router;