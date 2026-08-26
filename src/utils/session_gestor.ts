const AUTH_COOKIE = "ar0_token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function setAuthCookie(token: string) {
  document.cookie = `${AUTH_COOKIE}=${token}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

export function getAuthCookie(): string | null {
  const match = document.cookie.match(new RegExp(`${AUTH_COOKIE}=([^;]+)`));
  return match ? match[1] : null;
}

export function removeAuthCookie() {
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
}
