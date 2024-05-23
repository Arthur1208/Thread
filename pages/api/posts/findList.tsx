import prisma from "@/src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Récupérer tous les posts avec les informations sur les images associées
    const data = await prisma.post.findMany({
      include: {
        images: true,
        likes: true,
        author: true,
        comments: {
          include: {
            likes: true, // Inclure les likes des commentaires
            images: true,
            childComments: {
              include: {
                author: true,
                likes: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: {
        dateTime: "desc",
      },
    });
    res.json(data);
  }
}
