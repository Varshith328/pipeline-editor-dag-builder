import { useEffect } from 'react';

export const useKeyboard = (callbacks) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent default behavior for handled keys
      const handledKeys = ['Delete', 'Backspace', 'Escape', 'Enter'];
      
      if (handledKeys.includes(event.key)) {
        event.preventDefault();
      }

      // Handle specific key combinations
      switch (event.key) {
        case 'Delete':
        case 'Backspace':
          if (callbacks.onDelete) {
            callbacks.onDelete();
          }
          break;
          
        case 'Escape':
          if (callbacks.onEscape) {
            callbacks.onEscape();
          }
          break;
          
        case 'Enter':
          if (callbacks.onEnter) {
            callbacks.onEnter();
          }
          break;
          
        case 'a':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            if (callbacks.onSelectAll) {
              callbacks.onSelectAll();
            }
          }
          break;
          
        case 'z':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            if (event.shiftKey && callbacks.onRedo) {
              callbacks.onRedo();
            } else if (callbacks.onUndo) {
              callbacks.onUndo();
            }
          }
          break;
          
        case 'c':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            if (callbacks.onCopy) {
              callbacks.onCopy();
            }
          }
          break;
          
        case 'v':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            if (callbacks.onPaste) {
              callbacks.onPaste();
            }
          }
          break;
          
        case 'l':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            if (callbacks.onAutoLayout) {
              callbacks.onAutoLayout();
            }
          }
          break;
          
        default:
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callbacks]);
};