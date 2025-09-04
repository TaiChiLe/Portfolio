import DraggableItem from './DraggableItem';

interface NameProps {
  isValidDrop: boolean;
  isDarkMode: boolean;
}
export default function Name(props: NameProps) {
  const { isValidDrop, isDarkMode } = props;

  return (
    <div className="mb-2">
      <DraggableItem
        id="name-item"
        isValidDrop={isValidDrop}
        isDarkMode={isDarkMode}
      >
        <span className="inline-flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Name</span>
        </span>
      </DraggableItem>
    </div>
  );
}
