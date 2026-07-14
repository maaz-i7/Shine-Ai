"use client"

import React, { useState, useEffect, useRef } from 'react';
import {
  Settings,
  Code2,
  Moon,
  Sun,
  AlignLeft,
  Download,
  Copy,
  Check,
  Type,
  Play,
  Loader2
} from 'lucide-react';

const LANGUAGES = [
  { id: 'cpp', name: 'C++' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'c', name: 'C' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
  { id: 'csharp', name: 'C#' },
  { id: 'php', name: 'PHP' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'sql', name: 'SQL' },
  { id: 'shell', name: 'Shell/Bash' },
  { id: 'json', name: 'JSON' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'xml', name: 'XML' },
  { id: 'yaml', name: 'YAML' },
  { id: 'markdown', name: 'Markdown' },
]

const THEMES = [
  { id: 'vs-dark', name: 'Dark (VS Code)' },
  { id: 'vs', name: 'Light (VS Code)' },
  { id: 'hc-black', name: 'High Contrast' },
];

const TAB_SIZES = [2, 4, 8];

function App() {
  const [language, setLanguage] = useState('cpp');
  const [theme, setTheme] = useState('vs-dark');
  const [tabSize, setTabSize] = useState(2);
  const [fontSize, setFontSize] = useState(14);
  const [code, setCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const editorInstanceRef = useRef(null);

  // Dynamic Loading of Monaco to avoid bundler resolution issues
  useEffect(() => {
    let isMounted = true;

    const initMonaco = () => {
      if (!isMounted) return;
      window.require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });
      window.require(['vs/editor/editor.main'], () => {
        if (!isMounted) return;
        monacoRef.current = window.monaco;

        if (editorRef.current && !editorInstanceRef.current) {
          editorInstanceRef.current = window.monaco.editor.create(editorRef.current, {
            value: code,
            language: language,
            theme: theme,
            autoIndent: 'full',
            automaticLayout: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            folding: true,
            fontFamily: "'Fira Code', 'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
            fontSize: fontSize,
            formatOnPaste: true,
            formatOnType: true,
            mouseWheelZoom: true,
            smoothScrolling: true,
            wordWrap: 'on',
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoSurround: 'languageDefined',
            tabSize: tabSize,
            indentSize: tabSize,
            insertSpaces: true,
            detectIndentation: false,
            minimap: { enabled: true, scale: 0.75 },

            // Explicitly disable all suggestions and hints
            quickSuggestions: false,
            suggestOnTriggerCharacters: false,
            wordBasedSuggestions: 'off',
            snippetSuggestions: 'none',
            parameterHints: { enabled: false }
          });

          setIsLoading(false);

          editorInstanceRef.current.onDidChangeModelContent(() => {
            setCode(editorInstanceRef.current.getValue());
          });
        }
      });
    };

    // Load AMD loader script dynamically
    if (window.monaco && window.monaco.editor) {
      monacoRef.current = window.monaco;
      initMonaco();
    } else {
      const existingScript = document.getElementById('monaco-loader-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'monaco-loader-script';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js';
        script.onload = initMonaco;
        document.body.appendChild(script);
      } else {
        existingScript.addEventListener('load', initMonaco);
      }
    }

    return () => {
      isMounted = false;
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose();
        editorInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRunCode = async () => {
    if (isRunning) return;

    setIsRunning(true);

    try {
      const res = await fetch(
        "https://api.onlinecompiler.io/api/run-code-sync/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": "e1704d8f9929e9b5613262c7b850c2eb", // replace with the header name required by the API
          },
          body: JSON.stringify({
            compiler: "g++-15",
            code,
            input: "",
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const data = await res.json();

      console.log(data);

      // Example:
      // setOutput(data.output);
      // setError(data.error);

    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    const newCode = '';
    setCode(newCode);

    if (monacoRef.current && editorInstanceRef.current) {
      monacoRef.current.editor.setModelLanguage(editorInstanceRef.current.getModel(), newLang);
      editorInstanceRef.current.setValue(newCode);
    }
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(newTheme);
    }
  };

  const handleTabSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setTabSize(newSize);

    const model = editorInstanceRef.current?.getModel();
    if (model) {
      model.updateOptions({
        tabSize: newSize,
        indentSize: newSize,
        insertSpaces: true,
        detectIndentation: false,
      });
    }
  };

  const handleFontSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setFontSize(newSize);
    if (editorInstanceRef.current) {
      editorInstanceRef.current.updateOptions({ fontSize: newSize });
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      // Fallback for iframe environments
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    const extensions = {
      javascript: 'js', typescript: 'ts', python: 'py',
      html: 'html', css: 'css', json: 'json', java: 'java',
      c: 'c', cpp: 'cpp', csharp: 'cs', php: 'php', ruby: 'rb',
      go: 'go', rust: 'rs', sql: 'sql', xml: 'xml', yaml: 'yml',
      markdown: 'md', shell: 'sh'
    };

    a.download = `script.${extensions[language] || 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#1e1e1e] border-x border-t border-gray-800 rounded-t-lg overflow-hidden shadow-2xl">

      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333333] gap-y-3">
        <div className="flex flex-wrap items-center gap-3">

          {/* Language Selector */}
          <div className="flex items-center bg-[#333333] rounded-md px-2 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
            <Code2 className="w-4 h-4 text-gray-400 mr-2" />
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-transparent text-sm text-gray-200 outline-none cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id} className="bg-[#252526]">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Selector */}
          <div className="flex items-center bg-[#333333] rounded-md px-2 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
            {theme === 'vs-dark' || theme === 'hc-black' ? (
              <Moon className="w-4 h-4 text-gray-400 mr-2" />
            ) : (
              <Sun className="w-4 h-4 text-gray-400 mr-2" />
            )}
            <select
              value={theme}
              onChange={handleThemeChange}
              className="bg-transparent text-sm text-gray-200 outline-none cursor-pointer"
            >
              {THEMES.map((t) => (
                <option key={t.id} value={t.id} className="bg-[#252526]">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Indentation (Tab Size) Selector */}
          <div className="flex items-center bg-[#333333] rounded-md px-2 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
            <AlignLeft className="w-4 h-4 text-gray-400 mr-2" />
            <select
              value={tabSize}
              onChange={handleTabSizeChange}
              className="bg-transparent text-sm text-gray-200 outline-none cursor-pointer"
            >
              {TAB_SIZES.map((size) => (
                <option key={size} value={size} className="bg-[#252526]">
                  Tab Size: {size}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size Selector */}
          <div className="flex items-center bg-[#333333] rounded-md px-2 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
            <Type className="w-4 h-4 text-gray-400 mr-2" />
            <select
              value={fontSize}
              onChange={handleFontSizeChange}
              className="bg-transparent text-sm text-gray-200 outline-none cursor-pointer"
            >
              {[12, 14, 16, 18, 20, 22, 24].map((size) => (
                <option key={size} value={size} className="bg-[#252526]">
                  {size}px
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`flex items-center gap-2 w-20 h-8 justify-center rounded-md transition-all duration-200 text-white
            ${isRunning
                ? "bg-yellow-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 cursor-pointer"
              }`}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />

              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyCode}
            className="flex items-center p-2 rounded-md hover:bg-[#333333] transition-colors text-gray-400 hover:text-gray-200"
            title="Copy Code"
          >
            {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={downloadCode}
            className="flex items-center p-2 rounded-md hover:bg-[#333333] transition-colors text-gray-400 hover:text-gray-200"
            title="Download File"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-1 mt-5 relative bg-[#1e1e1e]">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#1e1e1e] text-gray-400">
            Initializing Editor...
          </div>
        )}
        <div ref={editorRef} className="w-full h-full" />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#007acc] text-white text-xs">
        <div className="flex items-center space-x-3">
          <span className="flex items-center">
            <Settings className="w-3 h-3 mr-1" /> Ready
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Ln {code.split('\n').length}, Col {code.length - code.lastIndexOf('\n')}</span>
          <span>Spaces: {tabSize}</span>
          <span>UTF-8</span>
          <span className="uppercase">{language}</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(App);