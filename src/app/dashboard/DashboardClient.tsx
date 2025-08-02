"use client";

import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import {
  Plus,
  Copy,
  ExternalLink,
  BarChart3,
  Code2,
  QrCode,
} from "lucide-react";
import QRCode from "qrcode";

// Mock data for now
const mockSnippets = [
  {
    id: "1",
    title: "React useState Hook",
    language: "javascript",
    views: 42,
    slug: "react-usestate",
    createdAt: "2025-01-20",
    tiktokUrl: "https://tiktok.com/@user/video1",
  },
  {
    id: "2",
    title: "Python List Comprehension",
    language: "python",
    views: 28,
    slug: "python-list-comp",
    createdAt: "2025-01-18",
    tiktokUrl: null,
  },
  {
    id: "3",
    title: "CSS Flexbox Center",
    language: "css",
    views: 15,
    slug: "css-flex-center",
    createdAt: "2025-01-15",
    tiktokUrl: "https://tiktok.com/@user/video3",
  },
];

interface DashboardClientProps {
  // No props needed - using useUser hook
}

export default function DashboardClient({}: DashboardClientProps) {
  const { user, error, isLoading } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState<any>(null);
  const [qrCodeDataURL, setQRCodeDataURL] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>Not authenticated</div>;

  const mockUserData = {
    name: user.name || "Developer",
    email: user.email || "user@example.com",
    tier: "FREE",
    snippetCount: 3,
    maxSnippets: 5,
  };

  const handleCreateSnippet = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          language,
          code,
          tiktokUrl,
        }),
      });

      if (response.ok) {
        // Reset form
        setTitle("");
        setDescription("");
        setLanguage("javascript");
        setCode("");
        setTiktokUrl("");
        setShowCreateModal(false);
        // Refresh page or update state
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating snippet:", error);
    }
  };

  const generateQRCode = async (snippet: any) => {
    try {
      const url = `${window.location.origin}/s/${snippet.slug}`;
      const qrDataURL = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQRCodeDataURL(qrDataURL);
      setSelectedSnippet(snippet);
      setShowQRModal(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.download = `qr-${selectedSnippet.slug}.png`;
    link.href = qrCodeDataURL;
    link.click();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {mockUserData.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {mockUserData.tier} • {mockUserData.snippetCount}/
                {mockUserData.maxSnippets} snippets
              </div>
              <a
                href="/auth/logout"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Snippets
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockUserData.snippetCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockSnippets.reduce(
                    (sum, snippet) => sum + snippet.views,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <ExternalLink className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  TikTok Links
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockSnippets.filter((s) => s.tiktokUrl).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Snippets</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            disabled={mockUserData.snippetCount >= mockUserData.maxSnippets}
          >
            <Plus className="h-4 w-4" />
            <span>Create Snippet</span>
          </button>
        </div>

        {/* Snippets Grid */}
        <div className="grid gap-6">
          {mockSnippets.map((snippet) => (
            <div
              key={snippet.id}
              className="bg-white p-6 rounded-lg shadow-sm border"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {snippet.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span className="capitalize">{snippet.language}</span>
                    <span>•</span>
                    <span>{snippet.views} views</span>
                    <span>•</span>
                    <span>{snippet.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => generateQRCode(snippet)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="Generate QR Code"
                  >
                    <QrCode className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${window.location.origin}/s/${snippet.slug}`
                      )
                    }
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="Copy Link"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <a
                    href={`/s/${snippet.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="View Snippet"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Link:{" "}
                  <span className="font-mono text-blue-600">
                    /s/{snippet.slug}
                  </span>
                </div>
                {snippet.tiktokUrl && (
                  <a
                    href={snippet.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View on TikTok
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {mockSnippets.length === 0 && (
          <div className="text-center py-12">
            <Code2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No snippets yet
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first code snippet to get started!
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Your First Snippet
            </button>
          </div>
        )}
      </div>

      {/* Create Snippet Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Create New Snippet</h2>
            </div>

            <form onSubmit={handleCreateSnippet} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React useState Hook"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of what this code does..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language *
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                  <option value="php">PHP</option>
                  <option value="ruby">Ruby</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                  <option value="swift">Swift</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code *
                </label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="Paste your code here..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TikTok URL
                </label>
                <input
                  type="url"
                  value={tiktokUrl}
                  onChange={(e) => setTiktokUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://tiktok.com/@username/video/..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional: Link to your TikTok video
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Create Snippet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && selectedSnippet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">QR Code</h2>
              <p className="text-gray-600 text-sm mt-1">
                {selectedSnippet.title}
              </p>
            </div>

            <div className="p-6 text-center">
              {qrCodeDataURL && (
                <img
                  src={qrCodeDataURL}
                  alt="QR Code"
                  className="mx-auto mb-4 border rounded"
                />
              )}

              <p className="text-sm text-gray-600 mb-4">
                Scan this QR code to view the snippet
              </p>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={downloadQRCode}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Download QR Code
                </button>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
