"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SessionType } from "@/src/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadFile } from "../upload/upload.action";

interface FormPostProps {
  session: SessionType; // Annoter explicitement le type de session avec SessionType
}

export default function FormPost({ session }: FormPostProps) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null); // Utilisez null pour stocker l'image
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    console.log(session.user.id);
    let url = "";
    if (file.name !== "") {
      url = await uploadFile(formData);
      console.log(url);
      setImageUrl(url);
    }

    const Post = {
      title: title,
      caption: caption,
      images: file ? url.toString() : undefined,
      authorId: session.user.id,
    };

    await fetch("http://localhost:3000/api/posts/create", {
      method: "POST",
      body: JSON.stringify(Post),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(() => {
      setTitle("");
      setCaption("");
      setImageUrl("");
      router.refresh();
    });
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Ajouter un post</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              id="title"
              type="text"
            />
            <label htmlFor="caption">Caption</label>
            <input
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
              id="caption"
              type="text"
            />
            <label htmlFor="image">Images</label>
            <input id="image" type="file" name="file" />

            {imageUrl && <Image src={imageUrl} alt="Selected image" />}

            <DialogClose asChild>
              <Button type="submit">Envoyer</Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
