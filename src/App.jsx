import { useState } from "react";
import { MakeProcess } from "./components/MakeProcess.jsx";
import { DrawTable } from "./components/DrawTable.jsx";

function App() {
  const [algorithm, setAlgorithm] = useState(null);
  const [sequence, setSequence] = useState(null);
  const [flag, setFlag] = useState(false);
  const [marcos, setMarcos] = useState(0);

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 mt-6">
        Algoritmos de Asignación de Memoria
      </h1>

      <div className="flex flex-wrap justify-center gap-4 p-4">
        {["OPTIMO", "FIFO", "LRU", "FIFO+", "CLOCK", "SECOND CHANCE"].map(
          (algo) => (
            <button
              key={algo}
              onClick={() => setAlgorithm(algo)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-3 px-6 rounded-2xl shadow-md transition-all duration-200"
            >
              {algo}
            </button>
          ),
        )}
      </div>

      {algorithm && (
        <div className="flex flex-row justify-center p-4">
          <div className="flex flex-col justify-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements.sequenceInput.value;
                const marcosInput = e.target.elements.marcosInput.value || 0;
                setSequence(
                  input.split(",").map((num) => parseInt(num.trim(), 10)),
                );
                setMarcos(parseInt(marcosInput));
              }}
              className="space-y-6"
            >
              <div>
                <label
                  className="block text-lg font-medium text-gray-700 mb-2"
                  htmlFor="sequenceInput"
                >
                  Enter sequence:
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  id="sequenceInput"
                  name="sequenceInput"
                  placeholder="e.g., 1, 2, 3, 4"
                />
              </div>
              <div>
                <label
                  className="block text-lg font-medium text-gray-700 mb-2"
                  htmlFor="marcosInput"
                >
                  Enter memory size:
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-blue-500 focus:border-blue-500"
                  type="number"
                  id="marcosInput"
                  name="marcosInput"
                  placeholder="1, 2, 3..."
                  defaultValue={0}
                />
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
                type="submit"
              >
                Submit
              </button>
            </form>
            {algorithm && (
              <MakeProcess
                algorithm={algorithm}
                sequence={sequence}
                setFlag={setFlag}
              />
            )}
          </div>
          <div>
            <DrawTable
              algorithm={algorithm}
              sequence={sequence}
              flag={flag}
              memorySize={marcos}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
