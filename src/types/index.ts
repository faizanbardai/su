export type Document = {
  _id: string;
  shortURL: string;
  originalURL: string;
};

export type URL = {
  host: string;
  port: string;
  pathname: string;
  hash: string;
  protocol: string;
  params: string;
  ip: string;
  href: string;
};

export type createBody = {
  longURL: string;
  alias: string;
};

export type createResponse = {
  createdAt: string;
  url: URL;
  documents: Document[];
};

export type historyData = {
  url: URL;
  documents: Document[];
  createdAt: string;
};
