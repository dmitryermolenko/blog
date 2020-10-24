import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../Header/Header";
import ArticleListPage from "../../containers/ArticleListPage/ArticleListPage";
import ArticlePage from "../../containers/ArticlePage/ArticlePage";
import SignInPage from "../SignInPage/SignInPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import EditProfilePage from "../EditProfilePage/EditProfilePage";
import NewArticlePage from "../NewArticlePage/NewArticlePage";
import EditArticlePage from "../EditArticlePage/EditArticlePage";
import classes from "./App.module.scss";

const App = () => {
  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <main className={classes.Main}>
          <Route path="/" component={ArticleListPage} exact />
          <Route path="/articles" component={ArticleListPage} exact />
          <Route path="/articles/:slug" component={ArticlePage} exact />
          <Route path="/sign-in" component={SignInPage} exact />
          <Route path="/sign-up" component={SignUpPage} exact />
          <Route path="/profile" component={EditProfilePage} exact />
          <Route path="/new-article" component={NewArticlePage} exact />
          <Route
            path="/articles/:slug/edit"
            component={EditArticlePage}
            exact
          />
        </main>
      </div>
    </Router>
  );
};

export default App;
