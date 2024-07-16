const express = require("express");
const router = express.Router();
const { login, dashboard } = require("../controller/main");
const authenticationMiddleware = require("../middlewares/auth");

router.route("/login").post(login);
router.route("/dashboard").get(authenticationMiddleware, dashboard);

module.exports = router;
