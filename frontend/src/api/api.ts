import {Suggestion, Survey} from 'components/models';
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
  console.log(response.data);
  if (response.data.success == true) {
    return response.data.survey as Survey;
  } else {
    throw new Error(response.data.error || 'Server returned invalid data')
  }
}
