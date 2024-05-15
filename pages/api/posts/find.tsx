import prisma from "@/src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Créez une nouvelle entrée dans la table Post en utilisant les données de req.body
    const data = await prisma.post.findMany();
    res.json(data);
  }
}
