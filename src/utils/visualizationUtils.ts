
import * as d3 from 'd3';
import { TreeNode } from './types';

// Convert polar coordinates to Cartesian
export const project = (x: number, y: number) => {
  const angle = x - Math.PI / 2;
  return [y * Math.cos(angle), y * Math.sin(angle)];
};

// Generate a path for a link between nodes
export const generateLinkPath = (
  source: { x: number; y: number },
  target: { x: number; y: number }
) => {
  const [sourceX, sourceY] = project(source.x, source.y);
  const [targetX, targetY] = project(target.x, target.y);
  
  // Create a curved path between the nodes
  return d3.linkRadial<any, any>()
    .angle(d => d.x)
    .radius(d => d.y)({
      source: { x: source.x, y: source.y },
      target: { x: target.x, y: target.y }
    });
};

// Zoom to a specific node
export const zoomToNode = (
  node: d3.HierarchyNode<TreeNode>,
  width: number, 
  height: number,
  setTransform: (transform: { x: number, y: number, k: number }) => void
) => {
  // Project the node coordinates
  const [x, y] = project(node.x, node.y);
  
  // Calculate the center of the viewport
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Calculate the transform to center on the node
  // and zoom in appropriately
  const scale = 2.5;
  const tx = centerX - x * scale;
  const ty = centerY - y * scale;
  
  // Update the transform
  setTransform({ x: tx, y: ty, k: scale });
};

// Reset zoom to default view
export const resetZoom = (
  width: number, 
  height: number,
  setTransform: (transform: { x: number, y: number, k: number }) => void
) => {
  // Reset to center with normal scale
  const centerX = width / 2;
  const centerY = height / 2;
  setTransform({ x: centerX, y: centerY, k: 1 });
};

// Calculate the tree layout
export const calculateRadialTreeLayout = (
  data: TreeNode,
  width: number,
  height: number
) => {
  // Set up hierarchy
  const root = d3.hierarchy(data);
  
  // Calculate the tree layout
  const radius = Math.min(width, height) / 2;
  const treeLayout = d3.tree<TreeNode>()
    .size([2 * Math.PI, radius * 0.8])
    .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);
  
  // Apply layout
  return treeLayout(root);
};
