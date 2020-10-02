import React, { useState } from "react";
import TagList from "../TagList/TagList";
import TagsForm from "../TagsForm/TagsForm";
import ArticleForm from "../ArticleForm/ArticleForm";
import classes from "./NewArticlePage.module.scss";

const NewArticlePage = () => {
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

  return (
    <div className={classes["article-page"]}>
      <h2 className={classes["article-page__title"]}>Create new article</h2>
      <ArticleForm />
      <TagList tags={tags} onDeleteTag={deleteTag} />
      <TagsForm onAddTag={addTag} />
    </div>
  );
};

export default NewArticlePage;
