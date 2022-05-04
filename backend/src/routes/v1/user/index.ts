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

router.post('/user/:page/:count', async (req: Request, res: Response) => {
  const userId = (req as any).authUserId;
  const { page, count } = req.params;
  const { searchTerm } = req.body;
  try {
    const users = await userController.search(userId, searchTerm, Number(page), Number(count));
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erro ao buscar usuários" })
  }



})

export default router;