import {Session, SubmittedSurveys, Suggestion, Survey, SurveyResults} from 'components/models';
import axios from 'axios';
import {LocalStorage} from 'quasar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getResponse<T = any>(url: string, data: object = {}): Promise<T> {
  let response;
  try {
    response = await axios.post(url, data)
  } catch (e) {
    response = e.response;
  }
  if(response.data.success === true) {
    return response.data.data as T;
  } else {
    throw new Error(response.data.error || 'Server returned invalid data')
  }
}

export async function submitSuggestion(suggestion: Suggestion): Promise<any> {
  return getResponse('/api/suggestions/create', suggestion);
}

export async function getLatestSurvey(): Promise<Survey> {
  let resp: Survey = await getResponse('/api/survey/latest')
  if(resp.canSubmit) {
    // if the server says we can submit, check with the client
    const submittedSurveys: SubmittedSurveys | null = LocalStorage.getItem('submittedSurveys');
    if(submittedSurveys && submittedSurveys.includes(resp._id)) {
      resp.canSubmit = false;
    }
  }
  return resp;
}

// Submits a survey using the index of the option
export async function submitSurvey(id: string, choice: number): Promise<any> {
  const resp = await getResponse('/api/survey/submit', {id, choice})

  // Save the survey in SubmittedSurveys
  let submittedSurveys: SubmittedSurveys | null = LocalStorage.getItem('submittedSurveys');
  if(!submittedSurveys) {
    submittedSurveys = []
  }
  submittedSurveys.push(id)

  return resp
}

export async function getSurveyResults(id: string): Promise<SurveyResults> {
  return getResponse('/api/survey/results', {id})
}

// Logs in and returns the session if successful
// Sets the localstorage session variable
export async function login(username: string, password: string): Promise<Session> {
  const session: Session = await getResponse('/api/users/login', {username, password})
  axios.defaults.headers.common['Auth-Token'] = session.token;
  LocalStorage.set('session', session)
  return session
}
