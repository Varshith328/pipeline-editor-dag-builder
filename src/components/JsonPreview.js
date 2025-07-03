import React from 'react';

const JsonPreview = ({ nodes, edges }) => {
  const dagStructure = {
    nodes: nodes.map(node => ({
      id: node.id,
      label: node.data.label,
      position: node.position
    })),
    edges: edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type
    })),
    metadata: {
      totalNodes: nodes.length,
      totalEdges: edges.length,
      lastUpdated: new Date().toISOString()
    }
  };

  return (
    <div className="json-preview">
      <h3>JSON Structure</h3>
      <pre>
        {JSON.stringify(dagStructure, null, 2)}
      </pre>
    </div>
  );
};

export default JsonPreview;