var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
import __isChildProcess from "@coffeekraken/sugar/node/is/childProcess";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SEventEmitterBase from "../shared/SEventEmitter";
(async () => {
  const { default: __nodeIpc } = await Promise.resolve().then(() => __toESM(require("node-ipc")));
  __SEventEmitterBase._ipcInstance = new __nodeIpc.IPC();
  __SEventEmitterBase._ipcInstance.config.id = `ipc-${process.pid}`;
  __SEventEmitterBase._ipcInstance.config.retry = 1500;
  __SEventEmitterBase._ipcInstance.config.silent = true;
  if (__isChildProcess()) {
    __SEventEmitterBase._ipcInstance.connectTo(`ipc-${process.ppid}`, () => {
      __SEventEmitterBase._ipcInstance.of[`ipc-${process.ppid}`].on("connect", () => {
      });
      __SEventEmitterBase._ipcInstance.of[`ipc-${process.ppid}`].on("answer", (data) => {
        __SEventEmitterBase._ipcInstance.log(data);
        __SEventEmitterBase.global.emit(`answer.${data.metas.askId}`, data.value, data.metas);
      });
    });
  }
})();
class SEventEmitter extends __SEventEmitterBase {
  static ipcServer(ipcSettings, eventEmitterSettings) {
    if (this._ipcPromise)
      return this._ipcPromise;
    this._ipcPromise = new Promise(async (resolve, reject) => {
      var _a;
      const eventEmitter = new this({
        eventEmitter: eventEmitterSettings != null ? eventEmitterSettings : {}
      });
      const { default: __nodeIpc } = await Promise.resolve().then(() => __toESM(require("node-ipc")));
      const ipcInstance = new __nodeIpc.IPC();
      ipcInstance.config = __deepMerge((_a = ipcInstance.config) != null ? _a : {}, {
        id: `ipc-${process.pid}`,
        retry: 1500,
        silent: true
      }, ipcSettings != null ? ipcSettings : {});
      ipcInstance.serve(() => {
        ipcInstance.server.on("message", async (data, socket) => {
          if (data.metas.event === "ask") {
            const res = await eventEmitter.emit(data.metas.event, data.value, data.metas);
            ipcInstance.server.emit(socket, `answer`, {
              value: res,
              metas: data.metas
            });
          } else {
            eventEmitter.emit(data.metas.event, data.value, data.metas);
          }
        });
        resolve(eventEmitter);
      });
      ipcInstance.server.start();
    });
    return this._ipcPromise;
  }
}
export {
  SEventEmitter as default
};
