import axios from "axios";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL!;

const create = async (longURL: string) => {
  const res = await axios.post(REACT_APP_BACKEND_URL, { url: longURL });
  return res.data;
};

export { create };
