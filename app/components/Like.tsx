import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Like({ id, session, likes, type }) {
  const router = useRouter();
  const [isliked, setIsliked] = useState(() => {
    const userLiked = likes.find((like) => like.userId === session.user.id);
    return userLiked ? userLiked.liked : false;
  });

  async function handleLike() {
    const userId = session.user.id;

    try {
      if (!isliked) {
        await fetch(`http://localhost:3000/api/${type}/updateLike`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: id,
            userId: session.user.id,
            action: "add",
          }),
        }).then(() => {
          router.refresh();
        });
      } else if (isliked) {
        await fetch(`http://localhost:3000/api/${type}/updateLike`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: id,
            userId: session.user.id,
            action: "delete",
          }),
        }).then(() => {
          router.refresh();
        });
      }
    } catch {
    } finally {
      setIsliked(!isliked);
    }
  }

  return (
    <div>
      <svg onClick={() => handleLike()} width="20" height="20">
        <title>Je n’aime plus</title>
        <path
          className={
            isliked
              ? "stroke-none fill-red-500 stroke-1"
              : "stroke-slate-500 fill-none stroke-1"
          }
          d="M1.34375 7.03125L1.34375 7.04043C1.34374 7.54211 1.34372 8.26295 1.6611 9.15585C1.9795 10.0516 2.60026 11.0779 3.77681 12.2544C5.59273 14.0704 7.58105 15.5215 8.33387 16.0497C8.73525 16.3313 9.26573 16.3313 9.66705 16.0496C10.4197 15.5213 12.4074 14.0703 14.2232 12.2544C15.3997 11.0779 16.0205 10.0516 16.3389 9.15585C16.6563 8.26296 16.6563 7.54211 16.6562 7.04043V7.03125C16.6562 4.73466 15.0849 2.75 12.6562 2.75C11.5214 2.75 10.6433 3.28244 9.99228 3.95476C9.59009 4.37012 9.26356 4.8491 9 5.31533C8.73645 4.8491 8.40991 4.37012 8.00772 3.95476C7.35672 3.28244 6.47861 2.75 5.34375 2.75C2.9151 2.75 1.34375 4.73466 1.34375 7.03125Z"
        ></path>
      </svg>
    </div>
  );
}
