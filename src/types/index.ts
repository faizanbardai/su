export type Document = {
  _id: string;
  shortURL: string;
  originalURL: string;
};

export type URL = {
  host: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  protocol: string;
  params: string;
  ip: string;
};

export type createBody = {
  longURL: string;
  alias: string;
};

export type createResponse = {
  url: URL;
  documents: Document[];
};
