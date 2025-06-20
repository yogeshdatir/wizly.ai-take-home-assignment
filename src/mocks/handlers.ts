import { delay, http, HttpResponse } from 'msw';
import { createFakeJwt } from './jwt';

function generateDummyChat(count: number) {
  const messages = [];
  for (let i = 1; i <= count; i++) {
    messages.push({
      id: `${i}`,
      sender: i % 2 === 0 ? 'user' : 'bot',
      content:
        i % 2 === 0
          ? `User reply number ${i / 2}`
          : `Bot question number ${(i + 1) / 2}`,
    });
  }
  return messages;
}

export const handlers = [
  // POST /api/login
  http.post('/api/login', async ({ request }) => {
    await delay(2000); // simulate network delay
    interface LoginRequestBody {
      email: string;
    }
    const { email } = (await request.json()) as LoginRequestBody;

    const role = email.includes('admin') ? 'admin' : 'user';

    const token = createFakeJwt({ email, role });

    return HttpResponse.json({ token });
  }),

  // GET /api/conversations/history
  http.get('/api/conversations/history', async () => {
    await delay(2000); // simulate network delay
    const largeChatHistory = generateDummyChat(500); // adjust number here
    return HttpResponse.json(largeChatHistory);
  }),
];
