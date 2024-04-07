import Blog from "@/components/blog/blog";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { fetchGetIssue } from "@/hooks/useQueryIssue";
import { createSingletonOctokit } from "@/hooks/useOctokit";
import { remark } from "remark";
import html from "remark-html";
import BlogCommentList from "@/components/blog/blog-comment-list";
import "github-markdown-css/github-markdown-light.css";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";

export const metadata: Metadata = {};

const Page = async ({ params }: { params: { issueNumber: string } }) => {
  const session = await getServerSession(options);
  const octokit = createSingletonOctokit(session);
  const issue = await fetchGetIssue(octokit, Number(params.issueNumber));
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(issue.body);
  const htmlContent = processedContent.toString();

  metadata.title = issue.title;
  metadata.description = issue.body.slice(0, 150) + "...";

  metadata.openGraph = {
    type: "article",
    title: issue.title,
    description: issue.body.slice(0, 150) + "...",
    url: issue.html_url,
  };

  return (
    <div className="min-h-screen bg-[#00324E] pt-4">
      <div className="mx-auto min-h-screen w-full max-w-[720px] rounded bg-white px-[60px] text-black">
        <Blog issue={issue} session={session} htmlContent={htmlContent} />
        <div className="border-b border-solid border-[rgba(0,0,0,0.05)] pb-1 pt-10 text-base font-normal leading-6 text-[rgba(0,0,0,0.5)]">
          共 {issue.comments} 則留言
        </div>
        <BlogCommentList issue={issue} session={session} />
      </div>
    </div>
  );
};

export default Page;
