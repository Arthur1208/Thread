import prisma from "@/src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function deletePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const postId = req.body.postId; // Supposons que l'ID du post soit passé dans le corps de la requête
      if (!postId) {
        throw new Error("Post ID is required");
      }

      const comments = await prisma.comment.findMany({
        where: {
          postId: postId,
        },
      });
      const commentIds = comments.map((comment) => comment.id);

      await prisma.like.deleteMany({
        where: {
          OR: [
            {
              postId: postId,
            },
            {
              commentId: {
                in: commentIds,
              },
            },
          ],
        },
      });
      await prisma.comment.deleteMany({
        where: {
          postId: postId,
        },
      });

      const deletedPost = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      res
        .status(200)
        .json({ message: "Post deleted successfully", deletedPost });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Error deleting post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
