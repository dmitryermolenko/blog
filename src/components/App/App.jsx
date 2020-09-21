import React from "react";
import ArticleList from "../ArticleList/ArticleList";
import classes from "./App.module.scss";

const App = () => {
  return (
    <div className={classes.app}>
      <header className={classes.header}></header>
      <main className={classes.main}>
        <ArticleList />
      </main>
    </div>
  );
};

export default App;
