import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import friendController from '../../../controllers/friend-controller';

const router = express.Router();

router.post("/friend", async (req: Request, res: Response) => {
  const userId = (req as any).authUserId;
  const { friendId, test } = req.body;
  try {
    if (test) {
      return res.json({ success: true, friend: {} })
    }
    const friend = await friendController.create(friendId, userId);
    if (friend) {
      return res.json({ success: true, friend })
    } else {
      return res.status(StatusCodes.BAD_GATEWAY).json({
        message: "Ocorreu um erro solicitando amizade"
      })
    }
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocorreu um erro interno buscando usuários."
    })
  }
})

router.post("/friend/accept", async (req: Request, res: Response) => {
  const { friendId, accepted, test } = req.body;
  const userId = (req as any).authUserId;
  try {
    if (test) {
      return res.json({ success: true, friend: {} })
    }
    const result = await friendController.accept(userId, friendId, accepted)
    if (result) {
      return res.json({ success: true, friend: result })
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Erro ao aceitar/recusar solicitação de amizade"
      })
    }
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocorreu um erro interno aceitando amizade"
    })
  }
})

export default router;