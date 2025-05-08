import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateNode } from "../store/nodesSlice";
import { selectNode } from "../store/uiSlice";
import { useEffect, useState } from "react";
import { deleteNode } from "../store/nodesSlice";
import { removeEdgesForNode } from "../store/edgesSlice";

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const selectedNodeId = useAppSelector((state) => state.ui.selectedNodeId);
    const node = useAppSelector((state) =>
        state.nodes.find((node) => node.id === selectedNodeId)
    );
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (node) {
            setLabel(node.data.label || "");
            setDescription(node.data.description || "");
            setIsCompleted(node.data.isCompleted || false);
        }
    }, [node]);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                dispatch(selectNode(null));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [dispatch]);

    if (!node) {
        return null;
    }

    const handleSave = () => {
        dispatch(
            updateNode({
                ...node,
                data: {
                    ...node.data,
                    label,
                    description,
                    isCompleted,
                },
            })
        );
    };

    return (
        <div className="absolute right-0 top-0 h-full w-64 bg-white shadow p-4 border-l z-20">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Task Name:
            </label>
            <input
                className="w-full border px-2 py-1 rounded mb-4 text-gray-700"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
            />
            <label className="block mb-2 text-sm font-medium">
                Description:
            </label>
            <textarea
                className="w-full border px-2 py-1 rounded mb-4 text-gray-700"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label className="flex items-center mb-4 text-sm text-gray-700">
                <input
                    type="checkbox"
                    className="mr-2"
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                />
                Mark as completed
            </label>
            <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
                Save
            </button>
            <button
                onClick={() => dispatch(selectNode(null))}
                className="ml-2 bg-white  text-gray-400 px-4 py-1 rounded hover:bg-gray-700 border border-gray-300 hover:text-white"
            >
                Close
            </button>
            <button
                onClick={() => {
                    dispatch(deleteNode(node.id));
                    dispatch(removeEdgesForNode(node.id));
                    dispatch(selectNode(null));
                }}
                className="block text-sm text-red-500 hover:underline mt-2 w-full text-center"
            >
                Delete Node
            </button>
        </div>
    );
};

export default Sidebar;
