import { Comment } from "@/models/comment";
import { Session } from "next-auth";
import useOctokit from "./useOctokit";
import { useQuery } from "@tanstack/react-query";
import { Octokit } from "@octokit/core";

export async function fetchGetIssueCommentList(
  octokit: Octokit,
  issueNumber: number,
): Promise<Comment[]> {
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME;
  const owner = process.env.NEXT_PUBLIC_REPO_OWNER;

  if (!repoName || !owner) {
    throw new Error("Missing environment variables");
  }

  const response = await octokit.request(
    `GET /repos/${owner}/${repoName}/issues/${issueNumber}/comments`,
    {
      owner,
      repo: repoName,
      issue_number: issueNumber,
    },
  );
  return response.data;
}

function useQueryIssueCommentList(
  issueNumber: number,
  session?: Session | null,
) {
  const octokit = useOctokit(session);

  const query = useQuery<Comment[]>({
    queryKey: ["issue", issueNumber, "comments"],
    queryFn: () => fetchGetIssueCommentList(octokit, issueNumber),
  });

  return query;
}

export default useQueryIssueCommentList;
