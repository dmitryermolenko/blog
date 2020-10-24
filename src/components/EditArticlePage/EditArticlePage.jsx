import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import TagList from "../TagList/TagList";
import TagsForm from "../TagsForm/TagsForm";
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticlesService from "../../services/ArticlesServices";
import { Alert, Spin } from "antd";
import { addTag, deleteTag } from "../../utils/utils";
import classes from "../NewArticlePage/NewArticlePage.module.scss";
import * as styles from "../../containers/ArticleListPage/ArticleListPage.module.scss";

const EditArticlePage = () => {
  const articlesService = new ArticlesService();
  const history = useHistory();
  const { slug } = useParams();
  const [tags, setTags] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isLoading, setLoadingStatus] = useState(true);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    articlesService
      .getArticle(slug)
      .then(({ article }) => {
        setLoadingStatus(false);
        setCurrentArticle(article);
        setTags(
          article.tagList.map((tag) => {
            return { name: tag, id: `${tag}${Math.random()}` };
          })
        );
      })
      .catch((err) => {
        setLoadingStatus(false);
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitArticle = ({ title, description, body }) => {
    const tagList = tags.map((tag) => tag.name);
    const requestBody = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };

    articlesService
      .updateArticle(requestBody, slug)
      .then(({ article: { slug } }) => history.push(`/articles/${slug}`))
      .catch((err) => console.log(err));
  };

  if (!localStorage.getItem("token")) {
    history.push("/sign-in");
  }

  if (isLoading) {
    return <Spin className={styles.spin} size="large" tip="Loading..." />;
  }

  if (hasError) {
    return <Alert className={styles.alert} message="Not found" type="error" />;
  }

  return (
    <div className={classes.ArticlePage}>
      <h2 className={classes.ArticlePage__Title}>Edit article</h2>
      {currentArticle && (
        <ArticleForm onSubmitArticle={submitArticle} article={currentArticle} />
      )}
      <TagList
        tags={tags}
        onDeleteTag={(tag) => deleteTag(tags, tag, setTags)}
      />
      <TagsForm onAddTag={(tag) => addTag(tags, tag, setTags)} />
    </div>
  );
};

export default EditArticlePage;
