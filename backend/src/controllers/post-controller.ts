import { Post, PrismaClient } from "@prisma/client";
import prisma from "../services/prisma-service";
import friendController from "./friend-controller";
import likeController from "./like-controller";

class PostController {

  async findAll(userId: number) {

    const friends = await friendController.findFriends(userId);
    const ids = friends.map(friend => friend.userAId === userId ? friend.userBId : friend.userAId)
    ids.push(userId);
    const posts = await prisma.post.findMany({
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
    // for (const post of posts) {
    //   (post as any).likes = await likeController.fetchByPostId(post.id);
    //   console.log('aqui agora')
    // }
    console.log(posts)
    return posts;

  }

  async findById(id: number) {
    const post = await prisma.post.findUnique({
      where: {
        id
      },
      include: {
        user: true,
        comments: true
      }
    });

    (post as any).likes = await likeController.fetchByPostId(id);

    return post;
  }

  async create(post: Post) {
    return prisma.post.create({
      data: post,
    })
  }

}

export default new PostController();