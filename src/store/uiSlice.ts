import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
    selectedNodeId: string | null;
}

const initialState: UIState = {
    selectedNodeId: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        selectNode: (state, action: PayloadAction<string | null>) => {
            state.selectedNodeId = action.payload;
        },
    },
});

export const { selectNode } = uiSlice.actions;
export default uiSlice.reducer;
