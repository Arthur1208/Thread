"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormPost({ session }) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(session?.user.id);
    try {
      // Effectuer des opérations asynchrones si nécessaire
      console.log("Title:", title);
      console.log("Caption:", caption);
      console.log("ok");

      const Post = {
        authorId: session?.user.id,
        title: title,
        caption: caption,
      };
      fetch("http://localhost:3000/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(Post),
      });
      router.refresh();
      setTitle("");
      setCaption("");
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la soumission du formulaire:",
        error
      );
    }
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
            <input id="image" type="file" />

            <DialogClose asChild>
              <Button type="submit">Envoyer</Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
