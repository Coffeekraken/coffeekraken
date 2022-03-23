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
var contributor_exports = {};
__export(contributor_exports, {
  default: () => contributor_default
});
module.exports = __toCommonJS(contributor_exports);
function contributor(data, blockSettings) {
  data = Array.from(data);
  const contributors = [];
  data.forEach((d) => {
    const contributorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(d.value);
    if (!contributorNfo)
      return null;
    contributors.push({
      name: contributorNfo[1],
      email: contributorNfo[2],
      url: contributorNfo[3]
    });
  });
  return contributors;
}
var contributor_default = contributor;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
