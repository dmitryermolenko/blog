import { Component } from "react";

export default class ArticlesService extends Component {
  async getArticles(pageNumber = 1) {
    const offset = pageNumber * 20 - 20;
    const response = await fetch(
      `http://conduit.productionready.io/api/articles?offset=${offset}`
    );

    if (!response.ok) {
      throw new Error(
        `Could not fetch https://conduit.productionready.io/api/articles?offset=${offset} , received ${response.status}`
      );
    }
    return response.json();
  }

  async getArticle(slug) {
    const response = await fetch(
      `http://conduit.productionready.io/api/articles/${slug}`
    );

    if (!response.ok) {
      throw new Error(
        `Could not fetch https://conduit.productionready.io/api/articles/${slug} , received ${response.status}`
      );
    }

    return response.json();
  }
}
