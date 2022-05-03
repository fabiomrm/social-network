import { Like } from "@prisma/client";
import prisma from "../services/prisma-service";

class LikeController {
  async create(like: Like) {
    return await prisma.like.create({
      data: like
    });
  }

  async fetchByPostId(postId: number) {
    return await prisma.like.findMany({
      where: {
        postId: postId,
      }
    })
  }

}

export default new LikeController();