import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Edge } from "reactflow";

const initialState: Edge[] = [];

export const edgesSlice = createSlice({
    name: "edges",
    initialState,
    reducers: {
        setEdges: (_, action: PayloadAction<Edge[]>) => action.payload,
        addEdge: (state, action: PayloadAction<Edge>) => {
            state.push(action.payload);
        },
        removeEdgesForNode: (state, action: PayloadAction<string>) => {
            return state.filter(
                (edge) =>
                    edge.source !== action.payload &&
                    edge.target !== action.payload
            );
        },
    },
});

export const { setEdges, addEdge, removeEdgesForNode } = edgesSlice.actions;
export default edgesSlice.reducer;
