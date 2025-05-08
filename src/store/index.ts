import { configureStore } from "@reduxjs/toolkit";
import nodesReducer from "./nodesSlice";
import edgesreducer from "./edgesSlice";

export const store = configureStore({
    reducer: {
        nodes: nodesReducer,
        edges: edgesreducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
