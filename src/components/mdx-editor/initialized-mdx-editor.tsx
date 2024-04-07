"use client";

import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  linkPlugin,
  imagePlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  tablePlugin,
  toolbarPlugin,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  ChangeCodeMirrorLanguage,
  InsertCodeBlock,
  ConditionalContents,
  Button,
} from "@mdxeditor/editor";

export default function InitializedMDXEditor({
  editorRef,
  onChangeEditor,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps & {
    onChangeEditor: () => void;
  }) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
        listsPlugin(),
        quotePlugin(),
        linkPlugin(),
        imagePlugin({
          imageAutocompleteSuggestions: [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
          ],
        }),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            css: "CSS",
            html: "HTML",
            md: "Markdown",
            ts: "TypeScript",
          },
        }),
        tablePlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <div className="flex w-full justify-between">
              <div className="flex">
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <ConditionalContents
                  options={[
                    {
                      when: (editor: any) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                        </>
                      ),
                    },
                  ]}
                />
                <CreateLink />
              </div>
              <div>
                <Button
                  onClick={() => {
                    onChangeEditor();
                  }}
                >
                  純文字編輯
                </Button>
              </div>
            </div>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
