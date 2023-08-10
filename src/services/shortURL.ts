import axios from "axios";
import { createBody, createResponse } from "../types";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL!;

const create = async (body: createBody): Promise<createResponse> => {
  const res = await axios.post(REACT_APP_BACKEND_URL, {
    url: body.longURL,
    alias: body.alias,
  });
  return res.data;
};

export { create };
