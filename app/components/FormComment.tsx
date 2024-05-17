import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadFile } from "../upload/upload.action";

export default function FormComment({ postId, userId }) {
  const [comment, setComment] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const file = formData.get("file") as File;

    let url = "";
    if (file.name !== "") {
      url = await uploadFile(formData);
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
      }),
    }).then(() => {
      setComment("");
      console.log("OOOOOOOOOK");
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
        <input id="image" type="file" name="file" />
        <button>ok</button>
      </form>
    </div>
  );
}
