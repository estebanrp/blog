import express from 'express';
import session from 'express-session';
import path from 'path';
import routesAdmin from './routes/rAdmin.js';
import routesHome from './routes/rHome.js';
import routesArticle from './routes/rArticle.js';
import { isAuthenticated } from "./middlewares/auth.js";

const app = express();
const PORT = 3000;

const __dirname = path.resolve();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "mi_secreto",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(routesAdmin);
app.use(routesHome);
app.use(isAuthenticated, routesArticle);

app.listen(PORT, () => {
    console.log(`Blog is running at http://localhost:${PORT}`);
});