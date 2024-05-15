import prisma from "@/src/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;

if (!githubId || !githubSecret) {
  throw new Error("pas de github id ou secret");
}

export const authConfig = {
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = token.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (user) {
        session.user.id = user.id;
        token;
        user;
      }

      return session;
    },
  },

  adapter: PrismaAdapter(prisma) as Adapter,
} satisfies NextAuthOptions;

export default NextAuth(authConfig);
