import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const options: AuthOptions = {
  providers: [
    GitHubProvider({
      name: "API_Blog",
      clientId: process.env.GITHUB_Client_ID!,
      clientSecret: process.env.GITHUB_Client_SECRET!,
      authorization: {
        params: {
          scope: "read:user public_repo",
        },
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const owner = process.env.NEXT_PUBLIC_REPO_OWNER;
      if (profile?.login !== owner) {
        return false;
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token = {
          ...token,
          access_token: account.access_token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.access_token = token.access_token as string;
        session.user = {
          id: token.sub as string,
          name: token.name as string,
          email: token.email as string,
          image: token.picture as string,
        };
      }
      return session;
    },
  },
};
