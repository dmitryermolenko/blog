import React, { useState } from "react";
import Article from "../../components/Article/Article";
import ArticlesService from "../../services/ArticlesServices";

const ArticleWrapper = ({ article: receivedArticle }) => {
  const articlesService = new ArticlesService();
  const { slug } = receivedArticle;
  const [article, setArticle] = useState(receivedArticle);
  const [isFavorite, setFavorite] = useState(localStorage.getItem(slug));
  const setFavoriteArticle = () => {
    articlesService
      .setFavoriteArticle(slug)
      .then(({ article }) => {
        setArticle(article);
        localStorage.setItem(slug, article.favorited);
        setFavorite(localStorage.getItem(slug));
      })
      .catch((err) => console.log(err));
  };

  const setUnfavoriteArticle = () => {
    articlesService
      .setUnfavoriteArticle(slug)
      .then(({ article }) => {
        setArticle(article);
        localStorage.removeItem(slug);
        setFavorite(localStorage.getItem(slug));
      })
      .catch((err) => console.log(err));
  };

  if (article) {
    return (
      <Article
        article={article}
        isFavorite={isFavorite}
        onLike={setFavoriteArticle}
        onDislake={setUnfavoriteArticle}
      />
    );
  }

  return null;
};

export default ArticleWrapper;
