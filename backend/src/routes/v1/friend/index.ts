import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import friendController from '../../../controllers/friend-controller';

const router = express.Router();

router.post("/friend", async (req, res) => {
  const userId = (req as any).authUserId;
  const { friendId } = req.body;
  try {
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

export default router;