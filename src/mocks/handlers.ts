import { http, HttpResponse } from 'msw';
import { createFakeJwt } from './jwt';

export const handlers = [
  // POST /api/login
  http.post('/api/login', async ({ request }) => {
    interface LoginRequestBody {
      email: string;
    }
    const { email } = (await request.json()) as LoginRequestBody;

    const role = email.includes('admin') ? 'admin' : 'user';

    const token = createFakeJwt({ email, role });

    return HttpResponse.json({ token });
  }),
];
