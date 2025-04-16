import React, { useMemo } from "react";

export function FIFO_Table({ sequence, memorySize }) {
  const { memoryStates, pageFaults } = useMemo(() => {
    const memory = Array(memorySize).fill(null);
    const memoryStates = [];
    let faults = 0;

    for (let i = 0; i < sequence.length; i++) {
      const page = sequence[i];

      if (memory.includes(page)) {
        memoryStates.push([...memory]);
        continue;
      }

      faults++;

      const emptyIndex = memory.indexOf(null);

      if (emptyIndex !== -1) {
        memory[emptyIndex] = page;
      } else {
        memory.shift();
        memory.push(page);
      }

      memoryStates.push([...memory]);
    }

    return { memoryStates, pageFaults: faults };
  }, [sequence, memorySize]);

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        First Fit assignation (FIFO)
      </h2>
      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden text-lg">
        <thead>
          <tr className="bg-blue-600 text-white text-xl">
            <th className="border px-4 py-2">Sequence</th>
            {sequence.map((_, index) => (
              <th key={index} className="border px-4 py-2">
                {sequence[index]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(memorySize)].map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border px-4 py-2 font-semibold text-center text-blue-800">
                Marco {rowIndex + 1}
              </td>
              {memoryStates.map((state, colIndex) => (
                <td
                  key={colIndex}
                  className="border px-4 py-2 text-center text-gray-700"
                >
                  {state[rowIndex] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-2xl text-center text-red-600 font-semibold">
        Errors: {pageFaults}
      </div>
    </div>
  );
}
