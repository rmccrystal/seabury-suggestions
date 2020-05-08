export interface Suggestion {
  title?: string; // Title can be none
  content: string;
}

export interface Survey {
  question: string;
  options: string[];
  canSubmit: boolean;
  _id: string;
}

export interface SurveyResults {
  question: string;
  results: [{ option: string, result: number }];
  totalResults: number;
  _id: string;
}

// Data for the current logged in session
export interface Session {
  id: string;
  roles: string[];
  token: string;
}

export interface SuggestionEntry {
  _id: string
  title?: string
  content: string
  date: Date
}

export type SubmittedSurveys = string[];
