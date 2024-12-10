const URL = require("../models/url");
const shortid = require("shortid");

const getAllUrls = async (req, res) => {
  const data = await URL.find({});
  return res.status(200).json(data);
};
const generateShortUrl = async (req, res) => {
  const { redirectUrl } = req.body;

  const uniqueId = shortid();

  if (!redirectUrl) {
    return res.status(400).json({ msg: "url field is required" });
  }

  const createUrl = await URL.create({
    shortId: uniqueId,
    redirectUrl: redirectUrl,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.status(200).render("home", {
    id: uniqueId,
  });
  // return res.status(201).json({ uniqueId });
};

const redirectUrl = async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  // console.log(entry);
  return res.status(200).redirect(entry.redirectUrl);
};

const getAnalytics = async (req, res) => {
  const shortId = await req.params.shortId;

  const result = await URL.findOne({
    shortId,
  });
  console.log(result);
  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    anlytics: result.visitHistory,
  });
};

module.exports = { getAllUrls, generateShortUrl, redirectUrl, getAnalytics };
