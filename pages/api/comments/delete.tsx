import prisma from "@/src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function deletePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const commentId = req.body.commentId; // Supposons que l'ID du post soit passé dans le corps de la requête
      if (!commentId) {
        throw new Error("Post ID is required");
      }

      const deletedComment = await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });

      res
        .status(200)
        .json({ message: "Post deleted successfully", deletedComment });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Error deleting post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
