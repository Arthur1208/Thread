import { useEffect } from "react";

export default function CardContainer() {
  async function loadPosts() {
    const posts = await fetch("http://localhost:3000/api/posts/find");
    const data = await posts.json();
    console.log(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return <div>lol</div>;
}
