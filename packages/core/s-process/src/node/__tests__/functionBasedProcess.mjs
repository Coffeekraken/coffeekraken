import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SPromise from "@coffeekraken/s-promise";
import __isChildProcess from "@coffeekraken/sugar/node/is/childProcess";
function myProcess(params) {
  return new __SPromise(({ resolve }) => {
    setTimeout(() => {
      resolve(__spreadValues({
        state: "success",
        isChildProcess: __isChildProcess()
      }, params));
    }, 100);
  });
}
export {
  myProcess as default
};
