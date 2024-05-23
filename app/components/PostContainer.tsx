"use client";
import { PostType } from "@/src/types/types";

import Post from "./Post";
export default function PostContainer({ session, data }) {
  console.log("form container " + data);
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
          author={post.author}
          isPage={false}
        />
      ))}
    </div>
  );
}
