import "../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class SGlobSettingsInterface extends __SInterface {
  static get _definition() {
    return {
      cwd: {
        description: "Specify the working directory to run the command in.",
        type: "String",
        default: process.cwd()
      },
      symlinks: {
        description: "Specify if you want to follow symlinks or not",
        type: "Boolean",
        default: true
      },
      nodir: {
        description: "Specify if you want to ignore directories or not",
        type: "Boolean",
        default: false
      },
      contentRegExp: {
        description: "Specify a regex to use on the file content to filter resolved files",
        type: "RegExp"
      },
      SFile: {
        description: "Specify if you want back some SFile instances or simple string path",
        type: "Boolean",
        default: true
      },
      exclude: {
        description: "Specify some paths or patterns you want to exclude from your resolve process",
        type: "Array<String>",
        default: []
      },
      defaultExcludes: {
        description: "Specfy if you want to use the default excludes globs setted under the config.storage.exclude configuration",
        type: "Boolean",
        default: true
      }
    };
  }
}
export {
  SGlobSettingsInterface as default
};
