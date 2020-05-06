export interface Suggestion {
  title?: string; // Title can be none
  content: string;
}

export interface Survey {
  question: string;
  options: string[];
  id: string;
}
