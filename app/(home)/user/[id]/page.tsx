import { getAuthSession } from "@/src/lib/auth";
import { SessionType } from "@/src/types/types";
import Image from "next/image";
import { redirect } from "next/navigation";

export async function getData(e) {
  const data = await fetch(`http://localhost:3000/api/users/findUser?id=${e}`, {
    cache: "no-store",
  });

  return await data.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = await getData(id);

  if (!user) {
    // Si post est null ou undefined, afficher un message d'attente ou une redirection
    redirect("/");
  }

  const session = (await getAuthSession()) as SessionType;

  return (
    <div>
      <Image
        className=" rounded-lg"
        src={user.image}
        alt=""
        width={200}
        height={200}
      />

      <div>{user.name}</div>
      <div>{user.authorId}</div>
      <div>{id}</div>
    </div>
  );
}
