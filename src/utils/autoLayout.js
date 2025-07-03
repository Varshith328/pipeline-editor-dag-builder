import dagre from 'dagre';

export const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  // Configure the graph
  dagreGraph.setGraph({
    rankdir: 'TB', // Top to Bottom layout
    nodesep: 100,  // Horizontal spacing between nodes
    ranksep: 100,  // Vertical spacing between ranks
    marginx: 20,   // Graph margin
    marginy: 20,
  });

  // Add nodes to dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: 180,  // Node width
      height: 80,  // Node height
    });
  });

  // Add edges to dagre graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Run the layout algorithm
  dagre.layout(dagreGraph);

  // Update node positions based on dagre layout
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };
  });

  return {
    nodes: layoutedNodes,
    edges: edges,
  };
};

export const fitViewOptions = {
  padding: 0.2,
  includeHiddenNodes: false,
  minZoom: 0.1,
  maxZoom: 1.5,
};