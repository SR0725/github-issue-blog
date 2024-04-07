import { Issue } from "@/models/issue";
import { Avatar, Button } from "@/components/nextui";
import { Session } from "next-auth";
import { MdModeEdit } from "react-icons/md";
import BlogOperatorDropdown from "./blog-operator-dropdown";

function Blog({
  session,
  issue,
  htmlContent,
}: {
  session: Session | null;
  issue: Issue;
  htmlContent: string;
}) {
  return (
    <article className="h-fit w-full">
      <div className="flex items-center justify-between">
        <h1 className="mb-2 pt-4 text-3xl">{issue.title}</h1>
        {Number(session?.user?.id) === issue.user.id && session ? (
          <BlogOperatorDropdown session={session} issue={issue}>
            <Button isIconOnly variant="light" size="md" aria-label="Edit">
              <MdModeEdit />
            </Button>
          </BlogOperatorDropdown>
        ) : null}
      </div>

      <div className="mb-5 flex items-center justify-start gap-2 text-xs text-[#7F7F7F]">
        <Avatar src={issue.user.avatar_url} className="h-4 w-4 text-tiny" />
        <span className=" relative after:absolute after:left-1/2 after:top-1/2 after:ml-4 after:h-[2px] after:w-[2px] after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#7F7F7F] after:content-['']">
          文章
        </span>
        <span>{issue.user.login}</span>
      </div>

      <div>
        <div
          className="markdown-body overflow-hidden overflow-ellipsis text-xs text-[#7F7F7F]"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </article>
  );
}

export default Blog;
