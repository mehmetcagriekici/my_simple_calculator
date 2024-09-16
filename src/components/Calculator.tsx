//imports
import "../styles/calculatorStyles.css";
//script
import { numBtns, opBtns } from "../utils/calcData";
//components
import Button from "./Button";
import ResultScreen from "./ResultScreen";

function Calculator() {
  return (
    <div className="calc">
      {/*Reactive Screen*/}
      <ResultScreen />
      {/*Numbers Grid*/}
      {numBtns.map((el, i) => (
        <Button type="num" key={i} classIndex={`${i}`}>
          {`${el}`}
        </Button>
      ))}
      {/*Operators Grid*/}
      {Object.entries(opBtns).map(([key, value]) => (
        <Button type="ops" key={value} classIndex={value}>
          {key}
        </Button>
      ))}
    </div>
  );
}

export default Calculator;
