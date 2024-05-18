import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { uploadFile } from "../upload/upload.action";

type FormCommentProps = {
  postId: string;
  userId: string | undefined;
};

export default function FormComment({ postId, userId }: FormCommentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [comment, setComment] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formDataComment = new FormData(e.currentTarget);

    const file = formDataComment.get("file") as File;

    let url = "";
    if (file.name !== "") {
      url = await uploadFile(formDataComment);
      console.log("url :" + url);
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
        images: url !== "" ? url : undefined,
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
      <form onSubmit={handleSubmit} action="">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className=" border-slate-400 border-solid border"
          type="text"
        />
        <input id="image" type="file" name="file" ref={fileInputRef} />
        <button>ok</button>
      </form>
    </div>
  );
}
