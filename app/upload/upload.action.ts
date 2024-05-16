"use server";

import prisma from "@/src/lib/prisma";
import { put } from "@vercel/blob";

export const uploadFile = async (formData: FormData) => {
  const file = formData.get("file") as File;
  const filename = file.name;

  const blob = await put(filename, file, {
    access: "public",
  });

  await prisma.image.create({
    data: {
      url: blob.url,
    },
  });

  return blob.url;
};
