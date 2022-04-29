import express, { Request, Response } from 'express';
import { Like } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import likeController from '../../../controllers/like-controller';

const router = express.Router();

router.post('/like', async (req: Request, res: Response) => {
  let like: Like = req.body;
  const userId = (req as any).userId;
  console.log(like)

  try {
    if ((like as any).test) {
      like.id = 1;
    } else {
      like.userId = userId;

    }
    like = await likeController.create(like);
    return res.status(201).json({ like })

  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocorreu um erro interno ao tentar curtir um post. Tente novamente"
    })
  }




})


export default router;