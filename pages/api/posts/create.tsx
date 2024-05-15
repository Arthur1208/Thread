import prisma from "@/src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Créez une nouvelle entrée dans la table Post en utilisant les données de req.body
    const newPost = await prisma.post.create({
      data: {
        title: req.body.title,
        caption: req.body.caption,
        authorId: req.body.authorId,
      },
    });

    // Envoyer la réponse avec la nouvelle entrée créée
    res.status(200).json({ name: "John Doe" });
  }
}
