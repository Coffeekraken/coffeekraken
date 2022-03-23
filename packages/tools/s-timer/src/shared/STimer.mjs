import "../../../../chunk-JETN4ZEY.mjs";
import __convert from "@coffeekraken/sugar/shared/time/convert";
import __SPromise from "@coffeekraken/s-promise";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
class STimer extends __SPromise {
  constructor(duration, settings = {}) {
    super(({ resolve, reject, emit }) => {
      this.duration = duration;
      if (this._settings.tickCount) {
        this._tickCount = this._settings.tickCount;
        this._tickInterval = this._duration / this._tickCount;
      } else {
        this._tickInterval = __convert(this._settings.tickInterval, "ms");
      }
    }, __deepMerge({
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
    duration = __convert(duration, "ms");
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
export {
  STimer as default
};
