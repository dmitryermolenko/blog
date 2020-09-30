import React, { useState, useEffect } from "react";
import ArticleList from "../../components/ArticleList/ArticleList";
import ArticlesService from "../../services/ArticlesServices";
import { Pagination, Spin } from "antd";
import classes from "./ArticleListPage.module.scss";

const ArticleListPage = (props) => {
  const [articles, setArticles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setLoadingStatus] = useState(true);
  const articlesService = new ArticlesService();

  useEffect(() => {
    articlesService.getArticles().then(({ articles }) => {
      setLoadingStatus(false);
      setArticles(articles);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Spin className={classes.spin} size="large" tip="Loading..." />;
  }
  return (
    <React.Fragment>
      <ArticleList articles={articles} />
      <Pagination
        className={classes.pagination}
        showSizeChanger={false}
        current={activePage}
        pageSize={10}
        total={500}
        onChange={(page) => {
          setLoadingStatus(true);
          articlesService.getArticles(page).then(({ articles }) => {
            setLoadingStatus(false);
            setArticles(articles);
          });
          setActivePage(page);
        }}
      />
    </React.Fragment>
  );
};

export default ArticleListPage;
