export interface Suggestion {
  title?: string; // Title can be none
  content: string;
}


export interface Survey {
  id: string;
  options: string[];
}
