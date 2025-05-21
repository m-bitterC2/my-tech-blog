"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル

type MarkdownContentProps = {
  content: string;
  className?: string;
};

export function MarkdownContent({
  content,
  className = "",
}: MarkdownContentProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        skipHtml={false} // HTMLスキップを無効化
        unwrapDisallowed={true} // Markdownの改行を解釈
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
