"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_db = require("../../utils/db.js");
const _sfc_main = {
  __name: "my-order",
  setup(__props) {
    const data = common_vendor.ref([]);
    common_vendor.onMounted(async () => {
      const res = await utils_db.db.collection("order").orderBy("orderTime", "desc").get();
      data.value = res.data;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(data.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.transacStatus === "success" ? "\u5DF2\u5B8C\u6210" : "\u672A\u7ED3\u8D26"),
            b: common_vendor.t(item.tableName),
            c: common_vendor.t(item.orderTime),
            d: common_vendor.t(item.totalPrice)
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Documents/HBuilderProjects/dianc/pages/my-order/my-order.vue"]]);
wx.createPage(MiniProgramPage);
