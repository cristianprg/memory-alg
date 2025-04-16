import { FIFO_Table } from "./tables/FIFO_Table";

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
      return <div>LRU</div>;
    case "OPTIMO":
      return <div>OPTIMO</div>;
    default:
      return null;
  }
}
