import React, { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import ArticlesService from "../../services/ArticlesServices";
import Article from "../../components/Article/Article";
import classes from "../ArticleListPage/ArticleListPage.module.scss";

const ArticlePage = ({ slug }) => {
  const articlesService = new ArticlesService();
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

  return <Article article={article} isFull={true} />;
};

export default ArticlePage;
