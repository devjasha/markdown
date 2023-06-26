"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function MarkdownEditor() {
  const previewRef = useRef(null);
  const [markdown, setMarkdown] = useState("");
  const [markdownSettings, setMarkdownSettings] = useState({
    showLineNumbers: true,
  });

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleLineNumbersChange = () => {
    setMarkdownSettings((prevSettings) => ({
      ...prevSettings,
      showLineNumbers: !prevSettings.showLineNumbers,
    }));
  };

  const renderers = {
    heading: (props) => {
      const level = props.level;
      const children = props.children;

      if (level === 1) {
        return <h1>{children}</h1>;
      } else if (level === 2) {
        return <h2>{children}</h2>;
      } else if (level === 3) {
        return <h3>{children}</h3>;
      } else if (level === 4) {
        return <h4>{children}</h4>;
      } else if (level === 5) {
        return <h5>{children}</h5>;
      } else if (level === 6) {
        return <h6>{children}</h6>;
      }

      return null;
    },
    list: (props) => {
      if (props.ordered) {
        return <ol>{props.children}</ol>;
      } else {
        return <ul>{props.children}</ul>;
      }
    },
    listItem: (props) => {
      return <li>{props.children}</li>;
    },
  };

  return (
    <div className="flex">
      <textarea
        rows="10"
        cols="50"
        value={markdown}
        onChange={handleChange}
        className="w-2/4 h-screen focus:outline-none mx-2 my-4"
      />
      <ReactMarkdown
        className="markdown-body w-2/4 fixed right-0 top-0 h-screen border-l-2 p-4 overflow-y-scroll"
        components={{
          renderers,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={darcula}
                language={match[1]}
                showLineNumbers={markdownSettings.showLineNumbers}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
