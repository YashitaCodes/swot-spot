import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.NEXT_GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const { userInput } = await request.json();

    const chatCompletion = await getGroqChatCompletion(userInput);

    return NextResponse.json({ response: chatCompletion.choices[0]?.message?.content || '' });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}

async function getGroqChatCompletion(userInput: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: userInput,
      },
    ],
    model: 'llama3-8b-8192',
  });
}
