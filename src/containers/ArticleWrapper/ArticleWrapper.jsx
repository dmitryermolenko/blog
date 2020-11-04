import React, { useState } from "react";
import Article from "../../components/Article/Article";
import ArticlesService from "../../services/ArticlesServices";

const ArticleWrapper = ({ article: receivedArticle, isFull }) => {
  const articlesService = new ArticlesService();
  const { slug } = receivedArticle;
  const [article, setArticle] = useState(receivedArticle);
  const [isFavorite, setFavorite] = useState(localStorage.getItem(slug));
  const [isLikeRequestSending, setLikeRequest] = useState(false);
  const setFavoriteArticle = () => {
    setLikeRequest(true);
    articlesService
      .setFavoriteArticle(slug)
      .then(({ article }) => {
        setLikeRequest(false);
        setArticle(article);
        localStorage.setItem(slug, article.favorited);
        setFavorite(localStorage.getItem(slug));
      })
      .catch((err) => {
        setLikeRequest(false);
        console.log(err);
      });
  };

  const setUnfavoriteArticle = () => {
    setLikeRequest(true);
    articlesService
      .setUnfavoriteArticle(slug)
      .then(({ article }) => {
        setLikeRequest(false);
        setArticle(article);
        localStorage.removeItem(slug);
        setFavorite(localStorage.getItem(slug));
      })
      .catch((err) => {
        setLikeRequest(false);
        console.log(err);
      });
  };

  if (article) {
    return (
      <Article
        article={article}
        isFull={isFull}
        isFavorite={isFavorite}
        onLike={setFavoriteArticle}
        onDislake={setUnfavoriteArticle}
        isLikeRequestSending={isLikeRequestSending}
      />
    );
  }

  return null;
};

export default ArticleWrapper;
