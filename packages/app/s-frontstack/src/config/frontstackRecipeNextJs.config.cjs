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
var frontstackRecipeNextJs_config_exports = {};
__export(frontstackRecipeNextJs_config_exports, {
  default: () => frontstackRecipeNextJs_config_default
});
module.exports = __toCommonJS(frontstackRecipeNextJs_config_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
function frontstackRecipeNextJs_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    title: "NextJs",
    description: "Create easily a next.js app with coffeekraken tools support",
    requirements: {
      commands: ["[config.package.manager]"]
    },
    defaultStack: "dev",
    stacks: {
      new: {
        description: "Init a new next.js project",
        actions: {
          createApp: (0, import_deepMerge.default)(config.frontstack.actions.copy, {
            title: "Create the app",
            description: "Create the app using the create-next-app utility",
            command: `npx create-next-app next-js --typescript`,
            after() {
              process.chdir(`${process.cwd()}/next-js`);
            },
            params: {},
            settings: {}
          }),
          rename: (0, import_deepMerge.default)(config.frontstack.actions.rename, {
            params: {}
          }),
          addSugarJson: (0, import_deepMerge.default)(config.frontstack.actions.addSugarJson, {
            params: {
              recipe: "nextJs"
            }
          }),
          addManifestJson: (0, import_deepMerge.default)(config.frontstack.actions.addManifestJson, {
            params: {}
          }),
          addSugarPostcss: (0, import_deepMerge.default)(config.frontstack.actions.addSugarPostcss, {
            params: {}
          })
        }
      },
      dev: {
        description: "Start the development stack",
        runInParallel: true,
        actions: {
          frontendServer: "[config.frontstack.actions.frontendServer]",
          vite: "[config.frontstack.actions.vite]"
        }
      },
      prod: {
        description: "Start the production testing stack",
        sharedParams: {
          env: "production"
        },
        actions: {
          frontendServer: "[config.frontstack.actions.frontendServer]"
        }
      },
      build: {
        description: "Build your final production ready dist package",
        sharedParams: {
          prod: true
        },
        actions: {
          postcssBuild: "[config.frontstack.actions.postcssBuild]",
          viteBuild: "[config.frontstack.actions.viteBuild]",
          imagesBuild: "[config.frontstack.actions.imagesBuild]"
        }
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
