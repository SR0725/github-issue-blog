"use client";
import { Issue } from "@/models/issue";
import { Avatar, Button } from "@/components/nextui";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineMoreVert } from "react-icons/md";
import BlogOperatorDropdown from "./blog-operator-dropdown";

function BlogListItem({
  issue,
  session,
}: {
  issue: Issue;
  session: Session | null;
}) {
  const router = useRouter();

  return (
    <article
      className="grid h-40 w-full max-w-[600px] cursor-pointer border-b border-[#E5E5E5] py-5"
      style={{
        gridTemplateRows: "auto 12px auto 4px auto 14px auto",
        gridTemplateColumns: "1fr auto",
        gridTemplateAreas: `
        "header header"
        ". ."
        "title thumb"
        ". thumb"
        "main thumb"
        ". thumb"
        "footer thumb"
        `,
      }}
      onClick={() => router.push(`/blog/${issue.number}`)}
    >
      <div
        className="flex items-center justify-between"
        style={{
          gridArea: "header",
        }}
      >
        <div
          className="flex items-center gap-2 text-xs text-[#7F7F7F]"
          style={{
            gridArea: "header",
          }}
        >
          <Avatar src={issue.user.avatar_url} className="h-4 w-4 text-tiny" />
          <span className=" relative after:absolute after:left-1/2 after:top-1/2 after:ml-4 after:h-[2px] after:w-[2px] after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#7F7F7F] after:content-['']">
            文章
          </span>
          <span>{issue.user.login}</span>
        </div>

        {Number(session?.user?.id) === issue.user.id && session ? (
          <BlogOperatorDropdown session={session} issue={issue}>
            <Button isIconOnly variant="light" size="sm" aria-label="More">
              <MdOutlineMoreVert />
            </Button>
          </BlogOperatorDropdown>
        ) : null}
      </div>
      <h2
        className="text-base font-bold text-[#262626]"
        style={{
          gridArea: "title",
        }}
      >
        <Link href={`/blog/${issue.number}`}>
          <span>{issue.title}</span>
        </Link>
      </h2>
      <div
        className="overflow-hidden"
        style={{
          gridArea: "main",
        }}
      >
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#7F7F7F]">
          {issue.body}
        </p>
      </div>
      <div
        className="flex h-fit items-center justify-between"
        style={{
          gridArea: "footer",
        }}
      >
        <div>
          <div className="flex gap-1">
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              role="img"
              aria-hidden="true"
              className="h-4 w-4 fill-[#3397cf] hover:fill-[#5ab0db]"
            >
              <path
                fillRule="evenodd"
                d="M1.333 12a10.667 10.667 0 1 0 21.334 0 10.667 10.667 0 1 0-21.334 0zM15.5 6.5h-7A3.5 3.5 0 0 0 5 10v3.5A3.5 3.5 0 0 0 8.5 17H9v1.369a.75.75 0 0 0 1.238.57L12.5 17h3a3.5 3.5 0 0 0 3.5-3.5V10a3.5 3.5 0 0 0-3.5-3.5Z"
              ></path>
            </svg>
            <span className="text-xs text-[#7F7F7F]">{issue.comments}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogListItem;
