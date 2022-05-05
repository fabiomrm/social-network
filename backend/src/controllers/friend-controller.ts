import { PrismaClient } from "@prisma/client";
import prisma from "../services/prisma-service";

class FriendController {

  async findFriends(userId: number) {

    return await prisma.friend.findMany({
      where: {
        userAId: userId,
        OR: {
          userBId: userId,
          AND: {
            accepted: true
          }
        }
      }
    })
  }

  async create(userId: number, friendId: number) {

    const entry = await prisma.friend.findFirst({
      where: {
        userAId: userId,
        userBId: friendId,
        OR: {
          userAId: friendId,
          userBId: userId,
        }
      }
    })

    if (entry) {
      return entry;
    }
    else {
      return await prisma.friend.create({
        data: {
          userAId: userId,
          userBId: friendId,
          accepted: false,
        }
      })
    }
  }

}


export default new FriendController();