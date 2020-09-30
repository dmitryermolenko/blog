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

  async registerUser(data) {
    const response = await fetch(
      "https://conduit.productionready.io/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      }
    );

    return response.json();
  }

  async loginUser(data) {
    const response = await fetch(
      "https://conduit.productionready.io/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      }
    );

    return response.json();
  }
}
