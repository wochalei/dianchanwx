"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_db = require("../../utils/db.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const people = common_vendor.ref([1, 2, 3, 4]);
    const tableName = common_vendor.ref("");
    const cIndex = common_vendor.ref(-1);
    const chooseMan = (index) => {
      cIndex.value = index;
    };
    const toFood = () => {
      let obj = {
        man: people.value[cIndex.value],
        tableName: tableName.value
      };
      wx.setStorageSync("clientStatus", JSON.stringify(obj));
      wx.reLaunch({
        url: "/pages/index/index"
      });
    };
    common_vendor.onLoad(async (option) => {
      let obj = {
        man: people.value[cIndex.value],
        tableName: option.number
      };
      wx.setStorageSync("clientStatus", JSON.stringify(obj));
      const res = await utils_db.db.collection("order").where({
        tableName: option.number,
        transacStatus: "unsettled"
      }).get();
      if (res.data.length != 0) {
        wx.reLaunch({
          url: "/pages/order-details/details"
        });
        return;
      }
      tableName.value = option.number;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(tableName.value),
        b: common_vendor.f(people.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: cIndex.value === index ? 1 : "",
            c: common_vendor.o(($event) => chooseMan(index)),
            d: index
          };
        }),
        c: cIndex.value != -1 ? 1 : "",
        d: common_vendor.o(toFood)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Documents/HBuilderProjects/dianc/pages/chooseman/index.vue"]]);
wx.createPage(MiniProgramPage);
