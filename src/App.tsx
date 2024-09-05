import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export type QiitaArticle = {
  title: string;
  url: string;
  user: {
    id: string;
    name: string;
  };
  created_at: string;
  tags: { name: string }[];
};

type AppProps = {
  initialArticles?: QiitaArticle[];
};

function App({ initialArticles }: AppProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<QiitaArticle[]>(initialArticles || []);
  const token = process.env.REACT_APP_TOKEN;

  const fetchArticles = async () => {
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<QiitaArticle[]>(
        "https://qiita.com/api/v2/items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data)
      setArticles(response.data);
    } catch (err) {
      setError("Failed to fetch articles");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialArticles) {
      setArticles(initialArticles);
    } else if (typeof window !== "undefined") {
      fetchArticles();
    }
  }, [initialArticles]);

  return (
    <div className="">
      <header className="flex justify-between p-4 border-b">
        <p className="font-bold text-3xl">Qiita api demo</p>
        <nav>
          <ul className="flex space-x-2"></ul>
        </nav>
      </header>

      <main className="bg-gray-100 p-10 min-h-screen">
        <h1 className="mb-4 text-2xl font-semibold text-center">記事一覧</h1>
        <div className="flex flex-col space-y-4 items-center">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {articles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              className="block p-4 bg-white w-2/3 rounded-md shadow-md"
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-sm">
                {article.user.id}
                {"("}
                {article.user.name}
                {")"}
              </p>
              <p className="text-sm text-gray-500">{article.created_at}</p>
              <h2 className="font-semibold text-lg p-1 hover:underline">
                {article.title}
              </h2>
              <div className="flex space-x-2">
                {article.tags.map((tag) => (
                  <p
                    key={tag.name}
                    className="bg-gray-200 p-1 text-sm text-gray-500 rounded-md"
                  >
                    {tag.name}
                  </p>
                ))}
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
