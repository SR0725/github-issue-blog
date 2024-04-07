"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface GithubAuthSessionProviderProps {
  children: React.ReactNode;
  session: Session;
}

function GithubAuthSessionProvider({
  children,
  session,
}: GithubAuthSessionProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default GithubAuthSessionProvider;
