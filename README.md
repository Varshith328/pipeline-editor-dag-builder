# Pipeline Editor - DAG Builder

A React-based Pipeline Editor that allows users to visually create and manage Directed Acyclic Graphs (DAGs). This tool simulates how real-time data pipelines or processing workflows are constructed using interconnected nodes.

## Features

### Core Features
- ✅ **Add Nodes**: Create new nodes with custom labels
- ✅ **Draw Edges**: Connect nodes with directional arrows
- ✅ **Delete Elements**: Remove nodes or edges using the delete key
- ✅ **DAG Validation**: Real-time validation of graph structure
- ✅ **Auto Layout**: Automatically arrange nodes for better visualization
- ✅ **JSON Preview**: View the graph structure in JSON format

### Advanced Features
- 🎨 **Custom Node Types**: Different node styles and colors
- 📱 **Responsive Design**: Works on desktop and mobile
- ⌨️ **Keyboard Shortcuts**: Efficient workflow with hotkeys
- 🎯 **Connection Rules**: Smart edge validation
- 📊 **Graph Statistics**: Node and edge counts
- 💾 **Export Functionality**: Export DAG structure as JSON

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pipeline-editor-dag-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## Project Structure

```
pipeline-editor-dag-builder/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── CustomNode.js          # Custom node component
│   │   ├── ControlPanel.js        # Control buttons panel
│   │   ├── ValidationPanel.js     # DAG validation display
│   │   └── JsonPreview.js         # JSON structure preview
│   ├── hooks/
│   │   ├── useDag.js              # DAG state management
│   │   └── useKeyboard.js         # Keyboard shortcuts
│   ├── utils/
│   │   ├── dagValidation.js       # DAG validation logic
│   │   └── autoLayout.js          # Auto layout with Dagre
│   ├── constants/
│   │   └── index.js               # Application constants
│   ├── styles/
│   │   └── App.css                # Main stylesheet
│   ├── App.js                     # Main application component
│   └── index.js                   # Application entry point
├── package.json
└── README.md
```

## Usage Guide

### Adding Nodes
1. Click the "Add Node" button
2. Enter a name for your node
3. Choose a node type (optional)
4. Click "Add" to create the node

### Creating Connections
1. Drag from the **right handle** (source) of one node
2. Drop on the **left handle** (target) of another node
3. The connection will be created if it follows DAG rules

### Deleting Elements
- **Select nodes/edges** by clicking on them
- **Press Delete key** to remove selected elements
- **Use the Clear All button** to remove everything

### Keyboard Shortcuts
- `Delete` / `Backspace`: Delete selected elements
- `Ctrl+A`: Select all elements
- `Ctrl+L`: Apply auto layout
- `Escape`: Clear selection

### DAG Validation Rules
A pipeline is considered valid when:
- ✅ Has at least 2 nodes
- ✅ Contains no cycles
- ✅ All nodes are connected to at least one edge
- ✅ No self-loops exist
- ✅ All edges follow correct direction (source → target)

## Technical Implementation

### Key Libraries Used
- **React 18**: Main framework
- **ReactFlow**: Graph visualization and interaction
- **Dagre**: Automatic graph layout algorithm
- **React Hooks**: State management and side effects

### Architecture Decisions

1. **Component-Based Architecture**: 
   - Modular components for reusability
   - Custom hooks for business logic separation
   - Utility functions for pure logic

2. **State Management**:
   - Custom `useDag` hook for centralized DAG state
   - React's built-in state management
   - No external state management library needed

3. **Validation Strategy**:
   - Real-time validation on every change
   - DFS algorithm for cycle detection
   - Comprehensive rule checking

4. **Layout Algorithm**:
   - Dagre library for automatic positioning
   - Top-down hierarchical layout
   - Configurable spacing and margins

## Challenges & Solutions

### Challenge 1: Cycle Detection
**Problem**: Detecting cycles in a directed graph efficiently
**Solution**: Implemented DFS with recursion stack tracking

### Challenge 2: Real-time Validation
**Problem**: Validating DAG structure on every change without performance issues
**Solution**: Optimized validation function with early returns and memoization

### Challenge 3: Edge Connection Rules
**Problem**: Preventing invalid connections (self-loops, wrong directions)
**Solution**: Custom validation in connection handler with clear user feedback

### Challenge 4: Auto Layout
**Problem**: Automatically positioning nodes for better visualization
**Solution**: Integrated Dagre algorithm with ReactFlow's positioning system

## Support

For support, please open an issue in the GitHub repository or contact [your-email@example.com].

---

**Built with ❤️ using React and ReactFlow**
