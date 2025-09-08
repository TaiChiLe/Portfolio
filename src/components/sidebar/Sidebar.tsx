import CollapsibleCategory from './CollapsibleCategory';
import Name from '../draggableItem.tsx/Name';
import Occupation from '../draggableItem.tsx/Occupation';
import Skills from '../draggableItem.tsx/Skills';
import Contact from '../draggableItem.tsx/Contact';
import DraggableItem from '../draggableItem.tsx/DraggableItem';

interface SidebarProps {
  isDarkMode: boolean;
  isValidDrop: boolean;
}

export default function Sidebar({ isDarkMode, isValidDrop }: SidebarProps) {
  // Project items configuration
  const projectItems = [
    {
      id: 'guess-my-number',
      label: 'Guess My Number',
      icon: (
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
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      id: 'pig-game',
      label: 'Pig Game',
      icon: (
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
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6" />
          <path d="m15.5 8.5 4.24-4.24M4.26 19.74l4.24-4.24M8.5 15.5l-4.24 4.24M19.74 4.26l-4.24 4.24" />
        </svg>
      ),
    },
    {
      id: 'quiz-app',
      label: 'Quiz App',
      icon: (
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
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 'tindog',
      label: 'TinDog',
      icon: (
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
          <path d="M8 19c0-5.5-2.007-10.114-4.5-12.5A1.5 1.5 0 0 1 5.5 5.5c0 1.5.5 4 2.5 5.5 1.281.781 2.5.781 2.5.781s1.219 0 2.5-.781c2-1.5 2.5-4 2.5-5.5a1.5 1.5 0 0 1 2 1c-2.493 2.386-4.5 7-4.5 12.5a3 3 0 0 1-6 0z" />
        </svg>
      ),
    },
    {
      id: 'todo-app',
      label: 'Todo App',
      icon: (
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
          <path d="M9 11H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h5m-7-8V9a2 2 0 0 1 2-2h3m2 8h10a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H12m0 7V9a2 2 0 0 1 2-2h3" />
        </svg>
      ),
    },
    {
      id: 'profile-app',
      label: 'Profile Page',
      icon: (
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'vitalogy-app',
      label: 'Vitalogy Band',
      icon: (
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
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4M19 17v4M3 5h4M17 19h4" />
        </svg>
      ),
    },
    {
      id: 'moveit-app',
      label: 'MoveIt',
      icon: (
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
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`w-64 min-w-64 p-4 relative ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-gray-100 border-gray-300'
      } border-r overflow-x-hidden overflow-y-auto h-full`}
    >
      {/* Blue accent border */}
      <div
        className={`absolute top-0 right-0 bottom-0 w-0.5 ${
          isDarkMode
            ? 'bg-gradient-to-b from-transparent via-blue-500 to-transparent'
            : 'bg-gradient-to-b from-transparent via-blue-400 to-transparent'
        }`}
      />

      <div className="overflow-hidden">
        {/* Profile Components Category */}
        <CollapsibleCategory
          title="Profile"
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
        {/* Projects Category */}
        <CollapsibleCategory
          title="Projects"
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
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11z" />
            </svg>
          }
        >
          {projectItems.map((project) => (
            <div key={project.id} className="mb-2">
              <DraggableItem
                id={project.id}
                isValidDrop={isValidDrop}
                isDarkMode={isDarkMode}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {project.icon}
                  </span>
                  <span>{project.label}</span>
                </span>
              </DraggableItem>
            </div>
          ))}
        </CollapsibleCategory>
      </div>
    </div>
  );
}
