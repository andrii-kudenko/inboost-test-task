import { memo, useState } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { useAppDispatch } from "../store/hooks";
import { updateNode } from "../store/nodesSlice";

const TaskNode = memo(({ id, data }: NodeProps) => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [tempLabel, setTempLabel] = useState(data.label || "");

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlurOrEnter = () => {
        console.log("Node data:", data);
        dispatch(
            updateNode({
                id,
                type: "task",
                position: undefined as any, // <- fallback
                data: { label: tempLabel },
            })
        );
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleBlurOrEnter();
        }
    };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     dispatch(
    //         updateNode({
    //             id,
    //             type: "default",
    //             position: data.position,
    //             data: { label: e.target.value },
    //         })
    //     );
    // };

    return (
        <div className="bg-white border rounded shadow p-2 w-40 text-sm text-gray-700">
            {isEditing ? (
                <input
                    className="w-full border px-1 py-0.5"
                    autoFocus
                    value={tempLabel}
                    onChange={(e) => setTempLabel(e.target.value)}
                    onBlur={handleBlurOrEnter}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <>
                    <div
                        onClick={handleDoubleClick}
                        className="cursor-pointer text-center px-1 py-0.5"
                    >
                        {data.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        {data.description}
                    </div>
                    <div
                        className={`text-xs mt-1 ${
                            data.isCompleted
                                ? "text-green-600"
                                : "text-gray-400"
                        }`}
                    >
                        {data.isCompleted ? "✅ Completed" : "⏳ In progress"}
                    </div>
                </>
            )}

            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
});

export default TaskNode;
