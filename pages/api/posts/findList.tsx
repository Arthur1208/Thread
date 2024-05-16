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
      },
    });
    res.json(data);
  }
}
