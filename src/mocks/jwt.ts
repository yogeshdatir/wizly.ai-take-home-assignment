export type JwtPayload = {
  email: string;
  role: 'admin' | 'user';
};

export function createFakeJwt(payload: JwtPayload): string {
  return btoa(JSON.stringify(payload)); // Base64 encode — not secure
}

export function decodeFakeJwt(token: string): JwtPayload | null {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}
