import {
  __spreadProps,
  __spreadValues
} from "../../../../chunk-JETN4ZEY.mjs";
import __minimatch from "minimatch";
import SClass from "@coffeekraken/s-class";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __uniqid from "@coffeekraken/sugar/shared/string/uniqid";
import __isPlainObject from "@coffeekraken/sugar/shared/is/plainObject";
import __isChildProcess from "@coffeekraken/sugar/node/is/childProcess";
import __toString from "@coffeekraken/sugar/shared/string/toString";
import __SLog from "@coffeekraken/s-log";
import __isClass from "@coffeekraken/sugar/shared/is/class";
import __getColorFor from "@coffeekraken/sugar/shared/dev/color/getColorFor";
const _SEventEmitter = class extends SClass {
  constructor(settings = {}) {
    super(__deepMerge({
      eventEmitter: {
        asyncStart: false,
        bufferTimeout: 1e3,
        defaults: {},
        castByEvent: {
          log: __SLog
        },
        bind: void 0
      }
    }, settings || {}));
    this._asyncStarted = false;
    this._buffer = [];
    this._eventsStacks = {};
    this._onStackById = {};
  }
  static get global() {
    if (!_SEventEmitter._globalInstance) {
      _SEventEmitter._globalInstance = new _SEventEmitter({
        metas: {
          id: "sugarEventSPromise"
        }
      });
    }
    return _SEventEmitter._globalInstance;
  }
  static pipe(sourceSEventEmitter, destSEventEmitter, settings) {
    const set = __spreadValues({
      events: "*",
      overrideEmitter: false,
      processor: void 0,
      exclude: ["finally", "resolve", "reject", "cancel", "catch"],
      filter: void 0
    }, settings != null ? settings : {});
    if (!sourceSEventEmitter || !sourceSEventEmitter.on || typeof sourceSEventEmitter.on !== "function")
      return sourceSEventEmitter;
    sourceSEventEmitter.on(set.events || "*", async (value, metas) => {
      var _a, _b, _c, _d, _e, _f, _g;
      if (!metas) {
        return;
      }
      metas.id = (_c = (_b = metas.id) != null ? _b : (_a = metas.emitter.metas) == null ? void 0 : _a.id) != null ? _c : __uniqid();
      metas.color = (_f = (_e = metas.color) != null ? _e : (_d = metas.emitter.metas) == null ? void 0 : _d.color) != null ? _f : __getColorFor(metas.id);
      if (set.exclude && set.exclude.indexOf(metas.event) !== -1)
        return;
      if (set.filter && !set.filter(value, metas))
        return;
      if (set.processor) {
        const res = set.processor(value, metas);
        if (Array.isArray(res) && res.length === 2) {
          value = res[0];
          metas = res[1];
        } else if (typeof res === "object" && res.value !== void 0 && res.metas !== void 0) {
          value = res.value;
          metas = res.metas;
        } else {
          value = res;
        }
      }
      if (metas && metas.event) {
        let emitStack = metas.event;
        if (!metas.emitter) {
          metas.emitter = this;
        }
        const emitMetas = __spreadProps(__spreadValues({}, metas), {
          level: ((_g = metas == null ? void 0 : metas.level) != null ? _g : 0) + 1
        });
        if (destSEventEmitter instanceof _SEventEmitter) {
          if (!set.overrideEmitter && destSEventEmitter.eventEmitterSettings.bind) {
            emitMetas.emitter = destSEventEmitter.eventEmitterSettings.bind;
          } else if (set.overrideEmitter === true) {
            emitMetas.emitter = destSEventEmitter;
          }
        }
        if (destSEventEmitter === process && __isChildProcess()) {
          if (value.value && value.value instanceof Error) {
            value.value = __toString(value.value);
          }
          if (this._ipcInstance) {
            this._ipcInstance.of[`ipc-${process.ppid}`].emit("message", {
              value,
              metas: emitMetas
            });
          }
        } else {
          destSEventEmitter.emit(metas.event, value, emitMetas);
        }
      }
    });
  }
  get eventEmitterSettings() {
    return this._settings.eventEmitter;
  }
  bind(obj) {
    this.eventEmitterSettings.bind = obj;
    return this;
  }
  pipe(input, settings) {
    _SEventEmitter.pipe(input, this, settings);
    return input;
  }
  pipeErrors(input, settings) {
    _SEventEmitter.pipe(input, this, __spreadProps(__spreadValues({}, settings), {
      events: "error"
    }));
    return input;
  }
  pipeFrom(input, settings) {
    return this.pipe(input, settings);
  }
  pipeTo(dest, settings) {
    _SEventEmitter.pipe(this, dest, settings);
    return this;
  }
  start() {
    if (!this.eventEmitterSettings.asyncStart)
      return;
    this._asyncStarted = true;
    this._processBuffer();
  }
  _createMetas(event, metas = {}) {
    var _a, _b, _c;
    return __deepMerge({
      event,
      name: event,
      emitter: (_b = (_a = this.eventEmitterSettings.bind) != null ? _a : metas == null ? void 0 : metas.emitter) != null ? _b : this,
      originalEmitter: (_c = metas == null ? void 0 : metas.originalEmitter) != null ? _c : this,
      time: Date.now(),
      level: 0
    }, metas != null ? metas : {});
  }
  emit(event, value, metas) {
    return new Promise(async (resolve, reject) => {
      let metasObj = this._createMetas(event, metas);
      const isFirstLevel = !metasObj.level;
      if (__isPlainObject(value)) {
        Object.keys(this.eventEmitterSettings.defaults).forEach((key) => {
          var _a;
          const parts = key.split(",").map((l) => l.trim());
          if (parts.indexOf(event) === -1 && parts.indexOf("*") === -1)
            return;
          value = __deepMerge(value, (_a = this.eventEmitterSettings.defaults) == null ? void 0 : _a[key]);
        });
      }
      const CastClass = this.eventEmitterSettings.castByEvent[event];
      if (CastClass && __isClass(CastClass) && !(value instanceof CastClass) && !value._sEventEmitterPreprocessed) {
        value = new CastClass(value);
      }
      if (event === "ask") {
        if (isFirstLevel) {
          metasObj.askId = __uniqid();
        }
      }
      if (!this._asyncStarted && this.eventEmitterSettings.asyncStart) {
        this._buffer.push({
          event,
          value,
          metas: metasObj,
          resolve,
          reject
        });
        return;
      }
      this._emit({
        event,
        value,
        metas: metasObj,
        resolve,
        reject
      });
    });
  }
  async _emit(logObj) {
    if (logObj.event === "ask") {
      this.constructor.global.on(`answer.${logObj.metas.askId}`, (answer, metas) => {
        logObj.resolve(answer);
      });
      this._emitEvents(logObj.event, logObj.value, Object.assign({}, logObj.metas));
    } else {
      const res = await this._emitEvents(logObj.event, logObj.value, Object.assign({}, logObj.metas));
      logObj.resolve(res);
    }
  }
  _registerNewEventsStacks(events) {
    if (typeof events === "string")
      events = events.split(",").map((s) => s.trim());
    events.forEach((event) => {
      if (!this._eventsStacks[event]) {
        this._eventsStacks[event] = {
          buffer: [],
          callStack: []
        };
      }
    });
  }
  _registerCallbackInEventStack(event, callback, settings = {}) {
    settings = __spreadValues({
      callNumber: void 0,
      filter: void 0,
      processor: void 0,
      id: void 0
    }, settings);
    if (settings.id) {
      if (!this._onStackById[settings.id])
        this._onStackById[settings.id] = [];
      this._onStackById[settings.id].push({
        event,
        callback,
        settings
      });
    }
    if (!this._eventsStacks[event]) {
      this._registerNewEventsStacks(event);
    }
    const eventStackObj = this._eventsStacks[event];
    let callNumber = settings.callNumber;
    if (callNumber === void 0) {
      callNumber = -1;
    }
    if (typeof callback === "function")
      eventStackObj.callStack.push({
        callback,
        callNumber,
        filter: settings.filter,
        processor: settings.processor,
        called: 0
      });
    this._processBuffer();
    return this;
  }
  _processBuffer() {
    if (this._buffer.length > 0) {
      setTimeout(() => {
        this._buffer = this._buffer.filter((item) => {
          this._emit(item);
          return false;
        });
      }, this.eventEmitterSettings.bufferTimeout);
    }
  }
  async _emitEventStack(event, initialValue, metasObj) {
    let currentCallbackReturnedValue = initialValue;
    if (!this._eventsStacks || Object.keys(this._eventsStacks).length === 0)
      return currentCallbackReturnedValue;
    if (!this._eventsStacks[event]) {
      this._registerNewEventsStacks(event);
    }
    let eventStackArray = [];
    const eventStackObj = this._eventsStacks[event];
    if (eventStackObj && eventStackObj.callStack) {
      eventStackArray = [
        ...eventStackArray,
        ...eventStackObj.callStack
      ];
    }
    Object.keys(this._eventsStacks).forEach((stackName) => {
      if (stackName === event)
        return currentCallbackReturnedValue;
      if (__minimatch(event, stackName) && this._eventsStacks[stackName] !== void 0) {
        eventStackArray = [
          ...eventStackArray,
          ...this._eventsStacks[stackName].callStack
        ];
      }
    });
    eventStackArray.map((item) => item.called++);
    eventStackArray = eventStackArray.filter((item) => {
      if (item.callNumber === -1)
        return true;
      if (item.called <= item.callNumber)
        return true;
      return false;
    });
    for (let i = 0; i < eventStackArray.length; i++) {
      const item = eventStackArray[i];
      if (!item.callback)
        return currentCallbackReturnedValue;
      if (item.filter && !item.filter(currentCallbackReturnedValue, metasObj))
        continue;
      if (item.processor) {
        const res = item.processor(currentCallbackReturnedValue, metasObj);
        if (Array.isArray(res) && res.length === 2) {
          currentCallbackReturnedValue = res[0];
          metasObj = res[1];
        } else if (typeof res === "object" && res.value !== void 0 && res.metas !== void 0) {
          currentCallbackReturnedValue = res.value;
          metasObj = res.metas;
        } else {
          currentCallbackReturnedValue = res;
        }
      }
      const callbackResult = await item.callback(currentCallbackReturnedValue, metasObj, (metasObj == null ? void 0 : metasObj.askId) ? (answer) => {
        this.constructor.global.emit(`answer.${metasObj.askId}`, answer, metasObj);
      } : void 0);
      if (callbackResult !== void 0) {
        currentCallbackReturnedValue = callbackResult;
      }
    }
    return currentCallbackReturnedValue;
  }
  _emitEvents(events, initialValue, metas) {
    return new Promise(async (resolve, reject) => {
      if (!events)
        return this;
      if (typeof events === "string")
        events = events.split(",").map((s) => s.trim());
      let currentStackResult = initialValue;
      for (let i = 0; i < events.length; i++) {
        const stackResult = await this._emitEventStack(events[i], currentStackResult, metas);
        if (stackResult !== void 0) {
          currentStackResult = stackResult;
        }
      }
      resolve(currentStackResult);
    });
  }
  on(events, callback, settings) {
    const set = __deepMerge({
      filter: void 0,
      processor: void 0,
      id: void 0
    }, settings);
    if (typeof events === "string")
      events = events.split(",").map((s) => s.trim());
    events.forEach((name) => {
      const splitedName = name.split(":");
      let callNumber = -1;
      if (splitedName.length === 2) {
        name = splitedName[0];
        callNumber = parseInt(splitedName[1]);
      }
      this._registerCallbackInEventStack(name, callback, {
        callNumber,
        filter: set.filter,
        processor: set.processor,
        id: set.id
      });
    });
    return this;
  }
  off(event, callback) {
    if (!callback) {
      if (this._eventsStacks[event]) {
        delete this._eventsStacks[event];
      } else if (this._onStackById[event]) {
        this._onStackById[event].forEach((onStackByIdObj) => {
          this.off(onStackByIdObj.event, onStackByIdObj.callback);
        });
        delete this._onStackById[event];
      }
      return this;
    }
    const eventStackObj = this._eventsStacks[event];
    if (!eventStackObj)
      return this;
    eventStackObj.callStack = eventStackObj.callStack.filter((item) => {
      if (item.callback === callback)
        return false;
      return true;
    });
    this._eventsStacks[event] = eventStackObj;
    return this;
  }
  destroy() {
    this._eventsStacks = {};
  }
};
let SEventEmitter = _SEventEmitter;
SEventEmitter.usableAsMixin = true;
var SEventEmitter_default = SEventEmitter;
export {
  SEventEmitter_default as default
};
