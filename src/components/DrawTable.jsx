import { FIFO_Table } from "./tables/FIFO_Table";
import { LRU_Table } from "./tables/LRU_Table";
import { OptimalTable } from "./tables/OptimalTable";

export function DrawTable({ algorithm, sequence, flag, memorySize }) {
  if (!flag) return null;

  switch (algorithm) {
    case "FIFO":
      return <FIFO_Table sequence={sequence} memorySize={memorySize} />;
    case "FIFO+":
      return <div>FIFO+</div>;
    case "CLOCK":
      return <div>CLOCK</div>;
    case "SECOND CHANCE":
      return <div>SECOND CHANCE</div>;
    case "LRU":
      return <LRU_Table sequence={sequence} memorySize={memorySize} />;
    case "OPTIMO":
      return <OptimalTable sequence={sequence} memorySize={memorySize} />;
    default:
      return null;
  }
}
