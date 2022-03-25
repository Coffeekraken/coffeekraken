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
var SEventEmitter_exports = {};
__export(SEventEmitter_exports, {
  default: () => SEventEmitter
});
module.exports = __toCommonJS(SEventEmitter_exports);
var import_childProcess = __toESM(require("@coffeekraken/sugar/node/is/childProcess"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_SEventEmitter = __toESM(require("../shared/SEventEmitter"));
(async () => {
  const { default: __nodeIpc } = await Promise.resolve().then(() => __toESM(require("node-ipc")));
  import_SEventEmitter.default._ipcInstance = new __nodeIpc.IPC();
  import_SEventEmitter.default._ipcInstance.config.id = `ipc-${process.pid}`;
  import_SEventEmitter.default._ipcInstance.config.retry = 1500;
  import_SEventEmitter.default._ipcInstance.config.silent = true;
  if ((0, import_childProcess.default)()) {
    import_SEventEmitter.default._ipcInstance.connectTo(`ipc-${process.ppid}`, () => {
      import_SEventEmitter.default._ipcInstance.of[`ipc-${process.ppid}`].on("connect", () => {
      });
      import_SEventEmitter.default._ipcInstance.of[`ipc-${process.ppid}`].on("answer", (data) => {
        import_SEventEmitter.default._ipcInstance.log(data);
        import_SEventEmitter.default.global.emit(`answer.${data.metas.askId}`, data.value, data.metas);
      });
    });
  }
})();
class SEventEmitter extends import_SEventEmitter.default {
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
      ipcInstance.config = (0, import_deepMerge.default)((_a = ipcInstance.config) != null ? _a : {}, {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
