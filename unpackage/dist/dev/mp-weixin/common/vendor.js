"use strict";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map2[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
}
const toDisplayString = (val) => {
  return isString$1(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend$1 = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction$1 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const LINEFEED = "\n";
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res2;
  return (...args) => {
    if (fn) {
      res2 = fn.apply(ctx, args);
      fn = null;
    }
    return res2;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString$1(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res2 = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res2 ? `?${res2}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const E = function() {
};
E.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale$1(locale2, messages) {
  if (!locale2) {
    return;
  }
  locale2 = locale2.trim().replace(/_/g, "-");
  if (messages && messages[locale2]) {
    return locale2;
  }
  locale2 = locale2.toLowerCase();
  if (locale2 === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale2.indexOf("zh") === 0) {
    if (locale2.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale2.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale2, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  const lang2 = startsWith(locale2, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang2) {
    return lang2;
  }
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn(data, key));
    if (isString$1(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray$1(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid2 = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid2; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid2 = valid;
    }
    if (!isValid2) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res2, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res2, extras);
    }
  }
  return res2;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction$1(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction$1(success);
  const hasFail = isFunction$1(fail);
  const hasComplete = isFunction$1(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res2) => {
    res2 = res2 || {};
    res2.errMsg = normalizeErrMsg$1(res2.errMsg, name);
    isFunction$1(beforeAll) && beforeAll(res2);
    if (res2.errMsg === name + ":ok") {
      isFunction$1(beforeSuccess) && beforeSuccess(res2, args);
      hasSuccess && success(res2);
    } else {
      hasFail && fail(res2);
    }
    hasComplete && complete(res2);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook) {
  return function(data) {
    return hook(data) || data;
  };
}
function queue$1(hooks2, data) {
  let promise = false;
  for (let i = 0; i < hooks2.length; i++) {
    const hook = hooks2[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      const res2 = hook(data);
      if (isPromise(res2)) {
        promise = Promise.resolve(res2);
      }
      if (res2 === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks2 = interceptors2[name];
    if (!isArray$1(hooks2)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res2) {
      queue$1(hooks2, res2).then((res3) => {
        return isFunction$1(oldCallback) && oldCallback(res3) || res3;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray$1(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray$1(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray$1(interceptor.invoke)) {
      const res2 = queue$1(interceptor.invoke, options);
      return res2.then((options2) => {
        return api(wrapperOptions(interceptor, options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction$1(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, fn, extend$1(args, { success: resolve, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys2 = Object.keys(formatArgs);
  for (let i = 0; i < keys2.length; i++) {
    const name = keys2[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction$1(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString$1(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res2) {
  return invokeCallback(id, extend$1(res2 || {}, { errMsg: name + ":ok" }));
}
function invokeFail(id, name, errMsg, errRes) {
  return invokeCallback(id, extend$1({ errMsg: name + ":fail" + (errMsg ? " " + errMsg : "") }, errRes));
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString$1(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString$1(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res2) => invokeSuccess(id, name, res2),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction$1(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks2 = interceptors2[name];
    const hook = interceptor[name];
    if (isArray$1(hooks2) && isFunction$1(hook)) {
      remove(hooks2, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res2 = childVal ? parentVal ? parentVal.concat(childVal) : isArray$1(childVal) ? childVal : [childVal] : parentVal;
  return res2 ? dedupeHooks(res2) : res2;
}
function dedupeHooks(hooks2) {
  const res2 = [];
  for (let i = 0; i < hooks2.length; i++) {
    if (res2.indexOf(hooks2[i]) === -1) {
      res2.push(hooks2[i]);
    }
  }
  return res2;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString$1(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString$1(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray$1(name))
    name = [name];
  name.forEach((n) => emitter.off(n, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "receive",
        data: normalizePushMessage(args.message)
      });
    });
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "unipush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction$1(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction$1(options.success) || isFunction$1(options.fail) || isFunction$1(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, api, extend$1({}, options, {
        success: resolve,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res2) {
      return method(processReturnValue(methodName, res2, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction$1(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction$1(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ${methodName} \u6682\u4E0D\u652F\u6301 ${key}`);
          } else if (isString$1(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction$1(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction$1(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res2, returnValue, keepReturnValue = false) {
    if (isFunction$1(protocols2.returnValue)) {
      res2 = protocols2.returnValue(methodName, res2);
    }
    return processArgs(methodName, res2, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction$1(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale$1 = () => {
  const app = getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale$1(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale2) => {
  const app = getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale2) {
    app.$vm.$locale = locale2;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale: locale2 }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale$1;
}
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale: getLocale$1,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, wx[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res2;
    if (providers[service]) {
      res2 = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction$1(success) && success(res2);
    } else {
      res2 = {
        errMsg: "getProvider:fail:\u670D\u52A1[" + service + "]\u4E0D\u5B58\u5728"
      };
      isFunction$1(fail) && fail(res2);
    }
    isFunction$1(complete) && complete(res2);
  };
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__E0FC1B1",
    appName: "dianc",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.4.18",
    uniRuntimeVersion: "3.4.18",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend$1(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray$1(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend$1(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend$1(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__E0FC1B1",
      appName: "dianc",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend$1(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res2 = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res2[name] = component[name];
  });
  return res2;
}
function createSelectorQuery() {
  const query = wx.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getProvider,
  createSelectorQuery
});
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  showActionSheet,
  getDeviceInfo,
  getAppBaseInfo,
  getWindowInfo
});
var index = initUni(shims, protocols);
function warn$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$1(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$1(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend$1({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
const get$3 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res2 = arr[key](...args);
      if (res2 === -1 || res2 === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res2;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res2 = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res2;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res2 = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res2;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res2;
    }
    if (isRef(res2)) {
      return targetIsArray && isIntegerKey(key) ? res2 : res2.value;
    }
    if (isObject$1(res2)) {
      return isReadonly2 ? readonly(res2) : reactive(res2);
    }
    return res2;
  };
}
const set$1$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$3,
  set: set$1$1,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend$1({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend$1({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add$2(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto2 = getProto(target);
  const hadKey = proto2.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1$1$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add: add$2,
    set: set$1$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add: add$2,
    set: set$1$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res2 = [];
  const keys2 = Object.keys(props);
  keys2.slice(0, 3).forEach((key) => {
    res2.push(...formatProp(key, props[key]));
  });
  if (keys2.length > 3) {
    res2.push(` ...`);
  }
  return res2;
}
function formatProp(key, value, raw) {
  if (isString$1(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction$1(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res2;
  try {
    res2 = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res2;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$1(fn)) {
    const res2 = callWithErrorHandling(fn, instance, type, args);
    if (res2 && isPromise(res2)) {
      res2.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res2;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
  return i;
}
function queueCb(cb, activeQueue, pendingQueue, index2) {
  if (!isArray$1(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
        continue;
      }
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  flushPreFlushCbs();
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  flushPreFlushCbs(seen);
  queue.sort((a, b) => getId(a) - getId(b));
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn$1$1(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
function emit(event, ...args) {
}
function devtoolsComponentEmit(component, event, params) {
  emit("component:emit", component.appContext.app, component, event, params);
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction$1(validator)) {
          const isValid2 = validator(...rawArgs);
          if (!isValid2) {
            warn$1$1(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => a.trim());
    }
    if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend$1(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend$1(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$1$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction$1(cb)) {
    warn$1$1(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$1$1(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$1$1(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s) => {
    warn$1$1(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction$1(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => queuePreFlushCb(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res2 = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res2;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks2 = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res2 = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res2;
    });
    if (prepend) {
      hooks2.unshift(wrappedHook);
    } else {
      hooks2.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn$1$1(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook$1 = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook$1("bm");
const onMounted = createHook$1("m");
const onBeforeUpdate = createHook$1("bu");
const onUpdated = createHook$1("u");
const onBeforeUnmount = createHook$1("bum");
const onUnmounted = createHook$1("um");
const onServerPrefetch = createHook$1("sp");
const onRenderTriggered = createHook$1("rtg");
const onRenderTracked = createHook$1("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend$1(/* @__PURE__ */ Object.create(null), {
  $: (i) => i,
  $el: (i) => i.__$el || (i.__$el = {}),
  $data: (i) => i.data,
  $props: (i) => shallowReadonly(i.props),
  $attrs: (i) => shallowReadonly(i.attrs),
  $slots: (i) => shallowReadonly(i.slots),
  $refs: (i) => shallowReadonly(i.refs),
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
  $watch: (i) => instanceWatch.bind(i)
});
const isReservedPrefix = (key) => key === "_" || key === "$";
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    if (setupState !== EMPTY_OBJ && setupState.__isScriptSetup && hasOwn(setupState, key)) {
      return setupState[key];
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString$1(key) || key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$1$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1$1(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1$1(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`, instance);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1$1(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1$1(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1$1(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction$1(dataOptions)) {
      warn$1$1(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1$1(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$1(data)) {
      warn$1$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1$1(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed$1({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn$1$1(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    } else {
      warn$1$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions(to2, from2, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from2;
  if (extendsOptions) {
    mergeOptions(to2, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to2, m, strats, true));
  }
  for (const key in from2) {
    if (asMixin && key === "expose") {
      warn$1$1(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to2[key] = strat ? strat(to2[key], from2[key]) : from2[key];
    }
  }
  return to2;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to2, from2) {
  if (!from2) {
    return to2;
  }
  if (!to2) {
    return from2;
  }
  return function mergedDataFn() {
    return extend$1(isFunction$1(to2) ? to2.call(this, this) : to2, isFunction$1(from2) ? from2.call(this, this) : from2);
  };
}
function mergeInject(to2, from2) {
  return mergeObjectOptions(normalizeInject(to2), normalizeInject(from2));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res2 = {};
    for (let i = 0; i < raw.length; i++) {
      res2[raw[i]] = raw[i];
    }
    return res2;
  }
  return raw;
}
function mergeAsArray$1(to2, from2) {
  return to2 ? [...new Set([].concat(to2, from2))] : from2;
}
function mergeObjectOptions(to2, from2) {
  return to2 ? extend$1(extend$1(/* @__PURE__ */ Object.create(null), to2), from2) : from2;
}
function mergeWatchOptions(to2, from2) {
  if (!to2)
    return from2;
  if (!from2)
    return to2;
  const merged = extend$1(/* @__PURE__ */ Object.create(null), to2);
  for (const key in from2) {
    merged[key] = mergeAsArray$1(to2[key], from2[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (!(instance.type.__hmrId || instance.parent && instance.parent.type.__hmrId) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
      extend$1(normalized, props);
      if (keys2)
        needCastKeys.push(...keys2);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString$1(raw[i])) {
        warn$1$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn$1$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction$1(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res2 = [normalized, needCastKeys];
  cache.set(comp, res2);
  return res2;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn$1$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction$1(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$1$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid2 = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid2; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid2 = valid;
    }
    if (!isValid2) {
      warn$1$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$1$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$1(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn$1$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn$1$1(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction$1(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction$1(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1$1(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount() {
      },
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1$1(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
const queuePostRenderEffect = queuePostFlushCb;
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend$1({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$1$1("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1$1(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1$1(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1$1(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1$1(`Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
    } else {
      warn$1$1(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    },
    set() {
      warn$1$1(`setupContext.attrs is readonly.`);
      return false;
    },
    deleteProperty() {
      warn$1$1(`setupContext.attrs is readonly.`);
      return false;
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (instance.exposed) {
      warn$1$1(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction$1(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed$1 = (getterOrOptions, debugOptions) => {
  return computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.37";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff$1(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick$1(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(fn.bind(instance.proxy), instance, 14);
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve) => {
    _resolve = resolve;
  });
}
function clone$2(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray$1(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone$2(src[i], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn(src, name)) {
          copy[name] = clone$2(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone$2(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys2) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys2.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys2 = Object.keys(data);
    const diffData = diff$1(data, oldData || getMPInstanceData(mpInstance, keys2));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs(void 0, instance.update);
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick$1(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys2 = Object.keys(computedOptions);
    if (keys2.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys2);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const doSet = () => {
    const mpComponents = $scope.selectAllComponents(".r").concat($scope.selectAllComponents(".r-i-f"));
    $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, findComponentPublicInstance(mpComponents, templateRef.i), setupState));
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick$1(instance, doSet);
  }
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    return getExposeProxy(vm.$) || vm;
  }
  return null;
}
function setTemplateRef({ r, f: f2 }, refValue, setupState) {
  if (isFunction$1(r)) {
    r(refValue, {});
  } else {
    const _isString = isString$1(r);
    const _isRef = isRef(r);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray$1(r.value)) {
          r.value = [];
        }
        const existing = r.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn(setupState, r)) {
          setupState[r] = refValue;
        }
      } else if (isRef(r)) {
        r.value = refValue;
      } else {
        warnRef(r);
      }
    } else {
      warnRef(r);
    }
  }
}
function warnRef(ref2) {
  warn$1$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect$1 = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
  }
  setupComponent(instance);
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res2;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res2 || (res2 = {}))[key] = attrs[key];
    }
  }
  return res2;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(props, null);
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys2 = Object.keys(fallthroughAttrs2).filter((key) => key !== "class" && key !== "style");
    if (!keys2.length) {
      return;
    }
    if (propsOptions && keys2.some(isModelListener)) {
      keys2.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys2.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs(void 0, instance.update);
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString$1(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff$1(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      patch(instance, renderComponentRoot(instance));
    } else {
      const { bu, u } = instance;
      toggleRecurse(instance, false);
      updateComponentPreRender(instance);
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      patch(instance, renderComponentRoot(instance));
      if (u) {
        queuePostRenderEffect$1(u);
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
  const update = instance.update = effect.run.bind(effect);
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect$1(um);
  }
  queuePostRenderEffect$1(() => {
    instance.isUnmounted = true;
  });
}
const oldCreateApp = createAppAPI();
function createVueApp(rootComponent, rootProps = null) {
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options) {
    return mountComponent(createVNode(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    app._instance = instance.$;
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn$1$1(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction$1(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType) {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (name.indexOf("on") === 0) {
      const hooks2 = options[name];
      if (isArray$1(hooks2)) {
        hooks2.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks2, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set$2(target, key, val) {
  return target[key] = val;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to2, from2) {
  return to2 ? [...new Set([].concat(to2, from2))] : from2;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token2 = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token2.split(".");
  if (!token2 || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  if (isFunction$1(app._component.onError)) {
    appConfig.errorHandler = createErrorHandler(app);
  }
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set$2;
    globalProperties.$applyOptions = applyOptions$2;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString$1(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? eventTarget.dataset.eventsync === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res2 = invoke();
      if (e2.type === "input" && (isArray$1(res2) || isPromise(res2))) {
        return;
      }
      return res2;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend$1({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$1(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray$1(source) || isString$1(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, i);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn$1$1(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, i);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, i));
    } else {
      const keys2 = Object.keys(source);
      ret = new Array(keys2.length);
      for (let i = 0, l = keys2.length; i < l; i++) {
        const key = keys2[i];
        ret[i] = renderItem(source[key], key, i);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
const o = (value, key) => vOn(value, key);
const f = (source, renderItem) => vFor(source, renderItem);
const e = (target, ...sources) => extend$1(target, ...sources);
const t = (val) => toDisplayString(val);
const p = (props) => renderProps(props);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const eventChannels = {};
const eventChannelStack = [];
function getEventChannel(id) {
  if (id) {
    const eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray$1(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks2 = this.$[name];
  if (hooks2 && hooks2.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  } else if (name === "onLoad" && args && args.__id__) {
    this.__eventChannel__ = getEventChannel(args.__id__);
    delete args.__id__;
  }
  const hooks2 = this.$[name];
  return hooks2 && invokeArrayFns(hooks2, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
];
function findHooks(vueOptions, hooks2 = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (name.indexOf("on") === 0 && isFunction$1(vueOptions[name])) {
        hooks2.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks2));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks2);
      }
    }
  }
  return hooks2;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks2, excludes = EXCLUDE_HOOKS) {
  hooks2.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks2 = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks2.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray$1(mixins)) {
      const hooks2 = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks2.forEach((hook) => {
          if (hasOwn(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend$1(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = getApp({
      allowDefault: true
    });
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction$1(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction$1(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction$1(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale2 = ref(normalizeLocale$1(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale2.value;
    },
    set(v) {
      locale2.value = v;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray$1(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  "eO",
  "uR",
  "uRIF",
  "uI",
  "uT",
  "uP",
  "uS"
];
function initDefaultProps(isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend$1(mpComponentOptions.properties, initDefaultProps());
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray$1(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res2 = parsePropType(type);
  return PROP_TYPES.indexOf(res2) !== -1 ? res2 : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray$1(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction$1(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    invalidateJob(instance.update);
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray$1(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray$1(vueProps)) {
          vueProps.push("name");
          vueProps.push("value");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (vueOptions.options) {
    extend$1(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getApp().$vm.$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  mocks,
  isPage,
  initRelation,
  handleLink,
  initLifetimes
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var hookCallback;
function hooks() {
  return hookCallback.apply(null, arguments);
}
function setHookCallback(callback) {
  hookCallback = callback;
}
function isArray(input) {
  return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
}
function isObject(input) {
  return input != null && Object.prototype.toString.call(input) === "[object Object]";
}
function hasOwnProp(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
function isObjectEmpty(obj) {
  if (Object.getOwnPropertyNames) {
    return Object.getOwnPropertyNames(obj).length === 0;
  } else {
    var k;
    for (k in obj) {
      if (hasOwnProp(obj, k)) {
        return false;
      }
    }
    return true;
  }
}
function isUndefined(input) {
  return input === void 0;
}
function isNumber(input) {
  return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
}
function isDate(input) {
  return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
}
function map(arr, fn) {
  var res2 = [], i, arrLen = arr.length;
  for (i = 0; i < arrLen; ++i) {
    res2.push(fn(arr[i], i));
  }
  return res2;
}
function extend(a, b) {
  for (var i in b) {
    if (hasOwnProp(b, i)) {
      a[i] = b[i];
    }
  }
  if (hasOwnProp(b, "toString")) {
    a.toString = b.toString;
  }
  if (hasOwnProp(b, "valueOf")) {
    a.valueOf = b.valueOf;
  }
  return a;
}
function createUTC(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, true).utc();
}
function defaultParsingFlags() {
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
}
function getParsingFlags(m) {
  if (m._pf == null) {
    m._pf = defaultParsingFlags();
  }
  return m._pf;
}
var some;
if (Array.prototype.some) {
  some = Array.prototype.some;
} else {
  some = function(fun) {
    var t2 = Object(this), len = t2.length >>> 0, i;
    for (i = 0; i < len; i++) {
      if (i in t2 && fun.call(this, t2[i], i, t2)) {
        return true;
      }
    }
    return false;
  };
}
function isValid(m) {
  if (m._isValid == null) {
    var flags = getParsingFlags(m), parsedParts = some.call(flags.parsedDateParts, function(i) {
      return i != null;
    }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
    if (m._strict) {
      isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
    }
    if (Object.isFrozen == null || !Object.isFrozen(m)) {
      m._isValid = isNowValid;
    } else {
      return isNowValid;
    }
  }
  return m._isValid;
}
function createInvalid(flags) {
  var m = createUTC(NaN);
  if (flags != null) {
    extend(getParsingFlags(m), flags);
  } else {
    getParsingFlags(m).userInvalidated = true;
  }
  return m;
}
var momentProperties = hooks.momentProperties = [], updateInProgress = false;
function copyConfig(to2, from2) {
  var i, prop, val, momentPropertiesLen = momentProperties.length;
  if (!isUndefined(from2._isAMomentObject)) {
    to2._isAMomentObject = from2._isAMomentObject;
  }
  if (!isUndefined(from2._i)) {
    to2._i = from2._i;
  }
  if (!isUndefined(from2._f)) {
    to2._f = from2._f;
  }
  if (!isUndefined(from2._l)) {
    to2._l = from2._l;
  }
  if (!isUndefined(from2._strict)) {
    to2._strict = from2._strict;
  }
  if (!isUndefined(from2._tzm)) {
    to2._tzm = from2._tzm;
  }
  if (!isUndefined(from2._isUTC)) {
    to2._isUTC = from2._isUTC;
  }
  if (!isUndefined(from2._offset)) {
    to2._offset = from2._offset;
  }
  if (!isUndefined(from2._pf)) {
    to2._pf = getParsingFlags(from2);
  }
  if (!isUndefined(from2._locale)) {
    to2._locale = from2._locale;
  }
  if (momentPropertiesLen > 0) {
    for (i = 0; i < momentPropertiesLen; i++) {
      prop = momentProperties[i];
      val = from2[prop];
      if (!isUndefined(val)) {
        to2[prop] = val;
      }
    }
  }
  return to2;
}
function Moment(config) {
  copyConfig(this, config);
  this._d = new Date(config._d != null ? config._d.getTime() : NaN);
  if (!this.isValid()) {
    this._d = new Date(NaN);
  }
  if (updateInProgress === false) {
    updateInProgress = true;
    hooks.updateOffset(this);
    updateInProgress = false;
  }
}
function isMoment(obj) {
  return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
}
function warn(msg) {
  if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
    console.warn("Deprecation warning: " + msg);
  }
}
function deprecate(msg, fn) {
  var firstTime = true;
  return extend(function() {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(null, msg);
    }
    if (firstTime) {
      var args = [], arg, i, key, argLen = arguments.length;
      for (i = 0; i < argLen; i++) {
        arg = "";
        if (typeof arguments[i] === "object") {
          arg += "\n[" + i + "] ";
          for (key in arguments[0]) {
            if (hasOwnProp(arguments[0], key)) {
              arg += key + ": " + arguments[0][key] + ", ";
            }
          }
          arg = arg.slice(0, -2);
        } else {
          arg = arguments[i];
        }
        args.push(arg);
      }
      warn(msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack);
      firstTime = false;
    }
    return fn.apply(this, arguments);
  }, fn);
}
var deprecations = {};
function deprecateSimple(name, msg) {
  if (hooks.deprecationHandler != null) {
    hooks.deprecationHandler(name, msg);
  }
  if (!deprecations[name]) {
    warn(msg);
    deprecations[name] = true;
  }
}
hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;
function isFunction(input) {
  return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
}
function set(config) {
  var prop, i;
  for (i in config) {
    if (hasOwnProp(config, i)) {
      prop = config[i];
      if (isFunction(prop)) {
        this[i] = prop;
      } else {
        this["_" + i] = prop;
      }
    }
  }
  this._config = config;
  this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
}
function mergeConfigs(parentConfig, childConfig) {
  var res2 = extend({}, parentConfig), prop;
  for (prop in childConfig) {
    if (hasOwnProp(childConfig, prop)) {
      if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
        res2[prop] = {};
        extend(res2[prop], parentConfig[prop]);
        extend(res2[prop], childConfig[prop]);
      } else if (childConfig[prop] != null) {
        res2[prop] = childConfig[prop];
      } else {
        delete res2[prop];
      }
    }
  }
  for (prop in parentConfig) {
    if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
      res2[prop] = extend({}, res2[prop]);
    }
  }
  return res2;
}
function Locale(config) {
  if (config != null) {
    this.set(config);
  }
}
var keys;
if (Object.keys) {
  keys = Object.keys;
} else {
  keys = function(obj) {
    var i, res2 = [];
    for (i in obj) {
      if (hasOwnProp(obj, i)) {
        res2.push(i);
      }
    }
    return res2;
  };
}
var defaultCalendar = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function calendar(key, mom, now2) {
  var output = this._calendar[key] || this._calendar["sameElse"];
  return isFunction(output) ? output.call(mom, now2) : output;
}
function zeroFill(number, targetLength, forceSign) {
  var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
  return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
function addFormatToken(token2, padded, ordinal2, callback) {
  var func = callback;
  if (typeof callback === "string") {
    func = function() {
      return this[callback]();
    };
  }
  if (token2) {
    formatTokenFunctions[token2] = func;
  }
  if (padded) {
    formatTokenFunctions[padded[0]] = function() {
      return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
    };
  }
  if (ordinal2) {
    formatTokenFunctions[ordinal2] = function() {
      return this.localeData().ordinal(func.apply(this, arguments), token2);
    };
  }
}
function removeFormattingTokens(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|\]$/g, "");
  }
  return input.replace(/\\/g, "");
}
function makeFormatFunction(format2) {
  var array = format2.match(formattingTokens), i, length;
  for (i = 0, length = array.length; i < length; i++) {
    if (formatTokenFunctions[array[i]]) {
      array[i] = formatTokenFunctions[array[i]];
    } else {
      array[i] = removeFormattingTokens(array[i]);
    }
  }
  return function(mom) {
    var output = "", i2;
    for (i2 = 0; i2 < length; i2++) {
      output += isFunction(array[i2]) ? array[i2].call(mom, format2) : array[i2];
    }
    return output;
  };
}
function formatMoment(m, format2) {
  if (!m.isValid()) {
    return m.localeData().invalidDate();
  }
  format2 = expandFormat(format2, m.localeData());
  formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
  return formatFunctions[format2](m);
}
function expandFormat(format2, locale2) {
  var i = 5;
  function replaceLongDateFormatTokens(input) {
    return locale2.longDateFormat(input) || input;
  }
  localFormattingTokens.lastIndex = 0;
  while (i >= 0 && localFormattingTokens.test(format2)) {
    format2 = format2.replace(localFormattingTokens, replaceLongDateFormatTokens);
    localFormattingTokens.lastIndex = 0;
    i -= 1;
  }
  return format2;
}
var defaultLongDateFormat = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function longDateFormat(key) {
  var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
  if (format2 || !formatUpper) {
    return format2;
  }
  this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
    if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
      return tok.slice(1);
    }
    return tok;
  }).join("");
  return this._longDateFormat[key];
}
var defaultInvalidDate = "Invalid date";
function invalidDate() {
  return this._invalidDate;
}
var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
function ordinal(number) {
  return this._ordinal.replace("%d", number);
}
var defaultRelativeTime = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function relativeTime(number, withoutSuffix, string, isFuture) {
  var output = this._relativeTime[string];
  return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
}
function pastFuture(diff2, output) {
  var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
  return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
}
var aliases = {};
function addUnitAlias(unit, shorthand) {
  var lowerCase = unit.toLowerCase();
  aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
}
function normalizeUnits(units) {
  return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
}
function normalizeObjectUnits(inputObject) {
  var normalizedInput = {}, normalizedProp, prop;
  for (prop in inputObject) {
    if (hasOwnProp(inputObject, prop)) {
      normalizedProp = normalizeUnits(prop);
      if (normalizedProp) {
        normalizedInput[normalizedProp] = inputObject[prop];
      }
    }
  }
  return normalizedInput;
}
var priorities = {};
function addUnitPriority(unit, priority) {
  priorities[unit] = priority;
}
function getPrioritizedUnits(unitsObj) {
  var units = [], u;
  for (u in unitsObj) {
    if (hasOwnProp(unitsObj, u)) {
      units.push({ unit: u, priority: priorities[u] });
    }
  }
  units.sort(function(a, b) {
    return a.priority - b.priority;
  });
  return units;
}
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function absFloor(number) {
  if (number < 0) {
    return Math.ceil(number) || 0;
  } else {
    return Math.floor(number);
  }
}
function toInt(argumentForCoercion) {
  var coercedNumber = +argumentForCoercion, value = 0;
  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber);
  }
  return value;
}
function makeGetSet(unit, keepTime) {
  return function(value) {
    if (value != null) {
      set$1(this, unit, value);
      hooks.updateOffset(this, keepTime);
      return this;
    } else {
      return get(this, unit);
    }
  };
}
function get(mom, unit) {
  return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
}
function set$1(mom, unit, value) {
  if (mom.isValid() && !isNaN(value)) {
    if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
      value = toInt(value);
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value, mom.month(), daysInMonth(value, mom.month()));
    } else {
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
    }
  }
}
function stringGet(units) {
  units = normalizeUnits(units);
  if (isFunction(this[units])) {
    return this[units]();
  }
  return this;
}
function stringSet(units, value) {
  if (typeof units === "object") {
    units = normalizeObjectUnits(units);
    var prioritized = getPrioritizedUnits(units), i, prioritizedLen = prioritized.length;
    for (i = 0; i < prioritizedLen; i++) {
      this[prioritized[i].unit](units[prioritized[i].unit]);
    }
  } else {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units](value);
    }
  }
  return this;
}
var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
regexes = {};
function addRegexToken(token2, regex, strictRegex) {
  regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
    return isStrict && strictRegex ? strictRegex : regex;
  };
}
function getParseRegexForToken(token2, config) {
  if (!hasOwnProp(regexes, token2)) {
    return new RegExp(unescapeFormat(token2));
  }
  return regexes[token2](config._strict, config._locale);
}
function unescapeFormat(s) {
  return regexEscape(s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
    return p1 || p2 || p3 || p4;
  }));
}
function regexEscape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var tokens = {};
function addParseToken(token2, callback) {
  var i, func = callback, tokenLen;
  if (typeof token2 === "string") {
    token2 = [token2];
  }
  if (isNumber(callback)) {
    func = function(input, array) {
      array[callback] = toInt(input);
    };
  }
  tokenLen = token2.length;
  for (i = 0; i < tokenLen; i++) {
    tokens[token2[i]] = func;
  }
}
function addWeekParseToken(token2, callback) {
  addParseToken(token2, function(input, array, config, token3) {
    config._w = config._w || {};
    callback(input, config._w, config, token3);
  });
}
function addTimeToArrayFromToken(token2, input, config) {
  if (input != null && hasOwnProp(tokens, token2)) {
    tokens[token2](input, config._a, config, token2);
  }
}
var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
function mod(n, x) {
  return (n % x + x) % x;
}
var indexOf;
if (Array.prototype.indexOf) {
  indexOf = Array.prototype.indexOf;
} else {
  indexOf = function(o2) {
    var i;
    for (i = 0; i < this.length; ++i) {
      if (this[i] === o2) {
        return i;
      }
    }
    return -1;
  };
}
function daysInMonth(year, month) {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  var modMonth = mod(month, 12);
  year += (month - modMonth) / 12;
  return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
}
addFormatToken("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
addFormatToken("MMM", 0, 0, function(format2) {
  return this.localeData().monthsShort(this, format2);
});
addFormatToken("MMMM", 0, 0, function(format2) {
  return this.localeData().months(this, format2);
});
addUnitAlias("month", "M");
addUnitPriority("month", 8);
addRegexToken("M", match1to2);
addRegexToken("MM", match1to2, match2);
addRegexToken("MMM", function(isStrict, locale2) {
  return locale2.monthsShortRegex(isStrict);
});
addRegexToken("MMMM", function(isStrict, locale2) {
  return locale2.monthsRegex(isStrict);
});
addParseToken(["M", "MM"], function(input, array) {
  array[MONTH] = toInt(input) - 1;
});
addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
  var month = config._locale.monthsParse(input, token2, config._strict);
  if (month != null) {
    array[MONTH] = month;
  } else {
    getParsingFlags(config).invalidMonth = input;
  }
});
var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
function localeMonths(m, format2) {
  if (!m) {
    return isArray(this._months) ? this._months : this._months["standalone"];
  }
  return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
}
function localeMonthsShort(m, format2) {
  if (!m) {
    return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
  }
  return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
}
function handleStrictParse(monthName, format2, strict) {
  var i, ii, mom, llc = monthName.toLocaleLowerCase();
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
    for (i = 0; i < 12; ++i) {
      mom = createUTC([2e3, i]);
      this._shortMonthsParse[i] = this.monthsShort(mom, "").toLocaleLowerCase();
      this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeMonthsParse(monthName, format2, strict) {
  var i, mom, regex;
  if (this._monthsParseExact) {
    return handleStrictParse.call(this, monthName, format2, strict);
  }
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
  }
  for (i = 0; i < 12; i++) {
    mom = createUTC([2e3, i]);
    if (strict && !this._longMonthsParse[i]) {
      this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
      this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i");
    }
    if (!strict && !this._monthsParse[i]) {
      regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
      this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
      return i;
    } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
      return i;
    } else if (!strict && this._monthsParse[i].test(monthName)) {
      return i;
    }
  }
}
function setMonth(mom, value) {
  var dayOfMonth;
  if (!mom.isValid()) {
    return mom;
  }
  if (typeof value === "string") {
    if (/^\d+$/.test(value)) {
      value = toInt(value);
    } else {
      value = mom.localeData().monthsParse(value);
      if (!isNumber(value)) {
        return mom;
      }
    }
  }
  dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
  mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
  return mom;
}
function getSetMonth(value) {
  if (value != null) {
    setMonth(this, value);
    hooks.updateOffset(this, true);
    return this;
  } else {
    return get(this, "Month");
  }
}
function getDaysInMonth() {
  return daysInMonth(this.year(), this.month());
}
function monthsShortRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsShortStrictRegex;
    } else {
      return this._monthsShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsShortRegex")) {
      this._monthsShortRegex = defaultMonthsShortRegex;
    }
    return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
  }
}
function monthsRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsStrictRegex;
    } else {
      return this._monthsRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsRegex")) {
      this._monthsRegex = defaultMonthsRegex;
    }
    return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
  }
}
function computeMonthsParse() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }
  var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
  for (i = 0; i < 12; i++) {
    mom = createUTC([2e3, i]);
    shortPieces.push(this.monthsShort(mom, ""));
    longPieces.push(this.months(mom, ""));
    mixedPieces.push(this.months(mom, ""));
    mixedPieces.push(this.monthsShort(mom, ""));
  }
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  for (i = 0; i < 12; i++) {
    shortPieces[i] = regexEscape(shortPieces[i]);
    longPieces[i] = regexEscape(longPieces[i]);
  }
  for (i = 0; i < 24; i++) {
    mixedPieces[i] = regexEscape(mixedPieces[i]);
  }
  this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._monthsShortRegex = this._monthsRegex;
  this._monthsStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
  this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
}
addFormatToken("Y", 0, 0, function() {
  var y = this.year();
  return y <= 9999 ? zeroFill(y, 4) : "+" + y;
});
addFormatToken(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
addFormatToken(0, ["YYYY", 4], 0, "year");
addFormatToken(0, ["YYYYY", 5], 0, "year");
addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
addUnitAlias("year", "y");
addUnitPriority("year", 1);
addRegexToken("Y", matchSigned);
addRegexToken("YY", match1to2, match2);
addRegexToken("YYYY", match1to4, match4);
addRegexToken("YYYYY", match1to6, match6);
addRegexToken("YYYYYY", match1to6, match6);
addParseToken(["YYYYY", "YYYYYY"], YEAR);
addParseToken("YYYY", function(input, array) {
  array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken("YY", function(input, array) {
  array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken("Y", function(input, array) {
  array[YEAR] = parseInt(input, 10);
});
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
hooks.parseTwoDigitYear = function(input) {
  return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
};
var getSetYear = makeGetSet("FullYear", true);
function getIsLeapYear() {
  return isLeapYear(this.year());
}
function createDate(y, m, d, h, M, s, ms) {
  var date;
  if (y < 100 && y >= 0) {
    date = new Date(y + 400, m, d, h, M, s, ms);
    if (isFinite(date.getFullYear())) {
      date.setFullYear(y);
    }
  } else {
    date = new Date(y, m, d, h, M, s, ms);
  }
  return date;
}
function createUTCDate(y) {
  var date, args;
  if (y < 100 && y >= 0) {
    args = Array.prototype.slice.call(arguments);
    args[0] = y + 400;
    date = new Date(Date.UTC.apply(null, args));
    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y);
    }
  } else {
    date = new Date(Date.UTC.apply(null, arguments));
  }
  return date;
}
function firstWeekOffset(year, dow, doy) {
  var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
  return -fwdlw + fwd - 1;
}
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
  var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
  if (dayOfYear <= 0) {
    resYear = year - 1;
    resDayOfYear = daysInYear(resYear) + dayOfYear;
  } else if (dayOfYear > daysInYear(year)) {
    resYear = year + 1;
    resDayOfYear = dayOfYear - daysInYear(year);
  } else {
    resYear = year;
    resDayOfYear = dayOfYear;
  }
  return {
    year: resYear,
    dayOfYear: resDayOfYear
  };
}
function weekOfYear(mom, dow, doy) {
  var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
  if (week < 1) {
    resYear = mom.year() - 1;
    resWeek = week + weeksInYear(resYear, dow, doy);
  } else if (week > weeksInYear(mom.year(), dow, doy)) {
    resWeek = week - weeksInYear(mom.year(), dow, doy);
    resYear = mom.year() + 1;
  } else {
    resYear = mom.year();
    resWeek = week;
  }
  return {
    week: resWeek,
    year: resYear
  };
}
function weeksInYear(year, dow, doy) {
  var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
  return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
addFormatToken("w", ["ww", 2], "wo", "week");
addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
addUnitAlias("week", "w");
addUnitAlias("isoWeek", "W");
addUnitPriority("week", 5);
addUnitPriority("isoWeek", 5);
addRegexToken("w", match1to2);
addRegexToken("ww", match1to2, match2);
addRegexToken("W", match1to2);
addRegexToken("WW", match1to2, match2);
addWeekParseToken(["w", "ww", "W", "WW"], function(input, week, config, token2) {
  week[token2.substr(0, 1)] = toInt(input);
});
function localeWeek(mom) {
  return weekOfYear(mom, this._week.dow, this._week.doy).week;
}
var defaultLocaleWeek = {
  dow: 0,
  doy: 6
};
function localeFirstDayOfWeek() {
  return this._week.dow;
}
function localeFirstDayOfYear() {
  return this._week.doy;
}
function getSetWeek(input) {
  var week = this.localeData().week(this);
  return input == null ? week : this.add((input - week) * 7, "d");
}
function getSetISOWeek(input) {
  var week = weekOfYear(this, 1, 4).week;
  return input == null ? week : this.add((input - week) * 7, "d");
}
addFormatToken("d", 0, "do", "day");
addFormatToken("dd", 0, 0, function(format2) {
  return this.localeData().weekdaysMin(this, format2);
});
addFormatToken("ddd", 0, 0, function(format2) {
  return this.localeData().weekdaysShort(this, format2);
});
addFormatToken("dddd", 0, 0, function(format2) {
  return this.localeData().weekdays(this, format2);
});
addFormatToken("e", 0, 0, "weekday");
addFormatToken("E", 0, 0, "isoWeekday");
addUnitAlias("day", "d");
addUnitAlias("weekday", "e");
addUnitAlias("isoWeekday", "E");
addUnitPriority("day", 11);
addUnitPriority("weekday", 11);
addUnitPriority("isoWeekday", 11);
addRegexToken("d", match1to2);
addRegexToken("e", match1to2);
addRegexToken("E", match1to2);
addRegexToken("dd", function(isStrict, locale2) {
  return locale2.weekdaysMinRegex(isStrict);
});
addRegexToken("ddd", function(isStrict, locale2) {
  return locale2.weekdaysShortRegex(isStrict);
});
addRegexToken("dddd", function(isStrict, locale2) {
  return locale2.weekdaysRegex(isStrict);
});
addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
  var weekday = config._locale.weekdaysParse(input, token2, config._strict);
  if (weekday != null) {
    week.d = weekday;
  } else {
    getParsingFlags(config).invalidWeekday = input;
  }
});
addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
  week[token2] = toInt(input);
});
function parseWeekday(input, locale2) {
  if (typeof input !== "string") {
    return input;
  }
  if (!isNaN(input)) {
    return parseInt(input, 10);
  }
  input = locale2.weekdaysParse(input);
  if (typeof input === "number") {
    return input;
  }
  return null;
}
function parseIsoWeekday(input, locale2) {
  if (typeof input === "string") {
    return locale2.weekdaysParse(input) % 7 || 7;
  }
  return isNaN(input) ? null : input;
}
function shiftWeekdays(ws, n) {
  return ws.slice(n, 7).concat(ws.slice(0, n));
}
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
function localeWeekdays(m, format2) {
  var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
  return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
}
function localeWeekdaysShort(m) {
  return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}
function localeWeekdaysMin(m) {
  return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}
function handleStrictParse$1(weekdayName, format2, strict) {
  var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._minWeekdaysParse = [];
    for (i = 0; i < 7; ++i) {
      mom = createUTC([2e3, 1]).day(i);
      this._minWeekdaysParse[i] = this.weekdaysMin(mom, "").toLocaleLowerCase();
      this._shortWeekdaysParse[i] = this.weekdaysShort(mom, "").toLocaleLowerCase();
      this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeWeekdaysParse(weekdayName, format2, strict) {
  var i, mom, regex;
  if (this._weekdaysParseExact) {
    return handleStrictParse$1.call(this, weekdayName, format2, strict);
  }
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._minWeekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._fullWeekdaysParse = [];
  }
  for (i = 0; i < 7; i++) {
    mom = createUTC([2e3, 1]).day(i);
    if (strict && !this._fullWeekdaysParse[i]) {
      this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(mom, "").replace(".", "\\.?") + "$", "i");
      this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$", "i");
      this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$", "i");
    }
    if (!this._weekdaysParse[i]) {
      regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
      this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
      return i;
    } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
      return i;
    } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
      return i;
    } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
      return i;
    }
  }
}
function getSetDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  if (input != null) {
    input = parseWeekday(input, this.localeData());
    return this.add(input - day, "d");
  } else {
    return day;
  }
}
function getSetLocaleDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return input == null ? weekday : this.add(input - weekday, "d");
}
function getSetISODayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    var weekday = parseIsoWeekday(input, this.localeData());
    return this.day(this.day() % 7 ? weekday : weekday - 7);
  } else {
    return this.day() || 7;
  }
}
function weekdaysRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysStrictRegex;
    } else {
      return this._weekdaysRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      this._weekdaysRegex = defaultWeekdaysRegex;
    }
    return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
  }
}
function weekdaysShortRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysShortStrictRegex;
    } else {
      return this._weekdaysShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysShortRegex")) {
      this._weekdaysShortRegex = defaultWeekdaysShortRegex;
    }
    return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
  }
}
function weekdaysMinRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysMinStrictRegex;
    } else {
      return this._weekdaysMinRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysMinRegex")) {
      this._weekdaysMinRegex = defaultWeekdaysMinRegex;
    }
    return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
  }
}
function computeWeekdaysParse() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }
  var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
  for (i = 0; i < 7; i++) {
    mom = createUTC([2e3, 1]).day(i);
    minp = regexEscape(this.weekdaysMin(mom, ""));
    shortp = regexEscape(this.weekdaysShort(mom, ""));
    longp = regexEscape(this.weekdays(mom, ""));
    minPieces.push(minp);
    shortPieces.push(shortp);
    longPieces.push(longp);
    mixedPieces.push(minp);
    mixedPieces.push(shortp);
    mixedPieces.push(longp);
  }
  minPieces.sort(cmpLenRev);
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._weekdaysShortRegex = this._weekdaysRegex;
  this._weekdaysMinRegex = this._weekdaysRegex;
  this._weekdaysStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
  this._weekdaysShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
  this._weekdaysMinStrictRegex = new RegExp("^(" + minPieces.join("|") + ")", "i");
}
function hFormat() {
  return this.hours() % 12 || 12;
}
function kFormat() {
  return this.hours() || 24;
}
addFormatToken("H", ["HH", 2], 0, "hour");
addFormatToken("h", ["hh", 2], 0, hFormat);
addFormatToken("k", ["kk", 2], 0, kFormat);
addFormatToken("hmm", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});
addFormatToken("hmmss", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
addFormatToken("Hmm", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2);
});
addFormatToken("Hmmss", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
function meridiem(token2, lowercase) {
  addFormatToken(token2, 0, 0, function() {
    return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
  });
}
meridiem("a", true);
meridiem("A", false);
addUnitAlias("hour", "h");
addUnitPriority("hour", 13);
function matchMeridiem(isStrict, locale2) {
  return locale2._meridiemParse;
}
addRegexToken("a", matchMeridiem);
addRegexToken("A", matchMeridiem);
addRegexToken("H", match1to2);
addRegexToken("h", match1to2);
addRegexToken("k", match1to2);
addRegexToken("HH", match1to2, match2);
addRegexToken("hh", match1to2, match2);
addRegexToken("kk", match1to2, match2);
addRegexToken("hmm", match3to4);
addRegexToken("hmmss", match5to6);
addRegexToken("Hmm", match3to4);
addRegexToken("Hmmss", match5to6);
addParseToken(["H", "HH"], HOUR);
addParseToken(["k", "kk"], function(input, array, config) {
  var kInput = toInt(input);
  array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(["a", "A"], function(input, array, config) {
  config._isPm = config._locale.isPM(input);
  config._meridiem = input;
});
addParseToken(["h", "hh"], function(input, array, config) {
  array[HOUR] = toInt(input);
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmm", function(input, array, config) {
  var pos = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos));
  array[MINUTE] = toInt(input.substr(pos));
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmmss", function(input, array, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos1));
  array[MINUTE] = toInt(input.substr(pos1, 2));
  array[SECOND] = toInt(input.substr(pos2));
  getParsingFlags(config).bigHour = true;
});
addParseToken("Hmm", function(input, array, config) {
  var pos = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos));
  array[MINUTE] = toInt(input.substr(pos));
});
addParseToken("Hmmss", function(input, array, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos1));
  array[MINUTE] = toInt(input.substr(pos1, 2));
  array[SECOND] = toInt(input.substr(pos2));
});
function localeIsPM(input) {
  return (input + "").toLowerCase().charAt(0) === "p";
}
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
function localeMeridiem(hours2, minutes2, isLower) {
  if (hours2 > 11) {
    return isLower ? "pm" : "PM";
  } else {
    return isLower ? "am" : "AM";
  }
}
var baseConfig = {
  calendar: defaultCalendar,
  longDateFormat: defaultLongDateFormat,
  invalidDate: defaultInvalidDate,
  ordinal: defaultOrdinal,
  dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  relativeTime: defaultRelativeTime,
  months: defaultLocaleMonths,
  monthsShort: defaultLocaleMonthsShort,
  week: defaultLocaleWeek,
  weekdays: defaultLocaleWeekdays,
  weekdaysMin: defaultLocaleWeekdaysMin,
  weekdaysShort: defaultLocaleWeekdaysShort,
  meridiemParse: defaultLocaleMeridiemParse
};
var locales = {}, localeFamilies = {}, globalLocale;
function commonPrefix(arr1, arr2) {
  var i, minl = Math.min(arr1.length, arr2.length);
  for (i = 0; i < minl; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return i;
    }
  }
  return minl;
}
function normalizeLocale(key) {
  return key ? key.toLowerCase().replace("_", "-") : key;
}
function chooseLocale(names) {
  var i = 0, j, next, locale2, split;
  while (i < names.length) {
    split = normalizeLocale(names[i]).split("-");
    j = split.length;
    next = normalizeLocale(names[i + 1]);
    next = next ? next.split("-") : null;
    while (j > 0) {
      locale2 = loadLocale(split.slice(0, j).join("-"));
      if (locale2) {
        return locale2;
      }
      if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
        break;
      }
      j--;
    }
    i++;
  }
  return globalLocale;
}
function isLocaleNameSane(name) {
  return name.match("^[^/\\\\]*$") != null;
}
function loadLocale(name) {
  var oldLocale = null, aliasedRequire;
  if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name)) {
    try {
      oldLocale = globalLocale._abbr;
      aliasedRequire = require;
      aliasedRequire("./locale/" + name);
      getSetGlobalLocale(oldLocale);
    } catch (e2) {
      locales[name] = null;
    }
  }
  return locales[name];
}
function getSetGlobalLocale(key, values) {
  var data;
  if (key) {
    if (isUndefined(values)) {
      data = getLocale(key);
    } else {
      data = defineLocale(key, values);
    }
    if (data) {
      globalLocale = data;
    } else {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("Locale " + key + " not found. Did you forget to load it?");
      }
    }
  }
  return globalLocale._abbr;
}
function defineLocale(name, config) {
  if (config !== null) {
    var locale2, parentConfig = baseConfig;
    config.abbr = name;
    if (locales[name] != null) {
      deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.");
      parentConfig = locales[name]._config;
    } else if (config.parentLocale != null) {
      if (locales[config.parentLocale] != null) {
        parentConfig = locales[config.parentLocale]._config;
      } else {
        locale2 = loadLocale(config.parentLocale);
        if (locale2 != null) {
          parentConfig = locale2._config;
        } else {
          if (!localeFamilies[config.parentLocale]) {
            localeFamilies[config.parentLocale] = [];
          }
          localeFamilies[config.parentLocale].push({
            name,
            config
          });
          return null;
        }
      }
    }
    locales[name] = new Locale(mergeConfigs(parentConfig, config));
    if (localeFamilies[name]) {
      localeFamilies[name].forEach(function(x) {
        defineLocale(x.name, x.config);
      });
    }
    getSetGlobalLocale(name);
    return locales[name];
  } else {
    delete locales[name];
    return null;
  }
}
function updateLocale(name, config) {
  if (config != null) {
    var locale2, tmpLocale, parentConfig = baseConfig;
    if (locales[name] != null && locales[name].parentLocale != null) {
      locales[name].set(mergeConfigs(locales[name]._config, config));
    } else {
      tmpLocale = loadLocale(name);
      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }
      config = mergeConfigs(parentConfig, config);
      if (tmpLocale == null) {
        config.abbr = name;
      }
      locale2 = new Locale(config);
      locale2.parentLocale = locales[name];
      locales[name] = locale2;
    }
    getSetGlobalLocale(name);
  } else {
    if (locales[name] != null) {
      if (locales[name].parentLocale != null) {
        locales[name] = locales[name].parentLocale;
        if (name === getSetGlobalLocale()) {
          getSetGlobalLocale(name);
        }
      } else if (locales[name] != null) {
        delete locales[name];
      }
    }
  }
  return locales[name];
}
function getLocale(key) {
  var locale2;
  if (key && key._locale && key._locale._abbr) {
    key = key._locale._abbr;
  }
  if (!key) {
    return globalLocale;
  }
  if (!isArray(key)) {
    locale2 = loadLocale(key);
    if (locale2) {
      return locale2;
    }
    key = [key];
  }
  return chooseLocale(key);
}
function listLocales() {
  return keys(locales);
}
function checkOverflow(m) {
  var overflow, a = m._a;
  if (a && getParsingFlags(m).overflow === -2) {
    overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
    if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
      overflow = DATE;
    }
    if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
      overflow = WEEK;
    }
    if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
      overflow = WEEKDAY;
    }
    getParsingFlags(m).overflow = overflow;
  }
  return m;
}
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, false],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, false],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, false],
  ["YYYY", /\d{4}/, false]
], isoTimes = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function configFromISO(config) {
  var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
  if (match) {
    getParsingFlags(config).iso = true;
    for (i = 0, l = isoDatesLen; i < l; i++) {
      if (isoDates[i][1].exec(match[1])) {
        dateFormat = isoDates[i][0];
        allowTime = isoDates[i][2] !== false;
        break;
      }
    }
    if (dateFormat == null) {
      config._isValid = false;
      return;
    }
    if (match[3]) {
      for (i = 0, l = isoTimesLen; i < l; i++) {
        if (isoTimes[i][1].exec(match[3])) {
          timeFormat = (match[2] || " ") + isoTimes[i][0];
          break;
        }
      }
      if (timeFormat == null) {
        config._isValid = false;
        return;
      }
    }
    if (!allowTime && timeFormat != null) {
      config._isValid = false;
      return;
    }
    if (match[4]) {
      if (tzRegex.exec(match[4])) {
        tzFormat = "Z";
      } else {
        config._isValid = false;
        return;
      }
    }
    config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
    configFromStringAndFormat(config);
  } else {
    config._isValid = false;
  }
}
function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result = [
    untruncateYear(yearStr),
    defaultLocaleMonthsShort.indexOf(monthStr),
    parseInt(dayStr, 10),
    parseInt(hourStr, 10),
    parseInt(minuteStr, 10)
  ];
  if (secondStr) {
    result.push(parseInt(secondStr, 10));
  }
  return result;
}
function untruncateYear(yearStr) {
  var year = parseInt(yearStr, 10);
  if (year <= 49) {
    return 2e3 + year;
  } else if (year <= 999) {
    return 1900 + year;
  }
  return year;
}
function preprocessRFC2822(s) {
  return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function checkWeekday(weekdayStr, parsedInput, config) {
  if (weekdayStr) {
    var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
    if (weekdayProvided !== weekdayActual) {
      getParsingFlags(config).weekdayMismatch = true;
      config._isValid = false;
      return false;
    }
  }
  return true;
}
function calculateOffset(obsOffset, militaryOffset, numOffset) {
  if (obsOffset) {
    return obsOffsets[obsOffset];
  } else if (militaryOffset) {
    return 0;
  } else {
    var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
    return h * 60 + m;
  }
}
function configFromRFC2822(config) {
  var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
  if (match) {
    parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
    if (!checkWeekday(match[1], parsedArray, config)) {
      return;
    }
    config._a = parsedArray;
    config._tzm = calculateOffset(match[8], match[9], match[10]);
    config._d = createUTCDate.apply(null, config._a);
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    getParsingFlags(config).rfc2822 = true;
  } else {
    config._isValid = false;
  }
}
function configFromString(config) {
  var matched = aspNetJsonRegex.exec(config._i);
  if (matched !== null) {
    config._d = new Date(+matched[1]);
    return;
  }
  configFromISO(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  configFromRFC2822(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  if (config._strict) {
    config._isValid = false;
  } else {
    hooks.createFromInputFallback(config);
  }
}
hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(config) {
  config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
});
function defaults(a, b, c) {
  if (a != null) {
    return a;
  }
  if (b != null) {
    return b;
  }
  return c;
}
function currentDateArray(config) {
  var nowValue = new Date(hooks.now());
  if (config._useUTC) {
    return [
      nowValue.getUTCFullYear(),
      nowValue.getUTCMonth(),
      nowValue.getUTCDate()
    ];
  }
  return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}
function configFromArray(config) {
  var i, date, input = [], currentDate, expectedWeekday, yearToUse;
  if (config._d) {
    return;
  }
  currentDate = currentDateArray(config);
  if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
    dayOfYearFromWeekInfo(config);
  }
  if (config._dayOfYear != null) {
    yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
    if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
      getParsingFlags(config)._overflowDayOfYear = true;
    }
    date = createUTCDate(yearToUse, 0, config._dayOfYear);
    config._a[MONTH] = date.getUTCMonth();
    config._a[DATE] = date.getUTCDate();
  }
  for (i = 0; i < 3 && config._a[i] == null; ++i) {
    config._a[i] = input[i] = currentDate[i];
  }
  for (; i < 7; i++) {
    config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
  }
  if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
    config._nextDay = true;
    config._a[HOUR] = 0;
  }
  config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
  expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
  if (config._tzm != null) {
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  }
  if (config._nextDay) {
    config._a[HOUR] = 24;
  }
  if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
    getParsingFlags(config).weekdayMismatch = true;
  }
}
function dayOfYearFromWeekInfo(config) {
  var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
  w = config._w;
  if (w.GG != null || w.W != null || w.E != null) {
    dow = 1;
    doy = 4;
    weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
    week = defaults(w.W, 1);
    weekday = defaults(w.E, 1);
    if (weekday < 1 || weekday > 7) {
      weekdayOverflow = true;
    }
  } else {
    dow = config._locale._week.dow;
    doy = config._locale._week.doy;
    curWeek = weekOfYear(createLocal(), dow, doy);
    weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
    week = defaults(w.w, curWeek.week);
    if (w.d != null) {
      weekday = w.d;
      if (weekday < 0 || weekday > 6) {
        weekdayOverflow = true;
      }
    } else if (w.e != null) {
      weekday = w.e + dow;
      if (w.e < 0 || w.e > 6) {
        weekdayOverflow = true;
      }
    } else {
      weekday = dow;
    }
  }
  if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
    getParsingFlags(config)._overflowWeeks = true;
  } else if (weekdayOverflow != null) {
    getParsingFlags(config)._overflowWeekday = true;
  } else {
    temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
    config._a[YEAR] = temp.year;
    config._dayOfYear = temp.dayOfYear;
  }
}
hooks.ISO_8601 = function() {
};
hooks.RFC_2822 = function() {
};
function configFromStringAndFormat(config) {
  if (config._f === hooks.ISO_8601) {
    configFromISO(config);
    return;
  }
  if (config._f === hooks.RFC_2822) {
    configFromRFC2822(config);
    return;
  }
  config._a = [];
  getParsingFlags(config).empty = true;
  var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
  tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
  tokenLen = tokens2.length;
  for (i = 0; i < tokenLen; i++) {
    token2 = tokens2[i];
    parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
    if (parsedInput) {
      skipped = string.substr(0, string.indexOf(parsedInput));
      if (skipped.length > 0) {
        getParsingFlags(config).unusedInput.push(skipped);
      }
      string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
      totalParsedInputLength += parsedInput.length;
    }
    if (formatTokenFunctions[token2]) {
      if (parsedInput) {
        getParsingFlags(config).empty = false;
      } else {
        getParsingFlags(config).unusedTokens.push(token2);
      }
      addTimeToArrayFromToken(token2, parsedInput, config);
    } else if (config._strict && !parsedInput) {
      getParsingFlags(config).unusedTokens.push(token2);
    }
  }
  getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
  if (string.length > 0) {
    getParsingFlags(config).unusedInput.push(string);
  }
  if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
    getParsingFlags(config).bigHour = void 0;
  }
  getParsingFlags(config).parsedDateParts = config._a.slice(0);
  getParsingFlags(config).meridiem = config._meridiem;
  config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
  era = getParsingFlags(config).era;
  if (era !== null) {
    config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
  }
  configFromArray(config);
  checkOverflow(config);
}
function meridiemFixWrap(locale2, hour, meridiem2) {
  var isPm;
  if (meridiem2 == null) {
    return hour;
  }
  if (locale2.meridiemHour != null) {
    return locale2.meridiemHour(hour, meridiem2);
  } else if (locale2.isPM != null) {
    isPm = locale2.isPM(meridiem2);
    if (isPm && hour < 12) {
      hour += 12;
    }
    if (!isPm && hour === 12) {
      hour = 0;
    }
    return hour;
  } else {
    return hour;
  }
}
function configFromStringAndArray(config) {
  var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
  if (configfLen === 0) {
    getParsingFlags(config).invalidFormat = true;
    config._d = new Date(NaN);
    return;
  }
  for (i = 0; i < configfLen; i++) {
    currentScore = 0;
    validFormatFound = false;
    tempConfig = copyConfig({}, config);
    if (config._useUTC != null) {
      tempConfig._useUTC = config._useUTC;
    }
    tempConfig._f = config._f[i];
    configFromStringAndFormat(tempConfig);
    if (isValid(tempConfig)) {
      validFormatFound = true;
    }
    currentScore += getParsingFlags(tempConfig).charsLeftOver;
    currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
    getParsingFlags(tempConfig).score = currentScore;
    if (!bestFormatIsValid) {
      if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
        if (validFormatFound) {
          bestFormatIsValid = true;
        }
      }
    } else {
      if (currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }
  }
  extend(config, bestMoment || tempConfig);
}
function configFromObject(config) {
  if (config._d) {
    return;
  }
  var i = normalizeObjectUnits(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
  config._a = map([i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond], function(obj) {
    return obj && parseInt(obj, 10);
  });
  configFromArray(config);
}
function createFromConfig(config) {
  var res2 = new Moment(checkOverflow(prepareConfig(config)));
  if (res2._nextDay) {
    res2.add(1, "d");
    res2._nextDay = void 0;
  }
  return res2;
}
function prepareConfig(config) {
  var input = config._i, format2 = config._f;
  config._locale = config._locale || getLocale(config._l);
  if (input === null || format2 === void 0 && input === "") {
    return createInvalid({ nullInput: true });
  }
  if (typeof input === "string") {
    config._i = input = config._locale.preparse(input);
  }
  if (isMoment(input)) {
    return new Moment(checkOverflow(input));
  } else if (isDate(input)) {
    config._d = input;
  } else if (isArray(format2)) {
    configFromStringAndArray(config);
  } else if (format2) {
    configFromStringAndFormat(config);
  } else {
    configFromInput(config);
  }
  if (!isValid(config)) {
    config._d = null;
  }
  return config;
}
function configFromInput(config) {
  var input = config._i;
  if (isUndefined(input)) {
    config._d = new Date(hooks.now());
  } else if (isDate(input)) {
    config._d = new Date(input.valueOf());
  } else if (typeof input === "string") {
    configFromString(config);
  } else if (isArray(input)) {
    config._a = map(input.slice(0), function(obj) {
      return parseInt(obj, 10);
    });
    configFromArray(config);
  } else if (isObject(input)) {
    configFromObject(config);
  } else if (isNumber(input)) {
    config._d = new Date(input);
  } else {
    hooks.createFromInputFallback(config);
  }
}
function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
  var c = {};
  if (format2 === true || format2 === false) {
    strict = format2;
    format2 = void 0;
  }
  if (locale2 === true || locale2 === false) {
    strict = locale2;
    locale2 = void 0;
  }
  if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
    input = void 0;
  }
  c._isAMomentObject = true;
  c._useUTC = c._isUTC = isUTC;
  c._l = locale2;
  c._i = input;
  c._f = format2;
  c._strict = strict;
  return createFromConfig(c);
}
function createLocal(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, false);
}
var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
  var other = createLocal.apply(null, arguments);
  if (this.isValid() && other.isValid()) {
    return other < this ? this : other;
  } else {
    return createInvalid();
  }
}), prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
  var other = createLocal.apply(null, arguments);
  if (this.isValid() && other.isValid()) {
    return other > this ? this : other;
  } else {
    return createInvalid();
  }
});
function pickBy(fn, moments) {
  var res2, i;
  if (moments.length === 1 && isArray(moments[0])) {
    moments = moments[0];
  }
  if (!moments.length) {
    return createLocal();
  }
  res2 = moments[0];
  for (i = 1; i < moments.length; ++i) {
    if (!moments[i].isValid() || moments[i][fn](res2)) {
      res2 = moments[i];
    }
  }
  return res2;
}
function min() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isBefore", args);
}
function max() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isAfter", args);
}
var now = function() {
  return Date.now ? Date.now() : +new Date();
};
var ordering = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function isDurationValid(m) {
  var key, unitHasDecimal = false, i, orderLen = ordering.length;
  for (key in m) {
    if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
      return false;
    }
  }
  for (i = 0; i < orderLen; ++i) {
    if (m[ordering[i]]) {
      if (unitHasDecimal) {
        return false;
      }
      if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
        unitHasDecimal = true;
      }
    }
  }
  return true;
}
function isValid$1() {
  return this._isValid;
}
function createInvalid$1() {
  return createDuration(NaN);
}
function Duration(duration) {
  var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
  this._isValid = isDurationValid(normalizedInput);
  this._milliseconds = +milliseconds2 + seconds2 * 1e3 + minutes2 * 6e4 + hours2 * 1e3 * 60 * 60;
  this._days = +days2 + weeks2 * 7;
  this._months = +months2 + quarters * 3 + years2 * 12;
  this._data = {};
  this._locale = getLocale();
  this._bubble();
}
function isDuration(obj) {
  return obj instanceof Duration;
}
function absRound(number) {
  if (number < 0) {
    return Math.round(-1 * number) * -1;
  } else {
    return Math.round(number);
  }
}
function compareArrays(array1, array2, dontConvert) {
  var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
  for (i = 0; i < len; i++) {
    if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
      diffs++;
    }
  }
  return diffs + lengthDiff;
}
function offset(token2, separator) {
  addFormatToken(token2, 0, 0, function() {
    var offset2 = this.utcOffset(), sign2 = "+";
    if (offset2 < 0) {
      offset2 = -offset2;
      sign2 = "-";
    }
    return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
  });
}
offset("Z", ":");
offset("ZZ", "");
addRegexToken("Z", matchShortOffset);
addRegexToken("ZZ", matchShortOffset);
addParseToken(["Z", "ZZ"], function(input, array, config) {
  config._useUTC = true;
  config._tzm = offsetFromString(matchShortOffset, input);
});
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(matcher, string) {
  var matches = (string || "").match(matcher), chunk, parts, minutes2;
  if (matches === null) {
    return null;
  }
  chunk = matches[matches.length - 1] || [];
  parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
  minutes2 = +(parts[1] * 60) + toInt(parts[2]);
  return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
}
function cloneWithOffset(input, model) {
  var res2, diff2;
  if (model._isUTC) {
    res2 = model.clone();
    diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res2.valueOf();
    res2._d.setTime(res2._d.valueOf() + diff2);
    hooks.updateOffset(res2, false);
    return res2;
  } else {
    return createLocal(input).local();
  }
}
function getDateOffset(m) {
  return -Math.round(m._d.getTimezoneOffset());
}
hooks.updateOffset = function() {
};
function getSetOffset(input, keepLocalTime, keepMinutes) {
  var offset2 = this._offset || 0, localAdjust;
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    if (typeof input === "string") {
      input = offsetFromString(matchShortOffset, input);
      if (input === null) {
        return this;
      }
    } else if (Math.abs(input) < 16 && !keepMinutes) {
      input = input * 60;
    }
    if (!this._isUTC && keepLocalTime) {
      localAdjust = getDateOffset(this);
    }
    this._offset = input;
    this._isUTC = true;
    if (localAdjust != null) {
      this.add(localAdjust, "m");
    }
    if (offset2 !== input) {
      if (!keepLocalTime || this._changeInProgress) {
        addSubtract(this, createDuration(input - offset2, "m"), 1, false);
      } else if (!this._changeInProgress) {
        this._changeInProgress = true;
        hooks.updateOffset(this, true);
        this._changeInProgress = null;
      }
    }
    return this;
  } else {
    return this._isUTC ? offset2 : getDateOffset(this);
  }
}
function getSetZone(input, keepLocalTime) {
  if (input != null) {
    if (typeof input !== "string") {
      input = -input;
    }
    this.utcOffset(input, keepLocalTime);
    return this;
  } else {
    return -this.utcOffset();
  }
}
function setOffsetToUTC(keepLocalTime) {
  return this.utcOffset(0, keepLocalTime);
}
function setOffsetToLocal(keepLocalTime) {
  if (this._isUTC) {
    this.utcOffset(0, keepLocalTime);
    this._isUTC = false;
    if (keepLocalTime) {
      this.subtract(getDateOffset(this), "m");
    }
  }
  return this;
}
function setOffsetToParsedOffset() {
  if (this._tzm != null) {
    this.utcOffset(this._tzm, false, true);
  } else if (typeof this._i === "string") {
    var tZone = offsetFromString(matchOffset, this._i);
    if (tZone != null) {
      this.utcOffset(tZone);
    } else {
      this.utcOffset(0, true);
    }
  }
  return this;
}
function hasAlignedHourOffset(input) {
  if (!this.isValid()) {
    return false;
  }
  input = input ? createLocal(input).utcOffset() : 0;
  return (this.utcOffset() - input) % 60 === 0;
}
function isDaylightSavingTime() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function isDaylightSavingTimeShifted() {
  if (!isUndefined(this._isDSTShifted)) {
    return this._isDSTShifted;
  }
  var c = {}, other;
  copyConfig(c, this);
  c = prepareConfig(c);
  if (c._a) {
    other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
    this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
  } else {
    this._isDSTShifted = false;
  }
  return this._isDSTShifted;
}
function isLocal() {
  return this.isValid() ? !this._isUTC : false;
}
function isUtcOffset() {
  return this.isValid() ? this._isUTC : false;
}
function isUtc() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(input, key) {
  var duration = input, match = null, sign2, ret, diffRes;
  if (isDuration(input)) {
    duration = {
      ms: input._milliseconds,
      d: input._days,
      M: input._months
    };
  } else if (isNumber(input) || !isNaN(+input)) {
    duration = {};
    if (key) {
      duration[key] = +input;
    } else {
      duration.milliseconds = +input;
    }
  } else if (match = aspNetRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: 0,
      d: toInt(match[DATE]) * sign2,
      h: toInt(match[HOUR]) * sign2,
      m: toInt(match[MINUTE]) * sign2,
      s: toInt(match[SECOND]) * sign2,
      ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
    };
  } else if (match = isoRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: parseIso(match[2], sign2),
      M: parseIso(match[3], sign2),
      w: parseIso(match[4], sign2),
      d: parseIso(match[5], sign2),
      h: parseIso(match[6], sign2),
      m: parseIso(match[7], sign2),
      s: parseIso(match[8], sign2)
    };
  } else if (duration == null) {
    duration = {};
  } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
    diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
    duration = {};
    duration.ms = diffRes.milliseconds;
    duration.M = diffRes.months;
  }
  ret = new Duration(duration);
  if (isDuration(input) && hasOwnProp(input, "_locale")) {
    ret._locale = input._locale;
  }
  if (isDuration(input) && hasOwnProp(input, "_isValid")) {
    ret._isValid = input._isValid;
  }
  return ret;
}
createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;
function parseIso(inp, sign2) {
  var res2 = inp && parseFloat(inp.replace(",", "."));
  return (isNaN(res2) ? 0 : res2) * sign2;
}
function positiveMomentsDifference(base, other) {
  var res2 = {};
  res2.months = other.month() - base.month() + (other.year() - base.year()) * 12;
  if (base.clone().add(res2.months, "M").isAfter(other)) {
    --res2.months;
  }
  res2.milliseconds = +other - +base.clone().add(res2.months, "M");
  return res2;
}
function momentsDifference(base, other) {
  var res2;
  if (!(base.isValid() && other.isValid())) {
    return { milliseconds: 0, months: 0 };
  }
  other = cloneWithOffset(other, base);
  if (base.isBefore(other)) {
    res2 = positiveMomentsDifference(base, other);
  } else {
    res2 = positiveMomentsDifference(other, base);
    res2.milliseconds = -res2.milliseconds;
    res2.months = -res2.months;
  }
  return res2;
}
function createAdder(direction, name) {
  return function(val, period) {
    var dur, tmp;
    if (period !== null && !isNaN(+period)) {
      deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.");
      tmp = val;
      val = period;
      period = tmp;
    }
    dur = createDuration(val, period);
    addSubtract(this, dur, direction);
    return this;
  };
}
function addSubtract(mom, duration, isAdding, updateOffset) {
  var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
  if (!mom.isValid()) {
    return;
  }
  updateOffset = updateOffset == null ? true : updateOffset;
  if (months2) {
    setMonth(mom, get(mom, "Month") + months2 * isAdding);
  }
  if (days2) {
    set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
  }
  if (milliseconds2) {
    mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
  }
  if (updateOffset) {
    hooks.updateOffset(mom, days2 || months2);
  }
}
var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
function isString(input) {
  return typeof input === "string" || input instanceof String;
}
function isMomentInput(input) {
  return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
}
function isMomentInputObject(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], i, property, propertyLen = properties.length;
  for (i = 0; i < propertyLen; i += 1) {
    property = properties[i];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function isNumberOrStringArray(input) {
  var arrayTest = isArray(input), dataTypeTest = false;
  if (arrayTest) {
    dataTypeTest = input.filter(function(item) {
      return !isNumber(item) && isString(input);
    }).length === 0;
  }
  return arrayTest && dataTypeTest;
}
function isCalendarSpec(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], i, property;
  for (i = 0; i < properties.length; i += 1) {
    property = properties[i];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function getCalendarFormat(myMoment, now2) {
  var diff2 = myMoment.diff(now2, "days", true);
  return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
}
function calendar$1(time, formats) {
  if (arguments.length === 1) {
    if (!arguments[0]) {
      time = void 0;
      formats = void 0;
    } else if (isMomentInput(arguments[0])) {
      time = arguments[0];
      formats = void 0;
    } else if (isCalendarSpec(arguments[0])) {
      formats = arguments[0];
      time = void 0;
    }
  }
  var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
  return this.format(output || this.localeData().calendar(format2, this, createLocal(now2)));
}
function clone() {
  return new Moment(this);
}
function isAfter(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() > localInput.valueOf();
  } else {
    return localInput.valueOf() < this.clone().startOf(units).valueOf();
  }
}
function isBefore(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() < localInput.valueOf();
  } else {
    return this.clone().endOf(units).valueOf() < localInput.valueOf();
  }
}
function isBetween(from2, to2, units, inclusivity) {
  var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
  if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
    return false;
  }
  inclusivity = inclusivity || "()";
  return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
}
function isSame(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input), inputMs;
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() === localInput.valueOf();
  } else {
    inputMs = localInput.valueOf();
    return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
  }
}
function isSameOrAfter(input, units) {
  return this.isSame(input, units) || this.isAfter(input, units);
}
function isSameOrBefore(input, units) {
  return this.isSame(input, units) || this.isBefore(input, units);
}
function diff(input, units, asFloat) {
  var that, zoneDelta, output;
  if (!this.isValid()) {
    return NaN;
  }
  that = cloneWithOffset(input, this);
  if (!that.isValid()) {
    return NaN;
  }
  zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
  units = normalizeUnits(units);
  switch (units) {
    case "year":
      output = monthDiff(this, that) / 12;
      break;
    case "month":
      output = monthDiff(this, that);
      break;
    case "quarter":
      output = monthDiff(this, that) / 3;
      break;
    case "second":
      output = (this - that) / 1e3;
      break;
    case "minute":
      output = (this - that) / 6e4;
      break;
    case "hour":
      output = (this - that) / 36e5;
      break;
    case "day":
      output = (this - that - zoneDelta) / 864e5;
      break;
    case "week":
      output = (this - that - zoneDelta) / 6048e5;
      break;
    default:
      output = this - that;
  }
  return asFloat ? output : absFloor(output);
}
function monthDiff(a, b) {
  if (a.date() < b.date()) {
    return -monthDiff(b, a);
  }
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
  if (b - anchor < 0) {
    anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
    adjust = (b - anchor) / (anchor - anchor2);
  } else {
    anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
    adjust = (b - anchor) / (anchor2 - anchor);
  }
  return -(wholeMonthDiff + adjust) || 0;
}
hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function toString() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function toISOString(keepOffset) {
  if (!this.isValid()) {
    return null;
  }
  var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
  if (m.year() < 0 || m.year() > 9999) {
    return formatMoment(m, utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ");
  }
  if (isFunction(Date.prototype.toISOString)) {
    if (utc) {
      return this.toDate().toISOString();
    } else {
      return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
    }
  }
  return formatMoment(m, utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
}
function inspect() {
  if (!this.isValid()) {
    return "moment.invalid(/* " + this._i + " */)";
  }
  var func = "moment", zone = "", prefix, year, datetime, suffix;
  if (!this.isLocal()) {
    func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
    zone = "Z";
  }
  prefix = "[" + func + '("]';
  year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
  datetime = "-MM-DD[T]HH:mm:ss.SSS";
  suffix = zone + '[")]';
  return this.format(prefix + year + datetime + suffix);
}
function format(inputString) {
  if (!inputString) {
    inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
  }
  var output = formatMoment(this, inputString);
  return this.localeData().postformat(output);
}
function from(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function fromNow(withoutSuffix) {
  return this.from(createLocal(), withoutSuffix);
}
function to(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function toNow(withoutSuffix) {
  return this.to(createLocal(), withoutSuffix);
}
function locale(key) {
  var newLocaleData;
  if (key === void 0) {
    return this._locale._abbr;
  } else {
    newLocaleData = getLocale(key);
    if (newLocaleData != null) {
      this._locale = newLocaleData;
    }
    return this;
  }
}
var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
  if (key === void 0) {
    return this.localeData();
  } else {
    return this.locale(key);
  }
});
function localeData() {
  return this._locale;
}
var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
function mod$1(dividend, divisor) {
  return (dividend % divisor + divisor) % divisor;
}
function localStartOfDate(y, m, d) {
  if (y < 100 && y >= 0) {
    return new Date(y + 400, m, d) - MS_PER_400_YEARS;
  } else {
    return new Date(y, m, d).valueOf();
  }
}
function utcStartOfDate(y, m, d) {
  if (y < 100 && y >= 0) {
    return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
  } else {
    return Date.UTC(y, m, d);
  }
}
function startOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year(), 0, 1);
      break;
    case "quarter":
      time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
      break;
    case "month":
      time = startOfDate(this.year(), this.month(), 1);
      break;
    case "week":
      time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
      break;
    case "isoWeek":
      time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date());
      break;
    case "hour":
      time = this._d.valueOf();
      time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
      break;
    case "minute":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_MINUTE);
      break;
    case "second":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_SECOND);
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function endOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
      break;
    case "month":
      time = startOfDate(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
      break;
    case "isoWeek":
      time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      time = this._d.valueOf();
      time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
      break;
    case "minute":
      time = this._d.valueOf();
      time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
      break;
    case "second":
      time = this._d.valueOf();
      time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function valueOf() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function unix() {
  return Math.floor(this.valueOf() / 1e3);
}
function toDate() {
  return new Date(this.valueOf());
}
function toArray() {
  var m = this;
  return [
    m.year(),
    m.month(),
    m.date(),
    m.hour(),
    m.minute(),
    m.second(),
    m.millisecond()
  ];
}
function toObject() {
  var m = this;
  return {
    years: m.year(),
    months: m.month(),
    date: m.date(),
    hours: m.hours(),
    minutes: m.minutes(),
    seconds: m.seconds(),
    milliseconds: m.milliseconds()
  };
}
function toJSON() {
  return this.isValid() ? this.toISOString() : null;
}
function isValid$2() {
  return isValid(this);
}
function parsingFlags() {
  return extend({}, getParsingFlags(this));
}
function invalidAt() {
  return getParsingFlags(this).overflow;
}
function creationData() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
addFormatToken("N", 0, 0, "eraAbbr");
addFormatToken("NN", 0, 0, "eraAbbr");
addFormatToken("NNN", 0, 0, "eraAbbr");
addFormatToken("NNNN", 0, 0, "eraName");
addFormatToken("NNNNN", 0, 0, "eraNarrow");
addFormatToken("y", ["y", 1], "yo", "eraYear");
addFormatToken("y", ["yy", 2], 0, "eraYear");
addFormatToken("y", ["yyy", 3], 0, "eraYear");
addFormatToken("y", ["yyyy", 4], 0, "eraYear");
addRegexToken("N", matchEraAbbr);
addRegexToken("NN", matchEraAbbr);
addRegexToken("NNN", matchEraAbbr);
addRegexToken("NNNN", matchEraName);
addRegexToken("NNNNN", matchEraNarrow);
addParseToken(["N", "NN", "NNN", "NNNN", "NNNNN"], function(input, array, config, token2) {
  var era = config._locale.erasParse(input, token2, config._strict);
  if (era) {
    getParsingFlags(config).era = era;
  } else {
    getParsingFlags(config).invalidEra = input;
  }
});
addRegexToken("y", matchUnsigned);
addRegexToken("yy", matchUnsigned);
addRegexToken("yyy", matchUnsigned);
addRegexToken("yyyy", matchUnsigned);
addRegexToken("yo", matchEraYearOrdinal);
addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
addParseToken(["yo"], function(input, array, config, token2) {
  var match;
  if (config._locale._eraYearOrdinalRegex) {
    match = input.match(config._locale._eraYearOrdinalRegex);
  }
  if (config._locale.eraYearOrdinalParse) {
    array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
  } else {
    array[YEAR] = parseInt(input, 10);
  }
});
function localeEras(m, format2) {
  var i, l, date, eras = this._eras || getLocale("en")._eras;
  for (i = 0, l = eras.length; i < l; ++i) {
    switch (typeof eras[i].since) {
      case "string":
        date = hooks(eras[i].since).startOf("day");
        eras[i].since = date.valueOf();
        break;
    }
    switch (typeof eras[i].until) {
      case "undefined":
        eras[i].until = Infinity;
        break;
      case "string":
        date = hooks(eras[i].until).startOf("day").valueOf();
        eras[i].until = date.valueOf();
        break;
    }
  }
  return eras;
}
function localeErasParse(eraName, format2, strict) {
  var i, l, eras = this.eras(), name, abbr, narrow;
  eraName = eraName.toUpperCase();
  for (i = 0, l = eras.length; i < l; ++i) {
    name = eras[i].name.toUpperCase();
    abbr = eras[i].abbr.toUpperCase();
    narrow = eras[i].narrow.toUpperCase();
    if (strict) {
      switch (format2) {
        case "N":
        case "NN":
        case "NNN":
          if (abbr === eraName) {
            return eras[i];
          }
          break;
        case "NNNN":
          if (name === eraName) {
            return eras[i];
          }
          break;
        case "NNNNN":
          if (narrow === eraName) {
            return eras[i];
          }
          break;
      }
    } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
      return eras[i];
    }
  }
}
function localeErasConvertYear(era, year) {
  var dir = era.since <= era.until ? 1 : -1;
  if (year === void 0) {
    return hooks(era.since).year();
  } else {
    return hooks(era.since).year() + (year - era.offset) * dir;
  }
}
function getEraName() {
  var i, l, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until) {
      return eras[i].name;
    }
    if (eras[i].until <= val && val <= eras[i].since) {
      return eras[i].name;
    }
  }
  return "";
}
function getEraNarrow() {
  var i, l, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until) {
      return eras[i].narrow;
    }
    if (eras[i].until <= val && val <= eras[i].since) {
      return eras[i].narrow;
    }
  }
  return "";
}
function getEraAbbr() {
  var i, l, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until) {
      return eras[i].abbr;
    }
    if (eras[i].until <= val && val <= eras[i].since) {
      return eras[i].abbr;
    }
  }
  return "";
}
function getEraYear() {
  var i, l, dir, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    dir = eras[i].since <= eras[i].until ? 1 : -1;
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
      return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
    }
  }
  return this.year();
}
function erasNameRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNameRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNameRegex : this._erasRegex;
}
function erasAbbrRegex(isStrict) {
  if (!hasOwnProp(this, "_erasAbbrRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasAbbrRegex : this._erasRegex;
}
function erasNarrowRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNarrowRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNarrowRegex : this._erasRegex;
}
function matchEraAbbr(isStrict, locale2) {
  return locale2.erasAbbrRegex(isStrict);
}
function matchEraName(isStrict, locale2) {
  return locale2.erasNameRegex(isStrict);
}
function matchEraNarrow(isStrict, locale2) {
  return locale2.erasNarrowRegex(isStrict);
}
function matchEraYearOrdinal(isStrict, locale2) {
  return locale2._eraYearOrdinalRegex || matchUnsigned;
}
function computeErasParse() {
  var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, eras = this.eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    namePieces.push(regexEscape(eras[i].name));
    abbrPieces.push(regexEscape(eras[i].abbr));
    narrowPieces.push(regexEscape(eras[i].narrow));
    mixedPieces.push(regexEscape(eras[i].name));
    mixedPieces.push(regexEscape(eras[i].abbr));
    mixedPieces.push(regexEscape(eras[i].narrow));
  }
  this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
  this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
  this._erasNarrowRegex = new RegExp("^(" + narrowPieces.join("|") + ")", "i");
}
addFormatToken(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
addFormatToken(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function addWeekYearFormatToken(token2, getter) {
  addFormatToken(0, [token2, token2.length], 0, getter);
}
addWeekYearFormatToken("gggg", "weekYear");
addWeekYearFormatToken("ggggg", "weekYear");
addWeekYearFormatToken("GGGG", "isoWeekYear");
addWeekYearFormatToken("GGGGG", "isoWeekYear");
addUnitAlias("weekYear", "gg");
addUnitAlias("isoWeekYear", "GG");
addUnitPriority("weekYear", 1);
addUnitPriority("isoWeekYear", 1);
addRegexToken("G", matchSigned);
addRegexToken("g", matchSigned);
addRegexToken("GG", match1to2, match2);
addRegexToken("gg", match1to2, match2);
addRegexToken("GGGG", match1to4, match4);
addRegexToken("gggg", match1to4, match4);
addRegexToken("GGGGG", match1to6, match6);
addRegexToken("ggggg", match1to6, match6);
addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week, config, token2) {
  week[token2.substr(0, 2)] = toInt(input);
});
addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
  week[token2] = hooks.parseTwoDigitYear(input);
});
function getSetWeekYear(input) {
  return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
}
function getSetISOWeekYear(input) {
  return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
}
function getISOWeeksInYear() {
  return weeksInYear(this.year(), 1, 4);
}
function getISOWeeksInISOWeekYear() {
  return weeksInYear(this.isoWeekYear(), 1, 4);
}
function getWeeksInYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}
function getWeeksInWeekYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
}
function getSetWeekYearHelper(input, week, weekday, dow, doy) {
  var weeksTarget;
  if (input == null) {
    return weekOfYear(this, dow, doy).year;
  } else {
    weeksTarget = weeksInYear(input, dow, doy);
    if (week > weeksTarget) {
      week = weeksTarget;
    }
    return setWeekAll.call(this, input, week, weekday, dow, doy);
  }
}
function setWeekAll(weekYear, week, weekday, dow, doy) {
  var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
  this.year(date.getUTCFullYear());
  this.month(date.getUTCMonth());
  this.date(date.getUTCDate());
  return this;
}
addFormatToken("Q", 0, "Qo", "quarter");
addUnitAlias("quarter", "Q");
addUnitPriority("quarter", 7);
addRegexToken("Q", match1);
addParseToken("Q", function(input, array) {
  array[MONTH] = (toInt(input) - 1) * 3;
});
function getSetQuarter(input) {
  return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
addFormatToken("D", ["DD", 2], "Do", "date");
addUnitAlias("date", "D");
addUnitPriority("date", 9);
addRegexToken("D", match1to2);
addRegexToken("DD", match1to2, match2);
addRegexToken("Do", function(isStrict, locale2) {
  return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
});
addParseToken(["D", "DD"], DATE);
addParseToken("Do", function(input, array) {
  array[DATE] = toInt(input.match(match1to2)[0]);
});
var getSetDayOfMonth = makeGetSet("Date", true);
addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
addUnitAlias("dayOfYear", "DDD");
addUnitPriority("dayOfYear", 4);
addRegexToken("DDD", match1to3);
addRegexToken("DDDD", match3);
addParseToken(["DDD", "DDDD"], function(input, array, config) {
  config._dayOfYear = toInt(input);
});
function getSetDayOfYear(input) {
  var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
  return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
}
addFormatToken("m", ["mm", 2], 0, "minute");
addUnitAlias("minute", "m");
addUnitPriority("minute", 14);
addRegexToken("m", match1to2);
addRegexToken("mm", match1to2, match2);
addParseToken(["m", "mm"], MINUTE);
var getSetMinute = makeGetSet("Minutes", false);
addFormatToken("s", ["ss", 2], 0, "second");
addUnitAlias("second", "s");
addUnitPriority("second", 15);
addRegexToken("s", match1to2);
addRegexToken("ss", match1to2, match2);
addParseToken(["s", "ss"], SECOND);
var getSetSecond = makeGetSet("Seconds", false);
addFormatToken("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
addFormatToken(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
addFormatToken(0, ["SSS", 3], 0, "millisecond");
addFormatToken(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
addFormatToken(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
addFormatToken(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
addFormatToken(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
addUnitAlias("millisecond", "ms");
addUnitPriority("millisecond", 16);
addRegexToken("S", match1to3, match1);
addRegexToken("SS", match1to3, match2);
addRegexToken("SSS", match1to3, match3);
var token, getSetMillisecond;
for (token = "SSSS"; token.length <= 9; token += "S") {
  addRegexToken(token, matchUnsigned);
}
function parseMs(input, array) {
  array[MILLISECOND] = toInt(("0." + input) * 1e3);
}
for (token = "S"; token.length <= 9; token += "S") {
  addParseToken(token, parseMs);
}
getSetMillisecond = makeGetSet("Milliseconds", false);
addFormatToken("z", 0, 0, "zoneAbbr");
addFormatToken("zz", 0, 0, "zoneName");
function getZoneAbbr() {
  return this._isUTC ? "UTC" : "";
}
function getZoneName() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var proto = Moment.prototype;
proto.add = add;
proto.calendar = calendar$1;
proto.clone = clone;
proto.diff = diff;
proto.endOf = endOf;
proto.format = format;
proto.from = from;
proto.fromNow = fromNow;
proto.to = to;
proto.toNow = toNow;
proto.get = stringGet;
proto.invalidAt = invalidAt;
proto.isAfter = isAfter;
proto.isBefore = isBefore;
proto.isBetween = isBetween;
proto.isSame = isSame;
proto.isSameOrAfter = isSameOrAfter;
proto.isSameOrBefore = isSameOrBefore;
proto.isValid = isValid$2;
proto.lang = lang;
proto.locale = locale;
proto.localeData = localeData;
proto.max = prototypeMax;
proto.min = prototypeMin;
proto.parsingFlags = parsingFlags;
proto.set = stringSet;
proto.startOf = startOf;
proto.subtract = subtract;
proto.toArray = toArray;
proto.toObject = toObject;
proto.toDate = toDate;
proto.toISOString = toISOString;
proto.inspect = inspect;
if (typeof Symbol !== "undefined" && Symbol.for != null) {
  proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
    return "Moment<" + this.format() + ">";
  };
}
proto.toJSON = toJSON;
proto.toString = toString;
proto.unix = unix;
proto.valueOf = valueOf;
proto.creationData = creationData;
proto.eraName = getEraName;
proto.eraNarrow = getEraNarrow;
proto.eraAbbr = getEraAbbr;
proto.eraYear = getEraYear;
proto.year = getSetYear;
proto.isLeapYear = getIsLeapYear;
proto.weekYear = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;
proto.quarter = proto.quarters = getSetQuarter;
proto.month = getSetMonth;
proto.daysInMonth = getDaysInMonth;
proto.week = proto.weeks = getSetWeek;
proto.isoWeek = proto.isoWeeks = getSetISOWeek;
proto.weeksInYear = getWeeksInYear;
proto.weeksInWeekYear = getWeeksInWeekYear;
proto.isoWeeksInYear = getISOWeeksInYear;
proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
proto.date = getSetDayOfMonth;
proto.day = proto.days = getSetDayOfWeek;
proto.weekday = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear = getSetDayOfYear;
proto.hour = proto.hours = getSetHour;
proto.minute = proto.minutes = getSetMinute;
proto.second = proto.seconds = getSetSecond;
proto.millisecond = proto.milliseconds = getSetMillisecond;
proto.utcOffset = getSetOffset;
proto.utc = setOffsetToUTC;
proto.local = setOffsetToLocal;
proto.parseZone = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST = isDaylightSavingTime;
proto.isLocal = isLocal;
proto.isUtcOffset = isUtcOffset;
proto.isUtc = isUtc;
proto.isUTC = isUtc;
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;
proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth);
proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth);
proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear);
proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", getSetZone);
proto.isDSTShifted = deprecate("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", isDaylightSavingTimeShifted);
function createUnix(input) {
  return createLocal(input * 1e3);
}
function createInZone() {
  return createLocal.apply(null, arguments).parseZone();
}
function preParsePostFormat(string) {
  return string;
}
var proto$1 = Locale.prototype;
proto$1.calendar = calendar;
proto$1.longDateFormat = longDateFormat;
proto$1.invalidDate = invalidDate;
proto$1.ordinal = ordinal;
proto$1.preparse = preParsePostFormat;
proto$1.postformat = preParsePostFormat;
proto$1.relativeTime = relativeTime;
proto$1.pastFuture = pastFuture;
proto$1.set = set;
proto$1.eras = localeEras;
proto$1.erasParse = localeErasParse;
proto$1.erasConvertYear = localeErasConvertYear;
proto$1.erasAbbrRegex = erasAbbrRegex;
proto$1.erasNameRegex = erasNameRegex;
proto$1.erasNarrowRegex = erasNarrowRegex;
proto$1.months = localeMonths;
proto$1.monthsShort = localeMonthsShort;
proto$1.monthsParse = localeMonthsParse;
proto$1.monthsRegex = monthsRegex;
proto$1.monthsShortRegex = monthsShortRegex;
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;
proto$1.weekdays = localeWeekdays;
proto$1.weekdaysMin = localeWeekdaysMin;
proto$1.weekdaysShort = localeWeekdaysShort;
proto$1.weekdaysParse = localeWeekdaysParse;
proto$1.weekdaysRegex = weekdaysRegex;
proto$1.weekdaysShortRegex = weekdaysShortRegex;
proto$1.weekdaysMinRegex = weekdaysMinRegex;
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;
function get$1(format2, index2, field, setter) {
  var locale2 = getLocale(), utc = createUTC().set(setter, index2);
  return locale2[field](utc, format2);
}
function listMonthsImpl(format2, index2, field) {
  if (isNumber(format2)) {
    index2 = format2;
    format2 = void 0;
  }
  format2 = format2 || "";
  if (index2 != null) {
    return get$1(format2, index2, field, "month");
  }
  var i, out = [];
  for (i = 0; i < 12; i++) {
    out[i] = get$1(format2, i, field, "month");
  }
  return out;
}
function listWeekdaysImpl(localeSorted, format2, index2, field) {
  if (typeof localeSorted === "boolean") {
    if (isNumber(format2)) {
      index2 = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  } else {
    format2 = localeSorted;
    index2 = format2;
    localeSorted = false;
    if (isNumber(format2)) {
      index2 = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  }
  var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
  if (index2 != null) {
    return get$1(format2, (index2 + shift) % 7, field, "day");
  }
  for (i = 0; i < 7; i++) {
    out[i] = get$1(format2, (i + shift) % 7, field, "day");
  }
  return out;
}
function listMonths(format2, index2) {
  return listMonthsImpl(format2, index2, "months");
}
function listMonthsShort(format2, index2) {
  return listMonthsImpl(format2, index2, "monthsShort");
}
function listWeekdays(localeSorted, format2, index2) {
  return listWeekdaysImpl(localeSorted, format2, index2, "weekdays");
}
function listWeekdaysShort(localeSorted, format2, index2) {
  return listWeekdaysImpl(localeSorted, format2, index2, "weekdaysShort");
}
function listWeekdaysMin(localeSorted, format2, index2) {
  return listWeekdaysImpl(localeSorted, format2, index2, "weekdaysMin");
}
getSetGlobalLocale("en", {
  eras: [
    {
      since: "0001-01-01",
      until: Infinity,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -Infinity,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(number) {
    var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }
});
hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale);
hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
var mathAbs = Math.abs;
function abs() {
  var data = this._data;
  this._milliseconds = mathAbs(this._milliseconds);
  this._days = mathAbs(this._days);
  this._months = mathAbs(this._months);
  data.milliseconds = mathAbs(data.milliseconds);
  data.seconds = mathAbs(data.seconds);
  data.minutes = mathAbs(data.minutes);
  data.hours = mathAbs(data.hours);
  data.months = mathAbs(data.months);
  data.years = mathAbs(data.years);
  return this;
}
function addSubtract$1(duration, input, value, direction) {
  var other = createDuration(input, value);
  duration._milliseconds += direction * other._milliseconds;
  duration._days += direction * other._days;
  duration._months += direction * other._months;
  return duration._bubble();
}
function add$1(input, value) {
  return addSubtract$1(this, input, value, 1);
}
function subtract$1(input, value) {
  return addSubtract$1(this, input, value, -1);
}
function absCeil(number) {
  if (number < 0) {
    return Math.floor(number);
  } else {
    return Math.ceil(number);
  }
}
function bubble() {
  var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
  if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
    milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
    days2 = 0;
    months2 = 0;
  }
  data.milliseconds = milliseconds2 % 1e3;
  seconds2 = absFloor(milliseconds2 / 1e3);
  data.seconds = seconds2 % 60;
  minutes2 = absFloor(seconds2 / 60);
  data.minutes = minutes2 % 60;
  hours2 = absFloor(minutes2 / 60);
  data.hours = hours2 % 24;
  days2 += absFloor(hours2 / 24);
  monthsFromDays = absFloor(daysToMonths(days2));
  months2 += monthsFromDays;
  days2 -= absCeil(monthsToDays(monthsFromDays));
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  data.days = days2;
  data.months = months2;
  data.years = years2;
  return this;
}
function daysToMonths(days2) {
  return days2 * 4800 / 146097;
}
function monthsToDays(months2) {
  return months2 * 146097 / 4800;
}
function as(units) {
  if (!this.isValid()) {
    return NaN;
  }
  var days2, months2, milliseconds2 = this._milliseconds;
  units = normalizeUnits(units);
  if (units === "month" || units === "quarter" || units === "year") {
    days2 = this._days + milliseconds2 / 864e5;
    months2 = this._months + daysToMonths(days2);
    switch (units) {
      case "month":
        return months2;
      case "quarter":
        return months2 / 3;
      case "year":
        return months2 / 12;
    }
  } else {
    days2 = this._days + Math.round(monthsToDays(this._months));
    switch (units) {
      case "week":
        return days2 / 7 + milliseconds2 / 6048e5;
      case "day":
        return days2 + milliseconds2 / 864e5;
      case "hour":
        return days2 * 24 + milliseconds2 / 36e5;
      case "minute":
        return days2 * 1440 + milliseconds2 / 6e4;
      case "second":
        return days2 * 86400 + milliseconds2 / 1e3;
      case "millisecond":
        return Math.floor(days2 * 864e5) + milliseconds2;
      default:
        throw new Error("Unknown unit " + units);
    }
  }
}
function valueOf$1() {
  if (!this.isValid()) {
    return NaN;
  }
  return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
}
function makeAs(alias) {
  return function() {
    return this.as(alias);
  };
}
var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
function clone$1() {
  return createDuration(this);
}
function get$2(units) {
  units = normalizeUnits(units);
  return this.isValid() ? this[units + "s"]() : NaN;
}
function makeGetter(name) {
  return function() {
    return this.isValid() ? this._data[name] : NaN;
  };
}
var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
function weeks() {
  return absFloor(this.days() / 7);
}
var round = Math.round, thresholds = {
  ss: 44,
  s: 45,
  m: 45,
  h: 22,
  d: 26,
  w: null,
  M: 11
};
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
  return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}
function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
  var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
  if (thresholds2.w != null) {
    a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
  }
  a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
  a[2] = withoutSuffix;
  a[3] = +posNegDuration > 0;
  a[4] = locale2;
  return substituteTimeAgo.apply(null, a);
}
function getSetRelativeTimeRounding(roundingFunction) {
  if (roundingFunction === void 0) {
    return round;
  }
  if (typeof roundingFunction === "function") {
    round = roundingFunction;
    return true;
  }
  return false;
}
function getSetRelativeTimeThreshold(threshold, limit) {
  if (thresholds[threshold] === void 0) {
    return false;
  }
  if (limit === void 0) {
    return thresholds[threshold];
  }
  thresholds[threshold] = limit;
  if (threshold === "s") {
    thresholds.ss = limit - 1;
  }
  return true;
}
function humanize(argWithSuffix, argThresholds) {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var withSuffix = false, th = thresholds, locale2, output;
  if (typeof argWithSuffix === "object") {
    argThresholds = argWithSuffix;
    argWithSuffix = false;
  }
  if (typeof argWithSuffix === "boolean") {
    withSuffix = argWithSuffix;
  }
  if (typeof argThresholds === "object") {
    th = Object.assign({}, thresholds, argThresholds);
    if (argThresholds.s != null && argThresholds.ss == null) {
      th.ss = argThresholds.s - 1;
    }
  }
  locale2 = this.localeData();
  output = relativeTime$1(this, !withSuffix, th, locale2);
  if (withSuffix) {
    output = locale2.pastFuture(+this, output);
  }
  return locale2.postformat(output);
}
var abs$1 = Math.abs;
function sign(x) {
  return (x > 0) - (x < 0) || +x;
}
function toISOString$1() {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
  if (!total) {
    return "P0D";
  }
  minutes2 = absFloor(seconds2 / 60);
  hours2 = absFloor(minutes2 / 60);
  seconds2 %= 60;
  minutes2 %= 60;
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
  totalSign = total < 0 ? "-" : "";
  ymSign = sign(this._months) !== sign(total) ? "-" : "";
  daysSign = sign(this._days) !== sign(total) ? "-" : "";
  hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
  return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
}
var proto$2 = Duration.prototype;
proto$2.isValid = isValid$1;
proto$2.abs = abs;
proto$2.add = add$1;
proto$2.subtract = subtract$1;
proto$2.as = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds = asSeconds;
proto$2.asMinutes = asMinutes;
proto$2.asHours = asHours;
proto$2.asDays = asDays;
proto$2.asWeeks = asWeeks;
proto$2.asMonths = asMonths;
proto$2.asQuarters = asQuarters;
proto$2.asYears = asYears;
proto$2.valueOf = valueOf$1;
proto$2._bubble = bubble;
proto$2.clone = clone$1;
proto$2.get = get$2;
proto$2.milliseconds = milliseconds;
proto$2.seconds = seconds;
proto$2.minutes = minutes;
proto$2.hours = hours;
proto$2.days = days;
proto$2.weeks = weeks;
proto$2.months = months;
proto$2.years = years;
proto$2.humanize = humanize;
proto$2.toISOString = toISOString$1;
proto$2.toString = toISOString$1;
proto$2.toJSON = toISOString$1;
proto$2.locale = locale;
proto$2.localeData = localeData;
proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1);
proto$2.lang = lang;
addFormatToken("X", 0, 0, "unix");
addFormatToken("x", 0, 0, "valueOf");
addRegexToken("x", matchSigned);
addRegexToken("X", matchTimestamp);
addParseToken("X", function(input, array, config) {
  config._d = new Date(parseFloat(input) * 1e3);
});
addParseToken("x", function(input, array, config) {
  config._d = new Date(toInt(input));
});
//! moment.js
hooks.version = "2.29.4";
setHookCallback(createLocal);
hooks.fn = proto;
hooks.min = min;
hooks.max = max;
hooks.now = now;
hooks.utc = createUTC;
hooks.unix = createUnix;
hooks.months = listMonths;
hooks.isDate = isDate;
hooks.locale = getSetGlobalLocale;
hooks.invalid = createInvalid;
hooks.duration = createDuration;
hooks.isMoment = isMoment;
hooks.weekdays = listWeekdays;
hooks.parseZone = createInZone;
hooks.localeData = getLocale;
hooks.isDuration = isDuration;
hooks.monthsShort = listMonthsShort;
hooks.weekdaysMin = listWeekdaysMin;
hooks.defineLocale = defineLocale;
hooks.updateLocale = updateLocale;
hooks.locales = listLocales;
hooks.weekdaysShort = listWeekdaysShort;
hooks.normalizeUnits = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat = getCalendarFormat;
hooks.prototype = proto;
hooks.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm",
  TIME_SECONDS: "HH:mm:ss",
  TIME_MS: "HH:mm:ss.SSS",
  WEEK: "GGGG-[W]WW",
  MONTH: "YYYY-MM"
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var goeasy_min = { exports: {} };
(function(module2, exports2) {
  !function(e2, t2) {
    module2.exports = t2();
  }(commonjsGlobal, function() {
    return function(e2) {
      var t2 = {};
      function n(o2) {
        if (t2[o2])
          return t2[o2].exports;
        var r = t2[o2] = { i: o2, l: false, exports: {} };
        return e2[o2].call(r.exports, r, r.exports, n), r.l = true, r.exports;
      }
      return n.m = e2, n.c = t2, n.d = function(e3, t3, o2) {
        n.o(e3, t3) || Object.defineProperty(e3, t3, { enumerable: true, get: o2 });
      }, n.r = function(e3) {
        typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e3, "__esModule", { value: true });
      }, n.t = function(e3, t3) {
        if (1 & t3 && (e3 = n(e3)), 8 & t3)
          return e3;
        if (4 & t3 && typeof e3 == "object" && e3 && e3.__esModule)
          return e3;
        var o2 = /* @__PURE__ */ Object.create(null);
        if (n.r(o2), Object.defineProperty(o2, "default", { enumerable: true, value: e3 }), 2 & t3 && typeof e3 != "string")
          for (var r in e3)
            n.d(o2, r, function(t4) {
              return e3[t4];
            }.bind(null, r));
        return o2;
      }, n.n = function(e3) {
        var t3 = e3 && e3.__esModule ? function() {
          return e3["default"];
        } : function() {
          return e3;
        };
        return n.d(t3, "a", t3), t3;
      }, n.o = function(e3, t3) {
        return Object.prototype.hasOwnProperty.call(e3, t3);
      }, n.p = "", n(n.s = 2);
    }([function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.noop = t2.GoEasyDomainNumber = t2.goEasyArray = t2.UUID = t2.calibrator = void 0;
      var o2 = n(31), r = n(89), i = n(93), s = n(52);
      t2.calibrator = o2.calibrator, t2.UUID = r.UUID, t2.goEasyArray = i.goEasyArray, t2.GoEasyDomainNumber = s.GoEasyDomainNumber, t2.noop = function() {
      };
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      t2["default"] = { WRITE: "WRITE", READ: "READ", NONE: "NONE" };
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.GoEasyIM = t2.PubSub = t2.ConversationDTO = t2.MessageStatus = t2.Scene = t2.CallBackOptions = void 0;
      var o2, r = n(12), i = n(66), s = n(0), a = n(98), u = n(6), c = n(160), l = n(161), f2 = n(162), p2 = n(163), h = n(165), d = n(167), y = n(16), m = n(8), v = n(10), g = function() {
        return function() {
        };
      }();
      t2.CallBackOptions = g, function(e3) {
        e3.PRIVATE = "private", e3.GROUP = "group", e3.SYSTEM = "system";
      }(o2 = t2.Scene || (t2.Scene = {})), function(e3) {
        e3.NEW = "new", e3.SENDING = "sending", e3.SUCCESS = "success", e3.FAIL = "fail";
      }(t2.MessageStatus || (t2.MessageStatus = {}));
      var b = function() {
        return function() {
        };
      }();
      t2.ConversationDTO = b;
      var E2 = function() {
        function e3(e4) {
          this.neverConnect = true, this.options = e4;
        }
        return e3.prototype.initialGoEasySocket = function(e4) {
          this.goEasySocket = e4, this.subscriber.initialGoEasySocket(), this.presence.initialGoEasySocket();
        }, e3.prototype.initialBeforeConnect = function() {
          this.neverConnect = false, this.publisher = new f2["default"](this), this.subscriber = new p2["default"](this), this.histories = new c["default"](this), this.presence = new h["default"](this), this.hereNows = new l["default"](this);
        }, e3.prototype.validateOptions = function() {
          var e4 = this.options;
          if (!e4.modules || !e4.modules.includes(a.ModuleTypes.PUBSUB))
            throw { code: 400, content: "Invalid options: module '" + a.ModuleTypes.PUBSUB + "' is not enabled" };
        }, e3.prototype.publish = function(e4) {
          this.validateOptions(), this.publisher.publish(e4);
        }, e3.prototype.subscribe = function(e4) {
          this.validateOptions(), this.subscriber.subscribe(e4);
        }, e3.prototype.unsubscribe = function(e4) {
          this.validateOptions(), this.subscriber.unsubscribe(e4);
        }, e3.prototype.subscribePresence = function(e4) {
          this.validateOptions(), this.presence.subscribePresence(e4);
        }, e3.prototype.unsubscribePresence = function(e4) {
          this.validateOptions(), this.presence.unsubscribePresence(e4);
        }, e3.prototype.history = function(e4) {
          this.validateOptions(), this.histories.get(e4);
        }, e3.prototype.hereNow = function(e4) {
          this.validateOptions(), this.hereNows.byChannel(e4);
        }, e3.prototype.hereNowByUserIds = function(e4) {
          this.validateOptions(), this.hereNows.byUserId(e4);
        }, e3;
      }();
      t2.PubSub = E2;
      var _ = function() {
        function e3(e4) {
          this.options = e4;
        }
        return e3.prototype.initialBeforeConnect = function(e4) {
          u.im.initialBeforeConnect(e4);
        }, e3.prototype.initialAfterConnect = function() {
          u.im.initialAfterConnect();
        }, e3.prototype.initialGoEasySocket = function(e4) {
          u.im.initialGoEasySocket(e4);
        }, e3.prototype.validateOptions = function() {
          var e4 = this.options;
          if (!e4.modules || !e4.modules.includes(a.ModuleTypes.IM))
            throw Error("Invalid options: module '" + a.ModuleTypes.IM + "' is not enabled");
        }, e3.prototype.validateMessageToData = function(e4) {
          if (!s.calibrator.isObject(e4.to))
            throw { code: 400, content: "TypeError: to requires an object." };
          if (!s.calibrator.isObject(e4.to.data))
            throw { code: 400, content: "TypeError: to.data requires an object." };
        }, e3.prototype.on = function(e4, t3) {
          this.validateOptions(), u.im.on(e4, t3);
        }, e3.prototype.createTextMessage = function(e4) {
          return this.validateOptions(), this.validateMessageToData(e4), u.im.createTextMessage(e4);
        }, e3.prototype.createImageMessage = function(e4) {
          return this.validateOptions(), this.validateMessageToData(e4), u.im.createImageMessage(e4);
        }, e3.prototype.createFileMessage = function(e4) {
          return this.validateOptions(), this.validateMessageToData(e4), u.im.createFileMessage(e4);
        }, e3.prototype.createAudioMessage = function(e4) {
          return this.validateOptions(), this.validateMessageToData(e4), u.im.createAudioMessage(e4);
        }, e3.prototype.createVideoMessage = function(e4) {
          return this.validateOptions(), this.validateMessageToData(e4), u.im.createVideoMessage(e4);
        }, e3.prototype.createCustomMessage = function(e4) {
          return this.validateOptions(), this.validateMessageToData(e4), u.im.createCustomMessage(e4);
        }, e3.prototype.sendMessage = function(e4) {
          this.validateOptions(), u.im.sendMessage(e4);
        }, e3.prototype.recallMessage = function(e4) {
          this.validateOptions(), u.im.recallMessage(e4);
        }, e3.prototype.deleteMessage = function(e4) {
          this.validateOptions(), u.im.deleteMessage(e4);
        }, e3.prototype.markGroupMessageAsRead = function(e4) {
          this.validateOptions(), u.im.groupMarkAsRead(e4);
        }, e3.prototype.markPrivateMessageAsRead = function(e4) {
          this.validateOptions(), u.im.privateMarkAsRead(e4);
        }, e3.prototype.latestConversations = function(e4) {
          this.validateOptions(), u.im.latestConversations().then(function(t3) {
            m.CallbackUtils.onSuccess(e4, t3);
          })["catch"](function(t3) {
            m.CallbackUtils.onFailed(e4, t3);
          });
        }, e3.prototype.removePrivateConversation = function(e4) {
          this.validateOptions(), u.im.removePrivateConversation(e4);
        }, e3.prototype.removeGroupConversation = function(e4) {
          this.validateOptions(), u.im.removeGroupConversation(e4);
        }, e3.prototype.topPrivateConversation = function(e4) {
          this.validateOptions(), u.im.topPrivateConversation(e4);
        }, e3.prototype.topGroupConversation = function(e4) {
          this.validateOptions(), u.im.topGroupConversation(e4);
        }, e3.prototype.history = function(e4) {
          this.validateOptions(), u.im.history(e4);
        }, e3.prototype.subscribeUserPresence = function(e4) {
          this.validateOptions(), u.im.subscribeUserPresence(e4.userIds).then(function(t3) {
            s.calibrator.isFunction(e4.onSuccess) && e4.onSuccess(t3);
          })["catch"](function(t3) {
            s.calibrator.isFunction(e4.onFailed) && e4.onFailed(t3);
          });
        }, e3.prototype.unsubscribeUserPresence = function(e4) {
          this.validateOptions(), u.im.unsubscribeUserPresence(e4.userId).then(function(t3) {
            s.calibrator.isFunction(e4.onSuccess) && e4.onSuccess(t3);
          })["catch"](function(t3) {
            s.calibrator.isFunction(e4.onFailed) && e4.onFailed(t3);
          });
        }, e3.prototype.hereNow = function(e4) {
          this.validateOptions(), u.im.hereNow(e4).then(function(t3) {
            s.calibrator.isFunction(e4.onSuccess) && e4.onSuccess(t3);
          })["catch"](function(t3) {
            s.calibrator.isFunction(e4.onFailed) && e4.onFailed(t3);
          });
        }, e3.prototype.subscribeGroup = function(e4) {
          this.validateOptions(), u.im.subscribeGroup(e4).then(function(t3) {
            s.calibrator.isFunction(e4.onSuccess) && e4.onSuccess(t3);
          })["catch"](function(t3) {
            s.calibrator.isFunction(e4.onFailed) && e4.onFailed(t3);
          });
        }, e3.prototype.unsubscribeGroup = function(e4) {
          this.validateOptions(), u.im.unsubscribeGroup(e4.groupId).then(function(t3) {
            s.calibrator.isFunction(e4.onSuccess) && e4.onSuccess(t3);
          })["catch"](function(t3) {
            s.calibrator.isFunction(e4.onFailed) && e4.onFailed(t3);
          });
        }, e3.prototype.subscribeGroupPresence = function(e4) {
          this.validateOptions(), u.im.subscribeGroupPresence(e4.groupIds).then(function(t3) {
            s.calibrator.isFunction(e4.onSuccess) && e4.onSuccess(t3);
          })["catch"](function(t3) {
            s.calibrator.isFunction(e4.onFailed) && e4.onFailed(t3);
          });
        }, e3.prototype.unsubscribeGroupPresence = function(e4) {
          this.validateOptions(), u.im.unsubscribeGroupPresence(e4.groupId).then(function(t3) {
            s.calibrator.isFunction(e4.onSuccess) && e4.onSuccess(t3);
          })["catch"](function(t3) {
            s.calibrator.isFunction(e4.onFailed) && e4.onFailed(t3);
          });
        }, e3.prototype.groupHereNow = function(e4) {
          this.validateOptions(), u.im.groupHereNow(e4.groupId).then(function(t3) {
            s.calibrator.isFunction(e4.onSuccess) && e4.onSuccess(t3);
          })["catch"](function(t3) {
            s.calibrator.isFunction(e4.onFailed) && e4.onFailed(t3);
          });
        }, e3.prototype.groupOnlineCount = function(e4) {
          this.validateOptions(), u.im.groupOnlineCount(e4.groupId).then(function(t3) {
            s.calibrator.isFunction(e4.onSuccess) && e4.onSuccess(t3);
          })["catch"](function(t3) {
            s.calibrator.isFunction(e4.onFailed) && e4.onFailed(t3);
          });
        }, e3;
      }();
      t2.GoEasyIM = _;
      var S = function() {
        function e3(t3) {
          if (s.calibrator.isDef(e3.instance) && e3.instance.getConnectionStatus() !== r["default"].DISCONNECTED)
            return e3.instance;
          this.validateOptions(t3), this.options = t3, this.pubsub = new E2(this.options), this.im = new _(this.options), this.notification = new d.GoEasyNotification(this.options.allowNotification);
        }
        return e3.getInstance = function(t3) {
          return s.calibrator.isUndef(e3.instance) && (e3.instance = new e3(t3)), e3.instance;
        }, e3.prototype.connect = function(e4) {
          this.getConnectionStatus() !== r["default"].DISCONNECTED && s.calibrator.isObject(e4) && s.calibrator.isFunction(e4.onFailed) ? e4.onFailed({ code: 408, content: "It is already connected, don't try again until disconnect() is called. " }) : (this.confirmUserId(e4), v.GoEasyEventCenter.initial(), this.notification.listenNewMessage(), this.pubsub.initialBeforeConnect(), this.im.initialBeforeConnect({ id: e4.id, data: e4.data }), this.goEasySocket = new i["default"](this.options, e4), this.im.initialGoEasySocket(this.goEasySocket), this.goEasySocket.connect(this.notification), this.pubsub.initialGoEasySocket(this.goEasySocket), this.im.initialAfterConnect());
        }, e3.prototype.disconnect = function(e4) {
          this.goEasySocket.disconnect(e4).then(function() {
            s.calibrator.isObject(e4) && s.calibrator.isFunction(e4.onSuccess) && e4.onSuccess();
          })["catch"](function(t3) {
            s.calibrator.isObject(e4) && s.calibrator.isFunction(e4.onFailed) && e4.onFailed(t3);
          });
        }, e3.prototype.getConnectionStatus = function() {
          return this.goEasySocket ? this.goEasySocket.getStatus() : r["default"].DISCONNECTED;
        }, e3.prototype.validateOptions = function(e4) {
          var t3 = "";
          if (!s.calibrator.isObject(e4))
            throw t3 = "options is require an object.", Error(t3);
          if (!s.calibrator.isPrimitive(e4.appkey) || e4.appkey.length == 0)
            throw t3 = "Invalid options:'host' is empty.", Error(t3);
          if (!s.calibrator.isPrimitive(e4.host) || e4.host.length == 0)
            throw t3 = "Invalid options:'host' is empty.", Error(t3);
          if (!s.calibrator.isArray(e4.modules))
            throw t3 = "Invalid options: 'modules' must be nonempty array", Error(t3);
          var n2 = [a.ModuleTypes.IM, a.ModuleTypes.PUBSUB], o3 = e4.modules.map(function(e5) {
            var o4 = e5.toUpperCase();
            if (!n2.includes(o4))
              throw t3 = "Invalid options: module '" + e5 + "' is not support", Error(t3);
            return o4;
          });
          e4.modules = o3;
        }, e3.prototype.onClickNotification = function(e4) {
          this.notification.onClickNotification(e4);
        }, e3.prototype.confirmUserId = function(e4) {
          if (this.options.modules.includes(a.ModuleTypes.IM) && (s.calibrator.isEmpty(e4.id) || !s.calibrator.isStringOrNumber(e4.id)))
            throw { code: 400, content: "TypeError: id requires number or string." };
          if (typeof e4.id == "string" && e4.id.length > 60)
            throw { code: 400, content: "id over max length 60" };
        }, e3.version = "2.4.7", e3.IM_EVENT = y.ImApiEvents, e3.IM_SCENE = o2, e3;
      }();
      t2["default"] = S;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2, r = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), i = n(0), s = n(1), a = (o2 = s) && o2.__esModule ? o2 : { "default": o2 };
      var u = function() {
        function e3(t3) {
          var n2 = this;
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.uuid = null, this.name = "", this.params = null, this.success = null, this.fail = null, this.permission = a["default"].NONE, this.singleTimeout = 0, this.totalTimeout = 0, this.startTime = 0, this.complete = false, this.retried = 0, this.unique = false, this.uuid = i.UUID.get(), this.name = t3.name, this.params = t3.params, this.permission = t3.permission, this.totalTimeout = t3.totalTimeout, this.singleTimeout = t3.singleTimeout, t3.unique && (this.unique = t3.unique), this.success = function(e4) {
            n2.complete || (n2.complete = true, t3.success(e4));
          }, this.fail = function(e4) {
            n2.complete || (n2.complete = true, t3.fail(e4));
          };
        }
        return r(e3, [{ key: "start", value: function() {
          this.startTime = Date.now();
        } }, { key: "isTimeout", value: function() {
          return this.startTime + this.totalTimeout < Date.now();
        } }]), e3;
      }();
      t2["default"] = u;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      t2.SocketTimeout = { connect: 1500, reconnectionDelayMax: 3e3, commonQuerySingle: 2500, commonQueryTotal: 12e3, commonRequestSingle: 1700, commonRequestTotal: 12e3, commonInfiniteSingle: 1700, commonInfiniteTotal: 864e5 };
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.RocketTypes = void 0, function(e3) {
        e3.authorize = "authorize", e3.manualDisconnect = "manualDisconnect", e3.subscribe = "subscribe", e3.unsubscribe = "unsubscribe", e3.publish = "publish", e3.ack = "ack", e3.historyMessages = "historyMessages", e3.hereNow = "hereNow", e3.hereNowByUserIds = "hereNowByUserIds", e3.imLastConversations = "imLastConversations", e3.markPrivateMessageAsRead = "markPrivateMessageAsRead", e3.markGroupMessageAsRead = "markGroupMessageAsRead", e3.imGroupOnlineCount = "imGroupOnlineCount", e3.imHereNow = "imHereNow", e3.imGroupHereNow = "imGroupHereNow", e3.publishIM = "publishIM", e3.subscribeUserPresence = "subscribeUserPresence", e3.unsubscribeUserPresence = "unsubscribeUserPresence", e3.subscribeGroupPresence = "subscribeGroupPresence", e3.unsubscribeGroupPresence = "unsubscribeGroupPresence", e3.removeConversation = "removeConversation", e3.topConversation = "topConversation", e3.imData = "imData", e3.subscribeGroups = "subscribeGroups", e3.unsubscribeGroup = "unsubscribeGroup", e3.IM_DELETE_MESSAGE = "IM_DELETE_MESSAGE", e3.IM_HISTORY = "IM_HISTORY", e3.IM_HISTORY_CHANGE = "IM_HISTORY_CHANGE", e3.IM_RECALL_MESSAGE = "IM_RECALL_MESSAGE";
      }(t2.RocketTypes || (t2.RocketTypes = {}));
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.im = t2.IM = void 0;
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = E2(n(54)), i = E2(n(109)), s = E2(n(110)), a = E2(n(111)), u = E2(n(112)), c = E2(n(113)), l = E2(n(114)), f2 = E2(n(116)), p2 = E2(n(118)), h = n(119), d = E2(n(134)), y = n(2), m = n(139), v = E2(n(140)), g = n(19), b = n(8);
      function E2(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var _ = t2.IM = function() {
        function e3() {
          !function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this._event = m.eventCenter, this.goEasyUploader = null, this._goEasySocket = null, this._dataCache = null, this.messageSender = null, this.conversations = null, this._iMReceiver = null, this.groupMessageSubscriber = null, this._groupPresenceSubscriber = null, this._groupOnlineCount = null, this._groupHereNow = null, this._userPresenceSubscriber = null, this._userHereNow = null;
        }
        return o2(e3, [{ key: "on", value: function(e4, t3) {
          this._event.on(e4, t3);
        } }, { key: "initialBeforeConnect", value: function(t3) {
          e3.userId = t3.id ? t3.id.toString() : t3.id, e3.userData = t3.data, this._dataCache = new p2["default"](t3), this.messageSender = new d["default"](), this.goEasyUploader = new r["default"](), this._userHereNow = new c["default"](this), this._groupHereNow = new l["default"](this), this._groupOnlineCount = new s["default"](this);
        } }, { key: "initialAfterConnect", value: function() {
          this._iMReceiver = new f2["default"](this), this.conversations = new v["default"](this), this._groupPresenceSubscriber = new a["default"](this), this.groupMessageSubscriber = new i["default"](), this._userPresenceSubscriber = new u["default"](this);
        } }, { key: "initialGoEasySocket", value: function(e4) {
          this._goEasySocket = e4;
        } }, { key: "catch", value: function(e4, t3) {
          try {
            e4();
          } catch (n2) {
            b.CallbackUtils.onFailed(t3, n2);
          }
        } }, { key: "createTextMessage", value: function(e4) {
          return h.iMMessageBuilder.buildMessage(g.MessageType.TEXT, e4);
        } }, { key: "createImageMessage", value: function(e4) {
          return h.iMMessageBuilder.buildMessage(g.MessageType.IMAGE, e4);
        } }, { key: "createFileMessage", value: function(e4) {
          return h.iMMessageBuilder.buildMessage(g.MessageType.FILE, e4);
        } }, { key: "createAudioMessage", value: function(e4) {
          return h.iMMessageBuilder.buildMessage(g.MessageType.AUDIO, e4);
        } }, { key: "createVideoMessage", value: function(e4) {
          return h.iMMessageBuilder.buildMessage(g.MessageType.VIDEO, e4);
        } }, { key: "createCustomMessage", value: function(e4) {
          return h.iMMessageBuilder.buildMessage(e4.type, e4);
        } }, { key: "latestConversations", value: function() {
          return this.conversations ? this.conversations.latestConversations() : Promise.reject({ code: 500, content: "Please connect GoEasyIM first." });
        } }, { key: "groupMarkAsRead", value: function(e4) {
          var t3 = this;
          this["catch"](function() {
            return t3.conversations.groupMarkAsRead(e4);
          }, e4);
        } }, { key: "privateMarkAsRead", value: function(e4) {
          var t3 = this;
          this["catch"](function() {
            return t3.conversations.privateMarkAsRead(e4);
          }, e4);
        } }, { key: "removePrivateConversation", value: function(e4) {
          return this.conversations.removePrivateConversation(e4);
        } }, { key: "removeGroupConversation", value: function(e4) {
          return this.conversations.removeGroupConversation(e4);
        } }, { key: "topPrivateConversation", value: function(e4) {
          return this.conversations.topPrivateConversation(e4);
        } }, { key: "topGroupConversation", value: function(e4) {
          return this.conversations.topGroupConversation(e4);
        } }, { key: "history", value: function(e4) {
          var t3 = this;
          this["catch"](function() {
            t3.conversations.history(e4);
          }, e4);
        } }, { key: "upload", value: function(e4, t3, n2) {
          return this.goEasyUploader.upload(e4, t3, n2);
        } }, { key: "sendSystemMessage", value: function(e4, t3) {
          return this.messageSender.send(e4, t3, y.Scene.SYSTEM);
        } }, { key: "sendMessage", value: function(e4) {
          this.messageSender.send(e4);
        } }, { key: "subscribeUserPresence", value: function(e4) {
          return this._userPresenceSubscriber.presence(e4);
        } }, { key: "unsubscribeUserPresence", value: function(e4) {
          return this._userPresenceSubscriber.unPresence(e4);
        } }, { key: "hereNow", value: function(e4) {
          return this._userHereNow.hereNow(e4, y.Scene.PRIVATE);
        } }, { key: "recallMessage", value: function(e4) {
          var t3 = this;
          this["catch"](function() {
            t3.conversations.recallMessage(e4);
          }, e4);
        } }, { key: "deleteMessage", value: function(e4) {
          var t3 = this;
          this["catch"](function() {
            t3.conversations.deleteMessage(e4);
          }, e4);
        } }, { key: "subscribeGroup", value: function(e4) {
          return this.groupMessageSubscriber.subscribe(e4);
        } }, { key: "unsubscribeGroup", value: function(e4) {
          return this.groupMessageSubscriber.unsubscribe(e4);
        } }, { key: "subscribeGroupPresence", value: function(e4) {
          return this._groupPresenceSubscriber.presence(e4);
        } }, { key: "unsubscribeGroupPresence", value: function(e4) {
          return this._groupPresenceSubscriber.unPresence(e4);
        } }, { key: "groupHereNow", value: function(e4) {
          return this._groupHereNow.hereNow(e4);
        } }, { key: "groupOnlineCount", value: function(e4) {
          return this._groupOnlineCount.get(e4);
        } }]), e3;
      }();
      _.version = null, _.userId = void 0, _.userData = null;
      var S = new _();
      t2.im = S;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.str = t2.noop = t2.GoEasyDomainNumber = t2.goEasyArray = t2.UUID = t2.calibrator = void 0;
      var o2 = n(115), r = n(0);
      t2.calibrator = r.calibrator, t2.UUID = r.UUID, t2.goEasyArray = r.goEasyArray, t2.GoEasyDomainNumber = r.GoEasyDomainNumber, t2.noop = r.noop, t2.str = o2.str;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.CallbackUtils = void 0;
      var o2 = n(31), r = function() {
        function e3() {
        }
        return e3.onSuccess = function(e4, t3) {
          o2.calibrator.isFunction(e4.onSuccess) && e4.onSuccess(t3);
        }, e3.onFailed = function(e4, t3) {
          if (!o2.calibrator.isObject(e4) || !o2.calibrator.isFunction(e4.onFailed))
            throw t3;
          e4.onFailed(t3);
        }, e3.validateCallbackOptions = function(e4) {
          if (o2.calibrator.isUndef(e4) || !o2.calibrator.isObject(e4))
            throw { code: 400, content: "bad parameters" };
        }, e3;
      }();
      t2.CallbackUtils = r;
    }, function(e2, t2, n) {
      e2.exports = function() {
        return function() {
        };
      };
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.GoEasyEventCenter = void 0;
      var o2 = n(117), r = function() {
        function e3() {
        }
        return e3.initial = function() {
          this.eventDriver = new o2.EmitterEventDriver();
        }, e3.on = function(e4, t3) {
          this.eventDriver.on(e4, t3);
        }, e3.fire = function(e4, t3) {
          this.eventDriver.fire(e4, t3);
        }, e3;
      }();
      t2.GoEasyEventCenter = r;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.AbstractPayloadBuilder = void 0;
      var o2 = function() {
        function e3() {
        }
        return e3.prototype.build = function(e4) {
          this.validate(e4.createOptions);
          var t3 = this.create();
          return this.setPayload(e4, t3), t3;
        }, e3;
      }();
      t2.AbstractPayloadBuilder = o2;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      t2["default"] = { DISCONNECTED: "disconnected", DISCONNECTING: "disconnecting", CONNECTING: "connecting", CONNECTED: "connected", RECONNECTING: "reconnecting", RECONNECTED: "reconnected", EXPIRED_RECONNECTED: "reconnected", CONNECT_FAILED: "connect_failed" };
    }, function(e2, t2, n) {
      function o2(e3) {
        if (e3)
          return function(e4) {
            for (var t3 in o2.prototype)
              e4[t3] = o2.prototype[t3];
            return e4;
          }(e3);
      }
      e2.exports = o2, o2.prototype.on = o2.prototype.addEventListener = function(e3, t3) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e3] = this._callbacks["$" + e3] || []).push(t3), this;
      }, o2.prototype.once = function(e3, t3) {
        function n2() {
          this.off(e3, n2), t3.apply(this, arguments);
        }
        return n2.fn = t3, this.on(e3, n2), this;
      }, o2.prototype.off = o2.prototype.removeListener = o2.prototype.removeAllListeners = o2.prototype.removeEventListener = function(e3, t3) {
        if (this._callbacks = this._callbacks || {}, arguments.length == 0)
          return this._callbacks = {}, this;
        var n2, o3 = this._callbacks["$" + e3];
        if (!o3)
          return this;
        if (arguments.length == 1)
          return delete this._callbacks["$" + e3], this;
        for (var r = 0; r < o3.length; r++)
          if ((n2 = o3[r]) === t3 || n2.fn === t3) {
            o3.splice(r, 1);
            break;
          }
        return this;
      }, o2.prototype.emit = function(e3) {
        this._callbacks = this._callbacks || {};
        var t3 = [].slice.call(arguments, 1), n2 = this._callbacks["$" + e3];
        if (n2)
          for (var o3 = 0, r = (n2 = n2.slice(0)).length; o3 < r; ++o3)
            n2[o3].apply(this, t3);
        return this;
      }, o2.prototype.listeners = function(e3) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e3] || [];
      }, o2.prototype.hasListeners = function(e3) {
        return !!this.listeners(e3).length;
      };
    }, function(e2, t2, n) {
      var o2 = n(74), r = n(45), i = n(78), s = n(79);
      typeof navigator != "undefined" && /Android/i.test(navigator.userAgent), typeof navigator != "undefined" && /PhantomJS/i.test(navigator.userAgent);
      t2.protocol = 3;
      var a = t2.packets = { open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6 }, u = o2(a), c = { type: "error", data: "parser error" }, l = n(80);
      t2.encodePacket = function(e3, t3, n2, o3) {
        typeof t3 == "function" && (o3 = t3, t3 = false), typeof n2 == "function" && (o3 = n2, n2 = null);
        e3.data === void 0 ? void 0 : e3.data.buffer || e3.data;
        var r2 = a[e3.type];
        return e3.data !== void 0 && (r2 += n2 ? s.encode(String(e3.data), { strict: false }) : String(e3.data)), o3("" + r2);
      }, t2.decodePacket = function(e3, t3, n2) {
        if (e3 === void 0)
          return c;
        if (typeof e3 == "string") {
          if (n2 && (e3 = function(e4) {
            try {
              e4 = s.decode(e4, { strict: false });
            } catch (t4) {
              return false;
            }
            return e4;
          }(e3)) === false)
            return c;
          var o3 = e3.charAt(0);
          return Number(o3) == o3 && u[o3] ? e3.length > 1 ? { type: u[o3], data: e3.substring(1) } : { type: u[o3] } : c;
        }
        o3 = new Uint8Array(e3)[0];
        var r2 = sliceBuffer(e3, 1);
        return l && t3 === "blob" && (r2 = new l([r2])), { type: u[o3], data: r2 };
      }, t2.encodePayload = function(e3, n2, o3) {
        typeof n2 == "function" && (o3 = n2, n2 = null);
        var s2 = r(e3);
        if (!e3.length)
          return o3("0:");
        !function(e4, t3, n3) {
          for (var o4 = new Array(e4.length), r2 = i(e4.length, n3), s3 = function(e5, n4, r3) {
            t3(n4, function(t4, n5) {
              o4[e5] = n5, r3(t4, o4);
            });
          }, a2 = 0; a2 < e4.length; a2++)
            s3(a2, e4[a2], r2);
        }(e3, function(e4, o4) {
          t2.encodePacket(e4, !!s2 && n2, true, function(e5) {
            o4(null, function(e6) {
              return e6.length + ":" + e6;
            }(e5));
          });
        }, function(e4, t3) {
          return o3(t3.join(""));
        });
      }, t2.decodePayload = function(e3, n2, o3) {
        var r2;
        if (typeof n2 == "function" && (o3 = n2, n2 = null), e3 === "")
          return o3(c, 0, 1);
        for (var i2, s2, a2 = "", u2 = 0, l2 = e3.length; u2 < l2; u2++) {
          var f2 = e3.charAt(u2);
          if (f2 === ":") {
            if (a2 === "" || a2 != (i2 = Number(a2)))
              return o3(c, 0, 1);
            if (a2 != (s2 = e3.substr(u2 + 1, i2)).length)
              return o3(c, 0, 1);
            if (s2.length) {
              if (r2 = t2.decodePacket(s2, n2, true), c.type === r2.type && c.data === r2.data)
                return o3(c, 0, 1);
              if (o3(r2, u2 + i2, l2) === false)
                return;
            }
            u2 += i2, a2 = "";
          } else
            a2 += f2;
        }
        return a2 !== "" ? o3(c, 0, 1) : void 0;
      };
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.RemoteEvents = void 0, function(e3) {
        e3.message = "message", e3.imMessage = "imMessage", e3.userPresence = "userPresence", e3.groupPresence = "groupPresence", e3.IM_MSG_READ = "IM_MSG_READ", e3.IM_MSG_DELETED = "IM_MSG_DELETED", e3.IM_MSG_RECALLED = "IM_MSG_RECALLED";
      }(t2.RemoteEvents || (t2.RemoteEvents = {}));
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.ImApiEvents = void 0, function(e3) {
        e3.PRIVATE_MESSAGE_RECEIVED = "PRIVATE_MESSAGE_RECEIVED", e3.GROUP_MESSAGE_RECEIVED = "GROUP_MESSAGE_RECEIVED", e3.SYSTEM_MESSAGE_RECEIVED = "SYSTEM_MESSAGE_RECEIVED", e3.CONVERSATIONS_UPDATED = "CONVERSATIONS_UPDATED", e3.USER_PRESENCE = "USER_PRESENCE", e3.GROUP_PRESENCE = "GROUP_PRESENCE", e3.MESSAGE_DELETED = "MESSAGE_DELETED", e3.MESSAGE_READ = "MESSAGE_READ", e3.MESSAGE_RECALLED = "MESSAGE_RECALLED";
      }(t2.ImApiEvents || (t2.ImApiEvents = {}));
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.Target = void 0;
      var o2 = n(2), r = n(6), i = n(7), s = n(63), a = function() {
        function e3(e4, t3) {
          this.scene = e4, this.id = t3.toString();
        }
        return e3.byScene = function(t3, n2) {
          return new e3(t3, n2);
        }, e3.byIds = function(t3, n2) {
          var r2 = o2.Scene.PRIVATE, s2 = t3;
          return i.calibrator.isDef(n2) && (r2 = o2.Scene.GROUP, s2 = n2), e3.byScene(r2, s2);
        }, e3.byIMMessage = function(t3) {
          var n2, i2 = t3.scene();
          if (i2 === o2.Scene.PRIVATE) {
            var s2 = t3.senderId, a2 = t3.targetId();
            n2 = r.IM.userId === s2 ? a2 : s2;
          } else
            i2 === o2.Scene.GROUP && (n2 = t3.targetId());
          return new e3(i2, n2);
        }, e3.byMessageReadRemoteEvent = function(t3) {
          var n2, i2 = t3.scene, s2 = t3.targetId, a2 = t3.markerId;
          return i2 === o2.Scene.PRIVATE ? n2 = r.IM.userId === a2 ? s2 : a2 : i2 === o2.Scene.GROUP && (n2 = s2), new e3(i2, n2);
        }, e3.byIMMessageDeletedEvent = function(t3) {
          var n2 = t3.scene, i2 = t3.deleterId;
          return n2 === o2.Scene.PRIVATE ? new e3(n2, r.IM.userId === i2 ? t3.targetId : i2) : n2 === o2.Scene.GROUP ? new e3(n2, t3.targetId) : void 0;
        }, e3.byMessageRecalledRemoteEvent = function(t3) {
          var n2 = t3.scene;
          return new e3(n2, s["default"].targetId(n2, t3.conversationId));
        }, e3;
      }();
      t2.Target = a;
    }, function(e2, t2, n) {
      (function(e3) {
        var o2 = this && this.__values || function(e4) {
          var t3 = typeof Symbol == "function" && Symbol.iterator, n2 = t3 && e4[t3], o3 = 0;
          if (n2)
            return n2.call(e4);
          if (e4 && typeof e4.length == "number")
            return { next: function() {
              return e4 && o3 >= e4.length && (e4 = void 0), { value: e4 && e4[o3++], done: !e4 };
            } };
          throw new TypeError(t3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
        t2.__esModule = true, t2.FrameworkDetector = t2.Framework = void 0;
        var r, i = n(23);
        !function(e4) {
          e4.UNIAPP = "UNIAPP", e4.REACT_NATIVE = "REACT_NATIVE", e4.TARO = "TARO", e4.IONIC = "IONIC", e4.NATIVE_APPLET_WX = "NATIVE_APPLET_WX", e4.NATIVE_APPLET_ALIPAY = "NATIVE_APPLET_ALIPAY", e4.UNKNOWN = "UNKNOWN";
        }(r = t2.Framework || (t2.Framework = {}));
        var s = function() {
          function t3() {
            var e4, t4, n2;
            this.framework = null, this.methods = ((e4 = {})[r.UNIAPP] = this.isUniApp, e4[r.REACT_NATIVE] = this.isReactNative, e4[r.NATIVE_APPLET_WX] = this.isWXApplet, e4);
            var i2 = this.methods, s2 = Object.keys(i2);
            try {
              for (var a = o2(s2), u = a.next(); !u.done; u = a.next()) {
                var c = u.value;
                if ((0, i2[c])()) {
                  this.framework = c;
                  break;
                }
              }
            } catch (l) {
              t4 = { error: l };
            } finally {
              try {
                u && !u.done && (n2 = a["return"]) && n2.call(a);
              } finally {
                if (t4)
                  throw t4.error;
              }
            }
            this.framework = this.framework || r.UNKNOWN, this.framework;
          }
          return t3.currentFramework = function() {
            return this.instance.framework;
          }, t3.prototype.isUniApp = function() {
            return typeof index == "object" && !!index.getSystemInfoSync;
          }, t3.prototype.isReactNative = function() {
            return e3 !== void 0 && e3.__fbGenNativeModule;
          }, t3.prototype.isTaro = function() {
            return false;
          }, t3.prototype.isWXApplet = function() {
            return i.PlatformDetector.currentPlatform() === i.Platform.APPLET_WX && typeof index == "undefined";
          }, t3.instance = new t3(), t3;
        }();
        t2.FrameworkDetector = s;
      }).call(this, n(28));
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.MessageType = void 0, function(e3) {
        e3.TEXT = "text", e3.IMAGE = "image", e3.FILE = "file", e3.VIDEO = "video", e3.AUDIO = "audio";
      }(t2.MessageType || (t2.MessageType = {}));
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.IM_INTERNAL_EVENTS = void 0, function(e3) {
        e3.MESSAGE_SENDING = "IM_INTERNAL_MESSAGE_SENDING", e3.MESSAGE_SEND_SUCCESS = "IM_INTERNAL_MESSAGE_SEND_SUCCESS", e3.MESSAGE_RECEIVED = "IM_INTERNAL_MESSAGE_RECEIVED", e3.REMOTE_MESSAGE_READ = "IM_INTERNAL_REMOTE_MESSAGE_READ", e3.REMOTE_MESSAGE_DELETED = "IM_INTERNAL_REMOTE_MESSAGE_DELETED", e3.MAX_MESSAGE_CHANGED = "IM_INTERNAL_MAX_MESSAGE_CHANGED", e3.UNREAD_MESSAGE_CHANGED = "IM_INTERNAL_UNREAD_MESSAGE_CHANGED", e3.REMOTE_MESSAGE_RECALLED = "IM_INTERNAL_REMOTE_MESSAGE_RECALLED";
      }(t2.IM_INTERNAL_EVENTS || (t2.IM_INTERNAL_EVENTS = {}));
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.AbstractMessage = void 0;
      var o2 = function() {
        function e3() {
        }
        return e3.prototype.clearUseLessAttribute = function() {
          delete this.buildOptions;
        }, e3;
      }();
      t2.AbstractMessage = o2;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true, t2.FileMessagePayload = void 0;
      var i = function(e3) {
        function t3() {
          var t4 = e3 !== null && e3.apply(this, arguments) || this;
          return t4.contentType = "", t4.name = "", t4.size = 0, t4.url = "", t4;
        }
        return r(t3, e3), t3;
      }(n(25).AbstractMessagePayload);
      t2.FileMessagePayload = i;
    }, function(e2, t2, n) {
      var o2, r = this && this.__values || function(e3) {
        var t3 = typeof Symbol == "function" && Symbol.iterator, n2 = t3 && e3[t3], o3 = 0;
        if (n2)
          return n2.call(e3);
        if (e3 && typeof e3.length == "number")
          return { next: function() {
            return e3 && o3 >= e3.length && (e3 = void 0), { value: e3 && e3[o3++], done: !e3 };
          } };
        throw new TypeError(t3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      t2.__esModule = true, t2.PlatformDetector = t2.Platform = void 0, function(e3) {
        e3.BROWSER = "BROWSER", e3.UNKNOWN = "UNKNOWN", e3.APP_IOS = "APP_IOS", e3.APP_ANDROID = "APP_ANDROID", e3.APPLET_WX = "APPLET_WX", e3.APPLET_WX_GAME = "APPLET_WX_GAME", e3.APPLET_ALIPAY = "APPLET_ALIPAY", e3.APPLET_BYTEDANCE = "APPLET_BYTEDANCE";
      }(o2 = t2.Platform || (t2.Platform = {}));
      var i = function() {
        function e3() {
          var e4, t3, n2;
          this.platform = null, this.methods = ((e4 = {})[o2.BROWSER] = this.isBrowser, e4[o2.APP_IOS] = this.isAppiOS, e4[o2.APP_ANDROID] = this.isAppAndroid, e4[o2.APPLET_WX] = this.isWXApplet, e4[o2.APPLET_WX_GAME] = this.isWXGameApplet, e4);
          var i2 = this.methods, s = Object.keys(i2);
          try {
            for (var a = r(s), u = a.next(); !u.done; u = a.next()) {
              var c = u.value;
              if ((0, i2[c])()) {
                this.platform = c;
                break;
              }
            }
          } catch (l) {
            t3 = { error: l };
          } finally {
            try {
              u && !u.done && (n2 = a["return"]) && n2.call(a);
            } finally {
              if (t3)
                throw t3.error;
            }
          }
          this.platform = this.platform || o2.UNKNOWN, this.platform;
        }
        return e3.currentPlatform = function() {
          return e3.instance.platform;
        }, e3.prototype.isBrowser = function() {
          return typeof navigator != "undefined" && typeof document != "undefined" && !!document.getElementById && typeof GameGlobal == "undefined";
        }, e3.prototype.isAppiOS = function() {
          return typeof index == "object" && !!index.getSystemInfoSync && index.getSystemInfoSync().platform === "ios" && typeof plus == "object";
        }, e3.prototype.isAppAndroid = function() {
          return typeof index == "object" && !!index.getSystemInfoSync && index.getSystemInfoSync().platform === "android" && typeof plus == "object";
        }, e3.prototype.isWXApplet = function() {
          return typeof wx == "object" && !!wx.getSystemInfoSync && typeof WebSocket == "undefined" && typeof XMLHttpRequest == "undefined" && typeof plus == "undefined";
        }, e3.prototype.isWXGameApplet = function() {
          return typeof GameGlobal == "object";
        }, e3.prototype.isAlipayApplet = function() {
          return false;
        }, e3.prototype.isBytedanceApplet = function() {
          return false;
        }, e3.prototype.isQQApplet = function() {
          return false;
        }, e3.prototype.isBaiduApplet = function() {
          return false;
        }, e3.instance = new e3(), e3;
      }();
      t2.PlatformDetector = i;
    }, function(e2, t2) {
      t2.encode = function(e3) {
        var t3 = "";
        for (var n in e3)
          e3.hasOwnProperty(n) && (t3.length && (t3 += "&"), t3 += encodeURIComponent(n) + "=" + encodeURIComponent(e3[n]));
        return t3;
      }, t2.decode = function(e3) {
        for (var t3 = {}, n = e3.split("&"), o2 = 0, r = n.length; o2 < r; o2++) {
          var i = n[o2].split("=");
          t3[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
        }
        return t3;
      };
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.AbstractMessagePayload = void 0;
      var o2 = function() {
        return function() {
        };
      }();
      t2.AbstractMessagePayload = o2;
    }, function(e2, t2, n) {
      n(9)("socket.io-parser");
      var o2 = n(13), r = n(42);
      function i() {
      }
      t2.protocol = 4, t2.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], t2.CONNECT = 0, t2.DISCONNECT = 1, t2.EVENT = 2, t2.ACK = 3, t2.ERROR = 4, t2.BINARY_EVENT = 5, t2.BINARY_ACK = 6, t2.Encoder = i, t2.Decoder = a;
      var s = t2.ERROR + '"encode error"';
      function a() {
        this.reconstructor = null;
      }
      function c(e3) {
        return { type: t2.ERROR, data: "parser error: " + e3 };
      }
      i.prototype.encode = function(e3, n2) {
        n2([function(e4) {
          var n3 = "" + e4.type;
          t2.BINARY_EVENT !== e4.type && t2.BINARY_ACK !== e4.type || (n3 += e4.attachments + "-");
          e4.nsp && e4.nsp !== "/" && (n3 += e4.nsp + ",");
          e4.id != null && (n3 += e4.id);
          if (e4.data != null) {
            var o3 = function(e5) {
              try {
                return JSON.stringify(e5);
              } catch (t3) {
                return false;
              }
            }(e4.data);
            if (o3 === false)
              return s;
            n3 += o3;
          }
          return n3;
        }(e3)]);
      }, o2(a.prototype), a.prototype.add = function(e3) {
        var n2;
        if (typeof e3 != "string")
          throw new Error("Unknown type: " + e3);
        n2 = function(e4) {
          var n3 = 0, o3 = { type: Number(e4.charAt(0)) };
          if (t2.types[o3.type] == null)
            return c("unknown packet type " + o3.type);
          if (t2.BINARY_EVENT === o3.type || t2.BINARY_ACK === o3.type) {
            for (var i2 = ""; e4.charAt(++n3) !== "-" && (i2 += e4.charAt(n3), n3 != e4.length); )
              ;
            if (i2 != Number(i2) || e4.charAt(n3) !== "-")
              throw new Error("Illegal attachments");
            o3.attachments = Number(i2);
          }
          if (e4.charAt(n3 + 1) === "/")
            for (o3.nsp = ""; ++n3; ) {
              var s2 = e4.charAt(n3);
              if (s2 === ",")
                break;
              if (o3.nsp += s2, n3 === e4.length)
                break;
            }
          else
            o3.nsp = "/";
          var a2 = e4.charAt(n3 + 1);
          if (a2 !== "" && Number(a2) == a2) {
            for (o3.id = ""; ++n3; ) {
              var s2 = e4.charAt(n3);
              if (s2 == null || Number(s2) != s2) {
                --n3;
                break;
              }
              if (o3.id += e4.charAt(n3), n3 === e4.length)
                break;
            }
            o3.id = Number(o3.id);
          }
          if (e4.charAt(++n3)) {
            var u = function(e5) {
              try {
                return JSON.parse(e5);
              } catch (t3) {
                return false;
              }
            }(e4.substr(n3)), l = u !== false && (o3.type === t2.ERROR || r(u));
            if (!l)
              return c("invalid payload");
            o3.data = u;
          }
          return o3;
        }(e3), this.emit("decoded", n2);
      }, a.prototype.destroy = function() {
        this.reconstructor && this.reconstructor.finishedReconstruction();
      };
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.uniApp = void 0;
      var o2 = n(18), r = new (function() {
        function e3() {
          this.uniAppRunningBackend = false, this.listenAppRunning();
        }
        return e3.prototype.listenAppRunning = function() {
          var e4 = this;
          o2.FrameworkDetector.currentFramework() === o2.Framework.UNIAPP && typeof plus == "object" && (plus.globalEvent.addEventListener("resume", function() {
            e4.uniAppRunningBackend = false, e4.uniAppRunningBackend;
          }, false), plus.globalEvent.addEventListener("pause", function() {
            e4.uniAppRunningBackend = true, e4.uniAppRunningBackend;
          }, false));
        }, e3.prototype.runningBackend = function() {
          return this.uniAppRunningBackend;
        }, e3;
      }())();
      t2.uniApp = r;
    }, function(e2, t2) {
      var n;
      n = function() {
        return this;
      }();
      try {
        n = n || new Function("return this")();
      } catch (o2) {
        typeof window == "object" && (n = window);
      }
      e2.exports = n;
    }, function(e2, t2, n) {
      var o2 = n(14), r = n(13);
      function i(e3) {
        this.path = e3.path, this.hostname = e3.hostname, this.port = e3.port, this.secure = e3.secure, this.query = e3.query, this.timestampParam = e3.timestampParam, this.timestampRequests = e3.timestampRequests, this.readyState = "", this.agent = e3.agent || false, this.socket = e3.socket, this.enablesXDR = e3.enablesXDR, this.pfx = e3.pfx, this.key = e3.key, this.passphrase = e3.passphrase, this.cert = e3.cert, this.ca = e3.ca, this.ciphers = e3.ciphers, this.rejectUnauthorized = e3.rejectUnauthorized, this.forceNode = e3.forceNode, this.isReactNative = e3.isReactNative, this.extraHeaders = e3.extraHeaders, this.localAddress = e3.localAddress;
      }
      e2.exports = i, r(i.prototype), i.prototype.onError = function(e3, t3) {
        var n2 = new Error(e3);
        return n2.type = "TransportError", n2.description = t3, this.emit("error", n2), this;
      }, i.prototype.open = function() {
        return this.readyState !== "closed" && this.readyState !== "" || (this.readyState = "opening", this.doOpen()), this;
      }, i.prototype.close = function() {
        return this.readyState !== "opening" && this.readyState !== "open" || (this.doClose(), this.onClose()), this;
      }, i.prototype.send = function(e3) {
        if (this.readyState !== "open")
          throw new Error("Transport not open");
        this.write(e3);
      }, i.prototype.onOpen = function() {
        this.readyState = "open", this.writable = true, this.emit("open");
      }, i.prototype.onData = function(e3) {
        var t3 = o2.decodePacket(e3, this.socket.binaryType);
        this.onPacket(t3);
      }, i.prototype.onPacket = function(e3) {
        this.emit("packet", e3);
      }, i.prototype.onClose = function() {
        this.readyState = "closed", this.emit("close");
      };
    }, function(e2, t2) {
      e2.exports = function(e3, t3) {
        var n = function() {
        };
        n.prototype = t3.prototype, e3.prototype = new n(), e3.prototype.constructor = e3;
      };
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
        return typeof e3;
      } : function(e3) {
        return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
      }, r = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }();
      var i = new (function() {
        function e3() {
          !function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3);
        }
        return r(e3, [{ key: "isUndef", value: function(e4) {
          return e4 === void 0 || e4 === null;
        } }, { key: "isTrue", value: function(e4) {
          return e4 === true;
        } }, { key: "isFalse", value: function(e4) {
          return e4 === false;
        } }, { key: "isPrimitive", value: function(e4) {
          return typeof e4 == "string" || typeof e4 == "number" || (e4 === void 0 ? "undefined" : o2(e4)) === "symbol" || typeof e4 == "boolean";
        } }, { key: "isDef", value: function(e4) {
          return e4 !== void 0 && e4 !== null;
        } }, { key: "isObject", value: function(e4) {
          return e4 !== null && (e4 === void 0 ? "undefined" : o2(e4)) === "object";
        } }, { key: "isPlainObject", value: function(e4) {
          return Object.prototype.toString.call(e4) === "[object Object]";
        } }, { key: "isRegExp", value: function(e4) {
          return Object.prototype.toString.call(e4) === "[object RegExp]";
        } }, { key: "isValidArrayIndex", value: function(e4) {
          var t3 = parseFloat(String(e4));
          return t3 >= 0 && Math.floor(t3) === t3 && isFinite(e4);
        } }, { key: "isStringOrNumber", value: function(e4) {
          return typeof e4 == "string" || typeof e4 == "number";
        } }, { key: "isString", value: function(e4) {
          return typeof e4 == "string";
        } }, { key: "isNumber", value: function(e4) {
          return typeof e4 == "number";
        } }, { key: "isArray", value: function(e4) {
          return Object.prototype.toString.call(e4) === "[object Array]";
        } }, { key: "isEmpty", value: function(e4) {
          return this.isArray(e4) ? e4.length == 0 : this.isObject(e4) ? !this.isDef(e4) : !this.isNumber(e4) && (this.isString(e4) ? e4.trim() == "" : !this.isDef(e4));
        } }, { key: "isNative", value: function(e4) {
          return typeof e4 == "function" && /native code/.test(e4.toString());
        } }, { key: "isFunction", value: function(e4) {
          return typeof e4 == "function";
        } }, { key: "isBoolean", value: function(e4) {
          return typeof e4 == "boolean";
        } }]), e3;
      }())();
      t2.calibrator = i;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }();
      var r = function() {
        function e3() {
          !function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3);
        }
        return o2(e3, [{ key: "upload", value: function(e4) {
          throw Error("Not implementation yet.");
        } }]), e3;
      }();
      t2["default"] = r;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.RemoteAbbrMessageBuilder = void 0;
      var o2 = n(2), r = n(58), i = n(59), s = function() {
        function e3() {
        }
        return e3.prototype.build = function(e4) {
          var t3;
          return e4.t === o2.Scene.PRIVATE ? ((t3 = new r.PrivateMessage()).read = false, t3.receiverId = e4.r) : e4.t === o2.Scene.GROUP && ((t3 = new i.GroupMessage()).groupId = e4.r, t3.senderData = e4.d ? JSON.parse(e4.d) : {}), t3.senderId = e4.s, t3.messageId = e4.i, t3.timestamp = e4.ts, t3.type = e4.mt, t3.payload = JSON.parse(e4.p), t3.recalled = e4.rc, t3.status = o2.MessageStatus.SUCCESS, t3;
        }, e3;
      }();
      t2.RemoteAbbrMessageBuilder = s;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true, t2.ImageMessagePayload = void 0;
      var i = function(e3) {
        function t3() {
          var t4 = e3 !== null && e3.apply(this, arguments) || this;
          return t4.width = 0, t4.height = 0, t4;
        }
        return r(t3, e3), t3;
      }(n(22).FileMessagePayload);
      t2.ImageMessagePayload = i;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = n(11), s = n(22), a = n(0), u = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new s.FileMessagePayload();
        }, t3.prototype.setPayload = function(e4, t4) {
          var n2 = t4, o3 = e4.createOptions.file;
          n2.url = o3.path, n2.name = o3.name, n2.size = o3.size, n2.contentType = o3.type, e4.complete = Promise.resolve();
        }, t3.prototype.validate = function(e4) {
          if (!a.calibrator.isObject(e4))
            throw Error("it is an empty message.");
          if (!a.calibrator.isDef(e4.file))
            throw Error("file is empty.");
        }, t3;
      }(i.AbstractPayloadBuilder);
      t2["default"] = u;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true, t2.AudioMessagePayload = void 0;
      var i = function(e3) {
        function t3() {
          var t4 = e3 !== null && e3.apply(this, arguments) || this;
          return t4.duration = 0, t4;
        }
        return r(t3, e3), t3;
      }(n(22).FileMessagePayload);
      t2.AudioMessagePayload = i;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true, t2.VideoMessagePayload = void 0;
      var i = function(e3) {
        function t3() {
          var t4 = e3 !== null && e3.apply(this, arguments) || this;
          return t4.video = new a(), t4.thumbnail = new s(), t4;
        }
        return r(t3, e3), t3;
      }(n(25).AbstractMessagePayload);
      t2.VideoMessagePayload = i;
      var s = function() {
        return function() {
          this.name = "", this.url = "", this.width = 0, this.height = 0, this.contentType = "";
        };
      }(), a = function() {
        return function() {
          this.name = "", this.url = "", this.width = 0, this.height = 0, this.contentType = "", this.size = 0, this.duration = 0;
        };
      }();
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = n(11), s = n(22), a = n(0), u = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new s.FileMessagePayload();
        }, t3.prototype.setPayload = function(e4, t4) {
          var n2 = t4, o3 = e4.createOptions.file;
          n2.url = o3.fullPath, n2.name = o3.name, n2.size = o3.size, n2.contentType = o3.type, o3.type, e4.complete = Promise.resolve();
        }, t3.prototype.validate = function(e4) {
          if (!a.calibrator.isObject(e4))
            throw Error("it is an empty message.");
          if (!a.calibrator.isDef(e4.file))
            throw Error("file is empty.");
        }, t3;
      }(i.AbstractPayloadBuilder);
      t2["default"] = u;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = n(11), s = n(22), a = n(7), u = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new s.FileMessagePayload();
        }, t3.prototype.setPayload = function(e4, t4) {
          var n2 = t4, o3 = e4.createOptions.file, r2 = window.URL || window.webkitURL;
          n2.url = r2.createObjectURL(o3), n2.name = o3.name, n2.size = o3.size, n2.contentType = o3.type;
        }, t3.prototype.validate = function(e4) {
          if (!a.calibrator.isObject(e4))
            throw Error("it is an empty message.");
          if (!(e4.file instanceof File))
            throw Error("wrong file type.");
          if (e4.file.size == 0)
            throw Error("File size is 0.");
          if (e4.file.size > 31457280)
            throw Error("message-length limit 30mib");
        }, t3;
      }(i.AbstractPayloadBuilder);
      t2["default"] = u;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = c(n(12)), i = c(n(1)), s = c(n(67)), a = c(n(68)), u = n(0);
      function c(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var l = function() {
        function e3() {
          !function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.io = a["default"], this.status = r["default"].DISCONNECTED, this.permissions = [i["default"].NONE], this.emitter = null, this.connectedObservers = [], this.disconnectedObservers = [], this.emitter = new s["default"](this);
        }
        return o2(e3, [{ key: "connect", value: function() {
          this.status = r["default"].CONNECTING;
        } }, { key: "emit", value: function(e4) {
          this.emitter.emit(e4);
        } }, { key: "doEmit", value: function(e4, t3, n2) {
        } }, { key: "on", value: function(e4, t3) {
          this.io.on(e4, t3);
        } }, { key: "disconnect", value: function() {
          this.io.disconnect();
        } }, { key: "getStatus", value: function() {
          return this.status;
        } }, { key: "addConnectedObserver", value: function(e4) {
          u.calibrator.isFunction(e4) && this.connectedObservers.push(e4);
        } }, { key: "addDisconnectedObserver", value: function(e4) {
          u.calibrator.isFunction(e4) && this.disconnectedObservers.push(e4);
        } }, { key: "notify", value: function(e4, t3) {
          for (var n2 = 0; n2 < e4.length; n2++)
            e4[n2](t3);
        } }]), e3;
      }();
      t2["default"] = l;
    }, function(e2, t2) {
      var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, o2 = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
      e2.exports = function(e3) {
        var t3 = e3, r = e3.indexOf("["), i = e3.indexOf("]");
        r != -1 && i != -1 && (e3 = e3.substring(0, r) + e3.substring(r, i).replace(/:/g, ";") + e3.substring(i, e3.length));
        for (var s = n.exec(e3 || ""), a = {}, u = 14; u--; )
          a[o2[u]] = s[u] || "";
        return r != -1 && i != -1 && (a.source = t3, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = true), a;
      };
    }, function(e2, t2) {
      var n = {}.toString;
      e2.exports = Array.isArray || function(e3) {
        return n.call(e3) == "[object Array]";
      };
    }, function(e2, t2, n) {
      var o2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
        return typeof e3;
      } : function(e3) {
        return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
      }, r = n(27), i = n(70), s = n(49), a = n(13), u = n(26), c = n(50), l = n(51), f2 = (n(9)("socket.io-client:manager"), n(48)), p2 = n(86), h = n(52).GoEasyDomainNumber, d = Object.prototype.hasOwnProperty;
      function y(e3, t3) {
        if (!(this instanceof y))
          return new y(e3, t3);
        e3 && (e3 === void 0 ? "undefined" : o2(e3)) === "object" && (t3 = e3, e3 = void 0), (t3 = t3 || {}).path = t3.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = t3, this.reconnection(t3.reconnection !== false), this.reconnectionAttempts(t3.reconnectionAttempts || Infinity), this.reconnectionDelay(t3.reconnectionDelay || 1e3), this.reconnectionDelayMax(t3.reconnectionDelayMax || 5e3), this.randomizationFactor(t3.randomizationFactor || 0.5), this.backoff = new p2({ min: this.reconnectionDelay(), max: this.reconnectionDelayMax(), jitter: this.randomizationFactor() }), this.timeout(t3.timeout == null ? 2e4 : t3.timeout), this.readyState = "closed", this.uri = e3, this.connecting = [], this.lastPing = null, this.encoding = false, this.packetBuffer = [];
        var n2 = t3.parser || u;
        this.encoder = new n2.Encoder(), this.decoder = new n2.Decoder(), this.autoConnect = t3.autoConnect !== false, this.autoConnect && this.open();
      }
      function m() {
        var e3 = false;
        return (typeof index == "undefined" ? "undefined" : o2(index)) === "object" && index.getSystemInfo && (e3 = true), e3 && r.uniApp.runningBackend();
      }
      e2.exports = y, y.prototype.emitAll = function() {
        for (var e3 in this.emit.apply(this, arguments), this.nsps)
          d.call(this.nsps, e3) && this.nsps[e3].emit.apply(this.nsps[e3], arguments);
      }, y.prototype.updateSocketIds = function() {
        for (var e3 in this.nsps)
          d.call(this.nsps, e3) && (this.nsps[e3].id = this.generateId(e3));
      }, y.prototype.generateId = function(e3) {
        return (e3 === "/" ? "" : e3 + "#") + this.engine.id;
      }, a(y.prototype), y.prototype.reconnection = function(e3) {
        return arguments.length ? (this._reconnection = !!e3, this) : this._reconnection;
      }, y.prototype.reconnectionAttempts = function(e3) {
        return arguments.length ? (this._reconnectionAttempts = e3, this) : this._reconnectionAttempts;
      }, y.prototype.reconnectionDelay = function(e3) {
        return arguments.length ? (this._reconnectionDelay = e3, this.backoff && this.backoff.setMin(e3), this) : this._reconnectionDelay;
      }, y.prototype.randomizationFactor = function(e3) {
        return arguments.length ? (this._randomizationFactor = e3, this.backoff && this.backoff.setJitter(e3), this) : this._randomizationFactor;
      }, y.prototype.reconnectionDelayMax = function(e3) {
        return arguments.length ? (this._reconnectionDelayMax = e3, this.backoff && this.backoff.setMax(e3), this) : this._reconnectionDelayMax;
      }, y.prototype.timeout = function(e3) {
        return arguments.length ? (this._timeout = e3, this) : this._timeout;
      }, y.prototype.maybeReconnectOnOpen = function() {
        !this.reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect();
      }, y.prototype.open = y.prototype.connect = function(e3, t3) {
        if (this.readyState, ~this.readyState.indexOf("open"))
          return this;
        this.uri, this.engine = i(this.uri, this.opts);
        var n2 = this.engine, o3 = this;
        this.readyState = "opening", this.skipReconnect = false;
        var r2 = c(n2, "open", function() {
          o3.onopen(), e3 && e3();
        }), s2 = c(n2, "error", function(t4) {
          if (typeof window != "undefined") {
            var n3 = parseInt(o3.uri.match(/[1-9][0-9]*/g)[0]), r3 = h.refreshNumber();
            o3.uri = o3.uri.replace(n3, r3);
          }
          if (o3.cleanup(), o3.readyState = "closed", o3.emitAll("connect_error", t4), e3) {
            var i2 = new Error("Connection error");
            i2.data = t4, e3(i2);
          } else
            o3.maybeReconnectOnOpen();
        });
        if (this._timeout !== false) {
          var a2 = this._timeout, u2 = setTimeout(function() {
            r2.destroy(), n2.close(), n2.emit("error", "timeout"), o3.emitAll("connect_timeout", a2);
          }, a2);
          this.subs.push({ destroy: function() {
            clearTimeout(u2);
          } });
        }
        return this.subs.push(r2), this.subs.push(s2), this;
      }, y.prototype.onopen = function() {
        this.cleanup(), this.readyState = "open", this.emit("open");
        var e3 = this.engine;
        this.subs.push(c(e3, "data", l(this, "ondata"))), this.subs.push(c(e3, "ping", l(this, "onping"))), this.subs.push(c(e3, "pong", l(this, "onpong"))), this.subs.push(c(e3, "error", l(this, "onerror"))), this.subs.push(c(e3, "close", l(this, "onclose"))), this.subs.push(c(this.decoder, "decoded", l(this, "ondecoded")));
      }, y.prototype.onping = function() {
        this.lastPing = new Date(), this.emitAll("ping");
      }, y.prototype.onpong = function() {
        this.emitAll("pong", new Date() - this.lastPing);
      }, y.prototype.ondata = function(e3) {
        this.decoder.add(e3);
      }, y.prototype.ondecoded = function(e3) {
        this.emit("packet", e3);
      }, y.prototype.onerror = function(e3) {
        this.emitAll("error", e3);
      }, y.prototype.socket = function(e3, t3) {
        var n2 = this.nsps[e3];
        if (!n2) {
          n2 = new s(this, e3, t3), this.nsps[e3] = n2;
          var o3 = this;
          n2.on("connecting", r2), n2.on("connect", function() {
            n2.id = o3.generateId(e3);
          }), this.autoConnect && r2();
        }
        function r2() {
          ~f2(o3.connecting, n2) || o3.connecting.push(n2);
        }
        return n2;
      }, y.prototype.destroy = function(e3) {
        var t3 = f2(this.connecting, e3);
        ~t3 && this.connecting.splice(t3, 1), this.connecting.length || this.close();
      }, y.prototype.packet = function(e3) {
        var t3 = this;
        e3.query && e3.type === 0 && (e3.nsp += "?" + e3.query), t3.encoding ? t3.packetBuffer.push(e3) : (t3.encoding = true, this.encoder.encode(e3, function(n2) {
          for (var o3 = 0; o3 < n2.length; o3++)
            t3.engine.write(n2[o3], e3.options);
          t3.encoding = false, t3.processPacketQueue();
        }));
      }, y.prototype.processPacketQueue = function() {
        if (this.packetBuffer.length > 0 && !this.encoding) {
          var e3 = this.packetBuffer.shift();
          this.packet(e3);
        }
      }, y.prototype.cleanup = function() {
        for (var e3 = this.subs.length, t3 = 0; t3 < e3; t3++) {
          this.subs.shift().destroy();
        }
        this.packetBuffer = [], this.encoding = false, this.lastPing = null, this.decoder.destroy();
      }, y.prototype.close = y.prototype.disconnect = function() {
        this.skipReconnect = true, this.reconnecting = false, this.readyState === "opening" && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();
      }, y.prototype.onclose = function(e3) {
        this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", e3), this._reconnection && !this.skipReconnect && this.reconnect();
      }, y.prototype.reconnect = function() {
        if (m(), this.reconnecting || this.skipReconnect)
          return this;
        var e3 = this;
        if (this.backoff.attempts >= this._reconnectionAttempts)
          this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = false;
        else {
          var t3 = this.backoff.duration();
          this.reconnecting = true;
          var n2 = setTimeout(function() {
            e3.skipReconnect || (e3.emitAll("reconnect_attempt", e3.backoff.attempts), e3.emitAll("reconnecting", e3.backoff.attempts), e3.skipReconnect || (m() ? (e3.reconnecting = false, e3.reconnect(), e3.emitAll("reconnect_error", "Uniapp running backend, skipped reconnect...")) : e3.open(function(t4) {
              t4 ? (e3.reconnecting = false, e3.reconnect(), e3.emitAll("reconnect_error", t4.data)) : e3.onreconnect();
            })));
          }, t3);
          this.subs.push({ destroy: function() {
            clearTimeout(n2);
          } });
        }
      }, y.prototype.onreconnect = function() {
        var e3 = this.backoff.attempts;
        this.reconnecting = false, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", e3);
      };
    }, function(e2, t2, n) {
      var o2 = n(72), r = n(83);
      t2.polling = function(e3) {
        var t3 = false, n2 = false;
        e3.jsonp;
        if (typeof location != "undefined") {
          var r2 = location.protocol === "https:", i = location.port;
          i || (i = r2 ? 443 : 80), t3 = e3.hostname !== location.hostname || i !== e3.port, n2 = e3.secure !== r2;
        }
        return e3.xdomain = t3, e3.xscheme = n2, new o2(e3);
      }, t2.websocket = r;
    }, function(e2, t2, n) {
      (function(t3) {
        var o2 = n(42), r = Object.prototype.toString, i = typeof Blob == "function" || typeof Blob != "undefined" && r.call(Blob) === "[object BlobConstructor]", s = typeof File == "function" || typeof File != "undefined" && r.call(File) === "[object FileConstructor]";
        e2.exports = function a(e3) {
          if (!e3 || typeof e3 != "object")
            return false;
          if (o2(e3)) {
            for (var n2 = 0, r2 = e3.length; n2 < r2; n2++)
              if (a(e3[n2]))
                return true;
            return false;
          }
          if (typeof t3 == "function" && t3.isBuffer && t3.isBuffer(e3) || typeof ArrayBuffer == "function" && e3 instanceof ArrayBuffer || i && e3 instanceof Blob || s && e3 instanceof File)
            return true;
          if (e3.toJSON && typeof e3.toJSON == "function" && arguments.length === 1)
            return a(e3.toJSON(), true);
          for (var u in e3)
            if (Object.prototype.hasOwnProperty.call(e3, u) && a(e3[u]))
              return true;
          return false;
        };
      }).call(this, n(46).Buffer);
    }, function(e2, t2, n) {
      (function(e3) {
        var o2 = n(75), r = n(76), i = n(77);
        function s() {
          return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function a(e4, t3) {
          if (s() < t3)
            throw new RangeError("Invalid typed array length");
          return u.TYPED_ARRAY_SUPPORT ? (e4 = new Uint8Array(t3)).__proto__ = u.prototype : (e4 === null && (e4 = new u(t3)), e4.length = t3), e4;
        }
        function u(e4, t3, n2) {
          if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u))
            return new u(e4, t3, n2);
          if (typeof e4 == "number") {
            if (typeof t3 == "string")
              throw new Error("If encoding is specified then the first argument must be a string");
            return f2(this, e4);
          }
          return c(this, e4, t3, n2);
        }
        function c(e4, t3, n2, o3) {
          if (typeof t3 == "number")
            throw new TypeError('"value" argument must not be a number');
          return typeof ArrayBuffer != "undefined" && t3 instanceof ArrayBuffer ? function(e5, t4, n3, o4) {
            if (t4.byteLength, n3 < 0 || t4.byteLength < n3)
              throw new RangeError("'offset' is out of bounds");
            if (t4.byteLength < n3 + (o4 || 0))
              throw new RangeError("'length' is out of bounds");
            t4 = n3 === void 0 && o4 === void 0 ? new Uint8Array(t4) : o4 === void 0 ? new Uint8Array(t4, n3) : new Uint8Array(t4, n3, o4);
            u.TYPED_ARRAY_SUPPORT ? (e5 = t4).__proto__ = u.prototype : e5 = p2(e5, t4);
            return e5;
          }(e4, t3, n2, o3) : typeof t3 == "string" ? function(e5, t4, n3) {
            typeof n3 == "string" && n3 !== "" || (n3 = "utf8");
            if (!u.isEncoding(n3))
              throw new TypeError('"encoding" must be a valid string encoding');
            var o4 = 0 | d(t4, n3), r2 = (e5 = a(e5, o4)).write(t4, n3);
            r2 !== o4 && (e5 = e5.slice(0, r2));
            return e5;
          }(e4, t3, n2) : function(e5, t4) {
            if (u.isBuffer(t4)) {
              var n3 = 0 | h(t4.length);
              return (e5 = a(e5, n3)).length === 0 ? e5 : (t4.copy(e5, 0, 0, n3), e5);
            }
            if (t4) {
              if (typeof ArrayBuffer != "undefined" && t4.buffer instanceof ArrayBuffer || "length" in t4)
                return typeof t4.length != "number" || (o4 = t4.length) != o4 ? a(e5, 0) : p2(e5, t4);
              if (t4.type === "Buffer" && i(t4.data))
                return p2(e5, t4.data);
            }
            var o4;
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
          }(e4, t3);
        }
        function l(e4) {
          if (typeof e4 != "number")
            throw new TypeError('"size" argument must be a number');
          if (e4 < 0)
            throw new RangeError('"size" argument must not be negative');
        }
        function f2(e4, t3) {
          if (l(t3), e4 = a(e4, t3 < 0 ? 0 : 0 | h(t3)), !u.TYPED_ARRAY_SUPPORT)
            for (var n2 = 0; n2 < t3; ++n2)
              e4[n2] = 0;
          return e4;
        }
        function p2(e4, t3) {
          var n2 = t3.length < 0 ? 0 : 0 | h(t3.length);
          e4 = a(e4, n2);
          for (var o3 = 0; o3 < n2; o3 += 1)
            e4[o3] = 255 & t3[o3];
          return e4;
        }
        function h(e4) {
          if (e4 >= s())
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
          return 0 | e4;
        }
        function d(e4, t3) {
          if (u.isBuffer(e4))
            return e4.length;
          if (typeof ArrayBuffer != "undefined" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(e4) || e4 instanceof ArrayBuffer))
            return e4.byteLength;
          typeof e4 != "string" && (e4 = "" + e4);
          var n2 = e4.length;
          if (n2 === 0)
            return 0;
          for (var o3 = false; ; )
            switch (t3) {
              case "ascii":
              case "latin1":
              case "binary":
                return n2;
              case "utf8":
              case "utf-8":
              case void 0:
                return G(e4).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * n2;
              case "hex":
                return n2 >>> 1;
              case "base64":
                return L(e4).length;
              default:
                if (o3)
                  return G(e4).length;
                t3 = ("" + t3).toLowerCase(), o3 = true;
            }
        }
        function y(e4, t3, n2) {
          var o3 = e4[t3];
          e4[t3] = e4[n2], e4[n2] = o3;
        }
        function m(e4, t3, n2, o3, r2) {
          if (e4.length === 0)
            return -1;
          if (typeof n2 == "string" ? (o3 = n2, n2 = 0) : n2 > 2147483647 ? n2 = 2147483647 : n2 < -2147483648 && (n2 = -2147483648), n2 = +n2, isNaN(n2) && (n2 = r2 ? 0 : e4.length - 1), n2 < 0 && (n2 = e4.length + n2), n2 >= e4.length) {
            if (r2)
              return -1;
            n2 = e4.length - 1;
          } else if (n2 < 0) {
            if (!r2)
              return -1;
            n2 = 0;
          }
          if (typeof t3 == "string" && (t3 = u.from(t3, o3)), u.isBuffer(t3))
            return t3.length === 0 ? -1 : v(e4, t3, n2, o3, r2);
          if (typeof t3 == "number")
            return t3 &= 255, u.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? r2 ? Uint8Array.prototype.indexOf.call(e4, t3, n2) : Uint8Array.prototype.lastIndexOf.call(e4, t3, n2) : v(e4, [t3], n2, o3, r2);
          throw new TypeError("val must be string, number or Buffer");
        }
        function v(e4, t3, n2, o3, r2) {
          var i2, s2 = 1, a2 = e4.length, u2 = t3.length;
          if (o3 !== void 0 && ((o3 = String(o3).toLowerCase()) === "ucs2" || o3 === "ucs-2" || o3 === "utf16le" || o3 === "utf-16le")) {
            if (e4.length < 2 || t3.length < 2)
              return -1;
            s2 = 2, a2 /= 2, u2 /= 2, n2 /= 2;
          }
          function c2(e5, t4) {
            return s2 === 1 ? e5[t4] : e5.readUInt16BE(t4 * s2);
          }
          if (r2) {
            var l2 = -1;
            for (i2 = n2; i2 < a2; i2++)
              if (c2(e4, i2) === c2(t3, l2 === -1 ? 0 : i2 - l2)) {
                if (l2 === -1 && (l2 = i2), i2 - l2 + 1 === u2)
                  return l2 * s2;
              } else
                l2 !== -1 && (i2 -= i2 - l2), l2 = -1;
          } else
            for (n2 + u2 > a2 && (n2 = a2 - u2), i2 = n2; i2 >= 0; i2--) {
              for (var f3 = true, p3 = 0; p3 < u2; p3++)
                if (c2(e4, i2 + p3) !== c2(t3, p3)) {
                  f3 = false;
                  break;
                }
              if (f3)
                return i2;
            }
          return -1;
        }
        function g(e4, t3, n2, o3) {
          n2 = Number(n2) || 0;
          var r2 = e4.length - n2;
          o3 ? (o3 = Number(o3)) > r2 && (o3 = r2) : o3 = r2;
          var i2 = t3.length;
          if (i2 % 2 != 0)
            throw new TypeError("Invalid hex string");
          o3 > i2 / 2 && (o3 = i2 / 2);
          for (var s2 = 0; s2 < o3; ++s2) {
            var a2 = parseInt(t3.substr(2 * s2, 2), 16);
            if (isNaN(a2))
              return s2;
            e4[n2 + s2] = a2;
          }
          return s2;
        }
        function b(e4, t3, n2, o3) {
          return q(G(t3, e4.length - n2), e4, n2, o3);
        }
        function E2(e4, t3, n2, o3) {
          return q(function(e5) {
            for (var t4 = [], n3 = 0; n3 < e5.length; ++n3)
              t4.push(255 & e5.charCodeAt(n3));
            return t4;
          }(t3), e4, n2, o3);
        }
        function _(e4, t3, n2, o3) {
          return E2(e4, t3, n2, o3);
        }
        function S(e4, t3, n2, o3) {
          return q(L(t3), e4, n2, o3);
        }
        function w(e4, t3, n2, o3) {
          return q(function(e5, t4) {
            for (var n3, o4, r2, i2 = [], s2 = 0; s2 < e5.length && !((t4 -= 2) < 0); ++s2)
              n3 = e5.charCodeAt(s2), o4 = n3 >> 8, r2 = n3 % 256, i2.push(r2), i2.push(o4);
            return i2;
          }(t3, e4.length - n2), e4, n2, o3);
        }
        function O(e4, t3, n2) {
          return t3 === 0 && n2 === e4.length ? o2.fromByteArray(e4) : o2.fromByteArray(e4.slice(t3, n2));
        }
        function M(e4, t3, n2) {
          n2 = Math.min(e4.length, n2);
          for (var o3 = [], r2 = t3; r2 < n2; ) {
            var i2, s2, a2, u2, c2 = e4[r2], l2 = null, f3 = c2 > 239 ? 4 : c2 > 223 ? 3 : c2 > 191 ? 2 : 1;
            if (r2 + f3 <= n2)
              switch (f3) {
                case 1:
                  c2 < 128 && (l2 = c2);
                  break;
                case 2:
                  (192 & (i2 = e4[r2 + 1])) == 128 && (u2 = (31 & c2) << 6 | 63 & i2) > 127 && (l2 = u2);
                  break;
                case 3:
                  i2 = e4[r2 + 1], s2 = e4[r2 + 2], (192 & i2) == 128 && (192 & s2) == 128 && (u2 = (15 & c2) << 12 | (63 & i2) << 6 | 63 & s2) > 2047 && (u2 < 55296 || u2 > 57343) && (l2 = u2);
                  break;
                case 4:
                  i2 = e4[r2 + 1], s2 = e4[r2 + 2], a2 = e4[r2 + 3], (192 & i2) == 128 && (192 & s2) == 128 && (192 & a2) == 128 && (u2 = (15 & c2) << 18 | (63 & i2) << 12 | (63 & s2) << 6 | 63 & a2) > 65535 && u2 < 1114112 && (l2 = u2);
              }
            l2 === null ? (l2 = 65533, f3 = 1) : l2 > 65535 && (l2 -= 65536, o3.push(l2 >>> 10 & 1023 | 55296), l2 = 56320 | 1023 & l2), o3.push(l2), r2 += f3;
          }
          return function(e5) {
            var t4 = e5.length;
            if (t4 <= T)
              return String.fromCharCode.apply(String, e5);
            var n3 = "", o4 = 0;
            for (; o4 < t4; )
              n3 += String.fromCharCode.apply(String, e5.slice(o4, o4 += T));
            return n3;
          }(o3);
        }
        t2.Buffer = u, t2.SlowBuffer = function(e4) {
          +e4 != e4 && (e4 = 0);
          return u.alloc(+e4);
        }, t2.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = e3.TYPED_ARRAY_SUPPORT !== void 0 ? e3.TYPED_ARRAY_SUPPORT : function() {
          try {
            var e4 = new Uint8Array(1);
            return e4.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
              return 42;
            } }, e4.foo() === 42 && typeof e4.subarray == "function" && e4.subarray(1, 1).byteLength === 0;
          } catch (t3) {
            return false;
          }
        }(), t2.kMaxLength = s(), u.poolSize = 8192, u._augment = function(e4) {
          return e4.__proto__ = u.prototype, e4;
        }, u.from = function(e4, t3, n2) {
          return c(null, e4, t3, n2);
        }, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array, typeof Symbol != "undefined" && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, { value: null, configurable: true })), u.alloc = function(e4, t3, n2) {
          return function(e5, t4, n3, o3) {
            return l(t4), t4 <= 0 ? a(e5, t4) : n3 !== void 0 ? typeof o3 == "string" ? a(e5, t4).fill(n3, o3) : a(e5, t4).fill(n3) : a(e5, t4);
          }(null, e4, t3, n2);
        }, u.allocUnsafe = function(e4) {
          return f2(null, e4);
        }, u.allocUnsafeSlow = function(e4) {
          return f2(null, e4);
        }, u.isBuffer = function(e4) {
          return !(e4 == null || !e4._isBuffer);
        }, u.compare = function(e4, t3) {
          if (!u.isBuffer(e4) || !u.isBuffer(t3))
            throw new TypeError("Arguments must be Buffers");
          if (e4 === t3)
            return 0;
          for (var n2 = e4.length, o3 = t3.length, r2 = 0, i2 = Math.min(n2, o3); r2 < i2; ++r2)
            if (e4[r2] !== t3[r2]) {
              n2 = e4[r2], o3 = t3[r2];
              break;
            }
          return n2 < o3 ? -1 : o3 < n2 ? 1 : 0;
        }, u.isEncoding = function(e4) {
          switch (String(e4).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return true;
            default:
              return false;
          }
        }, u.concat = function(e4, t3) {
          if (!i(e4))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (e4.length === 0)
            return u.alloc(0);
          var n2;
          if (t3 === void 0)
            for (t3 = 0, n2 = 0; n2 < e4.length; ++n2)
              t3 += e4[n2].length;
          var o3 = u.allocUnsafe(t3), r2 = 0;
          for (n2 = 0; n2 < e4.length; ++n2) {
            var s2 = e4[n2];
            if (!u.isBuffer(s2))
              throw new TypeError('"list" argument must be an Array of Buffers');
            s2.copy(o3, r2), r2 += s2.length;
          }
          return o3;
        }, u.byteLength = d, u.prototype._isBuffer = true, u.prototype.swap16 = function() {
          var e4 = this.length;
          if (e4 % 2 != 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var t3 = 0; t3 < e4; t3 += 2)
            y(this, t3, t3 + 1);
          return this;
        }, u.prototype.swap32 = function() {
          var e4 = this.length;
          if (e4 % 4 != 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var t3 = 0; t3 < e4; t3 += 4)
            y(this, t3, t3 + 3), y(this, t3 + 1, t3 + 2);
          return this;
        }, u.prototype.swap64 = function() {
          var e4 = this.length;
          if (e4 % 8 != 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var t3 = 0; t3 < e4; t3 += 8)
            y(this, t3, t3 + 7), y(this, t3 + 1, t3 + 6), y(this, t3 + 2, t3 + 5), y(this, t3 + 3, t3 + 4);
          return this;
        }, u.prototype.toString = function() {
          var e4 = 0 | this.length;
          return e4 === 0 ? "" : arguments.length === 0 ? M(this, 0, e4) : function(e5, t3, n2) {
            var o3 = false;
            if ((t3 === void 0 || t3 < 0) && (t3 = 0), t3 > this.length)
              return "";
            if ((n2 === void 0 || n2 > this.length) && (n2 = this.length), n2 <= 0)
              return "";
            if ((n2 >>>= 0) <= (t3 >>>= 0))
              return "";
            for (e5 || (e5 = "utf8"); ; )
              switch (e5) {
                case "hex":
                  return P(this, t3, n2);
                case "utf8":
                case "utf-8":
                  return M(this, t3, n2);
                case "ascii":
                  return k(this, t3, n2);
                case "latin1":
                case "binary":
                  return I(this, t3, n2);
                case "base64":
                  return O(this, t3, n2);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return A(this, t3, n2);
                default:
                  if (o3)
                    throw new TypeError("Unknown encoding: " + e5);
                  e5 = (e5 + "").toLowerCase(), o3 = true;
              }
          }.apply(this, arguments);
        }, u.prototype.equals = function(e4) {
          if (!u.isBuffer(e4))
            throw new TypeError("Argument must be a Buffer");
          return this === e4 || u.compare(this, e4) === 0;
        }, u.prototype.inspect = function() {
          var e4 = "", n2 = t2.INSPECT_MAX_BYTES;
          return this.length > 0 && (e4 = this.toString("hex", 0, n2).match(/.{2}/g).join(" "), this.length > n2 && (e4 += " ... ")), "<Buffer " + e4 + ">";
        }, u.prototype.compare = function(e4, t3, n2, o3, r2) {
          if (!u.isBuffer(e4))
            throw new TypeError("Argument must be a Buffer");
          if (t3 === void 0 && (t3 = 0), n2 === void 0 && (n2 = e4 ? e4.length : 0), o3 === void 0 && (o3 = 0), r2 === void 0 && (r2 = this.length), t3 < 0 || n2 > e4.length || o3 < 0 || r2 > this.length)
            throw new RangeError("out of range index");
          if (o3 >= r2 && t3 >= n2)
            return 0;
          if (o3 >= r2)
            return -1;
          if (t3 >= n2)
            return 1;
          if (t3 >>>= 0, n2 >>>= 0, o3 >>>= 0, r2 >>>= 0, this === e4)
            return 0;
          for (var i2 = r2 - o3, s2 = n2 - t3, a2 = Math.min(i2, s2), c2 = this.slice(o3, r2), l2 = e4.slice(t3, n2), f3 = 0; f3 < a2; ++f3)
            if (c2[f3] !== l2[f3]) {
              i2 = c2[f3], s2 = l2[f3];
              break;
            }
          return i2 < s2 ? -1 : s2 < i2 ? 1 : 0;
        }, u.prototype.includes = function(e4, t3, n2) {
          return this.indexOf(e4, t3, n2) !== -1;
        }, u.prototype.indexOf = function(e4, t3, n2) {
          return m(this, e4, t3, n2, true);
        }, u.prototype.lastIndexOf = function(e4, t3, n2) {
          return m(this, e4, t3, n2, false);
        }, u.prototype.write = function(e4, t3, n2, o3) {
          if (t3 === void 0)
            o3 = "utf8", n2 = this.length, t3 = 0;
          else if (n2 === void 0 && typeof t3 == "string")
            o3 = t3, n2 = this.length, t3 = 0;
          else {
            if (!isFinite(t3))
              throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            t3 |= 0, isFinite(n2) ? (n2 |= 0, o3 === void 0 && (o3 = "utf8")) : (o3 = n2, n2 = void 0);
          }
          var r2 = this.length - t3;
          if ((n2 === void 0 || n2 > r2) && (n2 = r2), e4.length > 0 && (n2 < 0 || t3 < 0) || t3 > this.length)
            throw new RangeError("Attempt to write outside buffer bounds");
          o3 || (o3 = "utf8");
          for (var i2 = false; ; )
            switch (o3) {
              case "hex":
                return g(this, e4, t3, n2);
              case "utf8":
              case "utf-8":
                return b(this, e4, t3, n2);
              case "ascii":
                return E2(this, e4, t3, n2);
              case "latin1":
              case "binary":
                return _(this, e4, t3, n2);
              case "base64":
                return S(this, e4, t3, n2);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return w(this, e4, t3, n2);
              default:
                if (i2)
                  throw new TypeError("Unknown encoding: " + o3);
                o3 = ("" + o3).toLowerCase(), i2 = true;
            }
        }, u.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        };
        var T = 4096;
        function k(e4, t3, n2) {
          var o3 = "";
          n2 = Math.min(e4.length, n2);
          for (var r2 = t3; r2 < n2; ++r2)
            o3 += String.fromCharCode(127 & e4[r2]);
          return o3;
        }
        function I(e4, t3, n2) {
          var o3 = "";
          n2 = Math.min(e4.length, n2);
          for (var r2 = t3; r2 < n2; ++r2)
            o3 += String.fromCharCode(e4[r2]);
          return o3;
        }
        function P(e4, t3, n2) {
          var o3 = e4.length;
          (!t3 || t3 < 0) && (t3 = 0), (!n2 || n2 < 0 || n2 > o3) && (n2 = o3);
          for (var r2 = "", i2 = t3; i2 < n2; ++i2)
            r2 += B(e4[i2]);
          return r2;
        }
        function A(e4, t3, n2) {
          for (var o3 = e4.slice(t3, n2), r2 = "", i2 = 0; i2 < o3.length; i2 += 2)
            r2 += String.fromCharCode(o3[i2] + 256 * o3[i2 + 1]);
          return r2;
        }
        function C(e4, t3, n2) {
          if (e4 % 1 != 0 || e4 < 0)
            throw new RangeError("offset is not uint");
          if (e4 + t3 > n2)
            throw new RangeError("Trying to access beyond buffer length");
        }
        function R(e4, t3, n2, o3, r2, i2) {
          if (!u.isBuffer(e4))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (t3 > r2 || t3 < i2)
            throw new RangeError('"value" argument is out of bounds');
          if (n2 + o3 > e4.length)
            throw new RangeError("Index out of range");
        }
        function N(e4, t3, n2, o3) {
          t3 < 0 && (t3 = 65535 + t3 + 1);
          for (var r2 = 0, i2 = Math.min(e4.length - n2, 2); r2 < i2; ++r2)
            e4[n2 + r2] = (t3 & 255 << 8 * (o3 ? r2 : 1 - r2)) >>> 8 * (o3 ? r2 : 1 - r2);
        }
        function D(e4, t3, n2, o3) {
          t3 < 0 && (t3 = 4294967295 + t3 + 1);
          for (var r2 = 0, i2 = Math.min(e4.length - n2, 4); r2 < i2; ++r2)
            e4[n2 + r2] = t3 >>> 8 * (o3 ? r2 : 3 - r2) & 255;
        }
        function x(e4, t3, n2, o3, r2, i2) {
          if (n2 + o3 > e4.length)
            throw new RangeError("Index out of range");
          if (n2 < 0)
            throw new RangeError("Index out of range");
        }
        function U(e4, t3, n2, o3, i2) {
          return i2 || x(e4, 0, n2, 4), r.write(e4, t3, n2, o3, 23, 4), n2 + 4;
        }
        function j(e4, t3, n2, o3, i2) {
          return i2 || x(e4, 0, n2, 8), r.write(e4, t3, n2, o3, 52, 8), n2 + 8;
        }
        u.prototype.slice = function(e4, t3) {
          var n2, o3 = this.length;
          if (e4 = ~~e4, t3 = t3 === void 0 ? o3 : ~~t3, e4 < 0 ? (e4 += o3) < 0 && (e4 = 0) : e4 > o3 && (e4 = o3), t3 < 0 ? (t3 += o3) < 0 && (t3 = 0) : t3 > o3 && (t3 = o3), t3 < e4 && (t3 = e4), u.TYPED_ARRAY_SUPPORT)
            (n2 = this.subarray(e4, t3)).__proto__ = u.prototype;
          else {
            var r2 = t3 - e4;
            n2 = new u(r2, void 0);
            for (var i2 = 0; i2 < r2; ++i2)
              n2[i2] = this[i2 + e4];
          }
          return n2;
        }, u.prototype.readUIntLE = function(e4, t3, n2) {
          e4 |= 0, t3 |= 0, n2 || C(e4, t3, this.length);
          for (var o3 = this[e4], r2 = 1, i2 = 0; ++i2 < t3 && (r2 *= 256); )
            o3 += this[e4 + i2] * r2;
          return o3;
        }, u.prototype.readUIntBE = function(e4, t3, n2) {
          e4 |= 0, t3 |= 0, n2 || C(e4, t3, this.length);
          for (var o3 = this[e4 + --t3], r2 = 1; t3 > 0 && (r2 *= 256); )
            o3 += this[e4 + --t3] * r2;
          return o3;
        }, u.prototype.readUInt8 = function(e4, t3) {
          return t3 || C(e4, 1, this.length), this[e4];
        }, u.prototype.readUInt16LE = function(e4, t3) {
          return t3 || C(e4, 2, this.length), this[e4] | this[e4 + 1] << 8;
        }, u.prototype.readUInt16BE = function(e4, t3) {
          return t3 || C(e4, 2, this.length), this[e4] << 8 | this[e4 + 1];
        }, u.prototype.readUInt32LE = function(e4, t3) {
          return t3 || C(e4, 4, this.length), (this[e4] | this[e4 + 1] << 8 | this[e4 + 2] << 16) + 16777216 * this[e4 + 3];
        }, u.prototype.readUInt32BE = function(e4, t3) {
          return t3 || C(e4, 4, this.length), 16777216 * this[e4] + (this[e4 + 1] << 16 | this[e4 + 2] << 8 | this[e4 + 3]);
        }, u.prototype.readIntLE = function(e4, t3, n2) {
          e4 |= 0, t3 |= 0, n2 || C(e4, t3, this.length);
          for (var o3 = this[e4], r2 = 1, i2 = 0; ++i2 < t3 && (r2 *= 256); )
            o3 += this[e4 + i2] * r2;
          return o3 >= (r2 *= 128) && (o3 -= Math.pow(2, 8 * t3)), o3;
        }, u.prototype.readIntBE = function(e4, t3, n2) {
          e4 |= 0, t3 |= 0, n2 || C(e4, t3, this.length);
          for (var o3 = t3, r2 = 1, i2 = this[e4 + --o3]; o3 > 0 && (r2 *= 256); )
            i2 += this[e4 + --o3] * r2;
          return i2 >= (r2 *= 128) && (i2 -= Math.pow(2, 8 * t3)), i2;
        }, u.prototype.readInt8 = function(e4, t3) {
          return t3 || C(e4, 1, this.length), 128 & this[e4] ? -1 * (255 - this[e4] + 1) : this[e4];
        }, u.prototype.readInt16LE = function(e4, t3) {
          t3 || C(e4, 2, this.length);
          var n2 = this[e4] | this[e4 + 1] << 8;
          return 32768 & n2 ? 4294901760 | n2 : n2;
        }, u.prototype.readInt16BE = function(e4, t3) {
          t3 || C(e4, 2, this.length);
          var n2 = this[e4 + 1] | this[e4] << 8;
          return 32768 & n2 ? 4294901760 | n2 : n2;
        }, u.prototype.readInt32LE = function(e4, t3) {
          return t3 || C(e4, 4, this.length), this[e4] | this[e4 + 1] << 8 | this[e4 + 2] << 16 | this[e4 + 3] << 24;
        }, u.prototype.readInt32BE = function(e4, t3) {
          return t3 || C(e4, 4, this.length), this[e4] << 24 | this[e4 + 1] << 16 | this[e4 + 2] << 8 | this[e4 + 3];
        }, u.prototype.readFloatLE = function(e4, t3) {
          return t3 || C(e4, 4, this.length), r.read(this, e4, true, 23, 4);
        }, u.prototype.readFloatBE = function(e4, t3) {
          return t3 || C(e4, 4, this.length), r.read(this, e4, false, 23, 4);
        }, u.prototype.readDoubleLE = function(e4, t3) {
          return t3 || C(e4, 8, this.length), r.read(this, e4, true, 52, 8);
        }, u.prototype.readDoubleBE = function(e4, t3) {
          return t3 || C(e4, 8, this.length), r.read(this, e4, false, 52, 8);
        }, u.prototype.writeUIntLE = function(e4, t3, n2, o3) {
          (e4 = +e4, t3 |= 0, n2 |= 0, o3) || R(this, e4, t3, n2, Math.pow(2, 8 * n2) - 1, 0);
          var r2 = 1, i2 = 0;
          for (this[t3] = 255 & e4; ++i2 < n2 && (r2 *= 256); )
            this[t3 + i2] = e4 / r2 & 255;
          return t3 + n2;
        }, u.prototype.writeUIntBE = function(e4, t3, n2, o3) {
          (e4 = +e4, t3 |= 0, n2 |= 0, o3) || R(this, e4, t3, n2, Math.pow(2, 8 * n2) - 1, 0);
          var r2 = n2 - 1, i2 = 1;
          for (this[t3 + r2] = 255 & e4; --r2 >= 0 && (i2 *= 256); )
            this[t3 + r2] = e4 / i2 & 255;
          return t3 + n2;
        }, u.prototype.writeUInt8 = function(e4, t3, n2) {
          return e4 = +e4, t3 |= 0, n2 || R(this, e4, t3, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (e4 = Math.floor(e4)), this[t3] = 255 & e4, t3 + 1;
        }, u.prototype.writeUInt16LE = function(e4, t3, n2) {
          return e4 = +e4, t3 |= 0, n2 || R(this, e4, t3, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t3] = 255 & e4, this[t3 + 1] = e4 >>> 8) : N(this, e4, t3, true), t3 + 2;
        }, u.prototype.writeUInt16BE = function(e4, t3, n2) {
          return e4 = +e4, t3 |= 0, n2 || R(this, e4, t3, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t3] = e4 >>> 8, this[t3 + 1] = 255 & e4) : N(this, e4, t3, false), t3 + 2;
        }, u.prototype.writeUInt32LE = function(e4, t3, n2) {
          return e4 = +e4, t3 |= 0, n2 || R(this, e4, t3, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t3 + 3] = e4 >>> 24, this[t3 + 2] = e4 >>> 16, this[t3 + 1] = e4 >>> 8, this[t3] = 255 & e4) : D(this, e4, t3, true), t3 + 4;
        }, u.prototype.writeUInt32BE = function(e4, t3, n2) {
          return e4 = +e4, t3 |= 0, n2 || R(this, e4, t3, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t3] = e4 >>> 24, this[t3 + 1] = e4 >>> 16, this[t3 + 2] = e4 >>> 8, this[t3 + 3] = 255 & e4) : D(this, e4, t3, false), t3 + 4;
        }, u.prototype.writeIntLE = function(e4, t3, n2, o3) {
          if (e4 = +e4, t3 |= 0, !o3) {
            var r2 = Math.pow(2, 8 * n2 - 1);
            R(this, e4, t3, n2, r2 - 1, -r2);
          }
          var i2 = 0, s2 = 1, a2 = 0;
          for (this[t3] = 255 & e4; ++i2 < n2 && (s2 *= 256); )
            e4 < 0 && a2 === 0 && this[t3 + i2 - 1] !== 0 && (a2 = 1), this[t3 + i2] = (e4 / s2 >> 0) - a2 & 255;
          return t3 + n2;
        }, u.prototype.writeIntBE = function(e4, t3, n2, o3) {
          if (e4 = +e4, t3 |= 0, !o3) {
            var r2 = Math.pow(2, 8 * n2 - 1);
            R(this, e4, t3, n2, r2 - 1, -r2);
          }
          var i2 = n2 - 1, s2 = 1, a2 = 0;
          for (this[t3 + i2] = 255 & e4; --i2 >= 0 && (s2 *= 256); )
            e4 < 0 && a2 === 0 && this[t3 + i2 + 1] !== 0 && (a2 = 1), this[t3 + i2] = (e4 / s2 >> 0) - a2 & 255;
          return t3 + n2;
        }, u.prototype.writeInt8 = function(e4, t3, n2) {
          return e4 = +e4, t3 |= 0, n2 || R(this, e4, t3, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (e4 = Math.floor(e4)), e4 < 0 && (e4 = 255 + e4 + 1), this[t3] = 255 & e4, t3 + 1;
        }, u.prototype.writeInt16LE = function(e4, t3, n2) {
          return e4 = +e4, t3 |= 0, n2 || R(this, e4, t3, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t3] = 255 & e4, this[t3 + 1] = e4 >>> 8) : N(this, e4, t3, true), t3 + 2;
        }, u.prototype.writeInt16BE = function(e4, t3, n2) {
          return e4 = +e4, t3 |= 0, n2 || R(this, e4, t3, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t3] = e4 >>> 8, this[t3 + 1] = 255 & e4) : N(this, e4, t3, false), t3 + 2;
        }, u.prototype.writeInt32LE = function(e4, t3, n2) {
          return e4 = +e4, t3 |= 0, n2 || R(this, e4, t3, 4, 2147483647, -2147483648), u.TYPED_ARRAY_SUPPORT ? (this[t3] = 255 & e4, this[t3 + 1] = e4 >>> 8, this[t3 + 2] = e4 >>> 16, this[t3 + 3] = e4 >>> 24) : D(this, e4, t3, true), t3 + 4;
        }, u.prototype.writeInt32BE = function(e4, t3, n2) {
          return e4 = +e4, t3 |= 0, n2 || R(this, e4, t3, 4, 2147483647, -2147483648), e4 < 0 && (e4 = 4294967295 + e4 + 1), u.TYPED_ARRAY_SUPPORT ? (this[t3] = e4 >>> 24, this[t3 + 1] = e4 >>> 16, this[t3 + 2] = e4 >>> 8, this[t3 + 3] = 255 & e4) : D(this, e4, t3, false), t3 + 4;
        }, u.prototype.writeFloatLE = function(e4, t3, n2) {
          return U(this, e4, t3, true, n2);
        }, u.prototype.writeFloatBE = function(e4, t3, n2) {
          return U(this, e4, t3, false, n2);
        }, u.prototype.writeDoubleLE = function(e4, t3, n2) {
          return j(this, e4, t3, true, n2);
        }, u.prototype.writeDoubleBE = function(e4, t3, n2) {
          return j(this, e4, t3, false, n2);
        }, u.prototype.copy = function(e4, t3, n2, o3) {
          if (n2 || (n2 = 0), o3 || o3 === 0 || (o3 = this.length), t3 >= e4.length && (t3 = e4.length), t3 || (t3 = 0), o3 > 0 && o3 < n2 && (o3 = n2), o3 === n2)
            return 0;
          if (e4.length === 0 || this.length === 0)
            return 0;
          if (t3 < 0)
            throw new RangeError("targetStart out of bounds");
          if (n2 < 0 || n2 >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (o3 < 0)
            throw new RangeError("sourceEnd out of bounds");
          o3 > this.length && (o3 = this.length), e4.length - t3 < o3 - n2 && (o3 = e4.length - t3 + n2);
          var r2, i2 = o3 - n2;
          if (this === e4 && n2 < t3 && t3 < o3)
            for (r2 = i2 - 1; r2 >= 0; --r2)
              e4[r2 + t3] = this[r2 + n2];
          else if (i2 < 1e3 || !u.TYPED_ARRAY_SUPPORT)
            for (r2 = 0; r2 < i2; ++r2)
              e4[r2 + t3] = this[r2 + n2];
          else
            Uint8Array.prototype.set.call(e4, this.subarray(n2, n2 + i2), t3);
          return i2;
        }, u.prototype.fill = function(e4, t3, n2, o3) {
          if (typeof e4 == "string") {
            if (typeof t3 == "string" ? (o3 = t3, t3 = 0, n2 = this.length) : typeof n2 == "string" && (o3 = n2, n2 = this.length), e4.length === 1) {
              var r2 = e4.charCodeAt(0);
              r2 < 256 && (e4 = r2);
            }
            if (o3 !== void 0 && typeof o3 != "string")
              throw new TypeError("encoding must be a string");
            if (typeof o3 == "string" && !u.isEncoding(o3))
              throw new TypeError("Unknown encoding: " + o3);
          } else
            typeof e4 == "number" && (e4 &= 255);
          if (t3 < 0 || this.length < t3 || this.length < n2)
            throw new RangeError("Out of range index");
          if (n2 <= t3)
            return this;
          var i2;
          if (t3 >>>= 0, n2 = n2 === void 0 ? this.length : n2 >>> 0, e4 || (e4 = 0), typeof e4 == "number")
            for (i2 = t3; i2 < n2; ++i2)
              this[i2] = e4;
          else {
            var s2 = u.isBuffer(e4) ? e4 : G(new u(e4, o3).toString()), a2 = s2.length;
            for (i2 = 0; i2 < n2 - t3; ++i2)
              this[i2 + t3] = s2[i2 % a2];
          }
          return this;
        };
        var F = /[^+\/0-9A-Za-z-_]/g;
        function B(e4) {
          return e4 < 16 ? "0" + e4.toString(16) : e4.toString(16);
        }
        function G(e4, t3) {
          var n2;
          t3 = t3 || Infinity;
          for (var o3 = e4.length, r2 = null, i2 = [], s2 = 0; s2 < o3; ++s2) {
            if ((n2 = e4.charCodeAt(s2)) > 55295 && n2 < 57344) {
              if (!r2) {
                if (n2 > 56319) {
                  (t3 -= 3) > -1 && i2.push(239, 191, 189);
                  continue;
                }
                if (s2 + 1 === o3) {
                  (t3 -= 3) > -1 && i2.push(239, 191, 189);
                  continue;
                }
                r2 = n2;
                continue;
              }
              if (n2 < 56320) {
                (t3 -= 3) > -1 && i2.push(239, 191, 189), r2 = n2;
                continue;
              }
              n2 = 65536 + (r2 - 55296 << 10 | n2 - 56320);
            } else
              r2 && (t3 -= 3) > -1 && i2.push(239, 191, 189);
            if (r2 = null, n2 < 128) {
              if ((t3 -= 1) < 0)
                break;
              i2.push(n2);
            } else if (n2 < 2048) {
              if ((t3 -= 2) < 0)
                break;
              i2.push(n2 >> 6 | 192, 63 & n2 | 128);
            } else if (n2 < 65536) {
              if ((t3 -= 3) < 0)
                break;
              i2.push(n2 >> 12 | 224, n2 >> 6 & 63 | 128, 63 & n2 | 128);
            } else {
              if (!(n2 < 1114112))
                throw new Error("Invalid code point");
              if ((t3 -= 4) < 0)
                break;
              i2.push(n2 >> 18 | 240, n2 >> 12 & 63 | 128, n2 >> 6 & 63 | 128, 63 & n2 | 128);
            }
          }
          return i2;
        }
        function L(e4) {
          return o2.toByteArray(function(e5) {
            if ((e5 = function(e6) {
              return e6.trim ? e6.trim() : e6.replace(/^\s+|\s+$/g, "");
            }(e5).replace(F, "")).length < 2)
              return "";
            for (; e5.length % 4 != 0; )
              e5 += "=";
            return e5;
          }(e4));
        }
        function q(e4, t3, n2, o3) {
          for (var r2 = 0; r2 < o3 && !(r2 + n2 >= t3.length || r2 >= e4.length); ++r2)
            t3[r2 + n2] = e4[r2];
          return r2;
        }
      }).call(this, n(28));
    }, function(e2, t2, n) {
      var o2, r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), i = 64, s = {}, a = 0, u = 0;
      function c(e3) {
        var t3 = "";
        do {
          t3 = r[e3 % i] + t3, e3 = Math.floor(e3 / i);
        } while (e3 > 0);
        return t3;
      }
      function l() {
        var e3 = c(+new Date());
        return e3 !== o2 ? (a = 0, o2 = e3) : e3 + "." + c(a++);
      }
      for (; u < i; u++)
        s[r[u]] = u;
      l.encode = c, l.decode = function(e3) {
        var t3 = 0;
        for (u = 0; u < e3.length; u++)
          t3 = t3 * i + s[e3.charAt(u)];
        return t3;
      }, e2.exports = l;
    }, function(e2, t2) {
      var n = [].indexOf;
      e2.exports = function(e3, t3) {
        if (n)
          return e3.indexOf(t3);
        for (var o2 = 0; o2 < e3.length; ++o2)
          if (e3[o2] === t3)
            return o2;
        return -1;
      };
    }, function(e2, t2, n) {
      var o2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
        return typeof e3;
      } : function(e3) {
        return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
      }, r = n(26), i = n(13), s = n(85), a = n(50), u = n(51), c = (n(9)("socket.io-client:socket"), n(24)), l = n(45);
      e2.exports = h;
      var f2 = { connect: 1, connect_error: 1, connect_timeout: 1, connecting: 1, disconnect: 1, error: 1, reconnect: 1, reconnect_attempt: 1, reconnect_failed: 1, reconnect_error: 1, reconnecting: 1, ping: 1, pong: 1 }, p2 = i.prototype.emit;
      function h(e3, t3, n2) {
        this.io = e3, this.nsp = t3, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = false, this.disconnected = true, this.flags = {}, n2 && n2.query && (this.query = n2.query), this.io.autoConnect && this.open();
      }
      i(h.prototype), h.prototype.subEvents = function() {
        if (!this.subs) {
          var e3 = this.io;
          this.subs = [a(e3, "open", u(this, "onopen")), a(e3, "packet", u(this, "onpacket")), a(e3, "close", u(this, "onclose"))];
        }
      }, h.prototype.open = h.prototype.connect = function() {
        return this.connected ? this : (this.subEvents(), this.io.open(), this.io.readyState === "open" && this.onopen(), this.emit("connecting"), this);
      }, h.prototype.send = function() {
        var e3 = s(arguments);
        return e3.unshift("message"), this.emit.apply(this, e3), this;
      }, h.prototype.emit = function(e3) {
        if (f2.hasOwnProperty(e3))
          return p2.apply(this, arguments), this;
        var t3 = s(arguments), n2 = { type: (this.flags.binary !== void 0 ? this.flags.binary : l(t3)) ? r.BINARY_EVENT : r.EVENT, data: t3, options: {} };
        return n2.options.compress = !this.flags || this.flags.compress !== false, typeof t3[t3.length - 1] == "function" && (this.ids, this.acks[this.ids] = t3.pop(), n2.id = this.ids++), this.connected ? this.packet(n2) : this.sendBuffer.push(n2), this.flags = {}, this;
      }, h.prototype.packet = function(e3) {
        e3.nsp = this.nsp, this.io.packet(e3);
      }, h.prototype.onopen = function() {
        if (this.nsp !== "/")
          if (this.query) {
            var e3 = o2(this.query) === "object" ? c.encode(this.query) : this.query;
            this.packet({ type: r.CONNECT, query: e3 });
          } else
            this.packet({ type: r.CONNECT });
      }, h.prototype.onclose = function(e3) {
        this.connected = false, this.disconnected = true, delete this.id, this.emit("disconnect", e3);
      }, h.prototype.onpacket = function(e3) {
        var t3 = e3.nsp === this.nsp, n2 = e3.type === r.ERROR && e3.nsp === "/";
        if (t3 || n2)
          switch (e3.type) {
            case r.CONNECT:
              this.onconnect();
              break;
            case r.EVENT:
            case r.BINARY_EVENT:
              this.onevent(e3);
              break;
            case r.ACK:
            case r.BINARY_ACK:
              this.onack(e3);
              break;
            case r.DISCONNECT:
              this.ondisconnect();
              break;
            case r.ERROR:
              this.emit("error", e3.data);
          }
      }, h.prototype.onevent = function(e3) {
        var t3 = e3.data || [];
        e3.id != null && t3.push(this.ack(e3.id)), this.connected ? p2.apply(this, t3) : this.receiveBuffer.push(t3);
      }, h.prototype.ack = function(e3) {
        var t3 = this, n2 = false;
        return function() {
          if (!n2) {
            n2 = true;
            var o3 = s(arguments);
            t3.packet({ type: l(o3) ? r.BINARY_ACK : r.ACK, id: e3, data: o3 });
          }
        };
      }, h.prototype.onack = function(e3) {
        var t3 = this.acks[e3.id];
        typeof t3 == "function" ? (e3.id, e3.data, t3.apply(this, e3.data), delete this.acks[e3.id]) : e3.id;
      }, h.prototype.onconnect = function() {
        this.connected = true, this.disconnected = false, this.emit("connect"), this.emitBuffered();
      }, h.prototype.emitBuffered = function() {
        var e3;
        for (e3 = 0; e3 < this.receiveBuffer.length; e3++)
          p2.apply(this, this.receiveBuffer[e3]);
        for (this.receiveBuffer = [], e3 = 0; e3 < this.sendBuffer.length; e3++)
          this.packet(this.sendBuffer[e3]);
        this.sendBuffer = [];
      }, h.prototype.ondisconnect = function() {
        this.nsp, this.destroy(), this.onclose("io server disconnect");
      }, h.prototype.destroy = function() {
        if (this.subs) {
          for (var e3 = 0; e3 < this.subs.length; e3++)
            this.subs[e3].destroy();
          this.subs = null;
        }
        this.io.destroy(this);
      }, h.prototype.close = h.prototype.disconnect = function() {
        return this.connected && (this.nsp, this.packet({ type: r.DISCONNECT })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
      }, h.prototype.compress = function(e3) {
        return this.flags.compress = e3, this;
      }, h.prototype.binary = function(e3) {
        return this.flags.binary = e3, this;
      };
    }, function(e2, t2, n) {
      e2.exports = function(e3, t3, n2) {
        return e3.on(t3, n2), { destroy: function() {
          e3.removeListener(t3, n2);
        } };
      };
    }, function(e2, t2) {
      var n = [].slice;
      e2.exports = function(e3, t3) {
        if (typeof t3 == "string" && (t3 = e3[t3]), typeof t3 != "function")
          throw new Error("bind() requires a function");
        var o2 = n.call(arguments, 2);
        return function() {
          return t3.apply(e3, o2.concat(n.call(arguments)));
        };
      };
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.GoEasyDomainNumber = void 0;
      var o2, r = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), i = n(87), s = (o2 = i) && o2.__esModule ? o2 : { "default": o2 }, a = n(53);
      var u = function() {
        function e3() {
          !function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3);
        }
        return r(e3, null, [{ key: "refreshNumber", value: function() {
          var t3 = e3.GOEASY_DOMAIN_NUMBER, n2 = a.LocalStorageDispatcher.localStorage(), o3 = Math.floor(Math.random() * (s["default"].maxNumber - 1) + 1);
          return n2 !== null && (o3 = parseInt(n2.get(t3)) || o3), o3 > 0 && o3 < s["default"].maxNumber ? o3 += 1 : o3 == s["default"].maxNumber && (o3 = 1), n2 !== null && n2.put(t3, o3), o3;
        } }]), e3;
      }();
      u.GOEASY_DOMAIN_NUMBER = "GOEASY_DOMAIN_NUMBER", t2.GoEasyDomainNumber = u;
    }, function(e2, t2, n) {
      var o2 = this && this.__values || function(e3) {
        var t3 = typeof Symbol == "function" && Symbol.iterator, n2 = t3 && e3[t3], o3 = 0;
        if (n2)
          return n2.call(e3);
        if (e3 && typeof e3.length == "number")
          return { next: function() {
            return e3 && o3 >= e3.length && (e3 = void 0), { value: e3 && e3[o3++], done: !e3 };
          } };
        throw new TypeError(t3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      t2.__esModule = true, t2.LocalStorageDispatcher = void 0;
      var r = n(88), i = function() {
        function e3() {
          this.domain = null;
          this.domain = typeof location != "undefined" && /^(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/.test(location.host) ? location.host.split(".").slice(-2).join(".") : null;
        }
        return e3.prototype.get = function(e4) {
          var t3 = r.Cookie.get(e4) || null;
          return JSON.parse(t3);
        }, e3.prototype.put = function(e4, t3) {
          var n2 = new Date(2030, 12, 31, 0, 0, 0, 0), o3 = this.domain;
          r.Cookie.set(e4, JSON.stringify(t3), n2, o3);
        }, e3.prototype.remove = function(e4) {
          var t3 = this.domain;
          r.Cookie.remove(e4, t3);
        }, e3.prototype.support = function() {
          return typeof navigator != "undefined" && navigator.cookieEnabled === true;
        }, e3;
      }(), s = function() {
        function e3() {
        }
        return e3.prototype.get = function(e4) {
          var t3 = localStorage.getItem(e4);
          return JSON.parse(t3);
        }, e3.prototype.put = function(e4, t3) {
          var n2 = localStorage.setItem(e4, JSON.stringify(t3));
          JSON.stringify(n2);
        }, e3.prototype.remove = function(e4) {
          localStorage.removeItem(e4);
        }, e3.prototype.support = function() {
          return !(typeof GameGlobal != "undefined" || typeof localStorage == "undefined" || !localStorage.setItem);
        }, e3;
      }(), a = function() {
        function e3() {
        }
        return e3.prototype.get = function(e4) {
          var t3 = index.getStorageSync(e4) || null;
          return JSON.parse(t3);
        }, e3.prototype.put = function(e4, t3) {
          index.setStorageSync(e4, JSON.stringify(t3));
        }, e3.prototype.remove = function(e4) {
          index.removeStorageSync(e4);
        }, e3.prototype.support = function() {
          return !(typeof index != "object" || !index.getStorageSync);
        }, e3;
      }(), u = function() {
        function e3() {
        }
        return e3.prototype.get = function(e4) {
          var t3 = wx.getStorageSync(e4) || null;
          return JSON.parse(t3);
        }, e3.prototype.put = function(e4, t3) {
          wx.setStorageSync(e4, JSON.stringify(t3));
        }, e3.prototype.remove = function(e4) {
          wx.removeStorageSync(e4);
        }, e3.prototype.support = function() {
          return !(typeof wx != "object" || !wx.getStorageSync);
        }, e3;
      }(), c = function() {
        function e3() {
          this.supportedStorage = null;
          var t3 = e3.storages;
          t3.push(new a()), t3.push(new s()), t3.push(new u()), t3.push(new i()), this.dispatch(), this.supportedStorage;
        }
        return e3.localStorage = function() {
          return this.instance.supportedStorage;
        }, e3.prototype.dispatch = function() {
          var t3, n2;
          try {
            for (var r2 = o2(e3.storages), i2 = r2.next(); !i2.done; i2 = r2.next()) {
              var s2 = i2.value;
              if (s2.support()) {
                this.supportedStorage = s2;
                break;
              }
            }
          } catch (a2) {
            t3 = { error: a2 };
          } finally {
            try {
              i2 && !i2.done && (n2 = r2["return"]) && n2.call(r2);
            } finally {
              if (t3)
                throw t3.error;
            }
          }
        }, e3.storages = new Array(), e3.instance = new e3(), e3;
      }();
      t2.LocalStorageDispatcher = c;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2, r = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), i = n(99), s = n(103), a = (o2 = s) && o2.__esModule ? o2 : { "default": o2 };
      var u = function() {
        function e3() {
          !function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.requestBuilder = null, this.fileUploader = i.fileUploader, this.requestBuilder = new a["default"]();
        }
        return r(e3, [{ key: "upload", value: function(e4, t3, n2, o3) {
          var r2 = this;
          return new Promise(function(i2, s2) {
            r2.requestBuilder.build(e4, t3, o3).then(function(e5) {
              i2(r2.doUpload(e5, n2));
            })["catch"](function(e5) {
              s2(e5);
            });
          });
        } }, { key: "customizeUpload", value: function(e4, t3) {
          this.doUpload(e4, t3);
        } }, { key: "doUpload", value: function(e4, t3) {
          return this.fileUploader.upload(e4, t3);
        } }]), e3;
      }();
      t2["default"] = u;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      t2["default"] = function o2(e3, t3, n2, r, i) {
        !function(e4, t4) {
          if (!(e4 instanceof t4))
            throw new TypeError("Cannot call a class as a function");
        }(this, o2), this.host = "", this.headers = {}, this.parameters = {}, this.file = {}, this.payload = {}, this.host = e3, this.headers = t3, this.parameters = n2, this.file = r, this.payload = i;
      };
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }();
      var r = function() {
        function e3() {
          !function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3);
        }
        return o2(e3, [{ key: "build", value: function(e4, t3) {
        } }, { key: "newFileName", value: function(e4) {
          return e4 && e4.newFilename || "";
        } }]), e3;
      }();
      t2["default"] = r;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.SocketEvents = void 0, function(e3) {
        e3.IM_MESSAGE_RECEIVED = "IM_MESSAGE_RECEIVED";
      }(t2.SocketEvents || (t2.SocketEvents = {}));
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true, t2.PrivateMessage = void 0;
      var i = n(21), s = n(2), a = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.scene = function() {
          return s.Scene.PRIVATE;
        }, t3.prototype.targetId = function() {
          return this.receiverId;
        }, t3;
      }(i.AbstractMessage);
      t2.PrivateMessage = a;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true, t2.GroupMessage = void 0;
      var i = n(21), s = n(2), a = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.scene = function() {
          return s.Scene.GROUP;
        }, t3.prototype.targetId = function() {
          return this.groupId;
        }, t3;
      }(i.AbstractMessage);
      t2.GroupMessage = a;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true, t2.FileMessagePayloadImprover = void 0;
      var i = n(136), s = n(54), a = n(19), u = function(e3) {
        function t3() {
          var t4 = e3.call(this) || this;
          return t4.goEasyUploader = new s["default"](), t4;
        }
        return r(t3, e3), t3.prototype.improve = function(e4) {
          var t4 = this, n2 = e4.message;
          return new Promise(function(e5, o3) {
            var r2, i2 = n2.buildOptions.createOptions;
            r2 = n2.type === a.MessageType.VIDEO ? n2.payload.video.name : n2.payload.name, t4.goEasyUploader.upload(i2.file, r2, i2.onProgress, n2.type).then(function(o4) {
              t4.setPayload(o4, n2), e5();
            })["catch"](function(e6) {
              o3(e6);
            });
          });
        }, t3.prototype.setPayload = function(e4, t4) {
          var n2 = e4.content, o3 = n2 === void 0 ? {} : n2;
          t4.payload.url = o3.url;
        }, t3;
      }(i.AbstractPayloadImprover);
      t2.FileMessagePayloadImprover = u;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.SortedInserter = void 0;
      var o2 = function() {
        function e3() {
        }
        return e3.prototype.insert = function(e4, t3) {
          var n2 = this.binarySearch(e4, t3);
          if (n2 >= 0)
            e4.splice(n2, 1, t3);
          else {
            var o3 = -n2 - 1;
            e4.splice(o3, 0, t3);
          }
        }, e3.prototype.binarySearch = function(e4, t3) {
          for (var n2 = 0, o3 = e4.length - 1; n2 <= o3; ) {
            var r = o3 + n2 >> 1, i = this.compare(t3, e4[r]);
            if (i > 0)
              n2 = r + 1;
            else {
              if (!(i < 0))
                return r;
              o3 = r - 1;
            }
          }
          return -n2 - 1;
        }, e3;
      }();
      t2.SortedInserter = o2;
    }, function(e2, t2, n) {
      t2.__esModule = true;
      var o2 = n(6), r = n(21), i = n(0), s = n(2), a = n(149), u = n(3), c = n(1), l = n(4), f2 = n(5), p2 = n(8), h = n(17), d = function() {
        function e3() {
        }
        return e3.deleteServerMessages = function(e4) {
          var t3 = new a.DeleteMessageRequest(e4);
          return t3.times.length < 0 ? Promise.resolve() : new Promise(function(e5, n2) {
            var r2 = new u["default"]({ name: f2.RocketTypes.IM_DELETE_MESSAGE, params: t3, permission: c["default"].WRITE, singleTimeout: l.SocketTimeout.commonQuerySingle, totalTimeout: l.SocketTimeout.commonQueryTotal, success: function(t4) {
              t4.code === 200 ? e5(t4) : n2(t4);
            }, fail: function(e6) {
              n2(e6);
            } });
            o2.im._goEasySocket.emit(r2);
          });
        }, e3.validate = function(e4) {
          if (p2.CallbackUtils.validateCallbackOptions(e4), !i.calibrator.isArray(e4.messages) || i.calibrator.isEmpty(e4.messages))
            throw { code: 400, content: "messages requires non empty array" };
          var t3 = e4.messages;
          if (t3.length > 50)
            throw { code: 400, content: "a maximum of 50 messages can be deleted at a time" };
          for (var n2 = h.Target.byIMMessage(t3[0]), o3 = 0; o3 < t3.length; o3++) {
            var a2 = t3[o3];
            if (!(a2 instanceof r.AbstractMessage))
              throw { code: 400, content: "message[" + o3 + "] is not a correct message" };
            if (a2.status === s.MessageStatus.SENDING)
              throw { code: 400, content: "message[" + o3 + "] is '" + a2.status + "' and cannot be deleted" };
            if (o3 > 0) {
              var u2 = h.Target.byIMMessage(a2);
              if (u2.scene !== n2.scene || u2.id !== n2.id)
                throw { code: 400, content: "each message must be from the same friend or group" };
            }
          }
        }, e3;
      }();
      t2["default"] = d;
    }, function(e2, t2, n) {
      t2.__esModule = true;
      var o2 = n(2), r = n(6), i = function() {
        function e3() {
        }
        return e3.conversationId = function(e4, t3, n2) {
          var r2 = n2;
          return e4 === o2.Scene.PRIVATE && (r2 = t3 + ":" + n2), r2;
        }, e3.targetId = function(e4, t3) {
          if (e4 === o2.Scene.PRIVATE) {
            var n2 = t3.split(":", 2);
            return n2[0] === r.IM.userId ? n2[1] : n2[0];
          }
          return t3;
        }, e3;
      }();
      t2["default"] = i;
    }, function(e2, t2, n) {
      t2.__esModule = true;
      var o2 = n(6), r = n(2), i = n(155), s = n(3), a = n(1), u = n(4), c = n(21), l = n(0), f2 = n(5), p2 = n(8), h = n(17), d = function() {
        function e3() {
        }
        return e3.recallServerMessages = function(e4) {
          var t3 = new i.RecallMessageRequest(e4);
          return t3.times.length === 0 ? Promise.resolve() : new Promise(function(e5, n2) {
            var r2 = new s["default"]({ name: f2.RocketTypes.IM_RECALL_MESSAGE, params: t3, permission: a["default"].WRITE, singleTimeout: u.SocketTimeout.commonRequestSingle, totalTimeout: u.SocketTimeout.commonRequestTotal, fail: function(e6) {
              n2(e6);
            }, success: function(t4) {
              t4.code === 200 ? e5(t4) : n2(t4);
            } });
            o2.im._goEasySocket.emit(r2);
          });
        }, e3.validate = function(e4) {
          p2.CallbackUtils.validateCallbackOptions(e4);
          var t3, n2 = e4.messages;
          if (!l.calibrator.isArray(n2) || l.calibrator.isEmpty(n2))
            throw { code: 400, content: "messages requires non empty array" };
          if (n2.length > 50)
            throw { code: 400, content: "a maximum of 50 messages can be recalled at a time" };
          for (var i2 = 0; i2 < n2.length; i2++) {
            var s2 = n2[i2];
            if (!(s2 instanceof c.AbstractMessage))
              throw { code: 400, content: "message[" + i2 + "] is an illegal message object" };
            if (s2.status !== r.MessageStatus.SUCCESS)
              throw { code: 400, content: "message[" + i2 + "] is '" + s2.status + "' and cannot be recalled" };
            if (s2.recalled)
              throw { code: 400, content: "message[" + i2 + "] has been recalled" };
            if (s2.senderId !== o2.IM.userId)
              throw { code: 400, content: "it is not allowed to recall messages sent by others" };
            if (i2 > 0) {
              var a2 = h.Target.byIMMessage(s2);
              if (a2.scene !== t3.scene || a2.id !== t3.id)
                throw { code: 400, content: "each message must be from the same friend or group" };
            } else
              t3 = h.Target.byIMMessage(s2);
          }
        }, e3;
      }();
      t2["default"] = d;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.PUBSUB_INTERNAL_EVENTS = void 0, function(e3) {
        e3.MESSAGE_RECEIVED = "PUBSUB_INTERNAL_MESSAGE_RECEIVED";
      }(t2.PUBSUB_INTERNAL_EVENTS || (t2.PUBSUB_INTERNAL_EVENTS = {}));
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = function E2(e3, t3, n2) {
        e3 === null && (e3 = Function.prototype);
        var o3 = Object.getOwnPropertyDescriptor(e3, t3);
        if (o3 === void 0) {
          var r2 = Object.getPrototypeOf(e3);
          return r2 === null ? void 0 : E2(r2, t3, n2);
        }
        if ("value" in o3)
          return o3.value;
        var i2 = o3.get;
        return i2 === void 0 ? void 0 : i2.call(n2);
      }, i = g(n(40)), s = g(n(94)), a = g(n(3)), u = g(n(1)), c = g(n(12)), l = g(n(95)), f2 = n(0), p2 = (n(27), n(4)), h = g(n(2)), d = n(23), y = n(96), m = n(97), v = n(5);
      function g(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var b = function(e3) {
        function t3(e4, n2) {
          !function(e5, t4) {
            if (!(e5 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, t3);
          var o3 = function(e5, t4) {
            if (!e5)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t4 || typeof t4 != "object" && typeof t4 != "function" ? e5 : t4;
          }(this, (t3.__proto__ || Object.getPrototypeOf(t3)).call(this));
          return o3.ioSocket = null, o3.sid = null, o3.appKey = null, o3.anonymous = false, o3.userId = null, o3.userData = null, o3.otp = null, o3.artifactVersion = "0.0.0", o3.uri = null, o3.ioOpts = null, o3.allowNotification = false, o3.reconnectingTimes = 0, o3.messageObservers = {}, o3.connectFailedObservers = [], o3.connectingObservers = [], o3.expiredReconnectedObservers = [], o3.onConnectSuccess = f2.noop, o3.onConnectFailed = f2.noop, o3.onConnectProgress = f2.noop, o3.setUriAndOpts(e4), o3.extendOptions(n2), o3.ioSocket = new s["default"]({ onDisconnected: o3.onIoDisconnected.bind(o3), onReconnecting: o3.onIoReconnecting.bind(o3) }), o3.ioSocket.addConnectedObserver(o3.onIoReconnected.bind(o3)), o3.appKey = e4.appkey, o3.allowNotification = e4.allowNotification, o3.modules = e4.modules, f2.calibrator.isEmpty(n2.id) ? (o3.anonymous = true, o3.userId = y.AnonymousUserIdRepository.get()) : o3.userId = n2.id.toString(), o3.artifactVersion = h["default"].version, o3.addConnectedObserver(o3.onConnectSuccess), o3.addConnectFailedObserver(o3.onConnectFailed), o3.addConnectingObserver(o3.onConnectProgress), o3;
        }
        return function(e4, t4) {
          if (typeof t4 != "function" && t4 !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t4);
          e4.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e4, enumerable: false, writable: true, configurable: true } }), t4 && (Object.setPrototypeOf ? Object.setPrototypeOf(e4, t4) : e4.__proto__ = t4);
        }(t3, i["default"]), o2(t3, [{ key: "extendOptions", value: function(e4) {
          if (f2.calibrator.isFunction(e4.onSuccess) && (this.onConnectSuccess = e4.onSuccess), f2.calibrator.isFunction(e4.onFailed) && (this.onConnectFailed = e4.onFailed), f2.calibrator.isFunction(e4.onProgress) && (this.onConnectProgress = e4.onProgress), f2.calibrator.isDef(e4.data) && !f2.calibrator.isObject(e4.data))
            throw { code: 400, content: "TypeError: data requires an object." };
          if ((f2.calibrator.isDef(e4.data) ? String(e4.data).length : 0) > 300) {
            if (f2.calibrator.isObject(e4) && f2.calibrator.isFunction(e4.onFailed))
              throw { code: 400, content: "user.data-length limit 300 byte." };
          } else
            this.userData = e4.data;
          this.otp = e4.otp || null;
        } }, { key: "setUriAndOpts", value: function(e4) {
          var t4 = true;
          if (d.PlatformDetector.currentPlatform() === d.Platform.BROWSER) {
            var n2 = "://" + f2.GoEasyDomainNumber.refreshNumber() + e4.host, o3 = void 0;
            e4.supportOldBrowser === true ? (o3 = ["polling", "websocket"], t4 = false) : o3 = ["websocket"], e4.forceTLS !== false && t4 ? this.uri = "https" + n2 + ":443" : this.uri = "http" + n2 + ":80", this.ioOpts = { transports: o3, timeout: p2.SocketTimeout.connect };
          } else
            this.uri = "https://wx-" + e4.host + ":443", this.ioOpts = { transports: ["websocket"], reconnectionDelayMax: p2.SocketTimeout.reconnectionDelayMax };
        } }, { key: "onIoReconnected", value: function() {
          this.status === c["default"].RECONNECTING && this.authorize();
        } }, { key: "emit", value: function(e4) {
          r(t3.prototype.__proto__ || Object.getPrototypeOf(t3.prototype), "emit", this).call(this, e4);
        } }, { key: "doEmit", value: function(e4, t4, n2) {
          t4.sid = this.sid, this.ioSocket.doEmit(e4, t4, n2);
        } }, { key: "sendAck", value: function(e4, t4) {
          this.ioSocket.io.emit(e4, t4);
        } }, { key: "connect", value: function(e4) {
          var n2 = this;
          r(t3.prototype.__proto__ || Object.getPrototypeOf(t3.prototype), "connect", this).call(this), this.onConnecting(this.reconnectingTimes), this.ioSocket.connect({ uri: this.uri, opts: this.ioOpts }), e4 && e4.supportNotification() && e4.getRegIdPromise() ? e4.getRegIdPromise().then(function(e5) {
            n2.regId = e5, n2.authorize();
          })["catch"](function(e5) {
            console.warn("Failed to register the Manufacturers Push service\uFF1A" + JSON.stringify(e5)), n2.authorize();
          }) : this.authorize();
        } }, { key: "disconnect", value: function() {
          var e4 = this;
          return new Promise(function(t4, n2) {
            var o3 = function() {
              e4.status = c["default"].DISCONNECTED, e4.ioSocket.disconnect(), t4();
            };
            if (e4.allowNotification) {
              var r2 = new a["default"]({ name: v.RocketTypes.manualDisconnect, params: {}, permission: u["default"].READ, singleTimeout: p2.SocketTimeout.commonRequestSingle, totalTimeout: p2.SocketTimeout.commonRequestTotal, fail: function(e5) {
                n2(e5);
              }, success: o3 });
              e4.emit(r2);
            } else
              o3();
          });
        } }, { key: "authorize", value: function() {
          var e4 = { appkey: this.appKey, userId: this.userId, userData: JSON.stringify(this.userData), otp: this.otp, artifactVersion: this.artifactVersion, sid: this.sid, allowNT: this.allowNotification, regId: this.regId, modules: this.modules, a: this.anonymous, z: m.clientInfo.z };
          JSON.stringify(e4);
          var t4 = new a["default"]({ name: v.RocketTypes.authorize, params: e4, permission: u["default"].NONE, singleTimeout: p2.SocketTimeout.commonInfiniteSingle, totalTimeout: p2.SocketTimeout.commonInfiniteTotal, success: this.onAuthorizeSuccess.bind(this), fail: this.onAuthorizeFailed.bind(this) });
          this.ioSocket.emit(t4);
        } }, { key: "onConnecting", value: function() {
          this.notify(this.connectingObservers, this.reconnectingTimes);
        } }, { key: "onIoReconnecting", value: function() {
          this.reconnectingTimes++, this.status == c["default"].CONNECTED || this.status == c["default"].EXPIRED_RECONNECTED || this.status == c["default"].RECONNECTING ? this.status = c["default"].RECONNECTING : this.status = c["default"].CONNECTING, this.onConnecting();
        } }, { key: "onIoDisconnected", value: function() {
          this.status == c["default"].DISCONNECTING && (this.status = c["default"].DISCONNECTED, this.notify(this.disconnectedObservers)), this.notify(this.disconnectedObservers);
        } }, { key: "onAuthorizeSuccess", value: function(e4) {
          (this.anonymous === true && e4.u && (y.AnonymousUserIdRepository.put(e4.u), this.userId = e4.u), this.status === c["default"].RECONNECTING) ? this.sid !== e4.sid ? (this.status = c["default"].EXPIRED_RECONNECTED, this.notify(this.expiredReconnectedObservers)) : this.status = c["default"].RECONNECTED : (this.status = c["default"].CONNECTED, this.sid = e4.sid);
          e4.enablePublish && (this.permissions.find(function(e5) {
            return e5 == u["default"].WRITE;
          }) || this.permissions.push(u["default"].WRITE)), e4.enableSubscribe && (this.permissions.find(function(e5) {
            return e5 == u["default"].READ;
          }) || this.permissions.push(u["default"].READ)), this.reconnectingTimes = 0, this.notify(this.connectedObservers);
        } }, { key: "onAuthorizeFailed", value: function(e4) {
          this.ioSocket.disconnect(), this.status = c["default"].CONNECT_FAILED;
          var t4 = { code: e4.resultCode || 408, content: e4.content || "Host unreachable or timeout" };
          this.notify(this.connectFailedObservers, t4);
        } }, { key: "addConnectingObserver", value: function(e4) {
          f2.calibrator.isFunction(e4) && this.connectingObservers.push(e4);
        } }, { key: "addConnectFailedObserver", value: function(e4) {
          f2.calibrator.isFunction(e4) && this.connectFailedObservers.push(e4);
        } }, { key: "addExpiredReconnectedObserver", value: function(e4) {
          f2.calibrator.isFunction(e4) && this.expiredReconnectedObservers.push(e4);
        } }, { key: "addMessageObserver", value: function(e4, t4) {
          var n2 = this;
          this.ioSocket.io.on(e4, function(t5) {
            n2.notifyMessageObservers(e4, t5);
          }), this.messageObservers[e4] || (this.messageObservers[e4] = []), this.messageObservers[e4].push(new l["default"](t4));
        } }, { key: "notifyMessageObservers", value: function(e4, t4) {
          for (var n2 = this.messageObservers[e4], o3 = 0; o3 < n2.length; o3++)
            n2[o3].onMessage(e4, t4);
        } }]), t3;
      }();
      t2["default"] = b;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2, r = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), i = n(12), s = (o2 = i) && o2.__esModule ? o2 : { "default": o2 };
      var a = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.socket = null, this.socket = t3;
        }
        return r(e3, [{ key: "emit", value: function(e4) {
          this.socket.status !== s["default"].CONNECT_FAILED && this.socket.status !== s["default"].DISCONNECTED ? (e4.start(), this.doEmit(e4)) : e4.fail({ resultCode: "409", content: "Please connect first" });
        } }, { key: "doEmit", value: function(e4) {
          var t3 = this;
          if (e4.isTimeout())
            e4.fail({ resultCode: 408, content: "Host unreachable or timeout" });
          else if (this.socket.status !== s["default"].CONNECT_FAILED)
            if (this.authenticated())
              if (this.hasPermission(e4))
                if (this.socket.status === s["default"].CONNECTED || this.socket.status === s["default"].RECONNECTED || this.socket.status === s["default"].EXPIRED_RECONNECTED) {
                  if (!e4.complete) {
                    var n2 = setTimeout(function() {
                      t3.doEmit(e4);
                    }, e4.singleTimeout);
                    e4.unique && (e4.params.retried = e4.retried), this.socket.doEmit(e4.name, e4.params, function(t4) {
                      clearTimeout(n2), t4.resultCode === 200 || t4.code == 200 ? e4.success(t4) : e4.fail(t4);
                    }), e4.retried++;
                  }
                } else
                  setTimeout(function() {
                    t3.doEmit(e4);
                  }, 500);
              else
                e4.fail({ resultCode: 401, content: "No permission" });
            else
              setTimeout(function() {
                t3.doEmit(e4);
              }, 500);
          else
            e4.fail({ resultCode: 408, content: "Failed to connect GoEasy." });
        } }, { key: "hasPermission", value: function(e4) {
          return !!this.socket.permissions.find(function(t3) {
            return t3 === e4.permission;
          });
        } }, { key: "authenticated", value: function() {
          return this.socket.status === s["default"].CONNECTED || this.socket.status === s["default"].RECONNECTING || this.socket.status === s["default"].RECONNECTED || this.socket.status === s["default"].EXPIRED_RECONNECTED;
        } }]), e3;
      }();
      t2["default"] = a;
    }, function(e2, t2, n) {
      var o2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
        return typeof e3;
      } : function(e3) {
        return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
      }, r = n(69), i = n(26), s = n(43);
      n(9)("socket.io-client");
      e2.exports = t2 = u;
      var a = t2.managers = {};
      function u(e3, t3) {
        (e3 === void 0 ? "undefined" : o2(e3)) === "object" && (t3 = e3, e3 = void 0), t3 = t3 || {};
        var n2, i2 = r(e3), u2 = i2.source, c = i2.id, l = i2.path, f2 = a[c] && l in a[c].nsps;
        return t3.forceNew || t3["force new connection"] || t3.multiplex === false || f2 ? n2 = s(u2, t3) : (a[c] || (a[c] = s(u2, t3)), n2 = a[c]), i2.query && !t3.query && (t3.query = i2.query), n2.socket(i2.path, t3);
      }
      t2.protocol = i.protocol, t2.connect = u, t2.Manager = n(43), t2.Socket = n(49);
    }, function(e2, t2, n) {
      var o2 = n(41);
      n(9)("socket.io-client:url");
      e2.exports = function(e3, t3) {
        var n2 = e3;
        t3 = t3 || typeof location != "undefined" && location, e3 == null && (e3 = t3.protocol + "//" + t3.host);
        typeof e3 == "string" && (e3.charAt(0) === "/" && (e3 = e3.charAt(1) === "/" ? t3.protocol + e3 : t3.host + e3), /^(https?|wss?):\/\//.test(e3) || (e3 = t3 !== void 0 ? t3.protocol + "//" + e3 : "https://" + e3), n2 = o2(e3));
        n2.port || (/^(http|ws)$/.test(n2.protocol) ? n2.port = "80" : /^(http|ws)s$/.test(n2.protocol) && (n2.port = "443"));
        n2.path = n2.path || "/";
        var r = n2.host.indexOf(":") !== -1 ? "[" + n2.host + "]" : n2.host;
        return n2.id = n2.protocol + "://" + r + ":" + n2.port, n2.href = n2.protocol + "://" + r + (t3 && t3.port === n2.port ? "" : ":" + n2.port), n2;
      };
    }, function(e2, t2, n) {
      e2.exports = n(71), e2.exports.parser = n(14);
    }, function(e2, t2, n) {
      var o2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
        return typeof e3;
      } : function(e3) {
        return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
      }, r = n(44), i = n(13), s = (n(9)("engine.io-client:socket"), n(48)), a = n(14), u = n(41), c = n(24);
      function l(e3, t3) {
        if (!(this instanceof l))
          return new l(e3, t3);
        t3 = t3 || {}, e3 && (e3 === void 0 ? "undefined" : o2(e3)) === "object" && (t3 = e3, e3 = null), e3 ? (e3 = u(e3), t3.hostname = e3.host, t3.secure = e3.protocol === "https" || e3.protocol === "wss", t3.port = e3.port, e3.query && (t3.query = e3.query)) : t3.host && (t3.hostname = u(t3.host).host), this.secure = t3.secure != null ? t3.secure : typeof location != "undefined" && location.protocol === "https:", t3.hostname && !t3.port && (t3.port = this.secure ? "443" : "80"), this.agent = t3.agent || false, this.hostname = t3.hostname || (typeof location != "undefined" ? location.hostname : "localhost"), this.port = t3.port || (typeof location != "undefined" && location.port ? location.port : this.secure ? 443 : 80), this.query = t3.query || {}, typeof this.query == "string" && (this.query = c.decode(this.query)), this.upgrade = t3.upgrade !== false, this.path = (t3.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!t3.forceJSONP, this.jsonp = t3.jsonp !== false, this.forceBase64 = !!t3.forceBase64, this.enablesXDR = !!t3.enablesXDR, this.timestampParam = t3.timestampParam || "t", this.timestampRequests = t3.timestampRequests, this.transports = t3.transports || ["polling", "websocket"], this.transportOptions = t3.transportOptions || {}, this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = t3.policyPort || 843, this.rememberUpgrade = t3.rememberUpgrade || false, this.binaryType = null, this.onlyBinaryUpgrades = t3.onlyBinaryUpgrades, this.perMessageDeflate = t3.perMessageDeflate !== false && (t3.perMessageDeflate || {}), this.perMessageDeflate === true && (this.perMessageDeflate = {}), this.perMessageDeflate && this.perMessageDeflate.threshold == null && (this.perMessageDeflate.threshold = 1024), this.pfx = t3.pfx || null, this.key = t3.key || null, this.passphrase = t3.passphrase || null, this.cert = t3.cert || null, this.ca = t3.ca || null, this.ciphers = t3.ciphers || null, this.rejectUnauthorized = t3.rejectUnauthorized === void 0 || t3.rejectUnauthorized, this.forceNode = !!t3.forceNode, this.isReactNative = typeof navigator != "undefined" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative", (typeof self == "undefined" || this.isReactNative) && (t3.extraHeaders && Object.keys(t3.extraHeaders).length > 0 && (this.extraHeaders = t3.extraHeaders), t3.localAddress && (this.localAddress = t3.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, this.open();
      }
      e2.exports = l, l.priorWebsocketSuccess = false, i(l.prototype), l.protocol = a.protocol, l.Socket = l, l.Transport = n(29), l.transports = n(44), l.parser = n(14), l.prototype.createTransport = function(e3) {
        var t3 = function(e4) {
          var t4 = {};
          for (var n3 in e4)
            e4.hasOwnProperty(n3) && (t4[n3] = e4[n3]);
          return t4;
        }(this.query);
        t3.EIO = a.protocol, t3.transport = e3;
        var n2 = this.transportOptions[e3] || {};
        return this.id && (t3.sid = this.id), new r[e3]({ query: t3, socket: this, agent: n2.agent || this.agent, hostname: n2.hostname || this.hostname, port: n2.port || this.port, secure: n2.secure || this.secure, path: n2.path || this.path, forceJSONP: n2.forceJSONP || this.forceJSONP, jsonp: n2.jsonp || this.jsonp, forceBase64: n2.forceBase64 || this.forceBase64, enablesXDR: n2.enablesXDR || this.enablesXDR, timestampRequests: n2.timestampRequests || this.timestampRequests, timestampParam: n2.timestampParam || this.timestampParam, policyPort: n2.policyPort || this.policyPort, pfx: n2.pfx || this.pfx, key: n2.key || this.key, passphrase: n2.passphrase || this.passphrase, cert: n2.cert || this.cert, ca: n2.ca || this.ca, ciphers: n2.ciphers || this.ciphers, rejectUnauthorized: n2.rejectUnauthorized || this.rejectUnauthorized, perMessageDeflate: n2.perMessageDeflate || this.perMessageDeflate, extraHeaders: n2.extraHeaders || this.extraHeaders, forceNode: n2.forceNode || this.forceNode, localAddress: n2.localAddress || this.localAddress, requestTimeout: n2.requestTimeout || this.requestTimeout, protocols: n2.protocols || void 0, isReactNative: this.isReactNative });
      }, l.prototype.open = function() {
        var e3;
        if (this.rememberUpgrade && l.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1)
          e3 = "websocket";
        else {
          if (this.transports.length === 0) {
            var t3 = this;
            return void setTimeout(function() {
              t3.emit("error", "No transports available");
            }, 0);
          }
          e3 = this.transports[0];
        }
        this.readyState = "opening";
        try {
          e3 = this.createTransport(e3);
        } catch (n2) {
          return this.transports.shift(), void this.open();
        }
        e3.open(), this.setTransport(e3);
      }, l.prototype.setTransport = function(e3) {
        e3.name;
        var t3 = this;
        this.transport && (this.transport.name, this.transport.removeAllListeners()), this.transport = e3, e3.on("drain", function() {
          t3.onDrain();
        }).on("packet", function(e4) {
          t3.onPacket(e4);
        }).on("error", function(e4) {
          t3.onError(e4);
        }).on("close", function() {
          t3.onClose("transport close");
        });
      }, l.prototype.probe = function(e3) {
        var t3 = this.createTransport(e3, { probe: 1 }), n2 = false, o3 = this;
        function r2() {
          if (o3.onlyBinaryUpgrades) {
            var e4 = !this.supportsBinary && o3.transport.supportsBinary;
            n2 = n2 || e4;
          }
          n2 || (t3.send([{ type: "ping", data: "probe" }]), t3.once("packet", function(e5) {
            if (!n2)
              if (e5.type === "pong" && e5.data === "probe") {
                if (o3.upgrading = true, o3.emit("upgrading", t3), !t3)
                  return;
                l.priorWebsocketSuccess = t3.name === "websocket", o3.transport.name, o3.transport.pause(function() {
                  n2 || o3.readyState !== "closed" && (f2(), o3.setTransport(t3), t3.send([{ type: "upgrade" }]), o3.emit("upgrade", t3), t3 = null, o3.upgrading = false, o3.flush());
                });
              } else {
                var r3 = new Error("probe error");
                r3.transport = t3.name, o3.emit("upgradeError", r3);
              }
          }));
        }
        function i2() {
          n2 || (n2 = true, f2(), t3.close(), t3 = null);
        }
        function s2(e4) {
          var n3 = new Error("probe error: " + e4);
          n3.transport = t3.name, i2(), o3.emit("upgradeError", n3);
        }
        function a2() {
          s2("transport closed");
        }
        function u2() {
          s2("socket closed");
        }
        function c2(e4) {
          t3 && e4.name !== t3.name && (e4.name, t3.name, i2());
        }
        function f2() {
          t3.removeListener("open", r2), t3.removeListener("error", s2), t3.removeListener("close", a2), o3.removeListener("close", u2), o3.removeListener("upgrading", c2);
        }
        l.priorWebsocketSuccess = false, t3.once("open", r2), t3.once("error", s2), t3.once("close", a2), this.once("close", u2), this.once("upgrading", c2), t3.open();
      }, l.prototype.onOpen = function() {
        if (this.readyState = "open", l.priorWebsocketSuccess = this.transport.name === "websocket", this.emit("open"), this.flush(), this.readyState === "open" && this.upgrade && this.transport.pause)
          for (var e3 = 0, t3 = this.upgrades.length; e3 < t3; e3++)
            this.probe(this.upgrades[e3]);
      }, l.prototype.onPacket = function(e3) {
        if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing")
          switch (e3.type, e3.data, this.emit("packet", e3), this.emit("heartbeat"), e3.type) {
            case "open":
              this.onHandshake(JSON.parse(e3.data));
              break;
            case "pong":
              this.setPing(), this.emit("pong");
              break;
            case "error":
              var t3 = new Error("server error");
              t3.code = e3.data, this.onError(t3);
              break;
            case "message":
              this.emit("data", e3.data), this.emit("message", e3.data);
          }
        else
          this.readyState;
      }, l.prototype.onHandshake = function(e3) {
        this.emit("handshake", e3), this.id = e3.sid, this.transport.query.sid = e3.sid, this.upgrades = this.filterUpgrades(e3.upgrades), this.pingInterval = e3.pingInterval, this.pingTimeout = e3.pingTimeout, this.onOpen(), this.readyState !== "closed" && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat));
      }, l.prototype.onHeartbeat = function(e3) {
        clearTimeout(this.pingTimeoutTimer);
        var t3 = this;
        t3.pingTimeoutTimer = setTimeout(function() {
          t3.readyState !== "closed" && t3.onClose("ping timeout");
        }, e3 || t3.pingInterval + t3.pingTimeout);
      }, l.prototype.setPing = function() {
        var e3 = this;
        clearTimeout(e3.pingIntervalTimer), e3.pingIntervalTimer = setTimeout(function() {
          e3.pingTimeout, e3.ping(), e3.onHeartbeat(e3.pingTimeout);
        }, e3.pingInterval);
      }, l.prototype.ping = function() {
        var e3 = this;
        this.sendPacket("ping", function() {
          e3.emit("ping");
        });
      }, l.prototype.onDrain = function() {
        this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, this.writeBuffer.length === 0 ? this.emit("drain") : this.flush();
      }, l.prototype.flush = function() {
        this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length && (this.writeBuffer.length, this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"));
      }, l.prototype.write = l.prototype.send = function(e3, t3, n2) {
        return this.sendPacket("message", e3, t3, n2), this;
      }, l.prototype.sendPacket = function(e3, t3, n2, o3) {
        if (typeof t3 == "function" && (o3 = t3, t3 = void 0), typeof n2 == "function" && (o3 = n2, n2 = null), this.readyState !== "closing" && this.readyState !== "closed") {
          (n2 = n2 || {}).compress = n2.compress !== false;
          var r2 = { type: e3, data: t3, options: n2 };
          this.emit("packetCreate", r2), this.writeBuffer.push(r2), o3 && this.once("flush", o3), this.flush();
        }
      }, l.prototype.close = function() {
        if (this.readyState === "opening" || this.readyState === "open") {
          this.readyState = "closing";
          var e3 = this;
          this.writeBuffer.length ? this.once("drain", function() {
            this.upgrading ? o3() : t3();
          }) : this.upgrading ? o3() : t3();
        }
        function t3() {
          e3.onClose("forced close"), e3.transport.close();
        }
        function n2() {
          e3.removeListener("upgrade", n2), e3.removeListener("upgradeError", n2), t3();
        }
        function o3() {
          e3.once("upgrade", n2), e3.once("upgradeError", n2);
        }
        return this;
      }, l.prototype.onError = function(e3) {
        l.priorWebsocketSuccess = false, this.emit("error", e3), this.onClose("transport error", e3);
      }, l.prototype.onClose = function(e3, t3) {
        if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
          clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", e3, t3), this.writeBuffer = [], this.prevBufferLen = 0;
        }
      }, l.prototype.filterUpgrades = function(e3) {
        for (var t3 = [], n2 = 0, o3 = e3.length; n2 < o3; n2++)
          ~s(this.transports, e3[n2]) && t3.push(e3[n2]);
        return t3;
      };
    }, function(e2, t2, n) {
      (function(t3) {
        var o2 = n(73), r = n(30);
        e2.exports = l;
        var i, s = /\n/g, a = /\\n/g;
        function u() {
        }
        function c() {
          return typeof self != "undefined" ? self : typeof window != "undefined" ? window : t3 !== void 0 ? t3 : {};
        }
        function l(e3) {
          if (o2.call(this, e3), this.query = this.query || {}, !i) {
            var t4 = c();
            i = t4.___eio = t4.___eio || [];
          }
          this.index = i.length;
          var n2 = this;
          i.push(function(e4) {
            n2.onData(e4);
          }), this.query.j = this.index, typeof addEventListener == "function" && addEventListener("beforeunload", function() {
            n2.script && (n2.script.onerror = u);
          }, false);
        }
        r(l, o2), l.prototype.supportsBinary = false, l.prototype.doClose = function() {
          this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), o2.prototype.doClose.call(this);
        }, l.prototype.doPoll = function() {
          var e3 = this, t4 = document.createElement("script");
          this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t4.async = true, t4.src = this.uri(), t4.onerror = function(t5) {
            e3.onError("jsonp poll error", t5);
          };
          var n2 = document.getElementsByTagName("script")[0];
          n2 ? n2.parentNode.insertBefore(t4, n2) : (document.head || document.body).appendChild(t4), this.script = t4, typeof navigator != "undefined" && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
            var e4 = document.createElement("iframe");
            document.body.appendChild(e4), document.body.removeChild(e4);
          }, 100);
        }, l.prototype.doWrite = function(e3, t4) {
          var n2 = this;
          if (!this.form) {
            var o3, r2 = document.createElement("form"), i2 = document.createElement("textarea"), u2 = this.iframeId = "eio_iframe_" + this.index;
            r2.className = "socketio", r2.style.position = "absolute", r2.style.top = "-1000px", r2.style.left = "-1000px", r2.target = u2, r2.method = "POST", r2.setAttribute("accept-charset", "utf-8"), i2.name = "d", r2.appendChild(i2), document.body.appendChild(r2), this.form = r2, this.area = i2;
          }
          function c2() {
            l2(), t4();
          }
          function l2() {
            if (n2.iframe)
              try {
                n2.form.removeChild(n2.iframe);
              } catch (t5) {
                n2.onError("jsonp polling iframe removal error", t5);
              }
            try {
              var e4 = '<iframe src="javascript:0" name="' + n2.iframeId + '">';
              o3 = document.createElement(e4);
            } catch (t5) {
              (o3 = document.createElement("iframe")).name = n2.iframeId, o3.src = "javascript:0";
            }
            o3.id = n2.iframeId, n2.form.appendChild(o3), n2.iframe = o3;
          }
          this.form.action = this.uri(), l2(), e3 = e3.replace(a, "\\\n"), this.area.value = e3.replace(s, "\\n");
          try {
            this.form.submit();
          } catch (f2) {
          }
          this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
            n2.iframe.readyState === "complete" && c2();
          } : this.iframe.onload = c2;
        };
      }).call(this, n(28));
    }, function(e2, t2, n) {
      var o2 = n(29), r = n(24), i = n(14), s = n(30), a = n(47);
      n(9)("engine.io-client:polling");
      e2.exports = c;
      var u = new (n(81))({ xdomain: false }).responseType != null;
      function c(e3) {
        var t3 = e3 && e3.forceBase64;
        u && !t3 || (this.supportsBinary = false), o2.call(this, e3);
      }
      s(c, o2), c.prototype.name = "polling", c.prototype.doOpen = function() {
        this.poll();
      }, c.prototype.pause = function(e3) {
        var t3 = this;
        function n2() {
          t3.readyState = "paused", e3();
        }
        if (this.readyState = "pausing", this.polling || !this.writable) {
          var o3 = 0;
          this.polling && (o3++, this.once("pollComplete", function() {
            --o3 || n2();
          })), this.writable || (o3++, this.once("drain", function() {
            --o3 || n2();
          }));
        } else
          n2();
      }, c.prototype.poll = function() {
        this.polling = true, this.doPoll(), this.emit("poll");
      }, c.prototype.onData = function(e3) {
        var t3 = this;
        i.decodePayload(e3, this.socket.binaryType, function(e4, n2, o3) {
          if (t3.readyState === "opening" && t3.onOpen(), e4.type === "close")
            return t3.onClose(), false;
          t3.onPacket(e4);
        }), this.readyState !== "closed" && (this.polling = false, this.emit("pollComplete"), this.readyState === "open" ? this.poll() : this.readyState);
      }, c.prototype.doClose = function() {
        var e3 = this;
        function t3() {
          e3.write([{ type: "close" }]);
        }
        this.readyState === "open" ? t3() : this.once("open", t3);
      }, c.prototype.write = function(e3) {
        var t3 = this;
        this.writable = false;
        var n2 = function() {
          t3.writable = true, t3.emit("drain");
        };
        i.encodePayload(e3, this.supportsBinary, function(e4) {
          t3.doWrite(e4, n2);
        });
      }, c.prototype.uri = function() {
        var e3 = this.query || {}, t3 = this.secure ? "https" : "http", n2 = "";
        return this.timestampRequests !== false && (e3[this.timestampParam] = a()), this.supportsBinary || e3.sid || (e3.b64 = 1), e3 = r.encode(e3), this.port && (t3 === "https" && Number(this.port) !== 443 || t3 === "http" && Number(this.port) !== 80) && (n2 = ":" + this.port), e3.length && (e3 = "?" + e3), t3 + "://" + (this.hostname.indexOf(":") !== -1 ? "[" + this.hostname + "]" : this.hostname) + n2 + this.path + e3;
      };
    }, function(e2, t2, n) {
      e2.exports = Object.keys || function(e3) {
        var t3 = [], n2 = Object.prototype.hasOwnProperty;
        for (var o2 in e3)
          n2.call(e3, o2) && t3.push(o2);
        return t3;
      };
    }, function(e2, t2, n) {
      t2.byteLength = function(e3) {
        var t3 = c(e3), n2 = t3[0], o3 = t3[1];
        return 3 * (n2 + o3) / 4 - o3;
      }, t2.toByteArray = function(e3) {
        var t3, n2, o3 = c(e3), s2 = o3[0], a2 = o3[1], u2 = new i(function(e4, t4, n3) {
          return 3 * (t4 + n3) / 4 - n3;
        }(0, s2, a2)), l2 = 0, f2 = a2 > 0 ? s2 - 4 : s2;
        for (n2 = 0; n2 < f2; n2 += 4)
          t3 = r[e3.charCodeAt(n2)] << 18 | r[e3.charCodeAt(n2 + 1)] << 12 | r[e3.charCodeAt(n2 + 2)] << 6 | r[e3.charCodeAt(n2 + 3)], u2[l2++] = t3 >> 16 & 255, u2[l2++] = t3 >> 8 & 255, u2[l2++] = 255 & t3;
        a2 === 2 && (t3 = r[e3.charCodeAt(n2)] << 2 | r[e3.charCodeAt(n2 + 1)] >> 4, u2[l2++] = 255 & t3);
        a2 === 1 && (t3 = r[e3.charCodeAt(n2)] << 10 | r[e3.charCodeAt(n2 + 1)] << 4 | r[e3.charCodeAt(n2 + 2)] >> 2, u2[l2++] = t3 >> 8 & 255, u2[l2++] = 255 & t3);
        return u2;
      }, t2.fromByteArray = function(e3) {
        for (var t3, n2 = e3.length, r2 = n2 % 3, i2 = [], s2 = 0, a2 = n2 - r2; s2 < a2; s2 += 16383)
          i2.push(l(e3, s2, s2 + 16383 > a2 ? a2 : s2 + 16383));
        r2 === 1 ? (t3 = e3[n2 - 1], i2.push(o2[t3 >> 2] + o2[t3 << 4 & 63] + "==")) : r2 === 2 && (t3 = (e3[n2 - 2] << 8) + e3[n2 - 1], i2.push(o2[t3 >> 10] + o2[t3 >> 4 & 63] + o2[t3 << 2 & 63] + "="));
        return i2.join("");
      };
      for (var o2 = [], r = [], i = typeof Uint8Array != "undefined" ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, u = s.length; a < u; ++a)
        o2[a] = s[a], r[s.charCodeAt(a)] = a;
      function c(e3) {
        var t3 = e3.length;
        if (t3 % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var n2 = e3.indexOf("=");
        return n2 === -1 && (n2 = t3), [n2, n2 === t3 ? 0 : 4 - n2 % 4];
      }
      function l(e3, t3, n2) {
        for (var r2, i2, s2 = [], a2 = t3; a2 < n2; a2 += 3)
          r2 = (e3[a2] << 16 & 16711680) + (e3[a2 + 1] << 8 & 65280) + (255 & e3[a2 + 2]), s2.push(o2[(i2 = r2) >> 18 & 63] + o2[i2 >> 12 & 63] + o2[i2 >> 6 & 63] + o2[63 & i2]);
        return s2.join("");
      }
      r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63;
    }, function(e2, t2) {
      t2.read = function(e3, t3, n, o2, r) {
        var i, s, a = 8 * r - o2 - 1, u = (1 << a) - 1, c = u >> 1, l = -7, f2 = n ? r - 1 : 0, p2 = n ? -1 : 1, h = e3[t3 + f2];
        for (f2 += p2, i = h & (1 << -l) - 1, h >>= -l, l += a; l > 0; i = 256 * i + e3[t3 + f2], f2 += p2, l -= 8)
          ;
        for (s = i & (1 << -l) - 1, i >>= -l, l += o2; l > 0; s = 256 * s + e3[t3 + f2], f2 += p2, l -= 8)
          ;
        if (i === 0)
          i = 1 - c;
        else {
          if (i === u)
            return s ? NaN : (h ? -1 : 1) * Infinity;
          s += Math.pow(2, o2), i -= c;
        }
        return (h ? -1 : 1) * s * Math.pow(2, i - o2);
      }, t2.write = function(e3, t3, n, o2, r, i) {
        var s, a, u, c = 8 * i - r - 1, l = (1 << c) - 1, f2 = l >> 1, p2 = r === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, h = o2 ? 0 : i - 1, d = o2 ? 1 : -1, y = t3 < 0 || t3 === 0 && 1 / t3 < 0 ? 1 : 0;
        for (t3 = Math.abs(t3), isNaN(t3) || t3 === Infinity ? (a = isNaN(t3) ? 1 : 0, s = l) : (s = Math.floor(Math.log(t3) / Math.LN2), t3 * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (t3 += s + f2 >= 1 ? p2 / u : p2 * Math.pow(2, 1 - f2)) * u >= 2 && (s++, u /= 2), s + f2 >= l ? (a = 0, s = l) : s + f2 >= 1 ? (a = (t3 * u - 1) * Math.pow(2, r), s += f2) : (a = t3 * Math.pow(2, f2 - 1) * Math.pow(2, r), s = 0)); r >= 8; e3[n + h] = 255 & a, h += d, a /= 256, r -= 8)
          ;
        for (s = s << r | a, c += r; c > 0; e3[n + h] = 255 & s, h += d, s /= 256, c -= 8)
          ;
        e3[n + h - d] |= 128 * y;
      };
    }, function(e2, t2) {
      var n = {}.toString;
      e2.exports = Array.isArray || function(e3) {
        return n.call(e3) == "[object Array]";
      };
    }, function(e2, t2) {
      function n() {
      }
      e2.exports = function(e3, t3, o2) {
        var r = false;
        return o2 = o2 || n, i.count = e3, e3 === 0 ? t3() : i;
        function i(e4, n2) {
          if (i.count <= 0)
            throw new Error("after called too many times");
          --i.count, e4 ? (r = true, t3(e4), t3 = o2) : i.count !== 0 || r || t3(null, n2);
        }
      };
    }, function(e2, t2, n) {
      var o2, r, i, s = String.fromCharCode;
      function a(e3) {
        for (var t3, n2, o3 = [], r2 = 0, i2 = e3.length; r2 < i2; )
          (t3 = e3.charCodeAt(r2++)) >= 55296 && t3 <= 56319 && r2 < i2 ? (64512 & (n2 = e3.charCodeAt(r2++))) == 56320 ? o3.push(((1023 & t3) << 10) + (1023 & n2) + 65536) : (o3.push(t3), r2--) : o3.push(t3);
        return o3;
      }
      function u(e3, t3) {
        if (e3 >= 55296 && e3 <= 57343) {
          if (t3)
            throw Error("Lone surrogate U+" + e3.toString(16).toUpperCase() + " is not a scalar value");
          return false;
        }
        return true;
      }
      function c(e3, t3) {
        return s(e3 >> t3 & 63 | 128);
      }
      function l(e3, t3) {
        if ((4294967168 & e3) == 0)
          return s(e3);
        var n2 = "";
        return (4294965248 & e3) == 0 ? n2 = s(e3 >> 6 & 31 | 192) : (4294901760 & e3) == 0 ? (u(e3, t3) || (e3 = 65533), n2 = s(e3 >> 12 & 15 | 224), n2 += c(e3, 6)) : (4292870144 & e3) == 0 && (n2 = s(e3 >> 18 & 7 | 240), n2 += c(e3, 12), n2 += c(e3, 6)), n2 += s(63 & e3 | 128);
      }
      function f2() {
        if (i >= r)
          throw Error("Invalid byte index");
        var e3 = 255 & o2[i];
        if (i++, (192 & e3) == 128)
          return 63 & e3;
        throw Error("Invalid continuation byte");
      }
      function p2(e3) {
        var t3, n2;
        if (i > r)
          throw Error("Invalid byte index");
        if (i == r)
          return false;
        if (t3 = 255 & o2[i], i++, (128 & t3) == 0)
          return t3;
        if ((224 & t3) == 192) {
          if ((n2 = (31 & t3) << 6 | f2()) >= 128)
            return n2;
          throw Error("Invalid continuation byte");
        }
        if ((240 & t3) == 224) {
          if ((n2 = (15 & t3) << 12 | f2() << 6 | f2()) >= 2048)
            return u(n2, e3) ? n2 : 65533;
          throw Error("Invalid continuation byte");
        }
        if ((248 & t3) == 240 && (n2 = (7 & t3) << 18 | f2() << 12 | f2() << 6 | f2()) >= 65536 && n2 <= 1114111)
          return n2;
        throw Error("Invalid UTF-8 detected");
      }
      e2.exports = { version: "2.1.2", encode: function(e3, t3) {
        for (var n2 = (t3 = t3 || {}).strict !== false, o3 = a(e3), r2 = o3.length, i2 = -1, s2 = ""; ++i2 < r2; )
          s2 += l(o3[i2], n2);
        return s2;
      }, decode: function(e3, t3) {
        var n2 = (t3 = t3 || {}).strict !== false;
        o2 = a(e3), r = o2.length, i = 0;
        for (var u2, c2 = []; (u2 = p2(n2)) !== false; )
          c2.push(u2);
        return function(e4) {
          for (var t4, n3 = e4.length, o3 = -1, r2 = ""; ++o3 < n3; )
            (t4 = e4[o3]) > 65535 && (r2 += s((t4 -= 65536) >>> 10 & 1023 | 55296), t4 = 56320 | 1023 & t4), r2 += s(t4);
          return r2;
        }(c2);
      } };
    }, function(e2, t2) {
      var n = n !== void 0 ? n : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : typeof MSBlobBuilder != "undefined" ? MSBlobBuilder : typeof MozBlobBuilder != "undefined" && MozBlobBuilder, o2 = function() {
        try {
          return new Blob(["hi"]).size === 2;
        } catch (e3) {
          return false;
        }
      }(), r = o2 && function() {
        try {
          return new Blob([new Uint8Array([1, 2])]).size === 2;
        } catch (e3) {
          return false;
        }
      }(), i = n && n.prototype.append && n.prototype.getBlob;
      function s(e3) {
        return e3.map(function(e4) {
          if (e4.buffer instanceof ArrayBuffer) {
            var t3 = e4.buffer;
            if (e4.byteLength !== t3.byteLength) {
              var n2 = new Uint8Array(e4.byteLength);
              n2.set(new Uint8Array(t3, e4.byteOffset, e4.byteLength)), t3 = n2.buffer;
            }
            return t3;
          }
          return e4;
        });
      }
      function a(e3, t3) {
        t3 = t3 || {};
        var o3 = new n();
        return s(e3).forEach(function(e4) {
          o3.append(e4);
        }), t3.type ? o3.getBlob(t3.type) : o3.getBlob();
      }
      function u(e3, t3) {
        return new Blob(s(e3), t3 || {});
      }
      typeof Blob != "undefined" && (a.prototype = Blob.prototype, u.prototype = Blob.prototype), e2.exports = o2 ? r ? Blob : u : i ? a : void 0;
    }, function(e2, t2, n) {
      var o2 = n(82);
      e2.exports = function(e3) {
        var t3 = e3.xdomain, n2 = e3.xscheme, r = e3.enablesXDR;
        try {
          if (typeof XMLHttpRequest != "undefined" && (!t3 || o2))
            return new XMLHttpRequest();
        } catch (i) {
        }
        try {
          if (typeof XDomainRequest != "undefined" && !n2 && r)
            return new XDomainRequest();
        } catch (i) {
        }
        if (!t3)
          try {
            return new self[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
          } catch (i) {
          }
      };
    }, function(e2, t2) {
      try {
        e2.exports = typeof XMLHttpRequest != "undefined" && "withCredentials" in new XMLHttpRequest();
      } catch (n) {
        e2.exports = false;
      }
    }, function(e2, t2, n) {
      (function(t3) {
        var o2, r, i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        }, s = n(29), a = n(14), u = n(24), c = n(30), l = n(47);
        n(9)("engine.io-client:websocket");
        if (typeof index == "undefined" && typeof wx == "undefined" || typeof WebSocket != "undefined")
          if (typeof WebSocket != "undefined")
            o2 = WebSocket;
          else if (typeof self != "undefined")
            o2 = self.WebSocket || self.MozWebSocket;
          else
            try {
              r = n(84);
            } catch (h) {
            }
        var f2 = o2 || r;
        function p2(e3) {
          e3 && e3.forceBase64 && (this.supportsBinary = false), (typeof index == "undefined" && typeof wx == "undefined" || typeof WebSocket != "undefined") && (this.perMessageDeflate = e3.perMessageDeflate, this.usingBrowserWebSocket = o2 && !e3.forceNode, this.protocols = e3.protocols, this.usingBrowserWebSocket || (f2 = r)), s.call(this, e3);
        }
        (typeof index == "undefined" && typeof wx == "undefined" || typeof WebSocket != "undefined") && typeof GameGlobal == "undefined" || (f2 = function(e3) {
          var t4 = this;
          if (t4.onopen = function() {
          }, t4.onclose = function() {
          }, t4.onmessage = function(e4) {
          }, t4.onerror = function(e4) {
          }, (typeof tt == "undefined" ? "undefined" : i(tt)) === "object" && tt.getSystemInfo) {
            var n2 = tt.connectSocket({ url: e3 });
            t4.send = function(e4) {
              n2.send({ data: e4 });
            }, t4.close = function() {
              n2.close();
            }, n2.onOpen(function() {
              t4.onopen();
            }), n2.onError(function(e4) {
              t4.onerror(e4);
            }), n2.onMessage(function(e4) {
              t4.onmessage(e4);
            }), n2.onClose(function() {
              t4.onclose();
            });
          } else if (typeof index != "undefined") {
            var o3 = index.connectSocket({ url: e3, complete: function() {
            } });
            t4.send = function(e4) {
              o3.send({ data: e4 });
            }, t4.close = function() {
              o3.close();
            }, o3.onOpen(function(e4) {
              t4.onopen();
            }), o3.onError(function(e4) {
              t4.onerror(e4);
            }), o3.onMessage(function(e4) {
              t4.onmessage(e4);
            }), o3.onClose(function(e4) {
              t4.onclose();
            });
          } else {
            var r2 = wx.connectSocket({ url: e3 });
            t4.send = function(e4) {
              r2.send({ data: e4 });
            }, t4.close = function(e4) {
              r2.close({ code: 1e3 });
            }, r2.onOpen(function() {
              t4.onopen();
            }), r2.onError(function(e4) {
              t4.onerror(e4);
            }), r2.onMessage(function(e4) {
              t4.onmessage(e4);
            }), r2.onClose(function(e4) {
              t4.onclose(e4);
            });
          }
        }), e2.exports = p2, c(p2, s), p2.prototype.name = "websocket", p2.prototype.supportsBinary = false, p2.prototype.doOpen = function() {
          if (this.check()) {
            var e3, t4, n2 = this.uri();
            (typeof index == "undefined" && typeof wx == "undefined" || typeof WebSocket != "undefined") && (e3 = this.protocols), (t4 = typeof index == "undefined" && typeof wx == "undefined" || typeof WebSocket != "undefined" ? { agent: this.agent, perMessageDeflate: this.perMessageDeflate } : { agent: this.agent }).pfx = this.pfx, t4.key = this.key, t4.passphrase = this.passphrase, t4.cert = this.cert, t4.ca = this.ca, t4.ciphers = this.ciphers, t4.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (t4.headers = this.extraHeaders), this.localAddress && (t4.localAddress = this.localAddress);
            try {
              typeof index == "undefined" && typeof wx == "undefined" || typeof WebSocket != "undefined" ? this.ws = this.usingBrowserWebSocket && !this.isReactNative ? e3 ? new f2(n2, e3) : new f2(n2) : new f2(n2, e3, t4) : this.ws = new f2(n2);
            } catch (o3) {
              return this.emit("error", o3);
            }
            this.ws.binaryType === void 0 && (this.supportsBinary = false), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = true, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners();
          }
        }, p2.prototype.addEventListeners = function() {
          var e3 = this;
          this.ws.onopen = function() {
            e3.onOpen();
          }, this.ws.onclose = function() {
            e3.onClose();
          }, this.ws.onmessage = function(t4) {
            e3.onData(t4.data);
          }, this.ws.onerror = function(t4) {
            e3.onError("websocket error", t4);
          };
        }, p2.prototype.write = function(e3) {
          var n2 = this;
          this.writable = false;
          for (var o3 = e3.length, r2 = 0, i2 = o3; r2 < i2; r2++)
            !function(e4) {
              a.encodePacket(e4, n2.supportsBinary, function(r3) {
                if (typeof index == "undefined" && typeof wx == "undefined" || typeof WebSocket != "undefined") {
                  if (!n2.usingBrowserWebSocket) {
                    var i3 = {};
                    if (e4.options && (i3.compress = e4.options.compress), n2.perMessageDeflate)
                      (typeof r3 == "string" ? t3.byteLength(r3) : r3.length) < n2.perMessageDeflate.threshold && (i3.compress = false);
                  }
                  try {
                    n2.usingBrowserWebSocket ? n2.ws.send(r3) : n2.ws.send(r3, i3);
                  } catch (h) {
                  }
                } else
                  try {
                    n2.ws.send(r3);
                  } catch (h) {
                  }
                --o3 || s2();
              });
            }(e3[r2]);
          function s2() {
            n2.emit("flush"), setTimeout(function() {
              n2.writable = true, n2.emit("drain");
            }, 0);
          }
        }, p2.prototype.onClose = function() {
          s.prototype.onClose.call(this);
        }, p2.prototype.doClose = function() {
          typeof this.ws != "undefined" && this.ws.close();
        }, p2.prototype.uri = function() {
          var e3 = this.query || {}, t4 = this.secure ? "wss" : "ws", n2 = "";
          return this.port && (t4 === "wss" && Number(this.port) !== 443 || t4 === "ws" && Number(this.port) !== 80) && (n2 = ":" + this.port), this.timestampRequests && (e3[this.timestampParam] = l()), this.supportsBinary || (e3.b64 = 1), (e3 = u.encode(e3)).length && (e3 = "?" + e3), t4 + "://" + (this.hostname.indexOf(":") !== -1 ? "[" + this.hostname + "]" : this.hostname) + n2 + this.path + e3;
        }, p2.prototype.check = function() {
          return !(!f2 || "__initialize" in f2 && this.name === p2.prototype.name);
        };
      }).call(this, n(46).Buffer);
    }, function(e2, t2) {
    }, function(e2, t2) {
      e2.exports = function(e3, t3) {
        for (var n = [], o2 = (t3 = t3 || 0) || 0; o2 < e3.length; o2++)
          n[o2 - t3] = e3[o2];
        return n;
      };
    }, function(e2, t2) {
      function n(e3) {
        e3 = e3 || {}, this.ms = e3.min || 100, this.max = e3.max || 1e4, this.factor = e3.factor || 2, this.jitter = e3.jitter > 0 && e3.jitter <= 1 ? e3.jitter : 0, this.attempts = 0;
      }
      e2.exports = n, n.prototype.duration = function() {
        var e3 = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var t3 = Math.random(), n2 = Math.floor(t3 * this.jitter * e3);
          e3 = (1 & Math.floor(10 * t3)) == 0 ? e3 - n2 : e3 + n2;
        }
        return 0 | Math.min(e3, this.max);
      }, n.prototype.reset = function() {
        this.attempts = 0;
      }, n.prototype.setMin = function(e3) {
        this.ms = e3;
      }, n.prototype.setMax = function(e3) {
        this.max = e3;
      }, n.prototype.setJitter = function(e3) {
        this.jitter = e3;
      };
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2["default"] = { maxNumber: 5 };
    }, function(e2, t2, n) {
      var o2 = this && this.__values || function(e3) {
        var t3 = typeof Symbol == "function" && Symbol.iterator, n2 = t3 && e3[t3], o3 = 0;
        if (n2)
          return n2.call(e3);
        if (e3 && typeof e3.length == "number")
          return { next: function() {
            return e3 && o3 >= e3.length && (e3 = void 0), { value: e3 && e3[o3++], done: !e3 };
          } };
        throw new TypeError(t3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      t2.__esModule = true, t2.Cookie = void 0;
      var r = function() {
        function e3() {
        }
        return e3.get = function(e4) {
          var t3, n2, r2 = encodeURIComponent(e4) + "=", i = document.cookie.split("; ");
          try {
            for (var s = o2(i), a = s.next(); !a.done; a = s.next()) {
              var u = a.value;
              if (u.startsWith(r2))
                return decodeURIComponent(u.substring(r2.length));
            }
          } catch (c) {
            t3 = { error: c };
          } finally {
            try {
              a && !a.done && (n2 = s["return"]) && n2.call(s);
            } finally {
              if (t3)
                throw t3.error;
            }
          }
          return null;
        }, e3.set = function(e4, t3, n2, o3, r2, i) {
          r2 === void 0 && (r2 = "/"), i === void 0 && (i = false);
          var s = encodeURIComponent(e4) + "=" + encodeURIComponent(t3);
          n2 instanceof Date && (s += "; expires=" + n2.toGMTString()), r2 && (s += "; path=" + r2), o3 && (s += "; domain=" + o3), i && (s += "; secure"), document.cookie = s;
        }, e3.remove = function(t3, n2, o3, r2) {
          o3 === void 0 && (o3 = "/"), r2 === void 0 && (r2 = false), e3.set(t3, "", new Date(0), n2, o3, r2);
        }, e3;
      }();
      t2.Cookie = r;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.UUID = void 0;
      var o2, r = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), i = n(90), s = (o2 = i) && o2.__esModule ? o2 : { "default": o2 };
      var a = function() {
        function e3() {
          !function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3);
        }
        return r(e3, null, [{ key: "get", value: function() {
          return (0, s["default"])().replace(/-/g, "");
        } }]), e3;
      }();
      t2.UUID = a;
    }, function(e2, t2, n) {
      var o2, r, i = n(91), s = n(92), a = 0, u = 0;
      e2.exports = function(e3, t3, n2) {
        var c = t3 && n2 || 0, l = t3 || [], f2 = (e3 = e3 || {}).node || o2, p2 = e3.clockseq !== void 0 ? e3.clockseq : r;
        if (f2 == null || p2 == null) {
          var h = i();
          f2 == null && (f2 = o2 = [1 | h[0], h[1], h[2], h[3], h[4], h[5]]), p2 == null && (p2 = r = 16383 & (h[6] << 8 | h[7]));
        }
        var d = e3.msecs !== void 0 ? e3.msecs : new Date().getTime(), y = e3.nsecs !== void 0 ? e3.nsecs : u + 1, m = d - a + (y - u) / 1e4;
        if (m < 0 && e3.clockseq === void 0 && (p2 = p2 + 1 & 16383), (m < 0 || d > a) && e3.nsecs === void 0 && (y = 0), y >= 1e4)
          throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        a = d, u = y, r = p2;
        var v = (1e4 * (268435455 & (d += 122192928e5)) + y) % 4294967296;
        l[c++] = v >>> 24 & 255, l[c++] = v >>> 16 & 255, l[c++] = v >>> 8 & 255, l[c++] = 255 & v;
        var g = d / 4294967296 * 1e4 & 268435455;
        l[c++] = g >>> 8 & 255, l[c++] = 255 & g, l[c++] = g >>> 24 & 15 | 16, l[c++] = g >>> 16 & 255, l[c++] = p2 >>> 8 | 128, l[c++] = 255 & p2;
        for (var b = 0; b < 6; ++b)
          l[c + b] = f2[b];
        return t3 || s(l);
      };
    }, function(e2, t2) {
      var n = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
      if (n) {
        var o2 = new Uint8Array(16);
        e2.exports = function() {
          return n(o2), o2;
        };
      } else {
        var r = new Array(16);
        e2.exports = function() {
          for (var e3, t3 = 0; t3 < 16; t3++)
            (3 & t3) == 0 && (e3 = 4294967296 * Math.random()), r[t3] = e3 >>> ((3 & t3) << 3) & 255;
          return r;
        };
      }
    }, function(e2, t2) {
      for (var n = [], o2 = 0; o2 < 256; ++o2)
        n[o2] = (o2 + 256).toString(16).substr(1);
      e2.exports = function(e3, t3) {
        var o3 = t3 || 0, r = n;
        return [r[e3[o3++]], r[e3[o3++]], r[e3[o3++]], r[e3[o3++]], "-", r[e3[o3++]], r[e3[o3++]], "-", r[e3[o3++]], r[e3[o3++]], "-", r[e3[o3++]], r[e3[o3++]], "-", r[e3[o3++]], r[e3[o3++]], r[e3[o3++]], r[e3[o3++]], r[e3[o3++]], r[e3[o3++]]].join("");
      };
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }();
      var r = new (function(e3) {
        function t3() {
          return function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, t3), function(e4, t4) {
            if (!e4)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t4 || typeof t4 != "object" && typeof t4 != "function" ? e4 : t4;
          }(this, (t3.__proto__ || Object.getPrototypeOf(t3)).apply(this, arguments));
        }
        return function(e4, t4) {
          if (typeof t4 != "function" && t4 !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t4);
          e4.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e4, enumerable: false, writable: true, configurable: true } }), t4 && (Object.setPrototypeOf ? Object.setPrototypeOf(e4, t4) : e4.__proto__ = t4);
        }(t3, Array), o2(t3, [{ key: "deleteByKey", value: function(e4, t4, n2) {
          var o3 = e4.findIndex(function(e5) {
            return e5[t4] == n2;
          });
          o3 > -1 && e4.splice(o3, 1);
        } }, { key: "unshiftGuid", value: function(e4) {
          var t4 = false, n2 = this.findIndex(function(t5) {
            return t5 == e4;
          });
          for (n2 > -1 && (t4 = true, this.splice(n2, 1)), this.unshift(e4); this.length > 300; )
            this.pop();
          return t4;
        } }]), t3;
      }())();
      t2.goEasyArray = r;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = s(n(40)), i = s(n(12));
      function s(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var a = function(e3) {
        function t3(e4) {
          !function(e5, t4) {
            if (!(e5 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, t3);
          var n2 = function(e5, t4) {
            if (!e5)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t4 || typeof t4 != "object" && typeof t4 != "function" ? e5 : t4;
          }(this, (t3.__proto__ || Object.getPrototypeOf(t3)).call(this));
          return n2.reconnectingObservers = [], n2.addReconnectingObserver(e4.onReconnecting), n2.addDisconnectedObserver(e4.onDisconnected), n2;
        }
        return function(e4, t4) {
          if (typeof t4 != "function" && t4 !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t4);
          e4.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e4, enumerable: false, writable: true, configurable: true } }), t4 && (Object.setPrototypeOf ? Object.setPrototypeOf(e4, t4) : e4.__proto__ = t4);
        }(t3, r["default"]), o2(t3, [{ key: "connect", value: function(e4) {
          (function n2(e5, t4, o3) {
            e5 === null && (e5 = Function.prototype);
            var r2 = Object.getOwnPropertyDescriptor(e5, t4);
            if (r2 === void 0) {
              var i2 = Object.getPrototypeOf(e5);
              return i2 === null ? void 0 : n2(i2, t4, o3);
            }
            if ("value" in r2)
              return r2.value;
            var s2 = r2.get;
            return s2 === void 0 ? void 0 : s2.call(o3);
          })(t3.prototype.__proto__ || Object.getPrototypeOf(t3.prototype), "connect", this).call(this), this.io = this.io.connect(e4.uri, e4.opts), this.initListener();
        } }, { key: "doEmit", value: function(e4, t4, n2) {
          this.io.emit(e4, t4, n2);
        } }, { key: "initListener", value: function() {
          var e4 = this;
          this.io.on("reconnecting", function(t4) {
            e4.status = i["default"].CONNECTING, e4.notify(e4.reconnectingObservers, t4);
          }), this.io.on("connect", function() {
            e4.status = i["default"].CONNECTED, e4.notify(e4.connectedObservers);
          }), this.io.on("disconnect", function() {
            e4.status = i["default"].DISCONNECTED, e4.notify(e4.disconnectedObservers);
          }), this.io.on("connect_error", function(e5) {
          });
        } }, { key: "addReconnectingObserver", value: function(e4) {
          this.reconnectingObservers.push(e4);
        } }]), t3;
      }();
      t2["default"] = a;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = n(0);
      var i = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.callback = r.noop, this.guidList = [], this.callback = t3;
        }
        return o2(e3, [{ key: "onMessage", value: function(e4, t3) {
          if (typeof t3 == "string" && (t3 = JSON.parse(t3)), t3.i) {
            if (this.guidList.findIndex(function(e5) {
              return e5 === t3.i;
            }) > -1)
              return;
            this.guidList.unshift(t3.i), this.guidList.length > 300 && this.guidList.pop();
          }
          this.callback(t3);
        } }]), e3;
      }();
      t2["default"] = i;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.AnonymousUserIdRepository = void 0;
      var o2 = n(0), r = n(53), i = function() {
        function e3() {
        }
        return e3.get = function() {
          var t3 = e3.storage;
          if (t3 !== null) {
            var n2 = t3.get(e3.ANONYMOUS_USER_ID_KEY);
            if (!o2.calibrator.isEmpty(n2))
              return n2.toString();
          }
          return null;
        }, e3.put = function(t3) {
          var n2 = e3.storage;
          n2 !== null && n2.put(e3.ANONYMOUS_USER_ID_KEY, t3.toString());
        }, e3.storage = r.LocalStorageDispatcher.localStorage(), e3.ANONYMOUS_USER_ID_KEY = "goeasy-anonymous-user-id", e3;
      }();
      t2.AnonymousUserIdRepository = i;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.clientInfo = void 0;
      var o2 = n(23), r = n(18), i = new (function() {
        function e3() {
          this.platform = o2.PlatformDetector.currentPlatform(), this.framework = r.FrameworkDetector.currentFramework(), this.z = this.toZ();
        }
        return e3.prototype.toZ = function() {
          for (var e4 = JSON.stringify({ platform: this.platform, framework: this.framework }), t3 = "", n2 = 0; n2 < e4.length; n2++) {
            var o3 = e4.charCodeAt(n2);
            t3 += String.fromCharCode(o3 + 5);
          }
          return t3;
        }, e3;
      }())();
      t2.clientInfo = i;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.ModuleTypes = void 0, t2.ModuleTypes = { IM: "IM", PUBSUB: "PUBSUB" };
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.fileUploader = void 0;
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = n(100), i = n(101), s = n(102), a = n(18);
      function u(e3, t3, n2) {
        return t3 in e3 ? Object.defineProperty(e3, t3, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t3] = n2, e3;
      }
      var c = new (function() {
        function e3() {
          var t3;
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.uploader = (u(t3 = {}, a.Framework.UNIAPP, r.uniAppFileUploader), u(t3, a.Framework.NATIVE_APPLET_WX, i.wxFileUploader), u(t3, a.Framework.UNKNOWN, s.htmlFileUploader), t3);
        }
        return o2(e3, [{ key: "upload", value: function(e4, t3) {
          var n2 = a.FrameworkDetector.currentFramework();
          return this.uploader[n2].upload(e4, t3);
        } }]), e3;
      }())();
      t2.fileUploader = c;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.uniAppFileUploader = void 0;
      var o2, r = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), i = n(32), s = (o2 = i) && o2.__esModule ? o2 : { "default": o2 };
      var a = new (function(e3) {
        function t3() {
          return function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, t3), function(e4, t4) {
            if (!e4)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t4 || typeof t4 != "object" && typeof t4 != "function" ? e4 : t4;
          }(this, (t3.__proto__ || Object.getPrototypeOf(t3)).call(this));
        }
        return function(e4, t4) {
          if (typeof t4 != "function" && t4 !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t4);
          e4.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e4, enumerable: false, writable: true, configurable: true } }), t4 && (Object.setPrototypeOf ? Object.setPrototypeOf(e4, t4) : e4.__proto__ = t4);
        }(t3, s["default"]), r(t3, [{ key: "upload", value: function(e4, t4) {
          var n2 = this;
          try {
            return new Promise(function(o3, r2) {
              index.uploadFile({ url: e4.host, filePath: n2.getTempFilePath(e4), name: "file", formData: e4.parameters, success: function(t5) {
                if (t5.statusCode === 200) {
                  var n3 = e4.payload;
                  n3.message = t5.errMsg, o3({ code: 200, content: n3 });
                } else
                  r2({ code: t5.statusCode, content: t5.errMsg });
              }, fail: function(e5) {
                r2({ code: 500, content: e5.errMsg });
              } }).onProgressUpdate(function(e5) {
                t4 && t4(e5);
              });
            });
          } catch (o3) {
            return new Promise(function(e5, t5) {
              t5({ code: 500, content: o3 });
            });
          }
        } }, { key: "getTempFilePath", value: function(e4) {
          var t4 = e4.file;
          return t4.tempFilePath || t4.fullPath || t4.path;
        } }]), t3;
      }())();
      t2.uniAppFileUploader = a;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.wxFileUploader = void 0;
      var o2, r = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), i = n(32), s = (o2 = i) && o2.__esModule ? o2 : { "default": o2 };
      var a = new (function(e3) {
        function t3() {
          return function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, t3), function(e4, t4) {
            if (!e4)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t4 || typeof t4 != "object" && typeof t4 != "function" ? e4 : t4;
          }(this, (t3.__proto__ || Object.getPrototypeOf(t3)).apply(this, arguments));
        }
        return function(e4, t4) {
          if (typeof t4 != "function" && t4 !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t4);
          e4.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e4, enumerable: false, writable: true, configurable: true } }), t4 && (Object.setPrototypeOf ? Object.setPrototypeOf(e4, t4) : e4.__proto__ = t4);
        }(t3, s["default"]), r(t3, [{ key: "upload", value: function(e4, t4) {
          var n2 = this;
          try {
            return new Promise(function(o3, r2) {
              wx.uploadFile({ url: e4.host, filePath: n2.getTempFilePath(e4), name: "file", formData: e4.parameters, success: function(t5) {
                if (t5.statusCode === 200) {
                  var n3 = e4.payload;
                  n3.message = t5.errMsg, o3({ code: 200, content: n3 });
                } else
                  r2({ code: t5.statusCode, content: t5.errMsg });
              }, fail: function(e5) {
                r2({ code: 500, content: e5.errMsg });
              } }).onProgressUpdate(function(e5) {
                t4 && t4(e5);
              });
            });
          } catch (o3) {
            return new Promise(function(e5, t5) {
              t5({ code: 500, content: o3 });
            });
          }
        } }, { key: "getTempFilePath", value: function(e4) {
          var t4 = e4.file || e4.fileRes;
          return t4.path || t4.tempFilePath;
        } }]), t3;
      }())();
      t2.wxFileUploader = a;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.htmlFileUploader = void 0;
      var o2, r = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), i = n(32), s = (o2 = i) && o2.__esModule ? o2 : { "default": o2 };
      var a = new (function(e3) {
        function t3() {
          return function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, t3), function(e4, t4) {
            if (!e4)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t4 || typeof t4 != "object" && typeof t4 != "function" ? e4 : t4;
          }(this, (t3.__proto__ || Object.getPrototypeOf(t3)).call(this));
        }
        return function(e4, t4) {
          if (typeof t4 != "function" && t4 !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t4);
          e4.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e4, enumerable: false, writable: true, configurable: true } }), t4 && (Object.setPrototypeOf ? Object.setPrototypeOf(e4, t4) : e4.__proto__ = t4);
        }(t3, s["default"]), r(t3, [{ key: "upload", value: function(e4, t4) {
          try {
            return new Promise(function(n2, o3) {
              var r2 = new XMLHttpRequest();
              for (var i2 in r2.open("post", e4.host, true), e4.headers)
                r2.setRequestHeader(i2, e4.headers[i2]);
              r2.upload.onprogress = function(e5) {
                t4 && t4(e5);
              }, r2.upload.onloadstart = function(e5) {
                t4 && t4(e5);
              }, r2.upload.onloadend = function(e5) {
                t4 && t4(e5);
              };
              var s2 = new FormData();
              for (var a2 in e4.parameters)
                a2 == "fileRes" ? s2.append("file", e4.parameters[a2]) : s2.append(a2, e4.parameters[a2]);
              r2.send(s2), r2.onreadystatechange = function() {
                if (r2.readyState == 4)
                  if (r2.status >= 200 && r2.status < 300 || r2.status == 304) {
                    var t5 = e4.payload;
                    t5.message = r2.responseText, n2({ code: 200, content: t5 });
                  } else
                    o3({ code: r2.status, content: r2.responseText });
              };
            });
          } catch (n2) {
            return new Promise(function(e5, t5) {
              t5({ code: 500, content: n2 });
            });
          }
        } }]), t3;
      }())();
      t2.htmlFileUploader = a;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = s(n(104)), i = s(n(108));
      function s(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var a = function() {
        function e3() {
          !function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.uploadTokenResolver = null, this.uploadTokenResolver = new i["default"]();
        }
        return o2(e3, [{ key: "build", value: function(e4, t3, n2) {
          var o3 = this;
          return new Promise(function(i2, s2) {
            o3.uploadTokenResolver.resolve(t3).then(function(t4) {
              var o4 = t4.content;
              i2(new r["default"](o4.vendor).build(o4, e4, n2));
            })["catch"](function(e5) {
              s2(e5);
            });
          });
        } }]), e3;
      }();
      t2["default"] = a;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = n(105), r = n(106), i = n(107);
      t2["default"] = function s(e3) {
        return function(e4, t3) {
          if (!(e4 instanceof t3))
            throw new TypeError("Cannot call a class as a function");
        }(this, s), e3 == o2.OssType.aliYun ? r.aliYunOSSRequestBuilder : i.qiNiuYunOSSRequestBuilder;
      };
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      t2.OssType = { aliYun: "ALI", qiNiu: "QN" };
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.aliYunOSSRequestBuilder = void 0;
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = a(n(55)), i = a(n(56)), s = n(19);
      function a(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var u = function(e3) {
        function t3() {
          return function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, t3), function(e4, t4) {
            if (!e4)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t4 || typeof t4 != "object" && typeof t4 != "function" ? e4 : t4;
          }(this, (t3.__proto__ || Object.getPrototypeOf(t3)).call(this));
        }
        return function(e4, t4) {
          if (typeof t4 != "function" && t4 !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t4);
          e4.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e4, enumerable: false, writable: true, configurable: true } }), t4 && (Object.setPrototypeOf ? Object.setPrototypeOf(e4, t4) : e4.__proto__ = t4);
        }(t3, i["default"]), o2(t3, [{ key: "url", value: function(e4) {
          return e4.host + "/" + e4.dir + "/" + this.newFileName(e4);
        } }, { key: "build", value: function(e4, t4, n2) {
          var o3 = { key: e4.dir + "/" + this.newFileName(e4), OSSAccessKeyId: e4.accessKeyId, policy: e4.policy, signature: e4.signature, success_action_status: "200", fileRes: t4 };
          s.MessageType.FILE === n2 && (o3 = { key: e4.dir + "/" + this.newFileName(e4), OSSAccessKeyId: e4.accessKeyId, policy: e4.policy, signature: e4.signature, success_action_status: "200", "Content-Disposition": "attachment;filename=" + t4.name, fileRes: t4 });
          var i2 = { newFileName: this.newFileName(e4), url: this.url(e4) };
          return new r["default"](e4.host, null, o3, t4, i2);
        } }]), t3;
      }();
      t2["default"] = u;
      var c = new u();
      t2.aliYunOSSRequestBuilder = c;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.qiNiuYunOSSRequestBuilder = void 0;
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = s(n(56)), i = s(n(55));
      function s(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var a = new (function(e3) {
        function t3() {
          return function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, t3), function(e4, t4) {
            if (!e4)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t4 || typeof t4 != "object" && typeof t4 != "function" ? e4 : t4;
          }(this, (t3.__proto__ || Object.getPrototypeOf(t3)).call(this));
        }
        return function(e4, t4) {
          if (typeof t4 != "function" && t4 !== null)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t4);
          e4.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e4, enumerable: false, writable: true, configurable: true } }), t4 && (Object.setPrototypeOf ? Object.setPrototypeOf(e4, t4) : e4.__proto__ = t4);
        }(t3, r["default"]), o2(t3, [{ key: "url", value: function(e4) {
          return e4.downloadUrl;
        } }, { key: "build", value: function(e4, t4) {
          var n2 = { key: this.newFileName(e4), token: e4.token, file: t4 }, o3 = { newFileName: this.newFileName(e4), url: this.url(e4) };
          return new i["default"](e4.host, null, n2, t4, o3);
        } }]), t3;
      }())();
      t2.qiNiuYunOSSRequestBuilder = a;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = u(n(3)), i = u(n(1)), s = n(4), a = n(6);
      function u(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var c = function() {
        function e3() {
          !function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3);
        }
        return o2(e3, [{ key: "resolve", value: function(e4) {
          return new Promise(function(t3, n2) {
            var o3 = new r["default"]({ name: "uploadToken", params: { filename: e4 }, permission: i["default"].WRITE, singleTimeout: s.SocketTimeout.commonRequestSingle, totalTimeout: s.SocketTimeout.commonRequestTotal, fail: function(e5) {
              n2(e5);
            }, success: function(e5) {
              e5.code === 200 ? t3(e5) : n2(e5);
            } });
            a.im._goEasySocket.emit(o3);
          });
        } }]), e3;
      }();
      t2["default"] = c;
    }, function(e2, t2, n) {
      t2.__esModule = true;
      var o2 = n(3), r = n(1), i = n(4), s = n(0), a = n(6), u = n(5), c = function() {
        function e3() {
        }
        return e3.prototype.subscribe = function(e4) {
          var t3 = e4.groupIds;
          return new Promise(function(n2, c2) {
            if (Array.isArray(t3) && t3.length != 0) {
              for (var l = 0; l < t3.length; l++) {
                if (!s.calibrator.isStringOrNumber(t3[l]))
                  return void c2({ code: 400, content: "TypeError: groups item require string or number." });
                s.calibrator.isNumber(t3[l]) && (t3[l] = t3[l].toString());
              }
              var f2 = new o2["default"]({ name: u.RocketTypes.subscribeGroups, params: { groupIds: t3, at: e4.accessToken }, permission: r["default"].WRITE, singleTimeout: i.SocketTimeout.commonInfiniteSingle, totalTimeout: i.SocketTimeout.commonInfiniteTotal, success: function() {
                n2({ code: 200, content: "ok" });
              }, fail: function(e5) {
                c2({ code: e5.resultCode || 408, content: e5.content || "Failed to subscribe group message" });
              } });
              a.im._goEasySocket.emit(f2);
            } else
              c2({ code: 400, content: "TypeError: groups require array." });
          });
        }, e3.prototype.unsubscribe = function(e4) {
          return new Promise(function(t3, n2) {
            if (s.calibrator.isStringOrNumber(e4)) {
              e4 = e4.toString();
              var c2 = new o2["default"]({ name: u.RocketTypes.unsubscribeGroup, params: { groupId: e4 }, permission: r["default"].READ, singleTimeout: i.SocketTimeout.commonRequestSingle, totalTimeout: i.SocketTimeout.commonRequestTotal, success: function() {
                t3({ code: 200, content: "ok" });
              }, fail: function(e5) {
                n2({ code: e5.resultCode || 408, content: e5.content || "Failed to unsubscribe group message" });
              } });
              a.im._goEasySocket.emit(c2);
            } else
              n2({ code: 400, content: "TypeError: channel require string or number." });
          });
        }, e3;
      }();
      t2["default"] = c;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = c(n(3)), i = c(n(1)), s = n(4), a = n(0), u = n(5);
      function c(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var l = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.im = null, this.im = t3;
        }
        return o2(e3, [{ key: "get", value: function(e4) {
          var t3 = this;
          return new Promise(function(n2, o3) {
            if (a.calibrator.isStringOrNumber(e4)) {
              a.calibrator.isNumber(e4) && (e4 = e4.toString());
              var c2 = new r["default"]({ name: u.RocketTypes.imGroupOnlineCount, params: { groupId: e4 }, permission: i["default"].READ, singleTimeout: s.SocketTimeout.commonQuerySingle, totalTimeout: s.SocketTimeout.commonQueryTotal, fail: function(e5) {
                o3(e5 || { code: 408, content: "Failed to query online group users" });
              }, success: function(e5) {
                e5.code == 200 ? n2(e5) : o3(e5);
              } });
              t3.im._goEasySocket.emit(c2);
            } else
              o3({ code: 400, content: "TypeError: groupId require string or number." });
          });
        } }]), e3;
      }();
      t2["default"] = l;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = f2(n(3)), i = f2(n(1)), s = n(4), a = n(0), u = n(5), c = n(15), l = n(16);
      function f2(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var p2 = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.im = null, this.im = t3, t3._goEasySocket.addMessageObserver(c.RemoteEvents.groupPresence, this.newMessageReceived.bind(this));
        }
        return o2(e3, [{ key: "presence", value: function(e4) {
          var t3 = this;
          return new Promise(function(n2, o3) {
            if (Array.isArray(e4) && e4.length != 0) {
              for (var r2 = 0; r2 < e4.length; r2++) {
                if (!a.calibrator.isStringOrNumber(e4[r2]))
                  return void o3({ code: 400, content: "TypeError: groupIds item require string or number." });
                if (a.calibrator.isNumber(e4[r2]) && (e4[r2] = e4[r2].toString()), e4[r2].length == 0)
                  return void o3({ code: 400, content: "TypeError: groupIds has empty item." });
              }
              var i2 = { groupIds: e4 };
              t3.emitRocket(u.RocketTypes.subscribeGroupPresence, i2, function() {
                n2({ code: 200, content: "ok" });
              }, function(e5) {
                o3({ code: e5.code || 408, content: e5.content || "Failed to subscribe group message" });
              }, s.SocketTimeout.commonInfiniteSingle, s.SocketTimeout.commonInfiniteTotal);
            } else
              o3({ code: 400, content: "TypeError: groupIds require array." });
          });
        } }, { key: "unPresence", value: function(e4) {
          var t3 = this;
          return new Promise(function(n2, o3) {
            if (a.calibrator.isStringOrNumber(e4)) {
              a.calibrator.isNumber(e4) && (e4 = e4.toString());
              var r2 = { groupId: e4 };
              t3.emitRocket(u.RocketTypes.unsubscribeGroupPresence, r2, function() {
                n2({ code: 200, content: "ok" });
              }, function(e5) {
                o3({ code: e5.code || 408, content: e5.content || "Failed to unsubscribe presence" });
              }, s.SocketTimeout.commonRequestSingle, s.SocketTimeout.commonRequestTotal);
            } else
              o3({ code: 400, content: "TypeError: groupId require string or number." });
          });
        } }, { key: "emitRocket", value: function(e4, t3, n2, o3, s2, a2) {
          var u2 = new r["default"]({ name: e4, params: t3, singleTimeout: s2, totalTimeout: a2, permission: i["default"].WRITE, success: n2, fail: o3 });
          this.im._goEasySocket.emit(u2);
        } }, { key: "newMessageReceived", value: function(e4) {
          var t3 = this, n2 = null;
          e4.c && (n2 = JSON.parse(e4.c)), n2 && n2.events && n2.events.map(function(e5) {
            var o3 = e5.userData ? JSON.parse(e5.userData) : {}, r2 = { time: e5.time, action: e5.action, groupOnlineCount: n2.userAmount, groupId: n2.groupId, id: e5.userId, data: o3 };
            t3.im._event.notify(l.ImApiEvents.GROUP_PRESENCE, r2);
          });
        } }]), e3;
      }();
      t2["default"] = p2;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = f2(n(3)), i = f2(n(1)), s = n(4), a = n(0), u = n(5), c = n(15), l = n(16);
      function f2(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var p2 = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.im = null, this.im = t3, this.im._goEasySocket.addMessageObserver(c.RemoteEvents.userPresence, this.newMessageReceived.bind(this));
        }
        return o2(e3, [{ key: "presence", value: function(e4) {
          var t3 = this;
          return new Promise(function(n2, o3) {
            if (Array.isArray(e4) && e4.length != 0) {
              for (var r2 = 0; r2 < e4.length; r2++) {
                if (!a.calibrator.isStringOrNumber(e4[r2]))
                  return void o3({ code: 400, content: "TypeError: userIds item require string or number." });
                if (a.calibrator.isNumber(e4[r2]) && (e4[r2] = e4[r2].toString()), e4[r2].length == 0)
                  return void o3({ code: 400, content: "TypeError: userIds has empty item." });
              }
              var i2 = { userIds: e4 };
              t3.emitRocket(u.RocketTypes.subscribeUserPresence, i2, function() {
                n2({ code: 200, content: "ok" });
              }, function(e5) {
                o3({ code: e5.code || 408, content: e5.content || "Failed to subscribe group message" });
              }, s.SocketTimeout.commonInfiniteSingle, s.SocketTimeout.commonInfiniteTotal);
            } else
              o3({ code: 400, content: "TypeError: userIds require array." });
          });
        } }, { key: "unPresence", value: function(e4) {
          var t3 = this;
          return new Promise(function(n2, o3) {
            if (a.calibrator.isStringOrNumber(e4)) {
              a.calibrator.isNumber(e4) && (e4 = e4.toString());
              var r2 = { userId: e4 };
              t3.emitRocket(u.RocketTypes.unsubscribeUserPresence, r2, function() {
                n2({ code: 200, content: "ok" });
              }, function(e5) {
                o3({ code: e5.code || 408, content: e5.content || "Failed to unsubscribe presence" });
              }, s.SocketTimeout.commonRequestSingle, s.SocketTimeout.commonRequestTotal);
            } else
              o3({ code: 400, content: "TypeError: id require string or number." });
          });
        } }, { key: "emitRocket", value: function(e4, t3, n2, o3, s2, a2) {
          var u2 = new r["default"]({ name: e4, params: t3, singleTimeout: s2, totalTimeout: a2, permission: i["default"].WRITE, success: n2, fail: o3 });
          this.im._goEasySocket.emit(u2);
        } }, { key: "newMessageReceived", value: function(e4) {
          var t3 = this, n2 = [];
          e4.c && (n2 = JSON.parse(e4.c).events || []), n2.map(function(e5) {
            var n3 = e5.userData ? JSON.parse(e5.userData) : {}, o3 = { time: e5.time, action: e5.action, id: e5.userId, data: n3 };
            t3.im._event.notify(l.ImApiEvents.USER_PRESENCE, o3);
          });
        } }]), e3;
      }();
      t2["default"] = p2;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = c(n(3)), i = c(n(1)), s = n(4), a = n(0), u = n(5);
      function c(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var l = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.im = null, this.im = t3;
        }
        return o2(e3, [{ key: "hereNow", value: function(e4) {
          var t3 = this;
          return new Promise(function(n2, o3) {
            if (e4.userIds && Array.isArray(e4.userIds) && e4.userIds.length != 0) {
              for (var c2 = 0; c2 < e4.userIds.length; c2++) {
                if (!a.calibrator.isStringOrNumber(e4.userIds[c2]))
                  return void o3({ code: 400, content: "TypeError: userIds item require string or number." });
                if (a.calibrator.isNumber(e4.userIds[c2]) && (e4.userIds[c2] = e4.userIds[c2].toString()), e4.userIds[c2].length == 0)
                  return void o3({ code: 400, content: "TypeError: userIds has empty item." });
              }
              var l2 = new r["default"]({ name: u.RocketTypes.imHereNow, params: e4, permission: i["default"].READ, singleTimeout: s.SocketTimeout.commonQuerySingle, totalTimeout: s.SocketTimeout.commonQueryTotal, fail: function(e5) {
                o3({ code: e5.resultCode || 408, content: e5.content || "Failed to query online users" });
              }, success: function(e5) {
                if (e5.code == 200) {
                  var t4 = e5.content;
                  e5.content = t4.map(function(e6) {
                    var t5 = e6.userData ? JSON.parse(e6.userData) : {};
                    return { id: e6.userId, data: t5 };
                  }), n2(e5);
                } else
                  o3(e5);
              } });
              t3.im._goEasySocket.emit(l2);
            } else
              o3({ code: 400, content: "TypeError: userIds require array." });
          });
        } }]), e3;
      }();
      t2["default"] = l;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = c(n(3)), i = c(n(1)), s = n(4), a = n(7), u = n(5);
      function c(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var l = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.im = null, this.im = t3;
        }
        return o2(e3, [{ key: "hereNow", value: function(e4) {
          var t3 = this;
          return new Promise(function(n2, o3) {
            if (a.calibrator.isStringOrNumber(e4)) {
              a.calibrator.isNumber(e4) && (e4 = e4.toString());
              var c2 = new r["default"]({ name: u.RocketTypes.imGroupHereNow, params: { groupId: e4 }, permission: i["default"].READ, singleTimeout: s.SocketTimeout.commonQuerySingle, totalTimeout: s.SocketTimeout.commonQueryTotal, fail: function(e5) {
                o3({ code: e5.resultCode || 408, content: e5.content || "Failed to query online group users" });
              }, success: function(e5) {
                if (e5.code == 200) {
                  var t4 = e5.content;
                  e5.content = t4.map(function(e6) {
                    var t5 = e6.userData ? JSON.parse(e6.userData) : {};
                    return { id: e6.userId, data: t5 };
                  }), n2(e5);
                } else
                  o3(e5);
              } });
              t3.im._goEasySocket.emit(c2);
            } else
              o3({ code: 400, content: "TypeError: groupId require string or number." });
          });
        } }]), e3;
      }();
      t2["default"] = l;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.str = void 0;
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = n(31);
      var i = new (function() {
        function e3() {
          !function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3);
        }
        return o2(e3, [{ key: "fileExtension", value: function(e4, t3) {
          if (r.calibrator.isString(e4))
            try {
              var n2 = e4.split(t3);
              return n2[n2.length - 1];
            } catch (o3) {
              throw Error(o3);
            }
        } }]), e3;
      }())();
      t2.str = i;
    }, function(e2, t2, n) {
      t2.__esModule = true;
      var o2 = n(20), r = n(10), i = n(57), s = n(33), a = n(15), u = function() {
        function e3(e4) {
          this.builder = new s.RemoteAbbrMessageBuilder(), this.im = e4, e4._goEasySocket.addMessageObserver(a.RemoteEvents.imMessage, this.onMessageReceived.bind(this));
        }
        return e3.prototype.onMessageReceived = function(e4) {
          var t3 = this.builder.build(e4);
          this.sendAck(t3), r.GoEasyEventCenter.fire(i.SocketEvents.IM_MESSAGE_RECEIVED, e4), r.GoEasyEventCenter.fire(o2.IM_INTERNAL_EVENTS.MESSAGE_RECEIVED, t3);
        }, e3.prototype.sendAck = function(e4) {
          this.im._goEasySocket.sendAck("imAck", { publishGuid: e4.messageId });
        }, e3;
      }();
      t2["default"] = u;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.EmitterEventDriver = void 0;
      var o2 = n(13), r = function() {
        function e3() {
          this.emitter = new o2();
        }
        return e3.prototype.on = function(e4, t3) {
          return this.emitter.on(e4, t3), this;
        }, e3.prototype.once = function(e4, t3) {
          return this.emitter.once(e4, t3), this;
        }, e3.prototype.off = function(e4, t3) {
          return this.emitter.off(e4, t3), this;
        }, e3.prototype.fire = function(e4, t3) {
          return this.emitter.emit(e4, t3), this;
        }, e3;
      }();
      t2.EmitterEventDriver = r;
    }, function(e2, t2, n) {
      t2.__esModule = true;
      var o2 = n(3), r = n(1), i = n(4), s = n(2), a = n(5), u = n(6), c = n(7), l = function() {
        function e3(e4) {
          this.userData = /* @__PURE__ */ new Map(), this.groupData = /* @__PURE__ */ new Map(), this.userData.set(e4.id, e4.data);
        }
        return e3.prototype.putData = function(e4, t3, n2) {
          n2 || (n2 = {}), e4 === s.Scene.PRIVATE ? this.userData.set(t3, n2) : this.groupData.set(t3, n2);
        }, e3.prototype.loadData = function(e4, t3) {
          var n2 = this;
          return new Promise(function(o3, r2) {
            var i2 = n2.loadLocalData(e4, t3);
            c.calibrator.isUndef(i2) ? n2.loadServerData(e4, t3).then(function(e5) {
              JSON.stringify(e5), o3(e5);
            })["catch"](function(e5) {
              r2(e5);
            }) : (JSON.stringify(i2), o3(i2));
          });
        }, e3.prototype.loadLocalData = function(e4, t3) {
          return s.Scene.PRIVATE === t3 ? this.userData.get(e4) : this.groupData.get(e4);
        }, e3.prototype.loadServerData = function(e4, t3) {
          var n2 = this;
          return new Promise(function(s2, c2) {
            var l2 = { targetId: e4, type: t3 }, f2 = new o2["default"]({ name: a.RocketTypes.imData, params: l2, permission: r["default"].READ, singleTimeout: i.SocketTimeout.commonQuerySingle, totalTimeout: i.SocketTimeout.commonQueryTotal, success: function(o3) {
              if (o3.code === 200) {
                var r2 = JSON.parse(o3.content);
                n2.putData(t3, e4, r2), s2(r2);
              } else
                c2(o3);
            }, fail: function(e5) {
              c2(e5);
            } });
            u.im._goEasySocket.emit(f2);
          });
        }, e3;
      }();
      t2["default"] = l;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.iMMessageBuilder = void 0;
      var o2 = n(18), r = n(120), i = n(35), s = n(121), a = n(122), u = n(124), c = n(125), l = n(38), f2 = n(126), p2 = n(127), h = n(128), d = n(39), y = n(129), m = n(130), v = n(131), g = n(133), b = n(6), E2 = n(7), _ = n(2), S = n(59), w = n(58), O = new (function() {
        function e3() {
          var e4;
          this.framework = o2.FrameworkDetector.currentFramework(), this.payloadBuilders = ((e4 = {})[o2.Framework.UNIAPP] = { image: new c["default"](), file: new l["default"](), audio: new f2["default"](), video: new p2["default"](), text: new a.TextPayloadBuilder() }, e4[o2.Framework.NATIVE_APPLET_WX] = { image: new r["default"](), file: new i["default"](), audio: new s["default"](), video: new u["default"](), text: new a.TextPayloadBuilder() }, e4[o2.Framework.UNKNOWN] = { image: new h["default"](), file: new d["default"](), audio: new y["default"](), video: new m["default"](), text: new a.TextPayloadBuilder() }, e4);
        }
        return e3.prototype.buildMessage = function(e4, t3) {
          var n2 = this.payloadBuilders[this.framework][e4], o3 = new g.LocalIMMessageBuildOptions(e4, t3);
          if (n2) {
            var r2 = n2.build(o3);
            o3.payload = r2;
          } else {
            r2 = new v.CustomPayloadBuilder().build(o3);
            o3.payload = r2.payload;
          }
          return this.build(o3);
        }, e3.prototype.build = function(e4) {
          var t3, n2 = e4.type, o3 = e4.payload, r2 = e4.createOptions, i2 = r2.to, s2 = r2.notification;
          return this.validate(s2), i2.type === _.Scene.GROUP ? ((t3 = new S.GroupMessage()).groupId = i2.id.toString(), t3.senderData = b.IM.userData) : i2.type === _.Scene.PRIVATE && ((t3 = new w.PrivateMessage()).read = false, t3.receiverId = i2.id.toString()), t3.senderId = b.IM.userId, t3.messageId = E2.UUID.get(), t3.payload = o3, t3.timestamp = Date.now(), t3.type = n2, t3.recalled = false, t3.status = _.MessageStatus.NEW, t3.buildOptions = e4, t3;
        }, e3.prototype.validate = function(e4) {
          if (E2.calibrator.isUndef(b.IM.userId))
            throw Error("Please call connect() first.");
          if (e4) {
            if (!E2.calibrator.isObject(e4))
              throw Error("notification require an object.");
            if (E2.calibrator.isEmpty(e4.title))
              throw Error("notification's title is empty.");
            if (E2.calibrator.isEmpty(e4.body))
              throw Error("notification's body is empty.");
            if (e4.title.length > 32)
              throw Error("notification's title over max length 32");
            if (e4.body.length > 50)
              throw Error("notification's body over max length 50");
          }
        }, e3;
      }())();
      t2.iMMessageBuilder = O;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = n(7), s = n(0), a = n(34), u = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new a.ImageMessagePayload();
        }, t3.prototype.setPayload = function(t4, n2) {
          e3.prototype.setPayload.call(this, t4, n2);
          var o3 = t4.createOptions.file, r2 = n2, a2 = o3.path || o3.tempFilePath, u2 = s.calibrator.isEmpty(o3.name) || o3.name === void 0 ? a2 : o3.name;
          r2.name = "wx-image." + i.str.fileExtension(u2, "."), r2.contentType = "image/" + i.str.fileExtension(u2, "."), r2.url = a2, r2.size = o3.size, t4.complete = new Promise(function(e4, t5) {
            wx.getImageInfo({ src: r2.url, success: function(t6) {
              r2.width = t6.width, r2.height = t6.height, e4();
            }, fail: function(e5) {
              t5(e5);
            } });
          });
        }, t3.prototype.validate = function(t4) {
          e3.prototype.validate.call(this, t4);
        }, t3;
      }(n(35)["default"]);
      t2["default"] = u;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = n(36), s = n(0), a = n(7), u = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new i.AudioMessagePayload();
        }, t3.prototype.setPayload = function(t4, n2) {
          e3.prototype.setPayload.call(this, t4, n2);
          var o3 = t4.createOptions.file, r2 = n2, i2 = o3.tempFilePath, u2 = s.calibrator.isEmpty(o3.name) || o3.name == void 0 ? i2 : o3.name, c = o3.duration, l = o3.fileSize;
          r2.url = i2, r2.size = l, r2.duration = c / 1e3, r2.name = "wx-audio." + a.str.fileExtension(u2, "."), r2.contentType = "audio/" + a.str.fileExtension(u2, "."), t4.complete = Promise.resolve();
        }, t3.prototype.validate = function(t4) {
          e3.prototype.validate.call(this, t4);
        }, t3;
      }(n(35)["default"]);
      t2["default"] = u;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true, t2.TextPayloadBuilder = void 0;
      var i = n(11), s = n(123), a = n(0), u = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new s.TextMessagePayload();
        }, t3.prototype.setPayload = function(e4, t4) {
          var n2 = t4, o3 = e4.createOptions;
          n2.text = o3.text, e4.complete = Promise.resolve();
        }, t3.prototype.validate = function(e4) {
          if (a.calibrator.isEmpty(e4.text))
            throw { code: 400, content: "text is empty" };
          if (!a.calibrator.isString(e4.text))
            throw { code: 400, content: "TypeError: text requires string." };
          if (e4.text.trim() === "")
            throw { code: 400, content: "text is empty" };
          if (e4.text.length > 2500)
            throw { code: 400, content: "Message text over max length 2500" };
        }, t3;
      }(i.AbstractPayloadBuilder);
      t2.TextPayloadBuilder = u;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true, t2.TextMessagePayload = void 0;
      var i = function(e3) {
        function t3() {
          var t4 = e3 !== null && e3.apply(this, arguments) || this;
          return t4.text = "", t4;
        }
        return r(t3, e3), t3;
      }(n(25).AbstractMessagePayload);
      t2.TextMessagePayload = i;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = n(37), s = n(0), a = n(7), u = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new i.VideoMessagePayload();
        }, t3.prototype.setPayload = function(e4, t4) {
          var n2 = e4.createOptions.file, o3 = t4, r2 = o3.video, i2 = o3.thumbnail, u2 = n2.duration, c = n2.height, l = n2.size, f2 = n2.tempFilePath, p2 = n2.thumbTempFilePath, h = n2.width, d = n2.name, y = d === void 0 ? "" : d, m = s.calibrator.isEmpty(y) ? f2 : y;
          r2.contentType = "video/" + a.str.fileExtension(m, "."), r2.name = "wx-video." + a.str.fileExtension(m, "."), r2.url = f2, r2.width = i2.width = h, r2.height = i2.height = c, r2.size = l, r2.duration = u2, i2.url = p2, i2.contentType = "image/jpg", i2.name = "wx-thumbnail.jpg", e4.complete = Promise.resolve();
        }, t3.prototype.validate = function(e4) {
          if (!s.calibrator.isObject(e4))
            throw Error("it is an empty message.");
          if (!s.calibrator.isDef(e4.file))
            throw Error("file is empty.");
        }, t3;
      }(n(11).AbstractPayloadBuilder);
      t2["default"] = u;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = n(7), s = n(0), a = n(34), u = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new a.ImageMessagePayload();
        }, t3.prototype.setPayload = function(e4, t4) {
          var n2 = t4, o3 = e4.createOptions.file;
          n2.url = o3.path, n2.size = o3.size;
          var r2 = s.calibrator.isEmpty(o3.name) || o3.name === void 0 ? o3.path : o3.name;
          n2.contentType = "image/" + i.str.fileExtension(r2, "."), n2.name = "uni-image." + i.str.fileExtension(r2, "."), e4.complete = new Promise(function(e5, t5) {
            index.getImageInfo({ src: o3.path, success: function(t6) {
              n2.width = t6.width, n2.height = t6.height, e5();
            }, fail: function(e6) {
              t5(e6);
            } });
          });
        }, t3.prototype.validate = function(t4) {
          e3.prototype.validate.call(this, t4);
        }, t3;
      }(n(38)["default"]);
      t2["default"] = u;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = n(0), s = n(7), a = n(36), u = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new a.AudioMessagePayload();
        }, t3.prototype.setPayload = function(e4, t4) {
          var n2 = e4.createOptions, o3 = t4, r2 = n2.file, a2 = r2.tempFilePath, u2 = i.calibrator.isEmpty(r2.name) || r2.name == void 0 ? a2 : r2.name;
          o3.url = a2, o3.name = "uni-audio." + s.str.fileExtension(u2, "."), o3.contentType = "audio/" + s.str.fileExtension(u2, "."), e4.complete = new Promise(function(e5, t5) {
            index.getFileInfo({ filePath: a2, success: function(r3) {
              var s2 = r3.size;
              if (o3.size = s2, s2 === 0)
                e5();
              else if (i.calibrator.isDef(n2.file.duration))
                o3.duration = n2.file.duration / 1e3, e5();
              else {
                var u3 = index.createInnerAudioContext();
                u3.src = a2, u3.onCanplay(function(n3) {
                  n3.errCode ? (u3.destroy(), t5(n3)) : (o3.duration = u3.duration, u3.destroy(), e5());
                }), u3.onError(function(n3) {
                  u3.destroy(), n3.errCode === -99 ? e5() : t5(n3);
                });
              }
            }, fail: function(e6) {
              t5(e6);
            } });
          });
        }, t3.prototype.validate = function(t4) {
          e3.prototype.validate.call(this, t4);
        }, t3;
      }(n(38)["default"]);
      t2["default"] = u;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = n(0), s = n(7), a = n(37), u = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new a.VideoMessagePayload();
        }, t3.prototype.setPayload = function(e4, t4) {
          var n2 = e4.createOptions.file, o3 = t4, r2 = o3.video, a2 = o3.thumbnail, u2 = n2.duration, c = n2.height, l = n2.size, f2 = n2.tempFilePath, p2 = n2.width, h = n2.name, d = h === void 0 ? "" : h, y = i.calibrator.isEmpty(d) ? f2 : d;
          r2.size = l, r2.width = p2, r2.height = c, r2.url = f2, r2.duration = u2, r2.contentType = "video/" + s.str.fileExtension(y, "."), r2.name = "uni-video." + s.str.fileExtension(y, "."), a2.url = f2, a2.width = p2, a2.height = c, a2.contentType = "image/jpg", a2.name = "uni-thumbnail.jpg", e4.complete = Promise.resolve();
        }, t3.prototype.validate = function(e4) {
          if (!i.calibrator.isObject(e4))
            throw Error("it is an empty message.");
          if (!i.calibrator.isDef(e4.file))
            throw Error("file is empty.");
        }, t3;
      }(n(11).AbstractPayloadBuilder);
      t2["default"] = u;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = n(34), s = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new i.ImageMessagePayload();
        }, t3.prototype.setPayload = function(t4, n2) {
          e3.prototype.setPayload.call(this, t4, n2);
          var o3 = t4.createOptions.file, r2 = n2, i2 = window.URL || window.webkitURL, s2 = new Image();
          s2.src = i2.createObjectURL(o3), t4.complete = new Promise(function(e4, t5) {
            s2.onload = function() {
              r2.width = s2.width, r2.height = s2.height, i2.revokeObjectURL(s2.src), e4();
            }, s2.onerror = function(e5) {
              i2.revokeObjectURL(s2.src), t5(e5);
            };
          });
        }, t3.prototype.validate = function(t4) {
          e3.prototype.validate.call(this, t4);
          var n2 = ["gif", "jpg", "png", "jpeg"];
          if (!n2.find(function(e4) {
            return e4 === t4.file.type.split("/")[1].toLowerCase();
          }))
            throw Error("Only " + n2.join(",") + " is supported image.");
        }, t3;
      }(n(39)["default"]);
      t2["default"] = s;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = n(36), s = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new i.AudioMessagePayload();
        }, t3.prototype.setPayload = function(t4, n2) {
          e3.prototype.setPayload.call(this, t4, n2);
          var o3 = t4.createOptions.file, r2 = n2, i2 = window.URL || window.webkitURL, s2 = document.createElement("audio");
          s2.src = i2.createObjectURL(o3), t4.complete = new Promise(function(e4, t5) {
            s2.onloadedmetadata = function() {
              r2.duration = s2.duration, i2.revokeObjectURL(s2.src), e4();
            }, s2.onerror = function(e5) {
              i2.revokeObjectURL(s2.src), t5(e5);
            };
          });
        }, t3.prototype.validate = function(t4) {
          e3.prototype.validate.call(this, t4);
          var n2 = ["mp3", "ogg", "wav", "wma", "ape", "acc", "mpeg"];
          if (!n2.find(function(e4) {
            return e4 === t4.file.type.split("/")[1].toLowerCase();
          }))
            throw Error("Only " + n2.join(",") + " is supported audio.");
        }, t3;
      }(n(39)["default"]);
      t2["default"] = s;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = n(37), s = n(11), a = n(7), u = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new i.VideoMessagePayload();
        }, t3.prototype.setPayload = function(e4, t4) {
          var n2 = this, o3 = e4.createOptions.file, r2 = t4, i2 = r2.video, s2 = r2.thumbnail, a2 = window.URL || window.webkitURL, u2 = document.createElement("video");
          u2.src = a2.createObjectURL(o3), i2.size = o3.size, i2.name = o3.name, i2.contentType = o3.type, i2.url = u2.src, s2.name = o3.name, s2.contentType = "image/jpg", e4.complete = new Promise(function(e5, t5) {
            u2.onloadedmetadata = function() {
              i2.duration = u2.duration, i2.width = u2.videoWidth, i2.height = u2.videoHeight, s2.width = u2.videoWidth, s2.height = u2.videoHeight, s2.url = n2.getThumbnailUrl(u2), a2.revokeObjectURL(u2.src), e5();
            }, u2.onerror = function(e6) {
              a2.revokeObjectURL(u2.src), t5(e6);
            };
          });
        }, t3.prototype.getThumbnailUrl = function(e4) {
          var t4 = document.createElement("canvas");
          return t4.width = e4.videoWidth, t4.height = e4.videoHeight, t4.getContext("2d").drawImage(e4, 0, 0, t4.width, t4.height), t4.toDataURL("image/png");
        }, t3.prototype.validate = function(e4) {
          if (!a.calibrator.isObject(e4))
            throw Error("it is an empty message.");
          if (!(e4.file instanceof File))
            throw Error("wrong file type.");
          if (e4.file.size == 0)
            throw Error("File size is 0.");
          if (e4.file.size > 31457280)
            throw Error("message-length limit 30mib");
          var t4 = ["avi", "mov", "rmvb", "rm", "flv", "mp4", "3gp", "quicktime"];
          if (!t4.find(function(t5) {
            return t5 === e4.file.type.split("/")[1].toLowerCase();
          }))
            throw Error("Only " + t4.join(",") + " is supported video.");
        }, t3;
      }(s.AbstractPayloadBuilder);
      t2["default"] = u;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true, t2.CustomPayloadBuilder = void 0;
      var i = n(11), s = n(132), a = n(0), u = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3.prototype.create = function() {
          return new s["default"]();
        }, t3.prototype.setPayload = function(e4, t4) {
          var n2 = e4.createOptions;
          t4.payload = n2.payload, e4.complete = Promise.resolve();
        }, t3.prototype.validate = function(e4) {
          var t4 = e4.type, n2 = e4.payload;
          if (a.calibrator.isEmpty(t4))
            throw Error("type is empty.");
          if (!a.calibrator.isString(t4))
            throw Error("type require a string");
          if (a.calibrator.isEmpty(n2))
            throw Error("payload is empty.");
          if (!a.calibrator.isPlainObject(n2) && !a.calibrator.isStringOrNumber(n2))
            throw Error("payload require object | string | number.");
        }, t3;
      }(i.AbstractPayloadBuilder);
      t2.CustomPayloadBuilder = u;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true;
      var i = function(e3) {
        function t3() {
          return e3 !== null && e3.apply(this, arguments) || this;
        }
        return r(t3, e3), t3;
      }(n(25).AbstractMessagePayload);
      t2["default"] = i;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.LocalIMMessageBuildOptions = void 0;
      var o2 = function() {
        return function(e3, t3) {
          this.type = e3, this.createOptions = t3;
        };
      }();
      t2.LocalIMMessageBuildOptions = o2;
    }, function(e2, t2, n) {
      t2.__esModule = true;
      var o2 = n(3), r = n(1), i = n(4), s = n(135), a = n(6), u = n(138), c = n(0), l = n(10), f2 = n(20), p2 = n(2), h = n(21), d = n(5), y = function() {
        function e3() {
          this.payloadImprover = new s.PayloadImprover();
        }
        return e3.prototype.send = function(e4) {
          var t3 = this;
          this.validate(e4);
          var n2 = e4.message, o3 = e4.accessToken, r2 = n2.buildOptions, i2 = r2.createOptions, s2 = i2.notification, u2 = i2.to;
          u2.data || (u2.data = {}), a.im._dataCache.putData(u2.type, u2.id.toString(), u2.data), n2.status = p2.MessageStatus.SENDING;
          var c2 = r2.complete, l2 = this.payloadImprover.improve(e4);
          Promise.all([c2, l2]).then(function() {
            t3.doSend(n2, u2, s2, o3, e4);
          })["catch"](function(t4) {
            n2.status = p2.MessageStatus.FAIL, e4.onFailed({ code: t4.code || 400, content: t4.content || t4 });
          });
        }, e3.prototype.doSend = function(e4, t3, n2, s2, c2) {
          var h2 = new u["default"](e4, t3, n2, s2);
          l.GoEasyEventCenter.fire(f2.IM_INTERNAL_EVENTS.MESSAGE_SENDING, e4);
          var y2 = new o2["default"]({ name: d.RocketTypes.publishIM, params: h2, unique: true, permission: r["default"].WRITE, singleTimeout: i.SocketTimeout.commonRequestSingle, totalTimeout: i.SocketTimeout.commonRequestTotal, fail: function(t4) {
            e4.status = p2.MessageStatus.FAIL, c2.onFailed({ code: t4.resultCode || 408, content: t4.content || "Failed to send message." });
          }, success: function(t4) {
            t4.resultCode == 200 ? (e4.status = p2.MessageStatus.SUCCESS, e4.timestamp = t4.content.timestamp, e4.clearUseLessAttribute(), l.GoEasyEventCenter.fire(f2.IM_INTERNAL_EVENTS.MESSAGE_SEND_SUCCESS, e4), c2.onSuccess(e4)) : (e4.status = p2.MessageStatus.FAIL, c2.onFailed(t4));
          } });
          a.im._goEasySocket.emit(y2);
        }, e3.prototype.validate = function(e4) {
          var t3 = e4.message, n2 = t3.buildOptions.createOptions;
          if (!(t3 instanceof h.AbstractMessage))
            throw new Error("it is invalid message");
          if (t3.status !== p2.MessageStatus.NEW)
            throw new Error("Please create a new message, a message can only be sent once");
          var o3 = n2.to;
          if (!o3)
            throw new Error("message require property to.");
          if (!o3.type || o3.type != p2.Scene.GROUP && o3.type != p2.Scene.PRIVATE)
            throw new Error("message require property to.type");
          if (c.calibrator.isEmpty(o3.id))
            throw new Error("message require property to.id");
          if (!c.calibrator.isStringOrNumber(o3.id))
            throw new Error("to.id should be a string or number.");
          if (a.IM.userId === o3.id)
            throw new Error("to.id can not be the same as your id.");
          if (o3.data && c.calibrator.isFunction(o3.data))
            throw new Error("to.data can not be function");
          var r2 = n2.notification;
          if (r2) {
            if (c.calibrator.isObject(r2)) {
              if (c.calibrator.isEmpty(r2.title))
                throw new Error("notification title is required");
              if (!c.calibrator.isString(r2.title))
                throw new Error("notification title must be string");
              if (c.calibrator.isEmpty(r2.body))
                throw new Error("notification body is required");
              if (!c.calibrator.isString(r2.body))
                throw new Error("notification body must be string");
            } else if (c.calibrator.isPrimitive(r2))
              throw new Error("notification must be an json object");
          }
        }, e3;
      }();
      t2["default"] = y;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.PayloadImprover = void 0;
      var o2 = n(60), r = n(137), i = n(19), s = function() {
        function e3() {
          var e4;
          this.improvers = ((e4 = {})[i.MessageType.FILE] = new o2.FileMessagePayloadImprover(), e4[i.MessageType.AUDIO] = new o2.FileMessagePayloadImprover(), e4[i.MessageType.IMAGE] = new o2.FileMessagePayloadImprover(), e4[i.MessageType.VIDEO] = new r.VideoMessagePayloadImprover(), e4);
        }
        return e3.prototype.improve = function(e4) {
          var t3 = this.improvers[e4.message.type];
          return t3 ? t3.improve(e4) : Promise.resolve();
        }, e3;
      }();
      t2.PayloadImprover = s;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.AbstractPayloadImprover = void 0;
      var o2 = function() {
        return function() {
        };
      }();
      t2.AbstractPayloadImprover = o2;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      });
      t2.__esModule = true, t2.VideoMessagePayloadImprover = void 0;
      var i = function(e3) {
        function t3() {
          return e3.call(this) || this;
        }
        return r(t3, e3), t3.prototype.setPayload = function(e4, t4) {
          e4.content;
          var n2 = t4.payload, o3 = "?x-oss-process=video/snapshot,t_0000,f_jpg,w_" + n2.video.width + ",m_fast,ar_auto";
          n2.video.url = e4.content.url, n2.thumbnail.url = e4.content.url + o3, n2.video.name = e4.content.newFileName;
        }, t3;
      }(n(60).FileMessagePayloadImprover);
      t2.VideoMessagePayloadImprover = i;
    }, function(e2, t2, n) {
      t2.__esModule = true;
      var o2 = n(19), r = function() {
        function e3(e4, t3, n2, o3) {
          this.validate(e4), this.mt = e4.type, this.to = t3.id.toString(), this.d = JSON.stringify(t3.data), this.p = JSON.stringify(e4.payload), n2 && (this.nt = n2), o3 && (this.at = o3), this.t = t3.type, this.guid = e4.messageId;
        }
        return e3.prototype.validate = function(e4) {
          if (e4.type === o2.MessageType.TEXT && JSON.stringify(e4.payload).length > 3072)
            throw Error("message-length limit 3kb");
        }, e3;
      }();
      t2["default"] = r;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true }), t2.eventCenter = void 0;
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = n(0), i = n(16);
      var s = new (function() {
        function e3() {
          !function(e4, t3) {
            if (!(e4 instanceof t3))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.subs = null, this.subs = /* @__PURE__ */ Object.create(null);
        }
        return o2(e3, [{ key: "on", value: function(e4, t3) {
          if (!r.calibrator.isString(e4))
            throw Error("eventType require a string.");
          if (!r.calibrator.isDef(i.ImApiEvents[e4]))
            throw Error("event not found.");
          if (!r.calibrator.isFunction(t3))
            throw Error("event require a callback.");
          this.subs[e4] = t3;
        } }, { key: "notify", value: function(e4, t3) {
          var n2 = this.subs[e4];
          n2 && n2(t3);
        } }]), e3;
      }())();
      t2.eventCenter = s;
    }, function(e2, t2, n) {
      var o2 = this && this.__awaiter || function(e3, t3, n2, o3) {
        return new (n2 || (n2 = Promise))(function(r2, i2) {
          function s2(e4) {
            try {
              u2(o3.next(e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function a2(e4) {
            try {
              u2(o3["throw"](e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function u2(e4) {
            var t4;
            e4.done ? r2(e4.value) : (t4 = e4.value, t4 instanceof n2 ? t4 : new n2(function(e5) {
              e5(t4);
            })).then(s2, a2);
          }
          u2((o3 = o3.apply(e3, t3 || [])).next());
        });
      }, r = this && this.__generator || function(e3, t3) {
        var n2, o3, r2, i2, s2 = { label: 0, sent: function() {
          if (1 & r2[0])
            throw r2[1];
          return r2[1];
        }, trys: [], ops: [] };
        return i2 = { next: a2(0), "throw": a2(1), "return": a2(2) }, typeof Symbol == "function" && (i2[Symbol.iterator] = function() {
          return this;
        }), i2;
        function a2(i3) {
          return function(a3) {
            return function(i4) {
              if (n2)
                throw new TypeError("Generator is already executing.");
              for (; s2; )
                try {
                  if (n2 = 1, o3 && (r2 = 2 & i4[0] ? o3["return"] : i4[0] ? o3["throw"] || ((r2 = o3["return"]) && r2.call(o3), 0) : o3.next) && !(r2 = r2.call(o3, i4[1])).done)
                    return r2;
                  switch (o3 = 0, r2 && (i4 = [2 & i4[0], r2.value]), i4[0]) {
                    case 0:
                    case 1:
                      r2 = i4;
                      break;
                    case 4:
                      return s2.label++, { value: i4[1], done: false };
                    case 5:
                      s2.label++, o3 = i4[1], i4 = [0];
                      continue;
                    case 7:
                      i4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!(r2 = (r2 = s2.trys).length > 0 && r2[r2.length - 1]) && (i4[0] === 6 || i4[0] === 2)) {
                        s2 = 0;
                        continue;
                      }
                      if (i4[0] === 3 && (!r2 || i4[1] > r2[0] && i4[1] < r2[3])) {
                        s2.label = i4[1];
                        break;
                      }
                      if (i4[0] === 6 && s2.label < r2[1]) {
                        s2.label = r2[1], r2 = i4;
                        break;
                      }
                      if (r2 && s2.label < r2[2]) {
                        s2.label = r2[2], s2.ops.push(i4);
                        break;
                      }
                      r2[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  i4 = t3.call(e3, s2);
                } catch (a4) {
                  i4 = [6, a4], o3 = 0;
                } finally {
                  n2 = r2 = 0;
                }
              if (5 & i4[0])
                throw i4[1];
              return { value: i4[0] ? i4[1] : void 0, done: true };
            }([i3, a3]);
          };
        }
      };
      t2.__esModule = true;
      var i = n(141), s = n(10), a = n(20), u = n(6), c = n(15), l = n(17), f2 = n(2), p2 = n(7), h = n(8), d = n(156), y = n(158), m = n(62), v = n(64), g = function() {
        function e3() {
          var e4 = this;
          this.conversations = new i.Conversations(), this.topper = new y["default"](this.conversations), this.remover = new d["default"](this.conversations), u.im._goEasySocket.addMessageObserver(c.RemoteEvents.IM_MSG_READ, this.onRemoteMarkRead.bind(this)), u.im._goEasySocket.addMessageObserver(c.RemoteEvents.IM_MSG_DELETED, this.onRemoteMessageDeleted.bind(this)), u.im._goEasySocket.addMessageObserver(c.RemoteEvents.IM_MSG_RECALLED, this.onRemoteMessageRecalled.bind(this)), u.im._goEasySocket.addDisconnectedObserver(this.onDisconnected.bind(this)), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.MESSAGE_SENDING, function(t3) {
            return e4.onMessageSending(t3);
          }), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.MESSAGE_SEND_SUCCESS, function(t3) {
            return e4.onMessageSendSuccess(t3);
          }), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.MESSAGE_RECEIVED, function(t3) {
            return e4.onMessageReceived(t3);
          }), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.REMOTE_MESSAGE_DELETED, function(t3) {
            return e4.onRemoteMessageDeleted(t3);
          }), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.REMOTE_MESSAGE_READ, function(t3) {
            return e4.onRemoteMarkRead(t3);
          }), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.UNREAD_MESSAGE_CHANGED, function() {
            return e4.onUnreadMessageChanged();
          }), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.MAX_MESSAGE_CHANGED, function(t3) {
            return e4.onMaxMessageChanged(t3);
          }), s.GoEasyEventCenter.on(a.IM_INTERNAL_EVENTS.REMOTE_MESSAGE_RECALLED, function(t3) {
            return e4.onRemoteMessageRecalled(t3);
          });
        }
        return e3.prototype.latestConversations = function() {
          return this.conversations.latestConversations();
        }, e3.prototype.history = function(e4) {
          var t3 = this;
          this.transformOptions(e4);
          var n2 = l.Target.byIds(e4.userId, e4.groupId), o3 = n2.scene, r2 = n2.id, i2 = this.conversations.findOrCreateConversation(o3, r2), s2 = i2.maxMessageTime();
          i2.history.loadHistory(e4).then(function() {
            s2 !== i2.maxMessageTime() && (t3.conversations.correctPosition(i2), i2.initialData().then(function() {
              t3.conversations.onUpdated();
            }));
          })["catch"](function(e5) {
            console.error("Failed to load history:", e5);
          });
        }, e3.prototype.topPrivateConversation = function(e4) {
          if (this.topper.validateOptions(f2.Scene.PRIVATE, e4)) {
            var t3 = l.Target.byScene(f2.Scene.PRIVATE, e4.userId), n2 = e4.top;
            this.topper.top(t3, n2, e4);
          }
        }, e3.prototype.topGroupConversation = function(e4) {
          if (this.topper.validateOptions(f2.Scene.GROUP, e4)) {
            var t3 = l.Target.byScene(f2.Scene.GROUP, e4.groupId), n2 = e4.top;
            this.topper.top(t3, n2, e4);
          }
        }, e3.prototype.removePrivateConversation = function(e4) {
          if (this.remover.validateOptions(f2.Scene.PRIVATE, e4)) {
            var t3 = l.Target.byScene(f2.Scene.PRIVATE, e4.userId);
            this.remover.remove(t3, e4);
          }
        }, e3.prototype.removeGroupConversation = function(e4) {
          if (this.remover.validateOptions(f2.Scene.GROUP, e4)) {
            var t3 = l.Target.byScene(f2.Scene.GROUP, e4.groupId);
            this.remover.remove(t3, e4);
          }
        }, e3.prototype.onMessageSending = function(e4) {
          var t3 = this, n2 = l.Target.byIMMessage(e4), o3 = n2.scene, r2 = n2.id, i2 = this.conversations.findOrCreateConversation(o3, r2);
          i2.history.saveMessage(e4), this.conversations.correctPosition(i2), i2.initialData().then(function() {
            t3.conversations.onUpdated();
          });
        }, e3.prototype.onMessageSendSuccess = function(e4) {
          var t3 = l.Target.byIMMessage(e4), n2 = t3.scene, o3 = t3.id, r2 = this.conversations.findConversation(n2, o3);
          r2.history.onMessageSendSuccess(e4), this.conversations.correctPosition(r2), this.conversations.onUpdated();
        }, e3.prototype.onMessageReceived = function(e4) {
          var t3 = this, n2 = l.Target.byIMMessage(e4), o3 = n2.scene, r2 = n2.id, i2 = this.conversations.findOrCreateConversation(o3, r2);
          i2.history.onMessageReceived(e4) && (this.conversations.correctPosition(i2), i2.initialData().then(function() {
            t3.conversations.onUpdated();
          }));
        }, e3.prototype.privateMarkAsRead = function(e4) {
          var t3 = l.Target.byScene(f2.Scene.PRIVATE, e4.userId);
          this.markAsRead(t3, e4);
        }, e3.prototype.groupMarkAsRead = function(e4) {
          var t3 = l.Target.byScene(f2.Scene.GROUP, e4.groupId);
          this.markAsRead(t3, e4);
        }, e3.prototype.markAsRead = function(e4, t3) {
          return o2(this, void 0, void 0, function() {
            var n2;
            return r(this, function(o3) {
              switch (o3.label) {
                case 0:
                  return h.CallbackUtils.validateCallbackOptions(t3), this.validateTarget(e4), n2 = this.conversations.findConversation(e4.scene, e4.id), p2.calibrator.isDef(n2) ? [4, n2.history.markRead(t3)] : [3, 2];
                case 1:
                  return o3.sent(), [3, 3];
                case 2:
                  h.CallbackUtils.onFailed(t3, { code: 400, content: "No unread message that could be marked." }), o3.label = 3;
                case 3:
                  return [2];
              }
            });
          });
        }, e3.prototype.onRemoteMarkRead = function(e4) {
          var t3 = l.Target.byMessageReadRemoteEvent(e4), n2 = this.conversations.findConversation(t3.scene, t3.id);
          p2.calibrator.isDef(n2) && n2.history.markByRemoteEvent(e4);
        }, e3.prototype.deleteMessage = function(e4) {
          return o2(this, void 0, void 0, function() {
            var t3, n2, o3;
            return r(this, function(r2) {
              switch (r2.label) {
                case 0:
                  return m["default"].validate(e4), t3 = e4.messages[0], n2 = l.Target.byIMMessage(t3), o3 = this.conversations.findConversation(n2.scene, n2.id), p2.calibrator.isDef(o3) ? [4, o3.history.deleteMessages(e4)] : [3, 2];
                case 1:
                  return r2.sent(), [3, 3];
                case 2:
                  throw { code: 400, content: "No message that could be deleted" };
                case 3:
                  return [2];
              }
            });
          });
        }, e3.prototype.onRemoteMessageDeleted = function(e4) {
          var t3 = l.Target.byIMMessageDeletedEvent(e4), n2 = this.conversations.findConversation(t3.scene, t3.id);
          p2.calibrator.isDef(n2) && n2.history.syncDeletedMessage(e4.deleterId, e4.times);
        }, e3.prototype.recallMessage = function(e4) {
          return o2(this, void 0, void 0, function() {
            var t3, n2, o3;
            return r(this, function(r2) {
              switch (r2.label) {
                case 0:
                  return v["default"].validate(e4), t3 = e4.messages[0], n2 = l.Target.byIMMessage(t3), o3 = this.conversations.findConversation(n2.scene, n2.id), p2.calibrator.isDef(o3) ? [4, o3.history.recallMessage(e4)] : [3, 2];
                case 1:
                  return r2.sent(), [3, 3];
                case 2:
                  throw { code: 400, content: "No message that could be recalled" };
                case 3:
                  return [2];
              }
            });
          });
        }, e3.prototype.onRemoteMessageRecalled = function(e4) {
          var t3 = l.Target.byMessageRecalledRemoteEvent(e4), n2 = this.conversations.findConversation(t3.scene, t3.id);
          p2.calibrator.isDef(n2) && n2.history.syncRecalledMessage(e4.times);
        }, e3.prototype.onDisconnected = function() {
          this.conversations.expireAllMessageCaches();
        }, e3.prototype.transformOptions = function(e4) {
          if (h.CallbackUtils.validateCallbackOptions(e4), !p2.calibrator.isObject(e4) || !p2.calibrator.isDef(e4.userId) && !p2.calibrator.isDef(e4.groupId))
            throw { code: 400, content: "userId or groupId is required" };
          if (p2.calibrator.isDef(e4.userId) && p2.calibrator.isDef(e4.groupId))
            throw { code: 400, content: "only contain userId or groupId" };
          p2.calibrator.isUndef(e4.limit) && (e4.limit = 10), e4.limit > 30 && (e4.limit = 30), p2.calibrator.isDef(e4.userId) ? p2.calibrator.isStringOrNumber(e4.userId) || h.CallbackUtils.onFailed(e4, { code: 400, content: "Failed to query history: userId require string or number" }) : p2.calibrator.isStringOrNumber(e4.groupId) || h.CallbackUtils.onFailed(e4, { code: 400, content: "Failed to query history: groupId require string or number" });
        }, e3.prototype.validateTarget = function(e4) {
          var t3 = e4.scene === f2.Scene.PRIVATE ? "userId" : "groupId";
          if (p2.calibrator.isUndef(e4.id) || p2.calibrator.isEmpty(e4.id) || !p2.calibrator.isStringOrNumber(e4.id))
            throw { code: 400, content: t3 + " requires string or number" };
        }, e3.prototype.onUnreadMessageChanged = function() {
          this.conversations.onUpdated();
        }, e3.prototype.onMaxMessageChanged = function(e4) {
          var t3 = this.conversations.findConversation(e4.scene, e4.id);
          this.conversations.correctPosition(t3), this.conversations.onUpdated();
        }, e3;
      }();
      t2["default"] = g;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      }), i = this && this.__awaiter || function(e3, t3, n2, o3) {
        return new (n2 || (n2 = Promise))(function(r2, i2) {
          function s2(e4) {
            try {
              u2(o3.next(e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function a2(e4) {
            try {
              u2(o3["throw"](e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function u2(e4) {
            var t4;
            e4.done ? r2(e4.value) : (t4 = e4.value, t4 instanceof n2 ? t4 : new n2(function(e5) {
              e5(t4);
            })).then(s2, a2);
          }
          u2((o3 = o3.apply(e3, t3 || [])).next());
        });
      }, s = this && this.__generator || function(e3, t3) {
        var n2, o3, r2, i2, s2 = { label: 0, sent: function() {
          if (1 & r2[0])
            throw r2[1];
          return r2[1];
        }, trys: [], ops: [] };
        return i2 = { next: a2(0), "throw": a2(1), "return": a2(2) }, typeof Symbol == "function" && (i2[Symbol.iterator] = function() {
          return this;
        }), i2;
        function a2(i3) {
          return function(a3) {
            return function(i4) {
              if (n2)
                throw new TypeError("Generator is already executing.");
              for (; s2; )
                try {
                  if (n2 = 1, o3 && (r2 = 2 & i4[0] ? o3["return"] : i4[0] ? o3["throw"] || ((r2 = o3["return"]) && r2.call(o3), 0) : o3.next) && !(r2 = r2.call(o3, i4[1])).done)
                    return r2;
                  switch (o3 = 0, r2 && (i4 = [2 & i4[0], r2.value]), i4[0]) {
                    case 0:
                    case 1:
                      r2 = i4;
                      break;
                    case 4:
                      return s2.label++, { value: i4[1], done: false };
                    case 5:
                      s2.label++, o3 = i4[1], i4 = [0];
                      continue;
                    case 7:
                      i4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!(r2 = (r2 = s2.trys).length > 0 && r2[r2.length - 1]) && (i4[0] === 6 || i4[0] === 2)) {
                        s2 = 0;
                        continue;
                      }
                      if (i4[0] === 3 && (!r2 || i4[1] > r2[0] && i4[1] < r2[3])) {
                        s2.label = i4[1];
                        break;
                      }
                      if (i4[0] === 6 && s2.label < r2[1]) {
                        s2.label = r2[1], r2 = i4;
                        break;
                      }
                      if (r2 && s2.label < r2[2]) {
                        s2.label = r2[2], s2.ops.push(i4);
                        break;
                      }
                      r2[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  i4 = t3.call(e3, s2);
                } catch (a4) {
                  i4 = [6, a4], o3 = 0;
                } finally {
                  n2 = r2 = 0;
                }
              if (5 & i4[0])
                throw i4[1];
              return { value: i4[0] ? i4[1] : void 0, done: true };
            }([i3, a3]);
          };
        }
      };
      t2.__esModule = true, t2.Conversations = void 0;
      var a = n(142), u = n(6), c = n(3), l = n(1), f2 = n(4), p2 = n(0), h = n(2), d = n(33), y = n(5), m = n(16), v = n(61), g = function() {
        function e3() {
          this.list = new Array(), this.builder = new d.RemoteAbbrMessageBuilder();
        }
        return e3.prototype.onUpdated = function() {
          this.loadLocalConversationsAsDtos().then(function(e4) {
            u.im._event.notify(m.ImApiEvents.CONVERSATIONS_UPDATED, { unreadTotal: e4.content.unreadTotal, conversations: e4.content.conversations });
          });
        }, e3.prototype.latestConversations = function() {
          return this.synchronized ? this.loadLocalConversationsAsDtos() : this.loadServerConversations();
        }, e3.prototype.loadServerConversations = function() {
          var e4 = this;
          return new Promise(function(t3, n2) {
            var o3 = new c["default"]({ name: y.RocketTypes.imLastConversations, params: {}, permission: l["default"].READ, singleTimeout: f2.SocketTimeout.commonQuerySingle, totalTimeout: f2.SocketTimeout.commonQueryTotal, fail: function(e5) {
              n2(e5);
            }, success: function(o4) {
              return i(e4, void 0, void 0, function() {
                var e5, r2, i2, a2, c2, l2, f3, p3, d2, y2;
                return s(this, function(s2) {
                  if (o4.code === 200) {
                    for (e5 = o4.content, r2 = 0; r2 < e5.length; r2++)
                      i2 = e5[r2], a2 = i2.t, c2 = i2.top, l2 = i2.d ? JSON.parse(i2.d) : {}, f3 = a2 === h.Scene.PRIVATE ? i2.uid : i2.g, u.im._dataCache.putData(a2, f3, l2), (p3 = this.findOrCreateConversation(a2, f3)).top = c2, p3.data = l2, (d2 = i2.lmsg).t = a2, y2 = this.builder.build(d2), p3.history.initMaxMessageAndOffsets(y2, i2.userOffsets), this.correctPosition(p3);
                    this.synchronized = true, this.loadLocalConversationsAsDtos().then(function(e6) {
                      t3(e6);
                    });
                  } else
                    n2(o4);
                  return [2];
                });
              });
            } });
            u.im._goEasySocket.emit(o3);
          });
        }, e3.prototype.loadLocalConversationsAsDtos = function() {
          var e4 = this;
          return new Promise(function(t3, n2) {
            for (var o3 = new Array(), r2 = e4.list.length, i2 = 0; i2 < r2; i2++) {
              var s2 = e4.list[i2];
              if (s2.history.messageCache.getMaxMessage()) {
                var a2 = s2.toDto();
                o3.push(a2);
              }
            }
            t3({ code: 200, content: { unreadTotal: e4.getUnreadTotal(), conversations: o3 } });
          });
        }, e3.prototype.findOrCreateConversation = function(e4, t3) {
          var n2 = this.findConversation(e4, t3);
          return p2.calibrator.isUndef(n2) && (n2 = new a.Conversation(e4, t3), this.insertOne(n2)), n2;
        }, e3.prototype.findConversationIndex = function(e4, t3) {
          return this.list.findIndex(function(n2) {
            return e4 === h.Scene.GROUP && t3 === n2.targetId || e4 === h.Scene.PRIVATE && t3 === n2.targetId;
          });
        }, e3.prototype.findConversation = function(e4, t3) {
          var n2 = this.findConversationIndex(e4, t3);
          return this.list[n2];
        }, e3.prototype.removeLocalConversation = function(e4) {
          var t3 = e4.getTargetId(), n2 = e4.getScene(), o3 = this.findConversationIndex(n2, t3);
          this.list.splice(o3, 1);
        }, e3.prototype.topLocalConversation = function(e4, t3) {
          e4.top = t3, this.correctPosition(e4), this.onUpdated();
        }, e3.prototype.getUnreadTotal = function() {
          var e4 = 0;
          return this.list.forEach(function(t3) {
            e4 += t3.history.messageCache.unreadAmount();
          }), e4;
        }, e3.prototype.insertOne = function(t3) {
          e3.sortedInserter.insert(this.list, t3), this.list.length > e3.CONVERSATIONS_MAX_LENGTH && (this.list = this.list.slice(0, e3.CONVERSATIONS_MAX_LENGTH));
        }, e3.prototype.correctPosition = function(e4) {
          this.removeLocalConversation(e4), this.insertOne(e4);
        }, e3.prototype.expireAllMessageCaches = function() {
          this.list.forEach(function(e4) {
            e4.history.expire();
          });
        }, e3.CONVERSATIONS_MAX_LENGTH = 200, e3.sortedInserter = new (function(e4) {
          function t3() {
            return e4 !== null && e4.apply(this, arguments) || this;
          }
          return r(t3, e4), t3.prototype.compare = function(e5, t4) {
            var n2;
            if (e5.top == t4.top) {
              var o3 = e5.maxMessageTime();
              n2 = t4.maxMessageTime() - o3;
            } else
              n2 = e5.top ? -1 : 1;
            return n2 === 0 ? 0 : n2 > 0 ? 1 : -1;
          }, t3;
        }(v.SortedInserter))(), e3;
      }();
      t2.Conversations = g;
    }, function(e2, t2, n) {
      var o2 = this && this.__awaiter || function(e3, t3, n2, o3) {
        return new (n2 || (n2 = Promise))(function(r2, i2) {
          function s2(e4) {
            try {
              u2(o3.next(e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function a2(e4) {
            try {
              u2(o3["throw"](e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function u2(e4) {
            var t4;
            e4.done ? r2(e4.value) : (t4 = e4.value, t4 instanceof n2 ? t4 : new n2(function(e5) {
              e5(t4);
            })).then(s2, a2);
          }
          u2((o3 = o3.apply(e3, t3 || [])).next());
        });
      }, r = this && this.__generator || function(e3, t3) {
        var n2, o3, r2, i2, s2 = { label: 0, sent: function() {
          if (1 & r2[0])
            throw r2[1];
          return r2[1];
        }, trys: [], ops: [] };
        return i2 = { next: a2(0), "throw": a2(1), "return": a2(2) }, typeof Symbol == "function" && (i2[Symbol.iterator] = function() {
          return this;
        }), i2;
        function a2(i3) {
          return function(a3) {
            return function(i4) {
              if (n2)
                throw new TypeError("Generator is already executing.");
              for (; s2; )
                try {
                  if (n2 = 1, o3 && (r2 = 2 & i4[0] ? o3["return"] : i4[0] ? o3["throw"] || ((r2 = o3["return"]) && r2.call(o3), 0) : o3.next) && !(r2 = r2.call(o3, i4[1])).done)
                    return r2;
                  switch (o3 = 0, r2 && (i4 = [2 & i4[0], r2.value]), i4[0]) {
                    case 0:
                    case 1:
                      r2 = i4;
                      break;
                    case 4:
                      return s2.label++, { value: i4[1], done: false };
                    case 5:
                      s2.label++, o3 = i4[1], i4 = [0];
                      continue;
                    case 7:
                      i4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!(r2 = (r2 = s2.trys).length > 0 && r2[r2.length - 1]) && (i4[0] === 6 || i4[0] === 2)) {
                        s2 = 0;
                        continue;
                      }
                      if (i4[0] === 3 && (!r2 || i4[1] > r2[0] && i4[1] < r2[3])) {
                        s2.label = i4[1];
                        break;
                      }
                      if (i4[0] === 6 && s2.label < r2[1]) {
                        s2.label = r2[1], r2 = i4;
                        break;
                      }
                      if (r2 && s2.label < r2[2]) {
                        s2.label = r2[2], s2.ops.push(i4);
                        break;
                      }
                      r2[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  i4 = t3.call(e3, s2);
                } catch (a4) {
                  i4 = [6, a4], o3 = 0;
                } finally {
                  n2 = r2 = 0;
                }
              if (5 & i4[0])
                throw i4[1];
              return { value: i4[0] ? i4[1] : void 0, done: true };
            }([i3, a3]);
          };
        }
      };
      t2.__esModule = true, t2.Conversation = void 0;
      var i = n(2), s = n(6), a = n(143), u = n(17), c = function() {
        function e3(e4, t3) {
          this.top = false, this.data = {}, this.scene = e4, this.targetId = t3, this.history = new a["default"](u.Target.byScene(e4, t3));
        }
        return e3.prototype.toDto = function() {
          var e4 = new i.ConversationDTO();
          return e4.type = this.scene, this.scene === i.Scene.PRIVATE ? e4.userId = this.targetId : this.scene === i.Scene.GROUP && (e4.groupId = this.targetId), e4.lastMessage = this.history.messageCache.getMaxMessage(), e4.unread = this.history.messageCache.unreadAmount(), e4.top = this.top, e4.data = this.data, e4;
        }, e3.prototype.initialData = function() {
          return o2(this, void 0, void 0, function() {
            var e4;
            return r(this, function(t3) {
              switch (t3.label) {
                case 0:
                  return e4 = this, [4, this.getData()];
                case 1:
                  return e4.data = t3.sent(), [2];
              }
            });
          });
        }, e3.prototype.getData = function() {
          return s.im._dataCache.loadData(this.targetId, this.scene);
        }, e3.prototype.getTargetId = function() {
          return this.targetId;
        }, e3.prototype.getScene = function() {
          return this.scene;
        }, e3.prototype.maxMessageTime = function() {
          return this.history.messageCache.maxTime();
        }, e3;
      }();
      t2.Conversation = c;
    }, function(e2, t2, n) {
      var o2 = this && this.__awaiter || function(e3, t3, n2, o3) {
        return new (n2 || (n2 = Promise))(function(r2, i2) {
          function s2(e4) {
            try {
              u2(o3.next(e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function a2(e4) {
            try {
              u2(o3["throw"](e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function u2(e4) {
            var t4;
            e4.done ? r2(e4.value) : (t4 = e4.value, t4 instanceof n2 ? t4 : new n2(function(e5) {
              e5(t4);
            })).then(s2, a2);
          }
          u2((o3 = o3.apply(e3, t3 || [])).next());
        });
      }, r = this && this.__generator || function(e3, t3) {
        var n2, o3, r2, i2, s2 = { label: 0, sent: function() {
          if (1 & r2[0])
            throw r2[1];
          return r2[1];
        }, trys: [], ops: [] };
        return i2 = { next: a2(0), "throw": a2(1), "return": a2(2) }, typeof Symbol == "function" && (i2[Symbol.iterator] = function() {
          return this;
        }), i2;
        function a2(i3) {
          return function(a3) {
            return function(i4) {
              if (n2)
                throw new TypeError("Generator is already executing.");
              for (; s2; )
                try {
                  if (n2 = 1, o3 && (r2 = 2 & i4[0] ? o3["return"] : i4[0] ? o3["throw"] || ((r2 = o3["return"]) && r2.call(o3), 0) : o3.next) && !(r2 = r2.call(o3, i4[1])).done)
                    return r2;
                  switch (o3 = 0, r2 && (i4 = [2 & i4[0], r2.value]), i4[0]) {
                    case 0:
                    case 1:
                      r2 = i4;
                      break;
                    case 4:
                      return s2.label++, { value: i4[1], done: false };
                    case 5:
                      s2.label++, o3 = i4[1], i4 = [0];
                      continue;
                    case 7:
                      i4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!(r2 = (r2 = s2.trys).length > 0 && r2[r2.length - 1]) && (i4[0] === 6 || i4[0] === 2)) {
                        s2 = 0;
                        continue;
                      }
                      if (i4[0] === 3 && (!r2 || i4[1] > r2[0] && i4[1] < r2[3])) {
                        s2.label = i4[1];
                        break;
                      }
                      if (i4[0] === 6 && s2.label < r2[1]) {
                        s2.label = r2[1], r2 = i4;
                        break;
                      }
                      if (r2 && s2.label < r2[2]) {
                        s2.label = r2[2], s2.ops.push(i4);
                        break;
                      }
                      r2[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  i4 = t3.call(e3, s2);
                } catch (a4) {
                  i4 = [6, a4], o3 = 0;
                } finally {
                  n2 = r2 = 0;
                }
              if (5 & i4[0])
                throw i4[1];
              return { value: i4[0] ? i4[1] : void 0, done: true };
            }([i3, a3]);
          };
        }
      };
      t2.__esModule = true;
      var i = n(6), s = n(2), a = n(8), u = n(16), c = n(10), l = n(20), f2 = n(144), p2 = n(146), h = n(62), d = n(150), y = n(64), m = function() {
        function e3(e4) {
          this.expiredTime = 0, this.target = e4, this.userOffsetService = new p2["default"](e4), this.messageCache = new f2["default"](e4, this.userOffsetService);
        }
        return e3.prototype.initMaxMessageAndOffsets = function(e4, t3) {
          if (!this.messageCache.existsMessage(e4.messageId)) {
            if (this.userOffsetService.updateUserOffsets(t3), this.target.scene === s.Scene.PRIVATE) {
              var n2 = e4;
              n2.read = this.userOffsetService.isRead(n2);
            }
            this.messageCache.saveMessage(e4);
          }
        }, e3.prototype.loadHistory = function(e4) {
          return o2(this, void 0, void 0, function() {
            var t3;
            return r(this, function(n2) {
              switch (n2.label) {
                case 0:
                  if (!(this.expiredTime > 0) || this.messageCache.isEmpty())
                    return [3, 4];
                  n2.label = 1;
                case 1:
                  return n2.trys.push([1, 3, , 4]), [4, this.updateByServerChange()];
                case 2:
                  return n2.sent(), [3, 4];
                case 3:
                  return t3 = n2.sent(), a.CallbackUtils.onFailed(e4, t3), [3, 4];
                case 4:
                  return [4, this.messageCache.loadHistory(e4)];
                case 5:
                  return n2.sent(), [2];
              }
            });
          });
        }, e3.prototype.saveMessage = function(e4) {
          this.messageCache.saveMessage(e4);
        }, e3.prototype.deleteMessages = function(e4) {
          return o2(this, void 0, void 0, function() {
            var t3, n2;
            return r(this, function(o3) {
              switch (o3.label) {
                case 0:
                  return t3 = this.messageCache.getMaxMessage(), n2 = e4.messages, [4, h["default"].deleteServerMessages(n2)];
                case 1:
                  return o3.sent(), this.messageCache.deleteMessages(n2), a.CallbackUtils.onSuccess(e4), n2.includes(t3) && c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.MAX_MESSAGE_CHANGED, this.target), [2];
              }
            });
          });
        }, e3.prototype.syncDeletedMessage = function(e4, t3) {
          if (e4 === i.IM.userId) {
            var n2 = this.messageCache.getMaxMessage(), o3 = this.messageCache.findMessagesByTimes(t3);
            this.messageCache.deleteMessages(o3), i.im._event.notify(u.ImApiEvents.MESSAGE_DELETED, o3), o3.includes(n2) && c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.MAX_MESSAGE_CHANGED, this.target);
          }
        }, e3.prototype.recallMessage = function(e4) {
          return o2(this, void 0, void 0, function() {
            var t3, n2;
            return r(this, function(o3) {
              switch (o3.label) {
                case 0:
                  return t3 = this.messageCache.getMaxMessage(), n2 = e4.messages, [4, y["default"].recallServerMessages(n2)];
                case 1:
                  return o3.sent(), this.messageCache.recallMessages(n2), a.CallbackUtils.onSuccess(e4), n2.includes(t3) && c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.MAX_MESSAGE_CHANGED, this.target), [2];
              }
            });
          });
        }, e3.prototype.syncRecalledMessage = function(e4) {
          var t3 = this.messageCache.getMaxMessage(), n2 = this.messageCache.findMessagesByTimes(e4);
          n2.length > 0 && (this.messageCache.recallMessages(n2), i.im._event.notify(u.ImApiEvents.MESSAGE_RECALLED, n2), this.existsUnreadMessage(n2) ? c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.UNREAD_MESSAGE_CHANGED) : n2.includes(t3) && c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.MAX_MESSAGE_CHANGED, this.target));
        }, e3.prototype.existsUnreadMessage = function(e4) {
          for (var t3 = this.userOffsetService.myOffset(), n2 = 0; n2 < e4.length; n2++) {
            if (t3 < e4[n2].timestamp)
              return true;
          }
          return false;
        }, e3.prototype.expire = function() {
          this.messageCache.isEmpty() || (this.expiredTime = this.messageCache.maxSuccessMessageTime());
        }, e3.prototype.updateByServerChange = function() {
          return o2(this, void 0, void 0, function() {
            var e4, t3;
            return r(this, function(n2) {
              switch (n2.label) {
                case 0:
                  return e4 = this.target.scene, t3 = this.target.id, [4, d.ChangeSynchronizer.sync(e4, t3, this.expiredTime, this.messageCache.minTime())];
                case 1:
                  return n2.sent(), this.expiredTime = 0, [2];
              }
            });
          });
        }, e3.prototype.markRead = function(e4) {
          return o2(this, void 0, void 0, function() {
            var t3, n2, o3;
            return r(this, function(r2) {
              switch (r2.label) {
                case 0:
                  if (this.messageCache.isEmpty())
                    return a.CallbackUtils.onSuccess(e4), [2];
                  t3 = this.messageCache.maxSuccessMessageTime(), n2 = false, r2.label = 1;
                case 1:
                  return r2.trys.push([1, 3, , 4]), [4, this.userOffsetService.manualMark(t3)];
                case 2:
                  return n2 = r2.sent(), [3, 4];
                case 3:
                  return o3 = r2.sent(), a.CallbackUtils.onFailed(e4, o3), [2];
                case 4:
                  return n2 && (this.messageCache.markOthersSentRead(t3), c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.UNREAD_MESSAGE_CHANGED)), a.CallbackUtils.onSuccess(e4), [2];
              }
            });
          });
        }, e3.prototype.markByRemoteEvent = function(e4) {
          var t3 = e4.time;
          e4.markerId === i.IM.userId ? this.synchronizeUnreadAmountByOtherDevices(t3) : this.markMySentMessagesRead(t3);
        }, e3.prototype.synchronizeUnreadAmountByOtherDevices = function(e4) {
          this.userOffsetService.updateMyOffset(e4) && (this.messageCache.markOthersSentRead(e4), c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.UNREAD_MESSAGE_CHANGED));
        }, e3.prototype.markMySentMessagesRead = function(e4) {
          if (this.target.scene === s.Scene.PRIVATE) {
            this.userOffsetService.updateOffset(this.target.id, e4);
            var t3 = this.messageCache.markMySentRead(e4);
            t3.length > 0 && i.im._event.notify(u.ImApiEvents.MESSAGE_READ, t3), e4 === this.messageCache.maxSuccessMessageTime() && c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.MAX_MESSAGE_CHANGED, this.target);
          }
        }, e3.prototype.onMessageSendSuccess = function(e4) {
          if (this.target.scene === s.Scene.PRIVATE) {
            var t3 = e4;
            t3.read || (t3.read = this.userOffsetService.isRead(t3), t3.read && i.im._event.notify(u.ImApiEvents.MESSAGE_READ, [t3]));
          }
          this.messageCache.correctPosition(e4), this.userOffsetService.updateMyOffset(e4.timestamp);
        }, e3.prototype.onMessageReceived = function(e4) {
          if (!this.messageCache.existsMessage(e4.messageId)) {
            this.saveMessage(e4);
            var t3 = e4.timestamp;
            if (e4.senderId == i.IM.userId)
              this.userOffsetService.updateMyOffset(t3) && this.messageCache.markOthersSentRead(t3);
            else if (this.target.scene === s.Scene.PRIVATE) {
              this.userOffsetService.updateOffset(this.target.id, t3);
              var n2 = this.messageCache.markMySentRead(t3);
              n2.length > 0 && i.im._event.notify(u.ImApiEvents.MESSAGE_READ, n2);
            }
            var o3 = this.target.scene;
            return o3 === s.Scene.PRIVATE ? i.im._event.notify(u.ImApiEvents.PRIVATE_MESSAGE_RECEIVED, e4) : o3 === s.Scene.GROUP && i.im._event.notify(u.ImApiEvents.GROUP_MESSAGE_RECEIVED, e4), true;
          }
          return false;
        }, e3;
      }();
      t2["default"] = m;
    }, function(e2, t2, n) {
      var o2, r = this && this.__extends || (o2 = function(e3, t3) {
        return (o2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
          e4.__proto__ = t4;
        } || function(e4, t4) {
          for (var n2 in t4)
            Object.prototype.hasOwnProperty.call(t4, n2) && (e4[n2] = t4[n2]);
        })(e3, t3);
      }, function(e3, t3) {
        if (typeof t3 != "function" && t3 !== null)
          throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
        function n2() {
          this.constructor = e3;
        }
        o2(e3, t3), e3.prototype = t3 === null ? Object.create(t3) : (n2.prototype = t3.prototype, new n2());
      }), i = this && this.__awaiter || function(e3, t3, n2, o3) {
        return new (n2 || (n2 = Promise))(function(r2, i2) {
          function s2(e4) {
            try {
              u2(o3.next(e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function a2(e4) {
            try {
              u2(o3["throw"](e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function u2(e4) {
            var t4;
            e4.done ? r2(e4.value) : (t4 = e4.value, t4 instanceof n2 ? t4 : new n2(function(e5) {
              e5(t4);
            })).then(s2, a2);
          }
          u2((o3 = o3.apply(e3, t3 || [])).next());
        });
      }, s = this && this.__generator || function(e3, t3) {
        var n2, o3, r2, i2, s2 = { label: 0, sent: function() {
          if (1 & r2[0])
            throw r2[1];
          return r2[1];
        }, trys: [], ops: [] };
        return i2 = { next: a2(0), "throw": a2(1), "return": a2(2) }, typeof Symbol == "function" && (i2[Symbol.iterator] = function() {
          return this;
        }), i2;
        function a2(i3) {
          return function(a3) {
            return function(i4) {
              if (n2)
                throw new TypeError("Generator is already executing.");
              for (; s2; )
                try {
                  if (n2 = 1, o3 && (r2 = 2 & i4[0] ? o3["return"] : i4[0] ? o3["throw"] || ((r2 = o3["return"]) && r2.call(o3), 0) : o3.next) && !(r2 = r2.call(o3, i4[1])).done)
                    return r2;
                  switch (o3 = 0, r2 && (i4 = [2 & i4[0], r2.value]), i4[0]) {
                    case 0:
                    case 1:
                      r2 = i4;
                      break;
                    case 4:
                      return s2.label++, { value: i4[1], done: false };
                    case 5:
                      s2.label++, o3 = i4[1], i4 = [0];
                      continue;
                    case 7:
                      i4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!(r2 = (r2 = s2.trys).length > 0 && r2[r2.length - 1]) && (i4[0] === 6 || i4[0] === 2)) {
                        s2 = 0;
                        continue;
                      }
                      if (i4[0] === 3 && (!r2 || i4[1] > r2[0] && i4[1] < r2[3])) {
                        s2.label = i4[1];
                        break;
                      }
                      if (i4[0] === 6 && s2.label < r2[1]) {
                        s2.label = r2[1], r2 = i4;
                        break;
                      }
                      if (r2 && s2.label < r2[2]) {
                        s2.label = r2[2], s2.ops.push(i4);
                        break;
                      }
                      r2[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  i4 = t3.call(e3, s2);
                } catch (a4) {
                  i4 = [6, a4], o3 = 0;
                } finally {
                  n2 = r2 = 0;
                }
              if (5 & i4[0])
                throw i4[1];
              return { value: i4[0] ? i4[1] : void 0, done: true };
            }([i3, a3]);
          };
        }
      }, a = this && this.__values || function(e3) {
        var t3 = typeof Symbol == "function" && Symbol.iterator, n2 = t3 && e3[t3], o3 = 0;
        if (n2)
          return n2.call(e3);
        if (e3 && typeof e3.length == "number")
          return { next: function() {
            return e3 && o3 >= e3.length && (e3 = void 0), { value: e3 && e3[o3++], done: !e3 };
          } };
        throw new TypeError(t3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      t2.__esModule = true;
      var u = n(3), c = n(1), l = n(4), f2 = n(6), p2 = n(2), h = n(33), d = n(145), y = n(5), m = n(8), v = n(7), g = n(61), b = function() {
        function e3(e4, t3) {
          this.builder = new h.RemoteAbbrMessageBuilder(), this.messages = new Array(), this.allLoaded = false, this.target = e4, this.userOffsetService = t3;
        }
        return e3.prototype.sliceOverlengthMessages = function() {
          this.messages.length > e3.CACHE_MAX_LENGTH && (this.messages = this.messages.slice(-e3.CACHE_MAX_LENGTH), this.allLoaded === true && (this.allLoaded = false));
        }, e3.prototype.unreadAmount = function() {
          var e4, t3, n2 = 0, o3 = this.userOffsetService.myOffset();
          try {
            for (var r2 = a(this.messages), i2 = r2.next(); !i2.done; i2 = r2.next()) {
              var s2 = i2.value;
              s2.senderId !== f2.IM.userId && s2.timestamp > o3 && !s2.recalled && (n2 += 1);
            }
          } catch (u2) {
            e4 = { error: u2 };
          } finally {
            try {
              i2 && !i2.done && (t3 = r2["return"]) && t3.call(r2);
            } finally {
              if (e4)
                throw e4.error;
            }
          }
          return n2;
        }, e3.prototype.maxTime = function() {
          var e4 = this.getMaxMessage();
          return v.calibrator.isDef(e4) ? e4.timestamp : 0;
        }, e3.prototype.getMaxMessage = function() {
          return this.messages[this.messages.length - 1];
        }, e3.prototype.loadHistory = function(e4) {
          return i(this, void 0, void 0, function() {
            var t3, n2, o3, r2, i2, a2, u2, c2;
            return s(this, function(s2) {
              switch (s2.label) {
                case 0:
                  if (t3 = e4.limit, n2 = e4.lastTimestamp, o3 = this.loadLocalMessages(t3, n2), this.allLoaded !== false || o3.length === t3)
                    return [3, 4];
                  r2 = t3 - o3.length, i2 = o3[0] ? o3[0].timestamp : n2, a2 = { userId: e4.userId, groupId: e4.groupId, lastTimestamp: i2, limit: r2 }, s2.label = 1;
                case 1:
                  return s2.trys.push([1, 3, , 4]), [4, this.loadServerMessages(a2)];
                case 2:
                  return u2 = s2.sent(), o3 = u2.concat(o3), [3, 4];
                case 3:
                  return c2 = s2.sent(), m.CallbackUtils.onFailed(e4, c2), [3, 4];
                case 4:
                  return m.CallbackUtils.onSuccess(e4, { code: 200, content: o3 }), [2];
              }
            });
          });
        }, e3.prototype.loadLocalMessages = function(e4, t3) {
          var n2 = [], o3 = this.messages.length;
          if (t3) {
            if (o3 > 0) {
              var r2 = this.messages[0].timestamp, i2 = this.messages[o3 - 1].timestamp;
              if (t3 >= r2 && t3 <= i2)
                for (var s2 = o3 - 1; s2 >= 0; s2--) {
                  var a2 = this.messages[s2];
                  if (a2.timestamp < t3) {
                    if (!(n2.length < e4))
                      break;
                    n2.unshift(a2);
                  }
                }
            }
          } else
            n2 = this.messages.slice(-e4);
          return n2;
        }, e3.prototype.loadServerMessages = function(t3) {
          var n2 = this, o3 = new d["default"](t3);
          return new Promise(function(r2, i2) {
            var s2 = new u["default"]({ name: y.RocketTypes.IM_HISTORY, params: o3, permission: c["default"].READ, singleTimeout: l.SocketTimeout.commonQuerySingle, totalTimeout: l.SocketTimeout.commonQueryTotal, fail: function(e4) {
              i2({ code: e4.code || 408, content: e4.content || "Failed to query message" });
            }, success: function(o4) {
              if (o4.code === 200) {
                var s3 = o4.content, a2 = s3.messages;
                n2.userOffsetService.updateUserOffsets(s3.userOffsets);
                var u2 = n2.convertServerMessages(a2);
                n2.messages.length < e3.CACHE_MAX_LENGTH && (n2.cacheServerMessages(t3, u2), a2.length < t3.limit && (n2.allLoaded = true)), r2(u2);
              } else
                i2(o4);
            } });
            f2.im._goEasySocket.emit(s2);
          });
        }, e3.prototype.cacheServerMessages = function(e4, t3) {
          var n2 = this.messages[0], o3 = this.messages.length;
          (!e4.lastTimestamp || o3 > 0 && n2.timestamp === e4.lastTimestamp) && (this.messages = t3.concat(this.messages));
        }, e3.prototype.findMessageByTime = function(e4) {
          return this.messages.find(function(t3) {
            return e4 === t3.timestamp;
          });
        }, e3.prototype.findMessagesByTimes = function(e4) {
          var t3 = this, n2 = [];
          return e4.forEach(function(e5) {
            var o3 = t3.findMessageByTime(e5);
            v.calibrator.isDef(o3) && n2.push(o3);
          }), n2;
        }, e3.prototype.existsMessage = function(e4) {
          return this.findMessageIndexById(e4) > -1;
        }, e3.prototype.findMessageIndexById = function(e4) {
          return this.messages.findIndex(function(t3) {
            return e4 === t3.messageId;
          });
        }, e3.prototype.deleteMessage = function(e4) {
          var t3 = this.findMessageIndexById(e4);
          t3 >= 0 && this.messages.splice(t3, 1);
        }, e3.prototype.recallMessages = function(e4) {
          var t3 = this;
          e4.forEach(function(e5) {
            var n2 = t3.findMessageByTime(e5.timestamp);
            v.calibrator.isDef(n2) && (n2.recalled = true), e5.recalled = true;
          });
        }, e3.prototype.isEmpty = function() {
          return this.messages.length === 0;
        }, e3.prototype.deleteMessages = function(e4) {
          var t3 = this;
          e4.forEach(function(e5) {
            t3.deleteMessage(e5.messageId);
          });
        }, e3.prototype.convertServerMessages = function(e4) {
          var t3 = this, n2 = [];
          return e4.forEach(function(e5) {
            t3.target.scene === p2.Scene.PRIVATE ? (e5.t = p2.Scene.PRIVATE, e5.r = e5.s === f2.IM.userId ? t3.target.id : f2.IM.userId) : (e5.t = p2.Scene.GROUP, e5.r = t3.target.id);
            var o3 = t3.builder.build(e5);
            if (!t3.existsMessage(o3.messageId)) {
              if (o3.scene() === p2.Scene.PRIVATE) {
                var r2 = o3;
                r2.read = t3.userOffsetService.isRead(r2);
              }
              n2.push(o3);
            }
          }), n2;
        }, e3.prototype.markOthersSentRead = function(e4) {
          if (this.target.scene === p2.Scene.PRIVATE)
            for (var t3 = this.messages.length - 1; t3 >= 0; t3--) {
              var n2 = this.messages[t3];
              if (n2.senderId !== f2.IM.userId && n2.timestamp <= e4) {
                if (n2.read)
                  break;
                n2.read = true;
              }
            }
        }, e3.prototype.markMySentRead = function(e4) {
          for (var t3 = new Array(), n2 = this.messages.length - 1; n2 >= 0; n2--) {
            var o3 = this.messages[n2], r2 = o3;
            if (r2.senderId === f2.IM.userId && o3.timestamp <= e4 && o3.status === p2.MessageStatus.SUCCESS) {
              if (r2.read)
                break;
              r2.read = true, t3.push(r2);
            }
          }
          return t3;
        }, e3.prototype.saveMessage = function(t3) {
          e3.sortedInserter.insert(this.messages, t3), this.sliceOverlengthMessages();
        }, e3.prototype.maxSuccessMessageTime = function() {
          for (var e4 = this.messages.length - 1; e4 >= 0; e4--)
            if (this.messages[e4].status === p2.MessageStatus.SUCCESS)
              return this.messages[e4].timestamp;
          return 0;
        }, e3.prototype.minTime = function() {
          return this.isEmpty() ? 0 : this.messages[0].timestamp;
        }, e3.prototype.correctPosition = function(e4) {
          this.deleteMessage(e4.messageId), this.saveMessage(e4);
        }, e3.CACHE_MAX_LENGTH = 200, e3.sortedInserter = new (function(e4) {
          function t3() {
            return e4 !== null && e4.apply(this, arguments) || this;
          }
          return r(t3, e4), t3.prototype.compare = function(e5, t4) {
            var n2 = e5.timestamp - t4.timestamp;
            return n2 > 0 ? 1 : n2 === 0 ? 0 : -1;
          }, t3;
        }(g.SortedInserter))(), e3;
      }();
      t2["default"] = b;
    }, function(e2, t2, n) {
      t2.__esModule = true;
      var o2 = n(2), r = n(7), i = function() {
        return function(e3) {
          r.calibrator.isDef(e3.userId) ? (this.scene = o2.Scene.PRIVATE, this.id = e3.userId) : (this.scene = o2.Scene.GROUP, this.id = e3.groupId), this.id = this.id.toString(), this.lastTimestamp = e3.lastTimestamp, this.limit = e3.limit;
        };
      }();
      t2["default"] = i;
    }, function(e2, t2, n) {
      var o2 = this && this.__awaiter || function(e3, t3, n2, o3) {
        return new (n2 || (n2 = Promise))(function(r2, i2) {
          function s2(e4) {
            try {
              u2(o3.next(e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function a2(e4) {
            try {
              u2(o3["throw"](e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function u2(e4) {
            var t4;
            e4.done ? r2(e4.value) : (t4 = e4.value, t4 instanceof n2 ? t4 : new n2(function(e5) {
              e5(t4);
            })).then(s2, a2);
          }
          u2((o3 = o3.apply(e3, t3 || [])).next());
        });
      }, r = this && this.__generator || function(e3, t3) {
        var n2, o3, r2, i2, s2 = { label: 0, sent: function() {
          if (1 & r2[0])
            throw r2[1];
          return r2[1];
        }, trys: [], ops: [] };
        return i2 = { next: a2(0), "throw": a2(1), "return": a2(2) }, typeof Symbol == "function" && (i2[Symbol.iterator] = function() {
          return this;
        }), i2;
        function a2(i3) {
          return function(a3) {
            return function(i4) {
              if (n2)
                throw new TypeError("Generator is already executing.");
              for (; s2; )
                try {
                  if (n2 = 1, o3 && (r2 = 2 & i4[0] ? o3["return"] : i4[0] ? o3["throw"] || ((r2 = o3["return"]) && r2.call(o3), 0) : o3.next) && !(r2 = r2.call(o3, i4[1])).done)
                    return r2;
                  switch (o3 = 0, r2 && (i4 = [2 & i4[0], r2.value]), i4[0]) {
                    case 0:
                    case 1:
                      r2 = i4;
                      break;
                    case 4:
                      return s2.label++, { value: i4[1], done: false };
                    case 5:
                      s2.label++, o3 = i4[1], i4 = [0];
                      continue;
                    case 7:
                      i4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!(r2 = (r2 = s2.trys).length > 0 && r2[r2.length - 1]) && (i4[0] === 6 || i4[0] === 2)) {
                        s2 = 0;
                        continue;
                      }
                      if (i4[0] === 3 && (!r2 || i4[1] > r2[0] && i4[1] < r2[3])) {
                        s2.label = i4[1];
                        break;
                      }
                      if (i4[0] === 6 && s2.label < r2[1]) {
                        s2.label = r2[1], r2 = i4;
                        break;
                      }
                      if (r2 && s2.label < r2[2]) {
                        s2.label = r2[2], s2.ops.push(i4);
                        break;
                      }
                      r2[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  i4 = t3.call(e3, s2);
                } catch (a4) {
                  i4 = [6, a4], o3 = 0;
                } finally {
                  n2 = r2 = 0;
                }
              if (5 & i4[0])
                throw i4[1];
              return { value: i4[0] ? i4[1] : void 0, done: true };
            }([i3, a3]);
          };
        }
      };
      t2.__esModule = true;
      var i = n(6), s = n(3), a = n(1), u = n(4), c = n(2), l = n(147), f2 = n(5), p2 = n(148), h = function() {
        function e3(e4) {
          this.userOffsets = new p2.UserOffsets(), this.target = e4;
        }
        return e3.prototype.isRead = function(e4) {
          var t3 = e4.timestamp;
          return e4.senderId === i.IM.userId ? this.userOffsets.getOffset(e4.receiverId) >= t3 : this.userOffsets.myOffset() >= t3;
        }, e3.prototype.manualMark = function(e4) {
          return o2(this, void 0, void 0, function() {
            var t3;
            return r(this, function(n2) {
              switch (n2.label) {
                case 0:
                  return this.userOffsets.markingTime = e4, t3 = this.userOffsets.myOffset(), e4 > t3 ? [4, this.updateServerOffsets(e4)] : [3, 2];
                case 1:
                  if (n2.sent(), e4 === this.userOffsets.markingTime)
                    return this.userOffsets.updateMyOffset(e4), [2, true];
                  n2.label = 2;
                case 2:
                  return [2, false];
              }
            });
          });
        }, e3.prototype.updateMyOffset = function(e4) {
          return this.userOffsets.updateMyOffset(e4);
        }, e3.prototype.updateOffset = function(e4, t3) {
          this.userOffsets.updateOffset(e4, t3);
        }, e3.prototype.updateServerOffsets = function(e4) {
          return o2(this, void 0, void 0, function() {
            var t3, n2;
            return r(this, function(o3) {
              return (t3 = new l.ReadMessageMarkRequest()).lastTimestamp = e4, t3.lastConsumedTimestamp = this.userOffsets.myOffset(), n2 = f2.RocketTypes.markGroupMessageAsRead, this.target.scene === c.Scene.PRIVATE ? (t3.friendId = this.target.id, n2 = f2.RocketTypes.markPrivateMessageAsRead) : t3.groupId = this.target.id, [2, new Promise(function(e5, o4) {
                var r2 = new s["default"]({ name: n2, params: t3, permission: a["default"].WRITE, singleTimeout: u.SocketTimeout.commonRequestSingle, totalTimeout: u.SocketTimeout.commonRequestTotal, success: function(t4) {
                  t4.code === 200 ? e5(t4) : o4(t4);
                }, fail: function(e6) {
                  o4(e6);
                } });
                i.im._goEasySocket.emit(r2);
              })];
            });
          });
        }, e3.prototype.updateUserOffsets = function(e4) {
          this.userOffsets.updateUserOffsets(e4);
        }, e3.prototype.myOffset = function() {
          return this.userOffsets.myOffset();
        }, e3;
      }();
      t2["default"] = h;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.ReadMessageMarkRequest = void 0;
      var o2 = function() {
        return function() {
        };
      }();
      t2.ReadMessageMarkRequest = o2;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.UserOffsets = void 0;
      var o2 = n(7), r = n(6), i = function() {
        function e3() {
          this.offsetMap = /* @__PURE__ */ new Map(), this.markingTime = 0;
        }
        return e3.prototype.updateOffset = function(e4, t3) {
          var n2 = this.offsetMap.get(e4);
          return o2.calibrator.isDef(n2) ? t3 > n2 && (this.offsetMap.set(e4, t3), true) : (this.offsetMap.set(e4, t3), true);
        }, e3.prototype.updateUserOffsets = function(e4) {
          var t3 = this;
          e4.forEach(function(e5) {
            var n2 = e5.userId, o3 = e5.offset;
            t3.updateOffset(n2, o3);
          });
        }, e3.prototype.updateMyOffset = function(e4) {
          return this.updateOffset(r.IM.userId, e4);
        }, e3.prototype.myOffset = function() {
          return this.getOffset(r.IM.userId);
        }, e3.prototype.getOffset = function(e4) {
          var t3 = this.offsetMap.get(e4);
          return t3 || 0;
        }, e3;
      }();
      t2.UserOffsets = i;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.DeleteMessageRequest = void 0;
      var o2 = n(2), r = n(17), i = function() {
        return function(e3) {
          var t3 = this;
          this.times = new Array();
          var n2 = e3[0], i2 = r.Target.byIMMessage(n2);
          this.scene = i2.scene, this.targetId = i2.id, e3.forEach(function(e4) {
            e4.status === o2.MessageStatus.SUCCESS && t3.times.push(e4.timestamp);
          }), this.times.sort(function(e4, t4) {
            return e4 < t4 ? -1 : e4 == t4 ? 0 : 1;
          });
        };
      }();
      t2.DeleteMessageRequest = i;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.ChangeSynchronizer = void 0;
      var o2 = n(151), r = n(3), i = n(5), s = n(1), a = n(4), u = n(152), c = n(10), l = n(20), f2 = n(153), p2 = n(6), h = n(154), d = n(63), y = function() {
        function e3() {
        }
        return e3.sync = function(e4, t3, n2, y2) {
          var m = new o2["default"](e4, t3, n2, y2);
          return new Promise(function(n3, o3) {
            var y3 = new r["default"]({ name: i.RocketTypes.IM_HISTORY_CHANGE, params: m, permission: s["default"].READ, singleTimeout: a.SocketTimeout.commonQuerySingle, totalTimeout: a.SocketTimeout.commonQueryTotal, fail: function(e5) {
              o3(e5);
            }, success: function(r2) {
              if (r2.code === 200) {
                var i2 = r2.content;
                i2.userOffsets.forEach(function(n4) {
                  var o4 = n4.userId, r3 = n4.offset, i3 = new u.ReadMessageMarkedRemoteEvent(e4, o4, t3, r3);
                  c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.REMOTE_MESSAGE_READ, i3);
                });
                var s2 = i2.deletedMessageTimes;
                if (s2.length > 0) {
                  var a2 = new f2.MessageDeletedRemoteEvent(e4, p2.IM.userId, t3, s2);
                  c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.REMOTE_MESSAGE_DELETED, a2);
                }
                if (i2.recalled.length > 0) {
                  var y4 = d["default"].conversationId(e4, p2.IM.userId, t3), m2 = new h.MessageRecalledRemoteEvent(e4, y4, i2.recalled);
                  c.GoEasyEventCenter.fire(l.IM_INTERNAL_EVENTS.REMOTE_MESSAGE_RECALLED, m2);
                }
                n3(r2);
              } else
                o3(r2);
            } });
            p2.im._goEasySocket.emit(y3);
          });
        }, e3;
      }();
      t2.ChangeSynchronizer = y;
    }, function(e2, t2, n) {
      t2.__esModule = true;
      var o2 = function() {
        return function(e3, t3, n2, o3) {
          this.scene = e3, this.id = t3, this.after = n2, this.min = o3;
        };
      }();
      t2["default"] = o2;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.ReadMessageMarkedRemoteEvent = void 0;
      var o2 = function() {
        return function(e3, t3, n2, o3) {
          this.scene = e3, this.markerId = t3, this.targetId = n2, this.time = o3;
        };
      }();
      t2.ReadMessageMarkedRemoteEvent = o2;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.MessageDeletedRemoteEvent = void 0;
      var o2 = function() {
        return function(e3, t3, n2, o3) {
          this.scene = e3, this.deleterId = t3, this.targetId = n2, this.times = o3;
        };
      }();
      t2.MessageDeletedRemoteEvent = o2;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.MessageRecalledRemoteEvent = void 0;
      var o2 = function() {
        return function(e3, t3, n2) {
          this.scene = e3, this.conversationId = t3, this.times = n2;
        };
      }();
      t2.MessageRecalledRemoteEvent = o2;
    }, function(e2, t2, n) {
      t2.__esModule = true, t2.RecallMessageRequest = void 0;
      var o2 = n(17), r = function() {
        return function(e3) {
          var t3 = this;
          this.times = new Array();
          var n2 = e3[0], r2 = o2.Target.byIMMessage(n2);
          this.scene = r2.scene, this.targetId = r2.id, e3.forEach(function(e4) {
            t3.times.push(e4.timestamp);
          }), this.times.sort(function(e4, t4) {
            return e4 < t4 ? -1 : e4 == t4 ? 0 : 1;
          });
        };
      }();
      t2.RecallMessageRequest = r;
    }, function(e2, t2, n) {
      var o2 = this && this.__awaiter || function(e3, t3, n2, o3) {
        return new (n2 || (n2 = Promise))(function(r2, i2) {
          function s2(e4) {
            try {
              u2(o3.next(e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function a2(e4) {
            try {
              u2(o3["throw"](e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function u2(e4) {
            var t4;
            e4.done ? r2(e4.value) : (t4 = e4.value, t4 instanceof n2 ? t4 : new n2(function(e5) {
              e5(t4);
            })).then(s2, a2);
          }
          u2((o3 = o3.apply(e3, t3 || [])).next());
        });
      }, r = this && this.__generator || function(e3, t3) {
        var n2, o3, r2, i2, s2 = { label: 0, sent: function() {
          if (1 & r2[0])
            throw r2[1];
          return r2[1];
        }, trys: [], ops: [] };
        return i2 = { next: a2(0), "throw": a2(1), "return": a2(2) }, typeof Symbol == "function" && (i2[Symbol.iterator] = function() {
          return this;
        }), i2;
        function a2(i3) {
          return function(a3) {
            return function(i4) {
              if (n2)
                throw new TypeError("Generator is already executing.");
              for (; s2; )
                try {
                  if (n2 = 1, o3 && (r2 = 2 & i4[0] ? o3["return"] : i4[0] ? o3["throw"] || ((r2 = o3["return"]) && r2.call(o3), 0) : o3.next) && !(r2 = r2.call(o3, i4[1])).done)
                    return r2;
                  switch (o3 = 0, r2 && (i4 = [2 & i4[0], r2.value]), i4[0]) {
                    case 0:
                    case 1:
                      r2 = i4;
                      break;
                    case 4:
                      return s2.label++, { value: i4[1], done: false };
                    case 5:
                      s2.label++, o3 = i4[1], i4 = [0];
                      continue;
                    case 7:
                      i4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!(r2 = (r2 = s2.trys).length > 0 && r2[r2.length - 1]) && (i4[0] === 6 || i4[0] === 2)) {
                        s2 = 0;
                        continue;
                      }
                      if (i4[0] === 3 && (!r2 || i4[1] > r2[0] && i4[1] < r2[3])) {
                        s2.label = i4[1];
                        break;
                      }
                      if (i4[0] === 6 && s2.label < r2[1]) {
                        s2.label = r2[1], r2 = i4;
                        break;
                      }
                      if (r2 && s2.label < r2[2]) {
                        s2.label = r2[2], s2.ops.push(i4);
                        break;
                      }
                      r2[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  i4 = t3.call(e3, s2);
                } catch (a4) {
                  i4 = [6, a4], o3 = 0;
                } finally {
                  n2 = r2 = 0;
                }
              if (5 & i4[0])
                throw i4[1];
              return { value: i4[0] ? i4[1] : void 0, done: true };
            }([i3, a3]);
          };
        }
      };
      t2.__esModule = true;
      var i = n(2), s = n(8), a = n(7), u = n(5), c = n(3), l = n(1), f2 = n(4), p2 = n(6), h = n(157), d = function() {
        function e3(e4) {
          this.conversations = e4;
        }
        return e3.prototype.remove = function(e4, t3) {
          return o2(this, void 0, void 0, function() {
            var n2;
            return r(this, function(o3) {
              switch (o3.label) {
                case 0:
                  return o3.trys.push([0, 2, , 3]), [4, this.removeServerConversation(e4.scene, e4.id)];
                case 1:
                  return o3.sent(), this.removeLocalConversation(e4), s.CallbackUtils.onSuccess(t3), [3, 3];
                case 2:
                  return n2 = o3.sent(), s.CallbackUtils.onFailed(t3, n2), [3, 3];
                case 3:
                  return [2];
              }
            });
          });
        }, e3.prototype.removeLocalConversation = function(e4) {
          var t3 = e4.scene, n2 = e4.id, o3 = this.conversations.findConversation(t3, n2);
          a.calibrator.isDef(o3) && (this.conversations.removeLocalConversation(o3), this.conversations.onUpdated());
        }, e3.prototype.removeServerConversation = function(e4, t3) {
          var n2 = new h["default"](e4, t3);
          return new Promise(function(e5, t4) {
            var o3 = new c["default"]({ name: u.RocketTypes.removeConversation, params: n2, permission: l["default"].WRITE, singleTimeout: f2.SocketTimeout.commonRequestSingle, totalTimeout: f2.SocketTimeout.commonRequestTotal, success: function(n3) {
              n3.code == 200 ? e5(n3) : t4(n3);
            }, fail: function(e6) {
              t4(e6);
            } });
            p2.im._goEasySocket.emit(o3);
          });
        }, e3.prototype.validateOptions = function(e4, t3) {
          if (a.calibrator.isUndef(t3))
            throw { code: 400, content: "Failed to remove conversation: bad parameters" };
          if (!a.calibrator.isObject(t3))
            return s.CallbackUtils.onFailed(t3, { code: 400, content: "Failed to remove conversation: bad parameters" }), false;
          var n2, o3;
          e4 === i.Scene.PRIVATE ? (n2 = t3.userId, o3 = "Failed to remove conversation: userId requires string or number") : (n2 = t3.groupId, o3 = "Failed to remove conversation: groupId requires string or number");
          if (a.calibrator.isUndef(n2) || a.calibrator.isEmpty(n2) || !a.calibrator.isStringOrNumber(n2))
            return s.CallbackUtils.onFailed(t3, { code: 400, content: o3 }), false;
          var r2 = this.conversations.findConversation(e4, n2.toString());
          return !a.calibrator.isUndef(r2) || (s.CallbackUtils.onFailed(t3, { code: 400, content: "Failed to remove conversation: conversation doesn not exists" }), false);
        }, e3;
      }();
      t2["default"] = d;
    }, function(e2, t2, n) {
      t2.__esModule = true;
      var o2 = function() {
        return function(e3, t3) {
          this.type = e3, this.targetId = t3;
        };
      }();
      t2["default"] = o2;
    }, function(e2, t2, n) {
      var o2 = this && this.__awaiter || function(e3, t3, n2, o3) {
        return new (n2 || (n2 = Promise))(function(r2, i2) {
          function s2(e4) {
            try {
              u2(o3.next(e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function a2(e4) {
            try {
              u2(o3["throw"](e4));
            } catch (t4) {
              i2(t4);
            }
          }
          function u2(e4) {
            var t4;
            e4.done ? r2(e4.value) : (t4 = e4.value, t4 instanceof n2 ? t4 : new n2(function(e5) {
              e5(t4);
            })).then(s2, a2);
          }
          u2((o3 = o3.apply(e3, t3 || [])).next());
        });
      }, r = this && this.__generator || function(e3, t3) {
        var n2, o3, r2, i2, s2 = { label: 0, sent: function() {
          if (1 & r2[0])
            throw r2[1];
          return r2[1];
        }, trys: [], ops: [] };
        return i2 = { next: a2(0), "throw": a2(1), "return": a2(2) }, typeof Symbol == "function" && (i2[Symbol.iterator] = function() {
          return this;
        }), i2;
        function a2(i3) {
          return function(a3) {
            return function(i4) {
              if (n2)
                throw new TypeError("Generator is already executing.");
              for (; s2; )
                try {
                  if (n2 = 1, o3 && (r2 = 2 & i4[0] ? o3["return"] : i4[0] ? o3["throw"] || ((r2 = o3["return"]) && r2.call(o3), 0) : o3.next) && !(r2 = r2.call(o3, i4[1])).done)
                    return r2;
                  switch (o3 = 0, r2 && (i4 = [2 & i4[0], r2.value]), i4[0]) {
                    case 0:
                    case 1:
                      r2 = i4;
                      break;
                    case 4:
                      return s2.label++, { value: i4[1], done: false };
                    case 5:
                      s2.label++, o3 = i4[1], i4 = [0];
                      continue;
                    case 7:
                      i4 = s2.ops.pop(), s2.trys.pop();
                      continue;
                    default:
                      if (!(r2 = (r2 = s2.trys).length > 0 && r2[r2.length - 1]) && (i4[0] === 6 || i4[0] === 2)) {
                        s2 = 0;
                        continue;
                      }
                      if (i4[0] === 3 && (!r2 || i4[1] > r2[0] && i4[1] < r2[3])) {
                        s2.label = i4[1];
                        break;
                      }
                      if (i4[0] === 6 && s2.label < r2[1]) {
                        s2.label = r2[1], r2 = i4;
                        break;
                      }
                      if (r2 && s2.label < r2[2]) {
                        s2.label = r2[2], s2.ops.push(i4);
                        break;
                      }
                      r2[2] && s2.ops.pop(), s2.trys.pop();
                      continue;
                  }
                  i4 = t3.call(e3, s2);
                } catch (a4) {
                  i4 = [6, a4], o3 = 0;
                } finally {
                  n2 = r2 = 0;
                }
              if (5 & i4[0])
                throw i4[1];
              return { value: i4[0] ? i4[1] : void 0, done: true };
            }([i3, a3]);
          };
        }
      };
      t2.__esModule = true;
      var i = n(2), s = n(8), a = n(7), u = n(5), c = n(3), l = n(1), f2 = n(4), p2 = n(6), h = n(159), d = function() {
        function e3(e4) {
          this.conversations = e4;
        }
        return e3.prototype.top = function(e4, t3, n2) {
          return o2(this, void 0, void 0, function() {
            var o3;
            return r(this, function(r2) {
              switch (r2.label) {
                case 0:
                  return r2.trys.push([0, 2, , 3]), [4, this.topServerConversation(e4, t3)];
                case 1:
                  return r2.sent(), this.topLocalConversation(e4, t3), s.CallbackUtils.onSuccess(n2), [3, 3];
                case 2:
                  return o3 = r2.sent(), s.CallbackUtils.onFailed(n2, o3), [3, 3];
                case 3:
                  return [2];
              }
            });
          });
        }, e3.prototype.topLocalConversation = function(e4, t3) {
          var n2 = e4.scene, o3 = e4.id, r2 = this.conversations.findConversation(n2, o3);
          a.calibrator.isDef(r2) && this.conversations.topLocalConversation(r2, t3);
        }, e3.prototype.topServerConversation = function(e4, t3) {
          var n2 = new h["default"](e4.scene, t3, e4.id);
          return new Promise(function(e5, t4) {
            var o3 = new c["default"]({ name: u.RocketTypes.topConversation, params: n2, permission: l["default"].WRITE, singleTimeout: f2.SocketTimeout.commonRequestSingle, totalTimeout: f2.SocketTimeout.commonRequestTotal, success: function(n3) {
              n3.code === 200 ? e5(n3) : t4(n3);
            }, fail: function(e6) {
              t4(e6);
            } });
            p2.im._goEasySocket.emit(o3);
          });
        }, e3.prototype.validateOptions = function(e4, t3) {
          if (a.calibrator.isUndef(t3))
            throw { code: 400, content: "Failed to top conversation: bad parameters" };
          if (!a.calibrator.isObject(t3))
            return s.CallbackUtils.onFailed(t3, { code: 400, content: "Failed to top conversation: bad parameters" }), false;
          var n2, o3, r2, u2;
          e4 === i.Scene.PRIVATE ? (n2 = (u2 = t3).top, o3 = u2.userId, r2 = "Failed to top conversation: userId requires string or number") : (n2 = (u2 = t3).top, o3 = u2.groupId, r2 = "Failed to top conversation: groupId requires string or number");
          if (a.calibrator.isUndef(o3) || a.calibrator.isEmpty(o3) || !a.calibrator.isStringOrNumber(o3))
            return s.CallbackUtils.onFailed(t3, { code: 400, content: r2 }), false;
          if (!a.calibrator.isBoolean(n2))
            return s.CallbackUtils.onFailed(t3, { code: 400, content: "Failed to top conversation: top requires boolean" }), false;
          var c2 = this.conversations.findConversation(e4, o3.toString());
          return a.calibrator.isUndef(c2) ? (s.CallbackUtils.onFailed(t3, { code: 400, content: "Failed to top conversation: conversation does not exists" }), false) : c2.top !== n2 || (s.CallbackUtils.onFailed(t3, { code: 400, content: "Failed to top conversation: no change" }), false);
        }, e3;
      }();
      t2["default"] = d;
    }, function(e2, t2, n) {
      t2.__esModule = true;
      var o2 = function() {
        return function(e3, t3, n2) {
          this.type = e3, this.top = t3, this.targetId = n2;
        };
      }();
      t2["default"] = o2;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = n(0), i = c(n(3)), s = c(n(1)), a = n(4), u = n(5);
      function c(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var l = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.pubSub = null, this.pubSub = t3;
        }
        return o2(e3, [{ key: "get", value: function(e4, t3) {
          if (r.calibrator.isFunction(e4.onSuccess) || (e4.onSuccess = r.noop), r.calibrator.isFunction(e4.onFailed) || (e4.onFailed = r.noop), r.calibrator.isDef(e4.channel)) {
            r.calibrator.isNumber(e4.channel) && (e4.channel = e4.channel.toString());
            var n2 = new i["default"]({ name: u.RocketTypes.historyMessages, permission: s["default"].READ, params: e4, singleTimeout: a.SocketTimeout.commonQuerySingle, totalTimeout: a.SocketTimeout.commonQueryTotal, success: function(t4) {
              e4.onSuccess({ code: t4.resultCode || t4.code || 200, content: t4.content });
            }, fail: function(t4) {
              e4.onFailed({ code: t4.resultCode || t4.code, content: t4.content });
            } });
            this.pubSub.goEasySocket.emit(n2);
          } else
            e4.onFailed(res);
        } }]), e3;
      }();
      t2["default"] = l;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = n(0), i = c(n(3)), s = c(n(1)), a = n(4), u = n(5);
      function c(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var l = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.pubSub = null, this.pubSub = t3;
        }
        return o2(e3, [{ key: "byChannel", value: function(e4) {
          var t3 = { channels: [], includeUsers: false, distinct: false };
          if (r.calibrator.isFunction(e4.onSuccess) || (e4.onSuccess = r.noop), r.calibrator.isFunction(e4.onFailed) || (e4.onFailed = r.noop), Array.isArray(e4.channels))
            for (var n2 = 0; n2 < e4.channels.length; n2++) {
              var o3 = e4.channels[n2];
              r.calibrator.isNumber(o3) && (o3 = o3.toString()), t3.channels.push(o3);
            }
          if (t3.channels.length !== 0) {
            e4.includeUsers == 1 && (t3.includeUsers = true), e4.distinct == 1 && (t3.distinct = true);
            var c2 = new i["default"]({ name: u.RocketTypes.hereNow, permission: s["default"].READ, params: t3, singleTimeout: a.SocketTimeout.commonQuerySingle, totalTimeout: a.SocketTimeout.commonQueryTotal, success: function(t4) {
              var n3 = t4.content, o4 = n3.channels;
              for (var r2 in o4)
                if (o4.hasOwnProperty(r2)) {
                  var i2 = o4[r2];
                  i2.users && (i2.users = i2.users.map(function(e5) {
                    return e5.data = e5.data ? JSON.parse(e5.data) : {}, e5;
                  }));
                }
              e4.onSuccess({ code: t4.resultCode || t4.code || 200, content: n3 });
            }, fail: function(t4) {
              e4.onFailed({ code: t4.resultCode || t4.code || 200, content: t4.content });
            } });
            this.pubSub.goEasySocket.emit(c2);
          } else
            e4.onFailed({ code: 408, content: "channels is required." });
        } }, { key: "byUserId", value: function(e4) {
          var t3 = { userIds: [], distinct: true };
          if (r.calibrator.isFunction(e4.onSuccess) || (e4.onSuccess = r.noop), r.calibrator.isFunction(e4.onFailed) || (e4.onFailed = r.noop), r.calibrator.isDef(e4.userIds) && (t3.userIds = e4.userIds.map(function(e5) {
            return e5.toString();
          })), e4.distinct == 0 && (t3.distinct = false), t3.userIds.length === 0)
            e4.onFailed({ code: 400, content: "userIds is required" });
          else if (t3.userIds.length > 500)
            e4.onFailed({ code: 400, content: "userIds is over max length 500" });
          else {
            var n2 = new i["default"]({ name: u.RocketTypes.hereNowByUserIds, permission: s["default"].READ, params: t3, singleTimeout: a.SocketTimeout.commonQuerySingle, totalTimeout: a.SocketTimeout.commonQueryTotal, success: function(t4) {
              var n3 = t4.content;
              n3 = n3.map(function(e5) {
                var t5 = {};
                return t5.id = e5.userId, t5.data = e5.userData ? JSON.parse(e5.userData) : {}, t5;
              }), e4.onSuccess({ code: t4.resultCode || t4.code || 200, content: n3 });
            }, fail: function(t4) {
              e4.onFailed({ code: t4.resultCode || t4.code || 200, content: t4.content });
            } });
            this.pubSub.goEasySocket.emit(n2);
          }
        } }]), e3;
      }();
      t2["default"] = l;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = n(0), i = c(n(3)), s = c(n(1)), a = n(4), u = n(5);
      function c(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var l = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.pubSub = null, this.pubSub = t3;
        }
        return o2(e3, [{ key: "publish", value: function(e4) {
          if (r.calibrator.isFunction(e4.onFailed) || (e4.onFailed = r.noop), r.calibrator.isFunction(e4.onSuccess) || (e4.onSuccess = r.noop), r.calibrator.isEmpty(e4.channel))
            throw { code: 400, content: "channel is required." };
          if (r.calibrator.isNumber(e4.channel) && (e4.channel = e4.channel.toString()), r.calibrator.isEmpty(e4.message))
            throw { code: 400, content: "message is required." };
          if (r.calibrator.isNumber(e4.message) && (e4.message = e4.message.toString()), !r.calibrator.isString(e4.message))
            throw { code: 400, content: "TypeError: message requires string." };
          if (e4.message.length > 2500)
            throw { code: 400, content: "Message over max length 2500." };
          if (r.calibrator.isObject(e4.notification)) {
            if (r.calibrator.isEmpty(e4.notification.title))
              throw { code: 400, content: "notification.title is required." };
            if (!r.calibrator.isString(e4.notification.title))
              throw { code: 400, content: "TypeError: notification.title requires string." };
            if (e4.notification.title.length > 32)
              throw { code: 400, content: "TypeError: notification.title over max length 32." };
            if (r.calibrator.isEmpty(e4.notification.body))
              throw { code: 400, content: "notification.body is required." };
            if (!r.calibrator.isString(e4.notification.body))
              throw { code: 400, content: "TypeError: notification.body must be string." };
            if (e4.notification.body.length > 50)
              throw { code: 400, content: "notification.body over max length 50." };
          } else if (r.calibrator.isPrimitive(e4.notification))
            throw { code: 400, content: "TypeError: notification requires an object." };
          var t3 = { channel: e4.channel, content: e4.message, nt: e4.notification, at: e4.accessToken, guid: r.UUID.get() }, n2 = new i["default"]({ name: u.RocketTypes.publish, params: t3, unique: true, singleTimeout: a.SocketTimeout.commonRequestSingle, totalTimeout: a.SocketTimeout.commonRequestTotal, permission: s["default"].WRITE, success: function(t4) {
            e4.onSuccess({ code: 200, content: "ok" });
          }, fail: function(t4) {
            e4.onFailed({ code: t4.resultCode, content: t4.content });
          } });
          this.pubSub.goEasySocket.emit(n2);
        } }]), e3;
      }();
      t2["default"] = l;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = n(0), i = d(n(3)), s = d(n(1)), a = d(n(164)), u = n(4), c = d(n(12)), l = n(10), f2 = n(65), p2 = n(5), h = n(15);
      function d(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var y = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.subscriptions = [], this.pubSub = null, this.pubSub = t3;
        }
        return o2(e3, [{ key: "initialGoEasySocket", value: function() {
          var e4 = this.pubSub.goEasySocket;
          e4.addMessageObserver(h.RemoteEvents.message, this.onNewMessage.bind(this)), e4.addExpiredReconnectedObserver(this.onExpiredReconnected.bind(this)), e4.addConnectedObserver(this.onReconnected.bind(this));
        } }, { key: "resubscribe", value: function() {
          var e4 = this.subscriptions.slice(0);
          this.subscriptions = [];
          for (var t3 = 0; t3 < e4.length; t3++)
            e4[t3].channels.length != 0 && this.subscribe(e4[t3]);
        } }, { key: "onExpiredReconnected", value: function() {
          this.resubscribe();
        } }, { key: "onReconnected", value: function() {
          this.pubSub.neverConnect || this.pubSub.goEasySocket.status == c["default"].RECONNECTED || this.resubscribe();
        } }, { key: "onNewMessage", value: function(e4) {
          if (!(e4.n.indexOf("_presence") > -1)) {
            e4.a && this.pubSub.goEasySocket.sendAck("ack", { publishGuid: e4.i });
            var t3 = { time: e4.t, channel: e4.n, content: e4.c };
            l.GoEasyEventCenter.fire(f2.PUBSUB_INTERNAL_EVENTS.MESSAGE_RECEIVED, e4), this.findSubscriptionByChannel(t3.channel).onMessage(t3);
          }
        } }, { key: "formatOptions", value: function(e4) {
          var t3 = !r.calibrator.isEmpty(e4.channel), n2 = !r.calibrator.isEmpty(e4.channels);
          if (this.formatCallback(e4), r.calibrator.isFunction(e4.onMessage) || (e4.onMessage = r.noop), !t3 && !n2)
            return e4.onFailed({ code: 400, content: "channel is required" }), false;
          if (!t3 || !n2) {
            if (t3 && (r.calibrator.isNumber(e4.channel) && (e4.channel = e4.channel.toString()), e4.channels = [e4.channel]), n2) {
              if (!Array.isArray(e4.channels) || e4.channels.length == 0)
                return void e4.onFailed({ code: 400, content: "channels must be an array" });
              if (e4.channels.length > 500)
                return e4.onFailed({ code: 400, content: "channels over max length:500" }), false;
              for (var o3 = 0, i2 = e4.channels.length; o3 < i2; o3++)
                if (r.calibrator.isNumber(e4.channels[o3]) && (e4.channels[o3] = e4.channels[o3].toString()), r.calibrator.isEmpty(e4.channels[o3]))
                  return e4.onFailed({ code: 400, content: "Channels array contains empty channel" }), false;
            }
            return true;
          }
          e4.onFailed({ code: 400, content: "subscribe to either channel or channels, not both" });
        } }, { key: "formatCallback", value: function(e4) {
          r.calibrator.isFunction(e4.onSuccess) || (e4.onSuccess = r.noop), r.calibrator.isFunction(e4.onFailed) || (e4.onFailed = r.noop);
        } }, { key: "subscribe", value: function(e4) {
          var t3 = this;
          if (this.formatOptions(e4)) {
            var n2 = new i["default"]({ name: p2.RocketTypes.subscribe, permission: s["default"].READ, singleTimeout: u.SocketTimeout.commonInfiniteSingle, totalTimeout: u.SocketTimeout.commonInfiniteTotal, params: { channels: e4.channels, accessToken: e4.accessToken }, success: function() {
              var n3 = new a["default"]({ channels: e4.channels, accessToken: e4.accessToken, onSuccess: e4.onSuccess, onFailed: e4.onFailed, onMessage: e4.onMessage });
              t3.subscriptions.push(n3), e4.onSuccess({ code: 200, content: "ok" });
            }, fail: function(t4) {
              e4.onFailed({ code: t4.resultCode, content: t4.content });
            } });
            this.pubSub.goEasySocket.emit(n2);
          }
        } }, { key: "unsubscribe", value: function(e4) {
          var t3 = this;
          if (this.formatCallback(e4), r.calibrator.isDef(e4.channel))
            if (r.calibrator.isNumber(e4.channel) && (e4.channel = e4.channel.toString()), this.findSubscriptionByChannel(e4.channel)) {
              var n2 = new i["default"]({ name: p2.RocketTypes.unsubscribe, params: { channel: e4.channel }, permission: s["default"].READ, singleTimeout: u.SocketTimeout.commonRequestSingle, totalTimeout: u.SocketTimeout.commonRequestTotal, success: function() {
                e4.onSuccess({ code: 200, content: "ok" }), t3.removeChannel(e4.channel);
              }, fail: function(t4) {
                e4.onFailed({ code: t4.resultCode, content: t4.content });
              } });
              this.pubSub.goEasySocket.emit(n2);
            } else
              e4.onFailed({ code: 400, content: "channel[" + e4.channel + "] is not subscribed" });
          else
            e4.onFailed({ code: 400, content: "channel is required" });
        } }, { key: "removeChannel", value: function(e4) {
          for (var t3 = 0; t3 < this.subscriptions.length; t3++)
            for (var n2 = this.subscriptions[t3].channels, o3 = 0; o3 < n2.length; o3++)
              if (n2[o3] == e4) {
                this.subscriptions[t3].channels.splice(o3, 1);
                break;
              }
        } }, { key: "findSubscriptionByChannel", value: function(e4) {
          for (var t3 = false, n2 = null, o3 = this.subscriptions.length - 1; o3 >= 0; o3--) {
            for (var r2 = this.subscriptions[o3].channels, i2 = 0; i2 < r2.length; i2++)
              if (r2[i2] == e4) {
                t3 = true, n2 = this.subscriptions[o3];
                break;
              }
            if (t3)
              break;
          }
          return n2;
        } }]), e3;
      }();
      t2["default"] = y;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }();
      var r = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.channels = [], this.accessToken = null, this.onSuccess = null, this.onFailed = null, this.onMessage = null, this.channels = t3.channels, this.accessToken = t3.accessToken, this.onSuccess = t3.onSuccess, this.onFailed = t3.onFailed, this.onMessage = t3.onMessage;
        }
        return o2(e3, [{ key: "empty", value: function() {
        } }]), e3;
      }();
      t2["default"] = r;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }(), r = n(0), i = p2(n(3)), s = p2(n(1)), a = n(4), u = p2(n(166)), c = p2(n(12)), l = n(5), f2 = n(15);
      function p2(e3) {
        return e3 && e3.__esModule ? e3 : { "default": e3 };
      }
      var h = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.presenters = [], this.pubSub = null, this.pubSub = t3;
        }
        return o2(e3, [{ key: "initialGoEasySocket", value: function() {
          var e4 = this.pubSub.goEasySocket;
          e4.addMessageObserver(f2.RemoteEvents.message, this.onNewMessage.bind(this)), e4.addExpiredReconnectedObserver(this.onExpiredReconnected.bind(this)), e4.addConnectedObserver(this.onReconnected.bind(this));
        } }, { key: "resubscribe", value: function() {
          var e4 = this.presenters.slice(0);
          this.presenters = [];
          for (var t3 = 0; t3 < e4.length; t3++) {
            for (var n2 = 0; n2 < e4[t3].channels.length; n2++) {
              var o3 = e4[t3].channels[n2].split("_presence");
              e4[t3].channels[n2] = o3[0];
            }
            e4[t3].channels.length != 0 && this.subscribePresence(e4[t3]);
          }
        } }, { key: "onExpiredReconnected", value: function() {
          this.resubscribe();
        } }, { key: "onReconnected", value: function() {
          this.pubSub.neverConnect || this.pubSub.goEasySocket.status == c["default"].RECONNECTED || this.resubscribe();
        } }, { key: "onNewMessage", value: function(e4) {
          if (e4.n.indexOf("_presence") != -1) {
            var t3 = this.findPresenceByChannel(e4.n);
            if (t3) {
              var n2 = JSON.parse(e4.c);
              n2.events = n2.events.map(function(e5) {
                var t4 = e5.userData ? JSON.parse(e5.userData) : {};
                return { time: e5.time, action: e5.action, id: e5.userId, data: t4 };
              }), t3.onPresence(n2);
            }
          }
        } }, { key: "formatOptions", value: function(e4) {
          var t3 = !r.calibrator.isEmpty(e4.channel), n2 = !r.calibrator.isEmpty(e4.channels);
          if (this.formatCallback(e4), r.calibrator.isFunction(e4.onPresence) || (e4.onPresence = r.noop), !t3 && !n2)
            return e4.onFailed({ code: 400, content: "channel is required" }), false;
          if (!t3 || !n2) {
            if (t3 && (r.calibrator.isNumber(e4.channel) && (e4.channel = e4.channel.toString()), e4.channels = [e4.channel]), n2) {
              if (!Array.isArray(e4.channels) || e4.channels.length == 0)
                return void e4.onFailed({ code: 400, content: "channels must be an array" });
              if (e4.channels.length > 500)
                return e4.onFailed({ code: 400, content: "channels over max length:500" }), false;
              for (var o3 = 0, i2 = e4.channels.length; o3 < i2; o3++)
                if (r.calibrator.isNumber(e4.channels[o3]) && (e4.channels[o3] = e4.channels[o3].toString()), r.calibrator.isEmpty(e4.channels[o3]))
                  return e4.onFailed({ code: 400, content: "Channels array contains empty channel" }), false;
            }
            return true;
          }
          e4.onFailed({ code: 400, content: "subscribe to either channel or channels, not both" });
        } }, { key: "formatCallback", value: function(e4) {
          r.calibrator.isFunction(e4.onSuccess) || (e4.onSuccess = r.noop), r.calibrator.isFunction(e4.onFailed) || (e4.onFailed = r.noop);
        } }, { key: "subscribePresence", value: function(e4) {
          var t3 = this;
          if (this.formatOptions(e4)) {
            Array.isArray(e4.channels) && (e4.channels = e4.channels.map(function(e5) {
              return e5 += "_presence";
            }));
            var n2 = new i["default"]({ name: l.RocketTypes.subscribe, permission: s["default"].READ, singleTimeout: a.SocketTimeout.commonInfiniteSingle, totalTimeout: a.SocketTimeout.commonInfiniteTotal, params: { channels: e4.channels }, success: function() {
              var n3 = new u["default"]({ channels: e4.channels, onSuccess: e4.onSuccess, onFailed: e4.onFailed, onPresence: e4.onPresence });
              t3.presenters.push(n3), e4.onSuccess({ code: 200, content: "ok" });
            }, fail: function(t4) {
              e4.onFailed({ code: t4.resultCode, content: t4.content });
            } });
            this.pubSub.goEasySocket.emit(n2);
          }
        } }, { key: "unsubscribePresence", value: function(e4) {
          var t3 = this;
          if (this.formatCallback(e4), r.calibrator.isDef(e4.channel))
            if (e4.channel += "_presence", this.findPresenceByChannel(e4.channel)) {
              var n2 = new i["default"]({ name: l.RocketTypes.unsubscribe, params: { channel: e4.channel }, permission: s["default"].READ, singleTimeout: a.SocketTimeout.commonRequestSingle, totalTimeout: a.SocketTimeout.commonRequestTotal, success: function() {
                e4.onSuccess({ code: 200, content: "ok" }), t3.removeChannel(e4.channel);
              }, fail: function(t4) {
                e4.onFailed({ code: t4.resultCode, content: t4.content });
              } });
              this.pubSub.goEasySocket.emit(n2);
            } else
              e4.onFailed({ code: 400, content: "channel[" + e4.channel + "] is not subscribed" });
          else
            e4.onFailed({ code: 400, content: "channel is required" });
        } }, { key: "removeChannel", value: function(e4) {
          for (var t3 = 0; t3 < this.presenters.length; t3++)
            for (var n2 = this.presenters[t3].channels, o3 = 0; o3 < n2.length; o3++)
              if (n2[o3] == e4) {
                this.presenters[t3].channels.splice(o3, 1);
                break;
              }
        } }, { key: "findPresenceByChannel", value: function(e4) {
          for (var t3 = false, n2 = null, o3 = this.presenters.length - 1; o3 >= 0; o3--) {
            for (var r2 = this.presenters[o3].channels, i2 = 0; i2 < r2.length; i2++)
              if (r2[i2] == e4) {
                t3 = true, n2 = this.presenters[o3];
                break;
              }
            if (t3)
              break;
          }
          return n2;
        } }]), e3;
      }();
      t2["default"] = h;
    }, function(e2, t2, n) {
      Object.defineProperty(t2, "__esModule", { value: true });
      var o2 = function() {
        function e3(e4, t3) {
          for (var n2 = 0; n2 < t3.length; n2++) {
            var o3 = t3[n2];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
          }
        }
        return function(t3, n2, o3) {
          return n2 && e3(t3.prototype, n2), o3 && e3(t3, o3), t3;
        };
      }();
      var r = function() {
        function e3(t3) {
          !function(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, e3), this.channels = [], this.onSuccess = null, this.onFailed = null, this.onPresence = null, this.channels = t3.channels, this.onSuccess = t3.onSuccess, this.onFailed = t3.onFailed, this.onPresence = t3.onPresence;
        }
        return o2(e3, [{ key: "empty", value: function() {
        } }]), e3;
      }();
      t2["default"] = r;
    }, function(e2, t2, n) {
      var o2 = this && this.__read || function(e3, t3) {
        var n2 = typeof Symbol == "function" && e3[Symbol.iterator];
        if (!n2)
          return e3;
        var o3, r2, i2 = n2.call(e3), s2 = [];
        try {
          for (; (t3 === void 0 || t3-- > 0) && !(o3 = i2.next()).done; )
            s2.push(o3.value);
        } catch (a2) {
          r2 = { error: a2 };
        } finally {
          try {
            o3 && !o3.done && (n2 = i2["return"]) && n2.call(i2);
          } finally {
            if (r2)
              throw r2.error;
          }
        }
        return s2;
      };
      t2.__esModule = true, t2.GoEasyNotification = void 0;
      var r = n(27), i = n(0), s = n(10), a = n(65), u = n(18), c = n(23), l = n(6), f2 = n(2), p2 = n(57), h = function() {
        function e3(e4) {
          this.uniappPlugin = null, this.regIdPromise = null, this.onClickNotificationCallback = null, this.allowNotification = e4, this.supportNotification() && (this.uniappPlugin = index.requireNativePlugin("GoEasy-Uniapp"), this.uniappPlugin ? this.regIdPromise = this.askRegId() : console.warn("No GoEasy-Uniapp Native Plugin."));
        }
        return e3.prototype.listenNewMessage = function() {
          var e4 = this;
          this.supportNotification() && (s.GoEasyEventCenter.on(p2.SocketEvents.IM_MESSAGE_RECEIVED, function(t3) {
            return e4.onReceivedIMMessage(t3);
          }), s.GoEasyEventCenter.on(a.PUBSUB_INTERNAL_EVENTS.MESSAGE_RECEIVED, function(t3) {
            return e4.onReceivedPubSubMessage(t3);
          }));
        }, e3.prototype.onReceivedIMMessage = function(e4) {
          var t3 = this, n2 = e4.nt;
          if (i.calibrator.isObject(n2) && r.uniApp.runningBackend() && e4.s !== l.IM.userId) {
            var s2 = e4.i, a2 = e4.ts, u2 = e4.mt, c2 = e4.s, p3 = e4.r, h2 = e4.r, d = e4.t, y = { id: s2, tm: a2, t: u2, sid: c2, rid: p3, gid: h2, tt: d, nt: n2, sd: null, gd: null };
            d === f2.Scene.PRIVATE ? l.im._dataCache.loadData(c2, d).then(function(e5) {
              y.sd = JSON.stringify(e5), t3.createLocalNotification(y);
            })["catch"](function(e5) {
              t3.createLocalNotification(y);
            }) : d === f2.Scene.GROUP ? Promise.all([l.im._dataCache.loadData(c2, f2.Scene.PRIVATE), l.im._dataCache.loadData(h2, f2.Scene.GROUP)]).then(function(e5) {
              var n3 = o2(e5, 2), r2 = n3[0], i2 = n3[1];
              y.sd = JSON.stringify(r2), y.gd = JSON.stringify(i2), t3.createLocalNotification(y);
            })["catch"](function(e5) {
              t3.createLocalNotification(y);
            }) : this.createLocalNotification(y);
          }
        }, e3.prototype.onReceivedPubSubMessage = function(e4) {
          if (i.calibrator.isObject(e4.nt) && r.uniApp.runningBackend()) {
            var t3 = { tm: e4.t, ch: e4.n, ctt: e4.c, nt: e4.nt };
            this.createLocalNotification(t3);
          }
        }, e3.prototype.createLocalNotification = function(e4) {
          JSON.stringify(e4);
          var t3 = e4.nt.t, n2 = e4.nt.c, o3 = Object.assign({ title: t3, body: n2 }, e4, { g: 1 });
          JSON.stringify(o3), delete o3.nt, i.calibrator.isObject(o3) && o3.body && o3.title ? typeof plus != "undefined" && plus.push.createMessage(o3.body, JSON.stringify(o3), { title: o3.title }) : console.warn("The notification message must contain the <title> and <body> fields");
        }, e3.prototype.askRegId = function() {
          var e4 = this, t3 = null, n2 = 0, o3 = function() {
            return new Promise(function(r2, i2) {
              e4.uniappPlugin.regId(function(e5) {
                r2(e5);
              }, function(r3) {
                if (!(r3.data.code === 1e6 && n2 <= 10))
                  return clearTimeout(t3), i2(r3);
                t3 = setTimeout(function() {
                  n2++, e4.regIdPromise = o3();
                }, 3500);
              });
            });
          };
          return o3();
        }, e3.prototype.getRegIdPromise = function() {
          return this.regIdPromise;
        }, e3.prototype.supportNotification = function() {
          var e4 = c.PlatformDetector.currentPlatform(), t3 = u.FrameworkDetector.currentFramework();
          return this.allowNotification && t3 === u.Framework.UNIAPP && (e4 === c.Platform.APP_ANDROID || e4 === c.Platform.APP_IOS);
        }, e3.prototype.parseMessage = function(e4) {
          return e4.ch ? { channel: e4.ch, content: e4.ctt } : { messageId: e4.id, timestamp: e4.tm, type: e4.t, senderId: e4.sid, senderData: e4.sd ? JSON.parse(e4.sd) : void 0, toType: e4.tt, groupId: e4.gid, groupData: e4.gd ? JSON.parse(e4.gd) : void 0 };
        }, e3.prototype.listenPlusClickNotification = function() {
          var e4 = this;
          plus.push.addEventListener("click", function(t3) {
            if (t3 && t3.payload)
              try {
                var n2 = typeof t3.payload == "string" ? JSON.parse(t3.payload) : t3.payload, o3 = e4.parseMessage(n2);
                plus.push.clear(), e4.onClickNotificationCallback(o3);
              } catch (r2) {
              }
          });
        }, e3.prototype.availableIntent = function(e4) {
          return e4 && Object.keys(e4).length && e4.g && parseInt(e4.g) === 1;
        }, e3.prototype.extactIntentIfXiaoMi = function(e4) {
          var t3 = /content=\{(\{.*\})\},/;
          if (e4.key_message && t3.exec(e4.key_message)) {
            var n2 = e4.key_message.match(t3);
            e4 = n2.length ? JSON.parse(n2[1]) : null;
          }
          return e4;
        }, e3.prototype.getIntentData = function() {
          var e4 = this;
          this.uniappPlugin.getIntentData(function(t3) {
            if (e4.availableIntent(t3)) {
              var n2 = e4.parseMessage(t3), o3 = c.PlatformDetector.currentPlatform();
              plus.push.clear(), o3 === c.Platform.APP_ANDROID && e4.uniappPlugin.clearAll(), e4.onClickNotificationCallback(n2);
            }
          });
        }, e3.prototype.onClickNotification = function(e4) {
          if (this.supportNotification()) {
            if (!i.calibrator.isFunction(e4))
              throw new Error("The arguments must be a function.");
            this.onClickNotificationCallback === null ? (this.onClickNotificationCallback = e4, this.listenPlusClickNotification(), this.uniappPlugin && this.getIntentData()) : console.warn("The onClickNotification event has been listened on. Please do not listen to it more than once.");
          } else
            console.warn("The current environment doesn't support or allowNotification is false.");
        }, e3;
      }();
      t2.GoEasyNotification = h;
    }])["default"];
  });
})(goeasy_min);
var GoEasy = /* @__PURE__ */ getDefaultExportFromCjs(goeasy_min.exports);
exports.GoEasy = GoEasy;
exports._export_sfc = _export_sfc;
exports.computed$1 = computed$1;
exports.createSSRApp = createSSRApp;
exports.e = e;
exports.f = f;
exports.hooks = hooks;
exports.index = index;
exports.nextTick = nextTick;
exports.o = o;
exports.onLoad = onLoad;
exports.onMounted = onMounted;
exports.p = p;
exports.ref = ref;
exports.t = t;
exports.unref = unref;
