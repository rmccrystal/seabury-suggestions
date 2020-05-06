import {Suggestion, Survey, SurveyResults} from 'components/models';
import axios from 'axios';

export async function submitSuggestion(suggestion: Suggestion): Promise<any> {
  const response = await axios.post('/api/suggestions/create', suggestion);
  if (response.data.success == true) {
    return
  } else {
    throw new Error(response.data.error || 'Server returned invalid data')
  }
}

export async function getLatestSurvey(): Promise<Survey> {
  const response = await axios.post('/api/survey/latest')
  if (response.data.success === true) {
    return response.data.survey as Survey;
  } else {
    throw new Error(response.data.error || 'Server returned invalid data')
  }
}

// Submits a survey using the index of the option
export async function submitSurvey(id: string, choice: number): Promise<any> {
  console.log({id, choice})
  const response = await axios.post('/api/survey/submit', {id, choice})
  console.log(response.data)
  if(response.data.success === true) {
    return
  } else {
    throw new Error(response.data.error || 'Server returned invalid data')
  }
}

export async function getSurveyResults(id: string): Promise<SurveyResults> {
  const response = await axios.post('/api/survey/results', {id})
  if(response.data.success === true) {
    return response.data.results as SurveyResults;
  } else {
    throw new Error(response.data.error || 'Server returned invalid data')
  }
}
