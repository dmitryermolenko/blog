import React from "react";
import classes from "./Article.module.scss";

const Article = ({ article }) => {
  const { title, createdAt, tagList, description, author } = article;
  const { username, image } = author;
  return (
    <article className={classes.article}>
      <div className={classes["article__left"]}>
        <div className={classes["article__title-wrapper"]}>
          <h2 className={classes["article__title"]}>
            <a className={classes["article__link"]} href="test">
              {title}
            </a>
          </h2>
          <button>12</button>
        </div>
        <span>{tagList}</span>
        <p className={classes["article__content"]}>{description}</p>
      </div>
      <div className={classes["article__right"]}>
        <div className={classes["article__userinfo"]}>
          <span>{username}</span>
          <span>{createdAt}</span>
        </div>
        <img src={image} width="46" height="46" alt="Avatar"></img>
      </div>
    </article>
  );
};

export default Article;
