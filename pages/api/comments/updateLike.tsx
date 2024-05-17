import prisma from "@/src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function upadtePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.body.action === "add") {
      try {
        const postId = req.body.postId;
        const userId = req.body.userId; // Supposons que l'ID du post soit passé dans le corps de la requête
        if (!postId) {
          throw new Error("Post ID is required");
        }

        const like = await prisma.like.create({
          data: {
            commentId: postId,
            userId: userId,
            liked: true,
          },
        });

        const updateComment = await prisma.comment.update({
          where: {
            id: postId,
          },
          data: {
            likeCount: { increment: 1 },
          },
        });

        res
          .status(200)
          .json({ message: "Post deleted successfully", updateComment });
      } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Error deleting post" });
      }
    } else if (req.body.action === "delete") {
      try {
        const postId = req.body.postId;
        const userId = req.body.userId; // Supposons que l'ID du post soit passé dans le corps de la requête
        if (!postId) {
          throw new Error("Post ID is required");
        }

        const like = await prisma.like.findFirst({
          where: {
            commentId: postId,
            userId: userId,
          },
        });
        const likeDelete = await prisma.like.delete({
          where: {
            id: like?.id,
          },
        });

        const updateComment = await prisma.comment.update({
          where: {
            id: postId,
          },
          data: {
            likeCount: { increment: -1 },
          },
        });

        res
          .status(200)
          .json({ message: "Post deleted successfully", upadtePost });
      } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Error deleting post" });
      }
    }
  } else if (req.method === "get") {
    const postId = req.query.postId as string;

    await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
