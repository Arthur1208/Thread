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
      include: {
        images: true,
      },
      where: {
        id: id,
      },
    });
    res.json(data);
  }
}
