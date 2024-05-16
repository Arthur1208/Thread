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
import { ImageType, LikeType } from "@/src/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Like from "./Like";

interface PostProps {
  title: string;
  caption: string;
  id: string;
  image: ImageType[];
  likeCount: number;
  likes: LikeType[]; // Ajoutez une annotation de type pour l'objet image
}

export default function Post({
  title,
  caption,
  image,
  id,
  likeCount,
  session,
  likes,
}: PostProps) {
  console.log("Image:", image);
  const router = useRouter();

  async function handleDelete() {
    console.log("click");
    console.log(id);

    await fetch("http://localhost:3000/api/posts/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: id }),
    }).then(() => {
      router.refresh();
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
        <div>
          <Like likes={likes} id={id} session={session} />{" "}
          <p>{likeCount > 0 ? likeCount : 0}</p>
        </div>
      </CardContent>
      <Link href={`/post/${id}`}>Voir le post</Link>
    </Card>
  );
}
