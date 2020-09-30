import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../Header/Header";
import ArticleListPage from "../../containers/ArticleListPage/ArticleListPage";
import ArticlePage from "../../containers/ArticlePage/ArticlePage";
import SignInPage from "../SignInPage/SignInPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import EditProfilePage from "../EditProfilePage/EditProfilePage";
import classes from "./App.module.scss";

const App = () => {
  return (
    <Router>
      <div className={classes.app}>
        <Header />
        <main className={classes.main}>
          <Route path="/" component={ArticleListPage} exact />
          <Route path="/articles" component={ArticleListPage} exact />
          <Route path="/articles/:slug" component={ArticlePage} exact />
          <Route path="/sign-in" component={SignInPage} exact />
          <Route path="/sign-up" component={SignUpPage} exact />
          <Route path="/profile" component={EditProfilePage} exact />
        </main>
      </div>
    </Router>
  );
};

export default App;
