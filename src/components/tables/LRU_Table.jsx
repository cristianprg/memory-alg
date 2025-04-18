import React, { useMemo } from "react";

export function LRU_Table({ sequence, memorySize }) {
  const { memoryStates, pageFaults } = useMemo(() => {
    if (!sequence || sequence.length === 0 || memorySize <= 0) {
      return { memoryStates: [], pageFaults: 0 };
    }

    const memory = Array(memorySize).fill(null);
    const lastUsed = Array(memorySize).fill(-1); // para llevar control de uso
    const memoryStates = [];
    let faults = 0;
    let time = 0;

    for (let i = 0; i < sequence.length; i++) {
      const page = sequence[i];
      const indexInMemory = memory.indexOf(page);

      if (indexInMemory !== -1) {
        // Ya está en memoria → actualizar tiempo de uso
        lastUsed[indexInMemory] = time;
        memoryStates.push([...memory]);
        time++;
        continue;
      }

      faults++;
      const emptyIndex = memory.indexOf(null);

      if (emptyIndex !== -1) {
        // Espacio libre
        memory[emptyIndex] = page;
        lastUsed[emptyIndex] = time;
      } else {
        // Buscar el menos recientemente usado (menor tiempo)
        const lruIndex = lastUsed.indexOf(Math.min(...lastUsed));
        memory[lruIndex] = page;
        lastUsed[lruIndex] = time;
      }

      memoryStates.push([...memory]);
      time++;
    }

    return { memoryStates, pageFaults: faults };
  }, [sequence, memorySize]);

  if (!sequence || sequence.length === 0 || memorySize <= 0) {
    return (
      <div className="p-6 text-center text-xl text-gray-500">
        Ingresa una secuencia y tamaño de memoria válidos para simular LRU.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Asignación de Memoria - LRU
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
