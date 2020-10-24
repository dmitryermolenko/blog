import React from "react";
import { Button } from "antd";
import classes from "./TagList.module.scss";

const TagList = ({ tags, onDeleteTag }) => {
  return (
    <div>
      <h3 className={classes.Tags__Title}>Tags</h3>
      <ul className={classes.Tags__List}>
        {tags.map(({ id, name }) => {
          return (
            <li key={id} className={classes.Tags__Item}>
              <span className={classes.Tags__Tag}>{name}</span>
              <Button
                className={classes.Tags__Delete}
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
