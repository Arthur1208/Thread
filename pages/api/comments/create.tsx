import prisma from "@/src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      type CommentDataType = {
        authorId: string;
        postId: string;
        caption: string;
        images?: { connect: { id: string } };
      };

      await prisma.image.create({
        data: {
          url: req.body.images,
        },
      });

      const { postId, userId, images: url, comment } = req.body;

      let commentData: CommentDataType = {
        authorId: userId,
        postId: postId,
        caption: comment,
      };

      if (url) {
        const image = await prisma.image.findFirst({
          where: {
            url: url,
          },
        });

        if (image) {
          commentData.images = {
            connect: {
              id: image.id,
            },
          };
        }
      }

      const newComment = await prisma.comment.create({
        data: commentData,
      });

      res.status(200).json(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "can't create comment" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
