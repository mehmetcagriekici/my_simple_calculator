import { createContext } from "react";

export const ExprContext = createContext<{
  expr: string;
  result: string;
  error: Error;
  invalidBtns: { [key: string]: string }; //creating expression rules (className)
  setExpr: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<Error>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  setInvalidBtns: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
}>({
  expr: "",
  result: "",
  error: new Error(),
  invalidBtns: {},
  setExpr: () => {},
  setError: () => null,
  setResult: () => {},
  setInvalidBtns: () => {},
});
