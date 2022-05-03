import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import userController from '../../../controllers/user-controller';

const router = express.Router();


router.get('/user/me', async (req: Request, res: Response) => {
  const userId = (req as any).authUserId;

  const user = await userController.getUserById(userId);

  if (user) {
    return res.status(StatusCodes.ACCEPTED).json({ user });
  }

  return res.status(StatusCodes.NOT_FOUND).json({ message: "Usuário não existe" })
})

export default router;