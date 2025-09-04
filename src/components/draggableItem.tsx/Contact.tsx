import DraggableItem from "../draggableItem.tsx/DraggableItem";

interface ContactProps {
  isValidDrop: boolean;
  isDarkMode: boolean;
}

export default function Contact(props: ContactProps) {
  const { isValidDrop, isDarkMode } = props;

  return (
    <div className="mb-2">
      <DraggableItem
        id="contact-item"
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
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span>Contact</span>
        </span>
      </DraggableItem>
    </div>
  );
}
