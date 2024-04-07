"use client";

import { MdOutlineMoreVert } from "react-icons/md";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CommentIcon from "../icon/comment";
import { Avatar, Button } from "@/components/nextui";
import { Issue } from "@/models/issue";
import BlogOperatorDropdown from "./blog-operator-dropdown";

interface BlogListItemProps {
  issue: Issue;
  session: Session | null;
}

function BlogListItemHeader({ issue, session }: BlogListItemProps) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        gridArea: "header",
      }}
    >
      <div
        className="flex items-center gap-2 text-xs text-gray-500"
        style={{
          gridArea: "header",
        }}
      >
        <Avatar src={issue.user.avatar_url} className="h-4 w-4 text-tiny" />
        <span className=" relative text-gray-500 after:absolute after:left-1/2 after:top-1/2 after:ml-4 after:h-[2px] after:w-[2px] after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:content-['']">
          文章
        </span>
        <span>{issue.user.login}</span>
      </div>

      {session && (
        <BlogOperatorDropdown session={session} issue={issue}>
          <Button isIconOnly variant="light" size="sm" aria-label="More">
            <MdOutlineMoreVert />
          </Button>
        </BlogOperatorDropdown>
      )}
    </div>
  );
}

function BlogListItemTitle({ issue }: BlogListItemProps) {
  return (
    <h2
      className="text-base font-bold text-gray-900"
      style={{
        gridArea: "title",
      }}
    >
      <Link href={`/blog/${issue.number}`}>
        <span>{issue.title}</span>
      </Link>
    </h2>
  );
}

function BlogListItemContent({ issue }: BlogListItemProps) {
  return (
    <div
      className="overflow-hidden"
      style={{
        gridArea: "main",
      }}
    >
      <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500">
        {issue.body?.slice(0, 100)}
      </p>
    </div>
  );
}

function BlogListItemFooter({ issue }: BlogListItemProps) {
  return (
    <div
      className="flex h-fit items-center justify-between"
      style={{
        gridArea: "footer",
      }}
    >
      <div>
        <div className="flex gap-1">
          <CommentIcon />
          <span className="text-xs text-gray-500">{issue.comments}</span>
        </div>
      </div>
    </div>
  );
}

function BlogListItem(props: BlogListItemProps) {
  const { issue } = props;
  const router = useRouter();

  const gridTemplateAreas = `
    "header header"
    ". ."
    "title thumb"
    ". thumb"
    "main thumb"
    ". thumb"
    "footer thumb"
  `;

  return (
    <article
      className="grid h-40 w-full max-w-[600px] cursor-pointer border-b border-gray-100 py-5"
      style={{
        gridTemplateRows: "auto 12px auto 4px auto 14px auto",
        gridTemplateColumns: "1fr auto",
        gridTemplateAreas: gridTemplateAreas,
      }}
      onClick={() => router.push(`/blog/${issue.number}`)}
    >
      <BlogListItemHeader {...props} />
      <BlogListItemTitle {...props} />
      <BlogListItemContent {...props} />
      <BlogListItemFooter {...props} />
    </article>
  );
}

export default BlogListItem;
