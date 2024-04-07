"use client";

import { Issue } from "@/models/issue";
import { Button } from "@/components/nextui";
import { useEffect, useRef, useState } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ForwardRefEditor } from "../mdx-editor/forward-ref-editor";
import { toast } from "sonner";
import blogSchema, { BlogSchema } from "@/models/blog-schema";
import "@mdxeditor/editor/style.css";

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
    "wysiwyg",
  );

  useEffect(() => {
    const isValid = blogSchema.safeParse({ title, body });
    setError(
      !isValid.success
        ? isValid.error.issues.map((issue) => issue.message).join(", ")
        : null,
    );
  }, [title, body]);

  const handleSubmit = async () => {
    const isValid = blogSchema.safeParse({ title, body });
    if (!isValid.success) {
      toast.error(
        isValid.error.issues.map((issue) => issue.message).join(", "),
      );
      return;
    }
    onSubmit({ title, body });
  };

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
        <ForwardRefEditor
          contentEditableClassName="markdown-body"
          ref={editorRef}
          markdown={body ?? ""}
          onChange={(markdown) => setBody(markdown)}
          onChangeEditor={() => {
            setEditorType("rawText");
          }}
        />
      ) : (
        <div className="flex flex-col items-end gap-2">
          <div className="flex h-[46px] w-fit items-center justify-center rounded bg-[#F0F0F3] p-2">
            <button
              className="flex h-full w-fit items-center justify-center text-[#60646C] hover:bg-[#E0E1E6]"
              onClick={() => {
                setEditorType("wysiwyg");
              }}
            >
              預覽編輯器
            </button>
          </div>
          <textarea
            className="h-fit min-h-screen w-full bg-gray-100 p-2"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      )}
      <div className=" fixed bottom-0 left-0 w-full">
        <div className="mx-auto flex h-fit w-full max-w-[720px] justify-end px-[60px] pb-2">
          <Button
            isDisabled={error ? true : false}
            color="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            {error ? error : title && body ? "儲存" : "請填寫表單"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlogEditor;
