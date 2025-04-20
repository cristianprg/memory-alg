import { CLOCK_Table } from "./tables/CLOCK_Table";
import { FIFO_Table } from "./tables/FIFO_Table";
import { FIFOPLUS_Table } from "./tables/FIFOPLUS_Table";
import { LRU_Table } from "./tables/LRU_Table";
import { OptimalTable } from "./tables/OptimalTable";
import { SECONDCHANCE_Table } from "./tables/SECONDCHANCE_Table";

export function DrawTable({ algorithm, sequence, flag, memorySize }) {
  if (!flag) return null;

  switch (algorithm) {
    case "FIFO":
      return <FIFO_Table sequence={sequence} memorySize={memorySize} />;
    case "FIFO+":
      return <FIFOPLUS_Table sequence={sequence} memorySize={memorySize} />;
    case "CLOCK":
      return <CLOCK_Table sequence={sequence} memorySize={memorySize} />;
    case "SECOND CHANCE":
      return <SECONDCHANCE_Table sequence={sequence} memorySize={memorySize} />;
    case "LRU":
      return <LRU_Table sequence={sequence} memorySize={memorySize} />;
    case "OPTIMO":
      return <OptimalTable sequence={sequence} memorySize={memorySize} />;
    default:
      return null;
  }
}
