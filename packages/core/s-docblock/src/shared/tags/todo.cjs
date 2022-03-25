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
var todo_exports = {};
__export(todo_exports, {
  default: () => todo_default
});
module.exports = __toCommonJS(todo_exports);
function todo(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  const res = [];
  data.forEach((todo2) => {
    var _a, _b;
    if (!todo2.value)
      return;
    const parts = todo2.value.split(/\s{2,20000}/).map((l) => l.trim());
    const priority = (_a = parts[1]) != null ? _a : "normal", description = new String((_b = parts[0]) != null ? _b : "");
    description.render = true;
    res.push({
      priority,
      description
    });
  });
  return res;
}
var todo_default = todo;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
