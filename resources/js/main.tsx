import ReactDOM from "react-dom/client";
import Application from "./Application";
import "../css/app.css"

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);


root.render(
    <Application />
);