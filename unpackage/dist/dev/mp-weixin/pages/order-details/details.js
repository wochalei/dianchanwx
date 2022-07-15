"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_db = require("../../utils/db.js");
const _sfc_main = {
  __name: "details",
  setup(__props) {
    const detailData = common_vendor.ref([]);
    const minData = common_vendor.ref([]);
    const status = common_vendor.ref({});
    const showAll = (index) => {
      minData.value[index].goodList = detailData.value[index].goodList;
      minData.value[index].max = 0;
    };
    const totalCount = () => {
      let total = 0;
      detailData.value.forEach((item) => {
        item.goodList.forEach((tmp) => {
          total += tmp.count;
        });
      });
      status.value.num = total;
    };
    const toAddFood = () => {
      wx.reLaunch({
        url: "/pages/index/index"
      });
    };
    common_vendor.onMounted(async () => {
      const clientStatus = JSON.parse(wx.getStorageSync("clientStatus"));
      console.log(clientStatus);
      const res = await utils_db.db.collection("order").where({ tableName: clientStatus.tableName, transacStatus: "unsettled" }).get();
      console.log(res);
      status.value = res.data[0];
      detailData.value = res.data[0].menu;
      minData.value = detailData.value.map((item) => {
        return {
          goodList: item.goodList.slice(0, 3),
          max: item.goodList.length
        };
      });
      totalCount();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(minData.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(minData.value.length - index),
            b: common_vendor.f(item.goodList, (itema, indexa, i1) => {
              return {
                a: common_vendor.t(itema.name),
                b: common_vendor.t(itema.count),
                c: common_vendor.t(itema.count * itema.unitPrice)
              };
            }),
            c: item.max > 3
          }, item.max > 3 ? {
            d: common_vendor.o(($event) => showAll(index))
          } : {});
        }),
        b: common_vendor.t(status.value.num),
        c: common_vendor.t(status.value.totalPrice),
        d: common_vendor.t(status.value._id),
        e: common_vendor.t(status.value.orderTime),
        f: common_vendor.t(status.value.tableName),
        g: common_vendor.o(toAddFood)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Documents/HBuilderProjects/dianc/pages/order-details/details.vue"]]);
wx.createPage(MiniProgramPage);
