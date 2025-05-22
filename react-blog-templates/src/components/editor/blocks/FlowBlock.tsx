import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel
} from 'reactflow';
import type { Node, Edge, Connection } from 'reactflow';
import 'reactflow/dist/style.css';
import './FlowBlock.css';

interface FlowBlockProps {
  content: any;
  config: {
    nodes: Node[];
    edges: Edge[];
  };
  onChange: (content: any, config: any) => void;
}

const FlowBlock: React.FC<FlowBlockProps> = ({ content, config, onChange }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(config.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(config.edges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodeLabel, setNodeLabel] = useState('');

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
      onChange(content, { nodes, edges: addEdge(params, edges) });
    },
    [nodes, edges, onChange, content]
  );

  const onNodeDragStop = useCallback(() => {
    onChange(content, { nodes, edges });
  }, [nodes, edges, onChange, content]);

  const addNewNode = () => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'default',
      data: { label: 'New Node' },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };

    setNodes((nds) => [...nds, newNode]);
    onChange(content, { nodes: [...nodes, newNode], edges });
  };

  const updateNodeLabel = (nodeId: string, label: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, label } };
        }
        return node;
      })
    );
    onChange(content, { 
      nodes: nodes.map(node => 
        node.id === nodeId ? { ...node, data: { ...node.data, label } } : node
      ), 
      edges 
    });
  };

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setNodeLabel(node.data.label);
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeLabel(event.target.value);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, event.target.value);
    }
  };

  const handleLabelSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, nodeLabel);
    }
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      // Remove the node
      const newNodes = nodes.filter(node => node.id !== selectedNode.id);
      // Remove connected edges
      const newEdges = edges.filter(
        edge => edge.source !== selectedNode.id && edge.target !== selectedNode.id
      );
      
      setNodes(newNodes);
      setEdges(newEdges);
      onChange(content, { nodes: newNodes, edges: newEdges });
      setSelectedNode(null);
      setNodeLabel('');
    }
  };

  return (
    <div className="flow-block">
      <div className="flow-controls">
        <button onClick={addNewNode} className="add-node-button">
          Add Node
        </button>
      </div>

      <div className="flow-editor">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Background />
          <Controls />
          <Panel position="top-right">
            {selectedNode && (
              <div className="node-editor">
                <form onSubmit={handleLabelSubmit}>
                  <input
                    type="text"
                    value={nodeLabel}
                    onChange={handleLabelChange}
                    placeholder="Node label"
                    className="node-label-input"
                  />
                  <button type="submit" className="save-label-button">
                    Save
                  </button>
                  <button 
                    type="button" 
                    onClick={handleDeleteNode}
                    className="delete-node-button"
                  >
                    Delete
                  </button>
                </form>
              </div>
            )}
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default FlowBlock; 