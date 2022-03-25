import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SClass from "@coffeekraken/s-class";
import __SDuration from "@coffeekraken/s-duration";
import __SLog from "@coffeekraken/s-log";
class SBuilder extends __SClass {
  get builderSettings() {
    return this._settings.builder;
  }
  constructor(settings) {
    super(__deepMerge({
      builder: {
        interface: void 0
      }
    }, settings || {}));
  }
  build(params = {}, settings = {}) {
    settings = __deepMerge(this.builderSettings, settings);
    const duration = new __SDuration();
    let finalParams = params;
    if (settings.interface) {
      finalParams = settings.interface.apply(params);
    }
    const promise = this._build(finalParams, settings);
    promise.emit("log", {
      type: __SLog.TYPE_INFO,
      value: `<yellow>[build]</yellow> Start ${this.constructor.name} build`
    });
    promise.then(() => {
      promise.emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<green>[success]</green> Build ${this.constructor.name} finished <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
      });
    });
    return promise;
  }
}
var SBuilder_default = SBuilder;
export {
  SBuilder_default as default
};
