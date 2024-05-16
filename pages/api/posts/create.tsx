import prisma from "@/src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      let postData: {
        title: string;
        caption: string;
        authorId: string;
        images?: { connect: { id: string } };
      } = {
        title: req.body.title,
        caption: req.body.caption,
        authorId: req.body.authorId,
      };

      if (req.body.images) {
        // Trouver l'image dans la base de données
        const image = await prisma.image.findFirst({
          where: {
            url: req.body.images,
          },
        });

        console.log("Image found:", image); // Log de l'image trouvée

        if (image) {
          postData.images = {
            connect: {
              id: image.id,
            },
          };
        } else {
          console.log("Image not found for URL:", req.body.image);
        }
      }

      console.log("Post data:", postData); // Log des données du post

      // Créer le post avec les données préparées
      const newPost = await prisma.post.create({
        data: postData,
      });

      console.log("New post created:", newPost); // Log du nouveau post créé

      // Répondre avec le nouveau post créé
      res.status(200).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Error creating post" });
    }
  } else {
    // Méthode non autorisée
    res.status(405).json({ error: "Method not allowed" });
  }
}
