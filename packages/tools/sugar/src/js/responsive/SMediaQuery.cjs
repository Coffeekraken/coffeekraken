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
var SMediaQuery_exports = {};
__export(SMediaQuery_exports, {
  default: () => SMediaQuery_default
});
module.exports = __toCommonJS(SMediaQuery_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
class SMediaQuery extends import_s_promise.default {
  static getActiveMedia() {
    return this._activeMedia;
  }
  static startListener() {
    document.addEventListener("animationend", (e) => {
      const mediaName = e.animationName.replace(/^mq-/, "");
      const previousActiveMedia = this._activeMedia;
      this._activeMedia = mediaName;
      Object.keys(this._promisesStack).forEach((name) => {
        const nameArray = name.split(" ");
        if (previousActiveMedia) {
          if (nameArray.indexOf(previousActiveMedia) !== -1) {
            const promises = this._promisesStack[name];
            promises.forEach((promise) => {
              promise.emit("unmatch", {
                name: previousActiveMedia
              });
            });
          }
        }
        if (nameArray.indexOf(mediaName) !== -1) {
          const promise = this._promisesStack[name];
          const promises = this._promisesStack[name];
          promises.forEach((promise2) => {
            promise2.emit("match", {
              name: mediaName
            });
          });
        }
      });
      if (this._promisesStack["*"]) {
        const allPromises = this._promisesStack["*"];
        allPromises.forEach((allPromise) => {
          if (previousActiveMedia) {
            allPromise.emit("unmatch", {
              name: previousActiveMedia
            });
          }
          allPromise.emit("match", {
            name: mediaName
          });
        });
      }
    });
  }
  constructor(mediaName, settings = {}) {
    if (!Array.isArray(mediaName))
      mediaName = [mediaName];
    const name = mediaName.join(" ");
    super(settings, {
      id: `SMediaQuery.${name.split(" ").join("-")}`
    });
    if (!this.constructor._promisesStack[name])
      this.constructor._promisesStack[name] = [];
    this.constructor._promisesStack[name].push(this);
  }
}
SMediaQuery._activeMedia = "desktop";
SMediaQuery._promisesStack = {};
SMediaQuery.startListener();
var SMediaQuery_default = SMediaQuery;
