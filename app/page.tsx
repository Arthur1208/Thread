import { authConfig } from "@/pages/api/auth/[...nextauth]";
import LoggoutButton from "@/src/auth/LoggoutButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function page() {
  const session = await getServerSession(authConfig);

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
    </div>
  );
}
