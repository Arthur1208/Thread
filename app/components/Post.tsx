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
import {
  CommentType,
  ImageType,
  LikeType,
  SessionType,
} from "@/src/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Comment from "./Comment";
import FormComment from "./FormComment";
import Like from "./Like";

interface PostProps {
  title: string;
  caption: string;
  id: string;
  image: ImageType[];
  likeCount: number;
  likes: LikeType[];
  session: SessionType;
  comments: CommentType[];
  authorId: string; // Ajoutez une annotation de type pour l'objet image
}

export default function Post({
  title,
  caption,
  image,
  id,
  likeCount,
  session,
  likes,
  comments,
  authorId,
}: PostProps) {
  console.log("Image:", image);
  const router = useRouter();
  const userId = session.user.id;

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
        {authorId === userId && (
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
        )}

        <CardDescription>{caption}</CardDescription>
      </CardHeader>

      <CardContent>
        {image && image.length > 0 ? (
          <Image src={image[0].url} alt="" width={200} height={200} />
        ) : (
          <p></p>
        )}
        <div>
          <Like likes={likes} id={id} session={session} type="posts" />{" "}
          <p>{likeCount > 0 ? likeCount : 0}</p>
        </div>
        <FormComment postId={id} userId={userId} />
        <h4>Commentaires :</h4>
        {comments.map((comment) => {
          if (comment.postId === id) {
            return (
              <Comment
                key={id}
                authorId={comment.authorId}
                userName={session.user.name}
                comment={comment.caption}
                likeCount={comment.likeCount}
                likes={comment.likes}
                id={comment.id}
                session={session}
              />
            );
          }
          return null; // Renvoie null si le commentaire n'appartient pas au post
        })}
      </CardContent>
      <Link href={`/post/${id}`}>Voir le post</Link>
    </Card>
  );
}
