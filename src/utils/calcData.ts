import { DataObj } from "./types";

export const numBtns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const opBtns: DataObj = {
  "+": "addition",
  "-": "subtraction",
  "*": "multiplication",
  "/": "division",
  "=": "Enter",
  "←": "Backspace",
  ".": "float",
  "^": "power",
  "(": "open",
  ")": "close",
  Reset: "reset",
};

export const exprNums: DataObj = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
};

export const exprOps: DataObj = {
  addition: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/",
  Enter: "=",
  Backspace: "←",
  float: ".",
  power: "^",
  open: "(",
  close: ")",
  reset: "Reset",
};
