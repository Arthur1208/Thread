import { getAuthSession } from "@/src/lib/auth";
import { PostType, SessionType } from "@/src/types/types";
import { redirect } from "next/navigation";
import Post from "./components/Post";

export default async function page() {
  const session = (await getAuthSession()) as SessionType;

  const data = await getData();
  console.log(data);
  if (!session) {
    redirect("/auth/signIn");
  }
  if (session) {
  }
  console.log(session);
  return (
    <div className=" w-screen flex items-center flex-col">
      {data.map((post: PostType) => (
        <Post
          key={post.id}
          id={post.id}
          image={post.images}
          caption={post.caption}
          likeCount={post.likeCount}
          likes={post.likes}
          comments={post.comments}
          session={session}
          authorId={post.authorId}
          createdAt={post.dateTime}
        />
      ))}
    </div>
  );
}

async function getData() {
  const data = await fetch("http://localhost:3000/api/posts/findList");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!data.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return data.json();
}
