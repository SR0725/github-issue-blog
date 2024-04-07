import { Issue } from "@/models/issue";
import { Session } from "next-auth";
import useOctokit from "./useOctokit";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Octokit } from "@octokit/core";

const BATCH_SIZE = 10;

interface IssueInfiniteQueryData {
  data: Issue[];
  headers: {
    link: string;
  };
}

async function fetchGetIssues(
  octokit: Octokit,
  pageParam: unknown,
): Promise<IssueInfiniteQueryData> {
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME;
  const owner = process.env.NEXT_PUBLIC_REPO_OWNER;

  if (!repoName || !owner) {
    throw new Error("Missing environment variables");
  }

  const response = await octokit.request(
    `GET /repos/${owner}/${repoName}/issues`,
    {
      sort: "created",
      direction: "desc",
      per_page: BATCH_SIZE,
      page: pageParam,
      state: "open",
    },
  );
  return {
    data: response.data as Issue[],
    headers: response.headers as { link: string },
  };
}

function useIssueList(session?: Session | null) {
  const octokit = useOctokit(session);

  const infiniteQuery = useInfiniteQuery<IssueInfiniteQueryData>({
    queryKey: ["issues"],
    queryFn: ({ pageParam = 0 }) => fetchGetIssues(octokit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const linkHeader = lastPage.headers?.link;
      if (linkHeader) {
        const match = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
        if (match) {
          const url = new URL(match[1]);
          const nextPageParam = url.searchParams.get("page");
          return nextPageParam ? Number(nextPageParam) : undefined;
        }
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  return infiniteQuery;
}

export default useIssueList;
