import { Router } from "express";
import cAdmin from "../controllers/cAdmin.js";

const routes = Router();

routes.get("/login", cAdmin.getLoginForm);
routes.post("/login", cAdmin.login);
routes.get("/logout", cAdmin.logout);

export default routes;
