import __SPromise from "@coffeekraken/s-promise";
import __deepMap from "../../shared/object/deepMap";
import __dependencyTree from "./dependencyTree";
function dependencyList(filePath, settings) {
  return new __SPromise(async ({ resolve, pipe }) => {
    const tree = await pipe(__dependencyTree(filePath, settings));
    const list = [];
    __deepMap(tree, ({ prop, value }) => {
      if (list.indexOf(prop) === -1)
        list.push(prop);
      return value;
    }, {
      processObjects: true
    });
    resolve(list);
  });
}
export {
  dependencyList as default
};
