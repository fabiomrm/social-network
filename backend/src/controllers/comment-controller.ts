import { Comment, PrismaClient } from "@prisma/client";


class CommentController {

  async create(comment: Comment) {

    const prisma = new PrismaClient();
    try {
      return await prisma.comment.create({
        data: {
          text: comment.text,
          postId: comment.postId,
          userId: comment.userId
        }
      })

    } catch (e) {
      throw e;
    } finally {
      prisma.$disconnect();
    }

  }
}

export default new CommentController();