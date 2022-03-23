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
var STimer_exports = {};
__export(STimer_exports, {
  default: () => STimer
});
module.exports = __toCommonJS(STimer_exports);
var import_convert = __toESM(require("@coffeekraken/sugar/shared/time/convert"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
class STimer extends import_s_promise.default {
  constructor(duration, settings = {}) {
    super(({ resolve, reject, emit }) => {
      this.duration = duration;
      if (this._settings.tickCount) {
        this._tickCount = this._settings.tickCount;
        this._tickInterval = this._duration / this._tickCount;
      } else {
        this._tickInterval = (0, import_convert.default)(this._settings.tickInterval, "ms");
      }
    }, (0, import_deepMerge.default)({
      id: "STimer",
      tickInterval: 1e3,
      tickCount: null,
      loop: false
    }, settings));
    this._duration = 0;
    this._remaining = 0;
    this._tickCount = null;
    this._tickInterval = 1e3;
    this._tickSetTimeout = null;
    this._startTime = null;
    this._tickTime = null;
    this._pauseTime = null;
  }
  _tick() {
    this._tickTime = new Date();
    this._remaining -= this._tickInterval;
    if (this.remaining <= 0) {
      this.stop();
      if (this._settings.loop) {
        this.start();
      }
      this.emit("complete", this);
    } else {
      clearTimeout(this._tickSetTimeout);
      this._tickSetTimeout = setTimeout(() => {
        this._tick();
      }, this._tickInterval);
    }
    if (this.isStarted())
      this.emit("tick", this);
  }
  get remaining() {
    if (!this._startTime)
      return 0;
    return this._startTime.getTime() + this._duration - Date.now();
  }
  set duration(duration) {
    duration = (0, import_convert.default)(duration, "ms");
    this._duration = duration;
    if (this._tickCount) {
      this._tickInterval = this._duration / this._tickCount;
    }
    this.emit("duration", this);
  }
  get duration() {
    return this._duration;
  }
  set tickCount(tickCount) {
    this._tickCount = tickCount;
    this._tickInterval = this._duration / this._tickCount;
    this.emit("tickCount", this);
  }
  get tickCount() {
    return this._tickCount;
  }
  get percentage() {
    if (!this.isStarted())
      return 0;
    return 100 / this.duration * (this.duration - this.remaining);
  }
  reset(start = false) {
    clearTimeout(this._tickSetTimeout);
    this._pauseTime = null;
    this._startTime = null;
    this._remaining = this._duration;
    if (start)
      this.start();
    this.emit("reset", this);
    return this;
  }
  start(duration = null) {
    clearTimeout(this._tickSetTimeout);
    if (duration)
      this.duration = duration;
    if (!this._tickTime) {
      this._tickTime = new Date();
    }
    if (this._pauseTime) {
      const elapsed = this._pauseTime.getTime() - this._tickTime.getTime();
      const remaining = this._tickInterval - elapsed;
      clearTimeout(this._tickSetTimeout);
      this._tickSetTimeout = setTimeout(() => {
        this._tick();
      }, remaining);
      this._startTime = new Date();
      this._pauseTime = null;
    } else {
      this._startTime = new Date();
      this._remaining = this._duration;
      clearTimeout(this._tickSetTimeout);
      this._tickSetTimeout = setTimeout(() => {
        this._tick();
      }, this._tickInterval);
    }
    this.emit("start", this);
    return this;
  }
  pause() {
    this._pauseTime = new Date();
    clearTimeout(this._tickSetTimeout);
    this.emit("pause", this);
    return this;
  }
  stop() {
    this.reset();
    this.emit("stop", this);
    return this;
  }
  destroy() {
    this.stop();
    this._completesCallbacks = [];
    this._ticksCallbacks = [];
    this.emit("destroy", this);
    return this;
  }
  isStarted() {
    return this._startTime && !this._pauseTime;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
