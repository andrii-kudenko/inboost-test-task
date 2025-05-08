import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    addEdge,
    type Node,
    type Connection,
    applyNodeChanges,
    applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addNode, setNodes } from "../store/nodesSlice";
import { setEdges } from "../store/edgesSlice";
import { v4 as uuidv4 } from "uuid";
import { selectNode } from "../store/uiSlice";
import Sidebar from "./Sidebar";
import { useLocalStorageSync } from "../hooks/useLocalStorageSync";
import { nodeTypes } from "../types/NodeType";

const Canvas = () => {
    useLocalStorageSync(); // Sync with local storage
    const nodes = useAppSelector((state) => state.nodes);
    const edges = useAppSelector((state) => state.edges);
    const dispatch = useAppDispatch();

    const handleAddNode = () => {
        var x = Math.round(Math.random() * 300);
        var y = Math.round(Math.random() * 300);
        const newNode: Node = {
            id: uuidv4(),
            type: "task",
            position: {
                x: x,
                y: y,
            },
            data: {
                label: `Node ${nodes.length + 1}`,
                position: { x: x, y: y },
                description: "Describe this task",
                isCompleted: false,
            },
        };
        console.log("Adding new node:", newNode);
        dispatch(addNode(newNode));
    };

    return (
        <div className="w-full h-screen bg-gray-100">
            <div className="absolute top-4 left-4 z-10">
                <button
                    onClick={handleAddNode}
                    className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700 transition"
                >
                    + Add Task
                </button>
            </div>
            <Sidebar />
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={(changes) => {
                    console.log("Node changes:", changes);
                    console.log("Current nodes:", nodes);
                    dispatch(setNodes(applyNodeChanges(changes, nodes)));
                }} // We'll refine this
                onEdgesChange={(changes) =>
                    dispatch(setEdges(applyEdgeChanges(changes, edges)))
                } // We'll refine this
                onConnect={(connection: Connection) => {
                    const newEdge = addEdge(connection, edges);
                    dispatch(setEdges(newEdge));
                }}
                onNodeClick={(_, node) => dispatch(selectNode(node.id))}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default Canvas;
