import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

export default async function handler(req, res) {
  const { prompt } = req.body;

  // You should embed the prompt here using OpenAI or another embedding model.
  // For this template, we're mocking a vector and index call.
  const index = pc.index('quickstart');

  try {
    const results = await index.query({
      topK: 3,
      vector: [0.1, 0.2], // Replace with your real embedded vector
      includeMetadata: true
    });

    res.status(200).json({ message: "Queried Pinecone!", results });
  } catch (error) {
    console.error("Error querying Pinecone:", error);
    res.status(500).json({ error: "Failed to query Pinecone." });
  }
}