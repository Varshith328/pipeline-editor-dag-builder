import { useState, useCallback, useEffect } from 'react';
import { validateDAG } from '../utils/dagValidation';
import { getLayoutedElements } from '../utils/autoLayout';
import { CONNECTION_RULES } from '../constants';

export const useDag = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [validationStatus, setValidationStatus] = useState({
    isValid: false,
    message: 'Add nodes to start building your pipeline',
  });
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);

  // Node management
  const addNode = useCallback((nodeData) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: {
        label: nodeData.label || 'New Node',
        type: nodeData.type || 'default',
      },
      ...nodeData,
    };
    
    setNodes((prev) => [...prev, newNode]);
  }, []);

  const updateNode = useCallback((nodeId, updates) => {
    setNodes((prev) => 
      prev.map((node) => 
        node.id === nodeId ? { ...node, ...updates } : node
      )
    );
  }, []);

  const deleteNode = useCallback((nodeId) => {
    setNodes((prev) => prev.filter((node) => node.id !== nodeId));
    // Also remove edges connected to this node
    setEdges((prev) => 
      prev.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  }, []);

  // Edge management
  const addEdge = useCallback((edgeData) => {
    // Validate connection rules
    if (!CONNECTION_RULES.ALLOW_SELF_LOOP && edgeData.source === edgeData.target) {
      return false;
    }

    // Check for duplicate edges
    const existingEdge = edges.find(
      (edge) => edge.source === edgeData.source && edge.target === edgeData.target
    );
    
    if (!CONNECTION_RULES.ALLOW_MULTIPLE_EDGES && existingEdge) {
      return false;
    }

    const newEdge = {
      id: `edge-${Date.now()}`,
      source: edgeData.source,
      target: edgeData.target,
      type: 'default',
      animated: false,
      style: { stroke: '#3b82f6', strokeWidth: 2 },
      markerEnd: {
        type: 'arrowclosed',
        color: '#3b82f6',
      },
      ...edgeData,
    };

    setEdges((prev) => [...prev, newEdge]);
    return true;
  }, [edges]);

  const deleteEdge = useCallback((edgeId) => {
    setEdges((prev) => prev.filter((edge) => edge.id !== edgeId));
  }, []);

  const updateEdge = useCallback((edgeId, updates) => {
    setEdges((prev) => 
      prev.map((edge) => 
        edge.id === edgeId ? { ...edge, ...updates } : edge
      )
    );
  }, []);

  // Selection management
  const onSelectionChange = useCallback((params) => {
    setSelectedNodes(params.nodes || []);
    setSelectedEdges(params.edges || []);
  }, []);

  // Delete selected elements
  const deleteSelected = useCallback(() => {
    if (selectedNodes.length > 0) {
      selectedNodes.forEach((node) => deleteNode(node.id));
    }
    if (selectedEdges.length > 0) {
      selectedEdges.forEach((edge) => deleteEdge(edge.id));
    }
    setSelectedNodes([]);
    setSelectedEdges([]);
  }, [selectedNodes, selectedEdges, deleteNode, deleteEdge]);

  // Auto layout
  const applyAutoLayout = useCallback(() => {
    const layoutedElements = getLayoutedElements(nodes, edges);
    setNodes(layoutedElements.nodes);
    setEdges(layoutedElements.edges);
  }, [nodes, edges]);

  // Clear all
  const clearAll = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNodes([]);
    setSelectedEdges([]);
  }, []);

  // Validate DAG whenever nodes or edges change
  useEffect(() => {
    const validation = validateDAG(nodes, edges);
    setValidationStatus(validation);
  }, [nodes, edges]);

  // Export DAG data
  const exportDAG = useCallback(() => {
    return {
      nodes: nodes.map(({ id, data, position }) => ({
        id,
        label: data.label,
        type: data.type,
        position,
      })),
      edges: edges.map(({ id, source, target }) => ({
        id,
        source,
        target,
      })),
      metadata: {
        isValid: validationStatus.isValid,
        nodeCount: nodes.length,
        edgeCount: edges.length,
        exportedAt: new Date().toISOString(),
      },
    };
  }, [nodes, edges, validationStatus]);

  return {
    // State
    nodes,
    edges,
    validationStatus,
    selectedNodes,
    selectedEdges,
    
    // Node operations
    addNode,
    updateNode,
    deleteNode,
    
    // Edge operations
    addEdge,
    deleteEdge,
    updateEdge,
    
    // Selection
    onSelectionChange,
    
    // Batch operations
    deleteSelected,
    applyAutoLayout,
    clearAll,
    
    // Utilities
    exportDAG,
    
    // Raw setters (for React Flow)
    setNodes,
    setEdges,
  };
};