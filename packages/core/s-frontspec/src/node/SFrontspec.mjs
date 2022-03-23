import {
  __spreadValues
} from "../../../../chunk-TD77TI6B.mjs";
import __SEnv from "@coffeekraken/s-env";
import __SFile from "@coffeekraken/s-file";
import __SPromise from "@coffeekraken/s-promise";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __packageRootDir from "@coffeekraken/sugar/node/path/packageRootDir";
import __fs from "fs";
import __path from "path";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __delete from "@coffeekraken/sugar/shared/object/delete";
import __folderPath from "@coffeekraken/sugar/node/fs/folderPath";
class SFrontspec extends __SPromise {
  constructor(settings = {}) {
    super(__deepMerge({
      metas: {
        id: "SFrontspec"
      }
    }, settings));
  }
  read() {
    return new __SPromise(async ({ resolve, pipe, emit }) => {
      var _a;
      const frontspecPath = `${__packageRootDir()}/frontspec.json`;
      let frontspecJson = {};
      try {
        frontspecJson = __readJsonSync(frontspecPath);
      } catch (e) {
        console.log("ER", e);
      }
      let res = __deepMerge((_a = __SSugarConfig.get("frontspec")) != null ? _a : {}, frontspecJson);
      res.frontspec = {
        path: frontspecPath,
        folderPath: __folderPath(frontspecPath)
      };
      if (res.assets) {
        Object.keys(res.assets).forEach((type) => {
          const typeObj = res.assets[type];
          Object.keys(typeObj).forEach((asset) => {
            const assetObj = typeObj[asset];
            if (assetObj.env && !__SEnv.is(assetObj.env)) {
              __delete(res.assets, `${type}.${asset}`);
            }
          });
        });
      }
      resolve(res);
    });
  }
  async assetsToServe() {
    const frontspecJson = await this.read();
    const assetsToServe = [];
    if (!frontspecJson.assets)
      return;
    Object.keys(frontspecJson.assets).forEach((type) => {
      const typeAssets = frontspecJson.assets[type];
      Object.keys(typeAssets).forEach((assetId) => {
        var _a, _b, _c;
        const assetObj = Object.assign({}, typeAssets[assetId]);
        const url = (_a = assetObj.path) != null ? _a : assetObj.src;
        if (assetObj.env && !__SEnv.is(assetObj.env))
          return;
        const fileObj = {
          type,
          id: assetId,
          args: __spreadValues({}, assetObj)
        };
        const filePath = __path.resolve(__packageRootDir(), (_c = (_b = assetObj.path) != null ? _b : assetObj.src) != null ? _c : assetObj.href);
        if (type === "css") {
          fileObj.args.href = fileObj.args.src;
          delete fileObj.args.src;
        }
        if (__fs.existsSync(filePath)) {
          fileObj.file = __SFile.new(filePath);
        } else {
          fileObj.url = url;
        }
        assetsToServe.push(fileObj);
      });
    });
    return assetsToServe;
  }
}
SFrontspec._cachesStack = {};
export {
  SFrontspec as default
};
