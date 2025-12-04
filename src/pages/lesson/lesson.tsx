import CodeBlock from "@/components/blocks/code";
import Navigation from "./navigation";
import MarkdownView from "@/components/markdown";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Container from "@/components/ui/container";

const Lesson = () => {
  const content = `# Learn Go (for Developers)\n\n![golang gopher](https://go.dev/blog/gopher/header.jpg)\n\nThis course assumes you're already familiar with programming fundamentals in at least one other language. I'll move quickly through the basics. For example, I'll explain _how functions in Go_ work, but I'll assume you already know _what a function is_.\n\n_If you're brand new to coding I recommend starting with our [Python for beginners course](https://boot.dev/courses/learn-python) first._\n\n## What to Expect\n\nFor most of this course you'll be writing code in your browser, but we will occasionally drop down to your local machine and use our [official CLI tool](https://github.com/bootdotdev/bootdev) (written in Go, ofc) to pass off lessons.\n\nWe'll be building parts of a make-believe software project: **Textio**! A [SaaS](https://www.salesforce.com/saas/) app for sending SMS (text messages) to customers.\n\n## Assignment\n\n**Print \`Starting Textio server...\` to the console instead of \`hello there!\`.**\n\n_Capitalization and punctuation matter._\n\n\`\`\`go\npackage main\nimport "fmt"\n\nfunc main() {\n   fmt.Printf("Hello World")\n}`;
  const type = "code";
  const code = `package main\nimport "fmt"\nfunc main() {\n    fmt.Printf("Hello World")\n}
`;
  const [show, setShow] = useState(false);

  return (
    <div>
      <Navigation show={show} setShow={setShow} type={type} />
      <div className={cn("grid grid-cols-2 max-mm:grid-cols-1")}>
        <div className={cn(show && "max-mm:hidden")}>
          <MarkdownView content={content} />
        </div>
        <div className={cn(!show && "max-mm:hidden")}>
          {type === "code" && <CodeBlock code={code} language="go" />}
        </div>
      </div>
    </div>
  );
};

export default Lesson;
