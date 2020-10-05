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

  async getCurrentUser() {
    const response = await fetch(
      "https://conduit.productionready.io/api/user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.json();
  }

  async updateUser(data) {
    const response = await fetch(
      "https://conduit.productionready.io/api/user",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }
    );

    return response.json();
  }

  async createArticle(data) {
    const response = await fetch(
      "https://conduit.productionready.io/api/articles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }
    );

    return response.json();
  }

  async updateArticle(data, slug) {
    const response = await fetch(
      `https://conduit.productionready.io/api/articles/${slug}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }
    );

    return response.json();
  }

  async deleteArticle(slug) {
    const response = await fetch(
      `https://conduit.productionready.io/api/articles/${slug}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.json();
  }
}
