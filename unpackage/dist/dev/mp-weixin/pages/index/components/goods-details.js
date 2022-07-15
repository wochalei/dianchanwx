"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "goods-details",
  props: {
    detailItemData: {
      type: Object,
      default: {}
    }
  },
  emits: ["toCloseDetail", "addCount", "delCount"],
  setup(__props, { emit: emits }) {
    const addCount = ({ item, index }) => {
      emits("addCount", item, index);
    };
    const delCount = ({ item, index }) => {
      emits("delCount", item, index);
    };
    const toCloseDetail = () => {
      emits("toCloseDetail");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toCloseDetail),
        b: common_vendor.t(__props.detailItemData.item.name),
        c: common_vendor.t(__props.detailItemData.item.monthlySale),
        d: common_vendor.t(__props.detailItemData.item.unitPrice),
        e: common_vendor.t(__props.detailItemData.item.unit),
        f: common_vendor.o(($event) => delCount(__props.detailItemData)),
        g: common_vendor.t(__props.detailItemData.item.count),
        h: common_vendor.o(($event) => addCount(__props.detailItemData))
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b7e58d30"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/dianc/pages/index/components/goods-details.vue"]]);
wx.createComponent(Component);
