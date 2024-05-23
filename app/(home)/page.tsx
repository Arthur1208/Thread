import { getAuthSession } from "@/src/lib/auth";
import { SessionType } from "@/src/types/types";
import PostContainer from "../components/postContainer";

export default async function page() {
  const session = (await getAuthSession()) as SessionType;

  const data = await getData();
  if (!session) {
  }
  if (session) {
  }

  //console.log(data);
  return <PostContainer session={session} data={data} />;
}

async function getData() {
  const data = await fetch("http://localhost:3000/api/posts/findList", {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!data.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return data.json();
}
