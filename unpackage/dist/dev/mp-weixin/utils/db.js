"use strict";
const db = wx.cloud.database({
  env: "cloud1-4gs6ldi71bcdcfef"
});
const _ = db.command;
exports._ = _;
exports.db = db;
