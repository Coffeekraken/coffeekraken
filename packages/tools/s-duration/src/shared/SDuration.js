import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __formatDuration from "@coffeekraken/sugar/shared/time/formatDuration";
class SDuration {
  constructor(settings = {}) {
    this._settings = {};
    this.startTime = null;
    this.endTime = null;
    this.duration = null;
    this._settings = __deepMerge({}, settings);
    this.start();
  }
  toObject(settings = {}) {
    settings = __deepMerge(this._settings, settings);
    if (!this.endTime || !this.startTime)
      this.end();
    const durationMs = this.endTime - this.startTime;
    this.duration = durationMs;
    const formatedDuration = __formatDuration(durationMs);
    return {
      startTime: this.startTime || -1,
      endTime: this.endTime || -1,
      duration: this.duration || -1,
      formatedDuration
    };
  }
  start(startTime = null) {
    this.startTime = startTime || Date.now();
    return this;
  }
  end(settings = {}) {
    settings = __deepMerge(this._settings, settings);
    this.endTime = Date.now();
    return this.toObject(settings);
  }
}
export {
  SDuration as default
};
