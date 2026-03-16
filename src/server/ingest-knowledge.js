// ingest-knowledge.js
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { MongoDBAtlasVectorSearch } = require("@langchain/mongodb");
// ... same embeddings & client as above

async function ingest() {
  const loader = new PDFLoader("your-knowledge.pdf"); // e.g. "Indian_IT_Job_Market_2026.pdf"
  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 800, chunkOverlap: 100 });
  const chunks = await splitter.splitDocuments(docs);

  await globalVectorStore.addDocuments(chunks);
  console.log("✅ Knowledge base ingested!");
}

ingest();