export function MakeProcess({ algorithm, sequence, setFlag }) {
  if (!algorithm || !sequence) return null;
  setFlag(true);
  return (
    <div className="flex flex-col items-start justify-items-start p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-1/2">
        <h3 className="text-xl font-semibold mb-4">{algorithm}</h3>
        <p className="text-lg w-full">{sequence.join(" ")}</p>
      </div>
    </div>
  );
}
