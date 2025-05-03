import { useState } from "react";

export default function ShortenedUrl({ shortUrl }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!shortUrl) return null;

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 bg-zinc-8  00 px-4 py-3 rounded-md shadow-md">
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline break-all text-sm sm:text-base"
      >
        {shortUrl}
      </a>
      <button
        onClick={handleCopy}
        aria-label="Copy shortened URL"
        className={`text-sm px-4 py-1.5 rounded transition-colors duration-200 ${copied
          ? "bg-green-600 text-white cursor-default"
          : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        disabled={copied}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
