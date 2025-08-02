"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Copy, ExternalLink, Code2, Eye } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Snippet {
  id: string;
  title: string;
  description: string | null;
  code: string;
  language: string;
  views: number;
  tiktokUrl: string | null;
  createdAt: string;
  user: {
    name: string | null;
    tiktokUsername: string | null;
    image: string | null;
  };
}

export default function SnippetPage() {
  const params = useParams();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchSnippet(params.slug as string);
    }
  }, [params.slug]);

  const fetchSnippet = async (slug: string) => {
    try {
      const response = await fetch(`/api/snippets/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setSnippet(data);
      } else {
        console.error("Failed to fetch snippet");
      }
    } catch (error) {
      console.error("Error fetching snippet:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (snippet) {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Snippet Not Found
          </h1>
          <p className="text-gray-400">
            The code snippet you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Code2 className="h-8 w-8 text-purple-400" />
              <div>
                <h1 className="text-xl font-bold text-white">
                  {snippet.title}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>
                    by{" "}
                    {snippet.user.name ||
                      snippet.user.tiktokUsername ||
                      "Unknown"}
                  </span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{snippet.views} views</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {snippet.tiktokUrl && (
                <a
                  href={snippet.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View TikTok</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {snippet.description && (
          <div className="mb-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              {snippet.description}
            </p>
          </div>
        )}

        {/* Code Block */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-mono text-gray-400">
                {snippet.language}
              </span>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition-colors text-sm"
            >
              <Copy className="h-4 w-4" />
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <SyntaxHighlighter
              language={snippet.language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                background: "transparent",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
              wrapLongLines={true}
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Creator Info */}
        <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            About the Creator
          </h3>
          <div className="flex items-center space-x-4">
            {snippet.user.image && (
              <img
                src={snippet.user.image}
                alt="Creator"
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <p className="text-white font-medium">
                {snippet.user.name ||
                  snippet.user.tiktokUsername ||
                  "Unknown Creator"}
              </p>
              {snippet.user.tiktokUsername && (
                <p className="text-purple-400">
                  @{snippet.user.tiktokUsername}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <Code2 className="h-5 w-5 text-purple-400" />
            <span>Powered by DevTok Companion</span>
          </div>
        </div>
      </main>
    </div>
  );
}
