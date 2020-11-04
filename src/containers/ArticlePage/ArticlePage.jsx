import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Alert } from "antd";
import ArticlesService from "../../services/ArticlesServices";
import ArticleWrapper from "../../containers/ArticleWrapper/ArticleWrapper";
import classes from "../ArticleListPage/ArticleListPage.module.scss";

const ArticlePage = () => {
  const articlesService = new ArticlesService();
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setLoadingStatus] = useState(true);
  const [hasError, setError] = useState(false);
  useEffect(() => {
    articlesService
      .getArticle(slug)
      .then(({ article }) => {
        setLoadingStatus(false);
        setArticle(article);
      })
      .catch((err) => {
        setLoadingStatus(false);
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (isLoading) {
    return <Spin className={classes.spin} size="large" tip="Loading..." />;
  }

  if (hasError) {
    return <Alert className={classes.alert} message="Not found" type="error" />;
  }

  if (article) {
    return <ArticleWrapper article={article} isFull={true} />;
  }

  return null;
};

export default ArticlePage;
