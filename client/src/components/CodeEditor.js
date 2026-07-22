"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Settings, Code2, Moon, Sun, AlignLeft, Download, Copy, Check, Type, Play, Loader2 } from 'lucide-react';
import useTestCasesStore from '@/stores/testcases.store';
import runCode from '@/services/code.editor.service';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export const LANGUAGES = [
  { id: "cpp", name: "C++", compiler: "g++-15" },
  { id: "python", name: "Python", compiler: "python-3.14" },
  { id: "java", name: "Java", compiler: "openjdk-25" },
  { id: "c", name: "C", compiler: "gcc-15" },
  { id: "go", name: "Go", compiler: "go-1.26" },
  { id: "rust", name: "Rust", compiler: "rust-1.93" },
  { id: "csharp", name: "C#", compiler: "dotnet-csharp-9" },
  { id: "typescript", name: "TypeScript", compiler: "typescript-deno" },
  { id: "php", name: "PHP", compiler: "php-8.5" },
  { id: "ruby", name: "Ruby", compiler: "ruby-4.0" },
  { id: "haskell", name: "Haskell", compiler: "haskell-9.12" },
  { id: "fsharp", name: "F#", compiler: "dotnet-fsharp-9" },
];

const THEMES = [
  { id: 'vs-dark', name: 'Dark (VS Code)' },
  { id: 'vs', name: 'Light (VS Code)' },
  { id: 'hc-black', name: 'High Contrast' },
];

const TAB_SIZES = [2, 4, 8];

function App({ workspace }) {
  const { data: session } = useSession();
  const user = session?.user
  const [language, setLanguage] = useState(workspace?.language);
  const [theme, setTheme] = useState('vs-dark');
  const [tabSize, setTabSize] = useState(4);
  const [fontSize, setFontSize] = useState(14);
  const [code, setCode] = useState(workspace?.runnerCode);
  const [idealCode, setIdealCode] = useState(workspace?.aiCode);
  const [idealLang, setIdealLang] = useState(workspace?.language);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cooldown, setCooldown] = useState(0);
  const testCases = useTestCasesStore((state) => state.testCases);
  const running = useTestCasesStore((state) => state.running);

  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const editorInstanceRef = useRef(null);

  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown > 0]);

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
            fontFamily: "'sans', monospace",
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

  const STATUS = {
    NOT_TESTED: "not_tested",
    RIGHT: "right",
    WRONG: "wrong",
    TLE: "tle",
    RUNTIME_ERROR: "runtime_error",
  };

  const handleRunCode = async () => {
    try {
      const idealCompiler = LANGUAGES.find(lang => lang.id === idealLang)?.compiler;
      const compiler = LANGUAGES.find(lang => lang.id === language)?.compiler;
      await runCode(idealCompiler, idealCode, compiler, code)
    } catch (error) {
      console.log("Failed to run code: ", error.message)
    }
    finally {
      setCooldown(10)
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
      python: "py",
      c: "c",
      cpp: "cpp",
      java: "java",
      csharp: "cs",
      fsharp: "fs",
      php: "php",
      ruby: "rb",
      haskell: "hs",
      go: "go",
      rust: "rs",
      typescript: "ts",
    };

    a.download = `script.${extensions[language] || 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e] rounded-xl overflow-hidden">

      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333333] gap-y-3">
        <div className="flex flex-wrap items-center gap-3">

          {/* Language Selector */}
          <div className="flex items-center bg-[#333333] rounded-md px-2 py-1.5">
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
          <div className="flex items-center bg-[#333333] rounded-md px-2 py-1.5">
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
          <div className="flex items-center bg-[#333333] rounded-md px-2 py-1.5">
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
          <div className="flex items-center bg-[#333333] rounded-md px-2 py-1.5">
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
            disabled={running || cooldown > 0 || testCases.length === 0}
            className={`flex items-center gap-2 w-20 h-8 justify-center rounded-md transition-all duration-200 text-white
              ${running || cooldown > 0
                ? "bg-yellow-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 cursor-pointer active:scale-98"
              }`}
          >
            {running ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : cooldown > 0 ? (
              <>
                <Play className="w-4 h-4" />
                {cooldown}s
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
          <div>
            <Link href={user ? "/dashboard" : "/login"}>
              {user ? (
                <Image
                  src={user?.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                  alt={user?.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <span>Sign In</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-1 min-h-0 relative bg-[#1e1e1e] pt-5">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#1e1e1e] text-gray-400">
            Initializing Editor...
          </div>
        )}
        <div
          ref={editorRef}
          className="w-full h-full min-h-0"
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-primary text-white text-xs">
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