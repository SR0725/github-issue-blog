"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/nextui";
import { Comment } from "@/models/comment";
import transformMdToHtml from "@/utils/transform-md-to-html";

function BlogCommentListItem({ comment }: { comment: Comment }) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const processContent = async () => {
      const htmlContent = await transformMdToHtml(comment.body ?? "");
      setContent(htmlContent);
    };

    processContent();
  }, [comment.body]);

  return (
    <div
      key={comment.id}
      className="flex items-start pb-4 pt-5  text-black text-opacity-85"
    >
      <Avatar
        src={comment.user.avatar_url}
        alt={comment.user.login}
        className="mr-2 size-8"
      />
      <div>
        <a
          href={comment.user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium leading-5 text-black"
        >
          {comment.user.login}
        </a>
        <div className="markdown-body text-base font-normal leading-7">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div className="ml-2 text-sm text-black text-opacity-50">
          {new Date(comment.created_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default BlogCommentListItem;
