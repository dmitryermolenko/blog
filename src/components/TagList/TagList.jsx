import React from "react";
import { Button } from "antd";
import classes from "./TagList.module.scss";

const TagList = ({ tags, onDeleteTag }) => {
  return (
    <div>
      <h3 className={classes["tags__title"]}>Tags</h3>
      <ul className={classes["tags__list"]}>
        {tags.map(({ id, name }) => {
          return (
            <li key={id} className={classes["tags__item"]}>
              <span className={classes["tags__tag"]}>{name}</span>
              <Button
                className={classes["tags__delete"]}
                onClick={() => {
                  onDeleteTag(id);
                }}
              >
                Delete
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TagList;
