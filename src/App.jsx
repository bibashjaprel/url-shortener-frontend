import { useState, useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";

import ShortenForm from "./components/ShortenForm";
import ShortenedUrl from "./components/ShortenedUrl";
import RecentUrls from "./components/RecentUrls";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CONFIG from "./utils/config";

export default function App() {
  const [shortUrl, setShortUrl] = useState("");
  const [recentUrls, setRecentUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecentUrls = async () => {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/recent-shortened`);
      if (!response.ok) throw new Error("Failed to fetch recent URLs.");
      const data = await response.json();
      setRecentUrls(data);
    } catch (err) {
      console.error("Error fetching recent URLs:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentUrls();
  }, []);

  const handleShorten = (err, data) => {
    if (err) {
      setError(err.message);
      return;
    }
    setShortUrl(data);
    fetchRecentUrls();
  };

  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-zinc-800 text-white font-roboto">
        <section className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-blue-400 mb-4">
            🔗 URL Shortener
          </h1>
          <p className="text-lg mb-8">
            Instantly shorten long URLs into clean and easy-to-share links.
          </p>
        </section>

        <SignedIn>
          <ShortenForm onShortened={handleShorten} />
        </SignedIn>

        <SignedOut>
          <div className="mb-8 text-center">
            <p className="text-gray-300 mb-4">
              Please sign in to shorten a URL.
            </p>
            <SignInButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded text-white transition">
                Login to Shorten
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <ShortenedUrl shortUrl={shortUrl} />

        {error && (
          <p className="mt-6 text-red-500">{error}</p>
        )}

        {loading ? (
          <p className="mt-6 text-gray-400">Loading recent URLs...</p>
        ) : (
          <RecentUrls urls={recentUrls} />
        )}
      </main>

      <Footer />
    </>
  );
}
