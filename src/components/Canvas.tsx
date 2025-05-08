import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setNodes } from "../store/nodesSlice";
import { setEdges } from "../store/edgesSlice";

const Canvas = () => {
    const nodes = useAppSelector((state) => state.nodes);
    const edges = useAppSelector((state) => state.edges);
    const dispatch = useAppDispatch();

    return (
        <div className="w-screen h-screen bg-gray-100">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={(changes) => dispatch(setNodes(changes as any))} // We'll refine this
                onEdgesChange={(changes) => dispatch(setEdges(changes as any))}
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
