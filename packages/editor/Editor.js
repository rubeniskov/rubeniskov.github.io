/* eslint-disable prettier/prettier */
import { ControlledEditor } from "@monaco-editor/react";
import glslLanguage from "./languages/glsl";
import mdLanguage from "./languages/md";

// https://microsoft.github.io/monaco-editor/monarch.html
// https://medium.com/dscddu/language-server-protocol-adding-support-for-multiple-language-servers-to-monaco-editor-a3c35e42a98d

if (global.monaco) {
  const monaco = global.monaco;
  // Register a new language
  monaco.languages.register({ id: "md" });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider("md", mdLanguage);

  // Register a new language
  monaco.languages.register({ id: "glsl" });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider("glsl", glslLanguage);

  // Register a completion item provider for the new language
  monaco.languages.registerCompletionItemProvider("glsl", {
    provideCompletionItems: () => {
      var suggestions = [
        {
          label: "simpleText",
          kind: monaco.languages.CompletionItemKind.Text,
          insertText: "simpleText",
        },
        {
          label: "testing",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "testing(${1:condition})",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
          label: "ifelse",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["if (${1:condition}) {", "\t$0", "} else {", "\t", "}"].join("\n"),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "If-Else Statement",
        },
      ];
      return { suggestions: suggestions };
    },
  });
}

const Editor = ({ language, readOnly, ...restProps }) => {
  return (
    <ControlledEditor
      {...restProps}
      height="100%"
      language={language}
      theme="dark"
      options={{
        // lineNumbersMinChars: 2,
        padding: {
          top: 15,
          bottom: 15,
        },
        minimap: {
          enabled: false,
        },
        readOnly,
      }}
    />
  );
};

export default Editor;

/*

TODO

- fill the vs path from enviroment vars
- use service worker for store assets and improve performance
- Add extensions


References:
https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html
https://www.npmjs.com/package/@monaco-editor/react#config
https://github.com/stef-levesque/vscode-shader
https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-custom-languages
https://github.com/microsoft/monaco-editor-webpack-plugin
https://github.com/timkendrick/monaco-editor
https://github.com/timkendrick/monaco-editor-loader
https://github.com/microsoft/monaco-editor-webpack-plugin
https://github.com/suren-atoyan/monaco-react
https://github.com/microsoft/monaco-editor/blob/master/docs/integrate-esm.md#option-1-using-the-monaco-editor-loader-plugin
*/

// import { monaco } from "@monaco-editor/react";
// if (process.env)
// monaco.config({ paths: { vs: `${window.location.protocol}//${window.location.host}/vs` } });
