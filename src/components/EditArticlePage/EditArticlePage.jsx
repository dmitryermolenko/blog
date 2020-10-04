import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import TagList from "../TagList/TagList";
import TagsForm from "../TagsForm/TagsForm";
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticlesService from "../../services/ArticlesServices";
import { Alert, Spin } from "antd";
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
    /*if (articleData) {
      setTags(articleData.tagList.map(tag => {
        return {name: tag, id: `${tag}${Math.random()}`};
      }));
    }*/
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

  const addTag = (tag) => {
    setTags([...tags, { name: tag, id: `${tag}${Math.random()}` }]);
  };

  const deleteTag = (tagId) => {
    const copyTags = tags.filter((tag) => tag.id !== tagId);
    setTags(copyTags);
  };

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
      .createArticle(requestBody)
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
    <div className={classes["article-page"]}>
      <h2 className={classes["article-page__title"]}>Edit article</h2>
      {currentArticle && (
        <ArticleForm onSubmitArticle={submitArticle} article={currentArticle} />
      )}
      <TagList tags={tags} onDeleteTag={deleteTag} />
      <TagsForm onAddTag={addTag} />
    </div>
  );
};

export default EditArticlePage;
