import { User } from "@prisma/client";
import userController from "./user-controller";
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

class AuthController {
    async signUp(user: User) {

        return await userController.create(user);
    }

    async signIn(email: string, password: string) {
        const user = await userController.getUserByEmail(email);
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({
                    id: user.id,
                }, process.env.JWT_SECRET || '', {
                    expiresIn: "12h"
                })
                return token;
            } else {
                return undefined;
            }
        }
    }
}

export default new AuthController();