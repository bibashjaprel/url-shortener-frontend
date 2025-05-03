import CONFIG from "../utils/config";

export default function RecentUrls({ urls }) {
  if (!urls || urls.length === 0) {
    return (
      <div className="w-full max-w-xl text-gray-400 text-center mt-6">
        No recent shortened links available.
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-2xl font-bold text-white mb-1">Recent Shortened Links</h2>
      <p className="text-sm text-green-500 mb-4">Latest 05 URLs, ordered by date (newest first)</p>

      <ul className="space-y-4">
        {urls.map((url) => (
          <li
            key={url.shortId}
            className="bg-zinc-700 rounded-lg p-4 shadow-md hover:bg-zinc-600 transition"
          >
            <p className="text-sm text-gray-300 break-words mb-1">
              {url.originalUrl}
            </p>
            <a
              href={`${CONFIG.SHORT_DOMAIN}/${url.shortId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline break-words text-sm"
            >
              {`${CONFIG.SHORT_DOMAIN}/${url.shortId}`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
