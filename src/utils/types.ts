import { ReactElement } from "react";

interface Containers {
  children: ReactElement[];
}

export interface Buttons {
  children: string;
  type: string;
  classIndex?: string;
}

export interface Numbers extends Containers {}

export interface Operators extends Containers {}

export interface DataObj {
  [key: string]: string;
}
