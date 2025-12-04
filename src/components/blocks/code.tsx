import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import {
  loadLanguage,
  type LanguageName,
} from "@uiw/codemirror-extensions-langs";
import { Button } from "@/components/ui/button";
import { Eye, Play } from "lucide-react";

const CodeBlock = ({
  code,
  language,
}: {
  code: string;
  language: LanguageName;
}) => {
  const ext = loadLanguage(language) ?? [];
  return (
    <div className="flex flex-col gap-2">
      <CodeMirror
        value={code}
        height="60dvh"
        theme={vscodeDark}
        extensions={[ext]}
      />

      <div className="flex gap-1.5 mm:ml-2">
        <Button variant="outline">
          <Play />
          Submit
        </Button>
        <Button variant="outline">
          <Play />
          Run
        </Button>
        <Button variant="outline">
          <Eye /> Solution
        </Button>
      </div>
    </div>
  );
};

export default CodeBlock;
