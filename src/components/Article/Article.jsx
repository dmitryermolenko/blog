import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import classes from "./Article.module.scss";

const Article = ({ article, isFull = false }) => {
  if (article) {
    const {
      title,
      slug,
      body,
      createdAt,
      tagList,
      description,
      author: { username, image },
      favoritesCount,
    } = article;

    return (
      <article className={classes.article}>
        <header className={classes["article__header"]}>
          <div className={classes["article__left"]}>
            <div className={classes["article__title-wrapper"]}>
              <h2 className={classes["article__title"]}>
                <Link
                  className={classes["article__link"]}
                  to={`/articles/${slug}`}
                >
                  {title}
                </Link>
              </h2>
              <button className={classes["article__likes"]}>
                {favoritesCount}
              </button>
            </div>
            <span className={classes["article__tags"]}>{tagList}</span>
          </div>
          <div className={classes["article__right"]}>
            <div className={classes["article__userinfo"]}>
              <span>{username}</span>
              <span>{createdAt}</span>
            </div>
            <img
              className={classes["article__avatar"]}
              src={image}
              width="46"
              height="46"
              alt="Avatar"
            ></img>
          </div>
        </header>
        <section className={classes["article__body"]}>
          <p className={classes["article__description"]}>{description}</p>
          {isFull ? <ReactMarkdown source={body} /> : null}
        </section>
      </article>
    );
  }

  return null;
};

export default Article;
