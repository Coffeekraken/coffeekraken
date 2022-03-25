import __packageRootDir from "../../node/path/packageRootDir";
import __parseArgs from "../../node/cli/parseArgs";
var root_cli_default = async (stringArgs = "") => {
  const args = __parseArgs(stringArgs, {
    definition: {
      highest: {
        type: "Boolean",
        alias: "h",
        default: false
      }
    }
  });
  console.log(__packageRootDir(args.highest));
};
export {
  root_cli_default as default
};
