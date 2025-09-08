import { useState, useCallback, useRef, useEffect } from 'react';
import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core';
import type {
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import DroppableItem from './components/droppableItem/DroppableItem';
import DroppableArea from './components/droppablearea/Area';
import PreviewArea from './components/preview/PreviewArea';
import Sidebar from './components/sidebar/Sidebar';

// Type definitions
interface SidebarItemType {
  id: string;
  label: string;
  baseType?: string; // The actual component type (e.g., 'work-item')
  projectData?: {
    projectName: string;
    htmlPath: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
  };
}

interface DroppedItem {
  id: string;
  type: string;
  label: string;
  children: DroppedItem[];
  projectData?: {
    projectName: string;
    htmlPath: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
  };
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isDarkMode: boolean;
}

// Simple ID generator
const generateId = (prefix = 'item'): string =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Simple modal component
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  isDarkMode,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg p-6 max-w-md w-full mx-4`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-700 text-gray-400'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Main skeleton app
function App() {
  // Core state
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isValidDrop, setIsValidDrop] = useState<boolean>(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [projectName, setProjectName] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Modal state
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<DroppedItem | null>(null);

  // Preview panel state
  const [previewHeight, setPreviewHeight] = useState<number>(
    Math.round(window.innerHeight * 0.3)
  );
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState<boolean>(false);

  // Resizing state
  const isResizingRef = useRef<boolean>(false);
  const lastYRef = useRef<number>(0);

  // Available items to drag from sidebar
  const sidebarItems: SidebarItemType[] = [
    { id: 'name-item', label: 'Name' },
    { id: 'occupation-item', label: 'Occupation' },
    { id: 'skills-item', label: 'Skills' },
    { id: 'contact-item', label: 'Contact' },
    {
      id: 'guess-my-number',
      label: 'Guess My Number',
      baseType: 'work-item',
      projectData: {
        projectName: 'Guess My Number!',
        htmlPath: '/Portfolio/projects/GuessMyNumber/guessMyNum.html',
        description:
          'An interactive number guessing game with score tracking and dynamic feedback',
        technologies: ['HTML', 'CSS', 'JavaScript'],
      },
    },
    {
      id: 'pig-game',
      label: 'Pig Game',
      baseType: 'work-item',
      projectData: {
        projectName: 'Pig Game',
        htmlPath: '/Portfolio/projects/PigGame/pigGame.html',
        description: 'A dice-based game where players race to reach 100 points',
        technologies: ['HTML', 'CSS', 'JavaScript'],
      },
    },
    {
      id: 'quiz-app',
      label: 'Quiz App',
      baseType: 'work-item',
      projectData: {
        projectName: 'Interactive Quiz',
        htmlPath: '/Portfolio/projects/QuizApp/quiz.html',
        description:
          'A dynamic quiz application with multiple choice questions',
        technologies: ['HTML', 'CSS', 'JavaScript'],
      },
    },
    {
      id: 'tindog',
      label: 'TinDog',
      baseType: 'work-item',
      projectData: {
        projectName: 'TinDog',
        htmlPath: '/Portfolio/projects/TinDog/index.html',
        description: 'A Tinder-like app for dogs - responsive landing page',
        technologies: ['HTML', 'CSS', 'Bootstrap'],
      },
    },
    {
      id: 'todo-app',
      label: 'Todo App',
      baseType: 'work-item',
      projectData: {
        projectName: 'Todo Manager',
        htmlPath: '/Portfolio/projects/ToDo/index.html',
        description: 'A task management app',
        technologies: ['HTML', 'CSS', 'JavaScript'],
      },
    },
    {
      id: 'profile-app',
      label: 'Profile Page',
      baseType: 'work-item',
      projectData: {
        projectName: 'Profile Page',
        htmlPath: '/Portfolio/projects/Profile/index.html',
        description:
          'A personal profile page showcasing professional information',
        technologies: ['HTML', 'CSS', 'JavaScript'],
      },
    },

    {
      id: 'vitalogy-app',
      label: 'Vitalogy Band',
      baseType: 'work-item',
      projectData: {
        projectName: 'Vitalogy Band Website',
        htmlPath: '/Portfolio/projects/Vitalogy/index.html',
        description:
          'A music band website featuring band members, tours, and gallery',
        technologies: ['HTML', 'CSS'],
      },
    },
    {
      id: 'moveit-app',
      label: 'MoveIt',
      baseType: 'work-item',
      projectData: {
        projectName: 'MoveIt Moving Services',
        htmlPath: '/Portfolio/projects/MoveIt/MoveIt.html',
        description:
          'A professional moving company website with responsive design and Bootstrap components',
        technologies: ['HTML', 'CSS', 'Bootstrap'],
      },
    },
  ];

  // Helper function to find item by ID
  const findItemById = useCallback(
    (items: DroppedItem[], itemId: string): DroppedItem | null => {
      for (const item of items) {
        if (item.id === itemId) return item;
        if (item.children && item.children.length > 0) {
          const found = findItemById(item.children, itemId);
          if (found) return found;
        }
      }
      return null;
    },
    []
  );

  // Helper function to remove item
  const removeItem = useCallback((itemId: string) => {
    const removeFromItems = (items: DroppedItem[]): DroppedItem[] => {
      return items.reduce((acc: DroppedItem[], item: DroppedItem) => {
        if (item.id === itemId) {
          return acc; // Skip this item
        }
        if (item.children && item.children.length > 0) {
          return [
            ...acc,
            { ...item, children: removeFromItems(item.children) },
          ];
        }
        return [...acc, item];
      }, []);
    };

    setDroppedItems((prev) => removeFromItems(prev));
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  }, []);

  // Handle drag start
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
    setIsValidDrop(true);
  }

  // Handle drag over for validation
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over || !active) {
      setIsValidDrop(true);
      return;
    }

    // Simple validation - you can customize this
    const isSidebarItem = sidebarItems.some((item) => item.id === active.id);

    if (isSidebarItem) {
      // Validate if sidebar item can be dropped here
      if (over.id === 'main-canvas') {
        setIsValidDrop(true);
      } else {
        // Check if dropping on existing item (you can add your own logic)
        setIsValidDrop(true);
      }
    } else {
      // Existing item being moved
      setIsValidDrop(true);
    }
  }

  // Handle drag end
  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;

    console.log('Drag ended:', { activeId: active.id, overId: over?.id });

    if (!over) return;

    const isSidebarItem = sidebarItems.some((item) => item.id === active.id);
    console.log('Is sidebar item:', isSidebarItem);

    if (isSidebarItem) {
      // Create new item from sidebar
      const sidebarItem = sidebarItems.find((item) => item.id === active.id);
      const newItem: DroppedItem = {
        id: generateId(),
        type: sidebarItem?.baseType || (active.id as string), // Use baseType if available, fallback to id
        label: sidebarItem?.label || 'Unknown',
        children: [],
        projectData: sidebarItem?.projectData, // Pass along project data
      };

      console.log('Created new item:', newItem);

      if (over.id === 'main-canvas') {
        // Drop on canvas
        console.log('Dropping on main canvas');
        setDroppedItems((prev) => {
          const updated = [...prev, newItem];
          console.log('Updated droppedItems:', updated);
          return updated;
        });
      } else {
        // Drop on existing item (you can implement nesting logic here)
        console.log('Dropping on existing item');
        setDroppedItems((prev) => [...prev, newItem]);
      }
    } else {
      // Handle moving existing items (you can implement reordering logic here)
      console.log('Moving existing item:', active.id, 'to:', over.id);
    }
  }

  // Handle item selection
  const handleSelectItem = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    const isMeta = e.metaKey || e.ctrlKey;

    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (isMeta) {
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
      } else {
        newSet.clear();
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  // Handle edit item
  const handleEditItem = useCallback(
    (itemId: string) => {
      const item = findItemById(droppedItems, itemId);
      if (item) {
        setEditingItem({ ...item });
        setShowEditModal(true);
      }
    },
    [droppedItems, findItemById]
  );

  // Handle save edit
  const handleSaveEdit = useCallback(() => {
    if (!editingItem) return;

    const updateItemInArray = (items: DroppedItem[]): DroppedItem[] => {
      return items.map((item: DroppedItem) => {
        if (item.id === editingItem.id) {
          return editingItem;
        }
        if (item.children && item.children.length > 0) {
          return { ...item, children: updateItemInArray(item.children) };
        }
        return item;
      });
    };

    setDroppedItems((prev) => updateItemInArray(prev));
    setShowEditModal(false);
    setEditingItem(null);
  }, [editingItem]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  // Fill profile with all sidebar items
  const fillProfile = useCallback(() => {
    const newItems: DroppedItem[] = sidebarItems.map((sidebarItem) => ({
      id: generateId(),
      type: sidebarItem.baseType || sidebarItem.id,
      label: sidebarItem.label,
      children: [],
      projectData: sidebarItem.projectData,
    }));

    setDroppedItems(newItems);
  }, [sidebarItems]);

  // Preview panel resize handlers
  const startResize = useCallback(
    (e: React.MouseEvent) => {
      if (isPreviewCollapsed) return;
      isResizingRef.current = true;
      lastYRef.current = e.clientY;
      document.body.style.userSelect = 'none';
    },
    [isPreviewCollapsed]
  );

  const stopResize = useCallback(() => {
    if (isResizingRef.current) {
      isResizingRef.current = false;
      document.body.style.userSelect = '';
    }
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current) return;
    const delta = lastYRef.current - e.clientY;
    lastYRef.current = e.clientY;
    setPreviewHeight((h) => {
      const next = h + delta;
      return Math.min(Math.max(next, 120), window.innerHeight - 220);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopResize);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [onMouseMove, stopResize]);

  // Clamp height on window resize
  useEffect(() => {
    const onResize = () => {
      setPreviewHeight((h) =>
        Math.min(Math.max(h, 120), window.innerHeight - 220)
      );
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Debug: Log droppedItems changes
  useEffect(() => {
    console.log('DroppedItems changed:', droppedItems);
  }, [droppedItems]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-fill profile on mobile
  useEffect(() => {
    if (isMobile && droppedItems.length === 0) {
      fillProfile();
    }
  }, [isMobile, droppedItems.length, fillProfile]);

  // Mobile fullscreen preview
  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 w-screen h-screen ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <PreviewArea
          height={window.innerHeight}
          collapsed={false}
          onToggleCollapse={() => {}}
          isDarkMode={isDarkMode}
          droppedItems={droppedItems}
        />
      </div>
    );
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      <div
        className={`flex flex-col h-screen w-screen m-0 p-0 overflow-hidden fixed top-0 left-0 ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {/* Header */}
        <div
          className={`px-4 py-2 border-b ${
            isDarkMode
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-300 bg-gray-50'
          } flex-shrink-0 flex justify-between items-center w-full`}
        >
          <div className="flex-1 justify-start">
            <h1
              className={`m-0 text-2xl font-bold inline-block px-14 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-blue-300 border border-slate-600'
                  : 'bg-gradient-to-r from-slate-100 to-blue-200 text-slate-800 border border-blue-200'
              }`}
            >
              Tyson Le
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              Project Name:
            </span>
            <input
              type="text"
              value={projectName || 'Portfolio'}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Untitled Project"
              className={`text-base px-3 py-1 border ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500'
                  : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-400'
              } rounded focus:outline-none focus:ring-2 min-w-[200px]`}
            />
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
            {/* Dark Mode Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`absolute top-[2px] left-[2px] ${
                    isDarkMode ? 'bg-gray-200' : 'bg-white'
                  } border rounded-full h-5 w-5 transition-transform ${
                    isDarkMode ? 'translate-x-full' : 'translate-x-0'
                  }`}
                ></div>
              </div>
              <span className="ml-2 text-sm">Dark Mode</span>
            </label>

            {/* Action Buttons */}
            <button
              onClick={() => setDroppedItems([])}
              disabled={droppedItems.length === 0}
              className={`px-3 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700 border border-slate-300'
              }`}
            >
              Clear All
            </button>
          </div>
        </div>

        <div
          className="flex flex-1 w-full overflow-hidden"
          style={{ height: `calc(100vh - ${previewHeight + 56}px)` }}
        >
          {/* Sidebar */}
          <Sidebar isDarkMode={isDarkMode} isValidDrop={isValidDrop} />

          {/* Main Canvas */}
          <div
            className={`flex-1 p-4 overflow-auto h-full w-auto relative ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            {/* Floating Toolbar */}
            <div
              className={`sticky top-0 z-10 mb-4 ${
                isDarkMode
                  ? 'bg-gray-800/50 border-gray-600'
                  : 'bg-white/50 border-gray-200'
              } backdrop-blur-sm border rounded-lg shadow-lg px-4 py-1.5`}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={fillProfile}
                  className={`px-3 py-1.5 text-xs rounded border ${
                    isDarkMode
                      ? 'bg-blue-700 hover:bg-blue-600 border-blue-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 border-blue-400 text-white'
                  } transition-colors`}
                >
                  Fill Profile
                </button>
              </div>
            </div>

            <DroppableArea
              id="main-canvas"
              isDarkMode={isDarkMode}
              onBackgroundClick={clearSelection}
            >
              {droppedItems.length === 0 ? (
                <p
                  className={`text-center text-lg ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  } my-10`}
                >
                  Drag items here to start building!
                </p>
              ) : (
                <div className="pb-24">
                  {droppedItems.map((item) => (
                    <DroppableItem
                      key={item.id}
                      item={item}
                      onEdit={handleEditItem}
                      onRemove={removeItem}
                      isDarkMode={isDarkMode}
                      isSelected={selectedIds.has(item.id)}
                      onClick={handleSelectItem}
                    />
                  ))}
                </div>
              )}
            </DroppableArea>
          </div>
        </div>

        {/* Resize Handle & Preview Section */}
        <div className="relative w-full flex-shrink-0">
          {/* Drag handle */}
          <div
            onMouseDown={startResize}
            className={`absolute -top-1 left-0 right-0 h-2 cursor-row-resize group z-20 flex items-center justify-center ${
              isPreviewCollapsed ? 'pointer-events-none opacity-0' : ''
            }`}
          >
            <div
              className={`w-40 h-1 rounded transition-colors ${
                isDarkMode
                  ? 'bg-gray-600 group-hover:bg-gray-500'
                  : 'bg-gray-400 group-hover:bg-gray-600'
              }`}
            />
          </div>

          <PreviewArea
            height={previewHeight}
            collapsed={isPreviewCollapsed}
            onToggleCollapse={() => setIsPreviewCollapsed((c) => !c)}
            isDarkMode={isDarkMode}
            droppedItems={droppedItems}
          />
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay className="z-[1000]">
        {activeId ? (
          <div
            className={`p-2.5 my-1 border rounded text-sm shadow-2xl opacity-90 ${
              isValidDrop === false
                ? isDarkMode
                  ? 'bg-red-900 border-red-600 text-red-300'
                  : 'bg-red-50 border-red-300 text-red-700'
                : isDarkMode
                ? 'bg-gradient-to-r from-slate-800 to-blue-900 border-blue-500 text-blue-200'
                : 'bg-gradient-to-r from-blue-50 to-slate-100 border-blue-300 text-slate-800'
            }`}
          >
            {sidebarItems.find((item) => item.id === activeId)?.label ||
              'Dragging...'}
          </div>
        ) : null}
      </DragOverlay>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingItem(null);
        }}
        title="Edit Item"
        isDarkMode={isDarkMode}
      >
        {editingItem && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Label:</label>
              <input
                type="text"
                value={editingItem.label || ''}
                onChange={(e) =>
                  setEditingItem((prev) =>
                    prev ? { ...prev, label: e.target.value } : prev
                  )
                }
                className={`w-full px-3 py-2 border rounded ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingItem(null);
                }}
                className={`px-4 py-2 border rounded transition-colors ${
                  isDarkMode
                    ? 'border-gray-600 hover:bg-gray-700 text-gray-200'
                    : 'border-gray-300 hover:bg-gray-50 text-gray-900'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DndContext>
  );
}

export default App;
