import bcrypt from "bcrypt";
import error from "../middlewares/error.js";
import { readFileSync } from "fs";
import path from "path";

const __dirname = path.resolve();
const infoPath = path.join(__dirname, "/config/auth.json");
let infoJson = JSON.parse(readFileSync(infoPath, "utf-8"));


const cUser = {
  getLoginForm: (req, res) => {
    res.render("login");
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const results = infoJson.filter((user) => user.username === username);
      if (results.length === 0) {
        let err = {
          status: 401,
          message: `El usuario ${username} no fue encontrado`,
        };
        error.e401(req, res, err);
      }

      let user = results[0];
      let isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        let err = {
          status: 403,
          message: "Contraseña incorrecta",
        };

        error.e403(req, res, err);
      }

      req.session.user = user;
      res.redirect("/adminHome");

    } catch (err) {
      error.e500(req, res, err);
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};

export default cUser;
