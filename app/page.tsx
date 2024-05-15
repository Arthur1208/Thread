import LoggoutButton from "@/src/auth/LoggoutButton";
import { getAuthSession } from "@/src/lib/auth";
import { Post } from "@/src/types/types";
import { redirect } from "next/navigation";
import FormPost from "./components/FormPost";

export default async function page(props) {
  const session = await getAuthSession();
  const data = await getData();
  if (!session) {
    redirect("/auth/signIn");
    console.log("test");
  }
  if (session) {
    console.log("non");
  }
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
      {data.map((post: Post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

async function getData() {
  const data = await fetch("http://localhost:3000/api/posts/find");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!data.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return data.json();
}
