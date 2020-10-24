import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TagList from "../TagList/TagList";
import TagsForm from "../TagsForm/TagsForm";
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticlesService from "../../services/ArticlesServices";
import { addTag, deleteTag } from "../../utils/utils";
import classes from "./NewArticlePage.module.scss";

const NewArticlePage = () => {
  const articlesService = new ArticlesService();
  const history = useHistory();
  const [tags, setTags] = useState([]);

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
    <div className={classes.ArticlePage}>
      <h2 className={classes.ArticlePage__Title}>Create new article</h2>
      <ArticleForm onSubmitArticle={submitArticle} />
      <TagList
        tags={tags}
        onDeleteTag={(tag) => deleteTag(tags, tag, setTags)}
      />
      <TagsForm onAddTag={(tag) => addTag(tags, tag, setTags)} />
    </div>
  );
};

export default NewArticlePage;
