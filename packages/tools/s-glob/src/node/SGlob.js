import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __resolveGlob, { IResolveGlobSettings } from "@coffeekraken/sugar/node/glob/resolveGlob";
import __extractGlob from "@coffeekraken/sugar/shared/glob/extractGlob";
import __extractNoneGlob from "@coffeekraken/sugar/shared/glob/extractNoneGlob";
import __SClass from "@coffeekraken/s-class";
import __isGlob from "@coffeekraken/sugar/shared/is/glob";
class SGlob extends __SClass {
  constructor(globs, settings = {}) {
    super(__deepMerge({
      glob: {
        resolve: {}
      }
    }, settings));
    this._globs = null;
    this._globs = Array.isArray(globs) ? globs : [globs];
  }
  static isGlob(glob) {
    return __isGlob(glob);
  }
  static resolve(globs, settings = {}) {
    return __resolveGlob(globs, settings);
  }
  static extractGlob(string) {
    return __extractGlob(string);
  }
  static extractNoneGlob(string) {
    return __extractNoneGlob(string);
  }
  resolve(settings = {}) {
    settings = __deepMerge(this._settings.glob.resolve, {}, settings);
    return SGlob.resolve(this._globs, settings);
  }
  extractGlob() {
    if (this._globs.length === 1) {
      return SGlob.extractGlob(this._globs[0]);
    }
    return this._globs.map((glob) => {
      SGlob.extractGlob(glob);
    });
  }
  extractNoneGlob() {
    if (this._globs.length === 1) {
      return SGlob.extractNoneGlob(this._globs[0]);
    }
    return this._globs.map((glob) => {
      SGlob.extractNoneGlob(glob);
    });
  }
}
export {
  IResolveGlobSettings,
  SGlob as default
};
