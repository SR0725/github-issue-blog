export interface Comment {
  url: string;
  id: number;
  html_url: string;
  body: string;
  user: {
    login: string;
    html_url: string;
    id: number;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
}
