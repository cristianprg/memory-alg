import React, { useMemo } from "react";

export function OptimalTable({ sequence, memorySize }) {
  const { memoryStates, pageFaults } = useMemo(() => {
    // Verificación dentro del hook (válido)
    if (!sequence || sequence.length === 0 || memorySize <= 0) {
      return { memoryStates: [], pageFaults: 0 };
    }

    const memory = Array(memorySize).fill(null);
    const memoryStates = [];
    let faults = 0;

    for (let i = 0; i < sequence.length; i++) {
      const currentPage = sequence[i];

      if (memory.includes(currentPage)) {
        memoryStates.push([...memory]);
        continue;
      }

      faults++;

      const emptyIndex = memory.indexOf(null);
      if (emptyIndex !== -1) {
        memory[emptyIndex] = currentPage;
      } else {
        const future = sequence.slice(i + 1);
        const indices = memory.map((page) => {
          const idx = future.indexOf(page);
          return idx === -1 ? Infinity : idx;
        });

        const replaceIndex = indices.indexOf(Math.max(...indices));
        memory[replaceIndex] = currentPage;
      }

      memoryStates.push([...memory]);
    }

    return { memoryStates, pageFaults: faults };
  }, [sequence, memorySize]);

  // Render condicional SEGURO después del hook
  if (!sequence || sequence.length === 0 || memorySize <= 0) {
    return (
      <div className="p-6 text-center text-xl text-gray-500">
        Ingresa una secuencia y tamaño de memoria válidos para simular el
        algoritmo óptimo.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Asignación de Memoria - Óptimo
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
