"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SessionType } from "@/src/types/types";
import { useUploadThing } from "@/utils/uploadthing";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./formPost.css";

import { useState } from "react";
interface FormPostProps {
  session: SessionType; // Annoter explicitement le type de session avec SessionType
}
export default function FormPost({ session }: FormPostProps) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null); // Utilisez null pour stocker l'image
  const [imageUrl, setImageUrl] = useState("");

  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isPostError, setIsPostError] = useState(false);
  const [isPostPublish, setIsPostPublish] = useState(false);

  const router = useRouter();

  let uploadedImageUrl: string = "";
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      const url = res[0].url;
      uploadedImageUrl = url;
    },

    onUploadError: () => {},
    onUploadBegin: () => {},
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsPostLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      console.log(session.user.id);

      if (file.name !== "") {
        await startUpload([file]);
        console.log("uploadedImageUrl = " + uploadedImageUrl);
      }

      console.log("uploadedImageUrl pas dans le if = " + uploadedImageUrl);
      // Mise à jour de imageUrl si un fichier a été téléchargé
      const updatedImageUrl = file ? imageUrl.toString() : "";

      console.log("Updated img " + updatedImageUrl);

      const Post = {
        caption: caption,
        images: file.name !== "" ? uploadedImageUrl : undefined,
        authorId: session.user.id,
      };

      await fetch("http://localhost:3000/api/posts/create", {
        method: "POST",
        body: JSON.stringify(Post),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
      setIsPostLoading(false);
      setIsPostError(true);
    } finally {
      setIsPostLoading(false);
      setIsPostPublish(true);
      setTitle("");
      setCaption("");
      setImageUrl("");
      router.refresh();
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
      {isPostLoading && (
        <Alert className="alert1">
          <AlertTitle>
            <div className="flex">
              <div className="loader"></div> <span>Publication</span>
            </div>
          </AlertTitle>
        </Alert>
      )}
      {isPostError && (
        <Alert className="alert2">
          <AlertTitle>Le post na pas pu être créer</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      )}
      {isPostPublish && (
        <Alert className="alert3">
          <AlertTitle>Le post a bien pu être créer</AlertTitle>
          <AlertDescription></AlertDescription>
        </Alert>
      )}
    </div>
  );
}
