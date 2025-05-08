import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Node } from "reactflow";

const initialState: Node[] = [];

export const nodesSlice = createSlice({
    name: "nodes",
    initialState,
    reducers: {
        setNodes: (_, action: PayloadAction<Node[]>) => {
            console.log("Updated node state:", action.payload);
            return action.payload;
        },
        addNode: (state, action: PayloadAction<Node>) => {
            state.push(action.payload);
        },
        updateNode: (state, action: PayloadAction<Node>) => {
            const index = state.findIndex((n) => n.id === action.payload.id);
            if (index !== -1) {
                state[index].data = {
                    ...state[index].data,
                    ...action.payload.data,
                };
                // do not touch position
            }
        },
        deleteNode: (state, action: PayloadAction<string>) => {
            return state.filter((node) => node.id !== action.payload);
        },
    },
});

export const { setNodes, addNode, updateNode, deleteNode } = nodesSlice.actions;
export default nodesSlice.reducer;
