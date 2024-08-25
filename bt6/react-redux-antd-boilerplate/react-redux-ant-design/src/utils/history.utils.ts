import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export function redirectTo(url: string) {
  console.log(history);
  return history.push(url);
}
