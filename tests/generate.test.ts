import { NextResponse } from 'next/server';
import { createMocks } from 'node-mocks-http';
import { POST } from '../app/api/generate/route'; // Adjust the path as necessary

describe('API Route: /api/generate', () => {
  it('should return a response from Groq when given user input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        userInput: 'What are the benefits of using Python for web development?',
      },
    });

    await POST(req, res);

    expect(res._getStatusCode()).toBe(200);

    const responseData = JSON.parse(res._getData());
    expect(responseData).toHaveProperty('response');
    expect(typeof responseData.response).toBe('string');
  });
});
