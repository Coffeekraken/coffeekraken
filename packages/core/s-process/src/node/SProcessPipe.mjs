import {
  __spreadProps,
  __spreadValues
} from "../../../../chunk-TD77TI6B.mjs";
import __isClass from "@coffeekraken/sugar/shared/is/class";
import __SPromise from "@coffeekraken/s-promise";
import __SEventEmitter from "@coffeekraken/s-event-emitter";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __typeof from "@coffeekraken/sugar/shared/value/typeof";
class SProcessPipe extends __SEventEmitter {
  get processPipeSettings() {
    return this._settings.processPipe;
  }
  constructor(processes, settings = {}) {
    super(__deepMerge({
      processPipe: {
        stdio: "inherit"
      }
    }, settings));
    this._processes = processes;
  }
  run(params = {}, settings = {}) {
    const processPipeSettings = __deepMerge(this.processPipeSettings, settings);
    const promise = new __SPromise(async ({ resolve, reject, emit, pipe, pipeTo }) => {
      if (!Array.isArray(this._processes)) {
        throw `Sorry but you've passed an "<yellow>${__typeof(this._processes)}</yellow>" as "<cyan>SProcessManager.pipe</cyan>" argument but it needs to be an <green>Array</green>`;
      }
      for (let i = 0; i < this._processes.length; i++) {
        const pro = this._processes[i];
        let processInstance, processParams = {}, processSettings = processPipeSettings.processesSettings;
        if (__isClass(pro)) {
          processInstance = new pro(__spreadProps(__spreadValues({}, processPipeSettings.processesSettings || {}), {
            stdio: false
          }));
        } else if (typeof pro === "function") {
          params = pro(params);
        } else if (typeof pro === "object") {
          processSettings = pro.settings || {};
          processParams = pro.params || {};
          if (!pro.process) {
            emit("warn", {
              value: `You have passed an "<yellow>Object</yellow>" as process parameter in the "<cyan>SProcessManager.pipe</cyan>" static method but you don't have specified the "<magenta>process</magenta>" property with either an SProcess instance, or directly the SProcess class you want`
            });
            continue;
          }
          if (__isClass(pro.process)) {
            processInstance = new pro.process(__spreadProps(__spreadValues({}, processSettings), {
              stdio: false
            }));
          }
        }
        if (processInstance) {
          emit("log", {
            group: `s-process-pipe-${this.metas.id}`,
            type: "heading",
            value: processInstance.metas.formattedName
          });
          const resPromise = processInstance.run(params, processSettings);
          pipe(resPromise);
          const res = await resPromise;
        }
      }
    });
    return promise;
  }
}
var SProcessPipe_default = SProcessPipe;
export {
  SProcessPipe_default as default
};
