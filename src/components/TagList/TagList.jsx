import React from "react";
import classes from "./TagList.module.scss";

const TagList = ({ tags, onDeleteTag }) => {
  return (
    <div>
      <h3 className={classes.Tags__Title}>Tags</h3>
      <ul className={classes.Tags__List}>
        {tags.map(({ id, name }) => {
          return (
            <li key={id} className={classes.Tags__Item}>
              <div
                className={classes.Tags__Tag}
                onClick={() => {
                  onDeleteTag(id);
                }}
              >
                {name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TagList;
