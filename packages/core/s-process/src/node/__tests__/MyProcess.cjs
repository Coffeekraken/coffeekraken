var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var MyProcess_exports = {};
__export(MyProcess_exports, {
  default: () => MyProcess
});
module.exports = __toCommonJS(MyProcess_exports);
var import_SProcess = __toESM(require("../SProcess"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_childProcess = __toESM(require("@coffeekraken/sugar/node/is/childProcess"));
var import_wait = __toESM(require("@coffeekraken/sugar/shared/time/wait"));
class MyInterface extends import_s_interface.default {
  static get _definition() {
    return {
      param1: {
        type: "String",
        default: "Hello"
      },
      param2: {
        type: "Boolean",
        default: true
      },
      crash: {
        type: "Boolean",
        default: false
      },
      crashTimeout: {
        type: "Number",
        default: 100
      }
    };
  }
}
class MyProcess extends import_SProcess.default {
  constructor(initialParams, settings = {}) {
    super(initialParams, settings);
  }
  process(params, settings = {}) {
    return new import_s_promise.default(async ({ resolve, reject, emit }) => {
      emit("log", {
        value: `Hello world ${(0, import_childProcess.default)() ? "from child process" : ""}`
      });
      if (params.crash) {
        await (0, import_wait.default)(params.crashTimeout);
        reject(params);
      } else {
        resolve(__spreadProps(__spreadValues({}, params), {
          isChildProcess: (0, import_childProcess.default)()
        }));
      }
    });
  }
}
MyProcess.interfaces = {
  params: MyInterface
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
