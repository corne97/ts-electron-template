import ReactDOM from "react-dom/client";
import { App } from "./App";

const getRoot = () =>
{
	let rootElement = document.getElementById("root");
	if (!rootElement)
	{
		rootElement = document.createElement("div");
		rootElement.id = "root";
		document.body.appendChild(rootElement);
	}
	return rootElement;
};

ReactDOM.createRoot(getRoot()).render(<App />);
