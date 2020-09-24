import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../Header/Header";
import ArticleListPage from "../../containers/ArticleListPage/ArticleListPage";
import ArticlePage from "../../containers/ArticlePage/ArticlePage";
import SignInPage from "../SignInPage/SignInPage";
import classes from "./App.module.scss";

const App = () => {
  return (
    <Router>
      <div className={classes.app}>
        <Header />
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
          <Route path="/sign-in" component={SignInPage} />
        </main>
      </div>
    </Router>
  );
};

export default App;
