import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Session } from "next-auth/src/core/types";
import client from "@/libs/server/client";

interface sessionId extends Session {
  id?: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      (session as sessionId).id = user.id;
      return Promise.resolve(session);
    },
  },
};
export default NextAuth(authOptions);
