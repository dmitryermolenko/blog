import React from "react";
import Article from "../Article/Article";
import classes from "./ArticleList.module.scss";

const ArticleList = ({ articles }) => {
  return (
    <ul className={classes["article-list"]}>
      {articles.map((article) => {
        return (
          <li key={article.slug}>
            <Article article={article} />
          </li>
        );
      })}
    </ul>
  );
};

export default ArticleList;
