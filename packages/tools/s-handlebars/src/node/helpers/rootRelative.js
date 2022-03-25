import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
function rootRelative(path) {
  return path.replace(`${__packageRoot()}/`, "");
}
export {
  rootRelative as default
};
