import React from "react";
import { Controller, useForm } from "react-hook-form";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import { Input, Button } from "antd";
import classes from "./ArticleForm.module.scss";

const ArticleForm = ({ onSubmitArticle, article }) => {
  const { handleSubmit, control, errors } = useForm({
    mode: "onChange",
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
    },
  });
  const onSubmit = (data) => {
    onSubmitArticle(data);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Title</label>
      {errors.title && <ErrorIndicator errorMessage={errors.title.message} />}
      <Controller
        name="title"
        control={control}
        as={
          <Input
            className={classes["form__input"]}
            id="title"
            placeholder="Title"
          />
        }
        rules={{ required: "Title is required" }}
      />
      <label htmlFor="description">Short description</label>
      {errors.description && (
        <ErrorIndicator errorMessage={errors.description.message} />
      )}
      <Controller
        name="description"
        control={control}
        as={
          <Input
            className={classes["form__input"]}
            id="description"
            placeholder="Title"
          />
        }
        rules={{ required: "Short description is required" }}
      />
      <label htmlFor="body">Text</label>
      {errors.body && <ErrorIndicator errorMessage={errors.body.message} />}
      <Controller
        name="body"
        control={control}
        as={
          <Input.TextArea
            rows={10}
            className={classes["form__input"]}
            id="body"
            placeholder="Text"
          />
        }
        rules={{ required: "Text is required" }}
      />
      <Button
        className={classes["form__submit"]}
        type="primary"
        htmlType="submit"
      >
        Send
      </Button>
    </form>
  );
};

export default ArticleForm;
