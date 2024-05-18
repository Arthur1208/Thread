import Post from "@/app/components/Post";
import { getAuthSession } from "@/src/lib/auth";
import { PostType, SessionType } from "@/src/types/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function getData(e) {
  const data = await fetch(`http://localhost:3000/api/posts/findPost?id=${e}`, {
    cache: "no-store",
  });

  return await data.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const post: PostType = await getData(id);

  if (!post) {
    // Si post est null ou undefined, afficher un message d'attente ou une redirection
    redirect("/");
  }

  const session = (await getAuthSession()) as SessionType;

  return (
    <div>
      <Link href="/">Home</Link>
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        image={post.images}
        caption={post.caption}
        likeCount={post.likeCount}
        likes={post.likes}
        comments={post.comments}
        session={session}
        authorId={post.authorId}
      />
    </div>
  );
}
