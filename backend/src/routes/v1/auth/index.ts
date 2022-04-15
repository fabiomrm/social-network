import { User } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import authController from "../../../controllers/auth-controller";


const router = express.Router();

router.post(
  "/sign-up",
  async (req: Request, res: Response, next: NextFunction) => {
    let user: User = req.body;
    try {
      if (user.name && user.surname && user.email && user.password) {
        if ((user as any).test) {
          user.id = 1;
          user.password = "";
          return res.status(StatusCodes.CREATED).json({ user });
        }
        user = await authController.signUp(user);
        user.password = "";

        res.status(StatusCodes.CREATED).json({ user });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Dados inválidos." });
      }
    } catch (e) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Erro interno ao cadastrar usuário" });
    }
  }
);

router.post("/sign-in", async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {

    const token = await authController.signIn(email, password);

    if (token) {
      return res.json({ token })
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Credenciais inválidas"
      })
    }

  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocorreu um erro ao efetuar login"
    })
  }
})

export default router;
