"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_db = require("../../utils/db.js");
var utils_chartNow = require("../../utils/chartNow.js");
if (!Math) {
  (Details + Cart)();
}
const Cart = () => "./components/shopping-cart.js";
const Details = () => "./components/goods-details.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const toHistry = () => {
      wx.navigateTo({
        url: "/pages/my-order/my-order"
      });
    };
    const clientStatus = common_vendor.ref({});
    common_vendor.onMounted(() => {
      const status = JSON.parse(wx.getStorageSync("clientStatus"));
      clientStatus.value = status;
    });
    utils_chartNow.goeasy.connect({
      id: "",
      data: {},
      onSuccess: function() {
        console.log("GoEasy connect successfully.");
      },
      onFailed: function(error) {
        console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
      },
      onProgress: function(attempts) {
        console.log("GoEasy is connecting", attempts);
      }
    });
    function sendMessage() {
      const pubsub = utils_chartNow.goeasy.pubsub;
      pubsub.publish({
        channel: "my_channel",
        message: "Hello GoEasy!",
        onSuccess: function() {
          console.log("\u6D88\u606F\u53D1\u5E03\u6210\u529F\u3002");
        },
        onFailed: function(error) {
          console.log("\u6D88\u606F\u53D1\u9001\u5931\u8D25\uFF0C\u9519\u8BEF\u7F16\u7801\uFF1A" + error.code + " \u9519\u8BEF\u4FE1\u606F\uFF1A" + error.content);
        }
      });
    }
    const toSubmit = async () => {
      if (shopCart.value.length === 0)
        return;
      let totalPrice = 0;
      shopCart.value.forEach((item) => {
        totalPrice += item.count * item.unitPrice;
      });
      const orderData = {
        tableName: clientStatus.value.tableName,
        numberOfDiners: clientStatus.value.man,
        orderTime: common_vendor.hooks().utcOffset(8).format("YYYY-MM-DD HH:mm:ss"),
        totalPrice,
        transacStatus: "unsettled",
        orderReceiving: "unsettled",
        menu: [{
          goodList: shopCart.value
        }]
      };
      const getRes = await utils_db.db.collection("order").where({
        transacStatus: "unsettled",
        tableName: clientStatus.value.tableName
      }).get();
      if (getRes.data.length != 0) {
        await utils_db.db.collection("order").doc(getRes.data[0]._id).update({
          data: {
            menu: utils_db._.unshift({
              goodList: shopCart.value
            }),
            totalPrice: utils_db._.inc(totalPrice)
          }
        });
      } else {
        await utils_db.db.collection("order").add({
          data: orderData
        });
      }
      shopCart.value.forEach(async (item) => {
        await utils_db.db.collection("foodInfo").doc(item._id).update({
          data: {
            monthlySale: utils_db._.inc(item.count)
          }
        });
      });
      const daySale = await utils_db.db.collection("sevenSales").where({
        time: common_vendor.hooks().utcOffset(8).format("YYYY-MM-DD")
      }).get();
      if (daySale.data.length === 0) {
        await utils_db.db.collection("sevenSales").add({
          data: {
            time: common_vendor.hooks().utcOffset(8).format("YYYY-MM-DD"),
            total: totalPrice
          }
        });
      } else {
        await utils_db.db.collection("sevenSales").doc(daySale.data[0]._id).update({
          data: {
            total: utils_db._.inc(totalPrice)
          }
        });
      }
      dingMessage();
      clearShopData();
      sendMessage();
      wx.redirectTo({
        url: "/pages/order-details/details"
      });
    };
    const dingMessage = () => {
      wx.requestSubscribeMessage({
        tmplIds: ["GcOj-Sa8gzNwwPxR5WsxYtiwrbc4kK36GV7bneJ5xa8"],
        success(res) {
          console.log(res);
        }
      });
    };
    const shopCart = common_vendor.ref([]);
    const delCount = (item, index) => {
      const res = shopCart.value.find((kid) => {
        if (item === kid) {
          return kid;
        }
      });
      if (!res)
        return;
      typeData.value[index].count--;
      item.count--;
      if (item.count <= 0) {
        shopCart.value = shopCart.value.filter((tmp) => {
          return tmp != item;
        });
      }
    };
    const addCount = (item, index) => {
      const res = shopCart.value.find((kid) => {
        if (item === kid) {
          return kid;
        }
      });
      if (!res)
        shopCart.value.push(item);
      item.count++;
      typeData.value[index].count++;
    };
    const clearShopData = () => {
      shopCart.value.forEach((item) => {
        item.count = 0;
      });
      typeData.value.forEach((item) => {
        item.count = 0;
      });
      shopCart.value = [];
    };
    const allShopCount = common_vendor.computed$1(() => {
      let res = 0;
      shopCart.value.forEach((item) => {
        res += item.count;
      });
      return res;
    });
    const detailShow = common_vendor.ref(false);
    const detailItemData = common_vendor.ref({});
    const toShowDetails = (item, index) => {
      toCloseDetail();
      detailItemData.value = {
        item,
        index
      };
    };
    const toCloseDetail = () => {
      detailShow.value = !detailShow.value;
    };
    const cardShow = common_vendor.ref(false);
    const toShowCart = () => {
      cardShow.value = !cardShow.value;
    };
    const lIndex = common_vendor.ref("a0");
    const rIndex = common_vendor.ref("a0");
    const listHeight = common_vendor.ref([]);
    const changeIndex = (value) => {
      rIndex.value = value;
    };
    const scrollIndex = (e) => {
      const top = e.detail.scrollTop;
      const data = listHeight.value;
      for (let i = 0; i < data.length; i++) {
        if (top < data[0]) {
          lIndex.value = "a0";
          return;
        }
        if (data[i] < top && top < data[i + 1]) {
          lIndex.value = "a" + (i + 1);
          return;
        }
        if (data[data.length - 1] < top) {
          lIndex.value = "a" + data.length;
        }
      }
    };
    const listData = common_vendor.ref(null);
    const typeData = common_vendor.ref(null);
    common_vendor.onMounted(async () => {
      const res = await wx.cloud.callFunction({
        name: "dianchan",
        data: {}
      });
      listData.value = res.result.list;
      typeData.value = res.result.type.data;
      common_vendor.nextTick(() => {
        const tmp = [];
        const query = common_vendor.index.createSelectorQuery();
        query.selectAll(".rig-height").boundingClientRect((data) => {
          data.forEach((item, index) => {
            if (index == 0) {
              tmp[index] = item.height;
            } else {
              tmp[index] = tmp[index - 1] + item.height;
            }
          });
        }).exec();
        listHeight.value = tmp;
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(clientStatus.value.man),
        b: common_vendor.o(toHistry),
        c: common_vendor.f(typeData.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.count),
            c: index,
            d: lIndex.value == "a" + index ? 1 : "",
            e: common_vendor.o(($event) => changeIndex("a" + index))
          };
        }),
        d: common_vendor.f(listData.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.type),
            b: common_vendor.f(item.list, (tmp, index1, i1) => {
              return {
                a: common_vendor.t(tmp.name),
                b: common_vendor.t(tmp.monthlySale),
                c: common_vendor.t(tmp.unitPrice),
                d: common_vendor.t(tmp.unit),
                e: common_vendor.o(($event) => delCount(tmp, index)),
                f: common_vendor.t(tmp.count),
                g: common_vendor.o(($event) => addCount(tmp, index)),
                h: index1,
                i: common_vendor.o(($event) => toShowDetails(tmp, index))
              };
            }),
            c: index,
            d: "a" + index
          };
        }),
        e: common_vendor.o((...args) => _ctx.tolower && _ctx.tolower(...args)),
        f: rIndex.value,
        g: common_vendor.o(scrollIndex),
        h: common_vendor.t(common_vendor.unref(allShopCount)),
        i: common_vendor.o(toShowCart),
        j: common_vendor.t(common_vendor.unref(allShopCount)),
        k: common_vendor.o(toSubmit),
        l: detailShow.value
      }, detailShow.value ? {
        m: common_vendor.o(toCloseDetail),
        n: common_vendor.o(addCount),
        o: common_vendor.o(delCount),
        p: common_vendor.p({
          detailItemData: detailItemData.value
        })
      } : {}, {
        q: cardShow.value
      }, cardShow.value ? {
        r: common_vendor.o(toShowCart),
        s: common_vendor.o(addCount),
        t: common_vendor.o(delCount),
        v: common_vendor.o(clearShopData),
        w: common_vendor.p({
          shopCart: shopCart.value
        })
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-57280228"], ["__file", "C:/Users/Administrator/Documents/HBuilderProjects/dianc/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
