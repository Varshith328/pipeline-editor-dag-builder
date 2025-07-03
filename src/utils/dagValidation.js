/**
 * Validates if the current graph structure is a valid DAG
 * @param {Array} nodes - Array of nodes
 * @param {Array} edges - Array of edges
 * @returns {Object} Validation status object
 */
export const validateDAG = (nodes, edges) => {
  const validation = {
    isValid: false,
    hasMinNodes: false,
    hasNoCycles: false,
    allNodesConnected: false,
    hasNoSelfLoops: false,
    validDirections: false,
    cycleNodes: [],
    unconnectedNodes: []
  };

  // Check 1: At least 2 nodes
  validation.hasMinNodes = nodes.length >= 2;

  // Check 2: No self-loops
  validation.hasNoSelfLoops = !edges.some(edge => edge.source === edge.target);

  // Check 3: Valid edge directions (already handled by ReactFlow handles)
  validation.validDirections = true;

  // Check 4: All nodes connected to at least one edge
  const connectedNodeIds = new Set();
  edges.forEach(edge => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });
  
  validation.unconnectedNodes = nodes
    .filter(node => !connectedNodeIds.has(node.id))
    .map(node => node.data.label);
  
  validation.allNodesConnected = validation.unconnectedNodes.length === 0;

  // Check 5: No cycles using DFS
  const { hasCycle, cycleNodes } = detectCycles(nodes, edges);
  validation.hasNoCycles = !hasCycle;
  validation.cycleNodes = cycleNodes;

  // Overall validation
  validation.isValid = 
    validation.hasMinNodes &&
    validation.hasNoCycles &&
    validation.allNodesConnected &&
    validation.hasNoSelfLoops &&
    validation.validDirections;

  return validation;
};

/**
 * Detects cycles in the graph using DFS
 * @param {Array} nodes - Array of nodes
 * @param {Array} edges - Array of edges
 * @returns {Object} Object with hasCycle boolean and cycleNodes array
 */
const detectCycles = (nodes, edges) => {
  // Build adjacency list
  const adjacencyList = {};
  const nodeLabels = {};
  
  // Initialize adjacency list
  nodes.forEach(node => {
    adjacencyList[node.id] = [];
    nodeLabels[node.id] = node.data.label;
  });
  
  // Fill adjacency list
  edges.forEach(edge => {
    adjacencyList[edge.source].push(edge.target);
  });

  // DFS to detect cycles
  const visited = new Set();
  const recursionStack = new Set();
  const cycleNodes = [];

  const dfs = (nodeId, path) => {
    if (recursionStack.has(nodeId)) {
      // Found a cycle, extract cycle nodes
      const cycleStart = path.indexOf(nodeId);
      const cycle = path.slice(cycleStart);
      cycleNodes.push(...cycle.map(id => nodeLabels[id]));
      return true;
    }

    if (visited.has(nodeId)) {
      return false;
    }

    visited.add(nodeId);
    recursionStack.add(nodeId);
    path.push(nodeId);

    // Visit all neighbors
    for (const neighbor of adjacencyList[nodeId]) {
      if (dfs(neighbor, [...path])) {
        return true;
      }
    }

    recursionStack.delete(nodeId);
    return false;
  };

  // Check for cycles starting from each unvisited node
  let hasCycle = false;
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id, [])) {
        hasCycle = true;
        break;
      }
    }
  }

  return {
    hasCycle,
    cycleNodes: [...new Set(cycleNodes)] // Remove duplicates
  };
};