import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { TaskType } from '@google/generative-ai';


const pinecone = new Pinecone({
    apiKey: 'aceff23d-0b27-4433-b12d-cc0dfa284ebe',
    
  });
  const index = pinecone.Index('cater');

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: 'embedding-001',
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: 'Document title',
});

export async function POST(request: Request) {
  try {
    const { command } = await request.json();
    const commandEmbedding = await embeddings.embedQuery(command);

    const result = await index.query({
      vector: commandEmbedding,
      topK: 1,
      includeValues: true,
    });

    if (result.matches.length > 0 && result.matches[0].metadata) {
      const matchedCommand = result.matches[0].metadata.command;
      return NextResponse.json({ command: matchedCommand });
    } else {
      return NextResponse.json({ command: null });
    }
  } catch (error) {
    console.error('Error processing command:', error);
    return NextResponse.json({ error: 'Error processing command' }, { status: 500 });
  }
}