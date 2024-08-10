import { NextApiRequest, NextApiResponse } from 'next';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { TaskType } from '@google/generative-ai';
import { NextResponse } from 'next/server';


const pinecone = new Pinecone({
    apiKey: 'aceff23d-0b27-4433-b12d-cc0dfa284ebe',
    
  });
  const index = pinecone.Index('cater');

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: 'embedding-001',
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: 'Document title',
  apiKey: 'AIzaSyCU_G6smtnj13fxZYat_lnIpeVDVRr7y8w',
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

    console.log("result",result)

    if (result.matches.length > 0 && result.matches[0].id) {
      const matchedCommand = result.matches[0].id;
      return NextResponse.json({ command: matchedCommand });
    } else {
      return NextResponse.json({ command: null });
    }
  } catch (error) {
    console.error('Error processing command:', error);
    return NextResponse.json({ error: 'Error processing command' }, { status: 500 });
  }
}