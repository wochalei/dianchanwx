"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "shopping-cart",
  props: {
    shopCart: {
      type: Array,
      defalut: []
    }
  },
  emits: ["toShowCart", "addCount", "delCount", "clearShopData"],
  setup(__props, { emit: emits }) {
    const toShowCart = () => {
      emits("toShowCart");
    };
    const addCount = (item) => {
      emits("addCount", item);
    };
    const delCount = (item) => {
      emits("delCount", item);
    };
    const clearShopData = () => {
      emits("clearShopData");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toShowCart),
        b: common_vendor.o(clearShopData),
        c: common_vendor.f(__props.shopCart, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.unitPrice * item.count),
            c: common_vendor.o(($event) => delCount(item)),
            d: common_vendor.t(item.count),
            e: common_vendor.o(($event) => addCount(item))
          };
        })
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b22f1bfc"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/dianc/pages/index/components/shopping-cart.vue"]]);
wx.createComponent(Component);
