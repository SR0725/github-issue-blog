import { Session } from "next-auth";
import { Octokit } from "@octokit/core";

let octokit: Octokit | null = null;

export function createSingletonOctokit(session?: Session | null) {
  return new Octokit({
    auth: session?.access_token,
    headers: {
      "cache-control": "no-cache",
    },
  });
}

function useOctokit(session?: Session | null) {
  if (!octokit) {
    octokit = createSingletonOctokit(session);
  }

  return octokit;
}

export default useOctokit;
