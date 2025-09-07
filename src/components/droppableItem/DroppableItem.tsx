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
        <div className="flex items-center gap-2">
          <span className="pl-3">{item.label || item.type}</span>
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
                ? 'bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700 border border-slate-300'
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
