import { readFileSync } from "fs";
import path from "path";

const __dirname = path.resolve();
const articlesPath = path.join(__dirname, "/data/articles.json");
let articlesJson = JSON.parse(readFileSync(articlesPath, "utf-8"));


const cHome = {
    getHomePage: (req, res) => {
        res.render("home", {articlesJson});
        console.log(articlesJson);
    },
}

export default cHome;