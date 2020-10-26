import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { format, parseISO } from "date-fns";
import { Button } from "antd";
import ModalWarning from "../ModalWarning/ModalWarning";
import ArticlesService from "../../services/ArticlesServices";
import classes from "./Article.module.scss";

const Article = ({
  article: {
    title,
    slug,
    body,
    createdAt,
    tagList,
    description,
    author: { username, image },
    favoritesCount,
  },
  isFull = false,
  isFavorite,
  user = {},
  onLike,
  onDislake,
}) => {
  const articlesService = new ArticlesService();
  const [isModalVisible, setModalVisibility] = useState(false);
  const history = useHistory();
  const { username: currentUser } = user;

  const token = localStorage.getItem("token");
  const creatingTime = format(new Date(parseISO(createdAt)), "MMMM d, yyyy");
  const likeClasses = clsx(
    { [classes.Article__Like]: true },
    { [classes.Article__Like_favorited]: isFavorite },
    { [classes.Article__Like_disabled]: !token }
  );
  const likesCountClasses = clsx(
    { [classes.Article__LikesCount]: true },
    { [classes.Article__LikesCount_favorited]: isFavorite }
  );

  const deleteArticle = () => {
    articlesService
      .deleteArticle(slug)
      .then(() => history.push("/"))
      .catch((err) => console.log(err));
  };

  return (
    <article className={classes.Article}>
      <header className={classes.Article__Header}>
        <div className={classes.Article__Left}>
          <div className={classes.Article__TitleWrapper}>
            <h2 className={classes.Article__Title}>
              <Link className={classes.Article__Link} to={`/articles/${slug}`}>
                {title}
              </Link>
            </h2>
            <button
              className={likeClasses}
              onClick={isFavorite ? onDislake : onLike}
              disabled={!token ? true : false}
            ></button>
            <span className={likesCountClasses}>{favoritesCount}</span>
          </div>
          <ul className={classes.Article__Tags}>
            {tagList.map((tag) => (
              <li key={uuidv4()} className={classes.Article__TagsItem}>
                {tag}
              </li>
            ))}
          </ul>
          <p className={classes.Article__Description}>{description}</p>
        </div>
        <div className={classes.Article__Right}>
          <div className={classes.Article__Userinfo}>
            <span className={classes.Article__Username}>{username}</span>
            <span>{creatingTime}</span>
          </div>
          <img
            className={classes.Article__Avatar}
            src={image}
            width="46"
            height="46"
            alt="Avatar"
          ></img>
          {isFull && username === currentUser ? (
            <div className={classes.Article__Buttons}>
              <Button
                className={classes.Article__Delete}
                type="danger"
                onClick={() => setModalVisibility(true)}
              >
                Delete
              </Button>
              <Button
                className={classes.Article__Edit}
                type="primary"
                onClick={() => history.push(`/articles/${slug}/edit`)}
              >
                Edit
              </Button>
            </div>
          ) : null}
          {isModalVisible && (
            <ModalWarning
              onNoClick={() => setModalVisibility(false)}
              onYesClick={deleteArticle}
            />
          )}
        </div>
      </header>
      <section className={classes.Article__Body}>
        {isFull ? <ReactMarkdown source={body} /> : null}
      </section>
    </article>
  );
};
const mapStateToProps = ({ userData: { user } }) => ({ user });
export default connect(mapStateToProps)(Article);
