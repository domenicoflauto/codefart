export type snippet = {
  id: string;
  name: string;
  user: string;
  content: string;
  visibility: "private" | "public";
  createdAt: string; }