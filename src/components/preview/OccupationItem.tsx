import React, { useState, useEffect } from 'react';

interface OccupationItemProps {
  isDarkMode: boolean;
  occupation?: string;
  company?: string;
  location?: string;
  showDetails?: boolean;
  tenure?: string;
}

const OccupationItem: React.FC<OccupationItemProps> = ({ isDarkMode }) => {
  const occupationItems = [
    {
      isDarkMode,
      occupation: 'Customer Support Analyst II',
      company: 'Meddbase',
      location: 'Hybrid',
      tenure: 'Oct 2024 - Present',
      showDetails: true,
    },
    {
      isDarkMode,
      occupation: 'Developer',
      company: 'Cleventek',
      location: 'Freelance',
      tenure: 'Apr 2024 - Present',
      showDetails: true,
    },
  ];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {occupationItems.map((item, index) => (
        <div key={index}>
          {/* Live Preview */}
          <div className="mb-1">
            <div
              className={`p-4 rounded ${
                isDarkMode
                  ? 'bg-gray-900 border-gray-600'
                  : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div
                className={`flex ${
                  isMobile ? 'flex-col' : 'items-center'
                } gap-3`}
              >
                {/* Top row on mobile: Icon + Title + Badge */}
                <div
                  className={`flex items-center gap-3 ${
                    isMobile ? 'w-full' : 'flex-1'
                  }`}
                >
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

                  <div className="flex-1 min-w-0">
                    <h2
                      className={`text-lg sm:text-xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      } ${isMobile ? 'text-base' : ''}`}
                    >
                      {item.occupation}
                    </h2>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                      isDarkMode
                        ? 'bg-green-900 text-green-300'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    Active
                  </div>
                </div>

                {/* Details section */}
                {item.showDetails && (
                  <div
                    className={`text-sm ${
                      isMobile ? 'w-full pl-12' : 'flex-1'
                    } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    <span className="font-medium">{item.company}</span>
                    {item.location && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{item.location}</span>
                      </>
                    )}
                    {item.tenure && (
                      <>
                        <span className={`${isMobile ? 'block' : 'mx-2'}`}>
                          {isMobile ? '' : '•'}
                        </span>
                        <span>{item.tenure}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OccupationItem;
