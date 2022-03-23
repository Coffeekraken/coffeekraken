import {
  __spreadProps,
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __SType from "@coffeekraken/s-type";
const ruleObj = {
  prority: 10,
  name: "Type",
  id: "type",
  settings: {},
  processParams: (params) => {
    var _a, _b;
    if (!(params == null ? void 0 : params.type) && typeof params !== "string") {
      throw new Error(`<yellow>[sugar.shared.type.descriptors.typeRule]</yellow> Sorry but to use the <magenta>type</magenta> descriptor rule you need to specify a type string either directly under the "type" property, or in an object under the "type.type" property...`);
    }
    return __spreadProps(__spreadValues({}, typeof params !== "string" ? params : {}), {
      type: (_a = params.type) != null ? _a : params,
      cast: (_b = params.cast) != null ? _b : true
    });
  },
  apply: (value, params, ruleSettings, settings) => {
    const type = new __SType(params.type, {
      metas: {
        id: settings.id
      }
    });
    if (params.cast && !type.is(value)) {
      value = type.cast(value, params);
    }
    if (!type.is(value)) {
      return new Error(`The value must be of type "<yellow>${params.type}</yellow>" but you've passed a value of type "<cyan>${typeof value}</cyan>"`);
    }
    return value;
  }
};
var typeRule_default = ruleObj;
export {
  typeRule_default as default
};
