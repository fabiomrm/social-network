import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';


export function jwtGenerateToken(id: number) {
  return jwt.sign({
    id,
  }, process.env.JWT_SECRET || '', {
    expiresIn: "12h"
  })

}

export async function jwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization || "";
  const [_, token] = authHeader.split(" ");
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secret");
    (req as any).authUserId = (decodedToken as any).id;

    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secret", { ignoreExpiration: true })
      const newToken = jwtGenerateToken((decodedToken as any).id);
      (req as any).authUserId = (decodedToken as any).id;
      (req as any).newToken = newToken;
      next();
    } else {

      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Usuário não autorizado." + e })
    }
  }
}