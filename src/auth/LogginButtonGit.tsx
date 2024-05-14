"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
export default function LogginButtonGit() {
  return (
    <Button onClick={async () => await signIn("github")} className="w-full">
      <div>Connectez-vous avec GitHub</div>
    </Button>
  );
}
