import Post from "@/app/components/Post";
import { PostType } from "@/src/types/types";
import Link from "next/link";
export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetch(
    `http://localhost:3000/api/posts/findPost?id=${params.id}`
  );
  const post: PostType = await data.json();

  console.log(data);
  console.log(post);

  return (
    <div>
      <Link href="/">Home</Link>
      <Post
        title={post.title}
        caption={post.caption}
        id={post.id}
        image={post.images}
      />
    </div>
  );
}
