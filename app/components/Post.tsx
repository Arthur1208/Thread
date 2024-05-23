"use client";
import { Card } from "@/components/ui/card";
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
import {
  AuthorType,
  CommentType,
  ImageType,
  LikeType,
  SessionType,
} from "@/src/types/types";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import CommentList from "./CommentList";
import FormComment from "./FormComment";
import Like from "./Like";

interface PostProps {
  caption: string;
  id: string;
  image: ImageType[];
  likeCount: number;
  likes: LikeType[];
  session: SessionType;
  comments: CommentType[];
  authorId: string;
  createdAt: Date;
  author: AuthorType; // Ajoutez une annotation de type pour l'objet image
}

export default function Post({
  caption,
  image,
  id,
  likeCount,
  session,
  likes,
  comments,
  authorId,
  createdAt,
  author,
  isPage,
}: PostProps) {
  if (!session) {
    redirect("/auth/signIn");
  }

  const router = useRouter();
  const userId = session.user.id;

  const createdAtDate = new Date(createdAt);

  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - createdAtDate.getTime();

  const secondsElapsed = Math.floor(timeDiff / 1000);
  const minutesElapsed = Math.floor(secondsElapsed / 60);
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  const daysElapsed = Math.floor(hoursElapsed / 24);

  let timeElapsed;
  if (secondsElapsed < 60) {
    timeElapsed = `${secondsElapsed} s`;
  } else if (minutesElapsed < 60) {
    timeElapsed = `${minutesElapsed} m`;
  } else if (hoursElapsed < 24) {
    timeElapsed = `${hoursElapsed} h`;
  } else {
    timeElapsed = `${daysElapsed} j`;
  }

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // Vérifiez si le clic provient d'un bouton ou d'une image
    if (
      target.closest("button") ||
      target.closest("svg") ||
      target.closest("img") ||
      target.closest("a") ||
      target.closest("data-[state=open]") ||
      document.querySelector(".ladivla")
    ) {
      return;
    }

    // Redirige vers la page du post
    router.push(`/post/${id}`);
  };

  async function handleDelete() {
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
    <div>
      <Card
        onClick={handleCardClick}
        className=" w-[520px] pb-[12px] pt-[12px] shadow-none border-x-0 border-t-0  border-b rounded-none grid grid-cols-[50px,1fr]"
      >
        <div className="flex flex-row justify-center">
          <div className="flex justify-center">
            <Link href={"/user/" + authorId}>
              <Image
                className="object-cover rounded-full w-[36px] h-[36px]"
                width={36}
                height={36}
                src={author.image}
                alt=""
              ></Image>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            {" "}
            <div>
              <Link href={"/user/" + authorId}>
                {author && (
                  <span className="font-semibold text-[15px]">
                    {author.name}
                  </span>
                )}
              </Link>
              <span className=" text-slate-500 font-light text-[15px]">
                {" "}
                {timeElapsed}
              </span>
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
            <Dialog>
              <DialogTrigger asChild>
                {image && image.length > 0 ? (
                  <Image
                    className=" rounded-lg"
                    src={image[0].url}
                    alt=""
                    width={200}
                    height={200}
                  />
                ) : (
                  <p></p>
                )}
              </DialogTrigger>
              <DialogContent className="max-w-none h-fit w-fit bg-transparent border-none shadow-none">
                {image && image.length > 0 ? (
                  <img className=" rounded-lg" src={image[0].url} alt="" />
                ) : (
                  <p></p>
                )}
              </DialogContent>
            </Dialog>
            <div className="flex space-x-5 items-center">
              <div className="flex">
                <Like likes={likes} id={id} session={session} type="posts" />{" "}
                <span className=" text-slate-600">
                  {likeCount > 0 ? likeCount : 0}
                </span>
              </div>
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
                              {timeElapsed}
                            </span>
                          </div>
                        </div>

                        <div className="col-start-2">
                          <DialogHeader>
                            {caption}
                            {image && image.length > 0 ? (
                              <Image
                                className=" rounded-lg"
                                src={image[0].url}
                                alt=""
                                width={500}
                                height={200}
                              />
                            ) : (
                              <p></p>
                            )}
                          </DialogHeader>
                        </div>
                      </div>
                    </div>
                    <div>
                      {" "}
                      <FormComment
                        postId={id}
                        userId={userId}
                        session={session}
                        imagePost={image}
                        captionPost={caption}
                        timeElapsed={timeElapsed}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                <span className="pl-[7px] text-slate-6  00">
                  {comments.length}
                </span>
              </div>

              <div className="">
                <Dialog>
                  <DialogTrigger>
                    <svg
                      aria-label="Republier"
                      role="img"
                      viewBox="0 0 18 18"
                      className="stroke-none fill-slate-600 stroke-1 w-5"
                    >
                      <title>Republier</title>
                      <path d="M6.41256 1.23531C6.6349 0.971277 7.02918 0.937481 7.29321 1.15982L9.96509 3.40982C10.1022 3.52528 10.1831 3.69404 10.1873 3.87324C10.1915 4.05243 10.1186 4.2248 9.98706 4.34656L7.31518 6.81971C7.06186 7.05419 6.66643 7.03892 6.43196 6.7856C6.19748 6.53228 6.21275 6.13685 6.46607 5.90237L7.9672 4.51289H5.20312C3.68434 4.51289 2.45312 5.74411 2.45312 7.26289V9.51289V11.7629C2.45312 13.2817 3.68434 14.5129 5.20312 14.5129C5.5483 14.5129 5.82812 14.7927 5.82812 15.1379C5.82812 15.4831 5.5483 15.7629 5.20312 15.7629C2.99399 15.7629 1.20312 13.972 1.20312 11.7629V9.51289V7.26289C1.20312 5.05375 2.99399 3.26289 5.20312 3.26289H7.85002L6.48804 2.11596C6.22401 1.89362 6.19021 1.49934 6.41256 1.23531Z"></path>
                      <path d="M11.5874 17.7904C11.3651 18.0545 10.9708 18.0883 10.7068 17.8659L8.03491 15.6159C7.89781 15.5005 7.81687 15.3317 7.81267 15.1525C7.80847 14.9733 7.8814 14.801 8.01294 14.6792L10.6848 12.206C10.9381 11.9716 11.3336 11.9868 11.568 12.2402C11.8025 12.4935 11.7872 12.8889 11.5339 13.1234L10.0328 14.5129H12.7969C14.3157 14.5129 15.5469 13.2816 15.5469 11.7629V9.51286V7.26286C15.5469 5.74408 14.3157 4.51286 12.7969 4.51286C12.4517 4.51286 12.1719 4.23304 12.1719 3.88786C12.1719 3.54269 12.4517 3.26286 12.7969 3.26286C15.006 3.26286 16.7969 5.05373 16.7969 7.26286V9.51286V11.7629C16.7969 13.972 15.006 15.7629 12.7969 15.7629H10.15L11.512 16.9098C11.776 17.1321 11.8098 17.5264 11.5874 17.7904Z"></path>
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
                              {timeElapsed}
                            </span>
                          </div>
                        </div>

                        <div className="col-start-2">
                          <DialogHeader>
                            {caption}
                            {image && image.length > 0 ? (
                              <Image
                                className=" rounded-lg"
                                src={image[0].url}
                                alt=""
                                width={500}
                                height={200}
                              />
                            ) : (
                              <p></p>
                            )}
                          </DialogHeader>
                        </div>
                      </div>
                    </div>
                    <div>
                      {" "}
                      <FormComment
                        postId={id}
                        userId={userId}
                        session={session}
                        imagePost={image}
                        captionPost={caption}
                        timeElapsed={timeElapsed}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {
        isPage && <CommentList comments={comments} session={session} /> // Renvoie null si le commentaire n'appartient pas au post
      }
    </div>
  );
}
