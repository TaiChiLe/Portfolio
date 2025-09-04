import { useDraggable, useDroppable } from '@dnd-kit/core';

// Type definitions
interface DroppedItem {
  id: string;
  type: string;
  label: string;
  children: DroppedItem[];
}

interface DroppableItemProps {
  item: DroppedItem;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  isDarkMode: boolean;
  isSelected: boolean;
  onClick: (e: React.MouseEvent, id: string) => void;
}

export default function DroppableItem({
  item,
  onEdit,
  onRemove,
  isDarkMode,
  isSelected,
  onClick,
}: DroppableItemProps) {
  // Draggable functionality
  const {
    attributes,
    listeners,
    setNodeRef: dragRef,
    transform,
    isDragging,
  } = useDraggable({
    id: item.id,
    data: {
      type: item.type,
      item: item,
    },
  });

  // Droppable functionality
  const { setNodeRef: dropRef, isOver } = useDroppable({
    id: item.id,
    data: {
      type: item.type,
      accepts: ['question', 'text', 'form-element', 'container'],
    },
  });

  const transformStyle = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined;

  // Combine refs for both drag and drop
  const setRefs = (element: HTMLDivElement | null) => {
    dragRef(element);
    dropRef(element);
  };

  // Get styling based on state
  const getContainerStyles = () => {
    const baseStyles = 'p-3 m-2 border rounded cursor-pointer transition-all';

    const dragStyles = isDragging ? 'opacity-50 z-50' : 'opacity-100';

    const dropStyles = isOver
      ? isDarkMode
        ? 'border-blue-400 bg-blue-900/30'
        : 'border-blue-400 bg-blue-50'
      : '';

    const selectedStyles = isSelected
      ? isDarkMode
        ? 'border-green-400 bg-green-900/30'
        : 'border-green-400 bg-green-50'
      : '';

    const themeStyles = isDarkMode
      ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-200'
      : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-900';

    return `${baseStyles} ${dragStyles} ${dropStyles} ${selectedStyles} ${themeStyles}`;
  };

  return (
    <div
      ref={setRefs}
      id={item.id}
      onClick={(e) => onClick(e, item.id)}
      className={getContainerStyles()}
      style={{ transform: transformStyle }}
      {...attributes}
    >
      <div className="flex justify-between items-center">
        {/* Drag handle and content */}
        <div className="flex items-center gap-2">
          <button
            {...listeners}
            className={`
              p-1 rounded cursor-grab active:cursor-grabbing
              ${
                isDarkMode
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }
            `}
            aria-label="Drag handle"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 6h2v2H8V6zm6 0h2v2h-2V6zM8 10h2v2H8v-2zm6 0h2v2h-2v-2zM8 14h2v2H8v-2zm6 0h2v2h-2v-2z" />
            </svg>
          </button>
          <span>{item.label || item.type}</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              isDarkMode
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Render children if any */}
      {item.children && item.children.length > 0 && (
        <div className="ml-4 mt-2">
          {item.children.map((child: DroppedItem) => (
            <DroppableItem
              key={child.id}
              item={child}
              onEdit={onEdit}
              onRemove={onRemove}
              isDarkMode={isDarkMode}
              isSelected={false}
              onClick={onClick}
            />
          ))}
        </div>
      )}

      {/* Drop indicator when over */}
      {isOver && (
        <div
          className={`
          absolute inset-0 border-2 border-dashed rounded-lg pointer-events-none
          ${isDarkMode ? 'border-blue-400' : 'border-blue-500'}
        `}
        />
      )}
    </div>
  );
}
