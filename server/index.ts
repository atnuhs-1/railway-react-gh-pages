import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/App.tsx";
import axios from "axios";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

type QiitaArticle = {
  title: string;
  url: string;
  user: {
    id: string;
    name: string;
  };
  created_at: string;
  tags: { name: string }[];
};

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

// index.html以外の静的ファイルを提供
app.use((req, res, next) => {
  if (req.path !== "/" && req.path !== "/index.html") {
    return express.static("dist/public")(req, res, next);
  }
  next();
});

app.get("*", async (req, res) => {
  try {
    const token = process.env.REACT_APP_TOKEN;
    const response = await axios.get<QiitaArticle[]>(
      "https://qiita.com/api/v2/items",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const articles = response.data;

    const appString = renderToString(
      React.createElement(App, { initialArticles: articles })
    );
    // index.htmlを読み込む
    const indexFile = path.resolve("./dist/public/index.html");
    fs.readFile(indexFile, "utf8", (err, template) => {
      if (err) {
        console.error("Something went wrong:", err);
        return res.status(500).send("Oops, better luck next time!");
      }

      // HTMLを修正
      const html = template
        .replace('<!--app-html-->', `${appString}`)
        .replace(
          "<!--app-head-->",
          `<script>window.__INITIAL_DATA__ = ${JSON.stringify(
            articles
          )};</script>`
        );

      // 修正したHTMLを送信
      res.send(html);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
