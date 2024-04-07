"use client";

interface RawTextEditorProps {
  markdown: string;
  onChange: (markdown: string) => void;
  onChangeEditor: () => void;
}

function RawTextEditor({
  markdown,
  onChange,
  onChangeEditor: setEditorType,
}: RawTextEditorProps) {
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex h-[46px] w-fit items-center justify-center rounded bg-light-gray p-2">
        <button
          className="flex h-full w-fit items-center justify-center text-dark-gray hover:bg-opacity-50"
          onClick={setEditorType}
        >
          預覽編輯器
        </button>
      </div>
      <textarea
        className="h-fit min-h-screen w-full bg-gray-100 p-2"
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default RawTextEditor;
