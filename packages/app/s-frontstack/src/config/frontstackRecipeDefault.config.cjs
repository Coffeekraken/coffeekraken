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
var frontstackRecipeDefault_config_exports = {};
__export(frontstackRecipeDefault_config_exports, {
  default: () => frontstackRecipeDefault_config_default
});
module.exports = __toCommonJS(frontstackRecipeDefault_config_exports);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
var import_path = __toESM(require("path"), 1);
function frontstackRecipeDefault_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    title: "Default",
    description: "Default s-frontstack recipe ",
    templateDir: import_path.default.resolve(`${(0, import_dirname.default)()}/../templates/default`),
    requirements: {
      commands: ["[config.package.manager]", "composer"]
    },
    defaultStack: "dev",
    stacks: {
      new: {
        description: "Init a new project with this recipe",
        actions: {
          copy: {
            extends: "copy",
            title: "Copy default template",
            description: "Copy the default template files",
            params: {
              src: import_path.default.resolve((0, import_dirname.default)(), `../templates/default/.`),
              dest: `${process.cwd()}/default`,
              chdir: true
            }
          },
          rename: {
            extends: "rename",
            title: "Rename default template package",
            description: "Renamt the default template package with the user input",
            params: {}
          },
          addSugarJson: {
            extends: "addSugarJson",
            title: "Add the sugar.json file",
            description: "Add the sugar.json file",
            params: {
              recipe: "default"
            }
          },
          addManifestJson: {
            extends: "addManifestJson",
            title: "Add manifest.json file",
            description: "Add the manifest.json file",
            params: {}
          },
          installDependencies: {
            extends: "installDependencies",
            title: "Install the dependencies",
            description: "Install the package dependencies (npm,composer)",
            params: {}
          }
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
        sharedParams: {},
        actions: {
          postcssBuild: "[config.frontstack.actions.postcssBuild]",
          viteBuild: "[config.frontstack.actions.viteBuild]",
          imagesBuild: "[config.frontstack.actions.imagesBuild]",
          faviconBuild: "[config.frontstack.actions.faviconBuild]",
          docmapBuild: "[config.frontstack.actions.docmapBuild]",
          sitemapBuild: "[config.frontstack.actions.sitemapBuild]"
        }
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
