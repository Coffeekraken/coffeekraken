import {
  __spreadValues
} from "../../../../chunk-TD77TI6B.mjs";
import __SEventEmitter from "@coffeekraken/s-event-emitter";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SPromise from "@coffeekraken/s-promise";
import __wait from "@coffeekraken/sugar/shared/time/wait";
import __isPlainObject from "@coffeekraken/sugar/shared/is/plainObject";
class SProcessManagerProcessWrapper extends __SEventEmitter {
  constructor(processInstance, settings) {
    super(__deepMerge({
      processManagerProcess: {
        stdio: "inherit",
        restart: false,
        log: {
          filter: void 0
        }
      }
    }, settings));
    this._isDetached = false;
    this._currentProcessPromise = null;
    const restartDefaultSettings = {
      on: "reject",
      maxTimes: -1,
      maxEvery: -1,
      delay: 0,
      before: void 0
    };
    if (this.processManagerProcessSettings.restart === true) {
      this.processManagerProcessSettings.restart = restartDefaultSettings;
    } else if (__isPlainObject(this.processManagerProcessSettings.restart)) {
      this.processManagerProcessSettings.restart = __spreadValues(__spreadValues({}, restartDefaultSettings), this.processManagerProcessSettings.restart);
    }
    processInstance.processSettings.stdio = false;
    this.processInstance = processInstance;
  }
  get initialParams() {
    return Object.assign({}, this._settings.initialParams);
  }
  get processManagerProcessSettings() {
    return this._settings.processManagerProcess;
  }
  _handleRestartFor(processPromise) {
    if (this._isDetached)
      return;
    this._currentProcessPromise = processPromise;
    processPromise.on("reject", async (value, metas) => {
      if (this._isDetached)
        return;
      await __wait(0);
      this.emit("log", {
        group: `s-process-manager-process-wrapper-${this.metas.id}`,
        value: `The process "<yellow>${this.metas.id}</yellow>" has been stoped after a(n) <red>${this.processInstance.lastExecutionObj.state}</red> after <cyan>${this.processInstance.lastExecutionObj.formatedDuration}</cyan> of execution`
      });
      if (this.processManagerProcessSettings.restart.maxEvery > 0) {
        if (this.processInstance.lastExecutionObj.endTime + this.processManagerProcessSettings.restart.maxEvery >= Date.now()) {
          this.emit("log", {
            group: `s-process-manager-process-wrapper-${this.metas.id}`,
            value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has crashed before the <cyan>maxEvery</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxEvery}ms</magenta>`
          });
          if (this._restartingProcessResolve && !this._isDetached) {
            this._restartingProcessResolve(this.processInstance.executionsStack);
          }
          return;
        }
      }
      if (this.processManagerProcessSettings.restart.maxTimes > 0) {
        if (this.processInstance.executionsStack.length >= this.processManagerProcessSettings.restart.maxTimes) {
          this.emit("log", {
            group: `s-process-manager-process-wrapper-${this.metas.id}`,
            value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has reached the <cyan>maxTimes</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxTimes}</magenta>`
          });
          if (this._restartingProcessResolve && !this._isDetached) {
            this._restartingProcessResolve(this.processInstance.executionsStack);
          }
          return;
        }
      }
      let newProcessArgs = Object.assign({}, this.processInstance.lastExecutionObj.params);
      if (this.processManagerProcessSettings.restart.before && typeof this.processManagerProcessSettings.restart.before === "function") {
        newProcessArgs = await this.processManagerProcessSettings.restart.before(this.processInstance.lastExecutionObj);
      }
      if (!newProcessArgs) {
        this.emit("log", {
          group: `s-process-manager-process-wrapper-${this.metas.id}`,
          value: `Stop restarting the process "<yellow>${this.metas.id}</yellow>"`
        });
        if (this._restartingProcessResolve && !this._isDetached) {
          this._restartingProcessResolve(this.processInstance.executionsStack);
        }
        return;
      }
      if (this.processManagerProcessSettings.restart.delay)
        this.emit(`log`, {
          group: `s-process-manager-process-wrapper-${this.metas.id}`,
          value: `Waiting <cyan>${this.processManagerProcessSettings.restart.delay / 1e3}s</cyan> before restart...`
        });
      await __wait(this.processManagerProcessSettings.restart.delay);
      this.emit("log", {
        group: `s-process-manager-process-wrapper-${this.metas.id}`,
        value: `Restarting process "<yellow>${this.metas.id}</yellow>"`
      });
      this._run(newProcessArgs.params, newProcessArgs.settings);
    }, {
      id: "restartHandler"
    });
  }
  detach() {
    this._isDetached = true;
    if (this._currentProcessPromise)
      this._currentProcessPromise.off("restartHandler");
  }
  _run(paramsOrStringArgs = {}, settings = {}) {
    if (this._isDetached)
      return;
    const promise = this.processInstance.run(paramsOrStringArgs, settings);
    if (this.processManagerProcessSettings.restart)
      this._handleRestartFor(promise);
    return promise;
  }
  run(paramsOrStringArgs = {}, settings = {}) {
    if (this._isDetached) {
      throw new Error(`Sorry but you cannot run this "<yellow>${this.metas.id}</yellow>" process cause it has been detached from the process manager`);
    }
    return new __SPromise(async ({ resolve, pipe }) => {
      this._restartingProcessResolve = resolve;
      const resPromise = this._run(paramsOrStringArgs, settings);
      pipe(resPromise);
      const res = await resPromise;
      if (!this.processManagerProcessSettings.restart && !this._isDetached) {
        resolve(res);
      }
    }, {
      id: "plop",
      metas: {
        id: "coco"
      }
    });
  }
}
var SProcessManagerProcessWrapper_default = SProcessManagerProcessWrapper;
export {
  SProcessManagerProcessWrapper_default as default
};
