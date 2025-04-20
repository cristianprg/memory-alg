import React, { useMemo } from "react";

export function SECONDCHANCE_Table({ sequence, memorySize }) {
  const { memoryStates, referenceBitStates, pageFaults } = useMemo(() => {
    if (!sequence || sequence.length === 0 || memorySize <= 0) {
      return { memoryStates: [], referenceBitStates: [], pageFaults: 0 };
    }

    let faults = 0;
    const memory = Array(memorySize).fill(null);
    const referenceBits = Array(memorySize).fill(0);
    const memoryStates = [];
    const referenceBitStates = [];
    let pointer = 0;

    for (let i = 0; i < sequence.length; i++) {
      const page = sequence[i];
      const indexInMemory = memory.indexOf(page);

      if (indexInMemory !== -1) {
        referenceBits[indexInMemory] = 1;
        memoryStates.push([...memory]);
        referenceBitStates.push([...referenceBits]);
        continue;
      }

      faults++;

      while (true) {
        if (memory[pointer] === null) {
          memory[pointer] = page;
          referenceBits[pointer] = 0;
          pointer = (pointer + 1) % memorySize;
          break;
        } else if (referenceBits[pointer] === 0) {
          memory[pointer] = page;
          referenceBits[pointer] = 0;
          pointer = (pointer + 1) % memorySize;
          break;
        } else {
          referenceBits[pointer] = 0;
          pointer = (pointer + 1) % memorySize;
        }
      }

      memoryStates.push([...memory]);
      referenceBitStates.push([...referenceBits]);
    }

    return { memoryStates, referenceBitStates, pageFaults: faults };
  }, [sequence, memorySize]);

  if (!sequence || sequence.length === 0 || memorySize <= 0) {
    return (
      <div className="p-6 text-center text-xl text-gray-500">
        Ingresa una secuencia y tamaño de memoria válidos para simular Second
        Chance.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Asignación de Memoria - Second Chance
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
              {memoryStates.map((state, colIndex) => {
                const value = state[rowIndex];
                const isReferenced =
                  referenceBitStates[colIndex]?.[rowIndex] === 1;

                return (
                  <td
                    key={colIndex}
                    className={`border px-4 py-2 text-center font-medium ${
                      isReferenced ? "bg-red-200 text-red-800" : "text-gray-700"
                    }`}
                  >
                    {value ?? ""}
                  </td>
                );
              })}
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
