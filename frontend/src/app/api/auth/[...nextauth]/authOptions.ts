import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function refreshAccessToken(token: { refreshToken: any }) {
  console.log("refrescando o token");
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      // @ts-ignore
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      id_token: refreshedTokens.id_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          iat: profile.iat,
          exp: profile.exp,
        };
      },
    }),
  ],
  jwt: {
    maxAge: 3599,
  },
  session: {
    maxAge: 8 * 60 * 60,
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        console.log("account", account);
        console.log("user", user);
        console.log("token", token);
        // @ts-ignore
        token.accessToken = account?.id_token;
        // @ts-ignore
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
        // @ts-ignore
        token.refreshToken = account?.refresh_token;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        // return token;
        console.log("old token", token);
        return token;
      } else {
        const newToken = await refreshAccessToken(token);
        if ("accessToken" in newToken) {
          token.accessToken = newToken?.id_token;
          token.accessTokenExpires = newToken?.accessTokenExpires;
          token.refreshToken = newToken?.refreshToken;
          console.log("newToken", newToken);
          return token;
        } else {
          token.error = newToken.error;
          return token;
        }
      }
    },
    async session({ session, token, user }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore
      session.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
