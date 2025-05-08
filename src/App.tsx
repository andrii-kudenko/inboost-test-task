import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import Canvas from "./components/Canvas";

function App() {
    return (
        <Provider store={store}>
            <p className="bg-red-500">Andrii Kudenko</p>
            <Canvas />
        </Provider>
    );
}

export default App;
