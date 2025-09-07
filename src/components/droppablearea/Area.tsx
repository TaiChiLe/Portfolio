import { useDroppable } from '@dnd-kit/core';

interface DroppableAreaProps {
  id: string;
  children: React.ReactNode;
  isDarkMode: boolean;
  onBackgroundClick: () => void;
}

// Droppable canvas area
const DroppableArea = ({
  id,
  children,
  isDarkMode,
  onBackgroundClick,
}: DroppableAreaProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      id={id}
      onClick={onBackgroundClick}
      className={`min-h-full w-full p-4 border-2 border-dashed rounded-lg transition-colors ${
        isOver
          ? isDarkMode
            ? 'border-blue-400 bg-blue-900/30'
            : 'border-blue-400 bg-blue-50'
          : isDarkMode
          ? 'border-gray-600 bg-gray-800/20'
          : 'border-gray-300 bg-gray-200/20'
      }`}
    >
      {children}
    </div>
  );
};

export default DroppableArea;
