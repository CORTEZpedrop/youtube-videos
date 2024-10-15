// import NextAuth, { type NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { authOption } from "./authOptions";

// const handler = NextAuth(authOption);

// export { handler as GET, handler as POST };

export async function GET(request: Request) {
  return new Response("Hello, Next.js!", {
    status: 200,
  });
}
