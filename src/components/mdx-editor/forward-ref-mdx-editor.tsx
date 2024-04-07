"use client";

import { forwardRef } from "react";
import dynamic from "next/dynamic";
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";

const Editor = dynamic(() => import("./initialized-mdx-editor"), {
  ssr: false,
});

export const ForwardRefMdxEditor = forwardRef<
  MDXEditorMethods,
  MDXEditorProps & {
    onChangeEditor: () => void;
  }
>((props, ref) => <Editor {...props} editorRef={ref} />);

ForwardRefMdxEditor.displayName = "ForwardRefMdxEditor";
