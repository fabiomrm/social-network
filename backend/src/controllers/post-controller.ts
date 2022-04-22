import { Post, PrismaClient } from "@prisma/client";
import prisma from "../services/prisma-service";
import friendController from "./friend-controller";

class PostController {

  async findAll(userId: number) {

    const friends = await friendController.findFriends(userId);
    const ids = friends.map(friend => friend.userAId === userId ? friend.userBId : friend.userAId)
    ids.push(userId);
    return prisma.post.findMany({
      where: {
        userId: {
          in: ids
        }
      },
      include: {
        user: true,
        comments: true,
      }
    })

  }

  async findById(id: number) {
    return await prisma.post.findUnique({
      where: {
        id
      }
    })
  }

  async create(post: Post) {
    return prisma.post.create({
      data: post,
    })
  }

}

export default new PostController();