import React from 'react';

const ValidationPanel = ({ validationStatus }) => {
  const {
    isValid,
    hasMinNodes,
    hasNoCycles,
    allNodesConnected,
    hasNoSelfLoops,
    validDirections,
    cycleNodes,
    unconnectedNodes
  } = validationStatus;

  return (
    <div className="validation-panel">
      <h3>DAG Validation Status</h3>
      
      <div className={`validation-status ${isValid ? 'valid' : 'invalid'}`}>
        {isValid ? '✅ Valid DAG' : '❌ Invalid DAG'}
      </div>
      
      <div className="validation-details">
        <h4>Requirements:</h4>
        <ul>
          <li className={hasMinNodes ? 'valid' : 'invalid'}>
            At least 2 nodes
          </li>
          <li className={hasNoCycles ? 'valid' : 'invalid'}>
            No cycles
          </li>
          <li className={allNodesConnected ? 'valid' : 'invalid'}>
            All nodes connected
          </li>
          <li className={hasNoSelfLoops ? 'valid' : 'invalid'}>
            No self-loops
          </li>
          <li className={validDirections ? 'valid' : 'invalid'}>
            Valid edge directions
          </li>
        </ul>
        
        {cycleNodes && cycleNodes.length > 0 && (
          <div style={{ marginTop: '0.5rem', color: '#dc3545', fontSize: '0.8rem' }}>
            <strong>Cycle detected involving nodes:</strong> {cycleNodes.join(', ')}
          </div>
        )}
        
        {unconnectedNodes && unconnectedNodes.length > 0 && (
          <div style={{ marginTop: '0.5rem', color: '#dc3545', fontSize: '0.8rem' }}>
            <strong>Unconnected nodes:</strong> {unconnectedNodes.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationPanel;