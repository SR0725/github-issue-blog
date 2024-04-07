"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ForwardRefMdxEditor } from "../mdx-editor/forward-ref-mdx-editor";
import RawTextEditor from "../mdx-editor/raw-text-editor";
import { toast } from "sonner";
import { MDXEditorMethods } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { Button } from "@/components/nextui";
import blogSchema, { BlogSchema } from "@/models/blog-schema";
import { Issue } from "@/models/issue";

interface BlogEditorProps {
  issue?: Issue;
  onSubmit: (newBlog: BlogSchema) => void;
}
function BlogEditor({ issue, onSubmit }: BlogEditorProps) {
  const editorRef = useRef<MDXEditorMethods>(null);
  const [title, setTitle] = useState(issue?.title ?? "");
  const [body, setBody] = useState(issue?.body ?? "");
  const [error, setError] = useState<string | null>(null);
  const [editorType, setEditorType] = useState<"rawText" | "wysiwyg">(
    "wysiwyg"
  );

  const validateForm = useCallback(() => {
    const isValid = blogSchema.safeParse({ title, body });
    setError(
      !isValid.success
        ? isValid.error.issues.map((issue) => issue.message).join(", ")
        : null
    );
  }, [title, body]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleSubmit = useCallback(() => {
    const isValid = blogSchema.safeParse({ title, body });
    if (!isValid.success) {
      toast.error(
        isValid.error.issues.map((issue) => issue.message).join(", ")
      );
      return;
    }
    onSubmit({ title, body });
  }, [title, body, onSubmit]);

  return (
    <div className="relative mx-auto h-fit min-h-screen w-full max-w-[720px] rounded bg-white px-[60px] text-black">
      <input
        type="text"
        className="mb-2 mt-4 w-full text-3xl"
        placeholder="標題"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {editorType === "wysiwyg" ? (
        <ForwardRefMdxEditor
          contentEditableClassName="markdown-body"
          ref={editorRef}
          markdown={body ?? ""}
          onChange={(markdown) => setBody(markdown)}
          onChangeEditor={() => {
            setEditorType("rawText");
          }}
        />
      ) : (
        <RawTextEditor
          markdown={body}
          onChange={(markdown) => setBody(markdown)}
          onChangeEditor={() => {
            setEditorType("wysiwyg");
          }}
        />
      )}
      <div className=" fixed bottom-0 left-0 w-full">
        <div className="mx-auto flex h-fit w-full max-w-[720px] justify-end px-[60px] pb-2">
          <Button
            isDisabled={Boolean(error) || !(title && body)}
            color="primary"
            onClick={handleSubmit}
          >
            {error || (title && body ? "儲存" : "請填寫表單")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlogEditor;
