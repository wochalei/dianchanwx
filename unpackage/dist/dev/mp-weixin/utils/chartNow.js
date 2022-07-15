"use strict";
var common_vendor = require("../common/vendor.js");
const goeasy = common_vendor.GoEasy.getInstance({
  host: "hangzhou.goeasy.io",
  appkey: "BC-ef177634c5e643c3ab3f33fa6fa25811",
  modules: ["pubsub"]
});
exports.goeasy = goeasy;
