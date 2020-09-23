import React, { useEffect, useState } from "react";
import ArticlesService from "../../services/ArticlesServices";
import Article from "../Article/Article";

const ArticlePage = ({ slug }) => {
  const articlesService = new ArticlesService();
  const [article, setArticle] = useState(null);
  useEffect(() => {
    articlesService.getArticle(slug).then(({ article }) => {
      console.log(article);
      setArticle(article);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return <Article article={article} isFull={true} />;
};

export default ArticlePage;
