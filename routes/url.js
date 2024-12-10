const express = require("express");
const router = express();
const {
  getAllUrls,
  generateShortUrl,
  redirectUrl,
  getAnalytics,
} = require("../controllers/url");

router
  .get("/", getAllUrls)
  .get("/:shortId", redirectUrl)
  .get("/analytics/:shortId", getAnalytics);

router.post("/", generateShortUrl);

module.exports = router;
