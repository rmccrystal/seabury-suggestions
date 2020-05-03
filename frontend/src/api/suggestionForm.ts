import { Suggestion } from 'components/models';

export async function submitSuggestion(suggestion: Suggestion): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}
