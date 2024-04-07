import { Session } from "next-auth";
import { Octokit } from "@octokit/core";
import { useQuery } from "@tanstack/react-query";
import { Issue } from "@/models/issue";
import useOctokit from "./useOctokit";

export async function fetchGetIssue(
  octokit: Octokit,
  issueNumber: number
): Promise<Issue> {
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME;
  const owner = process.env.NEXT_PUBLIC_REPO_OWNER;

  if (!repoName || !owner) {
    throw new Error("Missing environment variables");
  }

  const response = await octokit.request(
    `GET /repos/${owner}/${repoName}/issues/${issueNumber}`,
    {
      owner,
      repo: repoName,
      issue_number: issueNumber,
    }
  );
  return response.data;
}

function useQueryIssue(issueNumber: number, session?: Session | null) {
  const octokit = useOctokit(session);

  const query = useQuery<Issue>({
    queryKey: ["issue", issueNumber],
    queryFn: () => fetchGetIssue(octokit, issueNumber),
  });

  return query;
}

export default useQueryIssue;
