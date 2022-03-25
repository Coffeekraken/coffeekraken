import _SInterface from "@coffeekraken/s-interface";
import __SProcess from "@coffeekraken/s-process";
import __SPromise from "@coffeekraken/s-promise";
import __depCheck from "depcheck";
import __packageRootDir from "../path/packageRootDir";
import __packageJson from "./utils/packageJson";
class SNpmUnusedParamsInterface extends _SInterface {
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
class SNpmUnusedProcess extends __SProcess {
  constructor(initialParams = {}, settings) {
    super(initialParams, settings != null ? settings : {});
  }
  process(params, settings) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      const unusedDepJson = await __depCheck(__packageRootDir(), {
        skipMissing: params.skipMissing
      });
      const unusedListArray = [];
      if (unusedDepJson.dependencies) {
        unusedDepJson.dependencies.forEach((dep) => {
          const packageJson = __packageJson(dep);
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
          const packageJson = __packageJson(dep);
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
export {
  SNpmUnusedParamsInterface,
  SNpmUnusedProcess_default as default
};
