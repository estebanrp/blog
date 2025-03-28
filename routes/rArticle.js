import { Router } from "express";
import cArticle from "../controllers/cArticle.js";

const routes = Router();    

routes.get("/article/new", cArticle.createArticleForm);
routes.post("/article/new", cArticle.createArticle);
routes.get("/article/edit/:id", cArticle.updateArticleForm);
routes.post("/article/edit/:id", cArticle.updateArticle);
routes.post("/article/delete/:id", cArticle.deleteArticle);

export default routes;