import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    type OnNodesChange,
    type OnEdgesChange,
    type OnConnect,
    addEdge,
    type Node,
    applyNodeChanges,
    applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addNode, setNodes } from "../store/nodesSlice";
import { setEdges } from "../store/edgesSlice";
import { v4 as uuidv4 } from "uuid";

const Canvas = () => {
    const nodes = useAppSelector((state) => state.nodes);
    const edges = useAppSelector((state) => state.edges);
    const dispatch = useAppDispatch();

    const handleAddNode = () => {
        const newNode: Node = {
            id: uuidv4(),
            type: "default",
            position: {
                x: Math.round(Math.random() * 100),
                y: Math.round(Math.random() * 100),
            },
            data: { label: `Node ${nodes.length + 1}` },
        };
        console.log("Adding new node:", newNode);
        dispatch(addNode(newNode));
    };

    return (
        <div className="w-full h-screen bg-gray-100">
            <div className="absolute top-4 left-4 z-10">
                <button
                    onClick={handleAddNode}
                    className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                >
                    + Add Task
                </button>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={(changes) =>
                    dispatch(setNodes(applyNodeChanges(changes, nodes)))
                } // We'll refine this
                onEdgesChange={(changes) =>
                    dispatch(setEdges(applyEdgeChanges(changes, edges)))
                } // We'll refine this
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
