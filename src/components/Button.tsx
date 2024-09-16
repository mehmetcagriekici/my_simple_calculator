//imports
import React, { useContext } from "react";
import "../styles/button.css";
//types
import { Buttons } from "../utils/types";
//hooks
import { useCalc } from "../hooks/useCalc";
//data
import { opBtns } from "../utils/calcData";

//context
import { ExprContext } from "../store/ExprContext";

function Button({ children, type, classIndex = "" }: Buttons) {
  const { createExpression } = useCalc();
  const { invalidBtns } = useContext(ExprContext);

  //event handlers
  function onClick(event: React.MouseEvent) {
    if (
      event.target instanceof HTMLElement &&
      event.target.classList.value.match("invalid")
    )
      return null;

    if (event.clientX && event.clientY) createExpression(classIndex);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    //if btn is invalid ignore key down on invalid keys
    if (invalidBtns[event.key]) return null;
    if (opBtns[event.key]) createExpression(opBtns[event.key]);
    else createExpression(event.key);
  }

  if (type === "num")
    return (
      <button
        type="button"
        className={`btn btn__num btn__num-${classIndex} ${
          classIndex === invalidBtns[classIndex] ? "invalid" : ""
        }`}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {children}
      </button>
    );
  if (type === "ops")
    return (
      <button
        type="button"
        className={`btn btn__op btn__op-${classIndex} ${
          classIndex === invalidBtns[classIndex] ? "invalid" : ""
        }`}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {children}
      </button>
    );
  return <button className="btn">{children}</button>;
}

export default Button;
