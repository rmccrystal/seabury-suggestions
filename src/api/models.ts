export interface Suggestion {
  title?: string; // Title can be none
  content: string;
}


export interface Survey {
  id: string;
  options: string[];
}


export interface SurveyResults {
  question: string;
  results: [{option: string, result: number}];
  totalResults: number;
  _id: string;
}
