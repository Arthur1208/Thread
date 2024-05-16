"use server";
import prisma from "@/src/lib/prisma";
import { put } from "@vercel/blob";

export const uploadFile = async (formData: FormData) => {
  const file = formData.get("file") as File;

  if (!file) {
    return ""; // Retourne une chaîne vide si aucun fichier n'est fourni
  }

  const filename = file.name;
  const blob = await put(filename, file, {
    access: "public",
  });

  let imageUrl = "";

  if (blob.url) {
    // Créer une entrée dans la base de données uniquement si une URL est disponible
    await prisma.image.create({
      data: {
        url: blob.url,
      },
    });
    imageUrl = blob.url;
  }

  return imageUrl;
};
