import DraggableItem from "../draggableItem.tsx/DraggableItem";

interface SkillsProps {
  isValidDrop: boolean;
  isDarkMode: boolean;
  label?: string;
}

export default function Work(props: SkillsProps) {
  const { isValidDrop, isDarkMode } = props;

  return (
    <div className="mb-2">
      <DraggableItem
        id="work-item"
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
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>{props.label || "Work"}</span>
        </span>
      </DraggableItem>
    </div>
  );
}
