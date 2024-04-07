import { MdModeEdit } from "react-icons/md";
import { Session } from "next-auth";
import { Avatar, Button } from "@/components/nextui";
import { Issue } from "@/models/issue";
import BlogOperatorDropdown from "./blog-operator-dropdown";

interface BlogProps {
  session: Session | null;
  issue: Issue;
  htmlContent: string;
}

const BlogHeader = ({ session, issue }: BlogProps) => (
  <div className="flex items-center justify-between">
    <h1 className="mb-2 pt-4 text-3xl">{issue.title}</h1>
    {session && (
      <BlogOperatorDropdown session={session} issue={issue}>
        <Button isIconOnly variant="light" size="md" aria-label="Edit">
          <MdModeEdit />
        </Button>
      </BlogOperatorDropdown>
    )}
  </div>
);

const BlogMeta = ({ issue }: BlogProps) => (
  <div className="mb-5 flex items-center justify-start gap-2 text-xs text-gray-500">
    <Avatar src={issue.user.avatar_url} className="h-4 w-4 text-tiny" />
    <span className="relative after:absolute after:left-1/2 after:top-1/2 after:ml-4 after:h-[2px] after:w-[2px] after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-gray-500 after:content-['']">
      文章
    </span>
    <span>{issue.user.login}</span>
  </div>
);

const BlogContent = ({ htmlContent }: BlogProps) => (
  <div>
    <div
      className="markdown-body overflow-hidden overflow-ellipsis text-xs text-gray-500"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  </div>
);

function Blog(props: BlogProps) {
  return (
    <article className="h-fit w-full">
      <BlogHeader {...props} />
      <BlogMeta {...props} />
      <BlogContent {...props} />
    </article>
  );
}

export default Blog;
