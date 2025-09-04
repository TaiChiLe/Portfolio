import CollapsibleCategory from "./CollapsibleCategory";
import Name from "../draggableItem.tsx/Name";
import Occupation from "../draggableItem.tsx/Occupation";
import Skills from "../draggableItem.tsx/Skills";
import Contact from "../draggableItem.tsx/Contact";

interface SidebarProps {
  isDarkMode: boolean;
  isValidDrop: boolean;
}

export default function Sidebar({ isDarkMode, isValidDrop }: SidebarProps) {
  return (
    <div
      className={`w-64 min-w-64 p-4 ${
        isDarkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-gray-100 border-gray-300"
      } border-r overflow-x-hidden overflow-y-auto h-full`}
    >
      <div className="overflow-hidden">
        {/* Profile Components Category */}
        <CollapsibleCategory
          title="Profile Components"
          isDarkMode={isDarkMode}
          isExpanded={true}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        >
          <Name isDarkMode={isDarkMode} isValidDrop={isValidDrop} />
          <Occupation isDarkMode={isDarkMode} isValidDrop={isValidDrop} />
          <Skills isDarkMode={isDarkMode} isValidDrop={isValidDrop} />
          <Contact isDarkMode={isDarkMode} isValidDrop={isValidDrop} />
        </CollapsibleCategory>
      </div>
    </div>
  );
}
