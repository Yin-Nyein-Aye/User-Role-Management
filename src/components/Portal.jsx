import ReactDOM from "react-dom";

export default function Portal({ children }) {
  // Render children into the modal-root div
  return ReactDOM.createPortal(children, document.getElementById("modal-root"));
}
