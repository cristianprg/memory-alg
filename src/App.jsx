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
      <h1 className="text-3xl p-4 text-center">
        Memory Assignation Algorithms
      </h1>
      <div className="flex flex-row justify-center items-center p-4">
        <button className="text-2xl p-4" onClick={() => setAlgorithm("OPTIMO")}>
          ÓPTIMO
        </button>
        <button className="text-2xl p-4" onClick={() => setAlgorithm("FIFO")}>
          FIFO
        </button>
        <button className="text-2xl p-4" onClick={() => setAlgorithm("LRU")}>
          LRU
        </button>
        <button className="text-2xl p-4" onClick={() => setAlgorithm("FIFO+")}>
          FIFO +
        </button>
        <button className="text-2xl p-4" onClick={() => setAlgorithm("CLOCK")}>
          CLOCK
        </button>
        <button
          className="text-2xl p-4"
          onClick={() => setAlgorithm("SECOND CHANCE")}
        >
          SECOND CHANCE
        </button>
      </div>

      {algorithm && (
        <div className="flex flex-row p-4">
          <div className="flex flex-col justify-center bg-gray-100 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements.sequenceInput.value;
                const marcosInput = e.target.elements.marcosInput.value;
                setSequence(
                  input.split(",").map((num) => parseInt(num.trim(), 10)),
                );
                setMarcos(parseInt(marcosInput));
              }}
            >
              <div className="mb-4">
                <label className="text-xl p-4" htmlFor="sequenceInput">
                  Enter sequence (comma-separated):
                </label>
                <input
                  className="border p-2 text-xl"
                  type="text"
                  id="sequenceInput"
                  name="sequenceInput"
                  placeholder="e.g., 1, 2, 3, 4"
                />
              </div>
              <div className="mb-4">
                <label className="text-xl p-4" htmlFor="marcosInput">
                  Enter memory size:
                </label>
                <input
                  className="border p-2 text-xl"
                  type="number"
                  id="marcosInput"
                  name="marcosInput"
                  placeholder="1, 2, 3..."
                />
              </div>
              <button
                className="text-xl p-2 ml-2 bg-blue-500 text-white"
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
