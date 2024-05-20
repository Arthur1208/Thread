import { Input } from "@/components/ui/input";
import { ImageType } from "@/src/types/types";
import { useUploadThing } from "@/utils/uploadthing";
import { Session } from "@prisma/client";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
type FormCommentProps = {
  postId: string;
  userId: string | undefined;
  imagePost: ImageType[];
  captionPost: string;
  session: Session;
};
export default function FormComment({
  postId,
  userId,
  imagesPost,
  captionPost,
  session,
  timeElapsed,
}: FormCommentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [comment, setComment] = useState("");
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
    e.preventDefault();

    const formDataComment = new FormData(e.currentTarget);

    const file = formDataComment.get("file") as File;

    if (file.name !== "") {
      await startUpload([file]);
      console.log("uploadedImageUrl = " + uploadedImageUrl);
    }

    await fetch("http://localhost:3000/api/comments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
        comment: comment,
        images: file.name !== "" ? uploadedImageUrl : undefined,
      }),
    }).then(() => {
      setComment("");
      console.log("OOOOOOOOOK");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      router.refresh();
    });
  }
  return (
    <div>
      <div className="grid grid-cols-[50px,1fr]">
        <div className="flex flex-row justify-center">
          <div className="flex justify-center">
            <Image
              className="object-cover rounded-full w-[36px] h-[36px]"
              width={36}
              height={36}
              src={session.user.image}
              alt=""
            ></Image>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            {" "}
            <div>
              <span className="font-semibold text-[15px]">
                {session.user.name}
              </span>
              <span className=" text-slate-500 font-light text-[15px]"> </span>
            </div>
          </div>
          <form className="col-start-2" onSubmit={handleSubmit} action="">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className=" border-none text-[15px] w-full font-light active:border-none focus:border-none focus:outline-none active:outline-none"
              placeholder="Répondre à ..."
            />
            <Input id="image" type="file" name="file" ref={fileInputRef} />

            <button>
              <DialogClose>Button</DialogClose>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
