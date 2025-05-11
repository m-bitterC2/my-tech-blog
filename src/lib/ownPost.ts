import { prisma } from "./prisma";

export const getOwnPosts = async (userId: string) => {
  return await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      published: true,
      updatedAt: true,
    },
    where: {
      authorId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export async function getOwnPost(userId: string, postId: string) {
  return await prisma.post.findFirst({
    where: {
      AND: [{ authorId: userId }, { id: postId }],
    },
    include: {
      author: {
        select: {
          userName: true,
        },
      },
    },
  });
}
