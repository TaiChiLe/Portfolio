import React, { useState, useEffect } from 'react';

interface AppPreviewProps {
  isDarkMode: boolean;
  projectName: string;
  technologies: string[];
  problem: string;
  solution: string;
  githubUrl?: string;
  demoUrl?: string;
  images?: string[];
  status?:
    | 'In Development'
    | 'Completed'
    | 'Paused'
    | 'Planning'
    | 'Prototype Completed';
}

const AppPreview: React.FC<AppPreviewProps> = ({
  isDarkMode,
  projectName,
  technologies,
  problem,
  solution,
  githubUrl,
  demoUrl,
  images = [],
  status = 'In Development',
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getTechColor = (tech: string) => {
    const colors = {
      HTML: 'orange',
      CSS: 'blue',
      JavaScript: 'yellow',
      React: 'cyan',
      TypeScript: 'blue',
      Vue: 'green',
      Angular: 'red',
      'Node.js': 'green',
      Python: 'blue',
      Java: 'orange',
      'C#': 'green',
      MongoDB: 'green',
      PostgreSQL: 'blue',
      MySQL: 'blue',
      Firebase: 'orange',
      AWS: 'orange',
      Docker: 'blue',
      Kubernetes: 'blue',
      'Next.js': 'blue',
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
      purple: isDarkMode
        ? 'bg-purple-900 text-purple-300'
        : 'bg-purple-100 text-purple-800',
      gray: isDarkMode
        ? 'bg-gray-700 text-gray-300'
        : 'bg-gray-200 text-gray-700',
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const getStatusColor = (status: string, isDarkMode: boolean) => {
    const statusColors = {
      'Prototype Completed': isDarkMode
        ? 'bg-purple-900 text-purple-300'
        : 'bg-purple-100 text-purple-800',
      'In Development': isDarkMode
        ? 'bg-blue-900 text-blue-300'
        : 'bg-blue-100 text-blue-800',
      Completed: isDarkMode
        ? 'bg-green-900 text-green-300'
        : 'bg-green-100 text-green-800',
      Paused: isDarkMode
        ? 'bg-yellow-900 text-yellow-300'
        : 'bg-yellow-100 text-yellow-800',
      Planning: isDarkMode
        ? 'bg-purple-900 text-purple-300'
        : 'bg-purple-100 text-purple-800',
    };
    return statusColors[status as keyof typeof statusColors];
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Header */}
      <div
        className={`p-4 rounded-t ${
          isDarkMode
            ? 'bg-gray-900 border-gray-600'
            : 'bg-gray-50 border-gray-300'
        }`}
      >
        <div className={`flex ${isMobile ? 'flex-col' : 'items-start'} gap-4`}>
          {/* Project Icon */}
          <div
            className={`p-3 rounded-full ${
              isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'
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
              className={`w-6 h-6 ${
                isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>

          <div className={`flex-1 ${isMobile ? 'w-full' : ''}`}>
            <div className="flex items-center gap-3 mb-2">
              <h2
                className={`text-xl sm:text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {projectName}
              </h2>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  status,
                  isDarkMode
                )}`}
              >
                {status}
              </span>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-sm font-medium ${getTechBadgeClass(
                    tech,
                    isDarkMode
                  )}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex gap-3">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                  title="View on GitHub"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                    isDarkMode
                      ? 'bg-blue-900 hover:bg-blue-800 text-blue-300'
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                  }`}
                  title="View Demo"
                >
                  <svg
                    className="w-4 h-4"
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
                  Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        className={`rounded-b ${
          isDarkMode
            ? 'bg-gray-800 border-gray-600'
            : 'bg-white border-gray-300'
        }`}
      >
        {/* Images Section */}
        {images.length > 0 && (
          <div className="relative">
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt={`${projectName} screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                      isDarkMode
                        ? 'bg-gray-900 bg-opacity-75 text-white hover:bg-opacity-90'
                        : 'bg-white bg-opacity-75 text-gray-900 hover:bg-opacity-90'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={nextImage}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                      isDarkMode
                        ? 'bg-gray-900 bg-opacity-75 text-white hover:bg-opacity-90'
                        : 'bg-white bg-opacity-75 text-gray-900 hover:bg-opacity-90'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex
                            ? 'bg-white'
                            : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Problem & Solution */}
        <div className="p-6">
          <div
            className={`grid ${
              isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-8'
            }`}
          >
            {/* Problem */}
            <div>
              <h3
                className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}
              >
                <svg
                  className="w-5 h-5"
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
                Problem
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {problem}
              </p>
            </div>

            {/* Solution */}
            <div>
              <h3
                className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Solution
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {solution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPreview;
