import { loadAllKnowledge, chunkKnowledge } from "./textLoader";

export type SearchResult = {
  id: number;
  title: string;
  category: string;
  chunk: string;
  relevance: number;
  context?: string; // Include context from the chunk
};

export function simpleSearch(query: string, topK: number = 10): SearchResult[] {
  const knowledge = loadAllKnowledge();
  const chunks = chunkKnowledge(knowledge);

  const queryWords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);

  const results: SearchResult[] = chunks.map((chunk) => {
    const chunkText = chunk.chunk.toLowerCase();
    const titleText = chunk.title.toLowerCase();
    const categoryText = chunk.category.toLowerCase();

    let relevance = 0;

    // Check for exact matches in title (highest weight)
    queryWords.forEach((word) => {
      if (titleText.includes(word)) relevance += 15;
      if (categoryText.includes(word)) relevance += 8;
      if (chunkText.includes(word)) relevance += 2;
    });

    // Bonus for longer matches and exact phrase matches
    if (chunkText.includes(query.toLowerCase())) relevance += 25;

    // Bonus for multiple word matches in the same chunk
    const matchedWords = queryWords.filter((word) => chunkText.includes(word));
    if (matchedWords.length > 1) {
      relevance += matchedWords.length * 3;
    }

    // Bonus for context relevance
    if (
      chunk.context &&
      chunk.context.toLowerCase().includes(query.toLowerCase())
    ) {
      relevance += 5;
    }

    return {
      id: chunk._id,
      title: chunk.title,
      category: chunk.category,
      chunk: chunk.chunk,
      relevance,
      context: chunk.context,
    };
  });

  // Sort by relevance and return top results
  return results
    .filter((result) => result.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, topK);
}
