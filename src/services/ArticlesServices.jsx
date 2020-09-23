import { Component } from "react";

export default class ArticlesService extends Component {
  async getArticles(pageNumber = 1) {
    const response = await fetch(
      `http://conduit.productionready.io/api/articles?offset=${
        pageNumber * 20 - 20
      }`
    );
    return response.json();
  }

  async getArticle(slug) {
    const response = await fetch(
      `http://conduit.productionready.io/api/articles/${slug}`
    );
    return response.json();
  }
}
