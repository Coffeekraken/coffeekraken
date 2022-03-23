var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var media_exports = {};
__export(media_exports, {
  default: () => media_default,
  interface: () => postcssSugarPluginMediaMixinInterface
});
module.exports = __toCommonJS(media_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
class postcssSugarPluginMediaMixinInterface extends import_s_interface.default {
  static get _definition() {
    return {
      query1: {
        type: "String",
        required: true
      },
      query2: {
        type: "String"
      },
      query3: {
        type: "String"
      },
      query4: {
        type: "String"
      },
      query5: {
        type: "String"
      },
      query6: {
        type: "String"
      },
      query7: {
        type: "String"
      }
    };
  }
}
function media_default({
  params,
  atRule,
  postcssApi,
  registerPostProcessor
}) {
  var _a;
  const mediaConfig = import_s_theme.default.config("media");
  const queries = [];
  Object.keys(params).forEach((queryId) => {
    const query = params[queryId].trim();
    query.split(",").forEach((q) => {
      queries.push(q.trim());
    });
  });
  const fullQueriesList = [];
  queries.forEach((query) => {
    const currentQueryList = [mediaConfig.defaultQuery, "and"];
    if (query === "and" || query === "or") {
      currentQueryList.push(query);
      return;
    }
    const firstChar = query.slice(0, 1);
    const firstTwoChar = query.slice(0, 2);
    const lastChar = query.slice(-1);
    let action = mediaConfig.defaultAction;
    let mediaName = query;
    if (lastChar === "-" || lastChar === "|")
      mediaName = mediaName.slice(0, -1);
    if (firstTwoChar === ">=" || firstTwoChar === "<=" || firstTwoChar === "==") {
      mediaName = mediaName.slice(2);
      action = firstTwoChar;
    } else if (firstChar === "<" || firstChar === ">" || firstChar === "=") {
      mediaName = mediaName.slice(1);
      action = firstChar;
    }
    const mediaQueryConfig = mediaConfig.queries[mediaName];
    if (!mediaQueryConfig)
      throw new Error(`<red>[postcssSugarPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(mediaConfig.queries).map((l) => `<green>${l}</green>`).join(",")}`);
    const queryList = [];
    Object.keys(mediaQueryConfig).forEach((prop) => {
      const value = mediaQueryConfig[prop];
      if (!value)
        return;
      if ([
        "min-width",
        "max-width",
        "min-device-width",
        "max-device-width"
      ].indexOf(prop) !== -1) {
        if (action === ">") {
          if (prop === "max-width" || prop === "max-device-width") {
            let argName = "min-width";
            if (prop.includes("-device"))
              argName = "min-device-width";
            queryList.push(`(${argName}: ${value + 1}px)`);
          }
        } else if (action === "<") {
          if (prop === "min-width" || prop === "min-device-width") {
            let argName = "max-width";
            if (prop.includes("-device"))
              argName = "max-device-width";
            queryList.push(`(${argName}: ${value}px)`);
          }
        } else if (action === "=") {
          queryList.push(`(${prop}: ${value}px)`);
        } else if (action === ">=") {
          if (prop === "min-width" || prop === "min-device-width") {
            queryList.push(`(${prop}: ${value}px)`);
          }
        } else if (action === "<=") {
          if (prop === "max-width" || prop === "max-device-width") {
            queryList.push(`(${prop}: ${value}px)`);
          }
        } else {
          queryList.push(`(${prop}: ${value}px)`);
        }
      } else {
        queryList.push(`(${prop}: ${value}px)`);
      }
    });
    if (lastChar === "-") {
      queryList.push("(orientation: landscape)");
    } else if (lastChar === "|") {
      queryList.push("(orientation: portrait)");
    }
    currentQueryList.push(queryList.join(" and "));
    fullQueriesList.push(currentQueryList.join(" "));
  });
  const mediaRule = new postcssApi.AtRule({
    name: "media",
    params: fullQueriesList.join(" ")
  });
  (_a = atRule.nodes) == null ? void 0 : _a.forEach((node) => {
    mediaRule.append(node);
  });
  atRule.replaceWith(mediaRule);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
