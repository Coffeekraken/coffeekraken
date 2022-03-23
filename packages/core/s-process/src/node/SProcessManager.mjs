import "../../../../chunk-TD77TI6B.mjs";
import __SEventEmitter from "@coffeekraken/s-event-emitter";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __getColorFor from "@coffeekraken/sugar/shared/dev/color/getColorFor";
import __SProcessManagerProcessWrapper from "./SProcessManagerProcessWrapper";
import __SPromise from "@coffeekraken/s-promise";
import __SLog from "@coffeekraken/s-log";
class SProcessManager extends __SEventEmitter {
  constructor(settings) {
    super(__deepMerge({
      processManager: {
        stdio: "terminal",
        stdioSettings: {},
        runInParallel: true
      }
    }, settings != null ? settings : {}));
    this._processesStack = {};
    this._processesQueue = {};
    this._isQueueRunning = false;
  }
  get processManagerSettings() {
    return this._settings.processManager;
  }
  attachProcess(id, processInstance, settings) {
    if (this._processesStack[id])
      throw new Error(`<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" is already attached to this process manager`);
    const instanceId = this.constructor.name === "SProcessManager" ? `SPM.${id}` : `${this.constructor.name}.${id}`;
    const processManagerProcess = new __SProcessManagerProcessWrapper(processInstance, {
      metas: {
        color: __getColorFor(instanceId, {
          scope: this.constructor.name
        }),
        id: instanceId
      },
      processManagerProcess: settings != null ? settings : {}
    });
    this._processesStack[id] = processManagerProcess;
  }
  detachProcess(id) {
    if (!this._processesStack[id])
      throw new Error(`<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" has not being attached to this process manager`);
    this._processesStack[id].detach();
  }
  runQueue() {
    if (this._queuePromise) {
      return this._queuePromise;
    }
    this._queuePromise = new Promise((resolve) => {
      clearTimeout(this._parallelRunTimeout);
      this._parallelRunTimeout = setTimeout(() => {
        __SPromise.queue(this._processesQueue, (processId, promise) => {
        }).then((results) => {
          resolve(results);
          this._queuePromise = void 0;
        });
      });
    });
    return this._queuePromise;
  }
  run(processId, paramsOrStringArgs = {}, settings = {}) {
    if (!this._processesStack[processId])
      throw new Error(`<red>[${this.constructor.name}.run]</red> Sorry but no process exists with the id "<magenta>${processId}</magenta>"`);
    let promise;
    if (!this.processManagerSettings.runInParallel) {
      this._processesQueue[processId] = () => {
        return this.pipe(this._processesStack[processId].run(paramsOrStringArgs, settings));
      };
      promise = this.runQueue();
    } else {
      promise = this._processesStack[processId].run(paramsOrStringArgs, settings);
      this.emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<bgYellow><black> Starting process ${processId} </black></bgYellow><yellow>${"-".repeat(process.stdout.columns - 19 - processId.length)}</yellow>`
      });
      this.pipe(promise, {
        overrideEmitter: true
      });
    }
    return promise;
  }
}
var SProcessManager_default = SProcessManager;
export {
  SProcessManager_default as default
};
