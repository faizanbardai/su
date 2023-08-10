import axios from "axios";
import { URL } from "../types";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL!;

type createBody = {
  longURL: string;
  alias: string;
};
const create = async (body: createBody): Promise<URL[]> => {
  const res = await axios.post(REACT_APP_BACKEND_URL, {
    url: body.longURL,
    alias: body.alias,
  });
  return res.data;
};

export { create };
