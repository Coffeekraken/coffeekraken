var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
import __SCliSugarPostcssPluginInstallParamsInterface from "./interface/SCliSugarPostcssPluginInstallParamsInterface";
import __SPromise from "@coffeekraken/s-promise";
import __fs from "fs";
import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
import __writeJsonSync from "@coffeekraken/sugar/node/fs/writeJsonSync";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __unique from "@coffeekraken/sugar/shared/array/unique";
import __npmInstall from "@coffeekraken/sugar/node/npm/install";
var installPlugin_cli_default = (stringArgs = "") => {
  return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
    const finalParams = __SCliSugarPostcssPluginInstallParamsInterface.apply(stringArgs);
    const rootPath = __packageRoot(process.cwd());
    let currentConfig = {};
    if (__fs.existsSync(`${rootPath}/.postcssrc.json`)) {
      currentConfig = __readJsonSync(`${rootPath}/.postcssrc.json`);
    } else if (__fs.existsSync(`${rootPath}/postcss.config.js`)) {
      currentConfig = await Promise.resolve().then(() => __toESM(require(`${rootPath}/postcss.config.js`)));
      __fs.renameSync(`${rootPath}/postcss.config.js`, `${rootPath}/postcss.config.old.js`);
    }
    if (!currentConfig.plugins)
      currentConfig.plugins = [];
    const plugins = __SSugarConfig.get("postcss.plugins");
    currentConfig.plugins = __unique([
      ...plugins,
      ...currentConfig.plugins
    ]);
    if (finalParams.install) {
      emit("log", {
        value: `Installing <cyan>${currentConfig.plugins.length}</cyan> plugins...`
      });
      currentConfig.plugins.forEach((plugin) => {
        emit("log", {
          value: `- <yellow>${plugin}</yellow>`
        });
      });
      await pipe(__npmInstall(currentConfig.plugins.join(" ")));
    }
    emit("log", {
      value: `Saving new configuration file under <cyan>.postcssrc.json</cyan>.`
    });
    __writeJsonSync(`${rootPath}/.postcssrc.json`, currentConfig);
    resolve();
  });
};
export {
  installPlugin_cli_default as default
};
