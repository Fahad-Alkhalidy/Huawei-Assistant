"use client";

import { useState } from "react";
import { Search, Database } from "lucide-react";
import Image from "next/image";
import { SearchResult } from "@/lib/simpleSearch";

type ChatAPI = "original" | "simple" | "no-ai";

interface TestResult {
  api: ChatAPI;
  response: string;
  context: string;
  searchResults?: SearchResult[];
  error?: string;
  time: number;
}

export default function TestAllPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const testAPI = async (api: ChatAPI) => {
    if (!query.trim()) return;

    setIsLoading(true);
    const startTime = Date.now();

    try {
      const endpoint = "/api/chat";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();
      const time = Date.now() - startTime;

      setResults((prev) => [
        ...prev,
        {
          api,
          response: data.response || data.error || "No response",
          context: data.context || "No context",
          searchResults: data.searchResults,
          error: data.error,
          time,
        },
      ]);
    } catch (error) {
      const time = Date.now() - startTime;
      setResults((prev) => [
        ...prev,
        {
          api,
          response: "Error occurred",
          context: "Error",
          error: error instanceof Error ? error.message : "Unknown error",
          time,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const testAll = async () => {
    if (!query.trim()) return;
    setResults([]);

    await testAPI("original");
  };

  const getAPIInfo = () => {
    return {
      name: "Original (Groq)",
      description: "Uses Groq",
      icon: <Database className="w-4 h-4" />,
      color: "bg-purple-600",
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div>
            <Image
              src="/logo2.jpg"
              alt="huwawei logo"
              width={90}
              height={90}
              className=" rounded-full mx-auto "
            ></Image>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Huawei assistant
          </h1>
          <p className="text-gray-600">Test the new huawei chat bot now!</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about Huawei certifications..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === "Enter" && testAll()}
            />
            <button
              onClick={testAll}
              disabled={isLoading || !query.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>{isLoading ? "Testing..." : "Test All APIs"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["original"] as ChatAPI[]).map((api) => {
              const info = getAPIInfo();
              return (
                <button
                  key={api}
                  onClick={() => testAPI(api)}
                  disabled={isLoading || !query.trim()}
                  className={`p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className={`w-8 h-8 ${info.color} rounded-full flex items-center justify-center`}
                    >
                      {info.icon}
                    </div>
                    <span className="font-medium">{info.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 text-left">
                    {info.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-6">
            {results.map((result, index) => {
              const info = getAPIInfo();
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div
                      className={`w-8 h-8 ${info.color} rounded-full flex items-center justify-center`}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{info.name}</h3>
                      <p className="text-sm text-gray-500">
                        {result.time}ms • {result.context}
                      </p>
                    </div>
                  </div>

                  {result.error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 font-medium">Error:</p>
                      <p className="text-red-700">{result.error}</p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="whitespace-pre-wrap text-gray-800">
                        {result.response}
                      </div>
                    </div>
                  )}

                  {result.searchResults && result.searchResults.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Search Results:
                      </p>
                      <div className="space-y-2">
                        {result.searchResults.map((sr, idx) => (
                          <div
                            key={idx}
                            className="text-sm bg-blue-50 p-2 rounded"
                          >
                            <span className="font-medium">{sr.title}</span> (
                            {sr.category}) - Score: {sr.relevance}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-sm text-gray-500">
          <p className="font-medium mb-2">Test Queries:</p>
          <ul className="space-y-1">
            <li>• &rdquo;What is HCIA 5G?&ldquo;</li>
            <li>• &rdquo;Tell me about datacom certification&ldquo;</li>
            <li>• &rdquo;Cloud computing solutions&ldquo;</li>
            <li>• &rdquo;Security requirements&ldquo;</li>
            <li>• &rdquo;HCIE prerequisites&ldquo;</li>
          </ul>
        </div>
        <footer
          style={{
            fontSize: "14px",
            color: "#888",
            textAlign: "center",
            padding: "20px 0",
          }}
        >
          All rights reserved to Fahad Al-Khalidy
        </footer>
      </div>
    </div>
  );
}
