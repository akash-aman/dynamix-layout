import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
export type CodeBlockProps = {
    code: string;
    className?: string;
    style?: React.CSSProperties;
    language?: string;
};

export const CodeBlock = ({ code, language = "javascript", ...props }: CodeBlockProps) => {
    return (
        <SyntaxHighlighter className={props.className} language={language} style={vscDarkPlus} {...props}>
            {code}
        </SyntaxHighlighter>
    );
};