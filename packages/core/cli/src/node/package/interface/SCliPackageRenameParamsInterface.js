import __SInterface from "@coffeekraken/s-interface";
class SCliPackageRenameParamsInterface extends __SInterface {
  static get _definition() {
    return {
      name: {
        description: "Specify the new name for your package",
        type: "String"
      },
      folder: {
        description: "Specify if the folder has to be renames as well",
        type: "Boolean"
      }
    };
  }
}
export {
  SCliPackageRenameParamsInterface as default
};
