import "../styles/error.css";
import { useContext } from "react";
import { ExprContext } from "../store/ExprContext";

function ErrorComponent() {
  const { error } = useContext(ExprContext);

  return (
    <div className="error">
      <span>{error.message}</span>
    </div>
  );
}

export default ErrorComponent;
