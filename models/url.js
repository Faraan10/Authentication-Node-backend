const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    shortId: { type: String, required: true, unique: true },
    redirectUrl: { type: String, required: true },
    visitHistory: [{ timestamp: { type: Number } }],
    // this below refers to users id
    // so that only the links created by specific user are displayed
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("url", urlSchema);
