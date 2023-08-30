import ReactDOM from "react-dom/client";
import { App } from "./App";

// get the root element in which the react app should render
const getRoot = () => {
  let rootElement = document.getElementById("root");

  // if it doesn't exists, create the div with id
  if (!rootElement) {
    rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);
  }

  return rootElement;
};

// now render the App inside the root div element
ReactDOM.createRoot(getRoot()).render(<App />);