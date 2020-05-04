import { Suggestion } from 'components/models';
import Vue from 'vue';
import axios from "axios";

export async function submitSuggestion(suggestion: Suggestion): Promise<any> {
  const response = await axios.post('/api/suggestions/create', suggestion);
  console.log(response)
  if (response.data.success == true) {
    return
  } else {
    throw new Error(response.data.error || 'Server returned invalid data')
  }
}
