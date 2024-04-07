import { Issue } from "@/models/issue";
import { Session } from "next-auth";
import useOctokit from "./useOctokit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Octokit } from "@octokit/core";

interface ContentData {
  title?: string;
  body?: string;
  state?: "open" | "closed";
}

async function fetchPostIssue(
  octokit: Octokit,
  newContent: ContentData,
): Promise<Issue> {
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME;
  const owner = process.env.NEXT_PUBLIC_REPO_OWNER;

  if (!repoName || !owner) {
    throw new Error("Missing environment variables");
  }

  console.log(newContent);

  try {
    const response = await octokit.request(
      `POST /repos/${owner}/${repoName}/issues`,
      {
        owner,
        repo: repoName,
        ...newContent,
      },
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create issue");
  }
}

function useCreateIssue(session: Session) {
  const octokit = useOctokit(session);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newContent: ContentData) =>
      fetchPostIssue(octokit, newContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });

  return mutation;
}

export default useCreateIssue;
