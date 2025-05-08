import { configureStore } from "@reduxjs/toolkit";
import nodesReducer from "./nodesSlice";
import edgesreducer from "./edgesSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
    reducer: {
        nodes: nodesReducer,
        edges: edgesreducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
