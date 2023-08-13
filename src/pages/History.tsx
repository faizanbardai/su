import { historyData } from "../types";

const History = () => {
  const history: historyData[] = JSON.parse(
    localStorage.getItem("history") || "[]"
  );
  return (
    <>
      {history.map((h, i) => (
        <div key={i}>{h.createdAt}</div>
      ))}
    </>
  );
};

export default History;
