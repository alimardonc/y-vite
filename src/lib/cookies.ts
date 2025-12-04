const a = "access_token";
const r = "refresh_token";

export function removeAuthTokens() {
  localStorage.removeItem(a);
  localStorage.removeItem(r);
}

export function getAuthTokens() {
  return { a: localStorage.getItem(a), r: localStorage.getItem(r) };
}

export function setAuthTokens(acc: string, ref: string) {
  localStorage.setItem(a, acc);
  localStorage.setItem(r, ref);
}
