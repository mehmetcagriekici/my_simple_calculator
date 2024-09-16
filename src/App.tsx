//imports
import { useState } from "react";
import "./App.css";

//components
import Calculator from "./components/Calculator";

//Context
import { ExprContext } from "./store/ExprContext";

//Basic Calculator
/*
Small digital calculator:
Result screen
Numbers
Operators

Functions: sqrt (target), ...more?: sin, cos, factorial...
 */

function App() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("0");
  const [invalidBtns, setInvalidBtns] = useState({}); //key--invalid
  const [error, setError] = useState(new Error());

  const value = {
    expr,
    setExpr,
    result,
    error,
    setResult,
    invalidBtns,
    setInvalidBtns,
    setError,
  };

  return (
    <ExprContext.Provider value={value}>
      <Calculator />;
    </ExprContext.Provider>
  );
}

export default App;
