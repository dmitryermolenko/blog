import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input, Button } from "antd";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import classes from "./TagsForm.module.scss";

const TagsForm = ({ onAddTag }) => {
  const { handleSubmit, control, errors, reset } = useForm({
    defaultValues: {
      addingTag: "",
    },
  });

  const addTag = ({ addingTag }) => {
    onAddTag(addingTag);
    reset();
  };

  return (
    <form className={classes.TagsForm} onSubmit={handleSubmit(addTag)}>
      {errors.addingTag && (
        <ErrorIndicator errorMessage="Should not be empty" />
      )}
      <Controller
        name="addingTag"
        control={control}
        as={<Input className={classes.TagsForm__Input} placeholder="Tag" />}
        rules={{
          validate: (value) => {
            return value.length !== 0;
          },
        }}
      />
      <Button className={classes.TagsForm__Submit} htmlType="submit">
        Add tag
      </Button>
    </form>
  );
};

export default TagsForm;
