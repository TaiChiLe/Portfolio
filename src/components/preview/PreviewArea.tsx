import NamePreview from './NamePreview';
import OccupationItem from './OccupationItem';

// Type definitions
interface DroppedItem {
  id: string;
  type: string;
  label: string;
  children: DroppedItem[];
}

interface PreviewAreaProps {
  height: number;
  collapsed: boolean;
  onToggleCollapse: () => void;
  isDarkMode: boolean;
  droppedItems: DroppedItem[];
}

// Resizable preview panel component
const PreviewArea = ({
  height,
  collapsed,
  onToggleCollapse,
  isDarkMode,
  droppedItems,
}: PreviewAreaProps) => {
  // Function to render preview based on item type
  const renderItemPreview = (item: DroppedItem) => {
    switch (item.type) {
      case 'name-item':
        return (
          <NamePreview
            key={item.id}
            isDarkMode={isDarkMode}
            name={item.label}
          />
        );
      case 'occupation-item':
        return (
          <OccupationItem
            key={item.id}
            isDarkMode={isDarkMode}
            showDetails={true}
          />
        );
      default:
        return (
          <div
            key={item.id}
            className={`p-3 mb-2 rounded border ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gray-100 border-gray-300'
            }`}
          >
            <span
              className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {item.type} - {item.label}
            </span>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative w-full flex-shrink-0 ${collapsed ? 'h-9' : ''} ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-gray-50 border-gray-300'
      } border-t`}
      style={{ height: collapsed ? 36 : height }}
    >
      {/* Toggle button */}
      <button
        onClick={onToggleCollapse}
        className={`absolute top-2 right-2 z-20 px-2 py-1 text-xs rounded ${
          isDarkMode
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            : 'bg-white hover:bg-gray-100 text-gray-800'
        } border transition-colors`}
      >
        {collapsed ? 'Show Preview' : 'Hide Preview'}
      </button>

      {!collapsed && (
        <div className="p-4 h-full overflow-auto">
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Live Preview
          </h3>

          {droppedItems.length === 0 ? (
            <div
              className={`text-center py-8 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <p>No components to preview</p>
              <p className="text-sm mt-1">
                Drag components to the canvas to see their preview here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`p-6 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                } shadow-sm`}
              >
                {droppedItems.map((item) => renderItemPreview(item))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PreviewArea;
