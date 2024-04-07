"use client";
import { Issue } from "@/models/issue";
import { Session } from "next-auth";

import useQueryIssueCommentList from "@/hooks/useQueryIssueCommentList";
import BlogCommentListItem from "./blog-comment-list-item";

function BlogCommentList({
  session,
  issue,
}: {
  session: Session | null;
  issue: Issue;
}) {
  const { data } = useQueryIssueCommentList(issue.number, session);

  return (
    <section>
      {data?.map((comment) => (
        <BlogCommentListItem key={comment.id} comment={comment} />
      ))}
    </section>
  );
}

export default BlogCommentList;
