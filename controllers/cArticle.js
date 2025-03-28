import { readFileSync, writeFileSync } from "fs";
import path from "path";

const __dirname = path.resolve();
const articlesPath = path.join(__dirname, "data", "articles.json");
let articlesJson = JSON.parse(readFileSync(articlesPath, "utf-8"));

const cArticle = {
    getArticle: (req, res) => {
        const articleId = parseInt(req.params.id);
        const article = articlesJson.find(article => parseInt(article.id) === articleId);
        console.log(article);
        if (article) {
            res.render("article", { article });
        } else {
            throw new Error("Article not found");
        }
    },

    createArticleForm: (req, res) => {
        res.render("articles/new", { title: "Create Article" });
    },

    createArticle: (req, res) => {
        const { title, content } = req.body;
        const newArticle = {
            id: articles.length + 1,
            title,
            content,
            createdAt: new Date(),
        };
        articles.push(newArticle);
        res.redirect("/articles");
    },

    updateArticleForm: (req, res) => {
        const article = articles.find(article => article.id === parseInt(req.params.id));
        if (!article) {
            return res.status(404).send("Article not found");
        }
        res.render("articles/edit", { title: "Edit Article", article });
    },

    updateArticle: (req, res) => {
        const article = articles.find(article => article.id === parseInt(req.params.id));
        if (!article) {
            return res.status(404).send("Article not found");
        }
        const { title, content } = req.body;
        article.title = title;
        article.content = content;
        res.redirect("/articles");
    },

    deleteArticle: (req, res) => {
        const articleId = parseInt(req.params.id);
        const articleIndex = articles.findIndex(article => article.id === articleId);
        if (articleIndex === -1) {
            return res.status(404).send("Article not found");
        }
        articles.splice(articleIndex, 1);
        res.redirect("/articles");
    },
}

export default cArticle;