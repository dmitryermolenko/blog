import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TagList from "../TagList/TagList";
import TagsForm from "../TagsForm/TagsForm";
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticlesService from "../../services/ArticlesServices";
import classes from "./NewArticlePage.module.scss";

const NewArticlePage = () => {
  const articlesService = new ArticlesService();
  const history = useHistory();
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState(1);

  const addTag = (tag) => {
    setTags([...tags, { name: tag, id: tagId }]);
    setTagId(tagId + 1);
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
  return (
    <div className={classes["article-page"]}>
      <h2 className={classes["article-page__title"]}>Create new article</h2>
      <ArticleForm onSubmitArticle={submitArticle} />
      <TagList tags={tags} onDeleteTag={deleteTag} />
      <TagsForm onAddTag={addTag} />
    </div>
  );
};

export default NewArticlePage;
