var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __SProcess from "../SProcess";
import __SPromise from "@coffeekraken/s-promise";
import __SInterface from "@coffeekraken/s-interface";
import __isChildProcess from "@coffeekraken/sugar/node/is/childProcess";
import __wait from "@coffeekraken/sugar/shared/time/wait";
class MyInterface extends __SInterface {
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
class MyProcess extends __SProcess {
  constructor(initialParams, settings = {}) {
    super(initialParams, settings);
  }
  process(params, settings = {}) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      emit("log", {
        value: `Hello world ${__isChildProcess() ? "from child process" : ""}`
      });
      if (params.crash) {
        await __wait(params.crashTimeout);
        reject(params);
      } else {
        resolve(__spreadProps(__spreadValues({}, params), {
          isChildProcess: __isChildProcess()
        }));
      }
    });
  }
}
MyProcess.interfaces = {
  params: MyInterface
};
export {
  MyProcess as default
};
