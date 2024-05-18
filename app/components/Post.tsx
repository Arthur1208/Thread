"use client";
import { Card } from "@/components/ui/card";
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
  authorId: string;
  createdAt: Date; // Ajoutez une annotation de type pour l'objet image
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
  createdAt,
}: PostProps) {
  console.log("Image:", image);
  const router = useRouter();
  const userId = session.user.id;

  const createdAtDate = new Date(createdAt);
  console.log(new Date());
  console.log(createdAt);
  console.log(createdAtDate);

  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - createdAtDate.getTime();

  const secondsElapsed = Math.floor(timeDiff / 1000);
  const minutesElapsed = Math.floor(secondsElapsed / 60);
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  const daysElapsed = Math.floor(hoursElapsed / 24);

  let timeElapsed;
  if (secondsElapsed < 60) {
    timeElapsed = `${secondsElapsed}s`;
  } else if (minutesElapsed < 60) {
    timeElapsed = `${minutesElapsed}m`;
  } else if (hoursElapsed < 24) {
    timeElapsed = `${hoursElapsed}h`;
  } else {
    timeElapsed = `${daysElapsed}j`;
  }

  console.log("Temps écoulé depuis la création du post:", timeElapsed);

  console.log(timeDiff);

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
    <Card className=" w-[520px] pb-[12px] pt-[12px] shadow-none border-x-0 border-y rounded-none grid grid-cols-[50px,1fr]">
      <div className="flex flex-row">
        <div className="flex justify-center">
          <Image
            className="object-cover rounded-full"
            width={36}
            height={36}
            src={session.user.image}
            alt=""
          ></Image>
        </div>
      </div>

      <div className="flex justify-between">
        {" "}
        <div>
          <span className="font-bold">{session.user.name}</span>
          <span> {timeElapsed}</span>
        </div>
        {authorId === userId && (
          <DropdownMenu>
            <div className=" flex">
              <DropdownMenuTrigger>
                <svg
                  className="w-[20px]"
                  aria-label="Plus"
                  role="img"
                  viewBox="0 0 24 24"
                >
                  <title>Plus</title>
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDelete()}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="col-start-2">
        {caption}
        {image && image.length > 0 ? (
          <Image src={image[0].url} alt="" width={500} height={200} />
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
                images={comment.images}
              />
            );
          }
          return null; // Renvoie null si le commentaire n'appartient pas au post
        })}
        <Link href={`/post/${id}`}>Voir le post</Link>
      </div>
    </Card>
  );
}
