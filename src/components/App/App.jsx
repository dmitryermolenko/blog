import React from "react";
import ArticleListContainer from "../../containers/ArticleListContainer/ArticleListContainer";
import classes from "./App.module.scss";

const App = () => {
  return (
    <div className={classes.app}>
      <header className={classes.header}></header>
      <main className={classes.main}>
        <ArticleListContainer />
      </main>
    </div>
  );
};

export default App;
