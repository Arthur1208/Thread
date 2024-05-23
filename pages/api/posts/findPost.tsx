import prisma from "@/src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  if (req.method === "GET") {
    // Récupérer tous les posts avec les informations sur les images associées
    const data = await prisma.post.findUnique({
      where: {
        id: id,
      },
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
                childComments: {
                  // Inclure récursivement les enfants des enfants
                  include: {
                    author: true,
                    likes: true,
                    images: true,
                    childComments: true, // Continuer jusqu'à la profondeur souhaitée
                  },
                },
              },
            },
          },
        },
      },
    });
    res.json(data);
  }
}
