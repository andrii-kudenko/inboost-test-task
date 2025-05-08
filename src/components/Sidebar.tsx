import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateNode } from "../store/nodesSlice";
import { selectNode } from "../store/uiSlice";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const selectedNodeId = useAppSelector((state) => state.ui.selectedNodeId);
    const node = useAppSelector((state) =>
        state.nodes.find((node) => node.id === selectedNodeId)
    );
    const [label, setLabel] = useState("");

    useEffect(() => {
        if (node) {
            setLabel(node.data.label);
        }
    }, [node]);

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
            <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
                Save
            </button>
            <button
                onClick={() => dispatch(selectNode(null))}
                className="ml-2 text-sm text-gray-500 hover:underline"
            >
                Close
            </button>
        </div>
    );
};

export default Sidebar;
