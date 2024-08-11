const { Pinecone } = require('@pinecone-database/pinecone');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { TaskType } = require('@google/generative-ai');


const pinecone = new Pinecone({
    apiKey: 'aceff23d-0b27-4433-b12d-cc0dfa284ebe',
    
  });
const index = pinecone.Index('cater');

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: 'embedding-001',
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: 'Document title',
  apiKey: 'AIzaSyCU_G6smtnj13fxZYat_lnIpeVDVRr7y8w', // Use environment variables for security
});

const commands = ['hello', 'go to header section', 'go to about page', 'go to contact page', 'tire', 'battery','engine','brakes','exterior'];

async function initializePinecone() {
  try {
    // Vectorize commands and upload to Pinecone
    const vectors = await Promise.all(commands.map(async (command) => {
      const embedding = await embeddings.embedQuery(command);
      return {
        id: command,
        values: embedding,
        metadata: { command },
      };
    }));

    // Upsert vectors to Pinecone index
    index.upsert(vectors);

    console.log('Commands successfully uploaded to Pinecone.');
  } catch (error) {
    console.error('Error initializing Pinecone:', error);
  }
}

initializePinecone();
