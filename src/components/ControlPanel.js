import React from 'react';

const ControlPanel = ({ 
  onAddNode, 
  onLayout, 
  onDelete, 
  onToggleJsonPreview, 
  hasSelectedElements 
}) => {
  return (
    <div className="control-panel">
      <button 
        className="control-btn btn-primary" 
        onClick={onAddNode}
        title="Add a new node to the pipeline"
      >
        ➕ Add Node
      </button>
      
      <button 
        className="control-btn btn-secondary" 
        onClick={onLayout}
        title="Auto-arrange nodes in a clean layout"
      >
        🔄 Auto Layout
      </button>
      
      <button 
        className="control-btn btn-danger" 
        onClick={onDelete}
        disabled={!hasSelectedElements}
        title="Delete selected nodes/edges (or press Delete key)"
      >
        🗑️ Delete
      </button>
      
      <button 
        className="control-btn btn-info" 
        onClick={onToggleJsonPreview}
        title="Toggle JSON structure preview"
      >
        📋 JSON Preview
      </button>
      
      <div className="help-text" style={{ marginLeft: '1rem', color: '#666', fontSize: '0.85rem' }}>
        💡 Press Delete key to remove selected elements
      </div>
    </div>
  );
};

export default ControlPanel;