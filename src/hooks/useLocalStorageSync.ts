import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setNodes } from "../store/nodesSlice";
import { setEdges } from "../store/edgesSlice";
import { type Node, type Edge } from "reactflow";

const LOCAL_STORAGE_KEY = "task-flow-state";

export const useLocalStorageSync = () => {
    const dispatch = useAppDispatch();
    const nodes = useAppSelector((state) => state.nodes);
    const edges = useAppSelector((state) => state.edges);

    const [hasLoaded, setHasLoaded] = useState(false);

    // Load once on startup
    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        console.log("Loaded from localStorage:", stored);
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as {
                    nodes: Node[];
                    edges: Edge[];
                };
                dispatch(setNodes(parsed.nodes));
                dispatch(setEdges(parsed.edges));
            } catch (err) {
                console.warn("Failed to parse saved flow state:", err);
            }
        }
        setHasLoaded(true); // set only after load
    }, [dispatch]);

    useEffect(() => {
        if (!hasLoaded) return;
        const toSave = JSON.stringify({ nodes, edges });
        localStorage.setItem(LOCAL_STORAGE_KEY, toSave);
        console.log("Saving to localStorage:", toSave);
    }, [nodes, edges, hasLoaded]);
};
