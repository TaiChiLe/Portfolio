import React from 'react';

interface OccupationItemProps {
  isDarkMode: boolean;
  occupation?: string;
  company?: string;
  location?: string;
  showDetails?: boolean;
  tenure?: string;
}

const OccupationItem: React.FC<OccupationItemProps> = ({
  isDarkMode,
  occupation = 'Customer Support Analyst II',
  company = 'Meddbase',
  location = 'Hybrid',
  tenure = 'Oct 2024 - Present',
  showDetails = true,
}) => {
  return (
    <div>
      {/* Live Preview */}
      <div className="mb-1">
        <div
          className={`p-4 rounded ${
            isDarkMode
              ? 'bg-gray-900 border-gray-600'
              : 'bg-gray-50 border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Professional Icon */}
            <div
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}
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
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>

            <div className="flex-1">
              <h2
                className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {occupation}
              </h2>

              {showDetails && (
                <div
                  className={`text-sm mt-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <span className="font-medium">{company}</span>
                  {location && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{location}</span>
                    </>
                  )}
                  {tenure && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{tenure}</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isDarkMode
                  ? 'bg-green-900 text-green-300'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupationItem;
