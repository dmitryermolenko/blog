import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Alert } from "antd";
import ArticlesService from "../../services/ArticlesServices";
import Article from "../../components/Article/Article";
import classes from "../ArticleListPage/ArticleListPage.module.scss";

const ArticlePage = () => {
  const articlesService = new ArticlesService();
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setLoadingStatus] = useState(true);
  const [hasError, setError] = useState(false);
  const [isFavorite, setFavorite] = useState(localStorage.getItem(slug));
  useEffect(() => {
    articlesService
      .getArticle(slug)
      .then(({ article }) => {
        setLoadingStatus(false);
        setArticle(article);
        setFavorite(localStorage.getItem(slug));
      })
      .catch((err) => {
        setLoadingStatus(false);
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

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

  if (isLoading) {
    return <Spin className={classes.spin} size="large" tip="Loading..." />;
  }

  if (hasError) {
    return <Alert className={classes.alert} message="Not found" type="error" />;
  }

  if (article) {
    return (
      <Article
        article={article}
        isFull={true}
        isFavorite={isFavorite}
        onLike={setFavoriteArticle}
        onDislake={setUnfavoriteArticle}
      />
    );
  }

  return null;
};

export default ArticlePage;
