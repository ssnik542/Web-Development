export default function WatchSummary({ watched }) {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgRating = average(watched.map((movie) => movie.vote || 0));
  const avgRuntime = average(watched.map((movie) => movie.time || 0));
  const avgUserRating = average(watched.map((movie) => movie.userRating));

  return (
    <div className="summary">
      <h2>Your watched List 🧾</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched?.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}