import { Comment, PrismaClient } from "@prisma/client";


class CommentController {

  async create(comment: Comment) {

    const prisma = new PrismaClient();
    try {
      return await prisma.comment.create({
        data: comment
      })
    } catch (e) {
      throw e;
    } finally {
      prisma.$disconnect();
    }

  }
}

export default new CommentController();