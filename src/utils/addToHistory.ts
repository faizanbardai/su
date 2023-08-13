import { historyData } from "../types";

const addToHistory = (data: historyData) => {
  const createdAt = new Date().toISOString();
  data.createdAt = createdAt;
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  const newHistory = [data, ...history];
  localStorage.setItem("history", JSON.stringify(newHistory));
};

export default addToHistory;
