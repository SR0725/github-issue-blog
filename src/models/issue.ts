type IssueState = "open" | "closed" | "all";

export interface Issue {
  url: string;
  html_url: string;
  comments: number;
  repository_url: string;
  id: number;
  state: IssueState;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  number: number;
  user: {
    avatar_url: string;
    login: string;
    url: string;
    id: number;
  };
}
