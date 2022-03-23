import {
  __spreadProps,
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
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
