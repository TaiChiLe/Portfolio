import { useState, Children } from 'react';

interface CollapsibleCategoryProps {
  title: string;
  isExpanded?: boolean;
  isDarkMode: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  showCount?: boolean;
  shortcutKey?: string;
}

export default function CollapsibleCategory({
  title,
  isExpanded = true,
  isDarkMode,
  children,
  icon,
  showCount = true,
  shortcutKey,
}: CollapsibleCategoryProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Count the number of children components
  const childCount = Children.count(children);

  return (
    <div className="mb-3">
      {/* Category Header */}
      <button
        onClick={toggleExpanded}
        title={
          shortcutKey
            ? `Toggle ${title} (Ctrl+${shortcutKey.toUpperCase()})`
            : `Toggle ${title}`
        }
        className={`w-full flex items-center justify-between p-2 rounded transition-colors ${
          isDarkMode
            ? 'bg-[#60a8f9] hover:bg-blue-600 text-white'
            : 'bg-[#60a8f9] hover:bg-blue-600 text-white'
        }`}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="w-4 h-4">{icon}</span>}
          <span className="font-medium text-sm">{title}</span>
          {showCount && childCount > 0 && (
            <span
              className={`px-1.5 py-0.5 text-xs rounded-full ${
                isDarkMode
                  ? 'bg-gray-600 text-gray-300'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {childCount}
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            expanded ? 'rotate-90' : 'rotate-0'
          } text-white-500`}
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

      {/* Category Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-2 pl-2">{children}</div>
      </div>
    </div>
  );
}
