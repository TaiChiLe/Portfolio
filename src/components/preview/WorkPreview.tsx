import React, { useState, useEffect } from 'react';

interface WorkItemProps {
  isDarkMode: boolean;
  projectName?: string;
  htmlPath?: string;
  description?: string;
  technologies?: string[];
  showFullPreview?: boolean;
  githubUrl?: string;
  liveUrl?: string;
}

const WorkPreview: React.FC<WorkItemProps> = ({
  isDarkMode,
  projectName = 'Guess My Number!',
  htmlPath = '/projects/GuessMyNumber/guessMyNum.html',
  description = 'An interactive number guessing game with score tracking',
  technologies = ['HTML', 'CSS', 'JavaScript'],
  showFullPreview = true,
  githubUrl,
  liveUrl,
}) => {
  const [previewError, setPreviewError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setPreviewError(false);
  }, [htmlPath]);

  const handleIframeError = () => {
    setPreviewError(true);
  };

  const getTechColor = (tech: string) => {
    const colors = {
      HTML: 'orange',
      CSS: 'blue',
      JavaScript: 'yellow',
      React: 'cyan',
      TypeScript: 'blue',
      Vue: 'green',
      Angular: 'red',
    };
    return colors[tech as keyof typeof colors] || 'gray';
  };

  const getTechBadgeClass = (tech: string, isDarkMode: boolean) => {
    const color = getTechColor(tech);
    const colorMap = {
      orange: isDarkMode
        ? 'bg-orange-900 text-orange-300'
        : 'bg-orange-100 text-orange-800',
      blue: isDarkMode
        ? 'bg-blue-900 text-blue-300'
        : 'bg-blue-100 text-blue-800',
      yellow: isDarkMode
        ? 'bg-yellow-900 text-yellow-300'
        : 'bg-yellow-100 text-yellow-800',
      cyan: isDarkMode
        ? 'bg-cyan-900 text-cyan-300'
        : 'bg-cyan-100 text-cyan-800',
      green: isDarkMode
        ? 'bg-green-900 text-green-300'
        : 'bg-green-100 text-green-800',
      red: isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800',
      gray: isDarkMode
        ? 'bg-gray-700 text-gray-300'
        : 'bg-gray-200 text-gray-700',
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Header */}
      <div
        className={`p-3 sm:p-4 rounded-t ${
          isDarkMode
            ? 'bg-gray-900 border-gray-600'
            : 'bg-gray-50 border-gray-300'
        }`}
      >
        <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-3`}>
          {/* Project Icon */}
          <div
            className={`p-2 rounded-full ${
              isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
            } ${isMobile ? 'self-start' : ''}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>

          <div className={`flex-1 ${isMobile ? 'w-full' : ''}`}>
            <h2
              className={`text-lg sm:text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {projectName}
            </h2>

            <div className="flex items-center gap-2 mt-1">
              <p
                className={`text-xs sm:text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {description}
              </p>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1 mt-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium ${getTechBadgeClass(
                    tech,
                    isDarkMode
                  )}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links and Status */}
          <div
            className={`flex ${
              isMobile ? 'justify-between w-full mt-2' : 'gap-2'
            }`}
          >
            <div className="flex gap-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-1.5 sm:p-2 rounded transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                  title="View on GitHub"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-1.5 sm:p-2 rounded transition-colors ${
                    isDarkMode
                      ? 'bg-blue-900 hover:bg-blue-800 text-blue-300'
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                  }`}
                  title="View Live Demo"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>

            {/* Status Badge */}
            <div
              className={`px-2 py-1 sm:px-3 rounded-full text-xs font-medium ${
                isDarkMode
                  ? 'bg-green-900 text-green-300'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              Live
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {showFullPreview && (
        <div
          className={`rounded-b border-t ${
            isDarkMode
              ? 'bg-gray-800 border-gray-600'
              : 'bg-white border-gray-300'
          }`}
        >
          {/* Preview Controls */}
          <div
            className={`flex items-center justify-between p-2 sm:p-3 border-b ${
              isDarkMode ? 'border-gray-600' : 'border-gray-200'
            }`}
          >
            <h3
              className={`text-xs sm:text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Live Preview
            </h3>
          </div>

          {/* iframe Preview */}
          <div
            className={`relative overflow-hidden ${isMobile ? 'h-64' : 'h-80'}`}
          >
            {previewError ? (
              <div
                className={`flex items-center justify-center h-full ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <div className="text-center p-4">
                  <svg
                    className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.382 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <p className="text-xs sm:text-sm">Preview not available</p>
                  <p className="text-xs mt-1 opacity-75 break-all">
                    {htmlPath}
                  </p>
                </div>
              </div>
            ) : (
              <iframe
                src={htmlPath}
                className="w-full h-full border-0"
                title={`${projectName} Preview`}
                onError={handleIframeError}
                sandbox="allow-scripts allow-same-origin"
                style={{
                  transform: isMobile ? 'scale(0.75)' : 'scale(1)',
                  transformOrigin: 'top left',
                  width: isMobile ? '133.33%' : '100%',
                  height: isMobile ? '133.33%' : '100%',
                }}
              />
            )}
          </div>

          {/* Footer Info */}
          <div
            className={`p-2 sm:p-3 border-t text-xs ${
              isDarkMode
                ? 'border-gray-600 text-gray-400'
                : 'border-gray-200 text-gray-500'
            }`}
          >
            <div
              className={`flex ${
                isMobile ? 'flex-col gap-1' : 'items-center justify-between'
              }`}
            >
              <span>Interactive preview • Click to play</span>
              <span className="break-all">{htmlPath}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkPreview;
