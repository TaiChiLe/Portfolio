interface NamePreviewProps {
  isDarkMode?: boolean;
  name?: string;
}

export default function NamePreview({ isDarkMode = false }: NamePreviewProps) {
  return (
    <div className="mb-1">
      <div
        className={`p-3 rounded  ${
          isDarkMode
            ? 'bg-gray-900 border-gray-700'
            : 'bg-gray-50 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-full ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-6 h-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h1
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Tyson Le
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Customer Support Analyst II by Day, Aspiring Developer by Night.
              <br />
              <br />
              Passionate about building and learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
