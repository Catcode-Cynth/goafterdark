const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function getToken() {
  return localStorage.getItem('gal_token');
}

export function setToken(token: string) {
  localStorage.setItem('gal_token', token);
}

export function clearToken() {
  localStorage.removeItem('gal_token');
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = Array.isArray(data.message) ? data.message[0] : data.message;
    throw new Error(message || data.error || `Request failed (${res.status})`);
  }

  return data as T;
}

export type AuthResponse = {
  access_token?: string;
  accessToken?: string;
  token?: string;
  user?: {
    email: string;
    name?: string;
    firstName?: string;
    role?: 'CREATOR' | 'EVENTEE';
  };
};

export function loginRequest(email: string, password: string) {
  return api<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function registerRequest(payload: {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  role: 'CREATOR' | 'EVENTEE';
}) {
  return api<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}


export type AppRole = 'CREATOR' | 'EVENTEE';

export function getStoredUser(): { email?: string; role?: AppRole } | null {
  const raw = localStorage.getItem('gal_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user: { email?: string; role?: AppRole } | null) {
  if (!user) localStorage.removeItem('gal_user');
  else localStorage.setItem('gal_user', JSON.stringify(user));
}
