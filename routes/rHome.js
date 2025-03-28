import {Router} from 'express';
import cHome from '../controllers/cHome.js';
import cArticle from '../controllers/cArticle.js';

const routes = Router();

routes.get('/', cHome.getHomePage);
routes.get("/article/:id", cArticle.getArticle);

export default routes;