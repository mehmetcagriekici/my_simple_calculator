//imports
import "../styles/resultScreenStyles.css";
//hooks
import { useContext } from "react";
import { ExprContext } from "../store/ExprContext";
//components
import ErrorComponent from "./ErrorComponent";

function ResultScreen() {
  const { expr, result, error } = useContext(ExprContext);
  if (error.message) return <ErrorComponent />;

  return (
    <div className="res">
      {/*show result*/}
      <input
        type="text"
        disabled={true}
        value={result}
        className="res__input res__res"
      />
      {/*display current operation*/}
      <input
        type="text"
        disabled={true}
        value={expr}
        className="res__input res__op"
      />
    </div>
  );
}

export default ResultScreen;
