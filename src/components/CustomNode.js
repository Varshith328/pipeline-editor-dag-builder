import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data, selected }) => {
  return (
    <div className={`custom-node ${selected ? 'selected' : ''}`}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ left: -6 }}
        isConnectable={true}
      />
      
      <div className="node-label">
        {data.label}
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        style={{ right: -6 }}
        isConnectable={true}
      />
    </div>
  );
};

export default CustomNode;