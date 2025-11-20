import ResultItem from "./ResultItem";

export default function ResultsList({ results, onCenter }) {
  if (!results) return null;
  if (results.length === 0) {
    return (
      <div className="text-slate-300 text-center py-10">No laundromats found in this area.</div>
    );
  }

  return (
    <div className="grid gap-4">
      {results.map((r) => (
        <ResultItem key={r.id} place={r} onCenter={onCenter} />
      ))}
    </div>
  );
}
