import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import ArticlesService from "../../services/ArticlesServices";
import Article from "../../components/Article/Article";
import classes from "../ArticleListPage/ArticleListPage.module.scss";

const ArticlePage = ({ slug }) => {
  const articlesService = new ArticlesService();
  const [article, setArticle] = useState(null);
  const [isLoading, setLoadingStatus] = useState(true);
  useEffect(() => {
    articlesService.getArticle(slug).then(({ article }) => {
      setLoadingStatus(false);
      setArticle(article);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (isLoading) {
    return <Spin className={classes.spin} size="large" tip="Loading..." />;
  }

  return <Article article={article} isFull={true} />;
};

export default ArticlePage;
