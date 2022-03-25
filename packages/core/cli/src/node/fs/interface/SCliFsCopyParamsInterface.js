import __SInterface from "@coffeekraken/s-interface";
class SCliFsCopyParamsInterface extends __SInterface {
  static get _definition() {
    return {
      src: {
        description: "Specify the file/folder to copy",
        type: "String",
        required: true
      },
      glob: {
        description: 'Specify a glob pattern to search for files inside the specified src"',
        type: "String"
      },
      dest: {
        description: "Specify the destination file/folder",
        type: "String",
        required: true
      },
      chdir: {
        description: "Specify if you want the process to change directory inside the destination one or not",
        type: "Boolean",
        default: false
      }
    };
  }
}
export {
  SCliFsCopyParamsInterface as default
};
