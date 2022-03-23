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
var SNpmUnusedProcess_exports = {};
__export(SNpmUnusedProcess_exports, {
  SNpmUnusedParamsInterface: () => SNpmUnusedParamsInterface,
  default: () => SNpmUnusedProcess_default
});
module.exports = __toCommonJS(SNpmUnusedProcess_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_process = __toESM(require("@coffeekraken/s-process"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_depcheck = __toESM(require("depcheck"), 1);
var import_packageRootDir = __toESM(require("../path/packageRootDir"), 1);
var import_packageJson = __toESM(require("./utils/packageJson"), 1);
class SNpmUnusedParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      clean: {
        type: "Boolean",
        alias: "r",
        description: "Specify if you want the found unused dependencies to be reflected back into the package.json file",
        default: false
      },
      skipDev: {
        type: "Boolean",
        description: 'Specify if you want to skip the "devDependencies" check',
        default: false
      },
      skipMissing: {
        type: "Boolean",
        description: "Specify if you want to skip the missing packages check",
        default: false
      }
    };
  }
}
class SNpmUnusedProcess extends import_s_process.default {
  constructor(initialParams = {}, settings) {
    super(initialParams, settings != null ? settings : {});
  }
  process(params, settings) {
    return new import_s_promise.default(async ({ resolve, reject, emit }) => {
      const unusedDepJson = await (0, import_depcheck.default)((0, import_packageRootDir.default)(), {
        skipMissing: params.skipMissing
      });
      const unusedListArray = [];
      if (unusedDepJson.dependencies) {
        unusedDepJson.dependencies.forEach((dep) => {
          const packageJson = (0, import_packageJson.default)(dep);
          unusedListArray.push({
            group: "dependency",
            name: packageJson.name,
            version: packageJson.version,
            license: packageJson.license
          });
        });
      }
      if (!params.skipDev && unusedDepJson.devDependencies) {
        unusedDepJson.devDependencies.forEach((dep) => {
          const packageJson = (0, import_packageJson.default)(dep);
          unusedListArray.push({
            group: "devDependency",
            name: packageJson.name,
            version: packageJson.version,
            license: packageJson.license
          });
        });
      }
      const listArray = unusedListArray.map((depObj) => {
        return `<${depObj.group === "dependency" ? "green" : "red"}>[${depObj.group}]</${depObj.group === "dependency" ? "green" : "red"}> ${depObj.license} <yellow>${depObj.name}</yellow> <cyan>${depObj.version}</cyan>`;
      });
      await emit("log", {
        value: listArray.join("\n")
      });
      const res = await emit("ask", {
        type: "boolean",
        message: "Would you like to clean the dependencies?",
        default: true
      });
      if (res) {
        console.log("process!!!");
      }
      resolve(true);
    });
  }
}
SNpmUnusedProcess.interfaces = {
  params: {
    class: SNpmUnusedParamsInterface
  }
};
var SNpmUnusedProcess_default = SNpmUnusedProcess;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SNpmUnusedParamsInterface
});
