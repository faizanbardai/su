import { useState } from "react";
import { historyData } from "../types";
import SingleHistoryCard from "../components/history/SingleHistoryCard";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history") || "[]")
  );

  const clearHistory = () => {
    localStorage.setItem("history", JSON.stringify([]));
    setHistory([]);
    navigate("/");
  };
  return (
    <Box>
      {history.length > 0 && (
        <Box sx={{ textAlign: "right", mb: 1 }}>
          <Button onClick={clearHistory}>Clear History</Button>
        </Box>
      )}
      {history.map((h: historyData, i: number) => (
        <SingleHistoryCard key={i} data={h} />
      ))}
    </Box>
  );
};

export default History;
