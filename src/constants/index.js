// Node type constants
export const NODE_TYPES = {
  CUSTOM: 'custom',
  DEFAULT: 'default',
};

// Edge type constants
export const EDGE_TYPES = {
  DEFAULT: 'default',
  ANIMATED: 'animated',
};

// Validation messages
export const VALIDATION_MESSAGES = {
  VALID: 'Valid DAG - Pipeline is ready to run!',
  INVALID_MIN_NODES: 'Invalid: At least 2 nodes required',
  INVALID_CYCLE: 'Invalid: Cycle detected in the graph',
  INVALID_DISCONNECTED: 'Invalid: All nodes must be connected',
  INVALID_SELF_LOOP: 'Invalid: Self-loops are not allowed',
  INVALID_WRONG_DIRECTION: 'Invalid: Incorrect edge direction',
};

// Default node styles
export const DEFAULT_NODE_STYLE = {
  background: '#ffffff',
  border: '2px solid #3b82f6',
  borderRadius: '8px',
  padding: '10px',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#1f2937',
  minWidth: '150px',
  textAlign: 'center',
};

// Default edge styles
export const DEFAULT_EDGE_STYLE = {
  stroke: '#3b82f6',
  strokeWidth: 2,
};

// Invalid edge styles
export const INVALID_EDGE_STYLE = {
  stroke: '#ef4444',
  strokeWidth: 2,
  strokeDasharray: '5,5',
};

// Layout directions
export const LAYOUT_DIRECTIONS = {
  TOP_BOTTOM: 'TB',
  LEFT_RIGHT: 'LR',
  BOTTOM_TOP: 'BT',
  RIGHT_LEFT: 'RL',
};

// Handle positions
export const HANDLE_POSITIONS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
};

// Connection validation rules
export const CONNECTION_RULES = {
  ALLOW_SELF_LOOP: false,
  ALLOW_MULTIPLE_EDGES: false,
  REQUIRE_DIRECTION: true,
};