import {Session, SuggestionEntry, Survey} from 'components/models';
import axios, {AxiosResponse} from 'axios';


function redirectLoginIfNotAuthorized(response: AxiosResponse): boolean {
  // this is bad practice
  if(response.status === 401) {
    window.location.href = '/login'
    return true
  }
  return false
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getAuthorizedResponse<T = any>(url: string, data: object = {}): Promise<T> {
  let response;
  try {
    response = await axios.post(url, data)
  } catch (e) {
    response = e.response;
  }
  if(redirectLoginIfNotAuthorized(response)) throw new Error(response.data.error);
  if(response.data.success === true) {
    return response.data.data as T;
  } else {
    throw new Error(response.data.error || 'Server returned invalid data')
  }
}


export async function getSuggestions(amount = 500): Promise<SuggestionEntry[]> {
  let resp: SuggestionEntry[] = await getAuthorizedResponse('/api/suggestions/get', {amount})
  resp = resp.map(entry => {
    entry.date = new Date(entry.date);
    return entry
  })
  return resp
}

export async function deleteSuggestion(id: string): Promise<any> {
  return await getAuthorizedResponse('/api/suggestions/delete', {id})
}

export async function createSurvey(question: string, options: string[]): Promise<any> {
  return await getAuthorizedResponse('/api/survey/create', {question, options})
}

export async function getAllSurveys(): Promise<Survey[]> {
  return await getAuthorizedResponse('/api/survey/getAll')
}

export async function deleteSurvey(id: string): Promise<any> {
  return await getAuthorizedResponse('/api/survey/delete', {id})
}

export async function clearResponses(id: string): Promise<any> {
  return await getAuthorizedResponse('/api/survey/clearResponses', {id})
}
