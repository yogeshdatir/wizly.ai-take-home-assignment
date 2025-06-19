import axios from './axios';

export async function login(email: string, password: string) {
  const res = await axios.post('/login', { email, password });
  const { token } = res.data;
  localStorage.setItem('token', token);
  return token;
}
