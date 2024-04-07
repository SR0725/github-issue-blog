import { Metadata } from "next";
import { getServerSession } from "next-auth";
import "github-markdown-css/github-markdown-light.css";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Blog from "@/components/blog/blog";
import BlogCommentList from "@/components/blog/blog-comment-list";
import { createSingletonOctokit } from "@/hooks/useOctokit";
import { fetchGetIssue } from "@/hooks/useQueryIssue";
import transformMdToHtml from "@/utils/transform-md-to-html";

export const metadata: Metadata = {};

const Page = async ({ params }: { params: { issueNumber: string } }) => {
  const session = await getServerSession(options);
  const octokit = createSingletonOctokit(session);
  const issue = await fetchGetIssue(octokit, Number(params.issueNumber));
  const htmlContent = await transformMdToHtml(issue.body);
  const description = issue.body?.slice(0, 150) + "...";

  metadata.title = issue.title;
  metadata.description = description;

  metadata.openGraph = {
    type: "article",
    title: issue.title,
    description,
    url: issue.html_url,
  };

  return (
    <div className="min-h-screen bg-dark-blue pt-4">
      <div className="mx-auto min-h-screen w-full max-w-[720px] rounded bg-white px-[60px] text-black">
        <Blog issue={issue} session={session} htmlContent={htmlContent} />
        <div className="border-b border-solid border-black border-opacity-5 pb-1 pt-10 text-base font-normal leading-6 text-black text-opacity-50">
          共 {issue.comments} 則留言
        </div>
        <BlogCommentList issue={issue} session={session} />
      </div>
    </div>
  );
};

export default Page;
