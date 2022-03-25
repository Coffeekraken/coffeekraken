var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var expandPleasantCssClassname_exports = {};
__export(expandPleasantCssClassname_exports, {
  default: () => expandPleasantCssClassname
});
module.exports = __toCommonJS(expandPleasantCssClassname_exports);
function expandPleasantCssClassname(classesStr) {
  const classesArray = [];
  const classNames = classesStr.split(/\s+/);
  let currentMedia = "";
  classNames.forEach((className) => {
    if (className.slice(0, 1) == "@") {
      currentMedia = className.replace("@", "___");
      return;
    }
    const parts = className.split(":");
    if (parts.length === 1) {
      let name = className;
      if (currentMedia !== "")
        name = className + currentMedia;
      classesArray.push(name);
    } else {
      const firstClass = parts[0];
      let name = firstClass;
      if (currentMedia !== "")
        name = firstClass + currentMedia;
      classesArray.push(name);
      parts.forEach((part, i) => {
        if (i > 0) {
          name = firstClass + "--" + part;
          if (currentMedia !== "")
            name = name + currentMedia;
          classesArray.push(name);
        }
      });
    }
  });
  return classesArray.join(" ");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
