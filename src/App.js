import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './components/CustomNode';
import ControlPanel from './components/ControlPanel';
import ValidationPanel from './components/ValidationPanel';
import JsonPreview from './components/JsonPreview';
import { validateDAG } from './utils/dagValidation';
import { getLayoutedElements } from './utils/autoLayout';
import './App.css';

const nodeTypes = {
  customNode: CustomNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    position: { x: 250, y: 50 },
    data: { label: 'Start Node' },
  },
  {
    id: '2',
    type: 'customNode',
    position: { x: 250, y: 200 },
    data: { label: 'End Node' },
  },
];

const initialEdges = [];

function PipelineEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [validationStatus, setValidationStatus] = useState({});
  const [selectedElements, setSelectedElements] = useState([]);
  const [isJsonPreviewOpen, setIsJsonPreviewOpen] = useState(false);
  const { fitView } = useReactFlow();

  // Handle new connections
  const onConnect = useCallback((params) => {
    // Prevent self-connections
    if (params.source === params.target) {
      alert('Self-connections are not allowed!');
      return;
    }

    // Check for duplicate connections
    const existingEdge = edges.find(
      edge => edge.source === params.source && edge.target === params.target
    );
    if (existingEdge) {
      alert('Connection already exists!');
      return;
    }

    setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds));
  }, [edges, setEdges]);

  // Add new node
  const addNode = useCallback(() => {
    const nodeName = prompt('Enter node name:');
    if (nodeName && nodeName.trim()) {
      const newNode = {
        id: `node_${Date.now()}`,
        type: 'customNode',
        position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
        data: { label: nodeName.trim() },
      };
      setNodes((nds) => [...nds, newNode]);
    }
  }, [setNodes]);

  // Delete selected elements
  const deleteSelectedElements = useCallback(() => {
    const selectedNodes = selectedElements.filter(el => el.type === 'node');
    const selectedEdges = selectedElements.filter(el => el.type === 'edge');
    
    if (selectedNodes.length > 0) {
      const nodeIds = selectedNodes.map(node => node.id);
      // Delete nodes
      setNodes((nds) => nds.filter(node => !nodeIds.includes(node.id)));
      // Delete edges connected to deleted nodes
      setEdges((eds) => eds.filter(edge => 
        !nodeIds.includes(edge.source) && !nodeIds.includes(edge.target)
      ));
    }
    
    if (selectedEdges.length > 0) {
      const edgeIds = selectedEdges.map(edge => edge.id);
      setEdges((eds) => eds.filter(edge => !edgeIds.includes(edge.id)));
    }
    
    setSelectedElements([]);
  }, [selectedElements, setNodes, setEdges]);

  // Auto layout
  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    setTimeout(() => fitView(), 100);
  }, [nodes, edges, setNodes, setEdges, fitView]);

  // Handle selection changes
  const onSelectionChange = useCallback((elements) => {
    setSelectedElements(elements.nodes.map(node => ({ ...node, type: 'node' }))
      .concat(elements.edges.map(edge => ({ ...edge, type: 'edge' }))));
  }, []);

  // Validate DAG whenever nodes or edges change
  useEffect(() => {
    const status = validateDAG(nodes, edges);
    setValidationStatus(status);
  }, [nodes, edges]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        deleteSelectedElements();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelectedElements]);

  return (
    <div className="pipeline-editor">
      <div className="editor-header">
        <h1>Pipeline Editor (DAG Builder)</h1>
        <ControlPanel
          onAddNode={addNode}
          onLayout={onLayout}
          onDelete={deleteSelectedElements}
          onToggleJsonPreview={() => setIsJsonPreviewOpen(!isJsonPreviewOpen)}
          hasSelectedElements={selectedElements.length > 0}
        />
      </div>
      
      <div className="editor-content">
        <div className="flow-container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSelectionChange={onSelectionChange}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
        
        <div className="side-panel">
          <ValidationPanel validationStatus={validationStatus} />
          {isJsonPreviewOpen && (
            <JsonPreview nodes={nodes} edges={edges} />
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <PipelineEditor />
    </ReactFlowProvider>
  );
}

export default App;
