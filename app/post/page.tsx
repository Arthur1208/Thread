"use client";
import { SessionProvider } from "next-auth/react";
import FormPost from "../components/FormPost";
export default function page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SessionProvider>
        <FormPost />
      </SessionProvider>
    </div>
  );
}
