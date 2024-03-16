import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { db } from "@/app/_lib/prisma";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user = { ...session.user, id: user.id, token } as {
        id: string;
        name: string;
        email: string;
        token: JWT;
      };
      return session;
    },
  },
  secret:process.env.NEXTAUTH_SECRET
};