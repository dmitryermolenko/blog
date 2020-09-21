import { Component } from "react";

export default class ArticlesService extends Component {
  async getArticles() {
    const response = await fetch(
      "http://conduit.productionready.io/api/articles"
    );
    return response.json();
  }
}
