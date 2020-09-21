import React, { useState, useEffect } from "react";
import Article from "../Article/Article";
import ArticlesService from "../../services/ArticlesServices";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const articlesService = new ArticlesService();
  useEffect(() => {
    articlesService.getArticles().then(({ articles }) => setArticles(articles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ul>
      {articles.map((article) => {
        return (
          <li key={article.id}>
            <Article article={article} />
          </li>
        );
      })}
    </ul>
  );
};

export default ArticleList;
