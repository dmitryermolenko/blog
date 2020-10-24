import React from "react";
import ArticleWrapper from "../../containers/ArticleWrapper/ArticleWrapper";
import classes from "./ArticleList.module.scss";

const ArticleList = ({ articles }) => {
  return (
    <ul className={classes.ArticleList}>
      {articles.map((article) => {
        return (
          <li key={article.slug}>
            <ArticleWrapper article={article} />
          </li>
        );
      })}
    </ul>
  );
};

export default ArticleList;
