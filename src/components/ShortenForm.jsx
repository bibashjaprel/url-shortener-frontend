import { useState } from "react";
import CONFIG from "../utils/config";

export default function ShortenForm({ onShortened }) {
  const [originalUrl, setOriginalUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${CONFIG.API_BASE_URL}/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await res.json();

    if (!res.ok) {
      onShortened(data)
      return;
    }


    onShortened(null, data.shortUrl);
    setOriginalUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl flex gap-3 mb-8">
      <input
        type="url"
        placeholder="Paste your long URL here..."
        className="flex-1 p-3 rounded bg-zinc-700 text-white"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white"
      >
        Shorten
      </button>
    </form>
  );
}
