// https://www.dhiwise.com/post/crafting-beautiful-code-blocks-with-react-syntax-highlighter
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeExample() {
  const codeString = `button {
    background-color: #111111;
    color: #F5F5F5;
    padding: 8px 12px;
    border-radius: 6px;
  }`;

  const customStyle = {
    lineHeight: '1.5',
    fontSize: '1rem',
    borderRadius: '6px',
    backgroundColor: '#111',
    padding: '8px 4px'
  };

  const CustomPre = (props: any) => <pre id="customPreTag" {...props} />;

  return (
    <SyntaxHighlighter
      language="css"
      PreTag={CustomPre}
      style={oneDark}
      customStyle={customStyle}
      showLineNumbers
    >
      {codeString}
    </SyntaxHighlighter>
  );
};