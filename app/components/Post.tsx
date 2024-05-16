"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageType } from "@/src/types/types";
import Image from "next/image";
import Link from "next/link";

interface PostProps {
  title: string;
  caption: string;
  id: string;
  image: ImageType[]; // Ajoutez une annotation de type pour l'objet image
}

export default function Post({ title, caption, image, id }: PostProps) {
  console.log("Image:", image);

  async function handleDelete() {
    console.log("click");
    console.log(id);

    await fetch("http://localhost:3000/api/posts/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: id }),
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <DropdownMenu>
          <div className=" flex">
            <Button asChild>
              <DropdownMenuTrigger>Option</DropdownMenuTrigger>
            </Button>
          </div>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleDelete()}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CardDescription>{caption}</CardDescription>
      </CardHeader>

      <CardContent>
        {image && image.length > 0 ? (
          <Image src={image[0].url} alt="" width={200} height={200} />
        ) : (
          <p></p>
        )}
      </CardContent>
      <Link href={`/post/${id}`}>Voir le post</Link>
    </Card>
  );
}
