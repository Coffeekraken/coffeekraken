import "../../../../../chunk-PG3ZPS4G.mjs";
import __SPromise from "@coffeekraken/s-promise";
class SMediaQuery extends __SPromise {
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
export {
  SMediaQuery_default as default
};
