"use client";

import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import "github-markdown-css/github-markdown-light.css";
import { toast } from "sonner";
import useCreateIssue from "@/hooks/useCreateIssue";
import { BlogSchema } from "@/models/blog-schema";
import BlogEditor from "./blog-editor";

function BlogCreateContainer({ session }: { session: Session }) {
  const createMutation = useCreateIssue(session);
  const router = useRouter();

  const onSubmit = async ({ title, body }: BlogSchema) => {
    await createMutation.mutate(
      {
        title,
        body,
      },
      {
        onSuccess: (data) => {
          toast.success("成功建立新文章");
          router.push(`/blog/${data.number}`);
        },
        onError: (error) => {
          console.error(error);
          toast.error("發生錯誤，請檢查 F12 Console");
        },
      }
    );
  };

  return <BlogEditor onSubmit={onSubmit} />;
}

export default BlogCreateContainer;
