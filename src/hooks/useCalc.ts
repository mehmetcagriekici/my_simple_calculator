//imports
import { useContext, useEffect } from "react";
import { evaluate } from "mathjs";

//calculator data
import { exprNums, exprOps, opBtns } from "../utils/calcData";
import { ExprContext } from "../store/ExprContext";

export function useCalc() {
  const { expr, setExpr, setInvalidBtns, setResult, setError } =
    useContext(ExprContext);

  //btn validation and current result as the expression grows
  useEffect(() => {
    //reset invalids on each change on the expression
    setInvalidBtns({});
    //intially make all buttons except numbers, minus sign, Backspace, Reset and opening paranthese disabled
    //all ops except minus, Backspae and open
    if (expr.length === 0)
      for (const key of Object.keys(exprOps))
        if (
          key === "open" ||
          key === "subtraction" ||
          key === "Backspace" ||
          key === "reset"
        )
          continue;
        else setInvalidBtns((invalids) => ({ ...invalids, [key]: key }));
    //chek if the length of the expression is one and the first element is zero.
    else if (expr.length === 1 && expr[0] === "0")
      //all nums are disabled
      for (const key of Object.keys(exprNums))
        setInvalidBtns((invalids) => ({ ...invalids, [key]: key }));
    //check the last char of the expression
    //check if the last char is a num
    else if (exprNums[expr[expr.length - 1]])
      //disable open
      setInvalidBtns((invalids) => ({ ...invalids, open: "open" }));
    //check if the last char is an operator
    else if (opBtns[expr[expr.length - 1]])
      //invalidate all operators except for Backspace, reset and parantheses
      for (const [key, value] of Object.entries(exprOps))
        if (expr[expr.length - 1] === "." || expr[expr.length - 1] === "(")
          if (key === "Backspace" || key === "reset" || key === "open")
            continue;
          else
            setInvalidBtns((invalids) => ({
              ...invalids,
              [key]: key,
              [value]: value,
            }));
        else if (
          key === "Backspace" ||
          key === "open" ||
          key === "close" ||
          key === "reset"
        )
          continue;
        //if the last element is the closing paranthese
        else if (expr[expr.length - 1] === ")") {
          //disable all nums
          for (const key of Object.keys(exprNums))
            setInvalidBtns((invalids) => ({ ...invalids, [key]: key }));
          //disable open, disable float,
          setInvalidBtns((invalids) => ({
            ...invalids,
            open: "open",
            float: "float",
          }));
        } else
          setInvalidBtns((invalids) => ({
            ...invalids,
            [key]: key,
            [value]: value,
          }));

    //each number in the expression can include only one dot (float)
    if (expr.match(/[0-9]+\.+[0-9]+\.+/g)) {
      //if there are more than pne float point in any number in the experssion make every button invalid except reset and backspace
      for (const key of Object.keys(exprOps))
        if (key === "reset" || key === "Backspace") continue;
        else setInvalidBtns((invalids) => ({ ...invalids, [key]: key }));

      for (const key of Object.keys(exprNums))
        setInvalidBtns((invalids) => ({ ...invalids, [key]: key }));
    }

    //the parantheses must match for expression to be valid
    let p = 0;
    for (let i = 0; i < expr.length; i++)
      if (expr[i] === "(") p++;
      else if (expr[i] === ")")
        if (p < 0) {
          setInvalidBtns((invalids) => ({ ...invalids, Enter: "Enter" }));
          break;
        } else p--;

    //prevent user to submit, disable result(=)
    if (p !== 0)
      setInvalidBtns((invalids) => ({ ...invalids, Enter: "Enter" }));
  }, [expr, setInvalidBtns]);

  //calculate the expression
  //update result
  function solveExpression() {
    try {
      const evaluated = evaluate(expr);

      const cur = String(
        evaluated % 1 !== 0 ? evaluated.toFixed(5) : evaluated
      );

      setResult(cur);
      setExpr(cur);
    } catch (err) {
      setError(new Error(`${err}: Invalid expression!`));
    }

    //build an abstract syntax tree by parsing the expression

    //solve the ast

    return "";
  }

  function createExpression(char: string) {
    switch (char) {
      case "Backspace": {
        setExpr((expr) => expr.slice(0, expr.length - 1));
        break;
      }

      case "reset": {
        setExpr("");
        setResult("0");
        setError(new Error());
        break;
      }

      case "Enter": {
        solveExpression();
        break;
      }

      default: {
        if (exprOps[char]) setExpr((expr) => `${expr}${exprOps[char]}`);
        if (exprNums[char]) setExpr((expr) => `${expr}${exprNums[char]}`);
      }
    }
  }

  return { createExpression };
}
