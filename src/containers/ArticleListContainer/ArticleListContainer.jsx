import React, { useState, useEffect } from "react";
import ArticleList from "../../components/ArticleList/ArticleList";
import ArticlesService from "../../services/ArticlesServices";
import { Pagination } from "antd";
import classes from "./ArticleListContainer.module.scss";

const ArticleListContainer = () => {
  const [articles, setArticles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const articlesService = new ArticlesService();
  useEffect(() => {
    articlesService.getArticles().then(({ articles }) => setArticles(articles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          console.log(page);
          articlesService
            .getArticles(page)
            .then(({ articles }) => setArticles(articles));
          setActivePage(page);
        }}
      />
    </React.Fragment>
  );
};

export default ArticleListContainer;
