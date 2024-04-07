import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
    access_token: string;
  }

  interface JWT {
    access_token: string;
  }
}
