import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authOption } from "./authOptions";

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
