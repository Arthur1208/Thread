import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageType, LikeType, SessionType } from "@/src/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormComment from "./FormComment";
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
  childComments,
  postId,
  onCommentClick,
  showChildren,
  selectedCommentId,
}: CommentProps) {
  const [selectedCommentChildId, setSelectedCommentChildId] = useState(null);
  const userId = session.user.id;
  const router = useRouter();

  const onCommentChildClick = (commentId) => {
    setSelectedCommentChildId(commentId);
    console.log("lol");
  };

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
    <div onClick={() => onCommentClick(id)}>
      <Card className="w-[350px] border-x-0 border-t-0  border-b shadow-none border-[#e5e7eb] rounded-none w-full">
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

          <div className="flex items-center">
            <Dialog>
              <DialogTrigger>
                <svg
                  aria-label="Répondre"
                  role="img"
                  viewBox="0 0 18 18"
                  width="20"
                  height="20"
                  className="stroke-slate-600 fill-none stroke-1"
                >
                  <title>Répondre</title>
                  <path
                    d="M15.376 13.2177L16.2861 16.7955L12.7106 15.8848C12.6781 15.8848 12.6131 15.8848 12.5806 15.8848C11.3779 16.5678 9.94767 16.8931 8.41995 16.7955C4.94194 16.5353 2.08152 13.7381 1.72397 10.2578C1.2689 5.63919 5.13697 1.76863 9.75264 2.22399C13.2307 2.58177 16.0261 5.41151 16.2861 8.92429C16.4161 10.453 16.0586 11.8841 15.376 13.0876C15.376 13.1526 15.376 13.1852 15.376 13.2177Z"
                    stroke-linejoin="round"
                    stroke-width="1.25"
                  ></path>
                </svg>
              </DialogTrigger>

              <DialogContent>
                <div className="grid grid-cols-[50px,1fr]">
                  <div className="flex flex-col items-center">
                    <div className="flex ">
                      <Image
                        className="object-cover rounded-full w-[36px] h-[36px]"
                        width={36}
                        height={36}
                        src={session.user.image}
                        alt=""
                      ></Image>
                    </div>
                    <div className="col-start-1 flex justify-center items-center h-[full]">
                      <div className="w-[2px] h-[95%] bg-[#e5e5e5]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      {" "}
                      <div>
                        <span className="font-semibold text-[15px]">
                          {session.user.name}
                        </span>
                        <span className=" text-slate-500 font-light text-[15px]">
                          {" "}
                          {0}
                        </span>
                      </div>
                    </div>

                    <div className="col-start-2">
                      <DialogHeader>{comment}</DialogHeader>
                    </div>
                  </div>
                </div>
                <div>
                  {" "}
                  <FormComment
                    postId={postId}
                    userId={userId}
                    CommentId={id}
                    session={session}
                    captionPost={comment}
                    timeElapsed={0}
                  />
                </div>
              </DialogContent>
            </Dialog>
            <span className="pl-[7px] text-slate-6  00">
              {childComments ? childComments.length : 0}
            </span>
          </div>
        </CardFooter>
      </Card>
      {childComments && showChildren && childComments.length > 0 && (
        <div className="child-comments pl-10">
          {childComments.map((childComment) => (
            <Comment
              key={childComment.id}
              authorId={childComment.authorId}
              userName={session.user.name}
              comment={childComment.caption}
              likeCount={childComment.likeCount}
              likes={childComment.likes}
              id={childComment.id}
              session={session}
              images={childComment.images}
              childComments={childComment.childComments}
              postId={childComment.postId}
              onCommentClick={onCommentChildClick}
              showChildren={selectedCommentChildId === childComment.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
