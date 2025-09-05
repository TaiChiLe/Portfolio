import React from 'react';

interface SkillCategory {
  name: string;
  skills: string[];
  icon: React.ReactNode;
  color: string;
}

interface SkillsPreviewProps {
  isDarkMode: boolean;
  showCategories?: boolean;
  layout?: 'grid' | 'list';
}

const SkillsPreview: React.FC<SkillsPreviewProps> = ({
  isDarkMode,
  showCategories = true,
  layout = 'grid',
}) => {
  const skillCategories: SkillCategory[] = [
    {
      name: 'Programming Languages',
      skills: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
      color: 'blue',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <polyline points="16,18 22,12 16,6" />
          <polyline points="8,6 2,12 8,18" />
        </svg>
      ),
    },
    {
      name: 'Frontend Technologies',
      skills: ['React.js', 'Tailwind CSS', 'Bootstrap'],
      color: 'green',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      name: 'Backend & Database',
      skills: ['Still learning...'],
      color: 'purple',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      name: 'Tools & DevOps',
      skills: ['Git', 'Docker', 'VS Code', 'Vite'],
      color: 'orange',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      name: 'Soft Skills',
      skills: [
        'Problem Solving',
        'Team Collaboration',
        'Communication',
        'Agile/Scrum',
      ],
      color: 'indigo',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  const getColorClasses = (color: string, isDarkMode: boolean) => {
    const colorMap = {
      blue: {
        bg: isDarkMode ? 'bg-blue-900' : 'bg-blue-100',
        text: isDarkMode ? 'text-blue-400' : 'text-blue-600',
        badge: isDarkMode
          ? 'bg-blue-800 text-blue-300'
          : 'bg-blue-200 text-blue-800',
      },
      green: {
        bg: isDarkMode ? 'bg-green-900' : 'bg-green-100',
        text: isDarkMode ? 'text-green-400' : 'text-green-600',
        badge: isDarkMode
          ? 'bg-green-800 text-green-300'
          : 'bg-green-200 text-green-800',
      },
      purple: {
        bg: isDarkMode ? 'bg-purple-900' : 'bg-purple-100',
        text: isDarkMode ? 'text-purple-400' : 'text-purple-600',
        badge: isDarkMode
          ? 'bg-purple-800 text-purple-300'
          : 'bg-purple-200 text-purple-800',
      },
      orange: {
        bg: isDarkMode ? 'bg-orange-900' : 'bg-orange-100',
        text: isDarkMode ? 'text-orange-400' : 'text-orange-600',
        badge: isDarkMode
          ? 'bg-orange-800 text-orange-300'
          : 'bg-orange-200 text-orange-800',
      },
      indigo: {
        bg: isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100',
        text: isDarkMode ? 'text-indigo-400' : 'text-indigo-600',
        badge: isDarkMode
          ? 'bg-indigo-800 text-indigo-300'
          : 'bg-indigo-200 text-indigo-800',
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  if (layout === 'list') {
    return (
      <div className="space-y-4">
        {skillCategories.map((category, categoryIndex) => {
          const colors = getColorClasses(category.color, isDarkMode);
          return (
            <div
              key={categoryIndex}
              className={`p-4 rounded ${
                isDarkMode
                  ? 'bg-gray-900 border-gray-600'
                  : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${colors.bg}`}>
                  <div className={colors.text}>{category.icon}</div>
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {category.skills.length} skills
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div
        className={`p-4 rounded-t ${
          isDarkMode
            ? 'bg-gray-900 border-gray-600'
            : 'bg-gray-50 border-gray-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-full ${
              isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'
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
                isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2
              className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Technical Skills
            </h2>
            <p
              className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Professional expertise across multiple technologies
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDarkMode
                ? 'bg-green-900 text-green-300'
                : 'bg-green-100 text-green-800'
            }`}
          >
            Intermediate Level
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      {showCategories ? (
        <div
          className={`p-4 rounded-b grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-600'
              : 'bg-white border-gray-300'
          }`}
        >
          {skillCategories.map((category, categoryIndex) => {
            const colors = getColorClasses(category.color, isDarkMode);
            return (
              <div
                key={categoryIndex}
                className={`p-3 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 rounded ${colors.bg}`}>
                    <div className={colors.text}>{category.icon}</div>
                  </div>
                  <h3
                    className={`font-semibold text-sm ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {category.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-2 py-1 rounded text-xs font-medium ${colors.badge}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className={`p-4 rounded-b ${
            isDarkMode
              ? 'bg-gray-800 border-gray-600'
              : 'bg-white border-gray-300'
          }`}
        >
          <div className="flex flex-wrap gap-2">
            {skillCategories
              .flatMap((category) => category.skills)
              .map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-300 border border-gray-600'
                      : 'bg-gray-100 text-gray-800 border border-gray-300'
                  }`}
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsPreview;
