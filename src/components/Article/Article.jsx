import React from "react";

const Article = ({ article }) => {
  const { title, createdAt, tagList, description, author } = article;
  const { username, image } = author;
  return (
    <article>
      <header>
        <h2>{title}</h2>
        <span>12</span>
        <span>{tagList}</span>
        <span>{username}</span>
        <img src={image} alt="Avatar"></img>
        <span>{createdAt}</span>
      </header>
      <p>{description}</p>
    </article>
  );
};

export default Article;
