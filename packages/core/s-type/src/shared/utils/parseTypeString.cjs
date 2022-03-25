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
var parseTypeString_exports = {};
__export(parseTypeString_exports, {
  default: () => parseTypeString_default
});
module.exports = __toCommonJS(parseTypeString_exports);
function parseSingleTypeString(typeString) {
  let ofStr = "", typeStr = typeString;
  const ofPartsString = typeString.match(/<(.+)>$/gm);
  if (ofPartsString && ofPartsString.length) {
    ofStr = ofPartsString[0].replace("<", "").replace(">", "");
  }
  if (ofStr !== "") {
    typeStr = typeStr.replace(`<${ofStr}>`, "");
  }
  let ofTypes = ofStr !== "" ? [ofStr.toLowerCase()] : void 0;
  if (ofStr !== void 0 && ofStr.includes("|")) {
    ofTypes = ofStr.split("|").map((t) => t.trim().toLowerCase());
  }
  return {
    type: typeStr,
    of: ofTypes
  };
}
const fn = function parseTypeString(typeString) {
  typeString = typeString.toLowerCase().trim();
  typeString = typeString.split("|").map((part) => {
    part = part.trim().replace(/^([a-zA-Z0-9-_]+)\[\]$/, "array<$1>");
    return part;
  }).join("|");
  typeString = typeString.split("|").map((part) => {
    part = part.trim().replace(/^([a-zA-Z0-9-_]+)\{\}$/, "object<$1>");
    return part;
  }).join("|");
  let types = [], inGroup = false, currentStr = "";
  for (let i = 0; i < typeString.length; i++) {
    const char = typeString[i];
    if (char === "<") {
      inGroup = true;
      currentStr += char;
    } else if (char === ">") {
      inGroup = false;
      currentStr += char;
    } else if (char === "|") {
      if (inGroup === false) {
        types.push(currentStr);
        currentStr = "";
      } else {
        currentStr += char;
      }
    } else {
      currentStr += char;
    }
  }
  types.push(currentStr);
  const finalTypes = [];
  types.forEach((type) => {
    finalTypes.push(parseSingleTypeString(type));
  });
  const res = {
    raw: typeString,
    types: finalTypes
  };
  return res;
};
var parseTypeString_default = fn;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
