const express = require("express");
const router = express.Router();
const { postUserSignUp, postUserLogin } = require("../controllers/user");

router.post("/", postUserSignUp);

router.post("/login", postUserLogin);

module.exports = router;
