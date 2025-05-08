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
    },
});

export const { setEdges, addEdge } = edgesSlice.actions;
export default edgesSlice.reducer;
