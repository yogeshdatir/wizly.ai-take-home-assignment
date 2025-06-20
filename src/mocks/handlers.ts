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

  http.get('/api/stats', () => {
    const stats = {
      totalConversations: 124,
      averageSessionLength: '6.2',
      mostCommonQuestions: [
        { question: 'What is your name?', count: 35 },
        { question: 'Do you like coffee?', count: 30 },
        { question: 'Which coffee do you prefer?', count: 20 },
      ],
      dropOffPoints: [
        { step: 'q2', dropCount: 12 },
        { step: 'q3', dropCount: 8 },
        { step: 'q4', dropCount: 5 },
      ],
    };

    return HttpResponse.json(stats);
  }),
];
