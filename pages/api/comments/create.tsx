import prisma from "@/src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const postId = req.body.postId;
      const userId = req.body.userId;

      const comment = await prisma.comment.create({
        data: {
          authorId: userId,
          postId: postId,
          caption: req.body.comment,
        },
      });
    } catch {
      throw new Error("can't create comment");
    }
  }
}
