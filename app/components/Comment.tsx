import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageType, LikeType, SessionType } from "@/src/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Like from "./Like";

interface CommentProps {
  userName: string;
  likeCount: number;
  likes: LikeType[];
  authorId: string;
  comment: string;
  id: string;
  session: SessionType;
  images: ImageType[]; // Ajoutez une annotation de type pour l'objet image
}

export default function Comment({
  authorId,
  userName,
  comment,
  likeCount,
  likes,
  id,
  session,
  images,
}: CommentProps) {
  const userId = session.user.id;
  const router = useRouter();

  async function handleDelete() {
    console.log("click");
    console.log(id);

    await fetch("http://localhost:3000/api/comments/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId: id }),
    }).then(() => {
      router.refresh();
    });
  }
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <p>{userName}</p>
        </CardHeader>
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
        <CardContent>
          {comment}
          {images
            ? images.map((image) => (
                <Image
                  key={image.id}
                  alt={image.url}
                  width={100}
                  height={100}
                  src={image.url}
                ></Image>
              ))
            : null}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Like id={id} session={session} likes={likes} type="comments" />
          <p>{likeCount > 0 ? likeCount : 0}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
