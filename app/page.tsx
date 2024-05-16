import LoggoutButton from "@/src/auth/LoggoutButton";
import { getAuthSession } from "@/src/lib/auth";
import { PostType, SessionType } from "@/src/types/types";
import { redirect } from "next/navigation";
import FormPost from "./components/FormPost";
import Post from "./components/Post";

export default async function page() {
  const session = (await getAuthSession()) as SessionType;

  const data = await getData();
  console.log(data);
  if (!session) {
    redirect("/auth/signIn");
    console.log("test");
  }
  if (session) {
    console.log("non");
  }
  console.log(session);
  return (
    <div>
      <div>Bienvenue vous êtes connecter</div>

      {session ? (
        <div>
          <h2>{session.user?.name}</h2>
          <i>{session.user?.email}</i>
        </div>
      ) : null}
      <LoggoutButton />
      <FormPost session={session} />
      {data.map((post: PostType) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          image={post.images}
          caption={post.caption}
          likeCount={post.likeCount}
          likes={post.likes}
          session={session}
          
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
