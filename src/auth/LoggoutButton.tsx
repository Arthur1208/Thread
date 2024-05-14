"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function LoggoutButton() {
  return <Button onClick={async () => await signOut()}>logout</Button>;
}
