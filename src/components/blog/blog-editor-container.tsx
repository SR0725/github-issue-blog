"use client";
import { Issue } from "@/models/issue";
import { Session } from "next-auth";
import "github-markdown-css/github-markdown-light.css";
import useUpdateIssue from "@/hooks/useUpdateIssue";
import { toast } from "sonner";
import { BlogSchema } from "@/models/blog-schema";
import BlogEditor from "./blog-editor";
import { useRouter } from "next/navigation";

function BlogEditorContainer({
  session,
  issue,
}: {
  session: Session;
  issue: Issue;
}) {
  const router = useRouter();
  const updateMutation = useUpdateIssue(issue.number, session);

  const onSubmit = async ({ title, body }: BlogSchema) => {
    await updateMutation.mutate(
      {
        title,
        body,
      },
      {
        onSuccess: () => {
          toast.success("成功儲存");
          router.push(`/blog/${issue.number}`);
        },
        onError: (error) => {
          console.error(error);
          toast.error("發生錯誤，請檢查 F12 Console");
        },
      },
    );
  };

  return <BlogEditor issue={issue} onSubmit={onSubmit} />;
}

export default BlogEditorContainer;
