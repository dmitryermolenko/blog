import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ArticleListPage from "../../containers/ArticleListPage/ArticleListPage";
import ArticlePage from "../../containers/ArticlePage/ArticlePage";
import classes from "./App.module.scss";

const App = () => {
  return (
    <Router>
      <div className={classes.app}>
        <header className={classes.header}></header>
        <main className={classes.main}>
          <Route path="/" component={ArticleListPage} exact />
          <Route path="/articles" component={ArticleListPage} exact />
          <Route
            path="/articles/:slug"
            render={({ match }) => {
              const { slug } = match.params;
              return <ArticlePage slug={slug} exact />;
            }}
          />
        </main>
      </div>
    </Router>
  );
};

export default App;
